import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

function loadEnv(envPath) {
  const env = {};
  if (!fs.existsSync(envPath)) return env;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
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
  console.error('❌ Pastikan INAPROC_API_TOKEN, NEXT_PUBLIC_SUPABASE_URL, dan SUPABASE_SERVICE_ROLE_KEY ada di .env.local');
  process.exit(1);
}

function buildRecordId(item, index) {
  const candidate = item.id || item.kd_kaji_ulang || item.id_kaji_ulang;
  if (candidate) return String(candidate);
  const hash = crypto.createHash('md5').update(JSON.stringify(item) + ':' + index).digest('hex');
  return hash;
}

console.log(`🌐 Menarik /api/v1/rup/history-kaji-ulang (KLPD: ${KODE_KLPD}, Tahun: ${TAHUN})...`);
const rawItems = [];
let cursor = '';
let page = 1;

while (true) {
  let url = `${INAPROC_BASE_URL}/api/v1/rup/history-kaji-ulang?kode_klpd=${encodeURIComponent(KODE_KLPD)}&tahun=${encodeURIComponent(TAHUN)}&limit=1000`;
  if (cursor) url += `&cursor=${encodeURIComponent(cursor)}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${INAPROC_TOKEN}`,
      Accept: 'application/json',
      'User-Agent': 'UKPBJ-Kemnaker-Sync/1.0'
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
  console.log(`   ↳ Halaman ${page}: +${items.length} baris (Total: ${rawItems.length})`);

  const nextCursor = json?.meta?.cursor || json?.meta?.next_cursor || '';
  const hasMore = json?.meta?.has_more;
  if (!nextCursor || items.length === 0 || hasMore === false || nextCursor === cursor) {
    break;
  }
  cursor = nextCursor;
  page++;
  if (page > 50) break;
}

const recordMap = new Map();
rawItems.forEach((item, idx) => {
  const id = buildRecordId(item, idx);
  recordMap.set(id, {
    id,
    kd_rup: String(item.kd_rup || item.kode_rup || ''),
    kode_klpd: String(item.kode_klpd || KODE_KLPD),
    tahun_anggaran: Number(item.tahun_anggaran || item.tahun || TAHUN) || Number(TAHUN),
    raw_data: item,
    synced_at: new Date().toISOString()
  });
});

const records = Array.from(recordMap.values());
console.log(`📦 Siap mengirim ${records.length} baris ke tabel history_kaji_ulang...`);

const BATCH_SIZE = 200;
const totalBatches = Math.ceil(records.length / BATCH_SIZE);
let successCount = 0;

for (let i = 0; i < totalBatches; i++) {
  const batch = records.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/history_kaji_ulang?on_conflict=id`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates'
    },
    body: JSON.stringify(batch)
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`❌ Gagal pada Batch ${i + 1}/${totalBatches} (HTTP ${res.status}): ${errText}`);
    process.exit(1);
  }

  successCount += batch.length;
  console.log(`🚀 Batch ${i + 1}/${totalBatches} berhasil (${successCount}/${records.length})`);
}

console.log(`\n🎉 SELESAI! ${successCount} baris history_kaji_ulang tersinkron ke Supabase.`);
