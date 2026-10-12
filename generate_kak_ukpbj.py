# -*- coding: utf-8 -*-
"""
Script untuk menghasilkan Dokumen Word (.docx) Kerangka Acuan Kerja (KAK)
Pengembangan Website Portal Informasi dan Sistem Layanan Digital UKPBJ Kemnaker RI TA 2026
Mengacu pada format dan standar dokumen KAK Kementerian Ketenagakerjaan RI (seperti KAK TemanK3 2026)
"""

import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    """Mengatur warna latar belakang sel tabel."""
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    """Mengatur padding sel tabel."""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def add_styled_heading(doc, text, level=1):
    """Menambahkan heading dengan format resmi."""
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    
    run = p.add_run(text)
    run.bold = True
    run.font.name = 'Arial'
    
    if level == 1:
        run.font.size = Pt(13)
        run.font.color.rgb = RGBColor(15, 23, 42) # Slate 900
    elif level == 2:
        run.font.size = Pt(11.5)
        run.font.color.rgb = RGBColor(30, 41, 59) # Slate 800
    else:
        run.font.size = Pt(11)
        run.font.color.rgb = RGBColor(51, 65, 85) # Slate 700
    return p

def add_body_paragraph(doc, text, space_after=6, space_before=0, line_spacing=1.15, is_bold=False):
    """Menambahkan paragraf isi dengan font Arial 11pt standar dokumen dinas."""
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = line_spacing
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    
    run = p.add_run(text)
    run.font.name = 'Arial'
    run.font.size = Pt(11)
    run.font.color.rgb = RGBColor(30, 41, 59)
    run.bold = is_bold
    return p

def add_bullet_item(doc, text, space_after=3, prefix="• ", bold_prefix=None):
    """Menambahkan item bullet point yang rapi."""
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Inches(0.3)
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.15
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    
    if bold_prefix:
        r_pre = p.add_run(bold_prefix + " ")
        r_pre.font.name = 'Arial'
        r_pre.font.size = Pt(11)
        r_pre.font.color.rgb = RGBColor(30, 41, 59)
        r_pre.bold = True
    else:
        r_bullet = p.add_run(prefix)
        r_bullet.font.name = 'Arial'
        r_bullet.font.size = Pt(11)
        r_bullet.font.color.rgb = RGBColor(30, 41, 59)
    
    run = p.add_run(text)
    run.font.name = 'Arial'
    run.font.size = Pt(11)
    run.font.color.rgb = RGBColor(30, 41, 59)
    return p

