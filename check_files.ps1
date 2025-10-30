# PowerShell script to analyze hamburger menu files
Write-Host "Hamburger Menu Fix Process" -ForegroundColor Green

$files = @("index.html", "about.html", "menu.html", "contact.html", "blog.html", "livemusic.html", "catering.html")

Write-Host "Files to process:" -ForegroundColor Yellow
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✅ Found: $file" -ForegroundColor Green
    }
    else {
        Write-Host "❌ Missing: $file" -ForegroundColor Red
    }
}

Write-Host "Ready to apply hamburger menu fixes" -ForegroundColor Cyan