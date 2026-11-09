import docx

doc = docx.Document(r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\Dimas_Paket_Arsitektur_UKPBJ.docx")

# Let's inspect where page breaks are and how many elements exist
print(f"Total paragraphs: {len(doc.paragraphs)}")
print(f"Total tables: {len(doc.tables)}")

for i, p in enumerate(doc.paragraphs):
    has_pb = any('lastRenderedPageBreak' in run._r.xml or 'w:br' in run._r.xml and 'page' in run._r.xml for run in p.runs)
    text_clean = p.text.strip().replace('\n', ' ')
    if len(text_clean) > 50:
        text_clean = text_clean[:50] + "..."
    if has_pb:
        print(f"P{i}: [HARD PAGE BREAK] {text_clean}")
    elif text_clean:
        print(f"P{i}: {text_clean}")
