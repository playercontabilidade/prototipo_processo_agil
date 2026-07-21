@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Gerando prototipo (CSS + JS + HTML)...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0build.ps1"
if errorlevel 1 (
  echo.
  echo ERRO no build.
  pause
  exit /b 1
)
echo.
echo Pronto. Abrindo menu-suspenso.html...
start "" "%~dp0menu-suspenso.html"
pause
