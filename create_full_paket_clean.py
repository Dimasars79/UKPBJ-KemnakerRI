# -*- coding: utf-8 -*-
"""
Script to create the Master Word document (.docx) with EXACT 1-PAGE PER SECTION
Ensuring zero spillover, zero blank pages, and perfect slide-like layout.
Uses paragraph.paragraph_format.page_break_before = True on headings instead of add_page_break().
"""

import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=60, bottom=60, left=100, right=100):
    """Set compact padding (in twips/dxa: 20 dxa = 1 pt). 60 dxa = 3 pt."""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_borders(cell, top="none", bottom="none", left="none", right="none", 
                     color="CBD5E1", sz="4"):
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = OxmlElement('w:tcBorders')
    
    borders = {'top': top, 'bottom': bottom, 'left': left, 'right': right}
    for b_name, b_val in borders.items():
        node = OxmlElement(f'w:{b_name}')
        if b_val == "none":
            node.set(qn('w:val'), 'none')
        else:
            node.set(qn('w:val'), b_val)
            node.set(qn('w:sz'), sz)
            node.set(qn('w:space'), '0')
            node.set(qn('w:color'), color)
        tcBorders.append(node)
    tcPr.append(tcBorders)

def prevent_row_split(table):
    """Prevent table rows from splitting across pages."""
    for row in table.rows:
        trPr = row._tr.get_or_add_trPr()
        trPr.append(parse_xml(f'<w:cantSplit {nsdecls("w")}/>'))

def add_header(doc, title_text, subtitle_text="", page_break=True):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(2)
    if page_break:
        p.paragraph_format.page_break_before = True

    run = p.add_run(title_text)
    run.font.name = "Segoe UI"
    run.font.size = Pt(16)
    run.font.bold = True
    run.font.color.rgb = RGBColor(15, 45, 89)

    if subtitle_text:
        p2 = doc.add_paragraph()
        p2.paragraph_format.space_before = Pt(0)
        p2.paragraph_format.space_after = Pt(6)
        run2 = p2.add_run(subtitle_text)
        run2.font.name = "Segoe UI"
        run2.font.size = Pt(9)
        run2.font.italic = True
        run2.font.color.rgb = RGBColor(71, 85, 105)

