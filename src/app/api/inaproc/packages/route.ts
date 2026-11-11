import { NextRequest, NextResponse } from 'next/server';
import { ProcurementPackage } from '@/contexts/DataContext';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

function rupToUuid(kdRup: string | number): string {
  const hash = crypto.createHash('md5').update('RUP-' + kdRup).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
}

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qxmdhemplqaldswspuwd.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Helper format Rupiah
function formatRupiah(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount).replace('IDR', 'Rp');
}

// Helper format tanggal Indonesia
function formatDateIndo(dateStr?: string | null): string {
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

// Helper mapping kategori pengadaan
function mapCategory(metode?: string, jenis?: string): ProcurementPackage['category'] {
  const m = (metode || '').toLowerCase();
  const j = (jenis || '').toLowerCase();

  if (m.includes('tender') || j.includes('tender')) return 'Tender';
  if (m.includes('seleksi') || j.includes('seleksi') || j.includes('konsultansi')) return 'Seleksi';
  if (m.includes('e-purchasing') || m.includes('katalog') || m.includes('purchasing')) return 'E-Purchasing';
  return 'Pengadaan Langsung';
}

// Helper mapping status pengadaan
function mapStatus(tglAkhir?: string | null): ProcurementPackage['status'] {
  if (!tglAkhir) return 'Pendaftaran Dibuka';
  try {
    const deadline = new Date(tglAkhir);
    const now = new Date();
    if (isNaN(deadline.getTime())) return 'Pendaftaran Dibuka';
    
    // Jika batas akhir sudah lewat lebih dari 30 hari -> Selesai
    const diffDays = (now.getTime() - deadline.getTime()) / (1000 * 3600 * 24);
    if (diffDays > 30) return 'Selesai';
    if (diffDays > 0) return 'Tahap Evaluasi';
    return 'Pendaftaran Dibuka';
  } catch {
    return 'Pendaftaran Dibuka';
  }
}

interface InaprocRawItem {
  kd_rup: number | string;
  nama_paket?: string;
  nama_satker?: string;
  pagu?: number;
  metode_pengadaan?: string;
  jenis_pengadaan?: string;
  tgl_akhir_pemilihan?: string;
  urarian_pekerjaan?: string;
  spesifikasi_pekerjaan?: string;
  status_pdn?: string;
  status_ukm?: string;
  volume_pekerjaan?: string;
  tgl_pengumuman_paket?: string;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tahun = searchParams.get('tahun') || '2026';
    const limit = searchParams.get('limit') || '100';
    const cursor = searchParams.get('cursor') || '';
    const saveToDb = searchParams.get('saveToDb') === 'true';

    const baseUrl = process.env.INAPROC_BASE_URL || 'https://data.inaproc.id';
    const token = process.env.INAPROC_API_TOKEN || 'inprcd36f6044c4c34e83abfcbe04b9a162d6';
    const kodeKlpd = process.env.INAPROC_KODE_KLPD || 'K34';

    let targetUrl = `${baseUrl}/api/v1/rup/paket-penyedia-terumumkan?kode_klpd=${encodeURIComponent(kodeKlpd)}&tahun=${encodeURIComponent(tahun)}&limit=${encodeURIComponent(limit)}`;
    if (cursor) {
      targetUrl += `&cursor=${encodeURIComponent(cursor)}`;
    }

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 UKPBJ-Kemnaker-Sync/1.0'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { 
          success: false, 
          error: `INAPROC API Gateway error (${response.status})`,
          details: errText 
        }, 
        { status: response.status }
      );
    }

    const rawResult = await response.json();
    const rawList: InaprocRawItem[] = Array.isArray(rawResult.data) ? rawResult.data : [];

    // Map INAPROC raw structure to UKPBJ ProcurementPackage interface
    const mappedPackages: ProcurementPackage[] = rawList.map((item) => {
      const title = (item.nama_paket || 'Paket Pengadaan Kemnaker').trim();
      const code = `RUP-${item.kd_rup}`;
      const paguNum = typeof item.pagu === 'number' ? item.pagu : 0;
      const hps = formatRupiah(paguNum);
      const unit = item.nama_satker || 'Kementerian Ketenagakerjaan RI';
      const category = mapCategory(item.metode_pengadaan, item.jenis_pengadaan);
      const status = mapStatus(item.tgl_akhir_pemilihan);
      const deadline = formatDateIndo(item.tgl_akhir_pemilihan);
      const method = item.metode_pengadaan || 'Pengadaan Langsung';

      const descParts = [
        item.urarian_pekerjaan?.trim(),
        item.spesifikasi_pekerjaan ? `Spesifikasi: ${item.spesifikasi_pekerjaan.trim()}` : null,
        item.volume_pekerjaan ? `Volume: ${item.volume_pekerjaan.trim()}` : null,
        item.status_pdn ? `PDN: ${item.status_pdn}` : null,
        item.status_ukm ? `UKM: ${item.status_ukm}` : null
      ].filter(Boolean);

      const desc = descParts.join(' • ') || `Paket pengadaan ${title} oleh ${unit} tahun anggaran ${tahun}.`;

      return {
        id: String(item.kd_rup),
        code,
        title,
        unit,
        hps,
        category,
        status,
        deadline,
        method,
        docCount: 1,
        desc,
        downloadUrl: `https://sirup.lkpp.go.id/sirup/ro/rekap/klpd/${kodeKlpd}`
      };
    });

    // Opsional: Simpan atau Perbarui ke Database Supabase jika parameter saveToDb=true
    if (saveToDb && mappedPackages.length > 0) {
      try {
        const supabase = getSupabaseAdmin();
        const recordsToUpsert = mappedPackages.map((pkg) => ({
          id: rupToUuid(pkg.code.replace('RUP-', '')),
          code: pkg.code,
          title: pkg.title,
          unit: pkg.unit,
          hps: pkg.hps,
          category: pkg.category,
          status: pkg.status,
          deadline: pkg.deadline,
          method: pkg.method,
          doc_count: pkg.docCount,
          description: pkg.desc,
          file_url: pkg.downloadUrl
        }));

        await supabase.from('procurement_packages').upsert(recordsToUpsert, { onConflict: 'code' });
      } catch (dbErr) {
        console.warn('[INAPROC Sync] Failed to upsert to Supabase procurement_packages:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      source: 'INAPROC LKPP (Open Data)',
      klpd: kodeKlpd,
      tahun,
      count: mappedPackages.length,
      data: mappedPackages,
      meta: rawResult.meta
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: 'Internal server error while fetching INAPROC API', details: errorMsg },
      { status: 500 }
    );
  }
}

