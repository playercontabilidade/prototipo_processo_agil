    function renderCliFinAuditModalTabsHtml() {
      const tabs = [
        { id: "relatorio", label: "Relatório Técnico" },
        { id: "dashboard", label: "Dashboard Analítico" },
      ];
      const cur = ["relatorio", "dashboard"].includes(cliFinAudit.modalTab)
        ? cliFinAudit.modalTab
        : "relatorio";
      const pane = cur === "dashboard"
        ? renderCliFinAuditAnaliticoHtml()
        : renderCliFinAuditDashboardHtml();
      return `
        <div class="cli-fin-audit-tabs" role="tablist" aria-label="Navegação da auditoria">
          ${tabs.map((t) => `
            <button type="button" class="cli-fin-audit-tab${cur === t.id ? " active" : ""}" role="tab" aria-selected="${cur === t.id}" data-cli-fin-audit-tab="${t.id}">${t.label}</button>
          `).join("")}
        </div>
        ${pane}`;
    }

    function renderCliFinAuditResultadosHtml() {
      return `
        <div class="cli-fin-audit-modal-body">
          ${renderCliFinAuditModalTabsHtml()}
        </div>`;
    }

    function parseAcqParcelasToFaixas(raw) {
      const text = String(raw || "").trim();
      if (!text || text === "—") {
        return [{ de: "1", ate: "1", taxa: "" }];
      }
      if (text.includes(":")) {
        return text.split(";").map((part) => {
          const [range, taxa] = part.split(":");
          const [de, ate] = String(range || "").split("-");
          return {
            de: String(de || "").trim() || "1",
            ate: String(ate || de || "").trim() || "1",
            taxa: String(taxa || "").replace("%", "").trim(),
          };
        }).filter((f) => f.de || f.ate || f.taxa);
      }
      const parts = text.split(/[·•|]/).map((p) => p.trim()).filter(Boolean);
      const faixas = parts.map((part) => {
        const m = part.match(/(\d+)\s*[–\-xX]\s*(\d+)?\s*[xX]?\s*([\d.,]+)\s*%?/);
        if (!m) {
          const av = part.match(/à\s*vista\s*([\d.,]+)\s*%?/i);
          if (av) return { de: "1", ate: "1", taxa: av[1].replace(".", ",") };
          return null;
        }
        const de = m[1];
        const ate = m[2] || m[1];
        return { de, ate, taxa: String(m[3] || "").replace(".", ",") };
      }).filter(Boolean);
      return faixas.length ? faixas : [{ de: "1", ate: "1", taxa: "" }];
    }

    function formatAcqFaixasLabel(faixas) {
      const list = (faixas || []).filter((f) => f && (f.de || f.ate || f.taxa));
      if (!list.length) return "—";
      return list.map((f) => {
        const de = f.de || "1";
        const ate = f.ate || de;
        const taxa = String(f.taxa || "").trim();
        if (de === ate) return `${de}x ${taxa}%`;
        return `${de}–${ate}x ${taxa}%`;
      }).join(" · ");
    }

    function formatAcqFaixasStorage(faixas) {
      return (faixas || [])
        .filter((f) => f && (f.de || f.ate || f.taxa))
        .map((f) => `${f.de || "1"}-${f.ate || f.de || "1"}:${String(f.taxa || "").trim()}`)
        .join(";");
    }

    function brDateToIso(br) {
      if (!br) return "";
      if (/^\d{4}-\d{2}-\d{2}$/.test(br)) return br;
      const m = String(br).match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      return m ? `${m[3]}-${m[2]}-${m[1]}` : "";
    }

    function ensureAcqFormState() {
      if (!finDash.config.acqForm) {
        finDash.config.acqForm = {
          editingId: null,
          bandMenuOpen: false,
          operadora: "Stone",
          inicio: "2026-01-01",
          fim: "2026-12-31",
          bandeiras: ["Visa"],
          tipoLanc: "credito",
          descontoPct: "2,49",
          antecipacaoPct: "1,20",
          parcelasFaixas: [
            { de: "1", ate: "1", taxa: "2,49" },
            { de: "2", ate: "6", taxa: "3,19" },
            { de: "7", ate: "12", taxa: "3,99" },
          ],
        };
      }
      const f = finDash.config.acqForm;
      if (!Array.isArray(f.parcelasFaixas) || !f.parcelasFaixas.length) {
        f.parcelasFaixas = parseAcqParcelasToFaixas(f.parcelas || "");
      }
      if (!Array.isArray(f.bandeiras)) f.bandeiras = [];
      if (f.bandeiras.length > 1) f.bandeiras = [f.bandeiras[0]];
      return f;
    }

    function syncAcqFormFromDom() {
      const f = ensureAcqFormState();
      const op = document.getElementById("finAcqOp");
      const tipo = document.getElementById("finAcqTipo");
      const ini = document.getElementById("finAcqIni");
      const fim = document.getElementById("finAcqFim");
      const desc = document.getElementById("finAcqDesc");
      const ant = document.getElementById("finAcqAnt");
      if (op) f.operadora = op.value;
      if (tipo) f.tipoLanc = tipo.value;
      if (ini) f.inicio = ini.value;
      if (fim) f.fim = fim.value;
      if (desc) f.descontoPct = desc.value;
      if (ant) f.antecipacaoPct = ant.value;
      const picked = document.querySelector("#finAcqBandMenu [data-fin-acq-band][aria-selected='true']");
      if (picked) f.bandeiras = [picked.dataset.finAcqBand];
      else if (document.getElementById("finAcqBandMenu") && f.bandeiras.length > 1) f.bandeiras = [f.bandeiras[0]];
      const rows = [...document.querySelectorAll(".fin-acq-faixa-row")];
      if (rows.length) {
        f.parcelasFaixas = rows.map((row) => ({
          de: row.querySelector('[data-fin-acq-faixa="de"]')?.value?.trim() || "",
          ate: row.querySelector('[data-fin-acq-faixa="ate"]')?.value?.trim() || "",
          taxa: row.querySelector('[data-fin-acq-faixa="taxa"]')?.value?.trim() || "",
        }));
      }
      return f;
    }

    function resetAcqForm(opts = {}) {
      finDash.config.acqForm = {
        editingId: null,
        bandMenuOpen: false,
        operadora: "Stone",
        inicio: "2026-01-01",
        fim: "2026-12-31",
        bandeiras: ["Visa"],
        tipoLanc: "credito",
        descontoPct: "2,49",
        antecipacaoPct: "1,20",
        parcelasFaixas: [
          { de: "1", ate: "1", taxa: "2,49" },
          { de: "2", ate: "6", taxa: "3,19" },
          { de: "7", ate: "12", taxa: "3,99" },
        ],
      };
      if (opts.refresh) refreshAcqUi();
    }

    function loadAcqFormFromRule(rule) {
      if (!rule) return;
      const bands = [...(rule.bandeiras || [])];
      finDash.config.acqForm = {
        editingId: rule.id,
        bandMenuOpen: false,
        operadora: rule.operadora || "Stone",
        inicio: brDateToIso(rule.inicio) || "",
        fim: brDateToIso(rule.fim) || "",
        bandeiras: bands.length ? [bands[0]] : [],
        tipoLanc: rule.tipoLanc || "credito",
        descontoPct: String(rule.descontoPct ?? "").replace(".", ","),
        antecipacaoPct: String(rule.antecipacaoPct ?? "").replace(".", ","),
        parcelasFaixas: parseAcqParcelasToFaixas(rule.parcelas || ""),
      };
    }

    function refreshAcqUi() {
      if (cliFinAudit.rulesModalOpen && backdrop.classList.contains("open")) {
        refreshCliFinAuditRulesModal();
        return;
      }
      if (finDash.tab === "config" || finDash.tab === "cartoes") renderFinModuleDash();
      else if (cliPerfilTab === "financeiro" && cliFinSubTab === "auditoria") renderClientes();
    }

    function syncFinEmpresaFromCliente(clienteId) {
      const id = clienteId || cliPerfilId;
      const c = CLIENTES.find((x) => x.id === id);
      if (!c) return null;
      finDash.empresaId = c.id;
      finDash.unidade = c.id;
      finDash.empresaQuery = c.fantasia || c.nome || "";
      finDash.acOpen = false;
      return c;
    }

    function openFinModuleSection(tab, toastMsg) {
      syncFinEmpresaFromCliente(cliPerfilId);
      if (!openTabIds.includes("financeiro")) openTabIds.push("financeiro");
      ensureFinOpenTabs();
      if (!finDash.openTabIds.includes(tab)) finDash.openTabIds.push(tab);
      skipToast = true;
      setSection("financeiro", true);
      finDash.tab = tab;
      if (tab === "config") finDash.config.section = "adquirentes";
      renderFinModuleDash();
      if (toastMsg) toast(toastMsg);
    }

    function openFinModuleAudit(tab) {
      const next = tab === "config" ? "config" : "cartoes";
      openFinModuleSection(next, next === "config"
        ? "Regras e Adquirentes · Módulo Contábil"
        : "Auditoria de Cartões · Módulo Contábil");
    }

    function openFinModuleTitulos(sub) {
      const next = sub === "receber" ? "receber" : "pagar";
      syncFinEmpresaFromCliente(cliPerfilId);
      if (!openTabIds.includes("financeiro")) openTabIds.push("financeiro");
      ensureFinOpenTabs();
      if (!finDash.openTabIds.includes("titulos")) finDash.openTabIds.push("titulos");
      skipToast = true;
      setSection("financeiro", true);
      finDash.tab = "titulos";
      finDash.titulosSub = next;
      cliFinTituloStatusFiltro = "";
      cliFinTituloSelectedIds = new Set();
      renderFinModuleDash();
      toast(next === "receber"
        ? "Títulos a Receber · Módulo Contábil"
        : "Títulos a Pagar · Módulo Contábil");
    }

    function openFinModuleConciliacao() {
      openFinModuleSection("conciliacao", "Conciliação Bancária · Módulo Contábil");
    }

    function openFinModulePlano() {
      openFinModuleSection("plano", "Plano de Contas · Módulo Contábil");
    }

    function renderFinAdquirentesListHtml(opts = {}) {
      const acqs = ensureFinAdquirentes();
      const editingId = ensureAcqFormState().editingId;
      const showRemove = !!opts.showRemove;
      return `
        <div class="fin-op-card fin-acq-list-card">
          <div class="fin-card-head">
            <h4>Regras cadastradas</h4>
            <span class="chart-sub">${acqs.length} acordo${acqs.length === 1 ? "" : "s"} ativo${acqs.length === 1 ? "" : "s"} — clique para editar.</span>
          </div>
          <div class="fin-acq-list">
            ${acqs.map((a) => `
              <article class="fin-acq-item${editingId === a.id ? " is-editing" : ""}" data-fin-acq-edit="${a.id}" role="button" tabindex="0">
                <div class="fin-acq-item-top">
                  <strong>${uiSelectEscape(a.operadora)}</strong>
                  <span class="fin-status-pill ${a.tipoLanc === "credito" ? "conciliado" : (a.tipoLanc === "pix" ? "pago" : "pendente")}">${a.tipoLanc === "credito" ? "Crédito" : (a.tipoLanc === "pix" ? "Pix" : "Débito")}</span>
                </div>
                <div class="fin-acq-meta">${uiSelectEscape((a.bandeiras || []).join(" · "))} · ${uiSelectEscape(a.inicio)} → ${uiSelectEscape(a.fim)}</div>
                <div class="fin-acq-rates">
                  <span>Desconto <b>${String(a.descontoPct).replace(".", ",")}%</b></span>
                  <span>Antecipação <b>${String(a.antecipacaoPct).replace(".", ",")}%</b></span>
                </div>
                <div class="fin-acq-parc">${uiSelectEscape(a.parcelas || "—")}</div>
                ${showRemove ? `<button type="button" class="btn-ghost sm" data-fin-cfg-del-acq="${a.id}">Remover</button>` : ""}
              </article>`).join("") || `<div class="fin-table-empty">Nenhum acordo cadastrado.</div>`}
          </div>
        </div>`;
    }

    function renderFinAdquirentesHtml(opts = {}) {
      const f = ensureAcqFormState();
      const bandeirasOpts = ["Visa", "Mastercard", "Elo", "Amex", "Hipercard"];
      const selectedBand = (f.bandeiras && f.bandeiras[0]) || "";
      const editing = !!f.editingId;
      const saveLabel = editing ? "Atualizar regra" : (opts.saveLabel || "Salvar regra");
      const saveAttr = opts.saveAttr || 'data-fin-cfg="save-acq"';
      const stacked = !!opts.stacked;
      const faixas = f.parcelasFaixas?.length ? f.parcelasFaixas : [{ de: "1", ate: "1", taxa: "" }];
      const bandTriggerLabel = selectedBand || "Selecionar bandeira";
      return `
        <div class="fin-config-acq-grid${stacked ? " is-stacked" : ""}">
          <div class="fin-emit-card fin-acq-form-card">
            <div class="fin-emit-head">
              <div>
                <h3>${stacked ? "Regras e Adquirentes" : "Acordo comercial (adquirente)"}</h3>
                <p>${editing
                  ? "Editando acordo existente — altere os campos e clique em Atualizar regra."
                  : (stacked
                    ? "Cadastre operadora, bandeiras e taxas usadas no cruzamento desta auditoria."
                    : "Cadastre operadora, bandeiras e taxas usadas no cruzamento da Auditoria de Cartões.")}</p>
              </div>
            </div>
            <div class="fin-acq-form">
              <label class="fin-field">
                <span>Nome da Adquirente</span>
                <select id="finAcqOp" data-no-ui="1">
                  ${["Stone", "Cielo", "Rede", "Getnet", "PagSeguro"].map((o) => `
                    <option value="${o}" ${f.operadora === o ? "selected" : ""}>${o}</option>`).join("")}
                </select>
              </label>
              <label class="fin-field">
                <span>Tipo</span>
                <select id="finAcqTipo" data-no-ui="1">
                  <option value="credito" ${f.tipoLanc === "credito" ? "selected" : ""}>Crédito</option>
                  <option value="debito" ${f.tipoLanc === "debito" ? "selected" : ""}>Débito</option>
                  <option value="pix" ${f.tipoLanc === "pix" ? "selected" : ""}>Pix</option>
                </select>
              </label>
              <label class="fin-field">
                <span>Início do contrato</span>
                <input type="date" id="finAcqIni" value="${uiSelectEscape(f.inicio || "")}" />
              </label>
              <label class="fin-field">
                <span>Fim do contrato</span>
                <input type="date" id="finAcqFim" value="${uiSelectEscape(f.fim || "")}" />
              </label>
              <div class="fin-field fin-field-wide">
                <span>Bandeira</span>
                <div class="fin-acq-band-dd${f.bandMenuOpen ? " is-open" : ""}" id="finAcqBandWrap">
                  <button type="button" class="fin-acq-band-trigger" data-fin-acq="band-toggle" aria-expanded="${!!f.bandMenuOpen}">
                    <span class="${selectedBand ? "" : "is-placeholder"}">${uiSelectEscape(bandTriggerLabel)}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                  <div class="fin-acq-band-menu" id="finAcqBandMenu" role="listbox" ${f.bandMenuOpen ? "" : "hidden"}>
                    ${bandeirasOpts.map((b) => `
                      <button type="button" class="fin-acq-band-option${selectedBand === b ? " is-selected" : ""}" data-fin-acq-band="${b}" role="option" aria-selected="${selectedBand === b}">
                        ${uiSelectEscape(b)}
                      </button>`).join("")}
                  </div>
                </div>
              </div>
              <label class="fin-field">
                <span>Desconto padrão (%)</span>
                <input type="text" id="finAcqDesc" inputmode="decimal" placeholder="2,49" value="${uiSelectEscape(f.descontoPct || "")}" />
              </label>
              <label class="fin-field">
                <span>Taxa de Antecipação (%)</span>
                <input type="text" id="finAcqAnt" inputmode="decimal" placeholder="1,20" value="${uiSelectEscape(f.antecipacaoPct || "")}" />
              </label>
              <div class="fin-field fin-field-wide">
                <span>Faixas de parcelas</span>
                <div class="fin-acq-faixas" id="finAcqFaixas">
                  <div class="fin-acq-faixas-head" aria-hidden="true">
                    <span>De</span><span>Até</span><span>Taxa %</span><span></span>
                  </div>
                  ${faixas.map((fx, i) => `
                    <div class="fin-acq-faixa-row">
                      <input type="number" min="1" max="48" inputmode="numeric" data-fin-acq-faixa="de" value="${uiSelectEscape(fx.de || "")}" aria-label="Parcela inicial" />
                      <input type="number" min="1" max="48" inputmode="numeric" data-fin-acq-faixa="ate" value="${uiSelectEscape(fx.ate || "")}" aria-label="Parcela final" />
                      <input type="text" inputmode="decimal" data-fin-acq-faixa="taxa" placeholder="2,49" value="${uiSelectEscape(fx.taxa || "")}" aria-label="Taxa da faixa" />
                      <button type="button" class="fin-acq-faixa-del" data-fin-acq-faixa-del="${i}" aria-label="Remover faixa" ${faixas.length <= 1 ? "disabled" : ""}>×</button>
                    </div>`).join("")}
                  <button type="button" class="fin-acq-faixa-add" data-fin-acq="faixa-add">+ Adicionar faixa</button>
                </div>
              </div>
              <div class="fin-emit-actions">
                ${editing ? `<button type="button" class="btn-ghost" data-fin-acq="cancel-edit">Descartar alterações</button>` : ""}
                <button type="button" class="btn-primary" ${saveAttr}>${saveLabel}</button>
              </div>
            </div>
          </div>
          ${renderFinAdquirentesListHtml({ showRemove: !!opts.showRemove })}
        </div>`;
    }

    function renderCliFinAuditRulesModalInner() {
      return renderFinAdquirentesHtml({ stacked: true, saveLabel: "Salvar regra" });
    }

    function renderCliFinAuditRulesHeadExpandHtml() {
      const expanded = !!cliFinAudit.rulesExpanded;
      return `
        <button type="button" class="btn-expand tip-bottom" data-cli-fin-audit="rules-expand" data-tip="${expanded ? "Sair da tela toda" : "Expandir para tela toda"}" aria-label="${expanded ? "Sair da tela toda" : "Expandir"}" aria-pressed="${expanded}">
          <svg class="icon-expand" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ${expanded ? "hidden" : ""}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
          <svg class="icon-collapse" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ${expanded ? "" : "hidden"}><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
        </button>`;
    }

    function setCliFinAuditRulesExpanded(on) {
      cliFinAudit.rulesExpanded = !!on;
      modal.classList.toggle("is-expanded", !!(cliFinAudit.rulesModalOpen && cliFinAudit.rulesExpanded));
      const btn = document.querySelector("#modalHeadTools [data-cli-fin-audit='rules-expand']");
      if (btn) {
        const expandIcon = btn.querySelector(".icon-expand");
        const collapseIcon = btn.querySelector(".icon-collapse");
        if (expandIcon) expandIcon.hidden = !!on;
        if (collapseIcon) collapseIcon.hidden = !on;
        btn.setAttribute("data-tip", on ? "Sair da tela toda" : "Expandir para tela toda");
        btn.setAttribute("aria-label", on ? "Sair da tela toda" : "Expandir");
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      }
      if (cliFinAudit.rulesModalOpen) {
        modalBody.style.maxHeight = on ? "none" : "min(72vh, 720px)";
      }
    }

    function openCliFinAuditRulesModal() {
      const c = resolveFinAuditCliente();
      cliFinAudit.rulesModalOpen = true;
      cliFinAudit.modalOpen = false;
      cliFinAudit.filterOpen = false;
      cliFinAudit.rulesExpanded = false;
      ensureAcqFormState().bandMenuOpen = false;
      openModal({
        title: "Regras e Adquirentes",
        sub: `${c?.fantasia || c?.nome || "Cliente"} · taxas usadas no cruzamento da auditoria`,
        body: renderFinAdquirentesHtml({ stacked: true, saveLabel: "Salvar regra", saveAttr: 'data-fin-cfg="save-acq"' }),
        wide: true,
        auditRules: true,
        foot: `<button type="button" class="btn-ghost" data-close>Cancelar</button>`,
      });
      const tools = document.getElementById("modalHeadTools");
      const closeBtn = document.getElementById("modalClose");
      if (tools) {
        tools.hidden = false;
        tools.innerHTML = renderCliFinAuditRulesHeadExpandHtml();
      }
      if (closeBtn) closeBtn.hidden = true;
      setCliFinAuditRulesExpanded(false);
    }

    function refreshCliFinAuditRulesModal() {
      if (!cliFinAudit.rulesModalOpen || !backdrop.classList.contains("open")) return;
      const c = resolveFinAuditCliente();
      modalSub.textContent = `${c?.fantasia || c?.nome || "Cliente"} · taxas usadas no cruzamento da auditoria`;
      modalBody.innerHTML = renderFinAdquirentesHtml({ stacked: true, saveLabel: "Salvar regra", saveAttr: 'data-fin-cfg="save-acq"' });
      enhanceUiSelects(modalBody);
      const tools = document.getElementById("modalHeadTools");
      if (tools) tools.innerHTML = renderCliFinAuditRulesHeadExpandHtml();
      setCliFinAuditRulesExpanded(!!cliFinAudit.rulesExpanded);
    }

    function saveCliFinAcqFromDom(opts = {}) {
      const f = syncAcqFormFromDom();
      const bands = [...(f.bandeiras || [])];
      const op = f.operadora || "Stone";
      const ini = f.inicio || "";
      const fim = f.fim || "";
      const tipo = f.tipoLanc || "credito";
      const descPct = parseFinValorInput(f.descontoPct || "");
      const antPct = parseFinValorInput(f.antecipacaoPct || "");
      const faixas = (f.parcelasFaixas || []).filter((row) => row.de || row.ate || row.taxa);
      const parcelas = formatAcqFaixasLabel(faixas);
      if (!bands.length || !Number.isFinite(descPct)) {
        toast("Selecione a bandeira e informe o desconto %");
        return false;
      }
      if (!faixas.length) {
        toast("Adicione ao menos uma faixa de parcelas");
        return false;
      }
      const payload = {
        operadora: op,
        inicio: formatFinDateBR(ini) || "—",
        fim: formatFinDateBR(fim) || "—",
        bandeiras: bands,
        tipoLanc: tipo,
        descontoPct: descPct,
        antecipacaoPct: Number.isFinite(antPct) ? antPct : 0,
        parcelas: parcelas || "—",
        parcelasRaw: formatAcqFaixasStorage(faixas),
      };
      const list = ensureFinAdquirentes();
      if (f.editingId) {
        const idx = list.findIndex((a) => a.id === f.editingId);
        if (idx >= 0) {
          list[idx] = { ...list[idx], ...payload };
          if (!opts.silent) toast(`Acordo ${op} atualizado`);
        } else {
          list.unshift({ id: f.editingId, ...payload });
          if (!opts.silent) toast(`Acordo ${op} salvo`);
        }
      } else {
        list.unshift({ id: `aq${Date.now()}`, ...payload });
        if (!opts.silent) toast(`Acordo ${op} salvo — disponível na Auditoria de Cartões`);
      }
      resetAcqForm();
      return true;
    }

    function handleFinAcqUiEvent(e) {
      const bandToggle = e.target.closest("[data-fin-acq='band-toggle']");
      if (bandToggle) {
        e.preventDefault();
        syncAcqFormFromDom();
        const f = ensureAcqFormState();
        f.bandMenuOpen = !f.bandMenuOpen;
        refreshAcqUi();
        return true;
      }
      const bandPick = e.target.closest("#finAcqBandMenu [data-fin-acq-band]");
      if (bandPick) {
        e.preventDefault();
        syncAcqFormFromDom();
        const f = ensureAcqFormState();
        f.bandeiras = [bandPick.dataset.finAcqBand];
        f.bandMenuOpen = false;
        refreshAcqUi();
        return true;
      }
      const faixaAdd = e.target.closest("[data-fin-acq='faixa-add']");
      if (faixaAdd) {
        e.preventDefault();
        syncAcqFormFromDom();
        const f = ensureAcqFormState();
        f.parcelasFaixas = f.parcelasFaixas || [];
        f.parcelasFaixas.push({ de: "", ate: "", taxa: "" });
        f.bandMenuOpen = false;
        refreshAcqUi();
        return true;
      }
      const faixaDel = e.target.closest("[data-fin-acq-faixa-del]");
      if (faixaDel) {
        e.preventDefault();
        syncAcqFormFromDom();
        const idx = Number(faixaDel.dataset.finAcqFaixaDel);
        const f = ensureAcqFormState();
        if ((f.parcelasFaixas || []).length <= 1) return true;
        f.parcelasFaixas.splice(idx, 1);
        f.bandMenuOpen = false;
        refreshAcqUi();
        return true;
      }
      const cancelEdit = e.target.closest("[data-fin-acq='cancel-edit']");
      if (cancelEdit) {
        e.preventDefault();
        resetAcqForm({ refresh: true });
        toast("Alterações descartadas");
        return true;
      }
      if (e.target.closest("[data-fin-cfg-del-acq]")) return false;
      const editCard = e.target.closest("[data-fin-acq-edit]");
      if (editCard) {
        e.preventDefault();
        const id = editCard.dataset.finAcqEdit;
        const rule = ensureFinAdquirentes().find((a) => a.id === id);
        if (!rule) return true;
        loadAcqFormFromRule(rule);
        refreshAcqUi();
        toast(`Editando acordo ${rule.operadora}`);
        return true;
      }
      return false;
    }

    function ensureCliFinAuditView() {
      if (!cliFinAudit.view) {
        cliFinAudit.view = Object.fromEntries(CLI_FIN_AUDIT_VIEW_OPTS.map((o) => [o.value, true]));
      }
      CLI_FIN_AUDIT_VIEW_OPTS.forEach((o) => {
        if (cliFinAudit.view[o.value] === undefined) cliFinAudit.view[o.value] = true;
      });
      return cliFinAudit.view;
    }

    function applyCliFinAuditView() {
      const v = ensureCliFinAuditView();
      modalBody.querySelectorAll("[data-cli-fin-audit-view]").forEach((el) => {
        const key = el.dataset.cliFinAuditView;
        const show = v[key] !== false;
        el.hidden = !show;
        el.style.display = show ? "" : "none";
      });
    }

    function renderCliFinAuditHeadToolsHtml() {
      const expanded = !!cliFinAudit.expanded;
      const filterOpen = !!cliFinAudit.filterOpen;
      const view = ensureCliFinAuditView();
      const tab = cliFinAudit.modalTab;
      const groups = tab === "dashboard" ? ["Dashboard"] : ["Relatório"];
      const tip = tab === "dashboard" ? "Escolher seções do dashboard" : "Escolher seções do relatório";
      const hint = tab === "dashboard"
        ? "Marque o que deseja exibir no Dashboard Analítico."
        : "Marque o que deseja exibir no Relatório Técnico.";
      return `
        <div class="btn-filter-wrap cli-fin-audit-filter-wrap${filterOpen ? " open" : ""}" id="cliFinAuditFilterWrap">
          <button type="button" class="btn-filter tip-bottom${filterOpen ? " active" : ""}" data-cli-fin-audit="filter" data-tip="${tip}" aria-label="Filtros de visão" aria-expanded="${filterOpen}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          </button>
          <div class="filter-panel" role="dialog" aria-label="Visão da auditoria">
            <h5>Visão da auditoria</h5>
            <p class="filter-hint">${hint}</p>
            ${groups.map((g) => `
              <div style="margin-top:8px;margin-bottom:4px;font-size:.68rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.04em">${g}</div>
              ${CLI_FIN_AUDIT_VIEW_OPTS.filter((o) => o.group === g).map((o) => `
                <label class="filter-option">
                  <input type="checkbox" data-cli-fin-audit-view-toggle="${o.value}" ${view[o.value] !== false ? "checked" : ""} />
                  ${o.label.replace(/^KPI · |^Gráfico · |^Lista · /, "")}
                </label>`).join("")}
            `).join("")}
            <div class="filter-actions" style="margin-top:10px">
              <button type="button" class="linkish" data-cli-fin-audit="view-all">Marcar todos</button>
              <button type="button" class="linkish" data-cli-fin-audit="view-none">Limpar</button>
            </div>
          </div>
        </div>
        <button type="button" class="btn-expand tip-bottom" data-cli-fin-audit="expand" data-tip="${expanded ? "Sair da tela toda" : "Expandir para tela toda"}" aria-label="${expanded ? "Sair da tela toda" : "Expandir"}" aria-pressed="${expanded}">
          <svg class="icon-expand" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ${expanded ? "hidden" : ""}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
          <svg class="icon-collapse" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ${expanded ? "" : "hidden"}><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
        </button>`;
    }

    function syncCliFinAuditHeadTools() {
      const tools = document.getElementById("modalHeadTools");
      const closeBtn = document.getElementById("modalClose");
      if (!tools) return;
      if (cliFinAudit.modalOpen) {
        tools.hidden = false;
        tools.innerHTML = renderCliFinAuditHeadToolsHtml();
        if (closeBtn) closeBtn.hidden = true;
        return;
      }
      tools.innerHTML = "";
      tools.hidden = true;
      if (closeBtn) closeBtn.hidden = true;
    }

    function setCliFinAuditExpanded(on) {
      cliFinAudit.expanded = !!on;
      modal.classList.toggle("is-expanded", !!(cliFinAudit.modalOpen && cliFinAudit.expanded));
      const btn = document.querySelector("#modalHeadTools [data-cli-fin-audit='expand']")
        || modalBody.querySelector("[data-cli-fin-audit='expand']");
      if (btn) {
        const expandIcon = btn.querySelector(".icon-expand");
        const collapseIcon = btn.querySelector(".icon-collapse");
        if (expandIcon) expandIcon.hidden = !!on;
        if (collapseIcon) collapseIcon.hidden = !on;
        btn.setAttribute("data-tip", on ? "Sair da tela toda" : "Expandir para tela toda");
        btn.setAttribute("aria-label", on ? "Sair da tela toda" : "Expandir");
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      }
      if (cliFinAudit.modalOpen) {
        modalBody.style.maxHeight = on ? "none" : "min(78vh, 760px)";
      }
    }

    function renderCliFinAuditModalInner() {
      return renderCliFinAuditResultadosHtml();
    }

    function resolveFinAuditCliente() {
      const id = finDash.empresaId || cliPerfilId;
      return CLIENTES.find((x) => x.id === id) || null;
    }

    function openCliFinAuditModal() {
      const c = resolveFinAuditCliente();
      cliFinAudit.modalOpen = true;
      cliFinAudit.rulesModalOpen = false;
      cliFinAudit.filterOpen = false;
      if (!["relatorio", "dashboard"].includes(cliFinAudit.modalTab)) {
        cliFinAudit.modalTab = "relatorio";
      }
      openModal({
        title: "Auditoria de Cartões",
        sub: `${c?.fantasia || c?.nome || "Cliente"} · ${cliFinAuditPeriodLabel()}${cliFinAudit.fileName ? ` · ${cliFinAudit.fileName}` : ""}`,
        audit: true,
        body: renderCliFinAuditModalInner(),
        foot: `<button type="button" class="btn-ghost" data-close>Fechar</button>`,
      });
      syncCliFinAuditHeadTools();
      applyCliFinAuditView();
      setCliFinAuditExpanded(!!cliFinAudit.expanded);
      destroyCliFinLaudoChart();
      if (cliFinAudit.modalTab === "dashboard") {
        requestAnimationFrame(() => initCliFinAuditDashboardCharts(getCliFinAuditLaudoModel()));
      }
      requestAnimationFrame(() => syncCliFinLaudoIcons());
    }

    function refreshCliFinAuditModal() {
      if (!cliFinAudit.modalOpen || !backdrop.classList.contains("open")) return;
      const c = resolveFinAuditCliente();
      modalSub.textContent = `${c?.fantasia || c?.nome || "Cliente"} · ${cliFinAuditPeriodLabel()}${cliFinAudit.fileName ? ` · ${cliFinAudit.fileName}` : ""}`;
      modalBody.innerHTML = renderCliFinAuditModalInner();
      modalFoot.innerHTML = `<button type="button" class="btn-ghost" data-close>Fechar</button>`;
      syncModalCloseWithFoot();
      enhanceUiSelects(modalBody);
      syncCliFinAuditHeadTools();
      applyCliFinAuditView();
      setCliFinAuditExpanded(!!cliFinAudit.expanded);
      destroyCliFinLaudoChart();
      if (cliFinAudit.modalTab === "dashboard") {
        requestAnimationFrame(() => initCliFinAuditDashboardCharts(getCliFinAuditLaudoModel()));
      }
      requestAnimationFrame(() => syncCliFinLaudoIcons());
    }

    function ensureCliHonorarios(c) {
      if (!cliHonorariosByClient[c.id]) {
        cliHonorariosByClient[c.id] = [
          { id: "h1", origem: "Mensalidade contábil", valor: Math.round((c.faturamento || 0) / 120), recorrencia: "mensal", criado: "01/07/2026" },
          { id: "h2", origem: "Assessoria societária", valor: 890, recorrencia: "unico", criado: "05/07/2026" },
          { id: "h3", origem: "Folha / Pessoal", valor: Math.round(320 + (c.funcInternos || 0) * 45), recorrencia: "mensal", criado: "08/07/2026" },
        ];
      }
      return cliHonorariosByClient[c.id];
    }

    function parseHonorValor(raw) {
      const n = Number(String(raw || "").replace(/[^\d,.-]/g, "").replace(",", "."));
      return Number.isFinite(n) ? n : NaN;
    }

    function getCliMovimentacoes(c) {
      const base = Math.round((c.faturamento || 50000) / 120);
      return [
        { id: "m1", data: "01/07/2026", descricao: "TED recebida — cliente", tipo: "credito", valor: base + 420, status: "conciliada", idTitulo: "10421", fornecedor: "", cliente: c.fantasia || c.nome, conta: "corrente" },
        { id: "m2", data: "03/07/2026", descricao: "Pagamento fornecedor fiscal", tipo: "debito", valor: Math.round(base * 0.35), status: "aberto", idTitulo: "10455", fornecedor: "Tech Docs Ltda", cliente: "", conta: "corrente" },
        { id: "m3", data: "05/07/2026", descricao: "Tarifa bancária", tipo: "debito", valor: 29.9, status: "conciliada", idTitulo: "10460", fornecedor: "Banco Central Sim", cliente: "", conta: "corrente" },
        { id: "m4", data: "08/07/2026", descricao: "Pix recebido — honorários", tipo: "credito", valor: Math.round(base * 0.8), status: "aberto", idTitulo: "10488", fornecedor: "", cliente: c.fantasia || c.nome, conta: "corrente" },
        { id: "m5", data: "10/07/2026", descricao: "Transferência para aplicação", tipo: "transferencia", valor: Math.round(base * 0.5), status: "conciliada", idTitulo: "10502", fornecedor: "", cliente: "", conta: "aplicacao" },
        { id: "m6", data: "12/07/2026", descricao: "Boleto utilidades", tipo: "debito", valor: 312.4, status: "aberto", idTitulo: "10510", fornecedor: "Energia Norte", cliente: "", conta: "corrente" },
        { id: "m7", data: "14/07/2026", descricao: "Estorno parcial", tipo: "credito", valor: 150, status: "conciliada", idTitulo: "10522", fornecedor: "Tech Docs Ltda", cliente: "", conta: "poupanca" },
      ];
    }

    function getCliMovimentacoesFiltradas(c) {
      const f = cliFinMovFiltros;
      const qValor = String(f.valor || "").replace(/[^\d,.]/g, "").replace(",", ".");
      const valorNum = qValor ? Number(qValor) : null;
      return getCliMovimentacoes(c).filter((m) => {
        if (f.tipo && m.tipo !== f.tipo) return false;
        if (valorNum != null && !Number.isNaN(valorNum) && Math.abs(m.valor - valorNum) > 0.009) return false;
        if (f.idTitulo && !String(m.idTitulo).includes(String(f.idTitulo).trim())) return false;
        if (f.status && m.status !== f.status) return false;
        if (f.descricao && !normalizeSearchText(m.descricao).includes(normalizeSearchText(f.descricao))) return false;
        if (f.fornecedor && !normalizeSearchText(m.fornecedor).includes(normalizeSearchText(f.fornecedor))) return false;
        if (f.cliente && !normalizeSearchText(m.cliente).includes(normalizeSearchText(f.cliente))) return false;
        if (f.contas === "corrente" && m.conta !== "corrente") return false;
        if (f.contas === "poupanca" && m.conta !== "poupanca") return false;
        if (f.contas === "aplicacao" && m.conta !== "aplicacao") return false;
        if (f.titulosVencimento === "aberto" && m.status !== "aberto") return false;
        if (f.titulosVencimento === "conciliada" && m.status !== "conciliada") return false;
        if (f.dataIni || f.dataFim) {
          const parts = String(m.data || "").split("/");
          const iso = parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : "";
          if (f.dataIni && iso && iso < f.dataIni) return false;
          if (f.dataFim && iso && iso > f.dataFim) return false;
        }
        return true;
      });
    }

    function resetCliFinMovFiltros() {
      cliFinMovFiltros = {
        tipo: "",
        valor: "",
        idTitulo: "",
        status: "",
        dataIni: "",
        dataFim: "",
        descricao: "",
        fornecedor: "",
        cliente: "",
        mesmaDataTitulos: false,
        titulosVencimento: "",
        contas: "",
      };
    }

    function syncCliFinQuickFiltrosFromDom() {
      cliFinMovFiltros.tipo = document.getElementById("cliFinTipo")?.value || "";
      cliFinMovFiltros.valor = document.getElementById("cliFinValor")?.value || "";
      cliFinMovFiltros.idTitulo = document.getElementById("cliFinIdTitulo")?.value || "";
      cliFinMovFiltros.status = document.getElementById("cliFinStatus")?.value || "";
    }

    function openCliFinFiltrosAvancadosModal() {
      const f = cliFinMovFiltros;
      const c = CLIENTES.find((x) => x.id === cliPerfilId);
      openModal({
        title: "Filtros avançados",
        sub: "Movimentações Bancárias" + (c ? ` · ${c.fantasia || c.nome}` : ""),
        wide: true,
        body: `
          <div class="cli-fin-adv-block">
            <h5>Busca e período</h5>
            <div class="cli-fin-adv-grid">
              <div>
                <label for="cliFinDataIni">Data inicial</label>
                <input type="date" id="cliFinDataIni" value="${f.dataIni || ""}" />
              </div>
              <div>
                <label for="cliFinDataFim">Data final</label>
                <input type="date" id="cliFinDataFim" value="${f.dataFim || ""}" />
              </div>
              <div class="full">
                <label for="cliFinDesc">Descrição</label>
                <input type="search" id="cliFinDesc" placeholder="Buscar por descrição" value="${(f.descricao || "").replace(/"/g, "&quot;")}" />
              </div>
              <div>
                <label for="cliFinFornecedor">Fornecedor</label>
                <input type="search" id="cliFinFornecedor" placeholder="Nome do fornecedor" value="${(f.fornecedor || "").replace(/"/g, "&quot;")}" />
              </div>
              <div>
                <label for="cliFinCliente">Cliente</label>
                <input type="search" id="cliFinCliente" placeholder="Nome do cliente" value="${(f.cliente || "").replace(/"/g, "&quot;")}" />
              </div>
            </div>
          </div>
          <div class="cli-fin-adv-block">
            <h5>Regras e parâmetros</h5>
            <label class="cli-fin-check">
              <input type="checkbox" id="cliFinMesmaData" ${f.mesmaDataTitulos ? "checked" : ""} />
              <span>Permitir aplicar mesma data também aos títulos</span>
            </label>
            <div class="cli-fin-adv-grid">
              <div>
                <label for="cliFinTitulosVenc">Títulos por vencimento</label>
                <select id="cliFinTitulosVenc">
                  <option value="">Todos os títulos</option>
                  <option value="aberto" ${f.titulosVencimento === "aberto" ? "selected" : ""}>Em aberto</option>
                  <option value="conciliada" ${f.titulosVencimento === "conciliada" ? "selected" : ""}>Conciliados</option>
                  <option value="periodo" ${f.titulosVencimento === "periodo" ? "selected" : ""}>Do período</option>
                </select>
              </div>
              <div>
                <label for="cliFinContas">Contas consideradas</label>
                <select id="cliFinContas">
                  <option value="">Todas as contas</option>
                  <option value="corrente" ${f.contas === "corrente" ? "selected" : ""}>Conta corrente</option>
                  <option value="poupanca" ${f.contas === "poupanca" ? "selected" : ""}>Poupança</option>
                  <option value="aplicacao" ${f.contas === "aplicacao" ? "selected" : ""}>Aplicação</option>
                </select>
              </div>
            </div>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" id="cliFinFiltrosLimpar">Limpar os filtros</button>
          <button type="button" class="btn-primary" id="cliFinFiltrosAplicar">Aplicar filtro</button>`,
      });
      document.getElementById("cliFinFiltrosLimpar")?.addEventListener("click", () => {
        resetCliFinMovFiltros();
        closeModal();
        renderClientes();
        toast("Filtros limpos");
      });
      document.getElementById("cliFinFiltrosAplicar")?.addEventListener("click", () => {
        syncCliFinQuickFiltrosFromDom();
        cliFinMovFiltros.dataIni = document.getElementById("cliFinDataIni")?.value || "";
        cliFinMovFiltros.dataFim = document.getElementById("cliFinDataFim")?.value || "";
        cliFinMovFiltros.descricao = document.getElementById("cliFinDesc")?.value || "";
        cliFinMovFiltros.fornecedor = document.getElementById("cliFinFornecedor")?.value || "";
        cliFinMovFiltros.cliente = document.getElementById("cliFinCliente")?.value || "";
        cliFinMovFiltros.mesmaDataTitulos = !!document.getElementById("cliFinMesmaData")?.checked;
        cliFinMovFiltros.titulosVencimento = document.getElementById("cliFinTitulosVenc")?.value || "";
        cliFinMovFiltros.contas = document.getElementById("cliFinContas")?.value || "";
        closeModal();
        renderClientes();
        toast(cliFinMovFiltros.mesmaDataTitulos
          ? "Filtro aplicado · mesma data nos títulos"
          : "Filtro aplicado");
      });
    }

    function openClienteDadosModal(c) {
      openModal({
        title: "Dados cadastrais",
        sub: c.fantasia || c.nome,
        wide: true,
        body: `
          <div class="cli-cad-grid">
            <div class="full"><label>Razão social</label><input value="${c.razaoSocial || c.nome}" readonly /></div>
            <div><label>Nome fantasia</label><input value="${c.fantasia || c.nome}" readonly /></div>
            <div><label>CNPJ</label><input value="${c.cnpj}" readonly /></div>
            <div><label>Inscrição estadual</label><input value="${c.ie || "—"}" readonly /></div>
            <div><label>Inscrição municipal</label><input value="${c.im || "—"}" readonly /></div>
            <div><label>Regime tributário</label><input value="${c.regime}" readonly /></div>
            <div><label>UF / Status</label><input value="${c.estado} · ${c.status}" readonly /></div>
            <div class="full"><label>Endereço</label><textarea readonly>${c.endereco || "—"}</textarea></div>
            <div class="full"><label>Sócios</label><textarea readonly>${(c.socios || []).join(", ") || "—"}</textarea></div>
          </div>`,
        foot: `<button type="button" class="btn-ghost" data-close>Fechar</button>`,
      });
    }

    function openClienteFaturamentoModal(c) {
      const metrics = empresaMetrics[c.id];
      const renderBody = () => {
        const [y, m] = cliFatPeriod.split("-").map(Number);
        const monthIdx = (m || 7) - 1;
        const mensal = (metrics?.faturamentoMensal || [])[Math.min(monthIdx, 5)] || { m: "Jul", atual: 40, ant: 35 };
        const fator = Math.max(0.4, (mensal.atual || 40) / 40);
        const bruto = Math.round((c.faturamento || 0) / 12 * fator);
        const liquido = Math.round(bruto * 0.86);
        const impostos = Math.round(bruto * 0.14);
        return `
          <label>Filtro de período (Mês/Ano)</label>
          <input type="month" id="cliFatPeriodInput" value="${cliFatPeriod}" />
          <div style="margin-top:14px;overflow:auto;border:1px solid var(--border);border-radius:8px">
            <table class="cli-fat-table">
              <thead>
                <tr><th>Descrição</th><th>Competência</th><th>Valor</th></tr>
              </thead>
              <tbody>
                <tr><td>Faturamento bruto</td><td>${cliFatPeriod}</td><td>${money(bruto)}</td></tr>
                <tr><td>Impostos provisionados</td><td>${cliFatPeriod}</td><td>${money(impostos)}</td></tr>
                <tr><td>Faturamento líquido estimado</td><td>${cliFatPeriod}</td><td>${money(liquido)}</td></tr>
                <tr><td>Comparativo mês base (${mensal.m})</td><td>índice</td><td>${mensal.atual} / ant. ${mensal.ant}</td></tr>
              </tbody>
            </table>
          </div>`;
      };
      openModal({
        title: "Faturamento da empresa",
        sub: c.fantasia || c.nome,
        wide: true,
        body: renderBody(),
        foot: `<button type="button" class="btn-ghost" data-close>Fechar</button>`,
      });
      document.getElementById("cliFatPeriodInput")?.addEventListener("change", (e) => {
        cliFatPeriod = e.target.value || "2026-07";
        openClienteFaturamentoModal(c);
      });
    }

    function getFinDashScopeClientes() {
      if (finDash.empresaId && finDash.empresaId !== "all") {
        const one = CLIENTES.find((c) => c.id === finDash.empresaId);
        return one ? [one] : [];
      }
      if (finDash.unidade && finDash.unidade !== "all") {
        const one = CLIENTES.find((c) => c.id === finDash.unidade);
        return one ? [one] : [];
      }
      return [...CLIENTES];
    }

    function isFinAllClientsScope() {
      return !finDash.empresaId || finDash.empresaId === "all";
    }

    function getFinSelectedCliente() {
      if (isFinAllClientsScope()) return null;
      return CLIENTES.find((c) => c.id === finDash.empresaId) || null;
    }

    function applyFinClientScope(id) {
      const next = id || "all";
      if (next === "all") {
        finDash.empresaId = "all";
        finDash.unidade = "all";
        finDash.empresaQuery = "";
        finDash.acOpen = false;
        if (finDash.tab !== "dashboard") finDash.tab = "dashboard";
        finDash._clientPickLockUntil = Date.now() + 350;
        renderFinModuleDash();
        toast("Visão consolidada · Todos os Clientes");
        return true;
      }
      const cli = CLIENTES.find((c) => c.id === next);
      if (!cli) return false;
      finDash.empresaId = cli.id;
      finDash.unidade = cli.id;
      finDash.empresaQuery = cli.fantasia || cli.nome || "";
      finDash.acOpen = false;
      if (finDash.tab !== "dashboard") finDash.tab = "dashboard";
      finDash._clientPickLockUntil = Date.now() + 350;
      renderFinModuleDash();
      toast(`Cliente selecionado: ${finDash.empresaQuery}`);
      return true;
    }

    function getFinPeriodRange() {
      const period = finDash.period || "mes";
      const now = new Date(APP_TODAY.getFullYear(), APP_TODAY.getMonth(), APP_TODAY.getDate(), 23, 59, 59);
      const end = new Date(now);
      let start = new Date(now);
      if (period === "mes") start = new Date(now.getFullYear(), now.getMonth(), 1);
      else if (period === "30d") {
        start = new Date(now);
        start.setDate(start.getDate() - 29);
        start.setHours(0, 0, 0, 0);
      }
      else if (period === "3m") start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      else if (period === "6m") start = new Date(now.getFullYear(), now.getMonth() - 5, 1);
      else if (period === "12m") start = new Date(now.getFullYear(), now.getMonth() - 11, 1);
      else if (period === "ano") start = new Date(now.getFullYear(), 0, 1);
      else if (period === "custom") {
        const from = finDash.periodFrom;
        const to = finDash.periodTo;
        if (from) start = new Date(from + "T00:00:00");
        if (to) return { start, end: new Date(to + "T23:59:59") };
      }
      return { start, end };
    }

    function getFinPeriodDisplayLabel() {
      const period = finDash.period || "mes";
      if (period === "custom") {
        const from = finDash.periodFrom;
        const to = finDash.periodTo;
        if (from && to) return `${formatDashDateBR(from)} — ${formatDashDateBR(to)}`;
        if (from) return `A partir de ${formatDashDateBR(from)}`;
        if (to) return `Até ${formatDashDateBR(to)}`;
        return "Período personalizado";
      }
      const lab = periodLabels[period] || period;
      return lab.charAt(0).toUpperCase() + lab.slice(1);
    }

    function getFinPeriodScale() {
      const period = finDash.period || "mes";
      if (period === "mes") return 1 / 6;
      if (period === "30d") return 1 / 6;
      if (period === "3m") return 0.5;
      if (period === "6m") return 1;
      if (period === "12m" || period === "ano") return 1.15;
      const { start, end } = getFinPeriodRange();
      const days = Math.max(1, (end - start) / 86400000 + 1);
      return Math.min(1.2, Math.max(0.15, days / 180));
    }

    function syncFinPeriodCustomUi(root) {
      const custom = (root || document).querySelector?.("#finDashPeriodCustom") || document.getElementById("finDashPeriodCustom");
      if (!custom) return;
      custom.classList.toggle("show", (finDash.period || "mes") === "custom");
    }

    function getFinDashData() {
      const clientes = getFinDashScopeClientes();
      const periodScale = getFinPeriodScale();
      const { start: periodStart, end: periodEnd } = getFinPeriodRange();
      const periodLabel = getFinPeriodDisplayLabel();
      const scale = Math.max(0.35, clientes.reduce((acc, c) => acc + (c.faturamento || 0), 0) / 1200000) * periodScale;
      const receitasBase = [
        { id: "servicos", nome: "Prestação de Serviços", pct: 46, color: "#00c853" },
        { id: "produtos", nome: "Venda de Produtos", pct: 28, color: "#28519c" },
        { id: "honorarios", nome: "Honorários Contábeis", pct: 16, color: "#ff6d00" },
        { id: "outras", nome: "Outras Receitas", pct: 10, color: "#aa00ff" },
      ];
      const filterId = finDash.receitaFilter || "";
      const filterItem = receitasBase.find((r) => r.id === filterId);
      const catFactor = filterItem ? Math.max(0.22, filterItem.pct / 100) : 1;
      const despesasBase = [
        { id: "pessoal", nome: "Pessoal e Encargos", pct: 38, color: "#e53935" },
        { id: "infra", nome: "Infraestrutura", pct: 22, color: "#ff6d00" },
        { id: "tecnologia", nome: "Tecnologia", pct: 18, color: "#28519c" },
        { id: "outros", nome: "Outras Despesas", pct: 22, color: "#7c4dff" },
      ];

      const qtdReceber = Math.max(2, Math.round((3 + clientes.length * 1.4 * scale) * (filterItem ? 0.7 : 1)));
      const qtdPagar = Math.max(2, Math.round((2 + clientes.length * 1.1 * scale) * (filterItem ? 0.85 : 1)));
      const totalReceber = Math.round(42000 * scale * (clientes.length || 1) * 0.35 * catFactor);
      const totalPagar = Math.round(28000 * scale * (clientes.length || 1) * 0.28 * (filterItem ? 0.9 : 1));
      const recebido = Math.round(totalReceber * 1.55);
      const pago = Math.round(totalPagar * 1.35);
      const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
      const year = periodEnd.getFullYear();
      const curMonthIdx = year === APP_TODAY.getFullYear() ? APP_TODAY.getMonth() : (year < APP_TODAY.getFullYear() ? 11 : -1);
      const lucroShape = [0.55, 0.82, 0.35, -0.15, 0.48, 1, 0.72, 0.2, -0.4, 0.6, 0.9, 0.25];
      const projShock = [0, 0, 0, 0, 0, 0, 0, -0.35, -1.15, -0.85, 0.25, 0.55];
      let takeMonths = 12;
      if (finDash.period === "mes") takeMonths = 1;
      else if (finDash.period === "3m") takeMonths = 3;
      else if (finDash.period === "6m") takeMonths = 6;
      else if (finDash.period === "12m" || finDash.period === "ano") takeMonths = 12;
      else {
        takeMonths = Math.max(1, Math.min(12, Math.round((periodEnd - periodStart) / 86400000 / 30) || 6));
      }
      const monthStartIdx = Math.max(0, Math.min(11, curMonthIdx >= 0 ? curMonthIdx - takeMonths + 1 : 12 - takeMonths));

      const series = months.map((m, i) => {
        const base = 14000 + scale * 8000;
        const lucro = Math.round((base * lucroShape[i] + Math.sin(i * 1.1) * 900) * catFactor);
        const ent = Math.round((22000 + scale * 9000 + Math.abs(lucro) * 0.35 + i * 400) * catFactor);
        const sai = Math.max(1000, ent - lucro);
        const isReal = i <= curMonthIdx;
        const projLucro = Math.round(lucro + base * projShock[i] * catFactor);
        const projEnt = Math.round(ent * (isReal ? 1 : 1.02 + i * 0.01));
        const projSai = Math.max(1000, projEnt - projLucro + (isReal ? 0 : Math.round(base * Math.abs(projShock[i]) * 0.6)));
        return {
          m,
          entradas: isReal ? ent : projEnt,
          saidas: isReal ? sai : projSai,
          saldo: isReal ? lucro : projLucro,
          kind: isReal ? "real" : "proj",
        };
      });

      let cash = Math.round(recebido * 0.42);
      const saldoAtual = cash;
      const withCashFull = series.map((r) => {
        cash += r.entradas - r.saidas;
        return { ...r, saldoCaixa: cash };
      });
      const withCash = withCashFull.slice(monthStartIdx);

      let chartSeries = withCash;
      if (finDash.axis === "trimestral") {
        const groups = [0, 1, 2, 3].map((t) => withCashFull.slice(t * 3, t * 3 + 3)).filter((slice) =>
          slice.some((_, i) => t * 3 + i >= monthStartIdx)
        );
        chartSeries = groups.map((slice, t) => {
          const last = slice[slice.length - 1];
          const allReal = slice.every((s) => s.kind === "real");
          return {
            m: `T${t + 1}`,
            entradas: slice.reduce((a, r) => a + r.entradas, 0),
            saidas: slice.reduce((a, r) => a + r.saidas, 0),
            saldo: slice.reduce((a, r) => a + r.saldo, 0),
            saldoCaixa: last.saldoCaixa,
            kind: allReal ? "real" : (slice.some((s) => s.kind === "real") ? "mixed" : "proj"),
          };
        });
      } else if (finDash.axis === "anual") {
        const yearFactors = { 2024: 0.78, 2025: 0.92, 2026: 1 };
        const baseEnt = withCashFull.reduce((a, r) => a + r.entradas, 0);
        const baseSai = withCashFull.reduce((a, r) => a + r.saidas, 0);
        let run = Math.round(saldoAtual * 0.55);
        chartSeries = ["2024", "2025", "2026"].map((y) => {
          const f = yearFactors[y] || 1;
          const entradas = Math.round(baseEnt * f * catFactor);
          const saidas = Math.round(baseSai * f * (y === "2025" ? 1.08 : 0.98) * (filterItem ? 0.95 : 1));
          run += entradas - saidas;
          const yNum = Number(y);
          return {
            m: y,
            entradas,
            saidas,
            saldo: entradas - saidas,
            saldoCaixa: run,
            kind: yNum < APP_TODAY.getFullYear() ? "real" : (yNum === APP_TODAY.getFullYear() ? "mixed" : "proj"),
          };
        });
      }

      const hasProjNeg = chartSeries.some((r) => r.saldoCaixa < 0 && r.kind !== "real");

      const receitas = receitasBase.map((r) => ({
        ...r,
        valor: Math.round(recebido * (r.pct / 100)),
        active: !filterId || filterId === r.id,
        dim: Boolean(filterId && filterId !== r.id),
      }));

      let finalized = [];
      if (!clientes.length) finalized = [];
      else if (clientes.length === 1) {
        const seed = clientes[0].id.length + year;
        finalized = seed % 5 === 0 ? [] : months.slice(0, Math.max(0, (seed % 8) - 1));
      } else {
        finalized = months.slice(0, year >= 2026 ? 6 : 11);
      }

      const receberEmAberto = Math.round(totalReceber * 0.62);
      const receberVencidos = Math.round(totalReceber * 0.18);
      const pagarEmAberto = Math.round(totalPagar * 0.55);
      const pagarVencidos = Math.round(totalPagar * 0.22);
      const saldoInicial = Math.round(recebido * 0.45);
      const saldoFinal = saldoInicial + recebido - pago;
      const geracaoCaixa = recebido - pago;
      const receitaLiquida = Math.round(recebido * 0.92);
      const custosOp = Math.round(pago * 0.88);
      const margemValor = receitaLiquida - custosOp;
      const margemOperacional = receitaLiquida > 0 ? +((margemValor / receitaLiquida) * 100).toFixed(1) : 0;
      const taxaInadimplencia = totalReceber > 0 ? +((receberVencidos / totalReceber) * 100).toFixed(1) : 0;
      const projEnt30 = Math.round(receberEmAberto * 0.55 + totalReceber * 0.12);
      const projSai30 = Math.round(pagarEmAberto * 0.62 + totalPagar * 0.1);
      const projecaoCaixa30 = saldoAtual + projEnt30 - projSai30;
      const projEnt15 = Math.round(projEnt30 * 0.55);
      const projSai15 = Math.round(projSai30 * 0.52);
      const projecaoCaixa15 = saldoAtual + projEnt15 - projSai15;
      const projEnt7 = Math.round(projEnt30 * 0.28);
      const projSai7 = Math.round(projSai30 * 0.3);
      const projecaoCaixa7 = saldoAtual + projEnt7 - projSai7;
      const cmpEntradas = +(8 + scale * 4).toFixed(1);
      const cmpSaidas = +(3.5 + scale * 2).toFixed(1);
      const cmpCaixa = +(5.2 + scale * 3).toFixed(1);

      /* Score 0–100 a partir de margem, inadimplência e projeção de caixa */
      let score = 72;
      score += Math.max(-18, Math.min(18, (margemOperacional - 12) * 1.2));
      score -= Math.max(0, (taxaInadimplencia - 5) * 1.8);
      if (projecaoCaixa30 < 0) score -= 14;
      else if (projecaoCaixa30 > saldoAtual * 0.08) score += 6;
      if (geracaoCaixa < 0) score -= 8;
      score = Math.max(28, Math.min(98, Math.round(score)));
      const scoreLabel = score >= 85 ? "Excelente" : score >= 70 ? "Bom" : score >= 55 ? "Atenção" : "Crítico";
      const scoreTone = score >= 85 ? "ok" : score >= 70 ? "ok" : score >= 55 ? "warn" : "bad";
      const caixaSaude = saldoAtual > 0 && !hasProjNeg
        ? (projecaoCaixa30 >= saldoAtual ? "Caixa saudável no horizonte" : "Caixa estável com pressão moderada")
        : "Risco de pressão de caixa no horizonte";

      const qtdVencidos = Math.max(1, Math.round(qtdReceber * 0.28));
      const deficitDia = projecaoCaixa30 < 0 ? "18/08" : null;
      const recomendacoes = [
        { texto: `Cobrar ${qtdVencidos} títulos vencidos (${money(receberVencidos)})`, urgent: taxaInadimplencia >= 10 },
        deficitDia
          ? { texto: `Antecipar recebimentos para evitar déficit em ${deficitDia}`, urgent: true }
          : { texto: "Manter ritmo de cobrança — projeção de 30d positiva", urgent: false, ok: true },
        { texto: pagarVencidos > 0
          ? `Priorizar ${Math.max(1, Math.round(qtdPagar * 0.2))} contas a pagar críticas`
          : "Revisar calendário de pagamentos da próxima quinzena", urgent: false },
      ];

      const receitaBruta = Math.round(recebido * 1.08);
      const deducoes = Math.round(receitaBruta * 0.12);
      const receitaLiqDre = receitaBruta - deducoes;
      const custosDre = Math.round(receitaLiqDre * 0.58);
      const lucroLiq = receitaLiqDre - custosDre;
      const pctOf = (v) => (receitaBruta > 0 ? +((Math.abs(v) / receitaBruta) * 100).toFixed(1) : 0);
      const dre = [
        {
          id: "rb",
          label: "Receita Bruta",
          valor: receitaBruta,
          pct: 100,
          sign: "pos",
          children: [
            { id: "rb-s", label: "Prestação de Serviços", valor: Math.round(receitaBruta * 0.46 * catFactor / (filterItem ? catFactor : 1) * (filterItem && filterItem.id !== "servicos" ? 0.15 : 1)), pct: 0 },
            { id: "rb-p", label: "Venda de Produtos", valor: Math.round(receitaBruta * 0.28), pct: 0 },
            { id: "rb-h", label: "Honorários Contábeis", valor: Math.round(receitaBruta * 0.16), pct: 0 },
            { id: "rb-o", label: "Outras Receitas", valor: Math.round(receitaBruta * 0.1), pct: 0 },
          ],
        },
        {
          id: "ded",
          label: "(−) Deduções e Impostos",
          valor: -deducoes,
          pct: pctOf(deducoes),
          sign: "neg",
          bar: "cost",
          children: [
            { id: "ded-i", label: "Impostos sobre receita", valor: -Math.round(deducoes * 0.7), pct: 0 },
            { id: "ded-d", label: "Devoluções e abatimentos", valor: -Math.round(deducoes * 0.3), pct: 0 },
          ],
        },
        {
          id: "cust",
          label: "(−) Custos Operacionais",
          valor: -custosDre,
          pct: pctOf(custosDre),
          sign: "neg",
          bar: "cost",
          children: despesasBase.map((d, i) => ({
            id: `c-${d.id}`,
            label: d.nome,
            valor: -Math.round(custosDre * (d.pct / 100)),
            pct: 0,
          })),
        },
        {
          id: "ll",
          label: "(=) Lucro Líquido Gerencial",
          valor: lucroLiq,
          pct: pctOf(lucroLiq),
          sign: lucroLiq >= 0 ? "pos" : "neg",
          bar: "result",
          result: true,
          children: [],
        },
      ];
      dre.forEach((node) => {
        node.children = (node.children || []).map((ch) => ({ ...ch, pct: pctOf(ch.valor) }));
      });
      if (filterItem) {
        const map = { servicos: "rb-s", produtos: "rb-p", honorarios: "rb-h", outras: "rb-o" };
        const keep = map[filterItem.id];
        dre[0].children = dre[0].children.map((ch) => {
          if (ch.id === keep) return { ...ch, valor: Math.round(receitaBruta * 0.92), pct: 92 };
          return { ...ch, valor: Math.round(receitaBruta * 0.02), pct: 2 };
        });
        dre[0].valor = dre[0].children.reduce((a, c) => a + c.valor, 0);
      }

      const mkTop = (items) => items.slice(0, 5);
      const drill = {
        saldo: mkTop([
          { nome: "Conta corrente consolidada", meta: "Saldo disponível", valor: Math.round(saldoAtual * 0.62), tipo: "in" },
          { nome: "Aplicação liquidez diária", meta: "Resgate D+0", valor: Math.round(saldoAtual * 0.22), tipo: "in" },
          { nome: "Tentativas a compensar", meta: "Clearing bancário", valor: Math.round(saldoAtual * 0.1), tipo: "in" },
          { nome: "Cartão / maquininha", meta: "A liberar 48h", valor: Math.round(saldoAtual * 0.04), tipo: "in" },
          { nome: "Caixa pequeno", meta: "Espécie", valor: Math.round(saldoAtual * 0.02), tipo: "in" },
        ]),
        margem: mkTop([
          { nome: "Receita líquida do período", meta: "Após deduções", valor: receitaLiquida, tipo: "in" },
          { nome: "Custo de pessoal", meta: "Folha + encargos", valor: Math.round(custosOp * 0.38), tipo: "out" },
          { nome: "Infraestrutura e ocupação", meta: "Operacional", valor: Math.round(custosOp * 0.22), tipo: "out" },
          { nome: "Tecnologia e sistemas", meta: "SaaS / TI", valor: Math.round(custosOp * 0.18), tipo: "out" },
          { nome: "Demais custos", meta: "Variáveis", valor: Math.round(custosOp * 0.22), tipo: "out" },
        ]),
        inad: mkTop([
          { nome: "Cliente Alpha Comércio", meta: "NF 4521 · 18 dias", valor: Math.round(receberVencidos * 0.28), tipo: "warn" },
          { nome: "Beta Serviços Ltda", meta: "NF 4490 · 12 dias", valor: Math.round(receberVencidos * 0.22), tipo: "warn" },
          { nome: "Gamma Indústria", meta: "NF 4472 · 9 dias", valor: Math.round(receberVencidos * 0.18), tipo: "warn" },
          { nome: "Delta Consultoria", meta: "Boleto 882 · 7 dias", valor: Math.round(receberVencidos * 0.16), tipo: "warn" },
          { nome: "Epsilon Tech", meta: "NF 4410 · 5 dias", valor: Math.round(receberVencidos * 0.16), tipo: "warn" },
        ]),
        projecao: mkTop([
          { nome: "A receber (próx. 30d)", meta: "Títulos em aberto", valor: projEnt30, tipo: "in" },
          { nome: "A pagar (próx. 30d)", meta: "Compromissos lançados", valor: projSai30, tipo: "out" },
          { nome: "Folha prevista", meta: "Competência atual", valor: Math.round(projSai30 * 0.35), tipo: "out" },
          { nome: "Impostos a recolher", meta: "DAS / GPS", valor: Math.round(projSai30 * 0.22), tipo: "out" },
          { nome: "Contratos recorrentes", meta: "Entradas já lançadas", valor: Math.round(projEnt30 * 0.4), tipo: "in" },
        ]),
        receber: mkTop([
          { nome: "Contratos mensais", meta: `${qtdReceber} títulos`, valor: Math.round(totalReceber * 0.34), tipo: "in" },
          { nome: "Projetos pontuais", meta: "Em aberto", valor: Math.round(totalReceber * 0.26), tipo: "in" },
          { nome: "Honorários atrasados", meta: "Vencidos", valor: receberVencidos, tipo: "warn" },
          { nome: "Adiantamentos a faturar", meta: "Pipeline", valor: Math.round(totalReceber * 0.12), tipo: "in" },
          { nome: "Outros a receber", meta: "Diversos", valor: Math.round(totalReceber * 0.1), tipo: "in" },
        ]),
        pagar: mkTop([
          { nome: "Fornecedor Fiscal Soft", meta: "Licenças", valor: Math.round(totalPagar * 0.3), tipo: "out" },
          { nome: "Imobiliária Centro", meta: "Aluguel", valor: Math.round(totalPagar * 0.22), tipo: "out" },
          { nome: "Folha e encargos", meta: "Pessoal", valor: Math.round(totalPagar * 0.2), tipo: "out" },
          { nome: "Operadora Telecom", meta: "Links / voz", valor: Math.round(totalPagar * 0.14), tipo: "out" },
          { nome: "Demais fornecedores", meta: "Variados", valor: Math.round(totalPagar * 0.14), tipo: "out" },
        ]),
        recebido: mkTop([
          { nome: "TED — honorários", meta: "14/07/" + year, valor: Math.round(recebido * 0.22), tipo: "in" },
          { nome: "Pix — mensalidades", meta: "12/07/" + year, valor: Math.round(recebido * 0.18), tipo: "in" },
          { nome: "Boleto compensado", meta: "10/07/" + year, valor: Math.round(recebido * 0.16), tipo: "in" },
          { nome: "Cartão crédito", meta: "08/07/" + year, valor: Math.round(recebido * 0.14), tipo: "in" },
          { nome: "Outras entradas", meta: "Período", valor: Math.round(recebido * 0.12), tipo: "in" },
        ]),
        pago: mkTop([
          { nome: "Fornecedor fiscal", meta: "13/07/" + year, valor: Math.round(pago * 0.2), tipo: "out" },
          { nome: "Folha mensal", meta: "05/07/" + year, valor: Math.round(pago * 0.28), tipo: "out" },
          { nome: "Impostos recolhidos", meta: "07/07/" + year, valor: Math.round(pago * 0.18), tipo: "out" },
          { nome: "Utilidades", meta: "10/07/" + year, valor: Math.round(pago * 0.1), tipo: "out" },
          { nome: "Tarifas e taxas", meta: "Período", valor: Math.round(pago * 0.08), tipo: "out" },
        ]),
        resumo: mkTop([
          { nome: "Saldo inicial", meta: "Abertura do período", valor: saldoInicial, tipo: "in" },
          { nome: "Entradas", meta: "Realizadas", valor: recebido, tipo: "in" },
          { nome: "Saídas", meta: "Realizadas", valor: pago, tipo: "out" },
          { nome: "Saldo final", meta: "Fechamento", valor: saldoFinal, tipo: saldoFinal >= 0 ? "in" : "out" },
          { nome: "Geração de caixa", meta: "Entradas − saídas", valor: geracaoCaixa, tipo: geracaoCaixa >= 0 ? "in" : "out" },
        ]),
      };

      const movimentacoes = clientes.length ? [
        { nome: "TED recebida — honorários", data: "14/07/" + year, valor: Math.round(recebido * 0.08), tipo: "in" },
        { nome: "Pagamento fornecedor fiscal", data: "13/07/" + year, valor: Math.round(pago * 0.07), tipo: "out" },
        { nome: "Pix recebido — mensalidade", data: "12/07/" + year, valor: Math.round(recebido * 0.05), tipo: "in" },
        { nome: "Tarifa bancária", data: "11/07/" + year, valor: 29.9, tipo: "out" },
        { nome: "Boleto utilidades", data: "10/07/" + year, valor: Math.round(pago * 0.03), tipo: "out" },
      ] : [];

      const feedItems = [];
      if (qtdVencidos >= 1) {
        feedItems.push({
          kind: "alert",
          title: `${Math.max(3, Math.round(qtdReceber * 0.35))} boletos vencem hoje`,
          meta: "Alerta automático · cobrança",
          valor: null,
        });
      }
      if (projecaoCaixa15 < saldoAtual * 0.92) {
        feedItems.push({
          kind: "alert",
          title: "Queda de caixa projetada em 15 dias",
          meta: "Alerta automático · tesouraria",
          valor: null,
        });
      }
      movimentacoes.forEach((m) => {
        feedItems.push({
          kind: m.tipo === "in" ? "in" : "out",
          title: m.nome,
          meta: m.data,
          valor: m.valor,
        });
      });
      if (taxaInadimplencia >= 8) {
        feedItems.splice(Math.min(2, feedItems.length), 0, {
          kind: "alert",
          title: `Inadimplência em ${String(taxaInadimplencia).replace(".", ",")}% — acima do alvo`,
          meta: "Alerta automático · crédito",
          valor: null,
        });
      }

      const sparkSeed = (base, wave = 1) => Array.from({ length: 6 }, (_, i) =>
        Math.max(0, Math.round(base * (0.72 + i * 0.055 + Math.sin((i + wave) * 1.15) * 0.07)))
      );
      const kpiDeltas = {
        saldo: +(4.2 + scale * 2).toFixed(1),
        margem: +(1.8 + scale).toFixed(1),
        inad: +(0.6 + scale * 0.4).toFixed(1),
        projecao: +(3.1 + scale * 1.5).toFixed(1),
        receber: +(6.4 + scale * 2).toFixed(1),
        pagar: +(-(2.1 + scale)).toFixed(1),
        recebido: +cmpEntradas,
        pago: +cmpSaidas,
      };
      const kpiSparks = {
        saldo: sparkSeed(saldoAtual, 1),
        margem: sparkSeed(Math.max(8, margemOperacional) * 100, 2),
        inad: sparkSeed(Math.max(4, taxaInadimplencia) * 80, 3),
        projecao: sparkSeed(Math.abs(projecaoCaixa30), 4),
        receber: sparkSeed(totalReceber, 5),
        pagar: sparkSeed(totalPagar, 6),
        recebido: sparkSeed(recebido, 7),
        pago: sparkSeed(pago, 8),
      };

      const fiscalComp = [
        { id: "das", nome: "DAS / Simples", pct: 42, valor: Math.round(deducoes * 0.42) },
        { id: "inss", nome: "INSS / GPS", pct: 24, valor: Math.round(deducoes * 0.24) },
        { id: "iss", nome: "ISS / municipal", pct: 18, valor: Math.round(deducoes * 0.18) },
        { id: "outros", nome: "Outros tributos", pct: 16, valor: Math.round(deducoes * 0.16) },
      ];

      return {
        clientes, qtdReceber, qtdPagar, totalReceber, totalPagar, recebido, pago,
        chartSeries, receitas, despesas: despesasBase, fiscalComp, finalized, year,
        receberEmAberto, receberVencidos, pagarEmAberto, pagarVencidos,
        saldoInicial, saldoFinal, geracaoCaixa, cmpEntradas, cmpSaidas, cmpCaixa, movimentacoes,
        saldoAtual, margemOperacional, margemValor, taxaInadimplencia,
        projecaoCaixa30, projEnt30, projSai30,
        projecaoCaixa7, projecaoCaixa15, projEnt7, projSai7, projEnt15, projSai15,
        score, scoreLabel, scoreTone, caixaSaude, recomendacoes, feedItems,
        caixaAlerta: hasProjNeg, curMonthIdx, filterLabel: filterItem?.nome || "",
        periodLabel, dre, drill, kpiDeltas, kpiSparks,
      };
    }

    function renderFinSparkline(values, color = "#28519c") {
      const vals = (values || []).map(Number).filter((n) => Number.isFinite(n));
      if (vals.length < 2) return "";
      const w = 120;
      const h = 28;
      const min = Math.min(...vals);
      const max = Math.max(...vals);
      const span = Math.max(max - min, 1);
      const pts = vals.map((v, i) => {
        const x = (i / (vals.length - 1)) * w;
        const y = h - 2 - ((v - min) / span) * (h - 4);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      });
      const area = `M0,${h} L${pts.join(" L")} L${w},${h} Z`;
      return `
        <svg class="kpi-spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
          <path d="${area}" fill="${color}" opacity="0.12"/>
          <polyline points="${pts.join(" ")}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    function renderFinDeltaBadge(pct, { invert = false } = {}) {
      const n = Number(pct) || 0;
      const up = n >= 0;
      const good = invert ? !up : up;
      return `<span class="kpi-delta ${good ? "up" : "down"}">${up ? "↑" : "↓"} ${String(Math.abs(n).toFixed(1)).replace(".", ",")}% vs mês ant.</span>`;
    }

    function renderFinMonoBars(items, opts = {}) {
      const list = (items || []).filter((x) => (x.pct || x.valor) > 0);
      if (!list.length) return `<div class="fin-mini-empty">Sem dados no filtro atual</div>`;
      const maxPct = Math.max(...list.map((x) => x.pct || 0), 1);
      const shades = ["#1c386e", "#28519c", "#28519c", "#6b8caf", "#9aafc8"];
      const clickable = !!opts.clickable;
      return `
        <div class="fin-mono-bars">
          ${list.map((item, i) => {
            const color = shades[Math.min(i, shades.length - 1)];
            const pct = item.pct || 0;
            const w = Math.max(6, (pct / maxPct) * 100);
            const body = `
              <span class="lab">${uiSelectEscape(item.nome)}</span>
              <div class="track"><i style="width:${w}%;--bar-color:${color};background:${color}"></i></div>
              <span class="meta">${pct}%${item.valor != null ? `<small>${money(item.valor)}</small>` : ""}</span>`;
            if (!clickable) return `<div class="row">${body}</div>`;
            const isActive = opts.filterId && opts.filterId === item.id;
            return `
              <button type="button" class="row${item.dim ? " is-dim" : ""}${isActive ? " is-active" : ""}" data-fin-receita="${item.id}">
                ${body}
              </button>`;
          }).join("")}
        </div>`;
    }

    function renderFinLineChart(series, opts = {}) {
      const w = 800;
      const h = 340;
      const pad = { l: 72, r: 18, t: 34, b: 40 };
      const innerW = w - pad.l - pad.r;
      const innerH = h - pad.t - pad.b;
      const values = series.map((r) => r.saldoCaixa ?? r.saldo);
      const dataMin = Math.min(...values, 0);
      const dataMax = Math.max(...values, 0);
      const hasNeg = values.some((v) => v < 0);
      const hasPos = values.some((v) => v > 0);
      let yMin;
      let yMax;
      if (!hasNeg && hasPos) {
        yMin = 0;
        yMax = Math.max(dataMax * 1.1, 1);
      } else if (hasNeg && !hasPos) {
        yMax = 0;
        yMin = Math.min(dataMin * 1.1, -1);
      } else {
        const span = Math.max(Math.abs(dataMin), Math.abs(dataMax), 1);
        yMin = -span * 1.1;
        yMax = span * 1.1;
      }
      const xAt = (i) => pad.l + (series.length <= 1 ? innerW / 2 : (i / (series.length - 1)) * innerW);
      const yAt = (v) => pad.t + ((yMax - v) / (yMax - yMin)) * innerH;
      const zeroY = yAt(0);
      const alerta = Boolean(opts.caixaAlerta || series.some((r) => (r.saldoCaixa ?? 0) < 0 && r.kind !== "real"));
      const tension = 0.32;

      const ptsFrom = (idxs, key) => idxs.map((i) => ({
        x: xAt(i),
        y: yAt(series[i][key] ?? series[i].saldo),
      }));

      const smoothPath = (idxs, key) => {
        const pts = ptsFrom(idxs, key);
        if (!pts.length) return "";
        if (pts.length === 1) return `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
        let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
        for (let i = 0; i < pts.length - 1; i++) {
          const p0 = pts[i - 1] || pts[i];
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const p3 = pts[i + 2] || p2;
          const cp1x = p1.x + (p2.x - p0.x) * tension;
          const cp1y = p1.y + (p2.y - p0.y) * tension;
          const cp2x = p2.x - (p3.x - p1.x) * tension;
          const cp2y = p2.y - (p3.y - p1.y) * tension;
          d += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
        }
        return d;
      };

      const smoothArea = (clampFn) => {
        const idxs = series.map((_, i) => i);
        const top = idxs.map((i) => ({
          x: xAt(i),
          y: yAt(clampFn(series[i].saldoCaixa ?? series[i].saldo)),
        }));
        if (top.length < 2) return "";
        let d = `M${top[0].x.toFixed(1)},${zeroY.toFixed(1)} L${top[0].x.toFixed(1)},${top[0].y.toFixed(1)}`;
        for (let i = 0; i < top.length - 1; i++) {
          const p0 = top[i - 1] || top[i];
          const p1 = top[i];
          const p2 = top[i + 1];
          const p3 = top[i + 2] || p2;
          const cp1x = p1.x + (p2.x - p0.x) * tension;
          const cp1y = p1.y + (p2.y - p0.y) * tension;
          const cp2x = p2.x - (p3.x - p1.x) * tension;
          const cp2y = p2.y - (p3.y - p1.y) * tension;
          d += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
        }
        d += ` L${top[top.length - 1].x.toFixed(1)},${zeroY.toFixed(1)} Z`;
        return d;
      };

      const realIdx = [];
      series.forEach((r, i) => {
        if (r.kind === "real" || r.kind === "mixed") realIdx.push(i);
      });
      const lastReal = realIdx.length ? realIdx[realIdx.length - 1] : -1;
      const realPathIdx = lastReal >= 0 ? [...Array(lastReal + 1).keys()] : [];
      const projPathIdx = lastReal >= 0
        ? [lastReal, ...series.map((_, i) => i).filter((i) => i > lastReal)]
        : series.map((_, i) => i);

      const areaPos = smoothArea((v) => Math.max(0, v));
      const areaNeg = hasNeg ? smoothArea((v) => Math.min(0, v)) : "";

      const tickVals = (() => {
        if (!hasNeg) return [0, 0.25, 0.5, 0.75, 1].map((p) => p * yMax);
        if (!hasPos) return [0, -0.25, -0.5, -0.75, -1].map((p) => p * Math.abs(yMin));
        return [-1, -0.5, 0, 0.5, 1].map((p) => (p < 0 ? p * Math.abs(yMin) : p * yMax));
      })();
      const ticks = tickVals.map((val) => {
        const y = yAt(val);
        const isZero = Math.abs(val) < 0.001;
        return { y, label: (val >= 0 ? "" : "−") + moneyShort(Math.abs(val)), isZero, val };
      });
      const grid = ticks.map((t) =>
        `<line x1="${pad.l}" y1="${t.y}" x2="${w - pad.r}" y2="${t.y}" stroke="${t.isZero ? "color-mix(in srgb, var(--navy) 28%, var(--border))" : "var(--border)"}" stroke-width="${t.isZero ? 1.4 : 1}" ${t.isZero ? "" : 'stroke-dasharray="3 3"'}/>`
      ).join("");
      const yLabels = ticks.map((t) =>
        `<text class="y-lab" x="${pad.l - 10}" y="${t.y + 4}" text-anchor="end" fill="${t.isZero ? "var(--navy-deep)" : "var(--navy)"}" font-size="13" font-weight="${t.isZero ? "750" : "650"}">${t.isZero ? "0" : t.label}</text>`
      ).join("");
      const xLabels = series.map((r, i) =>
        `<text class="x-lab" data-x-idx="${i}" x="${xAt(i)}" y="${h - 12}" text-anchor="middle" fill="var(--navy)" font-size="13.5" font-weight="650">${r.m}</text>`
      ).join("");
      const nowMark = lastReal >= 0 && lastReal < series.length - 1
        ? `<line class="now-mark" x1="${xAt(lastReal).toFixed(1)}" y1="${pad.t}" x2="${xAt(lastReal).toFixed(1)}" y2="${pad.t + innerH}"/>`
        : "";

      const maxIdx = values.indexOf(Math.max(...values));
      const minIdx = values.indexOf(Math.min(...values));
      const points = series.map((r, i) => {
        const x = xAt(i);
        const y = yAt(r.saldoCaixa ?? r.saldo);
        const neg = (r.saldoCaixa ?? 0) < 0;
        const isProj = r.kind === "proj";
        const color = neg ? "#b33a4a" : (isProj ? (alerta ? "#b33a4a" : "#28519c") : "#28519c");
        const isExt = i === maxIdx || i === minIdx || neg;
        const labelY = (r.saldoCaixa ?? 0) >= 0 ? y - 12 : y + 16;
        const short = ((r.saldoCaixa ?? 0) >= 0 ? "" : "−") + moneyShort(Math.abs(r.saldoCaixa ?? r.saldo));
        const bandW = series.length <= 1 ? innerW : innerW / (series.length - 1);
        const hitX = Math.max(pad.l, x - bandW / 2);
        const hitW = Math.min(w - pad.r, x + bandW / 2) - hitX;
        return `
          <g class="fin-pt${isExt ? " is-ext" : ""}" tabindex="0" role="button"
            data-fin-pt="${i}"
            data-period="${uiSelectEscape(r.m)}"
            data-kind="${r.kind || "real"}"
            data-saldo="${r.saldo}"
            data-caixa="${r.saldoCaixa ?? r.saldo}"
            data-entradas="${r.entradas}"
            data-saidas="${r.saidas}"
            aria-label="${uiSelectEscape(r.m)}: caixa ${money(r.saldoCaixa ?? r.saldo)}">
            <rect class="hit" x="${hitX.toFixed(1)}" y="${pad.t}" width="${Math.max(8, hitW).toFixed(1)}" height="${innerH}" />
            <line class="guide" x1="${x.toFixed(1)}" y1="${pad.t}" x2="${x.toFixed(1)}" y2="${pad.t + innerH}" />
            <circle class="dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${isExt ? 6 : 5}" fill="${color}" stroke="#fff" stroke-width="2.2" />
            <text class="val-label" x="${x.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" fill="${color}" font-size="13.5" font-weight="750">${short}</text>
          </g>`;
      }).join("");

      return `
        <div class="fin-line-chart-wrap" id="finLineChartWrap">
          <svg class="fin-line-chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="Fluxo de caixa realizado e projetado">
            <defs>
              <linearGradient id="finLucroPos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#2f9e6b" stop-opacity="0.22"/>
                <stop offset="100%" stop-color="#2f9e6b" stop-opacity="0.02"/>
              </linearGradient>
              <linearGradient id="finLucroNeg" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stop-color="#b33a4a" stop-opacity="0.28"/>
                <stop offset="100%" stop-color="#b33a4a" stop-opacity="0.02"/>
              </linearGradient>
            </defs>
            ${grid}
            ${yLabels}
            <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${pad.t + innerH}" stroke="var(--border)" stroke-width="1"/>
            ${areaPos ? `<path d="${areaPos}" fill="url(#finLucroPos)" pointer-events="none"/>` : ""}
            ${areaNeg ? `<path d="${areaNeg}" fill="url(#finLucroNeg)" pointer-events="none"/>` : ""}
            ${nowMark}
            ${realPathIdx.length > 1 ? `<path class="line-real" d="${smoothPath(realPathIdx, "saldoCaixa")}"/>` : ""}
            ${projPathIdx.length > 1 ? `<path class="line-proj${alerta ? " is-alert" : ""}" d="${smoothPath(projPathIdx, "saldoCaixa")}"/>` : ""}
            ${points}
            ${xLabels}
          </svg>
          <div class="fin-chart-tip" id="finChartTip" role="tooltip" aria-hidden="true"></div>
        </div>`;
    }

    function bindFinLineChart(root) {
      const wrap = root?.querySelector?.("#finLineChartWrap") || root;
      const svg = wrap?.querySelector?.(".fin-line-chart");
      const tip = wrap?.querySelector?.("#finChartTip");
      if (!svg || !tip) return;
      const points = [...svg.querySelectorAll("[data-fin-pt]")];
      if (!points.length) return;

      const clearActive = () => {
        points.forEach((p) => p.classList.remove("is-active"));
        svg.querySelectorAll(".x-lab").forEach((lab) => {
          lab.setAttribute("fill", "var(--muted)");
          lab.setAttribute("font-weight", "500");
        });
        tip.classList.remove("show");
        tip.setAttribute("aria-hidden", "true");
      };

      const activate = (pt, clientX, clientY) => {
        if (!pt) return;
        clearActive();
        pt.classList.add("is-active");
        const idx = pt.dataset.finPt;
        const xLab = svg.querySelector(`.x-lab[data-x-idx="${idx}"]`);
        if (xLab) {
          xLab.setAttribute("fill", "var(--navy-deep)");
          xLab.setAttribute("font-weight", "700");
        }
        const caixa = Number(pt.dataset.caixa) || 0;
        const saldo = Number(pt.dataset.saldo) || 0;
        const ent = Number(pt.dataset.entradas) || 0;
        const sai = Number(pt.dataset.saidas) || 0;
        const kind = pt.dataset.kind === "proj" ? "Projetado" : (pt.dataset.kind === "mixed" ? "Parcial" : "Realizado");
        tip.innerHTML = `
          <div class="tip-period">${pt.dataset.period || ""} · ${kind}</div>
          <div class="tip-row"><span>Entradas</span><strong class="up">${money(ent)}</strong></div>
          <div class="tip-row"><span>Saídas</span><strong class="down">${money(sai)}</strong></div>
          <div class="tip-row"><span>Saldo projetado</span><strong class="${caixa >= 0 ? "up" : "down"}">${money(caixa)}</strong></div>
          <div class="tip-row"><span>Resultado do período</span><strong class="${saldo >= 0 ? "up" : "down"}">${money(saldo)}</strong></div>`;
        tip.classList.add("show");
        tip.setAttribute("aria-hidden", "false");
        const wrapRect = wrap.getBoundingClientRect();
        const tipW = tip.offsetWidth || 160;
        const tipH = tip.offsetHeight || 90;
        let left = clientX - wrapRect.left + 14;
        let top = clientY - wrapRect.top - tipH - 10;
        if (left + tipW > wrapRect.width - 8) left = clientX - wrapRect.left - tipW - 14;
        if (left < 8) left = 8;
        if (top < 8) top = clientY - wrapRect.top + 16;
        tip.style.left = `${left}px`;
        tip.style.top = `${top}px`;
      };

      const nearestFromEvent = (e) => {
        const rect = svg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        let best = null;
        let bestDist = Infinity;
        points.forEach((pt) => {
          const hit = pt.querySelector(".hit");
          if (!hit) return;
          const hx = Number(hit.getAttribute("x")) || 0;
          const hw = Number(hit.getAttribute("width")) || 0;
          const svgW = Number(svg.viewBox.baseVal?.width) || 640;
          const scale = rect.width / svgW;
          const center = (hx + hw / 2) * scale;
          const d = Math.abs(center - x);
          if (d < bestDist) {
            bestDist = d;
            best = pt;
          }
        });
        return best;
      };

      svg.addEventListener("mousemove", (e) => {
        const pt = nearestFromEvent(e);
        if (pt) activate(pt, e.clientX, e.clientY);
      });
      svg.addEventListener("mouseleave", clearActive);
      points.forEach((pt) => {
        pt.addEventListener("focus", () => {
          const hit = pt.querySelector(".dot");
          const rect = (hit || pt).getBoundingClientRect();
          activate(pt, rect.left + rect.width / 2, rect.top);
        });
        pt.addEventListener("blur", clearActive);
        pt.addEventListener("keydown", (e) => {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
          e.preventDefault();
          const i = Number(pt.dataset.finPt) || 0;
          const next = e.key === "ArrowRight"
            ? points[Math.min(points.length - 1, i + 1)]
            : points[Math.max(0, i - 1)];
          next?.focus();
        });
      });
    }

    function renderFinDonut(receitas) {
      const r = 42;
      const c = 2 * Math.PI * r;
      let offset = 0;
      const arcs = receitas.map((item) => {
        const len = (item.pct / 100) * c;
        const dash = `${len} ${c - len}`;
        const cls = `fin-donut-arc${item.dim ? " is-dim" : ""}${item.active && finDash.receitaFilter ? " is-active" : ""}`;
        const el = `<circle class="${cls}" data-fin-receita="${item.id}" cx="50" cy="50" r="${r}" fill="none" stroke="${item.color}" stroke-width="16" stroke-linecap="butt" stroke-dasharray="${dash}" stroke-dashoffset="${-offset}" transform="rotate(-90 50 50)" role="button" tabindex="0"/>`;
        offset += len;
        return el;
      }).join("");
      return `
        <svg class="fin-donut" viewBox="0 0 100 100" role="img" aria-label="Distribuição das receitas — clique para filtrar">
          <circle cx="50" cy="50" r="${r}" fill="none" stroke="color-mix(in srgb, var(--border) 70%, transparent)" stroke-width="16"/>
          ${arcs}
          <text x="50" y="47" text-anchor="middle" fill="var(--navy-deep)" font-size="9" font-weight="800">Receitas</text>
          <text x="50" y="58" text-anchor="middle" fill="var(--muted)" font-size="7.5" font-weight="700">${finDash.receitaFilter ? "filtro" : "100%"}</text>
        </svg>`;
    }

    function renderFinDre(dre) {
      const rows = dre.map((node) => {
        const open = Boolean(finDash.dreOpen[node.id]);
        const hasChildren = (node.children || []).length > 0;
        const barCls = node.bar === "cost" ? "cost" : (node.bar === "result" ? "result" : "");
        const parent = `
          <tr class="${node.result ? "is-result" : "is-total"}" data-dre-node="${node.id}">
            <td>
              <div class="dre-lab">
                ${hasChildren
                  ? `<button type="button" class="dre-toggle" data-fin-dre-toggle="${node.id}" aria-expanded="${open}">${open ? "−" : "+"}</button>`
                  : `<span class="dre-spacer"></span>`}
                <span>${node.label}</span>
              </div>
            </td>
            <td class="dre-val ${node.sign === "neg" ? "neg" : "pos"}">${money(node.valor)}</td>
            <td class="dre-pct">
              <div class="fin-dre-bar">
                <div class="track"><div class="fill ${barCls}" style="width:${Math.min(100, node.pct)}%"></div></div>
                <span class="pct-n">${node.pct.toFixed(1).replace(".", ",")}%</span>
              </div>
            </td>
          </tr>`;
        const kids = (open && hasChildren)
          ? node.children.map((ch) => `
              <tr data-dre-child="${node.id}">
                <td><div class="dre-lab child"><span class="dre-spacer"></span><span>${ch.label}</span></div></td>
                <td class="dre-val ${ch.valor < 0 ? "neg" : "pos"}">${money(ch.valor)}</td>
                <td class="dre-pct">
                  <div class="fin-dre-bar">
                    <div class="track"><div class="fill ${barCls}" style="width:${Math.min(100, ch.pct)}%"></div></div>
                    <span class="pct-n">${ch.pct.toFixed(1).replace(".", ",")}%</span>
                  </div>
                </td>
              </tr>`).join("")
          : "";
        return parent + kids;
      }).join("");
      return `
        <section class="fin-dre-card" data-fin-filter="dre">
          <div class="dre-head">
            <div>
              <h4>Demonstração do Resultado do Exercício</h4>
              <div class="chart-sub">Visão em árvore · análise vertical sobre a receita bruta</div>
            </div>
          </div>
          <table class="fin-dre-table">
            <tbody>${rows}</tbody>
          </table>
        </section>`;
    }

    function openFinDrawer(kind, data) {
      const labels = {
        saldo: ["Saldo Atual", "Composição do disponível consolidado"],
        margem: ["Margem Operacional", "Receita líquida × custos operacionais"],
        inad: ["Taxa de Inadimplência", "Top títulos vencidos em contas a receber"],
        projecao: ["Projeção de Caixa (30 dias)", "Títulos em aberto que formam a previsão"],
        receber: ["Total a Receber", "Principais componentes do saldo"],
        pagar: ["Total a Pagar", "Principais fornecedores e compromissos"],
        recebido: ["Recebido no Período", "Maiores entradas realizadas"],
        pago: ["Pago no Período", "Maiores saídas realizadas"],
        resumo: ["Fluxo de Caixa Líquido", "Entradas − saídas no período filtrado"],
      };
      const [title, sub] = labels[kind] || ["Detalhe", "Composição"];
      const items = data?.drill?.[kind] || [];
      const totals = {
        saldo: data.saldoAtual,
        margem: data.margemValor,
        inad: data.receberVencidos,
        projecao: data.projecaoCaixa30,
        receber: data.totalReceber,
        pagar: data.totalPagar,
        recebido: data.recebido,
        pago: data.pago,
        resumo: data.geracaoCaixa,
      };
      finDash.drawer = { kind, title, sub, items, total: totals[kind] ?? 0 };
      paintFinDrawer();
    }

    function closeFinDrawer() {
      finDash.drawer = null;
      paintFinDrawer();
    }

    function paintFinDrawer() {
      const backdrop = document.getElementById("finDrawerBackdrop");
      const drawer = document.getElementById("finDrawer");
      const title = document.getElementById("finDrawerTitle");
      const sub = document.getElementById("finDrawerSub");
      const body = document.getElementById("finDrawerBody");
      if (!backdrop || !drawer || !body) return;
      const d = finDash.drawer;
      if (!d) {
        backdrop.classList.remove("open");
        drawer.classList.remove("open");
        backdrop.setAttribute("aria-hidden", "true");
        drawer.setAttribute("aria-hidden", "true");
        return;
      }
      title.textContent = d.title;
      sub.textContent = d.sub;
      body.innerHTML = `
        <div class="fin-drawer-meta">
          <span>Total em destaque</span>
          <strong>${money(d.total)}</strong>
        </div>
        <div class="fin-drawer-list">
          ${d.items.map((it, i) => `
            <div class="fin-drawer-item">
              <span class="rank">${i + 1}</span>
              <div>
                <strong>${it.nome}</strong>
                <div class="meta">${it.meta || ""}</div>
              </div>
              <span class="amt ${it.tipo || ""}">${money(it.valor)}</span>
            </div>`).join("")}
        </div>`;
      backdrop.classList.add("open");
      drawer.classList.add("open");
      backdrop.setAttribute("aria-hidden", "false");
      drawer.setAttribute("aria-hidden", "false");
    }

    function getFinClientAcMatches(limit = 8) {
      const q = normalizeSearchText(finDash.empresaQuery);
      return CLIENTES.filter((c) => {
        if (!q) return true;
        return normalizeSearchText([c.fantasia, c.nome, c.razaoSocial, c.cnpj, c.code].join(" ")).includes(q);
      }).slice(0, limit);
    }

    function filterFinEmpresaOptions(term) {
      const q = normalizeSearchText(term || "");
      const wrap = document.getElementById("finEmpresaOptions");
      const empty = document.getElementById("finEmpresaEmpty");
      if (!wrap) return;
      let visible = 0;
      wrap.querySelectorAll(".empresa-option").forEach((opt) => {
        const isAll = (opt.dataset.finEmpresaOpt || opt.dataset.id) === "all";
        const hay = normalizeSearchText([
          opt.dataset.short,
          opt.dataset.code,
          opt.dataset.cnpj,
          opt.textContent,
          isAll ? "todos as empresas consolidada carteira" : "",
        ].join(" "));
        const match = !q || hay.includes(q) || (isAll && ("todos".includes(q) || "carteira".includes(q)));
        opt.classList.toggle("hidden", !match);
        if (match) visible += 1;
      });
      empty?.classList.toggle("show", visible === 0);
    }

    function renderFinClientPickerHtml() {
      const isAll = isFinAllClientsScope();
      const selected = getFinSelectedCliente();
      const code = isAll ? "" : (selected?.code || "");
      const name = isAll ? "Todas as empresas" : (selected?.fantasia || selected?.nome || "Cliente");
      const cnpjLine = isAll
        ? "Visão consolidada do grupo"
        : (selected?.cnpj ? `CNPJ ${selected.cnpj}` : "");
      const options = CLIENTES.map((c) => {
        const active = !isAll && finDash.empresaId === c.id ? " active" : "";
        const label = uiSelectEscape(c.nome || c.fantasia || "");
        return `
            <button type="button" class="empresa-option${active}" data-fin-empresa-opt="${c.id}" data-code="${uiSelectEscape(c.code || "")}" data-short="${label}" data-cnpj="${uiSelectEscape(c.cnpj || "")}">
              <span class="opt-main"><span class="opt-code">${uiSelectEscape(c.code || "")}</span>${label}</span>
              <small>CNPJ ${uiSelectEscape(c.cnpj || "")}${c.estado ? ` · ${uiSelectEscape(c.estado)}` : ""}${c.status ? ` · ${uiSelectEscape(c.status)}` : ""}</small>
            </button>`;
      }).join("");
      return `
        <div class="fin-client-picker">
          <div class="empresa-wrap${finDash.acOpen ? " open" : ""}" id="finEmpresaWrap">
            <button type="button" class="empresa-trigger tip-bottom" id="finEmpresaSelectBtn" data-tip="Trocar empresa do grupo" aria-expanded="${finDash.acOpen ? "true" : "false"}" aria-haspopup="listbox">
              <span class="trigger-text">
                <span class="name-line">
                  <span class="empresa-code" id="finEmpresaCode"${code ? "" : " hidden"}>${uiSelectEscape(code)}</span>
                  <span id="finEmpresaName">${uiSelectEscape(name)}</span>
                </span>
                <span class="empresa-cnpj" id="finEmpresaCnpj"${cnpjLine ? "" : " hidden"}>${uiSelectEscape(cnpjLine)}</span>
              </span>
              <svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="empresa-menu" id="finEmpresaMenu">
              <div class="empresa-search">
                <input type="search" id="finEmpresaSearch" placeholder="Buscar empresa..." autocomplete="off" aria-label="Buscar empresa" />
              </div>
              <div class="empresa-options" id="finEmpresaOptions">
                <button type="button" class="empresa-option${isAll ? " active" : ""}" data-fin-empresa-opt="all" data-code="" data-short="Todas as empresas" data-cnpj="">
                  <span class="opt-main">Todas as empresas</span>
                  <small>Consolida as ${CLIENTES.length} empresas do grupo</small>
                </button>
                ${options}
              </div>
              <div class="empresa-empty" id="finEmpresaEmpty">Nenhuma empresa encontrada</div>
            </div>
          </div>
        </div>`;
    }

    function refreshFinClientPicker(opts = {}) {
      const host = document.querySelector("#financeiroWrap .fin-global-header");
      const current = host?.querySelector(".fin-client-picker");
      if (!host || !current) return false;
      const keepFocus = opts.focus === true;
      const tmp = document.createElement("div");
      tmp.innerHTML = renderFinClientPickerHtml().trim();
      const next = tmp.firstElementChild;
      if (!next) return false;
      current.replaceWith(next);
      if (keepFocus && finDash.acOpen) {
        const el = document.getElementById("finEmpresaSearch");
        if (el) {
          el.focus();
          el.value = "";
          filterFinEmpresaOptions("");
        }
      }
      return true;
    }

    function refreshFinClientAcMenu() {
      return refreshFinClientPicker({ focus: !!finDash.acOpen });
    }

    let finClientAcTimer = null;

    function scheduleFinClientAcRefresh() {
      if (finClientAcTimer) clearTimeout(finClientAcTimer);
      finClientAcTimer = setTimeout(() => {
        finClientAcTimer = null;
        filterFinEmpresaOptions(document.getElementById("finEmpresaSearch")?.value || "");
      }, 40);
    }

    function toggleFinEmpresaMenu(forceOpen) {
      const wrap = document.getElementById("finEmpresaWrap");
      const btn = document.getElementById("finEmpresaSelectBtn");
      if (!wrap || !btn) return;
      const willOpen = forceOpen ?? !wrap.classList.contains("open");
      finDash.acOpen = willOpen;
      wrap.classList.toggle("open", willOpen);
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      if (willOpen) {
        const search = document.getElementById("finEmpresaSearch");
        if (search) {
          search.value = "";
          filterFinEmpresaOptions("");
          setTimeout(() => search.focus(), 0);
        }
      }
    }

    function finTabIcon(id) {
      const map = {
        conciliacao: icons.financeiro,
        titulos: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>`,
        cartoes: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>`,
        cobrancas: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>`,
        folha: icons.clientes,
        plano: icons.documentos || icons.configura,
        config: icons.configura,
      };
      return (map[id] || icons.financeiro)
        .replace(/width="18"/g, 'width="15"')
        .replace(/height="18"/g, 'height="15"');
    }

    function renderFinPagesMenuHtml() {
      const closed = closedFinTabs();
      const items = closed.length
        ? closed.map((t) => `
            <button type="button" class="add-menu-item" data-fin-add-tab="${t.id}">
              <span class="tab-icon" aria-hidden="true">${finTabIcon(t.id)}</span>${uiSelectEscape(t.label)}
            </button>`).join("")
        : `<div class="add-menu-empty">Todas as páginas já estão abertas</div>`;
      const disabled = closed.length === 0 ? "disabled" : "";
      return `
        <div class="fin-pages-wrap" id="finPagesWrap">
          <button type="button" class="fin-pages-btn tip-bottom" id="finPagesBtn" data-tip="Abrir páginas do módulo" aria-label="Abrir páginas do módulo" aria-expanded="false" ${disabled}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="add-menu" id="finPagesMenu">${items}</div>
        </div>`;
    }

    function positionFinPagesMenu() {
      const wrap = document.getElementById("finPagesWrap");
      const menu = document.getElementById("finPagesMenu");
      const btn = document.getElementById("finPagesBtn");
      if (!wrap || !menu || !btn || !wrap.classList.contains("open")) return;
      const rect = btn.getBoundingClientRect();
      const menuWidth = Math.max(260, menu.offsetWidth || 260);
      let left = rect.right - menuWidth;
      if (left < 12) left = 12;
      if (left + menuWidth > window.innerWidth - 12) {
        left = Math.max(12, window.innerWidth - menuWidth - 12);
      }
      let top = rect.bottom + 6;
      const estimatedHeight = Math.min(320, menu.scrollHeight || 280);
      if (top + estimatedHeight > window.innerHeight - 12) {
        top = Math.max(12, rect.top - estimatedHeight - 6);
      }
      menu.style.left = `${left}px`;
      menu.style.top = `${top}px`;
    }

    function toggleFinPagesMenu(forceOpen) {
      const wrap = document.getElementById("finPagesWrap");
      const btn = document.getElementById("finPagesBtn");
      if (!wrap || !btn || btn.disabled) return;
      const willOpen = forceOpen ?? !wrap.classList.contains("open");
      wrap.classList.toggle("open", willOpen);
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      if (willOpen) requestAnimationFrame(() => positionFinPagesMenu());
    }

    function renderFinGlobalHeaderHtml() {
      const isVisaoGeral = finDash.tab === "dashboard";
      return `
        <header class="fin-global-header">
          ${renderFinClientPickerHtml()}
          <div class="dash-period fin-dash-period">
            <div class="dash-period-select-wrap">
              <select class="dash-period-select" id="finDashPeriod" data-no-ui="1" aria-label="Filtrar período">
                <option value="mes" ${finDash.period === "mes" ? "selected" : ""}>Mês Atual</option>
                <option value="30d" ${finDash.period === "30d" ? "selected" : ""}>Últimos 30 dias</option>
                <option value="custom" ${finDash.period === "custom" ? "selected" : ""}>Personalizado</option>
              </select>
            </div>
            <div class="dash-period-custom" id="finDashPeriodCustom">
              <input type="date" id="finPeriodFrom" value="${finDash.periodFrom || ""}" aria-label="Data inicial" />
              <span class="sep">até</span>
              <input type="date" id="finPeriodTo" value="${finDash.periodTo || ""}" aria-label="Data final" />
            </div>
          </div>
          <div class="fin-global-actions">
            ${isVisaoGeral ? `
              <button type="button" class="btn-ghost" data-fin-dash="limpar">Limpar Filtros</button>
              <button type="button" class="btn-primary" data-fin-dash="reload">Recarregar Dados</button>
            ` : ""}
            <div class="fin-header-tools" id="finHeaderTools"></div>
          </div>
        </header>`;
    }

    function parkFinPanelTools() {
      const home = document.querySelector(".content-panel .panel-tools");
      const viewTools = document.getElementById("dashViewTools");
      const expandBtn = document.getElementById("expandBtn");
      if (!home) return;
      if (typeof setFinConcOpsExpanded === "function" && finDash?.conc?.opsExpanded) {
        setFinConcOpsExpanded(false);
      }
      if (viewTools && viewTools.parentElement !== home) {
        const before = home.querySelector("#expandBtn");
        if (before) home.insertBefore(viewTools, before);
        else home.appendChild(viewTools);
      }
      if (expandBtn && expandBtn.parentElement !== home) home.appendChild(expandBtn);
      home.classList.remove("is-fin-parked");
    }

    function mountFinPanelTools() {
      const host = document.getElementById("finHeaderTools");
      const home = document.querySelector(".content-panel .panel-tools");
      const viewTools = document.getElementById("dashViewTools");
      const expandBtn = document.getElementById("expandBtn");
      if (!host || !home) return;
      const isVisaoGeral = finDash.tab === "dashboard";
      if (viewTools) {
        if (isVisaoGeral) {
          host.appendChild(viewTools);
          viewTools.hidden = false;
        } else {
          const before = home.querySelector("#expandBtn");
          if (viewTools.parentElement !== home) {
            if (before) home.insertBefore(viewTools, before);
            else home.appendChild(viewTools);
          }
          viewTools.hidden = true;
          document.getElementById("filterWrap")?.classList.remove("open");
          document.getElementById("filterBtn")?.setAttribute("aria-expanded", "false");
        }
      }
      if (expandBtn) {
        const concHost = finDash.tab === "conciliacao" ? document.getElementById("finConcExpandHost") : null;
        if (concHost) concHost.appendChild(expandBtn);
        else host.appendChild(expandBtn);
      }
      home.classList.add("is-fin-parked");
      if (typeof syncFinConcOpsExpandChrome === "function") syncFinConcOpsExpandChrome();
    }

    function setFinConcOpsExpanded(on) {
      if (!finDash.conc) return;
      const active = !!on && finDash.tab === "conciliacao";
      finDash.conc.opsExpanded = active;
      const ops = document.getElementById("finConcOps");
      ops?.classList.toggle("is-expanded", active);
      const contentPanelEl = document.getElementById("contentPanel");
      contentPanelEl?.classList.remove("is-expanded");
      document.getElementById("expandBackdrop")?.classList.toggle("show", active);
      document.body.classList.toggle("panel-expanded", active);
      document.body.classList.toggle("fin-conc-ops-expanded", active);
      document.body.style.overflow = active ? "hidden" : "";
      const btn = document.getElementById("expandBtn");
      if (btn) {
        const expandIcon = btn.querySelector(".icon-expand");
        const collapseIcon = btn.querySelector(".icon-collapse");
        if (expandIcon) expandIcon.hidden = active;
        if (collapseIcon) collapseIcon.hidden = !active;
        btn.setAttribute("data-tip", active ? "Sair da tela toda" : "Expandir movimentações");
        btn.setAttribute("aria-label", active ? "Sair da tela toda" : "Expandir movimentações");
      }
    }

    function syncFinConcOpsExpandChrome() {
      if (!finDash.conc) return;
      if (finDash.tab !== "conciliacao") {
        if (finDash.conc.opsExpanded) setFinConcOpsExpanded(false);
        return;
      }
      setFinConcOpsExpanded(!!finDash.conc.opsExpanded);
    }

    function ensureFinOpenTabs() {
      const allIds = FIN_TABS.map((t) => t.id);
      finDash.openTabIds = allIds.slice();
      if (!FIN_TABS.some((t) => t.id === finDash.tab)) finDash.tab = "dashboard";
    }

    function closedFinTabs() {
      return [];
    }

    function addFinTab(id) {
      if (!FIN_TABS.some((t) => t.id === id)) return;
      ensureFinOpenTabs();
      finDash.tab = id;
      finDash.acOpen = false;
      closeFinDrawer();
      renderFinModuleDash();
    }

    function closeFinTab(id) {
      toast("As abas do Financeiro ficam fixas nesta versão");
    }

    function isFinNavGroupActive(group) {
      if (group.type === "direct") return finDash.tab === group.tab;
      return (group.items || []).some((it) => it.tab === finDash.tab);
    }

    function closeFinNavMenus() {
      document.querySelectorAll(".fin-nav-group.open").forEach((el) => {
        el.classList.remove("open");
        el.querySelector("[data-fin-nav-toggle]")?.setAttribute("aria-expanded", "false");
        const menu = el.querySelector(".fin-nav-menu");
        if (menu) {
          menu.style.top = "";
          menu.style.left = "";
          menu.style.minWidth = "";
        }
      });
    }

    function positionFinNavMenu(groupEl) {
      const menu = groupEl?.querySelector(".fin-nav-menu");
      const trigger = groupEl?.querySelector("[data-fin-nav-toggle]");
      if (!menu || !trigger) return;
      const r = trigger.getBoundingClientRect();
      const width = Math.max(r.width, 220);
      let left = r.left;
      if (left + width > window.innerWidth - 8) left = Math.max(8, window.innerWidth - width - 8);
      menu.style.top = `${Math.round(r.bottom + 4)}px`;
      menu.style.left = `${Math.round(left)}px`;
      menu.style.minWidth = `${Math.round(width)}px`;
    }

    function syncOpenFinNavMenus() {
      const openGroups = document.querySelectorAll(".fin-nav-group.open");
      if (!openGroups.length) {
        if (document.getElementById("finPagesWrap")?.classList.contains("open")) {
          positionFinPagesMenu();
        }
        return;
      }
      openGroups.forEach((group) => {
        const trigger = group.querySelector("[data-fin-nav-toggle]");
        if (!trigger) return;
        const r = trigger.getBoundingClientRect();
        if (r.bottom < 8 || r.top > window.innerHeight - 8) {
          closeFinNavMenus();
          return;
        }
        positionFinNavMenu(group);
      });
      if (document.getElementById("finPagesWrap")?.classList.contains("open")) {
        positionFinPagesMenu();
      }
    }

    if (!window.__finNavMenuScrollBound) {
      window.__finNavMenuScrollBound = true;
      window.addEventListener("scroll", syncOpenFinNavMenus, true);
      window.addEventListener("resize", syncOpenFinNavMenus);
    }

    function goFinNavTab(tab, cfgSec) {
      ensureFinOpenTabs();
      if (!finDash.openTabIds.includes(tab)) finDash.openTabIds.push(tab);
      if (cfgSec) finDash.config.section = cfgSec;
      closeFinNavMenus();
      if (finDash.tab === tab) {
        if (cfgSec) renderFinModuleDash();
        return;
      }
      finDash.tab = tab;
      finDash.acOpen = false;
      closeFinDrawer();
      renderFinModuleDash();
    }

    function renderFinTabsHtml() {
      ensureFinOpenTabs();
      const chev = `<svg class="fin-nav-chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;
      return `
        <div class="fin-tabs-bar">
          <nav class="fin-tabs fin-nav" role="menubar" aria-label="Navegação do Módulo Contábil">
            ${FIN_NAV_GROUPS.map((g) => {
              const active = isFinNavGroupActive(g);
              if (g.type === "direct") {
                return `
                  <div role="menuitem" data-fin-tab="${g.tab}" class="fin-tab${active ? " active" : ""}" aria-selected="${active ? "true" : "false"}" title="${uiSelectEscape(g.label)}">
                    <span class="fin-tab-label">${g.label}</span>
                  </div>`;
              }
              return `
                <div class="fin-nav-group${active ? " is-active" : ""}" data-fin-nav-group="${g.id}">
                  <button type="button" class="fin-tab fin-nav-trigger${active ? " active" : ""}" data-fin-nav-toggle="${g.id}" aria-haspopup="menu" aria-expanded="false" title="${uiSelectEscape(g.label)}">
                    <span class="fin-tab-label">${g.label}</span>
                    ${chev}
                  </button>
                  <div class="fin-nav-menu" role="menu" aria-label="${uiSelectEscape(g.label)}">
                    ${(g.items || []).map((it) => {
                      const sec = finDash.config?.section || "adquirentes";
                      const isCurrent = finDash.tab === it.tab
                        && (!it.configSection || sec === it.configSection);
                      return `
                      <button type="button" role="menuitem" class="fin-nav-item${isCurrent ? " is-current" : ""}" data-fin-tab="${it.tab}"${it.configSection ? ` data-fin-cfg-sec="${it.configSection}"` : ""}>
                        ${uiSelectEscape(it.label)}
                      </button>`;
                    }).join("")}
                  </div>
                </div>`;
            }).join("")}
          </nav>
        </div>`;
    }

    function renderFinEmptyStateHtml() {
      return `
        <div class="fin-empty-state">
          <div>
            <div class="empty-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <p>Selecione um cliente no menu acima para operar nesta aba.</p>
          </div>
        </div>`;
    }

    function getFinDreTaxonomy() {
      if (!finDash.config.plano) {
        finDash.config.plano = JSON.parse(JSON.stringify(FIN_DRE_TAXONOMY));
      }
      return finDash.config.plano;
    }

    function ensureFinAdquirentes() {
      if (!finDash.config.adquirentes) {
        finDash.config.adquirentes = FIN_ACQ_SEED.map((a) => ({ ...a, bandeiras: [...a.bandeiras] }));
      }
      return finDash.config.adquirentes;
    }

    function findFinDreLeaf(catId) {
      for (const group of getFinDreTaxonomy()) {
        const leaf = (group.children || []).find((c) => c.id === catId);
        if (leaf) return { group, leaf };
      }
      return null;
    }

    function finDreCatLabel(catId) {
      const hit = findFinDreLeaf(catId);
      if (hit) return `${hit.group.label} › ${hit.leaf.label}`;
      const plano = typeof getFinPlanoFinanceiroList === "function"
        ? getFinPlanoFinanceiroList().find((x) => x.id === catId)
        : null;
      if (plano) return `${plano.codigo} - ${plano.nome}`;
      return "";
    }

    function ensureFinConcMovs() {
      if (!finDash.conc.movs) {
        finDash.conc.movs = FIN_CONC_MOVS.map((m) => ({ ...m }));
      }
      return finDash.conc.movs;
    }

    function getFinConcMovements() {
      return ensureFinConcMovs().map((m) => {
        const catId = finDash.conc.categories[m.id] ?? m.catId ?? "";
        /* Classificação feita no OFX só vira Conciliado após "Importar tudo" */
        if (m.ofxPendingValidate && !m.ofxValidated) {
          return { ...m, catId, status: "aberto" };
        }
        /* status explícito "aberto" (ex.: após desconciliar) prevalece sem categoria */
        if (m.status === "aberto" && !catId) {
          return { ...m, catId: "", status: "aberto" };
        }
        const status = (catId || m.status === "conciliado") ? "conciliado" : (m.status || "aberto");
        return { ...m, catId, status };
      });
    }

    function filterFinConcMovements(rows) {
      const q = normalizeSearchText(finDash.conc.q || "");
      const tipo = finDash.conc.tipo || "";
      const status = finDash.conc.status || "";
      const valorQ = normalizeSearchText(finDash.conc.valor || "");
      const idQ = normalizeSearchText(finDash.conc.idTitulo || "");
      const deIso = finOfxBrToIso(finDash.conc.de || "");
      const ateIso = finOfxBrToIso(finDash.conc.ate || "");
      return rows.filter((r) => {
        if (tipo && r.tipo !== tipo) return false;
        if (status && r.status !== status) return false;
        if (idQ && !normalizeSearchText(String(r.tituloId || r.id)).includes(idQ)) return false;
        if (valorQ) {
          const raw = normalizeSearchText(String(r.valor));
          const fmt = normalizeSearchText(money(r.valor));
          if (!raw.includes(valorQ) && !fmt.includes(valorQ)) return false;
        }
        if (q && !normalizeSearchText(`${r.desc || ""} ${r.data || ""} ${r.valor} ${r.tituloId || ""}`).includes(q)) return false;
        if (deIso || ateIso) {
          const rowIso = finOfxBrToIso(r.data || "");
          if (!rowIso) return false;
          if (deIso && rowIso < deIso) return false;
          if (ateIso && rowIso > ateIso) return false;
        }
        return true;
      });
    }

    function openFinConcFinalizarMesModal() {
      const de = formatFinDateBR(finDash.periodFrom || "2026-07-20");
      const ate = formatFinDateBR(finDash.periodTo || finDash.periodFrom || "2026-07-20");
      openModal({
        title: "Finalizar mês",
        sub: "",
        body: `
          <div class="fin-conc-finalizar-modal">
            <p class="fin-conc-finalizar-msg">
              Finalizar as conciliações geradas para <strong>${uiSelectEscape(de)}</strong> a <strong>${uiSelectEscape(ate)}</strong>?
              Depois disso, gerar, conciliar e desconciliar movimentações deste mês ficará bloqueado.
            </p>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-outline fin-conc-finalizar-btn" id="finConcFinalizarConfirm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Finalizar
          </button>`,
      });
      prepareFinConcModalChrome();

      document.getElementById("finConcFinalizarConfirm")?.addEventListener("click", () => {
        finDash.conc.mesFinalizado = true;
        closeModal();
        renderFinModuleDash();
        toast("Mês finalizado · conciliação encerrada");
      });
    }

    function openFinConcAddModal() {
      openModal({
        title: "Adicionar movimentação",
        sub: "Lançamento manual na conciliação do cliente",
        wide: true,
        body: `
          <div class="cli-cad-grid">
            <div>
              <label for="finConcAddData">Data</label>
              <input type="date" id="finConcAddData" value="2026-07-14" />
            </div>
            <div>
              <label for="finConcAddTipo">Tipo</label>
              <select id="finConcAddTipo">
                <option value="credito">Crédito</option>
                <option value="debito">Débito</option>
              </select>
            </div>
            <div>
              <label for="finConcAddValor">Valor</label>
              <input type="text" id="finConcAddValor" inputmode="decimal" placeholder="0,00" />
            </div>
            <div>
              <label for="finConcAddTitulo">ID do título</label>
              <input type="text" id="finConcAddTitulo" placeholder="Ex.: 10451" />
            </div>
            <div class="full">
              <label for="finConcAddDesc">Descrição original do banco</label>
              <input type="text" id="finConcAddDesc" placeholder="Texto como aparece no extrato" />
            </div>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="finConcAddSave">Salvar lançamento</button>`,
      });
      prepareFinConcModalChrome();
      document.getElementById("finConcAddSave")?.addEventListener("click", () => {
        const dataIso = document.getElementById("finConcAddData")?.value || "";
        const tipo = document.getElementById("finConcAddTipo")?.value || "credito";
        const valor = parseFinValorInput(document.getElementById("finConcAddValor")?.value || "");
        const desc = (document.getElementById("finConcAddDesc")?.value || "").trim();
        let tituloId = (document.getElementById("finConcAddTitulo")?.value || "").trim();
        if (!dataIso || !desc || !Number.isFinite(valor) || valor <= 0) {
          toast("Preencha data, descrição e valor válido");
          return;
        }
        if (!tituloId) tituloId = String(10450 + ensureFinConcMovs().length + 1);
        const id = `fm${Date.now()}`;
        ensureFinConcMovs().unshift({
          id,
          tituloId,
          data: formatFinDateBR(dataIso),
          desc,
          tipo,
          valor,
          status: "aberto",
        });
        closeModal();
        renderFinModuleDash();
        toast("Movimentação adicionada manualmente");
      });
    }

    function getFinConcMovById(movId) {
      return getFinConcMovements().find((m) => m.id === movId) || null;
    }

    function pushFinConcHistory(movId, text, origem = "sistema") {
      const list = ensureFinConcMovs();
      const idx = list.findIndex((m) => m.id === movId);
      if (idx < 0) return;
      if (!Array.isArray(list[idx].history)) list[idx].history = [];
      const now = new Date();
      const when = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()} · ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      list[idx].history.unshift({ when, who: origem === "usuario" ? "Você" : "Sistema", text, origem });
    }

    function ensureFinConcMovHistorySeed(m) {
      if (Array.isArray(m.history) && m.history.length) return m.history;
      const hist = [];
      hist.push({ when: `${m.data || "09/07/2026"} · 09:00`, who: "Sistema", text: "Movimentação importada / lançada no extrato", origem: "sistema" });
      if (m.status === "conciliado" || m.catId) {
        hist.unshift({
          when: `${m.data || "09/07/2026"} · 14:30`,
          who: "Você",
          text: m.catId ? `Conciliado · ${finDreCatLabel(m.catId)}` : "Conciliado",
          origem: "usuario",
        });
      }
      m.history = hist;
      return m.history;
    }

    function renderFinConcRowActions(r) {
      const menuOpen = finDash.conc.rowMenuId === r.id;
      const moreSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>`;
      if (r.status === "conciliado") {
        return `
          <div class="fin-conc-row-acts">
            <button type="button" class="btn-outline fin-conc-gerar-btn" data-fin-conc-gerar="${r.id}">Recategorizar</button>
            <div class="fin-conc-row-menu-wrap${menuOpen ? " open" : ""}">
              <button type="button" class="fin-conc-row-menu-btn tip-bottom" data-fin-conc-row-menu="${r.id}" data-tip="Mais ações" aria-label="Mais ações" aria-expanded="${menuOpen}" aria-haspopup="true">${moreSvg}</button>
              <div class="fin-conc-row-menu" role="menu" ${menuOpen ? "" : "hidden"}>
                <button type="button" role="menuitem" data-fin-conc-hist="${r.id}">Histórico</button>
                <button type="button" role="menuitem" class="is-danger" data-fin-conc-desconciliar="${r.id}">Desconciliar</button>
              </div>
            </div>
          </div>`;
      }
      return `
        <div class="fin-conc-row-acts">
          <button type="button" class="btn-primary fin-conc-gerar-btn" data-fin-conc-vincular="${r.id}">Conciliar</button>
          <div class="fin-conc-row-menu-wrap${menuOpen ? " open" : ""}">
            <button type="button" class="fin-conc-row-menu-btn tip-bottom" data-fin-conc-row-menu="${r.id}" data-tip="Mais ações" aria-label="Mais ações" aria-expanded="${menuOpen}" aria-haspopup="true">${moreSvg}</button>
            <div class="fin-conc-row-menu" role="menu" ${menuOpen ? "" : "hidden"}>
              <button type="button" role="menuitem" data-fin-conc-gerar="${r.id}">Gerar novo</button>
            </div>
          </div>
        </div>`;
    }

    function openFinConcHistoricoModal(movId) {
      const mov = getFinConcMovById(movId);
      if (!mov) { toast("Movimentação não encontrada"); return; }
      const raw = ensureFinConcMovs().find((m) => m.id === movId);
      const hist = ensureFinConcMovHistorySeed(raw || mov);
      openModal({
        title: "Histórico da movimentação",
        sub: `${uiSelectEscape(mov.desc)} · ${money(mov.valor)}`,
        body: `
          <div class="fin-conc-hist-modal">
            <div class="fin-conc-hist-summary">
              <span class="fin-status-pill ${mov.status}">${mov.status === "conciliado" ? "Conciliado" : "Em aberto"}</span>
              <span class="mono">${uiSelectEscape(mov.data)}</span>
              <span class="mono">${uiSelectEscape(mov.tituloId || "—")}</span>
            </div>
            <ol class="fin-conc-hist-list">
              ${hist.map((h) => `
                <li>
                  <div class="fin-conc-hist-dot" aria-hidden="true"></div>
                  <div class="fin-conc-hist-body">
                    <strong>${uiSelectEscape(h.text)}</strong>
                    <span>${uiSelectEscape(h.when)} · ${uiSelectEscape(h.who || "Sistema")}</span>
                  </div>
                </li>`).join("")}
            </ol>
          </div>`,
        foot: `<button type="button" class="btn-ghost" data-close>Fechar</button>`,
      });
      prepareFinConcModalChrome();
    }

    function openFinConcDesconciliarModal(movId) {
      const mov = getFinConcMovById(movId);
      if (!mov) { toast("Movimentação não encontrada"); return; }
      if (finDash.conc.mesFinalizado) {
        toast("Mês finalizado · desconciliar bloqueado");
        return;
      }
      openModal({
        title: "Desconciliar movimentação",
        sub: "",
        body: `
          <div class="fin-conc-finalizar-modal">
            <p class="fin-conc-finalizar-msg">
              Remover a conciliação de <strong>${uiSelectEscape(mov.desc)}</strong> (${money(mov.valor)})?
              O status voltará para <strong>Em aberto</strong> e o evento será registrado no histórico.
            </p>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-outline fin-ofx-danger" id="finConcDesconciliarConfirm">Desconciliar</button>`,
      });
      prepareFinConcModalChrome();
      document.getElementById("finConcDesconciliarConfirm")?.addEventListener("click", () => {
        const list = ensureFinConcMovs();
        const idx = list.findIndex((m) => m.id === movId);
        if (idx < 0) return;
        list[idx].status = "aberto";
        list[idx].catId = "";
        list[idx].vinculoTituloId = "";
        list[idx].ofxPendingValidate = false;
        list[idx].ofxValidated = false;
        delete finDash.conc.categories[movId];
        pushFinConcHistory(movId, "Desconciliado · status Em aberto", "usuario");
        closeModal();
        renderFinModuleDash();
        toast("Movimentação desconciliada");
      });
    }

    function openFinConcVincularTituloModal(movId) {
      const mov = getFinConcMovById(movId);
      if (!mov) { toast("Movimentação não encontrada"); return; }
      if (finDash.conc.mesFinalizado) {
        toast("Mês finalizado · conciliar bloqueado");
        return;
      }
      const defaultLado = mov.tipo === "credito" ? "receber" : "pagar";
      finDash.conc.vincular = { movId, lado: defaultLado, tituloId: "" };

      const paint = () => {
        const st = finDash.conc.vincular;
        const lado = st.lado || defaultLado;
        const titulos = (typeof FIN_TITULOS_SEED !== "undefined" ? FIN_TITULOS_SEED : [])
          .filter((t) => t.lado === lado && t.status !== "pago");
        const listHtml = titulos.length ? titulos.map((t) => `
          <button type="button" class="fin-conc-vinc-item${st.tituloId === t.id ? " is-selected" : ""}" data-fin-vinc-titulo="${t.id}">
            <div class="fin-conc-vinc-main">
              <strong>${uiSelectEscape(t.desc)}</strong>
              <span>${uiSelectEscape(t.sacado)} · ${uiSelectEscape(t.nossoNumero)}</span>
            </div>
            <div class="fin-conc-vinc-meta">
              <span class="mono">${uiSelectEscape(t.vencimento)}</span>
              <span class="num">${money(t.valor)}</span>
            </div>
          </button>`).join("") : `<div class="fin-table-empty">Nenhum título ${lado === "pagar" ? "a pagar" : "a receber"} pendente.</div>`;

        openModal({
          title: "Conciliar com título",
          sub: `${uiSelectEscape(mov.desc)} · ${money(mov.valor)} · ${uiSelectEscape(mov.data)}`,
          wide: true,
          body: `
            <div class="fin-conc-vinc-modal">
              <div class="fin-conc-vinc-mov">
                <span class="fin-ofx-tipo ${mov.tipo}">${mov.tipo === "credito" ? "CREDITO" : "DEBITO"}</span>
                <strong>${uiSelectEscape(mov.desc)}</strong>
                <span class="num fin-val ${mov.tipo === "credito" ? "in" : "out"}">${money(mov.valor)}</span>
              </div>
              <div class="fin-conc-vinc-tabs" role="tablist" aria-label="Tipo de título">
                <button type="button" class="fin-conc-vinc-tab${lado === "pagar" ? " active" : ""}" data-fin-vinc-lado="pagar" role="tab" aria-selected="${lado === "pagar"}">Contas a pagar</button>
                <button type="button" class="fin-conc-vinc-tab${lado === "receber" ? " active" : ""}" data-fin-vinc-lado="receber" role="tab" aria-selected="${lado === "receber"}">Contas a receber</button>
              </div>
              <div class="fin-conc-vinc-list" role="listbox" aria-label="Títulos">${listHtml}</div>
            </div>`,
          foot: `
            <button type="button" class="btn-ghost" data-close>Cancelar</button>
            <button type="button" class="btn-primary" id="finConcVincularConfirm" ${st.tituloId ? "" : "disabled"}>Conciliar</button>`,
        });
        prepareFinConcModalChrome();

        modalBody.querySelectorAll("[data-fin-vinc-lado]").forEach((btn) => {
          btn.addEventListener("click", () => {
            finDash.conc.vincular.lado = btn.dataset.finVincLado;
            finDash.conc.vincular.tituloId = "";
            paint();
          });
        });
        modalBody.querySelectorAll("[data-fin-vinc-titulo]").forEach((btn) => {
          btn.addEventListener("click", () => {
            finDash.conc.vincular.tituloId = btn.dataset.finVincTitulo;
            paint();
          });
        });
        document.getElementById("finConcVincularConfirm")?.addEventListener("click", () => {
          const tid = finDash.conc.vincular?.tituloId;
          const titulo = (FIN_TITULOS_SEED || []).find((t) => t.id === tid);
          if (!titulo) { toast("Selecione um título"); return; }
          const list = ensureFinConcMovs();
          const idx = list.findIndex((m) => m.id === movId);
          if (idx < 0) return;
          list[idx].status = "conciliado";
          list[idx].vinculoTituloId = titulo.id;
          list[idx].tituloId = titulo.nossoNumero || list[idx].tituloId;
          pushFinConcHistory(movId, `Conciliado manualmente com título ${titulo.nossoNumero} · ${titulo.desc}`, "usuario");
          finDash.conc.vincular = null;
          closeModal();
          renderFinModuleDash();
          toast(`Conciliado · ${titulo.nossoNumero}`);
        });
      };
      paint();
    }

    function buildFinConcMatchPairs() {
      const abertos = getFinConcMovements().filter((m) => m.status === "aberto");
      const titulos = FIN_TITULOS_SEED || [];
      const levels = ["alto", "medio", "baixo"];
      const pairs = [];
      abertos.forEach((m, i) => {
        const lado = m.tipo === "credito" ? "receber" : "pagar";
        const cands = titulos.filter((t) => t.lado === lado);
        const t = cands[i % Math.max(cands.length, 1)] || titulos[i % titulos.length];
        if (!t) return;
        const exact = Math.abs((t.valor || 0) - (m.valor || 0)) < 0.02;
        const nivel = exact ? "alto" : levels[i % 3];
        pairs.push({
          id: `mp-${m.id}-${t.id}`,
          movId: m.id,
          tituloId: t.id,
          movDesc: m.desc,
          movData: m.data,
          movValor: m.valor,
          titDesc: t.desc,
          titSacado: t.sacado,
          titValor: t.valor,
          titNum: t.nossoNumero,
          nivel,
          selected: false,
        });
      });
      return pairs;
    }

    function openFinConcMatchingModal() {
      const auto = finDash.conc.regras?.automacao || "inativo";
      let pairs = buildFinConcMatchPairs();
      if (auto === "semi") {
        pairs = pairs.map((p) => ({ ...p, selected: p.nivel === "alto" }));
      } else if (auto === "ativo") {
        pairs = pairs.map((p) => ({ ...p, selected: p.nivel !== "baixo" }));
      } else {
        pairs = pairs.map((p) => ({ ...p, selected: false }));
      }
      finDash.conc.matchPairs = pairs;
      const nivelLab = { alto: "Alto", medio: "Médio", baixo: "Baixo" };

      const paint = () => {
        const list = finDash.conc.matchPairs || [];
        const selCount = list.filter((p) => p.selected).length;
        openModal({
          title: "Correspondências sugeridas",
          sub: `Motor de matching (protótipo) · modo ${auto === "ativo" ? "automático" : auto === "semi" ? "semiautomático" : "manual"}`,
          wide: true,
          body: `
            <div class="fin-conc-match-modal">
              <div class="fin-conc-match-legend" aria-hidden="true">
                <span class="fin-conc-match-pill alto">Alto</span>
                <span class="fin-conc-match-pill medio">Médio</span>
                <span class="fin-conc-match-pill baixo">Baixo</span>
              </div>
              <div class="fin-conc-match-list">
                ${list.length ? list.map((p) => `
                  <label class="fin-conc-match-row">
                    <input type="checkbox" data-fin-match-sel="${p.id}" ${p.selected ? "checked" : ""} />
                    <div class="fin-conc-match-cols">
                      <div>
                        <strong>${uiSelectEscape(p.movDesc)}</strong>
                        <span>${uiSelectEscape(p.movData)} · ${money(p.movValor)}</span>
                      </div>
                      <div class="fin-conc-match-arrow" aria-hidden="true">↔</div>
                      <div>
                        <strong>${uiSelectEscape(p.titDesc)}</strong>
                        <span>${uiSelectEscape(p.titSacado)} · ${uiSelectEscape(p.titNum)} · ${money(p.titValor)}</span>
                      </div>
                      <span class="fin-conc-match-pill ${p.nivel}">${nivelLab[p.nivel]}</span>
                    </div>
                  </label>`).join("") : `<div class="fin-table-empty">Nenhuma correspondência · não há movimentos em aberto.</div>`}
              </div>
            </div>`,
          foot: `
            <button type="button" class="btn-ghost" data-close>Cancelar</button>
            <button type="button" class="btn-outline" id="finConcMatchAll" ${list.length ? "" : "disabled"}>Confirmar todas</button>
            <button type="button" class="btn-primary" id="finConcMatchSel" ${selCount ? "" : "disabled"}>Confirmar selecionadas (${selCount})</button>`,
        });
        prepareFinConcModalChrome();

        modalBody.querySelectorAll("[data-fin-match-sel]").forEach((chk) => {
          chk.addEventListener("change", () => {
            const id = chk.dataset.finMatchSel;
            const p = (finDash.conc.matchPairs || []).find((x) => x.id === id);
            if (p) p.selected = !!chk.checked;
            const n = (finDash.conc.matchPairs || []).filter((x) => x.selected).length;
            const btn = document.getElementById("finConcMatchSel");
            if (btn) {
              btn.disabled = !n;
              btn.textContent = `Confirmar selecionadas (${n})`;
            }
          });
        });

        const applyPairs = (onlySelected) => {
          const chosen = (finDash.conc.matchPairs || []).filter((p) => (onlySelected ? p.selected : true));
          if (!chosen.length) { toast("Nenhuma correspondência para confirmar"); return; }
          const movs = ensureFinConcMovs();
          let n = 0;
          chosen.forEach((p) => {
            const idx = movs.findIndex((m) => m.id === p.movId);
            if (idx < 0) return;
            movs[idx].status = "conciliado";
            movs[idx].vinculoTituloId = p.tituloId;
            movs[idx].tituloId = p.titNum || movs[idx].tituloId;
            pushFinConcHistory(p.movId, `Conciliação automática (${nivelLab[p.nivel]}) · ${p.titNum}`, "sistema");
            n += 1;
          });
          finDash.conc.matchPairs = null;
          closeModal();
          renderFinModuleDash();
          toast(`${n} correspondência(s) confirmada(s)`);
        };

        document.getElementById("finConcMatchSel")?.addEventListener("click", () => applyPairs(true));
        document.getElementById("finConcMatchAll")?.addEventListener("click", () => applyPairs(false));
      };
      paint();
    }

    function renderFinConcPlanoPickList(_tipoMov, q, selectedId) {
      const nq = normalizeSearchText(q || "");
      const all = getFinPlanoFinanceiroList();
      const byCodigo = new Map(all.map((a) => [String(a.codigo), a]));
      const parentOf = (codigo) => {
        const parts = String(codigo || "").split(".");
        while (parts.length > 1) {
          parts.pop();
          const p = byCodigo.get(parts.join("."));
          if (p) return p.nome;
        }
        return "Plano financeiro";
      };
      const items = all
        .map((a) => ({
          id: a.id,
          code: a.codigo,
          label: a.nome,
          parent: parentOf(a.codigo),
        }))
        .filter((it) => {
          if (!nq) return true;
          return normalizeSearchText(`${it.code} ${it.label} ${it.parent} ${it.id}`).includes(nq);
        });
      if (!items.length) {
        return `<div class="fin-gerar-plano-empty">Nenhuma conta encontrada</div>`;
      }
      return items.map((it) => `
        <button type="button" class="fin-gerar-plano-item${selectedId === it.id ? " is-selected" : ""}" data-fin-gerar-cat="${it.id}" role="option" aria-selected="${selectedId === it.id}">
          <span class="plano-name">${uiSelectEscape(it.label)}</span>
          <span class="plano-code">${uiSelectEscape(it.code)}</span>
          <span class="plano-parent">${uiSelectEscape(it.parent)}</span>
        </button>`).join("");
    }

    function openFinConcGerarTituloModal(movId, opts = {}) {
      const fromOfx = !!opts.fromOfx;
      const mov = getFinConcMovById(movId);
      if (!mov) {
        toast("Movimentação não encontrada");
        return;
      }
      if (fromOfx && finDash.conc.ofx) {
        finDash.conc.ofx.modalOpen = false;
        finDash.conc.ofx.expanded = false;
        finDash.conc.ofx.returnAfterGerar = true;
      } else if (finDash.conc.ofx) {
        finDash.conc.ofx.returnAfterGerar = false;
      }

      const lado = mov.tipo === "credito" ? "receber" : "pagar";
      const titleBase = lado === "receber" ? "Gerar título a receber" : "Gerar título a pagar";
      const title = fromOfx ? `${titleBase} (OFX)` : titleBase;
      const banco = finDash.conc.banco || "SICREDI";
      const catId0 = mov.catId || finDash.conc.categories[mov.id] || "";
      const draft = {
        movId: mov.id,
        fromOfx,
        catId: catId0,
        planoQ: "",
        forma: mov.tipo === "credito" ? "PIX" : "TED",
        clienteNome: "",
        desc: mov.desc || "",
        keyword: mov.desc || "",
      };
      finDash.conc.gerar = draft;

      const formas = lado === "receber"
        ? ["PIX", "TED", "BOLETO", "CARTAO", "DINHEIRO"]
        : ["PIX", "TED", "BOLETO", "CARTAO", "DEBITO AUTOMATICO"];

      const paintPlano = () => {
        const wrap = document.getElementById("finGerarPlanoList");
        if (!wrap) return;
        wrap.innerHTML = renderFinConcPlanoPickList(mov.tipo, draft.planoQ, draft.catId);
        wrap.querySelectorAll("[data-fin-gerar-cat]").forEach((btn) => {
          btn.addEventListener("click", () => {
            draft.catId = btn.dataset.finGerarCat || "";
            paintPlano();
          });
        });
      };

      const goBack = () => {
        if (fromOfx || finDash.conc.ofx?.returnAfterGerar) {
          if (finDash.conc.ofx) finDash.conc.ofx.returnAfterGerar = false;
          openFinConcOfxModal();
        } else {
          closeModal();
          renderFinModuleDash();
        }
      };

      openModal({
        title,
        sub: "Confira os dados, escolha a forma de pagamento e classifique o lançamento.",
        wide: true,
        body: `
          <div class="fin-gerar-modal">
            <div class="fin-gerar-summary">
              <div class="fin-gerar-summary-main">
                <strong>${uiSelectEscape(mov.desc)}</strong>
                <span class="fin-gerar-amt ${mov.tipo === "credito" ? "in" : "out"}">${money(mov.valor)}</span>
              </div>
              <div class="fin-gerar-summary-meta">
                <span>${uiSelectEscape(mov.data)}</span>
                <span>${uiSelectEscape(banco)}</span>
                <span class="fin-ofx-tipo ${mov.tipo}">${mov.tipo === "credito" ? "CREDITO" : "DEBITO"}</span>
              </div>
            </div>

            <div class="fin-gerar-grid">
              <section class="fin-gerar-col" aria-label="Dados do título">
                <header class="fin-gerar-col-head">
                  <h4>Dados do título</h4>
                </header>
                <div class="fin-gerar-col-body">
                  <label class="fin-gerar-field">
                    <span class="fin-gerar-lab">Descrição</span>
                    <input type="text" id="finGerarDesc" value="${uiSelectEscape(draft.desc)}" />
                  </label>
                  <label class="fin-gerar-field">
                    <span class="fin-gerar-lab">Palavras-chave</span>
                    <input type="text" id="finGerarKeyword" value="${uiSelectEscape(draft.keyword)}" placeholder="Para regras de importação futura" />
                  </label>
                  <label class="fin-gerar-field">
                    <span class="fin-gerar-lab">Forma de pagamento</span>
                    <select id="finGerarForma">
                      ${formas.map((f) => `<option value="${f}"${draft.forma === f ? " selected" : ""}>${f}</option>`).join("")}
                    </select>
                  </label>
                  <div class="fin-gerar-field">
                    <span class="fin-gerar-lab">${lado === "receber" ? "Cliente" : "Fornecedor"}</span>
                    <div class="fin-gerar-cli">
                      <input type="search" id="finGerarCliente" placeholder="Nenhum selecionado — digite para buscar" value="${uiSelectEscape(draft.clienteNome)}" autocomplete="off" />
                      <button type="button" class="btn-outline fin-gerar-cli-btn" id="finGerarCliBuscar">Buscar</button>
                    </div>
                    <div class="fin-gerar-cli-hits" id="finGerarCliHits" hidden></div>
                  </div>
                </div>
              </section>

              <section class="fin-gerar-col fin-gerar-classif" aria-label="Classificação financeira">
                <header class="fin-gerar-col-head">
                  <h4>Classificação financeira</h4>
                  <p>Selecione o plano de contas para conciliar este lançamento.</p>
                </header>
                <div class="fin-gerar-col-body">
                  <div class="fin-gerar-plano-wrap">
                    <div class="proc-filter search fin-gerar-plano-search">
                      <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                      <input type="search" id="finGerarPlanoQ" placeholder="Buscar plano de contas…" value="${uiSelectEscape(draft.planoQ)}" aria-label="Buscar plano de contas" />
                    </div>
                    <div class="fin-gerar-plano-list" id="finGerarPlanoList" role="listbox"></div>
                  </div>
                </div>
              </section>
            </div>

            <div class="fin-gerar-note" role="note">
              O plano de contas pai e o centro de custo serão preenchidos automaticamente a partir do subplano selecionado.
            </div>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" id="finGerarCancel">Cancelar</button>
          <button type="button" class="btn-primary" id="finGerarSave">Gerar título</button>`,
      });

      prepareFinConcModalChrome();
      modal.classList.add("fin-gerar-titulo-modal");
      paintPlano();

      document.getElementById("finGerarPlanoQ")?.addEventListener("input", (ev) => {
        draft.planoQ = ev.target.value || "";
        paintPlano();
      });
      document.getElementById("finGerarDesc")?.addEventListener("input", (ev) => {
        draft.desc = ev.target.value || "";
      });
      document.getElementById("finGerarKeyword")?.addEventListener("input", (ev) => {
        draft.keyword = ev.target.value || "";
      });
      document.getElementById("finGerarForma")?.addEventListener("change", (ev) => {
        draft.forma = ev.target.value || draft.forma;
      });

      const paintCliHits = () => {
        const hitsEl = document.getElementById("finGerarCliHits");
        const q = normalizeSearchText(document.getElementById("finGerarCliente")?.value || "");
        if (!hitsEl) return;
        if (!q) {
          hitsEl.hidden = true;
          hitsEl.innerHTML = "";
          return;
        }
        const hits = CLIENTES.filter((c) =>
          normalizeSearchText([c.fantasia, c.nome, c.razaoSocial, c.cnpj].join(" ")).includes(q)
        ).slice(0, 6);
        hitsEl.hidden = !hits.length;
        hitsEl.innerHTML = hits.map((c) => `
          <button type="button" data-fin-gerar-cli="${c.id}">
            <strong>${uiSelectEscape(c.fantasia || c.nome)}</strong>
            <span>${uiSelectEscape(c.cnpj || "")}</span>
          </button>`).join("");
        hitsEl.querySelectorAll("[data-fin-gerar-cli]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const c = CLIENTES.find((x) => x.id === btn.dataset.finGerarCli);
            draft.clienteNome = c ? (c.fantasia || c.nome) : "";
            const inp = document.getElementById("finGerarCliente");
            if (inp) inp.value = draft.clienteNome;
            hitsEl.hidden = true;
          });
        });
      };
      document.getElementById("finGerarCliente")?.addEventListener("input", paintCliHits);
      document.getElementById("finGerarCliBuscar")?.addEventListener("click", paintCliHits);

      document.getElementById("finGerarCancel")?.addEventListener("click", () => goBack());

      document.getElementById("finGerarSave")?.addEventListener("click", () => {
        if (!draft.catId) {
          toast("Selecione uma classificação no plano de contas para conciliar");
          return;
        }
        const list = ensureFinConcMovs();
        const idx = list.findIndex((m) => m.id === mov.id);
        if (idx < 0) {
          toast("Movimentação não encontrada");
          return;
        }
        const desc = (document.getElementById("finGerarDesc")?.value || draft.desc || "").trim() || mov.desc;
        list[idx] = {
          ...list[idx],
          desc,
          status: fromOfx ? "aberto" : "conciliado",
          catId: draft.catId,
          forma: draft.forma,
          keyword: (document.getElementById("finGerarKeyword")?.value || "").trim(),
          clienteNome: draft.clienteNome || list[idx].clienteNome || "",
          ofxPendingValidate: fromOfx ? true : !!list[idx].ofxPendingValidate,
          ofxValidated: fromOfx ? false : !!list[idx].ofxValidated,
        };
        finDash.conc.categories[mov.id] = draft.catId;
        finDash.conc.gerar = null;
        if (fromOfx) markFinOfxSessionConciliado(mov.id);
        pushFinConcHistory(
          mov.id,
          fromOfx
            ? `Classificado no OFX · ${finDreCatLabel(draft.catId)} (pendente Importar tudo)`
            : `Título gerado e conciliado · ${finDreCatLabel(draft.catId)}`,
          "usuario"
        );
        toast(fromOfx
          ? `Classificado no OFX · confirme em Importar tudo · ${finDreCatLabel(draft.catId)}`
          : `Título gerado e conciliado · ${finDreCatLabel(draft.catId)}`);
        goBack();
        if (!fromOfx) renderFinModuleDash();
      });
    }

    function finConcBancoOptionLabel(b) {
      if (!b) return "—";
      const cc = finConcBancoContaLabel(b);
      const tipo = b.tipoConta === "Poupança" ? "CP" : "CC";
      return `${b.codigo || "—"} - ${b.nome} · Ag. ${b.agencia || "—"} · ${tipo} ${cc}`;
    }

    function openFinConcTransferirModal(movId, opts = {}) {
      const fromOfx = opts.fromOfx !== false;
      const mov = getFinConcMovById(movId);
      if (!mov) {
        toast("Movimentação não encontrada");
        return;
      }
      const bancos = ensureFinConcBancos();
      const origemId = finDash.conc.bancoId || bancos[0]?.id;
      const destDefault = bancos.find((b) => b.id !== origemId) || bancos[0];
      const leaves = [];
      getFinDreTaxonomy().forEach((g, gi) => {
        (g.children || []).forEach((c, ci) => {
          leaves.push({ id: c.id, label: `${gi + 1}.${ci + 1} - ${c.label}`, parent: g.label });
        });
      });
      const subDefault = leaves.find((l) => /adiant|transf|outras/i.test(l.label))?.id || leaves[0]?.id || "";

      if (fromOfx && finDash.conc.ofx) {
        finDash.conc.ofx.modalOpen = false;
        finDash.conc.ofx.expanded = false;
        finDash.conc.ofx.returnAfterTransfer = true;
      }

      const goBack = () => {
        if (fromOfx || finDash.conc.ofx?.returnAfterTransfer) {
          if (finDash.conc.ofx) finDash.conc.ofx.returnAfterTransfer = false;
          openFinConcOfxModal();
        } else {
          closeModal();
          renderFinModuleDash();
        }
      };

      openModal({
        title: "Transferir entre contas",
        sub: "A movimentação será baixada na origem e lançada como entrada na conta destino.",
        body: `
          <div class="fin-transf-modal">
            <div class="fin-transf-summary">
              <strong>${uiSelectEscape(mov.desc)}</strong>
              <span class="fin-gerar-amt ${mov.tipo === "credito" ? "in" : "out"}">${money(mov.valor)}</span>
              <div class="fin-transf-summary-meta">
                <span>${uiSelectEscape(mov.data)}</span>
                <span>Origem: ${uiSelectEscape(finDash.conc.banco || "—")}</span>
              </div>
            </div>
            <label class="fin-transf-field">
              <span class="fin-transf-lab">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 22h18"/><path d="M6 18V11"/><path d="M10 18V11"/><path d="M14 18V11"/><path d="M18 18V11"/><path d="m12 2 8 5H4z"/></svg>
                Conta de destino
              </span>
              <select id="finTransfDestino" aria-label="Conta de destino">
                ${bancos.filter((b) => b.id !== origemId).map((b) => `
                  <option value="${b.id}"${b.id === destDefault?.id ? " selected" : ""}>${uiSelectEscape(finConcBancoOptionLabel(b))}</option>
                `).join("") || `<option value="">Nenhuma outra conta cadastrada</option>`}
              </select>
            </label>
            <label class="fin-transf-field">
              <span class="fin-transf-lab">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v18"/><path d="M5 8h14"/><path d="M5 16h14"/></svg>
                Subplano neutro para DRE
              </span>
              <select id="finTransfSubplano" aria-label="Subplano neutro para DRE">
                ${leaves.map((l) => `<option value="${l.id}"${l.id === subDefault ? " selected" : ""}>${uiSelectEscape(l.label)}</option>`).join("")}
              </select>
            </label>
            <label class="fin-transf-field">
              <span class="fin-transf-lab">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/></svg>
                Descrição
              </span>
              <input type="text" id="finTransfDesc" value="Transferência entre contas" />
            </label>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" id="finTransfCancel">Cancelar</button>
          <button type="button" class="btn-primary" id="finTransfSave">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            Transferir
          </button>`,
      });

      prepareFinConcModalChrome();
      enhanceUiSelects(modalBody);

      document.getElementById("finTransfCancel")?.addEventListener("click", () => goBack());
      document.getElementById("finTransfSave")?.addEventListener("click", () => {
        const destId = document.getElementById("finTransfDestino")?.value || "";
        const catId = document.getElementById("finTransfSubplano")?.value || "";
        const desc = (document.getElementById("finTransfDesc")?.value || "").trim() || "Transferência entre contas";
        if (!destId || destId === origemId) {
          toast("Selecione uma conta de destino diferente da origem");
          return;
        }
        if (!catId) {
          toast("Selecione o subplano neutro para DRE");
          return;
        }
        const dest = bancos.find((b) => b.id === destId);
        const list = ensureFinConcMovs();
        const idx = list.findIndex((m) => m.id === mov.id);
        if (idx >= 0) {
          list[idx] = {
            ...list[idx],
            status: fromOfx ? "aberto" : "conciliado",
            catId,
            desc: list[idx].desc,
            transferido: true,
            transferDestId: destId,
            ofxPendingValidate: fromOfx ? true : !!list[idx].ofxPendingValidate,
            ofxValidated: fromOfx ? false : !!list[idx].ofxValidated,
          };
          finDash.conc.categories[mov.id] = catId;
        }
        const novoId = `fm${Date.now()}`;
        list.unshift({
          id: novoId,
          tituloId: String(10450 + list.length + 1),
          data: mov.data,
          desc,
          tipo: "credito",
          valor: mov.valor,
          status: fromOfx ? "aberto" : "conciliado",
          catId,
          transferFromId: mov.id,
          bancoId: destId,
          ofxPendingValidate: !!fromOfx,
          ofxValidated: false,
        });
        finDash.conc.categories[novoId] = catId;
        if (fromOfx) {
          markFinOfxSessionConciliado(mov.id);
          markFinOfxSessionConciliado(novoId);
        }
        toast(fromOfx
          ? `Transferência classificada no OFX · confirme em Importar tudo`
          : `Transferido para ${dest?.nome || "conta destino"} · ${finDreCatLabel(catId)}`);
        goBack();
      });
    }

    function renderFinDreCatPicker(rowId, tipoMov) {
      const groups = getFinDreTaxonomy().filter((g) => !tipoMov || g.tipo === tipoMov || !g.tipo);
      return `
        <div class="fin-dre-picker" role="listbox" aria-label="Categorias da DRE">
          <div class="fin-dre-picker-hint">Árvore DRE do cliente — selecione apenas a subcategoria (folha)</div>
          ${groups.map((g) => `
            <div class="fin-dre-picker-group">
              <div class="fin-dre-picker-parent" aria-disabled="true">${g.label}</div>
              ${(g.children || []).map((c) => `
                <button type="button" class="fin-dre-picker-leaf" role="option" data-fin-cat-pick="${rowId}" data-fin-cat-id="${c.id}">
                  <span class="leaf-path">${g.label}</span>
                  <strong>${c.label}</strong>
                </button>`).join("")}
            </div>`).join("")}
        </div>`;
    }

    function ensureFinTitulos() {
      if (!finDash.cobrancas.titulos) {
        finDash.cobrancas.titulos = FIN_TITULOS_SEED.map((t) => ({ ...t }));
      }
      return finDash.cobrancas.titulos;
    }

    function parseFinValorInput(raw) {
      const s = String(raw || "").trim().replace(/\./g, "").replace(",", ".");
      const n = Number(s);
      return Number.isFinite(n) ? n : NaN;
    }

    function formatFinDateBR(isoOrBr) {
      if (!isoOrBr) return "";
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(isoOrBr)) return isoOrBr;
      if (/^\d{4}-\d{2}-\d{2}$/.test(isoOrBr)) {
        const [y, m, d] = isoOrBr.split("-");
        return `${d}/${m}/${y}`;
      }
      return isoOrBr;
    }

    function finTituloStatusLabel(st) {
      if (st === "pago") return "Pago";
      if (st === "vencido") return "Vencido";
      return "Pendente";
    }

    function renderFinConfigPanel() {
      const section = finDash.config.section || "adquirentes";
      if (section === "plano") {
        const plano = getFinDreTaxonomy();
        return `
        <div class="fin-op-panel fin-config-panel">
          <div class="fin-op-card fin-cfg-plano">
            <div class="fin-card-head">
              <h4>Gestão do Plano de Contas</h4>
              <span class="chart-sub">Árvore da DRE do cliente: monte categorias e subcategorias sem pular níveis.</span>
            </div>
            <div class="fin-cfg-plano-add">
              <input type="text" id="finCfgNewGroup" placeholder="Nova categoria (ex.: (−) Despesas Financeiras)" value="${uiSelectEscape(finDash.config.newGroupLabel || "")}" />
              <button type="button" class="btn-primary" data-fin-cfg="add-group">Adicionar categoria</button>
            </div>
            <div class="fin-cfg-tree">
              ${plano.map((g) => `
                <div class="fin-cfg-group" data-fin-cfg-group="${g.id}">
                  <div class="fin-cfg-group-head">
                    <strong>${uiSelectEscape(g.label)}</strong>
                    <span class="fin-mov-tipo">${g.tipo === "credito" ? "Receita" : "Despesa"}</span>
                    <button type="button" class="btn-ghost sm" data-fin-cfg-del-group="${g.id}">Remover</button>
                  </div>
                  <ul class="fin-cfg-leaves">
                    ${(g.children || []).map((c) => `
                      <li>
                        <span>${uiSelectEscape(c.label)}</span>
                        <button type="button" data-fin-cfg-del-leaf="${g.id}:${c.id}" aria-label="Remover subcategoria">×</button>
                      </li>`).join("")}
                  </ul>
                  <div class="fin-cfg-add-leaf">
                    <input type="text" data-fin-cfg-leaf-input="${g.id}" placeholder="Nova subcategoria…" />
                    <button type="button" class="btn-ghost" data-fin-cfg-add-leaf="${g.id}">Incluir</button>
                  </div>
                </div>`).join("")}
            </div>
          </div>
        </div>`;
      }
      return `
        <div class="fin-op-panel fin-config-panel">
          ${renderFinAdquirentesHtml({ saveLabel: "Salvar regra", saveAttr: 'data-fin-cfg="save-acq"', showRemove: true })}
        </div>`;
    }

    function getCliFinExecData(c) {
      const fat = Number(c.faturamento) || 420000;
      const scale = Math.max(0.45, fat / 500000);
      const period = cliFinExec.period || "mes";
      const periodMul = period === "30d" ? 0.95 : (period === "custom" ? 1.05 : 1);
      const saldo = Math.round(fat * 0.085 * scale * periodMul);
      const receber = Math.round(fat * 0.12 * scale * periodMul);
      const pagar = Math.round(fat * 0.078 * scale * periodMul);
      const fluxoPrevisto = receber - pagar;
      const cobertura = pagar > 0 ? saldo / pagar : 2;
      let nivel = "Saudável";
      let nivelCls = "ok";
      if (cobertura < 0.8 || saldo < pagar * 0.6) {
        nivel = "Crítico";
        nivelCls = "bad";
      } else if (cobertura < 1.2) {
        nivel = "Atenção";
        nivelCls = "warn";
      } else if (cobertura >= 1.8) {
        nivel = "Excelente";
        nivelCls = "excel";
      }
      const periodLabel = period === "30d" ? "Últimos 30 dias" : (period === "custom" ? "Período personalizado" : "Mês atual");

      const plano = getFinDreTaxonomy();
      const receitaBruta = Math.round(receber * 1.55);
      const dre = plano.map((g) => {
        const isReceita = g.tipo === "credito";
        const parentVal = isReceita
          ? receitaBruta
          : (g.id === "ded" ? Math.round(receitaBruta * 0.12) : Math.round(receitaBruta * 0.55));
        const kids = (g.children || []).map((ch, i) => {
          const weight = (g.children.length - i) / ((g.children.length * (g.children.length + 1)) / 2);
          const val = Math.round(parentVal * weight);
          const prev = Math.round(val * (0.88 + ((ch.id.length * 7) % 20) / 100));
          const delta = prev ? +(((val - prev) / prev) * 100).toFixed(1) : 0;
          return { id: ch.id, label: ch.label, valor: isReceita ? val : -val, prev: isReceita ? prev : -prev, delta };
        });
        const valor = kids.reduce((s, k) => s + k.valor, 0);
        const prev = kids.reduce((s, k) => s + k.prev, 0);
        const delta = prev ? +(((Math.abs(valor) - Math.abs(prev)) / Math.abs(prev)) * 100).toFixed(1) : 0;
        return {
          id: g.id,
          label: g.label,
          tipo: g.tipo,
          valor,
          prev,
          delta,
          children: kids,
        };
      });

      const receitasPeriodo = dre.filter((g) => g.tipo === "credito").reduce((s, g) => s + Math.abs(g.valor), 0);
      const despesasPeriodo = dre.filter((g) => g.tipo !== "credito").reduce((s, g) => s + Math.abs(g.valor), 0);
      const resultado = receitasPeriodo - despesasPeriodo;

      const titReceber = getCliTitulos(c, "receber");
      const titPagar = getCliTitulos(c, "pagar");
      const titulosAbertos = [...titReceber, ...titPagar].filter((t) => t.status === "aberto" || t.status === "parcial").length;
      const titulosVencidos = [...titReceber, ...titPagar].filter((t) => t.status === "vencido").length;
      const recebimentosRealizados = titReceber.filter((t) => t.status === "pago").length;
      const pagamentosRealizados = titPagar.filter((t) => t.status === "pago").length;

      const cobrancasEmitidas = (typeof ensureFinTitulos === "function"
        ? ensureFinTitulos().filter((t) => t.lado === "receber").length
        : titReceber.length);

      let divergenciasCartoes = null;
      if (finDash.cartoes?.imported && typeof getFinCartoesAudit === "function") {
        const a = getFinCartoesAudit();
        divergenciasCartoes = {
          tarifaDiff: a.tarifaDiff,
          alertas: (a.rows || []).filter((r) => r.selo === "alerta" || Math.abs(r.diferenca) >= 0.01).length,
        };
      }

      const ultimaConciliacao = "14/07/2026 · Extrato conciliado";
      const emitidoEm = new Date().toLocaleString("pt-BR", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      });

      let resumoExecutivo = "";
      if (nivelCls === "excel" || nivelCls === "ok") {
        resumoExecutivo = `No período analisado (${periodLabel.toLowerCase()}), a empresa apresentou fluxo financeiro positivo, mantendo equilíbrio entre receitas e despesas. Foram identificados ${titulosVencidos === 0 ? "poucos títulos em atraso" : `${titulosVencidos} título(s) em atraso`} e a operação segue com estabilidade.`;
      } else if (nivelCls === "warn") {
        resumoExecutivo = `No período analisado (${periodLabel.toLowerCase()}), a empresa manteve operação ativa, porém com pressão sobre o caixa. Há ${titulosVencidos} título(s) em atraso e o equilíbrio entre receitas e despesas exige acompanhamento próximo do gestor.`;
      } else {
        resumoExecutivo = `No período analisado (${periodLabel.toLowerCase()}), a empresa apresentou fluxo financeiro sob risco, com desequilíbrio entre receitas e despesas. Foram identificados ${titulosVencidos} título(s) em atraso e a operação demanda decisões imediatas de cobrança e contenção de saídas.`;
      }

      return {
        saldo, receber, pagar, fluxoPrevisto, nivel, nivelCls, periodLabel, dre,
        receitasPeriodo, despesasPeriodo, resultado,
        titulosAbertos, titulosVencidos, cobrancasEmitidas,
        recebimentosRealizados, pagamentosRealizados,
        divergenciasCartoes, ultimaConciliacao, emitidoEm, resumoExecutivo,
        nome: c.fantasia || c.nome, cnpj: c.cnpj || "",
      };
    }

    function renderCliFinDreHtml(dre) {
      return `
        <div class="cli-fin-exec-dre">
          <div class="cli-fin-exec-dre-head">
            <h4>DRE Gerencial</h4>
            <span>Análise horizontal · mês atual vs anterior</span>
          </div>
          <table class="cli-fin-exec-dre-table">
            <thead>
              <tr>
                <th>Categoria</th>
                <th class="num">Atual</th>
                <th class="num">Anterior</th>
                <th>Variação</th>
              </tr>
            </thead>
            <tbody>
              ${dre.map((g) => `
                <tr class="is-parent">
                  <td><strong>${uiSelectEscape(g.label)}</strong></td>
                  <td class="num ${g.valor < 0 ? "neg" : "pos"}">${money(g.valor)}</td>
                  <td class="num muted">${money(g.prev)}</td>
                  <td><span class="cli-fin-delta ${g.delta >= 0 ? "up" : "down"}">${g.delta >= 0 ? "+" : ""}${String(g.delta).replace(".", ",")}%</span></td>
                </tr>
                ${(g.children || []).map((ch) => `
                  <tr class="is-child">
                    <td>${uiSelectEscape(ch.label)}</td>
                    <td class="num ${ch.valor < 0 ? "neg" : "pos"}">${money(ch.valor)}</td>
                    <td class="num muted">${money(ch.prev)}</td>
                    <td><span class="cli-fin-delta ${ch.delta >= 0 ? "up" : "down"}">${ch.delta >= 0 ? "+" : ""}${String(ch.delta).replace(".", ",")}%</span></td>
                  </tr>`).join("")}
              `).join("")}
            </tbody>
          </table>
        </div>`;
    }

    function renderCliFinExecutivo(c) {
      const d = getCliFinExecData(c);
      return `
        <div class="cli-fin-exec">
          <div class="cli-fin-exec-bar">
            <div class="cli-fin-exec-left">
              <label class="cli-fin-period-field">
                <span class="lbl">Período</span>
                <select id="cliFinExecPeriod" aria-label="Período financeiro">
                  <option value="mes" ${cliFinExec.period === "mes" ? "selected" : ""}>Mês atual</option>
                  <option value="30d" ${cliFinExec.period === "30d" ? "selected" : ""}>Últimos 30 dias</option>
                  <option value="custom" ${cliFinExec.period === "custom" ? "selected" : ""}>Personalizado</option>
                </select>
              </label>
              <div class="cli-fin-nivel ${d.nivelCls}" title="Qualidade baseada na saúde do fluxo de caixa">
                <span class="lbl">Nível / Qualidade</span>
                <strong>${d.nivel}</strong>
              </div>
            </div>
            <button type="button" class="btn-primary cli-fin-dash-btn" data-cli-fin-dash>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>
              Gerar Dashboard HTML
            </button>
          </div>

          <div class="cli-fin-exec-kpis">
            <article class="cli-fin-gold saldo">
              <div class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg></div>
              <div class="label">Dinheiro em Conta</div>
              <div class="value">${money(d.saldo)}</div>
              <div class="sub">Saldo atual · ${d.periodLabel}</div>
            </article>
            <article class="cli-fin-gold receber">
              <div class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg></div>
              <div class="label">Total a Receber</div>
              <div class="value">${money(d.receber)}</div>
              <div class="sub">Dinheiro que entra</div>
            </article>
            <article class="cli-fin-gold pagar">
              <div class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg></div>
              <div class="label">Total a Pagar</div>
              <div class="value">${money(d.pagar)}</div>
              <div class="sub">Dinheiro que sai</div>
            </article>
          </div>

          ${renderCliFinDreHtml(d.dre)}
        </div>`;
    }

    function getCliFinReportChartData(d) {
      const months = ["Abr", "Mai", "Jun", "Jul"];
      const factors = [0.88, 0.94, 0.97, 1];
      return {
        months,
        receitas: factors.map((f) => Math.round(d.receitasPeriodo * f)),
        despesas: factors.map((f) => Math.round(d.despesasPeriodo * f)),
        titulos: {
          recebidos: d.recebimentosRealizados,
          abertos: d.titulosAbertos,
          vencidos: d.titulosVencidos,
        },
      };
    }

    function getCliFinReportAlerts(d) {
      const alerts = [];
      if (d.titulosVencidos > 0) {
        alerts.push(`${d.titulosVencidos} título${d.titulosVencidos === 1 ? "" : "s"} vencido${d.titulosVencidos === 1 ? "" : "s"} no período.`);
      } else {
        alerts.push("Nenhum título vencido no período.");
      }
      const concDia = String(d.ultimaConciliacao || "").split("·")[0].trim() || "14/07/2026";
      alerts.push(`Última conciliação realizada em ${concDia}.`);
      if (d.divergenciasCartoes && d.divergenciasCartoes.alertas > 0) {
        alerts.push(`${d.divergenciasCartoes.alertas} divergência(s) identificada(s) na auditoria de cartões.`);
      } else {
        alerts.push("Nenhuma divergência crítica identificada na auditoria de cartões.");
      }
      if (d.resultado < 0) {
        alerts.push("Resultado financeiro negativo no período analisado.");
      } else {
        alerts.push("Resultado financeiro positivo no período analisado.");
      }
      return alerts;
    }

    let cliFinReportCharts = [];

    function destroyCliFinReportCharts() {
      cliFinReportCharts.forEach((ch) => {
        try { ch.destroy(); } catch (_) { /* ignore */ }
      });
      cliFinReportCharts = [];
    }

    function initCliFinReportCharts(root, d) {
      destroyCliFinReportCharts();
      if (typeof ApexCharts === "undefined" || !d) return;
      const scope = root || document;
      const chartData = getCliFinReportChartData(d);
      const moneyTip = (v) => money(v);
      const rxEl = scope.querySelector("#cliFinReportRxChart");
      if (rxEl) {
        const rx = new ApexCharts(rxEl, {
          chart: { type: "bar", height: 240, toolbar: { show: false }, fontFamily: "inherit" },
          series: [
            { name: "Receitas", data: chartData.receitas },
            { name: "Despesas", data: chartData.despesas },
          ],
          colors: ["#1f8a5a", "#c2474a"],
          plotOptions: { bar: { columnWidth: "56%", borderRadius: 4, borderRadiusApplication: "end" } },
          dataLabels: { enabled: false },
          grid: { borderColor: "#eef1f5", strokeDashArray: 3, padding: { left: 8, right: 8 } },
          legend: {
            show: true,
            position: "top",
            horizontalAlign: "right",
            fontSize: "11px",
            fontWeight: 600,
            markers: { width: 8, height: 8, radius: 2 },
          },
          xaxis: {
            categories: chartData.months,
            labels: { style: { colors: "#6b7c93", fontSize: "11px", fontWeight: 600 } },
            axisBorder: { show: false },
            axisTicks: { show: false },
          },
          yaxis: {
            labels: {
              formatter: (v) => {
                const n = Math.abs(v);
                if (n >= 1e3) return `R$ ${(v / 1e3).toFixed(0)}k`;
                return `R$ ${Math.round(v)}`;
              },
              style: { colors: "#6b7c93", fontSize: "11px" },
            },
          },
          tooltip: { shared: true, intersect: false, y: { formatter: (v) => moneyTip(v) } },
        });
        rx.render();
        cliFinReportCharts.push(rx);
      }
      const titEl = scope.querySelector("#cliFinReportTitChart");
      if (titEl) {
        const tit = new ApexCharts(titEl, {
          chart: { type: "donut", height: 240, toolbar: { show: false }, fontFamily: "inherit" },
          series: [
            chartData.titulos.recebidos,
            chartData.titulos.abertos,
            chartData.titulos.vencidos,
          ],
          labels: ["Recebidos", "Em aberto", "Vencidos"],
          colors: ["#2f9e6b", "#28519c", "#b33a4a"],
          legend: {
            show: true,
            position: "bottom",
            fontSize: "11px",
            fontWeight: 600,
          },
          dataLabels: { enabled: false },
          plotOptions: {
            pie: {
              donut: {
                size: "68%",
                labels: {
                  show: true,
                  total: {
                    show: true,
                    label: "Títulos",
                    fontSize: "12px",
                    fontWeight: 650,
                    color: "#6b7c93",
                    formatter: () => String(
                      chartData.titulos.recebidos + chartData.titulos.abertos + chartData.titulos.vencidos
                    ),
                  },
                },
              },
            },
          },
          stroke: { width: 2, colors: ["#fff"] },
          tooltip: {
            y: { formatter: (v) => `${v} título(s)` },
          },
        });
        tit.render();
        cliFinReportCharts.push(tit);
      }
    }

    function renderCliFinRelatorioKpiGrid(d) {
      const cards = [
        { label: "Saldo Atual", value: money(d.saldo), sub: d.periodLabel, cls: "saldo" },
        { label: "Receitas", value: money(d.receitasPeriodo), sub: "Do período", cls: "receber" },
        { label: "Despesas", value: money(d.despesasPeriodo), sub: "Do período", cls: "pagar" },
        {
          label: "Resultado Financeiro",
          value: money(d.resultado),
          sub: d.resultado >= 0 ? "Lucro no período" : "Prejuízo no período",
          cls: d.resultado >= 0 ? "receber" : "pagar",
        },
      ];
      return `
        <div class="cli-fin-report-kpis is-exec">
          ${cards.map((k) => `
            <article class="cli-fin-gold ${k.cls}">
              <div class="label">${k.label}</div>
              <div class="value">${k.value}</div>
              <div class="sub">${k.sub}</div>
            </article>`).join("")}
        </div>`;
    }

    function renderCliFinReportAlertsHtml(d) {
      const alerts = getCliFinReportAlerts(d);
      return `
        <section class="cli-fin-report-alerts" aria-label="Observações e alertas">
          <h4>Observações e Alertas</h4>
          <ul>
            ${alerts.map((a) => `<li>${uiSelectEscape(a)}</li>`).join("")}
          </ul>
        </section>`;
    }

    function renderCliFinReportChartsHtml() {
      return `
        <section class="cli-fin-report-charts" aria-label="Análise gráfica">
          <article class="cli-fin-report-chart-card">
            <div class="cli-fin-report-sec-head">
              <h4>Receitas × Despesas</h4>
              <span>Comparativo mensal</span>
            </div>
            <div id="cliFinReportRxChart" class="cli-fin-report-chart"></div>
          </article>
          <article class="cli-fin-report-chart-card">
            <div class="cli-fin-report-sec-head">
              <h4>Situação dos Títulos</h4>
              <span>Recebidos · Em aberto · Vencidos</span>
            </div>
            <div id="cliFinReportTitChart" class="cli-fin-report-chart"></div>
          </article>
        </section>`;
    }

    function renderCliFinReportSvgBars(chartData) {
      const max = Math.max(...chartData.receitas, ...chartData.despesas, 1);
      const barH = 120;
      const groupW = 56;
      const gap = 28;
      const width = chartData.months.length * (groupW + gap) + 20;
      const bars = chartData.months.map((m, i) => {
        const rH = Math.max(4, Math.round((chartData.receitas[i] / max) * barH));
        const dH = Math.max(4, Math.round((chartData.despesas[i] / max) * barH));
        const x = 20 + i * (groupW + gap);
        return `
          <g transform="translate(${x},0)">
            <rect x="4" y="${barH - rH}" width="20" height="${rH}" rx="3" fill="#1f8a5a"/>
            <rect x="28" y="${barH - dH}" width="20" height="${dH}" rx="3" fill="#c2474a"/>
            <text x="26" y="${barH + 16}" text-anchor="middle" fill="#6b7c93" font-size="11" font-weight="600">${m}</text>
          </g>`;
      }).join("");
      return `<svg viewBox="0 0 ${width} ${barH + 28}" width="100%" height="168" role="img" aria-label="Receitas versus despesas">${bars}</svg>`;
    }

    function renderCliFinReportSvgDonut(chartData) {
      const vals = [chartData.titulos.recebidos, chartData.titulos.abertos, chartData.titulos.vencidos];
      const colors = ["#2f9e6b", "#28519c", "#b33a4a"];
      const labels = ["Recebidos", "Em aberto", "Vencidos"];
      const total = vals.reduce((s, v) => s + v, 0) || 1;
      let angle = -90;
      const cx = 90;
      const cy = 90;
      const r = 58;
      const ir = 34;
      const toXY = (a, rad) => {
        const rads = (a * Math.PI) / 180;
        return [cx + rad * Math.cos(rads), cy + rad * Math.sin(rads)];
      };
      const arcs = vals.map((v, i) => {
        const sweep = (v / total) * 360;
        const start = angle;
        angle += sweep;
        const large = sweep > 180 ? 1 : 0;
        const [x1, y1] = toXY(start, r);
        const [x2, y2] = toXY(angle, r);
        const [x3, y3] = toXY(angle, ir);
        const [x4, y4] = toXY(start, ir);
        if (v <= 0) return "";
        return `<path d="M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${ir} ${ir} 0 ${large} 0 ${x4} ${y4} Z" fill="${colors[i]}"/>`;
      }).join("");
      const legend = labels.map((lab, i) => `
        <div class="leg"><span style="background:${colors[i]}"></span>${lab}: <strong>${vals[i]}</strong></div>`).join("");
      return `
        <div class="cli-fin-report-svg-donut">
          <svg viewBox="0 0 180 180" width="160" height="160" role="img" aria-label="Situação dos títulos">${arcs}</svg>
          <div class="cli-fin-report-svg-legend">${legend}</div>
        </div>`;
    }

    function renderCliFinRelatorioTab(c) {
      const d = getCliFinExecData(c);
      return `
        <div class="cli-fin-exec cli-fin-report is-exec">
          <header class="cli-fin-report-head">
            <div class="cli-fin-report-head-brand">
              <strong>Processo Ágil</strong>
              <span>Relatório Executivo · ${uiSelectEscape(d.nome)}</span>
            </div>
            <div class="cli-fin-exec-bar cli-fin-report-tools">
              <div class="cli-fin-exec-left">
                <label class="cli-fin-period-field">
                  <span class="lbl">Período</span>
                  <select id="cliFinExecPeriod" aria-label="Período financeiro">
                    <option value="mes" ${cliFinExec.period === "mes" ? "selected" : ""}>Mês atual</option>
                    <option value="30d" ${cliFinExec.period === "30d" ? "selected" : ""}>Últimos 30 dias</option>
                    <option value="custom" ${cliFinExec.period === "custom" ? "selected" : ""}>Personalizado</option>
                  </select>
                </label>
                <div class="cli-fin-nivel ${d.nivelCls}" title="Situação financeira geral">
                  <span class="lbl">Situação Financeira</span>
                  <strong>${d.nivel}</strong>
                </div>
              </div>
              <button type="button" class="btn-primary cli-fin-dash-btn" data-cli-fin-report="gerar">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>
                Gerar Relatório
              </button>
            </div>
          </header>

          <section class="cli-fin-report-resumo" aria-label="Resumo executivo">
            <h4>Resumo Executivo</h4>
            <p>${uiSelectEscape(d.resumoExecutivo)}</p>
          </section>

          <section aria-label="Indicadores essenciais">
            <div class="cli-fin-report-sec-head">
              <h4>Indicadores Essenciais</h4>
              <span>${uiSelectEscape(d.periodLabel)}</span>
            </div>
            ${renderCliFinRelatorioKpiGrid(d)}
          </section>

          ${renderCliFinReportChartsHtml()}
          ${renderCliFinReportAlertsHtml(d)}
        </div>`;
    }

    function renderCliFinRelatorioPreviewInner(c) {
      const d = getCliFinExecData(c);
      return `
        <div class="cli-fin-report-doc is-exec" id="cliFinReportDoc">
          <header class="cli-fin-report-doc-head">
            <div>
              <p class="brand">Processo Ágil</p>
              <p class="brand-sub">Gestão financeira</p>
            </div>
            <div class="cli-fin-report-doc-meta">
              <strong>Relatório Executivo</strong>
              <span>Emissão: ${uiSelectEscape(d.emitidoEm)}</span>
            </div>
          </header>
          <div class="cli-fin-report-doc-client">
            <div class="cli-fin-report-doc-client-main">
              <h3>${uiSelectEscape(d.nome)}</h3>
              <p>CNPJ ${uiSelectEscape(d.cnpj || "—")} · Período: ${uiSelectEscape(d.periodLabel)}</p>
            </div>
            <div class="cli-fin-nivel ${d.nivelCls}" title="Situação financeira geral">
              <span class="lbl">Situação Financeira</span>
              <strong>${d.nivel}</strong>
            </div>
          </div>
          <section class="cli-fin-report-resumo">
            <h4>Resumo Executivo</h4>
            <p>${uiSelectEscape(d.resumoExecutivo)}</p>
          </section>
          <section>
            <div class="cli-fin-report-sec-head"><h4>Indicadores Essenciais</h4></div>
            ${renderCliFinRelatorioKpiGrid(d)}
          </section>
          ${renderCliFinReportChartsHtml()}
          ${renderCliFinReportAlertsHtml(d)}
          <footer class="cli-fin-report-doc-foot">
            Documento gerado pelo Processo Ágil · Pronto para impressão e compartilhamento com o cliente
          </footer>
        </div>`;
    }

    function openCliFinRelatorioModal(c) {
      const d = getCliFinExecData(c);
      openModal({
        title: "Pré-visualização · Relatório Executivo",
        sub: `${c.fantasia || c.nome} · ${d.periodLabel}`,
        wide: true,
        report: true,
        body: renderCliFinRelatorioPreviewInner(c),
        foot: `
          <button type="button" class="btn-ghost" data-close>Fechar</button>
          <button type="button" class="btn-ghost" data-cli-fin-report="print">Imprimir</button>
          <button type="button" class="btn-primary" data-cli-fin-report="export-html">Exportar HTML</button>`,
      });
      requestAnimationFrame(() => initCliFinReportCharts(modalBody, d));
    }

    function buildCliFinRelatorioHtml(c) {
      const d = getCliFinExecData(c);
      const chartData = getCliFinReportChartData(d);
      const alerts = getCliFinReportAlerts(d);
      const kpiCards = [
        ["Saldo Atual", money(d.saldo)],
        ["Receitas", money(d.receitasPeriodo)],
        ["Despesas", money(d.despesasPeriodo)],
        ["Resultado Financeiro", money(d.resultado)],
      ];
      return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Relatório Executivo — ${d.nome}</title>
<style>
  :root { --navy:#1c386e; --accent:#28519c; --muted:#6b7c93; --ok:#2f9e6b; --bad:#b33a4a; --bg:#e8edf4; --card:#ffffff; --surface-2:#f5f8fc; --border:#d4dce8; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: "DM Sans", "Segoe UI", system-ui, sans-serif; background:#fff; color:var(--navy); }
  .wrap { max-width: 820px; margin: 0 auto; padding: 28px 24px 40px; }
  .head { display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap; border-bottom:2px solid var(--navy); padding-bottom:14px; margin-bottom:18px; }
  .brand { margin:0; font-size:1.15rem; font-weight:800; }
  .brand-sub { margin:2px 0 0; color:var(--muted); font-size:.8rem; }
  .meta { text-align:right; font-size:.8rem; color:var(--muted); }
  .meta strong { display:block; color:var(--navy); font-size:.95rem; margin-bottom:4px; }
    .client { margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap; }
  .client h1 { margin:0 0 6px; font-size:1.35rem; }
  .client p { margin:0; color:var(--muted); font-size:.9rem; }
  .badge { display:inline-flex; flex-direction:column; justify-content:center; gap:2px; min-width:140px; min-height:44px; padding:6px 12px; border-radius:8px; border:1px solid var(--border); background:var(--surface-2); font-weight:700; font-size:.92rem; color:var(--navy); box-sizing:border-box; }
  .badge .lab { font-size:.66rem; font-weight:650; color:var(--muted); }
  .badge.ok,.badge.excel { color:#1f7a52; }
  .badge.warn { color:#9a5f0c; }
  .badge.bad { color:var(--bad); }
  .resumo { background:var(--bg); border:1px solid var(--border); border-radius:12px; padding:16px 18px; margin-bottom:16px; }
  .resumo h2, .sec h2 { margin:0 0 8px; font-size:1rem; }
  .resumo p { margin:0; line-height:1.55; font-size:.92rem; }
  .kpis { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:16px; }
  .kpi { background:var(--card); border:1px solid var(--border); border-radius:12px; padding:14px; border-left:4px solid var(--accent); }
  .kpi:nth-child(2) { border-left-color:var(--ok); }
  .kpi:nth-child(3) { border-left-color:var(--bad); }
  .kpi:nth-child(4) { border-left-color:#28519c; }
  .kpi .lab { font-size:.72rem; color:var(--muted); font-weight:650; }
  .kpi .val { font-size:1.15rem; font-weight:800; margin-top:6px; letter-spacing:-.02em; }
  .charts { display:grid; grid-template-columns:1.2fr .8fr; gap:14px; margin-bottom:16px; }
  .card { background:var(--card); border:1px solid var(--border); border-radius:12px; padding:14px 16px; }
  .card h2 { margin:0 0 4px; font-size:.95rem; }
  .card .sub { color:var(--muted); font-size:.74rem; margin-bottom:10px; }
  .donut-wrap { display:flex; flex-direction:column; align-items:center; gap:8px; }
  .leg { display:flex; align-items:center; gap:8px; font-size:.78rem; color:var(--muted); margin:2px 0; }
  .leg span { width:8px; height:8px; border-radius:2px; display:inline-block; }
  .alerts { border:1px solid var(--border); border-radius:12px; padding:14px 18px; background:var(--bg); }
  .alerts h2 { margin:0 0 8px; font-size:.95rem; }
  .alerts ul { margin:0; padding-left:18px; }
  .alerts li { margin:6px 0; font-size:.86rem; line-height:1.4; }
  .foot { margin-top:18px; font-size:.72rem; color:var(--muted); text-align:center; border-top:1px solid var(--border); padding-top:12px; }
  @media (max-width:720px){ .kpis,.charts{ grid-template-columns:1fr 1fr; } }
  @media print {
    body { background:#fff; }
    .wrap { max-width:none; padding:12mm; }
    .card, .kpi, .resumo, .alerts { break-inside: avoid; }
  }
</style>
</head>
<body>
  <div class="wrap">
    <header class="head">
      <div>
        <p class="brand">Processo Ágil</p>
        <p class="brand-sub">Gestão financeira</p>
      </div>
      <div class="meta">
        <strong>Relatório Executivo</strong>
        <span>Emissão: ${d.emitidoEm}</span>
      </div>
    </header>
    <div class="client">
      <div>
        <h1>${d.nome}</h1>
        <p>CNPJ ${d.cnpj || "—"} · Período: ${d.periodLabel}</p>
      </div>
      <span class="badge ${d.nivelCls}"><span class="lab">Situação Financeira</span>${d.nivel}</span>
    </div>
    <section class="resumo">
      <h2>Resumo Executivo</h2>
      <p>${d.resumoExecutivo}</p>
    </section>
    <section class="kpis">
      ${kpiCards.map(([lab, val]) => `
        <article class="kpi"><div class="lab">${lab}</div><div class="val">${val}</div></article>`).join("")}
    </section>
    <section class="charts">
      <article class="card">
        <h2>Receitas × Despesas</h2>
        <div class="sub">Comparativo mensal</div>
        ${renderCliFinReportSvgBars(chartData)}
      </article>
      <article class="card">
        <h2>Situação dos Títulos</h2>
        <div class="sub">Recebidos · Em aberto · Vencidos</div>
        <div class="donut-wrap">${renderCliFinReportSvgDonut(chartData)}</div>
      </article>
    </section>
    <section class="alerts">
      <h2>Observações e Alertas</h2>
      <ul>${alerts.map((a) => `<li>${a}</li>`).join("")}</ul>
    </section>
    <p class="foot">Gerado pelo Processo Ágil · Documento para armazenamento, e-mail e compartilhamento com o cliente</p>
  </div>
</body>
</html>`;
    }

    function downloadCliFinRelatorioHtml(c) {
      const html = buildCliFinRelatorioHtml(c);
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      if (cliFinExec.lastDashUrl) {
        try { URL.revokeObjectURL(cliFinExec.lastDashUrl); } catch (_) { /* ignore */ }
      }
      const blobUrl = URL.createObjectURL(blob);
      cliFinExec.lastDashUrl = blobUrl;
      const slug = String(c.fantasia || c.nome || "cliente").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "cliente";
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `relatorio-executivo-${slug}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast("Relatório Executivo HTML exportado");
    }

    function printCliFinRelatorio(c) {
      const html = buildCliFinRelatorioHtml(c);
      const w = window.open("", "_blank", "noopener,width=960,height=720");
      if (!w) {
        toast("Permita pop-ups para imprimir o relatório");
        return;
      }
      w.document.open();
      w.document.write(html);
      w.document.close();
      w.focus();
      setTimeout(() => {
        try { w.print(); } catch (_) { /* ignore */ }
      }, 350);
      toast("Preparando impressão / PDF");
    }

    function buildCliFinDashboardHtml(c) {
      const d = getCliFinExecData(c);
      const dreRows = d.dre.map((g) => `
        <tr class="parent"><td><strong>${g.label}</strong></td><td class="num">${money(g.valor)}</td><td class="num">${money(g.prev)}</td><td><span class="delta ${g.delta >= 0 ? "up" : "down"}">${g.delta >= 0 ? "+" : ""}${String(g.delta).replace(".", ",")}%</span></td></tr>
        ${(g.children || []).map((ch) => `
          <tr><td class="child">${ch.label}</td><td class="num">${money(ch.valor)}</td><td class="num">${money(ch.prev)}</td><td><span class="delta ${ch.delta >= 0 ? "up" : "down"}">${ch.delta >= 0 ? "+" : ""}${String(ch.delta).replace(".", ",")}%</span></td></tr>`).join("")}
      `).join("");
      return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Dashboard Financeiro — ${d.nome}</title>
<style>
  :root { --navy:#1c386e; --accent:#28519c; --muted:#6b7c93; --ok:#2f9e6b; --bad:#b33a4a; --bg:#e8edf4; --card:#ffffff; --surface-2:#f5f8fc; --border:#d4dce8; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: "Segoe UI", system-ui, sans-serif; background: linear-gradient(160deg,var(--bg),var(--surface-2) 40%,#eef6f2); color:var(--navy); }
  .wrap { max-width: 920px; margin: 0 auto; padding: 28px 20px 48px; }
  .hero { background: var(--card); border:1px solid var(--border); border-radius:12px; padding:22px 24px; margin-bottom:18px; display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap; }
  .hero h1 { margin:0 0 6px; font-size:1.35rem; }
  .hero p { margin:0; color:var(--muted); font-size:.9rem; }
  .badge { align-self:flex-start; padding:6px 12px; border-radius:var(--radius-pill); font-weight:700; font-size:.75rem; background:color-mix(in srgb, var(--accent) 12%, transparent); color:var(--accent); }
  .badge.ok,.badge.excel { background:rgba(47,158,107,.14); color:#1f7a52; }
  .badge.warn { background:rgba(196,127,22,.16); color:#9a5f0c; }
  .badge.bad { background:rgba(179,58,74,.14); color:var(--bad); }
  .kpis { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:18px; }
  .kpi { background:var(--card); border:1px solid var(--border); border-radius:8px; padding:18px; border-left:4px solid var(--accent); }
  .kpi.receber { border-left-color:var(--ok); }
  .kpi.pagar { border-left-color:var(--bad); }
  .kpi .lab { font-size:.75rem; color:var(--muted); font-weight:650; }
  .kpi .val { font-size:1.55rem; font-weight:800; margin-top:6px; letter-spacing:-.02em; }
  .kpi .sub { font-size:.72rem; color:var(--muted); margin-top:4px; }
  .card { background:var(--card); border:1px solid var(--border); border-radius:8px; padding:18px 20px; }
  .card h2 { margin:0 0 4px; font-size:1.05rem; }
  .card .sub { color:var(--muted); font-size:.78rem; margin-bottom:12px; }
  table { width:100%; border-collapse:collapse; font-size:.86rem; }
  th { text-align:left; font-size:.7rem; color:var(--muted); padding:8px 6px; border-bottom:1px solid var(--border); }
  td { padding:9px 6px; border-bottom:1px solid var(--border); }
  tr.parent td { background:var(--surface-2); }
  td.child { padding-left:18px; color:#3a4d6b; }
  .num { text-align:right; font-variant-numeric:tabular-nums; }
  .delta { font-weight:700; font-size:.75rem; padding:2px 8px; border-radius:var(--radius-pill); }
  .delta.up { background:rgba(47,158,107,.12); color:#1f7a52; }
  .delta.down { background:rgba(179,58,74,.12); color:var(--bad); }
  .foot { margin-top:18px; font-size:.72rem; color:var(--muted); text-align:center; }
  @media (max-width:720px){ .kpis{ grid-template-columns:1fr; } }
</style>
</head>
<body>
  <div class="wrap">
    <header class="hero">
      <div>
        <h1>${d.nome}</h1>
        <p>CNPJ ${d.cnpj} · Visão executiva · ${d.periodLabel}</p>
      </div>
      <span class="badge ${d.nivelCls}">Qualidade: ${d.nivel}</span>
    </header>
    <section class="kpis">
      <article class="kpi"><div class="lab">Dinheiro em Conta</div><div class="val">${money(d.saldo)}</div><div class="sub">Saldo atual</div></article>
      <article class="kpi receber"><div class="lab">Total a Receber</div><div class="val">${money(d.receber)}</div><div class="sub">Dinheiro que entra</div></article>
      <article class="kpi pagar"><div class="lab">Total a Pagar</div><div class="val">${money(d.pagar)}</div><div class="sub">Dinheiro que sai</div></article>
    </section>
    <section class="card">
      <h2>DRE Gerencial</h2>
      <div class="sub">Categorias do plano de contas · variação vs mês anterior</div>
      <table>
        <thead><tr><th>Categoria</th><th class="num">Atual</th><th class="num">Anterior</th><th>Variação</th></tr></thead>
        <tbody>${dreRows}</tbody>
      </table>
    </section>
    <p class="foot">Gerado pelo Processo Ágil · Dashboard compartilhável para o cliente</p>
  </div>
</body>
</html>`;
    }

    function openCliFinDashboardHtml(c) {
      const html = buildCliFinDashboardHtml(c);
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      if (cliFinExec.lastDashUrl) {
        try { URL.revokeObjectURL(cliFinExec.lastDashUrl); } catch (_) { /* ignore */ }
      }
      const blobUrl = URL.createObjectURL(blob);
      cliFinExec.lastDashUrl = blobUrl;
      const code = `pa-${c.id}-${Date.now().toString(36).slice(-5)}`;
      const shareUrl = `https://app.processoagil.com.br/d/${code}`;
      window.open(blobUrl, "_blank", "noopener");
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(shareUrl).then(
          () => toast(`Dashboard HTML gerado · link copiado: ${shareUrl}`),
          () => toast(`Dashboard HTML gerado · ${shareUrl}`)
        );
      } else {
        toast(`Dashboard HTML gerado · ${shareUrl}`);
      }
    }

    function renderFinTabStubHtml(tabId) {
      return `<div class="fin-tab-stub"><strong>Em breve</strong>Conteúdo desta aba será prototipado em seguida.</div>`;
    }

    function renderFinCobrancasPanel() {
      const f = finDash.cobrancas.form || {};
      const all = ensureFinTitulos();
      const lado = finDash.cobrancas.lado || "receber";
      const status = finDash.cobrancas.status || "";
      const rows = all.filter((t) => {
        if (t.lado !== lado) return false;
        if (status && t.status !== status) return false;
        return true;
      });
      return `
        <div class="fin-op-panel fin-cobrancas-panel">
          <div class="fin-emit-card">
            <div class="fin-emit-head">
              <div>
                <h3>Emissão Sicredi</h3>
                <p>Gera boleto integrado e registra o título na gestão unificada.</p>
              </div>
              <span class="fin-emit-badge">Cobrança registrada</span>
            </div>
            <form class="fin-emit-form" id="finEmitForm" autocomplete="off">
              <label class="fin-field">
                <span>Sacado (cliente final)</span>
                <input type="text" id="finEmitSacado" placeholder="Razão social ou nome fantasia" value="${uiSelectEscape(f.sacado || "")}" required />
              </label>
              <label class="fin-field">
                <span>Valor</span>
                <input type="text" id="finEmitValor" inputmode="decimal" placeholder="0,00" value="${uiSelectEscape(f.valor || "")}" required />
              </label>
              <label class="fin-field">
                <span>Data de vencimento</span>
                <input type="date" id="finEmitVenc" value="${uiSelectEscape(f.vencimento || "")}" required />
              </label>
              <label class="fin-field fin-field-wide">
                <span>Descrição / referência</span>
                <input type="text" id="finEmitDesc" placeholder="Ex.: Honorários jul/26 · NF 4412" value="${uiSelectEscape(f.desc || "")}" required />
              </label>
              <div class="fin-emit-actions">
                <button type="submit" class="btn-primary" data-fin-cob="emit">Gerar e Emitir Boleto</button>
                ${finDash.cobrancas.syncingId ? `<span class="fin-sync-pulse">Sincronizando com Sicredi…</span>` : ""}
              </div>
            </form>
          </div>

          <div class="fin-op-card fin-titulos-card">
            <div class="fin-titulos-toolbar">
              <div class="fin-side-toggles" role="group" aria-label="Tipo de título">
                <button type="button" class="${lado === "receber" ? "active" : ""}" data-fin-cob-lado="receber">A Receber</button>
                <button type="button" class="${lado === "pagar" ? "active" : ""}" data-fin-cob-lado="pagar">A Pagar</button>
              </div>
              <div class="proc-filter field status tip-bottom" data-tip="Filtrar por status">
                <select id="finCobStatus" aria-label="Filtrar status do título">
                  <option value="" ${!status ? "selected" : ""}>Status</option>
                  <option value="pendente" ${status === "pendente" ? "selected" : ""}>Pendente</option>
                  <option value="pago" ${status === "pago" ? "selected" : ""}>Pago</option>
                  <option value="vencido" ${status === "vencido" ? "selected" : ""}>Vencido</option>
                </select>
              </div>
              <div class="fin-op-meta">${rows.length} títulos · retorno bancário atualiza o status automaticamente</div>
            </div>
            <div class="fin-table-scroll">
              <table class="fin-data-table fin-titulos-table">
                <thead>
                  <tr>
                    <th>Sacado / Favorecido</th>
                    <th>Referência</th>
                    <th>Vencimento</th>
                    <th class="num">Valor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows.length ? rows.map((t) => `
                    <tr class="${finDash.cobrancas.syncingId === t.id ? "is-syncing" : ""}">
                      <td>
                        <div class="fin-mov-desc">${uiSelectEscape(t.sacado)}</div>
                        <div class="fin-mov-tipo">Nº ${uiSelectEscape(t.nossoNumero || "—")}${finDash.cobrancas.syncingId === t.id ? " · sync…" : ""}</div>
                      </td>
                      <td>${uiSelectEscape(t.desc || "—")}</td>
                      <td class="mono">${uiSelectEscape(t.vencimento)}</td>
                      <td class="num fin-val ${t.lado === "receber" ? "in" : "out"}">${money(t.valor)}</td>
                      <td><span class="fin-status-pill ${t.status}">${finTituloStatusLabel(t.status)}</span></td>
                    </tr>`).join("") : `<tr><td colspan="5" class="fin-table-empty">Nenhum título neste filtro.</td></tr>`}
                </tbody>
              </table>
            </div>
          </div>
        </div>`;
    }

    function finFolhaVariacao(row) {
      const diff = +(row.pago - row.base).toFixed(2);
      if (Math.abs(diff) < 0.01) return { kind: "estavel", diff: 0, label: "Estável" };
      if (diff > 0) return { kind: "aumento", diff, label: "Acréscimo" };
      return { kind: "desconto", diff, label: "Desconto" };
    }

    function finFolhaJustificativa(row) {
      const itens = row.itens || [];
      if (!itens.length) return "Sem alteração no período";
      return itens.map((it) => {
        const sinal = it.valor >= 0 ? "+" : "−";
        return `${it.label} (${sinal} ${money(Math.abs(it.valor))})`;
      }).join(" · ");
    }

    function getFinFolhaAudit() {
      const f = finDash.folha.filters || {};
      const matchTxt = (val, q) => !q || normalizeSearchText(String(val ?? "")).includes(normalizeSearchText(q));
      const all = FIN_FOLHA_ROWS.map((r) => {
        const v = finFolhaVariacao(r);
        return { ...r, variacao: v, justificativa: finFolhaJustificativa(r) };
      });
      const rows = all.filter((r) => {
        if (!matchTxt(`${r.nome} ${r.cargo}`, f.funcionario)) return false;
        if (f.base && !matchTxt(r.base, f.base) && !matchTxt(money(r.base), f.base)) return false;
        if (f.pago && !matchTxt(r.pago, f.pago) && !matchTxt(money(r.pago), f.pago)) return false;
        if (f.variacao && f.variacao !== r.variacao.kind) return false;
        return true;
      });
      return {
        all,
        rows,
        vars: all.filter((r) => r.variacao.kind !== "estavel").length,
        variacaoOpts: [
          { value: "aumento", label: "Acréscimo" },
          { value: "desconto", label: "Desconto" },
          { value: "estavel", label: "Estável" },
        ],
      };
    }

    function renderFinFolhaTh(key, label, opts = {}) {
      const open = finDash.folha.filterOpen === key;
      const cur = (finDash.folha.filters || {})[key] || "";
      const active = !!cur;
      let menuBody = "";
      if (opts.options) {
        menuBody = `
          <button type="button" class="opt${!cur ? " active" : ""}" data-fin-folha-filter-set="${key}" data-value="">Todos</button>
          ${opts.options.map((o) => `
            <button type="button" class="opt${cur === o.value ? " active" : ""}" data-fin-folha-filter-set="${key}" data-value="${uiSelectEscape(o.value)}">${uiSelectEscape(o.label)}</button>`).join("")}`;
      } else {
        menuBody = `
          <input type="search" class="fin-th-filter-input" data-fin-folha-filter-input="${key}" placeholder="Filtrar…" value="${uiSelectEscape(cur)}" />
          <button type="button" class="opt" data-fin-folha-filter-set="${key}" data-value="">Limpar</button>`;
      }
      return `
        <th class="${opts.num ? "num" : ""}">
          <div class="fin-th-filter">
            <span>${label}</span>
            <button type="button" class="fin-th-filter-btn${active ? " is-on" : ""}${open ? " open" : ""}" data-fin-folha-filter="${key}" aria-label="Filtrar ${label}" aria-expanded="${open}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
            </button>
            ${open ? `<div class="fin-th-filter-menu${opts.num ? " align-end" : ""}" role="menu">${menuBody}</div>` : ""}
          </div>
        </th>`;
    }

    function renderFinFolhaPanel() {
      if (!finDash.folha.imported) {
        return `
          <div class="fin-op-panel fin-folha-panel">
            <div class="fin-upload-hub">
              <div class="hub-ico" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M19 8v6M16 11h6"/></svg>
              </div>
              <h3>Importar fechamento da folha</h3>
              <p>Arquivo gerado pelo RH/Contabilidade para auditar variações entre salário base e valor efetivo pago.</p>
              <button type="button" class="btn-primary" data-fin-folha="import">Importar</button>
              <div class="hub-hint">Protótipo aceita qualquer arquivo · dados mock de demonstração</div>
            </div>
          </div>`;
      }
      const a = getFinFolhaAudit();
      return `
        <div class="fin-op-panel fin-folha-panel">
          <div class="fin-upload-hub fin-upload-hub-compact">
            <div class="hub-compact-copy">
              <strong>Folha importada — competência jul/2026</strong>
              <span>${a.all.length} colaboradores · ${a.vars} com variação financeira</span>
            </div>
            <button type="button" class="btn-ghost" data-fin-folha="clear">Trocar arquivo</button>
            <button type="button" class="btn-primary" data-fin-folha="import">Reimportar</button>
          </div>

          <div class="fin-op-card fin-table-card">
            <div class="fin-card-head">
              <h4>Tabela de variação salarial</h4>
              <span class="chart-sub">Compara salário base × valor efetivo pago e traz a justificativa quando houver eventos (HE, descontos, adicionais)</span>
            </div>
            <div class="fin-table-scroll">
              <table class="fin-data-table fin-folha-table">
                <thead>
                  <tr>
                    ${renderFinFolhaTh("funcionario", "Funcionário")}
                    ${renderFinFolhaTh("base", "Salário base", { num: true })}
                    ${renderFinFolhaTh("pago", "Valor efetivo pago", { num: true })}
                    ${renderFinFolhaTh("variacao", "Variação", { options: a.variacaoOpts })}
                    <th>Justificativa</th>
                  </tr>
                </thead>
                <tbody>
                  ${a.rows.length ? a.rows.map((r) => {
                    const v = r.variacao;
                    return `
                      <tr>
                        <td>
                          <div class="fin-folha-person">
                            <span class="fin-folha-av" aria-hidden="true">${r.initials}</span>
                            <div>
                              <div class="fin-mov-desc">${uiSelectEscape(r.nome)}</div>
                              <div class="fin-mov-tipo">${uiSelectEscape(r.cargo)}</div>
                            </div>
                          </div>
                        </td>
                        <td class="num">${money(r.base)}</td>
                        <td class="num">${money(r.pago)}</td>
                        <td>
                          <span class="fin-var-pill ${v.kind}">
                            ${v.kind === "estavel" ? "—" : (v.kind === "aumento" ? "↑" : "↓")}
                            ${v.kind === "estavel" ? "Estável" : `${v.diff > 0 ? "+" : "−"} ${money(Math.abs(v.diff))} · ${v.label}`}
                          </span>
                        </td>
                        <td class="fin-folha-just">${uiSelectEscape(r.justificativa)}</td>
                      </tr>`;
                  }).join("") : `<tr><td colspan="5" class="fin-table-empty">Nenhum colaborador com os filtros atuais.</td></tr>`}
                </tbody>
              </table>
            </div>
          </div>
        </div>`;
    }

    function getFinConcSaldoCards() {
      const d = getFinDashData();
      const disponivel = d.drill?.saldo?.[0]?.valor ?? Math.round(d.saldoAtual * 0.62);
      return [
        {
          id: "disponivel",
          label: "Saldo disponível",
          value: disponivel,
          sub: "Disponível para uso imediato",
          cls: "disp",
          ico: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
        },
        {
          id: "anterior",
          label: "Saldo anterior",
          value: d.saldoInicial,
          sub: "Fechamento do período anterior",
          cls: "ant",
          ico: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
        },
        {
          id: "periodo",
          label: "Saldo do período",
          value: d.geracaoCaixa,
          sub: "Entradas − saídas do período",
          cls: "per",
          ico: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
        },
        {
          id: "atual",
          label: "Saldo Atual",
          value: d.saldoAtual,
          sub: d.periodLabel || "Posição consolidada",
          cls: "atu",
          ico: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
        },
      ];
    }

    function markFinOfxSessionConciliado(movId) {
      if (!movId) return;
      if (!finDash.conc.ofx) {
        finDash.conc.ofx = {
          q: "", tipo: "", conciliacao: "nao", de: "", ate: "",
          selected: [], modalOpen: false, expanded: false, sessionConciliados: [],
        };
      }
      if (!Array.isArray(finDash.conc.ofx.sessionConciliados)) {
        finDash.conc.ofx.sessionConciliados = [];
      }
      if (!finDash.conc.ofx.sessionConciliados.includes(movId)) {
        finDash.conc.ofx.sessionConciliados.push(movId);
      }
    }

    function validateFinOfxSessionConciliacoes() {
      const ids = new Set(finDash.conc.ofx?.sessionConciliados || []);
      const list = ensureFinConcMovs();
      let validated = 0;
      list.forEach((m, idx) => {
        const catId = m.catId || finDash.conc.categories[m.id] || "";
        const pending = !!m.ofxPendingValidate && !m.ofxValidated;
        if (!ids.has(m.id) && !pending) return;
        if (!catId) return;
        list[idx] = {
          ...m,
          status: "conciliado",
          catId,
          ofxPendingValidate: false,
          ofxValidated: true,
        };
        finDash.conc.categories[m.id] = catId;
        validated += 1;
      });
      return { validated };
    }

    function getFinOfxImportRows() {
      return ensureFinConcMovs().map((m) => {
        const catId = finDash.conc.categories[m.id] ?? m.catId ?? "";
        const pending = !!m.ofxPendingValidate && !m.ofxValidated;
        /* No OFX, item classificado (mesmo pendente de importar) sai de "Não conciliadas" */
        const status = (catId || pending) ? "conciliado" : (m.status || "aberto");
        return {
          id: m.id,
          desc: m.desc,
          data: m.data,
          tipo: m.tipo,
          valor: m.valor,
          status,
          catId,
        };
      });
    }

    function filterFinOfxImportRows(rows) {
      const o = finDash.conc.ofx || {};
      const q = normalizeSearchText(o.q || "");
      const tipo = o.tipo || "";
      const conc = o.conciliacao || "nao";
      return rows.filter((r) => {
        if (tipo && r.tipo !== tipo) return false;
        if (conc === "nao" && r.status === "conciliado") return false;
        if (conc === "sim" && r.status !== "conciliado") return false;
        if (q && !normalizeSearchText(`${r.desc} ${r.data} ${r.valor}`).includes(q)) return false;
        return true;
      });
    }

    function prepareFinConcModalChrome() {
      modal.classList.add("fin-conc-modal");
      const closeBtn = document.getElementById("modalClose");
      if (closeBtn) closeBtn.hidden = true;
      const tools = document.getElementById("modalHeadTools");
      if (tools && !finDash.conc.ofx?.modalOpen) {
        tools.innerHTML = "";
        tools.hidden = true;
      }
    }

    function openFinConcOfxPickModal() {
      if (finDash.conc.ofx) {
        finDash.conc.ofx.modalOpen = false;
        finDash.conc.ofx.expanded = false;
      }
      modal.classList.remove("fin-ofx-import-modal", "is-expanded");
      openModal({
        title: "Importar OFX",
        sub: `Selecione o arquivo do extrato · ${finDash.conc.banco || "SICREDI"}`,
        body: `
          <div class="fin-upload-hub fin-ofx-pick-hub">
            <div class="hub-ico" aria-hidden="true">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <h3>Importar arquivo OFX</h3>
            <p>Importe o extrato bancário (.ofx) para revisar e conciliar as movimentações.</p>
            <button type="button" class="btn-primary" id="finOfxPickFile">Importar</button>
            <div class="hub-hint">Protótipo: ao clicar em Importar, a listagem de movimentações é aberta.</div>
          </div>`,
        foot: `<button type="button" class="btn-ghost" data-close>Cancelar</button>`,
      });
      prepareFinConcModalChrome();
      document.getElementById("finOfxPickFile")?.addEventListener("click", () => {
        if (!finDash.conc.ofx) {
          finDash.conc.ofx = {
            q: "", tipo: "", conciliacao: "nao", de: "", ate: "",
            selected: [], modalOpen: false, expanded: false, sessionConciliados: [],
          };
        }
        finDash.conc.ofx.sessionConciliados = [];
        finDash.conc.ofx.selected = [];
        finDash.conc.ofx.mode = "import";
        openFinConcOfxModal();
      });
    }

    function syncFinConcOfxHeadTools() {
      const tools = document.getElementById("modalHeadTools");
      if (!tools) return;
      const open = !!(finDash.conc.ofx && finDash.conc.ofx.modalOpen);
      if (!open) {
        tools.innerHTML = "";
        tools.hidden = true;
        return;
      }
      const expanded = !!finDash.conc.ofx.expanded;
      tools.hidden = false;
      tools.innerHTML = `
        <button type="button" class="btn-expand tip-bottom" data-fin-ofx-expand data-tip="${expanded ? "Sair da tela toda" : "Expandir para tela toda"}" aria-label="${expanded ? "Sair da tela toda" : "Expandir"}" aria-pressed="${expanded}">
          <svg class="icon-expand" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ${expanded ? "hidden" : ""}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
          <svg class="icon-collapse" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ${expanded ? "" : "hidden"}><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
        </button>`;
      tools.querySelector("[data-fin-ofx-expand]")?.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        setFinConcOfxExpanded(!finDash.conc.ofx.expanded);
      });
    }

    function setFinConcOfxExpanded(on) {
      if (!finDash.conc.ofx) return;
      finDash.conc.ofx.expanded = !!on;
      const active = !!(finDash.conc.ofx.modalOpen && finDash.conc.ofx.expanded);
      modal.classList.add("fin-ofx-import-modal", "fin-conc-modal", "wide");
      modal.classList.toggle("is-expanded", active);
      modalBody.style.maxHeight = active ? "none" : "min(64vh, 580px)";
      modalBody.style.overflow = "auto";
      const btn = document.querySelector("#modalHeadTools [data-fin-ofx-expand]");
      if (btn) {
        const expandIcon = btn.querySelector(".icon-expand");
        const collapseIcon = btn.querySelector(".icon-collapse");
        if (expandIcon) expandIcon.hidden = !!on;
        if (collapseIcon) collapseIcon.hidden = !on;
        btn.setAttribute("data-tip", on ? "Sair da tela toda" : "Expandir para tela toda");
        btn.setAttribute("aria-label", on ? "Sair da tela toda" : "Expandir");
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      }
    }

    function openFinOfxBulkEditModal(selectedIds) {
      const ids = [...(selectedIds || [])].filter(Boolean);
      if (!ids.length) {
        toast("Selecione ao menos uma");
        return;
      }
      if (finDash.conc.ofx) {
        finDash.conc.ofx.modalOpen = false;
        finDash.conc.ofx.expanded = false;
        finDash.conc.ofx.returnAfterBulkEdit = true;
      }

      const n = ids.length;
      const label = n === 1 ? "1 movimentação" : `${n} movimentações`;

      const goBack = () => {
        if (finDash.conc.ofx) finDash.conc.ofx.returnAfterBulkEdit = false;
        openFinConcOfxModal();
      };

      openModal({
        title: `Editar ${label}`,
        sub: "Altere tipo, valor ou descrição das movimentações selecionadas.",
        body: `
          <div class="fin-transf-modal fin-ofx-bulk-edit">
            <label class="fin-transf-field">
              <span class="fin-transf-lab">Tipo</span>
              <select id="finOfxEditTipo" aria-label="Tipo">
                <option value="manter" selected>Manter</option>
                <option value="credito">Crédito</option>
                <option value="debito">Débito</option>
              </select>
            </label>
            <label class="fin-transf-field">
              <span class="fin-transf-lab">Valor (opcional)</span>
              <input type="text" id="finOfxEditValor" inputmode="decimal" placeholder="Deixe em branco para manter" />
            </label>
            <label class="fin-transf-field">
              <span class="fin-transf-lab">Descrição (opcional)</span>
              <input type="text" id="finOfxEditDesc" placeholder="Deixe em branco para manter" />
            </label>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" id="finOfxEditCancel">Cancelar</button>
          <button type="button" class="btn-primary" id="finOfxEditApply">Aplicar</button>`,
      });

      prepareFinConcModalChrome();
      enhanceUiSelects(modalBody);

      document.getElementById("finOfxEditCancel")?.addEventListener("click", () => goBack());
      document.getElementById("finOfxEditApply")?.addEventListener("click", () => {
        const tipo = document.getElementById("finOfxEditTipo")?.value || "manter";
        const valorRaw = (document.getElementById("finOfxEditValor")?.value || "").trim();
        const descRaw = (document.getElementById("finOfxEditDesc")?.value || "").trim();
        const hasValor = !!valorRaw;
        const valor = hasValor ? parseFinValorInput(valorRaw) : null;
        if (hasValor && (!Number.isFinite(valor) || valor <= 0)) {
          toast("Informe um valor válido");
          return;
        }
        if (tipo === "manter" && !hasValor && !descRaw) {
          toast("Nenhuma alteração para aplicar");
          return;
        }

        const list = ensureFinConcMovs();
        let changed = 0;
        ids.forEach((id) => {
          const idx = list.findIndex((m) => m.id === id);
          if (idx < 0) return;
          const next = { ...list[idx] };
          if (tipo === "credito" || tipo === "debito") next.tipo = tipo;
          if (hasValor) next.valor = valor;
          if (descRaw) next.desc = descRaw;
          list[idx] = next;
          changed += 1;
        });

        toast(`${changed} movimentação(ões) atualizada(s)`);
        goBack();
      });
    }

    function finOfxDateDisplay(v) {
      const s = String(v || "").trim();
      if (!s) return "";
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
        const [y, m, d] = s.split("-");
        return `${d}/${m}/${y}`;
      }
      return s;
    }

    function finOfxBrToIso(v) {
      const s = String(v || "").trim();
      if (!s) return "";
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
      const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (!m) return "";
      return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
    }

    function renderFinOfxFiltersHtml(o) {
      const de = finOfxDateDisplay(o.de).replace(/"/g, "&quot;");
      const ate = finOfxDateDisplay(o.ate).replace(/"/g, "&quot;");
      const deIso = finOfxBrToIso(o.de);
      const ateIso = finOfxBrToIso(o.ate);
      const calSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`;
      return `
        <div class="fin-op-filters fin-ofx-filters" role="search" aria-label="Filtros do extrato">
          <div class="proc-filter search fin-ofx-q">
            <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="search" id="finOfxQ" placeholder="Buscar movimentação…" value="${(o.q || "").replace(/"/g, "&quot;")}" aria-label="Buscar movimentação" />
          </div>
          <div class="proc-filter field fin-ofx-tipo">
            <svg class="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h6"/><path d="m14 15 3 3 3-3"/></svg>
            <select id="finOfxTipo" aria-label="Tipo">
              <option value="" ${!o.tipo ? "selected" : ""}>Todos</option>
              <option value="credito" ${o.tipo === "credito" ? "selected" : ""}>Crédito</option>
              <option value="debito" ${o.tipo === "debito" ? "selected" : ""}>Débito</option>
            </select>
          </div>
          <div class="proc-filter field fin-ofx-conc">
            <svg class="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>
            <select id="finOfxConc" aria-label="Conciliação">
              <option value="nao" ${o.conciliacao === "nao" ? "selected" : ""}>Não conciliadas</option>
              <option value="sim" ${o.conciliacao === "sim" ? "selected" : ""}>Conciliadas</option>
              <option value="todas" ${o.conciliacao === "todas" ? "selected" : ""}>Todas</option>
            </select>
          </div>
          <div class="proc-filter field fin-ofx-date">
            <input type="text" id="finOfxDe" class="fin-ofx-date-text" inputmode="numeric" placeholder="De dd/mm/aaaa" value="${de}" aria-label="Data inicial" autocomplete="off" />
            <button type="button" class="fin-ofx-date-cal" data-fin-ofx-cal="finOfxDe" aria-label="Abrir calendário data inicial">${calSvg}</button>
            <input type="date" id="finOfxDePick" class="fin-ofx-date-native" value="${deIso}" tabindex="-1" aria-hidden="true" />
          </div>
          <div class="proc-filter field fin-ofx-date">
            <input type="text" id="finOfxAte" class="fin-ofx-date-text" inputmode="numeric" placeholder="Até dd/mm/aaaa" value="${ate}" aria-label="Data final" autocomplete="off" />
            <button type="button" class="fin-ofx-date-cal" data-fin-ofx-cal="finOfxAte" aria-label="Abrir calendário data final">${calSvg}</button>
            <input type="date" id="finOfxAtePick" class="fin-ofx-date-native" value="${ateIso}" tabindex="-1" aria-hidden="true" />
          </div>
        </div>`;
    }

    function openFinConcOfxModal() {
      if (!finDash.conc.ofx) {
        finDash.conc.ofx = { q: "", tipo: "", conciliacao: "nao", de: "", ate: "", selected: [], modalOpen: false, expanded: false, sessionConciliados: [] };
      }
      finDash.conc.ofx.modalOpen = true;
      const o = finDash.conc.ofx;
      const isExport = o.mode === "export";
      const all = getFinOfxImportRows();
      const rows = filterFinOfxImportRows(all);
      const selected = new Set(o.selected || []);
      const selCount = rows.filter((r) => selected.has(r.id)).length;
      const totalVis = rows.length;

      openModal({
        title: isExport ? "Exportar OFX" : "Importar OFX",
        sub: `Movimentações do extrato · ${finDash.conc.banco || "SICREDI"}`,
        wide: true,
        body: `
          <div class="fin-ofx-modal">
            <div class="fin-ofx-toolbar">
              ${renderFinOfxFiltersHtml(o)}
            </div>

            <div class="fin-ofx-bulk">
              <div class="fin-ofx-bulk-left">
                ${isExport ? "" : `
                <button type="button" class="btn-outline" data-fin-ofx-bulk="edit" ${selCount ? "" : "disabled"}>Editar</button>
                <button type="button" class="btn-outline fin-ofx-danger" data-fin-ofx-bulk="delete" ${selCount ? "" : "disabled"}>Excluir selecionadas</button>`}
                <div class="fin-ofx-bulk-clear-col">
                  <button type="button" class="btn-ghost fin-ofx-bulk-clear" data-fin-ofx-bulk="clear">Limpar seleção</button>
                  <div class="fin-ofx-bulk-meta">Exibindo ${totalVis} de ${all.length}</div>
                </div>
              </div>
            </div>

            <div class="fin-ofx-table-card">
              <div class="fin-table-scroll fin-ofx-table-wrap">
                <table class="fin-data-table fin-ofx-table">
                  <thead>
                    <tr>
                      <th class="chk">
                        <div class="fin-ofx-chk-head">
                          <input type="checkbox" id="finOfxSelAll" ${rows.length && selCount === rows.length ? "checked" : ""} ${rows.length ? "" : "disabled"} aria-label="Selecionar todas as movimentações visíveis" title="Selecionar tudo" />
                          <span class="fin-ofx-sel-count" aria-hidden="true">${selCount}</span>
                        </div>
                      </th>
                      <th>Descrição</th>
                      <th>Data</th>
                      <th>Tipo</th>
                      <th class="num">Valor</th>
                      <th class="acts">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rows.length ? rows.map((r) => `
                      <tr>
                        <td class="chk">
                          <input type="checkbox" data-fin-ofx-row="${r.id}" ${selected.has(r.id) ? "checked" : ""} aria-label="Selecionar movimentação" />
                        </td>
                        <td><div class="fin-mov-desc">${uiSelectEscape(r.desc)}</div></td>
                        <td class="mono">${r.data}</td>
                        <td><span class="fin-ofx-tipo ${r.tipo}">${r.tipo === "credito" ? "CREDITO" : "DEBITO"}</span></td>
                        <td class="num fin-val ${r.tipo === "credito" ? "in" : "out"}">${money(r.valor)}</td>
                        <td class="acts">
                          <div class="fin-ofx-row-acts">
                            ${isExport ? `
                            <button type="button" class="btn-outline fin-ofx-row-btn" data-fin-ofx-row-act="export-one" data-id="${r.id}">Exportar</button>` : `
                            <button type="button" class="btn-outline fin-ofx-row-btn" data-fin-ofx-row-act="gerar" data-id="${r.id}">Gerar</button>
                            <button type="button" class="btn-outline fin-ofx-row-btn" data-fin-ofx-row-act="transferir" data-id="${r.id}">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 7h12"/><path d="m16 3 4 4-4 4"/><path d="M16 17H4"/><path d="m8 21-4-4 4-4"/></svg>
                              Transferir
                            </button>`}
                          </div>
                        </td>
                      </tr>`).join("") : `<tr><td colspan="6" class="fin-table-empty">Nenhuma movimentação com os filtros atuais.</td></tr>`}
                  </tbody>
                </table>
              </div>
            </div>
          </div>`,
        foot: isExport ? `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="finOfxExportAll">Exportar tudo</button>` : `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="finOfxImportAll">Importar tudo</button>`,
      });

      const refresh = () => openFinConcOfxModal();
      const bindFilter = (id, key, isSelect) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener(isSelect ? "change" : "input", () => {
          finDash.conc.ofx[key] = el.value;
          refresh();
        });
      };
      bindFilter("finOfxQ", "q", false);
      bindFilter("finOfxTipo", "tipo", true);
      bindFilter("finOfxConc", "conciliacao", true);
      bindFilter("finOfxDe", "de", false);
      bindFilter("finOfxAte", "ate", false);

      const openOfxCal = (textId) => {
        const text = document.getElementById(textId);
        const pick = document.getElementById(`${textId}Pick`);
        if (!pick) return;
        const iso = finOfxBrToIso(text?.value || "");
        if (iso) pick.value = iso;
        try {
          if (typeof pick.showPicker === "function") pick.showPicker();
          else pick.click();
        } catch (_) {
          pick.focus();
          pick.click();
        }
      };
      modalBody.querySelectorAll("[data-fin-ofx-cal]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          openOfxCal(btn.dataset.finOfxCal);
        });
      });
      const bindDatePick = (textId, key) => {
        const pick = document.getElementById(`${textId}Pick`);
        if (!pick) return;
        pick.addEventListener("change", () => {
          finDash.conc.ofx[key] = finOfxDateDisplay(pick.value);
          refresh();
        });
      };
      bindDatePick("finOfxDe", "de");
      bindDatePick("finOfxAte", "ate");

      modalBody.querySelectorAll("[data-fin-ofx-row]").forEach((chk) => {
        chk.addEventListener("change", () => {
          const id = chk.dataset.finOfxRow;
          const set = new Set(finDash.conc.ofx.selected || []);
          if (chk.checked) set.add(id); else set.delete(id);
          finDash.conc.ofx.selected = [...set];
          refresh();
        });
      });

      document.getElementById("finOfxSelAll")?.addEventListener("change", (e) => {
        const ids = rows.map((r) => r.id);
        if (e.target.checked) {
          finDash.conc.ofx.selected = [...new Set([...(finDash.conc.ofx.selected || []), ...ids])];
        } else {
          const drop = new Set(ids);
          finDash.conc.ofx.selected = (finDash.conc.ofx.selected || []).filter((id) => !drop.has(id));
        }
        refresh();
      });

      modalBody.querySelectorAll("[data-fin-ofx-bulk]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const act = btn.dataset.finOfxBulk;
          if (act === "clear") {
            finDash.conc.ofx.selected = [];
            refresh();
          } else if (act === "edit") {
            const selectedIds = [...(finDash.conc.ofx.selected || [])];
            if (!selectedIds.length) {
              toast("Selecione ao menos uma");
              return;
            }
            openFinOfxBulkEditModal(selectedIds);
          } else if (act === "delete") {
            if (!selCount) { toast("Selecione ao menos uma"); return; }
            finDash.conc.ofx.selected = [];
            toast(`${selCount} movimentação(ões) excluída(s) (protótipo)`);
            refresh();
          }
        });
      });

      modalBody.querySelectorAll("[data-fin-ofx-row-act]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const act = btn.dataset.finOfxRowAct;
          const id = btn.dataset.id;
          if (act === "export-one" && id) {
            toast(`Exportando movimentação ${id} · OFX gerado`);
            return;
          }
          if (act === "gerar" && id) {
            openFinConcGerarTituloModal(id, { fromOfx: true });
            return;
          }
          if (act === "transferir" && id) {
            openFinConcTransferirModal(id, { fromOfx: true });
            return;
          }
        });
      });

      document.getElementById("finOfxImportAll")?.addEventListener("click", () => {
        const pendingBefore = ensureFinConcMovs().filter((m) => m.ofxPendingValidate && !m.ofxValidated).length;
        const sessionBefore = (finDash.conc.ofx?.sessionConciliados || []).length;
        const { validated } = validateFinOfxSessionConciliacoes();
        const abertos = getFinConcMovements().filter((r) => r.status === "aberto").length;
        if (finDash.conc.ofx) {
          finDash.conc.ofx.sessionConciliados = [];
          finDash.conc.ofx.selected = [];
          finDash.conc.ofx.modalOpen = false;
          finDash.conc.ofx.expanded = false;
        }
        modal.classList.remove("fin-ofx-import-modal", "is-expanded", "fin-conc-modal");
        closeModal();
        finDash.tab = "conciliacao";
        renderFinModuleDash();
        const n = validated || pendingBefore || sessionBefore;
        if (n > 0) {
          toast(`Importação concluída · ${validated || n} conciliação(ões) validada(s) · ${abertos} em aberto`);
        } else {
          toast(`Importando ${totalVis} movimentação(ões) do OFX · nenhuma conciliação pendente`);
        }
      });

      document.getElementById("finOfxExportAll")?.addEventListener("click", () => {
        const n = selCount || totalVis;
        if (finDash.conc.ofx) {
          finDash.conc.ofx.modalOpen = false;
          finDash.conc.ofx.expanded = false;
          finDash.conc.ofx.mode = "import";
        }
        modal.classList.remove("fin-ofx-import-modal", "is-expanded", "fin-conc-modal");
        closeModal();
        toast(`Exportando ${n} movimentação(ões) · arquivo OFX gerado`, { success: true });
      });

      modal.classList.add("fin-ofx-import-modal");
      prepareFinConcModalChrome();
      enhanceUiSelects(modalBody);
      syncFinConcOfxHeadTools();
      setFinConcOfxExpanded(!!finDash.conc.ofx.expanded);
    }

    function openFinExportContabilModal() {
      const bancos = ensureFinConcBancos();
      if (!finDash.conc.exportContabil) {
        finDash.conc.exportContabil = { descLanc: "ofx", selected: null };
      }
      const st = finDash.conc.exportContabil;
      if (!Array.isArray(st.selected)) st.selected = bancos.map((b) => b.id);
      const selected = new Set(st.selected);
      const descLanc = st.descLanc || "ofx";
      const selCount = [...selected].filter((id) => bancos.some((b) => b.id === id)).length;

      openModal({
        title: "Exportar arquivo",
        sub: "Selecione os bancos que devem compor o layout.",
        body: `
          <div class="fin-transf-modal fin-exp-contabil">
            <label class="fin-transf-field">
              <span class="fin-transf-lab">Descrição do lançamento</span>
              <select id="finExpContabilDesc" aria-label="Descrição do lançamento">
                <option value="ofx" ${descLanc === "ofx" ? "selected" : ""}>Descrição do OFX</option>
                <option value="mov" ${descLanc === "mov" ? "selected" : ""}>Descrição da movimentação</option>
                <option value="hist" ${descLanc === "hist" ? "selected" : ""}>Histórico contábil</option>
              </select>
            </label>

            <div class="fin-exp-contabil-block">
              <div class="fin-exp-contabil-tools">
                <span class="fin-exp-contabil-lab">Bancos do layout</span>
                <span class="fin-exp-contabil-meta" id="finExpContabilMeta">${selCount} selecionado(s)</span>
                <div class="fin-exp-contabil-tools-acts">
                  <button type="button" class="btn-ghost" id="finExpContabilSelAll">Selecionar todos</button>
                  <button type="button" class="btn-ghost" id="finExpContabilClear">Limpar</button>
                </div>
              </div>
              <div class="fin-exp-contabil-list" role="group" aria-label="Bancos do layout">
                ${bancos.map((b) => {
                  const checked = selected.has(b.id);
                  return `
                    <label class="fin-exp-contabil-row">
                      <input type="checkbox" data-fin-exp-banco="${b.id}" ${checked ? "checked" : ""} />
                      <span class="fin-exp-contabil-txt">
                        <strong>${uiSelectEscape(b.nome)}</strong>
                        <span>Ag. ${uiSelectEscape(b.agencia || "—")} · Conta ${uiSelectEscape(finConcBancoContaLabel(b))} · ID ${uiSelectEscape(b.codigo || "—")}</span>
                      </span>
                    </label>`;
                }).join("")}
              </div>
            </div>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="finExpContabilSave">Exportar</button>`,
      });

      prepareFinConcModalChrome();
      enhanceUiSelects(modalBody);

      const syncSelected = () => {
        st.selected = [...modalBody.querySelectorAll("[data-fin-exp-banco]:checked")].map((el) => el.dataset.finExpBanco);
        const meta = document.getElementById("finExpContabilMeta");
        if (meta) meta.textContent = `${st.selected.length} selecionado(s)`;
      };

      document.getElementById("finExpContabilDesc")?.addEventListener("change", (ev) => {
        st.descLanc = ev.target.value || "ofx";
      });
      document.getElementById("finExpContabilSelAll")?.addEventListener("click", () => {
        modalBody.querySelectorAll("[data-fin-exp-banco]").forEach((el) => { el.checked = true; });
        syncSelected();
      });
      document.getElementById("finExpContabilClear")?.addEventListener("click", () => {
        modalBody.querySelectorAll("[data-fin-exp-banco]").forEach((el) => { el.checked = false; });
        syncSelected();
      });
      modalBody.querySelectorAll("[data-fin-exp-banco]").forEach((el) => {
        el.addEventListener("change", syncSelected);
      });
      document.getElementById("finExpContabilSave")?.addEventListener("click", () => {
        syncSelected();
        if (!st.selected.length) {
          toast("Selecione ao menos um banco");
          return;
        }
        const n = st.selected.length;
        toast(`Arquivo contábil gerado · ${n} banco${n > 1 ? "s" : ""}`);
        closeModal();
      });
    }

    function openFinConcOfxExportModal() {
      openFinExportContabilModal();
    }

    function ensureFinConcRegrasLista() {
      if (!finDash.conc.regras) {
        finDash.conc.regras = {
          escopo: "todos", automacao: "inativo", tipo: "receber", match: "contem",
          keyword: "", wild: false, subplano: "", lista: null,
        };
      }
      if (!finDash.conc.regras.lista) {
        finDash.conc.regras.lista = [
          { id: "r1", keyword: "DEP DINHEIRO ATM", match: "contem", subplano: "Venda de Mercadorias", escopo: "todos", ativo: true },
          { id: "r2", keyword: "PIX RECEBIDO", match: "contem", subplano: "Recebimentos de clientes", escopo: "todos", ativo: true },
          { id: "r3", keyword: "TARIFA PACOTE", match: "contem", subplano: "Despesas bancárias", escopo: "banco", ativo: true },
          { id: "r4", keyword: "FOLHA CLT", match: "exato", subplano: "Folha de pagamento", escopo: "todos", ativo: false },
        ];
      }
      return finDash.conc.regras.lista;
    }

    function renderFinConcRegrasBodyHtml(opts = {}) {
      const embed = !!opts.embed;
      if (!finDash.conc.regras) {
        finDash.conc.regras = {
          escopo: "todos", automacao: "inativo", tipo: "receber", match: "contem",
          keyword: "", wild: false, subplano: "", lista: null,
        };
      }
      const r = finDash.conc.regras;
      const banco = finDash.conc.banco || "SICREDI";
      const lista = ensureFinConcRegrasLista();
      const autoLabel = {
        ativo: "Conciliação automática ativada",
        semi: "Conciliação semiautomática",
        inativo: "Conciliação automática desativada",
      };
      const warnText = "Use com cuidado: uma regra muito genérica pode conciliar movimentações erradas automaticamente. \"Contém\" casa qualquer descrição que inclua a palavra-chave; \"Exato\" só concilia quando a descrição inteira é igual à palavra-chave.";

      return `
        <div class="fin-conc-regras${embed ? " is-embed" : ""}">
          <div class="fin-conc-regras-scope" role="tablist" aria-label="Aplicar a">
            <span class="fin-conc-scope-lab">Aplicar a:</span>
            <button type="button" class="fin-conc-scope-btn${r.escopo === "banco" ? " active" : ""}" data-fin-regra-escopo="banco">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 22h18"/><path d="M6 18V11"/><path d="M10 18V11"/><path d="M14 18V11"/><path d="M18 18V11"/><path d="m12 2 8 5H4z"/></svg>
              ${uiSelectEscape(banco)}
            </button>
            <button type="button" class="fin-conc-scope-btn${r.escopo === "todos" ? " active" : ""}" data-fin-regra-escopo="todos">
              ${r.escopo === "todos" ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>` : ""}
              Todos os bancos
            </button>
          </div>

          <div class="fin-conc-auto-card">
            <div class="fin-conc-auto-head">
              <strong>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                ${autoLabel[r.automacao] || autoLabel.inativo}
              </strong>
            </div>
            <div class="fin-conc-auto-btns">
              <button type="button" class="fin-conc-auto-btn${r.automacao === "ativo" ? " active" : ""}" data-fin-regra-auto="ativo">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                Ativo
              </button>
              <button type="button" class="fin-conc-auto-btn${r.automacao === "semi" ? " active" : ""}" data-fin-regra-auto="semi">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Semiautomático
              </button>
              <button type="button" class="fin-conc-auto-btn${r.automacao === "inativo" ? " active" : ""}" data-fin-regra-auto="inativo">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Inativo
              </button>
            </div>
          </div>

          <div class="fin-conc-warn" role="status">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <div>${warnText}</div>
          </div>

          <div class="fin-conc-regras-list-wrap">
            <h5>Regras cadastradas (${lista.length})</h5>
            <div class="fin-conc-regras-list">
              ${lista.map((item) => `
                <article class="fin-conc-regra-row" data-regra-id="${item.id}">
                  <div class="fin-conc-regra-main">
                    <strong>${uiSelectEscape(item.keyword)}</strong>
                    <span class="fin-conc-regra-badge">${item.escopo === "todos" ? "todos os bancos" : uiSelectEscape(banco)}</span>
                    <span class="fin-conc-regra-sub">${uiSelectEscape(item.subplano)}</span>
                  </div>
                  <div class="fin-conc-regra-controls">
                    <select data-fin-regra-match="${item.id}" aria-label="Correspondência">
                      <option value="contem" ${item.match === "contem" ? "selected" : ""}>Contém</option>
                      <option value="exato" ${item.match === "exato" ? "selected" : ""}>Exato</option>
                    </select>
                    <label class="fin-conc-regra-switch" title="Ativar regra">
                      <input type="checkbox" data-fin-regra-toggle="${item.id}" ${item.ativo ? "checked" : ""} />
                    </label>
                    <button type="button" class="cfg-icon-btn danger" data-fin-regra-del="${item.id}" aria-label="Excluir regra">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </article>`).join("")}
            </div>
          </div>
        </div>`;
    }

    function bindFinConcRegrasEvents(onRefresh) {
      modalBody.querySelectorAll("[data-fin-regra-escopo]").forEach((btn) => {
        btn.addEventListener("click", () => {
          finDash.conc.regras.escopo = btn.dataset.finRegraEscopo;
          onRefresh();
        });
      });
      modalBody.querySelectorAll("[data-fin-regra-auto]").forEach((btn) => {
        btn.addEventListener("click", () => {
          finDash.conc.regras.automacao = btn.dataset.finRegraAuto;
          onRefresh();
        });
      });
      modalBody.querySelectorAll("[data-fin-regra-match]").forEach((sel) => {
        sel.addEventListener("change", () => {
          const item = ensureFinConcRegrasLista().find((x) => x.id === sel.dataset.finRegraMatch);
          if (item) item.match = sel.value;
        });
      });
      modalBody.querySelectorAll("[data-fin-regra-toggle]").forEach((chk) => {
        chk.addEventListener("change", () => {
          const item = ensureFinConcRegrasLista().find((x) => x.id === chk.dataset.finRegraToggle);
          if (item) item.ativo = !!chk.checked;
        });
      });
      modalBody.querySelectorAll("[data-fin-regra-del]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.finRegraDel;
          finDash.conc.regras.lista = ensureFinConcRegrasLista().filter((x) => x.id !== id);
          toast("Regra removida");
          onRefresh();
        });
      });
    }

    function openFinConcRegrasModal() {
      const r = finDash.conc.regras || {};
      const sub = r.escopo === "todos"
        ? "Valendo para todos os bancos desta empresa."
        : `Valendo para o banco ${finDash.conc.banco || "SICREDI"}.`;
      openModal({
        title: "Conciliação automática por palavra-chave",
        sub,
        wide: true,
        body: renderFinConcRegrasBodyHtml(),
        foot: `<button type="button" class="btn-ghost" data-close>Cancelar</button>`,
      });
      prepareFinConcModalChrome();
      bindFinConcRegrasEvents(() => openFinConcRegrasModal());
    }

    function ensureFinConcBancos() {
      if (!finDash.conc.bancos) {
        finDash.conc.bancos = [
          {
            id: "b1", nome: "SICREDI", codigo: "756", agencia: "0903", conta: "90850", digito: "7",
            tipoConta: "Corrente", titular: "", documento: "", saldoInicial: 3851.78, dataSaldoInicial: "2025-12-31",
          },
          {
            id: "b2", nome: "Itaú", codigo: "341", agencia: "1234", conta: "12345", digito: "6",
            tipoConta: "Corrente", titular: "", documento: "", saldoInicial: 1200.0, dataSaldoInicial: "2025-12-31",
          },
          {
            id: "b3", nome: "Bradesco", codigo: "237", agencia: "0456", conta: "77889", digito: "0",
            tipoConta: "Corrente", titular: "", documento: "", saldoInicial: 540.5, dataSaldoInicial: "2025-12-31",
          },
        ];
      }
      finDash.conc.bancos.forEach((b) => {
        if (b.digito == null && String(b.conta || "").includes("-")) {
          const [cc, dig] = String(b.conta).split("-");
          b.conta = cc;
          b.digito = dig || "";
        }
        if (b.tipoConta == null) b.tipoConta = "Corrente";
        if (b.titular == null) b.titular = "";
        if (b.documento == null) b.documento = "";
        if (b.saldoInicial == null) b.saldoInicial = 0;
        if (b.dataSaldoInicial == null) b.dataSaldoInicial = "2025-12-31";
        if (b.digito == null) b.digito = "";
      });
      if (!finDash.conc.bancoId) finDash.conc.bancoId = "b1";
      if (!finDash.conc.bancoPadraoId) finDash.conc.bancoPadraoId = "b1";
      return finDash.conc.bancos;
    }

    function finConcBancoContaLabel(b) {
      if (!b) return "—";
      return b.digito ? `${b.conta}-${b.digito}` : String(b.conta || "—");
    }

    function applyFinConcBanco(banco) {
      if (!banco) return;
      finDash.conc.bancoId = banco.id;
      finDash.conc.banco = banco.nome;
      finDash.conc.bancoMeta = {
        codigo: banco.codigo,
        agencia: banco.agencia,
        conta: finConcBancoContaLabel(banco),
      };
    }

    const FIN_CONC_CODIGOS_BANCO = [
      { codigo: "001", nome: "Banco do Brasil" },
      { codigo: "033", nome: "Santander" },
      { codigo: "104", nome: "Caixa Econômica" },
      { codigo: "237", nome: "Bradesco" },
      { codigo: "341", nome: "Itaú" },
      { codigo: "756", nome: "SICREDI" },
      { codigo: "748", nome: "Sicredi" },
      { codigo: "077", nome: "Inter" },
      { codigo: "260", nome: "Nubank" },
    ];

    function openFinConcEditarBancoModal(bancoId, opts = {}) {
      const returnToContexto = !!opts.returnToContexto;
      const isNew = !!opts.isNew;
      ensureFinConcBancos();
      let banco = ensureFinConcBancos().find((x) => x.id === bancoId);
      if (!banco && isNew) {
        banco = {
          id: bancoId || `b${Date.now()}`,
          nome: "",
          codigo: "",
          agencia: "",
          conta: "",
          digito: "",
          tipoConta: "Corrente",
          titular: "",
          documento: "",
          saldoInicial: 0,
          dataSaldoInicial: "2025-12-31",
        };
      }
      if (!banco) {
        toast("Banco não encontrado");
        return;
      }
      const saldoStr = Number.isFinite(banco.saldoInicial)
        ? Number(banco.saldoInicial).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : "";

      openModal({
        title: isNew ? "Cadastrar Banco" : "Editar Banco",
        sub: isNew ? "Informe os dados do banco" : "Atualize os dados do banco",
        wide: true,
        body: `
          <div class="fin-conc-edit-banco cli-cad-grid">
            <div class="full">
              <label for="finBancoCodigoReal">Código do Banco</label>
              <select id="finBancoCodigoReal" aria-label="Selecionar código real">
                <option value="">Selecione um código real</option>
                ${FIN_CONC_CODIGOS_BANCO.map((c) => `
                  <option value="${c.codigo}" ${banco.codigo === c.codigo ? "selected" : ""}>${c.codigo} — ${uiSelectEscape(c.nome)}</option>
                `).join("")}
              </select>
            </div>
            <div>
              <label for="finBancoCodigo">Código do Banco *</label>
              <input type="text" id="finBancoCodigo" value="${uiSelectEscape(banco.codigo || "")}" inputmode="numeric" maxlength="4" />
            </div>
            <div>
              <label for="finBancoNome">Nome do Banco *</label>
              <input type="text" id="finBancoNome" value="${uiSelectEscape(banco.nome || "")}" />
            </div>
            <div class="fin-conc-edit-conta-row full">
              <div>
                <label for="finBancoAgencia">Agência</label>
                <input type="text" id="finBancoAgencia" value="${uiSelectEscape(banco.agencia || "")}" />
              </div>
              <div>
                <label for="finBancoConta">Conta</label>
                <input type="text" id="finBancoConta" value="${uiSelectEscape(banco.conta || "")}" />
              </div>
              <div>
                <label for="finBancoDigito">Dígito</label>
                <input type="text" id="finBancoDigito" value="${uiSelectEscape(banco.digito || "")}" maxlength="2" />
              </div>
            </div>
            <div>
              <label for="finBancoTipo">Tipo de Conta</label>
              <select id="finBancoTipo">
                <option value="Corrente" ${banco.tipoConta === "Corrente" ? "selected" : ""}>Corrente</option>
                <option value="Poupança" ${banco.tipoConta === "Poupança" ? "selected" : ""}>Poupança</option>
                <option value="Aplicação" ${banco.tipoConta === "Aplicação" ? "selected" : ""}>Aplicação</option>
              </select>
            </div>
            <div>
              <label for="finBancoTitular">Titular</label>
              <input type="text" id="finBancoTitular" value="${uiSelectEscape(banco.titular || "")}" />
            </div>
            <div class="full">
              <label for="finBancoDoc">Documento (CPF/CNPJ)</label>
              <input type="text" id="finBancoDoc" value="${uiSelectEscape(banco.documento || "")}" />
            </div>
            <div>
              <label for="finBancoSaldo">Saldo Inicial</label>
              <input type="text" id="finBancoSaldo" value="${saldoStr ? `R$ ${saldoStr}` : ""}" inputmode="decimal" />
            </div>
            <div>
              <label for="finBancoDataSaldo">Data do Saldo Inicial</label>
              <input type="date" id="finBancoDataSaldo" value="${uiSelectEscape(banco.dataSaldoInicial || "")}" />
            </div>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" id="finBancoEditCancel">Cancelar</button>
          <button type="button" class="btn-primary" id="finBancoEditSave">Salvar</button>`,
      });
      prepareFinConcModalChrome();

      const syncFromCodigoReal = () => {
        const sel = document.getElementById("finBancoCodigoReal");
        const cod = sel?.value || "";
        if (!cod) return;
        const found = FIN_CONC_CODIGOS_BANCO.find((c) => c.codigo === cod);
        const codigoInput = document.getElementById("finBancoCodigo");
        const nomeInput = document.getElementById("finBancoNome");
        if (codigoInput) codigoInput.value = cod;
        if (nomeInput && found && (!(nomeInput.value || "").trim() || isNew)) nomeInput.value = found.nome;
      };

      document.getElementById("finBancoCodigoReal")?.addEventListener("change", syncFromCodigoReal);

      document.getElementById("finBancoEditCancel")?.addEventListener("click", () => {
        openFinConcSelecionarBancoModal({ returnToContexto });
      });

      document.getElementById("finBancoEditSave")?.addEventListener("click", () => {
        const codigo = (document.getElementById("finBancoCodigo")?.value || "").trim();
        const nomeBanco = (document.getElementById("finBancoNome")?.value || "").trim();
        if (!codigo || !nomeBanco) {
          toast("Preencha código e nome do banco");
          return;
        }
        const payload = {
          id: banco.id,
          codigo,
          nome: nomeBanco,
          agencia: (document.getElementById("finBancoAgencia")?.value || "").trim(),
          conta: (document.getElementById("finBancoConta")?.value || "").trim(),
          digito: (document.getElementById("finBancoDigito")?.value || "").trim(),
          tipoConta: document.getElementById("finBancoTipo")?.value || "Corrente",
          titular: (document.getElementById("finBancoTitular")?.value || "").trim(),
          documento: (document.getElementById("finBancoDoc")?.value || "").trim(),
          saldoInicial: parseFinValorInput(document.getElementById("finBancoSaldo")?.value || "") || 0,
          dataSaldoInicial: document.getElementById("finBancoDataSaldo")?.value || "",
        };
        const list = ensureFinConcBancos();
        const idx = list.findIndex((x) => x.id === banco.id);
        if (idx >= 0) list[idx] = { ...list[idx], ...payload };
        else list.push(payload);
        if (finDash.conc.bancoId === payload.id) applyFinConcBanco(payload);
        finDash.conc.bancoPickId = payload.id;
        toast(isNew ? "Banco cadastrado" : "Banco atualizado");
        openFinConcSelecionarBancoModal({ returnToContexto });
      });
    }

    function openFinConcSelecionarBancoModal(opts = {}) {
      const returnToContexto = !!opts.returnToContexto;
      const bancos = ensureFinConcBancos();
      const c = getFinSelectedCliente() || {};
      const nome = c.fantasia || c.nome || "Empresa selecionada";
      if (!finDash.conc.bancoPickId) {
        finDash.conc.bancoPickId = finDash.conc.bancoId || bancos[0]?.id;
      }
      const pickId = finDash.conc.bancoPickId;
      const asPadrao = !!finDash.conc.bancoPickPadrao;

      openModal({
        title: "Selecionar Banco",
        sub: "Cliente fixo da view. Escolha o banco para conciliação",
        wide: true,
        body: `
          <div class="fin-conc-pick-banco">
            <div class="fin-conc-pick-cliente">Cliente fixo: <strong>${uiSelectEscape(nome)}</strong></div>
            <div class="fin-conc-pick-head">
              <span>Bancos do cliente:</span>
              <button type="button" class="btn-ghost" data-fin-banco-act="cadastrar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                Cadastrar Banco
              </button>
            </div>
            <div class="fin-conc-pick-list">
              ${bancos.map((b) => {
                const selected = b.id === pickId;
                return `
                  <button type="button" class="fin-conc-pick-row${selected ? " is-selected" : ""}" data-fin-banco-pick="${b.id}">
                    <span class="fin-conc-pick-ico" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 22h18"/><path d="M6 18V11"/><path d="M10 18V11"/><path d="M14 18V11"/><path d="M18 18V11"/><path d="m12 2 8 5H4z"/></svg>
                    </span>
                    <span class="fin-conc-pick-info">
                      <strong>${uiSelectEscape(b.nome)}</strong>
                      <span>${uiSelectEscape(b.codigo)} · Ag: ${uiSelectEscape(b.agencia)} · Cc: ${uiSelectEscape(finConcBancoContaLabel(b))}</span>
                    </span>
                    <span class="fin-conc-pick-actions">
                      <span class="cfg-icon-btn" data-fin-banco-edit="${b.id}" role="button" tabindex="0" aria-label="Editar banco">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                      </span>
                      <span class="fin-conc-pick-check${selected ? "" : " is-empty"}" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span>
                    </span>
                  </button>`;
              }).join("")}
            </div>
            <label class="cfg-obr-check wrap fin-conc-pick-padrao">
              <input type="checkbox" id="finConcBancoPadrao" ${asPadrao ? "checked" : ""} />
              Definir banco selecionado como padrão
            </label>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="finConcBancoConfirm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            Confirmar
          </button>`,
      });
      prepareFinConcModalChrome();

      const refresh = () => openFinConcSelecionarBancoModal({ returnToContexto });

      modalBody.querySelectorAll("[data-fin-banco-pick]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          if (e.target.closest("[data-fin-banco-edit]")) return;
          finDash.conc.bancoPickId = btn.dataset.finBancoPick;
          refresh();
        });
      });

      modalBody.querySelectorAll("[data-fin-banco-edit]").forEach((el) => {
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          openFinConcEditarBancoModal(el.dataset.finBancoEdit, { returnToContexto });
        });
      });

      modalBody.querySelector("[data-fin-banco-act='cadastrar']")?.addEventListener("click", () => {
        openFinConcEditarBancoModal(`b${Date.now()}`, { returnToContexto, isNew: true });
      });

      document.getElementById("finConcBancoPadrao")?.addEventListener("change", (e) => {
        finDash.conc.bancoPickPadrao = !!e.target.checked;
      });

      document.getElementById("finConcBancoConfirm")?.addEventListener("click", () => {
        const b = ensureFinConcBancos().find((x) => x.id === finDash.conc.bancoPickId);
        if (!b) {
          toast("Selecione um banco");
          return;
        }
        applyFinConcBanco(b);
        if (finDash.conc.bancoPickPadrao) finDash.conc.bancoPadraoId = b.id;
        finDash.conc.bancoPickId = null;
        finDash.conc.bancoPickPadrao = false;
        closeModal();
        renderFinModuleDash();
        toast(`Banco ativo: ${b.nome}`);
        if (returnToContexto) openFinConcContextoModal();
      });
    }

    function openFinConcContextoModal() {
      const c = getFinSelectedCliente() || {};
      const d = getFinDashData();
      const banco = finDash.conc.banco || "SICREDI";
      const meta = finDash.conc.bancoMeta || { codigo: "756", agencia: "0903", conta: "90850-7" };
      const nome = c.fantasia || c.nome || "Empresa selecionada";
      const cnpj = (c.cnpj || "—").replace(/\D/g, "") || "—";

      openModal({
        title: "Contexto da Conciliação",
        sub: "Empresa, conta bancária e automação",
        wide: true,
        body: `
          <div class="fin-conc-contexto">
            <div class="fin-conc-contexto-actions">
              <button type="button" class="btn-ghost" data-fin-ctx-act="dre">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Gerar DRE
              </button>
              <button type="button" class="btn-primary" data-fin-ctx-act="banco">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 7h12"/><path d="m16 3 4 4-4 4"/><path d="M16 17H4"/><path d="m8 21-4-4 4-4"/></svg>
                Trocar Banco
              </button>
            </div>
            <div class="fin-conc-contexto-cards">
              <article class="fin-conc-ctx-card empresa">
                <strong>${uiSelectEscape(nome)}</strong>
                <span>CNPJ ${uiSelectEscape(cnpj)}</span>
              </article>
              <article class="fin-conc-ctx-card banco">
                <div class="fin-conc-banco-top">
                  <strong>${uiSelectEscape(banco)}</strong>
                  <span class="fin-conc-banco-code">${uiSelectEscape(meta.codigo)}</span>
                </div>
                <div class="fin-conc-banco-meta">
                  <span>Ag: ${uiSelectEscape(meta.agencia)}</span>
                  <span>Conta: ${uiSelectEscape(meta.conta)}</span>
                </div>
                <div class="fin-conc-banco-saldo">Saldo inicial: ${money(d.saldoInicial)}</div>
              </article>
            </div>
            <div class="fin-conc-contexto-extra">
              ${renderFinConcRegrasBodyHtml({ embed: true })}
            </div>
          </div>`,
        foot: `<button type="button" class="btn-ghost" data-close>Fechar</button>`,
      });
      prepareFinConcModalChrome();

      modalBody.querySelector("[data-fin-ctx-act='dre']")?.addEventListener("click", () => {
        toast("Gerando DRE do contexto (protótipo)");
      });
      modalBody.querySelector("[data-fin-ctx-act='banco']")?.addEventListener("click", () => {
        finDash.conc.bancoPickId = finDash.conc.bancoId || ensureFinConcBancos()[0]?.id;
        finDash.conc.bancoPickPadrao = finDash.conc.bancoPadraoId === finDash.conc.bancoPickId;
        openFinConcSelecionarBancoModal({ returnToContexto: true });
      });
      bindFinConcRegrasEvents(() => openFinConcContextoModal());
    }

    function renderFinConciliacaoPanel() {
      const all = getFinConcMovements();
      const rows = filterFinConcMovements(all);
      const abertos = all.filter((r) => r.status === "aberto").length;
      if (!Array.isArray(finDash.conc.selected)) finDash.conc.selected = [];
      const selected = new Set(finDash.conc.selected);
      const selCount = rows.filter((r) => selected.has(r.id)).length;
      const cards = getFinConcSaldoCards();
      const ctx = finDash.conc.contexto || "contabil";
      const ctxOpen = !!finDash.conc.contextoOpen;
      const ctxLabel = ctx === "financeiro" ? "Financeiro" : "Contábil";

      return `
        <div class="fin-op-panel fin-conc-panel">
          <div class="fin-conc-dash">
            <div class="fin-conc-dash-top">
              <div class="fin-conc-dash-title">
                <h3>Indicadores da conciliação</h3>
                <p>Posição de caixa do período selecionado</p>
              </div>
              <div class="fin-conc-dash-actions">
                <div class="fin-conc-ctx${ctxOpen ? " open" : ""}">
                  <button type="button" class="btn-ghost fin-conc-ctx-btn" data-fin-conc="ctx-toggle" aria-expanded="${ctxOpen}" aria-haspopup="true">
                    ${ctxLabel}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                  <div class="fin-conc-ctx-menu" ${ctxOpen ? "" : "hidden"} role="menu">
                    <button type="button" role="menuitem" data-fin-conc-ctx="financeiro">
                      ${ctx === "financeiro" ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>` : `<span class="fin-conc-ctx-spacer"></span>`}
                      Financeiro
                    </button>
                    <button type="button" role="menuitem" data-fin-conc-ctx="contabil">
                      ${ctx === "contabil" ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>` : `<span class="fin-conc-ctx-spacer"></span>`}
                      Contábil
                    </button>
                    <button type="button" role="menuitem" data-fin-conc-ctx="exibir">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                      Exibir contexto
                    </button>
                    <button type="button" role="menuitem" data-fin-conc-ctx="banco">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 7h12"/><path d="m16 3 4 4-4 4"/><path d="M16 17H4"/><path d="m8 21-4-4 4-4"/></svg>
                      Trocar banco
                    </button>
                  </div>
                </div>
                <button type="button" class="btn-primary" data-fin-conc="finalizar">Finalizar mês</button>
              </div>
            </div>
            <div class="fin-conc-saldo-kpis">
              ${cards.map((c) => `
                <article class="fin-conc-saldo-kpi ${c.cls}">
                  <div class="kpi-top">
                    <span class="kpi-ico" aria-hidden="true">${c.ico}</span>
                    <span class="label">${c.label}</span>
                  </div>
                  <div class="value">${money(c.value)}</div>
                  <div class="sub">${uiSelectEscape(c.sub)}</div>
                </article>`).join("")}
            </div>
          </div>

          <div class="fin-conc-ops${finDash.conc.opsExpanded ? " is-expanded" : ""}" id="finConcOps">
          <div class="fin-op-toolbar fin-conc-toolbar">
            <div class="fin-conc-toolbar-row fin-conc-toolbar-actions">
              <div class="fin-conc-toolbar-left">
                <button type="button" class="btn-primary" data-fin-conc-import="ofx">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Importar OFX
                </button>
                <button type="button" class="btn-outline tip-bottom" data-fin-conc="add" data-tip="Cria lançamento em aberto no extrato">Adicionar manualmente</button>
              </div>
              <div class="fin-conc-toolbar-right">
                <button type="button" class="btn-outline tip-bottom" data-fin-conc="matching" data-tip="Executar motor de matching">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  Matching
                </button>
                <button type="button" class="btn-ghost tip-bottom" data-fin-conc="export" data-tip="Exportar arquivo contábil">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Exportar contábil
                </button>
                <button type="button" class="btn-outline tip-bottom" data-fin-conc="excel" data-tip="Baixar planilha modelo de conciliação">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/></svg>
                  Excel
                </button>
                <button type="button" class="cfg-icon-btn tip-bottom" data-fin-conc="regras" data-tip="Regras de conciliação automática" aria-label="Regras de conciliação automática">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                </button>
                <span class="fin-conc-expand-host" id="finConcExpandHost"></span>
              </div>
            </div>
            <div class="fin-conc-toolbar-row fin-conc-toolbar-filters">
              <div class="fin-op-filters fin-ofx-filters" role="search" aria-label="Filtros da conciliação">
                <div class="proc-filter search fin-ofx-q tip-bottom" data-tip="Buscar movimentação">
                  <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  <input type="search" id="finConcQ" placeholder="Buscar movimentação…" value="${(finDash.conc.q || "").replace(/"/g, "&quot;")}" aria-label="Buscar movimentação" />
                </div>
                <div class="proc-filter field valor" data-tip="Filtrar por valor">
                  <input type="search" id="finConcValor" placeholder="Valor" value="${(finDash.conc.valor || "").replace(/"/g, "&quot;")}" aria-label="Filtrar valor" />
                </div>
                <div class="proc-filter field id-titulo" data-tip="Filtrar por ID do título">
                  <input type="search" id="finConcIdTitulo" placeholder="ID título" value="${(finDash.conc.idTitulo || "").replace(/"/g, "&quot;")}" aria-label="Filtrar ID do título" />
                </div>
                <div class="proc-filter field fin-ofx-tipo" data-tip="Filtrar por tipo">
                  <svg class="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h6"/><path d="m14 15 3 3 3-3"/></svg>
                  <select id="finConcTipo" aria-label="Filtrar tipo">
                    <option value="" ${!finDash.conc.tipo ? "selected" : ""}>Todos</option>
                    <option value="credito" ${finDash.conc.tipo === "credito" ? "selected" : ""}>Crédito</option>
                    <option value="debito" ${finDash.conc.tipo === "debito" ? "selected" : ""}>Débito</option>
                  </select>
                </div>
                <div class="proc-filter field fin-ofx-conc" data-tip="Filtrar por status">
                  <svg class="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>
                  <select id="finConcStatus" aria-label="Filtrar status">
                    <option value="" ${!finDash.conc.status ? "selected" : ""}>Status</option>
                    <option value="conciliado" ${finDash.conc.status === "conciliado" ? "selected" : ""}>Conciliado</option>
                    <option value="aberto" ${finDash.conc.status === "aberto" ? "selected" : ""}>Em aberto</option>
                  </select>
                </div>
                <div class="proc-filter field fin-ofx-date" data-tip="Data inicial">
                  <input type="text" id="finConcDe" class="fin-ofx-date-text" inputmode="numeric" placeholder="De dd/mm/aaaa" value="${finOfxDateDisplay(finDash.conc.de || "").replace(/"/g, "&quot;")}" aria-label="Data inicial" autocomplete="off" />
                  <button type="button" class="fin-ofx-date-cal" data-fin-conc-cal="finConcDe" aria-label="Abrir calendário data inicial"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></button>
                  <input type="date" id="finConcDePick" class="fin-ofx-date-native" value="${finOfxBrToIso(finDash.conc.de || "")}" tabindex="-1" aria-hidden="true" />
                </div>
                <div class="proc-filter field fin-ofx-date" data-tip="Data final">
                  <input type="text" id="finConcAte" class="fin-ofx-date-text" inputmode="numeric" placeholder="Até dd/mm/aaaa" value="${finOfxDateDisplay(finDash.conc.ate || "").replace(/"/g, "&quot;")}" aria-label="Data final" autocomplete="off" />
                  <button type="button" class="fin-ofx-date-cal" data-fin-conc-cal="finConcAte" aria-label="Abrir calendário data final"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></button>
                  <input type="date" id="finConcAtePick" class="fin-ofx-date-native" value="${finOfxBrToIso(finDash.conc.ate || "")}" tabindex="-1" aria-hidden="true" />
                </div>
              </div>
              <div class="fin-op-meta">${rows.length} movimentações · ${abertos} em aberto</div>
            </div>
          </div>

          <div class="fin-op-card fin-table-card">
            <div class="fin-table-scroll">
              <table class="fin-data-table fin-conc-table">
                <thead>
                  <tr>
                    <th class="chk">
                      <div class="fin-conc-chk-head">
                        <input type="checkbox" id="finConcSelAll" ${rows.length && selCount === rows.length ? "checked" : ""} ${rows.length ? "" : "disabled"} aria-label="Selecionar todas as movimentações visíveis" title="Selecionar tudo" />
                        <span class="fin-conc-sel-count" aria-hidden="true">${selCount}</span>
                      </div>
                    </th>
                    <th>Data</th>
                    <th>ID título</th>
                    <th>Descrição original do banco</th>
                    <th>Categoria</th>
                    <th class="num">Valor</th>
                    <th>Status</th>
                    <th class="acts">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows.length ? rows.map((r) => {
                    const open = finDash.conc.catRowId === r.id;
                    const catLab = r.catId ? finDreCatLabel(r.catId) : "";
                    const isSel = selected.has(r.id);
                    return `
                      <tr class="${open ? "is-cat-open" : ""}${isSel ? " is-selected" : ""}">
                        <td class="chk">
                          <input type="checkbox" data-fin-conc-row="${r.id}" ${isSel ? "checked" : ""} aria-label="Selecionar movimentação" />
                        </td>
                        <td class="mono">${r.data}</td>
                        <td class="mono">${uiSelectEscape(r.tituloId || "—")}</td>
                        <td>
                          <div class="fin-mov-desc">${uiSelectEscape(r.desc)}</div>
                          <div class="fin-mov-tipo ${r.tipo}">${r.tipo === "credito" ? "Crédito" : "Débito"}</div>
                        </td>
                        <td class="fin-cat-cell">
                          <button type="button" class="fin-cat-btn${r.catId ? " has-cat" : ""}" data-fin-cat-toggle="${r.id}" aria-expanded="${open}">
                            ${r.catId ? `<span class="cat-full">${uiSelectEscape(catLab)}</span>` : `<span class="cat-ph">Categorizar na DRE…</span>`}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                          </button>
                          ${open ? renderFinDreCatPicker(r.id, r.tipo) : ""}
                        </td>
                        <td class="num fin-val ${r.tipo === "credito" ? "in" : "out"}">${r.tipo === "credito" ? "+" : "−"} ${money(r.valor)}</td>
                        <td><span class="fin-status-pill ${r.status}">${r.status === "conciliado" ? "Conciliado" : "Em aberto"}</span></td>
                        <td class="acts">
                          ${renderFinConcRowActions(r)}
                        </td>
                      </tr>`;
                  }).join("") : `<tr><td colspan="8" class="fin-table-empty">Nenhuma movimentação com os filtros atuais.</td></tr>`}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </div>`;
    }

    function getFinCartoesAudit() {
      const f = finDash.cartoes.filters || {};
      const all = FIN_CARTAO_ROWS.map((r) => {
        const prev = +(r.bruto * (r.prevPct / 100)).toFixed(2);
        const real = +(r.bruto * (r.realPct / 100)).toFixed(2);
        const diff = +(real - prev).toFixed(2);
        const selo = r.negada ? "negada" : (Math.abs(diff) < 0.01 ? "ok" : "alerta");
        return {
          ...r,
          descontoPrevisto: prev,
          descontoReal: real,
          diferenca: diff,
          ok: Math.abs(diff) < 0.01,
          liquido: +(r.bruto - real).toFixed(2),
          selo,
          parcelasLabel: r.tipoLanc === "Pix" ? "À vista" : `${r.parcelas || 1}x`,
        };
      });
      const matchTxt = (val, q) => !q || normalizeSearchText(String(val ?? "")).includes(normalizeSearchText(q));
      const seloLabelMap = { ok: "OK", alerta: "Alerta", negada: "Negada" };
      const rowDateIso = (dataHora) => {
        const d = String(dataHora || "").split(" ")[0] || "";
        const [dd, mm, yyyy] = d.split("/");
        return dd && mm && yyyy ? `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}` : "";
      };
      const rows = all.filter((r) => {
        if (cliFinAudit.modalOpen) {
          const iso = rowDateIso(r.dataHora);
          if (cliFinAudit.dateFrom && iso && iso < cliFinAudit.dateFrom) return false;
          if (cliFinAudit.dateTo && iso && iso > cliFinAudit.dateTo) return false;
        }
        if (f.bandeira && r.bandeira !== f.bandeira) return false;
        if (f.tipo && r.tipoLanc !== f.tipo) return false;
        if (f.selo) {
          const want = Object.keys(seloLabelMap).find((k) => seloLabelMap[k] === f.selo) || f.selo;
          if (r.selo !== want) return false;
        }
        if (f.parcelas && String(r.parcelasLabel) !== f.parcelas && String(r.parcelas) !== f.parcelas) return false;
        if (!matchTxt(r.dataHora, f.dataHora)) return false;
        if (f.bruto && !matchTxt(r.bruto, f.bruto) && !matchTxt(money(r.bruto), f.bruto)) return false;
        if (f.prev && !matchTxt(r.descontoPrevisto, f.prev) && !matchTxt(money(r.descontoPrevisto), f.prev)) return false;
        if (f.real && !matchTxt(r.descontoReal, f.real) && !matchTxt(money(r.descontoReal), f.real)) return false;
        if (f.diff) {
          const signed = `${r.diferenca >= 0 ? "+" : "-"}${money(Math.abs(r.diferenca))}`;
          if (!matchTxt(r.diferenca, f.diff) && !matchTxt(signed, f.diff) && !matchTxt(money(Math.abs(r.diferenca)), f.diff)) return false;
        }
        return true;
      });
      /* KPIs e gráficos acompanham o mesmo recorte filtrado da tabela */
      const scope = rows;
      const efetivas = scope.filter((r) => !r.negada);
      const negadas = scope.filter((r) => r.negada);
      const bruto = efetivas.reduce((s, r) => s + r.bruto, 0);
      const liquido = efetivas.reduce((s, r) => s + r.liquido, 0);
      const tarifaDiff = efetivas.reduce((s, r) => s + r.diferenca, 0);
      const naoEfet = negadas.reduce((s, r) => s + r.bruto, 0);
      const byDia = {};
      efetivas.forEach((r) => {
        if (!byDia[r.dia]) {
          byDia[r.dia] = { bruto: 0, tarifa: 0, liquido: 0, diff: 0, previsto: 0, real: 0, mais: 0, menos: 0 };
        }
        byDia[r.dia].bruto += r.bruto;
        byDia[r.dia].tarifa += r.descontoReal;
        byDia[r.dia].liquido += r.liquido;
        byDia[r.dia].diff += r.diferenca;
        byDia[r.dia].previsto += r.descontoPrevisto;
        byDia[r.dia].real += r.descontoReal;
        if (r.diferenca > 0.01) byDia[r.dia].mais += r.diferenca;
        if (r.diferenca < -0.01) byDia[r.dia].menos += Math.abs(r.diferenca);
      });
      Object.keys(byDia).forEach((d) => {
        byDia[d].bruto = +byDia[d].bruto.toFixed(2);
        byDia[d].liquido = +byDia[d].liquido.toFixed(2);
        byDia[d].previsto = +byDia[d].previsto.toFixed(2);
        byDia[d].real = +byDia[d].real.toFixed(2);
        byDia[d].diff = +byDia[d].diff.toFixed(2);
        byDia[d].mais = +byDia[d].mais.toFixed(2);
        byDia[d].menos = +byDia[d].menos.toFixed(2);
      });
      const dias = Object.keys(byDia).sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }));
      const lucroDiario = dias.length
        ? +(dias.reduce((s, d) => s + byDia[d].liquido, 0) / dias.length).toFixed(2)
        : 0;
      const byBand = {};
      const byBandDiv = {};
      efetivas.forEach((r) => {
        byBand[r.bandeira] = (byBand[r.bandeira] || 0) + r.descontoReal;
        if (!byBandDiv[r.bandeira]) {
          byBandDiv[r.bandeira] = { previsto: 0, real: 0, excesso: 0 };
        }
        byBandDiv[r.bandeira].previsto += r.descontoPrevisto;
        byBandDiv[r.bandeira].real += r.descontoReal;
        if (r.diferenca > 0) byBandDiv[r.bandeira].excesso += r.diferenca;
      });
      Object.keys(byBandDiv).forEach((k) => {
        byBandDiv[k].previsto = +byBandDiv[k].previsto.toFixed(2);
        byBandDiv[k].real = +byBandDiv[k].real.toFixed(2);
        byBandDiv[k].excesso = +byBandDiv[k].excesso.toFixed(2);
      });
      const byTipo = {};
      const byTipoDetail = {};
      efetivas.forEach((r) => {
        byTipo[r.tipoLanc] = (byTipo[r.tipoLanc] || 0) + r.bruto;
        if (!byTipoDetail[r.tipoLanc]) byTipoDetail[r.tipoLanc] = { bruto: 0, count: 0 };
        byTipoDetail[r.tipoLanc].bruto += r.bruto;
        byTipoDetail[r.tipoLanc].count += 1;
      });
      Object.keys(byTipoDetail).forEach((k) => {
        byTipoDetail[k].bruto = +byTipoDetail[k].bruto.toFixed(2);
      });
      const finCartaoModalidade = (r) => {
        if (r.tipoLanc === "Pix") return "Pix";
        if (r.tipoLanc === "Débito") return "Débito";
        if ((r.parcelas || 1) > 1) return `Crédito Parcelado (${r.parcelas}x)`;
        return "Crédito à vista";
      };
      const byOfensor = {};
      efetivas.forEach((r) => {
        if (r.diferenca <= 0.01) return;
        const modalidade = finCartaoModalidade(r);
        const key = `${r.bandeira} · ${modalidade}`;
        if (!byOfensor[key]) byOfensor[key] = { lab: key, excesso: 0, count: 0 };
        byOfensor[key].excesso += r.diferenca;
        byOfensor[key].count += 1;
      });
      Object.keys(byOfensor).forEach((k) => {
        byOfensor[k].excesso = +byOfensor[k].excesso.toFixed(2);
      });
      const top5 = efetivas
        .filter((r) => r.diferenca > 0.01)
        .slice()
        .sort((a, b) => b.diferenca - a.diferenca)
        .slice(0, 5)
        .map((r) => ({
          data: String(r.dataHora || "").split(" ")[0] || r.dia,
          nsu: r.nsu || r.id,
          bandeira: r.bandeira,
          modalidade: finCartaoModalidade(r),
          erro: r.diferenca,
        }));
      const hasActiveFilter = Object.values(f).some((v) => !!v)
        || (cliFinAudit.modalOpen && (!!cliFinAudit.dateFrom || !!cliFinAudit.dateTo));
      return {
        rows, all, bruto, liquido, tarifaDiff, naoEfet, lucroDiario,
        byBand, byBandDiv, byTipo, byTipoDetail, byOfensor, top5, byDia, dias,
        hasActiveFilter,
        bandeiras: [...new Set(all.map((r) => r.bandeira))],
        tipos: [...new Set(all.map((r) => r.tipoLanc))],
        parcelasOpts: [...new Set(all.map((r) => r.parcelasLabel))],
      };
    }

    function renderFinMiniBars(items, color) {
      const list = Object.entries(items);
      if (!list.length) {
        return `<div class="fin-mini-empty">Sem dados no filtro atual</div>`;
      }
      const max = Math.max(...list.map(([, v]) => Math.abs(v)), 1);
      return `
        <div class="fin-mini-bars compact">
          ${list.map(([lab, val]) => `
            <div class="row">
              <span class="lab">${uiSelectEscape(lab)}</span>
              <div class="track"><i style="width:${Math.max(4, (Math.abs(val) / max) * 100)}%;background:${color}"></i></div>
              <span class="val">${money(val)}</span>
            </div>`).join("")}
        </div>`;
    }

    function renderFinDivergenciaBandeiraChart(byBandDiv) {
      const list = Object.entries(byBandDiv || {})
        .map(([lab, v]) => ({ lab, ...v }))
        .filter((x) => x.excesso > 0.01)
        .sort((a, b) => b.excesso - a.excesso);
      if (!list.length) {
        return `<div class="fin-mini-empty">Nenhuma bandeira com cobrança a maior no filtro atual</div>`;
      }
      const max = Math.max(...list.map((x) => x.real || (x.previsto + x.excesso)), 1);
      return `
        <div class="fin-stack-bars">
          ${list.map((x) => {
            const okW = Math.max(0, (x.previsto / max) * 100);
            const badW = Math.max(2, (x.excesso / max) * 100);
            return `
              <div class="row" title="Previsto ${money(x.previsto)} · Excesso ${money(x.excesso)} · Real ${money(x.real)}">
                <span class="lab">${uiSelectEscape(x.lab)}</span>
                <div class="track">
                  <i class="ok-part" style="width:${okW}%"></i>
                  <i class="bad-part" style="width:${badW}%"></i>
                </div>
                <span class="val">+${money(x.excesso)}</span>
              </div>`;
          }).join("")}
        </div>`;
    }

    function renderFinOfensoresBandeiraModalidadeChart(byOfensor) {
      const list = Object.values(byOfensor || {})
        .filter((x) => x.excesso > 0.01)
        .sort((a, b) => b.excesso - a.excesso);
      if (!list.length) {
        return `<div class="fin-mini-empty">Nenhum ofensor com cobrança a maior no filtro atual</div>`;
      }
      const max = Math.max(...list.map((x) => x.excesso), 0.01);
      return `
        <div class="fin-stack-bars is-ofensor">
          ${list.map((x) => `
            <div class="row" title="${uiSelectEscape(x.lab)} · +${money(x.excesso)} · ${x.count} transações">
              <span class="lab">${uiSelectEscape(x.lab)}</span>
              <div class="track"><i class="bad-part" style="width:${Math.max(6, (x.excesso / max) * 100)}%"></i></div>
              <span class="val">+${money(x.excesso)}<span class="tx-count">${x.count} tx</span></span>
            </div>`).join("")}
        </div>`;
    }

    function renderFinTop5DivergenciasHtml(top5) {
      const rows = top5 || [];
      if (!rows.length) {
        return `<div class="fin-mini-empty">Nenhuma divergência positiva no filtro atual</div>`;
      }
      return `
        <div class="fin-table-scroll" style="max-height:220px">
          <table class="fin-top5-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>NSU/Autorização</th>
                <th>Bandeira</th>
                <th class="num">Erro (R$)</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map((r) => `
                <tr>
                  <td>${uiSelectEscape(r.data)}</td>
                  <td class="mono">${uiSelectEscape(r.nsu)}</td>
                  <td><strong>${uiSelectEscape(r.bandeira)}</strong></td>
                  <td class="num erro">+ ${money(r.erro)}</td>
                </tr>`).join("")}
            </tbody>
          </table>
        </div>`;
    }

    function renderFinEvolucaoDivergenciasExecChart(byDia, dias) {
      if (!dias.length) {
        return `<div class="fin-mini-empty">Sem dados no filtro atual</div>`;
      }
      const maisArr = dias.map((d) => byDia[d].mais || 0);
      const menosArr = dias.map((d) => byDia[d].menos || 0);
      const volumes = dias.map((d) => byDia[d].bruto || 0);
      const maxDiff = Math.max(...maisArr, ...menosArr, 0.01);
      const maxVol = Math.max(...volumes, 0.01);
      const w = 760;
      const h = 260;
      const padL = 52;
      const padR = 56;
      const padT = 18;
      const padB = 30;
      const innerW = w - padL - padR;
      const innerH = h - padT - padB;
      const slot = dias.length ? innerW / dias.length : innerW;
      const barW = Math.max(8, Math.min(18, slot * 0.28));
      const zeroY = padT + innerH / 2;
      const diffH = (v) => (Math.abs(v) / maxDiff) * (innerH / 2 - 10);
      const volY = (v) => padT + innerH - (v / maxVol) * (innerH * 0.92);
      const linePts = dias.map((d, i) => {
        const cx = padL + i * slot + slot / 2;
        return `${cx.toFixed(1)},${volY(byDia[d].bruto || 0).toFixed(1)}`;
      }).join(" ");
      return `
        <div class="fin-dia-chart-wrap">
          <svg class="fin-dual-chart fin-mini-vbars" viewBox="0 0 ${w} ${h}" role="img" aria-label="Evolução de divergências versus volume">
            <text x="8" y="${padT + 8}" font-size="9" fill="var(--muted)">Divergência</text>
            <text x="${w - 8}" y="${padT + 8}" text-anchor="end" font-size="9" fill="#28519c">Volume</text>
            <line x1="${padL}" y1="${zeroY}" x2="${w - padR}" y2="${zeroY}" stroke="var(--border)" stroke-width="1.2" />
            <polyline points="${linePts}" fill="none" stroke="#28519c" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" />
            ${dias.map((d, i) => {
              const mais = byDia[d].mais || 0;
              const menos = byDia[d].menos || 0;
              const bruto = byDia[d].bruto || 0;
              const cx = padL + i * slot + slot / 2;
              const xMais = cx - barW - 1;
              const xMenos = cx + 1;
              const hMais = diffH(mais);
              const hMenos = diffH(menos);
              const vy = volY(bruto);
              return `
                <g>
                  ${mais > 0.01 ? `<rect x="${xMais.toFixed(1)}" y="${(zeroY - hMais).toFixed(1)}" width="${barW}" height="${Math.max(2, hMais).toFixed(1)}" rx="2" fill="#b33a4a" />` : ""}
                  ${menos > 0.01 ? `<rect x="${xMenos.toFixed(1)}" y="${zeroY.toFixed(1)}" width="${barW}" height="${Math.max(2, hMenos).toFixed(1)}" rx="2" fill="#2f9e6b" />` : ""}
                  <circle cx="${cx.toFixed(1)}" cy="${vy.toFixed(1)}" r="3.4" fill="#28519c" stroke="#fff" stroke-width="1.5" />
                  <rect class="bar-hit"
                    data-fin-dia-tip="1"
                    data-tip-mode="evolucao"
                    data-dia="${uiSelectEscape(d)}"
                    data-volume="${bruto}"
                    data-mais="${mais}"
                    data-menos="${menos}"
                    x="${(padL + i * slot + 2).toFixed(1)}" y="${padT}" width="${Math.max(12, slot - 4).toFixed(1)}" height="${innerH}" fill="transparent" />
                  <text x="${cx.toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="9" fill="var(--muted)">${uiSelectEscape(d)}</text>
                </g>`;
            }).join("")}
            <text x="${padL - 6}" y="${padT + 12}" text-anchor="end" font-size="8" fill="#b33a4a">+${money(maxDiff)}</text>
            <text x="${padL - 6}" y="${zeroY + 3}" text-anchor="end" font-size="8" fill="var(--muted)">0</text>
            <text x="${padL - 6}" y="${h - padB}" text-anchor="end" font-size="8" fill="#2f9e6b">−${money(maxDiff)}</text>
            <text x="${w - padR + 6}" y="${padT + 12}" font-size="8" fill="#28519c">${moneyShort(maxVol)}</text>
            <text x="${w - padR + 6}" y="${h - padB}" font-size="8" fill="#28519c">0</text>
          </svg>
          <div class="fin-dia-tooltip" id="finDiaTooltip" hidden></div>
        </div>`;
    }

    function renderFinComposicaoDiariaChart(byDia, dias) {
      if (!dias.length) {
        return `<div class="fin-mini-empty">Sem dados no filtro atual</div>`;
      }
      const rows = dias.map((d) => {
        const bruto = +(byDia[d].bruto || 0).toFixed(2);
        const previsto = +(byDia[d].previsto || 0).toFixed(2);
        const real = +(byDia[d].real || 0).toFixed(2);
        const liquido = +(byDia[d].liquido || Math.max(0, bruto - real)).toFixed(2);
        const erro = +Math.max(0, real - previsto).toFixed(2);
        const tarifa = +Math.max(0, real - erro).toFixed(2);
        return { dia: d, bruto, previsto, real, liquido, erro, tarifa };
      });
      const maxBruto = Math.max(...rows.map((r) => r.bruto), 0.01);
      const w = 720;
      const h = 220;
      const padL = 56;
      const padR = 16;
      const padT = 14;
      const padB = 30;
      const innerW = w - padL - padR;
      const innerH = h - padT - padB;
      const slot = rows.length ? innerW / rows.length : innerW;
      const barW = Math.max(14, Math.min(42, slot * 0.55));
      const yAt = (v) => padT + innerH - (v / maxBruto) * innerH;
      const hAt = (v) => Math.max(v > 0.009 ? 2 : 0, (v / maxBruto) * innerH);
      const ticks = [0, 0.25, 0.5, 0.75, 1].map((p) => p * maxBruto);
      return `
        <div class="fin-dia-chart-wrap">
          <svg class="fin-stack-day-chart fin-mini-vbars" viewBox="0 0 ${w} ${h}" role="img" aria-label="Composição diária: valor líquido, tarifa prevista e cobrado a mais">
            ${ticks.map((t) => {
              const y = yAt(t);
              return `
                <line x1="${padL}" y1="${y.toFixed(1)}" x2="${w - padR}" y2="${y.toFixed(1)}" stroke="var(--border)" stroke-width="1" ${t === 0 ? "" : 'stroke-dasharray="3 3"'} />
                <text x="${padL - 6}" y="${(y + 3).toFixed(1)}" text-anchor="end" font-size="9" fill="var(--muted)">${t === 0 ? "0" : moneyShort(t)}</text>`;
            }).join("")}
            ${rows.map((r, i) => {
              const x = padL + i * slot + (slot - barW) / 2;
              const hLiq = hAt(r.liquido);
              const hTar = hAt(r.tarifa);
              const hErr = hAt(r.erro);
              const yBase = padT + innerH;
              const y1 = yBase - hLiq;
              const y2 = y1 - hTar;
              const y3 = y2 - hErr;
              const totalH = hLiq + hTar + hErr;
              const seg = (cls, y, hh) => hh > 0
                ? `<rect class="${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW}" height="${hh.toFixed(1)}" />`
                : "";
              return `
                <g class="col">
                  ${seg("seg-liq", y1, hLiq)}
                  ${seg("seg-tarifa", y2, hTar)}
                  ${seg("seg-erro", y3, hErr)}
                  <rect class="bar-hit"
                    data-fin-dia-tip="1"
                    data-tip-mode="composicao"
                    data-dia="${uiSelectEscape(r.dia)}"
                    data-bruto="${r.bruto}"
                    data-previsto="${r.previsto}"
                    data-erro="${r.erro}"
                    data-liquido="${r.liquido}"
                    x="${x.toFixed(1)}" y="${(yBase - Math.max(totalH, 4)).toFixed(1)}" width="${barW}" height="${Math.max(totalH, 4).toFixed(1)}" />
                  <text x="${(x + barW / 2).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="9" fill="var(--muted)">${uiSelectEscape(r.dia)}</text>
                </g>`;
            }).join("")}
          </svg>
          <div class="fin-dia-tooltip" id="finDiaTooltip" hidden></div>
        </div>`;
    }

    function renderFinEvolucaoDivergenciaVolumeChart(byDia, dias) {
      return renderFinComposicaoDiariaChart(byDia, dias);
    }

    function renderFinTarifaDiaChart(byDia, dias) {
      return renderFinComposicaoDiariaChart(byDia, dias);
    }

    function renderFinCartaoTh(key, label, opts = {}) {
      const open = finDash.cartoes.filterOpen === key;
      const cur = (finDash.cartoes.filters || {})[key] || "";
      const active = !!cur;
      let menuBody = "";
      if (opts.options) {
        menuBody = `
          <button type="button" class="opt${!cur ? " active" : ""}" data-fin-cartao-filter-set="${key}" data-value="">Todos</button>
          ${opts.options.map((o) => `
            <button type="button" class="opt${cur === o ? " active" : ""}" data-fin-cartao-filter-set="${key}" data-value="${uiSelectEscape(o)}">${uiSelectEscape(o)}</button>`).join("")}`;
      } else {
        menuBody = `
          <input type="search" class="fin-th-filter-input" data-fin-cartao-filter-input="${key}" placeholder="Filtrar…" value="${uiSelectEscape(cur)}" />
          <button type="button" class="opt" data-fin-cartao-filter-set="${key}" data-value="">Limpar</button>`;
      }
      return `
        <th class="${opts.num ? "num" : ""}">
          <div class="fin-th-filter">
            <span>${label}</span>
            <button type="button" class="fin-th-filter-btn${active ? " is-on" : ""}${open ? " open" : ""}" data-fin-cartao-filter="${key}" aria-label="Filtrar ${label}" aria-expanded="${open}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
            </button>
            ${open ? `<div class="fin-th-filter-menu${opts.num ? " align-end" : ""}" role="menu">${menuBody}</div>` : ""}
          </div>
        </th>`;
    }

    function renderFinCartaoRows(rows, opts = {}) {
      const compact = !!opts.compact;
      const seloLabel = { ok: "OK", alerta: "Alerta", negada: "Negada" };
      const cols = compact ? 7 : 9;
      if (!rows.length) return `<tr><td colspan="${cols}" class="fin-table-empty">Nenhuma divergência com os filtros atuais.</td></tr>`;
      return rows.map((r) => {
        const dataLabel = compact
          ? uiSelectEscape(String(r.dataHora || "").split(" ")[0] || r.dataHora || "")
          : uiSelectEscape(r.dataHora);
        return `
        <tr class="${r.negada ? "is-denied" : ""}">
          <td class="mono">${dataLabel}</td>
          <td><strong>${uiSelectEscape(r.bandeira)}</strong></td>
          <td><span class="fin-mov-tipo ${r.tipoLanc === "Pix" || r.tipoLanc === "Crédito" ? "credito" : "debito"}">${uiSelectEscape(r.tipoLanc)}</span></td>
          <td class="num">${money(r.bruto)}</td>
          <td class="num">${money(r.descontoPrevisto)}${compact ? "" : ` <span class="pct-mute">${String(r.prevPct).replace(".", ",")}%</span>`}</td>
          <td class="num">${money(r.descontoReal)}${compact ? "" : ` <span class="pct-mute">${String(r.realPct).replace(".", ",")}%</span>`}</td>
          <td class="num ${r.diferenca > 0.01 ? "out" : (r.diferenca < -0.01 ? "in" : "")}">${r.diferenca >= 0 ? "+" : "−"} ${money(Math.abs(r.diferenca))}</td>
          ${compact ? "" : `<td>${uiSelectEscape(r.parcelasLabel)}</td>
          <td>${r.selo === "negada"
            ? `<span class="fin-seal deny">${seloLabel.negada}</span>`
            : (r.selo === "ok" ? `<span class="fin-seal ok">${seloLabel.ok}</span>` : `<span class="fin-seal alert">${seloLabel.alerta}</span>`)}</td>`}
        </tr>`;
      }).join("");
    }

    function renderFinCartoesPanel() {
      const c = resolveFinAuditCliente();
      if (!c) {
        return `
          <div class="fin-op-panel fin-cartoes-panel">
            <div class="fin-table-empty" style="padding:28px 16px">Selecione um cliente no cabeçalho do módulo para auditar cartões.</div>
          </div>`;
      }
      return `
        <div class="fin-op-panel fin-cartoes-panel">
          ${renderCliFinAuditoriaTab(c)}
        </div>`;
    }

    function renderFinTitulosPanel() {
      const c = resolveFinAuditCliente();
      if (!c) {
        return `
          <div class="fin-op-panel fin-titulos-panel">
            <div class="fin-table-empty" style="padding:28px 16px">Selecione um cliente no cabeçalho do módulo para gerenciar títulos.</div>
          </div>`;
      }
      const tabs = [
        { id: "pagar", label: "Títulos a Pagar" },
        { id: "receber", label: "Títulos a Receber" },
      ];
      const cur = finDash.titulosSub === "receber" ? "receber" : "pagar";
      return `
        <div class="fin-op-panel fin-titulos-panel">
          <div class="cli-fin-audit-tabs" role="tablist" aria-label="Títulos a pagar e receber">
            ${tabs.map((t) => `
              <button type="button" class="cli-fin-audit-tab${cur === t.id ? " active" : ""}" role="tab" aria-selected="${cur === t.id}" data-fin-titulos-tab="${t.id}">${t.label}</button>
            `).join("")}
          </div>
          ${renderCliFinTitulosTable(c, cur)}
        </div>`;
    }

    function ensureFinPlanoContasState() {
      if (!finPlanoContas.modelos) {
        finPlanoContas.modelos = JSON.parse(JSON.stringify(FIN_PLANO_MODELOS_SEED));
      }
      if (!finPlanoContas.expanded) finPlanoContas.expanded = {};
      if (finPlanoContas.qContas == null) finPlanoContas.qContas = "";
      return finPlanoContas;
    }

    function getFinPlanoModeloById(id) {
      return ensureFinPlanoContasState().modelos.find((m) => m.id === id) || null;
    }

    function refreshFinPlanoUi() {
      const inFinPlano = finDash.tab === "plano"
        && document.getElementById("financeiroWrap")?.classList.contains("show");
      if (inFinPlano) renderFinModuleDash();
      else renderClientes();
    }

    function finPlanoEmpresaNome(id) {
      return FIN_PLANO_EMPRESAS_ASSESSORIA.find((e) => e.id === id)?.nome || "";
    }

    function finPlanoCentroNome(id) {
      return FIN_PLANO_CENTROS_CUSTO.find((c) => c.id === id)?.nome || "";
    }

    function finPlanoContaChildren(modelo, parentId) {
      return (modelo.contas || []).filter((c) => (c.parentId || null) === (parentId || null));
    }

    function finPlanoContaDepth(modelo, contaId, depth = 0) {
      const c = (modelo.contas || []).find((x) => x.id === contaId);
      if (!c || !c.parentId) return depth;
      return finPlanoContaDepth(modelo, c.parentId, depth + 1);
    }

    function finPlanoContasVisiveis(modelo) {
      const st = ensureFinPlanoContasState();
      const q = normalizeSearchText(st.qContas || "");
      const all = modelo.contas || [];
      if (!q) {
        const out = [];
        const walk = (parentId) => {
          finPlanoContaChildren(modelo, parentId).forEach((c) => {
            out.push(c);
            const kids = finPlanoContaChildren(modelo, c.id);
            if (kids.length && st.expanded[c.id] !== false) walk(c.id);
          });
        };
        walk(null);
        return out;
      }
      return all.filter((c) => normalizeSearchText(`${c.codigo} ${c.nome} ${c.descricao || ""}`).includes(q));
    }

    function renderFinPlanoContasPanel() {
      const st = ensureFinPlanoContasState();
      if (st.selectedId) {
        const modelo = getFinPlanoModeloById(st.selectedId);
        if (modelo) return renderFinPlanoModeloDetail(modelo);
        st.selectedId = null;
      }
      return renderFinPlanoModelosList();
    }

    function renderFinPlanoModelosList() {
      const q = normalizeSearchText(cliFinPlanoQuery);
      const modelos = ensureFinPlanoContasState().modelos.filter((m) =>
        !q || normalizeSearchText(`${m.nome} ${m.meta || ""}`).includes(q)
      );
      return `
        <div class="cli-fin-plano-head">
          <div class="proc-filter search">
            <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="search" id="cliFinPlanoSearch" placeholder="Buscar modelos de plano de contas" value="${(cliFinPlanoQuery || "").replace(/"/g, "&quot;")}" aria-label="Buscar modelos" />
          </div>
          <div class="cli-fin-plano-toolbar">
            <button type="button" class="btn-primary" data-cli-fin-plano="novo">Criar novo modelo</button>
            <button type="button" class="btn-ghost" data-cli-fin-plano="editar">Editar modelo universal</button>
            <button type="button" class="btn-ghost" data-cli-fin-plano="mapeamento">Mapeamento amplo</button>
          </div>
        </div>
        <div class="cli-fin-plano-list">
          ${modelos.length ? modelos.map((m) => `
            <button type="button" class="cli-fin-plano-item is-clickable" data-fin-plano-open="${m.id}">
              <strong class="cli-fin-plano-name">${uiSelectEscape(m.nome)}</strong>
              <span class="cli-fin-plano-meta">${uiSelectEscape(m.meta || "")}</span>
              <span class="proc-badge dept">${m.tipo === "universal" ? "Universal" : m.tipo === "setorial" ? "Setorial" : "Modelo"}</span>
            </button>`).join("") : `<div class="cli-empty-panel">Nenhum modelo encontrado</div>`}
        </div>`;
    }

    function renderFinPlanoModeloDetail(modelo) {
      const st = ensureFinPlanoContasState();
      const contas = finPlanoContasVisiveis(modelo);
      const empresa = finPlanoEmpresaNome(modelo.empresaId);
      const centro = finPlanoCentroNome(modelo.centroCustoId);
      const tipoLabel = (t) => (t === "analitico" ? "Analítico" : "Sintético");
      const natLabel = (n) => (n === "credora" ? "Credora" : "Devedora");

      const row = (c) => {
        const depth = finPlanoContaDepth(modelo, c.id);
        const kids = finPlanoContaChildren(modelo, c.id);
        const hasKids = kids.length > 0;
        const open = st.expanded[c.id] !== false;
        return `
          <div class="fin-plano-conta-row" style="--depth:${depth}" data-fin-plano-conta-id="${c.id}">
            <button type="button" class="fin-plano-conta-toggle${hasKids ? "" : " is-leaf"}" data-fin-plano-toggle="${c.id}" aria-expanded="${hasKids ? open : "false"}" ${hasKids ? "" : "disabled"} aria-label="${hasKids ? (open ? "Recolher" : "Expandir") : "Sem subcontas"}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <span class="fin-plano-conta-ico" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h16"/><path d="M4 4h16"/><path d="M8 8v8"/><path d="M16 8v8"/><path d="M8 12h8"/></svg>
            </span>
            <span class="fin-plano-conta-code">${uiSelectEscape(c.codigo)}</span>
            <strong class="fin-plano-conta-name">${uiSelectEscape(c.nome)}</strong>
            <div class="fin-plano-conta-tags">
              <span class="fin-plano-tag tipo-${c.tipo}">${tipoLabel(c.tipo)}</span>
              <span class="fin-plano-tag nat-${c.natureza}">${natLabel(c.natureza)}</span>
              ${c.ativa === false ? `<span class="fin-plano-tag is-off">Inativa</span>` : ""}
            </div>
            <div class="fin-plano-conta-acts">
              <button type="button" class="fin-plano-ico tip-bottom" data-fin-plano-conta="add" data-id="${c.id}" data-tip="Novo subplano" aria-label="Novo subplano">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
              </button>
              <button type="button" class="fin-plano-ico tip-bottom" data-fin-plano-conta="edit" data-id="${c.id}" data-tip="Editar conta" aria-label="Editar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              </button>
              <button type="button" class="fin-plano-ico is-danger tip-bottom" data-fin-plano-conta="del" data-id="${c.id}" data-tip="Excluir conta" aria-label="Excluir">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/></svg>
              </button>
            </div>
          </div>`;
      };

      return `
        <div class="fin-plano-detail">
          <div class="cli-fin-plano-head fin-plano-detail-head">
            <div class="proc-filter search">
              <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="search" id="finPlanoContasSearch" placeholder="Buscar contas…" value="${(st.qContas || "").replace(/"/g, "&quot;")}" aria-label="Buscar contas" />
            </div>
            <div class="cli-fin-plano-toolbar">
              <button type="button" class="btn-primary" data-cli-fin-plano="nova-conta">Nova conta</button>
              <button type="button" class="btn-ghost" data-cli-fin-plano="mapeamento">Mapeamento amplo</button>
            </div>
          </div>
          <div class="fin-plano-detail-bar">
            <nav class="fin-plano-crumb" aria-label="Navegação">
              <button type="button" class="fin-plano-crumb-link" data-cli-fin-plano="voltar">Modelos</button>
              <span class="fin-plano-crumb-sep" aria-hidden="true">›</span>
              <span class="fin-plano-crumb-current">${uiSelectEscape(modelo.nome)}</span>
            </nav>
            <div class="fin-plano-detail-toggles">
              <label class="cfg-switch">
                <span class="lab">Modelo Padrão</span>
                <input type="checkbox" id="finPlanoIsPadrao" ${modelo.isPadrao ? "checked" : ""} data-fin-plano-flag="padrao" />
              </label>
              <label class="cfg-switch">
                <span class="lab">Universal</span>
                <input type="checkbox" id="finPlanoIsUniversal" ${modelo.tipo === "universal" ? "checked" : ""} data-fin-plano-flag="universal" />
              </label>
            </div>
          </div>
          ${(empresa || centro) ? `
          <div class="fin-plano-detail-meta">
            ${empresa ? `<span><strong>Empresa:</strong> ${uiSelectEscape(empresa)}</span>` : ""}
            ${centro ? `<span><strong>Centro de custo:</strong> ${uiSelectEscape(centro)}</span>` : ""}
          </div>` : ""}
          <div class="fin-plano-conta-list" role="tree" aria-label="Contas do modelo">
            ${contas.length ? contas.map(row).join("") : `<div class="cli-empty-panel">Nenhuma conta neste modelo</div>`}
          </div>
        </div>`;
    }

    function openFinPlanoNovoModeloModal(opts = {}) {
      const editId = opts.editId || null;
      const modelo = editId ? getFinPlanoModeloById(editId) : null;
      const isEdit = !!modelo;
      const empOpts = FIN_PLANO_EMPRESAS_ASSESSORIA.map((e) =>
        `<option value="${e.id}" ${modelo?.empresaId === e.id ? "selected" : ""}>${uiSelectEscape(e.nome)}</option>`
      ).join("");
      const ccOpts = FIN_PLANO_CENTROS_CUSTO.map((c) =>
        `<option value="${c.id}" ${modelo?.centroCustoId === c.id ? "selected" : ""}>${uiSelectEscape(c.nome)}</option>`
      ).join("");

      openModal({
        title: isEdit ? "Editar Modelo de Plano de Contas" : "Novo Modelo de Plano de Contas",
        sub: isEdit ? "Atualize os dados do modelo" : "Informe o nome e vincule à empresa assessoria",
        body: `
          <div class="fin-plano-form">
            <label class="fin-field fin-field-wide">
              <span>Nome do Modelo <em>*</em></span>
              <input type="text" id="finPlanoModNome" placeholder="Ex.: MODELO UNIVERSAL CONTÁBIL" value="${uiSelectEscape(modelo?.nome || "")}" />
            </label>
            <label class="fin-field">
              <span>Empresa Assessoria <em>*</em></span>
              <select id="finPlanoModEmpresa">
                <option value="">Selecione…</option>
                ${empOpts}
              </select>
            </label>
            <label class="fin-field">
              <span>Centro de Custo</span>
              <select id="finPlanoModCentro">
                <option value="">Nenhum</option>
                ${ccOpts}
              </select>
            </label>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="finPlanoModSave">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>
            Salvar
          </button>`,
      });
      prepareFinConcModalChrome();
      modal.classList.add("fin-plano-form-modal");

      document.getElementById("finPlanoModSave")?.addEventListener("click", () => {
        const nome = (document.getElementById("finPlanoModNome")?.value || "").trim();
        const empresaId = document.getElementById("finPlanoModEmpresa")?.value || "";
        const centroCustoId = document.getElementById("finPlanoModCentro")?.value || "";
        if (!nome) {
          toast("Informe o nome do modelo");
          return;
        }
        if (!empresaId) {
          toast("Selecione a empresa assessoria");
          return;
        }
        const empNome = finPlanoEmpresaNome(empresaId);
        const ccNome = finPlanoCentroNome(centroCustoId);
        const metaBits = [
          modelo?.tipo === "universal" || !isEdit ? "Modelo" : (modelo.tipo === "setorial" ? "Setorial" : "Modelo"),
          empNome,
          ccNome || null,
        ].filter(Boolean);
        if (isEdit) {
          modelo.nome = nome;
          modelo.empresaId = empresaId;
          modelo.centroCustoId = centroCustoId;
          modelo.meta = metaBits.join(" · ");
          toast("Modelo atualizado");
          ensureFinPlanoContasState().selectedId = modelo.id;
        } else {
          const id = "pm" + Date.now().toString(36);
          ensureFinPlanoContasState().modelos.unshift({
            id,
            nome,
            meta: metaBits.join(" · "),
            tipo: "padrao",
            isPadrao: false,
            empresaId,
            centroCustoId,
            contas: [],
          });
          ensureFinPlanoContasState().selectedId = id;
          toast("Modelo criado");
        }
        closeModal();
        refreshFinPlanoUi();
      });
    }

    function openFinPlanoContaModal(opts = {}) {
      const st = ensureFinPlanoContasState();
      const modelo = getFinPlanoModeloById(st.selectedId);
      if (!modelo) {
        toast("Abra um modelo primeiro");
        return;
      }
      const editId = opts.editId || null;
      const parentId = opts.parentId || null;
      const conta = editId ? (modelo.contas || []).find((c) => c.id === editId) : null;
      const isEdit = !!conta;
      const parent = parentId ? (modelo.contas || []).find((c) => c.id === parentId) : null;

      const dreOpts = [
        { v: "", l: "Não classificar" },
        { v: "receita", l: "Receita" },
        { v: "deducao", l: "Dedução da receita" },
        { v: "custo", l: "Custo" },
        { v: "despesa", l: "Despesa" },
        { v: "resultado", l: "Resultado" },
      ].map((o) => `<option value="${o.v}" ${(conta?.dre || "") === o.v ? "selected" : ""}>${o.l}</option>`).join("");

      openModal({
        title: isEdit ? "Editar Conta Contábil" : "Nova Conta Contábil",
        sub: parent
          ? `Subconta de ${parent.codigo} — ${parent.nome}`
          : (isEdit ? "Altere os dados da conta" : "Cadastre uma conta no modelo selecionado"),
        body: `
          <div class="fin-plano-form">
            <label class="fin-field">
              <span>Código <em>*</em></span>
              <input type="text" id="finPlanoContaCodigo" placeholder="Ex.: 1.1.01" value="${uiSelectEscape(conta?.codigo || (parent ? parent.codigo + "." : ""))}" />
            </label>
            <label class="fin-field">
              <span>Nome <em>*</em></span>
              <input type="text" id="finPlanoContaNome" placeholder="Nome da conta" value="${uiSelectEscape(conta?.nome || "")}" />
            </label>
            <label class="fin-field fin-field-wide">
              <span>Descrição</span>
              <textarea id="finPlanoContaDesc" rows="2" placeholder="Descrição opcional">${uiSelectEscape(conta?.descricao || "")}</textarea>
            </label>
            <label class="fin-field">
              <span>Tipo <em>*</em></span>
              <select id="finPlanoContaTipo">
                <option value="sintetico" ${(conta?.tipo || "sintetico") === "sintetico" ? "selected" : ""}>Sintético</option>
                <option value="analitico" ${conta?.tipo === "analitico" ? "selected" : ""}>Analítico</option>
              </select>
            </label>
            <label class="fin-field">
              <span>Natureza <em>*</em></span>
              <select id="finPlanoContaNatureza">
                <option value="devedora" ${(conta?.natureza || "devedora") === "devedora" ? "selected" : ""}>Devedora</option>
                <option value="credora" ${conta?.natureza === "credora" ? "selected" : ""}>Credora</option>
              </select>
            </label>
            <label class="fin-field fin-field-wide">
              <span>Classificação DRE</span>
              <select id="finPlanoContaDre">${dreOpts}</select>
            </label>
            <div class="fin-plano-form-toggles">
              <label class="cfg-switch">
                <span class="lab">Conta Ativa</span>
                <input type="checkbox" id="finPlanoContaAtiva" ${!conta || conta.ativa !== false ? "checked" : ""} />
              </label>
              <label class="cfg-switch">
                <span class="lab">Aceita Lançamentos</span>
                <input type="checkbox" id="finPlanoContaAceita" ${conta ? (conta.aceitaLancamentos ? "checked" : "") : ""} />
              </label>
            </div>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="finPlanoContaSave">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>
            Salvar
          </button>`,
      });
      prepareFinConcModalChrome();
      modal.classList.add("fin-plano-form-modal");

      const syncAceita = () => {
        const tipo = document.getElementById("finPlanoContaTipo")?.value;
        const aceita = document.getElementById("finPlanoContaAceita");
        if (!aceita || isEdit) return;
        if (tipo === "analitico" && !aceita.dataset.touched) aceita.checked = true;
        if (tipo === "sintetico" && !aceita.dataset.touched) aceita.checked = false;
      };
      document.getElementById("finPlanoContaTipo")?.addEventListener("change", syncAceita);
      document.getElementById("finPlanoContaAceita")?.addEventListener("change", (e) => {
        e.target.dataset.touched = "1";
      });
      syncAceita();

      document.getElementById("finPlanoContaSave")?.addEventListener("click", () => {
        const codigo = (document.getElementById("finPlanoContaCodigo")?.value || "").trim();
        const nome = (document.getElementById("finPlanoContaNome")?.value || "").trim();
        const descricao = (document.getElementById("finPlanoContaDesc")?.value || "").trim();
        const tipo = document.getElementById("finPlanoContaTipo")?.value || "sintetico";
        const natureza = document.getElementById("finPlanoContaNatureza")?.value || "devedora";
        const dre = document.getElementById("finPlanoContaDre")?.value || "";
        const ativa = !!document.getElementById("finPlanoContaAtiva")?.checked;
        const aceitaLancamentos = !!document.getElementById("finPlanoContaAceita")?.checked;
        if (!codigo || !nome) {
          toast("Informe código e nome");
          return;
        }
        if (isEdit) {
          Object.assign(conta, { codigo, nome, descricao, tipo, natureza, dre, ativa, aceitaLancamentos });
          toast("Conta atualizada");
        } else {
          const id = "pc" + Date.now().toString(36);
          modelo.contas.push({
            id,
            codigo,
            nome,
            descricao,
            tipo,
            natureza,
            dre,
            ativa,
            aceitaLancamentos,
            parentId: parentId || null,
          });
          if (parentId) st.expanded[parentId] = true;
          toast("Conta criada");
        }
        closeModal();
        refreshFinPlanoUi();
      });
    }

    function handleFinPlanoContasClick(e) {
      const openBtn = e.target.closest("[data-fin-plano-open]");
      if (openBtn) {
        ensureFinPlanoContasState().selectedId = openBtn.dataset.finPlanoOpen;
        ensureFinPlanoContasState().qContas = "";
        refreshFinPlanoUi();
        return true;
      }

      const toggle = e.target.closest("[data-fin-plano-toggle]");
      if (toggle && !toggle.disabled) {
        const id = toggle.dataset.finPlanoToggle;
        const st = ensureFinPlanoContasState();
        st.expanded[id] = st.expanded[id] === false;
        refreshFinPlanoUi();
        return true;
      }

      const flag = e.target.closest("[data-fin-plano-flag]");
      if (flag && e.target.matches("input")) {
        const modelo = getFinPlanoModeloById(ensureFinPlanoContasState().selectedId);
        if (!modelo) return true;
        if (flag.dataset.finPlanoFlag === "padrao") {
          if (e.target.checked) {
            ensureFinPlanoContasState().modelos.forEach((m) => { m.isPadrao = m.id === modelo.id; });
          } else {
            modelo.isPadrao = false;
          }
          toast(e.target.checked ? "Definido como modelo padrão" : "Modelo padrão removido");
        } else if (flag.dataset.finPlanoFlag === "universal") {
          modelo.tipo = e.target.checked ? "universal" : "padrao";
          toast(e.target.checked ? "Marcado como universal" : "Tipo atualizado");
        }
        refreshFinPlanoUi();
        return true;
      }

      const contaAct = e.target.closest("[data-fin-plano-conta]");
      if (contaAct) {
        const act = contaAct.dataset.finPlanoConta;
        const id = contaAct.dataset.id;
        const modelo = getFinPlanoModeloById(ensureFinPlanoContasState().selectedId);
        if (!modelo) return true;
        if (act === "add") openFinPlanoContaModal({ parentId: id });
        else if (act === "edit") openFinPlanoContaModal({ editId: id });
        else if (act === "del") {
          const kids = finPlanoContaChildren(modelo, id);
          if (kids.length) {
            toast("Remova as subcontas antes de excluir");
            return true;
          }
          modelo.contas = modelo.contas.filter((c) => c.id !== id);
          toast("Conta excluída");
          refreshFinPlanoUi();
        }
        return true;
      }

      const planoAction = e.target.closest("[data-cli-fin-plano]");
      if (planoAction) {
        const kind = planoAction.dataset.cliFinPlano;
        if (kind === "novo") openFinPlanoNovoModeloModal();
        else if (kind === "editar") {
          const uni = ensureFinPlanoContasState().modelos.find((m) => m.tipo === "universal" && m.isPadrao)
            || ensureFinPlanoContasState().modelos.find((m) => m.tipo === "universal")
            || ensureFinPlanoContasState().modelos[0];
          if (uni) {
            ensureFinPlanoContasState().selectedId = uni.id;
            openFinPlanoNovoModeloModal({ editId: uni.id });
          } else toast("Nenhum modelo universal encontrado");
        } else if (kind === "voltar") {
          ensureFinPlanoContasState().selectedId = null;
          ensureFinPlanoContasState().qContas = "";
          refreshFinPlanoUi();
        } else if (kind === "nova-conta") openFinPlanoContaModal();
        else if (kind === "mapeamento") openFinPlanoMapeamentoModal();
        return true;
      }
      return false;
    }

    function renderFinPlanoPanel() {
      const c = resolveFinAuditCliente();
      if (!c) {
        return `
          <div class="fin-op-panel fin-plano-panel">
            <div class="fin-table-empty" style="padding:28px 16px">Selecione um cliente no cabeçalho do módulo para gerenciar o plano de contas.</div>
          </div>`;
      }
      return `
        <div class="fin-op-panel fin-plano-panel">
          ${renderCliFinPlanoTab()}
        </div>`;
    }

    function ensureFinPlanoMapState() {
      if (!finDash.planoMap) {
        finDash.planoMap = { q: "", selectedFinId: null, maps: null, prefixo: "", bancoIds: null, contabilExtra: null };
      }
      if (!finDash.planoMap.maps) {
        finDash.planoMap.maps = JSON.parse(JSON.stringify(FIN_PLANO_MAP_SEED));
      }
      if (!finDash.planoMap.bancoIds) {
        finDash.planoMap.bancoIds = { b1: "3746", b2: "3714", b3: "9" };
      }
      if (!finDash.planoMap.contabilExtra) finDash.planoMap.contabilExtra = [];
      if (finDash.planoMap.prefixo == null) finDash.planoMap.prefixo = "";
      return finDash.planoMap;
    }

    function getFinPlanoFinanceiroList() {
      return FIN_PLANO_FINANCEIRO_SEED.map((x) => ({ ...x }));
    }

    function getFinPlanoContabilList() {
      ensureFinPlanoMapState();
      const prefix = finDash.planoMap.prefixo || "";
      return [...FIN_PLANO_CONTABIL_SEED, ...(finDash.planoMap.contabilExtra || [])].map((x) => ({
        ...x,
        codigoExib: prefix ? `${prefix}${x.codigo}` : x.codigo,
      }));
    }

    function finPlanoMapCount(finId) {
      const maps = ensureFinPlanoMapState().maps;
      return (maps[finId] || []).length;
    }

    function finPlanoContabilMapCount(contabilId) {
      const maps = ensureFinPlanoMapState().maps;
      return Object.values(maps).reduce((n, arr) => n + (arr.includes(contabilId) ? 1 : 0), 0);
    }

    function openFinPlanoMapeamentoModal() {
      const st = ensureFinPlanoMapState();
      const q = normalizeSearchText(st.q || "");
      const finList = getFinPlanoFinanceiroList().filter((a) =>
        !q || normalizeSearchText(`${a.codigo} ${a.nome} ${a.id}`).includes(q)
      );
      const contList = getFinPlanoContabilList().filter((a) =>
        !q || normalizeSearchText(`${a.codigoExib} ${a.nome} ${a.id}`).includes(q)
      );
      const selected = st.selectedFinId;

      const rowFin = (a) => {
        const n = finPlanoMapCount(a.id);
        const active = selected === a.id;
        return `
          <article class="fin-pmap-item${active ? " is-active" : ""}${n ? " is-mapped" : ""}" data-fin-pmap-fin="${a.id}">
            <div class="fin-pmap-item-main">
              <strong>${uiSelectEscape(a.codigo)} - ${uiSelectEscape(a.nome)}</strong>
              <span class="fin-pmap-id">ID: ${uiSelectEscape(a.id)}</span>
            </div>
            <div class="fin-pmap-item-acts">
              <button type="button" class="fin-pmap-ico tip-bottom" data-fin-pmap="associar" data-id="${a.id}" data-tip="Associar a planos contábeis" aria-label="Associar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                ${n ? `<span class="fin-pmap-badge">${n}</span>` : ""}
              </button>
              ${n ? `
              <button type="button" class="fin-pmap-ico tip-bottom" data-fin-pmap="edit-fin" data-id="${a.id}" data-tip="Editar associação" aria-label="Editar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              </button>` : ""}
            </div>
          </article>`;
      };

      const rowCont = (a) => {
        const n = finPlanoContabilMapCount(a.id);
        return `
          <article class="fin-pmap-item${n ? " is-mapped" : ""}" data-fin-pmap-cont="${a.id}">
            <div class="fin-pmap-item-main">
              <strong>${uiSelectEscape(a.codigoExib)} - ${uiSelectEscape(a.nome)}</strong>
              <span class="fin-pmap-id">ID: ${uiSelectEscape(a.id)}</span>
            </div>
            <div class="fin-pmap-item-acts">
              ${n ? `<span class="fin-pmap-link-count" title="Vínculos"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><i>${n}</i></span>` : ""}
              ${n ? `
              <button type="button" class="fin-pmap-ico tip-bottom" data-fin-pmap="edit-cont" data-id="${a.id}" data-tip="Editar" aria-label="Editar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              </button>` : ""}
              <button type="button" class="fin-pmap-ico is-danger tip-bottom" data-fin-pmap="del-cont" data-id="${a.id}" data-tip="Excluir" aria-label="Excluir">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/></svg>
              </button>
            </div>
          </article>`;
      };

      openModal({
        title: "Mapeamento de Planos de Contas",
        sub: "Relacione o plano financeiro (Processo Ágil) com os planos contábeis importados de outros sistemas",
        wide: true,
        body: `
          <div class="fin-pmap">
            <div class="fin-pmap-cols">
              <section class="fin-pmap-col" aria-label="Plano Financeiro">
                <header class="fin-pmap-col-head">
                  <h4>Plano Financeiro <span>(${finList.length})</span></h4>
                    <div class="proc-filter search fin-gerar-plano-search fin-pmap-col-search">
                      <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                      <input type="search" id="finPmapQ" placeholder="Buscar por código ou nome…" value="${(st.q || "").replace(/"/g, "&quot;")}" aria-label="Buscar planos" />
                    </div>
                </header>
                <div class="fin-pmap-list">
                  ${finList.length ? finList.map(rowFin).join("") : `<div class="fin-pmap-empty">Nenhuma conta financeira</div>`}
                </div>
              </section>
              <section class="fin-pmap-col" aria-label="Planos Contábeis">
                <header class="fin-pmap-col-head">
                  <h4>Planos Contábeis <span>(${contList.length})</span></h4>
                </header>
                <div class="fin-pmap-list">
                  ${contList.length ? contList.map(rowCont).join("") : `<div class="fin-pmap-empty">Nenhum plano contábil</div>`}
                </div>
              </section>
            </div>
          </div>`,
        foot: `
          <div class="fin-pmap-foot-left">
            <button type="button" class="btn-ghost" data-fin-pmap="bancos">Bancos</button>
            <button type="button" class="btn-ghost" data-fin-pmap="layout">Configurar layout</button>
            <button type="button" class="btn-outline" data-fin-pmap="novo-cont">+ Novo plano contábil</button>
          </div>
          <div class="fin-pmap-foot-right">
            <button type="button" class="btn-primary" data-fin-pmap="import">Importar PDF/Excel</button>
            <button type="button" class="btn-ghost" data-close>Fechar</button>
          </div>`,
      });

      prepareFinConcModalChrome();
      modal.classList.add("fin-pmap-modal");

      document.getElementById("finPmapQ")?.addEventListener("input", (ev) => {
        ensureFinPlanoMapState().q = ev.target.value || "";
        openFinPlanoMapeamentoModal();
      });

      const bindPmap = (root) => {
        root.querySelectorAll("[data-fin-pmap]").forEach((btn) => {
          btn.addEventListener("click", (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            const act = btn.dataset.finPmap;
            const id = btn.dataset.id;
            if (act === "associar" && id) {
              ensureFinPlanoMapState().selectedFinId = id;
              openFinPlanoAssociarModal(id);
            } else if (act === "bancos") openFinPlanoBancosDeParaModal();
            else if (act === "layout") openFinPlanoLayoutModal();
            else if (act === "novo-cont") openFinPlanoNovoContabilModal();
            else if (act === "import") {
              toast("Importação de PDF/Excel · protótipo — contas entram em Planos Contábeis");
              const extra = ensureFinPlanoMapState().contabilExtra;
              const nid = String(400 + extra.length + 1);
              extra.push({ id: nid, codigo: `IMP.${extra.length + 1}`, nome: `Conta importada ${extra.length + 1}`, origem: "import" });
              openFinPlanoMapeamentoModal();
            } else if (act === "edit-fin" && id) {
              openFinPlanoAssociarModal(id);
            } else if (act === "edit-cont") toast("Editar plano contábil (protótipo)");
            else if (act === "del-cont" && id) {
              const st2 = ensureFinPlanoMapState();
              st2.contabilExtra = (st2.contabilExtra || []).filter((x) => x.id !== id);
              Object.keys(st2.maps).forEach((fid) => {
                st2.maps[fid] = (st2.maps[fid] || []).filter((cid) => cid !== id);
              });
              toast("Plano contábil removido do mapeamento");
              openFinPlanoMapeamentoModal();
            }
          });
        });
        root.querySelectorAll("[data-fin-pmap-fin]").forEach((el) => {
          el.addEventListener("click", (ev) => {
            if (ev.target.closest("[data-fin-pmap]")) return;
            ensureFinPlanoMapState().selectedFinId = el.dataset.finPmapFin;
            openFinPlanoMapeamentoModal();
          });
        });
      };
      bindPmap(modalBody);
      bindPmap(modalFoot);
    }

    function openFinPlanoAssociarModal(finId) {
      const fin = getFinPlanoFinanceiroList().find((x) => x.id === finId);
      if (!fin) {
        toast("Conta financeira não encontrada");
        return;
      }
      const st = ensureFinPlanoMapState();
      const linked = new Set(st.maps[finId] || []);
      let selected = new Set(linked);

      const paint = () => {
        const list = getFinPlanoContabilList();
        const wrap = document.getElementById("finPmapAssocList");
        const meta = document.getElementById("finPmapAssocMeta");
        if (meta) meta.textContent = `${selected.size} selecionado(s)`;
        if (!wrap) return;
        wrap.innerHTML = list.length ? list.map((a) => `
          <label class="fin-pmap-assoc-row">
            <input type="checkbox" data-fin-pmap-assoc-id="${a.id}" ${selected.has(a.id) ? "checked" : ""} />
            <span class="fin-pmap-assoc-txt">
              <strong>${uiSelectEscape(a.codigoExib)} - ${uiSelectEscape(a.nome)}</strong>
              <span class="fin-pmap-id">ID: ${uiSelectEscape(a.id)}</span>
            </span>
          </label>`).join("") : `<div class="fin-pmap-empty">Nenhum plano encontrado</div>`;
        wrap.querySelectorAll("[data-fin-pmap-assoc-id]").forEach((chk) => {
          chk.addEventListener("change", () => {
            const cid = chk.dataset.finPmapAssocId;
            if (chk.checked) selected.add(cid);
            else selected.delete(cid);
            if (meta) meta.textContent = `${selected.size} selecionado(s)`;
          });
        });
      };

      openModal({
        title: `${fin.codigo} - ${fin.nome}`,
        sub: "Associar a planos contábeis",
        wide: true,
        body: `
          <div class="fin-pmap-assoc">
            <div class="fin-pmap-assoc-toolbar">
              <span class="fin-pmap-assoc-meta" id="finPmapAssocMeta">0 selecionado(s)</span>
            </div>
            <div class="fin-pmap-assoc-list" id="finPmapAssocList"></div>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" id="finPmapAssocCreate">+ Criar novo plano contábil</button>
          <span class="fin-pmap-foot-spacer"></span>
          <button type="button" class="btn-ghost" id="finPmapAssocCancel">Cancelar</button>
          <button type="button" class="btn-primary" id="finPmapAssocSave">Concluir</button>`,
      });
      prepareFinConcModalChrome();
      paint();

      document.getElementById("finPmapAssocCancel")?.addEventListener("click", () => openFinPlanoMapeamentoModal());
      document.getElementById("finPmapAssocCreate")?.addEventListener("click", () => openFinPlanoNovoContabilModal({ returnTo: "associar", finId }));
      document.getElementById("finPmapAssocSave")?.addEventListener("click", () => {
        ensureFinPlanoMapState().maps[finId] = [...selected];
        toast(`Associação salva · ${selected.size} plano(s) contábil(is)`);
        openFinPlanoMapeamentoModal();
      });
    }

    function openFinPlanoNovoContabilModal(opts = {}) {
      const returnTo = opts.returnTo || "map";
      const finId = opts.finId || "";
      openModal({
        title: "Novo Plano Contábil",
        sub: "Cadastre uma conta no lado contábil do mapeamento",
        body: `
          <div class="fin-pmap-novo">
            <label class="fin-field">
              <span>Código</span>
              <input type="text" id="finPmapNovoCodigo" placeholder="Ex.: 3.1.99" />
            </label>
            <label class="fin-field">
              <span>Nome</span>
              <input type="text" id="finPmapNovoNome" placeholder="Nome da conta contábil" />
            </label>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" id="finPmapNovoCancel">Cancelar</button>
          <button type="button" class="btn-primary" id="finPmapNovoSave">Criar plano</button>`,
      });
      prepareFinConcModalChrome();

      const goBack = () => {
        if (returnTo === "associar" && finId) openFinPlanoAssociarModal(finId);
        else openFinPlanoMapeamentoModal();
      };
      document.getElementById("finPmapNovoCancel")?.addEventListener("click", goBack);
      document.getElementById("finPmapNovoSave")?.addEventListener("click", () => {
        const codigo = (document.getElementById("finPmapNovoCodigo")?.value || "").trim();
        const nome = (document.getElementById("finPmapNovoNome")?.value || "").trim();
        if (!codigo || !nome) {
          toast("Informe código e nome");
          return;
        }
        const id = String(500 + (ensureFinPlanoMapState().contabilExtra.length || 0) + Date.now() % 1000);
        ensureFinPlanoMapState().contabilExtra.push({ id, codigo, nome, origem: "manual" });
        toast("Plano contábil criado");
        goBack();
      });
    }

    function openFinPlanoLayoutModal() {
      const st = ensureFinPlanoMapState();
      openModal({
        title: "Configurar layout",
        sub: "Preferências de exibição do mapeamento",
        body: `
          <div class="fin-pmap-layout">
            <button type="button" class="fin-pmap-layout-row" id="finPmapPrefixoBtn">
              <span>
                <strong>Prefixo padrão</strong>
                <span class="fin-pmap-layout-sub">${st.prefixo ? uiSelectEscape(st.prefixo) : "Nenhum prefixo configurado"}</span>
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            <div class="fin-pmap-prefixo-edit" id="finPmapPrefixoEdit" hidden>
              <label class="fin-field">
                <span>Prefixo aplicado aos códigos contábeis</span>
                <input type="text" id="finPmapPrefixoInput" value="${uiSelectEscape(st.prefixo || "")}" placeholder="Ex.: EXT-" maxlength="12" />
              </label>
              <button type="button" class="btn-primary" id="finPmapPrefixoSave">Salvar prefixo</button>
            </div>
          </div>`,
        foot: `<button type="button" class="btn-ghost" id="finPmapLayoutClose">Fechar</button>`,
      });
      prepareFinConcModalChrome();
      document.getElementById("finPmapLayoutClose")?.addEventListener("click", () => openFinPlanoMapeamentoModal());
      document.getElementById("finPmapPrefixoBtn")?.addEventListener("click", () => {
        const box = document.getElementById("finPmapPrefixoEdit");
        if (box) box.hidden = !box.hidden;
      });
      document.getElementById("finPmapPrefixoSave")?.addEventListener("click", () => {
        ensureFinPlanoMapState().prefixo = (document.getElementById("finPmapPrefixoInput")?.value || "").trim();
        toast(finDash.planoMap.prefixo ? `Prefixo: ${finDash.planoMap.prefixo}` : "Prefixo removido");
        openFinPlanoLayoutModal();
      });
    }

    function openFinPlanoBancosDeParaModal() {
      ensureFinPlanoMapState();
      const bancos = ensureFinConcBancos();
      openModal({
        title: "De/Para de Bancos",
        sub: "Defina o ID do banco no sistema de destino usado na exportação contábil.",
        wide: true,
        body: `
          <div class="fin-pmap-bancos">
            ${bancos.map((b) => `
              <div class="fin-pmap-banco-row">
                <div class="fin-pmap-banco-info">
                  <strong>${uiSelectEscape(b.codigo)} - ${uiSelectEscape(b.nome)}</strong>
                  <span>Agência: ${uiSelectEscape(b.agencia)} · Conta: ${uiSelectEscape(finConcBancoContaLabel(b))} · Tipo: ${uiSelectEscape((b.tipoConta || "Corrente").toUpperCase())}</span>
                </div>
                <label class="fin-pmap-banco-id">
                  <span>ID destino</span>
                  <input type="text" data-fin-pmap-banco-id="${b.id}" value="${uiSelectEscape(finDash.planoMap.bancoIds[b.id] || "")}" inputmode="numeric" />
                </label>
              </div>`).join("")}
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" id="finPmapBancosCancel">Cancelar</button>
          <button type="button" class="btn-primary" id="finPmapBancosSave">Salvar</button>`,
      });
      prepareFinConcModalChrome();
      document.getElementById("finPmapBancosCancel")?.addEventListener("click", () => openFinPlanoMapeamentoModal());
      document.getElementById("finPmapBancosSave")?.addEventListener("click", () => {
        modalBody.querySelectorAll("[data-fin-pmap-banco-id]").forEach((inp) => {
          ensureFinPlanoMapState().bancoIds[inp.dataset.finPmapBancoId] = (inp.value || "").trim();
        });
        toast("De/para de bancos salvo");
        openFinPlanoMapeamentoModal();
      });
    }

