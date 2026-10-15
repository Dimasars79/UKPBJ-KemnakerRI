import subprocess
import os
import shutil

edge = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
html_path = r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\blueprint_sistem_ukpbj.html"
png_path = r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\Model_Arsitektur_Sistem_UKPBJ_Lengkap.png"
artifact_dir = r"C:\Users\asus3\.gemini\antigravity-ide\brain\e35b2200-9437-4ec8-8de3-3b2f177180f1"
artifact_img = os.path.join(artifact_dir, "Model_Arsitektur_Sistem_UKPBJ_Lengkap.png")
public_img = r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\public\docs\Model_Arsitektur_Sistem_UKPBJ_Lengkap.png"

url = "file:///" + html_path.replace("\\", "/")

cmd = [
    edge,
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    f"--screenshot={png_path}",
    "--window-size=1960,1850",
    "--hide-scrollbars",
    url
]

print("Executing Edge to render full blueprint...")
res = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
print("Code:", res.returncode)
print("Exists:", os.path.exists(png_path))
if os.path.exists(png_path):
    print("Size:", os.path.getsize(png_path))
    shutil.copy2(png_path, artifact_img)
    print("Copied to artifact:", artifact_img)
    os.makedirs(os.path.dirname(public_img), exist_ok=True)
    shutil.copy2(png_path, public_img)
    print("Copied to public/docs:", public_img)
