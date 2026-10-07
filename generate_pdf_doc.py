import os
import sys
import hashlib

# Fix hashlib.md5 for Python 3.8 openssl compatibility with reportlab
_orig_md5 = hashlib.md5
def _safe_md5(*args, **kwargs):
    kwargs.pop('usedforsecurity', None)
    return _orig_md5(*args, **kwargs)
hashlib.md5 = _safe_md5

# Fix hashlib.sha256 as well
_orig_sha256 = hashlib.sha256
def _safe_sha256(*args, **kwargs):
    kwargs.pop('usedforsecurity', None)
    return _orig_sha256(*args, **kwargs)
hashlib.sha256 = _safe_sha256

# Fix hashlib.sha1 as well
_orig_sha1 = hashlib.sha1
def _safe_sha1(*args, **kwargs):
    kwargs.pop('usedforsecurity', None)
    return _orig_sha1(*args, **kwargs)
hashlib.sha1 = _safe_sha1

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(40, 805, "Dokumentasi Arsitektur Sistem & Kamus Data — Portal UKPBJ Kemnaker RI")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(40, 798, 555, 798)
            
        # Footer
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(40, 45, 555, 45)
        self.drawString(40, 32, "Kementerian Ketenagakerjaan Republik Indonesia • Biro UKPBJ")
        self.drawRightString(555, 32, f"Halaman {self._pageNumber} dari {page_count}")
        self.restoreState()


