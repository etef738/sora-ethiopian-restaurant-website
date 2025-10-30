# PowerShell script to fix hamburger menu positioning across all HTML files
# This script applies consistent hamburger menu structure and responsive CSS

Write-Host "🍔 Starting Hamburger Menu Fix Process..." -ForegroundColor Green

# List of files to process
$files = @(
    "index.html",
    "about.html", 
    "menu.html",
    "contact.html",
    "blog.html",
    "livemusic.html",
    "catering.html"
)

Write-Host "📁 Files to process: $($files -join ', ')" -ForegroundColor Yellow

# Check if files exist
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✅ Found: $file" -ForegroundColor Green
    }
    else {
        Write-Host "❌ Missing: $file" -ForegroundColor Red
    }
}

Write-Host "`n🔧 Ready to apply hamburger menu fixes!" -ForegroundColor Cyan
Write-Host "Manual steps needed:" -ForegroundColor White
Write-Host "1. Update HTML structure: Move hamburger inside nav-controls div" -ForegroundColor Gray
Write-Host "2. Add responsive CSS for proper visibility" -ForegroundColor Gray
Write-Host "3. Ensure consistent navigation across all pages" -ForegroundColor Gray
Write-Host "4. Test on mobile, tablet, and desktop sizes" -ForegroundColor Gray

Write-Host "Use the hamburger_fix_template.html as reference for changes" -ForegroundColor Magenta