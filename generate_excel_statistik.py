# -*- coding: utf-8 -*-
"""
Script untuk menghasilkan file Excel resmi:
2026 - Form Daftar Data Statistik UKPBJ Kemnaker - Definisi SMData - Pusdatik.xlsx
Mengacu pada format dan standar Pusdatik Kemnaker RI (Standar Metadata Data / SMData & SPBE)
"""

import openpyxl
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from openpyxl.utils import get_column_letter

def generate_ukpbj_excel(filepath):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Daftar Data Statistik UKPBJ"
    ws.views.sheetView[0].showGridLines = True

    # Styling Elements
    font_header = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
    font_body = Font(name="Calibri", size=10, color="000000")
    font_bold = Font(name="Calibri", size=10, bold=True, color="000000")

    fill_header = PatternFill(start_color="1B365D", end_color="1B365D", fill_type="solid") # Navy Blue
    fill_zebra = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")

    thin_border = Border(
        left=Side(style='thin', color='D1D5DB'),
        right=Side(style='thin', color='D1D5DB'),
        top=Side(style='thin', color='D1D5DB'),
        bottom=Side(style='thin', color='D1D5DB')
    )

    headers = [
        "No",
        "Nama Data",
        "Definisi/Deskripsi Data",
        "Cara Pemerolehan Data Statistik",
        "Tingkat Kedetailan Data",
        "Periode Pemutakhiran Data",
        "Relasi dengan Daftar Kode Standar",
        "Tagging Referensi Arsitektur SPBE",
        "Keterangan"
    ]

    for col_num, header_title in enumerate(headers, 1):
        cell = ws.cell(row=1, column=col_num)
        cell.value = header_title
        cell.font = font_header
        cell.fill = fill_header
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        cell.border = thin_border
    ws.row_dimensions[1].height = 36

    data_rows = [
        (
            1,
            "Data Rencana Umum Pengadaan (RUP) Kemnaker",
            "Data mengenai rencana pengadaan barang/jasa yang disusun dan diumumkan oleh Pengguna Anggaran (PA/KPA) seluruh Satuan Kerja di lingkungan Kementerian Ketenagakerjaan melalui aplikasi SiRUP LKPP.",
            "Kompilasi produk administratif melalui integrasi API SiRUP LKPP dan verifikasi sistem UKPBJ Kemnaker",
            "Per paket pengadaan, Satker/UPTP, jenis pengadaan (Barang, Konstruksi, Konsultansi, Jasa Lainnya), metode pemilihan, sumber dana, wilayah",
            "Tahunan (Pemutakhiran Bulanan)",
            "",
            "RAL.02.04.01 PERENCANAAN PENGADAAN BARANG DAN JASA KEMNAKER",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210101 : Jumlah Paket Rencana Umum Pengadaan (RUP) Kemnaker"
        ),
        (
            2,
            "Data Paket Pengadaan Tender dan Seleksi (SPSE)",
            "Data mengenai paket pengadaan barang/jasa pemerintah yang dilaksanakan melalui metode tender terbuka dan seleksi jasa konsultansi menggunakan Sistem Pengadaan Secara Elektronik (SPSE) Kemnaker.",
            "Kompilasi produk administratif melalui sinkronisasi database SPSE Kemnaker dan portal UKPBJ",
            "Per nomor tender/paket, unit kerja pengusul, nilai pagu/HPS, nilai penawaran, metode evaluasi, status tahapan lelang",
            "Bulanan / Real-time",
            "",
            "RAL.02.04.02 PEMILIHAN PENYEDIA BARANG DAN JASA KEMNAKER",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210102 : Jumlah Paket Tender dan Seleksi Terlaksana"
        ),
        (
            3,
            "Data Paket Pengadaan Non-Tender (Pengadaan Langsung)",
            "Data mengenai pelaksanaan pengadaan barang/jasa bernilai hingga batas nominal tertentu yang dilaksanakan melalui metode Pengadaan Langsung dan Penunjukan Langsung oleh Pejabat Pengadaan.",
            "Kompilasi produk administratif melalui aplikasi SPSE Non-Tender Kemnaker",
            "Per paket, Pejabat Pengadaan, penyedia terpilih, nilai kontrak, komoditas barang/jasa, satker",
            "Bulanan",
            "",
            "RAL.02.04.02 PEMILIHAN PENYEDIA BARANG DAN JASA KEMNAKER",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210103 : Jumlah Paket Non-Tender / Pengadaan Langsung"
        ),
        (
            4,
            "Data Transaksi E-Purchasing (Katalog Elektronik & Toko Daring)",
            "Data transaksi pembelian barang/jasa pemerintah melalui sistem Katalog Elektronik (Katalog Nasional, Sektoral Ketenagakerjaan, dan Lokal) serta Toko Daring (Bela Pengadaan).",
            "Kompilasi produk administratif transaksi modul E-Purchasing LKPP di lingkungan Kemnaker RI",
            "Per pesanan/transaksi, Pejabat Pembuat Komitmen (PPK), komoditas etalase, penyedia rekanan, nilai transaksi riil",
            "Bulanan",
            "",
            "RAL.02.04.03 PENGADAAN SECARA ELEKTRONIK (E-PURCHASING)",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210104 : Nilai dan Frekuensi Transaksi E-Purchasing Kemnaker"
        ),
        (
            5,
            "Data Kontrak Pengadaan Barang dan Jasa",
            "Data mengenai perikatan hukum antara Pejabat Pembuat Komitmen (PPK) dengan Penyedia Barang/Jasa atas paket pekerjaan yang telah selesai proses pemilihannya.",
            "Kompilasi produk administratif dokumen kontrak, Surat Perintah Kerja (SPK), dan Surat Perjanjian pada sistem pengadaan",
            "Per dokumen kontrak, nomor SPK, identitas penyedia, nilai kontrak, jangka waktu pelaksanaan, jaminan pelaksanaan, satker",
            "Bulanan",
            "",
            "RAL.02.04.04 MANAJEMEN KONTRAK PENGADAAN KEMNAKER",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210105 : Jumlah dan Nilai Kontrak Pengadaan Tertandatangani"
        ),
        (
            6,
            "Data Realisasi Anggaran Pengadaan Barang/Jasa",
            "Data capaian penyerapan anggaran pengadaan barang/jasa baik fisik maupun keuangan dibandingkan dengan alokasi pagu DIPA Kemnaker.",
            "Rekonsiliasi data SPSE, SiRUP, dan Sistem Informasi Keuangan Kemnaker/Kemenkeu (SAKTI)",
            "Per satker, per program belanja (modal, operasional, jasa), persentase realisasi, deviasi target",
            "Bulanan / Triwulanan",
            "",
            "RAL.02.04.05 MONITORING DAN EVALUASI KINERJA PBJ",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210106 : Persentase Realisasi Anggaran Pengadaan Barang/Jasa"
        ),
        (
            7,
            "Data Penggunaan Produk Dalam Negeri (P3DN & Nilai TKDN)",
            "Data komitmen dan realisasi belanja produk buatan dalam negeri serta capaian persentase Tingkat Komponen Dalam Negeri (TKDN) pada belanja pengadaan Kemnaker.",
            "Kompilasi produk administratif form pencatatan TKDN dan pelaporan e-katalog/SPSE Kemnaker",
            "Per paket pekerjaan, sertifikat TKDN, nilai belanja PDN vs Impor, satker pelaksana",
            "Bulanan",
            "",
            "RAL.02.04.05 MONITORING DAN EVALUASI KINERJA PBJ",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210107 : Persentase Belanja Produk Dalam Negeri (PDN)"
        ),
        (
            8,
            "Data Belanja Pengadaan untuk Usaha Mikro, Kecil, dan Koperasi (UMKK)",
            "Data alokasi dan realisasi belanja pengadaan barang/jasa Kementerian Ketenagakerjaan yang diperuntukkan bagi pelaku Usaha Mikro, Kecil, dan Koperasi sesuai amanat regulasi pengadaan.",
            "Kompilasi transaksi SPSE, E-Purchasing, dan Toko Daring terverifikasi kualifikasi UMKK",
            "Per paket pengadaan, NIB penyedia UMKK, nilai belanja UMKK, proporsi terhadap total belanja pengadaan",
            "Bulanan",
            "",
            "RAL.02.04.05 MONITORING DAN EVALUASI KINERJA PBJ",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210108 : Persentase Realisasi Belanja Produk UMK dan Koperasi"
        ),
        (
            9,
            "Data Penyedia / Rekanan Terdaftar (SIKaP Kemnaker)",
            "Data mengenai profil pelaku usaha atau rekanan yang telah terkualifikasi dan terdaftar dalam Sistem Informasi Kinerja Penyedia (SIKaP) LKPP di lingkungan Kemnaker RI.",
            "Kompilasi produk administratif verifikasi data kualifikasi penyedia oleh Pokja Pemilihan dan Pejabat Pengadaan",
            "Per entitas perusahaan, Nomor Induk Berusaha (NIB), NPWP, izin usaha/KBLI, riwayat pekerjaan, wilayah domisili",
            "Bulanan",
            "",
            "RAL.02.04.06 MANAJEMEN PENYEDIA DAN VENDOR (SIKAP)",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210109 : Jumlah Penyedia Barang/Jasa Terdaftar dan Terkualifikasi"
        ),
        (
            10,
            "Data Evaluasi Kinerja Penyedia (Vendor Performance Management)",
            "Data penilaian berkala atas performa dan kepatuhan penyedia dalam menyelesaikan kewajiban kontrak (mutu, ketepatan waktu, biaya, dan layanan).",
            "Kompilasi formulir evaluasi penilaian kinerja yang diinput oleh PPK pada sistem pasca serah terima pekerjaan",
            "Per kontrak, ID penyedia, skor indikator kinerja (Sangat Baik, Baik, Cukup, Buruk), sanksi/denda",
            "Triwulanan",
            "",
            "RAL.02.04.06 MANAJEMEN PENYEDIA DAN VENDOR (SIKAP)",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210110 : Indeks Kinerja Penyedia Pengadaan Barang/Jasa"
        ),
        (
            11,
            "Data Pejabat Fungsional Pengelola Pengadaan Barang/Jasa (JF PPBJ)",
            "Data mengenai aparatur sipil negara yang menduduki jabatan fungsional keahlian pengelola pengadaan barang/jasa di lingkungan Kemnaker RI.",
            "Kompilasi data kepegawaian Biro Perencanaan dan PBJ berkoordinasi dengan Biro Organisasi dan SDM Kemnaker",
            "Per individu/NIP, jenjang jabatan (Pertama, Muda, Madya, Utama), penempatan unit kerja, masa kerja",
            "Bulanan",
            "",
            "RAL.02.04.07 PENGEMBANGAN SDM PENGADAAN KEMNAKER",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210111 : Jumlah Jabatan Fungsional Pengelola PBJ (JF PPBJ) Aktif"
        ),
        (
            12,
            "Data Personil Bersertifikat Kompetensi Pengadaan (Sertifikasi PBJ)",
            "Data pegawai Kemnaker RI yang telah lulus dan memiliki sertifikat kompetensi keahlian pengadaan barang/jasa pemerintah tingkat dasar atau okupasi dari LKPP/BNSP.",
            "Kompilasi produk administratif pendaftaran, ujian sertifikasi, dan validasi sertifikat kompetensi LKPP",
            "Per individu/pegawai, nomor sertifikat kompetensi, masa berlaku lisensi, unit eselon I asal",
            "Bulanan",
            "",
            "RAL.02.04.07 PENGEMBANGAN SDM PENGADAAN KEMNAKER",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210112 : Jumlah Personil Bersertifikat Kompetensi PBJ"
        ),
        (
            13,
            "Data Pejabat Pembuat Komitmen (PPK) dan Pejabat Pengadaan Satker",
            "Data mengenai aparatur yang ditetapkan melalui Keputusan Kuasa Pengguna Anggaran (KPA) sebagai PPK dan Pejabat Pengadaan pada setiap Satuan Kerja Kemnaker.",
            "Kompilasi SK pengangkatan PPK dan Pejabat Pengadaan dari seluruh satker pusat dan UPTP daerah",
            "Per dokumen SK penetapan, nama pejabat, NIP, satker yang diampu, nomor sertifikat PBJ",
            "Tahunan (Pemutakhiran Berkala)",
            "",
            "RAL.02.04.07 PENGEMBANGAN SDM PENGADAAN KEMNAKER",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210113 : Jumlah PPK dan Pejabat Pengadaan Ditetapkan"
        ),
        (
            14,
            "Data Kelompok Kerja (Pokja) Pemilihan UKPBJ Kemnaker",
            "Data penetapan dan penugasan Tim Pokja Pemilihan struktural (Pokja I, II, III, IV, dan Ad-Hoc) dalam melaksanakan pemilihan penyedia paket strategis.",
            "Kompilasi SK Kepala UKPBJ Kemnaker tentang pembagian personil Pokja dan surat tugas pemilihan paket",
            "Per tim Pokja, personil anggota, paket tender yang ditugaskan, beban kerja per Pokja, durasi pemilihan",
            "Bulanan",
            "",
            "RAL.02.04.02 PEMILIHAN PENYEDIA BARANG DAN JASA KEMNAKER",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210114 : Jumlah Penugasan Kelompok Kerja (Pokja) Pemilihan"
        ),
        (
            15,
            "Data Kegiatan Bimbingan Teknis (Bimtek) dan Sosialisasi PBJ",
            "Data pelaksanaan program pelatihan, workshop, bimbingan teknis, dan sosialisasi regulasi baru PBJ bagi aparatur dan penyedia.",
            "Kompilasi pencatatan agenda, daftar hadir peserta, dan materi bimtek pada portal UKPBJ",
            "Per agenda kegiatan, topik/modul pembinaan, narasumber, jumlah peserta hadir, evaluasi kepuasan",
            "Bulanan",
            "",
            "RAL.02.04.07 PENGEMBANGAN SDM PENGADAAN KEMNAKER",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210115 : Frekuensi dan Peserta Bimtek Pengadaan Barang/Jasa"
        ),
        (
            16,
            "Data Layanan Konsultasi dan Pendampingan Pengadaan (Klinik PBJ)",
            "Data permohonan dan pelaksanaan konsultasi teknis, telaah dokumen, probity advice, serta pendampingan pengadaan bagi satuan kerja.",
            "Kompilasi tiket konsultasi daring, buku tamu klinik PBJ, dan berita acara hasil telaah konsultasi",
            "Per tiket konsultasi, satker pemohon, isu bahasan (HPS, spesifikasi teknis, kontrak, e-purchasing), rekomendasi solusi",
            "Bulanan",
            "",
            "RAL.02.04.08 KONSULTASI DAN PENDAMPINGAN PBJ",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210116 : Jumlah Konsultasi dan Pendampingan PBJ Terselesaikan"
        ),
        (
            17,
            "Data Pengaduan Pengadaan dan Sanggah Tender",
            "Data penerimaan dan penanganan sanggah tender, sanggah banding, serta pengaduan masyarakat seputar pelaksanaan PBJ.",
            "Kompilasi modul sanggah SPSE dan formulir kanal pengaduan/Whistleblowing System (WBS) UKPBJ Kemnaker",
            "Per nomor tiket aduan/sanggah, paket pekerjaan, substansi pengaduan, status telaah, rekomendasi tindak lanjut",
            "Bulanan",
            "",
            "RAL.02.04.09 PENGADUAN DAN PENGAWASAN PBJ",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210117 : Jumlah Pengaduan dan Sanggah PBJ Tertangani"
        ),
        (
            18,
            "Data Tingkat Kematangan Kelembagaan UKPBJ (Maturity Level)",
            "Data hasil penilaian dan pengukuran tingkat kematangan kelembagaan UKPBJ Kemnaker RI berdasarkan 4 domain (Proses Bisnis, Kelembagaan, SDM, dan Sistem Informasi) sesuai standar LKPP.",
            "Hasil asesmen mandiri (Self-Assessment) dan validasi tim penilai kematangan UKPBJ LKPP",
            "Skor per variabel, level kematangan (Inisiasi, Berkembang, Proaktif, Kolaboratif, Strategis), bukti dukung dokumen",
            "Tahunan",
            "",
            "RAL.02.04.10 TATA KELOLA DAN KELEMBAGAAN UKPBJ",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210118 : Nilai Tingkat Kematangan UKPBJ Kemnaker"
        ),
        (
            19,
            "Data Indeks Tata Kelola Pengadaan (ITKP) Kemnaker",
            "Data indeks komposit pengukuran pemanfaatan sistem pengadaan, kualifikasi SDM, dan tata kelola pengadaan kementerian yang diterbitkan oleh LKPP.",
            "Hasil rekapitulasi penilaian tahunan LKPP terhadap Kementerian Ketenagakerjaan RI",
            "Nilai total indeks ITKP, komponen pemanfaatan pengadaan digital, persentase e-purchasing, capaian RUP tepat waktu",
            "Tahunan",
            "",
            "RAL.02.04.10 TATA KELOLA DAN KELEMBAGAAN UKPBJ",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210119 : Skor Indeks Tata Kelola Pengadaan (ITKP) Kemnaker"
        ),
        (
            20,
            "Data Dokumen Standar Pemilihan (SDP) dan SOP Tata Kelola PBJ",
            "Data mengenai inventaris regulasi internal, Standar Dokumen Pemilihan (SDP), Surat Edaran, Pedoman Teknis, dan Standar Operasional Prosedur (SOP) PBJ yang aktif di Kemnaker RI.",
            "Kompilasi produk hukum dan peraturan yang diunggah serta dipublikasikan pada repositori portal UKPBJ",
            "Per dokumen regulasi, nomor ketetapan, tahun berlaku, kategori (SOP, SDP, SE, Kepmenaker), tautan unduh berkas",
            "Triwulanan / Saat Ada Perubahan",
            "",
            "RAL.02.04.11 MANAJEMEN PENGETAHUAN DAN REGULASI PBJ",
            "Pendekatan kode SDS menggunakan:\n- SDS 10210120 : Jumlah SOP dan Dokumen Standar PBJ Tersedia"
        ),
    ]

    for row_idx, row_data in enumerate(data_rows, 2):
        is_even = (row_idx % 2 == 0)
        for col_idx, val in enumerate(row_data, 1):
            cell = ws.cell(row=row_idx, column=col_idx)
            cell.value = val
            cell.font = font_body
            cell.border = thin_border
            if not is_even:
                cell.fill = fill_zebra
            
            # Alignments
            if col_idx == 1:
                cell.alignment = Alignment(horizontal="center", vertical="top")
                cell.font = font_bold
            elif col_idx in [6]:
                cell.alignment = Alignment(horizontal="center", vertical="top")
            elif col_idx in [8, 9]:
                cell.alignment = Alignment(horizontal="left", vertical="top", wrap_text=True)
            else:
                cell.alignment = Alignment(horizontal="left", vertical="top", wrap_text=True)
        ws.row_dimensions[row_idx].height = 54

    # Column Widths
    col_widths = {
        'A': 6,
        'B': 30,
        'C': 45,
        'D': 35,
        'E': 32,
        'F': 18,
        'G': 14,
        'H': 32,
        'I': 38
    }
    for col_letter, width in col_widths.items():
        ws.column_dimensions[col_letter].width = width

    wb.save(filepath)
    print(f"File Excel berhasil dibuat di: {filepath}")

if __name__ == '__main__':
    out_path = r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\2026_Form_Daftar_Data_Statistik_UKPBJ_Kemnaker_Pusdatik.xlsx"
    generate_ukpbj_excel(out_path)
