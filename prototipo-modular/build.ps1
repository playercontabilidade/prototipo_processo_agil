# Concatena css/ e js/, depois junta partials HTML em menu-suspenso.html.
# Uso: powershell -ExecutionPolicy Bypass -File build.ps1

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$utf8 = [System.Text.UTF8Encoding]::new($false)

function Join-Partials([string]$dir, [string]$pattern, [string]$outFile) {
  $files = Get-ChildItem -Path (Join-Path $root $dir) -Filter $pattern |
    Where-Object { $_.Name -notlike '_*' } |
    Sort-Object Name
  if ($files.Count -eq 0) { throw "Nenhum partial em $dir ($pattern)" }
  $allLines = New-Object System.Collections.Generic.List[string]
  foreach ($f in $files) {
    $lines = [System.IO.File]::ReadAllLines($f.FullName, $utf8)
    foreach ($line in $lines) { [void]$allLines.Add($line) }
  }
  $outPath = Join-Path $root $outFile
  [System.IO.File]::WriteAllLines($outPath, $allLines, $utf8)
}

Join-Partials "css" "*.css" "styles.css"
Join-Partials "js" "*.js" "app.js"

$partials = Join-Path $root "partials"
$out = Join-Path $root "menu-suspenso.html"

function Add-File([string]$name, [System.Text.StringBuilder]$sb) {
  $path = Join-Path $partials $name
  if (-not (Test-Path $path)) { throw "Partial ausente: $name" }
  $text = [System.IO.File]::ReadAllText($path, $utf8)
  [void]$sb.Append($text.TrimEnd())
  [void]$sb.Append("`r`n")
}

$sb = New-Object System.Text.StringBuilder
Add-File "01-head.html" $sb
[void]$sb.Append("<body>`r`n")
[void]$sb.Append("  <div class=`"app`">`r`n")
Add-File "02-topbar.html" $sb
Add-File "03-main-open.html" $sb
Add-File "04-panel-toolbar.html" $sb
Add-File "05-dashboard.html" $sb
Add-File "06-panel-views.html" $sb
Add-File "07-agenda.html" $sb
Add-File "08-main-close.html" $sb
[void]$sb.Append("  </div>`r`n`r`n")
Add-File "09-overlays.html" $sb
[void]$sb.Append("`r`n")
Add-File "10-scripts.html" $sb
[void]$sb.Append("</body>`r`n")
[void]$sb.Append("</html>`r`n")

[System.IO.File]::WriteAllText($out, $sb.ToString(), $utf8)

$cssPath = Join-Path $root "styles.css"
$jsPath = Join-Path $root "app.js"
$indexPath = Join-Path $root "index.html"
Copy-Item -Path $out -Destination $indexPath -Force

# Publicação GitHub Pages: espelha o build na raiz do repositório
$parent = Split-Path $root -Parent
Copy-Item -Path $out -Destination (Join-Path $parent "index.html") -Force
Copy-Item -Path $out -Destination (Join-Path $parent "menu-suspenso.html") -Force
Copy-Item -Path $cssPath -Destination (Join-Path $parent "styles.css") -Force
Copy-Item -Path $jsPath -Destination (Join-Path $parent "app.js") -Force

Write-Host "OK -> styles.css, app.js, menu-suspenso.html, index.html (+ raiz)"
Write-Host ("styles.css:        {0:N0} bytes" -f (Get-Item $cssPath).Length)
Write-Host ("app.js:            {0:N0} bytes" -f (Get-Item $jsPath).Length)
Write-Host ("menu-suspenso.html: {0:N0} bytes" -f (Get-Item $out).Length)
Write-Host ("index.html:        {0:N0} bytes" -f (Get-Item $indexPath).Length)