def build_kak_document(output_path):
    doc = docx.Document()
    
    # Page Setup (A4, Margin Normal 1 inci / 2.54 cm)
    for section in doc.sections:
        section.page_width = Inches(8.27)  # A4 width
        section.page_height = Inches(11.69) # A4 height
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
    
    # -------------------------------------------------------------
    # JUDUL / HEADER DOKUMEN (Sesuai Format KAK TemanK3)
    # -------------------------------------------------------------
    p_title1 = doc.add_paragraph()
    p_title1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title1.paragraph_format.space_before = Pt(0)
    p_title1.paragraph_format.space_after = Pt(2)
    r = p_title1.add_run("KERANGKA ACUAN KERJA (KAK)")
    r.font.name = 'Arial'
    r.font.size = Pt(14)
    r.bold = True
    r.font.color.rgb = RGBColor(15, 23, 42)

    p_title2 = doc.add_paragraph()
    p_title2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title2.paragraph_format.space_after = Pt(4)
    r = p_title2.add_run("PENGEMBANGAN WEBSITE PORTAL INFORMASI DAN SISTEM LAYANAN DIGITAL\nUNIT KERJA PENGADAAN BARANG/JASA (UKPBJ)")
    r.font.name = 'Arial'
    r.font.size = Pt(13)
    r.bold = True
    r.font.color.rgb = RGBColor(15, 23, 42)

    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_after = Pt(18)
    r = p_inst.add_run("BIRO PERENCANAAN DAN PENGADAAN BARANG/JASA\nSEKRETARIAT JENDERAL\nKEMENTERIAN KETENAGAKERJAAN REPUBLIK INDONESIA\nTAHUN ANGGARAN 2026")
    r.font.name = 'Arial'
    r.font.size = Pt(11)
    r.bold = True
    r.font.color.rgb = RGBColor(71, 85, 105)

    # Garis Pembatas Header
    p_sep = doc.add_paragraph()
    p_sep.paragraph_format.space_after = Pt(12)
    p_sep_run = p_sep.add_run("―" * 54)
    p_sep_run.font.name = 'Arial'
    p_sep_run.font.size = Pt(10)
    p_sep_run.font.color.rgb = RGBColor(148, 163, 184)
    p_sep.alignment = WD_ALIGN_PARAGRAPH.CENTER

    # -------------------------------------------------------------
    # 1. PENDAHULUAN
    # -------------------------------------------------------------
    add_styled_heading(doc, "1. Pendahuluan", level=1)
    add_body_paragraph(
        doc,
        "Pengadaan Barang dan Jasa Pemerintah (PBJP) memegang peranan yang sangat strategis dalam pelaksanaan roda pemerintahan, pembangunan nasional, serta penyediaan fasilitas pelayanan publik yang berkualitas. Di lingkungan Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker RI), efektivitas dan integritas pelaksanaan pengadaan barang/jasa secara langsung berdampak pada capaian program-program prioritas ketenagakerjaan, mulai dari pelatihan vokasi, sertifikasi kompetensi, keselamatan dan kesehatan kerja (K3), hingga perluasan kesempatan kerja."
    )
    add_body_paragraph(
        doc,
        "Sejalan dengan arahan Presiden Republik Indonesia terkait percepatan Transformasi Digital dan implementasi Sistem Pemerintahan Berbasis Elektronik (SPBE) sebagaimana diatur dalam Peraturan Presiden Nomor 95 Tahun 2018, instansi pemerintah dituntut untuk menyelenggarakan pelayanan publik secara terpadu, transparan, akuntabel, dan mudah diakses oleh seluruh pemangku kepentingan. Pengadaan barang dan jasa pemerintah modern tidak lagi hanya berfokus pada proses transaksi administratif di hilir, melainkan harus didukung oleh keterbukaan informasi yang proaktif, kanal komunikasi yang responsif, serta kemudahan akses regulasi dan konsultasi bagi seluruh Satuan Kerja (Satker) maupun pelaku usaha."
    )
    add_body_paragraph(
        doc,
        "Unit Kerja Pengadaan Barang/Jasa (UKPBJ) Kementerian Ketenagakerjaan RI yang berkedudukan di bawah Biro Perencanaan dan Pengadaan Barang/Jasa, Sekretariat Jenderal Kemnaker RI, merupakan pusat keunggulan (Centre of Excellence) pengadaan barang dan jasa di lingkungan Kemnaker RI. UKPBJ Kemnaker memiliki tanggung jawab membina, mengoordinasikan, dan menyelenggarakan proses pemilihan penyedia untuk seluruh satuan kerja di tingkat pusat maupun Unit Pelaksana Teknis Pusat (UPTP) di seluruh Indonesia."
    )
    add_body_paragraph(
        doc,
        "Kondisi eksisting saat ini menunjukkan bahwa penyebaran informasi terkait PBJ di lingkungan Kemnaker RI masih memiliki beberapa kendala, antara lain:"
    )
    add_bullet_item(doc, "Keterbatasan kanal informasi publik resmi yang terpusat mengenai profil, program kerja, maklumat pelayanan, dan struktur kelembagaan UKPBJ Kemnaker;", bold_prefix="a.")
    add_bullet_item(doc, "Penyampaian pengumuman tender, agenda bimbingan teknis (Bimtek), sosialisasi regulasi baru, dan pembaruan sistem yang seringkali belum tersampaikan secara cepat dan merata kepada seluruh PPK, Pokja, dan calon penyedia;", bold_prefix="b.")
    add_bullet_item(doc, "Belum tersedianya repositori regulasi dan dokumen standar pengadaan (SOP, template formulir, panduan e-katalog) yang tertata rapi serta mudah dicari secara digital;", bold_prefix="c.")
    add_bullet_item(doc, "Kanal konsultasi dan aduan pengadaan yang masih mengandalkan tatap muka atau media perpesanan personal, sehingga proses penanganan belum terdokumentasi dan terukur dengan baik;", bold_prefix="d.")
    add_bullet_item(doc, "Kebutuhan asisten informasi cerdas berbasis kecerdasan buatan (Artificial Intelligence) yang mampu melayani pertanyaan umum seputar regulasi PBJ selama 24 jam nonstop secara interaktif;", bold_prefix="e.")
    add_bullet_item(doc, "Tuntutan penyediaan portal yang ramah disabilitas (inklusif/aksesibilitas digital) serta mendukung dwibahasa (Bahasa Indonesia dan Bahasa Inggris) untuk mitra internasional.", bold_prefix="f.")
    add_body_paragraph(
        doc,
        "Berdasarkan latar belakang tersebut, dipandang sangat penting dan mendesak untuk melaksanakan kegiatan Pengembangan Website Portal Informasi dan Sistem Layanan Digital UKPBJ Kementerian Ketenagakerjaan RI, guna mewujudkan ekosistem pengadaan barang dan jasa yang profesional, transparan, dan akuntabel."
    )

    # -------------------------------------------------------------
    # 2. DASAR HUKUM
    # -------------------------------------------------------------
    add_styled_heading(doc, "2. Dasar Hukum", level=1)
    dasar_hukum = [
        "Undang-Undang Nomor 13 Tahun 2003 tentang Ketenagakerjaan;",
        "Undang-Undang Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik sebagaimana telah diubah terakhir dengan Undang-Undang Nomor 1 Tahun 2024;",
        "Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik;",
        "Peraturan Presiden Nomor 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah sebagaimana telah diubah dengan Peraturan Presiden Nomor 12 Tahun 2021;",
        "Peraturan Presiden Nomor 95 Tahun 2018 tentang Sistem Pemerintahan Berbasis Elektronik (SPBE);",
        "Peraturan Presiden Nomor 39 Tahun 2019 tentang Satu Data Indonesia;",
        "Peraturan Lembaga Kebijakan Pengadaan Barang/Jasa Pemerintah (LKPP) Nomor 10 Tahun 2021 tentang Unit Kerja Pengadaan Barang/Jasa (UKPBJ);",
        "Peraturan Lembaga Kebijakan Pengadaan Barang/Jasa Pemerintah (LKPP) Nomor 12 Tahun 2021 tentang Pedoman Pelaksanaan Pengadaan Barang/Jasa Pemerintah Melalui Penyedia;",
        "Peraturan Menteri Ketenagakerjaan Nomor 1 Tahun 2021 tentang Organisasi dan Tata Kerja Kementerian Ketenagakerjaan;",
        "Keputusan Menteri Ketenagakerjaan Nomor 264 Tahun 2021 tentang Penetapan Unit Kerja Pengadaan Barang/Jasa di Lingkungan Kementerian Ketenagakerjaan;",
        "Daftar Isian Pelaksanaan Anggaran (DIPA) Sekretariat Jenderal Kementerian Ketenagakerjaan RI Tahun Anggaran 2026."
    ]
    for i, dh in enumerate(dasar_hukum):
        add_bullet_item(doc, dh, bold_prefix=f"{i+1}.")

    # -------------------------------------------------------------
    # 3. MAKSUD DAN TUJUAN
    # -------------------------------------------------------------
    add_styled_heading(doc, "3. Maksud dan Tujuan", level=1)
    add_styled_heading(doc, "3.1. Maksud", level=2)
    add_body_paragraph(
        doc,
        "Maksud dilaksanakannya pekerjaan Pengembangan Website Portal Informasi dan Sistem Layanan Digital UKPBJ Kemnaker RI adalah:"
    )
    add_bullet_item(doc, "Membangun portal resmi satu pintu (single-window portal) yang memuat seluruh informasi kelembagaan, regulasi, publikasi, dan layanan UKPBJ Kemnaker RI;", bold_prefix="a.")
    add_bullet_item(doc, "Menyediakan sarana komunikasi publik dan edukasi pengadaan yang transparan, interaktif, dan modern bagi satuan kerja dan penyedia barang/jasa;", bold_prefix="b.")
    add_bullet_item(doc, "Memperkuat tata kelola pengadaan barang dan jasa yang bersih (good governance) melalui digitalisasi alur informasi, kanal pengaduan (whistleblowing), dan transparansi proses.", bold_prefix="c.")

    add_styled_heading(doc, "3.2. Tujuan", level=2)
    add_body_paragraph(
        doc,
        "Tujuan yang hendak dicapai melalui pelaksanaan kegiatan ini adalah:"
    )
    add_bullet_item(doc, "Mewujudkan antarmuka portal web yang responsif, berkecepatan tinggi, aman, dan berestetika tinggi berbasis teknologi web mutakhir (Next.js & TypeScript);", bold_prefix="a.")
    add_bullet_item(doc, "Menyediakan fitur AI Assistant (Virtual Consultant) berbasis Knowledge Base PBJ Kemnaker untuk memberikan jawaban instan terkait pertanyaan pengadaan, regulasi, dan FAQ secara interaktif dan dwibahasa;", bold_prefix="b.")
    add_bullet_item(doc, "Menyediakan Panel Administrasi (Back-Office CMS) yang intuitif dan terintegrasi untuk pengelolaan agenda, berita, pengumuman tender, regulasi, galeri dokumentasi, dan statistik secara mandiri;", bold_prefix="c.")
    add_bullet_item(doc, "Memfasilitasi fitur aksesibilitas digital (Text-to-Speech pembaca layar, pengaturan ukuran teks, mode gelap/terang, dan kontras tinggi) guna memenuhi standar inklusivitas pelayanan publik;", bold_prefix="d.")
    add_bullet_item(doc, "Memudahkan koordinasi antara UKPBJ, Pejabat Pembuat Komitmen (PPK), Kelompok Kerja (Pokja) Pemilihan, Pejabat Pengadaan, Auditor Pengawas Internal, serta mitra pelaku usaha.", bold_prefix="e.")

    # -------------------------------------------------------------
    # 4. SASARAN
    # -------------------------------------------------------------
    add_styled_heading(doc, "4. Sasaran", level=1)
    add_body_paragraph(
        doc,
        "Sasaran yang ingin dicapai dari kegiatan ini adalah terwujudnya sistem perangkat lunak Website Portal Informasi dan Layanan Digital UKPBJ Kemnaker RI yang telah teruji, terpasang (deployed), dan dapat diakses secara publik dan aman oleh seluruh pengguna internal maupun eksternal."
    )

    # -------------------------------------------------------------
    # 5. PENERIMA MANFAAT
    # -------------------------------------------------------------
    add_styled_heading(doc, "5. Penerima Manfaat", level=1)
    add_body_paragraph(
        doc,
        "Adapun pihak-pihak yang menjadi penerima manfaat dari pengembangan sistem ini adalah:"
    )
    penerima = [
        "Pimpinan Tinggi Madya dan Pratama di lingkungan Kementerian Ketenagakerjaan RI;",
        "Kepala Biro Perencanaan dan Pengadaan Barang/Jasa beserta seluruh jajaran pengelola UKPBJ Kemnaker;",
        "Pejabat Pembuat Komitmen (PPK), Kelompok Kerja (Pokja) Pemilihan, dan Pejabat Pengadaan pada seluruh Satker Pusat dan Unit Pelaksana Teknis Pusat (UPTP) Kemnaker se-Indonesia;",
        "Aparatur Pengawas Internal Pemerintah (APIP) / Inspektorat Jenderal Kementerian Ketenagakerjaan RI;",
        "Pelaku Usaha, Asosiasi Rekanan, dan Penyedia Barang/Jasa Pemerintah;",
        "Masyarakat umum, pemerhati pengadaan barang/jasa, dan pencari informasi publik;",
        "Administrator Teknis Pengelola Portal UKPBJ Kemnaker RI."
    ]
    for i, pm in enumerate(penerima):
        add_bullet_item(doc, pm, bold_prefix=f"{i+1}.")

    # -------------------------------------------------------------
    # 6. LOKASI KEGIATAN
    # -------------------------------------------------------------
    add_styled_heading(doc, "6. Lokasi Kegiatan", level=1)
    add_body_paragraph(
        doc,
        "Kegiatan Pengembangan Website UKPBJ Kemnaker RI dilaksanakan pada Kantor Kementerian Ketenagakerjaan Republik Indonesia, beralamat di Jalan Jenderal Gatot Subroto Kav. 51, Jakarta Selatan, DKI Jakarta 12950, dengan koordinasi bersama Pusat Data dan Teknologi Informasi Ketenagakerjaan (Pusdatik) serta Biro Perencanaan dan PBJ."
    )

    # -------------------------------------------------------------
    # 7. RUANG LINGKUP PEKERJAAN
    # -------------------------------------------------------------
    add_styled_heading(doc, "7. Ruang Lingkup Pekerjaan", level=1)
    add_body_paragraph(
        doc,
        "Ruang lingkup kegiatan pengembangan website UKPBJ Kemnaker RI mencakup tahapan-tahapan sebagai berikut:"
    )

    add_styled_heading(doc, "7.1. Desain dan Analisis Sistem (System Design & Analysis)", level=2)
    add_bullet_item(doc, "Penyusunan alur proses bisnis (flowchart) portal layanan, tata kelola informasi, dan interaksi pengguna publik serta admin;", bold_prefix="a.")
    add_bullet_item(doc, "Perancangan User Interface (UI) dan User Experience (UX) dengan prinsip Modern Government Web Design yang bersih, elegan, profesional, responsif di seluruh resolusi layar (desktop, tablet, mobile), serta mematuhi identitas korporat Kemnaker RI;", bold_prefix="b.")
    add_bullet_item(doc, "Perancangan arsitektur data, skema database relasional (ERD), dan struktur State Management frontend.", bold_prefix="c.")

    add_styled_heading(doc, "7.2. Model Arsitektur Sistem Informasi Terpadu UKPBJ", level=2)
    add_body_paragraph(
        doc,
        "Arsitektur Sistem Informasi dan Portal Layanan Digital UKPBJ Kementerian Ketenagakerjaan RI dirancang dengan pendekatan modular, berbasis layanan (Service-Oriented & Micro-frontend ready), aman, dan terintegrasi penuh. Model arsitektur ini memadukan 7 (tujuh) pilar utama sistem yang saling terhubung secara harmonis sebagaimana digambarkan pada diagram berikut:"
    )

    # Sisipkan Gambar Diagram Arsitektur jika tersedia
    diag_img_path = r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\Arsitektur_Sistem_UKPBJ_Kemnaker_RI.png"
    if os.path.exists(diag_img_path):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.paragraph_format.space_before = Pt(8)
        p_img.paragraph_format.space_after = Pt(4)
        run_img = p_img.add_run()
        run_img.add_picture(diag_img_path, width=Inches(6.3))

        p_caption = doc.add_paragraph()
        p_caption.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_caption.paragraph_format.space_after = Pt(12)
        r_cap = p_caption.add_run("Gambar 1. Model Cetak Biru Arsitektur Sistem Informasi & Portal Layanan Digital UKPBJ Kemnaker RI")
        r_cap.font.name = 'Arial'
        r_cap.font.size = Pt(9.5)
        r_cap.italic = True
        r_cap.font.color.rgb = RGBColor(100, 116, 139)

    add_body_paragraph(
        doc,
        "Penjelasan pilar utama model arsitektur sistem meliputi:"
    )
    add_bullet_item(doc, "Layanan & Fitur Terpadu: Menyediakan 6 pilar layanan inti, yaitu Pusat Informasi Publik PBJ, Repositori Regulasi & Dokumen Pemilihan, Agenda & Bimtek Terintegrasi, Layanan Konsultasi & Pengaduan (Whistleblowing System), AI Virtual Consultant, serta Fitur Aksesibilitas Inklusif (Text-to-Speech, Zoom font, High Contrast, Dark/Light mode).", bold_prefix="1.")
    add_bullet_item(doc, "Portal Aplikasi & Modul: Terdiri dari Portal Publik Web, Modul AI Assistant Chatbot, Portal Admin CMS (Back-Office), Portal PPK & Pokja Pemilihan, Portal Verifikator Aduan, dan Portal Eksekutif Pimpinan.", bold_prefix="2.")
    add_bullet_item(doc, "Web Service & API Gateway: Mengintegrasikan sistem UKPBJ dengan ekosistem SPSE/LPSE Kemnaker, SiRUP LKPP, E-Katalog/Toko Daring, Google Gemini AI API, WhatsApp Helpdesk Gateway, dan Single Sign-On (SSO) SIAPKerja.", bold_prefix="3.")
    add_bullet_item(doc, "Alur Proses Bisnis Terpadu: Memandu siklus interaksi pengguna dari tahap akses portal, pemilihan layanan, eksplorasi regulasi, konsultasi AI 24/7, pengajuan aduan/tiket terenkripsi, verifikasi pokja/APIP, hingga penyelesaian yang akuntabel.", bold_prefix="4.")
    add_bullet_item(doc, "Manajemen Data & Repositori: Mengelola Master Data Satker & Pokja, Data Publikasi Berita/Agenda, Dokumen Regulasi PDF, Data Konsultasi & Aduan, Knowledge Base AI Vector Embeddings, serta Audit Trail Log aktivitas.", bold_prefix="5.")
    add_bullet_item(doc, "Infrastruktur Teknologi Mutakhir: Dibangun menggunakan Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, PostgreSQL/Supabase, Cloud Object Storage, dan Cloud Data Center Kemnaker RI.", bold_prefix="6.")
    add_bullet_item(doc, "Keamanan & Governance (Security Architecture): Dilengkapi enkripsi TLS 1.3, Role-Based Access Control (RBAC), JWT Authentication, Anti-XSS & CSRF, Web Application Firewall (WAF), proteksi DDoS, dan kepatuhan standar SPBE BSSN.", bold_prefix="7.")

    add_styled_heading(doc, "7.3. Pengembangan Fitur Portal Publik (Frontend Modul)", level=2)
    frontend_features = [
        ("Halaman Beranda (Home):", "Menampilkan Hero Banner dinamis, Sambutan Kepala UKPBJ, Tautan Cepat Sistem Eksternal (SPSE/LPSE, SiRUP, Toko Daring, E-Katalog), Statistik Real-time PBJ, Agenda Terbaru, dan Highlight Berita Pengadaan."),
        ("Profil Kelembagaan:", "Menyajikan Visi & Misi, Tugas Pokok dan Fungsi (Tupoksi), Maklumat Pelayanan, Struktur Organisasi Interaktif bertingkat, Daftar Tim Pokja Pemilihan (Pokja I, Pokja II, Pokja III, Pokja IV, Pokja Khusus), serta Tingkat Kematangan Kelembagaan UKPBJ."),
        ("Pusat Informasi & Berita:", "Menampilkan Berita Pengadaan Terkini, Pengumuman Lelang/Seleksi, Pembaruan Regulasi, serta Agenda Kegiatan Bimtek dengan filter pencarian dan detail artikel yang komprehensif."),
        ("Pusat Regulasi & Unduhan:", "Repositori terstruktur peraturan pengadaan (Undang-Undang, Perpres, Peraturan LKPP, Permenaker, Kepmenaker, Standar Dokumen Pemilihan/SDP, dan Template Surat) dengan fitur pencarian instan, filter tahun/kategori, dan pengunduhan file PDF langsung."),
        ("Agenda Kegiatan & Bimtek:", "Kalender dan daftar agenda pengadaan terstruktur (tanggal, waktu, lokasi daring/luring, zoom link, status kegiatan, dan deskripsi materi)."),
        ("Galeri Dokumentasi Multi-Media:", "Katalog foto dan video dokumentasi kegiatan pembinaan, sosialisasi, dan monitoring PBJ dengan tampilan modal lightbox interaktif."),
        ("Pusat Bantuan & FAQ:", "Daftar Frequently Asked Questions (FAQ) interaktif dengan filter kategori layanan."),
        ("Layanan Konsultasi & Pengaduan (Whistleblowing):", "Formulir penyampaian konsultasi pengadaan, integrasi Helpdesk WhatsApp resmi UKPBJ, serta kanal pelaporan pengaduan pengadaan yang aman."),
        ("Fitur Asisten Cerdas (AI Virtual Assistant):", "Integrasi chatbot kecerdasan buatan (Gemini API) yang memiliki Knowledge Base PBJ Kemnaker (Perpres 12/2021, Peraturan LKPP, alur tender, FAQ) yang mampu menjawab pertanyaan pengguna secara otomatis, interaktif, dan dwibahasa."),
        ("Aksesibilitas & Inklusivitas Digital:", "Fitur Text-to-Speech (pembaca suara artikel/halaman), Pengatur Ukuran Font (Zoom A+/A-), Penyesuaian Kontras Tinggi, serta Mode Terang & Gelap (Light/Dark Theme Switcher)."),
        ("Dukungan Dwibahasa (Bilingual):", "Dukungan navigasi dan konten dalam Bahasa Indonesia dan Bahasa Inggris.")
    ]
    for title, desc in frontend_features:
        add_bullet_item(doc, desc, bold_prefix=title)

    add_styled_heading(doc, "7.3. Pengembangan Panel Administrasi (Back-Office CMS)", level=2)
    admin_features = [
        ("Dashboard Statistik & Monitoring:", "Ringkasan metrik konten, jumlah berita aktif, agenda terjadwal, dokumen regulasi terunggah, serta log aktivitas pengguna."),
        ("Manajemen Berita & Pengumuman:", "Fasilitas Create, Read, Update, Delete (CRUD) artikel, pengunggahan gambar cover, pengaturan status publish/draft, dan sinkronisasi ke portal publik."),
        ("Manajemen Agenda PBJ:", "Pencatatan agenda kegiatan, penentuan kategori, tanggal, waktu, lokasi, tautan virtual meeting (Zoom/Teams), dan pengelolaan status kegiatan."),
        ("Manajemen Regulasi & File Dokumen:", "Pengunggahan dan pengkatalogan file dokumen regulasi (PDF/Word), penomoran surat, penerbit, dan tahun penetapan."),
        ("Manajemen Galeri & Dokumentasi:", "Pengelolaan album foto kegiatan, judul, deskripsi, dan integrasi video."),
        ("Manajemen Struktur Organisasi & Pokja:", "Pembaruan data pejabat struktural, fungsional pengadaan, dan susunan Pokja Pemilihan."),
        ("Manajemen Pengguna & Hak Akses:", "Autentikasi aman berbasis peran (Role-Based Access Control - RBAC) untuk Super Admin dan Operator Konten."),
        ("Audit Trail & Log Keamanan:", "Perekaman riwayat aktivitas pengubahan data dan autentikasi untuk akuntabilitas sistem.")
    ]
    for title, desc in admin_features:
        add_bullet_item(doc, desc, bold_prefix=title)

    add_styled_heading(doc, "7.4. Spesifikasi Teknis Perangkat Lunak dan Arsitektur", level=2)
    add_bullet_item(doc, "Frontend Framework: Next.js 14+ (App Router architecture) dengan React 18 dan TypeScript untuk performa tinggi, modularitas, dan SEO-friendly;", bold_prefix="a.")
    add_bullet_item(doc, "Styling & UI Components: Tailwind CSS, Framer Motion untuk transisi interaktif, dan Lucide React Icons;", bold_prefix="b.")
    add_bullet_item(doc, "Database & Penyimpanan: PostgreSQL / Supabase dan Local Storage Synchronization untuk manajemen data relasional yang andal;", bold_prefix="c.")
    add_bullet_item(doc, "Integrasi AI: Google Gemini API dengan retrieval knowledge base regulasi pengadaan nasional dan internal Kemnaker;", bold_prefix="d.")
    add_bullet_item(doc, "Protokol Keamanan: Penerapan HTTPS/TLS 1.3, proteksi Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), Content Security Policy (CSP), serta input sanitization.", bold_prefix="e.")

    add_styled_heading(doc, "7.5. Dokumentasi Teknis dan Panduan Pengguna", level=2)
    add_bullet_item(doc, "Penyusunan Dokumen Spesifikasi Kebutuhan Perangkat Lunak (Software Requirement Specification - SRS);", bold_prefix="a.")
    add_bullet_item(doc, "Penyusunan Dokumen Desain Teknis (System Architecture, UML Use Case, Class Diagram, ERD Database);", bold_prefix="b.")
    add_bullet_item(doc, "Penyusunan Dokumen Petunjuk Operasional (User Manual Administrator) untuk pengelolaan portal melalui panel back-office;", bold_prefix="c.")
    add_bullet_item(doc, "Penyusunan Dokumen Petunjuk Pengguna Publik (Public User Guide).", bold_prefix="d.")

    add_styled_heading(doc, "7.6. Uji Coba, Penerapan (Deployment), dan Pengujian Keamanan", level=2)
    add_bullet_item(doc, "Pengujian fungsionalitas menyeluruh (Functional & Black Box Testing) terhadap seluruh fitur dan komponen web;", bold_prefix="a.")
    add_bullet_item(doc, "Pengujian kompatibilitas lintas peramban (Cross-Browser Compatibility: Chrome, Edge, Firefox, Safari) dan lintas perangkat (Desktop, Tablet, Smartphone);", bold_prefix="b.")
    add_bullet_item(doc, "Pengujian keamanan awal (Vulnerability Assessment & Penetration Testing Readiness);", bold_prefix="c.")
    add_bullet_item(doc, "Pemasangan dan konfigurasi sistem pada server staging dan production resmi Kementerian Ketenagakerjaan RI.", bold_prefix="d.")

    add_styled_heading(doc, "7.7. Alih Pengetahuan (Transfer of Knowledge) dan Pelatihan", level=2)
    add_body_paragraph(
        doc,
        "Penyedia jasa wajib melaksanakan bimbingan teknis (Bimtek) dan transfer knowledge kepada Tim Pengelola Portal / Admin UKPBJ Kemnaker RI serta tim teknis Pusdatik, meliputi tata cara operasional back-office, pemeliharaan konten, konfigurasi environment, dan penanganan insiden dasar."
    )

    add_styled_heading(doc, "7.8. Masa Pemeliharaan (Maintenance) dan Garansi Sistem", level=2)
    add_body_paragraph(
        doc,
        "Penyedia jasa wajib memberikan layanan garansi dan pemeliharaan sistem selama minimal 6 (enam) bulan hingga 1 (satu) tahun kalender terhitung sejak Berita Acara Serah Terima (BAST) pekerjaan ditandatangani. Lingkup pemeliharaan meliputi perbaikan bug/error, penyesuaian minor konten, serta konsultasi teknis operasional."
    )

    # -------------------------------------------------------------
    # 8. KEBUTUHAN TENAGA AHLI
    # -------------------------------------------------------------
    add_styled_heading(doc, "8. Kebutuhan Tenaga Ahli", level=1)
    add_body_paragraph(
        doc,
        "Untuk menyelesaikan pekerjaan pengembangan sistem ini secara tepat waktu dan berkualitas, dibutuhkan tim pelaksana dengan kualifikasi keahlian sebagai berikut:"
    )

    experts = [
        ("Project Manager (1 Orang)", [
            "Pendidikan minimal S-1/S-2 Teknik Informatika / Ilmu Komputer / Sistem Informasi / Teknik Elektro;",
            "Memiliki sertifikasi manajemen proyek (PMP / Agile Scrum Master / setara);",
            "Pengalaman kerja profesional minimal 5 (lima) tahun dalam memimpin proyek pengembangan perangkat lunak instansi pemerintah;",
            "Memiliki kemampuan komunikasi kepemimpinan yang baik serta mampu menyusun laporan manajerial secara terstruktur."
        ]),
        ("System Analyst (1 Orang)", [
            "Pendidikan minimal S-1 Teknik Informatika / Ilmu Komputer / Sistem Informasi;",
            "Memiliki sertifikasi keahlian di bidang Analisis Sistem;",
            "Pengalaman kerja profesional minimal 3 (tiga) tahun dalam analisis kebutuhan sistem, pemodelan use-case, UML, dan proses bisnis layanan publik;",
            "Mampu menerjemahkan regulasi pengadaan barang/jasa ke dalam arsitektur fungsional sistem."
        ]),
        ("UI/UX Designer (1 Orang)", [
            "Pendidikan minimal S-1 Desain Komunikasi Visual / Ilmu Komputer / Sistem Informasi;",
            "Pengalaman minimal 3 (tiga) tahun dalam perancangan antarmuka aplikasi web pemerintah modern;",
            "Menguasai tools design modern (Figma), prinsip Design System, responsive layout, dan standar aksesibilitas web (WCAG 2.1 AA)."
        ]),
        ("Lead Full Stack / Frontend Developer (1 Orang)", [
            "Pendidikan minimal S-1 Teknik Informatika / Ilmu Komputer / Sistem Informasi;",
            "Pengalaman kerja minimal 3 (tiga) tahun dalam pengembangan aplikasi web modern menggunakan Next.js, React, TypeScript, dan Tailwind CSS;",
            "Menguasai integrasi RESTful API, asynchronous state management, dan teknik optimasi performa web;",
            "Berpengalaman dalam implementasi sistem multibahasa dan integrasi AI Assistant."
        ]),
        ("Backend & Database Developer (1 Orang)", [
            "Pendidikan minimal S-1 Teknik Informatika / Ilmu Komputer / Sistem Informasi;",
            "Pengalaman kerja minimal 3 (tiga) tahun dalam perancangan RESTful API, arsitektur database relasional (PostgreSQL/Supabase), dan object storage;",
            "Menguasai best practices keamanan aplikasi web (autentikasi JWT/OAuth, sanitasi input, mitigasi kerentanan OWASP Top 10)."
        ]),
        ("Quality Assurance (QA) & Security Specialist (1 Orang)", [
            "Pendidikan minimal S-1 Teknik Informatika / Ilmu Komputer / Sistem Informasi;",
            "Pengalaman kerja minimal 2 (dua) tahun dalam pengujian perangkat lunak (Manual & Automated Testing);",
            "Mampu menyusun skenario uji (Test Case, Test Plan), uji fungsionalitas, uji beban, serta pengecekan celah keamanan dasar aplikasi web."
        ])
    ]

    for title, reqs in experts:
        add_styled_heading(doc, title, level=2)
        for r_item in reqs:
            add_bullet_item(doc, r_item, bold_prefix="•")

    # -------------------------------------------------------------
    # 9. TAHAPAN DAN JADWAL PELAKSANAAN
    # -------------------------------------------------------------
    add_styled_heading(doc, "9. Tahapan dan Jadwal Pelaksanaan", level=1)
    add_body_paragraph(
        doc,
        "Pelaksanaan pekerjaan pengembangan website UKPBJ Kemnaker RI direncanakan berlangsung selama 3 (tiga) bulan kalender (12 minggu kerja), dengan rincian matriks tahapan pelaksanaan sebagai berikut:"
    )

    # Buat Tabel Jadwal Pelaksanaan
    table_jadwal = doc.add_table(rows=1, cols=6)
    table_jadwal.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_jadwal.autofit = False

    headers = ["No", "Tahapan Kegiatan", "Bulan 1", "Bulan 2", "Bulan 3", "Output / Keluaran"]
    col_widths = [Inches(0.4), Inches(2.5), Inches(0.8), Inches(0.8), Inches(0.8), Inches(2.0)]

    hdr_cells = table_jadwal.rows[0].cells
    for idx, text in enumerate(headers):
        hdr_cells[idx].text = text
        set_cell_background(hdr_cells[idx], "0F172A") # Slate 900
        set_cell_margins(hdr_cells[idx], top=120, bottom=120, left=100, right=100)
        p = hdr_cells[idx].paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        for run in p.runs:
            run.font.name = 'Arial'
            run.font.size = Pt(9.5)
            run.bold = True
            run.font.color.rgb = RGBColor(255, 255, 255)

    jadwal_data = [
        ("1", "Analisis Kebutuhan & Penyusunan Dokumen Perancangan", "✓", "", "", "Dokumen SRS & Desain Wireframe"),
        ("2", "Desain UI/UX & Prototyping Sistem", "✓", "", "", "Desain Interaktif & Design Tokens"),
        ("3", "Pengembangan Modul Frontend (Portal Publik)", "✓", "✓", "", "Modul Beranda, Profil, Regulasi, Agenda"),
        ("4", "Pengembangan Back-Office CMS (Admin Panel)", "", "✓", "", "Dashboard Admin & Manajemen Konten"),
        ("5", "Integrasi AI Assistant & Aksesibilitas Web", "", "✓", "✓", "Fitur Chatbot AI & Voice Reader"),
        ("6", "Pengujian Sistem (QA, UAT, & Security Test)", "", "", "✓", "Laporan Hasil Uji Coba & Dokumen UAT"),
        ("7", "Deployment Staging/Production & Pelatihan Admin", "", "", "✓", "Sistem Live & Berita Acara Bimtek"),
        ("8", "Penyusunan Dokumentasi Akhir & BAST", "", "", "✓", "Buku Panduan, Dokumen Teknis, BAST")
    ]

    for row_item in jadwal_data:
        row_cells = table_jadwal.add_row().cells
        for c_idx, val in enumerate(row_item):
            row_cells[c_idx].text = val
            set_cell_margins(row_cells[c_idx], top=80, bottom=80, left=100, right=100)
            p = row_cells[c_idx].paragraphs[0]
            if c_idx in [0, 2, 3, 4]:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            else:
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            for run in p.runs:
                run.font.name = 'Arial'
                run.font.size = Pt(9)
                run.font.color.rgb = RGBColor(30, 41, 59)

    doc.add_paragraph().paragraph_format.space_before = Pt(8)

    # -------------------------------------------------------------
    # 10. KELUARAN (OUTPUT) PEKERJAAN
    # -------------------------------------------------------------
    add_styled_heading(doc, "10. Keluaran (Output) yang Diharapkan", level=1)
    add_body_paragraph(
        doc,
        "Keluaran (Deliverables) yang wajib diserahkan oleh penyedia jasa pada akhir pelaksanaan pekerjaan terdiri atas:"
    )
    outputs = [
        ("Source Code Aplikasi & Build Artifact:", "Seluruh source code aplikasi portal frontend dan backend berbasis Next.js, TypeScript, serta konfigurasi basis data yang tersimpan rapi dalam repositori Git resmi Kemnaker RI;"),
        ("Sistem Berjalan (Live System):", "Aplikasi Website Portal UKPBJ Kemnaker RI yang telah terpasang, terkonfigurasi, dan berjalan optimal pada infrastruktur server Kementerian Ketenagakerjaan RI;"),
        ("Dokumentasi Teknis:", "Dokumen SRS (Software Requirement Specification), Dokumen Arsitektur & Perancangan Sistem, serta Diagram Skema Basis Data;"),
        ("User Manual (Buku Petunjuk Operasional):", "Buku panduan pengoperasian sistem dalam format digital (PDF) baik untuk Administrator pengelola konten maupun untuk publik;"),
        ("Laporan Hasil Pengujian (UAT Report):", "Berita Acara dan Laporan Hasil Uji Coba Fungsionalitas (User Acceptance Testing) yang ditandatangani oleh Tim Penguji UKPBJ;"),
        ("Laporan Pelaksanaan Pelatihan (Transfer Knowledge):", "Laporan dan dokumentasi pelaksanaan bimbingan teknis alih pengetahuan kepada tim teknis pengelola;"),
        ("Laporan Akhir Pekerjaan:", "Laporan komprehensif pelaksanaan seluruh rangkaian kegiatan pengembangan sistem.")
    ]
    for title, desc in outputs:
        add_bullet_item(doc, desc, bold_prefix=title)

    # -------------------------------------------------------------
    # 11. HAK KEKAYAAN INTELEKTUAL DAN KEAMANAN INFORMASI
    # -------------------------------------------------------------
    add_styled_heading(doc, "11. Hak Kekayaan Intelektual dan Keamanan Informasi", level=1)
    add_bullet_item(doc, "Seluruh hak kekayaan intelektual (copyright/intellectual property), source code, database, dan dokumentasi yang dihasilkan dari pekerjaan ini menjadi Hak Milik Penuh Pemerintah Republik Indonesia c.q. Kementerian Ketenagakerjaan RI;", bold_prefix="a.")
    add_bullet_item(doc, "Penyedia jasa wajib menandatangani Perjanjian Kerahasiaan (Non-Disclosure Agreement / NDA) dan dilarang menyebarluaskan, menduplikasi, atau menyerahkan source code serta data kepada pihak ketiga;", bold_prefix="b.")
    add_bullet_item(doc, "Penyedia jasa wajib mematuhi standar dan kebijakan keamanan siber yang ditetapkan oleh Pusdatik Kemnaker RI dan Badan Siber dan Sandi Negara (BSSN).", bold_prefix="c.")

    # -------------------------------------------------------------
    # 12. RENCANA ANGGARAN BIAYA (RAB)
    # -------------------------------------------------------------
    add_styled_heading(doc, "12. Rencana Anggaran Biaya (RAB)", level=1)
    add_body_paragraph(
        doc,
        "Pembiayaan untuk pekerjaan Pengembangan Website Portal Informasi dan Sistem Layanan Digital UKPBJ Kementerian Ketenagakerjaan RI dibebankan pada DIPA Sekretariat Jenderal Kementerian Ketenagakerjaan Tahun Anggaran 2026, dengan pagu indikatif sebesar Rp. 385.000.000,- (Tiga Ratus Delapan Puluh Lima Juta Rupiah) termasuk pajak-pajak yang berlaku."
    )

    # Tabel Rincian Estimasi Biaya
    table_rab = doc.add_table(rows=1, cols=5)
    table_rab.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_rab.autofit = False

    rab_headers = ["No", "Komponen Pembiayaan", "Volume / Durasi", "Biaya Satuan (Rp)", "Total Biaya (Rp)"]
    for idx, text in enumerate(rab_headers):
        c = table_rab.rows[0].cells[idx]
        c.text = text
        set_cell_background(c, "0F172A")
        set_cell_margins(c, top=120, bottom=120, left=100, right=100)
        p = c.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        for run in p.runs:
            run.font.name = 'Arial'
            run.font.size = Pt(9.5)
            run.bold = True
            run.font.color.rgb = RGBColor(255, 255, 255)

    rab_data = [
        ("1", "Honorarium Tenaga Ahli (Project Manager, Analyst, UI/UX, Dev, QA)", "6 Orang x 3 Bulan", "-", "245.000.000"),
        ("2", "Desain Arsitektur, Integrasi AI & Aksesibilitas Digital", "1 Paket Sistem", "-", "55.000.000"),
        ("3", "Pengujian Sistem, UAT, dan Vulnerability Assessment", "1 Paket Uji Coba", "-", "30.000.000"),
        ("4", "Penyusunan Dokumentasi Teknis, SRS, & Buku Panduan", "1 Paket Dokumen", "-", "20.000.000"),
        ("5", "Bimbingan Teknis, Transfer Knowledge & Pendampingan Awal", "2 Sesi Pelatihan", "-", "15.000.000"),
        ("6", "Garansi & Pemeliharaan Sistem (Maintenance)", "1 Paket (12 Bulan)", "-", "20.000.000"),
        ("", "TOTAL RENCANA ANGGARAN BIAYA (TERMASUK PPN)", "", "", "385.000.000")
    ]

    for row_item in rab_data:
        row_cells = table_rab.add_row().cells
        is_total = (row_item[0] == "")
        for c_idx, val in enumerate(row_item):
            row_cells[c_idx].text = val
            set_cell_margins(row_cells[c_idx], top=80, bottom=80, left=100, right=100)
            if is_total:
                set_cell_background(row_cells[c_idx], "F1F5F9")
            p = row_cells[c_idx].paragraphs[0]
            if c_idx in [0, 2]:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            elif c_idx in [3, 4]:
                p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
            else:
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            for run in p.runs:
                run.font.name = 'Arial'
                run.font.size = Pt(9)
                run.bold = is_total
                if is_total:
                    run.font.color.rgb = RGBColor(15, 23, 42)
                else:
                    run.font.color.rgb = RGBColor(30, 41, 59)

    doc.add_paragraph().paragraph_format.space_before = Pt(8)

    # -------------------------------------------------------------
    # 13. PENUTUP & PENGESAHAN
    # -------------------------------------------------------------
    add_styled_heading(doc, "13. Penutup", level=1)
    add_body_paragraph(
        doc,
        "Demikian Kerangka Acuan Kerja (KAK) Pengembangan Website Portal Informasi dan Sistem Layanan Digital UKPBJ Kementerian Ketenagakerjaan Republik Indonesia ini disusun untuk menjadi pedoman bagi semua pihak terkait dalam pelaksanaan proses pemilihan penyedia, pelaksanaan teknis pekerjaan, hingga serah terima hasil pekerjaan."
    )

    # Blok Tanda Tangan (Format Dinas Resmi Sesuai Contoh KAK)
    p_ttd_space = doc.add_paragraph()
    p_ttd_space.paragraph_format.space_before = Pt(24)

    table_ttd = doc.add_table(rows=1, cols=2)
    table_ttd.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_ttd.autofit = False

    cell_left = table_ttd.rows[0].cells[0]
    cell_right = table_ttd.rows[0].cells[1]

    cell_left.text = ""  # Kosong (kolom kiri)

    p_right = cell_right.paragraphs[0]
    p_right.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p_right.paragraph_format.line_spacing = 1.15
    
    r_tgl = p_right.add_run("Jakarta,       Mei 2026\n\n")
    r_tgl.font.name = 'Arial'
    r_tgl.font.size = Pt(11)
    
    r_jab = p_right.add_run("Kepala Biro Perencanaan dan Pengadaan Barang/Jasa\nselaku Kuasa Pengguna Anggaran / PPK,\n\n\n\n\n\n")
    r_jab.font.name = 'Arial'
    r_jab.font.size = Pt(11)
    r_jab.bold = True
    
    r_nama = p_right.add_run("(...............................................................)\n")
    r_nama.font.name = 'Arial'
    r_nama.font.size = Pt(11)
    r_nama.bold = True
    
    r_nip = p_right.add_run("NIP. ........................................................")
    r_nip.font.name = 'Arial'
    r_nip.font.size = Pt(11)

    # Simpan Dokumen Word
    doc.save(output_path)
    print(f"Dokumen KAK berhasil disimpan di: {output_path}")

if __name__ == '__main__':
    target = r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\KAK_Pengembangan_Website_UKPBJ_Kemnaker_RI_2026.docx"
    build_kak_document(target)
