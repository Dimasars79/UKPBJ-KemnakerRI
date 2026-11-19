import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// 1. Load environment variables from .env.local
function loadEnv(envPath) {
  const env = {};
  if (!fs.existsSync(envPath)) return env;
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    env[key] = val;
  }
  return env;
}

const env = loadEnv(path.join(process.cwd(), '.env.local'));
const INAPROC_BASE_URL = process.env.INAPROC_BASE_URL || env.INAPROC_BASE_URL || 'https://data.inaproc.id';
const INAPROC_TOKEN = process.env.INAPROC_API_TOKEN || env.INAPROC_API_TOKEN;
const KODE_KLPD = process.env.INAPROC_KODE_KLPD || env.INAPROC_KODE_KLPD || 'K34';
const TAHUN = process.argv[2] || '2026';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

if (!INAPROC_TOKEN || !SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Pastikan INAPROC_API_TOKEN, NEXT_PUBLIC_SUPABASE_URL, dan SUPABASE_SERVICE_ROLE_KEY tersedia di .env.local');
  process.exit(1);
}

// 2. Transform Helpers
function rupToUuid(kdRup) {
  const hash = crypto.createHash('md5').update('RUP-' + String(kdRup)).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
}

function formatRupiah(amount) {
  const num = Number(amount);
  if (isNaN(num)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num).replace('IDR', 'Rp');
}

function formatDateIndo(dateStr) {
  if (!dateStr) return '31 Des 2026';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function mapCategory(metode, jenis) {
  const m = String(metode || '').toLowerCase();
  const j = String(jenis || '').toLowerCase();
  if (m.includes('tender') || j.includes('tender')) return 'Tender';
  if (m.includes('seleksi') || j.includes('seleksi') || j.includes('konsultansi')) return 'Seleksi';
  if (m.includes('e-purchasing') || m.includes('katalog') || m.includes('purchasing')) return 'E-Purchasing';
  return 'Pengadaan Langsung';
}

function mapStatus(tglAkhir) {
  if (!tglAkhir) return 'Pendaftaran Dibuka';
  const d = new Date(tglAkhir);
  if (isNaN(d.getTime())) return 'Pendaftaran Dibuka';
  const diffDays = (Date.now() - d.getTime()) / (1000 * 3600 * 24);
  if (diffDays > 30) return 'Selesai';
  if (diffDays > 0) return 'Tahap Evaluasi';
  return 'Pendaftaran Dibuka';
}

// 3. Extract: Fetch All Pages via Cursor Pagination from INAPROC JSON API
console.log(`🌐 Memulai penarikan JSON langsung dari API INAPROC (KLPD: ${KODE_KLPD}, Tahun: ${TAHUN})...`);
const rawItems = [];
let cursor = '';
let page = 1;

while (true) {
  let url = `${INAPROC_BASE_URL}/api/v1/rup/paket-penyedia-terumumkan?kode_klpd=${encodeURIComponent(KODE_KLPD)}&tahun=${encodeURIComponent(TAHUN)}&limit=1000`;
  if (cursor) url += `&cursor=${encodeURIComponent(cursor)}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${INAPROC_TOKEN}`,
      'Accept': 'application/json',
      'User-Agent': 'UKPBJ-Kemnaker-Direct-Sync/1.0'
    }
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`❌ Gagal menarik API INAPROC (HTTP ${res.status}): ${errText}`);
    process.exit(1);
  }

  const json = await res.json();
  const items = Array.isArray(json.data) ? json.data : [];
  rawItems.push(...items);
  console.log(`   ↳ Halaman ${page}: +${items.length} paket (Total sementara: ${rawItems.length})`);

  const nextCursor = json?.meta?.cursor || json?.meta?.next_cursor || '';
  const hasMore = json?.meta?.has_more;

  if (!nextCursor || items.length === 0 || hasMore === false || nextCursor === cursor) {
    break;
  }

  cursor = nextCursor;
  page++;
  if (page > 50) break;
}

// 4. Transform & Deduplicate In-Memory
const recordMap = new Map();
for (const item of rawItems) {
  if (!item.kd_rup) continue;
  const code = `RUP-${item.kd_rup}`;
  const title = String(item.nama_paket || 'Paket Pengadaan Kemnaker').trim();
  const unit = String(item.nama_satker || 'Kementerian Ketenagakerjaan RI').trim();
  const method = String(item.metode_pengadaan || 'Pengadaan Langsung').trim();

  const descParts = [
    item.urarian_pekerjaan?.trim(),
    item.spesifikasi_pekerjaan ? `Spesifikasi: ${item.spesifikasi_pekerjaan.trim()}` : null,
    item.volume_pekerjaan ? `Volume: ${item.volume_pekerjaan.trim()}` : null,
    item.status_pdn ? `PDN: ${item.status_pdn}` : null,
    item.status_ukm ? `UKM: ${item.status_ukm}` : null
  ].filter(Boolean);

  recordMap.set(code, {
    id: rupToUuid(item.kd_rup),
    code,
    title,
    unit,
    hps: formatRupiah(item.pagu || 0),
    category: mapCategory(method, item.jenis_pengadaan),
    status: mapStatus(item.tgl_akhir_pemilihan),
    deadline: formatDateIndo(item.tgl_akhir_pemilihan),
    method,
    doc_count: 1,
    description: descParts.join(' • ') || `Paket pengadaan ${title} oleh ${unit} TA ${TAHUN}.`,
    file_url: `https://sirup.lkpp.go.id/sirup/ro/rekap/klpd/${KODE_KLPD}`
  });
}

const records = Array.from(recordMap.values());
console.log(`\n📦 Transformasi selesai: ${records.length} paket unik siap di-upsert ke Supabase.`);

// 5. Load: Batch Upsert directly to Supabase REST API
const BATCH_SIZE = 200;
const totalBatches = Math.ceil(records.length / BATCH_SIZE);
let successCount = 0;

for (let i = 0; i < totalBatches; i++) {
  const batch = records.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/procurement_packages?on_conflict=code`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(batch)
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`❌ Gagal upsert Batch ${i + 1}/${totalBatches} (HTTP ${res.status}): ${errText}`);
    process.exit(1);
  }

  successCount += batch.length;
  console.log(`🚀 Batch ${i + 1}/${totalBatches} masuk ke Supabase (${successCount}/${records.length})`);
}

console.log(`\n🎉 SELESAI! ${successCount} paket dari API JSON INAPROC berhasil disinkronkan langsung ke Supabase.`);
