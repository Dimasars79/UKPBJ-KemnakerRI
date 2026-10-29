import csv
import json
import re

CSV_INPUT = 'data_dashboard_rup_table_20261029_030728_97db1167.csv'
CSV_OUTPUT_SUPABASE = 'supabase_procurement_packages.csv'
TS_OUTPUT_FRONTEND = 'src/data/mockPackages50.ts'
SQL_OUTPUT_SUPABASE = 'supabase_seed_rup_packages.sql'

with open(CSV_INPUT, 'r', encoding='utf-8', errors='ignore') as f:
    rows = list(csv.DictReader(f))

print(f"Total rows read: {len(rows)}")

def clean_num(v):
    s = str(v).replace('.', '').strip()
    return int(s) if s.isdigit() else 0

def format_rupiah(num):
    return f"Rp {num:,}".replace(',', '.')

def map_category(m):
    m_lower = m.strip().lower()
    if 'tender' in m_lower:
        return 'Tender'
    if 'seleksi' in m_lower:
        return 'Seleksi'
    if 'e-purchasing' in m_lower or 'dikecualikan' in m_lower:
        return 'E-Purchasing'
    return 'Pengadaan Langsung'

def clean_satker_name(raw):
    raw = raw.strip()
    parts = raw.split(' - ')
    if len(parts) > 1 and parts[-1].strip().isdigit():
        name = parts[0].strip()
    else:
        name = raw
    return name.title()

# Process all 8,333 records
all_packages = []
for i, r in enumerate(rows):
    rup = r['kode_rup'].strip() or str(i + 1)
    val = clean_num(r['total_nilai'])
    cat = map_category(r['metode_pengadaan'])
    metode = r['metode_pengadaan'].strip() or 'Pengadaan Langsung'
    jenis = r['jenis_pengadaan'].strip() or 'Barang/Jasa'
    satker = clean_satker_name(r['nama_satuan_kerja'] or 'Kementerian Ketenagakerjaan RI')
    nama_paket = (r['nama_paket'] or 'Paket Pengadaan').strip()
    sumber_dana = (r['sumber_dana'] or 'APBN').strip()
    pdn = (r['produk_dalam_negeri'] or 'Ya').strip()
    umk = (r['status_umk'] or 'Ya').strip()
    tahun = (r['tahun_anggaran'] or '2026').strip()

    # Determine status
    if i % 3 == 0:
        status = 'Pendaftaran Dibuka'
    elif i % 3 == 1:
        status = 'Tahap Evaluasi'
    else:
        status = 'Selesai'

    desc = f"Paket {jenis} {nama_paket} melalui metode {metode} TA {tahun} di lingkungan {satker}. Sumber dana: {sumber_dana}. PDN: {pdn}, Usaha Mikro/Kecil: {umk}."

    all_packages.append({
        'id': f"PKG-RUP-{rup}",
        'code': f"RUP-{rup}",
        'title': nama_paket,
        'unit': satker,
        'hps': format_rupiah(val),
        'hps_num': val,
        'category': cat,
        'status': status,
        'deadline': '31 Des 2026',
        'method': f"{metode} ({jenis})",
        'doc_count': 1,
        'description': desc,
        'sync_frontend': True
    })

print(f"Processed {len(all_packages)} packages successfully.")

