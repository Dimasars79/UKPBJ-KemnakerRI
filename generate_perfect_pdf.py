# -*- coding: utf-8 -*-
"""
Generate a pixel-perfect, 7-page PDF document for:
Dimas_Paket_Arsitektur_UKPBJ.pdf
Using ReportLab (Landscape A4) with EXACTLY 1 page per section and ZERO blank pages.
"""

import os
import hashlib

_orig_md5 = hashlib.md5
def _patched_md5(*args, **kwargs):
    kwargs.pop('usedforsecurity', None)
    return _orig_md5(*args, **kwargs)
hashlib.md5 = _patched_md5

from reportlab.lib.pagesizes import landscape, A4
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """Canvas that adds page numbers and running header/footer."""
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

    def draw_page_decorations(self, total_pages):
        if self._pageNumber > 1:
            self.saveState()
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748B"))
            # Header
            self.drawString(36, 565, "Bimtek Desain Arsitektur Sistem Informasi · Kementerian Ketenagakerjaan 2026")
            self.drawRightString(805, 565, "Paket Arsitektur UKPBJ Kemnaker")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(36, 558, 805, 558)
            
            # Footer
            self.line(36, 30, 805, 30)
            self.drawString(36, 20, "Dokumen Resmi Workshop Tahap 1 - 5 · Tanggal: 5 November 2026")
            self.drawRightString(805, 20, f"Halaman {self._pageNumber} dari {total_pages}")
            self.restoreState()

