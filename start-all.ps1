# Inject Node path safely just in case
$env:Path += ";C:\Program Files\nodejs;C:\Program Files (x86)\nodejs"

Write-Host "Opening Backend Server in a new window..." -ForegroundColor Cyan
Start-Process node.exe -ArgumentList "backend/server.js" -Title "Backend API Engine - :3000"

Write-Host "Opening PQC Gateway in a new window..." -ForegroundColor Green
Start-Process node.exe -ArgumentList "gateway/server.js" -Title "PQC Transparent Gateway - :4433"

Write-Host "Project is officially running! You can now test it." -ForegroundColor Yellow
