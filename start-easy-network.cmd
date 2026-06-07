@echo off
setlocal
cd /d "%~dp0"

set "PORT=4173"
set "URL=http://127.0.0.1:%PORT%/index.html"
set "NODE_EXE=%LocalAppData%\OpenAI\Codex\bin\node.exe"

if not exist "%NODE_EXE%" (
  set "NODE_EXE=node"
)

echo Starting Easy Network at %URL%
echo Keep this window open while using the site.
echo.
echo Open this link after the server line appears:
echo %URL%
echo.

"%NODE_EXE%" server.js
echo.
echo Server stopped. Press any key to close this window.
pause >nul