# 1. Generate supabase_procurement_packages.csv (Clean CSV for Supabase Table Editor Import)
with open(CSV_OUTPUT_SUPABASE, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow([
        'id', 'code', 'title', 'unit', 'hps', 'category', 'status',
        'deadline', 'method', 'doc_count', 'description', 'sync_frontend'
    ])
    for p in all_packages:
        writer.writerow([
            p['id'], p['code'], p['title'], p['unit'], p['hps'], p['category'],
            p['status'], p['deadline'], p['method'], p['doc_count'], p['description'], 'true'
        ])
print(f"Generated Supabase CSV: {CSV_OUTPUT_SUPABASE}")

# 2. Select curated rich set for frontend mockPackages50.ts:
# - ALL 30 Tender packages
# - ALL 31 Seleksi packages
# - Top 60 E-Purchasing packages by HPS
# - Top 60 Pengadaan Langsung packages by HPS
tenders = [p for p in all_packages if p['category'] == 'Tender']
seleksi = [p for p in all_packages if p['category'] == 'Seleksi']
epurchasing = sorted([p for p in all_packages if p['category'] == 'E-Purchasing'], key=lambda x: x['hps_num'], reverse=True)[:60]
pl = sorted([p for p in all_packages if p['category'] == 'Pengadaan Langsung'], key=lambda x: x['hps_num'], reverse=True)[:60]

curated = tenders + seleksi + epurchasing + pl
print(f"Curated frontend packages: {len(curated)} (Tender: {len(tenders)}, Seleksi: {len(seleksi)}, E-Purchasing: {len(epurchasing)}, PL: {len(pl)})")

# Write TS file for frontend
ts_code = 'import { ProcurementPackage } from \'@/contexts/DataContext\';\n\n'
ts_code += 'export const MOCK_PACKAGES_50: ProcurementPackage[] = '
ts_data = []
for p in curated:
    ts_data.append({
        'id': p['id'],
        'code': p['code'],
        'title': p['title'],
        'unit': p['unit'],
        'hps': p['hps'],
        'category': p['category'],
        'status': p['status'],
        'deadline': p['deadline'],
        'method': p['method'],
        'docCount': p['doc_count'],
        'desc': p['description'],
        'fileName': f"KAK-{p['code']}.pdf",
        'fileSize': '2.4 MB',
        'downloadUrl': '#'
    })

ts_code += json.dumps(ts_data, indent=2, ensure_ascii=False) + ';\n'

with open(TS_OUTPUT_FRONTEND, 'w', encoding='utf-8') as f:
    f.write(ts_code)
print(f"Generated Frontend TS: {TS_OUTPUT_FRONTEND}")

# 3. Generate SQL seed script for first 500 top packages (clean and easy to run in Supabase SQL editor)
sql_code = "-- ==============================================================================\n"
sql_code += "-- SEED DATA PAKET RUP KEMNAKER RI 2026 UNTUK SUPABASE\n"
sql_code += "-- Jalankan script ini di Supabase Dashboard > SQL Editor > Run\n"
sql_code += "-- ==============================================================================\n\n"
sql_code += "INSERT INTO public.procurement_packages (id, code, title, unit, hps, category, status, deadline, method, doc_count, description, sync_frontend)\nVALUES\n"

sql_rows = []
for p in curated:
    esc_title = p['title'].replace("'", "''")
    esc_unit = p['unit'].replace("'", "''")
    esc_method = p['method'].replace("'", "''")
    esc_desc = p['description'].replace("'", "''")
    sql_rows.append(f"('{p['id']}', '{p['code']}', '{esc_title}', '{esc_unit}', '{p['hps']}', '{p['category']}', '{p['status']}', '{p['deadline']}', '{esc_method}', {p['doc_count']}, '{esc_desc}', true)")

sql_code += ",\n".join(sql_rows)
sql_code += "\nON CONFLICT (id) DO UPDATE SET\n"
sql_code += "    title = EXCLUDED.title,\n"
sql_code += "    unit = EXCLUDED.unit,\n"
sql_code += "    hps = EXCLUDED.hps,\n"
sql_code += "    category = EXCLUDED.category,\n"
sql_code += "    status = EXCLUDED.status,\n"
sql_code += "    method = EXCLUDED.method,\n"
sql_code += "    description = EXCLUDED.description,\n"
sql_code += "    updated_at = NOW();\n"

with open(SQL_OUTPUT_SUPABASE, 'w', encoding='utf-8') as f:
    f.write(sql_code)
print(f"Generated SQL Seed: {SQL_OUTPUT_SUPABASE}")
