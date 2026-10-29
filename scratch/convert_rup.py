import csv
import json

with open('data_dashboard_rup_table_20261029_030728_97db1167.csv', 'r', encoding='utf-8', errors='ignore') as f:
    rows = list(csv.DictReader(f))

def map_category(m):
    m = m.strip().lower()
    if 'tender' in m: return 'Tender'
    if 'seleksi' in m: return 'Seleksi'
    if 'e-purchasing' in m: return 'E-Purchasing'
    return 'Pengadaan Langsung'

packages = []
for i, r in enumerate(rows):
    rup = r['kode_rup'].strip() or str(i+1)
    val_str = r['total_nilai'].strip().replace('.', '')
    val = int(val_str) if val_str.isdigit() else 0
    cat = map_category(r['metode_pengadaan'])
    metode = r['metode_pengadaan'].strip() or 'Pengadaan Langsung'
    jenis = r['jenis_pengadaan'].strip() or 'Barang/Jasa'
    satker = r['nama_satuan_kerja'].strip() or 'Kementerian Ketenagakerjaan RI'
    
    # Format clean satker name
    # e.g. "BALAI PELATIHAN VOKASI DAN PRODUKTIVITAS SAMARINDA - 451108" -> "Balai Pelatihan Vokasi dan Produktivitas Samarinda"
    parts = satker.split(' - ')
    clean_satker = parts[0].title() if len(parts) > 1 and parts[-1].strip().isdigit() else satker.title()

    # Determine status
    if i % 3 == 0:
        status = 'Pendaftaran Dibuka'
    elif i % 3 == 1:
        status = 'Tahap Evaluasi'
    else:
        status = 'Selesai'

    pkg = {
        'id': f'RUP-{rup}',
        'code': f'RUP-{rup}',
        'title': r['nama_paket'].strip() or 'Paket Pengadaan',
        'unit': clean_satker,
        'hps': f'Rp {val:,}'.replace(',', '.'),
        'category': cat,
        'status': status,
        'deadline': '31 Des 2026',
        'method': f'{metode} ({jenis})',
        'docCount': 1,
        'desc': f"Paket {jenis} {r['nama_paket'].strip()} melalui metode {metode} TA {r['tahun_anggaran'].strip()}. Sumber dana: {r['sumber_dana'].strip()}. PDN: {r['produk_dalam_negeri'].strip()}, UMK: {r['status_umk'].strip()}."
    }
    packages.append(pkg)

json_str = json.dumps(packages, ensure_ascii=False)
print('Total paket:', len(packages))
print('Ukuran JSON (KB):', round(len(json_str.encode('utf-8')) / 1024, 2))
