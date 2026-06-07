$ErrorActionPreference = "Stop"

$node = Join-Path $env:LOCALAPPDATA "OpenAI\Codex\bin\node.exe"
if (-not (Test-Path $node)) {
  $node = "node"
}

Start-Process -FilePath $node -ArgumentList "server.js" -WorkingDirectory $PSScriptRoot -WindowStyle Hidden
