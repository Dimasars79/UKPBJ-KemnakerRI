import subprocess
import os
import shutil

edge = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
html_path = r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\slide_integrasi_kontrak_api.html"
png_path = r"c:\PROJECT-MAGANG\UKPBJ-Kemnaker RI\integrasi_dan_kontrak_api_ukpbj.png"
artifact_dir = r"C:\Users\asus3\.gemini\antigravity\brain\9125f2aa-d546-4cc5-ae35-f2d4e50ed018"
artifact_png = os.path.join(artifact_dir, "integrasi_dan_kontrak_api_ukpbj.png")

url = "file:///" + html_path.replace("\\", "/")

cmd = [
    edge,
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    f"--screenshot={png_path}",
    "--window-size=1200,660",
    "--hide-scrollbars",
    "--force-device-scale-factor=2",
    url
]

print("Rendering screenshot via Edge...")
res = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
print("Return code:", res.returncode)
if os.path.exists(png_path):
    print("PNG generated successfully! Size:", os.path.getsize(png_path))
    shutil.copyfile(png_path, artifact_png)
    print("Copied to artifact dir:", os.path.exists(artifact_png))
else:
    print("Failed to generate PNG.")
