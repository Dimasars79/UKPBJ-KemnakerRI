import zipfile
import xml.etree.ElementTree as ET

path = r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\20260707 - Form Daftar Data Statistik Teman K3 - Definisi SMData - Pusdatik.xlsx"

with zipfile.ZipFile(path) as z:
    print("Files in xlsx:", z.namelist())
    
    # Read workbook to see sheet names
    wb_tree = ET.fromstring(z.read("xl/workbook.xml"))
    sheets = wb_tree.findall(".//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet")
    for s in sheets:
        print("Sheet:", s.attrib)

    # Read shared strings
    shared_strings = []
    if "xl/sharedStrings.xml" in z.namelist():
        tree = ET.fromstring(z.read("xl/sharedStrings.xml"))
        for si in tree.findall("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si"):
            texts = [t.text for t in si.iterfind(".//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t") if t.text]
            shared_strings.append("".join(texts))
    
    print(f"Total shared strings: {len(shared_strings)}")
    
    # Check all worksheets
    for sheet_name in [f for f in z.namelist() if f.startswith("xl/worksheets/sheet")]:
        print(f"\n=== {sheet_name} ===")
        sheet_tree = ET.fromstring(z.read(sheet_name))
        ns = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
        rows = sheet_tree.findall(".//s:row", ns)
        print(f"Total rows: {len(rows)}")
        for r in rows:
            row_idx = r.get("r")
            row_vals = []
            for c in r.findall("s:c", ns):
                cell_ref = c.get("r")
                t = c.get("t")
                v = c.find("s:v", ns)
                val = v.text if v is not None else ""
                if t == "s" and val.isdigit():
                    val = shared_strings[int(val)]
                row_vals.append(f"{cell_ref}: {val}")
            if row_vals:
                print(f"Row {row_idx}: {row_vals}")
