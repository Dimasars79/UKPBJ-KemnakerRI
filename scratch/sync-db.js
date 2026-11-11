const https = require('https');
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qxmdhemplqaldswspuwd.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4bWRoZW1wbHFhbGRzd3NwdXdkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODkzNjQ3NywiZXhwIjoyMTA0NTEyNDc3fQ.Yd1n7AtEZd98eHUXJU7P2KePKG9KdJq0vWqqaRIpvAU';
const supabase = createClient(supabaseUrl, serviceRoleKey);

function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount).replace('IDR', 'Rp');
}

function formatDateIndo(dateStr) {
  if (!dateStr) return '31 Des 2026';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

function mapCategory(metode, jenis) {
  const m = (metode || '').toLowerCase();
  const j = (jenis || '').toLowerCase();
  if (m.includes('tender') || j.includes('tender')) return 'Tender';
  if (m.includes('seleksi') || j.includes('seleksi') || j.includes('konsultansi')) return 'Seleksi';
  if (m.includes('e-purchasing') || m.includes('katalog') || m.includes('purchasing')) return 'E-Purchasing';
  return 'Pengadaan Langsung';
}

function mapStatus(tglAkhir) {
  if (!tglAkhir) return 'Pendaftaran Dibuka';
  try {
    const deadline = new Date(tglAkhir);
    const now = new Date();
    if (isNaN(deadline.getTime())) return 'Pendaftaran Dibuka';
    const diffDays = (now.getTime() - deadline.getTime()) / (1000 * 3600 * 24);
    if (diffDays > 30) return 'Selesai';
    if (diffDays > 0) return 'Tahap Evaluasi';
    return 'Pendaftaran Dibuka';
  } catch {
    return 'Pendaftaran Dibuka';
  }
}

// Convert a numeric RUP ID to a valid deterministic UUIDv4
function rupToUuid(kdRup) {
  const hash = crypto.createHash('md5').update('RUP-' + kdRup).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
}

async function syncDirect() {
  const qs = 'tahun=2026&kode_klpd=K34&limit=100';
  const options = {
    hostname: 'data.inaproc.id',
    path: '/api/v1/rup/paket-penyedia-terumumkan?' + qs,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer inprcd36f6044c4c34e83abfcbe04b9a162d6',
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      const json = JSON.parse(data);
      console.log('Total packages from INAPROC:', json.data?.length);
      const records = (json.data || []).map(p => {
        const title = (p.nama_paket || 'Paket Pengadaan Kemnaker').trim();
        const code = `RUP-${p.kd_rup}`;
        const hps = formatRupiah(p.pagu || 0);
        const unit = p.nama_satker || 'Kementerian Ketenagakerjaan RI';
        const category = mapCategory(p.metode_pengadaan, p.jenis_pengadaan);
        const status = mapStatus(p.tgl_akhir_pemilihan);
        const deadline = formatDateIndo(p.tgl_akhir_pemilihan);
        const method = p.metode_pengadaan || 'Pengadaan Langsung';
        const desc = [
          p.urarian_pekerjaan?.trim(),
          p.spesifikasi_pekerjaan ? `Spesifikasi: ${p.spesifikasi_pekerjaan.trim()}` : null,
          p.status_pdn ? `PDN: ${p.status_pdn}` : null,
          p.status_ukm ? `UKM: ${p.status_ukm}` : null
        ].filter(Boolean).join(' • ');

        return {
          id: rupToUuid(p.kd_rup),
          code,
          title,
          unit,
          hps,
          category,
          status,
          deadline,
          method,
          doc_count: 1,
          description: desc,
          file_url: 'https://sirup.lkpp.go.id/sirup/ro/rekap/klpd/K34'
        };
      });

      console.log('Upserting 100 records into Supabase...');
      const { data: inserted, error: insertErr } = await supabase.from('procurement_packages').upsert(records, { onConflict: 'code' });
      if (insertErr) {
        console.error('Insert error:', insertErr);
      } else {
        console.log('SUCCESS! 100 Real INAPROC packages inserted/upserted into Supabase!');
      }
    });
  });
  req.on('error', e => console.error(e));
  req.end();
}

syncDirect();