def build_full_doc(output_path):
    doc = docx.Document()
    
    # Page setup: A4 Landscape with compact margins
    for section in doc.sections:
        section.page_width = Inches(11.69)   # A4 Landscape width
        section.page_height = Inches(8.27)  # A4 Landscape height
        section.top_margin = Inches(0.4)    # 0.4 inch = 28.8 pt
        section.bottom_margin = Inches(0.4)
        section.left_margin = Inches(0.7)
        section.right_margin = Inches(0.7)

    COLOR_TITLE = RGBColor(15, 45, 89)      # #0F2D59
    COLOR_SECTION = RGBColor(23, 66, 118)   # #174276
    COLOR_BODY = RGBColor(30, 41, 59)       # #1E293B
    COLOR_BLUE = RGBColor(21, 101, 192)     # #1565C0
    COLOR_MUTED = RGBColor(71, 85, 105)     # #475569

    # ==========================================================
    # HALAMAN 1: COVER
    # ==========================================================
    p_badge = doc.add_paragraph()
    p_badge.paragraph_format.space_before = Pt(20)
    p_badge.paragraph_format.space_after = Pt(6)
    r_badge = p_badge.add_run("BIMBINGAN TEKNIS DESAIN ARSITEKTUR SISTEM INFORMASI 2026")
    r_badge.font.name = "Segoe UI"
    r_badge.font.size = Pt(11)
    r_badge.font.bold = True
    r_badge.font.color.rgb = COLOR_BLUE

    p_cov_title = doc.add_paragraph()
    p_cov_title.paragraph_format.space_before = Pt(0)
    p_cov_title.paragraph_format.space_after = Pt(6)
    r_cov_t = p_cov_title.add_run("PAKET DOKUMENTASI ARSITEKTUR PROJECT\nPORTAL & LAYANAN TERPADU UKPBJ KEMNAKER RI")
    r_cov_t.font.name = "Segoe UI"
    r_cov_t.font.size = Pt(22)
    r_cov_t.font.bold = True
    r_cov_t.font.color.rgb = COLOR_TITLE

    p_cov_desc = doc.add_paragraph()
    p_cov_desc.paragraph_format.space_before = Pt(0)
    p_cov_desc.paragraph_format.space_after = Pt(18)
    r_cov_d = p_cov_desc.add_run("Studi Kasus: Digitalisasi Layanan Pengadaan, Agenda Bimtek, & Klinik Konsultasi PBJ")
    r_cov_d.font.name = "Segoe UI"
    r_cov_d.font.size = Pt(12)
    r_cov_d.font.color.rgb = COLOR_MUTED

    p_meta = doc.add_paragraph()
    p_meta.paragraph_format.space_before = Pt(0)
    p_meta.paragraph_format.line_spacing = 1.25
    meta_runs = [
        ("Disusun Oleh\t: ", True), ("Dimas & Tim Pengembang UKPBJ Kemnaker\n", False),
        ("Unit Kerja\t: ", True), ("Biro Umum / UKPBJ Sekretariat Jenderal Kemnaker RI\n", False),
        ("Narasumber\t: ", True), ("Achmad Mu'ammar Afinas\n", False),
        ("Tanggal Rilis\t: ", True), ("Kamis, 5 November 2026 (Materi 8 Workshop)\n", False),
        ("Komponen Berkas\t: ", True), ("1. Paket Dokumen Arsitektur (.pdf) | 2. Diagram Editable (.drawio)", False)
    ]
    for m_label, is_bold in meta_runs:
        r_m = p_meta.add_run(m_label)
        r_m.font.name = "Segoe UI"
        r_m.font.size = Pt(10.5)
        r_m.font.bold = is_bold
        r_m.font.color.rgb = COLOR_BODY

    # ==========================================================
    # HALAMAN 2: BAGIAN 1 - RINGKASAN KEBUTUHAN (TAHAP 1)
    # ==========================================================
    add_header(doc, "Bagian 1 · Ringkasan Kebutuhan Project (Tahap 1)", 
               "Merujuk Slide 184 & 185: Daftar Kebutuhan Fungsional, Non-Fungsional, Scope, dan Asumsi", page_break=True)

    table_b1 = doc.add_table(rows=6, cols=3)
    table_b1.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_b1.autofit = False
    prevent_row_split(table_b1)

    widths_b1 = [Inches(0.9), Inches(1.8), Inches(7.5)]
    for row in table_b1.rows:
        for idx, width in enumerate(widths_b1):
            row.cells[idx].width = width

    headers_b1 = ["Kode", "Jenis", "Isi Kebutuhan / Aturan"]
    for idx, text in enumerate(headers_b1):
        cell = table_b1.cell(0, idx)
        set_cell_background(cell, "FFFFFF")
        set_cell_margins(cell, top=60, bottom=60, left=80, right=80)
        set_cell_borders(cell, top="single", bottom="single", color="0F2D59", sz="16")
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        run = p.add_run(text)
        run.font.name = "Segoe UI"
        run.font.size = Pt(9.5)
        run.font.bold = True
        run.font.color.rgb = COLOR_TITLE

    data_b1 = [
        ("F1", "Functional", "Pegawai/PPK melihat status tiket dan kalender jadwal konsultasi pengadaan secara real-time."),
        ("F2", "Functional", "Pegawai/PPK mengajukan tiket konsultasi pengadaan barang/jasa beserta lampiran berkas KAK/HPS."),
        ("F3", "Functional", "Tim Pokja Pemilihan memeriksa berkas pengajuan dan menerbitkan berita acara telaah/rekomendasi."),
        ("N1", "Performance", "95% request melihat jadwal/status selesai dalam ≤ 2 detik saat diuji 500 pengguna bersamaan (concurrent users)."),
        ("N2", "Security", "Akun Pegawai A ditolak saat membaca tiket/dokumen konsultasi Pegawai B tanpa izin (wajib respon 403 Forbidden).")
    ]

    for r_idx, (c1, c2, c3) in enumerate(data_b1, start=1):
        for c_idx, val in enumerate([c1, c2, c3]):
            cell = table_b1.cell(r_idx, c_idx)
            set_cell_background(cell, "FFFFFF")
            set_cell_margins(cell, top=50, bottom=50, left=80, right=80)
            set_cell_borders(cell, bottom="single", color="E2E8F0", sz="6")
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            run = p.add_run(val)
            run.font.name = "Segoe UI"
            run.font.size = Pt(9)
            if c_idx == 0:
                run.font.bold = True
                run.font.color.rgb = COLOR_TITLE
            else:
                run.font.color.rgb = COLOR_BODY

    p_scope = doc.add_paragraph()
    p_scope.paragraph_format.space_before = Pt(8)
    p_scope.paragraph_format.space_after = Pt(2)
    r_sc1 = p_scope.add_run("Pengguna, Batas Scope, dan Asumsi Desain:")
    r_sc1.font.name = "Segoe UI"
    r_sc1.font.size = Pt(9.5)
    r_sc1.font.bold = True
    r_sc1.font.color.rgb = COLOR_SECTION

    scope_points = [
        "• Pengguna: Pegawai Satker/PPK (Pemohon), Tim Pokja Pemilihan UKPBJ (Approver/Penelaah), dan Admin UKPBJ.",
        "• Batas Scope: Pengajuan tiket daring, penjadwalan telaah/tatap muka, notifikasi otomatis status tiket, dan katalog dokumen regulasi.",
        "• Asumsi: Otentikasi pegawai memanfaatkan Single Sign-On (SSO) SIAPKerja Kemnaker; satu tiket konsultasi ditangani oleh satu tim Pokja."
    ]
    for pt in scope_points:
        p_pt = doc.add_paragraph()
        p_pt.paragraph_format.space_before = Pt(0)
        p_pt.paragraph_format.space_after = Pt(1)
        r_pt = p_pt.add_run(pt)
        r_pt.font.name = "Segoe UI"
        r_pt.font.size = Pt(8.5)
        r_pt.font.color.rgb = COLOR_BODY

    # ==========================================================
    # HALAMAN 3: BAGIAN 2 - CATATAN KEPUTUSAN ARSITEKTUR (TAHAP 2)
    # ==========================================================
    add_header(doc, "Bagian 2 · Catatan Keputusan Arsitektur (Tahap 2)", 
               "Merujuk Slide 186 & 187: Minimal 2 Keputusan Penting, Alasan, Trade-off, dan Bagian Diagram Terdampak", page_break=True)

    table_b2 = doc.add_table(rows=4, cols=4)
    table_b2.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_b2.autofit = False
    prevent_row_split(table_b2)

    widths_b2 = [Inches(1.8), Inches(3.0), Inches(2.9), Inches(2.5)]
    for row in table_b2.rows:
        for idx, width in enumerate(widths_b2):
            row.cells[idx].width = width

    headers_b2 = ["Catatan Keputusan", "Pilihan & Alasan", "Trade-off (Konsekuensi)", "Terdampak di Diagram"]
    for idx, text in enumerate(headers_b2):
        cell = table_b2.cell(0, idx)
        set_cell_background(cell, "FFFFFF")
        set_cell_margins(cell, top=60, bottom=60, left=80, right=80)
        set_cell_borders(cell, top="single", bottom="single", color="0F2D59", sz="16")
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        run = p.add_run(text)
        run.font.name = "Segoe UI"
        run.font.size = Pt(9.5)
        run.font.bold = True
        run.font.color.rgb = COLOR_TITLE

    data_b2 = [
        ("1. Arsitektur Backend:\nModular Monolith", 
         "Pilihan: Modular Monolith (Next.js/Node.js).\nAlasan: Ruang lingkup fokus UKPBJ dan dikelola satu tim kecil internal. Lebih sederhana dikelola di awal tanpa overhead network microservices.",
         "Deploy bersama; batas tanggung jawab antarmodul (Konsultasi, Regulasi, Pokja) harus dijaga ketat di level kode.",
         "Kotak: Backend API [Modular monolith]\nPanah: Pemanggilan fungsi internal"),
        
        ("2. Pemrosesan Notifikasi:\nAsynchronous (Queue)", 
         "Pilihan: Asynchronous lewat Antrean.\nAlasan: Kirim email/WA butuh 2-5 detik. Pemohon tidak boleh tertahan menatap layar loading saat database sudah selesai simpan.",
         "Perlu manajemen antrean dan skenario retry. Transaksi booking tetap sah meski pengiriman notifikasi tertunda.",
         "Panah: Backend API → Notification Service\nKotak: Service Notifikasi"),
        
        ("3. Penyimpanan Data:\nPostgreSQL Relasional", 
         "Pilihan: Relational Database (PostgreSQL).\nAlasan: Memerlukan integritas referensial ketat (ACID), foreign key terstruktur, dan constraint pencegah jadwal bentrok.",
         "Skema tabel harus didefinisikan ketat sejak awal; migrasi kolom perlu skrip terkontrol.",
         "Kotak: Database [PostgreSQL]\nPanah: SQL Read/Write")
    ]

    for r_idx, row_data in enumerate(data_b2, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table_b2.cell(r_idx, c_idx)
            set_cell_background(cell, "FFFFFF")
            set_cell_margins(cell, top=50, bottom=50, left=80, right=80)
            set_cell_borders(cell, bottom="single", color="E2E8F0", sz="6")
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            run = p.add_run(val)
            run.font.name = "Segoe UI"
            run.font.size = Pt(8.5)
            if c_idx == 0:
                run.font.bold = True
                run.font.color.rgb = COLOR_TITLE
            else:
                run.font.color.rgb = COLOR_BODY

    p_rev = doc.add_paragraph()
    p_rev.paragraph_format.space_before = Pt(8)
    p_rev.paragraph_format.space_after = Pt(0)
    r_rev = p_rev.add_run("Kapan keputusan ditinjau ulang: ")
    r_rev.font.name = "Segoe UI"
    r_rev.font.size = Pt(9)
    r_rev.font.bold = True
    r_rev.font.color.rgb = COLOR_TITLE

    r_rev2 = p_rev.add_run("Ditinjau kembali jika beban konsultasi serentak mencapai >5.000 pengguna bersamaan atau ketika modul lelang membutuhkan server deployment terisolasi demi regulasi audit eksternal.")
    r_rev2.font.name = "Segoe UI"
    r_rev2.font.size = Pt(9)
    r_rev2.font.color.rgb = COLOR_BODY

    # ==========================================================
    # HALAMAN 4: BAGIAN 3 - DIAGRAM KONTEKS DAN CONTAINER (TAHAP 3)
    # ==========================================================
    add_header(doc, "Bagian 3 · Diagram Konteks dan Container (Tahap 3)", 
               "Merujuk Slide 167, 169, 186, & 189: Struktur C4 Level 1 & Level 2 Sistem UKPBJ", page_break=True)

    p_diag_box = doc.add_paragraph()
    p_diag_box.paragraph_format.space_before = Pt(0)
    p_diag_box.paragraph_format.space_after = Pt(4)
    r_db_t = p_diag_box.add_run("Struktur Diagram Container C4 (Tersedia file .drawio untuk diedit):")
    r_db_t.font.name = "Segoe UI"
    r_db_t.font.size = Pt(10)
    r_db_t.font.bold = True
    r_db_t.font.color.rgb = COLOR_SECTION

    table_c4 = doc.add_table(rows=1, cols=3)
    table_c4.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_c4.autofit = False
    prevent_row_split(table_c4)

    t_c4_widths = [Inches(2.5), Inches(4.7), Inches(3.0)]
    for idx, w in enumerate(t_c4_widths):
        table_c4.rows[0].cells[idx].width = w

    c1 = table_c4.rows[0].cells[0]
    set_cell_background(c1, "F8FAFC")
    set_cell_margins(c1, top=100, bottom=100, left=100, right=100)
    set_cell_borders(c1, top="single", bottom="single", left="single", right="single", color="CBD5E1", sz="6")
    p1 = c1.paragraphs[0]
    p1.add_run("PENGGUNA (ACTORS)\n\n").font.bold = True
    p1.add_run("• Pegawai / PPK Satker\n  [Person - Pemohon]\n\n• Pokja Pemilihan PBJ\n  [Person - Verifikator]\n\n• Administrator UKPBJ\n  [Person - Pengelola]").font.size = Pt(9)

    c2 = table_c4.rows[0].cells[1]
    set_cell_background(c2, "F1F6FA")
    set_cell_margins(c2, top=100, bottom=100, left=120, right=120)
    set_cell_borders(c2, top="single", bottom="single", left="single", right="single", color="0284C7", sz="10")
    p2 = c2.paragraphs[0]
    p2.add_run("BATAS SISTEM UKPBJ KEMNAKER (CONTAINERS)\n\n").font.bold = True
    p2.add_run("1. Web App [Next.js/React]\n   UI browser, form pengajuan tiket & dashboard\n   └── kirim HTTPS/JSON ke ──┐\n\n").font.size = Pt(9)
    p2.add_run("2. Backend API [Modular Monolith]\n   Validasi otentikasi, aturan jadwal & logika bisnis\n   └── query SQL ke ──┐\n\n").font.size = Pt(9)
    p2.add_run("3. Database [PostgreSQL]\n   Penyimpanan data tiket, master pokja, audit trail").font.size = Pt(9)

    c3 = table_c4.rows[0].cells[2]
    set_cell_background(c3, "F8FAFC")
    set_cell_margins(c3, top=100, bottom=100, left=100, right=100)
    set_cell_borders(c3, top="single", bottom="single", left="single", right="single", color="CBD5E1", sz="6")
    p3 = c3.paragraphs[0]
    p3.add_run("SISTEM EKSTERNAL\n\n").font.bold = True
    p3.add_run("• SSO SIAPKerja Kemnaker\n  [OAuth2 / OIDC Login]\n\n• Notification Service\n  [Email & WA Gateway]\n\n• SiRUP & SPSE LKPP\n  [Sync Batch Data RUP]").font.size = Pt(9)

    p_fnote = doc.add_paragraph()
    p_fnote.paragraph_format.space_before = Pt(8)
    p_fnote.paragraph_format.space_after = Pt(0)
    r_fn = p_fnote.add_run("File Diagram Editable: Disimpan dalam format ")
    r_fn.font.size = Pt(9)
    r_fn2 = p_fnote.add_run("Dimas_Arsitektur_UKPBJ.drawio")
    r_fn2.font.bold = True
    r_fn2.font.size = Pt(9)
    r_fn3 = p_fnote.add_run(" dengan tata letak minimalis non-AI yang siap dibuka dan diedit menggunakan draw.io / diagrams.net.")
    r_fn3.font.size = Pt(9)

    # ==========================================================
    # HALAMAN 5: BAGIAN 4 - DATA (ERD) DAN INTEGRASI (TAHAP 3)
    # ==========================================================
    add_header(doc, "Bagian 4 · Data (ERD) dan Integrasi (Tahap 3)", 
               "Merujuk Slide 188 & 189: Struktur ERD 4 Entitas, Titik Integrasi, dan Kontrak API", page_break=True)

    p_erd_t = doc.add_paragraph()
    p_erd_t.paragraph_format.space_before = Pt(0)
    p_erd_t.paragraph_format.space_after = Pt(3)
    r_et1 = p_erd_t.add_run("1. Struktur Relasi Data (ERD 4 Entitas):")
    r_et1.font.name = "Segoe UI"
    r_et1.font.size = Pt(10)
    r_et1.font.bold = True
    r_et1.font.color.rgb = COLOR_SECTION

    table_erd = doc.add_table(rows=5, cols=4)
    table_erd.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_erd.autofit = False
    prevent_row_split(table_erd)

    w_erd = [Inches(1.8), Inches(1.3), Inches(4.7), Inches(2.4)]
    for row in table_erd.rows:
        for idx, width in enumerate(w_erd):
            row.cells[idx].width = width

    h_erd = ["Entitas", "Primary Key", "Foreign Key & Relasi", "Atribut Kunci"]
    for idx, text in enumerate(h_erd):
        cell = table_erd.cell(0, idx)
        set_cell_background(cell, "FFFFFF")
        set_cell_margins(cell, top=50, bottom=50, left=80, right=80)
        set_cell_borders(cell, top="single", bottom="single", color="0F2D59", sz="16")
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        run = p.add_run(text)
        run.font.name = "Segoe UI"
        run.font.size = Pt(9)
        run.font.bold = True
        run.font.color.rgb = COLOR_TITLE

    d_erd = [
        ("PEGAWAI", "id (PK)", "-", "nip, nama, unit_kerja, email"),
        ("POKJA", "id (PK)", "-", "kode_pokja, nama_tim, spesialisasi"),
        ("KONSULTASI", "id (PK)", "FK pemohon_id → Pegawai.id\nFK pokja_id → Pokja.id", "nomor_tiket, topik, tanggal, status"),
        ("TELAAH_REKOMENDASI", "id (PK)", "FK konsultasi_id → Konsultasi.id\nFK verifikator_id → Pegawai.id", "rekomendasi, catatan, tgl_telaah")
    ]

    for r_idx, row_data in enumerate(d_erd, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table_erd.cell(r_idx, c_idx)
            set_cell_background(cell, "FFFFFF")
            set_cell_margins(cell, top=45, bottom=45, left=80, right=80)
            set_cell_borders(cell, bottom="single", color="E2E8F0", sz="6")
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            run = p.add_run(val)
            run.font.name = "Segoe UI"
            run.font.size = Pt(8)
            if c_idx == 0:
                run.font.bold = True
                run.font.color.rgb = COLOR_TITLE
            else:
                run.font.color.rgb = COLOR_BODY

    p_int_t = doc.add_paragraph()
    p_int_t.paragraph_format.space_before = Pt(6)
    p_int_t.paragraph_format.space_after = Pt(3)
    r_it1 = p_int_t.add_run("2. Titik Integrasi & Kontrak API (Ambil Jadwal):")
    r_it1.font.name = "Segoe UI"
    r_it1.font.size = Pt(10)
    r_it1.font.bold = True
    r_it1.font.color.rgb = COLOR_SECTION

    # Table Dual Box Contract
    t_api = doc.add_table(rows=1, cols=2)
    t_api.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_api.autofit = False
    prevent_row_split(t_api)
    t_api.rows[0].cells[0].width = Inches(5.1)
    t_api.rows[0].cells[1].width = Inches(5.1)

    # Box Kiri
    cl = t_api.rows[0].cells[0]
    set_cell_background(cl, "F1F6FA")
    set_cell_margins(cl, top=70, bottom=70, left=100, right=100)
    set_cell_borders(cl, top="none", bottom="none", left="none", right="none")
    p_cl = cl.paragraphs[0]
    p_cl.paragraph_format.space_before = Pt(0)
    p_cl.paragraph_format.space_after = Pt(0)
    p_cl.add_run("GET /api/v1/konsultasi/K01/jadwal\n").font.bold = True
    p_cl.add_run("Authorization: Bearer <token>\n")
    r_ok = p_cl.add_run("200 OK\n")
    r_ok.font.bold = True
    r_ok.font.color.rgb = COLOR_BLUE
    p_cl.add_run('{\n  "konsultasi_id": "K01",\n  "jadwal": [ { "mulai": "09:00", "status": "DISETUJUI" } ]\n}')
    for r in p_cl.runs:
        r.font.name = "Consolas"
        r.font.size = Pt(8)

    # Box Kanan
    cr = t_api.rows[0].cells[1]
    set_cell_background(cr, "F1F6FA")
    set_cell_margins(cr, top=70, bottom=70, left=100, right=100)
    set_cell_borders(cr, top="none", bottom="none", left="none", right="none")
    p_cr = cr.paragraphs[0]
    p_cr.paragraph_format.space_before = Pt(0)
    p_cr.paragraph_format.space_after = Pt(0)
    p_cr.add_run("Error yang disepakati:\n\n").font.bold = True
    p_cr.add_run("401 UNAUTHORIZED\n").font.bold = True
    p_cr.add_run("Token otentikasi tidak ada atau tidak valid.\n\n")
    p_cr.add_run("404 KONSULTASI_TIDAK_ADA\n").font.bold = True
    p_cr.add_run("Nomor tiket konsultasi tidak ditemukan di database.")
    for r in p_cr.runs:
        r.font.name = "Segoe UI"
        r.font.size = Pt(8)

    # ==========================================================
    # HALAMAN 6: BAGIAN 5 - AKSES DAN CATATAN RISIKO (TAHAP 4)
    # ==========================================================
    add_header(doc, "Bagian 5 · Akses dan Catatan Risiko (Tahap 4)", 
               "Merujuk Slide 151, 152, 190, & 191: Matriks Hak Akses RBAC dan 4 Kolom Penanganan Risiko", page_break=True)

    p_ak_t = doc.add_paragraph()
    p_ak_t.paragraph_format.space_before = Pt(0)
    p_ak_t.paragraph_format.space_after = Pt(3)
    r_at1 = p_ak_t.add_run("1. Tabel Akses (RBAC — Siapa Boleh Melakukan Apa):")
    r_at1.font.name = "Segoe UI"
    r_at1.font.size = Pt(10)
    r_at1.font.bold = True
    r_at1.font.color.rgb = COLOR_SECTION

    table_rb = doc.add_table(rows=4, cols=4)
    table_rb.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_rb.autofit = False
    prevent_row_split(table_rb)

    w_rb = [Inches(2.5), Inches(2.5), Inches(2.5), Inches(2.7)]
    for row in table_rb.rows:
        for idx, width in enumerate(w_rb):
            row.cells[idx].width = width

    h_rb = ["Peran (Role)", "Ajukan Konsultasi", "Lihat Tiket Konsultasi", "Beri Telaah / Rekomendasi"]
    for idx, text in enumerate(h_rb):
        cell = table_rb.cell(0, idx)
        set_cell_background(cell, "FFFFFF")
        set_cell_margins(cell, top=45, bottom=45, left=80, right=80)
        set_cell_borders(cell, top="single", bottom="single", color="0F2D59", sz="16")
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        run = p.add_run(text)
        run.font.name = "Segoe UI"
        run.font.size = Pt(8.5)
        run.font.bold = True
        run.font.color.rgb = COLOR_TITLE

    d_rb = [
        ("Pegawai / PPK", "Boleh", "Hanya miliknya", "Tidak"),
        ("Pokja Pemilihan", "Boleh", "Semua (sesuai tugas)", "Boleh"),
        ("Admin UKPBJ", "Tidak", "Semua", "Tidak")
    ]

    for r_idx, row_data in enumerate(d_rb, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table_rb.cell(r_idx, c_idx)
            set_cell_background(cell, "FFFFFF")
            set_cell_margins(cell, top=40, bottom=40, left=80, right=80)
            set_cell_borders(cell, bottom="single", color="E2E8F0", sz="6")
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            run = p.add_run(val)
            run.font.name = "Segoe UI"
            run.font.size = Pt(8)
            if c_idx == 0:
                run.font.bold = True
                run.font.color.rgb = COLOR_TITLE
            else:
                run.font.color.rgb = COLOR_BODY

    p_rk_t = doc.add_paragraph()
    p_rk_t.paragraph_format.space_before = Pt(6)
    p_rk_t.paragraph_format.space_after = Pt(3)
    r_rt1 = p_rk_t.add_run("2. Tiga Catatan Risiko (4 Kolom — Slide 191):")
    r_rt1.font.name = "Segoe UI"
    r_rt1.font.size = Pt(10)
    r_rt1.font.bold = True
    r_rt1.font.color.rgb = COLOR_SECTION

    table_rk = doc.add_table(rows=4, cols=4)
    table_rk.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_rk.autofit = False
    prevent_row_split(table_rk)

    w_rk = [Inches(1.5), Inches(3.4), Inches(2.8), Inches(2.5)]
    for row in table_rk.rows:
        for idx, width in enumerate(w_rk):
            row.cells[idx].width = width

    h_rk = ["Risiko", "Apa yang Terjadi dan Akibatnya", "Cara Mencegah (Tindakan)", "Cara Menguji (Bukti Uji)"]
    for idx, text in enumerate(h_rk):
        cell = table_rk.cell(0, idx)
        set_cell_background(cell, "FFFFFF")
        set_cell_margins(cell, top=45, bottom=45, left=80, right=80)
        set_cell_borders(cell, top="single", bottom="single", color="0F2D59", sz="16")
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        run = p.add_run(text)
        run.font.name = "Segoe UI"
        run.font.size = Pt(8.5)
        run.font.bold = True
        run.font.color.rgb = COLOR_TITLE

    d_rk = [
        ("IDOR\n(Security 1)", 
         "Pegawai A ganti ID tiket di URL dan bisa membuka telaah/berkas KAK rahasia milik Pegawai B.", 
         "Backend memeriksa kepemilikan data (konsultasi.pemohon == user dari token JWT).", 
         "Token Akun A minta data Tiket B, server wajib menolak dengan HTTP 403. (Oleh: Backend Dev)"),
        
        ("XSS\n(Security 2)", 
         "Script di kolom catatan konsultasi dieksekusi di browser Pokja saat membuka review.", 
         "Tampilkan input sebagai teks murni (auto-escaping di React/Next.js) & sanitasi.", 
         "Input <b>tes</b> pada kolom catatan, harus tampil teks <b>tes</b> apa adanya. (Oleh: QA/Tester)"),
        
        ("Notifikasi Gagal\n(Reliability)", 
         "Email/WA service mati, pemohon tidak menerima konfirmasi nomor tiket konsultasi.", 
         "Simpan status sukses di DB (graceful degradation), kirim ulang notifikasi lewat antrean.", 
         "Matikan email service, ajukan tiket, pastikan data tiket tetap sah tersimpan di DB. (Oleh: Backend Dev)")
    ]

    for r_idx, row_data in enumerate(d_rk, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table_rk.cell(r_idx, c_idx)
            set_cell_background(cell, "FFFFFF")
            set_cell_margins(cell, top=40, bottom=40, left=80, right=80)
            set_cell_borders(cell, bottom="single", color="E2E8F0", sz="6")
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            run = p.add_run(val)
            run.font.name = "Segoe UI"
            run.font.size = Pt(7.8)
            if c_idx == 0:
                run.font.bold = True
                run.font.color.rgb = COLOR_TITLE
            else:
                run.font.color.rgb = COLOR_BODY

    # ==========================================================
    # HALAMAN 7: TAHAP 5 - REVIEW BERPASANGAN & CHECKLIST
    # ==========================================================
    add_header(doc, "Tahap 5 · Lembar Review Berpasangan (Peer Review)", 
               "Merujuk Slide 192: Penelusuran Fitur dan Catatan Klarifikasi Pasangan", page_break=True)

    p_rev_desc = doc.add_paragraph()
    p_rev_desc.paragraph_format.space_before = Pt(0)
    p_rev_desc.paragraph_format.space_after = Pt(4)
    p_rev_desc.add_run("Tindakan yang Ditelusuri dan Diklarifikasi Rekan Pasangan:\n").font.bold = True

    rev_checks = [
        ("1. Fitur Pembatalan Tiket: ", "Apakah pegawai bisa membatalkan tiket yang sudah diajukan? → Klarifikasi: Boleh, tetapi hanya untuk tiket miliknya sendiri dan selama statusnya masih 'MENUNGGU' telaah Pokja."),
        ("2. Penanganan Bentrok Jadwal: ", "Bagaimana jika 2 satker memilih slot jadwal konsultasi yang sama pada detik bersamaan? → Klarifikasi: Database PostgreSQL menerapkan constraint pengecekan slot waktu unik sehingga request kedua akan menerima respon konflik 409."),
        ("3. Integritas Notifikasi Eksternal: ", "Apakah kegagalan WhatsApp Gateway membatalkan pengajuan tiket? → Klarifikasi: Tidak. Transaksi database tetap di-commit (graceful degradation) dan antrean background worker akan mencoba mengirim ulang."),
        ("4. Bukti Uji Keamanan: ", "Sudah jelas siapa yang menguji? → Klarifikasi: IDOR diuji oleh Backend Developer menggunakan Postman; XSS diuji oleh QA Tester pada form input antarmuka web.")
    ]

    for title_rc, desc_rc in rev_checks:
        p_rc = doc.add_paragraph()
        p_rc.paragraph_format.space_before = Pt(0)
        p_rc.paragraph_format.space_after = Pt(2)
        r_rc1 = p_rc.add_run(title_rc)
        r_rc1.font.name = "Segoe UI"
        r_rc1.font.size = Pt(8.5)
        r_rc1.font.bold = True
        r_rc1.font.color.rgb = COLOR_TITLE

        r_rc2 = p_rc.add_run(desc_rc)
        r_rc2.font.name = "Segoe UI"
        r_rc2.font.size = Pt(8.5)
        r_rc2.font.color.rgb = COLOR_BODY

    p_sign = doc.add_paragraph()
    p_sign.paragraph_format.space_before = Pt(10)
    p_sign.paragraph_format.space_after = Pt(0)
    p_sign.add_run("Status Pemeriksaan Pasangan: LULUS REVIEW (Siap Dikumpulkan ke Panitia Pukul 16.15 WIB)").font.bold = True
    p_sign.runs[0].font.size = Pt(9.5)
    p_sign.runs[0].font.color.rgb = COLOR_BLUE

    doc.save(output_path)
    print(f"Master document successfully built at: {output_path}")

if __name__ == "__main__":
    out_target = r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\Dimas_Paket_Arsitektur_UKPBJ.docx"
    build_full_doc(out_target)
