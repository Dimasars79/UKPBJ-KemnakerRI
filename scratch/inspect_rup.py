import csv

with open('data_dashboard_rup_table_20261029_030728_97db1167.csv', 'r', encoding='utf-8', errors='ignore') as f:
    rows = list(csv.DictReader(f))

def clean_num(v):
    s = str(v).replace('.', '').strip()
    return int(s) if s.isdigit() else 0

tenders = [r for r in rows if 'tender' in r['metode_pengadaan'].lower()]
seleksi = [r for r in rows if 'seleksi' in r['metode_pengadaan'].lower()]
epurchasing = [r for r in rows if 'e-purchasing' in r['metode_pengadaan'].lower()]
pl = [r for r in rows if 'pengadaan langsung' in r['metode_pengadaan'].lower()]

print(f"Total Tender: {len(tenders)}")
for t in sorted(tenders, key=lambda x: clean_num(x['total_nilai']), reverse=True)[:5]:
    val = clean_num(t['total_nilai'])
    print(f"  [{t['kode_rup']}] Rp {val:,.0f} : {t['nama_paket'][:60]} | {t['nama_satuan_kerja'][:40]}")

print(f"\nTotal Seleksi: {len(seleksi)}")
for s in sorted(seleksi, key=lambda x: clean_num(x['total_nilai']), reverse=True)[:5]:
    val = clean_num(s['total_nilai'])
    print(f"  [{s['kode_rup']}] Rp {val:,.0f} : {s['nama_paket'][:60]} | {s['nama_satuan_kerja'][:40]}")

print(f"\nTop E-Purchasing: {len(epurchasing)}")
for e in sorted(epurchasing, key=lambda x: clean_num(x['total_nilai']), reverse=True)[:5]:
    val = clean_num(e['total_nilai'])
    print(f"  [{e['kode_rup']}] Rp {val:,.0f} : {e['nama_paket'][:60]} | {e['nama_satuan_kerja'][:40]}")