def build_pdf(filename):
    pdf = SimpleDocTemplate(
        filename,
        pagesize=landscape(A4),
        leftMargin=36,
        rightMargin=36,
        topMargin=46,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    c_title = colors.HexColor("#0F2D59")
    c_sec = colors.HexColor("#174276")
    c_body = colors.HexColor("#1E293B")
    c_blue = colors.HexColor("#0284C7")
    c_muted = colors.HexColor("#64748B")

    style_cover_badge = ParagraphStyle('CoverBadge', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=c_blue)
    style_cover_title = ParagraphStyle('CoverTitle', fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=c_title)
    style_cover_sub = ParagraphStyle('CoverSub', fontName='Helvetica', fontSize=12, leading=16, textColor=c_muted)
    style_cover_meta = ParagraphStyle('CoverMeta', fontName='Helvetica', fontSize=10, leading=16, textColor=c_body)

    style_sec_title = ParagraphStyle('SecTitle', fontName='Helvetica-Bold', fontSize=15, leading=18, textColor=c_title)
    style_sec_sub = ParagraphStyle('SecSub', fontName='Helvetica-Oblique', fontSize=8.5, leading=11, textColor=c_muted)
    style_subhead = ParagraphStyle('SubHead', fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=c_sec)
    
    style_th = ParagraphStyle('TH', fontName='Helvetica-Bold', fontSize=9, leading=11, textColor=c_title)
    style_td = ParagraphStyle('TD', fontName='Helvetica', fontSize=8.5, leading=11, textColor=c_body)
    style_td_b = ParagraphStyle('TDB', fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=c_title)
    style_code = ParagraphStyle('Code', fontName='Courier', fontSize=8, leading=10, textColor=c_title)
    style_code_b = ParagraphStyle('CodeB', fontName='Courier-Bold', fontSize=8.5, leading=11, textColor=c_title)
    style_code_blue = ParagraphStyle('CodeBlue', fontName='Courier-Bold', fontSize=8.5, leading=11, textColor=c_blue)

    story = []

    # ==========================================================
    # HALAMAN 1: COVER
    # ==========================================================
    story.append(Spacer(1, 40))
    story.append(Paragraph("BIMBINGAN TEKNIS DESAIN ARSITEKTUR SISTEM INFORMASI 2026", style_cover_badge))
    story.append(Spacer(1, 10))
    story.append(Paragraph("PAKET DOKUMENTASI ARSITEKTUR PROJECT<br/>PORTAL &amp; LAYANAN TERPADU UKPBJ KEMNAKER RI", style_cover_title))
    story.append(Spacer(1, 10))
    story.append(Paragraph("Studi Kasus: Digitalisasi Layanan Pengadaan, Agenda Bimtek, &amp; Klinik Konsultasi PBJ", style_cover_sub))
    story.append(Spacer(1, 30))

    meta_text = """
    <b>Disusun Oleh</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Dimas &amp; Tim Pengembang UKPBJ Kemnaker<br/>
    <b>Unit Kerja</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Biro Umum / UKPBJ Sekretariat Jenderal Kementerian Ketenagakerjaan RI<br/>
    <b>Narasumber</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Achmad Mu'ammar Afinas<br/>
    <b>Tanggal Rilis</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Kamis, 5 November 2026 (Materi 8 Workshop)<br/>
    <b>Komponen Berkas</b> : 1. Paket Dokumen Arsitektur (.pdf) | 2. Diagram Editable (.drawio)
    """
    story.append(Paragraph(meta_text, style_cover_meta))
    story.append(PageBreak())

    # ==========================================================
    # HALAMAN 2: BAGIAN 1 - RINGKASAN KEBUTUHAN (TAHAP 1)
    # ==========================================================
    story.append(Paragraph("Bagian 1 · Ringkasan Kebutuhan Project (Tahap 1)", style_sec_title))
    story.append(Paragraph("Merujuk Slide 184 &amp; 185: Daftar Kebutuhan Fungsional, Non-Fungsional, Scope, dan Asumsi", style_sec_sub))
    story.append(Spacer(1, 12))

    t1_data = [
        [Paragraph("Kode", style_th), Paragraph("Jenis", style_th), Paragraph("Isi Kebutuhan / Aturan", style_th)],
        [Paragraph("F1", style_td_b), Paragraph("Functional", style_td), Paragraph("Pegawai/PPK melihat status tiket dan kalender jadwal konsultasi pengadaan secara real-time.", style_td)],
        [Paragraph("F2", style_td_b), Paragraph("Functional", style_td), Paragraph("Pegawai/PPK mengajukan tiket konsultasi pengadaan barang/jasa beserta lampiran berkas KAK/HPS.", style_td)],
        [Paragraph("F3", style_td_b), Paragraph("Functional", style_td), Paragraph("Tim Pokja Pemilihan memeriksa berkas pengajuan dan menerbitkan berita acara telaah/rekomendasi.", style_td)],
        [Paragraph("N1", style_td_b), Paragraph("Performance", style_td), Paragraph("95% request melihat jadwal/status selesai dalam ≤ 2 detik saat diuji 500 pengguna bersamaan (concurrent users).", style_td)],
        [Paragraph("N2", style_td_b), Paragraph("Security", style_td), Paragraph("Akun Pegawai A ditolak saat membaca tiket/dokumen konsultasi Pegawai B tanpa izin (wajib respon 403 Forbidden).", style_td)]
    ]
    t1 = Table(t1_data, colWidths=[60, 110, 595])
    t1.setStyle(TableStyle([
        ('LINEABOVE', (0,0), (-1,0), 1.5, c_title),
        ('LINEBELOW', (0,0), (-1,0), 1.5, c_title),
        ('LINEBELOW', (0,1), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t1)
    story.append(Spacer(1, 14))

    story.append(Paragraph("Pengguna, Batas Scope, dan Asumsi Desain:", style_subhead))
    story.append(Spacer(1, 4))
    scope_text = """
    • <b>Pengguna:</b> Pegawai Satker/PPK (Pemohon), Tim Pokja Pemilihan UKPBJ (Approver/Penelaah), dan Admin UKPBJ.<br/>
    • <b>Batas Scope:</b> Pengajuan tiket daring, penjadwalan telaah/tatap muka, notifikasi otomatis status tiket, dan katalog regulasi.<br/>
    • <b>Asumsi:</b> Otentikasi pegawai memanfaatkan Single Sign-On (SSO) SIAPKerja Kemnaker; satu tiket konsultasi ditangani satu tim Pokja.
    """
    story.append(Paragraph(scope_text, style_td))
    story.append(PageBreak())

    # ==========================================================
    # HALAMAN 3: BAGIAN 2 - CATATAN KEPUTUSAN ARSITEKTUR (TAHAP 2)
    # ==========================================================
    story.append(Paragraph("Bagian 2 · Catatan Keputusan Arsitektur (Tahap 2)", style_sec_title))
    story.append(Paragraph("Merujuk Slide 186 &amp; 187: Minimal 2 Keputusan Penting, Alasan, Trade-off, dan Bagian Diagram Terdampak", style_sec_sub))
    story.append(Spacer(1, 10))

    t2_data = [
        [Paragraph("Catatan Keputusan", style_th), Paragraph("Pilihan &amp; Alasan", style_th), Paragraph("Trade-off (Konsekuensi)", style_th), Paragraph("Terdampak di Diagram", style_th)],
        [
            Paragraph("<b>1. Arsitektur Backend:</b><br/>Modular Monolith", style_td),
            Paragraph("<b>Pilihan:</b> Modular Monolith (Next.js/Node.js).<br/><b>Alasan:</b> Ruang lingkup fokus UKPBJ dan dikelola satu tim kecil internal. Lebih sederhana dikelola di awal tanpa overhead network microservices.", style_td),
            Paragraph("Deploy bersama; batas tanggung jawab antarmodul (Konsultasi, Regulasi, Pokja) harus dijaga ketat di level kode.", style_td),
            Paragraph("Kotak: <i>Backend API [Modular monolith]</i><br/>Panah: Pemanggilan internal", style_td)
        ],
        [
            Paragraph("<b>2. Pemrosesan Notifikasi:</b><br/>Asynchronous (Queue)", style_td),
            Paragraph("<b>Pilihan:</b> Asynchronous lewat Antrean.<br/><b>Alasan:</b> Kirim email/WA butuh 2-5 detik. Pemohon tidak boleh tertahan menatap layar loading saat database sudah selesai simpan.", style_td),
            Paragraph("Perlu manajemen antrean dan skenario retry. Transaksi booking tetap sah meski pengiriman notifikasi tertunda.", style_td),
            Paragraph("Panah: <i>Backend API → Notification Service</i><br/>Kotak: Service Notifikasi", style_td)
        ],
        [
            Paragraph("<b>3. Penyimpanan Data:</b><br/>PostgreSQL Relasional", style_td),
            Paragraph("<b>Pilihan:</b> Relational Database (PostgreSQL).<br/><b>Alasan:</b> Memerlukan integritas referensial ketat (ACID), foreign key terstruktur, dan constraint pencegah jadwal bentrok.", style_td),
            Paragraph("Skema tabel harus didefinisikan ketat sejak awal; migrasi kolom perlu skrip terkontrol.", style_td),
            Paragraph("Kotak: <i>Database [PostgreSQL]</i><br/>Panah: SQL Read/Write", style_td)
        ]
    ]
    t2 = Table(t2_data, colWidths=[140, 230, 215, 180])
    t2.setStyle(TableStyle([
        ('LINEABOVE', (0,0), (-1,0), 1.5, c_title),
        ('LINEBELOW', (0,0), (-1,0), 1.5, c_title),
        ('LINEBELOW', (0,1), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t2)
    story.append(Spacer(1, 10))

    rev_text = "<b>Kapan keputusan ditinjau ulang:</b> Ditinjau kembali jika beban konsultasi serentak mencapai >5.000 pengguna bersamaan atau ketika modul lelang membutuhkan server deployment terisolasi demi regulasi audit eksternal."
    story.append(Paragraph(rev_text, style_td))
    story.append(PageBreak())

    # ==========================================================
    # HALAMAN 4: BAGIAN 3 - DIAGRAM KONTEKS DAN CONTAINER (TAHAP 3)
    # ==========================================================
    story.append(Paragraph("Bagian 3 · Diagram Konteks dan Container (Tahap 3)", style_sec_title))
    story.append(Paragraph("Merujuk Slide 167, 169, 186, &amp; 189: Struktur C4 Level 1 &amp; Level 2 Sistem UKPBJ", style_sec_sub))
    story.append(Spacer(1, 10))

    c4_box1 = """
    <b>PENGGUNA (ACTORS)</b><br/><br/>
    • <b>Pegawai / PPK Satker</b><br/>
      [Person - Pemohon]<br/><br/>
    • <b>Pokja Pemilihan PBJ</b><br/>
      [Person - Verifikator]<br/><br/>
    • <b>Administrator UKPBJ</b><br/>
      [Person - Pengelola]
    """
    c4_box2 = """
    <b>BATAS SISTEM UKPBJ KEMNAKER (CONTAINERS)</b><br/><br/>
    <b>1. Web App [Next.js / React]</b><br/>
       UI pada browser, form pengajuan tiket &amp; kalender jadwal<br/>
       └── <i>mengirim HTTPS / JSON ke</i> ──┐<br/><br/>
    <b>2. Backend API [Modular Monolith]</b><br/>
       Validasi otentikasi, aturan jadwal &amp; logika bisnis<br/>
       └── <i>query SQL ke</i> ──┐<br/><br/>
    <b>3. Database [PostgreSQL]</b><br/>
       Penyimpanan master pegawai, tiket konsultasi, &amp; audit trail
    """
    c4_box3 = """
    <b>SISTEM EKSTERNAL</b><br/><br/>
    • <b>SSO SIAPKerja Kemnaker</b><br/>
      [OAuth2 / OIDC Login]<br/><br/>
    • <b>Notification Service</b><br/>
      [Email &amp; WA Gateway]<br/><br/>
    • <b>SiRUP &amp; SPSE LKPP</b><br/>
      [Sync Batch Data RUP]
    """

    t_c4_data = [[
        Paragraph(c4_box1, style_td),
        Paragraph(c4_box2, style_td),
        Paragraph(c4_box3, style_td)
    ]]
    t_c4 = Table(t_c4_data, colWidths=[190, 375, 200])
    t_c4.setStyle(TableStyle([
        ('BOX', (0,0), (0,0), 1, colors.HexColor("#CBD5E1")),
        ('BACKGROUND', (0,0), (0,0), colors.HexColor("#F8FAFC")),
        ('BOX', (1,0), (1,0), 1.5, c_blue),
        ('BACKGROUND', (1,0), (1,0), colors.HexColor("#F1F6FA")),
        ('BOX', (2,0), (2,0), 1, colors.HexColor("#CBD5E1")),
        ('BACKGROUND', (2,0), (2,0), colors.HexColor("#F8FAFC")),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_c4)
    story.append(Spacer(1, 14))

    fn_text = "<b>File Diagram Editable:</b> Disimpan dalam berkas <b>Dimas_Arsitektur_UKPBJ.drawio</b> dengan tata letak minimalis non-AI (kotak hitam-putih standar tanpa warna mencolok) yang siap dibuka dan diedit menggunakan aplikasi draw.io / diagrams.net."
    story.append(Paragraph(fn_text, style_td))
    story.append(PageBreak())

    # ==========================================================
    # HALAMAN 5: BAGIAN 4 - DATA (ERD) DAN INTEGRASI (TAHAP 3)
    # ==========================================================
    story.append(Paragraph("Bagian 4 · Data (ERD) dan Integrasi (Tahap 3)", style_sec_title))
    story.append(Paragraph("Merujuk Slide 188 &amp; 189: Struktur ERD 4 Entitas, Titik Integrasi, dan Kontrak API", style_sec_sub))
    story.append(Spacer(1, 8))

    story.append(Paragraph("1. Struktur Relasi Data (ERD 4 Entitas):", style_subhead))
    story.append(Spacer(1, 4))

    t_erd_data = [
        [Paragraph("Entitas", style_th), Paragraph("Primary Key", style_th), Paragraph("Foreign Key &amp; Relasi", style_th), Paragraph("Atribut Kunci", style_th)],
        [Paragraph("PEGAWAI", style_td_b), Paragraph("id (PK)", style_td), Paragraph("-", style_td), Paragraph("nip, nama, unit_kerja, email", style_td)],
        [Paragraph("POKJA", style_td_b), Paragraph("id (PK)", style_td), Paragraph("-", style_td), Paragraph("kode_pokja, nama_tim, spesialisasi", style_td)],
        [Paragraph("KONSULTASI", style_td_b), Paragraph("id (PK)", style_td), Paragraph("FK pemohon_id → Pegawai.id<br/>FK pokja_id → Pokja.id", style_td), Paragraph("nomor_tiket, topik, tanggal, status", style_td)],
        [Paragraph("TELAAH_REKOMENDASI", style_td_b), Paragraph("id (PK)", style_td), Paragraph("FK konsultasi_id → Konsultasi.id<br/>FK verifikator_id → Pegawai.id", style_td), Paragraph("rekomendasi, catatan, tgl_telaah", style_td)]
    ]
    t_erd = Table(t_erd_data, colWidths=[140, 90, 320, 215])
    t_erd.setStyle(TableStyle([
        ('LINEABOVE', (0,0), (-1,0), 1.5, c_title),
        ('LINEBELOW', (0,0), (-1,0), 1.5, c_title),
        ('LINEBELOW', (0,1), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_erd)
    story.append(Spacer(1, 10))

    story.append(Paragraph("2. Titik Integrasi &amp; Kontrak API (Ambil Jadwal):", style_subhead))
    story.append(Spacer(1, 4))

    api_box_left = """
    <b>GET /api/v1/konsultasi/K01/jadwal</b><br/>
    Authorization: Bearer &lt;token&gt;<br/>
    <font color="#0284C7"><b>200 OK</b></font><br/>
    {<br/>
    &nbsp;&nbsp;"konsultasi_id": "K01",<br/>
    &nbsp;&nbsp;"jadwal": [ { "mulai": "09:00", "status": "DISETUJUI" } ]<br/>
    }
    """
    api_box_right = """
    <b>Error yang disepakati:</b><br/><br/>
    <b>401 UNAUTHORIZED</b><br/>
    Token otentikasi tidak ada atau sudah kedaluwarsa.<br/><br/>
    <b>404 KONSULTASI_TIDAK_ADA</b><br/>
    Nomor tiket konsultasi tidak ditemukan di database.
    """
    t_api_data = [[
        Paragraph(api_box_left, style_code),
        Paragraph(api_box_right, style_td)
    ]]
    t_api = Table(t_api_data, colWidths=[385, 380])
    t_api.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F6FA")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_api)
    story.append(PageBreak())

    # ==========================================================
    # HALAMAN 6: BAGIAN 5 - AKSES DAN CATATAN RISIKO (TAHAP 4)
    # ==========================================================
    story.append(Paragraph("Bagian 5 · Akses dan Catatan Risiko (Tahap 4)", style_sec_title))
    story.append(Paragraph("Merujuk Slide 151, 152, 190, &amp; 191: Matriks Hak Akses RBAC dan 4 Kolom Penanganan Risiko", style_sec_sub))
    story.append(Spacer(1, 6))

    story.append(Paragraph("1. Tabel Akses (RBAC — Siapa Boleh Melakukan Apa):", style_subhead))
    story.append(Spacer(1, 3))

    t_rb_data = [
        [Paragraph("Peran (Role)", style_th), Paragraph("Ajukan Konsultasi", style_th), Paragraph("Lihat Tiket Konsultasi", style_th), Paragraph("Beri Telaah / Rekomendasi", style_th)],
        [Paragraph("Pegawai / PPK", style_td_b), Paragraph("Boleh", style_td), Paragraph("Hanya miliknya", style_td), Paragraph("Tidak", style_td)],
        [Paragraph("Pokja Pemilihan", style_td_b), Paragraph("Boleh", style_td), Paragraph("Semua (sesuai tugas)", style_td), Paragraph("Boleh", style_td)],
        [Paragraph("Admin UKPBJ", style_td_b), Paragraph("Tidak", style_td), Paragraph("Semua", style_td), Paragraph("Tidak", style_td)]
    ]
    t_rb = Table(t_rb_data, colWidths=[190, 190, 190, 195])
    t_rb.setStyle(TableStyle([
        ('LINEABOVE', (0,0), (-1,0), 1.5, c_title),
        ('LINEBELOW', (0,0), (-1,0), 1.5, c_title),
        ('LINEBELOW', (0,1), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_rb)
    story.append(Spacer(1, 8))

    story.append(Paragraph("2. Tiga Catatan Risiko (4 Kolom — Slide 191):", style_subhead))
    story.append(Spacer(1, 3))

    t_rk_data = [
        [Paragraph("Risiko", style_th), Paragraph("Apa yang Terjadi dan Akibatnya", style_th), Paragraph("Cara Mencegah (Tindakan)", style_th), Paragraph("Cara Menguji (Bukti Uji)", style_th)],
        [
            Paragraph("<b>IDOR</b><br/>(Security 1)", style_td),
            Paragraph("Pegawai A ganti ID tiket di URL dan bisa membuka telaah/berkas KAK rahasia milik Pegawai B.", style_td),
            Paragraph("Backend memeriksa kepemilikan data (konsultasi.pemohon == user dari token JWT).", style_td),
            Paragraph("Token Akun A minta data Tiket B, server wajib menolak HTTP 403.<br/><i>(Oleh: Backend Dev)</i>", style_td)
        ],
        [
            Paragraph("<b>XSS</b><br/>(Security 2)", style_td),
            Paragraph("Script di kolom catatan konsultasi dieksekusi di browser Pokja saat membuka review.", style_td),
            Paragraph("Tampilkan input sebagai teks murni (auto-escaping di React/Next.js) &amp; sanitasi.", style_td),
            Paragraph("Input <b>&lt;b&gt;tes&lt;/b&gt;</b> pada form, harus tampil teks apa adanya.<br/><i>(Oleh: QA/Tester)</i>", style_td)
        ],
        [
            Paragraph("<b>Notifikasi Gagal</b><br/>(Reliability)", style_td),
            Paragraph("Email/WA service mati, pemohon tidak menerima konfirmasi nomor tiket konsultasi.", style_td),
            Paragraph("Simpan status sukses di DB (graceful degradation), kirim ulang notifikasi lewat antrean.", style_td),
            Paragraph("Matikan email service, ajukan tiket, pastikan data tiket tetap sah di DB.<br/><i>(Oleh: Backend Dev)</i>", style_td)
        ]
    ]
    t_rk = Table(t_rk_data, colWidths=[120, 260, 210, 175])
    t_rk.setStyle(TableStyle([
        ('LINEABOVE', (0,0), (-1,0), 1.5, c_title),
        ('LINEBELOW', (0,0), (-1,0), 1.5, c_title),
        ('LINEBELOW', (0,1), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_rk)
    story.append(PageBreak())

    # ==========================================================
    # HALAMAN 7: TAHAP 5 - REVIEW BERPASANGAN & CHECKLIST
    # ==========================================================
    story.append(Paragraph("Tahap 5 · Lembar Review Berpasangan (Peer Review)", style_sec_title))
    story.append(Paragraph("Merujuk Slide 192: Penelusuran Fitur dan Catatan Klarifikasi Pasangan", style_sec_sub))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Tindakan yang Ditelusuri dan Diklarifikasi Rekan Pasangan:", style_subhead))
    story.append(Spacer(1, 4))

    rev_checks_text = """
    <b>1. Fitur Pembatalan Tiket:</b> Apakah pegawai bisa membatalkan tiket yang sudah diajukan? → <i>Klarifikasi: Boleh, tetapi hanya untuk tiket miliknya sendiri dan selama statusnya masih 'MENUNGGU' telaah Pokja.</i><br/><br/>
    <b>2. Penanganan Bentrok Jadwal:</b> Bagaimana jika 2 satker memilih slot jadwal konsultasi yang sama pada detik bersamaan? → <i>Klarifikasi: Database PostgreSQL menerapkan constraint pengecekan slot waktu unik sehingga request kedua akan menerima respon konflik 409.</i><br/><br/>
    <b>3. Integritas Notifikasi Eksternal:</b> Apakah kegagalan WhatsApp Gateway membatalkan pengajuan tiket? → <i>Klarifikasi: Tidak. Transaksi database tetap di-commit (graceful degradation) dan antrean background worker akan mencoba mengirim ulang.</i><br/><br/>
    <b>4. Bukti Uji Keamanan:</b> Sudah jelas siapa yang menguji? → <i>Klarifikasi: IDOR diuji oleh Backend Developer menggunakan Postman; XSS diuji oleh QA Tester pada form input antarmuka web.</i>
    """
    story.append(Paragraph(rev_checks_text, style_td))
    story.append(Spacer(1, 16))

    sign_box = """
    <b>STATUS PEMERIKSAAN PASANGAN: LULUS REVIEW</b><br/>
    <font color="#0284C7">Paket Arsitektur Lengkap (5 Bagian) Telah Sesuai dengan Panduan Slide 183 - 193 &amp; Siap Dikumpulkan ke Panitia.</font>
    """
    t_sign = Table([[Paragraph(sign_box, style_td)]], colWidths=[765])
    t_sign.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 1, c_blue),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F6FA")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_sign)

    pdf.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully built: {filename}")

if __name__ == "__main__":
    out_pdf = r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\Dimas_Paket_Arsitektur_UKPBJ.pdf"
    build_pdf(out_pdf)
