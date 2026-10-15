import subprocess
import os

edge = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
html_path = r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\diagram_struktur_data_ukpbj.html"
png_path = r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\Struktur_Data_UKPBJ_Kemnaker_RI.png"

url = "file:///" + html_path.replace("\\", "/")

cmd = [
    edge,
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    f"--screenshot={png_path}",
    "--window-size=1680,780",
    "--hide-scrollbars",
    url
]

print("Executing Edge to render data structure diagram...")
res = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
print("Code:", res.returncode)
print("Exists:", os.path.exists(png_path))
if os.path.exists(png_path):
    print("Size:", os.path.getsize(png_path))
