# -*- coding: utf-8 -*-
"""
Script to create the Word document (.docx) for:
Tabel Akses dan Catatan Risiko Sistem Portal UKPBJ Kemnaker RI
Formatted cleanly to match the sample slide layout (Slide 152).
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

def set_cell_margins(cell, top=140, bottom=140, left=160, right=160):
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

def build_docx(output_path):
    doc = docx.Document()
    
    # Page Setup: A4 Landscape
    for section in doc.sections:
        section.page_width = Inches(11.69)
        section.page_height = Inches(8.27)
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    COLOR_TITLE = RGBColor(15, 45, 89)      # #0F2D59
    COLOR_SECTION = RGBColor(23, 66, 118)   # #174276
    COLOR_BODY = RGBColor(30, 41, 59)       # #1E293B

    # Title
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(20)
    run_title = p_title.add_run("Contoh hasil: tabel akses dan catatan risiko sistem UKPBJ")
    run_title.font.name = "Segoe UI"
    run_title.font.size = Pt(22)
    run_title.font.bold = True
    run_title.font.color.rgb = COLOR_TITLE

    # 1. TABEL AKSES
    p_sec1 = doc.add_paragraph()
    p_sec1.paragraph_format.space_before = Pt(4)
    p_sec1.paragraph_format.space_after = Pt(8)
    run_sec1 = p_sec1.add_run("1 · Tabel akses: siapa boleh melakukan apa")
    run_sec1.font.name = "Segoe UI"
    run_sec1.font.size = Pt(14)
    run_sec1.font.bold = True
    run_sec1.font.color.rgb = COLOR_SECTION

    # Table 1: Akses
    table1 = doc.add_table(rows=4, cols=4)
    table1.alignment = WD_TABLE_ALIGNMENT.CENTER
    table1.autofit = False

    col_widths1 = [Inches(2.5), Inches(2.4), Inches(2.4), Inches(2.4)]
    for row in table1.rows:
        for idx, width in enumerate(col_widths1):
            row.cells[idx].width = width

    headers1 = ["Peran", "Ajukan konsultasi", "Lihat konsultasi", "Beri telaah / approve"]
    for idx, text in enumerate(headers1):
        cell = table1.cell(0, idx)
        set_cell_background(cell, "FFFFFF")
        set_cell_margins(cell, top=140, bottom=140, left=140, right=140)
        set_cell_borders(cell, top="single", bottom="single", color="0F2D59", sz="16")
        p = cell.paragraphs[0]
        run = p.add_run(text)
        run.font.name = "Segoe UI"
        run.font.size = Pt(11)
        run.font.bold = True
        run.font.color.rgb = COLOR_TITLE

    data1 = [
        ("Pegawai / PPK", "Boleh", "Hanya miliknya", "Tidak"),
        ("Pokja Pemilihan", "Boleh", "Semua", "Boleh"),
        ("Admin UKPBJ", "Tidak", "Semua", "Tidak")
    ]

    for r_idx, row_data in enumerate(data1, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table1.cell(r_idx, c_idx)
            set_cell_background(cell, "FFFFFF")
            set_cell_margins(cell, top=140, bottom=140, left=140, right=140)
            set_cell_borders(cell, bottom="single", color="E2E8F0", sz="6")
            p = cell.paragraphs[0]
            run = p.add_run(val)
            run.font.name = "Segoe UI"
            run.font.size = Pt(10.5)
            if c_idx == 0:
                run.font.bold = True
                run.font.color.rgb = COLOR_TITLE
            else:
                run.font.color.rgb = COLOR_BODY

    # 2. TIGA CATATAN RISIKO
    p_sec2 = doc.add_paragraph()
    p_sec2.paragraph_format.space_before = Pt(24)
    p_sec2.paragraph_format.space_after = Pt(8)
    run_sec2 = p_sec2.add_run("2 · Tiga catatan risiko")
    run_sec2.font.name = "Segoe UI"
    run_sec2.font.size = Pt(14)
    run_sec2.font.bold = True
    run_sec2.font.color.rgb = COLOR_SECTION

    table2 = doc.add_table(rows=4, cols=4)
    table2.alignment = WD_TABLE_ALIGNMENT.CENTER
    table2.autofit = False

    col_widths2 = [Inches(1.8), Inches(3.2), Inches(2.5), Inches(2.2)]
    for row in table2.rows:
        for idx, width in enumerate(col_widths2):
            row.cells[idx].width = width

    headers2 = ["Risiko", "Apa yang terjadi dan akibatnya", "Cara mencegah", "Cara menguji"]
    for idx, text in enumerate(headers2):
        cell = table2.cell(0, idx)
        set_cell_background(cell, "FFFFFF")
        set_cell_margins(cell, top=140, bottom=140, left=140, right=140)
        set_cell_borders(cell, top="single", bottom="single", color="0F2D59", sz="16")
        p = cell.paragraphs[0]
        run = p.add_run(text)
        run.font.name = "Segoe UI"
        run.font.size = Pt(11)
        run.font.bold = True
        run.font.color.rgb = COLOR_TITLE

    data2 = [
        ("IDOR", 
         "Pegawai A ganti ID dan bisa membaca telaah/konsultasi Pegawai B", 
         "Backend cek pemilik konsultasi", 
         "Token A minta konsultasi B, harus 403"),
        ("XSS", 
         "Script di kolom keperluan berjalan di browser Pokja/Admin", 
         "Tampilkan input sebagai teks", 
         "Isi <b>tes</b>, harus tampil apa adanya"),
        ("Email / WA gagal", 
         "Notifikasi service mati, pemohon tidak dikabari", 
         "Simpan status, kirim ulang lewat antrean", 
         "Matikan notifikasi service, konsultasi tetap tersimpan")
    ]

    for r_idx, row_data in enumerate(data2, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table2.cell(r_idx, c_idx)
            set_cell_background(cell, "FFFFFF")
            set_cell_margins(cell, top=140, bottom=140, left=140, right=140)
            set_cell_borders(cell, bottom="single", color="E2E8F0", sz="6")
            p = cell.paragraphs[0]
            run = p.add_run(val)
            run.font.name = "Segoe UI"
            run.font.size = Pt(10)
            if c_idx == 0:
                run.font.bold = True
                run.font.color.rgb = COLOR_TITLE
            else:
                run.font.color.rgb = COLOR_BODY

    doc.save(output_path)
    print(f"File created successfully at {output_path}")

if __name__ == "__main__":
    out_file = r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\Tabel_Akses_dan_Catatan_Risiko_UKPBJ.docx"
    build_docx(out_file)
