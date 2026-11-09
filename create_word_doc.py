# -*- coding: utf-8 -*-
"""
Script to create the Word document (.docx) for:
Daftar Integrasi dan Kontrak API Sistem UKPBJ Kemnaker RI
Formatted cleanly to match the sample slide layout.
"""

import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    """Set background color of a table cell."""
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=140, bottom=140, left=180, right=180):
    """Set padding of a table cell (in twips/dxa: 20 dxa = 1 pt)."""
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
    """Set custom borders on a table cell."""
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

def build_docx(output_path):
    doc = docx.Document()
    
    # Page Setup: A4 Landscape for slide-like presentation
    for section in doc.sections:
        section.page_width = Inches(11.69)   # A4 Landscape width
        section.page_height = Inches(8.27)  # A4 Landscape height
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    COLOR_TITLE = RGBColor(15, 45, 89)      # #0F2D59
    COLOR_SECTION = RGBColor(23, 66, 118)   # #174276
    COLOR_BODY = RGBColor(30, 41, 59)       # #1E293B
    COLOR_BLUE = RGBColor(21, 101, 192)     # #1565C0
    COLOR_MUTED = RGBColor(71, 85, 105)     # #475569

    # -------------------------------------------------------------
    # SLIDE 1: SISTEM KONSULTASI UKPBJ
    # -------------------------------------------------------------
    
    # Title
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(20)
    run_title = p_title.add_run("Contoh hasil: integrasi dan kontrak API sistem konsultasi UKPBJ")
    run_title.font.name = "Segoe UI"
    run_title.font.size = Pt(22)
    run_title.font.bold = True
    run_title.font.color.rgb = COLOR_TITLE

    # Section 1 Heading
    p_sec1 = doc.add_paragraph()
    p_sec1.paragraph_format.space_before = Pt(4)
    p_sec1.paragraph_format.space_after = Pt(8)
    run_sec1 = p_sec1.add_run("1 · Daftar integrasi")
    run_sec1.font.name = "Segoe UI"
    run_sec1.font.size = Pt(14)
    run_sec1.font.bold = True
    run_sec1.font.color.rgb = COLOR_SECTION

    # Table 1: Integrasi
    table1 = doc.add_table(rows=4, cols=4)
    table1.alignment = WD_TABLE_ALIGNMENT.CENTER
    table1.autofit = False

    col_widths = [Inches(2.8), Inches(2.6), Inches(2.0), Inches(2.3)]
    for row in table1.rows:
        for idx, width in enumerate(col_widths):
            row.cells[idx].width = width

    # Header Row
    headers = ["Dari → ke", "Data yang dikirim", "Kapan dikirim", "Jika gagal"]
    for idx, text in enumerate(headers):
        cell = table1.cell(0, idx)
        set_cell_background(cell, "FFFFFF")
        set_cell_margins(cell, top=140, bottom=140, left=140, right=140)
        set_cell_borders(cell, top="single", bottom="single", color="0F2D59", sz="16")
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        run = p.add_run(text)
        run.font.name = "Segoe UI"
        run.font.size = Pt(11)
        run.font.bold = True
        run.font.color.rgb = COLOR_TITLE

    # Data Rows
    data_rows = [
        ("Portal publik → Konsultasi PBJ", "konsultasi_id, tanggal", "Tiap 5 menit", "Tampilkan jadwal terakhir"),
        ("Konsultasi PBJ → Email service", "Email pemohon, pokja, jam", "Saat konsultasi disetujui", 'Tandai "gagal kirim", coba ulang'),
        ("Konsultasi PBJ → Identity provider", "Token login", "Saat pegawai login", "Minta pegawai login ulang")
    ]

    for r_idx, row_data in enumerate(data_rows, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table1.cell(r_idx, c_idx)
            set_cell_background(cell, "FFFFFF")
            set_cell_margins(cell, top=160, bottom=160, left=140, right=140)
            set_cell_borders(cell, bottom="single", color="E2E8F0", sz="6")
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            run = p.add_run(val)
            run.font.name = "Segoe UI"
            run.font.size = Pt(10.5)
            if c_idx == 0:
                run.font.bold = True
                run.font.color.rgb = COLOR_TITLE
            else:
                run.font.color.rgb = COLOR_BODY

    # Section 2 Heading
    p_sec2 = doc.add_paragraph()
    p_sec2.paragraph_format.space_before = Pt(24)
    p_sec2.paragraph_format.space_after = Pt(10)
    run_sec2 = p_sec2.add_run("2 · Satu kontrak API: ambil jadwal konsultasi")
    run_sec2.font.name = "Segoe UI"
    run_sec2.font.size = Pt(14)
    run_sec2.font.bold = True
    run_sec2.font.color.rgb = COLOR_SECTION

    # Table 2: Two Boxes (Contract & Errors)
    table2 = doc.add_table(rows=1, cols=2)
    table2.alignment = WD_TABLE_ALIGNMENT.CENTER
    table2.autofit = False

    t2_widths = [Inches(5.4), Inches(4.3)]
    table2.rows[0].cells[0].width = t2_widths[0]
    table2.rows[0].cells[1].width = t2_widths[1]

    # LEFT BOX: CODE
    cell_left = table2.rows[0].cells[0]
    set_cell_background(cell_left, "F1F6FA")
    set_cell_margins(cell_left, top=200, bottom=200, left=240, right=240)
    set_cell_borders(cell_left, top="none", bottom="none", left="none", right="none")

    p_code1 = cell_left.paragraphs[0]
    p_code1.paragraph_format.space_before = Pt(0)
    p_code1.paragraph_format.space_after = Pt(2)
    r1 = p_code1.add_run("GET /api/v1/konsultasi/K01/jadwal")
    r1.font.name = "Consolas"
    r1.font.size = Pt(11)
    r1.font.bold = True
    r1.font.color.rgb = COLOR_TITLE

    p_code2 = cell_left.add_paragraph()
    p_code2.paragraph_format.space_before = Pt(0)
    p_code2.paragraph_format.space_after = Pt(4)
    r2 = p_code2.add_run("Authorization: Bearer <token>")
    r2.font.name = "Consolas"
    r2.font.size = Pt(10.5)
    r2.font.color.rgb = COLOR_MUTED

    p_code3 = cell_left.add_paragraph()
    p_code3.paragraph_format.space_before = Pt(0)
    p_code3.paragraph_format.space_after = Pt(4)
    r3 = p_code3.add_run("200 OK")
    r3.font.name = "Consolas"
    r3.font.size = Pt(11)
    r3.font.bold = True
    r3.font.color.rgb = COLOR_BLUE

    p_code4 = cell_left.add_paragraph()
    p_code4.paragraph_format.space_before = Pt(0)
    p_code4.paragraph_format.space_after = Pt(0)
    json_text = '{ "konsultasi_id": "K01",\n  "jadwal": [ { "mulai": "09:00",\n    "status": "DISETUJUI" } ] }'
    r4 = p_code4.add_run(json_text)
    r4.font.name = "Consolas"
    r4.font.size = Pt(10.5)
    r4.font.color.rgb = COLOR_TITLE

    # RIGHT BOX: ERRORS
    cell_right = table2.rows[0].cells[1]
    set_cell_background(cell_right, "F1F6FA")
    set_cell_margins(cell_right, top=200, bottom=200, left=240, right=240)
    set_cell_borders(cell_right, top="none", bottom="none", left="none", right="none")

    p_err_title = cell_right.paragraphs[0]
    p_err_title.paragraph_format.space_before = Pt(0)
    p_err_title.paragraph_format.space_after = Pt(10)
    r_et = p_err_title.add_run("Error yang disepakati")
    r_et.font.name = "Segoe UI"
    r_et.font.size = Pt(11.5)
    r_et.font.bold = True
    r_et.font.color.rgb = COLOR_SECTION

    # Error 1
    p_e1 = cell_right.add_paragraph()
    p_e1.paragraph_format.space_before = Pt(0)
    p_e1.paragraph_format.space_after = Pt(1)
    re1 = p_e1.add_run("401 UNAUTHORIZED")
    re1.font.name = "Consolas"
    re1.font.size = Pt(11)
    re1.font.bold = True
    re1.font.color.rgb = COLOR_SECTION

    p_e1_d = cell_right.add_paragraph()
    p_e1_d.paragraph_format.space_before = Pt(0)
    p_e1_d.paragraph_format.space_after = Pt(12)
    re1d = p_e1_d.add_run("Token tidak ada atau tidak valid.")
    re1d.font.name = "Segoe UI"
    re1d.font.size = Pt(10)
    re1d.font.color.rgb = COLOR_BODY

    # Error 2
    p_e2 = cell_right.add_paragraph()
    p_e2.paragraph_format.space_before = Pt(0)
    p_e2.paragraph_format.space_after = Pt(1)
    re2 = p_e2.add_run("404 KONSULTASI_TIDAK_ADA")
    re2.font.name = "Consolas"
    re2.font.size = Pt(11)
    re2.font.bold = True
    re2.font.color.rgb = COLOR_SECTION

    p_e2_d = cell_right.add_paragraph()
    p_e2_d.paragraph_format.space_before = Pt(0)
    p_e2_d.paragraph_format.space_after = Pt(0)
    re2d = p_e2_d.add_run("Kode konsultasi tidak ditemukan.")
    re2d.font.name = "Segoe UI"
    re2d.font.size = Pt(10)
    re2d.font.color.rgb = COLOR_BODY


    # -------------------------------------------------------------
    # PAGE 2: VERSI ALTERNATIF (SISTEM PENGADAAN & TENDER)
    # -------------------------------------------------------------
    doc.add_page_break()

    # Title 2
    p2_title = doc.add_paragraph()
    p2_title.paragraph_format.space_before = Pt(0)
    p2_title.paragraph_format.space_after = Pt(20)
    run2_title = p2_title.add_run("Contoh hasil: integrasi dan kontrak API sistem pengadaan UKPBJ")
    run2_title.font.name = "Segoe UI"
    run2_title.font.size = Pt(22)
    run2_title.font.bold = True
    run2_title.font.color.rgb = COLOR_TITLE

    # Section 1 Heading (Alt)
    p2_sec1 = doc.add_paragraph()
    p2_sec1.paragraph_format.space_before = Pt(4)
    p2_sec1.paragraph_format.space_after = Pt(8)
    run2_sec1 = p2_sec1.add_run("1 · Daftar integrasi")
    run2_sec1.font.name = "Segoe UI"
    run2_sec1.font.size = Pt(14)
    run2_sec1.font.bold = True
    run2_sec1.font.color.rgb = COLOR_SECTION

    # Table Alt 1
    table_alt = doc.add_table(rows=4, cols=4)
    table_alt.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_alt.autofit = False

    for row in table_alt.rows:
        for idx, width in enumerate(col_widths):
            row.cells[idx].width = width

    # Header Row
    for idx, text in enumerate(headers):
        cell = table_alt.cell(0, idx)
        set_cell_background(cell, "FFFFFF")
        set_cell_margins(cell, top=140, bottom=140, left=140, right=140)
        set_cell_borders(cell, top="single", bottom="single", color="0F2D59", sz="16")
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        run = p.add_run(text)
        run.font.name = "Segoe UI"
        run.font.size = Pt(11)
        run.font.bold = True
        run.font.color.rgb = COLOR_TITLE

    # Data Rows Alt
    data_alt = [
        ("Portal publik → Sistem pengadaan", "paket_id, tanggal", "Tiap 5 menit", "Tampilkan status terakhir"),
        ("Sistem pengadaan → Notifikasi service", "Email satker, paket, status", "Saat tender selesai", 'Tandai "gagal kirim", coba ulang'),
        ("Sistem pengadaan → Identity provider", "Token login", "Saat admin login", "Minta admin login ulang")
    ]

    for r_idx, row_data in enumerate(data_alt, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table_alt.cell(r_idx, c_idx)
            set_cell_background(cell, "FFFFFF")
            set_cell_margins(cell, top=160, bottom=160, left=140, right=140)
            set_cell_borders(cell, bottom="single", color="E2E8F0", sz="6")
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            run = p.add_run(val)
            run.font.name = "Segoe UI"
            run.font.size = Pt(10.5)
            if c_idx == 0:
                run.font.bold = True
                run.font.color.rgb = COLOR_TITLE
            else:
                run.font.color.rgb = COLOR_BODY

    # Section 2 Heading (Alt)
    p2_sec2 = doc.add_paragraph()
    p2_sec2.paragraph_format.space_before = Pt(24)
    p2_sec2.paragraph_format.space_after = Pt(10)
    run2_sec2 = p2_sec2.add_run("2 · Satu kontrak API: ambil status paket")
    run2_sec2.font.name = "Segoe UI"
    run2_sec2.font.size = Pt(14)
    run2_sec2.font.bold = True
    run2_sec2.font.color.rgb = COLOR_SECTION

    # Table Alt 2
    table_alt2 = doc.add_table(rows=1, cols=2)
    table_alt2.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_alt2.autofit = False

    table_alt2.rows[0].cells[0].width = t2_widths[0]
    table_alt2.rows[0].cells[1].width = t2_widths[1]

    # LEFT BOX: CODE (Alt)
    cell_left2 = table_alt2.rows[0].cells[0]
    set_cell_background(cell_left2, "F1F6FA")
    set_cell_margins(cell_left2, top=200, bottom=200, left=240, right=240)
    set_cell_borders(cell_left2, top="none", bottom="none", left="none", right="none")

    p2_code1 = cell_left2.paragraphs[0]
    p2_code1.paragraph_format.space_before = Pt(0)
    p2_code1.paragraph_format.space_after = Pt(2)
    r2_1 = p2_code1.add_run("GET /api/v1/paket/P01/status")
    r2_1.font.name = "Consolas"
    r2_1.font.size = Pt(11)
    r2_1.font.bold = True
    r2_1.font.color.rgb = COLOR_TITLE

    p2_code2 = cell_left2.add_paragraph()
    p2_code2.paragraph_format.space_before = Pt(0)
    p2_code2.paragraph_format.space_after = Pt(4)
    r2_2 = p2_code2.add_run("Authorization: Bearer <token>")
    r2_2.font.name = "Consolas"
    r2_2.font.size = Pt(10.5)
    r2_2.font.color.rgb = COLOR_MUTED

    p2_code3 = cell_left2.add_paragraph()
    p2_code3.paragraph_format.space_before = Pt(0)
    p2_code3.paragraph_format.space_after = Pt(4)
    r2_3 = p2_code3.add_run("200 OK")
    r2_3.font.name = "Consolas"
    r2_3.font.size = Pt(11)
    r2_3.font.bold = True
    r2_3.font.color.rgb = COLOR_BLUE

    p2_code4 = cell_left2.add_paragraph()
    p2_code4.paragraph_format.space_before = Pt(0)
    p2_code4.paragraph_format.space_after = Pt(0)
    json_text2 = '{ "paket_id": "P01",\n  "status_tender": [ { "tahap": "SELESAI",\n    "status": "DISETUJUI" } ] }'
    r2_4 = p2_code4.add_run(json_text2)
    r2_4.font.name = "Consolas"
    r2_4.font.size = Pt(10.5)
    r2_4.font.color.rgb = COLOR_TITLE

    # RIGHT BOX: ERRORS (Alt)
    cell_right2 = table_alt2.rows[0].cells[1]
    set_cell_background(cell_right2, "F1F6FA")
    set_cell_margins(cell_right2, top=200, bottom=200, left=240, right=240)
    set_cell_borders(cell_right2, top="none", bottom="none", left="none", right="none")

    p2_err_title = cell_right2.paragraphs[0]
    p2_err_title.paragraph_format.space_before = Pt(0)
    p2_err_title.paragraph_format.space_after = Pt(10)
    r2_et = p2_err_title.add_run("Error yang disepakati")
    r2_et.font.name = "Segoe UI"
    r2_et.font.size = Pt(11.5)
    r2_et.font.bold = True
    r2_et.font.color.rgb = COLOR_SECTION

    # Error 1 (Alt)
    p2_e1 = cell_right2.add_paragraph()
    p2_e1.paragraph_format.space_before = Pt(0)
    p2_e1.paragraph_format.space_after = Pt(1)
    r2_e1 = p2_e1.add_run("401 UNAUTHORIZED")
    r2_e1.font.name = "Consolas"
    r2_e1.font.size = Pt(11)
    r2_e1.font.bold = True
    r2_e1.font.color.rgb = COLOR_SECTION

    p2_e1_d = cell_right2.add_paragraph()
    p2_e1_d.paragraph_format.space_before = Pt(0)
    p2_e1_d.paragraph_format.space_after = Pt(12)
    r2_e1d = p2_e1_d.add_run("Token tidak ada atau tidak valid.")
    r2_e1d.font.name = "Segoe UI"
    r2_e1d.font.size = Pt(10)
    r2_e1d.font.color.rgb = COLOR_BODY

    # Error 2 (Alt)
    p2_e2 = cell_right2.add_paragraph()
    p2_e2.paragraph_format.space_before = Pt(0)
    p2_e2.paragraph_format.space_after = Pt(1)
    r2_e2 = p2_e2.add_run("404 PAKET_TIDAK_ADA")
    r2_e2.font.name = "Consolas"
    r2_e2.font.size = Pt(11)
    r2_e2.font.bold = True
    r2_e2.font.color.rgb = COLOR_SECTION

    p2_e2_d = cell_right2.add_paragraph()
    p2_e2_d.paragraph_format.space_before = Pt(0)
    p2_e2_d.paragraph_format.space_after = Pt(0)
    r2_e2d = p2_e2_d.add_run("Kode paket tidak ditemukan.")
    r2_e2d.font.name = "Segoe UI"
    r2_e2d.font.size = Pt(10)
    r2_e2d.font.color.rgb = COLOR_BODY

    doc.save(output_path)
    print(f"Document successfully created at: {output_path}")

if __name__ == "__main__":
    out_file = r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\Integrasi_dan_Kontrak_API_UKPBJ.docx"
    build_docx(out_file)
