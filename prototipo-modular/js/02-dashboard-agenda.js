    function syncDashHistoryHeight() {
      const dept = document.querySelector(".dash-low > .dash-dept");
      const hist = document.querySelector(".dash-low > .dash-history");
      if (!dept || !hist) return;
      if (window.matchMedia("(max-width: 1100px)").matches) {
        hist.style.height = "";
        hist.style.maxHeight = "";
        return;
      }
      hist.style.height = "auto";
      hist.style.maxHeight = "none";
      const h = Math.round(dept.getBoundingClientRect().height);
      if (h > 0) {
        hist.style.height = `${h}px`;
        hist.style.maxHeight = `${h}px`;
      }
    }

    let dashHistorySyncTimer = 0;
    window.addEventListener("resize", () => {
      clearTimeout(dashHistorySyncTimer);
      dashHistorySyncTimer = setTimeout(syncDashHistoryHeight, 80);
    });

    /* PENDENCIAS-HOJE-START */
    const DASH_TODAY_ISO = "2026-07-14";

    function buildDashPendencias() {
      const scope = selectedEmpresaId;
      const scopeOk = (clienteId) => scope === "all" || clienteId === scope;
      const items = [];

      const doneStatus = new Set([
        "entregue", "concluida", "ent-antecipada", "ent-justificada",
        "dispensada", "dispensada-f-prazo", "dispensa-justificada",
      ]);
      const urgentEntrega = new Set(["atrasada", "ent-atrasada", "justificativa-atrasada"]);

      agendaTasks.filter((t) => !t.arquivada && scopeOk(t.clienteId)).forEach((t) => {
        if (doneStatus.has(t.status)) return;
        const isToday = t.date === DASH_TODAY_ISO;
        const isUrgent = urgentEntrega.has(t.status) || t.date < DASH_TODAY_ISO;
        if (!isToday && !isUrgent) return;
        const st = procStatusMeta(t.status);
        items.push({
          kind: "entrega",
          id: t.id,
          priority: isUrgent ? 1 : 3,
          urgent: isUrgent,
          warn: false,
          title: t.nome,
          sub: `${t.razaoSocial} · ${t.responsavel || "—"}`,
          tag: isUrgent ? "Atrasada" : (st.label || "Hoje"),
          tagCls: isUrgent ? "urgent" : "",
          cta: "Abrir entrega",
          ico: "entrega",
        });
      });

      const procs = sections.find((s) => s.id === "processos")?.items || [];
      procs.filter((p) => !p.arquivado && scopeOk(p.clienteId)).forEach((p) => {
        const st = procStatusMeta(p.status);
        const isLate = p.status === "atrasada" || p.sucesso === false;
        const isOpen = p.sucesso === null || isLate;
        if (!isOpen) return;
        items.push({
          kind: "processo",
          id: p.id,
          priority: isLate ? 2 : 4,
          urgent: isLate,
          warn: false,
          title: p.title,
          sub: `${p.cliente || "—"} · ${p.responsavel || "—"} · ${p.dept || "—"}`,
          tag: st.label || "Em andamento",
          tagCls: isLate ? "urgent" : "",
          cta: "Abrir processo",
          ico: "processo",
          clsExtra: "is-proc",
        });
      });

      getCertificadosMonitor()
        .filter((r) => (r.status === "vencido" || r.status === "a-vencer") && scopeOk(r.id))
        .forEach((r) => {
          const vencido = r.status === "vencido";
          items.push({
            kind: "cert",
            id: r.id,
            priority: vencido ? 0 : 5,
            urgent: vencido,
            warn: !vencido,
            title: `Certificado · ${r.fantasia || r.razaoSocial}`,
            sub: r.validadeLabel || r.meta?.label || "Exige atenção",
            tag: vencido ? "Vencido" : "A vencer",
            tagCls: vencido ? "urgent" : "warn",
            cta: "Ver segurança",
            ico: "cert",
          });
        });

      return items
        .sort((a, b) => a.priority - b.priority || String(a.title).localeCompare(String(b.title), "pt-BR"))
        .slice(0, 8);
    }

    function dashPendIco(kind) {
      if (kind === "cert") {
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
      }
      if (kind === "processo") {
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`;
      }
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`;
    }

    function renderDashPendencias() {
      const list = document.getElementById("dashPendenciasList");
      const countEl = document.getElementById("dashPendenciasCount");
      const subEl = document.getElementById("dashPendenciasSub");
      if (!list) return;
      const items = buildDashPendencias();
      if (countEl) countEl.textContent = String(items.length);
      if (subEl) {
        subEl.textContent = selectedEmpresaId === "all"
          ? "Fila acionável · entrega, processo e certificado"
          : "Fila filtrada pela empresa selecionada";
      }
      if (!items.length) {
        list.innerHTML = `<div class="dash-pend-empty">Nenhuma pendência crítica para hoje neste escopo.</div>`;
        return;
      }
      list.innerHTML = items.map((it) => `
        <button type="button" class="dash-pend-item${it.urgent ? " is-urgent" : ""}${it.warn ? " is-warn" : ""}${it.clsExtra ? ` ${it.clsExtra}` : ""}"
          role="listitem" data-dash-pend="${it.kind}" data-dash-id="${it.id}"
          aria-label="${it.cta}: ${it.title}">
          <span class="dash-pend-ico" aria-hidden="true">${dashPendIco(it.ico)}</span>
          <span class="dash-pend-body">
            <strong>${it.title}</strong>
            <span>${it.sub}</span>
          </span>
          <span class="dash-pend-meta">
            <span class="tag ${it.tagCls || ""}">${it.tag}</span>
            <span class="cta">${it.cta} →</span>
          </span>
        </button>
      `).join("");
    }

    function handleDashPendencia(kind, id) {
      if (kind === "entrega") {
        openEntregaDetailModal(id);
        return;
      }
      if (kind === "processo") {
        const proc = sections.find((s) => s.id === "processos")?.items.find((p) => String(p.id) === String(id));
        if (proc) openKanbanEtapasModal(proc);
        else toast("Processo não encontrado");
        return;
      }
      if (kind === "cert") {
        gotoSecurityCertAcao();
      }
    }
    /* PENDENCIAS-HOJE-END */

    function filterChecks() {
      return [...document.querySelectorAll('#filterOptions input[name="dashFilter"]')];
    }

    function selectedFilters() {
      return filterChecks().filter((c) => c.checked).map((c) => c.value);
    }

    function viewFilterMode() {
      return current === "financeiro" ? "financeiro" : "visao";
    }

    function syncFilterPanel() {
      const mode = viewFilterMode();
      const opts = mode === "financeiro" ? FIN_FILTER_OPTS : DASH_FILTER_OPTS;
      const state = viewFilterState[mode];
      const panel = document.getElementById("filterOptions");
      const filterPanel = document.getElementById("filterPanel");
      const title = filterPanel?.querySelector("h5");
      const hint = filterPanel?.querySelector(".filter-hint");
      if (!panel) return;
      if (title) title.textContent = mode === "financeiro" ? "Filtrar módulo contábil" : "Filtrar dashboard";
      if (hint) {
        hint.textContent = mode === "financeiro"
          ? "Escolha quais blocos deseja visualizar. A exportação usará o mesmo filtro."
          : "Escolha o que deseja visualizar. A exportação usará o mesmo filtro.";
      }
      filterPanel?.setAttribute("aria-label", mode === "financeiro" ? "Filtros do módulo contábil" : "Filtros do dashboard");
      filterBtn?.setAttribute("data-tip", mode === "financeiro" ? "Filtrar visão do financeiro" : "Filtrar visão do dashboard");
      filterBtn?.setAttribute("aria-label", mode === "financeiro" ? "Filtrar financeiro" : "Filtrar dashboard");
      panel.innerHTML = opts.map((o) =>
        `<label class="filter-option"><input type="checkbox" name="dashFilter" value="${o.value}" ${state[o.value] !== false ? "checked" : ""}> ${o.label}</label>`
      ).join("");
      applyViewFilters();
    }

    function applyDashFilters() {
      applyViewFilters();
    }

    function applyViewFilters() {
      const mode = viewFilterMode();
      const opts = mode === "financeiro" ? FIN_FILTER_OPTS : DASH_FILTER_OPTS;
      const optValues = new Set(opts.map((o) => o.value));
      const state = viewFilterState[mode];
      const all = filterChecks();
      const domMatches = all.length > 0 && all.every((c) => optValues.has(c.value));

      let active;
      if (domMatches) {
        all.forEach((c) => { state[c.value] = c.checked; });
        active = new Set(all.filter((c) => c.checked).map((c) => c.value));
      } else {
        active = new Set(opts.filter((o) => state[o.value] !== false).map((o) => o.value));
      }

      if (mode === "financeiro") {
        document.querySelectorAll("#financeiroWrap [data-fin-filter]").forEach((el) => {
          el.hidden = !active.has(el.dataset.finFilter);
        });
        const ops = document.querySelector("#financeiroWrap .fin-dash-ops");
        if (ops) {
          const kids = [...ops.children];
          ops.hidden = kids.length > 0 && kids.every((k) => k.hidden);
        }
      } else {
        document.querySelectorAll("#dashboard [data-filter]").forEach((el) => {
          el.hidden = !active.has(el.dataset.filter);
        });
      }

      const checkedCount = opts.filter((o) => active.has(o.value)).length;
      const partial = checkedCount > 0 && checkedCount < opts.length;
      const none = checkedCount === 0;
      filterBtn?.classList.toggle("active", partial || none);
    }

    function toast(msg, opts) {
      const el = document.getElementById("toast");
      if (!el || !msg) return;
      el.textContent = msg;
      el.classList.toggle("is-success", !!(opts && opts.success));
      el.classList.add("show");
      clearTimeout(cliCadastroToastTimer);
      cliCadastroToastTimer = setTimeout(() => el.classList.remove("show"), 2800);
    }

    function uiSelectEscape(s) {
      return String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function closeAllUiSelects(except) {
      document.querySelectorAll(".ui-select.open").forEach((el) => {
        if (except && el === except) return;
        el.classList.remove("open");
        el.querySelector(".ui-select-btn")?.setAttribute("aria-expanded", "false");
      });
    }

    function syncUiSelect(sel) {
      const wrap = sel?.closest?.(".ui-select");
      if (!wrap) return;
      const opt = sel.options[sel.selectedIndex];
      const label = wrap.querySelector(".ui-select-label");
      if (label) label.textContent = opt ? opt.textContent : (sel.getAttribute("aria-label") || "Selecionar");
      wrap.querySelectorAll(".ui-select-opt").forEach((btn) => {
        btn.classList.toggle("active", (btn.dataset.value || "") === sel.value);
      });
      const btn = wrap.querySelector(".ui-select-btn");
      if (btn) btn.disabled = !!sel.disabled;
      wrap.classList.toggle("is-disabled", !!sel.disabled);
    }

    function rebuildUiSelectMenu(sel) {
      const wrap = sel?.closest?.(".ui-select");
      const menu = wrap?.querySelector(".ui-select-menu");
      if (!menu) return;
      menu.innerHTML = [...sel.options].map((o) => `
        <button type="button" class="ui-select-opt${o.value === sel.value ? " active" : ""}" role="option"
          data-value="${uiSelectEscape(o.value)}" ${o.disabled ? "disabled" : ""}>${uiSelectEscape(o.textContent)}</button>
      `).join("");
      syncUiSelect(sel);
    }

    function enhanceUiSelect(sel) {
      if (!sel || sel.tagName !== "SELECT" || sel.multiple || sel.size > 1) return;
      if (sel.dataset.noUi === "1" || sel.closest(".agenda-ops-status")) return;
      if (sel.dataset.uiSelect === "1") {
        rebuildUiSelectMenu(sel);
        return;
      }

      const parent = sel.parentElement;
      if (!parent) return;
      const standalone = !parent.classList.contains("proc-filter")
        && !parent.classList.contains("cli-fin-period-field");

      const wrap = document.createElement("div");
      wrap.className = "ui-select" + (standalone ? " is-standalone" : "");
      parent.insertBefore(wrap, sel);
      wrap.appendChild(sel);
      sel.dataset.uiSelect = "1";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ui-select-btn";
      btn.setAttribute("aria-haspopup", "listbox");
      btn.setAttribute("aria-expanded", "false");
      if (sel.id) btn.setAttribute("aria-controls", sel.id + "-menu");
      btn.innerHTML = `
        <span class="ui-select-label"></span>
        <svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      `;

      const menu = document.createElement("div");
      menu.className = "ui-select-menu";
      menu.setAttribute("role", "listbox");
      if (sel.id) menu.id = sel.id + "-menu";

      wrap.appendChild(btn);
      wrap.appendChild(menu);
      rebuildUiSelectMenu(sel);

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (sel.disabled) return;
        const open = !wrap.classList.contains("open");
        closeAllUiSelects(wrap);
        document.querySelectorAll(".agenda-ops-status.open").forEach((el) => el.classList.remove("open"));
        wrap.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });

      menu.addEventListener("click", (e) => {
        const opt = e.target.closest(".ui-select-opt");
        if (!opt || opt.disabled) return;
        e.preventDefault();
        e.stopPropagation();
        const value = opt.dataset.value ?? "";
        if (sel.value !== value) {
          sel.value = value;
          sel.dispatchEvent(new Event("change", { bubbles: true }));
        }
        syncUiSelect(sel);
        wrap.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });

      sel.addEventListener("change", () => syncUiSelect(sel));

      const mo = new MutationObserver(() => rebuildUiSelectMenu(sel));
      mo.observe(sel, { childList: true, subtree: true, characterData: true });
    }

    function enhanceUiSelects(root = document) {
      root.querySelectorAll("select").forEach(enhanceUiSelect);
    }

    function syncModalCloseWithFoot() {
      const closeBtn = document.getElementById("modalClose");
      if (closeBtn) closeBtn.hidden = true;
    }

    function openModal({ title, sub, body, foot, wide, molde, obr, regras, moldeDetail, emailTpl, classif, tipoDoc, aviso, cadastro, audit, auditRules, report }) {
      modal.classList.remove("fin-ofx-import-modal", "fin-conc-modal", "fin-pmap-modal", "fin-gerar-titulo-modal", "fin-plano-form-modal", "cli-xml-prod-modal", "fin-tit-ver-modal", "fin-tit-banco-modal", "is-expanded");
      modalFoot?.classList.remove("fin-tit-ver-foot");
      const resetClose = document.getElementById("modalClose");
      if (resetClose) resetClose.hidden = true;
      const resetTools = document.getElementById("modalHeadTools");
      if (resetTools && !(finDash.conc?.ofx?.modalOpen)) {
        resetTools.innerHTML = "";
        resetTools.hidden = true;
      }
      modal.classList.toggle("wide", (!!wide && !audit) || !!auditRules || !!report);
      modal.classList.toggle("cli-fin-audit-modal", !!audit);
      modal.classList.toggle("cli-fin-audit-rules-modal", !!auditRules);
      modal.classList.toggle("cli-cad-modal", !!cadastro);
      modal.classList.toggle("cfg-molde-modal", !!molde);
      modal.classList.toggle("cfg-obr-modal", !!obr);
      modal.classList.toggle("cfg-regras-modal", !!regras);
      modal.classList.toggle("cfg-molde-detail-modal", !!moldeDetail);
      modal.classList.toggle("cfg-email-modal", !!emailTpl);
      modal.classList.toggle("cfg-classif-modal", !!classif);
      modal.classList.toggle("cfg-tipo-modal", !!tipoDoc);
      modal.classList.toggle("cfg-aviso-modal", !!aviso);
      modalTitle.textContent = title;
      modalSub.textContent = sub || "";
      modalBody.innerHTML = body;
      /* Chrome unificado: header/foot fixos, body com scroll */
      modalBody.style.overflow = "auto";
      if (audit) {
        modalBody.style.maxHeight = "min(78vh, 760px)";
      } else if (report) {
        modalBody.style.maxHeight = "min(78vh, 820px)";
      } else if (auditRules) {
        modalBody.style.maxHeight = "min(72vh, 720px)";
      } else if (obr || regras || moldeDetail || emailTpl || classif || tipoDoc || aviso) {
        modalBody.style.maxHeight = "min(68vh, 620px)";
      } else if (wide || molde || cadastro) {
        modalBody.style.maxHeight = cadastro ? "" : "min(64vh, 580px)";
      } else {
        modalBody.style.maxHeight = "min(56vh, 480px)";
      }
      modalFoot.innerHTML = foot || `<button type="button" class="btn-ghost" data-close>Fechar</button>`;
      syncModalCloseWithFoot();
      backdrop.classList.add("open");
      enhanceUiSelects(modalBody);
    }

    function closeModal() {
      if (cliFinAudit.laudoPreviewOpen) {
        cliFinAudit.laudoPreviewOpen = false;
        if (cliFinAudit.lastLaudoUrl) {
          try { URL.revokeObjectURL(cliFinAudit.lastLaudoUrl); } catch (_) { /* ignore */ }
          cliFinAudit.lastLaudoUrl = "";
        }
        openCliFinAuditModal();
        return;
      }
      if (modal.classList.contains("cli-cad-modal")) {
        cliCadastro = createEmptyCliCadastro();
      }
      if (modal.classList.contains("fin-tit-banco-modal")) {
        modal.classList.remove("fin-tit-banco-modal");
        if (cliFinTitVer?.pendingQuit) {
          delete cliFinTitVer.pendingQuit;
          requestAnimationFrame(() => {
            if (cliFinTitVer) {
              cliFinTitVer.tab = "pagamento";
              paintFinTitulosVerModal();
            }
          });
          return;
        }
      }
      if (modal.classList.contains("fin-tit-ver-modal")) {
        cliFinTitVer = null;
        modal.classList.remove("fin-tit-ver-modal");
        modalFoot?.classList.remove("fin-tit-ver-foot");
      }
      if (modal.classList.contains("cli-fin-audit-modal")) {
        cliFinAudit.modalOpen = false;
        cliFinAudit.filterOpen = false;
        cliFinAudit.expanded = false;
        cliFinAudit.rulesModalOpen = false;
        modal.classList.remove("is-expanded");
      }
      if (modal.classList.contains("cli-fin-audit-rules-modal")) {
        cliFinAudit.rulesModalOpen = false;
        cliFinAudit.rulesExpanded = false;
        modal.classList.remove("cli-fin-audit-rules-modal", "is-expanded");
      }
      if (modal.classList.contains("fin-ofx-import-modal") || modal.classList.contains("fin-conc-modal") || modal.classList.contains("fin-pmap-modal") || modal.classList.contains("fin-gerar-titulo-modal")) {
        if (finDash.conc.ofx) {
          finDash.conc.ofx.modalOpen = false;
          finDash.conc.ofx.expanded = false;
        }
        modal.classList.remove("fin-ofx-import-modal", "fin-conc-modal", "fin-pmap-modal", "fin-gerar-titulo-modal", "fin-plano-form-modal", "cli-xml-prod-modal", "is-expanded");
      }
      const wasReport = !!modalBody?.querySelector("#cliFinReportDoc");
      const headTools = document.getElementById("modalHeadTools");
      if (headTools) {
        headTools.innerHTML = "";
        headTools.hidden = true;
      }
      const closeBtn = document.getElementById("modalClose");
      if (closeBtn) closeBtn.hidden = true;
      backdrop.classList.remove("open");
      if (wasReport) {
        destroyCliFinReportCharts();
        if (cliPerfilTab === "financeiro" && cliFinSubTab === "relatorio" && cliPerfilId) {
          const c = CLIENTES.find((x) => x.id === cliPerfilId);
          const wrap = document.getElementById("clientesWrap");
          if (c && wrap) requestAnimationFrame(() => initCliFinReportCharts(wrap, getCliFinExecData(c)));
        }
      }
    }

    function closedSections() {
      if (isClientePortal()) {
        return CLIENT_PORTAL_TAB_POOL.filter((t) => !openTabIds.includes(t.id));
      }
      return sections.filter((s) => s.id !== "visao" && !openTabIds.includes(s.id));
    }

    function positionAddMenu() {
      const wrap = document.getElementById("tabAddWrap");
      const menu = document.getElementById("addMenu");
      const btn = document.getElementById("tabAddBtn");
      if (!wrap || !menu || !btn || !wrap.classList.contains("open")) return;
      const rect = btn.getBoundingClientRect();
      const menuWidth = Math.max(280, menu.offsetWidth || 280);
      let left = rect.right - menuWidth;
      if (left < 12) left = 12;
      if (left + menuWidth > window.innerWidth - 12) {
        left = Math.max(12, window.innerWidth - menuWidth - 12);
      }
      const gap = -22;
      let top = rect.bottom + gap;
      const estimatedHeight = Math.min(320, menu.scrollHeight || 280);
      if (top + estimatedHeight > window.innerHeight - 12) {
        top = Math.max(12, rect.top - estimatedHeight + gap);
      }
      if (top < 12) top = 12;
      menu.style.position = "fixed";
      menu.style.left = `${Math.round(left)}px`;
      menu.style.top = `${Math.round(top)}px`;
    }

    function toggleAddMenu(forceOpen) {
      const wrap = document.getElementById("tabAddWrap");
      const btn = document.getElementById("tabAddBtn");
      if (!wrap || !btn || btn.disabled) return;
      const willOpen = forceOpen ?? !wrap.classList.contains("open");
      closeAllChipSelects();
      empresaWrap?.classList.remove("open");
      document.getElementById("tabSwitcher")?.classList.remove("open");
      document.getElementById("tabSwitcherBtn")?.setAttribute("aria-expanded", "false");
      filterWrap?.classList.remove("open");
      filterBtn?.setAttribute("aria-expanded", "false");
      wrap.classList.toggle("open", willOpen);
      if (willOpen) {
        requestAnimationFrame(() => {
          positionAddMenu();
          requestAnimationFrame(() => positionAddMenu());
        });
      }
    }

    function renderTabSwitcher() {
      const switcher = document.getElementById("tabSwitcher");
      const currentEl = document.getElementById("tabSwitcherCurrent");
      const menu = document.getElementById("tabSwitcherMenu");
      if (!switcher || !currentEl || !menu) return;

      const cur = resolveSection(current);
      const curIcon = (icons[current] || "")
        .replace(/width="18"/g, 'width="15"')
        .replace(/height="18"/g, 'height="15"');
      currentEl.innerHTML = `<span class="tab-icon" aria-hidden="true">${curIcon}</span><span>${cur?.label || ""}</span>`;

      menu.innerHTML = openTabIds.map((id) => {
        const s = resolveSection(id);
        if (!s) return "";
        const icon = (icons[id] || "")
          .replace(/width="18"/g, 'width="15"')
          .replace(/height="18"/g, 'height="15"');
        return `<button type="button" class="tab-switcher-item${id === current ? " active" : ""}" role="menuitem" data-switch-tab="${id}">
          <span class="tab-icon" aria-hidden="true">${icon}</span>${s.label}
        </button>`;
      }).join("");
    }

    function renderTabs() {
      const tabsHtml = openTabIds.map((id) => {
        const s = resolveSection(id);
        if (!s) return "";
        const icon = (icons[id] || "")
          .replace(/width="18"/g, 'width="15"')
          .replace(/height="18"/g, 'height="15"');
        const canClose = isClientePortal() ? true : id !== "visao";
        return `
        <div class="text-tab tip-bottom${id === current ? " active" : ""}" role="tab" data-id="${id}" data-tip="${s.tip}" aria-selected="${id === current}">
          <span class="tab-icon" aria-hidden="true">${icon}</span>
          <span class="tab-label">${s.label}</span>
          ${canClose ? `<button type="button" class="tab-close tip-bottom" data-close-tab="${id}" data-tip="Fechar aba ${s.label}" aria-label="Fechar ${s.label}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>` : ""}
        </div>`;
      }).join("");

      const closed = closedSections();
      const addDisabled = closed.length === 0 ? "disabled" : "";
      const menuItems = closed.length
        ? closed.map((s) => {
            const icon = (icons[s.id] || "")
              .replace(/width="18"/g, 'width="15"')
              .replace(/height="18"/g, 'height="15"');
            return `<button type="button" class="add-menu-item" data-add-tab="${s.id}"><span class="tab-icon" aria-hidden="true">${icon}</span>${s.label}</button>`;
          }).join("")
        : `<div class="add-menu-empty">${isClientePortal() ? "Todas as páginas já estão abertas" : "Todos os filtros já estão selecionados"}</div>`;

      textTabs.innerHTML = `
        ${tabsHtml}
        <div class="tab-add-wrap" id="tabAddWrap">
          <button type="button" class="tab-add tip-bottom" id="tabAddBtn" data-tip="${isClientePortal() ? "Adicionar página" : "Adicionar filtro"}" aria-label="${isClientePortal() ? "Adicionar página" : "Adicionar filtro"}" ${addDisabled}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          </button>
          <div class="add-menu" id="addMenu">${menuItems}</div>
        </div>`;

      renderTabSwitcher();
    }

    function renderKanban(items) {
      const INTERNA = "Obrigação interna";
      const cols = {};
      const order = [];

      (items || []).forEach((item) => {
        const dept = item.interna || item.dept === INTERNA
          ? INTERNA
          : (item.dept || "Sem departamento");
        if (!cols[dept]) {
          cols[dept] = [];
          if (dept !== INTERNA) order.push(dept);
        }
        cols[dept].push({ ...item, dept });
      });

      // Coluna fixa de obrigação interna (sempre visível)
      if (!cols[INTERNA]) cols[INTERNA] = [];
      order.push(INTERNA);

      const accents = {
        Fiscal: "#28519c",
        Pessoal: "#2f9e6b",
        Contábil: "#c47a1a",
        [INTERNA]: "#b45309",
        "Sem departamento": "#5b4db8",
      };
      const fallback = ["#28519c", "#2f9e6b", "#c47a1a", "#0f7ea8", "#5b4db8"];

      kanbanBoard.innerHTML = order.map((dept, i) => {
        const color = accents[dept] || fallback[i % fallback.length];
        const list = cols[dept];
        const isInterna = dept === INTERNA;
        const icon = isInterna
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-8h6v8"/></svg>`;
        return `
          <div class="kanban-col${isInterna ? " interna" : ""}" style="border-color:${color}55">
            <div class="kanban-col-head" style="background:${color}14;color:${color}">
              ${icon}
              <span>${dept}</span>
              <span class="count" style="background:${color}22;color:${color}">${list.length}</span>
            </div>
            <div class="kanban-col-body">
              ${list.map((item, idx) => `
                <button type="button" class="kanban-card tip-bottom" data-tip="${item.grupo ? "Abrir obrigações do grupo" : isInterna ? "Obrigação interna" : "Detalhes da recorrência"}" data-kanban-item="${dept}::${idx}">
                  <strong>${item.title}</strong>
                  <div class="meta">${item.meta}</div>
                  ${item.grupo ? '<span class="badge grupo">Grupo</span>' : isInterna ? '<span class="badge interna">Interna</span>' : '<span class="badge">Recorrência</span>'}
                </button>
              `).join("")}
              <button type="button" class="kanban-add tip-bottom" data-tip="${isInterna ? "Nova obrigação interna" : `Adicionar em ${dept}`}" data-kanban-add="${dept}" data-kanban-kind="${isInterna ? "interna" : "add"}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
                ${isInterna ? "Adicionar interna" : "Adicionar"}
              </button>
            </div>
          </div>`;
      }).join("");
    }

    function procStatusLabel(p) {
      if (p.arquivado) return { cls: "arquivado", text: "Arquivado" };
      const meta = procStatusMeta(p.status);
      return { cls: meta.badge, text: meta.label };
    }

    function procProgress(etapas) {
      if (!etapas?.length) return { done: 0, total: 0, pct: 0 };
      const done = etapas.filter((e) => e.status === "concluido" || e.status === "dispensado").length;
      return { done, total: etapas.length, pct: Math.round((done / etapas.length) * 100) };
    }

    function getEntregasFiltradasProcessos() {
      let tasks = agendaTasksScoped().filter((t) => !t.arquivada);
      if (procEmpresaFilter && procEmpresaFilter !== "all") {
        tasks = tasks.filter((t) => t.clienteId === procEmpresaFilter);
      }
      if (procFiltros.status) {
        tasks = tasks.filter((t) => matchesProcFilterStatus(procStatusMeta(t.status).sucesso, procFiltros.status));
      }
      if (procFiltros.responsavel) {
        tasks = tasks.filter((t) => t.responsavel === procFiltros.responsavel);
      }
      // dept só existe em processos
      if (procFiltros.dept) tasks = [];
      return tasks;
    }

    function getProcessosFiltrados() {
      const section = sections.find((s) => s.id === "processos");
      const items = section?.items || [];
      return items.filter((p) => {
        if (isClientePortal() && p.clienteId !== portalClienteId) return false;
        if (procFiltros.arquivados ? !p.arquivado : p.arquivado) return false;
        if (procEmpresaFilter && procEmpresaFilter !== "all" && p.clienteId !== procEmpresaFilter) return false;
        if (procFiltros.status && !matchesProcFilterStatus(p.sucesso, procFiltros.status)) return false;
        if (procFiltros.dept && p.dept !== procFiltros.dept) return false;
        if (procFiltros.responsavel && p.responsavel !== procFiltros.responsavel) return false;
        if (!inPeriodRange(p.criado)) return false;
        return true;
      });
    }

    function syncProcStatusUi() {
      const label = document.getElementById("procStatusLabel");
      const dot = document.getElementById("procStatusDot");
      const menu = document.getElementById("procStatusMenu");
      const meta = procFiltros.status
        ? procFilterStatusMeta(procFiltros.status)
        : { label: "Todas", color: "#94a3b8" };
      if (label) label.textContent = meta.label;
      if (dot) dot.style.background = meta.color || "#94a3b8";
      if (menu) {
        menu.querySelectorAll(".agenda-ops-status-opt").forEach((btn) => {
          btn.classList.toggle("active", (btn.dataset.value || "") === procFiltros.status);
        });
      }
    }

    function renderProcStatusMenuHtml() {
      return [
        `<button type="button" class="agenda-ops-status-opt${!procFiltros.status ? " active" : ""}" role="option" data-value="">
          <i class="status-dot" style="background:#94a3b8" aria-hidden="true"></i>
          <span>Todas</span>
        </button>`,
        ...PROC_FILTER_STATUS_OPTIONS.map((o) => `
          <button type="button" class="agenda-ops-status-opt${procFiltros.status === o.value ? " active" : ""}" role="option" data-value="${o.value}">
            <i class="status-dot" style="background:${o.color}" aria-hidden="true"></i>
            <span>${o.label}</span>
          </button>`),
      ].join("");
    }

    function renderProcessosQuantidade(list) {
      const base = list || getProcessosFiltrados();
      const total = base.length;
      const andamento = base.filter((p) => p.sucesso === null).length;
      const ok = base.filter((p) => p.sucesso === true).length;
      const bad = base.filter((p) => p.sucesso === false).length;
      procKpis.innerHTML = `
        <div class="proc-kpi totais">
          <div class="kpi-top">${icons.processos}<span>Total de Processos</span></div>
          <div class="kpi-value">${total}</div>
        </div>
        <div class="proc-kpi andamento">
          <div class="kpi-top"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4V8z"/></svg><span>Em Andamento</span></div>
          <div class="kpi-value">${andamento}</div>
        </div>
        <div class="proc-kpi sucesso">
          <div class="kpi-top"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg><span>Bem sucedidos</span></div>
          <div class="kpi-value">${ok}</div>
        </div>
        <div class="proc-kpi falha">
          <div class="kpi-top"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg><span>Mal sucedidos</span></div>
          <div class="kpi-value">${bad}</div>
        </div>`;
    }

    function renderProcessosFilters() {
      const all = sections.find((s) => s.id === "processos")?.items || [];
      const resps = [...new Set(all.map((p) => p.responsavel))];
      const statusMeta = procFiltros.status
        ? procFilterStatusMeta(procFiltros.status)
        : { label: "Todas", color: "#94a3b8" };
      procFilters.innerHTML = `
        ${renderModuleEmpresaPickerHtml("processos")}
        <div class="proc-filter field agenda-ops-status" id="procStatusWrap">
          <button type="button" class="agenda-ops-status-btn" id="procStatusBtn" aria-haspopup="listbox" aria-expanded="false" aria-label="Filtrar status">
            <i class="status-dot" id="procStatusDot" style="background:${statusMeta.color}" aria-hidden="true"></i>
            <span class="status-label" id="procStatusLabel">${statusMeta.label}</span>
            <svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="agenda-ops-status-menu" id="procStatusMenu" role="listbox" aria-label="Status">
            ${renderProcStatusMenuHtml()}
          </div>
        </div>
        <div class="proc-filter field">
          <svg class="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>
          <select id="procDept" aria-label="Departamento">
            <option value="">Departamento</option>
            ${PROC_DEPT_OPTIONS.map((d) => `<option value="${d}" ${procFiltros.dept === d ? "selected" : ""}>${d}</option>`).join("")}
          </select>
        </div>
        <div class="proc-filter field">
          <svg class="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <select id="procResp" aria-label="Responsável">
            <option value="">Responsável</option>
            ${resps.map((r) => `<option value="${r}" ${procFiltros.responsavel === r ? "selected" : ""}>${r}</option>`).join("")}
          </select>
        </div>
        <div class="agenda-ops-view" role="group" aria-label="Agrupamento">
          <button type="button" data-proc-group="lista" class="${procFiltros.groupBy === "lista" ? "active" : ""}" aria-pressed="${procFiltros.groupBy === "lista"}">Lista de Processos</button>
          <button type="button" data-proc-group="empresa" class="${procFiltros.groupBy === "empresa" ? "active" : ""}" aria-pressed="${procFiltros.groupBy === "empresa"}">Agrupar por Empresa</button>
        </div>
        <div class="proc-actions">
          <div class="proc-view-toggle" role="group" aria-label="Visualização" ${procFiltros.groupBy === "empresa" ? "hidden" : ""}>
            <button type="button" class="btn-icon tip-bottom${procFiltros.view === "card" ? " active" : ""}" data-tip="Visualização em cards" data-proc-action="view-card" aria-label="Cards" aria-pressed="${procFiltros.view === "card"}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            </button>
            <button type="button" class="btn-icon tip-bottom${procFiltros.view === "list" ? " active" : ""}" data-tip="Visualização em lista" data-proc-action="view-list" aria-label="Lista" aria-pressed="${procFiltros.view === "list"}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
            </button>
          </div>
          <button type="button" class="btn-icon tip-bottom" data-tip="Criar recorrência de processo" data-proc-action="recorrencia" aria-label="Recorrência">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-14.3-7.2L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 14.3 7.2L21 16"/><path d="M16 21h5v-5"/></svg>
          </button>
          <button type="button" class="btn-icon tip-bottom${procFiltros.arquivados ? " danger active" : ""}" data-tip="${procFiltros.arquivados ? "Ver ativos" : "Ver arquivados"}" data-proc-action="arquivados" aria-label="Arquivados">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"/></svg>
          </button>
        </div>`;
      enhanceUiSelects(procFilters);
    }

    function renderEmpresaBoardItemProc(p, idAttr) {
      const st = procStatusMeta(p.status);
      const prog = typeof procProgress === "function" ? procProgress(p.etapas) : { pct: 0, done: 0, total: 0 };
      return `
        <div class="empresa-board-item status-${st.badge}" ${idAttr} role="button" tabindex="0">
          <div class="item-top">
            <strong>${p.title}</strong>
            <div class="item-top-actions">
              <span class="proc-badge ${st.badge}">${st.label}</span>
              <button type="button" class="agenda-edit-btn tip-bottom" data-proc-edit="${p.id}" data-tip="Editar processo" aria-label="Editar processo">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              </button>
            </div>
          </div>
          <div class="item-meta">#${p.id} · ${p.dept || "—"} · ${p.responsavel || "—"}</div>
          <div class="item-foot">
            <div class="proc-progress" style="flex:1">
              <div class="proc-progress-bar"><i style="width:${prog.pct || 0}%"></i></div>
              <span style="font-size:.68rem;color:var(--muted)">${prog.done || 0}/${prog.total || 0}</span>
            </div>
            <span class="item-meta">${fmtOpsDate(p.criado)}</span>
          </div>
        </div>`;
    }

    function renderEmpresaBoardItemEntrega(t) {
      const st = procStatusMeta(t.status);
      return `
        <button type="button" class="empresa-board-item status-${st.badge}" data-agenda-board-task="${t.id}">
          <div class="item-top">
            <strong>${t.nome}</strong>
            <span class="proc-badge ${st.badge}">${st.label}</span>
          </div>
          <div class="item-meta">Entrega · ${t.responsavel || "—"} · prazo ${t.prazoLegal || "—"}</div>
          <div class="item-foot">
            <span class="item-meta">Competência ${t.competencia || "—"}</span>
            <span class="item-meta">${fmtOpsDate(t.date)}</span>
          </div>
        </button>`;
    }

    function renderEmpresaAccordionItem(g, expandedSet, toggleAttr) {
      const c = g.client;
      const open = expandedSet.has(c.id);
      const statusCls = c.status === "Ativo" ? "is-ativo" : c.status === "Inativo" ? "is-inativo" : "";
      const fantasia = c.fantasia || c.short || c.nome || "—";
      const razao = c.razaoSocial || c.nome || "—";
      const total = g.procs.length + g.entregas.length;
      const bodyParts = [];
      if (g.procs.length) {
        bodyParts.push(`<div class="empresa-board-section">Processos · ${g.procs.length}</div>`);
        bodyParts.push(...g.procs.map((p) => renderEmpresaBoardItemProc(p, `data-proc-id="${p.id}" data-agenda-proc="${p.id}"`)));
      }
      if (g.entregas.length) {
        bodyParts.push(`<div class="empresa-board-section">Entregas · ${g.entregas.length}</div>`);
        bodyParts.push(...g.entregas.map((t) => renderEmpresaBoardItemEntrega(t)));
      }
      if (!bodyParts.length) {
        bodyParts.push(`<div class="empresa-board-empty">Nenhum item neste filtro</div>`);
      }

      return `
        <div class="empresa-menu-item${open ? " open" : ""}" data-ops-client="${c.id}">
          <button type="button" class="empresa-menu-toggle" ${toggleAttr}="${c.id}" aria-expanded="${open}">
            <div class="toggle-top">
              <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
              <div class="empresa-board-info">
                <h4 title="${fantasia}">${fantasia}</h4>
              </div>
            </div>
            <div class="empresa-card-dl">
              <div class="dl-row"><span class="dl-k">Razão social</span><span class="dl-v" title="${razao}">${razao}</span></div>
              <div class="dl-row"><span class="dl-k">CNPJ</span><span class="dl-v">${c.cnpj || "—"}</span></div>
              <div class="dl-row"><span class="dl-k">Código</span><span class="dl-v">${c.code || "—"}</span></div>
              <div class="dl-row"><span class="dl-k">Regime</span><span class="dl-v">${c.regime || "—"}</span></div>
              <div class="dl-row"><span class="dl-k">UF</span><span class="dl-v">${c.estado || "—"}</span></div>
              <div class="dl-row"><span class="dl-k">Status</span><span class="dl-v ${statusCls}">${c.status || "—"}</span></div>
            </div>
            <div class="empresa-board-stats">
              <i>${g.procs.length} proc.</i>
              <i>${g.entregas.length} ent.</i>
              <i>${total} total</i>
            </div>
          </button>
          <div class="empresa-menu-body" role="list" aria-label="Kanban de ${fantasia}">
            ${bodyParts.join("")}
          </div>
        </div>`;
    }

    function renderEmpresaKanbanCard(g) {
      return renderEmpresaAccordionItem(g, new Set([g.client.id]), "data-proc-acc");
    }

    function buildEmpresaGroups(procs, entregas) {
      const groups = new Map();
      const ensure = (client) => {
        const key = client?.id || "_sem";
        if (!groups.has(key)) {
          groups.set(key, {
            client: client || { id: "_sem", nome: "Sem empresa", short: "—", cnpj: "—", initials: "?" },
            procs: [],
            entregas: [],
          });
        }
        return groups.get(key);
      };
      procs.forEach((p) => ensure(resolveClienteForOps(p)).procs.push(p));
      entregas.forEach((t) => ensure(resolveClienteForOps(t)).entregas.push(t));
      return [...groups.values()].sort((a, b) =>
        a.client.nome.localeCompare(b.client.nome, "pt-BR")
      );
    }

    function renderProcessosGrouped(procs) {
      const entregas = getEntregasFiltradasProcessos();
      procGrid.classList.add("is-grouped");
      procGrid.classList.remove("is-list");

      const ordered = buildEmpresaGroups(procs, entregas);
      if (!ordered.length) {
        procGrid.innerHTML = `<div class="empresa-group-list"><div class="empresa-board-empty">${procEmpresaFilter !== "all" || procFiltros.status || procFiltros.dept || procFiltros.responsavel ? "Nenhuma empresa correspondente aos filtros" : "Nenhum item com esses filtros"}</div></div>`;
        return;
      }
      procGrid.innerHTML = `<div class="empresa-group-list">${ordered.map((g) => renderEmpresaAccordionItem(g, procFiltros.expandedClients, "data-proc-acc")).join("")}</div>`;
    }

    function renderProcessosGrid(list) {
      if (procFiltros.groupBy === "empresa") {
        renderProcessosGrouped(list);
        return;
      }

      procGrid.classList.remove("is-grouped");
      const isList = procFiltros.view === "list";
      procGrid.classList.toggle("is-list", isList);

      if (isList) {
        const addRow = `
          <button type="button" class="proc-list-add tip-bottom" data-tip="Adicionar processo a partir de molde" data-proc-action="add">
            <div class="add-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
            </div>
            <strong>Adicionar processo</strong>
            <span>A partir de um molde</span>
          </button>`;
        const head = `
          <div class="proc-list-head">
            <span>Processo</span>
            <span>Status</span>
            <span>Depto</span>
            <span>Progresso</span>
            <span>Responsável</span>
            <span>Criado</span>
            <span></span>
          </div>`;

        if (!list.length) {
          procGrid.innerHTML = `
            ${head}
            ${addRow}
            <div class="proc-empty">
              ${icons.processos.replace(/width="18"/g, 'width="48"').replace(/height="18"/g, 'height="48"')}
              <div style="font-size:1rem;font-weight:600;color:var(--navy-deep);margin-top:4px">${procFiltros.arquivados ? "Nenhum arquivado" : "Nenhum processo encontrado"}</div>
              <div style="font-size:.82rem;margin-top:6px">Use o botão acima para adicionar</div>
            </div>`;
          return;
        }

        procGrid.innerHTML = head + addRow + list.map((p) => {
          const st = procStatusLabel(p);
          const prog = procProgress(p.etapas);
          const criadoFmt = p.criado ? p.criado.split("-").reverse().join("/") : "—";
          return `
            <div class="proc-list-row status-${st.cls} tip-bottom" data-tip="Abrir kanban de etapas" data-proc-id="${p.id}" role="button" tabindex="0">
              <div class="title-cell">
                <strong>${p.title}</strong>
                <span class="pid">#${p.id}</span>
              </div>
              <div class="cell cell-status"><span class="proc-badge ${st.cls}">${st.text}</span></div>
              <div class="cell cell-dept muted">${p.dept}</div>
              <div class="cell cell-prog">
                <div class="proc-progress">
                  <div class="proc-progress-bar"><i style="width:${prog.pct}%"></i></div>
                  <span>${prog.done}/${prog.total}</span>
                </div>
              </div>
              <div class="cell cell-resp">${p.responsavel}</div>
              <div class="cell cell-date muted">${criadoFmt}</div>
              <div class="cell cell-actions">
                <button type="button" class="agenda-edit-btn tip-bottom" data-proc-edit="${p.id}" data-tip="Editar processo" aria-label="Editar processo">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </button>
              </div>
            </div>`;
        }).join("");
        return;
      }

      const addCard = `
        <button type="button" class="proc-card proc-card-add tip-bottom" data-tip="Adicionar processo a partir de molde" data-proc-action="add">
          <div class="add-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          <strong>Adicionar processo</strong>
          <span>A partir de um molde</span>
        </button>`;

      if (!list.length) {
        procGrid.innerHTML = `
          ${addCard}
          <div class="proc-empty">
            ${icons.processos.replace(/width="18"/g, 'width="48"').replace(/height="18"/g, 'height="48"')}
            <div style="font-size:1rem;font-weight:600;color:var(--navy-deep);margin-top:4px">${procFiltros.arquivados ? "Nenhum arquivado" : "Nenhum processo encontrado"}</div>
            <div style="font-size:.82rem;margin-top:6px">Use o card ao lado para adicionar</div>
          </div>`;
        return;
      }
      procGrid.innerHTML = addCard + list.map((p) => {
        const st = procStatusLabel(p);
        const prog = procProgress(p.etapas);
        const criadoFmt = p.criado ? p.criado.split("-").reverse().join("/") : "—";
        return `
          <div class="proc-card status-${st.cls} tip-bottom" data-tip="Abrir kanban de etapas" data-proc-id="${p.id}" role="button" tabindex="0">
            <div class="proc-card-head">
              <strong>${p.title}</strong>
              <div class="proc-card-head-actions">
                <span class="pid">#${p.id}</span>
                <button type="button" class="agenda-edit-btn tip-bottom" data-proc-edit="${p.id}" data-tip="Editar processo" aria-label="Editar processo">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </button>
              </div>
            </div>
            <div class="proc-card-meta">
              <span class="proc-badge ${st.cls}">${st.text}</span>
              <span class="proc-badge dept">${p.dept}</span>
            </div>
            <div class="proc-card-foot">
              <div class="proc-progress">
                <div class="proc-progress-bar"><i style="width:${prog.pct}%"></i></div>
                <span>${prog.done}/${prog.total}</span>
              </div>
              <span>${p.responsavel} · ${criadoFmt}</span>
            </div>
          </div>`;
      }).join("");
    }

    function renderProcessos() {
      const list = getProcessosFiltrados();
      renderProcessosQuantidade(list);
      renderProcessosFilters();
      renderProcessosGrid(list);
    }

    function openKanbanEtapasModal(proc) {
      const cols = [
        { key: "pendente", label: "Pendente", color: "#6b7c93" },
        { key: "em_andamento", label: "Em andamento", color: "#28519c" },
        { key: "concluido", label: "Concluído", color: "#2f9e6b" },
        { key: "dispensado", label: "Dispensado", color: "#9a5f12" },
      ];
      const body = `
        <div style="margin-bottom:12px;font-size:.82rem;color:var(--muted)">
          #${proc.id} · ${proc.dept} · ${proc.responsavel}
          ${proc.competencia ? ` · Comp. ${proc.competencia}` : ""}
        </div>
        <div class="etapa-kanban" id="etapaKanban">
          ${cols.map((c) => {
            const list = (proc.etapas || []).filter((e) => e.status === c.key).sort((a, b) => a.ordem - b.ordem);
            return `
              <div class="etapa-col" style="--etapa-color:${c.color}">
                <div class="etapa-col-head">
                  <span>${c.label}</span>
                  <span class="count">${list.length}</span>
                </div>
                <div class="etapa-col-body">
                  ${list.map((e) => `
                    <button type="button" class="etapa-card tip-bottom" data-tip="Detalhes da etapa" data-etapa-id="${e.id}" data-proc-id="${proc.id}">
                      <strong>${e.nome}</strong>
                      <div class="meta">${e.responsavel || "Sem responsável"} · ordem ${e.ordem}</div>
                      ${e.obrigatorio ? '<span class="obrig">Obrigatória</span>' : ""}
                    </button>
                  `).join("") || `<div style="font-size:.74rem;color:var(--muted);padding:8px">Vazio</div>`}
                </div>
              </div>`;
          }).join("")}
        </div>`;
      openModal({
        title: proc.title,
        sub: "Kanban de etapas",
        wide: true,
        body,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" data-close onclick="toast('Processo atualizado')">Atualizar</button>`,
      });
    }

    function openAddProcessoModal() {
      openModal({
        title: "Adicionar processo",
        sub: "Seleção de molde (simulação)",
        body: `
          <p style="margin-bottom:12px;font-size:.84rem;color:var(--muted)">Escolha um molde para duplicar neste cliente.</p>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${["Abertura de empresa", "Alteração cadastral", "Baixa de inscrição", "Encerramento anual"].map((n, i) => `
              <label class="filter-option" style="justify-content:flex-start">
                <input type="radio" name="moldeProc" value="${i}" ${i === 0 ? "checked" : ""}>
                <span><strong style="display:block;font-size:.84rem">${n}</strong>
                <span style="font-size:.74rem;color:var(--muted)">Molde padrão</span></span>
              </label>`).join("")}
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="procAddConfirm">Duplicar molde</button>`,
      });
      document.getElementById("procAddConfirm")?.addEventListener("click", () => {
        const section = sections.find((s) => s.id === "processos");
        const nome = document.querySelector('input[name="moldeProc"]:checked')?.closest("label")?.querySelector("strong")?.textContent || "Novo processo";
        const id = 1100 + section.items.length;
        section.items.unshift({
          id,
          title: nome,
          status: "em-andamento",
          sucesso: null,
          dept: "Comercial",
          responsavel: "Ana Costa",
          criado: "2026-07-13",
          competencia: "2026-07",
          arquivado: false,
          etapas: [
            { id: id * 10 + 1, nome: "Início", status: "em_andamento", ordem: 1, obrigatorio: true, responsavel: "Ana Costa" },
            { id: id * 10 + 2, nome: "Conclusão", status: "pendente", ordem: 2, obrigatorio: true, responsavel: "Ana Costa" },
          ],
        });
        closeModal();
        renderProcessos();
        toast("Processo duplicado com sucesso!");
      });
    }

    function getCliGestaoPendenciasCount(c) {
      if (!c) return 0;
      let n = 0;
      const cert = typeof getCertificadoRow === "function" ? getCertificadoRow(c) : null;
      if (cert && cert.status !== "ok") n += 1;
      n += agendaTasks.filter((t) =>
        t.clienteId === c.id
        && !t.arquivada
        && (t.status === "atrasada" || t.status === "ent-atrasada" || t.status === "justificativa-atrasada")
      ).length;
      const procs = (sections.find((s) => s.id === "processos")?.items || []).filter((p) =>
        p.clienteId === c.id && !p.arquivado && p.sucesso === false
      );
      n += procs.length;
      return n;
    }

    function getCliMonitorSeed(c) {
      const idx = Math.max(0, CLIENTES.findIndex((x) => x.id === c.id));
      return {
        idx,
        auditWarn: idx % 4 === 1,
        auditBad: idx % 5 === 0 && c.status !== "Ativo",
        docsWarn: idx % 3 === 2,
        concPend: idx % 4 === 3,
        titVencidos: idx % 3 === 0 ? 1 + (idx % 2) : 0,
        diasAtiv: [0, 1, 2, 5, 0, 3, 8, 1, 4, 2][idx] ?? (idx % 6),
      };
    }

    function getCliAtividadeRelativaLabel(c) {
      const d = getCliMonitorSeed(c).diasAtiv;
      if (d === 0) return { short: "Hoje", detail: "Última movimentação hoje" };
      if (d === 1) return { short: "Ontem", detail: "Última movimentação ontem" };
      return { short: `${d} dias`, detail: `Última movimentação há ${d} dias` };
    }

    function getCliMonitorMeta(c) {
      const cert = typeof getCertificadoRow === "function" ? getCertificadoRow(c) : null;
      const pendencias = getCliGestaoPendenciasCount(c);
      const seed = getCliMonitorSeed(c);
      const fat = Number(c.faturamento) || 0;
      const saldo = Math.round(fat * (0.055 + (seed.idx % 5) * 0.008));
      const aReceber = Math.round(fat * (0.09 + (seed.idx % 4) * 0.01));
      const aPagar = Math.round(fat * (0.05 + (seed.idx % 3) * 0.012));

      const inds = {
        financeiro: seed.titVencidos >= 2 || aPagar > aReceber * 0.95 ? "bad" : (seed.titVencidos || seed.concPend ? "warn" : "ok"),
        fiscal: pendencias >= 3 ? "bad" : (pendencias > 0 ? "warn" : "ok"),
        documentos: seed.docsWarn ? "warn" : "ok",
        auditoria: seed.auditBad ? "bad" : (seed.auditWarn ? "warn" : "ok"),
        certificados: !cert || cert.status === "ok" ? "ok" : (cert.status === "a-vencer" ? "warn" : "bad"),
      };

      let score = 92 - seed.idx * 3;
      if (c.status !== "Ativo") score -= 22;
      score -= Math.min(36, pendencias * 10);
      if (inds.certificados === "bad") score -= 28;
      else if (inds.certificados === "warn") score -= 12;
      if (inds.financeiro === "bad") score -= 14;
      else if (inds.financeiro === "warn") score -= 7;
      if (inds.auditoria === "bad") score -= 12;
      else if (inds.auditoria === "warn") score -= 6;
      if (inds.documentos === "warn") score -= 4;
      score = Math.max(12, Math.min(98, Math.round(score)));

      let healthLabel = "Excelente";
      let healthCls = "is-ok";
      if (score < 60) {
        healthLabel = "Crítico";
        healthCls = "is-bad";
      } else if (score < 85) {
        healthLabel = "Atenção";
        healthCls = "is-warn";
      }

      const alerts = [];
      if (cert?.status === "vencido") alerts.push("Certificado vencido");
      else if (cert?.status === "a-vencer") {
        const dias = Number(cert.dias);
        alerts.push(Number.isFinite(dias) && dias >= 0
          ? `Certificado vence em ${dias} dia${dias === 1 ? "" : "s"}`
          : "Certificado a vencer");
      }
      if (pendencias > 0) {
        alerts.push(pendencias === 1 ? "1 pendência fiscal" : `${pendencias} pendências fiscais`);
      }
      if (seed.titVencidos) {
        alerts.push(seed.titVencidos === 1 ? "Título vencido" : `${seed.titVencidos} títulos vencidos`);
      }
      if (seed.concPend) alerts.push("Conciliação pendente");
      if (seed.auditWarn || seed.auditBad) alerts.push("Divergência na auditoria");
      if (c.status !== "Ativo") alerts.push("Cliente inativo");

      const alertaPrincipal = alerts[0] || "Em dia";
      const alertaCls = alerts.length ? (healthCls === "is-ok" ? "is-warn" : healthCls) : "is-ok";

      return {
        cert,
        pendencias,
        score,
        healthLabel,
        healthCls,
        inds,
        alertaPrincipal,
        alertaCls,
        alertsCount: alerts.length,
        saldo,
        aReceber,
        aPagar,
        atividade: getCliAtividadeRelativaLabel(c),
      };
    }

    function renderCliMonIndsHtml(inds) {
      const items = [
        { key: "financeiro", lab: "Fin", tip: "Financeiro" },
        { key: "fiscal", lab: "Fis", tip: "Fiscal" },
        { key: "documentos", lab: "Doc", tip: "Documentos" },
        { key: "auditoria", lab: "Aud", tip: "Auditoria" },
        { key: "certificados", lab: "Cer", tip: "Certificados" },
      ];
      return `
        <div class="cli-mon-inds" aria-label="Indicadores rápidos">
          ${items.map((it) => {
            const ton = inds[it.key] || "ok";
            return `<span class="cli-mon-ind is-${ton}" title="${it.tip}"><i aria-hidden="true"></i><b>${it.lab}</b></span>`;
          }).join("")}
        </div>`;
    }

    function getCliUltimaMovimentacaoLabel(c) {
      const tasks = agendaTasks
        .filter((t) => t.clienteId === c.id && !t.arquivada)
        .slice()
        .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
      if (tasks[0]?.date) {
        const [y, m, d] = String(tasks[0].date).split("-");
        if (y && m && d) return `${d}/${m}/${y} · ${tasks[0].nome || "Entrega"}`;
      }
      return getCliAtividadeRelativaLabel(c).detail;
    }

    function getCliListSituacaoMeta(c, pendencias, cert) {
      if (cert && cert.status !== "ok") {
        return { key: "alerta", label: "Alerta", cls: "is-alerta" };
      }
      if (pendencias > 0) {
        return { key: "pendencias", label: pendencias === 1 ? "1 pendência" : `${pendencias} pendências`, cls: "is-pend" };
      }
      return { key: "em-dia", label: "Em dia", cls: "is-ok" };
    }

    function cliListSituacaoIcon(key) {
      if (key === "alerta") {
        return `<svg class="cli-sit-ico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>`;
      }
      if (key === "pendencias") {
        return `<svg class="cli-sit-ico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01"/></svg>`;
      }
      return `<svg class="cli-sit-ico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>`;
    }

    function collectCliListRowsMeta() {
      let list = [...CLIENTES];
      if (cliEmpresaFilter && cliEmpresaFilter !== "all") {
        list = list.filter((c) => c.id === cliEmpresaFilter);
      }
      if (cliRegimeFilter) list = list.filter((c) => c.regime === cliRegimeFilter);

      let rowsMeta = list.map((c) => {
        const cert = typeof getCertificadoRow === "function" ? getCertificadoRow(c) : null;
        const pendencias = getCliGestaoPendenciasCount(c);
        const monitor = getCliMonitorMeta(c);
        return {
          c,
          colabs: (c.funcInternos || 0) + (c.funcExternos || 0),
          pendencias,
          cert,
          situacao: getCliListSituacaoMeta(c, pendencias, cert),
          monitor,
        };
      });

      const kpi = cliListKpiFilter || "";
      if (kpi === "ativas") rowsMeta = rowsMeta.filter((r) => r.c.status === "Ativo");
      else if (kpi === "pendencias") rowsMeta = rowsMeta.filter((r) => r.pendencias > 0);
      else if (kpi === "colaboradores") rowsMeta = rowsMeta.slice().sort((a, b) => b.colabs - a.colabs);
      else if (kpi === "cert") rowsMeta = rowsMeta.filter((r) => r.cert && r.cert.status !== "ok");
      else rowsMeta = rowsMeta.slice().sort((a, b) => a.monitor.score - b.monitor.score);

      return rowsMeta;
    }

    function closeCliClienteDrawer(opts = {}) {
      cliDrawerOpen = false;
      if (!opts.keepSelection) cliListSelectedId = null;
      const backdrop = document.getElementById("cliDrawerBackdrop");
      const drawer = document.getElementById("cliDrawer");
      backdrop?.classList.remove("open");
      drawer?.classList.remove("open");
      backdrop?.setAttribute("aria-hidden", "true");
      drawer?.setAttribute("aria-hidden", "true");
      if (!opts.silent && cliView === "lista") {
        document.querySelectorAll(".cli-list-row.is-selected").forEach((el) => el.classList.remove("is-selected"));
      }
    }

    function paintCliClienteDrawer(c) {
      const backdrop = document.getElementById("cliDrawerBackdrop");
      const drawer = document.getElementById("cliDrawer");
      const title = document.getElementById("cliDrawerTitle");
      const sub = document.getElementById("cliDrawerSub");
      const body = document.getElementById("cliDrawerBody");
      const foot = document.getElementById("cliDrawerFoot");
      if (!backdrop || !drawer || !body || !c) return;

      const cert = typeof getCertificadoRow === "function" ? getCertificadoRow(c) : null;
      const pendencias = getCliGestaoPendenciasCount(c);
      const situacao = getCliListSituacaoMeta(c, pendencias, cert);
      const monitor = getCliMonitorMeta(c);
      const colabs = (c.funcInternos || 0) + (c.funcExternos || 0);
      const tipo = c.tipoUnidade || "Matriz";

      if (title) title.textContent = c.fantasia || c.nome;
      if (sub) sub.textContent = `${c.cnpj || "—"} · Saúde ${monitor.score}% · ${monitor.healthLabel}`;
      if (foot) foot.textContent = "Centro de monitoramento · lista permanece ao fundo";

      body.innerHTML = `
        <div class="cli-drawer-summary">
          <div class="cli-drawer-status">
            <span class="cli-sit-pill ${situacao.cls}">${cliListSituacaoIcon(situacao.key)} ${uiSelectEscape(situacao.label)}</span>
            <span class="cli-badge ${c.status === "Ativo" ? "matriz" : "filial"}">${uiSelectEscape(c.status || "—")}</span>
          </div>
          <div class="cli-mon-health ${monitor.healthCls}" style="margin-bottom:10px">
            <div class="cli-mon-health-top">
              <strong>${monitor.score}%</strong>
              <span>${uiSelectEscape(monitor.healthLabel)}</span>
            </div>
            <div class="cli-mon-health-bar" aria-hidden="true"><i style="width:${monitor.score}%"></i></div>
          </div>
          ${renderCliMonIndsHtml(monitor.inds)}
          <div class="fin-drawer-meta cli-drawer-meta">
            <div><span>Alerta</span><strong>${uiSelectEscape(monitor.alertaPrincipal)}</strong></div>
            <div><span>Saldo</span><strong>${money(monitor.saldo)}</strong></div>
            <div><span>A receber</span><strong>${money(monitor.aReceber)}</strong></div>
            <div><span>A pagar</span><strong>${money(monitor.aPagar)}</strong></div>
            <div><span>Regime</span><strong>${uiSelectEscape(c.regime || "—")}</strong></div>
            <div><span>Unidade</span><strong>${uiSelectEscape(tipo)}</strong></div>
            <div><span>Colaboradores</span><strong>${colabs}</strong></div>
            <div><span>Cliente desde</span><strong>${uiSelectEscape(c.clienteDesde || "—")}</strong></div>
            <div><span>Atividade</span><strong>${uiSelectEscape(monitor.atividade.detail)}</strong></div>
          </div>
          <div class="cli-drawer-actions">
            <button type="button" class="btn-primary" data-cli-drawer-act="abrir" data-cli-id="${c.id}">Abrir Cliente</button>
            <button type="button" class="btn-ghost" data-cli-drawer-act="financeiro" data-cli-id="${c.id}">Financeiro</button>
            <button type="button" class="btn-ghost" data-cli-drawer-act="documentos" data-cli-id="${c.id}">Documentos</button>
            <button type="button" class="btn-ghost" data-cli-drawer-act="config" data-cli-id="${c.id}">Configurações</button>
          </div>
        </div>`;

      backdrop.classList.add("open");
      drawer.classList.add("open");
      backdrop.setAttribute("aria-hidden", "false");
      drawer.setAttribute("aria-hidden", "false");
      cliDrawerOpen = true;
    }

    function openCliClienteDrawer(clientId) {
      const c = CLIENTES.find((x) => x.id === clientId);
      if (!c) return;
      cliListSelectedId = c.id;
      cliListMenuId = null;
      paintCliClienteDrawer(c);
      document.querySelectorAll(".cli-list-row.is-selected").forEach((el) => {
        el.classList.toggle("is-selected", el.dataset.cliId === c.id);
      });
    }

    function openClienteEmpresaConfigModal(c) {
      if (!c) return;
      openModal({
        title: "Configurações da empresa",
        sub: c.fantasia || c.nome,
        wide: true,
        body: `
          <label>Razão social</label>
          <input value="${uiSelectEscape(c.razaoSocial || c.nome)}" />
          <label>Nome fantasia</label>
          <input value="${uiSelectEscape(c.fantasia || c.nome)}" />
          <label>CNPJ</label>
          <input value="${uiSelectEscape(c.cnpj || "")}" />
          <label>Regime</label>
          <select>
            ${REGIME_OPTIONS.map((r) => `<option ${c.regime === r ? "selected" : ""}>${r}</option>`).join("")}
          </select>
          <label>Prioridade</label>
          <select>
            <option ${c.prioridade === "alta" ? "selected" : ""}>Alta</option>
            <option ${c.prioridade === "media" ? "selected" : ""}>Média</option>
            <option ${c.prioridade === "baixa" ? "selected" : ""}>Baixa</option>
          </select>
          <label>Cliente desde</label>
          <input value="${uiSelectEscape(c.clienteDesde || "—")}" />`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" data-close onclick="toast('Configurações salvas')">Salvar</button>`,
      });
    }

    function getCliMiniDossieAlerts(c, monitor) {
      const seed = getCliMonitorSeed(c);
      const items = [];
      const cert = monitor?.cert;
      if (cert?.status === "vencido") {
        items.push({
          id: "cert-vencido",
          tone: "bad",
          text: `Certificado digital vencido${cert.validadeLabel ? ` · ${cert.validadeLabel}` : ""}`,
          action: "cert",
          actionLabel: "Abrir monitoramento",
        });
      } else if (cert?.status === "a-vencer") {
        items.push({
          id: "cert-avencer",
          tone: "warn",
          text: monitor.alertaPrincipal || "Certificado a vencer",
          action: "cert",
          actionLabel: "Ver certificado",
        });
      }
      agendaTasks
        .filter((t) => t.clienteId === c.id && !t.arquivada && (t.status === "atrasada" || t.status === "ent-atrasada" || t.status === "justificativa-atrasada"))
        .slice(0, 2)
        .forEach((t) => {
          items.push({
            id: `ent-${t.id}`,
            tone: "bad",
            text: `Entrega atrasada: ${t.nome}`,
            action: "entrega",
            actionLabel: "Abrir entrega",
            taskId: t.id,
          });
        });
      if (seed.docsWarn) {
        items.push({
          id: "xml",
          tone: "warn",
          text: "Falta XML de competência recente",
          action: "solicitar-doc",
          actionLabel: "Solicitar ao cliente",
        });
      }
      if (seed.titVencidos) {
        items.push({
          id: "tit",
          tone: "bad",
          text: seed.titVencidos === 1 ? "Título financeiro vencido" : `${seed.titVencidos} títulos financeiros vencidos`,
          action: "cobranca",
          actionLabel: "Nova cobrança",
        });
      }
      if (seed.concPend) {
        items.push({
          id: "conc",
          tone: "warn",
          text: "Conciliação bancária pendente",
          action: "financeiro",
          actionLabel: "Ir ao financeiro",
        });
      }
      if (seed.auditWarn || seed.auditBad) {
        items.push({
          id: "audit",
          tone: seed.auditBad ? "bad" : "warn",
          text: "Divergência na auditoria de cartões",
          action: "auditoria",
          actionLabel: "Revisar",
        });
      }
      if (c.status !== "Ativo") {
        items.push({
          id: "inativo",
          tone: "warn",
          text: "Cliente marcado como inativo",
          action: "perfil",
          actionLabel: "Ver perfil",
        });
      }
      if (!items.length) {
        items.push({
          id: "ok",
          tone: "ok",
          text: "Nenhum alerta crítico no momento",
          action: "",
          actionLabel: "",
        });
      }
      return items.slice(0, 5);
    }

    function getCliMiniDossieFinanceiro(c, monitor) {
      const aReceber7 = Math.round((monitor.aReceber || 0) * 0.38);
      const aPagar7 = Math.round((monitor.aPagar || 0) * 0.42);
      const liquido7 = aReceber7 - aPagar7;
      const risco = aPagar7 > aReceber7 * 1.05;
      return {
        aReceber7,
        aPagar7,
        liquido7,
        saldo: monitor.saldo || 0,
        caixaLabel: risco ? "Risco de furo" : "Saudável",
        caixaCls: risco ? "is-bad" : "is-ok",
      };
    }

    function getCliMiniDossieObrigacoes(c) {
      const today = "2026-07-14";
      const calIco = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`;
      const alertIco = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>`;
      const shieldIco = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
      const fmtDate = (iso) => {
        const [y, m, d] = String(iso || "").split("-");
        return y && m && d ? `${d}/${m}/${y}` : "";
      };
      const tasks = agendaTasks
        .filter((t) => t.clienteId === c.id && !t.arquivada && String(t.date || "") >= today)
        .slice()
        .sort((a, b) => String(a.date).localeCompare(String(b.date)))
        .slice(0, 4);
      const cert = typeof getCertificadoRow === "function" ? getCertificadoRow(c) : null;
      const items = tasks.map((t) => {
        const diff = Math.round((new Date(t.date) - new Date(today)) / 86400000);
        let when = fmtDate(t.date) || t.date;
        let tone = "ok";
        if (diff === 0) { when = "Hoje"; tone = "warn"; }
        else if (diff === 1) { when = "Amanhã"; tone = "warn"; }
        else if (diff > 1 && diff <= 7) { when = `Em ${diff} dias`; tone = "warn"; }
        else if (diff > 7) { when = `Em ${diff} dias`; tone = "ok"; }
        const tipParts = [fmtDate(t.date), t.prazoLegal || t.competencia].filter(Boolean);
        return {
          when,
          label: t.nome,
          tip: tipParts.join(" · "),
          action: "entrega",
          actionLabel: "Abrir entrega",
          taskId: t.id,
          tone,
          ico: calIco,
        };
      });
      if (cert && cert.status !== "ok") {
        const late = cert.status === "vencido";
        items.splice(Math.min(1, items.length), 0, {
          when: late ? "Atrasado" : "Em breve",
          label: "Vencimento do certificado",
          tip: cert.validadeLabel || "",
          action: "cert",
          actionLabel: late ? "Ver certificado" : "Monitorar",
          tone: late ? "bad" : "warn",
          ico: late ? alertIco : shieldIco,
        });
      }
      if (!items.length) {
        items.push({
          when: "—",
          label: "Sem entregas próximas",
          tip: "Nenhuma obrigação no radar",
          action: "entregas",
          actionLabel: "Ver entregas",
          tone: "ok",
          ico: calIco,
        });
      }
      return items.slice(0, 3);
    }

    function getCliMiniDossieInteracoes(c) {
      const posts = (typeof getCliFeedPosts === "function" ? getCliFeedPosts(c, "todos") : []).slice(0, 4);
      if (posts.length) {
        return posts.map((p) => {
          const raw = String(p.texto || p.tema || "atualizou o dossiê");
          const first = raw.split(/\n/)[0].replace(/^•\s*/, "").trim();
          return {
            when: typeof cliFeedWhenLabel === "function" ? cliFeedWhenLabel(p.at) : "Recente",
            text: `${p.autor} · ${first}`,
          };
        });
      }
      const seed = getCliMonitorSeed(c);
      const catalog = [
        { when: "Há 2h", text: "Marina importou OFX" },
        { when: "Ontem", text: "Carlos enviou e-mail de cobrança" },
        { when: "Há 3 dias", text: "Juliana anexou balancete" },
        { when: "Há 5 dias", text: "Ana revisou obrigações fiscais" },
      ];
      const start = seed.idx % catalog.length;
      return [0, 1, 2].map((i) => catalog[(start + i) % catalog.length]);
    }

    function renderCliMiniDossieHtml(c) {
      if (!c) return "";
      const monitor = getCliMonitorMeta(c);
      const alerts = getCliMiniDossieAlerts(c, monitor);
      const fin = getCliMiniDossieFinanceiro(c, monitor);
      const obrigs = getCliMiniDossieObrigacoes(c);
      const logs = getCliMiniDossieInteracoes(c).slice(0, 3);
      const nome = c.fantasia || c.nome;
      const tab = cliMiniDossieTab || "alertas";
      const alertIco = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>`;
      const alertCount = alerts.filter((a) => a.id !== "ok").length;
      const liquidoTxt = `${fin.liquido7 >= 0 ? "+" : "−"} ${money(Math.abs(fin.liquido7))}`;

      let panel = "";
      if (tab === "financeiro") {
        panel = `
          <div class="cli-mini-dossie-panel-head">
            <div>
              <strong>Termômetro financeiro</strong>
              <span class="sub">Próximos 7 dias</span>
            </div>
            <button type="button" class="btn-ghost sm" data-cli-dossie-act="financeiro" data-cli-id="${c.id}">Abrir financeiro</button>
          </div>
          <div class="fin-drawer-meta cli-drawer-meta">
            <div><span>A receber</span><strong>${money(fin.aReceber7)}</strong></div>
            <div><span>A pagar</span><strong>${money(fin.aPagar7)}</strong></div>
            <div><span>Líquido</span><strong class="${fin.liquido7 >= 0 ? "ok" : "bad"}">${liquidoTxt}</strong></div>
            <div><span>Saúde do caixa</span><strong class="${fin.caixaCls === "is-ok" ? "ok" : "bad"}">${fin.caixaLabel}</strong></div>
          </div>`;
      } else if (tab === "obrigacoes") {
        panel = `
          <div class="cli-mini-dossie-panel-head">
            <div>
              <strong>Radar de obrigações</strong>
              <span class="sub">Próximas entregas</span>
            </div>
            <button type="button" class="btn-ghost sm" data-cli-dossie-act="entregas" data-cli-id="${c.id}">Ver entregas</button>
          </div>
          <div class="fin-drawer-list">
            ${obrigs.map((o) => `
              <button type="button" class="fin-drawer-item cli-mini-dossie-hit is-${o.tone || "ok"}" data-cli-dossie-act="${o.action || "entregas"}" data-cli-id="${c.id}"${o.taskId ? ` data-task-id="${o.taskId}"` : ""}>
                <span class="rank" aria-hidden="true">${o.ico || ""}</span>
                <div>
                  <strong>
                    <span class="cli-mini-dossie-when">${uiSelectEscape(o.when)}</span>
                    ${uiSelectEscape(o.label)}
                  </strong>
                  ${o.tip ? `<div class="meta">${uiSelectEscape(o.tip)}</div>` : ""}
                </div>
                <span class="amt">${uiSelectEscape(o.actionLabel || "Abrir")}</span>
              </button>`).join("")}
          </div>`;
      } else if (tab === "interacoes") {
        const chatIco = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>`;
        panel = `
          <div class="cli-mini-dossie-panel-head">
            <div>
              <strong>Últimas interações</strong>
              <span class="sub">Log da equipe</span>
            </div>
            <button type="button" class="btn-ghost sm" data-cli-dossie-act="comentarios" data-cli-id="${c.id}">Ver todas</button>
          </div>
          <div class="fin-drawer-list">
            ${logs.map((l) => `
              <button type="button" class="fin-drawer-item cli-mini-dossie-hit" data-cli-dossie-act="comentarios" data-cli-id="${c.id}">
                <span class="rank" aria-hidden="true">${chatIco}</span>
                <div>
                  <strong>${uiSelectEscape(l.text)}</strong>
                  <div class="meta">${uiSelectEscape(l.when)}</div>
                </div>
                <span class="amt">Abrir</span>
              </button>`).join("")}
          </div>`;
      } else {
        panel = `
          <div class="cli-mini-dossie-panel-head">
            <div>
              <strong>Raio-X dos alertas</strong>
              <span class="sub">Prioridade operacional</span>
            </div>
          </div>
          <div class="fin-drawer-list">
            ${alerts.map((a) => `
              <button type="button" class="fin-drawer-item cli-mini-dossie-hit is-${a.tone}"${a.action ? ` data-cli-dossie-act="${a.action}" data-cli-id="${c.id}"${a.taskId ? ` data-task-id="${a.taskId}"` : ""}` : " disabled"}>
                <span class="rank" aria-hidden="true">${alertIco}</span>
                <div>
                  <strong>${uiSelectEscape(a.text)}</strong>
                </div>
                <span class="amt">${uiSelectEscape(a.actionLabel || "—")}</span>
              </button>`).join("")}
          </div>`;
      }

      return `
        <section class="cli-mini-dossie" data-cli-dossie="${c.id}" aria-label="Mini-dossiê operacional de ${uiSelectEscape(nome)}">
          <div class="cli-tabs cli-mini-dossie-tabs" role="tablist" aria-label="Seções do dossiê">
            <button type="button" class="cli-tab${tab === "alertas" ? " active" : ""}" role="tab" aria-selected="${tab === "alertas"}" data-cli-dossie-tab="alertas">Alertas${alertCount ? ` · ${alertCount}` : ""}</button>
            <button type="button" class="cli-tab${tab === "financeiro" ? " active" : ""}" role="tab" aria-selected="${tab === "financeiro"}" data-cli-dossie-tab="financeiro">Financeiro</button>
            <button type="button" class="cli-tab${tab === "obrigacoes" ? " active" : ""}" role="tab" aria-selected="${tab === "obrigacoes"}" data-cli-dossie-tab="obrigacoes">Obrigações${obrigs.length ? ` · ${obrigs.length}` : ""}</button>
            <button type="button" class="cli-tab${tab === "interacoes" ? " active" : ""}" role="tab" aria-selected="${tab === "interacoes"}" data-cli-dossie-tab="interacoes">Interações</button>
          </div>

          <div class="cli-mini-dossie-panel" role="tabpanel">
            ${panel}
          </div>
        </section>`;
    }

    function resolveCliDossieClientId(rowsMeta) {
      if (!rowsMeta?.length) return null;
      if (rowsMeta.length === 1) return rowsMeta[0].c.id;
      if (cliListSelectedId && rowsMeta.some((r) => r.c.id === cliListSelectedId)) return cliListSelectedId;
      return null;
    }

    function selectCliListForDossie(clientId, { toggle } = {}) {
      if (!clientId) {
        cliListSelectedId = null;
        cliMiniDossieTab = "alertas";
        return;
      }
      if (toggle && cliListSelectedId === clientId) {
        cliListSelectedId = null;
        cliMiniDossieTab = "alertas";
        return;
      }
      if (cliListSelectedId !== clientId) cliMiniDossieTab = "alertas";
      cliListSelectedId = clientId;
      closeCliClienteDrawer({ silent: true, keepSelection: true });
    }

    function handleCliMiniDossieAction(act, clientId, el) {
      const c = CLIENTES.find((x) => x.id === clientId);
      if (!c) return;
      if (act === "perfil") {
        openClientePerfil(clientId);
        return;
      }
      if (act === "comentarios") {
        openClientePerfil(clientId, "comentarios");
        return;
      }
      if (act === "whatsapp") {
        const phone = String(c.whatsapp || c.telefone || "").replace(/\D/g, "");
        if (phone.length >= 10) {
          window.open(`https://wa.me/55${phone.replace(/^55/, "")}`, "_blank", "noopener");
          toast(`WhatsApp · ${c.fantasia || c.nome}`);
        } else {
          toast("WhatsApp não cadastrado — use o perfil para incluir o número");
        }
        return;
      }
      if (act === "documento") {
        openClientePerfil(clientId, "documentos");
        toast("Abrindo documentos para gerar");
        return;
      }
      if (act === "cobranca") {
        openClientePerfil(clientId, "financeiro");
        toast("Nova cobrança · financeiro do cliente");
        return;
      }
      if (act === "cert") {
        if (typeof gotoSecurityCertForCliente === "function") gotoSecurityCertForCliente(clientId);
        else openClientePerfil(clientId);
        return;
      }
      if (act === "entrega") {
        const taskId = Number(el?.dataset?.taskId);
        if (taskId && typeof openEntregaDetailModal === "function") openEntregaDetailModal(taskId);
        else openClientePerfil(clientId, "entregas");
        return;
      }
      if (act === "solicitar-doc") {
        toast(`Solicitação de XML enviada · ${c.fantasia || c.nome}`);
        return;
      }
      if (act === "financeiro") {
        openClientePerfil(clientId, "financeiro");
        return;
      }
      if (act === "entregas") {
        openClientePerfil(clientId, "entregas");
        return;
      }
      if (act === "auditoria") {
        openClientePerfil(clientId, "financeiro");
        toast("Abrindo financeiro · auditoria");
        return;
      }
      toast(act || "Ação registrada");
    }

    function renderClientesList() {
      const wrap = document.getElementById("clientesWrap");
      if (!wrap) return;
      const rowsMeta = collectCliListRowsMeta();
      if (rowsMeta.length === 1) {
        cliListSelectedId = rowsMeta[0].c.id;
      } else if (cliListSelectedId && !rowsMeta.some((r) => r.c.id === cliListSelectedId)) {
        cliListSelectedId = null;
      }
      const dossieId = resolveCliDossieClientId(rowsMeta);
      const baseForKpi = (() => {
        let list = [...CLIENTES];
        if (cliEmpresaFilter && cliEmpresaFilter !== "all") {
          list = list.filter((c) => c.id === cliEmpresaFilter);
        }
        if (cliRegimeFilter) list = list.filter((c) => c.regime === cliRegimeFilter);
        return list.map((c) => {
          const cert = typeof getCertificadoRow === "function" ? getCertificadoRow(c) : null;
          return {
            c,
            colabs: (c.funcInternos || 0) + (c.funcExternos || 0),
            pendencias: getCliGestaoPendenciasCount(c),
            cert,
          };
        });
      })();
      const kpis = {
        empresas: baseForKpi.length,
        ativos: baseForKpi.filter((r) => r.c.status === "Ativo").length,
        pendencias: baseForKpi.filter((r) => r.pendencias > 0).length,
        colabs: baseForKpi.reduce((acc, r) => acc + r.colabs, 0),
        certAlerta: baseForKpi.filter((r) => r.cert && r.cert.status !== "ok").length,
      };
      const kpiActive = cliListKpiFilter || "";
      wrap.innerHTML = `
        <div class="cli-list-toolbar" role="toolbar" aria-label="Ferramentas da carteira">
          ${renderModuleEmpresaPickerHtml("clientes")}
          <div class="proc-filter field">
            <svg class="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>
            <select id="cliRegimeFilter" aria-label="Filtrar por regime">
              <option value="">Regime</option>
              ${REGIME_OPTIONS.map((r) => `<option value="${r}" ${cliRegimeFilter === r ? "selected" : ""}>${r}</option>`).join("")}
            </select>
          </div>
          <span class="cli-count">${rowsMeta.length} empresa${rowsMeta.length === 1 ? "" : "s"} no filtro</span>
          <button type="button" class="btn-primary cli-add-btn" data-cli-add-empresa>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Nova empresa
          </button>
        </div>
        <div class="cli-list-kpis" aria-label="Indicadores da carteira filtrada">
          <button type="button" class="cli-list-kpi${!kpiActive ? " is-active" : ""}" data-cli-list-kpi="" aria-pressed="${!kpiActive}">
            <span class="cli-list-kpi-top">
              <span class="cli-list-kpi-ico" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg></span>
              <span class="lab">Empresas</span>
            </span>
            <strong>${kpis.empresas}</strong>
            <span class="cli-list-kpi-hint">Carteira no filtro</span>
            <span class="cli-list-kpi-meter" aria-hidden="true"><i style="width:100%"></i></span>
          </button>
          <button type="button" class="cli-list-kpi ok${kpiActive === "ativas" ? " is-active" : ""}" data-cli-list-kpi="ativas" aria-pressed="${kpiActive === "ativas"}">
            <span class="cli-list-kpi-top">
              <span class="cli-list-kpi-ico" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg></span>
              <span class="lab">Ativas</span>
            </span>
            <strong>${kpis.ativos}</strong>
            <span class="cli-list-kpi-hint">${kpis.empresas ? Math.round((kpis.ativos / kpis.empresas) * 100) : 0}% da carteira</span>
            <span class="cli-list-kpi-meter" aria-hidden="true"><i style="width:${kpis.empresas ? Math.round((kpis.ativos / kpis.empresas) * 100) : 0}%"></i></span>
          </button>
          <button type="button" class="cli-list-kpi${kpis.pendencias ? " warn" : ""}${kpiActive === "pendencias" ? " is-active" : ""}" data-cli-list-kpi="pendencias" aria-pressed="${kpiActive === "pendencias"}">
            <span class="cli-list-kpi-top">
              <span class="cli-list-kpi-ico" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg></span>
              <span class="lab">Com pendências</span>
            </span>
            <strong>${kpis.pendencias}</strong>
            <span class="cli-list-kpi-hint">${kpis.pendencias ? "Requer atenção" : "Nenhuma crítica"}</span>
            <span class="cli-list-kpi-meter" aria-hidden="true"><i style="width:${kpis.empresas ? Math.min(100, Math.round((kpis.pendencias / kpis.empresas) * 100)) : 0}%"></i></span>
          </button>
          <button type="button" class="cli-list-kpi${kpiActive === "colaboradores" ? " is-active" : ""}" data-cli-list-kpi="colaboradores" aria-pressed="${kpiActive === "colaboradores"}">
            <span class="cli-list-kpi-top">
              <span class="cli-list-kpi-ico" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>
              <span class="lab">Colaboradores</span>
            </span>
            <strong>${kpis.colabs}</strong>
            <span class="cli-list-kpi-hint">${kpis.empresas ? Math.round(kpis.colabs / kpis.empresas) : 0} méd. por empresa</span>
            <span class="cli-list-kpi-meter" aria-hidden="true"><i style="width:${Math.min(100, Math.round(kpis.colabs / 2))}%"></i></span>
          </button>
          <button type="button" class="cli-list-kpi${kpis.certAlerta ? " bad" : ""}${kpiActive === "cert" ? " is-active" : ""}" data-cli-list-kpi="cert" aria-pressed="${kpiActive === "cert"}">
            <span class="cli-list-kpi-top">
              <span class="cli-list-kpi-ico" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
              <span class="lab">Cert. em alerta</span>
            </span>
            <strong>${kpis.certAlerta}</strong>
            <span class="cli-list-kpi-hint">${kpis.certAlerta ? "Vencido ou a vencer" : "Certificados ok"}</span>
            <span class="cli-list-kpi-meter" aria-hidden="true"><i style="width:${kpis.empresas ? Math.min(100, Math.round((kpis.certAlerta / kpis.empresas) * 100)) : 0}%"></i></span>
          </button>
        </div>
        <div class="cli-grid cli-mon-grid${dossieId ? " has-dossie" : ""}" id="cliGrid">
          <div class="cli-list-head">
            <span>Empresa</span>
            <span>Saúde do Cliente</span>
            <span>Alertas</span>
            <span>Atividade</span>
            <span class="cli-head-actions">Ações</span>
          </div>
          ${rowsMeta.length ? rowsMeta.map(({ c, monitor }) => {
            const tipo = c.tipoUnidade || "Matriz";
            const tipoCls = tipo === "Filial" ? "filial" : "matriz";
            const selected = dossieId === c.id;
            const m = monitor || getCliMonitorMeta(c);
            const dossieHtml = selected ? renderCliMiniDossieHtml(c) : "";
            return `
              <div class="cli-list-row cli-mon-row is-${tipoCls}${selected ? " is-selected is-dossie-anchor" : ""}" data-cli-id="${c.id}" role="button" tabindex="0" aria-label="${selected ? "Recolher" : "Expandir"} dossiê de ${uiSelectEscape(c.fantasia || c.nome)}" aria-selected="${selected}" aria-expanded="${selected}">
                <div class="cli-id-cell">
                  <strong title="${uiSelectEscape(c.razaoSocial || c.nome)}">${uiSelectEscape(c.fantasia || c.nome)}</strong>
                  <span class="cli-id-sub">${uiSelectEscape(c.cnpj)}</span>
                </div>
                <div class="cli-mon-health ${m.healthCls}" aria-label="Saúde ${m.score}% · ${m.healthLabel}">
                  <div class="cli-mon-health-top">
                    <strong>${m.score}%</strong>
                    <span>${uiSelectEscape(m.healthLabel)}</span>
                  </div>
                  <div class="cli-mon-health-bar" aria-hidden="true"><i style="width:${m.score}%"></i></div>
                </div>
                <div class="cli-mon-alert ${m.alertaCls}">
                  <strong title="${uiSelectEscape(m.alertaPrincipal)}">${uiSelectEscape(m.alertaPrincipal)}</strong>
                  ${m.alertsCount > 1 ? `<span>+${m.alertsCount - 1}</span>` : ""}
                </div>
                <div class="cli-mon-ativ">
                  <strong>${uiSelectEscape(m.atividade.short)}</strong>
                  <span>${uiSelectEscape(m.atividade.detail)}</span>
                </div>
                <div class="cli-mon-actions" data-cli-actions>
                  <button type="button" class="btn-outline sm" data-cli-dossie-act="perfil" data-cli-id="${c.id}">Abrir perfil</button>
                </div>
              </div>
              ${dossieHtml}`;
          }).join("") : `<div class="cli-empty-panel">${cliEmpresaFilter !== "all" || cliRegimeFilter || kpiActive ? "Nenhuma empresa correspondente aos filtros" : "Nenhum cliente cadastrado"}</div>`}
        </div>`;
      enhanceUiSelects(wrap);
      if (cliDrawerOpen && cliListSelectedId && !dossieId) {
        const still = CLIENTES.find((x) => x.id === cliListSelectedId);
        if (still) paintCliClienteDrawer(still);
        else closeCliClienteDrawer({ silent: true });
      } else if (dossieId) {
        closeCliClienteDrawer({ silent: true, keepSelection: true });
      }
    }

    function getCliProcessos(c, applyFilters) {
      let list = (sections.find((s) => s.id === "processos")?.items || [])
        .filter((p) => p.clienteId === c.id && !p.arquivado);
      if (!applyFilters) return list;
      const q = normalizeSearchText(cliProcFiltros.search);
      if (q) {
        list = list.filter((p) =>
          normalizeSearchText([p.title, p.dept, p.responsavel, p.cliente].filter(Boolean).join(" ")).includes(q)
        );
      }
      if (cliProcFiltros.status) {
        list = list.filter((p) => matchesProcFilterStatus(p.sucesso, cliProcFiltros.status));
      }
      if (cliProcFiltros.dept) list = list.filter((p) => p.dept === cliProcFiltros.dept);
      if (cliProcFiltros.responsavel) list = list.filter((p) => p.responsavel === cliProcFiltros.responsavel);
      return list;
    }

    function renderCliProcStatusMenuHtml() {
      return [
        `<button type="button" class="agenda-ops-status-opt${!cliProcFiltros.status ? " active" : ""}" role="option" data-cli-proc-status="">
          <i class="status-dot" style="background:#94a3b8" aria-hidden="true"></i>
          <span>Todas</span>
        </button>`,
        ...PROC_FILTER_STATUS_OPTIONS.map((o) => `
          <button type="button" class="agenda-ops-status-opt${cliProcFiltros.status === o.value ? " active" : ""}" role="option" data-cli-proc-status="${o.value}">
            <i class="status-dot" style="background:${o.color}" aria-hidden="true"></i>
            <span>${o.label}</span>
          </button>`),
      ].join("");
    }

    function renderCliPerfilProcessos(c) {
      const all = getCliProcessos(c, false);
      const procs = getCliProcessos(c, true);
      const resps = [...new Set(all.map((p) => p.responsavel).filter(Boolean))];
      const statusMeta = cliProcFiltros.status
        ? procFilterStatusMeta(cliProcFiltros.status)
        : { label: "Todas", color: "#94a3b8" };
      const total = procs.length;
      const andamento = procs.filter((p) => p.sucesso === null).length;
      const ok = procs.filter((p) => p.sucesso === true).length;
      const bad = procs.filter((p) => p.sucesso === false).length;
      const kpis = `
        <div class="proc-kpis" style="margin-bottom:12px">
          <div class="proc-kpi totais">
            <div class="kpi-top">${icons.processos}<span>Total de Processos</span></div>
            <div class="kpi-value">${total}</div>
          </div>
          <div class="proc-kpi andamento">
            <div class="kpi-top"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4V8z"/></svg><span>Em Andamento</span></div>
            <div class="kpi-value">${andamento}</div>
          </div>
          <div class="proc-kpi sucesso">
            <div class="kpi-top"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg><span>Bem sucedidos</span></div>
            <div class="kpi-value">${ok}</div>
          </div>
          <div class="proc-kpi falha">
            <div class="kpi-top"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg><span>Mal sucedidos</span></div>
            <div class="kpi-value">${bad}</div>
          </div>
        </div>`;
      const toolbar = `
        <div class="cli-tab-toolbar proc-filters-like">
          <div class="proc-filter search">
            <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="search" id="cliProcSearch" placeholder="Buscar processo" value="${(cliProcFiltros.search || "").replace(/"/g, "&quot;")}" aria-label="Buscar processos" />
          </div>
          <div class="proc-filter field agenda-ops-status" id="cliProcStatusWrap">
            <button type="button" class="agenda-ops-status-btn" id="cliProcStatusBtn" aria-haspopup="listbox" aria-expanded="false" aria-label="Filtrar status">
              <i class="status-dot" id="cliProcStatusDot" style="background:${statusMeta.color}" aria-hidden="true"></i>
              <span class="status-label" id="cliProcStatusLabel">${statusMeta.label}</span>
              <svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="agenda-ops-status-menu" id="cliProcStatusMenu" role="listbox" aria-label="Status">
              ${renderCliProcStatusMenuHtml()}
            </div>
          </div>
          <div class="proc-filter field">
            <svg class="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>
            <select id="cliProcDept" aria-label="Departamento">
              <option value="">Departamento</option>
              ${PROC_DEPT_OPTIONS.map((d) => `<option value="${d}" ${cliProcFiltros.dept === d ? "selected" : ""}>${d}</option>`).join("")}
            </select>
          </div>
          <div class="proc-filter field">
            <svg class="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <select id="cliProcResp" aria-label="Responsável">
              <option value="">Responsável</option>
              ${resps.map((r) => `<option value="${r}" ${cliProcFiltros.responsavel === r ? "selected" : ""}>${r}</option>`).join("")}
            </select>
          </div>
          <div class="proc-view-toggle" role="group" aria-label="Visualização">
            <button type="button" class="btn-icon tip-bottom${cliProcView === "card" ? " active" : ""}" data-tip="Cards" data-cli-proc-view="card" aria-label="Cards" aria-pressed="${cliProcView === "card"}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            </button>
            <button type="button" class="btn-icon tip-bottom${cliProcView === "list" ? " active" : ""}" data-tip="Lista" data-cli-proc-view="list" aria-label="Lista" aria-pressed="${cliProcView === "list"}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
            </button>
          </div>
        </div>`;

      if (!procs.length) {
        return `${kpis}${toolbar}<div class="cli-empty-panel">Nenhum processo correspondente aos filtros</div>`;
      }

      if (cliProcView === "list") {
        return `${kpis}${toolbar}
          <div class="proc-grid is-list" style="border:1px solid var(--border);border-radius:8px;overflow:hidden">
            <div class="proc-list-head">
              <span>Processo</span><span>Status</span><span>Depto</span><span>Progresso</span><span>Responsável</span><span>Criado</span><span></span>
            </div>
            ${procs.map((p) => {
              const st = procStatusLabel(p);
              const prog = procProgress(p.etapas);
              const criadoFmt = p.criado ? p.criado.split("-").reverse().join("/") : "—";
              return `
                <div class="proc-list-row status-${st.cls}" data-cli-proc-id="${p.id}" role="button" tabindex="0">
                  <div class="title-cell"><strong>${p.title}</strong><span class="pid">#${p.id}</span></div>
                  <div class="cell cell-status"><span class="proc-badge ${st.cls}">${st.text}</span></div>
                  <div class="cell cell-dept muted">${p.dept}</div>
                  <div class="cell cell-prog">
                    <div class="proc-progress">
                      <div class="proc-progress-bar"><i style="width:${prog.pct}%"></i></div>
                      <span>${prog.done}/${prog.total}</span>
                    </div>
                  </div>
                  <div class="cell cell-resp">${p.responsavel}</div>
                  <div class="cell cell-date muted">${criadoFmt}</div>
                  <div class="cell cell-actions">
                    <button type="button" class="agenda-edit-btn tip-bottom" data-cli-proc-edit="${p.id}" data-tip="Editar processo" aria-label="Editar">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    </button>
                  </div>
                </div>`;
            }).join("")}
          </div>`;
      }

      return `${kpis}${toolbar}
        <div class="proc-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px">
          ${procs.map((p) => {
            const st = procStatusLabel(p);
            const prog = procProgress(p.etapas);
            const criadoFmt = p.criado ? p.criado.split("-").reverse().join("/") : "—";
            return `
              <div class="proc-card status-${st.cls}" data-cli-proc-id="${p.id}" role="button" tabindex="0">
                <div class="proc-card-head">
                  <strong>${p.title}</strong>
                  <div class="proc-card-head-actions">
                    <span class="pid">#${p.id}</span>
                    <button type="button" class="agenda-edit-btn tip-bottom" data-cli-proc-edit="${p.id}" data-tip="Editar processo" aria-label="Editar">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    </button>
                  </div>
                </div>
                <div class="proc-card-meta">
                  <span class="proc-badge ${st.cls}">${st.text}</span>
                  <span class="proc-badge dept">${p.dept}</span>
                </div>
                <div class="proc-card-foot">
                  <div class="proc-progress">
                    <div class="proc-progress-bar"><i style="width:${prog.pct}%"></i></div>
                    <span>${prog.done}/${prog.total}</span>
                  </div>
                  <span>${p.responsavel} · ${criadoFmt}</span>
                </div>
              </div>`;
          }).join("")}
        </div>`;
    }

    function cliFeedEsc(s) {
      return String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function renderCliFeedTextHtml(raw) {
      const lines = String(raw ?? "")
        .split(/\n/)
        .map((l) => l.trim())
        .filter(Boolean);
      if (!lines.length) return `<div class="cli-feed-text"></div>`;
      const title = lines[0];
      const bullets = lines.slice(1).map((l) => l.replace(/^[•\-\*]\s*/, "").trim()).filter(Boolean);
      if (!bullets.length) {
        return `<div class="cli-feed-text"><p class="cli-feed-text-body">${cliFeedEsc(title)}</p></div>`;
      }
      return `
        <div class="cli-feed-text">
          <p class="cli-feed-text-title">${cliFeedEsc(title)}</p>
          <ul class="cli-feed-text-list">
            ${bullets.map((b) => `<li>${cliFeedEsc(b)}</li>`).join("")}
          </ul>
        </div>`;
    }

    function cliFeedInitials(nome) {
      return String(nome || "?")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0])
        .join("")
        .toUpperCase() || "?";
    }

    function cliFeedTone(nome) {
      let h = 0;
      for (let i = 0; i < String(nome || "").length; i++) h = (h + nome.charCodeAt(i) * (i + 1)) % 6;
      return h;
    }

    function cliFeedWhenLabel(at) {
      const dt = at instanceof Date ? at : new Date(at);
      if (Number.isNaN(dt.getTime())) return "—";
      const now = new Date(APP_TODAY.getFullYear(), APP_TODAY.getMonth(), APP_TODAY.getDate(), 17, 30);
      const diffMs = Math.max(0, now.getTime() - dt.getTime());
      const mins = Math.round(diffMs / 60000);
      const pad = (n) => String(n).padStart(2, "0");
      const hm = `${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
      if (mins < 1) return "Agora";
      if (mins < 60) return `Há ${mins} min`;
      if (mins < 24 * 60) {
        const h = Math.floor(mins / 60);
        return `${h === 1 ? "Há 1 h" : `Há ${h} h`} · ${hm}`;
      }
      const dayDiff = Math.round((startOfDay(now) - startOfDay(dt)) / 86400000);
      if (dayDiff === 1) return `Ontem ${hm}`;
      if (dayDiff < 7) return `Há ${dayDiff} dias · ${hm}`;
      return `${pad(dt.getDate())}/${pad(dt.getMonth() + 1)}/${dt.getFullYear()} ${hm}`;
    }

    function seedCliFeed(c) {
      const short = c.fantasia || c.short || c.nome;
      return [
        {
          id: `${c.id}-f1`,
          autor: "Ana Costa",
          cargo: "Fiscal",
          visibilidade: "geral",
          tema: "contatos",
          texto: `Contato NF / XML — ${short}\n• Falar com João (financeiro do cliente)\n• Canal preferencial: WhatsApp\n• Evitar ligações depois das 17h`,
          at: new Date(2026, 6, 14, 9, 15),
          pinned: true,
          uteis: 4,
          utilMe: true,
        },
        {
          id: `${c.id}-f2`,
          autor: "Juliana Reis",
          cargo: "Pessoal",
          visibilidade: "geral",
          tema: "preferencias",
          texto: "Preferências de contato\n• Canal: e-mail corporativo\n• Sócio costuma estar indisponível na sexta de manhã\n• Agendar revisões para terça ou quarta",
          at: new Date(2026, 6, 13, 16, 40),
          pinned: false,
          uteis: 2,
          utilMe: false,
        },
        {
          id: `${c.id}-f3`,
          autor: "Marcos Lima",
          cargo: "Contábil",
          visibilidade: "privado",
          tema: "financeiro",
          texto: "Honorários\n• Cliente costuma questionar o rateio da folha\n• Antes de enviar o boleto, conferir se a média de funcionários bate com o relatório interno",
          at: new Date(2026, 6, 12, 11, 5),
          pinned: false,
          uteis: 3,
          utilMe: false,
        },
        {
          id: `${c.id}-f4`,
          autor: "Ana Costa",
          cargo: "Fiscal",
          visibilidade: "geral",
          tema: "fiscal",
          texto: "Regime e particularidades\n• Pedem revisão do DAS antes do envio\n• Usar o checklist interno na pasta do cliente\n• Não inventar caminho novo no processo",
          at: new Date(2026, 6, 10, 14, 22),
          pinned: false,
          uteis: 5,
          utilMe: true,
        },
        {
          id: `${c.id}-f5`,
          autor: "Juliana Reis",
          cargo: "Pessoal",
          visibilidade: "geral",
          tema: "operacional",
          texto: "Documentos e prazos\n• Assinaturas atrasam se o pedido for só no fim do mês\n• Alinhar com o RH do cliente até o dia 20",
          at: new Date(2026, 6, 8, 10, 0),
          pinned: false,
          uteis: 1,
          utilMe: false,
        },
      ];
    }

    function ensureCliFeed(c) {
      if (!cliFeedByClient[c.id]) cliFeedByClient[c.id] = seedCliFeed(c);
      return cliFeedByClient[c.id];
    }

    function cliFeedVisLabel(vis) {
      if (vis === "privado") return "Privado";
      return "Geral";
    }

    function getCliFeedPosts(c, filter = cliFeedFilter) {
      const posts = ensureCliFeed(c).slice();
      const filtered = posts.filter((p) => {
        if (filter === "todos") return true;
        if (filter === "geral" || filter === "privado") return p.visibilidade === filter;
        return p.tema === filter;
      });
      filtered.sort((a, b) => {
        if (!!b.pinned - !!a.pinned) return !!b.pinned - !!a.pinned;
        return new Date(b.at) - new Date(a.at);
      });
      return filtered;
    }

    function renderCliFeed(c) {
      const me = CLI_FEED_ME;
      if (cliFeedFilter === "mim") cliFeedFilter = "todos";
      const posts = getCliFeedPosts(c);
      const filters = [
        { id: "todos", label: "Todos" },
        { id: "geral", label: "Gerais" },
        { id: "privado", label: "Privados" },
        ...CLI_FEED_TEMAS,
      ];
      const temaOpts = CLI_FEED_TEMAS.map((t) => `<option value="${t.id}">${t.label}</option>`).join("");
      const list = posts.length
        ? posts.map((p) => {
            const temaMeta = CLI_FEED_TEMAS.find((t) => t.id === p.tema);
            const when = cliFeedWhenLabel(p.at);
            const iso = p.at instanceof Date ? p.at.toISOString() : String(p.at);
            return `
            <article class="cli-feed-post${p.pinned ? " is-pinned" : ""}" data-cli-feed-id="${p.id}">
              <div class="cli-feed-avatar tone-${cliFeedTone(p.autor)}" aria-hidden="true">${cliFeedEsc(cliFeedInitials(p.autor))}</div>
              <div class="cli-feed-post-body">
                <div class="cli-feed-post-head">
                  <div class="cli-feed-who">
                    <span class="cli-feed-name">${cliFeedEsc(p.autor)}</span>
                    <span class="cli-feed-sep" aria-hidden="true">·</span>
                    <span class="cli-feed-role">${cliFeedEsc(p.cargo || "")}</span>
                  </div>
                  <time class="cli-feed-when" datetime="${iso}" title="${cliFeedEsc(when)}">${cliFeedEsc(when)}</time>
                </div>
                <div class="cli-feed-tags">
                  ${p.pinned ? `<span class="cli-feed-tag pin">Fixado</span>` : ""}
                  <span class="cli-feed-tag vis-${p.visibilidade}">${cliFeedVisLabel(p.visibilidade)}</span>
                  <span class="cli-feed-tag tema-${p.tema}">${cliFeedEsc(temaMeta?.label || p.tema)}</span>
                </div>
                ${renderCliFeedTextHtml(p.texto)}
                <div class="cli-feed-foot">
                  <button type="button" class="cli-feed-util${p.utilMe ? " is-on" : ""}" data-cli-feed-util="${p.id}" aria-pressed="${p.utilMe ? "true" : "false"}">
                    Útil · ${p.uteis || 0}
                  </button>
                </div>
              </div>
            </article>`;
          }).join("")
        : `<div class="cli-feed-empty">Nenhuma nota neste filtro. Publique um comentário para o time.</div>`;
      return `
        <div class="cli-feed">
          <header class="cli-feed-intro">
            <h3>Mural do cliente</h3>
            <p>Notas do time sobre contatos, preferências e rotinas — o que ajuda quem entra depois a trabalhar nesta empresa.</p>
          </header>
          <div class="cli-feed-composer">
            <div class="cli-feed-avatar tone-${cliFeedTone(me.nome)}" aria-hidden="true">${me.initials}</div>
            <div class="cli-feed-composer-main">
              <textarea id="cliFeedInput" placeholder="Ex.: Para falar sobre notas, falar com o João do financeiro..." aria-label="Novo comentário do mural"></textarea>
              <div class="cli-feed-composer-bar">
                <select id="cliFeedVis" aria-label="Visibilidade">
                  <option value="geral">Geral — todo o time</option>
                  <option value="privado">Privado — só analistas</option>
                </select>
                <select id="cliFeedTema" aria-label="Tema">${temaOpts}</select>
                <button type="button" class="btn-primary" data-cli-feed-publish>Publicar</button>
              </div>
            </div>
          </div>
          <div class="cli-feed-filters" role="tablist" aria-label="Filtrar mural">
            ${filters.map((f) => `
              <button type="button" class="cli-feed-filter${cliFeedFilter === f.id ? " active" : ""}" role="tab" aria-selected="${cliFeedFilter === f.id}" data-cli-feed-filter="${f.id}">${f.label}</button>
            `).join("")}
          </div>
          <div class="cli-feed-list">${list}</div>
        </div>`;
    }

    function getCliXmlVisaoModel(c) {
      const fatBase = Math.max(80000, Math.round((c.faturamento || 120000) * 0.28));
      const faturamento = fatBase;
      const impostos = Math.round(faturamento * 0.142);
      const custos = Math.round(faturamento * 0.686);
      const sobrou = faturamento - custos - impostos;
      const sobrouPct = faturamento > 0 ? +((sobrou / faturamento) * 100).toFixed(1) : 0;
      const statusCls = sobrouPct >= 12 ? "ok" : (sobrouPct >= 5 ? "warn" : "bad");
      const statusLabel = statusCls === "ok"
        ? "Tudo certo"
        : (statusCls === "warn" ? "Atenção em produtos" : "Há notas com problema");
      return {
        periodo: "Julho/2026",
        faturamento,
        impostos,
        sobrou,
        sobrouPct,
        statusCls,
        statusLabel,
        qtdNotas: 48,
        qtdOk: 46,
        qtdProblema: 2,
        criticos: [
          { nome: "Medicamento Genérico X 500mg", meta: "12 notas · R$ 18.400,00", margemPct: -2.4, tom: "bad" },
          { nome: "Kit Higiene Promo", meta: "8 notas · R$ 6.120,00", margemPct: 3.1, tom: "warn" },
          { nome: "Suplemento Vita Plus", meta: "5 notas · R$ 4.890,00", margemPct: 4.6, tom: "warn" },
          { nome: "Fralda Confort P", meta: "9 notas · R$ 9.750,00", margemPct: -0.8, tom: "bad" },
        ],
        notas: [
          { data: "11/07/2026", numero: "352607…1234", tipo: "NF-e", valor: 560.0, impostos: 78.4, status: "ok" },
          { data: "08/07/2026", numero: "352607…1299", tipo: "NF-e", valor: 1280.0, impostos: 179.2, status: "ok" },
          { data: "05/07/2026", numero: "652607…0123", tipo: "NFC-e", valor: 89.9, impostos: 8.1, status: "ok" },
          { data: "02/07/2026", numero: "572607…0456", tipo: "CT-e", valor: 320.0, impostos: 28.8, status: "ok" },
          { data: "01/07/2026", numero: "352607…0881", tipo: "NF-e", valor: 2140.0, impostos: 299.6, status: "problema" },
          { data: "01/07/2026", numero: "352607…0882", tipo: "NF-e", valor: 450.0, impostos: 0, status: "problema" },
        ],
        logs: [
          { when: "16/07 · 09:42", what: "Importação em lote", res: "46 ok · 2 com problema" },
          { when: "14/07 · 16:10", what: "Nota incluída no período", res: "+ R$ 1.280,00" },
          { when: "12/07 · 11:05", what: "Importação unitária", res: "1 nota ok" },
        ],
      };
    }

    function renderCliXmlVisaoHtml(c) {
      return renderCliXmlAnaliseModule(c);
    }

    function startCliXmlLoteDemo() {
      const c = CLIENTES.find((x) => x.id === cliPerfilId) || getPortalCliente();
      applyCliXmlSimulacaoPreAprovada(c, { tab: "dashboard" });
      destroyCliXmlCharts();
      refreshCliXmlUi();
    }

    /**
     * Acesso ao Cliente · aba Entregas.
     * Espelha KPIs + Calendário + Menu de Tarefas + Quadro de Entregas.
     * Sem Gestão de Processos; sem Funcionário/Responsável; só ações do cliente.
     */
    function renderCliEntregasEspelhada(c) {
      const y = cliEntregaMonth.getFullYear();
      const m = String(cliEntregaMonth.getMonth() + 1).padStart(2, "0");
      const periodPrefix = `${y}-${m}`;
      const allPeriod = agendaTasks.filter((t) => t.clienteId === c.id && !t.arquivada && String(t.date || "").startsWith(periodPrefix));
      const totais = allPeriod.length;
      const atrasadas = allPeriod.filter((t) => t.status === "atrasada" || t.status === "ent-atrasada" || t.status === "justificativa-atrasada").length;
      const noPrazo = allPeriod.filter((t) => t.status === "no-prazo" || t.status === "ent-antecipada").length;
      const pendentes = allPeriod.filter((t) => {
        const meta = procStatusMeta(t.status);
        return t.status === "atrasada" || t.status === "no-prazo" || t.status === "pendente" || t.status === "em-andamento" || meta.sucesso === null;
      }).length;
      const pctOf = (n) => (totais ? Math.round((n / totais) * 100) : 0);

      const dayTasksBase = agendaTasks.filter((t) => t.clienteId === c.id && !t.arquivada && t.date === cliEntregaSelected);

      let tasks = [...dayTasksBase];
      if (cliEntregaKpiFilter === "atrasadas") {
        tasks = tasks.filter((t) => t.status === "atrasada" || t.status === "ent-atrasada" || t.status === "justificativa-atrasada");
      } else if (cliEntregaKpiFilter === "prazo") {
        tasks = tasks.filter((t) => t.status === "no-prazo" || t.status === "ent-antecipada");
      } else if (cliEntregaKpiFilter === "pendentes") {
        tasks = tasks.filter((t) => t.status === "atrasada" || t.status === "no-prazo" || t.status === "pendente" || t.status === "em-andamento");
      }

      const q = normalizeSearchText(cliEntregaQuery);
      tasks = tasks.filter((t) => {
        if (q) {
          const hay = normalizeSearchText([t.nome, t.competencia, t.prazoLegal].filter(Boolean).join(" "));
          if (!hay.includes(q)) return false;
        }
        if (cliEntregaStatus && t.status !== cliEntregaStatus) return false;
        return true;
      });

      const stMeta = cliEntregaStatus
        ? procStatusMeta(cliEntregaStatus)
        : { label: "Status", color: "#94a3b8" };

      const statusMenu = [
        `<button type="button" class="agenda-ops-status-opt${!cliEntregaStatus ? " active" : ""}" role="option" data-cli-ent-status="">
          <i class="status-dot" style="background:#94a3b8" aria-hidden="true"></i>
          <span>Todas</span>
        </button>`,
        ...PROC_STATUS_OPTIONS.map((o) => `
          <button type="button" class="agenda-ops-status-opt${cliEntregaStatus === o.value ? " active" : ""}" role="option" data-cli-ent-status="${o.value}">
            <i class="status-dot" style="background:${o.color}" aria-hidden="true"></i>
            <span>${o.label}</span>
          </button>`),
      ].join("");

      const kpiIcons = {
        totais: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
        pendentes: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
        prazo: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>`,
        atrasadas: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>`,
      };
      const kpiCards = [
        { key: "totais", label: "Totais", value: totais, hint: "Entregas do período", cls: "totais" },
        { key: "pendentes", label: "Pendentes", value: pendentes, hint: "Ainda em aberto", cls: "pendentes" },
        { key: "prazo", label: "No prazo", value: noPrazo, hint: "Dentro do prazo", cls: "prazo" },
        { key: "atrasadas", label: "Atrasadas", value: atrasadas, hint: "Fora do prazo", cls: "atrasadas" },
      ];

      const periodLabelRaw = cliEntregaMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
      const periodLabel = periodLabelRaw.charAt(0).toUpperCase() + periodLabelRaw.slice(1);

      /* Calendário (mesma estrutura do escritório · IDs do cliente) */
      const calYear = cliEntregaMonth.getFullYear();
      const calMonth = cliEntregaMonth.getMonth();
      const monthLabel = cliEntregaMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
      const firstDow = new Date(calYear, calMonth, 1).getDay();
      const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
      const todayIso = "2026-07-14";
      const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
      const calCells = [];
      for (let i = 0; i < firstDow; i++) {
        calCells.push(`<button type="button" class="agenda-cal-day" disabled aria-hidden="true"></button>`);
      }
      for (let d = 1; d <= daysInMonth; d++) {
        const iso = isoDate(calYear, calMonth, d);
        const has = agendaTasks.some((t) => t.clienteId === c.id && !t.arquivada && t.date === iso);
        const classes = [
          "agenda-cal-day",
          has ? "has-tasks" : "",
          iso === todayIso ? "today" : "",
          iso === cliEntregaSelected ? "selected" : "",
        ].filter(Boolean).join(" ");
        calCells.push(`<button type="button" class="${classes}" data-cli-ent-day="${iso}" aria-label="${d}">${d}</button>`);
      }
      const calHtml = `
        <div class="agenda-cal-nav">
          <button type="button" id="cliEntregaPrev" aria-label="Mês anterior">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <strong>${monthLabel}</strong>
          <button type="button" id="cliEntregaNext" aria-label="Próximo mês">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
        <div class="agenda-cal-weekdays">${weekdays.map((w) => `<span>${w}</span>`).join("")}</div>
        <div class="agenda-cal-grid">${calCells.join("")}</div>`;

      /* Menu de Tarefas do dia · só nome + prazo (sem Funcionário/Responsável) */
      const feedTasks = dayTasksBase;
      const feedCount = feedTasks.length === 0
        ? "0 tarefas"
        : feedTasks.length === 1
          ? "1 tarefa"
          : `${feedTasks.length} tarefas`;
      const feedHtml = feedTasks.length
        ? feedTasks.map((t) => {
          const st = procStatusMeta(t.status);
          const tagCls = t.status === "atrasada" || t.status === "ent-atrasada" || t.status === "justificativa-atrasada" ? "atrasada" : "no-prazo";
          return `
            <button type="button" class="agenda-task tip-bottom" data-tip="Detalhe da entrega" data-cli-entrega-id="${t.id}">
              <div class="agenda-task-top">
                <h4>${t.nome}</h4>
                <span class="agenda-tag ${tagCls}">${st.label}</span>
              </div>
              <div class="agenda-task-meta">
                <div><span class="k">Prazo</span><span class="v">${t.prazoLegal || "—"}</span></div>
              </div>
            </button>`;
        }).join("")
        : `<div class="agenda-empty">Nenhuma tarefa neste dia</div>`;

      const cols = [
        {
          key: "atrasadas",
          cls: "atrasadas",
          title: "Atrasadas",
          items: tasks.filter((t) => t.status === "atrasada" || t.status === "ent-atrasada" || t.status === "justificativa-atrasada"),
        },
        {
          key: "abertas",
          cls: "hoje",
          title: "Do dia selecionado",
          items: tasks,
        },
        {
          key: "prazo",
          cls: "prazo",
          title: "No prazo / Entregues",
          items: tasks.filter((t) => t.status === "no-prazo" || t.status === "ent-antecipada" || t.status === "entregue" || t.status === "concluida" || t.status === "ent-justificada"),
        },
      ];

      const cardHtml = (t) => {
        const st = procStatusMeta(t.status);
        const tagCls = t.status === "atrasada" || t.status === "ent-atrasada" || t.status === "justificativa-atrasada" ? "atrasada" : "no-prazo";
        return `
        <div class="agenda-entregas-card tip-bottom" data-tip="Detalhe da entrega" data-cli-entrega-id="${t.id}" role="button" tabindex="0">
          <div class="row">
            <h5>${t.nome}</h5>
            <span class="agenda-tag ${tagCls}">${st.label}</span>
          </div>
          <div class="detail">
            <div class="meta"><b>Status</b><span class="val">${st.label}</span></div>
            <div class="meta"><b>Prazo</b><span class="val">${t.prazoLegal || "—"}</span></div>
            <div class="meta"><b>Competência</b><span class="val">${t.competencia || "—"}</span></div>
            <div class="meta"><b>Recebimento</b><span class="val">${t.recebimentoCliente ? "Confirmado" : "Pendente"}</span></div>
          </div>
          <div class="card-actions">
            <button type="button" class="btn-ghost" data-cli-ent-action="visualizar" data-cli-entrega-id="${t.id}">Visualizar</button>
            <button type="button" class="btn-primary" data-cli-ent-action="baixar" data-cli-entrega-id="${t.id}">Baixar</button>
          </div>
        </div>`;
      };

      const countLabel = tasks.length === 0
        ? "Nenhuma entrega encontrada"
        : tasks.length === 1
          ? "1 entrega encontrada"
          : `${tasks.length} entregas encontradas`;

      const boardHtml = !tasks.length
        ? `<div class="agenda-entregas-empty-day">
            <strong>Nenhuma entrega neste dia.</strong>
            <span>Selecione outra data no calendário ou altere os filtros.</span>
          </div>`
        : cols.map((col) => {
          const open = cliEntregaAccord[col.key] !== false;
          return `
          <section class="agenda-entregas-acc ${col.cls}${open ? " is-open" : ""}" data-cli-ent-accord="${col.key}">
            <button type="button" class="agenda-entregas-acc-head" data-cli-ent-accord-toggle="${col.key}" aria-expanded="${open}" aria-controls="cliEntAccordBody-${col.key}">
              <span class="acc-lead">
                <svg class="acc-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
                <strong>${col.title}</strong>
              </span>
              <span class="acc-count">${col.items.length}</span>
            </button>
            <div class="agenda-entregas-acc-body" id="cliEntAccordBody-${col.key}" ${open ? "" : "hidden"}>
              <div class="agenda-entregas-cards">
                ${col.items.length
                  ? col.items.map(cardHtml).join("")
                  : `<div class="agenda-entregas-empty">Nenhuma entrega</div>`}
              </div>
            </div>
          </section>`;
        }).join("");

      return `
        <div class="cli-entregas-espelho" id="cliEntregasEspelho">
          <div class="agenda-top">
            <div class="agenda-main">
              <section class="agenda-overview" aria-label="Resumo das entregas">
                <div class="agenda-overview-head">
                  <div>
                    <h3>Visão Geral</h3>
                    <span class="sub">Indicadores com base nas entregas do período · clique para filtrar</span>
                  </div>
                  <div class="agenda-overview-meta">
                    <span class="agenda-overview-period">${periodLabel}</span>
                    <button type="button" class="agenda-kpi-clear${cliEntregaKpiFilter ? " is-visible" : ""}" id="cliEntregaKpiClear">Limpar filtro</button>
                  </div>
                </div>
                <div class="agenda-kpis" id="cliEntregaKpis">
                  ${kpiCards.map((card) => {
                    const pct = pctOf(card.value);
                    const active = cliEntregaKpiFilter === card.key;
                    return `
                    <button type="button" class="agenda-kpi ${card.cls}${active ? " active" : ""}" data-cli-ent-kpi="${card.key}" aria-pressed="${active}">
                      <span class="kpi-filter-tag">Filtro</span>
                      <span class="kpi-icon" aria-hidden="true">${kpiIcons[card.key]}</span>
                      <span class="kpi-text">
                        <span class="kpi-label">${card.label}</span>
                        <span class="kpi-value-row">
                          <span class="kpi-value">${card.value}</span>
                          <span class="kpi-pct">${pct}%</span>
                        </span>
                        <span class="kpi-hint">${card.hint}</span>
                      </span>
                      <span class="kpi-bar" aria-hidden="true"><i style="width:${pct}%"></i></span>
                    </button>`;
                  }).join("")}
                </div>
              </section>

              <section class="agenda-block agenda-entregas" aria-label="Quadro de entregas do cliente">
                <div class="agenda-block-head agenda-entregas-head">
                  <div>
                    <h4>Quadro de Entregas</h4>
                    <span class="sub">${formatAgendaDayLong(cliEntregaSelected)}</span>
                  </div>
                  <div class="agenda-entregas-filters" id="cliEntregasFilters">
                    <div class="proc-filter search">
                      <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                      <input type="search" id="cliEntregaSearch" placeholder="Buscar entrega ou competência" autocomplete="off" aria-label="Buscar entregas" value="${(cliEntregaQuery || "").replace(/"/g, "&quot;")}" />
                    </div>
                    <div class="proc-filter field agenda-ops-status" id="cliEntregaStatusWrap">
                      <button type="button" class="agenda-ops-status-btn" id="cliEntregaStatusBtn" aria-haspopup="listbox" aria-expanded="false" aria-label="Filtrar status">
                        <i class="status-dot" id="cliEntregaStatusDot" style="background:${stMeta.color || "#94a3b8"}" aria-hidden="true"></i>
                        <span class="status-label" id="cliEntregaStatusLabel">${stMeta.label || "Status"}</span>
                        <svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                      </button>
                      <div class="agenda-ops-status-menu" id="cliEntregaStatusMenu" role="listbox" aria-label="Status">${statusMenu}</div>
                    </div>
                  </div>
                  <span class="agenda-entregas-count" id="cliEntregasCount">${countLabel}</span>
                </div>
                <div class="agenda-entregas-board is-accordion" id="cliEntregasBoard">${boardHtml}</div>
              </section>
            </div>

            <aside class="agenda-panel" aria-label="Agenda e tarefas do cliente">
              <div class="agenda-panel-head">
                <div class="agenda-panel-head-top">
                  <div>
                    <h3>Agenda</h3>
                    <span class="sub agenda-panel-sub">Selecione uma data para filtrar o quadro</span>
                  </div>
                </div>
              </div>
              <div class="agenda-cal" id="cliEntregaCal">${calHtml}</div>
              <div class="agenda-day-summary" id="cliEntregaDaySummary" aria-live="polite">
                <strong id="cliEntregaFeedTitle">${formatAgendaDayLong(cliEntregaSelected)}</strong>
                <span id="cliEntregaFeedCount">${feedCount}</span>
              </div>
              <div class="agenda-feed cli-entrega-tarefas" id="cliEntregaFeed" aria-label="Menu de tarefas do dia">
                ${feedHtml}
              </div>
            </aside>
          </div>
        </div>`;
    }

    /**
     * Aba Documentos · hub de pastas + ações (mesmo HTML no escritório e no portal).
     */
    const CLI_DOCS_GENERATE_TYPES = [
      "Admissões", "Advertências", "Alvará e Licenças", "Análise Tributária", "Arquivos Fiscais",
      "Atestados", "Balancete", "Boletos", "Certificado Digital", "CND", "Comercial",
      "Conciliação Bancária", "Contrato de Prestação de Serviço", "Contrato Social e Alterações",
      "Contratos e Empréstimos", "Convenção Coletiva", "DAS", "Declaração", "Demonstrações Contábeis",
      "Diretoria", "Documento dos Sócios", "Documentos de Transferências", "Documentos Recebidos",
      "DRE", "Estado, Município, Receita Federal", "Extrato Bancário", "Extratos Bancários e Relatórios",
      "Férias", "Ficha do Empregado", "Folha Mensal", "Folha Mensal - Registrados", "Gestão de Processo",
      "Impostos", "Informe de Rendimentos", "Paralegal", "Pró-Labore", "Propostas e Contratos",
      "Recibos Avulsos", "Relação de Faturamento", "Relatórios", "Rescisão", "Tecnologia",
    ];

    const CLI_DOCS_FOLDERS = [
      { id: "recentes", title: "Recentes", badgeUnit: "items", icon: "clock", kind: "recent" },
      { id: "certificado-digital", title: "CERTIFICADO DIGITAL", badgeUnit: "arquivos", icon: "shield-check", kind: "dept" },
      { id: "contabil", title: "CONTABIL", badgeUnit: "arquivos", icon: "calculator", kind: "dept" },
      { id: "departamento-pessoal", title: "DEPARTAMENTO PESSOAL", badgeUnit: "arquivos", icon: "users", kind: "dept" },
      { id: "financeiro", title: "FINANCEIRO", badgeUnit: "arquivos", icon: "wallet", kind: "dept" },
      { id: "fiscal", title: "FISCAL", badgeUnit: "arquivos", icon: "receipt", kind: "dept" },
      { id: "implantacao", title: "IMPLANTAÇÃO", badgeUnit: "arquivos", icon: "rocket", kind: "dept" },
      { id: "paralegal", title: "PARALEGAL", badgeUnit: "arquivos", icon: "scale", kind: "dept" },
      { id: "outros", title: "Outros", badgeUnit: "arquivos", icon: "folder", kind: "plain" },
    ];

    /** Arquivos de demonstração por pasta (protótipo · contagem alimenta badges). */
    const cliDocsFilesByFolder = {
      recentes: [
        { id: "r1", nome: "Balancete_Jun2026.pdf", tipo: "PDF", atualizado: "14/07/2026", tamanho: "420 KB" },
        { id: "r2", nome: "Folha_Mensal_Jun2026.pdf", tipo: "PDF", atualizado: "12/07/2026", tamanho: "1.1 MB" },
      ],
      "certificado-digital": [
        { id: "c1", nome: "Certificado_A1_Empresa.pfx", tipo: "PFX", atualizado: "02/06/2026", tamanho: "12 KB" },
      ],
      contabil: [
        { id: "ct1", nome: "Balancete_Jun2026.pdf", tipo: "PDF", atualizado: "10/07/2026", tamanho: "380 KB" },
        { id: "ct2", nome: "DRE_2T2026.pdf", tipo: "PDF", atualizado: "08/07/2026", tamanho: "290 KB" },
        { id: "ct3", nome: "Razao_Analitico.xlsx", tipo: "XLSX", atualizado: "05/07/2026", tamanho: "2.4 MB" },
      ],
      "departamento-pessoal": [
        { id: "dp1", nome: "Folha_Mensal_Jun2026.pdf", tipo: "PDF", atualizado: "07/07/2026", tamanho: "980 KB" },
        { id: "dp2", nome: "Ferias_Colaborador_Ana.pdf", tipo: "PDF", atualizado: "01/07/2026", tamanho: "210 KB" },
      ],
      financeiro: [
        { id: "fn1", nome: "Conciliacao_Bancaria_Jun.pdf", tipo: "PDF", atualizado: "11/07/2026", tamanho: "540 KB" },
        { id: "fn2", nome: "Extrato_Bancario_Jun.ofx", tipo: "OFX", atualizado: "09/07/2026", tamanho: "88 KB" },
      ],
      fiscal: [
        { id: "fs1", nome: "DAS_Jun2026.pdf", tipo: "PDF", atualizado: "06/07/2026", tamanho: "160 KB" },
        { id: "fs2", nome: "SPED_Fiscal_Jun.zip", tipo: "ZIP", atualizado: "04/07/2026", tamanho: "3.2 MB" },
      ],
      implantacao: [],
      paralegal: [
        { id: "pl1", nome: "Contrato_Social.pdf", tipo: "PDF", atualizado: "20/05/2026", tamanho: "1.8 MB" },
      ],
      outros: [],
    };

    function getCliDocsFolderMeta(id) {
      return CLI_DOCS_FOLDERS.find((f) => f.id === id) || null;
    }

    function getCliDocsFiles(folderId) {
      return cliDocsFilesByFolder[folderId] || [];
    }

    function formatCliDocsBadge(count, unit) {
      if (unit === "items") return `${count} items`;
      return `${count} ${count === 1 ? "arquivo" : "arquivos"}`;
    }

    function openCliDocPreview(file) {
      openModal({
        title: file.nome,
        sub: `${file.tipo} · ${file.tamanho} · atualizado em ${file.atualizado}`,
        wide: true,
        body: `
          <div class="cli-docs-preview">
            <div class="cli-docs-preview-frame" aria-label="Pré-visualização do documento">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <strong>${file.nome}</strong>
              <span>Pré-visualização do documento (protótipo)</span>
            </div>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Fechar</button>
          <button type="button" class="btn-primary" data-close onclick="toast('Download iniciado')">Baixar</button>`,
      });
    }

    function openCliDocDetails(file) {
      openModal({
        title: "Detalhes do documento",
        sub: file.nome,
        body: `
          <div class="entrega-detail-grid">
            <div class="cell"><span class="lab">Nome</span><span class="val">${file.nome}</span></div>
            <div class="cell"><span class="lab">Tipo</span><span class="val">${file.tipo}</span></div>
            <div class="cell"><span class="lab">Tamanho</span><span class="val">${file.tamanho}</span></div>
            <div class="cell"><span class="lab">Atualizado</span><span class="val">${file.atualizado}</span></div>
          </div>`,
        foot: `<button type="button" class="btn-ghost" data-close>Fechar</button>`,
      });
    }

    function formatCliDocsFileSize(bytes) {
      const n = Number(bytes) || 0;
      if (n < 1024) return `${n} B`;
      if (n < 1024 * 1024) return `${Math.max(1, Math.round(n / 1024))} KB`;
      return `${(n / (1024 * 1024)).toFixed(1)} MB`;
    }

    function formatCliDocsTodayLabel() {
      const d = APP_TODAY;
      const pad = (n) => String(n).padStart(2, "0");
      return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
    }

    function ingestCliDocsUpload(fileList) {
      const files = Array.from(fileList || []).filter(Boolean);
      if (!files.length) return false;
      const target = cliDocsFolderId || "recentes";
      if (!cliDocsFilesByFolder[target]) cliDocsFilesByFolder[target] = [];
      if (!cliDocsFilesByFolder.recentes) cliDocsFilesByFolder.recentes = [];
      const when = formatCliDocsTodayLabel();
      files.forEach((file, idx) => {
        const ext = ((file.name || "").split(".").pop() || "FILE").toUpperCase();
        const entry = {
          id: `u${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
          nome: file.name || "arquivo",
          tipo: ext,
          atualizado: when,
          tamanho: formatCliDocsFileSize(file.size),
        };
        cliDocsFilesByFolder[target].unshift(entry);
        if (target !== "recentes") {
          cliDocsFilesByFolder.recentes.unshift({ ...entry, id: `${entry.id}-r` });
        }
      });
      toast(files.length === 1
        ? `Arquivo enviado · ${files[0].name}`
        : `${files.length} arquivos enviados`);
      renderClientes();
      return true;
    }

    function renderCliDocsDropzoneHtml(folderMeta) {
      const dest = folderMeta ? folderMeta.title : "Recentes";
      return `
        <div class="cli-docs-dropzone" data-cli-docs-drop tabindex="0" role="button" aria-label="Enviar arquivos. Arraste e solte ou clique para escolher">
          <div class="cli-docs-drop-ico" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </div>
          <h3>Arraste e solte seus arquivos aqui</h3>
          <p>PDF, imagens, planilhas ou ZIP — um ou vários de uma vez.</p>
          <span class="btn-primary cli-docs-drop-cta">Escolher arquivos</span>
          <span class="cli-docs-drop-hint">ou clique em qualquer lugar desta área · destino: <strong>${dest}</strong></span>
        </div>`;
    }

    function renderCliDocumentosPastas(c) {
      const folderMeta = cliDocsFolderId ? getCliDocsFolderMeta(cliDocsFolderId) : null;
      const portal = isClientePortal();
      const generateMenu = CLI_DOCS_GENERATE_TYPES.map((label) => `
        <button type="button" role="menuitem" data-cli-doc-generate="${label.replace(/"/g, "&quot;")}">${label}</button>
      `).join("");

      const toolbar = `
        <div class="cli-docs-toolbar">
          <div class="cli-docs-toolbar-left">
            ${folderMeta ? `
              <button type="button" class="cli-docs-back" data-cli-doc-back>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
                Pastas
              </button>
              <h3 class="cli-docs-folder-heading">${folderMeta.title}</h3>
            ` : `<h3 class="cli-docs-folder-heading">Documentos</h3>`}
          </div>
          <div class="cli-docs-toolbar-actions">
            ${portal ? "" : `
            <button type="button" class="btn-ghost" data-cli-doc-novo>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Novo Arquivo
            </button>
            <div class="cli-docs-generate-wrap" id="cliDocsGenerateWrap">
              <button type="button" class="btn-primary" data-cli-doc-generate-toggle aria-haspopup="menu" aria-expanded="false">
                Gerar Documento
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div class="cli-docs-generate-menu" role="menu" aria-label="Tipos de documento">${generateMenu}</div>
            </div>`}
            <input type="file" id="cliDocsUploadInput" class="cli-docs-upload-input" multiple tabindex="-1" aria-hidden="true" />
          </div>
        </div>`;

      const dropzone = portal ? renderCliDocsDropzoneHtml(folderMeta) : "";

      if (folderMeta) {
        const files = getCliDocsFiles(folderMeta.id);
        const list = files.length
          ? files.map((f) => {
            const menuOpen = cliDocsFileMenuId === f.id;
            return `
              <div class="cli-docs-file-row${menuOpen ? " is-menu-open" : ""}" data-cli-doc-file="${f.id}" data-folder="${folderMeta.id}">
                <button type="button" class="cli-docs-file-main" data-cli-doc-file-toggle="${f.id}" aria-haspopup="menu" aria-expanded="${menuOpen ? "true" : "false"}">
                  <span class="cli-docs-file-ico" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </span>
                  <span class="cli-docs-file-meta">
                    <strong>${f.nome}</strong>
                    <span>${f.tipo} · ${f.tamanho} · ${f.atualizado}</span>
                  </span>
                  <svg class="cli-docs-file-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <div class="cli-docs-file-menu" role="menu" aria-label="Ações do arquivo" ${menuOpen ? "" : "hidden"}>
                  <button type="button" role="menuitem" data-cli-doc-file-act="visualizar" data-file-id="${f.id}">Visualizar</button>
                  <button type="button" role="menuitem" data-cli-doc-file-act="baixar" data-file-id="${f.id}">Baixar</button>
                  <button type="button" role="menuitem" data-cli-doc-file-act="detalhes" data-file-id="${f.id}">Detalhes</button>
                </div>
              </div>`;
          }).join("")
          : `<div class="cli-empty-panel">Nenhum documento nesta pasta</div>`;

        return `
          <div class="cli-docs-hub${portal ? " is-portal" : ""}" data-cliente="${c.id}">
            ${toolbar}
            ${dropzone}
            <div class="cli-docs-files" role="list" aria-label="Arquivos em ${folderMeta.title}">${list}</div>
          </div>`;
      }

      const grid = CLI_DOCS_FOLDERS.map((f) => {
        const count = getCliDocsFiles(f.id).length;
        const badge = formatCliDocsBadge(count, f.badgeUnit);
        return `
          <button type="button" class="cli-docs-folder-card" role="listitem" data-cli-doc-folder="${f.id}" data-kind="${f.kind}" aria-label="${f.title} · ${badge}">
            <span class="cli-docs-folder-ico" aria-hidden="true"><i data-lucide="${f.icon}"></i></span>
            <strong class="cli-docs-folder-title">${f.title}</strong>
            <span class="cli-docs-folder-badge">${badge}</span>
          </button>`;
      }).join("");

      return `
        <div class="cli-docs-hub${portal ? " is-portal" : ""}" data-cliente="${c.id}">
          ${toolbar}
          ${dropzone}
          <div class="cli-docs-folders-block">
            <div class="cli-docs-folders-label">Pastas do gerenciador</div>
            <div class="cli-docs-folders" role="list" aria-label="Pastas de documentos">${grid}</div>
          </div>
        </div>`;
    }

    function syncCliDocsFileMenusDom() {
      document.querySelectorAll(".cli-docs-file-row[data-cli-doc-file]").forEach((row) => {
        const open = row.dataset.cliDocFile === cliDocsFileMenuId;
        row.classList.toggle("is-menu-open", open);
        const menu = row.querySelector(".cli-docs-file-menu");
        if (menu) menu.hidden = !open;
        const btn = row.querySelector("[data-cli-doc-file-toggle]");
        if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    function refreshCliDocsIcons() {
      if (typeof lucide === "undefined" || typeof lucide.createIcons !== "function") return;
      lucide.createIcons({ attrs: { "stroke-width": 1.75 } });
    }

    function renderCliPerfilTabBody(c) {
      const metrics = empresaMetrics[c.id] || {};
      if (cliPerfilTab === "obrigacoes") {
        const items = obrigacoesItems.filter((o) => !o.interna).slice(0, 8);
        return `
          <div class="cli-obr-actions">
            <button type="button" class="btn-primary" data-cli-action="iniciar-obrigacoes">Iniciar obrigações</button>
            <button type="button" class="btn-ghost" data-cli-action="obrigacao-interna">Obrigação interna</button>
          </div>
          <div class="cli-obr-list">${items.length ? items.map((o) => `
            <article class="cli-obr-card">
              <div class="obr-main">
                <strong>${o.title}</strong>
                <span>${o.meta || "—"}</span>
                ${o.dept ? `<div class="obr-meta"><i>${o.dept}</i></div>` : ""}
              </div>
              <span class="proc-badge dept">${o.grupo ? "Grupo" : "Avulsa"}</span>
            </article>`).join("") : `<div class="cli-empty-panel">Nenhuma obrigação listada</div>`}
          </div>`;
      }
      if (cliPerfilTab === "processos") return renderCliPerfilProcessos(c);
      if (cliPerfilTab === "funcionarios") {
        const internos = c.funcInternos ?? 0;
        const externos = c.funcExternos ?? 0;
        const total = internos + externos;
        const nomesInt = ["Ana Paula Silva", "Bruno Mendes", "Carla Souza", "Diego Martins", "Elisa Rocha", "Fábio Nunes", "Gisele Prado", "Henrique Lopes", "Irene Castro", "João Vitor Alves", "Karina Dias", "Lucas Ferreira"];
        const nomesExt = ["Marina Duarte", "Otávio Reis", "Patrícia Gomes", "Rafael Campos", "Sabrina Melo", "Thiago Barbosa", "Úrsula Pires", "Vinícius Andrade"];
        const cargosInt = ["Analista contábil", "Assistente fiscal", "Auxiliar administrativo", "Analista de DP"];
        const cargosExt = ["Consultor tributário", "Prestador de TI", "Auditor externo", "Consultor trabalhista"];
        const pessoas = [];
        for (let i = 0; i < internos; i++) {
          pessoas.push({
            tipo: "interno",
            nome: nomesInt[i % nomesInt.length],
            cargo: cargosInt[i % cargosInt.length],
            admissao: `${String((i % 28) + 1).padStart(2, "0")}/${String((i % 9) + 1).padStart(2, "0")}/202${(i % 4) + 2}`,
            doc: `***.${String(100 + i).padStart(3, "0")}.${String(200 + i).padStart(3, "0")}-**`,
          });
        }
        for (let i = 0; i < externos; i++) {
          pessoas.push({
            tipo: "externo",
            nome: nomesExt[i % nomesExt.length],
            cargo: cargosExt[i % cargosExt.length],
            admissao: `Contrato ${(i % 12) + 1}/2026`,
            doc: `${String(10 + i).padStart(2, "0")}.${String(100 + i * 3).padStart(3, "0")}.${String(400 + i).padStart(3, "0")}/0001-${String(10 + i).padStart(2, "0")}`,
          });
        }
        const renderLista = (lista) => lista.length
          ? lista.map((p) => `
              <div class="cli-func-person">
                <div class="name">
                  <div>
                    <strong>${p.nome}</strong>
                    <span>${p.tipo === "interno" ? "CPF" : "CNPJ"} ${p.doc}</span>
                  </div>
                  <span class="cli-badge tipo ${p.tipo === "interno" ? "matriz" : "filial"}">${p.tipo === "interno" ? "Interno" : "Externo"}</span>
                </div>
                <div class="meta cargo"><b>Cargo</b> ${p.cargo}</div>
                <div class="meta adm"><b>${p.tipo === "interno" ? "Admissão" : "Vínculo"}</b> ${p.admissao}</div>
              </div>`).join("")
          : `<div class="cli-empty-panel">Nenhum funcionário</div>`;
        const chev = `<svg class="kpi-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;
        const drop = (key, cls, label, count, lista) => {
          const open = cliFuncNav === key;
          return `
            <div class="cli-func-drop ${cls}${open ? " open" : ""}">
              <button type="button" class="cli-func-kpi" data-cli-func-nav="${key}" aria-expanded="${open}" aria-controls="cliFuncPanel-${key}">
                <span class="kpi-copy"><span>${label}</span><strong>${count}</strong></span>
                ${chev}
              </button>
              <div class="cli-func-drop-body" id="cliFuncPanel-${key}" role="region" ${open ? "" : "hidden"}>
                ${renderLista(lista)}
              </div>
            </div>`;
        };
        return `
          <div class="cli-func-kpis" role="group" aria-label="Funcionários">
            ${drop("todos", "total", "Total de Funcionários", total, pessoas)}
            ${drop("internos", "internos", "Internos", internos, pessoas.filter((p) => p.tipo === "interno"))}
            ${drop("externos", "externos", "Externos", externos, pessoas.filter((p) => p.tipo === "externo"))}
          </div>`;
      }
      if (cliPerfilTab === "documentos") {
        return renderCliDocumentosPastas(c);
      }
      if (cliPerfilTab === "comentarios") {
        return renderCliFeed(c);
      }
      if (cliPerfilTab === "entregas") {
        if (isClientePortal()) return renderCliEntregasEspelhada(c);
        const entregas = agendaTasks.filter((t) => t.clienteId === c.id && !t.arquivada);
        if (!entregas.length) return `<div class="cli-empty-panel">Nenhuma entrega vinculada</div>`;
        return `<div class="cli-entregas-grid">${entregas.map((t) => {
          const stCls = t.status === "atrasada" ? "atrasada" : "no-prazo";
          const stLabel = stCls === "atrasada" ? "Atrasada" : "No Prazo";
          return `
          <div class="agenda-entregas-card is-${stCls} tip-bottom" data-tip="Detalhe da entrega" data-cli-entrega-id="${t.id}" role="button" tabindex="0">
            <div class="row">
              <h5>${t.nome}</h5>
              <span class="agenda-tag ${stCls}">${stLabel}</span>
            </div>
            <div class="detail">
              <div class="meta"><b>Empresa</b><span class="val" title="${t.razaoSocial || ""}">${(CLIENTES.find((x) => x.id === t.clienteId)?.fantasia || CLIENTES.find((x) => x.id === t.clienteId)?.nome || t.razaoSocial || "—")}</span></div>
              <div class="meta"><b>Responsável</b><span class="val">${t.responsavel}</span></div>
              <div class="meta"><b>Prazo</b><span class="val">${t.prazoLegal}</span></div>
              <div class="meta"><b>Competência</b><span class="val">${t.competencia}</span></div>
            </div>
          </div>`;
        }).join("")}</div>`;
      }
      if (cliPerfilTab === "xml") {
        return renderCliXmlAnaliseModule(c);
      }
      if (cliPerfilTab === "financeiro") {
        if (isClientePortal()) {
          cliFinSubTab = "relatorio";
          return renderCliFinRelatorioTab(c);
        }
        const subTabs = [
          { id: "relatorio", label: "Relatório Executivo" },
          { id: "conciliacao", label: "Conciliação ↗" },
          { id: "receber", label: "Títulos a Receber ↗" },
          { id: "pagar", label: "Títulos a Pagar ↗" },
          { id: "plano", label: "Plano de Contas ↗" },
          { id: "auditoria", label: "Auditoria de Cartões ↗" },
        ];
        return `
          <div class="cli-fin-subnav" role="tablist" aria-label="Financeiro do cliente">
            ${subTabs.map((t) => `
              <button type="button" role="tab" class="${cliFinSubTab === t.id ? "active" : ""}" aria-selected="${cliFinSubTab === t.id}" data-cli-fin-sub="${t.id}">${t.label}</button>
            `).join("")}
          </div>
          ${renderCliFinSubTabBody(c, metrics)}
        `;
      }
      if (cliPerfilTab === "honorarios") {
        const items = ensureCliHonorarios(c);
        const total = items.reduce((acc, h) => acc + (Number(h.valor) || 0), 0);
        const recLabel = { mensal: "Mensal", anual: "Anual", unico: "Único" };
        return `
          <div class="cli-honor-form">
            <div>
              <label for="cliHonorOrigem">Origem</label>
              <select id="cliHonorOrigem" aria-label="Origem">
                <option value="">Selecione a origem</option>
                <option>Mensalidade contábil</option>
                <option>Assessoria societária</option>
                <option>Folha / Pessoal</option>
                <option>Consultoria tributária</option>
                <option>Abertura / Alteração contratual</option>
                <option>Outros serviços</option>
              </select>
            </div>
            <div>
              <label for="cliHonorValor">Valor</label>
              <input type="text" id="cliHonorValor" inputmode="decimal" placeholder="R$ 0,00" aria-label="Valor" />
            </div>
            <div>
              <label for="cliHonorRecorrencia">Recorrência</label>
              <select id="cliHonorRecorrencia" aria-label="Recorrência">
                <option value="mensal">Mensal</option>
                <option value="anual">Anual</option>
                <option value="unico">Único</option>
              </select>
            </div>
            <button type="button" class="btn-primary honor-add" data-cli-honor-add>Adicionar</button>
          </div>
          <div class="cli-honor-kpis">
            <div class="cli-honor-kpi">
              <span>Itens salvos</span>
              <strong>${items.length}</strong>
            </div>
            <div class="cli-honor-kpi total">
              <span>Total da empresa</span>
              <strong>${money(total)}</strong>
            </div>
          </div>
          <section class="cli-honor-report" aria-label="Relatório de honorários">
            <div class="cli-honor-report-head">
              <div>
                <h4>Relatório de honorários</h4>
                <div class="sub">Atualizado em ${cliHonorRelatorioAtualizado}</div>
              </div>
              <button type="button" class="btn-ghost" data-cli-honor-refresh>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12a9 9 0 0 0-14.3-7.2L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 14.3 7.2L21 16"/><path d="M16 21h5v-5"/></svg>
                Atualizar relatório
              </button>
            </div>
            <div class="cli-honor-report-list">
              ${items.length ? items.map((h) => `
                <article class="cli-honor-card">
                  <div>
                    <h5>${h.origem}</h5>
                    <p class="honor-meta">Recorrência ${recLabel[h.recorrencia] || h.recorrencia} · incluído em ${h.criado}</p>
                  </div>
                  <div class="honor-right">
                    <div class="honor-value">${money(h.valor)}</div>
                    <span class="cli-badge matriz">${recLabel[h.recorrencia] || h.recorrencia}</span>
                  </div>
                </article>`).join("") : `<div class="cli-empty-panel">Nenhum honorário salvo</div>`}
            </div>
          </section>`;
      }
      return `<div class="cli-empty-panel">Selecione uma aba</div>`;
    }

    function renderClientesPerfil() {
      const wrap = document.getElementById("clientesWrap");
      const c = CLIENTES.find((x) => x.id === cliPerfilId);
      if (!wrap || !c) {
        cliView = "lista";
        renderClientesList();
        return;
      }
      if (!CLI_PERFIL_TABS.some((t) => t.id === cliPerfilTab)) cliPerfilTab = "obrigacoes";
      const certRow = getCertificadoRow(c);
      const cert = certRow.meta;
      wrap.innerHTML = `
        <div class="cli-perfil">
          <div class="cli-perfil-head">
            <div class="cli-perfil-head-main">
              <div class="cli-perfil-head-left">
                ${isClientePortal() ? "" : `<button type="button" class="cli-perfil-back" data-cli-back>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
                  Voltar à listagem
                </button>`}
                <div class="cli-perfil-identity">
                  ${isClientePortal()
                    ? `<h2>${c.fantasia || c.nome}</h2>`
                    : renderModuleEmpresaPickerHtml("perfil")}
                  <div class="cli-perfil-chips" aria-label="Dados da empresa">
                    <span>${uiSelectEscape(c.regime || "—")}</span>
                    <span class="sep" aria-hidden="true">·</span>
                    <span>${uiSelectEscape(c.estado || "—")}</span>
                    <span class="cli-badge ${c.status === "Ativo" ? "matriz" : "filial"}">${uiSelectEscape(c.status || "—")}</span>
                  </div>
                </div>
                <button type="button" class="cli-dados-link" data-cli-tool="dados">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  Visualizar dados da empresa
                </button>
              </div>
              <div class="cli-perfil-head-actions">
                <button type="button" class="cli-cert-card ${cert.cls}" data-cli-tool="cert" aria-label="Certificado digital: ${cert.label}">
                  <span class="cert-ico" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </span>
                  <span>
                    <strong>Certificado digital</strong>
                    <span>${cert.label} · ${certRow.validadeLabel}</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div class="cli-perfil-tabs-bar">
            <div class="cli-tabs" role="tablist" aria-label="Abas do perfil">
              ${CLI_PERFIL_TABS.map((t) => `
                <button type="button" class="cli-tab${cliPerfilTab === t.id ? " active" : ""}" role="tab" aria-selected="${cliPerfilTab === t.id}" data-cli-tab="${t.id}">${t.label}</button>
              `).join("")}
            </div>
          </div>
          <div class="cli-perfil-body" id="cliPerfilBody">
            ${renderCliPerfilTabBody(c)}
          </div>
        </div>`;
      enhanceUiSelects(wrap);
      if (cliPerfilTab === "documentos") requestAnimationFrame(() => refreshCliDocsIcons());
      if (cliPerfilTab === "financeiro" && cliFinSubTab === "relatorio") {
        requestAnimationFrame(() => initCliFinReportCharts(wrap, getCliFinExecData(c)));
      }
      if (cliPerfilTab === "xml" && cliXmlAnalise.tab === "dashboard" && cliXmlAnalise.imported) {
        requestAnimationFrame(() => initCliXmlDashboardCharts(c));
      }
    }

    function renderClientes() {
      const wrap = document.getElementById("clientesWrap");
      if (!wrap) return;
      if (isClientePortal()) {
        const pageId = CLIENT_PORTAL_TAB_IDS.includes(cliPerfilTab)
          ? cliPerfilTab
          : (CLIENT_PORTAL_TAB_IDS.includes(current) ? current : "entregas");
        renderPortalClientePage(pageId);
        return;
      }
      if (cliView === "perfil" && cliPerfilId) renderClientesPerfil();
      else renderClientesList();
      syncCliFinTitCheckAllState(wrap);
    }

    function openAddEmpresaModal() {
      openClienteCadastro();
    }

    function getCliTitulos(c, tipo) {
      const base = Math.round((c.faturamento || 50000) / 100);
      const lado = tipo === "receber" ? "receber" : "pagar";
      const seed = tipo === "receber"
        ? [
          { id: "r1", numero: "r1", nome: c.fantasia || c.nome, descricao: "Mensalidade contábil — Jul/2026", vencimento: "10/07/2026", valor: base, restante: base, status: "aberto", forma: "Boleto", plano: "Receitas de serviços", centro: "Comercial", nossoNumero: "20260710001" },
          { id: "r2", numero: "r2", nome: c.fantasia || c.nome, descricao: "Honorários avulsos — SPED", vencimento: "05/07/2026", valor: 1200, restante: 400, status: "parcial", forma: "PIX", plano: "Receitas de serviços", centro: "Operacional", nossoNumero: "20260705002", dataPagamento: "06/07/2026" },
          { id: "r3", numero: "r3", nome: "Farmácia Centro Filial", descricao: "Assessoria societária", vencimento: "28/06/2026", valor: 890, restante: 0, status: "pago", forma: "Transferência", plano: "Receitas de serviços", centro: "Administrativo", nossoNumero: "20260628003", dataPagamento: "28/06/2026" },
          { id: "r4", numero: "r4", nome: c.fantasia || c.nome, descricao: "Consultoria tributária", vencimento: "01/07/2026", valor: 650, restante: 650, status: "vencido", forma: "Boleto", plano: "Receitas de serviços", centro: "Comercial", nossoNumero: "20260701004" },
        ]
        : [
          { id: "p1", numero: "p1", nome: "Tech Docs Ltda", descricao: "Licença sistema fiscal", vencimento: "12/07/2026", valor: 480, restante: 480, status: "aberto", forma: "Boleto", plano: "Despesas operacionais", centro: "Administrativo", nossoNumero: "92018001" },
          { id: "p2", numero: "p2", nome: "Energia Norte", descricao: "Conta de energia — Jun", vencimento: "08/07/2026", valor: 312.4, restante: 0, status: "pago", forma: "Débito automático", plano: "Despesas operacionais", centro: "Operacional", nossoNumero: "92018002", dataPagamento: "08/07/2026" },
          { id: "p3", numero: "p3", nome: "Cloud Host BR", descricao: "Hospedagem mensal", vencimento: "15/07/2026", valor: 199, restante: 99.5, status: "parcial", forma: "Cartão", plano: "Despesas operacionais", centro: "Operacional", nossoNumero: "92018003", dataPagamento: "10/07/2026" },
          { id: "p4", numero: "p4", nome: "Cartório Centro", descricao: "Taxas cartorárias", vencimento: "30/06/2026", valor: 245, restante: 245, status: "vencido", forma: "Boleto", plano: "Despesas operacionais", centro: "Administrativo", nossoNumero: "92018004" },
        ];
      const extras = (cliFinTitulosExtra[lado] || []).filter((t) => !t.clienteId || t.clienteId === c.id);
      const byId = new Map();
      seed.forEach((t) => byId.set(String(t.id), t));
      extras.forEach((t) => byId.set(String(t.id), t));
      return Array.from(byId.values());
    }

    function getCliTitulosFiltrados(c, tipo) {
      const f = cliFinTitulosFiltros;
      const status = f.status || cliFinTituloStatusFiltro;
      const q = normalizeSearchText(f.q);
      const vmin = parseFinTitMoney(f.valorMin);
      const vmax = parseFinTitMoney(f.valorMax);
      const ini = f.vencIni || "";
      const fim = f.vencFim || "";
      return getCliTitulos(c, tipo).filter((t) => {
        if (status && t.status !== status) return false;
        if (q) {
          const hay = normalizeSearchText([t.nome, t.descricao].join(" "));
          if (!hay.includes(q)) return false;
        }
        if (vmin != null && Number(t.valor) < vmin) return false;
        if (vmax != null && Number(t.valor) > vmax) return false;
        const iso = brDateToIso(t.vencimento);
        if (ini && iso && iso < ini) return false;
        if (fim && iso && iso > fim) return false;
        return true;
      });
    }

    function brDateToIso(br) {
      const m = String(br || "").match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      return m ? `${m[3]}-${m[2]}-${m[1]}` : "";
    }

    function parseFinTitMoney(v) {
      const raw = String(v || "").trim();
      if (!raw) return null;
      const n = Number(raw.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", "."));
      return Number.isFinite(n) ? n : null;
    }

    function isCliFinTituloSelected(id) {
      return cliFinTituloSelectedIds.has(String(id));
    }

    function refreshCliFinTitulosUi() {
      if (finDash.tab === "titulos" && document.getElementById("financeiroWrap")?.classList.contains("show")) {
        renderFinModuleDash();
      } else {
        renderClientes();
      }
    }

    function syncCliFinTitCheckAllState(root) {
      (root || document).querySelectorAll("[data-cli-fin-tit-check-all]").forEach((el) => {
        el.indeterminate = el.getAttribute("data-indeterminate") === "1";
      });
    }

    function handleCliFinTitCheckChange(e) {
      const checkAll = e.target.closest("[data-cli-fin-tit-check-all]");
      if (checkAll) {
        const tipo = checkAll.dataset.cliFinTitCheckAll === "pagar" ? "pagar" : "receber";
        const c = resolveFinAuditCliente() || CLIENTES.find((x) => x.id === cliPerfilId);
        if (!c) return true;
        const rows = getCliTitulosFiltrados(c, tipo);
        if (checkAll.checked) rows.forEach((t) => cliFinTituloSelectedIds.add(String(t.id)));
        else rows.forEach((t) => cliFinTituloSelectedIds.delete(String(t.id)));
        refreshCliFinTitulosUi();
        return true;
      }
      const checkOne = e.target.closest("[data-cli-fin-tit-check]");
      if (checkOne) {
        const id = String(checkOne.dataset.cliFinTitCheck || "");
        if (!id) return true;
        if (checkOne.checked) cliFinTituloSelectedIds.add(id);
        else cliFinTituloSelectedIds.delete(id);
        refreshCliFinTitulosUi();
        return true;
      }
      return false;
    }

    function getCliPlanoModelos() {
      return ensureFinPlanoContasState().modelos;
    }

    function finTitulosLadoLabel(lado) {
      return lado === "pagar" ? "a pagar" : "a receber";
    }

    function openFinTitulosImportModal(lado) {
      const isPagar = lado === "pagar";
      const tab = cliFinTitulosImportTab === "barcode" ? "barcode" : "upload";
      const howText = isPagar
        ? "Importe boletos, XML ou planilhas de despesas para criar títulos a pagar automaticamente."
        : "Importe boletos, XML ou planilhas de clientes para criar títulos a receber automaticamente.";
      openModal({
        title: "Importação de Títulos",
        sub: `Títulos ${finTitulosLadoLabel(lado)}`,
        wide: true,
        body: `
          <div class="fin-tit-modal-tabs" role="tablist" aria-label="Tipo de importação">
            <button type="button" class="fin-tit-modal-tab${tab === "upload" ? " active" : ""}" role="tab" aria-selected="${tab === "upload"}" data-fin-tit-import-tab="upload">Upload de Arquivo</button>
            <button type="button" class="fin-tit-modal-tab${tab === "barcode" ? " active" : ""}" role="tab" aria-selected="${tab === "barcode"}" data-fin-tit-import-tab="barcode">Código de Barras</button>
          </div>
          <div class="fin-tit-import-pane" data-fin-tit-import-pane="upload" ${tab === "upload" ? "" : "hidden"}>
            <div class="fin-upload-hub fin-tit-upload-hub" id="finTitUploadHub" data-fin-tit-drop>
              <div class="hub-ico" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <h3>Arraste o arquivo aqui</h3>
              <p>PDF, XML, OFX, CSV ou planilha Excel</p>
              <button type="button" class="btn-primary" data-fin-tit-pick-file>Importar</button>
              <input type="file" id="finTitImportFile" accept=".pdf,.xml,.ofx,.csv,.xlsx,.xls" hidden />
            </div>
            <div class="fin-tit-how">
              <h5>Como funciona</h5>
              <ol>
                <li>${howText}</li>
                <li>O sistema lê os dados e sugere vencimento, valor e ${isPagar ? "fornecedor" : "cliente"}.</li>
                <li>Revise e confirme para incluir na listagem de títulos ${finTitulosLadoLabel(lado)}.</li>
              </ol>
            </div>
          </div>
          <div class="fin-tit-import-pane" data-fin-tit-import-pane="barcode" ${tab === "barcode" ? "" : "hidden"}>
            <label for="finTitBarcodeInput">Linha digitável / código de barras</label>
            <div class="fin-tit-barcode-row">
              <input type="text" id="finTitBarcodeInput" placeholder="Cole ou digite o código de barras do boleto" inputmode="numeric" autocomplete="off" />
              <button type="button" class="btn-primary" id="finTitBarcodeDetect">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></svg>
                Detectar
              </button>
            </div>
            <p class="fin-tit-hint">A detecção preenche valor, vencimento e beneficiário a partir do boleto (protótipo).</p>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="finTitImportConfirm">Importar</button>`,
      });

      const syncTabs = () => {
        modalBody.querySelectorAll("[data-fin-tit-import-tab]").forEach((btn) => {
          const on = btn.dataset.finTitImportTab === cliFinTitulosImportTab;
          btn.classList.toggle("active", on);
          btn.setAttribute("aria-selected", on ? "true" : "false");
        });
        modalBody.querySelectorAll("[data-fin-tit-import-pane]").forEach((pane) => {
          pane.hidden = pane.dataset.finTitImportPane !== cliFinTitulosImportTab;
        });
      };

      modalBody.querySelectorAll("[data-fin-tit-import-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          cliFinTitulosImportTab = btn.dataset.finTitImportTab === "barcode" ? "barcode" : "upload";
          syncTabs();
        });
      });

      const hub = document.getElementById("finTitUploadHub");
      const fileInput = document.getElementById("finTitImportFile");
      modalBody.querySelector("[data-fin-tit-pick-file]")?.addEventListener("click", () => fileInput?.click());
      fileInput?.addEventListener("change", () => {
        const name = fileInput.files?.[0]?.name;
        if (name) toast(`Arquivo selecionado · ${name}`);
      });
      ["dragenter", "dragover"].forEach((ev) => {
        hub?.addEventListener(ev, (e) => {
          e.preventDefault();
          hub.classList.add("is-drag");
        });
      });
      ["dragleave", "drop"].forEach((ev) => {
        hub?.addEventListener(ev, (e) => {
          e.preventDefault();
          hub.classList.remove("is-drag");
          if (ev === "drop" && e.dataTransfer?.files?.[0]) {
            toast(`Arquivo selecionado · ${e.dataTransfer.files[0].name}`);
          }
        });
      });

      document.getElementById("finTitBarcodeDetect")?.addEventListener("click", () => {
        const code = document.getElementById("finTitBarcodeInput")?.value?.trim();
        if (!code) {
          toast("Informe o código de barras");
          return;
        }
        toast("Código detectado · dados preenchidos (protótipo)");
      });

      document.getElementById("finTitImportConfirm")?.addEventListener("click", () => {
        closeModal();
        toast(`Importação de títulos ${finTitulosLadoLabel(lado)} concluída`);
        refreshCliFinTitulosUi();
      });
    }

    function openFinTitulosNovoModal(lado, existing) {
      const isPagar = lado === "pagar";
      const isEdit = !!(existing && existing.id);
      const partyLabel = isPagar ? "Fornecedor" : "Cliente";
      const payLabel = isPagar ? "Forma de Pagamento" : "Forma de Recebimento";
      const ex = existing || {};
      const valorFmt = ex.valor != null
        ? `R$ ${Number(ex.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : "";
      const vencIso = brDateToIso(ex.vencimento) || ex.vencimentoIso || "";
      openModal({
        title: isEdit
          ? (isPagar ? "Editar Título a Pagar" : "Editar Título a Receber")
          : (isPagar ? "Novo Título a Pagar" : "Novo Título a Receber"),
        sub: isEdit ? "Altere os dados do título" : "Preencha os dados do título",
        wide: true,
        body: `
          <div class="fin-tit-novo">
            <div class="fin-tit-quick">
              <span class="lab">Importação rápida</span>
              <div class="fin-tit-quick-btns">
                <button type="button" class="btn-ghost" data-fin-tit-quick="boleto">Boleto</button>
                <button type="button" class="btn-ghost" data-fin-tit-quick="xml">XML</button>
                <button type="button" class="btn-ghost" data-fin-tit-quick="csv">CSV</button>
              </div>
            </div>
            <div class="fin-tit-form-grid">
              <div>
                <label for="finTitParty">${partyLabel}</label>
                <input type="text" id="finTitParty" placeholder="Nome do ${partyLabel.toLowerCase()}" autocomplete="off" value="${(ex.nome || "").replace(/"/g, "&quot;")}" />
              </div>
              <div>
                <label for="finTitPayForm">${payLabel}</label>
                <select id="finTitPayForm">
                  <option value="">Selecione</option>
                  ${["Boleto", "PIX", "Transferência", "Cartão", "Dinheiro"].map((o) =>
                    `<option${(ex.forma || "") === o ? " selected" : ""}>${o}</option>`
                  ).join("")}
                </select>
              </div>
              <div class="full">
                <label for="finTitDesc">Descrição</label>
                <input type="text" id="finTitDesc" placeholder="Descrição do título" value="${(ex.descricao || "").replace(/"/g, "&quot;")}" />
              </div>
              <div>
                <label for="finTitSubplano">Subplano de Contas</label>
                <select id="finTitSubplano">
                  <option value="">Selecione</option>
                  <option${(ex.subplano || "") === (isPagar ? "Despesas operacionais" : "Receitas de serviços") ? " selected" : ""}>${isPagar ? "Despesas operacionais" : "Receitas de serviços"}</option>
                  <option${(ex.subplano || "") === (isPagar ? "Fornecedores" : "Mensalidades") ? " selected" : ""}>${isPagar ? "Fornecedores" : "Mensalidades"}</option>
                  <option${(ex.subplano || "") === "Outros" ? " selected" : ""}>Outros</option>
                </select>
              </div>
              <div>
                <label for="finTitValor">Valor</label>
                <input type="text" id="finTitValor" inputmode="decimal" placeholder="R$ 0,00" value="${valorFmt.replace(/"/g, "&quot;")}" />
              </div>
              <div>
                <label for="finTitVenc">Vencimento</label>
                <input type="date" id="finTitVenc" value="${vencIso}" />
              </div>
              <div>
                <label for="finTitPlano">Plano de Contas</label>
                <select id="finTitPlano">
                  <option value="">Selecione</option>
                  ${["Contábil", "Fiscal", "Financeiro"].map((o) =>
                    `<option${(ex.plano || "") === o ? " selected" : ""}>${o}</option>`
                  ).join("")}
                </select>
              </div>
              <div>
                <label for="finTitCentro">Centro de Custo</label>
                <select id="finTitCentro">
                  <option value="">Selecione</option>
                  ${["Administrativo", "Operacional", "Comercial"].map((o) =>
                    `<option${(ex.centro || "") === o ? " selected" : ""}>${o}</option>`
                  ).join("")}
                </select>
              </div>
            </div>
            <div class="fin-tit-docs-block">
              <h5>Documentos do título</h5>
              <div class="fin-tit-form-grid">
                <div>
                  <label for="finTitNum">Número</label>
                  <input type="text" id="finTitNum" placeholder="Nº do documento" value="${(ex.numero || "").replace(/"/g, "&quot;")}" />
                </div>
                <div>
                  <label for="finTitNosso">Nosso Número</label>
                  <input type="text" id="finTitNosso" placeholder="Nosso número" value="${(ex.nossoNumero || "").replace(/"/g, "&quot;")}" />
                </div>
                <div class="full fin-tit-barcode-field">
                  <label for="finTitCodBarras">Código de Barras</label>
                  <div class="fin-tit-barcode-row">
                    <input type="text" id="finTitCodBarras" placeholder="Linha digitável / código de barras" value="${(ex.codBarras || "").replace(/"/g, "&quot;")}" />
                    <button type="button" class="btn-ghost fin-tit-scan-btn" id="finTitScanBtn" aria-label="Escanear código">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label for="finTitObs">Observações</label>
              <textarea id="finTitObs" rows="3" placeholder="Observações internas">${(ex.obs || "").replace(/</g, "&lt;")}</textarea>
            </div>
            <label class="fin-tit-check">
              <input type="checkbox" id="finTitRepetir" ${ex.repetir ? "checked" : ""} />
              <span>Repetir título · Criar parcelas</span>
            </label>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="finTitNovoSave">${isEdit ? "Salvar alterações" : "Salvar título"}</button>`,
      });

      modalBody.querySelectorAll("[data-fin-tit-quick]").forEach((btn) => {
        btn.addEventListener("click", () => toast(`Importação rápida · ${btn.dataset.finTitQuick.toUpperCase()}`));
      });
      document.getElementById("finTitScanBtn")?.addEventListener("click", () => toast("Leitor de código de barras (protótipo)"));
      document.getElementById("finTitValor")?.addEventListener("input", (e) => {
        const el = e.target;
        let d = String(el.value || "").replace(/\D/g, "");
        if (!d) {
          el.value = "";
          return;
        }
        const n = (Number(d) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        el.value = `R$ ${n}`;
      });
      document.getElementById("finTitNovoSave")?.addEventListener("click", () => {
        const party = document.getElementById("finTitParty")?.value?.trim();
        const valorRaw = document.getElementById("finTitValor")?.value?.trim();
        const valorNum = parseFinTitMoney(valorRaw);
        if (!party) {
          toast(`Informe o ${partyLabel.toLowerCase()}`);
          return;
        }
        if (valorNum == null || valorNum <= 0) {
          toast("Informe o valor");
          return;
        }
        const vencIsoVal = document.getElementById("finTitVenc")?.value || "";
        const vencBr = vencIsoVal ? isoDateToBr(vencIsoVal) : (ex.vencimento || "—");
        const c = resolveFinAuditCliente() || CLIENTES.find((x) => x.id === cliPerfilId);
        const row = {
          id: isEdit ? String(ex.id) : `t${Date.now().toString(36)}`,
          clienteId: c?.id || ex.clienteId || null,
          nome: party,
          descricao: document.getElementById("finTitDesc")?.value?.trim() || "Título sem descrição",
          vencimento: vencBr,
          valor: valorNum,
          restante: isEdit && ex.restante != null && ex.status === "pago" ? 0
            : (isEdit && ex.restante != null && Number(ex.restante) < valorNum ? Number(ex.restante) : valorNum),
          status: isEdit ? (ex.status || "aberto") : "aberto",
          forma: document.getElementById("finTitPayForm")?.value || "",
          subplano: document.getElementById("finTitSubplano")?.value || "",
          plano: document.getElementById("finTitPlano")?.value || "",
          centro: document.getElementById("finTitCentro")?.value || "",
          numero: document.getElementById("finTitNum")?.value?.trim() || "",
          nossoNumero: document.getElementById("finTitNosso")?.value?.trim() || "",
          codBarras: document.getElementById("finTitCodBarras")?.value?.trim() || "",
          obs: document.getElementById("finTitObs")?.value?.trim() || "",
          repetir: !!document.getElementById("finTitRepetir")?.checked,
        };
        const list = cliFinTitulosExtra[isPagar ? "pagar" : "receber"];
        const idx = list.findIndex((t) => String(t.id) === String(row.id));
        if (idx >= 0) list[idx] = { ...list[idx], ...row };
        else list.unshift(row);
        closeModal();
        toast(isEdit ? `Título ${finTitulosLadoLabel(lado)} atualizado` : `Título ${finTitulosLadoLabel(lado)} lançado`);
        refreshCliFinTitulosUi();
      });
    }

    function isoDateToBr(iso) {
      const m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
      return m ? `${m[3]}/${m[2]}/${m[1]}` : "";
    }

    function findCliTituloById(lado, id) {
      const c = resolveFinAuditCliente() || CLIENTES.find((x) => x.id === cliPerfilId);
      if (!c) return null;
      return getCliTitulos(c, lado).find((t) => String(t.id) === String(id)) || null;
    }

    function openFinTitulosVerModal(lado, titulo, tab) {
      if (!titulo) return;
      const prev = cliFinTitVer && String(cliFinTitVer.id) === String(titulo.id) ? cliFinTitVer : null;
      cliFinTitVer = {
        lado: lado === "receber" ? "receber" : "pagar",
        id: titulo.id,
        tab: ["dados", "pagamento", "historico"].includes(tab) ? tab : (prev?.tab || "dados"),
        payMode: prev?.payMode || "total",
        juros: prev?.juros ?? "",
        multa: prev?.multa ?? "",
        desconto: prev?.desconto ?? "",
        forma: prev?.forma || "Boleto",
        obs: prev?.obs || "",
        dataPag: prev?.dataPag || "2026-07-22",
        bancoPickId: prev?.bancoPickId || null,
        pendingQuit: null,
      };
      paintFinTitulosVerModal();
    }

    function getFinTitulosBancosEmpresa() {
      if (typeof ensureFinConcBancos === "function") return ensureFinConcBancos();
      return [
        { id: "b1", nome: "SICREDI", codigo: "756", agencia: "0903", conta: "90850", digito: "7" },
        { id: "b2", nome: "Itaú", codigo: "341", agencia: "1234", conta: "12345", digito: "6" },
        { id: "b3", nome: "Bradesco", codigo: "237", agencia: "0456", conta: "77889", digito: "0" },
      ];
    }

    function finTitulosBancoContaLabel(b) {
      if (typeof finConcBancoContaLabel === "function") return finConcBancoContaLabel(b);
      if (!b) return "—";
      return b.digito ? `${b.conta}-${b.digito}` : String(b.conta || "—");
    }

    function applyFinTitulosQuitWithBanco(banco) {
      if (!cliFinTitVer?.pendingQuit || !banco) return;
      const { lado, id } = cliFinTitVer;
      const p = cliFinTitVer.pendingQuit;
      const patch = {
        forma: p.forma,
        obs: p.obs,
        bancoId: banco.id,
        bancoNome: banco.nome,
        dataPagamento: p.dataPagBr || "22/07/2026",
      };
      if (p.partial) {
        upsertFinTituloStatus(lado, id, {
          ...patch,
          status: "parcial",
          restante: p.restante,
        });
        toast(`${lado === "pagar" ? "Pagamento" : "Recebimento"} parcial · ${money(p.pago)} · ${banco.nome}`);
      } else {
        upsertFinTituloStatus(lado, id, {
          ...patch,
          status: "pago",
          restante: 0,
          valorPago: p.total,
        });
        toast(`${lado === "pagar" ? "Pagamento" : "Recebimento"} confirmado · ${money(p.total)} · ${banco.nome}`);
      }
      cliFinTitVer.pendingQuit = null;
      cliFinTitVer.bancoPickId = banco.id;
      cliFinTitVer.tab = "dados";
      refreshCliFinTitulosUi();
      paintFinTitulosVerModal();
    }

    function openFinTitulosBancoPickModal() {
      if (!cliFinTitVer?.pendingQuit) return;
      const lado = cliFinTitVer.lado;
      const bancos = getFinTitulosBancosEmpresa();
      if (!bancos.length) {
        toast("Nenhum banco cadastrado nesta empresa");
        return;
      }
      if (!cliFinTitVer.bancoPickId || !bancos.some((b) => b.id === cliFinTitVer.bancoPickId)) {
        cliFinTitVer.bancoPickId = (typeof finDash !== "undefined" && finDash.conc?.bancoId)
          || bancos[0].id;
      }
      const pickId = cliFinTitVer.bancoPickId;
      const c = (typeof resolveFinAuditCliente === "function" ? resolveFinAuditCliente() : null)
        || (typeof getFinSelectedCliente === "function" ? getFinSelectedCliente() : null)
        || CLIENTES.find((x) => x.id === cliPerfilId)
        || CLIENTES[0];
      const empresa = c?.fantasia || c?.nome || "Empresa selecionada";
      const fluxoLab = lado === "pagar" ? "saída" : "entrada";
      const title = lado === "pagar" ? "Selecionar banco de saída" : "Selecionar banco de entrada";

      openModal({
        title,
        sub: `${empresa} · Conta de ${fluxoLab} do valor`,
        wide: true,
        body: `
          <div class="fin-conc-pick-banco">
            <div class="fin-conc-pick-cliente">Empresa: <strong>${uiSelectEscape(empresa)}</strong></div>
            <p class="fin-tit-hint" style="margin:0 0 10px">
              Escolha o banco em que o valor está ${lado === "pagar" ? "saindo" : "entrando"} ·
              Total: <strong>${money(cliFinTitVer.pendingQuit.partial ? cliFinTitVer.pendingQuit.pago : cliFinTitVer.pendingQuit.total)}</strong>
            </p>
            <div class="fin-conc-pick-list">
              ${bancos.map((b) => {
                const selected = b.id === pickId;
                return `
                  <button type="button" class="fin-conc-pick-row${selected ? " is-selected" : ""}" data-fin-tit-banco-pick="${b.id}">
                    <span class="fin-conc-pick-ico" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 22h18"/><path d="M6 18V11"/><path d="M10 18V11"/><path d="M14 18V11"/><path d="M18 18V11"/><path d="m12 2 8 5H4z"/></svg>
                    </span>
                    <span class="fin-conc-pick-info">
                      <strong>${uiSelectEscape(b.nome)}</strong>
                      <span>${uiSelectEscape(b.codigo || "—")} · Ag: ${uiSelectEscape(b.agencia || "—")} · Cc: ${uiSelectEscape(finTitulosBancoContaLabel(b))}</span>
                    </span>
                    <span class="fin-conc-pick-actions">
                      <span class="fin-conc-pick-check${selected ? "" : " is-empty"}" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span>
                    </span>
                  </button>`;
              }).join("")}
            </div>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" id="finTitBancoCancel">Cancelar</button>
          <button type="button" class="btn-primary" id="finTitBancoConfirm">Confirmar</button>`,
      });

      modal.classList.add("fin-tit-banco-modal");

      modalBody.querySelectorAll("[data-fin-tit-banco-pick]").forEach((btn) => {
        btn.addEventListener("click", () => {
          cliFinTitVer.bancoPickId = btn.dataset.finTitBancoPick;
          openFinTitulosBancoPickModal();
        });
      });

      document.getElementById("finTitBancoCancel")?.addEventListener("click", () => {
        if (cliFinTitVer) {
          delete cliFinTitVer.pendingQuit;
          cliFinTitVer.tab = "pagamento";
        }
        paintFinTitulosVerModal();
      });

      document.getElementById("finTitBancoConfirm")?.addEventListener("click", () => {
        const b = getFinTitulosBancosEmpresa().find((x) => x.id === cliFinTitVer.bancoPickId);
        if (!b) {
          toast("Selecione um banco");
          return;
        }
        applyFinTitulosQuitWithBanco(b);
      });
    }

    function finTitVerStatusMeta(status) {
      const map = {
        pago: { label: "Pago", cls: "pago" },
        parcial: { label: "Parcial", cls: "parcial" },
        vencido: { label: "Vencido", cls: "vencido" },
        aberto: { label: "Em aberto", cls: "aberto" },
      };
      return map[status] || map.aberto;
    }

    function finTitVerDiasAtraso(vencimento) {
      const dt = typeof parseBrDate === "function" ? parseBrDate(vencimento) : null;
      if (!dt) return 0;
      const hoje = typeof APP_TODAY !== "undefined" ? APP_TODAY : new Date(2026, 6, 22);
      const start = typeof startOfDay === "function" ? startOfDay(hoje) : new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
      const venc = typeof startOfDay === "function" ? startOfDay(dt) : new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
      const diff = Math.round((start - venc) / 86400000);
      return diff > 0 ? diff : 0;
    }

    function finTitVerBarcode(t) {
      if (t.codigoBarras || t.codBarras) return String(t.codigoBarras || t.codBarras);
      const seed = String(t.id || "0").replace(/\D/g, "") || "141582";
      return `33333${seed.padStart(5, "0")}000000500002207202633333${seed.slice(-4).padStart(4, "0")}00000050000`;
    }

    function getFinTitVerHistory(t, lado) {
      const events = [
        {
          id: "h-create",
          titulo: "Criação",
          quando: "21/07/2026 09:43",
          desc: `Título criado: ${t.descricao || t.nome}`,
          meta: "Sistema",
        },
      ];
      if (t.status === "pago" || t.status === "parcial") {
        events.unshift({
          id: "h-pay",
          titulo: t.status === "pago"
            ? (lado === "pagar" ? "Pagamento total" : "Recebimento total")
            : (lado === "pagar" ? "Pagamento parcial" : "Recebimento parcial"),
          quando: `${t.dataPagamento || t.vencimento || "19/06/2026"} 00:00`,
          desc: t.bancoNome
            ? `${lado === "pagar" ? "Pagamento" : "Recebimento"} via ${t.bancoNome}`
            : (lado === "pagar" ? "Pagamento registrado" : "Recebimento registrado"),
          valor: t.status === "pago" ? Number(t.valor) : (Number(t.valor) - Number(t.restante || 0)),
          meta: t.bancoNome || "Sistema",
        });
      }
      return events;
    }

    function renderFinTitulosVerStatusCardHtml(t, lado, opts = {}) {
      const showCalc = !!opts.showCalc;
      const dias = finTitVerDiasAtraso(t.vencimento);
      const atrasado = dias > 0 || t.status === "vencido";
      const stMeta = finTitVerStatusMeta(t.status);
      let statusTone = "is-open";
      let statusTitle = "Título em aberto";
      let statusDetail = `Vencimento ${t.vencimento || "—"} · Restante ${money(t.restante)}`;
      if (t.status === "pago") {
        statusTone = "is-ok";
        statusTitle = lado === "pagar" ? "Este título foi pago" : "Este título foi recebido";
        statusDetail = `Data de pagamento: ${t.dataPagamento || t.vencimento || "N/A"}`;
      } else if (t.status === "parcial") {
        statusTone = "is-parcial";
        statusTitle = lado === "pagar" ? "Pagamento parcial" : "Recebimento parcial";
        statusDetail = `Restante ${money(t.restante)} · Vencimento ${t.vencimento || "—"}`;
      } else if (atrasado) {
        statusTone = "is-atraso";
        statusTitle = "Conta em atraso";
        statusDetail = `Vencimento ${t.vencimento || "—"} · ${dias} dia${dias === 1 ? "" : "s"} em atraso`;
      }
      return `
        <div class="fin-tit-ver-status ${statusTone}" role="status">
          <div class="fin-tit-ver-status-copy">
            <span class="cli-fin-tit-status ${stMeta.cls}">${stMeta.label}</span>
            <strong>${statusTitle}</strong>
            <span>${uiSelectEscape(statusDetail)}</span>
          </div>
          ${showCalc && atrasado && t.status !== "pago" ? `
          <button type="button" class="btn-ghost fin-tit-ver-status-act" data-fin-tit-ver-act="calc-juros">Calcular juros e multa</button>` : ""}
        </div>`;
    }

    function renderFinTitulosVerDadosHtml(t, lado) {
      const parte = lado === "pagar" ? "Fornecedor" : "Cliente";
      const formaLab = lado === "pagar" ? "Forma de pagamento" : "Forma de recebimento";
      const dias = finTitVerDiasAtraso(t.vencimento);
      const pago = Math.max(0, (Number(t.valor) || 0) - (Number(t.restante != null ? t.restante : t.valor) || 0));
      return `
        ${renderFinTitulosVerStatusCardHtml(t, lado)}
        <div class="fin-tit-ver-sum">
          <div>
            <span class="lab">Valor original</span>
            <strong>${money(t.valor)}</strong>
          </div>
          <div class="is-pago">
            <span class="lab">Valor pago</span>
            <strong>${money(pago)}</strong>
          </div>
        </div>
        <section class="fin-tit-docs-block">
          <h5>Informações da conta</h5>
          <div class="fin-tit-ver-grid">
            <div class="full">
              <span class="lab">${parte}</span>
              <strong>${uiSelectEscape(t.nome || "—")}</strong>
            </div>
            <div class="full">
              <span class="lab">Descrição</span>
              <strong>${uiSelectEscape(t.descricao || "—")}</strong>
            </div>
            <div>
              <span class="lab">Vencimento</span>
              <strong>${uiSelectEscape(t.vencimento || "—")}</strong>
            </div>
            <div>
              <span class="lab">Dias em atraso</span>
              <strong>${dias}</strong>
            </div>
            <div>
              <span class="lab">Valor</span>
              <strong>${money(t.valor)}</strong>
            </div>
            <div>
              <span class="lab">Valor pago</span>
              <strong>${money(pago)}</strong>
            </div>
            <div>
              <span class="lab">Restante</span>
              <strong>${money(t.restante)}</strong>
            </div>
            <div>
              <span class="lab">${formaLab}</span>
              <strong>${uiSelectEscape(t.forma || "Boleto")}</strong>
            </div>
            ${t.bancoNome ? `
            <div class="full">
              <span class="lab">Conta bancária</span>
              <strong>${uiSelectEscape(t.bancoNome)}</strong>
            </div>` : ""}
          </div>
        </section>
        <section class="fin-tit-docs-block">
          <h5>Documentos</h5>
          <div class="fin-tit-ver-grid">
            <div>
              <span class="lab">Nº documento</span>
              <strong>${uiSelectEscape(String(t.numero || t.id || "—"))}</strong>
            </div>
            <div>
              <span class="lab">Nosso número</span>
              <strong>${uiSelectEscape(t.nossoNumero || "—")}</strong>
            </div>
            <div class="full">
              <span class="lab">Código de barras</span>
              <strong class="fin-tit-ver-barcode">${uiSelectEscape(finTitVerBarcode(t))}</strong>
            </div>
          </div>
        </section>
        <section class="fin-tit-docs-block">
          <h5>Classificação</h5>
          <div class="fin-tit-ver-grid">
            <div>
              <span class="lab">Plano de contas</span>
              <strong>${uiSelectEscape(t.plano || "—")}</strong>
            </div>
            <div>
              <span class="lab">Centro de custo</span>
              <strong>${uiSelectEscape(t.centro || "—")}</strong>
            </div>
          </div>
        </section>`;
    }

    function renderFinTitulosVerPagamentoHtml(t, lado) {
      const st = cliFinTitVer;
      const base = Number(t.restante != null ? t.restante : t.valor) || 0;
      const juros = parseFinTitMoney(st.juros) || 0;
      const multa = parseFinTitMoney(st.multa) || 0;
      const desconto = parseFinTitMoney(st.desconto) || 0;
      const total = Math.max(0, base + juros + multa - desconto);
      const payLab = lado === "pagar" ? "Pagamento" : "Recebimento";
      const disabled = t.status === "pago";
      return `
        <div class="fin-tit-ver-pay${disabled ? " is-disabled" : ""}">
          ${renderFinTitulosVerStatusCardHtml(t, lado, { showCalc: true })}
          <div class="fin-tit-form-grid">
            <div class="full fin-tit-ver-pay-modes" role="radiogroup" aria-label="Tipo de ${payLab.toLowerCase()}">
              <label class="fin-tit-ver-radio">
                <input type="radio" name="finTitPayMode" value="total" ${st.payMode !== "parcial" ? "checked" : ""} ${disabled ? "disabled" : ""} data-fin-tit-ver-pay="mode" />
                <span>${payLab} total</span>
              </label>
              <label class="fin-tit-ver-radio">
                <input type="radio" name="finTitPayMode" value="parcial" ${st.payMode === "parcial" ? "checked" : ""} ${disabled ? "disabled" : ""} data-fin-tit-ver-pay="mode" />
                <span>${payLab} parcial</span>
              </label>
            </div>
            <div>
              <label for="finTitVerDataPag">Data do ${payLab.toLowerCase()}</label>
              <input type="date" id="finTitVerDataPag" value="${uiSelectEscape(st.dataPag || "")}" ${disabled ? "disabled" : ""} />
            </div>
            <div>
              <label for="finTitVerForma">Forma</label>
              <select id="finTitVerForma" ${disabled ? "disabled" : ""}>
                ${["Dinheiro", "Boleto", "PIX", "Transferência", "Cartão"].map((f) => `
                  <option value="${f}" ${(st.forma || "Dinheiro") === f ? "selected" : ""}>${f}</option>`).join("")}
              </select>
            </div>
            <div>
              <label>Valor base</label>
              <input type="text" value="${money(base)}" readonly tabindex="-1" />
            </div>
            <div>
              <label for="finTitVerJuros">Juros</label>
              <input type="text" id="finTitVerJuros" inputmode="decimal" placeholder="0,00" value="${uiSelectEscape(st.juros || "0,00")}" ${disabled ? "disabled" : ""} />
            </div>
            <div>
              <label for="finTitVerMulta">Multa</label>
              <input type="text" id="finTitVerMulta" inputmode="decimal" placeholder="0,00" value="${uiSelectEscape(st.multa || "0,00")}" ${disabled ? "disabled" : ""} />
            </div>
            <div>
              <label for="finTitVerDesconto">Desconto</label>
              <input type="text" id="finTitVerDesconto" inputmode="decimal" placeholder="0,00" value="${uiSelectEscape(st.desconto || "0,00")}" ${disabled ? "disabled" : ""} />
            </div>
            <div class="full">
              <label for="finTitVerObs">Observação</label>
              <textarea id="finTitVerObs" rows="3" placeholder="Observações do lançamento…" ${disabled ? "disabled" : ""}>${uiSelectEscape(st.obs)}</textarea>
            </div>
          </div>
          <p class="fin-tit-hint">Total a ${lado === "pagar" ? "pagar" : "receber"}: <strong>${money(total)}</strong></p>
          ${disabled ? `<p class="fin-tit-hint">Título liquidado. Use <strong>Reabrir título</strong> na aba Dados da Conta para alterar.</p>` : ""}
        </div>`;
    }

    function renderFinTitulosVerHistoricoHtml(t, lado) {
      const events = getFinTitVerHistory(t, lado);
      return `
        <div class="fin-tit-ver-history">
          ${events.map((ev) => `
            <article class="fin-tit-ver-hist-item">
              <div class="fin-tit-ver-hist-body">
                <div class="fin-tit-ver-hist-top">
                  <strong>${uiSelectEscape(ev.titulo)}</strong>
                  <span class="when">${uiSelectEscape(ev.quando)}</span>
                </div>
                <p>${uiSelectEscape(ev.desc)}</p>
              </div>
              <div class="fin-tit-ver-hist-side">
                ${ev.valor != null ? `<strong>${money(ev.valor)}</strong>` : ""}
                <span>${uiSelectEscape(ev.meta || "Sistema")}</span>
              </div>
            </article>`).join("")}
        </div>`;
    }

    function syncFinTitVerFormFromDom() {
      if (!cliFinTitVer) return;
      const mode = document.querySelector('input[name="finTitPayMode"]:checked')?.value;
      if (mode) cliFinTitVer.payMode = mode;
      cliFinTitVer.dataPag = document.getElementById("finTitVerDataPag")?.value || cliFinTitVer.dataPag;
      cliFinTitVer.juros = document.getElementById("finTitVerJuros")?.value ?? cliFinTitVer.juros;
      cliFinTitVer.multa = document.getElementById("finTitVerMulta")?.value ?? cliFinTitVer.multa;
      cliFinTitVer.desconto = document.getElementById("finTitVerDesconto")?.value ?? cliFinTitVer.desconto;
      cliFinTitVer.forma = document.getElementById("finTitVerForma")?.value || cliFinTitVer.forma;
      cliFinTitVer.obs = document.getElementById("finTitVerObs")?.value ?? cliFinTitVer.obs;
    }

    function upsertFinTituloStatus(lado, id, patch) {
      const list = cliFinTitulosExtra[lado] || (cliFinTitulosExtra[lado] = []);
      const c = (typeof resolveFinAuditCliente === "function" ? resolveFinAuditCliente() : null)
        || CLIENTES.find((x) => x.id === cliPerfilId)
        || CLIENTES[0];
      let row = list.find((t) => String(t.id) === String(id));
      const base = findCliTituloById(lado, id);
      if (!row) {
        row = { ...(base || {}), id, clienteId: c?.id };
        list.push(row);
      }
      Object.assign(row, patch);
      return row;
    }

    function paintFinTitulosVerModal() {
      if (!cliFinTitVer) return;
      const lado = cliFinTitVer.lado;
      const t = findCliTituloById(lado, cliFinTitVer.id);
      if (!t) {
        toast("Título não encontrado");
        cliFinTitVer = null;
        return;
      }
      const stMeta = finTitVerStatusMeta(t.status);
      const tab = cliFinTitVer.tab || "dados";
      const payTabLabel = lado === "pagar" ? "Efetuar Pagamento" : "Efetuar Recebimento";
      const confirmLab = lado === "pagar" ? "Confirmar pagamento" : "Confirmar recebimento";
      const contaId = t.numero || t.id;

      let bodyPane = "";
      if (tab === "pagamento") bodyPane = renderFinTitulosVerPagamentoHtml(t, lado);
      else if (tab === "historico") bodyPane = renderFinTitulosVerHistoricoHtml(t, lado);
      else bodyPane = renderFinTitulosVerDadosHtml(t, lado);

      let foot = `<button type="button" class="btn-ghost" data-close>Fechar</button>`;
      if (tab === "dados" && t.status === "pago") {
        foot += `<button type="button" class="btn-primary" data-fin-tit-ver-act="reabrir">Reabrir título</button>`;
      } else if (tab === "dados" && t.status !== "pago") {
        foot += `<button type="button" class="btn-primary" data-fin-tit-ver-act="ir-pagar">${payTabLabel}</button>`;
      } else if (tab === "pagamento" && t.status !== "pago") {
        foot += `<button type="button" class="btn-primary" data-fin-tit-ver-act="confirmar">${confirmLab}</button>`;
      }

      openModal({
        title: `Conta #${contaId} — ${t.descricao || t.nome}`,
        sub: `${t.nome || ""} · ${stMeta.label}`,
        wide: true,
        body: `
          <div class="fin-tit-ver">
            <div class="fin-tit-modal-tabs" role="tablist" aria-label="Detalhe do título">
              <button type="button" class="fin-tit-modal-tab${tab === "dados" ? " active" : ""}" role="tab" aria-selected="${tab === "dados"}" data-fin-tit-ver-tab="dados">Dados da Conta</button>
              <button type="button" class="fin-tit-modal-tab${tab === "pagamento" ? " active" : ""}" role="tab" aria-selected="${tab === "pagamento"}" data-fin-tit-ver-tab="pagamento">${payTabLabel}</button>
              <button type="button" class="fin-tit-modal-tab${tab === "historico" ? " active" : ""}" role="tab" aria-selected="${tab === "historico"}" data-fin-tit-ver-tab="historico">Histórico</button>
            </div>
            <div class="fin-tit-ver-pane">${bodyPane}</div>
          </div>`,
        foot,
      });

      modal.classList.add("fin-tit-ver-modal");

      const confirmPagamento = () => {
        syncFinTitVerFormFromDom();
        const base = Number(t.restante != null ? t.restante : t.valor) || 0;
        const juros = parseFinTitMoney(cliFinTitVer.juros) || 0;
        const multa = parseFinTitMoney(cliFinTitVer.multa) || 0;
        const desconto = parseFinTitMoney(cliFinTitVer.desconto) || 0;
        const total = Math.max(0, base + juros + multa - desconto);
        const partial = cliFinTitVer.payMode === "parcial";
        const pago = partial ? Math.min(base, Math.max(0.01, base * 0.5)) : total;
        const dataIso = cliFinTitVer.dataPag || "";
        const dataPagBr = dataIso && dataIso.includes("-")
          ? dataIso.split("-").reverse().join("/")
          : (dataIso || "22/07/2026");
        cliFinTitVer.pendingQuit = {
          total,
          partial,
          pago,
          restante: partial ? Math.max(0, +(base - pago).toFixed(2)) : 0,
          forma: cliFinTitVer.forma,
          obs: cliFinTitVer.obs,
          dataPagBr,
        };
        openFinTitulosBancoPickModal();
      };

      modalBody.querySelectorAll("[data-fin-tit-ver-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          syncFinTitVerFormFromDom();
          cliFinTitVer.tab = btn.dataset.finTitVerTab || "dados";
          paintFinTitulosVerModal();
        });
      });

      modalBody.querySelectorAll("[data-fin-tit-ver-pay='mode']").forEach((el) => {
        el.addEventListener("change", () => {
          syncFinTitVerFormFromDom();
          paintFinTitulosVerModal();
        });
      });

      ["finTitVerJuros", "finTitVerMulta", "finTitVerDesconto"].forEach((id) => {
        document.getElementById(id)?.addEventListener("input", () => {
          syncFinTitVerFormFromDom();
          paintFinTitulosVerModal();
          const el = document.getElementById(id);
          el?.focus();
          try {
            const len = el.value.length;
            el.setSelectionRange(len, len);
          } catch (_) { /* ignore */ }
        });
      });

      modalBody.querySelector("[data-fin-tit-ver-act='calc-juros']")?.addEventListener("click", () => {
        const dias = finTitVerDiasAtraso(t.vencimento) || 1;
        const base = Number(t.restante != null ? t.restante : t.valor) || 0;
        cliFinTitVer.juros = (base * 0.01 * Math.min(dias, 30) / 30).toFixed(2).replace(".", ",");
        cliFinTitVer.multa = (base * 0.02).toFixed(2).replace(".", ",");
        toast("Juros e multa calculados (protótipo)");
        paintFinTitulosVerModal();
      });

      modalFoot.querySelector("[data-fin-tit-ver-act='ir-pagar']")?.addEventListener("click", () => {
        cliFinTitVer.tab = "pagamento";
        paintFinTitulosVerModal();
      });

      modalFoot.querySelector("[data-fin-tit-ver-act='reabrir']")?.addEventListener("click", () => {
        upsertFinTituloStatus(lado, t.id, { status: "aberto", restante: Number(t.valor) || 0 });
        toast("Título reaberto");
        refreshCliFinTitulosUi();
        paintFinTitulosVerModal();
      });

      modalFoot.querySelector("[data-fin-tit-ver-act='confirmar']")?.addEventListener("click", confirmPagamento);
    }

    function openFinTitulosExportModal(lado) {
      openModal({
        title: "Exportar para Excel",
        sub: `Títulos ${finTitulosLadoLabel(lado)}`,
        body: `
          <div class="fin-tit-export-grid">
            <div>
              <label for="finTitExpIni">Vencimento inicial</label>
              <input type="date" id="finTitExpIni" value="${cliFinTitulosFiltros.vencIni || ""}" />
            </div>
            <div>
              <label for="finTitExpFim">Vencimento final</label>
              <input type="date" id="finTitExpFim" value="${cliFinTitulosFiltros.vencFim || ""}" />
            </div>
          </div>
          <p class="fin-tit-hint">A planilha incluirá os títulos ${finTitulosLadoLabel(lado)} no intervalo informado.</p>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="finTitExportConfirm">Exportar</button>`,
      });
      document.getElementById("finTitExportConfirm")?.addEventListener("click", () => {
        const ini = document.getElementById("finTitExpIni")?.value || "";
        const fim = document.getElementById("finTitExpFim")?.value || "";
        closeModal();
        toast(ini || fim
          ? `Exportando títulos ${finTitulosLadoLabel(lado)} · ${ini || "…"} a ${fim || "…"}`
          : `Exportando todos os títulos ${finTitulosLadoLabel(lado)}`);
      });
    }

    function renderCliFinTitulosFilterBar() {
      const d = cliFinTitulosFiltros;
      return `
        <div class="fin-tit-filter-bar" id="finTitFilterBar">
          <div class="fin-tit-filter-fields">
            <div class="proc-filter search fin-tit-filter-search">
              <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="search" id="finTitFiltroQ" placeholder="Buscar título…" value="${(d.q || "").replace(/"/g, "&quot;")}" aria-label="Busca livre" />
            </div>
            <div class="proc-filter field">
              <select id="finTitFiltroStatus" aria-label="Status">
                <option value=""${!d.status ? " selected" : ""}>Status</option>
                <option value="aberto"${d.status === "aberto" ? " selected" : ""}>Em aberto</option>
                <option value="parcial"${d.status === "parcial" ? " selected" : ""}>Parcial</option>
                <option value="pago"${d.status === "pago" ? " selected" : ""}>Pago</option>
                <option value="vencido"${d.status === "vencido" ? " selected" : ""}>Vencido</option>
              </select>
            </div>
            <div class="proc-filter field">
              <input type="text" id="finTitFiltroVMin" inputmode="decimal" placeholder="Valor mín." value="${(d.valorMin || "").replace(/"/g, "&quot;")}" aria-label="Valor mínimo" />
            </div>
            <div class="proc-filter field">
              <input type="text" id="finTitFiltroVMax" inputmode="decimal" placeholder="Valor máx." value="${(d.valorMax || "").replace(/"/g, "&quot;")}" aria-label="Valor máximo" />
            </div>
            <div class="proc-filter field">
              <input type="date" id="finTitFiltroVencIni" value="${d.vencIni || ""}" aria-label="Vencimento início" title="Venc. início" />
            </div>
            <div class="proc-filter field">
              <input type="date" id="finTitFiltroVencFim" value="${d.vencFim || ""}" aria-label="Vencimento fim" title="Venc. fim" />
            </div>
            <button type="button" class="fin-tit-filter-clear" data-fin-tit-filtro="limpar">Limpar</button>
          </div>
        </div>`;
    }

    function renderCliFinTitulosToolbar(tipo) {
      return `
        <div class="cli-fin-tit-toolbar">
          <button type="button" class="btn-ghost" data-cli-fin-tit-action="importar" data-cli-fin-tit-tipo="${tipo}">Importar</button>
          <button type="button" class="btn-primary" data-cli-fin-tit-action="novo" data-cli-fin-tit-tipo="${tipo}">Novo</button>
          <button type="button" class="btn-ghost" data-cli-fin-tit-action="exportar" data-cli-fin-tit-tipo="${tipo}">Exportar</button>
        </div>
        ${renderCliFinTitulosFilterBar()}`;
    }

    function syncFinTitulosFiltrosDraftFromDom() {
      cliFinTitulosFiltrosDraft = {
        q: document.getElementById("finTitFiltroQ")?.value || "",
        status: document.getElementById("finTitFiltroStatus")?.value || "",
        valorMin: document.getElementById("finTitFiltroVMin")?.value || "",
        valorMax: document.getElementById("finTitFiltroVMax")?.value || "",
        vencIni: document.getElementById("finTitFiltroVencIni")?.value || "",
        vencFim: document.getElementById("finTitFiltroVencFim")?.value || "",
      };
    }

    function applyFinTitulosFiltrosFromDraft() {
      cliFinTitulosFiltros = { ...cliFinTitulosFiltrosDraft };
      cliFinTituloStatusFiltro = cliFinTitulosFiltros.status || "";
    }

    function clearFinTitulosFiltros() {
      cliFinTitulosFiltrosDraft = { q: "", status: "", valorMin: "", valorMax: "", vencIni: "", vencFim: "" };
      cliFinTitulosFiltros = { ...cliFinTitulosFiltrosDraft };
      cliFinTituloStatusFiltro = "";
    }

    function liveApplyFinTitulosFiltrosFromEvent(e) {
      const id = e.target?.id || "";
      if (!/^finTitFiltro(Q|Status|VMin|VMax|VencIni|VencFim)$/.test(id)) return false;
      const pos = e.target.selectionStart;
      syncFinTitulosFiltrosDraftFromDom();
      applyFinTitulosFiltrosFromDraft();
      refreshCliFinTitulosUi();
      const el = document.getElementById(id);
      if (el) {
        el.focus();
        try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
      }
      return true;
    }

    function handleFinTitulosToolbarClick(e) {
      const filtroAct = e.target.closest("[data-fin-tit-filtro]");
      if (filtroAct) {
        if (filtroAct.dataset.finTitFiltro === "limpar") {
          clearFinTitulosFiltros();
          refreshCliFinTitulosUi();
          toast("Filtros limpos");
        }
        return true;
      }
      const titAction = e.target.closest("[data-cli-fin-tit-action]");
      if (titAction) {
        const kind = titAction.dataset.cliFinTitAction;
        const lado = titAction.dataset.cliFinTitTipo === "pagar" ? "pagar" : "receber";
        if (kind === "importar") openFinTitulosImportModal(lado);
        else if (kind === "novo") openFinTitulosNovoModal(lado);
        else if (kind === "exportar") openFinTitulosExportModal(lado);
        return true;
      }
      return false;
    }

    function handleFinTitulosRowAction(e) {
      const titRow = e.target.closest("[data-cli-fin-tit-row]");
      if (!titRow) return false;
      const act = titRow.dataset.cliFinTitRow;
      const id = titRow.dataset.id;
      let lado = finDash.titulosSub === "receber" ? "receber" : "pagar";
      const panel = titRow.closest(".fin-titulos-panel");
      const tabBtn = panel?.querySelector(".cli-fin-audit-tab.active[data-fin-titulos-tab]");
      if (tabBtn) lado = tabBtn.dataset.finTitulosTab === "receber" ? "receber" : "pagar";
      if (cliFinSubTab === "receber" || cliFinSubTab === "pagar") lado = cliFinSubTab;
      const titulo = findCliTituloById(lado, id);
      if (!titulo) {
        toast("Título não encontrado");
        return true;
      }
      if (act === "ver") openFinTitulosVerModal(lado, titulo);
      else if (act === "editar") openFinTitulosNovoModal(lado, titulo);
      return true;
    }

    function renderCliFinTitulosTable(c, tipo) {
      const rows = getCliTitulosFiltrados(c, tipo);
      const nomeCol = tipo === "receber" ? "Cliente" : "Fornecedor";
      const statusLabel = { aberto: "Em aberto", parcial: "Parcial", pago: "Pago", vencido: "Vencido" };
      const selectedCount = rows.filter((t) => isCliFinTituloSelected(t.id)).length;
      const allSelected = rows.length > 0 && selectedCount === rows.length;
      const someSelected = selectedCount > 0 && !allSelected;
      return `
        ${renderCliFinTitulosToolbar(tipo)}
        <div class="cli-fin-tit-table">
          <table>
            <thead>
              <tr>
                <th class="cli-fin-tit-check-col">
                  <input type="checkbox" data-cli-fin-tit-check-all="${tipo}" aria-label="Selecionar todos" ${allSelected ? "checked" : ""}${someSelected ? " data-indeterminate=\"1\"" : ""} />
                </th>
                <th>${nomeCol}</th>
                <th>Descrição</th>
                <th>Vencimento</th>
                <th>Valor</th>
                <th>Restante</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              ${rows.length ? rows.map((t) => `
                <tr class="${isCliFinTituloSelected(t.id) ? "is-selected" : ""}">
                  <td class="cli-fin-tit-check-col">
                    <input type="checkbox" data-cli-fin-tit-check="${t.id}" aria-label="Selecionar título" ${isCliFinTituloSelected(t.id) ? "checked" : ""} />
                  </td>
                  <td><strong>${t.nome}</strong></td>
                  <td>${t.descricao}</td>
                  <td>${t.vencimento}</td>
                  <td class="valor">${money(t.valor)}</td>
                  <td class="valor">${money(t.restante)}</td>
                  <td><span class="cli-fin-tit-status ${t.status}">${statusLabel[t.status] || t.status}</span></td>
                  <td>
                    <div class="cli-fin-tit-actions">
                      <button type="button" data-cli-fin-tit-row="ver" data-id="${t.id}">Ver</button>
                      <button type="button" data-cli-fin-tit-row="editar" data-id="${t.id}">Editar</button>
                    </div>
                  </td>
                </tr>`).join("") : `<tr><td colspan="8"><div class="cli-empty-panel">Nenhum título correspondente</div></td></tr>`}
            </tbody>
          </table>
        </div>`;
    }

    function renderCliFinPlanoTab() {
      return renderFinPlanoContasPanel();
    }

    function renderCliFinSubTabBody(c, metrics) {
      if (cliFinSubTab === "relatorio") return renderCliFinRelatorioTab(c);
      if (cliFinSubTab === "auditoria") return renderCliFinAuditoriaTab(c);
      if (cliFinSubTab === "receber") return renderCliFinTitulosTable(c, "receber");
      if (cliFinSubTab === "pagar") return renderCliFinTitulosTable(c, "pagar");
      if (cliFinSubTab === "plano") return renderCliFinPlanoTab();
      if (cliFinSubTab === "conciliacao") {
        return `
          <div class="fin-table-empty" style="padding:28px 16px">
            A Conciliação Bancária está no <strong>Módulo Contábil</strong>. Use a aba <strong>Conciliação ↗</strong> para abrir a versão atual.
          </div>`;
      }

      const f = cliFinMovFiltros;
      const movs = getCliMovimentacoesFiltradas(c);
      const receber = getCliTitulos(c, "receber");
      const pagar = getCliTitulos(c, "pagar");
      const totalReceber = receber.reduce((acc, t) => acc + (t.restante || 0), 0);
      const totalPagar = pagar.reduce((acc, t) => acc + (t.restante || 0), 0);
      const statusLabel = { aberto: "Em aberto", parcial: "Parcial", pago: "Pago", vencido: "Vencido" };
      const contasItem = (t) => `
        <div class="cli-fin-contas-item">
          <strong>${t.nome}</strong>
          <div class="valor">${money(t.restante)}</div>
          <div class="meta">${t.descricao} · vence ${t.vencimento} · <span class="cli-fin-tit-status ${t.status}">${statusLabel[t.status] || t.status}</span></div>
        </div>`;
      return `
        <div class="cli-fin-dual">
          <section class="cli-fin-mov-card" aria-label="Movimentação Bancária">
            <div class="cli-fin-mov-head">
              <div>
                <h4>Movimentação Bancária</h4>
                <div class="sub">Extrato e conciliação · ${movs.length} registro${movs.length === 1 ? "" : "s"}</div>
              </div>
            </div>
            <div class="cli-fin-mov-toolbar">
              <div class="proc-filter field tipo">
                <select id="cliFinTipo" aria-label="Tipo de Movimentação">
                  <option value="">Tipo</option>
                  <option value="credito" ${f.tipo === "credito" ? "selected" : ""}>Crédito</option>
                  <option value="debito" ${f.tipo === "debito" ? "selected" : ""}>Débito</option>
                  <option value="transferencia" ${f.tipo === "transferencia" ? "selected" : ""}>Transferência</option>
                </select>
              </div>
              <div class="proc-filter field valor">
                <input type="text" id="cliFinValor" inputmode="decimal" placeholder="Valor" value="${(f.valor || "").replace(/"/g, "&quot;")}" aria-label="Valor" />
              </div>
              <div class="proc-filter field id-titulo">
                <input type="text" id="cliFinIdTitulo" placeholder="ID título" value="${(f.idTitulo || "").replace(/"/g, "&quot;")}" aria-label="ID do Título" />
              </div>
              <div class="proc-filter field status">
                <select id="cliFinStatus" aria-label="Status">
                  <option value="" ${!f.status ? "selected" : ""}>Status</option>
                  <option value="aberto" ${f.status === "aberto" ? "selected" : ""}>Em aberto</option>
                  <option value="conciliada" ${f.status === "conciliada" ? "selected" : ""}>Conciliadas</option>
                </select>
              </div>
              <div class="cli-fin-mov-actions">
                <button type="button" class="btn-ghost" data-cli-fin-import="ofx">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Importar OFX
                </button>
                <button type="button" class="btn-ghost" data-cli-fin-filtros>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
                  Filtros
                </button>
              </div>
            </div>
            <div class="cli-fin-mov-list">
              ${movs.length ? movs.map((m) => `
                <div class="cli-fin-mov-row">
                  <div>
                    <strong>${m.descricao}</strong>
                    <div class="meta">${m.data} · ${m.fornecedor || m.cliente || "—"} · Título #${m.idTitulo} · ${m.tipo === "credito" ? "Crédito" : m.tipo === "debito" ? "Débito" : "Transferência"}</div>
                  </div>
                  <div class="valor ${m.tipo === "credito" ? "credito" : "debito"}">${m.tipo === "credito" ? "+" : "−"} ${money(m.valor)}</div>
                  <span class="cli-fin-mov-tag ${m.status}">${m.status === "aberto" ? "Em aberto" : "Conciliada"}</span>
                </div>`).join("") : `<div class="cli-empty-panel">Nenhuma movimentação correspondente aos filtros</div>`}
            </div>
          </section>

          <section class="cli-fin-contas-card" aria-label="Contas a pagar e receber">
            <div class="cli-fin-mov-head">
              <div>
                <h4>Contas a pagar e receber</h4>
                <div class="sub">Resumo dos títulos em aberto da empresa</div>
              </div>
            </div>
            <div class="cli-fin-contas-kpis">
              <div class="cli-fin-contas-kpi">
                <span>A receber</span>
                <strong>${money(totalReceber)}</strong>
              </div>
              <div class="cli-fin-contas-kpi pagar">
                <span>A pagar</span>
                <strong>${money(totalPagar)}</strong>
              </div>
            </div>
            <div class="cli-fin-contas-body">
              <div class="cli-fin-contas-block">
                <h5>
                  Títulos a receber
                  <button type="button" data-cli-fin-sub="receber">Ver todos</button>
                </h5>
                ${receber.filter((t) => t.restante > 0).slice(0, 4).map(contasItem).join("") || `<div class="cli-empty-panel">Nada a receber</div>`}
              </div>
              <div class="cli-fin-contas-block">
                <h5>
                  Títulos a pagar
                  <button type="button" data-cli-fin-sub="pagar">Ver todos</button>
                </h5>
                ${pagar.filter((t) => t.restante > 0).slice(0, 4).map(contasItem).join("") || `<div class="cli-empty-panel">Nada a pagar</div>`}
              </div>
            </div>
          </section>
        </div>`;
    }

    function cliFinAuditPeriodLabel() {
      if (cliFinAudit.period === "30d") return "Últimos 30 dias";
      if (cliFinAudit.period === "custom") return "Personalizado";
      return "Julho/2026";
    }

    function ensureCliFinAuditHistory() {
      if (!Array.isArray(cliFinAudit.history)) cliFinAudit.history = [];
      if (cliFinAudit.historyMonth == null) cliFinAudit.historyMonth = "";
      if (cliFinAudit.historyId == null) cliFinAudit.historyId = cliFinAudit.history[0]?.id || "";
      return cliFinAudit;
    }

    function getCliFinAuditHistoryMonthOptions() {
      ensureCliFinAuditHistory();
      const map = new Map();
      cliFinAudit.history.forEach((h) => {
        if (h?.mes && !map.has(h.mes)) map.set(h.mes, h.label || h.mes);
      });
      return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
    }

    function getCliFinAuditHistoryFiltered() {
      ensureCliFinAuditHistory();
      const mes = cliFinAudit.historyMonth || "";
      return mes
        ? cliFinAudit.history.filter((h) => h.mes === mes)
        : cliFinAudit.history.slice();
    }

    function refreshCliFinAuditHistoryView() {
      const inFin = !!document.getElementById("financeiroWrap")?.classList.contains("show")
        && finDash.tab === "cartoes";
      if (inFin) renderFinModuleDash();
      else renderClientes();
    }

    function openCliFinAuditFromHistory(id) {
      ensureCliFinAuditHistory();
      const item = cliFinAudit.history.find((h) => h.id === id);
      if (!item) return;
      cliFinAudit.historyId = id;
      if (item.arquivo) cliFinAudit.fileName = item.arquivo;
      cliFinAudit.modalTab = "relatorio";
      openCliFinAuditModal();
      toast(`Laudo · ${item.label}`);
    }

    function upsertCliFinAuditHistoryOnImport() {
      ensureCliFinAuditHistory();
      const mes = String(cliFinAudit.dateFrom || "2026-07-01").slice(0, 7);
      const monthNames = {
        "01": "Janeiro", "02": "Fevereiro", "03": "Março", "04": "Abril",
        "05": "Maio", "06": "Junho", "07": "Julho", "08": "Agosto",
        "09": "Setembro", "10": "Outubro", "11": "Novembro", "12": "Dezembro",
      };
      const [y, m] = mes.split("-");
      const label = `${monthNames[m] || m}/${y}`;
      const arquivo = cliFinAudit.fileName || "planilha-vendas.xlsx";
      let row = cliFinAudit.history.find((h) => h.mes === mes);
      if (row) {
        row.arquivo = arquivo;
        row.label = label;
      } else {
        row = {
          id: `h${Date.now().toString(36)}`,
          mes,
          label,
          arquivo,
          status: "alerta",
          divergencias: 12,
          impacto: 320.4,
        };
        cliFinAudit.history.unshift(row);
      }
      cliFinAudit.historyId = row.id;
    }

    function renderCliFinAuditHistoryHtml() {
      ensureCliFinAuditHistory();
      const months = getCliFinAuditHistoryMonthOptions();
      const items = getCliFinAuditHistoryFiltered();
      const curMonth = cliFinAudit.historyMonth || "";
      return `
        <div class="fin-op-card cli-fin-audit-history">
          <div class="fin-card-head cli-fin-audit-history-head">
            <div>
              <h4>Histórico de auditorias</h4>
              <span class="chart-sub">Auditorias já processadas — filtre por mês e abra o laudo.</span>
            </div>
            <div class="proc-filter field">
              <select id="cliFinAuditHistoryMonth" data-no-ui="1" aria-label="Filtrar histórico por mês">
                <option value="" ${!curMonth ? "selected" : ""}>Todos os meses</option>
                ${months.map(([v, lab]) => `
                  <option value="${uiSelectEscape(v)}" ${curMonth === v ? "selected" : ""}>${uiSelectEscape(lab)}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="cli-fin-audit-history-list">
            ${items.length ? items.map((h) => `
              <button type="button" class="cli-fin-audit-history-item${cliFinAudit.historyId === h.id ? " is-current" : ""}" data-cli-fin-audit-history="${uiSelectEscape(h.id)}">
                <div class="cli-fin-audit-history-top">
                  <strong>${uiSelectEscape(h.label)}</strong>
                  <span class="fin-status-pill ${h.status === "ok" ? "conciliado" : "pendente"}">${h.status === "ok" ? "OK" : "Alerta"}</span>
                </div>
                <div class="cli-fin-audit-history-meta">${uiSelectEscape(h.arquivo || "—")} · ${h.divergencias} divergência${h.divergencias === 1 ? "" : "s"} · impacto ${money(h.impacto || 0)}</div>
              </button>`).join("") : `<div class="fin-table-empty">Nenhuma auditoria neste mês.</div>`}
          </div>
        </div>`;
    }

    function renderCliFinAuditoriaTab(c) {
      const nome = c.fantasia || c.nome;
      const custom = cliFinAudit.period === "custom";
      return `
        <div class="cli-fin-audit-base">
          <div class="cli-fin-audit-toolbar">
            <div class="cli-fin-audit-period-block">
              <span class="lbl">Período da auditoria</span>
              <div class="cli-fin-audit-period-row">
                <select class="dash-period-select" id="cliFinAuditPeriod" data-no-ui="1" aria-label="Período da auditoria">
                  <option value="mes" ${cliFinAudit.period === "mes" ? "selected" : ""}>Mês Atual</option>
                  <option value="30d" ${cliFinAudit.period === "30d" ? "selected" : ""}>Últimos 30 dias</option>
                  <option value="custom" ${custom ? "selected" : ""}>Personalizado</option>
                </select>
                <div class="dash-period-custom${custom ? " show" : ""}" id="cliFinAuditPeriodCustom">
                  <input type="date" id="cliFinAuditBaseDateFrom" value="${uiSelectEscape(cliFinAudit.dateFrom || "")}" aria-label="Data inicial" />
                  <span class="sep">até</span>
                  <input type="date" id="cliFinAuditBaseDateTo" value="${uiSelectEscape(cliFinAudit.dateTo || "")}" aria-label="Data final" />
                </div>
                <span class="cli-fin-audit-period-hint">Referência: <strong>${cliFinAuditPeriodLabel()}</strong></span>
              </div>
            </div>
            <div class="cli-fin-audit-toolbar-actions">
              <button type="button" class="btn-outline" data-cli-fin-audit="rules">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                Configuração de regras e adquirentes
              </button>
            </div>
          </div>
          <div class="cli-fin-audit-split">
            <div class="cli-fin-audit-upload-col">
              <div class="fin-upload-hub${finDash.cartoes.dragging ? " is-drag" : ""}" data-cli-fin-audit-drop data-fin-cartao-drop>
                <div class="hub-ico" aria-hidden="true">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                </div>
                <h3>Importe a Planilha de Vendas</h3>
                <p>Arraste e solte o arquivo da Stone/Cielo de <strong>${uiSelectEscape(nome)}</strong> ou selecione no computador para abrir a auditoria.</p>
                <button type="button" class="btn-primary" data-cli-fin-audit="import">Importar</button>
                <div class="hub-hint">Formatos aceitos no protótipo: .xlsx · .csv${cliFinAudit.fileName ? ` · última: ${uiSelectEscape(cliFinAudit.fileName)}` : ""}</div>
              </div>
            </div>
            <div class="cli-fin-audit-rules-col">
              ${renderFinAdquirentesListHtml()}
            </div>
          </div>
          ${renderCliFinAuditHistoryHtml()}
        </div>`;
    }

    function cliFinAuditPeriodRangeLabel() {
      const fmt = (iso) => {
        if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
        const [y, m, d] = iso.split("-");
        return `${d}/${m}/${y}`;
      };
      const de = fmt(cliFinAudit.dateFrom);
      const ate = fmt(cliFinAudit.dateTo);
      if (de && ate) return { de, ate, curto: `${de.slice(0, 5)} até ${ate.slice(0, 5)}` };
      return { de: "01/07/2026", ate: "31/07/2026", curto: "01/07 até 31/07" };
    }

    function getCliFinAuditExecutivo() {
      const a = getFinCartoesAudit();
      const efetivas = a.rows.filter((r) => !r.negada);
      const corretas = efetivas.filter((r) => Math.abs(r.diferenca) < 0.01);
      const divergentes = efetivas.filter((r) => Math.abs(r.diferenca) >= 0.01);
      const cobradoMais = +efetivas.filter((r) => r.diferenca > 0.01)
        .reduce((s, r) => s + r.diferenca, 0).toFixed(2);
      const cobradoMenos = +efetivas.filter((r) => r.diferenca < -0.01)
        .reduce((s, r) => s + Math.abs(r.diferenca), 0).toFixed(2);
      const impacto = +(cobradoMais - cobradoMenos).toFixed(2);
      const total = efetivas.length;
      const score = total ? +((corretas.length / total) * 100).toFixed(1) : 100;
      const conform = score;
      const divergPct = total ? +((divergentes.length / total) * 100).toFixed(2) : 0;
      const selo = score >= 98 ? "Excelente" : (score >= 95 ? "Atenção" : "Crítico");
      const seloCls = score >= 98 ? "ok" : (score >= 95 ? "warn" : "bad");
      const maiorRow = efetivas
        .filter((r) => r.diferenca > 0.01)
        .slice()
        .sort((x, y) => y.diferenca - x.diferenca)[0] || null;
      const ofensores = Object.values(a.byOfensor || {})
        .slice()
        .sort((x, y) => y.excesso - x.excesso);
      const topOfensor = ofensores[0] || null;
      const ofensorPct = topOfensor && cobradoMais > 0
        ? Math.round((topOfensor.excesso / cobradoMais) * 100)
        : 0;
      const diasCrit = (a.dias || [])
        .map((d) => ({ d, mais: a.byDia[d]?.mais || 0 }))
        .filter((x) => x.mais > 0)
        .sort((x, y) => y.mais - x.mais)
        .slice(0, 3)
        .map((x) => x.d);
      const periodo = cliFinAuditPeriodRangeLabel();
      const janela = diasCrit.length >= 2
        ? `${diasCrit[diasCrit.length - 1]} e ${diasCrit[0]}`
        : (diasCrit[0] || "o período analisado");
      const diagnostico = total === 0
        ? "Nenhuma transação efetiva no recorte atual. Ajuste o período ou a planilha importada para gerar o laudo."
        : `Foram auditadas ${total.toLocaleString("pt-BR")} transações referentes ao período de ${periodo.curto}. `
          + `Foram identificadas ${divergentes.length.toLocaleString("pt-BR")} divergências (${String(divergPct).replace(".", ",")}%). `
          + `O prejuízo líquido encontrado foi de ${money(impacto)}. `
          + (topOfensor
            ? `A maior concentração ocorreu em ${topOfensor.lab}, responsável por aproximadamente ${ofensorPct}% do valor divergente. `
            : "Não houve concentração relevante de ofensores. ")
          + `Recomendamos revisar especialmente as operações realizadas entre os dias ${janela}.`;
      return {
        a, total, corretas: corretas.length, divergentes: divergentes.length,
        score, conform, divergPct, selo, seloCls,
        cobradoMais, cobradoMenos, impacto,
        periodo, diagnostico, ofensorPct,
        ofensorNome: topOfensor?.lab || "—",
        janela,
        maior: maiorRow ? {
          valor: maiorRow.diferenca,
          label: `${maiorRow.bandeira} · ${maiorRow.parcelasLabel || maiorRow.tipoLanc}`,
          data: String(maiorRow.dataHora || "").split(" ")[0] || maiorRow.dia,
        } : null,
      };
    }

    let cliFinLaudoCharts = [];

    function destroyCliFinLaudoChart() {
      cliFinLaudoCharts.forEach((ch) => {
        try { ch.destroy(); } catch (_) {}
      });
      cliFinLaudoCharts = [];
    }

    function getCliFinAuditLaudoModel() {
      const c = CLIENTES.find((x) => x.id === cliPerfilId);
      const periodo = cliFinAuditPeriodRangeLabel();
      const ocorrencias = 3;
      const impacto = 12.98;
      const statusCls = ocorrencias === 0 ? "ok" : (impacto >= 50 || ocorrencias >= 8 ? "bad" : "warn");
      const status = statusCls === "ok"
        ? "Auditoria Concluída"
        : (statusCls === "warn" ? "Auditoria com Ressalvas" : "Divergências Críticas Encontradas");
      const demo = {
        status,
        statusCls,
        total: 12,
        corretas: 11,
        divergentes: 1,
        ocorrencias,
        volume: 8765.50,
        impacto,
        conform: 91.6,
        divergPct: 0.15,
        periodoLabel: "Julho/2026",
        periodoCurto: "10/07 e 12/07",
        resumoFrase:
          "Foram auditadas 12 transações entre 10/07 e 12/07. Identificamos 3 divergências financeiras, com impacto líquido de R$ 12,98. A maior parte do valor divergente concentra-se em operações Visa Crédito.",
        naoEfet: { valor: 980.0, qtd: 2, pct: 10.1 },
        ops: {
          maiorDiv: { titulo: "Visa Crédito", valor: 10.50, data: "11/07/2026", tom: "mais" },
          maiorInf: { titulo: "Master Débito", valor: -0.80, data: "12/07/2026", tom: "menos" },
          bandImpact: { titulo: "Visa", qtd: 2, valor: 11.36 },
          modImpact: { titulo: "Crédito", valor: 10.50 },
        },
        resumoBand: [
          { nome: "Visa", qtd: 2, valor: 11.36, tom: "bad", sub: "2 divergências" },
          { nome: "Mastercard", qtd: 1, valor: -0.80, tom: "ok", sub: "1 divergência" },
          { nome: "Pix", qtd: 0, valor: 0, tom: "ok", sub: "Nenhuma divergência", okLabel: true },
          { nome: "Outras bandeiras", qtd: 0, valor: 0, tom: "ok", sub: "100% conformes", okLabel: true },
        ],
        timeline: [
          { data: "10/07", titulo: "Encontrada divergência", valor: 0.86, bandeira: "Visa Débito", tom: "mais" },
          { data: "11/07", titulo: "Maior divergência", valor: 10.50, bandeira: "Visa Crédito", tom: "mais" },
          { data: "12/07", titulo: "Cobrança inferior", valor: -0.80, bandeira: "Master Débito", tom: "menos" },
        ],
        recomendacoes: [
          "Revisar o cadastro de taxas da bandeira Visa.",
          "Solicitar conferência da adquirente Stone para o dia 11/07.",
          "Validar parametrização de crédito parcelado nas regras ativas.",
          "Exportar laudo técnico para contestação junto à adquirente.",
        ],
        meta: {
          arquivo: "planilha-vendas.xlsx",
          registros: 12,
          realizada: "16/07/2026",
          processado: "16/07/2026 às 09:42",
          motor: "v2.4",
          tempo: "0,42 s",
        },
        /* Dados do Dashboard Analítico */
        cobradoMais: 11.36,
        cobradoMenos: 0.80,
        liquidoTotal: 8651.32,
        tarifaTotal: 214.18,
        alertas: [
          { tom: "critico", label: "Crítico", texto: "87% das divergências estão concentradas na bandeira Visa." },
          { tom: "alerta", label: "Alerta", texto: "Crédito parcelado concentra R$ 10,50 do impacto líquido." },
          { tom: "atencao", label: "Atenção", texto: "Stone lidera o ranking de divergências no período." },
        ],
        dias: [
          { dia: "10/07", volume: 2030, liquido: 2018.49, tarifa: 42.51, mais: 0.86, menos: 0 },
          { dia: "11/07", volume: 4175.5, liquido: 4097.01, tarifa: 114.49, mais: 10.50, menos: 0 },
          { dia: "12/07", volume: 2560, liquido: 2535.82, tarifa: 57.18, mais: 0, menos: 0.80 },
        ],
        paretoBand: [
          { nome: "Visa", valor: 11.36, qtd: 2, pct: 87.5 },
          { nome: "Mastercard", valor: 0.80, qtd: 1, pct: 6.2 },
          { nome: "Elo", valor: 0, qtd: 0, pct: 0 },
          { nome: "Pix", valor: 0, qtd: 0, pct: 0 },
        ],
        paretoMod: [
          { nome: "Crédito", valor: 10.50, qtd: 1, pct: 80.9 },
          { nome: "Débito", valor: 1.66, qtd: 2, pct: 12.8 },
          { nome: "Pix", valor: 0, qtd: 0, pct: 0 },
        ],
        paretoCombo: [
          { nome: "Visa Crédito", valor: 10.50, qtd: 1, pct: 80.9, rank: 1 },
          { nome: "Visa Débito", valor: 0.86, qtd: 1, pct: 6.6, rank: 2 },
          { nome: "Master Débito", valor: 0.80, qtd: 1, pct: 6.2, rank: 3 },
        ],
        taxas: [
          { bandeira: "Visa", prevista: 2.39, real: 2.89, diff: 0.50, tarifa: 98.39 },
          { bandeira: "Mastercard", prevista: 1.45, real: 1.20, diff: -0.25, tarifa: 51.90 },
          { bandeira: "Elo", prevista: 2.69, real: 2.69, diff: 0, tarifa: 36.09 },
          { bandeira: "Amex", prevista: 3.15, real: 3.15, diff: 0, tarifa: 23.94 },
          { bandeira: "Pix", prevista: 0.99, real: 0.99, diff: 0, tarifa: 2.72 },
        ],
        dist: {
          auditadas: 12,
          corretas: 9,
          mais: 2,
          menos: 1,
          pctOk: 75.0,
        },
        insights: [
          { tom: "critico", label: "Crítico", texto: "Todas as divergências relevantes concentraram-se em operações de crédito (Visa Crédito · R$ 10,50)." },
          { tom: "alerta", label: "Alerta", texto: "Visa responde por 2 das 3 ocorrências financeiras e ~87% do impacto líquido." },
          { tom: "atencao", label: "Atenção", texto: "Janela crítica entre 10/07 e 12/07 — revisar parametrização da taxa Visa Crédito." },
          { tom: "sucesso", label: "Sucesso", texto: "Pix e Elo permaneceram 100% conformes no período auditado." },
        ],
        top5: [
          { data: "11/07/2026", nsu: "51288419", bandeira: "Visa", modalidade: "Crédito", valor: 2100.0, diff: 10.50, status: "Alerta" },
          { data: "10/07/2026", nsu: "48129044", bandeira: "Visa", modalidade: "Débito", valor: 540.0, diff: 0.86, status: "Alerta" },
          { data: "12/07/2026", nsu: "52001188", bandeira: "Mastercard", modalidade: "Débito", valor: 320.0, diff: -0.80, status: "Alerta" },
        ],
        brutoBand: [
          { nome: "Visa", valor: 4045.0 },
          { nome: "Mastercard", valor: 2250.0 },
          { nome: "Elo", valor: 1435.5 },
          { nome: "Amex", valor: 760.0 },
          { nome: "Pix", valor: 275.0 },
        ],
        statusVendas: [
          { nome: "Aprovadas", valor: 9 },
          { nome: "Canceladas", valor: 1 },
          { nome: "Estornadas", valor: 2 },
        ],
        tipoLanc: [
          { nome: "Crédito à vista", valor: 1930.0, tarifa: 48.06 },
          { nome: "Crédito parcelado", valor: 5065.5, tarifa: 140.01 },
          { nome: "Débito", valor: 1495.0, tarifa: 23.39 },
          { nome: "Pix", valor: 275.0, tarifa: 2.72 },
        ],
        liquidoDia: [
          { dia: "10/07", valor: 2018.49, tarifa: 42.51 },
          { dia: "11/07", valor: 4097.01, tarifa: 114.49 },
          { dia: "12/07", valor: 2535.82, tarifa: 57.18 },
        ],
        adquirentes: [
          { nome: "Stone", valor: 4120.0, diverg: 11.36, qtd: 2 },
          { nome: "Cielo", valor: 2890.5, diverg: 0.80, qtd: 1 },
          { nome: "Rede", valor: 1755.0, diverg: 0.82, qtd: 1 },
        ],
        rankBandeiras: [
          { nome: "Visa", diverg: 11.36, qtd: 2, pct: 87.5 },
          { nome: "Mastercard", diverg: 0.80, qtd: 1, pct: 6.2 },
          { nome: "Elo", diverg: 0, qtd: 0, pct: 0 },
        ],
        rankRegras: [
          { nome: "Visa Crédito · 2,39%", qtd: 1, diverg: 10.50 },
          { nome: "Visa Débito · 1,39%", qtd: 1, diverg: 0.86 },
          { nome: "Master Débito · 1,45%", qtd: 1, diverg: 0.80 },
          { nome: "Elo Crédito · 2,69%", qtd: 0, diverg: 0 },
        ],
        tabela: [
          { data: "10/07/2026", nsu: "48129044", auth: "29044102", bandeira: "Visa", modalidade: "Débito", adquirente: "Rede", regra: "Visa Débito · 1,39%", justificativa: "Taxa aplicada acima do contrato", bruto: 540.0, prevPct: 1.39, realPct: 1.55, prev: 7.51, real: 8.37, diffPct: 0.16, diff: 0.86, status: "Alerta" },
          { data: "10/07/2026", nsu: "48129011", auth: "29011001", bandeira: "Mastercard", modalidade: "Crédito à vista", adquirente: "Stone", regra: "Master Crédito AV · 2,49%", justificativa: "Conforme regra contratual", bruto: 1280.0, prevPct: 2.49, realPct: 2.49, prev: 31.87, real: 31.87, diffPct: 0, diff: 0, status: "OK" },
          { data: "10/07/2026", nsu: "48129102", auth: "29102011", bandeira: "Elo", modalidade: "Débito", adquirente: "Cielo", regra: "Elo Débito · 1,49%", justificativa: "Conforme regra contratual", bruto: 210.0, prevPct: 1.49, realPct: 1.49, prev: 3.13, real: 3.13, diffPct: 0, diff: 0, status: "OK" },
          { data: "11/07/2026", nsu: "51288419", auth: "88419021", bandeira: "Visa", modalidade: "Crédito parcelado", adquirente: "Stone", regra: "Visa Crédito · 2,39%", justificativa: "Parametrização divergente na adquirente", bruto: 2100.0, prevPct: 2.39, realPct: 2.89, prev: 50.19, real: 60.69, diffPct: 0.50, diff: 10.50, status: "Alerta" },
          { data: "11/07/2026", nsu: "51288301", auth: "88301990", bandeira: "Elo", modalidade: "Crédito parcelado", adquirente: "Cielo", regra: "Elo Crédito · 2,69%", justificativa: "Conforme regra contratual", bruto: 890.5, prevPct: 2.69, realPct: 2.69, prev: 23.95, real: 23.95, diffPct: 0, diff: 0, status: "OK" },
          { data: "11/07/2026", nsu: "51288355", auth: "88355110", bandeira: "Amex", modalidade: "Crédito parcelado", adquirente: "Rede", regra: "Amex Crédito · 3,15%", justificativa: "Conforme regra contratual", bruto: 760.0, prevPct: 3.15, realPct: 3.15, prev: 23.94, real: 23.94, diffPct: 0, diff: 0, status: "OK" },
          { data: "11/07/2026", nsu: "51288480", auth: "88480122", bandeira: "Visa", modalidade: "Débito", adquirente: "Stone", regra: "Visa Débito · 1,39%", justificativa: "Conforme regra contratual", bruto: 425.0, prevPct: 1.39, realPct: 1.39, prev: 5.91, real: 5.91, diffPct: 0, diff: 0, status: "OK" },
          { data: "12/07/2026", nsu: "52001188", auth: "01188220", bandeira: "Mastercard", modalidade: "Débito", adquirente: "Cielo", regra: "Master Débito · 1,45%", justificativa: "Cobrança inferior à taxa contratada", bruto: 320.0, prevPct: 1.45, realPct: 1.20, prev: 4.64, real: 3.84, diffPct: -0.25, diff: -0.80, status: "Alerta" },
          { data: "12/07/2026", nsu: "52001102", auth: "01102550", bandeira: "Pix", modalidade: "Pix", adquirente: "Stone", regra: "Pix · 0,99%", justificativa: "Conforme regra contratual", bruto: 275.0, prevPct: 0.99, realPct: 0.99, prev: 2.72, real: 2.72, diffPct: 0, diff: 0, status: "OK" },
          { data: "12/07/2026", nsu: "52001240", auth: "01240110", bandeira: "Visa", modalidade: "Crédito parcelado", adquirente: "Rede", regra: "Visa Crédito · 2,39%", justificativa: "Conforme regra contratual", bruto: 980.0, prevPct: 2.39, realPct: 2.39, prev: 23.42, real: 23.42, diffPct: 0, diff: 0, status: "OK" },
          { data: "12/07/2026", nsu: "52001301", auth: "01301880", bandeira: "Mastercard", modalidade: "Crédito à vista", adquirente: "Stone", regra: "Master Crédito AV · 2,49%", justificativa: "Conforme regra contratual", bruto: 650.0, prevPct: 2.49, realPct: 2.49, prev: 16.19, real: 16.19, diffPct: 0, diff: 0, status: "OK" },
          { data: "12/07/2026", nsu: "52001388", auth: "01388990", bandeira: "Elo", modalidade: "Crédito parcelado", adquirente: "Cielo", regra: "Elo Crédito · 2,69%", justificativa: "Conforme regra contratual", bruto: 335.0, prevPct: 2.69, realPct: 2.69, prev: 9.01, real: 9.01, diffPct: 0, diff: 0, status: "OK" },
        ],
      };
      const diagnostico =
        "Foram auditadas 12 transações referentes ao período entre 10/07 e 12/07. "
        + "Identificamos duas cobranças acima da taxa contratada e uma cobrança abaixo. "
        + "O impacto líquido encontrado foi de R$ 12,98. "
        + "A maior divergência ocorreu em uma operação Visa Crédito no dia 11/07, representando aproximadamente 81% do valor divergente. "
        + "Recomendamos revisar especialmente as operações Visa Crédito realizadas nesse período.";
      const diagChips = [
        { tom: "bad", label: "Foco: Visa Crédito" },
        { tom: "warn", label: "Janela crítica: 10–12/07" },
        { tom: "brand", label: "Confiança do laudo: alta" },
      ];

      const q = normalizeSearchText(cliFinAudit.laudoQuery || "");
      const statusFiltro = cliFinAudit.laudoStatus || "";
      const bandeiraFiltro = cliFinAudit.laudoBandeira || "";
      let rows = demo.tabela.slice();
      if (q) {
        rows = rows.filter((r) => normalizeSearchText([
          r.data, r.nsu, r.auth, r.bandeira, r.modalidade, r.status,
          r.adquirente, r.regra, r.justificativa,
        ].join(" ")).includes(q));
      }
      if (statusFiltro) {
        rows = rows.filter((r) => r.status === statusFiltro);
      }
      if (bandeiraFiltro) {
        rows = rows.filter((r) => r.bandeira === bandeiraFiltro);
      }
      const sort = cliFinAudit.laudoSort || "diff-desc";
      rows.sort((a, b) => {
        if (sort === "diff-asc") return a.diff - b.diff;
        if (sort === "valor-desc") return b.bruto - a.bruto;
        if (sort === "data-asc") return String(a.data).localeCompare(String(b.data), "pt-BR");
        return b.diff - a.diff;
      });
      const pageSize = cliFinAudit.laudoPageSize || 8;
      const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
      const page = Math.min(Math.max(0, cliFinAudit.laudoPage || 0), totalPages - 1);
      cliFinAudit.laudoPage = page;
      const pageRows = rows.slice(page * pageSize, page * pageSize + pageSize);
      const bandeirasOpts = [...new Set(demo.tabela.map((r) => r.bandeira))];

      return {
        ...demo,
        cliente: c?.fantasia || c?.nome || "Cliente",
        periodo,
        diagnostico,
        diagChips,
        bandeirasOpts,
        meta: {
          ...demo.meta,
          arquivo: cliFinAudit.fileName || demo.meta.arquivo,
          registros: demo.tabela.length,
        },
        tableRows: pageRows,
        tableTotal: rows.length,
        tablePage: page,
        tablePages: totalPages,
        tableFrom: rows.length ? page * pageSize + 1 : 0,
        tableTo: Math.min(rows.length, (page + 1) * pageSize),
      };
    }

    function renderCliFinLaudoParetoRows(items) {
      const maxVal = Math.max(...(items || []).map((x) => x.valor || 0), 1);
      return `
        <div class="laudo-pareto-list">
          ${(items || []).map((it) => {
            const pctWidth = Math.max(0, Math.min(100, ((it.valor || 0) / maxVal) * 100));
            const meta = `${moneyShort(it.valor || 0)} · ${it.qtd || 0}x · ${String(it.pct || 0).replace(".", ",")}%`;
            return `
              <div class="laudo-pareto-row">
                <div class="name" title="${uiSelectEscape(it.nome)}">${uiSelectEscape(it.nome)}</div>
                <div class="track" aria-hidden="true"><i class="fill" style="width:${pctWidth}%"></i></div>
                <div class="meta${(it.valor || 0) <= 0 ? " zero" : ""}">${meta}</div>
              </div>`;
          }).join("")}
        </div>`;
    }

    function initCliFinAuditDashboardCharts(L) {
      destroyCliFinLaudoChart();
      if (typeof ApexCharts === "undefined" || !L) return;
      const base = {
        fontFamily: "DM Sans, sans-serif",
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: { enabled: true, speed: 450 },
      };
      const axisLabel = { style: { colors: "#6b7c93", fontSize: "11px", fontWeight: 500 } };
      const grid = { borderColor: "#d4dce8", strokeDashArray: 4 };
      const moneyY = {
        labels: {
          formatter: (v) => {
            const n = Math.abs(v || 0);
            if (n >= 1000) return `R$ ${(v / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}k`;
            return money(v || 0);
          },
          style: axisLabel.style,
        },
      };
      const mount = (sel, opts) => {
        const el = document.querySelector(sel);
        if (!el) return;
        const chart = new ApexCharts(el, opts);
        chart.render();
        cliFinLaudoCharts.push(chart);
      };

      const bruto = L.brutoBand || [];
      mount("#cliAuditChartBrutoBand", {
        chart: { ...base, type: "donut", height: 260 },
        series: bruto.map((x) => x.valor),
        labels: bruto.map((x) => x.nome),
        colors: ["#28519c", "#3a64b4", "#5a7fc4", "#7aa8d4", "#2f9e6b"],
        legend: { position: "bottom", fontSize: "11px", fontWeight: 600 },
        dataLabels: { enabled: false },
        plotOptions: { pie: { donut: { size: "68%" } } },
        tooltip: { y: { formatter: (v) => money(v) } },
      });

      const taxas = L.taxas || [];
      mount("#cliAuditChartTarifaBand", {
        chart: { ...base, type: "bar", height: 260 },
        series: [{ name: "Tarifa (R$)", data: taxas.map((t) => t.tarifa || 0) }],
        colors: ["#28519c"],
        plotOptions: { bar: { columnWidth: "52%", borderRadius: 4, borderRadiusApplication: "end" } },
        dataLabels: { enabled: false },
        grid,
        xaxis: { categories: taxas.map((t) => t.bandeira), labels: axisLabel, axisBorder: { show: false }, axisTicks: { show: false } },
        yaxis: moneyY,
        tooltip: { y: { formatter: (v) => money(v) } },
      });

      const tipos = L.tipoLanc || [];
      mount("#cliAuditChartBrutoTipo", {
        chart: { ...base, type: "bar", height: 260 },
        series: [{ name: "Valor bruto", data: tipos.map((t) => t.valor) }],
        colors: ["#28519c"],
        plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: "62%", borderRadiusApplication: "end" } },
        dataLabels: { enabled: false },
        grid,
        xaxis: { categories: tipos.map((t) => t.nome), labels: moneyY.labels },
        yaxis: { labels: axisLabel },
        tooltip: { y: { formatter: (v) => money(v) } },
      });

      mount("#cliAuditChartTarifaTipo", {
        chart: { ...base, type: "bar", height: 260 },
        series: [{ name: "Tarifa", data: tipos.map((t) => t.tarifa || 0) }],
        colors: ["#b33a4a"],
        plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: "62%", borderRadiusApplication: "end" } },
        dataLabels: { enabled: false },
        grid,
        xaxis: { categories: tipos.map((t) => t.nome), labels: moneyY.labels },
        yaxis: { labels: axisLabel },
        tooltip: { y: { formatter: (v) => money(v) } },
      });

      const status = L.statusVendas || [];
      mount("#cliAuditChartStatusVendas", {
        chart: { ...base, type: "donut", height: 260 },
        series: status.map((s) => s.valor),
        labels: status.map((s) => s.nome),
        colors: ["#2f9e6b", "#c9a227", "#b33a4a"],
        legend: { position: "bottom", fontSize: "11px", fontWeight: 600 },
        dataLabels: { enabled: false },
        plotOptions: { pie: { donut: { size: "68%" } } },
      });

      const dias = L.dias || L.liquidoDia || [];
      mount("#cliAuditChartTendencia", {
        chart: { ...base, type: "line", height: 280 },
        series: [
          { name: "Valor líquido", type: "area", data: dias.map((d) => d.liquido ?? d.valor) },
          { name: "Tarifa", type: "line", data: dias.map((d) => d.tarifa || 0) },
        ],
        colors: ["#28519c", "#b33a4a"],
        stroke: { curve: "smooth", width: [0, 3] },
        fill: {
          type: ["gradient", "solid"],
          gradient: { shadeIntensity: 1, opacityFrom: 0.32, opacityTo: 0.04, stops: [0, 90, 100] },
        },
        markers: { size: [0, 4], strokeWidth: 2, strokeColors: "#fff" },
        dataLabels: { enabled: false },
        grid,
        xaxis: {
          categories: dias.map((d) => d.dia),
          labels: axisLabel,
          axisBorder: { show: false },
          axisTicks: { show: false },
        },
        yaxis: [
          { seriesName: "Valor líquido", title: { text: "Líquido", style: { color: "#6b7c93", fontSize: "11px", fontWeight: 600 } }, ...moneyY },
          { opposite: true, seriesName: "Tarifa", title: { text: "Tarifa", style: { color: "#6b7c93", fontSize: "11px", fontWeight: 600 } }, ...moneyY },
        ],
        legend: { position: "top", horizontalAlign: "right", fontSize: "11px", fontWeight: 600 },
        tooltip: { shared: true, intersect: false, y: { formatter: (v) => money(v) } },
      });

      const acq = L.adquirentes || [];
      mount("#cliAuditChartRankAcq", {
        chart: { ...base, type: "bar", height: 260 },
        series: [{ name: "Divergência", data: acq.map((a) => a.diverg) }],
        colors: ["#b33a4a"],
        plotOptions: { bar: { borderRadius: 4, columnWidth: "48%", borderRadiusApplication: "end" } },
        dataLabels: { enabled: false },
        grid,
        xaxis: { categories: acq.map((a) => a.nome), labels: axisLabel, axisBorder: { show: false }, axisTicks: { show: false } },
        yaxis: moneyY,
        tooltip: { y: { formatter: (v) => money(v) } },
      });

      const bands = L.rankBandeiras || L.paretoBand || [];
      mount("#cliAuditChartRankBand", {
        chart: { ...base, type: "bar", height: 260 },
        series: [{ name: "Divergência", data: bands.map((b) => b.diverg ?? b.valor) }],
        colors: ["#28519c"],
        plotOptions: { bar: { borderRadius: 4, columnWidth: "48%", borderRadiusApplication: "end" } },
        dataLabels: { enabled: false },
        grid,
        xaxis: { categories: bands.map((b) => b.nome), labels: axisLabel, axisBorder: { show: false }, axisTicks: { show: false } },
        yaxis: moneyY,
        tooltip: { y: { formatter: (v) => money(v) } },
      });

      const regras = L.rankRegras || [];
      mount("#cliAuditChartRankRegras", {
        chart: { ...base, type: "bar", height: 260 },
        series: [{ name: "Ocorrências", data: regras.map((r) => r.qtd) }],
        colors: ["#c9a227"],
        plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: "58%", borderRadiusApplication: "end" } },
        dataLabels: { enabled: false },
        grid,
        xaxis: { categories: regras.map((r) => r.nome), labels: { style: axisLabel.style } },
        yaxis: { labels: axisLabel },
        tooltip: {
          y: {
            formatter: (v, { dataPointIndex }) => {
              const r = regras[dataPointIndex] || {};
              return `${v} · ${money(r.diverg || 0)}`;
            },
          },
        },
      });
    }

    function renderCliFinAuditAnaliticoHtml() {
      const L = getCliFinAuditLaudoModel();
      const chartCards = [
        { view: "chart-bruto-band", title: "Valor bruto por bandeira", sub: "Concentração do volume", id: "cliAuditChartBrutoBand", group: "dist" },
        { view: "chart-tarifa-band", title: "Tarifa por bandeira", sub: "Tarifa total cobrada", id: "cliAuditChartTarifaBand", group: "dist" },
        { view: "chart-bruto-tipo", title: "Valor bruto por tipo de lançamento", sub: "Crédito, débito e Pix", id: "cliAuditChartBrutoTipo", group: "ops" },
        { view: "chart-tarifa-tipo", title: "Tarifa por tipo de lançamento", sub: "Custo por modalidade", id: "cliAuditChartTarifaTipo", group: "ops" },
        { view: "chart-status-vendas", title: "Status das vendas", sub: "Aprovadas, canceladas e estornadas", id: "cliAuditChartStatusVendas", group: "ops" },
        { view: "chart-tendencia", title: "Valor líquido × tarifa por dia", sub: "Tendência temporal do período", id: "cliAuditChartTendencia", group: "trend", full: true },
        { view: "chart-rank-acq", title: "Ranking de adquirentes", sub: "Divergência por adquirente", id: "cliAuditChartRankAcq", group: "rank" },
        { view: "chart-rank-band", title: "Ranking de bandeiras", sub: "Divergência por bandeira", id: "cliAuditChartRankBand", group: "rank" },
        { view: "chart-rank-regras", title: "Ranking de regras", sub: "Regras com mais divergências", id: "cliAuditChartRankRegras", group: "rank" },
      ];
      const cardHtml = (c) => `
        <section class="laudo-card${c.full ? " is-full" : ""}" data-cli-fin-audit-view="${c.view}"${c.full ? ' style="grid-column:1/-1"' : ""}>
          <div class="laudo-chart-head">
            <div>
              <h4>${c.title}</h4>
              <p>${c.sub}</p>
            </div>
          </div>
          <div id="${c.id}" class="laudo-pareto-chart" style="min-height:${c.full ? "280" : "260"}px"></div>
        </section>`;
      return `
        <div class="cli-fin-audit-pane cli-laudo" data-cli-fin-audit-pane="dashboard">
          <div class="laudo-head">
            <div>
              <p class="kicker">Dashboard Analítico · Onde está o problema?</p>
              <h3>Investigação visual</h3>
            </div>
            <div class="laudo-head-meta">
              <span class="laudo-pill">Cliente · <strong>${uiSelectEscape(L.cliente)}</strong></span>
              <span class="laudo-pill">${uiSelectEscape(L.periodoLabel)}</span>
            </div>
          </div>

          <section data-cli-fin-audit-view="dash-alertas">
            <div class="laudo-insights" style="margin-bottom:8px">
              ${(L.alertas || []).map((a) => {
                const tomMap = { critico: "bad", alerta: "alerta", atencao: "warn", sucesso: "ok" };
                const labelMap = { critico: "Crítico", alerta: "Alerta", atencao: "Atenção", sucesso: "Sucesso" };
                const tom = tomMap[a.tom] || "warn";
                const label = a.label || labelMap[a.tom] || "Atenção";
                return `
                <article class="laudo-insight is-${tom}">
                  <span class="sev"><i aria-hidden="true"></i>${uiSelectEscape(label)}</span>
                  <p>${uiSelectEscape(a.texto)}</p>
                </article>`;
              }).join("")}
            </div>
          </section>

          <section data-cli-fin-audit-view="dash-kpis">
            <div class="laudo-sec-title">
              <h4>Indicadores investigativos</h4>
              <p>Volume, tarifas e desvios do recorte auditado.</p>
            </div>
            <div class="laudo-exec-kpis" style="grid-template-columns:repeat(3,minmax(0,1fr))">
              <article class="laudo-exec-kpi">
                <div class="kpi-top">
                  <span class="kpi-ico" aria-hidden="true"><i data-lucide="banknote"></i></span>
                  <p class="lab">Valor bruto</p>
                </div>
                <p class="val">${money(L.volume)}</p>
                <p class="sub"><b>${L.total}</b> transações</p>
              </article>
              <article class="laudo-exec-kpi is-green">
                <div class="kpi-top">
                  <span class="kpi-ico" aria-hidden="true"><i data-lucide="wallet"></i></span>
                  <p class="lab">Valor líquido</p>
                </div>
                <p class="val">${money(L.liquidoTotal)}</p>
                <p class="sub">Após tarifas aplicadas</p>
              </article>
              <article class="laudo-exec-kpi">
                <div class="kpi-top">
                  <span class="kpi-ico" aria-hidden="true"><i data-lucide="percent"></i></span>
                  <p class="lab">Tarifa total</p>
                </div>
                <p class="val">${money(L.tarifaTotal)}</p>
                <p class="sub">Custo das operações</p>
              </article>
              <article class="laudo-exec-kpi is-amber">
                <div class="kpi-top">
                  <span class="kpi-ico" aria-hidden="true"><i data-lucide="circle-off"></i></span>
                  <p class="lab">Não efetivadas</p>
                </div>
                <p class="val">${money(L.naoEfet.valor)}</p>
                <p class="sub"><b>${L.naoEfet.qtd}</b> · ${String(L.naoEfet.pct).replace(".", ",")}%</p>
              </article>
              <article class="laudo-exec-kpi is-red">
                <div class="kpi-top">
                  <span class="kpi-ico" aria-hidden="true"><i data-lucide="trending-up"></i></span>
                  <p class="lab">Tarifa cobrada a mais</p>
                </div>
                <p class="val bad">${money(L.cobradoMais)}</p>
                <p class="sub">Prejuízo potencial</p>
              </article>
              <article class="laudo-exec-kpi is-green">
                <div class="kpi-top">
                  <span class="kpi-ico" aria-hidden="true"><i data-lucide="trending-down"></i></span>
                  <p class="lab">Tarifa cobrada a menos</p>
                </div>
                <p class="val ok">−${money(L.cobradoMenos)}</p>
                <p class="sub">Benefício acidental</p>
              </article>
            </div>
          </section>

          <div class="laudo-sec-title">
            <h4>Distribuição</h4>
            <p>Concentração por bandeira.</p>
          </div>
          <div class="laudo-pareto-grid" style="grid-template-columns:repeat(2,minmax(0,1fr))">
            ${chartCards.filter((c) => c.group === "dist").map(cardHtml).join("")}
          </div>

          <div class="laudo-sec-title" style="margin-top:14px">
            <h4>Análise operacional</h4>
            <p>Tipo de lançamento e status das vendas.</p>
          </div>
          <div class="laudo-pareto-grid" style="grid-template-columns:repeat(3,minmax(0,1fr))">
            ${chartCards.filter((c) => c.group === "ops").map(cardHtml).join("")}
          </div>

          <div class="laudo-sec-title" style="margin-top:14px">
            <h4>Tendência</h4>
            <p>Fluxo diário de líquido e tarifa.</p>
          </div>
          <div class="laudo-pareto-grid" style="grid-template-columns:1fr">
            ${chartCards.filter((c) => c.group === "trend").map(cardHtml).join("")}
          </div>

          <div class="laudo-sec-title" style="margin-top:14px">
            <h4>Rankings</h4>
            <p>Onde a divergência se concentra.</p>
          </div>
          <div class="laudo-pareto-grid" style="grid-template-columns:repeat(3,minmax(0,1fr))">
            ${chartCards.filter((c) => c.group === "rank").map(cardHtml).join("")}
          </div>
        </div>`;
    }

    function syncCliFinLaudoIcons() {
      if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
        lucide.createIcons({ attrs: { "stroke-width": 2 } });
      }
    }

    function renderCliFinAuditDashboardHtml() {
      const L = getCliFinAuditLaudoModel();
      const statusIcon = L.statusCls === "ok"
        ? "check-circle-2"
        : (L.statusCls === "bad" ? "shield-alert" : "badge-alert");
      const checkSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
      const showRows = L.tableRows || [];
      return `
        <div class="cli-fin-audit-pane cli-laudo" data-cli-fin-audit-pane="relatorio">
          <div class="laudo-head">
            <div>
              <p class="kicker">Relatório Técnico · O que aconteceu?</p>
              <h3>Laudo da auditoria</h3>
            </div>
            <div class="laudo-head-meta">
              <span class="laudo-pill">Cliente · <strong>${uiSelectEscape(L.cliente)}</strong></span>
              <span class="laudo-pill">${uiSelectEscape(L.periodoLabel)}</span>
              <button type="button" class="laudo-export" data-cli-fin-audit="export-laudo">
                <i data-lucide="file-search"></i>
                Pré-visualizar laudo
              </button>
            </div>
          </div>

          <section class="laudo-diag" data-cli-fin-audit-view="resumo-tecnico">
            <div class="diag-ico" aria-hidden="true">
              <i data-lucide="sparkles"></i>
            </div>
            <div class="diag-body">
              <div class="diag-head">
                <h4>Resumo da auditoria</h4>
              </div>
              <p>Foram auditadas <b>${L.total.toLocaleString("pt-BR")} transações</b>, totalizando <b>${money(L.volume)}</b> entre <b>${uiSelectEscape(L.periodoCurto)}</b>. Foram identificadas <b>${L.ocorrencias} divergências financeiras</b>, com impacto líquido de <b>${money(L.impacto)}</b>. A maior parte do valor divergente concentra-se em operações <b>${uiSelectEscape(L.ops.maiorDiv.titulo)}</b>.</p>
            </div>
          </section>

          <section class="laudo-hero is-${L.statusCls}" data-cli-fin-audit-view="cabecalho">
            <div class="laudo-hero-main">
              <p class="hero-kicker">Cabeçalho da auditoria</p>
              <div class="hero-status-row">
                <span class="hero-status is-${L.statusCls}"><i data-lucide="${statusIcon}"></i>${uiSelectEscape(L.status)}</span>
              </div>
              <div class="hero-cert-stats">
                <div class="hero-cert-stat">
                  <p class="lab">Transações auditadas</p>
                  <p class="val">${L.total.toLocaleString("pt-BR")}</p>
                </div>
                <div class="hero-cert-stat">
                  <p class="lab">Divergências encontradas</p>
                  <p class="val is-bad">${L.ocorrencias.toLocaleString("pt-BR")}</p>
                </div>
              </div>
            </div>
            <div class="laudo-hero-side">
              <div class="hero-meta-row"><span>Arquivo</span><strong>${uiSelectEscape(L.meta.arquivo)}</strong></div>
              <div class="hero-meta-row"><span>Período</span><strong>${uiSelectEscape(L.periodo)}</strong></div>
              <div class="hero-meta-row"><span>Processado em</span><strong>${uiSelectEscape(L.meta.processado)}</strong></div>
              <div class="hero-meta-row"><span>Tempo</span><strong>${uiSelectEscape(L.meta.tempo)}</strong></div>
            </div>
          </section>

          <section data-cli-fin-audit-view="resumo-exec">
            <div class="laudo-sec-title">
              <h4>Resumo executivo</h4>
              <p>Volume, divergência, conformidade e não efetivadas.</p>
            </div>
            <div class="laudo-exec-kpis">
              <article class="laudo-exec-kpi">
                <div class="kpi-top">
                  <span class="kpi-ico" aria-hidden="true"><i data-lucide="banknote"></i></span>
                  <p class="lab">Volume auditado</p>
                </div>
                <p class="val">${money(L.volume)}</p>
                <p class="sub"><b>${L.total.toLocaleString("pt-BR")}</b> transações · ${uiSelectEscape(L.periodoLabel)}</p>
              </article>
              <article class="laudo-exec-kpi is-red">
                <div class="kpi-top">
                  <span class="kpi-ico" aria-hidden="true"><i data-lucide="alert-triangle"></i></span>
                  <p class="lab">Divergência financeira</p>
                </div>
                <p class="val">${money(L.impacto)}</p>
                <p class="sub"><b>${L.ocorrencias}</b> ocorrências · <b>${String(L.divergPct).replace(".", ",")}%</b></p>
              </article>
              <article class="laudo-exec-kpi is-green">
                <div class="kpi-top">
                  <span class="kpi-ico" aria-hidden="true"><i data-lucide="check-circle-2"></i></span>
                  <p class="lab">Índice de conformidade</p>
                </div>
                <p class="val">${String(L.conform).replace(".", ",")}%</p>
                <p class="sub"><b>${L.corretas}</b> corretas · <b>${L.divergentes}</b> divergente</p>
              </article>
              <article class="laudo-exec-kpi is-amber">
                <div class="kpi-top">
                  <span class="kpi-ico" aria-hidden="true"><i data-lucide="circle-off"></i></span>
                  <p class="lab">Valor não efetivado</p>
                </div>
                <p class="val">${money(L.naoEfet.valor)}</p>
                <p class="sub"><b>${L.naoEfet.qtd}</b> · ${String(L.naoEfet.pct).replace(".", ",")}%</p>
              </article>
            </div>
          </section>

          <section data-cli-fin-audit-view="insights-tecnicos">
            <div class="laudo-sec-title">
              <h4>Principais insights</h4>
              <p>Diagnóstico automático com indicadores de severidade.</p>
            </div>
            <div class="laudo-insights">
              ${(L.insights || []).map((it) => {
                const tom = typeof it === "string" ? "atencao" : (it.tom || "atencao");
                const texto = typeof it === "string" ? it : (it.texto || "");
                const tomMap = { critico: "bad", alerta: "alerta", atencao: "warn", sucesso: "ok" };
                const labelMap = { critico: "Crítico", alerta: "Alerta", atencao: "Atenção", sucesso: "Sucesso" };
                const sev = tomMap[tom] || "warn";
                const label = (typeof it === "object" && it.label) ? it.label : (labelMap[tom] || "Atenção");
                return `
                <article class="laudo-insight is-${sev}">
                  <span class="sev"><i aria-hidden="true"></i>${uiSelectEscape(label)}</span>
                  <p>${uiSelectEscape(texto)}</p>
                </article>`;
              }).join("")}
            </div>
          </section>

          <section class="laudo-table-card" data-cli-fin-audit-view="tabela-div">
            <div class="laudo-sec-title">
              <h4>Tabela de divergências</h4>
              <p>Evidências transacionais · busca, filtros e paginação.</p>
            </div>
            <div class="laudo-table-tools">
              <div class="proc-filter search">
                <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input type="search" id="cliLaudoTableSearch" placeholder="Buscar data, adquirente, bandeira…" value="${uiSelectEscape(cliFinAudit.laudoQuery || "")}" data-cli-fin-laudo="search" aria-label="Buscar divergências" />
              </div>
              <div class="proc-filter field">
                <select id="cliLaudoTableBandeira" data-cli-fin-laudo="bandeira" aria-label="Filtrar bandeira">
                  <option value="" ${!cliFinAudit.laudoBandeira ? "selected" : ""}>Bandeira · todas</option>
                  ${(L.bandeirasOpts || []).map((b) => `
                    <option value="${uiSelectEscape(b)}" ${cliFinAudit.laudoBandeira === b ? "selected" : ""}>${uiSelectEscape(b)}</option>`).join("")}
                </select>
              </div>
              <div class="proc-filter field">
                <select id="cliLaudoTableStatus" data-cli-fin-laudo="status" aria-label="Filtrar status">
                  <option value="" ${!cliFinAudit.laudoStatus ? "selected" : ""}>Status · todos</option>
                  <option value="Alerta" ${cliFinAudit.laudoStatus === "Alerta" ? "selected" : ""}>Alerta</option>
                  <option value="OK" ${cliFinAudit.laudoStatus === "OK" ? "selected" : ""}>OK</option>
                </select>
              </div>
              <div class="proc-filter field">
                <select id="cliLaudoTableSort" data-cli-fin-laudo="sort" aria-label="Ordenar">
                  <option value="diff-desc" ${cliFinAudit.laudoSort === "diff-desc" ? "selected" : ""}>Maior diferença</option>
                  <option value="diff-asc" ${cliFinAudit.laudoSort === "diff-asc" ? "selected" : ""}>Menor diferença</option>
                  <option value="valor-desc" ${cliFinAudit.laudoSort === "valor-desc" ? "selected" : ""}>Maior valor</option>
                  <option value="data-asc" ${cliFinAudit.laudoSort === "data-asc" ? "selected" : ""}>Data</option>
                </select>
              </div>
            </div>
            <div class="laudo-full-table-wrap">
              <table class="laudo-full-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Adquirente</th>
                    <th>Bandeira</th>
                    <th>Modalidade</th>
                    <th class="num">Valor da venda</th>
                    <th class="num">Taxa esperada</th>
                    <th class="num">Taxa aplicada</th>
                    <th class="num">Diferença</th>
                    <th>Motivo</th>
                  </tr>
                </thead>
                <tbody>
                  ${showRows.length ? showRows.map((r) => {
                    const isOk = r.status === "OK" || Math.abs(Number(r.diff) || 0) < 0.01;
                    const sealCls = isOk ? "ok" : "alerta";
                    const sealLabel = isOk ? "OK" : "Alerta";
                    const sealIco = isOk
                      ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`
                      : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>`;
                    return `
                    <tr>
                      <td><span class="seal ${sealCls}">${sealIco}${sealLabel}</span></td>
                      <td>${uiSelectEscape(r.data)}</td>
                      <td>${uiSelectEscape(r.adquirente || "—")}</td>
                      <td><strong>${uiSelectEscape(r.bandeira)}</strong></td>
                      <td>${uiSelectEscape(r.modalidade)}</td>
                      <td class="num">${money(r.bruto)}</td>
                      <td class="num">${String(r.prevPct).replace(".", ",")}%</td>
                      <td class="num">${String(r.realPct).replace(".", ",")}%</td>
                      <td class="num ${r.diff > 0.01 ? "diff-bad" : (r.diff < -0.01 ? "diff-ok" : "")}">${r.diff >= 0 ? "+" : "−"}${money(Math.abs(r.diff))}</td>
                      <td>${uiSelectEscape(r.justificativa || "—")}</td>
                    </tr>`;
                  }).join("") : `<tr><td colspan="10" style="text-align:center;color:var(--muted);padding:22px">Nenhuma divergência com os filtros atuais.</td></tr>`}
                </tbody>
              </table>
            </div>
            <div class="laudo-pager">
              <span>Exibindo ${L.tableFrom}–${L.tableTo} de ${L.tableTotal}</span>
              <div class="pager-acts">
                <button type="button" data-cli-fin-laudo="page-prev" ${L.tablePage <= 0 ? "disabled" : ""}>Anterior</button>
                <button type="button" data-cli-fin-laudo="page-next" ${L.tablePage >= L.tablePages - 1 ? "disabled" : ""}>Próxima</button>
              </div>
            </div>
          </section>

          <section class="laudo-card" data-cli-fin-audit-view="recomendacoes">
            <div class="laudo-sec-title">
              <h4>Recomendações automáticas</h4>
              <p>Ações sugeridas a partir do laudo.</p>
            </div>
            <div class="laudo-recom">
              ${L.recomendacoes.map((txt) => `
                <div class="laudo-recom-item">
                  <div class="chk" aria-hidden="true">${checkSvg}</div>
                  <p>${uiSelectEscape(txt)}</p>
                </div>`).join("")}
            </div>
          </section>
        </div>`;
    }

    function buildCliFinAuditLaudoPdfHtml(L) {
      const c = CLIENTES.find((x) => x.id === cliPerfilId);
      const cnpj = c?.cnpj || "—";
      const emitido = L.meta?.realizada || "16/07/2026";
      const divergRows = (L.tabela || [])
        .filter((r) => r.status === "Alerta" || Math.abs(r.diff || 0) > 0.01)
        .sort((a, b) => Math.abs(b.diff || 0) - Math.abs(a.diff || 0));
      const esc = uiSelectEscape;
      const pct = (n) => String(n).replace(".", ",");
      const diffCell = (n) => `${n >= 0 ? "+" : "−"}${money(Math.abs(n))}`;
      const statusCls = L.statusCls === "ok" ? "ok" : (L.statusCls === "bad" ? "bad" : "warn");
      const insightsHtml = (L.insights || []).map((it) => {
        const tom = typeof it === "string" ? "atencao" : (it.tom || "atencao");
        const texto = typeof it === "string" ? it : (it.texto || "");
        const labelMap = { critico: "Crítico", alerta: "Alerta", atencao: "Atenção", sucesso: "Sucesso" };
        const label = (typeof it === "object" && it.label) ? it.label : (labelMap[tom] || "Atenção");
        const cls = tom === "critico" ? "bad" : (tom === "sucesso" ? "ok" : (tom === "alerta" ? "alerta" : "warn"));
        return `<li class="${cls}"><strong>${esc(label)}</strong> — ${esc(texto)}</li>`;
      }).join("");
      const recomHtml = (L.recomendacoes || []).map((txt) => `<li>${esc(txt)}</li>`).join("");
      const rowsHtml = divergRows.length
        ? divergRows.map((r) => `
            <tr>
              <td>${esc(r.data)}</td>
              <td>${esc(r.nsu || "—")}</td>
              <td>${esc(r.adquirente || "—")}</td>
              <td><strong>${esc(r.bandeira)}</strong></td>
              <td>${esc(r.modalidade)}</td>
              <td class="num">${money(r.bruto)}</td>
              <td class="num">${pct(r.prevPct)}%</td>
              <td class="num">${pct(r.realPct)}%</td>
              <td class="num ${r.diff > 0.01 ? "bad" : (r.diff < -0.01 ? "ok" : "")}">${diffCell(r.diff)}</td>
              <td>${esc(r.justificativa || "—")}</td>
            </tr>`).join("")
        : `<tr><td colspan="10" class="empty">Nenhuma divergência no período.</td></tr>`;
      return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Laudo Técnico — Auditoria de Cartão — ${esc(L.cliente)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet"/>
<style>
  :root {
    --navy: #1c386e;
    --accent: #28519c;
    --muted: #6b7c93;
    --ok: #2f9e6b;
    --bad: #b33a4a;
    --warn: #c47f16;
    --bg: #e8edf4;
    --card: #ffffff;
    --surface-2: #f5f8fc;
    --border: #d4dce8;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "DM Sans", "Segoe UI", system-ui, sans-serif;
    background: #fff;
    color: var(--navy);
  }
  .sheet {
    max-width: 820px;
    margin: 0 auto;
    padding: 28px 24px 40px;
    background: var(--card);
  }
  .head {
    display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap;
    border-bottom: 2px solid var(--navy); padding-bottom: 14px; margin-bottom: 18px;
  }
  .brand { margin: 0; font-size: 1.15rem; font-weight: 800; letter-spacing: -.02em; }
  .brand-sub { margin: 2px 0 0; color: var(--muted); font-size: .8rem; }
  .meta { text-align: right; font-size: .8rem; color: var(--muted); }
  .meta strong { display: block; color: var(--navy); font-size: .95rem; margin-bottom: 4px; }
  .client {
    display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap;
    margin-bottom: 16px;
  }
  .client h1 { margin: 0 0 6px; font-size: 1.3rem; letter-spacing: -.02em; }
  .client p { margin: 0; color: var(--muted); font-size: .88rem; }
  .badge {
    display: inline-flex; flex-direction: column; justify-content: center; gap: 2px;
    min-width: 160px; padding: 8px 12px; border-radius: 8px;
    border: 1px solid var(--border); background: var(--surface-2); font-weight: 700; font-size: .88rem;
  }
  .badge .lab { font-size: .66rem; font-weight: 650; color: var(--muted); text-transform: uppercase; letter-spacing: .04em; }
  .badge.ok { color: #1f7a52; background: rgba(47,158,107,.1); border-color: rgba(47,158,107,.28); }
  .badge.warn { color: #9a5f0c; background: rgba(196,127,22,.12); border-color: rgba(196,127,22,.28); }
  .badge.bad { color: var(--bad); background: rgba(179,58,74,.1); border-color: rgba(179,58,74,.28); }
  .resumo {
    background: var(--bg); border: 1px solid var(--border); border-radius: 12px;
    padding: 14px 16px; margin-bottom: 16px;
  }
  .resumo h2, .sec h2 { margin: 0 0 8px; font-size: .98rem; }
  .resumo p { margin: 0; line-height: 1.55; font-size: .9rem; }
  .resumo p b { color: var(--navy); }
  .kpis {
    display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-bottom: 16px;
  }
  .kpi {
    background: var(--card); border: 1px solid var(--border); border-radius: 12px;
    padding: 12px 14px; border-left: 4px solid var(--accent);
  }
  .kpi.is-red { border-left-color: var(--bad); }
  .kpi.is-green { border-left-color: var(--ok); }
  .kpi.is-amber { border-left-color: var(--warn); }
  .kpi .lab { font-size: .7rem; color: var(--muted); font-weight: 650; }
  .kpi .val { font-size: 1.05rem; font-weight: 800; margin-top: 4px; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
  .kpi.is-red .val { color: #9a2f3c; }
  .kpi.is-green .val { color: #1a6b45; }
  .kpi.is-amber .val { color: #9a5f0c; }
  .kpi .sub { margin: 4px 0 0; font-size: .72rem; color: var(--muted); }
  .facts {
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 18px;
    margin-bottom: 16px; padding: 12px 14px; border: 1px solid var(--border); border-radius: 12px;
    font-size: .82rem;
  }
  .facts div { display: flex; justify-content: space-between; gap: 12px; border-bottom: 1px dashed var(--border); padding: 4px 0; }
  .facts div:nth-last-child(-n+2) { border-bottom: 0; }
  .facts span { color: var(--muted); }
  .facts strong { color: var(--navy); font-weight: 700; text-align: right; }
  .sec { margin-bottom: 16px; }
  .sec h2 { margin-bottom: 10px; }
  .insights { margin: 0; padding: 0; list-style: none; }
  .insights li {
    margin: 0 0 8px; padding: 10px 12px 10px 14px; border: 1px solid var(--border);
    border-radius: 8px; background: var(--surface-2); font-size: .84rem; line-height: 1.45;
    box-shadow: inset 3px 0 0 var(--warn);
  }
  .insights li.bad { box-shadow: inset 3px 0 0 var(--bad); }
  .insights li.alerta { box-shadow: inset 3px 0 0 var(--warn); }
  .insights li.warn { box-shadow: inset 3px 0 0 var(--warn); }
  .insights li.ok { box-shadow: inset 3px 0 0 var(--ok); }
  .insights li strong { display: inline; }
  .table-wrap { overflow-x: auto; border: 1px solid var(--border); border-radius: 12px; }
  table { width: 100%; border-collapse: collapse; font-size: .74rem; }
  th {
    text-align: left; font-size: .66rem; color: var(--muted); font-weight: 700;
    padding: 9px 8px; border-bottom: 1px solid var(--border); background: var(--surface-2);
    white-space: nowrap;
  }
  td { padding: 8px; border-bottom: 1px solid var(--border); vertical-align: top; }
  tr:last-child td { border-bottom: 0; }
  .num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
  td.bad { color: var(--bad); font-weight: 700; }
  td.ok { color: var(--ok); font-weight: 700; }
  td.empty { text-align: center; color: var(--muted); padding: 18px; }
  .recom { margin: 0; padding-left: 18px; }
  .recom li { margin: 6px 0; font-size: .86rem; line-height: 1.45; }
  .foot {
    margin-top: 18px; padding-top: 12px; border-top: 1px solid var(--border);
    font-size: .72rem; color: var(--muted); text-align: center; line-height: 1.5;
  }
  @media (max-width: 720px) {
    .kpis, .facts { grid-template-columns: 1fr 1fr; }
    .sheet { padding: 18px 16px 24px; }
  }
  @media print {
    body { background: #fff; }
    .sheet { max-width: none; padding: 12mm; }
    .kpi, .resumo, .facts, .insights li, .table-wrap { break-inside: avoid; }
  }
</style>
</head>
<body>
  <div class="sheet">
    <header class="head">
      <div>
        <p class="brand">Processo Ágil</p>
        <p class="brand-sub">Gestão contábil e fiscal · Auditoria de cartão</p>
      </div>
      <div class="meta">
        <strong>Laudo Técnico</strong>
        <span>Emissão: ${esc(emitido)}</span><br/>
        <span>Motor ${esc(L.meta?.motor || "v2.4")} · ${esc(L.meta?.tempo || "—")}</span>
      </div>
    </header>

    <div class="client">
      <div>
        <h1>${esc(L.cliente)}</h1>
        <p>CNPJ ${esc(cnpj)} · Período auditado: ${esc(L.periodoLabel)} (${esc(L.periodoCurto)})</p>
      </div>
      <span class="badge ${statusCls}"><span class="lab">Status da auditoria</span>${esc(L.status)}</span>
    </div>

    <section class="resumo">
      <h2>Resumo da auditoria</h2>
      <p>Foram auditadas <b>${L.total.toLocaleString("pt-BR")} transações</b>, totalizando <b>${money(L.volume)}</b> entre <b>${esc(L.periodoCurto)}</b>. Foram identificadas <b>${L.ocorrencias} divergências financeiras</b>, com impacto líquido de <b>${money(L.impacto)}</b>. A maior parte do valor divergente concentra-se em operações <b>${esc(L.ops?.maiorDiv?.titulo || "—")}</b>.</p>
    </section>

    <section class="kpis" aria-label="Indicadores">
      <article class="kpi">
        <div class="lab">Volume auditado</div>
        <div class="val">${money(L.volume)}</div>
        <p class="sub">${L.total.toLocaleString("pt-BR")} transações</p>
      </article>
      <article class="kpi is-red">
        <div class="lab">Divergência financeira</div>
        <div class="val">${money(L.impacto)}</div>
        <p class="sub">${L.ocorrencias} ocorrências · ${pct(L.divergPct)}%</p>
      </article>
      <article class="kpi is-green">
        <div class="lab">Índice de conformidade</div>
        <div class="val">${pct(L.conform)}%</div>
        <p class="sub">${L.corretas} corretas · ${L.divergentes} divergente</p>
      </article>
      <article class="kpi is-amber">
        <div class="lab">Valor não efetivado</div>
        <div class="val">${money(L.naoEfet?.valor || 0)}</div>
        <p class="sub">${L.naoEfet?.qtd || 0} · ${pct(L.naoEfet?.pct || 0)}%</p>
      </article>
    </section>

    <section class="facts" aria-label="Metadados">
      <div><span>Arquivo importado</span><strong>${esc(L.meta?.arquivo || "—")}</strong></div>
      <div><span>Registros processados</span><strong>${esc(String(L.meta?.registros ?? L.total))}</strong></div>
      <div><span>Processado em</span><strong>${esc(L.meta?.processado || "—")}</strong></div>
      <div><span>Período completo</span><strong>${esc(L.periodo || L.periodoLabel)}</strong></div>
    </section>

    <section class="sec">
      <h2>Principais insights</h2>
      <ul class="insights">${insightsHtml}</ul>
    </section>

    <section class="sec">
      <h2>Evidências · divergências encontradas (${divergRows.length})</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>NSU</th>
              <th>Adquirente</th>
              <th>Bandeira</th>
              <th>Modalidade</th>
              <th class="num">Valor</th>
              <th class="num">Tx esperada</th>
              <th class="num">Tx aplicada</th>
              <th class="num">Diferença</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    </section>

    <section class="sec">
      <h2>Recomendações</h2>
      <ol class="recom">${recomHtml}</ol>
    </section>

    <p class="foot">
      Documento gerado pelo Processo Ágil · Laudo técnico para contestação junto à adquirente
    </p>
  </div>
</body>
</html>`;
    }

    function openCliFinAuditLaudoPreview() {
      const L = getCliFinAuditLaudoModel();
      const html = buildCliFinAuditLaudoPdfHtml(L);
      if (cliFinAudit.lastLaudoUrl) {
        try { URL.revokeObjectURL(cliFinAudit.lastLaudoUrl); } catch (_) { /* ignore */ }
      }
      const blobUrl = URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }));
      cliFinAudit.lastLaudoUrl = blobUrl;
      cliFinAudit.laudoPreviewOpen = true;
      openModal({
        title: "Pré-visualização · Laudo Técnico",
        sub: `${L.cliente} · ${L.periodoLabel}`,
        wide: true,
        report: true,
        body: `<iframe id="cliFinLaudoDoc" class="cli-fin-laudo-frame" title="Laudo técnico de auditoria" src="${blobUrl}"></iframe>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Fechar</button>
          <button type="button" class="btn-ghost" data-cli-fin-audit="print-laudo">Imprimir</button>
          <button type="button" class="btn-primary" data-cli-fin-audit="export-laudo-html">Exportar HTML</button>`,
      });
    }

    function downloadCliFinAuditLaudoHtml() {
      const L = getCliFinAuditLaudoModel();
      const html = buildCliFinAuditLaudoPdfHtml(L);
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const blobUrl = URL.createObjectURL(blob);
      const slug = String(L.cliente || "cliente").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "cliente";
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `laudo-auditoria-cartao-${slug}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => {
        try { URL.revokeObjectURL(blobUrl); } catch (_) { /* ignore */ }
      }, 1500);
      toast("Laudo técnico HTML exportado");
    }

    function printCliFinAuditLaudo() {
      const html = buildCliFinAuditLaudoPdfHtml(getCliFinAuditLaudoModel());
      const w = window.open("", "_blank", "noopener,width=960,height=720");
      if (!w) {
        toast("Permita pop-ups para imprimir o laudo");
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

