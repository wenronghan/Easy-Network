@echo off
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0enable-autostart.ps1"
pause
