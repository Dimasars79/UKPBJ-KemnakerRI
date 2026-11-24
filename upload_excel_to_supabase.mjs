import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createRequire } from 'module';

// Load xlsx from local node_modules or fallback to scratch cache
const require = createRequire(import.meta.url);
let XLSX;
try {
  XLSX = require('xlsx');
} catch {
  const scratchRequire = createRequire('C:/Users/asus3/.gemini/antigravity/brain/ac452961-d05e-4625-8be3-32cd576fe4f8/scratch/package.json');
  XLSX = scratchRequire('xlsx');
}

// 1. Read .env.local
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
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY tidak ditemukan di .env.local');
  process.exit(1);
}

// Helpers matching src/app/api/inaproc/packages/route.ts
function rupToUuid(codeStr) {
  const clean = String(codeStr).replace('RUP-', '');
  const hash = crypto.createHash('md5').update('RUP-' + clean).digest('hex');
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

// 2. Read Excel
const excelFile = path.join(process.cwd(), 'Data_RUP_INAPROC_Kemnaker_K34_2026.xlsx');
if (!fs.existsSync(excelFile)) {
  console.error(`❌ File Excel tidak ditemukan: ${excelFile}`);
  process.exit(1);
}

console.log(`📖 Membaca file Excel: ${excelFile}...`);
const wb = XLSX.readFile(excelFile);
const sheetName = wb.SheetNames.includes('Data Paket RUP 2026') ? 'Data Paket RUP 2026' : wb.SheetNames[0];
const rawRows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
console.log(`✅ Berhasil membaca ${rawRows.length} baris dari sheet "${sheetName}".`);

// 3. Map to exact 20 Excel columns in Supabase (deduplicate by Kode RUP)
const recordMap = new Map();
for (const row of rawRows) {
  const code = String(row['Kode RUP'] || '').trim();
  if (!code) continue;

  const noVal = row['No'];
  const paguVal = Number(row['Pagu (Rp)']);

  recordMap.set(code, {
    'No': noVal !== undefined && noVal !== '' && !isNaN(Number(noVal)) ? Number(noVal) : null,
    'Kode RUP': code,
    'Nama Paket': String(row['Nama Paket'] || '').trim(),
    'Satuan Kerja (Satker)': String(row['Satuan Kerja (Satker)'] || '').trim(),
    'Kode Satker': String(row['Kode Satker'] || '').trim(),
    'Pagu (Rp)': !isNaN(paguVal) ? Math.round(paguVal) : 0,
    'Metode Pengadaan': String(row['Metode Pengadaan'] || '').trim(),
    'Jenis Pengadaan': String(row['Jenis Pengadaan'] || '').trim(),
    'Status PDN': String(row['Status PDN'] || '').trim(),
    'Status UKM': String(row['Status UKM'] || '').trim(),
    'Volume': String(row['Volume'] || '').trim(),
    'Tgl Pengumuman': String(row['Tgl Pengumuman'] || '').trim(),
    'Tgl Awal Pemilihan': String(row['Tgl Awal Pemilihan'] || '').trim(),
    'Tgl Akhir Pemilihan': String(row['Tgl Akhir Pemilihan'] || '').trim(),
    'Tgl Awal Kontrak': String(row['Tgl Awal Kontrak'] || '').trim(),
    'Tgl Akhir Kontrak': String(row['Tgl Akhir Kontrak'] || '').trim(),
    'Status Aktif': String(row['Status Aktif'] || '').trim(),
    'Status Umumkan': String(row['Status Umumkan'] || '').trim(),
    'Uraian Pekerjaan': String(row['Uraian Pekerjaan'] || '').trim(),
    'Spesifikasi Pekerjaan': String(row['Spesifikasi Pekerjaan'] || '').trim()
  });
}

const records = Array.from(recordMap.values());
console.log(`📦 Siap mengirim ${records.length} paket unik ke Supabase...`);

// 4. Upsert in batches of 200
const BATCH_SIZE = 200;
const totalBatches = Math.ceil(records.length / BATCH_SIZE);
let successCount = 0;

for (let i = 0; i < totalBatches; i++) {
  const batch = records.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/procurement_packages?on_conflict=${encodeURIComponent('Kode RUP')}`, {
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
    console.error(`❌ Gagal pada Batch ${i + 1}/${totalBatches} (HTTP ${res.status}): ${errText}`);
    process.exit(1);
  }

  successCount += batch.length;
  console.log(`🚀 Batch ${i + 1}/${totalBatches} berhasil (${successCount}/${records.length} paket)`);
}

console.log(`\n🎉 SELESAI! Seluruh ${successCount} paket dari Excel berhasil masuk/diperbarui di Supabase.`);