def build_pdf(filename="Dokumentasi_Kamus_Data_dan_Struktur_Sistem_UKPBJ_Kemnaker.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=55,
        bottomMargin=55
    )

    styles = getSampleStyleSheet()

    # Custom Palette
    c_navy = colors.HexColor("#0A2540")
    c_blue = colors.HexColor("#1D4ED8")
    c_accent = colors.HexColor("#D97706")
    c_slate_dark = colors.HexColor("#0F172A")
    c_slate_gray = colors.HexColor("#334155")
    c_bg_head = colors.HexColor("#0F294A")
    c_alt_row = colors.HexColor("#F8FAFC")

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=24,
        textColor=c_navy,
        alignment=0,
        spaceAfter=4
    )
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=15,
        textColor=colors.HexColor("#475569"),
        alignment=0,
        spaceAfter=12
    )
    h1_style = ParagraphStyle(
        'Header1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=c_navy,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )
    h2_style = ParagraphStyle(
        'Header2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=c_blue,
        spaceBefore=9,
        spaceAfter=4,
        keepWithNext=True
    )
    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=c_slate_dark,
        spaceAfter=5
    )
    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=12,
        textColor=c_slate_dark,
        leftIndent=10,
        spaceAfter=2.5
    )
    th_style = ParagraphStyle(
        'TableHead',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.white,
        alignment=0
    )
    td_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10.5,
        textColor=c_slate_dark
    )
    td_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10.5,
        textColor=c_navy
    )
    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier-Bold',
        fontSize=7,
        leading=9.5,
        textColor=colors.HexColor("#0369A1")
    )

    story = []

    # ========================== COVER / HEADER ==========================
    story.append(Paragraph("DOKUMENTASI TEKNIS SISTEM INFORMASI", ParagraphStyle('Badge', fontName='Helvetica-Bold', fontSize=8, textColor=c_blue, spaceAfter=3)))
    story.append(Paragraph("Struktur Arsitektur & Kamus Data Portal UKPBJ", title_style))
    story.append(Paragraph("Unit Kerja Pengadaan Barang/Jasa (UKPBJ) — Kementerian Ketenagakerjaan Republik Indonesia", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_blue, spaceBefore=0, spaceAfter=10))

    # Meta box table
    meta_data = [
        [
            Paragraph("<b>Versi Dokumen:</b> 1.2.0 (Tahun Anggaran 2026)", td_style),
            Paragraph("<b>Basis Framework:</b> Next.js 14 App Router + TypeScript", td_style)
        ],
        [
            Paragraph("<b>Database & Storage:</b> Supabase PostgreSQL + CDN Buckets", td_style),
            Paragraph("<b>AI Engine:</b> Google Gemini 2.5 Flash SDK", td_style)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[255, 260])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F1F5F9")),
        ('PADDING', (0, 0), (-1, -1), 5),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LINEBELOW', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))

    # ========================== BAB I: STRUKTUR ARSITEKTUR ==========================
    story.append(Paragraph("BAB I: STRUKTUR ARSITEKTUR SISTEM", h1_style))
    story.append(Paragraph(
        "Sistem Portal UKPBJ Kemnaker RI dirancang menggunakan pola arsitektur <b>Jamstack Modern Terpadu</b> yang memisahkan antara Presentation Layer, Global Business State, Serverless API Handlers, dan Persistent Cloud Storage.",
        body_style
    ))
    
    # Layering Table
    arch_data = [
        [Paragraph("Lapisan (Layer)", th_style), Paragraph("Teknologi / Modul", th_style), Paragraph("Fungsi & Peran Utama", th_style)],
        [
            Paragraph("<b>1. Presentation Layer (Frontend)</b>", td_bold),
            Paragraph("Next.js 14, React 18, Tailwind CSS, Framer Motion, Lucide Icons", td_style),
            Paragraph("Antarmuka publik dan dashboard admin yang responsif, modern, beranimasi interaktif, dan ramah aksesibilitas pemerintah.", td_style)
        ],
        [
            Paragraph("<b>2. State & Caching Layer</b>", td_bold),
            Paragraph("DataContext, LanguageContext (i18n), LocalStorage fallback", td_style),
            Paragraph("Pusat penyimpanan *state* global, sinkronisasi data antar halaman, optimasi multi-bahasa (ID/EN), dan ketahanan offline cache.", td_style)
        ],
        [
            Paragraph("<b>3. Backend & Serverless Layer</b>", td_bold),
            Paragraph("Next.js Serverless Route Handlers (/api/chat, /api/admin/data)", td_style),
            Paragraph("Eksekusi endpoint API backend aman tanpa server fisik, penanganan request asisten AI chatbot, dan validasi data.", td_style)
        ],
        [
            Paragraph("<b>4. Persistence & Database</b>", td_bold),
            Paragraph("Supabase PostgreSQL + Storage Buckets (CDN)", td_style),
            Paragraph("Penyimpanan data relasional dan hosting berkas dokumen lampiran PDF/DOCX serta media galeri foto & warta.", td_style)
        ],
        [
            Paragraph("<b>5. AI Intelligence Layer</b>", td_bold),
            Paragraph("Google GenAI SDK (@google/genai — Gemini 2.5 Flash)", td_style),
            Paragraph("Layanan live chat AI cerdas yang memahami konteks regulasi PBJ, struktur organisasi Kemnaker, dan konsultasi pengadaan.", td_style)
        ],
    ]
    t_arch = Table(arch_data, colWidths=[115, 155, 245])
    t_arch.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_bg_head),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('PADDING', (0, 0), (-1, -1), 4.5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
    ]))
    story.append(t_arch)
    story.append(Spacer(1, 10))

    # Struktur Navigasi Rute
    story.append(Paragraph("Daftar Modul & Struktur Rute Halaman (Routing Structure):", h2_style))
    routes = [
        ("<b>/ (Root)</b> — Halaman Beranda / Landing Page interaktif, statistik pengadaan, banner warta, dan quick access SPSE."),
        ("<b>/admin</b> — CMS Dashboard terpadu untuk CRUD Berita, Paket RUP/Tender, Agenda, Regulasi, SOP, Panduan, & Galeri."),
        ("<b>/tentang</b> — Profil Lembaga, Visi Misi, Tugas Pokok & Fungsi, serta Struktur Organisasi Interaktif."),
        ("<b>/berita & /berita/[id]</b> — Indeks Warta & Berita PBJ dengan filter Multi-Selected Tag kapsul dan halaman baca detail."),
        ("<b>/monitoring</b> — Transparansi Paket Pengadaan RUP/Tender, nilai HPS, satuan kerja, dan unduh dokumen lelang."),
        ("<b>/agenda</b> — Jadwal kegiatan, sosialisasi, pelatihan bimtek, dan rapat aanwijzing pengadaan."),
        ("<b>/informasi/*</b> — Bank data peraturan (/peraturan), SOP (/sop), panduan teknis (/panduan), clearing house, & sertifikasi PBJ."),
        ("<b>/galeri & /layanan</b> — Galeri dokumentasi visual & direktori akses layanan SPSE / LPSE.")
    ]
    for r in routes:
        story.append(Paragraph(f"• {r}", bullet_style))

    story.append(Spacer(1, 10))
    story.append(PageBreak())

    # ========================== BAB II: KAMUS DATA ==========================
    story.append(Paragraph("BAB II: KAMUS DATA LENGKAP (DATA DICTIONARY)", h1_style))
    story.append(Paragraph(
        "Kamus data mendefinisikan secara rinci struktur entitas, nama kolom atribut, tipe data, status keharusan (nullability), serta deskripsi dan contoh data operasional pada sistem.",
        body_style
    ))

    # 1. NewsItem
    story.append(Paragraph("1. Entitas: NewsItem (Warta & Berita PBJ)", h2_style))
    story.append(Paragraph("Menyimpan publikasi warta pengadaan, siaran pers resmi, dan pengumuman lelang.", body_style))
    news_fields = [
        [Paragraph("Atribut", th_style), Paragraph("Tipe Data", th_style), Paragraph("Null", th_style), Paragraph("Deskripsi & Nilai Contoh", th_style)],
        [Paragraph("id", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Identifier unik artikel (contoh: <code>'NEWS-2026-001'</code>)", td_style)],
        [Paragraph("title", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Judul artikel berita pengadaan.", td_style)],
        [Paragraph("category", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Kategori: <code>'Berita PBJ' | 'Pengumuman Lelang' | 'Regulasi' | 'Siaran Pers'</code>", td_style)],
        [Paragraph("author", code_style), Paragraph("string", td_style), Paragraph("Yes", td_style), Paragraph("Penulis / unit penerbit (contoh: <code>'Humas Kemnaker'</code>)", td_style)],
        [Paragraph("date", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Format tanggal tampilan (contoh: <code>'07 Okt 2026'</code>)", td_style)],
        [Paragraph("status", code_style), Paragraph("enum", td_style), Paragraph("No", td_style), Paragraph("Status tayang: <code>'Published' | 'Draft' | 'Archived'</code>", td_style)],
        [Paragraph("excerpt", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Ringkasan singkat artikel untuk preview card.", td_style)],
        [Paragraph("content", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Isi lengkap naskah berita.", td_style)],
        [Paragraph("imageUrl", code_style), Paragraph("string", td_style), Paragraph("Yes", td_style), Paragraph("URL gambar sampul (Supabase Storage/CDN).", td_style)],
        [Paragraph("noticeTitle", code_style), Paragraph("string", td_style), Paragraph("Yes", td_style), Paragraph("Judul kotak pengumuman resmi di detail warta.", td_style)],
        [Paragraph("noticeContent", code_style), Paragraph("string", td_style), Paragraph("Yes", td_style), Paragraph("Naskah kepatuhan tata kelola SPSE Kemnaker.", td_style)],
        [Paragraph("tags", code_style), Paragraph("string[]", td_style), Paragraph("Yes", td_style), Paragraph("Array tag multi-select (contoh: <code>['#UKPBJKemnaker', '#SPSEKemnaker']</code>)", td_style)],
        [Paragraph("syncFrontend", code_style), Paragraph("boolean", td_style), Paragraph("No", td_style), Paragraph("Flag penanda integrasi aktif ke portal publik.", td_style)],
    ]
    t_news = Table(news_fields, colWidths=[85, 65, 30, 335])
    t_news.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_bg_head),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('PADDING', (0, 0), (-1, -1), 3.8),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
    ]))
    story.append(t_news)
    story.append(Spacer(1, 8))

    # 2. ProcurementPackage
    story.append(Paragraph("2. Entitas: ProcurementPackage (Paket Pengadaan / RUP / Tender)", h2_style))
    pkg_fields = [
        [Paragraph("Atribut", th_style), Paragraph("Tipe Data", th_style), Paragraph("Null", th_style), Paragraph("Deskripsi & Nilai Contoh", th_style)],
        [Paragraph("id", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Identifier unik paket tender/pengadaan.", td_style)],
        [Paragraph("code", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Kode RUP / Tender SPSE (contoh: <code>'RUP-2026-0891'</code>)", td_style)],
        [Paragraph("title", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Nama paket pengadaan barang / jasa / pekerjaan.", td_style)],
        [Paragraph("unit", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Satuan kerja pemrakarsa (contoh: <code>'Ditjen Binapenta'</code>)", td_style)],
        [Paragraph("hps", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Nilai Harga Perkiraan Sendiri (contoh: <code>'Rp 450.000.000'</code>)", td_style)],
        [Paragraph("category", code_style), Paragraph("enum", td_style), Paragraph("No", td_style), Paragraph("Jenis: <code>'Tender' | 'Seleksi' | 'Pengadaan Langsung' | 'E-Purchasing'</code>", td_style)],
        [Paragraph("status", code_style), Paragraph("enum", td_style), Paragraph("No", td_style), Paragraph("Tahapan: <code>'Pendaftaran Dibuka' | 'Tahap Evaluasi' | 'Selesai'</code>", td_style)],
        [Paragraph("deadline", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Batas akhir pendaftaran penawaran.", td_style)],
        [Paragraph("method", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Metode pemilihan rekanan/penyedia.", td_style)],
        [Paragraph("downloadUrl", code_style), Paragraph("string", td_style), Paragraph("Yes", td_style), Paragraph("Tautan berkas spesifikasi teknis / KAK lelang.", td_style)],
        [Paragraph("documents", code_style), Paragraph("array", td_style), Paragraph("Yes", td_style), Paragraph("Daftar lampiran dokumen teknis (nama, ukuran, URL).", td_style)],
    ]
    t_pkg = Table(pkg_fields, colWidths=[85, 65, 30, 335])
    t_pkg.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_bg_head),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('PADDING', (0, 0), (-1, -1), 3.8),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
    ]))
    story.append(t_pkg)
    story.append(Spacer(1, 8))

    # 3. AgendaItem
    story.append(Paragraph("3. Entitas: AgendaItem (Jadwal Kegiatan & Acara PBJ)", h2_style))
    agenda_fields = [
        [Paragraph("Atribut", th_style), Paragraph("Tipe Data", th_style), Paragraph("Null", th_style), Paragraph("Deskripsi & Nilai Contoh", th_style)],
        [Paragraph("id", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Identifier unik agenda.", td_style)],
        [Paragraph("title", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Nama kegiatan / seminar / sosialisasi.", td_style)],
        [Paragraph("category", code_style), Paragraph("enum", td_style), Paragraph("No", td_style), Paragraph("Kategori: <code>'Tender' | 'Sosialisasi' | 'Sertifikasi' | 'Bimtek' | 'Rapat'</code>", td_style)],
        [Paragraph("date", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Tanggal pelaksanaan (contoh: <code>'2026-10-15'</code>)", td_style)],
        [Paragraph("time", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Waktu pelaksanaan (contoh: <code>'09:00 - 12:00 WIB'</code>)", td_style)],
        [Paragraph("location", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Tempat fisik / tautan daring Zoom Meeting.", td_style)],
        [Paragraph("organizer", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Unit panitia penyelenggara.", td_style)],
        [Paragraph("status", code_style), Paragraph("enum", td_style), Paragraph("No", td_style), Paragraph("Status: <code>'Terjadwal' | 'Berlangsung' | 'Selesai' | 'Dibatalkan'</code>", td_style)],
        [Paragraph("zoomUrl", code_style), Paragraph("string", td_style), Paragraph("Yes", td_style), Paragraph("Link join video conference online.", td_style)],
    ]
    t_agenda = Table(agenda_fields, colWidths=[85, 65, 30, 335])
    t_agenda.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_bg_head),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('PADDING', (0, 0), (-1, -1), 3.8),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
    ]))
    story.append(t_agenda)
    story.append(Spacer(1, 10))
    story.append(PageBreak())

    # 4. RegulasiItem & 5. SopItem
    story.append(Paragraph("4. Entitas: RegulasiItem (Bank Peraturan & Dasar Hukum)", h2_style))
    reg_fields = [
        [Paragraph("Atribut", th_style), Paragraph("Tipe Data", th_style), Paragraph("Null", th_style), Paragraph("Deskripsi & Nilai Contoh", th_style)],
        [Paragraph("id", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("ID unik berkas regulasi.", td_style)],
        [Paragraph("nomor", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Nomor peraturan resmi (contoh: <code>'Perpres No. 12 Tahun 2021'</code>)", td_style)],
        [Paragraph("tentang", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Judul perihal regulasi.", td_style)],
        [Paragraph("tahun", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Tahun pengesahan aturan.", td_style)],
        [Paragraph("kategori", code_style), Paragraph("enum", td_style), Paragraph("No", td_style), Paragraph("<code>'Peraturan Menteri' | 'Peraturan LKPP' | 'Keputusan Menteri' | 'UU'</code>", td_style)],
        [Paragraph("status", code_style), Paragraph("enum", td_style), Paragraph("No", td_style), Paragraph("Status hukum: <code>'Aktif' | 'Draft' | 'Dicabut'</code>", td_style)],
        [Paragraph("downloadUrl", code_style), Paragraph("string", td_style), Paragraph("Yes", td_style), Paragraph("URL berkas PDF regulasi resmi.", td_style)],
    ]
    t_reg = Table(reg_fields, colWidths=[85, 65, 30, 335])
    t_reg.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_bg_head),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('PADDING', (0, 0), (-1, -1), 3.8),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
    ]))
    story.append(t_reg)
    story.append(Spacer(1, 8))

    # 5. SopItem & 6. PanduanItem
    story.append(Paragraph("5. Entitas: SopItem & PanduanItem (Standar Prosedur & Juknis)", h2_style))
    sop_fields = [
        [Paragraph("Entitas / Atribut", th_style), Paragraph("Tipe Data", th_style), Paragraph("Null", th_style), Paragraph("Deskripsi & Keterangan", th_style)],
        [Paragraph("Sop.kode", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Nomor kode SOP (contoh: <code>'SOP/UKPBJ/01/2026'</code>)", td_style)],
        [Paragraph("Sop.judul", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Nama prosedur standar operasional pelayanan.", td_style)],
        [Paragraph("Sop.status", code_style), Paragraph("enum", td_style), Paragraph("No", td_style), Paragraph("Status dokumen: <code>'Berlaku' | 'Dalam Revisi' | 'Draft'</code>", td_style)],
        [Paragraph("Panduan.role", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Sasaran peran: <code>'PA / KPA' | 'PPK' | 'Pokja Pemilihan' | 'Penyedia'</code>", td_style)],
        [Paragraph("Panduan.title", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Judul buku manual / petunjuk teknis.", td_style)],
        [Paragraph("Panduan.format", code_style), Paragraph("enum", td_style), Paragraph("No", td_style), Paragraph("Format lampiran: <code>'PDF' | 'DOCX' | 'VIDEO' | 'SLIDE' | 'ZIP'</code>", td_style)],
        [Paragraph("Panduan.langkahKerja", code_style), Paragraph("string", td_style), Paragraph("Yes", td_style), Paragraph("Uraian tahapan kerja langkah demi langkah dalam aplikasi.", td_style)],
    ]
    t_sop = Table(sop_fields, colWidths=[95, 65, 30, 325])
    t_sop.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_bg_head),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('PADDING', (0, 0), (-1, -1), 3.8),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
    ]))
    story.append(t_sop)
    story.append(Spacer(1, 8))

    # 7. Galeri & SiteSettings
    story.append(Paragraph("6. Entitas: Media Galeri & SiteSettings", h2_style))
    media_fields = [
        [Paragraph("Entitas / Atribut", th_style), Paragraph("Tipe Data", th_style), Paragraph("Null", th_style), Paragraph("Deskripsi & Keterangan", th_style)],
        [Paragraph("PhotoItem.src", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("Tautan gambar dokumentasi foto resolusi tinggi.", td_style)],
        [Paragraph("VideoMediaItem.url", code_style), Paragraph("string", td_style), Paragraph("No", td_style), Paragraph("URL streaming video dokumentasi (YouTube/Drive).", td_style)],
        [Paragraph("SiteSettings.serverStatus", code_style), Paragraph("enum", td_style), Paragraph("No", td_style), Paragraph("Status sistem: <code>'Normal' | 'Maintenance' | 'High Traffic'</code>", td_style)],
        [Paragraph("SiteSettings.announcementBanner", code_style), Paragraph("string", td_style), Paragraph("Yes", td_style), Paragraph("Teks pesan darurat / *running text* pengumuman penting.", td_style)],
    ]
    t_media = Table(media_fields, colWidths=[115, 60, 30, 310])
    t_media.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_bg_head),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('PADDING', (0, 0), (-1, -1), 3.8),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
    ]))
    story.append(t_media)
    story.append(Spacer(1, 10))

    # ========================== BAB III: PENUTUP ==========================
    story.append(Paragraph("BAB III: SPESIFIKASI OPERASIONAL & PENYIMPANAN", h1_style))
    story.append(Paragraph(
        "Seluruh entitas terhubung secara otomatis ke database cloud PostgreSQL Supabase dengan fitur <i>Realtime Channel</i>. Setiap perubahan data yang dilakukan di CMS Admin (/admin) akan langsung tersinkronisasi ke halaman publik (/berita, /agenda, /monitoring) secara instan tanpa memerlukan proses *build* ulang pada frontend.",
        body_style
    ))
    
    closing_box = [
        [Paragraph("<b>Pengesahan Dokumen Teknis:</b><br/>Dokumen ini disusun sebagai pedoman baku struktur data dan arsitektur pengembang sistem informasi Portal Resmi UKPBJ Kementerian Ketenagakerjaan RI.", td_style)]
    ]
    t_close = Table(closing_box, colWidths=[515])
    t_close.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#EFF6FF")),
        ('BOX', (0, 0), (-1, -1), 1, c_blue),
        ('PADDING', (0, 0), (-1, -1), 7),
    ]))
    story.append(t_close)

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF generated successfully at: {os.path.abspath(filename)}")

if __name__ == "__main__":
    out_dir = os.path.join(os.getcwd(), "public", "docs")
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "Dokumentasi_Kamus_Data_dan_Struktur_Sistem_UKPBJ_Kemnaker.pdf")
    build_pdf(out_file)
    # Also copy to root for quick access
    root_file = os.path.join(os.getcwd(), "Dokumentasi_Kamus_Data_dan_Struktur_Sistem_UKPBJ_Kemnaker.pdf")
    build_pdf(root_file)
