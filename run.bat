@echo off
setlocal
cd /d "%~dp0"

echo.
echo  =========================================
echo    Karnataka Yatra - Kannada Digital
echo    Innovation Hackathon 2026
echo  =========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo  Node.js was not found. Install Node.js 18 or newer from https://nodejs.org
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" goto install
if not exist "node_modules\html2canvas" goto install
if not exist "node_modules\jspdf" goto install
goto start

:install
echo  Installing dependencies...
echo.
call npm install
if errorlevel 1 (
  echo.
  echo  Installation failed. Check the network connection and try again.
  pause
  exit /b 1
)

:start
echo.
echo  Starting Karnataka Yatra at http://localhost:3000
echo  Press Ctrl+C to stop the server.
echo.

start "" cmd /c "timeout /t 6 /nobreak >nul & start http://localhost:3000"
call npm run dev

endlocal
