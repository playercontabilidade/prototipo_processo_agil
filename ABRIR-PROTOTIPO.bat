@echo off
chcp 65001 >nul
cd /d "%~dp0prototipo-modular"
if not exist "build.bat" (
  echo Pasta prototipo-modular nao encontrada.
  pause
  exit /b 1
)
call build.bat
