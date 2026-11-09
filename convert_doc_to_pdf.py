import os
import subprocess

ps_script = """
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
    $docxPath = "c:\\PROJECT-MAGANG\\UKPBJ-Kemnaker RI\\Dimas_Paket_Arsitektur_UKPBJ.docx"
    $pdfPath = "c:\\PROJECT-MAGANG\\UKPBJ-Kemnaker RI\\Dimas_Paket_Arsitektur_UKPBJ.pdf"
    $doc = $word.Documents.Open($docxPath, $false, $true, $false)
    $pages = $doc.ComputeStatistics(2)
    Write-Host "TOTAL_PAGES:$pages"
    $doc.SaveAs([ref] $pdfPath, [ref] 17)
    $doc.Close([ref] $false)
    Write-Host "SUCCESS"
} catch {
    Write-Host "ERROR: $_"
} finally {
    $word.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
}
"""

res = subprocess.run(["powershell", "-NoProfile", "-Command", ps_script], capture_output=True, text=True, timeout=30)
print(res.stdout)
print(res.stderr)
