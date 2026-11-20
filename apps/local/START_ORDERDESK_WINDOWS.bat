@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  start "OrderDesk" cmd /k "py -3 -m http.server 8765 --bind 127.0.0.1"
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (
    start "OrderDesk" cmd /k "python -m http.server 8765 --bind 127.0.0.1"
  ) else (
    echo Python was not found. Open index.html directly for basic use.
    pause
    exit /b 1
  )
)
timeout /t 2 /nobreak >nul
start "" "http://localhost:8765"
endlocal
