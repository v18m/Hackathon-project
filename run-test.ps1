$ErrorActionPreference = "Stop"

# Safely inject normal Windows node installation paths into this temporary script runner
$env:Path += ";C:\Program Files\nodejs;C:\Program Files (x86)\nodejs"

Write-Host "============================" -ForegroundColor Cyan
Write-Host " Preparing Environment..." -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan

# Install using NPM cmd specifically to bypass .ps1 restrictions
& "C:\Program Files\nodejs\npm.cmd" install

Write-Host "`nGenerating PQC TLS Certificates..." -ForegroundColor Yellow
node.exe scripts/generateCerts.js

Write-Host "`n============================" -ForegroundColor Cyan
Write-Host " Starting PQC Proxy Demo Engine..." -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan

# Start Backend Server
Write-Host "-> Launching Cloud Backend (Port 3000)..."
$backend = Start-Process node.exe -ArgumentList "backend/server.js" -PassThru -WindowStyle Hidden

Start-Sleep -Seconds 2

# Start Gateway Proxy
Write-Host "-> Launching PQC Transparent Gateway (Port 4433)..."
$gateway = Start-Process node.exe -ArgumentList "gateway/server.js" -PassThru -WindowStyle Hidden

Start-Sleep -Seconds 3

Write-Host "`n============================" -ForegroundColor Green
Write-Host " FIRING CLIENT REQUEST" -ForegroundColor Green
Write-Host "============================" -ForegroundColor Green
Write-Host "Simulating standard HTTPS hit to our TLS-terminated frontend...`n"
node.exe client/request.js

Write-Host "`n============================" -ForegroundColor Cyan
Write-Host " DEMO COMPLETE - CLEANING UP" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
$backend | Stop-Process -Force
$gateway | Stop-Process -Force

Write-Host "Processes closed successfully. You can verify detailed internal PQC tunnels in logs/gateway.log" -ForegroundColor DarkGray
