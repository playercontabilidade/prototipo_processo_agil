# Gera handoff-auditoria-cartoes = protótipo modular COMPLETO + trava de UI.
# Não remove código. Apenas aplica handoff.css + boot.
# Uso: powershell -ExecutionPolicy Bypass -File build.ps1

$ErrorActionPreference = "Stop"
$utf8 = [System.Text.UTF8Encoding]::new($false)

$root = Split-Path $PSScriptRoot -Parent
$modular = Join-Path $root "prototipo-modular"
$out = $PSScriptRoot

if (-not (Test-Path $modular)) { throw "prototipo-modular não encontrado" }

Write-Host "1/3 Build modular..."
& powershell -ExecutionPolicy Bypass -File (Join-Path $modular "build.ps1")
if ($LASTEXITCODE -ne 0) { throw "build modular falhou" }

Write-Host "2/3 Copiando app completo..."
Copy-Item (Join-Path $modular "styles.css") (Join-Path $out "styles.css") -Force
Copy-Item (Join-Path $modular "app.js") (Join-Path $out "app.js") -Force

$html = [System.IO.File]::ReadAllText((Join-Path $modular "menu-suspenso.html"), $utf8)
$html = $html -replace "<title>.*?</title>", "<title>Handoff · Gestão de Clientes</title>"
if ($html -notmatch "handoff\.css") {
  $html = $html -replace '(href="styles\.css"\s*/>)', "`$1`r`n  <link rel=`"stylesheet`" href=`"handoff.css`" />"
}
[System.IO.File]::WriteAllText((Join-Path $out "index.html"), $html, $utf8)

Write-Host "3/3 Anexando boot de handoff..."
$jsPath = Join-Path $out "app.js"
$js = [System.IO.File]::ReadAllText($jsPath, $utf8)
$js = [regex]::Replace($js, "(?s)/\* ===== HANDOFF ·[\s\S]*$", "")

$boot = @'

    /* ===== HANDOFF · Gestão de Clientes (perfil e sub-abas liberados) ===== */
    (function initHandoffAuditoriaCartoes() {
      document.documentElement.classList.add("handoff-auditoria");
      document.title = "Handoff · Gestão de Clientes";

      function goHandoffHome() {
        try {
          skipToast = true;
          if (!openTabIds.includes("clientes")) openTabIds.push("clientes");
          cliView = "lista";
          cliPerfilId = null;
          setSection("clientes", true);
          renderClientes();
          if (typeof renderTabs === "function") renderTabs();
        } catch (err) {
          console.error("[handoff-clientes]", err);
        }
      }

      document.addEventListener("click", (e) => {
        if (e.target.closest(".topbar")) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        const topTab = e.target.closest(".text-tab[data-id]");
        if (topTab && topTab.dataset.id !== "clientes") {
          e.preventDefault();
          e.stopPropagation();
          toast("Handoff: permaneça em Gestão de Clientes");
          return;
        }
        if (e.target.closest("[data-close-tab], [data-add-tab], #tabAddBtn, [data-switch-tab]")) {
          e.preventDefault();
          e.stopPropagation();
          toast("Handoff: navegação de abas do sistema está bloqueada");
        }
      }, true);

      setTimeout(goHandoffHome, 0);
    })();
'@

[System.IO.File]::WriteAllText($jsPath, $js.TrimEnd() + "`n" + $boot + "`n", $utf8)

Write-Host "OK -> handoff completo (com alterações do modular, incl. Regras)"
Write-Host ("styles.css: {0:N0} bytes" -f (Get-Item (Join-Path $out "styles.css")).Length)
Write-Host ("app.js:     {0:N0} bytes" -f (Get-Item $jsPath).Length)
Write-Host ("index.html: {0:N0} bytes" -f (Get-Item (Join-Path $out "index.html")).Length)
