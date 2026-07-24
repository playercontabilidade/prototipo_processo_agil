    function cfgIconEdit() {
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`;
    }
    function cfgIconTrash() {
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>`;
    }
    function cfgIconCopy() {
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
    }
    function cfgIconMore() {
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>`;
    }

    function getCfgMembersFor(item, tipo, funcionarios) {
      if (tipo === "departamento") return funcionarios.filter((f) => f.dept === item.nome);
      return funcionarios.filter((f) => f.cargo === item.nome);
    }

    function renderCfgEntityCard(item, tipo, funcionarios) {
      const badge = item.status === "Ativo" ? "sucesso" : "arquivado";
      const members = getCfgMembersFor(item, tipo, funcionarios);
      const open = cfgState.rhMembersOpen === item.id;
      const subLabel = (f) => (tipo === "departamento" ? f.cargo : f.dept);
      return `
        <article class="cfg-card${open ? " has-members-open" : ""}">
          <div class="cfg-card-top">
            <div>
              <strong>${item.nome}</strong>
              <p>${item.desc}</p>
            </div>
            <span class="proc-badge ${badge}">${item.status}</span>
          </div>
          <div class="cfg-card-foot">
            <div class="cfg-card-foot-row">
              <button type="button" class="cfg-members-btn" data-cfg-members="${item.id}" aria-expanded="${open}" aria-haspopup="true">
                <span>${members.length} funcionário${members.length === 1 ? "" : "s"} · ${tipo}</span>
                <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div class="cfg-card-actions">
                <button type="button" class="cfg-icon-btn tip-bottom" data-tip="Editar" data-cfg-act="edit-${tipo}" data-id="${item.id}" aria-label="Editar">${cfgIconEdit()}</button>
                <button type="button" class="cfg-icon-btn danger tip-bottom" data-tip="Excluir" data-cfg-act="del-${tipo}" data-id="${item.id}" aria-label="Excluir">${cfgIconTrash()}</button>
              </div>
            </div>
            <div class="cfg-members-menu" role="menu" aria-label="Colaboradores de ${item.nome}">
              ${members.length ? members.map((f) => `
                <div class="cfg-members-item" role="menuitem">
                  <span class="cfg-avatar">${f.initials}</span>
                  <span class="info">
                    <strong>${f.nome}</strong>
                    <span>${subLabel(f)} · ${f.email}</span>
                  </span>
                </div>`).join("") : `<div class="cfg-members-empty">Nenhum colaborador vinculado</div>`}
            </div>
          </div>
        </article>`;
    }

    function renderCfgRhPanel(data) {
      if (cfgState.rhScreen === "sessoes") return renderCfgSessoesPanel();
      const q = normalizeSearchText(cfgState.rhQuery);
      let deps = data.departamentos;
      let cargos = data.cargos;
      let funcs = data.funcionarios;
      if (q) {
        deps = deps.filter((d) => normalizeSearchText(`${d.nome} ${d.desc}`).includes(q));
        cargos = cargos.filter((c) => normalizeSearchText(`${c.nome} ${c.desc}`).includes(q));
        funcs = funcs.filter((f) => normalizeSearchText(`${f.nome} ${f.cargo} ${f.dept} ${f.email}`).includes(q));
      }
      const showDep = cfgState.rhView === "todos" || cfgState.rhView === "departamentos";
      const showCargo = cfgState.rhView === "todos" || cfgState.rhView === "cargos";
      const showFunc = cfgState.rhView === "funcionarios";
      const ativosDep = data.departamentos.filter((d) => d.status === "Ativo").length;
      const ativosCargo = data.cargos.filter((c) => c.status === "Ativo").length;
      return `
        <div class="cfg-toolbar">
          <button type="button" class="btn-ghost" data-cfg-act="dash-sessoes">Dashboard de sessões</button>
          <button type="button" class="btn-ghost" data-cfg-act="novo-dept">Novo departamento</button>
          <button type="button" class="btn-primary" data-cfg-act="novo-cargo">Novo cargo</button>
        </div>
        <div class="cfg-kpis">
          <div class="cfg-kpi"><span class="lab">Departamentos</span><strong>${data.departamentos.length}</strong><span class="meta">${ativosDep} ativos · ${data.departamentos.length - ativosDep} inativos</span></div>
          <div class="cfg-kpi"><span class="lab">Cargos</span><strong>${data.cargos.length}</strong><span class="meta">${ativosCargo} ativos · ${data.cargos.length - ativosCargo} inativos</span></div>
          <div class="cfg-kpi"><span class="lab">Funcionários</span><strong>${data.funcionarios.length}</strong><span class="meta">${data.funcionarios.length} ativos · 0 inativos</span></div>
        </div>
        <div class="cfg-toolbar">
          <div class="cfg-toggle" role="group" aria-label="Filtrar RH">
            ${[
              ["todos", "Todos"],
              ["departamentos", "Departamentos"],
              ["cargos", "Cargos"],
              ["funcionarios", "Funcionários"],
            ].map(([id, lab]) => `
              <button type="button" class="${cfgState.rhView === id ? "active" : ""}" data-cfg-rh-view="${id}">${lab}</button>
            `).join("")}
          </div>
          <span class="spacer"></span>
          <div class="proc-filter search">
            <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="search" id="cfgRhSearch" placeholder="Buscar departamento, cargo ou funcionário" value="${(cfgState.rhQuery || "").replace(/"/g, "&quot;")}" aria-label="Buscar RH" />
          </div>
        </div>
        ${showFunc ? `
          <div class="cfg-table-wrap">
            <table class="cfg-table">
              <thead>
                <tr><th>Funcionário</th><th>Cargo</th><th>Departamento</th><th>E-mail</th><th></th></tr>
              </thead>
              <tbody>
                ${funcs.length ? funcs.map((f) => `
                  <tr>
                    <td>
                      <div class="cfg-person">
                        <span class="cfg-avatar">${f.initials}</span>
                        <strong style="font-size:.8rem;color:var(--navy-deep)">${f.nome}</strong>
                      </div>
                    </td>
                    <td>${f.cargo}</td>
                    <td>${f.dept}</td>
                    <td>${f.email}</td>
                    <td style="text-align:right">
                      <button type="button" class="cfg-icon-btn tip-bottom" data-tip="Ações" data-cfg-act="func-menu" data-id="${f.id}" aria-label="Menu">${cfgIconMore()}</button>
                    </td>
                  </tr>`).join("") : `<tr><td colspan="5" style="text-align:center;color:var(--muted)">Nenhum funcionário encontrado</td></tr>`}
              </tbody>
            </table>
          </div>` : `
          <div class="cfg-grid-2">
            ${showDep ? deps.map((d) => renderCfgEntityCard(d, "departamento", data.funcionarios)).join("") : ""}
            ${showCargo ? cargos.map((c) => renderCfgEntityCard(c, "cargo", data.funcionarios)).join("") : ""}
            ${!deps.length && !cargos.length && (showDep || showCargo) ? `<div class="cfg-empty" style="grid-column:1/-1">Nenhum item correspondente</div>` : ""}
          </div>`}`;
    }

    function renderCfgProcessosPanel(data) {
      return `
        <div class="cfg-toolbar">
          <button type="button" class="btn-primary" data-cfg-act="novo-molde">Novo Processo Molde</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${data.moldes.map((m) => {
            const etapas = Array.isArray(m.etapas) ? m.etapas.length : 0;
            return `
            <article class="cfg-molde">
              <button type="button" class="cfg-molde-head" data-cfg-molde-open="${m.id}">
                <div>
                  <strong>${m.titulo}</strong>
                  <span>${m.desc}${etapas ? ` · ${etapas} etapa(s)` : ""}</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </article>`;
          }).join("")}
        </div>`;
    }

    function renderCfgObrigacoesPanel(data) {
      const f = cfgState.obrFiltros;
      let list = data.obrigacoes;
      if (f.tipo) list = list.filter((o) => o.tipo === f.tipo);
      if (f.competencia) list = list.filter((o) => o.competencia === f.competencia);
      if (f.reenvio) list = list.filter((o) => o.reenvio === f.reenvio);
      return `
        <div class="cfg-toolbar">
          <button type="button" class="btn-primary" data-cfg-act="add-obr">Adicionar obrigação</button>
          <button type="button" class="btn-ghost" data-cfg-act="grupos-obr">Grupos</button>
          <button type="button" class="btn-ghost" data-cfg-act="regras-obr">Regras</button>
          <span class="spacer"></span>
          <div class="proc-filter search">
            <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="search" id="cfgObrSearch" placeholder="Buscar obrigação" aria-label="Buscar obrigação" />
          </div>
          <button type="button" class="cfg-icon-btn tip-bottom" data-tip="Filtros avançados" data-cfg-act="obr-filtros" aria-label="Filtros">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          </button>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px" id="cfgObrList">
          ${list.length ? list.map((o) => `
            <article class="cfg-obr-card" data-obr-nome="${o.titulo}">
              <div>
                <strong>${o.titulo}</strong>
                <div class="meta">Tipo: ${o.tipo}</div>
              </div>
              <div class="cfg-obr-meta">
                <span><i>Competência</i> · ${o.competencia}</span>
                <span><i>Reenvio</i> · ${o.reenvio}</span>
              </div>
              <div class="cfg-card-actions">
                <button type="button" class="cfg-icon-btn tip-bottom" data-tip="Duplicar" data-cfg-act="obr-dup" data-id="${o.id}">${cfgIconCopy()}</button>
                <button type="button" class="cfg-icon-btn tip-bottom" data-tip="Editar" data-cfg-act="obr-edit" data-id="${o.id}">${cfgIconEdit()}</button>
                <button type="button" class="cfg-icon-btn danger tip-bottom" data-tip="Excluir" data-cfg-act="obr-del" data-id="${o.id}">${cfgIconTrash()}</button>
              </div>
            </article>`).join("") : `<div class="cfg-empty">Nenhuma obrigação para os filtros atuais</div>`}
        </div>`;
    }

    function renderCfgDocumentosPanel() {
      const subs = [
        ["robos", "Robôs"],
        ["classificador", "Classificador"],
        ["pastas", "Pastas"],
        ["tipos", "Tipos de documentos"],
      ];
      let body = "";
      if (cfgState.docSub === "robos") {
        body = `
          <div class="cfg-toolbar">
            <button type="button" class="btn-ghost" data-cfg-act="robos-atualizar">Atualizar</button>
            <button type="button" class="btn-primary" data-cfg-act="robos-cfg">Gerar .cfg</button>
          </div>
          <div class="cfg-error-banner" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            <div>
              <strong>Falha ao carregar painel do robô</strong>
              <span>API /robos/painel retornou 503 — Connection refused no host automation-worker:8090. Verifique o serviço e tente atualizar novamente.</span>
            </div>
          </div>`;
      } else if (cfgState.docSub === "classificador") {
        body = `
          <div class="cfg-toolbar">
            <button type="button" class="btn-primary" data-cfg-act="doc-add-regra">Nova regra</button>
          </div>`;
      } else if (cfgState.docSub === "pastas") {
        const pastas = ensureCfgStore().pastasDoc;
        body = `
          <div class="cfg-pastas-head">
            <div>
              <h3>Pastas</h3>
              <p>Gerencia as seções usadas para organizar os documentos no sistema.</p>
            </div>
            <button type="button" class="btn-primary" data-cfg-act="doc-add-pasta">+ Nova Pasta</button>
          </div>
          <div class="cfg-pasta-list">
            ${pastas.map((p, i) => `
              <article class="cfg-pasta-card">
                <div>
                  <h4 class="title">${i + 1}. ${p.titulo}${p.destaque ? ` <span class="star" title="Destaque">★</span>` : ""}</h4>
                  <p class="desc">${p.desc || "Sem descrição"}</p>
                </div>
                <div class="cfg-card-actions">
                  <button type="button" class="cfg-icon-btn tip-bottom" data-tip="Editar" data-cfg-act="doc-edit-pasta" data-id="${p.id}" aria-label="Editar">${cfgIconEdit()}</button>
                  <button type="button" class="cfg-icon-btn danger tip-bottom" data-tip="Excluir" data-cfg-act="doc-del-pasta" data-id="${p.id}" aria-label="Excluir">${cfgIconTrash()}</button>
                </div>
              </article>`).join("")}
          </div>`;
      } else {
        const tipos = ensureCfgStore().tiposDoc;
        body = `
          <div class="cfg-tipos-head">
            <div>
              <h3>Tipos de documentos</h3>
              <p>Gerencie a taxonomia e as permissões de acesso aos documentos do sistema.</p>
            </div>
            <button type="button" class="btn-primary" data-cfg-act="doc-add-tipo">Novo Tipo de Documento</button>
          </div>
          <div class="cfg-pasta-list">
            ${tipos.length ? tipos.map((t, i) => `
              <article class="cfg-tipo-card">
                <h4 class="title">${i + 1}. ${getCfgTipoDocName(t)}</h4>
                <div class="cfg-card-actions">
                  <button type="button" class="cfg-icon-btn tip-bottom" data-tip="Editar" data-cfg-act="doc-edit-tipo" data-id="${t.id || i}" aria-label="Editar">${cfgIconEdit()}</button>
                  <button type="button" class="cfg-icon-btn danger tip-bottom" data-tip="Excluir" data-cfg-act="doc-del-tipo" data-id="${t.id || i}" aria-label="Excluir">${cfgIconTrash()}</button>
                </div>
              </article>`).join("") : `<div class="cfg-empty">Nenhum tipo de documento cadastrado</div>`}
          </div>`;
      }
      return `
        <div class="cfg-subtabs" role="tablist" aria-label="Submódulo Documentos">
          ${subs.map(([id, lab]) => `
            <button type="button" class="${cfgState.docSub === id ? "active" : ""}" data-cfg-doc-sub="${id}">${lab}</button>
          `).join("")}
        </div>
        ${body}`;
    }

    function renderCfgComunicacoesPanel() {
      const avisos = ensureCfgStore().avisos;
      return `
        <div class="cfg-toolbar">
          <button type="button" class="btn-primary" data-cfg-act="novo-aviso">Novo aviso</button>
          <button type="button" class="btn-ghost" data-cfg-act="edit-email-tpl">Editar template de e-mail</button>
        </div>
        ${avisos.length ? `
          <div style="display:flex;flex-direction:column;gap:8px">
            ${avisos.map((a) => `
              <article class="cfg-obr-card">
                <div>
                  <strong>${a.titulo}</strong>
                  <div class="meta">${a.publico || "Todos"} · ${a.quando}${a.capa ? ` · Capa: ${a.capa}` : ""}</div>
                </div>
                <div class="cfg-obr-meta"><span>${a.msg}</span></div>
              </article>`).join("")}
          </div>` : `<div class="cfg-empty">Nenhum aviso cadastrado</div>`}`;
    }

    function renderCfgChatPanel() {
      const c = cfgState.chat;
      return `
        <form class="cfg-form" id="cfgChatForm">
          <label>
            Tenant da organização *
            <input type="text" id="cfgChatTenant" required value="${(c.tenant || "processo-agil").replace(/"/g, "&quot;")}" placeholder="tenant-da-organizacao" />
          </label>
          <label>
            Segredo (Base64)
            <input type="password" id="cfgChatSecret" value="" placeholder="${c.hasSecret ? "••••••••••••" : "Informe o segredo"}" autocomplete="off" />
            ${c.hasSecret ? `<span class="cfg-hint">Já existe um segredo configurado. Preencha apenas para substituir.</span>` : ""}
          </label>
          <div class="cfg-switch">
            <span class="lab">Integração ativa</span>
            <input type="checkbox" id="cfgChatAtivo" ${c.ativo ? "checked" : ""} aria-label="Integração ativa" />
          </div>
          <div style="display:flex;justify-content:flex-end">
            <button type="submit" class="btn-primary">Salvar configuração</button>
          </div>
        </form>`;
    }

    function renderCfgLogsPanel(data) {
      const f = cfgState.logs;
      let logs = data.logs;
      if (f.apenasErros) logs = logs.filter((l) => l.status >= 400);
      if (f.metodo) logs = logs.filter((l) => l.metodo === f.metodo);
      if (f.endpoint) {
        const q = normalizeSearchText(f.endpoint);
        logs = logs.filter((l) => normalizeSearchText(l.endpoint).includes(q));
      }
      return `
        <div class="cfg-filters">
          <label style="grid-column:1 / -1">Período
            ${renderCfgDateRangeHtml({
              iniId: "cfgLogIni",
              fimId: "cfgLogFim",
              iniIso: f.dataIni,
              fimIso: f.dataFim,
              block: true,
            })}
          </label>
          <label>Endpoint<input type="text" id="cfgLogEndpoint" value="${(f.endpoint || "").replace(/"/g, "&quot;")}" placeholder="/api/..." /></label>
          <label class="cfg-check"><input type="checkbox" id="cfgLogErros" ${f.apenasErros ? "checked" : ""} /> Apenas erros</label>
          <div class="cfg-filters-extra" ${cfgState.logsShowExtra ? "" : "hidden"} style="display:contents">
            <label>Método
              <select id="cfgLogMetodo">
                <option value="">Todos</option>
                ${["GET", "POST", "PUT", "DELETE"].map((m) => `<option value="${m}" ${f.metodo === m ? "selected" : ""}>${m}</option>`).join("")}
              </select>
            </label>
            <label>Usuário<input type="text" id="cfgLogUser" value="${(f.usuario || "").replace(/"/g, "&quot;")}" placeholder="e-mail" /></label>
            <label>Operação<input type="text" id="cfgLogOp" value="${(f.operacao || "").replace(/"/g, "&quot;")}" placeholder="operação" /></label>
            <label>IP Cliente<input type="text" id="cfgLogIp" value="${(f.ip || "").replace(/"/g, "&quot;")}" placeholder="0.0.0.0" /></label>
            <label>Status Code<input type="text" id="cfgLogStatus" value="${(f.status || "").replace(/"/g, "&quot;")}" placeholder="200" /></label>
          </div>
        </div>
        <div class="cfg-toolbar">
          <button type="button" class="btn-ghost" data-cfg-act="logs-toggle-filtros">${cfgState.logsShowExtra ? "Ocultar filtros" : "Mostrar filtros"}</button>
          <button type="button" class="btn-ghost" data-cfg-act="logs-limpar">Limpar</button>
          <button type="button" class="btn-primary" data-cfg-act="logs-filtrar">Filtrar</button>
          <button type="button" class="cfg-icon-btn tip-bottom" data-tip="Recarregar" data-cfg-act="logs-reload" aria-label="Recarregar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-14.3-7.2L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 14.3 7.2L21 16"/><path d="M16 21h5v-5"/></svg>
          </button>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${logs.length ? logs.map((l) => `
            <article class="cfg-log${cfgState.logOpen[l.id] ? " open" : ""}">
              <button type="button" class="cfg-log-head" data-cfg-log="${l.id}">
                <span class="cfg-method ${l.metodo.toLowerCase()}">${l.metodo}</span>
                <span class="ep">${l.endpoint}</span>
                <span class="hide-sm">${l.quando}</span>
                <span class="hide-sm">${l.usuario}</span>
                <span class="hide-sm">${l.ip}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="${cfgState.logOpen[l.id] ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6"}"/></svg>
              </button>
              <div class="cfg-log-body">
                <pre>${l.payload.replace(/</g, "&lt;")}</pre>
              </div>
            </article>`).join("") : `<div class="cfg-empty">Nenhum log encontrado para os filtros</div>`}
        </div>`;
    }

    function renderConfigura() {
      emptyState.classList.add("hide");
      fakeList.classList.add("show");
      const data = getCfgMock();
      const tabs = [
        ["rh", "Recursos Humanos"],
        ["processos", "Processos"],
        ["obrigacoes", "Obrigações"],
        ["documentos", "Documentos"],
        ["comunicacoes", "Comunicações"],
        ["chat", "Chat"],
        ["logs", "Log de Acessos"],
      ];
      let panel = "";
      if (cfgState.tab === "rh") panel = renderCfgRhPanel(data);
      else if (cfgState.tab === "processos") panel = renderCfgProcessosPanel(data);
      else if (cfgState.tab === "obrigacoes") panel = renderCfgObrigacoesPanel(data);
      else if (cfgState.tab === "documentos") panel = renderCfgDocumentosPanel();
      else if (cfgState.tab === "comunicacoes") panel = renderCfgComunicacoesPanel();
      else if (cfgState.tab === "chat") panel = renderCfgChatPanel();
      else if (cfgState.tab === "logs") panel = renderCfgLogsPanel(data);

      fakeList.innerHTML = `
        <div class="cfg-shell">
          <nav class="cfg-tabs" role="tablist" aria-label="Configuração">
            ${tabs.map(([id, lab]) => `
              <button type="button" role="tab" class="${cfgState.tab === id ? "active" : ""}" data-cfg-tab="${id}" aria-selected="${cfgState.tab === id}">${lab}</button>
            `).join("")}
          </nav>
          <div class="cfg-panel" role="tabpanel">
            ${panel}
          </div>
        </div>`;
      bindConfiguraEvents();
      bindCfgDateInputs(fakeList);
      enhanceUiSelects(fakeList);
    }

    function bindConfiguraEvents() {
      fakeList.querySelectorAll("[data-cfg-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          cfgState.tab = btn.dataset.cfgTab || "rh";
          cfgState.rhMembersOpen = null;
          if (btn.dataset.cfgTab !== "rh") cfgState.rhScreen = "lista";
          renderConfigura();
        });
      });
      fakeList.querySelectorAll("[data-cfg-rh-view]").forEach((btn) => {
        btn.addEventListener("click", () => {
          cfgState.rhView = btn.dataset.cfgRhView || "todos";
          cfgState.rhMembersOpen = null;
          renderConfigura();
        });
      });
      const rhSearch = document.getElementById("cfgRhSearch");
      rhSearch?.addEventListener("input", () => {
        cfgState.rhQuery = rhSearch.value || "";
        const pos = rhSearch.selectionStart;
        renderConfigura();
        const again = document.getElementById("cfgRhSearch");
        if (again) {
          again.focus();
          try { again.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
      });
      fakeList.querySelectorAll("[data-cfg-members]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const id = btn.dataset.cfgMembers;
          cfgState.rhMembersOpen = cfgState.rhMembersOpen === id ? null : id;
          renderConfigura();
        });
      });
      fakeList.querySelectorAll("[data-cfg-sess-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          cfgState.sessTab = btn.dataset.cfgSessTab || "recentes";
          renderConfigura();
        });
      });
      fakeList.querySelectorAll("[data-cfg-molde-open]").forEach((btn) => {
        btn.addEventListener("click", () => {
          openCfgMoldeDetalheModal(btn.dataset.cfgMoldeOpen);
        });
      });
      fakeList.querySelectorAll("[data-cfg-doc-sub]").forEach((btn) => {
        btn.addEventListener("click", () => {
          cfgState.docSub = btn.dataset.cfgDocSub || "robos";
          renderConfigura();
        });
      });
      fakeList.querySelectorAll("[data-cfg-log]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.cfgLog;
          cfgState.logOpen[id] = !cfgState.logOpen[id];
          renderConfigura();
        });
      });
      const obrSearch = document.getElementById("cfgObrSearch");
      obrSearch?.addEventListener("input", () => {
        const q = normalizeSearchText(obrSearch.value);
        fakeList.querySelectorAll(".cfg-obr-card").forEach((card) => {
          const nome = normalizeSearchText(card.dataset.obrNome || "");
          card.hidden = !!(q && !nome.includes(q));
        });
      });
      document.getElementById("cfgChatForm")?.addEventListener("submit", (e) => {
        e.preventDefault();
        cfgState.chat.tenant = document.getElementById("cfgChatTenant")?.value || "";
        const secret = document.getElementById("cfgChatSecret")?.value || "";
        if (secret) {
          cfgState.chat.hasSecret = true;
          cfgState.chat.secret = secret;
        }
        cfgState.chat.ativo = !!document.getElementById("cfgChatAtivo")?.checked;
        toast("Configuração do Chat salva");
        renderConfigura();
      });
      fakeList.querySelectorAll("[data-cfg-act]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const act = btn.dataset.cfgAct;
          const id = btn.dataset.id;
          const store = ensureCfgStore();

          if (act === "dash-sessoes") { cfgState.rhScreen = "sessoes"; renderConfigura(); return; }
          if (act === "voltar-rh") { cfgState.rhScreen = "lista"; renderConfigura(); return; }
          if (act === "novo-dept") { openCfgNovoDepartamentoModal(); return; }
          if (act === "novo-cargo") { openCfgNovoCargoModal(); return; }
          if (act === "novo-molde") { openCfgNovoMoldeModal(); return; }

          if (act === "edit-departamento" || act === "edit-cargo") {
            openCfgEditEntityModal(act === "edit-departamento" ? "departamento" : "cargo", id);
            return;
          }
          if (act === "del-departamento" || act === "del-cargo") {
            const tipo = act === "del-departamento" ? "departamento" : "cargo";
            const list = tipo === "departamento" ? store.departamentos : store.cargos;
            const item = list.find((x) => x.id === id);
            openCfgConfirmModal({
              title: tipo === "departamento" ? "Excluir departamento" : "Excluir cargo",
              message: `Confirma a exclusão de <strong>${item?.nome || "item"}</strong>?`,
              confirmLabel: "Excluir",
              danger: true,
              onConfirm: () => {
                const idx = list.findIndex((x) => x.id === id);
                if (idx >= 0) list.splice(idx, 1);
                toast(tipo === "departamento" ? "Departamento excluído" : "Cargo excluído");
                renderConfigura();
              },
            });
            return;
          }
          if (act === "func-menu") { openCfgFuncMenuModal(id); return; }

          if (act === "molde-tags") { openCfgMoldeTagsModal(id); return; }
          if (act === "molde-dept") { openCfgMoldeDeptModal(id); return; }
          if (act === "molde-rec") { openCfgMoldeRecModal(id); return; }
          if (act === "molde-inst") { openCfgMoldeInstModal(id); return; }
          if (act === "molde-del") {
            const m = findCfgMolde(id);
            openCfgConfirmModal({
              title: "Excluir processo molde",
              message: `Confirma a exclusão de <strong>${m?.titulo || "molde"}</strong>?`,
              confirmLabel: "Excluir",
              danger: true,
              onConfirm: () => {
                const idx = store.moldes.findIndex((x) => x.id === id);
                if (idx >= 0) store.moldes.splice(idx, 1);
                toast("Molde excluído");
                renderConfigura();
              },
            });
            return;
          }

          if (act === "add-obr") { openCfgObrigacaoModal(); return; }
          if (act === "grupos-obr") { openCfgGruposObrModal(); return; }
          if (act === "regras-obr") { openCfgRegrasObrModal(); return; }
          if (act === "obr-filtros") { openCfgObrFiltrosModal(); return; }
          if (act === "obr-edit") {
            const item = store.obrigacoes.find((x) => x.id === id);
            openCfgObrigacaoModal(item);
            return;
          }
          if (act === "obr-dup") {
            const o = store.obrigacoes.find((x) => x.id === id);
            if (o) {
              store.obrigacoes.push({ ...o, id: "o" + Date.now().toString(36), titulo: o.titulo + " (cópia)" });
              toast("Obrigação duplicada");
              renderConfigura();
            }
            return;
          }
          if (act === "obr-del") {
            const o = store.obrigacoes.find((x) => x.id === id);
            openCfgConfirmModal({
              title: "Excluir obrigação",
              message: `Confirma a exclusão de <strong>${o?.titulo || "obrigação"}</strong>?`,
              confirmLabel: "Excluir",
              danger: true,
              onConfirm: () => {
                const idx = store.obrigacoes.findIndex((x) => x.id === id);
                if (idx >= 0) store.obrigacoes.splice(idx, 1);
                toast("Obrigação excluída");
                renderConfigura();
              },
            });
            return;
          }

          if (act === "novo-aviso") { openCfgNovoAvisoModal(); return; }
          if (act === "edit-email-tpl") { openCfgEmailTemplateModal(); return; }

          if (act === "sess-periodo") {
            openCfgPeriodoModal({
              ini: cfgState.sessPeriod.ini,
              fim: cfgState.sessPeriod.fim,
              title: "Período do monitoramento",
              onApply: (ini, fim) => {
                cfgState.sessPeriod = { ini, fim };
                toast(`Período: ${fmtCfgDateBR(ini)} — ${fmtCfgDateBR(fim)}`);
                renderConfigura();
              },
            });
            return;
          }
          if (act === "sess-aplicar") {
            const ini = document.getElementById("cfgSessIniFilter")?.value
              || document.getElementById("cfgSessIni")?.value
              || "";
            const fim = document.getElementById("cfgSessFimFilter")?.value
              || document.getElementById("cfgSessFim")?.value
              || "";
            if (!ini || !fim) {
              toast("Informe as datas do período");
              return;
            }
            if (ini > fim) {
              toast("A data inicial não pode ser maior que a final");
              return;
            }
            cfgState.sessPeriod = { ini, fim };
            cfgState.sessFilters = {
              user: document.getElementById("cfgSessUser")?.value || "",
              dept: document.getElementById("cfgSessDept")?.value || "",
              cargo: document.getElementById("cfgSessCargo")?.value || "",
              status: document.getElementById("cfgSessStatus")?.value || "",
            };
            toast(`Filtros aplicados · ${fmtCfgDateBR(ini)} até ${fmtCfgDateBR(fim)}`);
            renderConfigura();
            return;
          }
          if (act === "sess-limpar") {
            cfgState.sessFilters = { user: "", dept: "", cargo: "", status: "" };
            cfgState.sessPeriod = { ini: "2026-07-01", fim: "2026-07-14" };
            toast("Filtros limpos");
            renderConfigura();
            return;
          }
          if (act === "sess-reload") { toast("Dashboard atualizado"); renderConfigura(); return; }
          if (act === "sess-exportar") { toast("Relatório exportado (CSV simulado)"); return; }
          if (act === "sess-ranking") { openCfgSessRankingModal(); return; }
          if (act === "sess-row") { openCfgSessRowModal(id); return; }
          if (act === "sess-prev") {
            cfgState.sessPage = Math.max(0, (cfgState.sessPage || 0) - 1);
            toast(cfgState.sessPage === 0 ? "Primeira página" : `Página ${cfgState.sessPage + 1}`);
            return;
          }
          if (act === "sess-next") {
            cfgState.sessPage = (cfgState.sessPage || 0) + 1;
            toast(`Página ${cfgState.sessPage + 1}`);
            return;
          }

          if (act === "logs-calendario") {
            openCfgPeriodoModal({
              ini: cfgState.logs.dataIni,
              fim: cfgState.logs.dataFim,
              title: "Período dos logs",
              onApply: (ini, fim) => {
                cfgState.logs.dataIni = ini;
                cfgState.logs.dataFim = fim;
                toast(`Logs: ${fmtCfgDateBR(ini)} — ${fmtCfgDateBR(fim)}`);
                renderConfigura();
              },
            });
            return;
          }
          if (act === "logs-toggle-filtros") {
            cfgState.logsShowExtra = !cfgState.logsShowExtra;
            renderConfigura();
            return;
          }
          if (act === "logs-limpar") {
            cfgState.logs = { dataIni: "2026-07-01", dataFim: "2026-07-14", endpoint: "", metodo: "", usuario: "", operacao: "", ip: "", status: "", apenasErros: false };
            renderConfigura();
            toast("Filtros limpos");
            return;
          }
          if (act === "logs-filtrar") {
            const range = readCfgDateRange("cfgLogIni", "cfgLogFim");
            if (!range) return;
            cfgState.logs.dataIni = range.ini;
            cfgState.logs.dataFim = range.fim;
            cfgState.logs.endpoint = document.getElementById("cfgLogEndpoint")?.value || "";
            cfgState.logs.metodo = document.getElementById("cfgLogMetodo")?.value || "";
            cfgState.logs.usuario = document.getElementById("cfgLogUser")?.value || "";
            cfgState.logs.operacao = document.getElementById("cfgLogOp")?.value || "";
            cfgState.logs.ip = document.getElementById("cfgLogIp")?.value || "";
            cfgState.logs.status = document.getElementById("cfgLogStatus")?.value || "";
            cfgState.logs.apenasErros = !!document.getElementById("cfgLogErros")?.checked;
            renderConfigura();
            toast("Filtros aplicados");
            return;
          }
          if (act === "logs-reload") { toast("Logs recarregados"); renderConfigura(); return; }

          if (act === "robos-atualizar") {
            openModal({
              title: "Atualizar painel do robô",
              sub: "Tentativa de reconexão",
              body: `<p style="margin:0;font-size:.86rem;line-height:1.5">Reconsultando <code>/robos/painel</code>…<br><br>Último erro: <strong style="color:#b42318">503 Connection refused</strong> no host automation-worker:8090.</p>`,
              foot: `
                <button type="button" class="btn-ghost" data-close>Cancelar</button>
                <button type="button" class="btn-primary" id="cfgRobRetry">Tentar novamente</button>`,
            });
            document.getElementById("cfgRobRetry")?.addEventListener("click", () => {
              closeModal();
              toast("Falha persistente — serviço indisponível");
            });
            return;
          }
          if (act === "robos-cfg") { openCfgGerarCfgModal(); return; }

          if (act === "doc-add-regra") {
            openCfgClassificadorModal();
            return;
          }
          if (act === "doc-add-pasta") {
            openCfgPastaSecaoModal();
            return;
          }
          if (act === "doc-edit-pasta") {
            const pasta = store.pastasDoc.find((p) => p.id === id);
            if (!pasta) { toast("Pasta não encontrada"); return; }
            openCfgPastaSecaoModal(pasta);
            return;
          }
          if (act === "doc-del-pasta") {
            const pasta = store.pastasDoc.find((p) => p.id === id);
            openCfgConfirmModal({
              title: "Excluir pasta",
              message: `Confirma a exclusão de <strong>${pasta?.titulo || "pasta"}</strong>?`,
              confirmLabel: "Excluir",
              danger: true,
              onConfirm: () => {
                const idx = store.pastasDoc.findIndex((p) => p.id === id);
                if (idx >= 0) store.pastasDoc.splice(idx, 1);
                toast("Pasta excluída");
                renderConfigura();
              },
            });
            return;
          }
          if (act === "doc-add-tipo") {
            openCfgTipoDocModal();
            return;
          }
          if (act === "doc-edit-tipo") {
            const tipo = store.tiposDoc.find((t, i) => String(t.id || i) === String(id));
            if (!tipo) { toast("Tipo não encontrado"); return; }
            openCfgTipoDocModal(tipo);
            return;
          }
          if (act === "doc-del-tipo") {
            const tipo = store.tiposDoc.find((t, i) => String(t.id || i) === String(id));
            openCfgConfirmModal({
              title: "Excluir tipo de documento",
              message: `Confirma a exclusão de <strong>${getCfgTipoDocName(tipo) || "tipo"}</strong>?`,
              confirmLabel: "Excluir",
              danger: true,
              onConfirm: () => {
                const idx = store.tiposDoc.findIndex((t, i) => String(t.id || i) === String(id));
                if (idx >= 0) store.tiposDoc.splice(idx, 1);
                toast("Tipo de documento excluído");
                renderConfigura();
              },
            });
            return;
          }

          toast("Ação registrada");
        });
      });
    }

    function renderSegurancaCertificados() {
      emptyState.classList.add("hide");
      fakeList.classList.add("show");
      const counts = getCertAlertCounts();
      let rows = getCertificadosMonitor();
      if (securityCertFilterMode === "acao") {
        rows = rows.filter((r) => r.status === "vencido" || r.status === "a-vencer");
      } else if (securityCertFilterMode !== "all") {
        rows = rows.filter((r) => r.status === securityCertFilterMode);
      }
      if (secEmpresaFilter && secEmpresaFilter !== "all") {
        rows = rows.filter((r) => r.id === secEmpresaFilter);
      } else if (securityCertFilterClienteId) {
        rows = rows.filter((r) => r.id === securityCertFilterClienteId);
      }
      const filters = [
        { id: "all", label: "Todos" },
        { id: "acao", label: "Exigem ação" },
        { id: "vencido", label: "Vencidos" },
        { id: "a-vencer", label: "A vencer" },
        { id: "ok", label: "Válidos" },
      ];
      const empresaFiltroId = (secEmpresaFilter && secEmpresaFilter !== "all")
        ? secEmpresaFilter
        : securityCertFilterClienteId;
      const clienteNome = empresaFiltroId
        ? (CLIENTES.find((c) => c.id === empresaFiltroId)?.fantasia || "empresa")
        : null;
      const hasActiveFilters = !!(empresaFiltroId || securityCertFilterMode !== "all");
      fakeList.innerHTML = `
        <div class="sec-monitor">
          <div class="sec-monitor-top">
            <div class="sec-monitor-head">
              <h3>Monitoramento de Certificados Digitais</h3>
              <span class="sub">${clienteNome
                ? `Filtro: ${clienteNome}`
                : `Alerta automático em ${CERT_AVENCER_DIAS} dias`}</span>
              ${hasActiveFilters
                ? `<button type="button" class="btn-ghost" id="secClearCliFilter" style="height:30px;padding:0 10px;font-size:.72rem">Limpar filtros</button>`
                : ""}
            </div>
            <div class="sec-kpis" role="toolbar" aria-label="Filtrar por status">
              <button type="button" class="sec-kpi total${securityCertFilterMode === "all" ? " active" : ""}" data-sec-filter="all" aria-pressed="${securityCertFilterMode === "all"}">
                <span class="lab">Total</span><strong>${counts.total}</strong>
              </button>
              <button type="button" class="sec-kpi ok${securityCertFilterMode === "ok" ? " active" : ""}" data-sec-filter="ok" aria-pressed="${securityCertFilterMode === "ok"}">
                <span class="lab">Válidos</span><strong>${counts.ok}</strong>
              </button>
              <button type="button" class="sec-kpi warn${securityCertFilterMode === "a-vencer" ? " active" : ""}" data-sec-filter="a-vencer" aria-pressed="${securityCertFilterMode === "a-vencer"}">
                <span class="lab">A vencer</span><strong>${counts.aVencer}</strong>
              </button>
              <button type="button" class="sec-kpi bad${securityCertFilterMode === "vencido" ? " active" : ""}" data-sec-filter="vencido" aria-pressed="${securityCertFilterMode === "vencido"}">
                <span class="lab">Vencidos</span><strong>${counts.vencidos}</strong>
              </button>
            </div>
          </div>
          <div class="sec-filters" role="toolbar" aria-label="Filtros de certificado">
            ${renderModuleEmpresaPickerHtml("seguranca")}
            ${filters.map((f) => `
              <button type="button" class="sec-filter${securityCertFilterMode === f.id ? " active" : ""}" data-sec-filter="${f.id}">${f.label}</button>
            `).join("")}
          </div>
          <div class="sec-table-wrap">
            <div class="sec-list">
              <div class="sec-list-head">
                <span>Identificação</span>
                <span>Status</span>
                <span>Titular</span>
                <span>Validade</span>
              </div>
              ${rows.length ? rows.map((r) => {
                const diasTxt = r.dias < 0
                  ? `vencido há ${Math.abs(r.dias)} ${Math.abs(r.dias) === 1 ? "dia" : "dias"}`
                  : `${r.dias} ${r.dias === 1 ? "dia" : "dias"} restantes`;
                return `
                <div class="sec-list-row status-${r.meta.badge}" data-sec-cli="${r.id}" role="button" tabindex="0" aria-label="Abrir ${r.fantasia}">
                  <div class="cli-id-cell">
                    <strong title="${r.razaoSocial}">${r.razaoSocial}</strong>
                    <span>${r.cnpj}</span>
                  </div>
                  <div class="cell-status"><span class="proc-badge ${r.meta.badge}">${r.meta.label}</span></div>
                  <div class="cell-titular" title="${r.titular}">${r.titular}</div>
                  <div class="cell-validade">
                    <strong>${r.validade}</strong>
                    <span>${diasTxt}</span>
                  </div>
                </div>`;
              }).join("") : `<div class="sec-empty">Nenhum certificado neste filtro.</div>`}
            </div>
          </div>
        </div>`;
      document.getElementById("secClearCliFilter")?.addEventListener("click", () => {
        securityCertFilterClienteId = null;
        securityCertFilterMode = "all";
        securityCertSearchQuery = "";
        setModuleEmpresaFilter("seguranca", "all", { silentToast: true });
        toast("Filtros removidos");
      });
      fakeList.querySelectorAll("[data-sec-filter]").forEach((btn) => {
        btn.addEventListener("click", () => {
          securityCertFilterMode = btn.dataset.secFilter || "all";
          renderSegurancaCertificados();
        });
      });
    }

    function renderPortalClientePage(pageId) {
      const wrap = document.getElementById("clientesWrap");
      const c = getPortalCliente();
      if (!wrap || !c) return;
      cliPerfilId = c.id;
      if (pageId !== "documentos") {
        cliDocsFolderId = null;
        cliDocsFileMenuId = null;
      }
      cliPerfilTab = pageId;
      const certRow = getCertificadoRow(c);
      const cert = certRow.meta;
      wrap.innerHTML = `
        <div class="cli-perfil">
          <div class="cli-perfil-head">
            <div class="cli-perfil-head-main">
              <div class="cli-perfil-head-left">
                <div class="cli-perfil-identity">
                  <h2>${c.fantasia || c.nome}</h2>
                  <div class="cli-perfil-chips" aria-label="Dados da empresa">
                    <span>${uiSelectEscape(c.regime || "—")}</span>
                    <span class="sep" aria-hidden="true">·</span>
                    <span>${uiSelectEscape(c.estado || "—")}</span>
                    <span class="cli-badge ${c.status === "Ativo" ? "matriz" : "filial"}">${uiSelectEscape(c.status || "—")}</span>
                  </div>
                </div>
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
          <div class="cli-perfil-body" id="cliPerfilBody">
            ${renderCliPerfilTabBody(c)}
          </div>
        </div>`;
      enhanceUiSelects(wrap);
      if (pageId === "documentos") requestAnimationFrame(() => refreshCliDocsIcons());
      if (pageId === "financeiro") {
        cliFinSubTab = "relatorio";
        requestAnimationFrame(() => initCliFinReportCharts(wrap, getCliFinExecData(c)));
      }
      if (pageId === "xml" && cliXmlAnalise.tab === "dashboard" && cliXmlAnalise.imported) {
        requestAnimationFrame(() => initCliXmlDashboardCharts(c));
      }
    }

    function renderContent(section) {
      const clientesWrap = document.getElementById("clientesWrap");
      const financeiroWrap = document.getElementById("financeiroWrap");
      if (!section) {
        parkFinPanelTools();
        emptyState.classList.remove("hide");
        fakeList.classList.remove("show");
        kanbanWrap.classList.remove("show");
        processosWrap.classList.remove("show");
        clientesWrap?.classList.remove("show");
        financeiroWrap?.classList.remove("show");
        agendaWrap.classList.remove("show");
        dashboard.classList.remove("show");
        fakeList.innerHTML = "";
        kanbanBoard.innerHTML = "";
        emptyIcon.innerHTML = "";
        emptyTitle.textContent = "Nenhuma aba aberta";
        emptyDesc.textContent = "Clique em + para adicionar uma seção.";
        tabActions.hidden = true;
        dashViewTools.hidden = true;
        document.getElementById("dashPeriodWrap").hidden = true;
        document.getElementById("pageRichHeader")?.classList.remove("is-dashboard");
        procFilters.hidden = true;
        return;
      }

      if (section.portalCliente) {
        parkFinPanelTools();
        emptyState.classList.add("hide");
        fakeList.classList.remove("show");
        fakeList.innerHTML = "";
        kanbanWrap.classList.remove("show");
        kanbanBoard.innerHTML = "";
        processosWrap.classList.remove("show");
        financeiroWrap?.classList.remove("show");
        agendaWrap.classList.remove("show");
        dashboard.classList.remove("show");
        procFilters.hidden = true;
        document.getElementById("dashPeriodWrap").hidden = true;
        clientesWrap?.classList.add("show");
        renderPortalClientePage(section.id);
        return;
      }

      if (section.dashboard) {
        parkFinPanelTools();
        emptyState.classList.add("hide");
        fakeList.classList.remove("show");
        kanbanWrap.classList.remove("show");
        processosWrap.classList.remove("show");
        clientesWrap?.classList.remove("show");
        financeiroWrap?.classList.remove("show");
        agendaWrap.classList.remove("show");
        fakeList.innerHTML = "";
        kanbanBoard.innerHTML = "";
        dashboard.classList.add("show");
        renderDashboard();
        return;
      }

      dashboard.classList.remove("show");

      if (section.financeiroDash) {
        fakeList.classList.remove("show");
        fakeList.innerHTML = "";
        kanbanWrap.classList.remove("show");
        kanbanBoard.innerHTML = "";
        agendaWrap.classList.remove("show");
        processosWrap.classList.remove("show");
        clientesWrap?.classList.remove("show");
        procFilters.hidden = true;
        document.getElementById("dashPeriodWrap").hidden = true;
        emptyState.classList.add("hide");
        financeiroWrap?.classList.add("show");
        finDash.tab = "dashboard";
        renderFinModuleDash();
        return;
      }

      parkFinPanelTools();

      if (section.processos) {
        fakeList.classList.remove("show");
        fakeList.innerHTML = "";
        kanbanWrap.classList.remove("show");
        kanbanBoard.innerHTML = "";
        agendaWrap.classList.remove("show");
        clientesWrap?.classList.remove("show");
        financeiroWrap?.classList.remove("show");
        emptyState.classList.add("hide");
        processosWrap.classList.add("show");
        procFilters.hidden = false;
        document.getElementById("dashPeriodWrap").hidden = false;
        renderProcessos();
        return;
      }

      if (section.clientes) {
        fakeList.classList.remove("show");
        fakeList.innerHTML = "";
        kanbanWrap.classList.remove("show");
        kanbanBoard.innerHTML = "";
        agendaWrap.classList.remove("show");
        processosWrap.classList.remove("show");
        financeiroWrap?.classList.remove("show");
        procFilters.hidden = true;
        document.getElementById("dashPeriodWrap").hidden = true;
        emptyState.classList.add("hide");
        clientesWrap?.classList.add("show");
        renderClientes();
        return;
      }

      if (section.agenda) {
        fakeList.classList.remove("show");
        fakeList.innerHTML = "";
        kanbanWrap.classList.remove("show");
        kanbanBoard.innerHTML = "";
        processosWrap.classList.remove("show");
        clientesWrap?.classList.remove("show");
        financeiroWrap?.classList.remove("show");
        procFilters.hidden = true;
        document.getElementById("dashPeriodWrap").hidden = true;
        emptyState.classList.add("hide");
        agendaWrap.classList.add("show");
        renderAgenda();
        return;
      }

      if (section.seguranca) {
        processosWrap.classList.remove("show");
        clientesWrap?.classList.remove("show");
        financeiroWrap?.classList.remove("show");
        agendaWrap.classList.remove("show");
        kanbanWrap.classList.remove("show");
        kanbanBoard.innerHTML = "";
        procFilters.hidden = true;
        document.getElementById("dashPeriodWrap").hidden = true;
        renderSegurancaCertificados();
        return;
      }

      if (section.configura) {
        processosWrap.classList.remove("show");
        clientesWrap?.classList.remove("show");
        financeiroWrap?.classList.remove("show");
        agendaWrap.classList.remove("show");
        kanbanWrap.classList.remove("show");
        kanbanBoard.innerHTML = "";
        procFilters.hidden = true;
        document.getElementById("dashPeriodWrap").hidden = true;
        renderConfigura();
        return;
      }

      processosWrap.classList.remove("show");
      clientesWrap?.classList.remove("show");
      financeiroWrap?.classList.remove("show");
      agendaWrap.classList.remove("show");
      procFilters.hidden = true;
      document.getElementById("dashPeriodWrap").hidden = true;
      const hasItems = section.items && section.items.length > 0;

      if (section.kanban) {
        fakeList.classList.remove("show");
        fakeList.innerHTML = "";
        emptyState.classList.add("hide");
        kanbanWrap.classList.add("show");
        renderKanban(section.items || []);
        return;
      }

      kanbanWrap.classList.remove("show");
      kanbanBoard.innerHTML = "";
      emptyState.classList.toggle("hide", hasItems);
      fakeList.classList.toggle("show", hasItems);
      if (!hasItems) {
        fakeList.innerHTML = "";
        return;
      }
      fakeList.innerHTML = section.items.map((item, i) => `
        <button type="button" class="fake-row tip-bottom" data-tip="Abrir: ${item.title}" data-item="${i}">
          <div>
            <strong>${item.title}</strong><br>
            <span>${item.meta}</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>`).join("");
    }

    function setExpanded(on) {
      if (on && typeof setFinConcOpsExpanded === "function" && finDash?.conc?.opsExpanded) {
        setFinConcOpsExpanded(false);
      }
      contentPanel.classList.toggle("is-expanded", on);
      expandBackdrop.classList.toggle("show", on);
      document.body.classList.toggle("panel-expanded", on);
      document.body.classList.remove("fin-conc-ops-expanded");
      empresaWrap.classList.remove("open");
      document.getElementById("tabAddWrap")?.classList.remove("open");
      document.getElementById("tabSwitcher")?.classList.remove("open");
      document.getElementById("tabSwitcherBtn")?.setAttribute("aria-expanded", "false");
      filterWrap?.classList.remove("open");
      filterBtn?.setAttribute("aria-expanded", "false");
      const expandIcon = expandBtn.querySelector(".icon-expand");
      const collapseIcon = expandBtn.querySelector(".icon-collapse");
      expandIcon.hidden = on;
      collapseIcon.hidden = !on;
      expandBtn.setAttribute("data-tip", on ? "Sair da tela toda" : "Expandir para tela toda");
      expandBtn.setAttribute("aria-label", on ? "Sair da tela toda" : "Expandir");
      document.body.style.overflow = on ? "hidden" : "";
      if (on) renderTabSwitcher();
    }

    function setSection(id, silent) {
      if (!openTabIds.includes(id)) return;
      const section = resolveSection(id);
      if (!section) return;
      current = id;
      if (!section.dashboard) {
        const ico = icons[id] || icons.clientes || "";
        emptyIcon.innerHTML = ico.replace(/width="18"/g, 'width="26"').replace(/height="18"/g, 'height="26"');
        emptyTitle.textContent = section.empty;
        emptyDesc.textContent = section.desc;
      }
      tabActions.hidden = !section.actions;
      dashViewTools.hidden = !(
        section.dashboard
        || (section.financeiroDash && finDash.tab === "dashboard")
      );
      document.getElementById("dashPeriodWrap").hidden = !(section.dashboard || section.processos);
      document.getElementById("pageRichHeader")?.classList.toggle("is-dashboard", !!section.dashboard);
      procFilters.hidden = !section.processos;
      if (!(section.dashboard || section.financeiroDash)) filterWrap.classList.remove("open");
      const toolbarCompact = !section.dashboard && !section.processos && !section.actions;
      document.getElementById("contentPanel")?.classList.toggle("toolbar-compact", toolbarCompact);
      renderTabs();
      renderContent(section);
      if (section.dashboard || section.financeiroDash) syncFilterPanel();
      skipToast = false;
    }

    function addTab(id) {
      if (isClientePortal()) {
        if (!CLIENT_PORTAL_TAB_IDS.includes(id) || openTabIds.includes(id)) return;
        openTabIds.push(id);
        skipToast = true;
        setSection(id, true);
        return;
      }
      if (id === "visao" || openTabIds.includes(id)) return;
      openTabIds.push(id);
      skipToast = true;
      setSection(id, true);
    }

    function closeTab(id) {
      if (isClientePortal()) {
        if (!CLIENT_PORTAL_TAB_IDS.includes(id)) return;
        if (openTabIds.length <= 1) {
          toast("Mantenha pelo menos uma aba");
          return;
        }
      } else if (id === "visao") {
        toast("Visão Geral não pode ser fechada");
        return;
      }
      if (openTabIds.length <= 1) {
        toast("Mantenha pelo menos uma aba");
        return;
      }
      const idx = openTabIds.indexOf(id);
      if (idx < 0) return;
      openTabIds.splice(idx, 1);
      document.getElementById("tabAddWrap")?.classList.remove("open");
      if (current === id) {
        const next = openTabIds[Math.min(idx, openTabIds.length - 1)];
        skipToast = true;
        setSection(next, true);
      } else {
        renderTabs();
      }
    }

    function addObrigacao(kind, dept) {
      if (!openTabIds.includes("processos")) {
        openTabIds.push("processos");
      }
      const n = obrigacoesItems.filter((i) => kind === "interna" ? i.interna || i.dept === "Obrigação interna" : true).length + 1;
      const isInterna = kind === "interna" || dept === "Obrigação interna";
      const departamento = isInterna ? "Obrigação interna" : (dept || "Fiscal");

      if (isInterna) {
        obrigacoesItems.push({
          title: `Obrigação interna #${n}`,
          meta: "Exclusiva da empresa · pendente",
          dept: "Obrigação interna",
          grupo: false,
          interna: true,
        });
        toast("Obrigação interna criada");
      } else if (kind === "grupo") {
        obrigacoesItems.push({
          title: `Grupo obrigações #${n}`,
          meta: "2 obrigações · novo",
          dept: departamento,
          grupo: true,
        });
        toast("Grupo adicionado");
      } else {
        obrigacoesItems.push({
          title: `Recorrência #${n}`,
          meta: "Mensal · pendente",
          dept: departamento,
          grupo: false,
        });
        toast(`Adicionada em ${departamento}`);
      }
      skipToast = true;
      setSection("processos", true);
    }

    function openRegerarObrigacoesModal() {
      const sugeridas = [
        { id: 101, nome: "DAS — Simples Nacional", regras: "TO · Simples Nacional" },
        { id: 102, nome: "DCTFWeb", regras: "TO · Simples Nacional" },
        { id: 103, nome: "DEFIS", regras: "TO · Simples Nacional" },
        { id: 104, nome: "PGDAS-D", regras: "TO · Simples Nacional · Matriz" },
      ];
      openModal({
        title: "Regerar obrigações",
        sub: "Aplicar regras de estado e regime novamente",
        wide: true,
        body: `
          <p class="cfg-regerar-hint">Selecione as obrigações que serão regeneradas para esta empresa com base nas regras cadastradas.</p>
          <div class="cfg-regerar-toolbar">
            <button type="button" class="linkish" id="iniSelectAll">Marcar todas</button>
            <span class="sep">·</span>
            <button type="button" class="linkish" id="iniClearAll">Desmarcar todas</button>
            <span class="cfg-regerar-count" id="iniCount">${sugeridas.length} selecionada(s)</span>
          </div>
          <div class="cfg-regerar-list" id="iniList">
            ${sugeridas.map((o) => `
              <label class="cfg-regerar-item">
                <input type="checkbox" name="iniObr" value="${o.id}" checked />
                <span class="txt">
                  <strong>${o.nome}</strong>
                  <span>Regras: ${o.regras}</span>
                </span>
              </label>
            `).join("")}
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="iniConfirm">Regerar selecionadas</button>`,
      });

      const syncCount = () => {
        const n = [...document.querySelectorAll('input[name="iniObr"]:checked')].length;
        const el = document.getElementById("iniCount");
        if (el) el.textContent = `${n} selecionada(s)`;
      };

      document.getElementById("iniSelectAll")?.addEventListener("click", () => {
        document.querySelectorAll('input[name="iniObr"]').forEach((c) => { c.checked = true; });
        syncCount();
      });
      document.getElementById("iniClearAll")?.addEventListener("click", () => {
        document.querySelectorAll('input[name="iniObr"]').forEach((c) => { c.checked = false; });
        syncCount();
      });
      document.getElementById("iniList")?.addEventListener("change", syncCount);
      document.getElementById("iniConfirm")?.addEventListener("click", () => {
        const selected = [...document.querySelectorAll('input[name="iniObr"]:checked')];
        if (!selected.length) {
          toast("Nenhuma obrigação selecionada");
          return;
        }
        selected.forEach((c) => {
          const nome = c.closest("label")?.querySelector("strong")?.textContent || `Obrigação ${c.value}`;
          if (!obrigacoesItems.some((i) => i.title === nome)) {
            obrigacoesItems.push({
              title: nome,
              meta: "Regenerada por regras · agora",
              dept: "Fiscal",
              grupo: false,
            });
          } else {
            const item = obrigacoesItems.find((i) => i.title === nome);
            if (item) item.meta = "Regenerada por regras · agora";
          }
        });
        closeModal();
        skipToast = true;
        setSection("processos", true);
        toast(`${selected.length} obrigação(ões) regenerada(s)`);
      });
    }

    textTabs.addEventListener("click", (e) => {
      const closeBtn = e.target.closest("[data-close-tab]");
      if (closeBtn) {
        e.stopPropagation();
        closeTab(closeBtn.dataset.closeTab);
        return;
      }

      const addItem = e.target.closest("[data-add-tab]");
      if (addItem) {
        e.stopPropagation();
        addTab(addItem.dataset.addTab);
        return;
      }

      const addBtn = e.target.closest("#tabAddBtn");
      if (addBtn) {
        e.stopPropagation();
        toggleAddMenu();
        return;
      }

      const tab = e.target.closest(".text-tab");
      if (tab) setSection(tab.dataset.id);
    });

    fakeList.addEventListener("click", (e) => {
      if (e.target.closest("#secClearCliFilter") || e.target.closest("[data-sec-filter]") || e.target.closest("#secCertSearch") || e.target.closest(".sec-search")) return;
      const secRow = e.target.closest(".sec-list-row[data-sec-cli]");
      if (secRow) {
        openEmpresaPerfil(secRow.dataset.secCli);
        return;
      }
      const row = e.target.closest(".fake-row");
      if (!row || row.dataset.item == null) return;
      const section = sections.find((s) => s.id === current);
      const item = section?.items?.[+row.dataset.item];
      if (item) toast(`Abrindo: ${item.title}`);
    });

    agendaWrap.addEventListener("click", (e) => {
      const statusBtn = e.target.closest("#agendaEntregaStatusBtn");
      const statusOpt = e.target.closest("#agendaEntregaStatusMenu .agenda-ops-status-opt");
      const statusWrap = document.getElementById("agendaEntregaStatusWrap");
      if (statusBtn && statusWrap) {
        e.stopPropagation();
        const open = !statusWrap.classList.contains("open");
        document.querySelectorAll(".agenda-ops-status.open").forEach((el) => {
          if (el !== statusWrap) el.classList.remove("open");
        });
        statusWrap.classList.toggle("open", open);
        statusBtn.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }
      if (statusOpt) {
        e.stopPropagation();
        agendaEntregaStatus = statusOpt.dataset.value || "";
        statusWrap?.classList.remove("open");
        document.getElementById("agendaEntregaStatusBtn")?.setAttribute("aria-expanded", "false");
        syncAgendaEntregaStatusUi();
        renderAgendaEntregasBoard();
        return;
      }
      if (statusWrap?.classList.contains("open") && !e.target.closest("#agendaEntregaStatusWrap")) {
        statusWrap.classList.remove("open");
        document.getElementById("agendaEntregaStatusBtn")?.setAttribute("aria-expanded", "false");
      }

      if (e.target.closest("#agendaPrev")) {
        agendaMonth = new Date(agendaMonth.getFullYear(), agendaMonth.getMonth() - 1, 1);
        renderAgenda();
        return;
      }
      if (e.target.closest("#agendaNext")) {
        agendaMonth = new Date(agendaMonth.getFullYear(), agendaMonth.getMonth() + 1, 1);
        renderAgenda();
        return;
      }
      const dayBtn = e.target.closest("[data-agenda-day]");
      if (dayBtn) {
        agendaSelected = dayBtn.dataset.agendaDay;
        agendaKpiFilter = null;
        agendaFeedFilter = "hoje";
        renderAgenda();
        return;
      }
      const feedFilter = e.target.closest("[data-agenda-feed-filter]");
      if (feedFilter) {
        agendaFeedFilter = feedFilter.dataset.agendaFeedFilter;
        agendaKpiFilter = null;
        renderAgenda();
        return;
      }
      const kpiBtn = e.target.closest("[data-agenda-kpi]");
      if (kpiBtn) {
        const key = kpiBtn.dataset.agendaKpi;
        agendaKpiFilter = agendaKpiFilter === key ? null : key;
        renderAgenda();
        return;
      }
      if (e.target.closest("#agendaKpiClear")) {
        agendaKpiFilter = null;
        renderAgenda();
        return;
      }
      if (e.target.closest("#agendaSecurityDismiss")) {
        e.stopPropagation();
        securityAlertDismissed = true;
        renderSecurityAlert();
        toast("Alerta dispensado — espaço liberado");
        return;
      }
      if (e.target.closest("#agendaSecurityGo") || e.target.closest("#agendaSecurityAlert svg")) {
        gotoSecurityCertAcao();
        return;
      }
      const extra = e.target.closest("[data-task-extra]");
      if (extra) {
        e.stopPropagation();
        const action = extra.dataset.taskExtra;
        toast(action === "concluir" ? "Tarefa marcada como concluída" : "Anexo iniciado");
        return;
      }
      const boardTask = e.target.closest("[data-agenda-board-task]");
      if (boardTask) {
        // Não abrir modal se clicou em ação rápida do card
        if (e.target.closest("[data-task-extra]")) return;
        const id = Number(boardTask.dataset.agendaBoardTask);
        openEntregaDetailModal(id);
        return;
      }
      const editBtn = e.target.closest("[data-agenda-edit]");
      if (editBtn) {
        e.stopPropagation();
        const proc = sections.find((s) => s.id === "processos")?.items.find((p) => String(p.id) === editBtn.dataset.agendaEdit);
        if (proc) openEditProcessoModal(proc);
        return;
      }
      const procRow = e.target.closest("[data-agenda-proc]");
      if (procRow) {
        const proc = sections.find((s) => s.id === "processos")?.items.find((p) => String(p.id) === procRow.dataset.agendaProc);
        if (proc) {
          if (!openTabIds.includes("processos")) openTabIds.push("processos");
          skipToast = true;
          setSection("processos", true);
          openKanbanEtapasModal(proc);
        }
      }
    });

    agendaWrap.addEventListener("change", (e) => {
      if (e.target.id === "agendaEntregaView") {
        agendaEntregaView = e.target.value || "tarefas";
        renderAgendaEntregasBoard();
        return;
      }
      if (e.target.id === "agendaEntregaFuncionario") {
        agendaEntregaFuncionario = e.target.value || "";
        renderAgendaEntregasBoard();
        return;
      }
      if (e.target.id === "agendaEntregaResp") {
        agendaEntregaResp = e.target.value || "";
        renderAgendaEntregasBoard();
      }
    });

    agendaWrap.addEventListener("input", (e) => {
      const search = e.target.closest("[data-mod-empresa-search]");
      if (search) {
        filterModEmpresaOptions(search.dataset.modEmpresaSearch || "agenda", search.value);
      }
    });

    kanbanBoard.addEventListener("click", (e) => {
      const addBtn = e.target.closest("[data-kanban-add]");
      if (addBtn) {
        e.stopPropagation();
        addObrigacao(addBtn.dataset.kanbanKind || "add", addBtn.dataset.kanbanAdd);
        return;
      }

      const card = e.target.closest(".kanban-card");
      if (!card) return;
      const key = card.dataset.kanbanItem || "";
      const [dept, idx] = key.split("::");
      const sectionItems = obrigacoesItems;
      const item = sectionItems.filter((i) => (i.dept || "Sem departamento") === dept)[+idx];
      if (!item) return;
      if (item.grupo) {
        openModal({
          title: item.title,
          sub: "Obrigações do grupo",
          body: `<p>Simulação do diálogo de grupo (Flutter: <code>ObrigacoesGrupoDialog</code>).</p>
            <ul style="margin-top:10px;padding-left:18px;line-height:1.7;font-size:.88rem">
              <li>Membro A · Mensal</li>
              <li>Membro B · Trimestral</li>
              <li>Membro C · Anual</li>
            </ul>`,
        });
      } else {
        toast(`Recorrência: ${item.title}`);
      }
    });

    document.getElementById("clientesWrap")?.addEventListener("click", (e) => {
      if (handleCliXmlModClick(e)) return;
      if (e.target.closest("[data-cli-add-empresa]")) {
        openClienteCadastro();
        return;
      }
      const listKpi = e.target.closest("[data-cli-list-kpi]");
      if (listKpi) {
        const next = listKpi.dataset.cliListKpi || "";
        cliListKpiFilter = cliListKpiFilter === next ? "" : next;
        cliListMenuId = null;
        renderClientesList();
        return;
      }
      const dossieAct = e.target.closest("[data-cli-dossie-act]");
      if (dossieAct) {
        e.preventDefault();
        e.stopPropagation();
        cliListMenuId = null;
        handleCliMiniDossieAction(dossieAct.dataset.cliDossieAct || "", dossieAct.dataset.cliId, dossieAct);
        return;
      }
      const dossieTab = e.target.closest("[data-cli-dossie-tab]");
      if (dossieTab) {
        e.preventDefault();
        e.stopPropagation();
        cliMiniDossieTab = dossieTab.dataset.cliDossieTab || "alertas";
        cliListMenuId = null;
        renderClientesList();
        return;
      }
      const dossieMenuBtn = e.target.closest("[data-cli-dossie-menu]");
      if (dossieMenuBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = dossieMenuBtn.dataset.cliDossieMenu;
        const key = `dossie:${id}`;
        cliListMenuId = cliListMenuId === key ? null : key;
        renderClientesList();
        return;
      }
      const rowMenuBtn = e.target.closest("[data-cli-row-menu]");
      if (rowMenuBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = rowMenuBtn.dataset.cliRowMenu;
        cliListMenuId = cliListMenuId === id ? null : id;
        renderClientesList();
        return;
      }
      const rowAct = e.target.closest("[data-cli-row-act]");
      if (rowAct) {
        e.preventDefault();
        e.stopPropagation();
        const id = rowAct.dataset.cliId;
        const act = rowAct.dataset.cliRowAct;
        const c = CLIENTES.find((x) => x.id === id);
        cliListMenuId = null;
        if (act === "abrir") openClientePerfil(id);
        else if (act === "financeiro") openClientePerfil(id, "financeiro");
        else if (act === "documentos") openClientePerfil(id, "documentos");
        else if (act === "config" && c) openClienteEmpresaConfigModal(c);
        else if (act === "excluir") toast("Exclusão disponível na versão completa");
        else renderClientesList();
        return;
      }
      const drawerAct = e.target.closest("[data-cli-drawer-act]");
      if (drawerAct) {
        e.preventDefault();
        e.stopPropagation();
        const id = drawerAct.dataset.cliId;
        const act = drawerAct.dataset.cliDrawerAct;
        const c = CLIENTES.find((x) => x.id === id);
        if (act === "abrir") openClientePerfil(id);
        else if (act === "financeiro") openClientePerfil(id, "financeiro");
        else if (act === "documentos") openClientePerfil(id, "documentos");
        else if (act === "config" && c) openClienteEmpresaConfigModal(c);
        return;
      }
      if (e.target.closest("#cliDrawerClose") || e.target.id === "cliDrawerBackdrop") {
        closeCliClienteDrawer();
        if (cliView === "lista") renderClientesList();
        return;
      }
      const cfgBtn = e.target.closest("[data-cli-config]");
      if (cfgBtn) {
        e.preventDefault();
        e.stopPropagation();
        const c = CLIENTES.find((x) => x.id === cfgBtn.dataset.cliConfig);
        if (c) openClienteEmpresaConfigModal(c);
        return;
      }
      const openBtn = e.target.closest(".cli-list-row[data-cli-id]");
      if (openBtn && !e.target.closest("[data-cli-actions], .cli-mini-dossie")) {
        const id = openBtn.dataset.cliId;
        const onlyOne = collectCliListRowsMeta().length === 1;
        selectCliListForDossie(id, { toggle: !onlyOne });
        renderClientesList();
        return;
      }
      if (cliListMenuId && !e.target.closest(".cli-row-menu-wrap")) {
        cliListMenuId = null;
        if (cliView === "lista") renderClientesList();
        return;
      }
      if (finDash.conc?.rowMenuId && !e.target.closest(".fin-conc-row-menu-wrap")) {
        finDash.conc.rowMenuId = null;
        if (finDash.tab === "conciliacao") renderFinModuleDash();
        return;
      }
      if (finDash.conc?.filtersOpen && !e.target.closest("#finConcFilterWrap")) {
        finDash.conc.filtersOpen = false;
        const keepsFlow = e.target.closest("[data-fin-conc], [data-fin-conc-status], #finConcQ");
        if (!keepsFlow && finDash.tab === "conciliacao") renderFinModuleDash();
      }
      if (e.target.closest("[data-cli-back]")) {
        closeClientePerfil();
        return;
      }
      const tab = e.target.closest("[data-cli-tab]");
      if (tab) {
        cliPerfilTab = tab.dataset.cliTab || "obrigacoes";
        if (cliPerfilTab !== "documentos") {
          cliDocsFolderId = null;
          cliDocsFileMenuId = null;
        }
        renderClientes();
        return;
      }
      if (e.target.closest("[data-cli-doc-back]")) {
        cliDocsFolderId = null;
        cliDocsFileMenuId = null;
        renderClientes();
        return;
      }
      if (e.target.closest("[data-cli-doc-novo]") || e.target.closest("[data-cli-docs-drop]")) {
        document.getElementById("cliDocsUploadInput")?.click();
        return;
      }
      const genToggle = e.target.closest("[data-cli-doc-generate-toggle]");
      if (genToggle) {
        const wrap = document.getElementById("cliDocsGenerateWrap");
        const open = !wrap?.classList.contains("open");
        wrap?.classList.toggle("open", open);
        genToggle.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }
      const genItem = e.target.closest("[data-cli-doc-generate]");
      if (genItem) {
        document.getElementById("cliDocsGenerateWrap")?.classList.remove("open");
        document.querySelector("[data-cli-doc-generate-toggle]")?.setAttribute("aria-expanded", "false");
        toast(`Gerando documento · ${genItem.dataset.cliDocGenerate}`);
        return;
      }
      const fileAct = e.target.closest("[data-cli-doc-file-act]");
      if (fileAct) {
        e.preventDefault();
        e.stopPropagation();
        const act = fileAct.dataset.cliDocFileAct;
        const fileId = fileAct.dataset.fileId;
        const folderId = fileAct.closest("[data-folder]")?.dataset.folder || cliDocsFolderId;
        const file = getCliDocsFiles(folderId).find((x) => x.id === fileId);
        cliDocsFileMenuId = null;
        syncCliDocsFileMenusDom();
        if (!file) return;
        if (act === "visualizar") openCliDocPreview(file);
        else if (act === "baixar") toast(`Download iniciado · ${file.nome}`);
        else if (act === "detalhes") openCliDocDetails(file);
        return;
      }
      const fileToggle = e.target.closest("[data-cli-doc-file-toggle]");
      if (fileToggle) {
        e.preventDefault();
        e.stopPropagation();
        const id = fileToggle.dataset.cliDocFileToggle;
        cliDocsFileMenuId = cliDocsFileMenuId === id ? null : id;
        syncCliDocsFileMenusDom();
        return;
      }
      const docFolder = e.target.closest("[data-cli-doc-folder]");
      if (docFolder) {
        cliDocsFolderId = docFolder.dataset.cliDocFolder || null;
        cliDocsFileMenuId = null;
        renderClientes();
        return;
      }
      const procStatusBtn = e.target.closest("#cliProcStatusBtn");
      const procStatusWrap = document.getElementById("cliProcStatusWrap");
      if (procStatusBtn && procStatusWrap) {
        e.stopPropagation();
        const open = !procStatusWrap.classList.contains("open");
        document.querySelectorAll(".agenda-ops-status.open").forEach((el) => {
          if (el !== procStatusWrap) el.classList.remove("open");
        });
        procStatusWrap.classList.toggle("open", open);
        procStatusBtn.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }
      const procStatusOpt = e.target.closest("[data-cli-proc-status]");
      if (procStatusOpt) {
        e.stopPropagation();
        cliProcFiltros.status = procStatusOpt.dataset.cliProcStatus || "";
        procStatusWrap?.classList.remove("open");
        document.getElementById("cliProcStatusBtn")?.setAttribute("aria-expanded", "false");
        renderClientes();
        return;
      }
      const procView = e.target.closest("[data-cli-proc-view]");
      if (procView) {
        cliProcView = procView.dataset.cliProcView || "list";
        renderClientes();
        return;
      }
      const procEdit = e.target.closest("[data-cli-proc-edit], [data-proc-edit]");
      if (procEdit && e.target.closest("#cliPerfilBody, .cli-perfil")) {
        e.stopPropagation();
        const id = procEdit.dataset.cliProcEdit || procEdit.dataset.procEdit;
        const proc = sections.find((s) => s.id === "processos")?.items.find((p) => String(p.id) === String(id));
        if (proc) openEditProcessoModal(proc);
        return;
      }
      const procCard = e.target.closest("[data-cli-proc-id], [data-proc-id], [data-agenda-proc]");
      if (procCard && !e.target.closest("[data-cli-proc-edit], [data-proc-edit]")) {
        const id = procCard.dataset.cliProcId || procCard.dataset.procId || procCard.dataset.agendaProc;
        const proc = sections.find((s) => s.id === "processos")?.items.find((p) => String(p.id) === String(id));
        if (proc) openKanbanEtapasModal(proc);
        return;
      }
      const funcNav = e.target.closest("[data-cli-func-nav]");
      if (funcNav) {
        const next = funcNav.dataset.cliFuncNav || "todos";
        cliFuncNav = cliFuncNav === next ? null : next;
        renderClientes();
        return;
      }
      const feedFilter = e.target.closest("[data-cli-feed-filter]");
      if (feedFilter) {
        cliFeedFilter = feedFilter.dataset.cliFeedFilter || "todos";
        renderClientes();
        return;
      }
      if (e.target.closest("[data-cli-feed-publish]")) {
        const c = CLIENTES.find((x) => x.id === cliPerfilId);
        if (!c) return;
        const input = document.getElementById("cliFeedInput");
        const texto = (input?.value || "").trim();
        if (!texto) return;
        const visRaw = document.getElementById("cliFeedVis")?.value || "geral";
        const vis = visRaw === "privado" ? "privado" : "geral";
        const tema = document.getElementById("cliFeedTema")?.value || "operacional";
        const posts = ensureCliFeed(c);
        posts.unshift({
          id: `${c.id}-n${Date.now()}`,
          autor: CLI_FEED_ME.nome,
          cargo: CLI_FEED_ME.cargo,
          visibilidade: vis,
          tema,
          texto,
          at: new Date(APP_TODAY.getFullYear(), APP_TODAY.getMonth(), APP_TODAY.getDate(), 17, 28),
          pinned: false,
          uteis: 0,
          utilMe: false,
        });
        renderClientes();
        return;
      }
      const feedUtil = e.target.closest("[data-cli-feed-util]");
      if (feedUtil) {
        const c = CLIENTES.find((x) => x.id === cliPerfilId);
        if (!c) return;
        const post = ensureCliFeed(c).find((p) => p.id === feedUtil.dataset.cliFeedUtil);
        if (!post) return;
        if (post.utilMe) {
          post.utilMe = false;
          post.uteis = Math.max(0, (post.uteis || 1) - 1);
        } else {
          post.utilMe = true;
          post.uteis = (post.uteis || 0) + 1;
        }
        renderClientes();
        return;
      }
      const cliEntAct = e.target.closest("[data-cli-ent-action]");
      if (cliEntAct) {
        e.stopPropagation();
        const act = cliEntAct.dataset.cliEntAction;
        const id = Number(cliEntAct.dataset.cliEntregaId);
        if (act === "baixar") {
          toast("Download do documento iniciado");
          return;
        }
        if (act === "visualizar") {
          if (id) openEntregaDetailModal(id, { clientView: true });
          else toast("Abrindo visualização do documento");
          return;
        }
        if (act === "confirmar" && id) {
          const t = agendaTasks.find((x) => x.id === id);
          if (t) {
            t.recebimentoCliente = true;
            renderClientes();
            toast("Recebimento confirmado");
          }
          return;
        }
        return;
      }
      if (e.target.closest("#cliEntregaPrev")) {
        cliEntregaMonth = new Date(cliEntregaMonth.getFullYear(), cliEntregaMonth.getMonth() - 1, 1);
        renderClientes();
        return;
      }
      if (e.target.closest("#cliEntregaNext")) {
        cliEntregaMonth = new Date(cliEntregaMonth.getFullYear(), cliEntregaMonth.getMonth() + 1, 1);
        renderClientes();
        return;
      }
      const cliEntDay = e.target.closest("[data-cli-ent-day]");
      if (cliEntDay) {
        cliEntregaSelected = cliEntDay.dataset.cliEntDay;
        cliEntregaKpiFilter = null;
        renderClientes();
        return;
      }
      const cliEntKpi = e.target.closest("[data-cli-ent-kpi]");
      if (cliEntKpi) {
        const key = cliEntKpi.dataset.cliEntKpi;
        cliEntregaKpiFilter = cliEntregaKpiFilter === key ? null : key;
        renderClientes();
        return;
      }
      if (e.target.closest("#cliEntregaKpiClear")) {
        cliEntregaKpiFilter = null;
        renderClientes();
        return;
      }
      const cliEntStatusBtn = e.target.closest("#cliEntregaStatusBtn");
      const cliEntStatusWrap = document.getElementById("cliEntregaStatusWrap");
      if (cliEntStatusBtn && cliEntStatusWrap) {
        e.stopPropagation();
        const open = !cliEntStatusWrap.classList.contains("open");
        cliEntStatusWrap.classList.toggle("open", open);
        cliEntStatusBtn.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }
      const cliEntStatusOpt = e.target.closest("#cliEntregaStatusMenu [data-cli-ent-status]");
      if (cliEntStatusOpt) {
        e.stopPropagation();
        cliEntregaStatus = cliEntStatusOpt.dataset.cliEntStatus || "";
        cliEntStatusWrap?.classList.remove("open");
        document.getElementById("cliEntregaStatusBtn")?.setAttribute("aria-expanded", "false");
        renderClientes();
        return;
      }
      const cliEntAccordToggle = e.target.closest("[data-cli-ent-accord-toggle]");
      if (cliEntAccordToggle) {
        e.preventDefault();
        e.stopPropagation();
        const key = cliEntAccordToggle.dataset.cliEntAccordToggle;
        if (!key) return;
        if (!cliEntregaAccord || typeof cliEntregaAccord !== "object") {
          cliEntregaAccord = { atrasadas: true, abertas: true, prazo: true };
        }
        cliEntregaAccord[key] = cliEntregaAccord[key] === false;
        renderClientes();
        return;
      }
      const entregaCard = e.target.closest("[data-cli-entrega-id]");
      if (entregaCard) {
        if (e.target.closest("[data-cli-ent-action]")) return;
        openEntregaDetailModal(Number(entregaCard.dataset.cliEntregaId), { clientView: isClientePortal() });
        return;
      }
      const accToggle = e.target.closest("[data-cli-proc-acc]");
      if (accToggle) {
        const item = accToggle.closest(".empresa-menu-item");
        item?.classList.toggle("open");
        accToggle.setAttribute("aria-expanded", item?.classList.contains("open") ? "true" : "false");
        return;
      }
      const tool = e.target.closest("[data-cli-tool]");
      if (tool) {
        const c = CLIENTES.find((x) => x.id === cliPerfilId);
        if (!c) return;
        if (tool.dataset.cliTool === "dados") openClienteDadosModal(c);
        else if (tool.dataset.cliTool === "cert") gotoSecurityCertForCliente(c.id);
        return;
      }
      if (e.target.closest("[data-cli-fin-import]")) {
        toast("Importação OFX iniciada");
        return;
      }
      if (e.target.closest("[data-cli-fin-filtros]")) {
        openCliFinFiltrosAvancadosModal();
        return;
      }
      const finSub = e.target.closest("[data-cli-fin-sub]");
      if (finSub) {
        const sub = finSub.dataset.cliFinSub || "conciliacao";
        if (sub === "auditoria") {
          openFinModuleAudit("cartoes");
          return;
        }
        if (sub === "receber" || sub === "pagar") {
          openFinModuleTitulos(sub);
          return;
        }
        if (sub === "conciliacao") {
          openFinModuleConciliacao();
          return;
        }
        if (sub === "plano") {
          openFinModulePlano();
          return;
        }
        cliFinSubTab = sub;
        cliFinTituloStatusFiltro = "";
        document.getElementById("cliFinTitFilterWrap")?.classList.remove("open");
        renderClientes();
        return;
      }
      const cliAuditAct = e.target.closest("[data-cli-fin-audit]");
      if (cliAuditAct) {
        const act = cliAuditAct.dataset.cliFinAudit;
        if (act === "import") {
          syncFinEmpresaFromCliente(cliPerfilId);
          finDash.cartoes.imported = true;
          finDash.cartoes.dragging = false;
          cliFinAudit.fileName = cliFinAudit.fileName || "planilha-vendas.xlsx";
          cliFinAudit.modalTab = "relatorio";
          upsertCliFinAuditHistoryOnImport();
          openCliFinAuditModal();
          toast("Planilha processada — abrindo auditoria");
          return;
        }
        if (act === "rules") {
          openFinModuleAudit("config");
          return;
        }
        return;
      }
      const cliAuditHist = e.target.closest("[data-cli-fin-audit-history]");
      if (cliAuditHist) {
        openCliFinAuditFromHistory(cliAuditHist.dataset.cliFinAuditHistory);
        return;
      }
      const cliDelAcq = e.target.closest("[data-fin-cfg-del-acq]");
      if (cliDelAcq && cliFinSubTab === "auditoria" && !cliFinAudit.rulesModalOpen) {
        const id = cliDelAcq.dataset.finCfgDelAcq;
        finDash.config.adquirentes = ensureFinAdquirentes().filter((a) => a.id !== id);
        if (ensureAcqFormState().editingId === id) resetAcqForm();
        toast("Acordo removido");
        renderClientes();
        return;
      }
      if (handleFinAcqUiEvent(e)) return;
      const finDashBtn = e.target.closest("[data-cli-fin-dash]");
      if (finDashBtn) {
        const c = CLIENTES.find((x) => x.id === cliPerfilId);
        if (!c) return;
        openCliFinDashboardHtml(c);
        return;
      }
      const finReportAct = e.target.closest("[data-cli-fin-report]");
      if (finReportAct) {
        const act = finReportAct.dataset.cliFinReport;
        const c = CLIENTES.find((x) => x.id === cliPerfilId);
        if (!c) return;
        if (act === "gerar") {
          openCliFinRelatorioModal(c);
          return;
        }
        if (act === "export-html") {
          downloadCliFinRelatorioHtml(c);
          return;
        }
        if (act === "print") {
          printCliFinRelatorio(c);
          return;
        }
        return;
      }
      if (handleFinTitulosToolbarClick(e)) return;
      if (handleFinTitulosRowAction(e)) return;
      const planoAction = e.target.closest("[data-cli-fin-plano]");
      if (planoAction || e.target.closest("[data-fin-plano-open]") || e.target.closest("[data-fin-plano-toggle]") || e.target.closest("[data-fin-plano-conta]") || e.target.closest("[data-fin-plano-flag]")) {
        if (handleFinPlanoContasClick(e)) return;
      }
      if (e.target.closest("[data-cli-honor-add]")) {
        const c = CLIENTES.find((x) => x.id === cliPerfilId);
        if (!c) return;
        const origem = document.getElementById("cliHonorOrigem")?.value?.trim();
        const valor = parseHonorValor(document.getElementById("cliHonorValor")?.value);
        const recorrencia = document.getElementById("cliHonorRecorrencia")?.value || "mensal";
        if (!origem) {
          toast("Selecione a origem");
          return;
        }
        if (!Number.isFinite(valor) || valor <= 0) {
          toast("Informe um valor válido");
          return;
        }
        const list = ensureCliHonorarios(c);
        list.push({
          id: "h" + Date.now().toString(36),
          origem,
          valor,
          recorrencia,
          criado: new Date().toLocaleDateString("pt-BR"),
        });
        renderClientes();
        toast("Honorário adicionado");
        return;
      }
      if (e.target.closest("[data-cli-honor-refresh]")) {
        const now = new Date();
        cliHonorRelatorioAtualizado = now.toLocaleDateString("pt-BR") + " " + now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
        renderClientes();
        toast("Relatório de honorários atualizado");
        return;
      }
      const action = e.target.closest("[data-cli-action]");
      if (action) {
        const kind = action.dataset.cliAction;
        if (kind === "iniciar-obrigacoes") {
          openRegerarObrigacoesModal();
          return;
        }
        if (kind === "obrigacao-interna") {
          openModal({
            title: "Obrigação interna",
            sub: CLIENTES.find((x) => x.id === cliPerfilId)?.fantasia || "Cliente",
            body: `
              <label>Título</label>
              <input id="cliObrIntTitulo" placeholder="Ex.: Checklist interno mensal" />
              <label>Responsável</label>
              <input id="cliObrIntResp" value="Ana Costa" />
              <label>Observações</label>
              <textarea id="cliObrIntObs" placeholder="Detalhes da obrigação interna"></textarea>`,
            foot: `
              <button type="button" class="btn-ghost" data-close>Cancelar</button>
              <button type="button" class="btn-primary" id="cliObrIntSave">Criar</button>`,
          });
          document.getElementById("cliObrIntSave")?.addEventListener("click", () => {
            const titulo = document.getElementById("cliObrIntTitulo")?.value?.trim() || "Obrigação interna";
            const resp = document.getElementById("cliObrIntResp")?.value?.trim() || "Ana Costa";
            obrigacoesItems.push({
              title: titulo,
              meta: `Exclusiva · ${resp}`,
              dept: "Obrigação interna",
              grupo: false,
              interna: true,
            });
            closeModal();
            cliPerfilTab = "obrigacoes";
            renderClientes();
            toast("Obrigação interna criada");
          });
        }
      }
    });

    document.getElementById("clientesWrap")?.addEventListener("input", (e) => {
      if (liveApplyFinTitulosFiltrosFromEvent(e)) return;
      if (handleCliXmlModInput(e)) return;
      if (e.target.id === "cliEntregaSearch") {
        const pos = e.target.selectionStart;
        cliEntregaQuery = e.target.value || "";
        renderClientes();
        const el = document.getElementById("cliEntregaSearch");
        if (el) {
          el.focus();
          try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
        return;
      }
      if (e.target.id === "cliProcSearch") {
        cliProcFiltros.search = e.target.value || "";
        renderClientes();
        return;
      }
      if (e.target.id === "cliFinValor" || e.target.id === "cliFinIdTitulo") {
        const id = e.target.id;
        const pos = e.target.selectionStart;
        syncCliFinQuickFiltrosFromDom();
        renderClientes();
        const el = document.getElementById(id);
        if (el) {
          el.focus();
          try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
        return;
      }
      if (e.target.id === "cliFinPlanoSearch") {
        const pos = e.target.selectionStart;
        cliFinPlanoQuery = e.target.value || "";
        const inFinPlano = finDash.tab === "plano"
          && document.getElementById("financeiroWrap")?.classList.contains("show");
        if (inFinPlano) renderFinModuleDash();
        else renderClientes();
        const el = document.getElementById("cliFinPlanoSearch");
        if (el) {
          el.focus();
          try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
        return;
      }
      if (e.target.id === "finPlanoContasSearch") {
        const pos = e.target.selectionStart;
        ensureFinPlanoContasState().qContas = e.target.value || "";
        refreshFinPlanoUi();
        const el = document.getElementById("finPlanoContasSearch");
        if (el) {
          el.focus();
          try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
      }
    });

    document.getElementById("clientesWrap")?.addEventListener("change", (e) => {
      if (e.target.id?.startsWith("cliXmlFiltro") || e.target.matches?.("[data-cli-xml-cfg]")) {
        if (handleCliXmlModInput(e)) return;
      }
      if (handleCliFinTitCheckChange(e)) return;
      if (e.target.id === "cliDocsUploadInput") {
        const files = e.target.files;
        e.target.value = "";
        if (files?.length) ingestCliDocsUpload(files);
        return;
      }
      if (e.target.id === "cliRegimeFilter") {
        cliRegimeFilter = e.target.value || "";
        renderClientesList();
        return;
      }
      if (e.target.id === "cliFinAuditPeriod") {
        cliFinAudit.period = e.target.value || "mes";
        if (cliFinAudit.period === "mes") {
          cliFinAudit.dateFrom = "2026-07-01";
          cliFinAudit.dateTo = "2026-07-31";
        } else if (cliFinAudit.period === "30d") {
          cliFinAudit.dateFrom = "2026-06-15";
          cliFinAudit.dateTo = "2026-07-14";
        }
        renderClientes();
        return;
      }
      if (e.target.id === "cliFinAuditHistoryMonth") {
        cliFinAudit.historyMonth = e.target.value || "";
        refreshCliFinAuditHistoryView();
        return;
      }
      if (e.target.id === "cliFinAuditBaseDateFrom" || e.target.id === "cliFinAuditBaseDateTo") {
        if (e.target.id === "cliFinAuditBaseDateFrom") cliFinAudit.dateFrom = e.target.value || "";
        if (e.target.id === "cliFinAuditBaseDateTo") cliFinAudit.dateTo = e.target.value || "";
        cliFinAudit.period = "custom";
        renderClientes();
        return;
      }
      if (e.target.id === "cliProcDept") {
        cliProcFiltros.dept = e.target.value || "";
        renderClientes();
        return;
      }
      if (e.target.id === "cliProcResp") {
        cliProcFiltros.responsavel = e.target.value || "";
        renderClientes();
        return;
      }
      if (e.target.id === "cliFinTipo" || e.target.id === "cliFinStatus") {
        syncCliFinQuickFiltrosFromDom();
        renderClientes();
      }
    });

    document.getElementById("financeiroWrap")?.addEventListener("click", (e) => {
      const closeFinTabBtn = e.target.closest("[data-fin-close-tab]");
      if (closeFinTabBtn) {
        e.stopPropagation();
        closeFinTab(closeFinTabBtn.dataset.finCloseTab);
        return;
      }
      const addFinTabBtn = e.target.closest("[data-fin-add-tab]");
      if (addFinTabBtn) {
        toggleFinPagesMenu(false);
        addFinTab(addFinTabBtn.dataset.finAddTab);
        return;
      }
      if (e.target.closest("#finPagesBtn")) {
        e.stopPropagation();
        toggleFinPagesMenu();
        return;
      }
      if (!e.target.closest("#finPagesWrap")) {
        toggleFinPagesMenu(false);
      }
      if (!e.target.closest(".fin-nav-group")) {
        closeFinNavMenus();
      }
      const navToggle = e.target.closest("[data-fin-nav-toggle]");
      if (navToggle) {
        e.preventDefault();
        e.stopPropagation();
        const group = navToggle.closest(".fin-nav-group");
        const wasOpen = group?.classList.contains("open");
        closeFinNavMenus();
        if (group && !wasOpen) {
          group.classList.add("open");
          navToggle.setAttribute("aria-expanded", "true");
          positionFinNavMenu(group);
        }
        return;
      }
      const tabBtn = e.target.closest("[data-fin-tab]");
      if (tabBtn) {
        goFinNavTab(tabBtn.dataset.finTab || "dashboard", tabBtn.dataset.finCfgSec);
        return;
      }
      const reportTabBtn = e.target.closest("[data-fin-report-tab]");
      if (reportTabBtn) {
        const next = reportTabBtn.dataset.finReportTab || "visao";
        if (finDash.reportTab === next) return;
        closeFinDrawer();
        if (finDash.tab === "dashboard" && document.querySelector("[data-fin-report-panel]")) {
          switchFinReportTab(next);
        } else {
          finDash.reportTab = next;
          renderFinModuleDash();
        }
        return;
      }
      const finEmpBtn = e.target.closest("#finEmpresaSelectBtn");
      if (finEmpBtn) {
        e.preventDefault();
        e.stopPropagation();
        if (Date.now() < (finDash._clientPickLockUntil || 0)) return;
        toggleFinEmpresaMenu();
        return;
      }
      if (e.target.closest("#finEmpresaSearch") || e.target.closest("#finEmpresaMenu .empresa-search")) {
        e.stopPropagation();
        return;
      }
      /* Seleção de cliente: tratada em mousedown (evita race com document click). */
      const action = e.target.closest("[data-fin-dash]");
      if (action) {
        const act = action.dataset.finDash;
        if (act === "limpar") {
          finDash.empresaId = "all";
          finDash.unidade = "all";
          finDash.empresaQuery = "";
          finDash.period = "mes";
          finDash.periodFrom = "";
          finDash.periodTo = "";
          finDash.receitaFilter = "";
          finDash.acOpen = false;
          finDash.tab = "dashboard";
          finDash.reportTab = "visao";
          finDash.titulosSub = "pagar";
          finDash.conc = { tipo: "", valor: "", idTitulo: "", status: "", catRowId: null, categories: {}, movs: null };
          finDash.cartoes = {
            imported: false,
            dragging: false,
            filterOpen: null,
            filters: {
              dataHora: "", bandeira: "", tipo: "", bruto: "", prev: "", real: "", diff: "", parcelas: "", selo: "",
            },
          };
          finDash.cobrancas = {
            lado: "receber",
            status: "",
            form: { sacado: "", valor: "", vencimento: "", desc: "" },
            titulos: null,
            syncingId: null,
          };
          finDash.folha = {
            imported: false,
            filterOpen: null,
            filters: { funcionario: "", base: "", pago: "", variacao: "" },
          };
          finDash.config = {
            section: "adquirentes",
            editingGroupId: null,
            editingLeafId: null,
            newGroupLabel: "",
            newLeafLabel: "",
            plano: null,
            adquirentes: null,
            acqForm: {
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
            },
          };
          closeFinDrawer();
          renderFinModuleDash();
          toast("Filtros limpos");
          return;
        }
        if (act === "reload") {
          finDash.acOpen = false;
          renderFinModuleDash();
          toast(isFinAllClientsScope() ? "Visão consolidada recarregada" : "Dados recarregados");
        }
        return;
      }
      if (e.target.closest("[data-fin-conc-import]")) {
        openFinConcOfxPickModal();
        return;
      }
      const concCtx = e.target.closest("[data-fin-conc-ctx]");
      if (concCtx) {
        const v = concCtx.dataset.finConcCtx;
        if (v === "financeiro" || v === "contabil") {
          finDash.conc.contexto = v;
          finDash.conc.contextoOpen = false;
          renderFinModuleDash();
          toast(`Contexto: ${v === "financeiro" ? "Financeiro" : "Contábil"}`);
        } else if (v === "exibir") {
          finDash.conc.contextoOpen = false;
          renderFinModuleDash();
          openFinConcContextoModal();
        } else if (v === "banco") {
          finDash.conc.contextoOpen = false;
          renderFinModuleDash();
          finDash.conc.bancoPickId = finDash.conc.bancoId || ensureFinConcBancos()[0]?.id;
          finDash.conc.bancoPickPadrao = finDash.conc.bancoPadraoId === finDash.conc.bancoPickId;
          openFinConcSelecionarBancoModal();
        }
        return;
      }
      const concAct = e.target.closest("[data-fin-conc]");
      if (concAct) {
        const act = concAct.dataset.finConc;
        if (act === "ctx-toggle") {
          finDash.conc.contextoOpen = !finDash.conc.contextoOpen;
          renderFinModuleDash();
        } else if (act === "finalizar") {
          openFinConcFinalizarMesModal();
        } else if (act === "regras") {
          openFinConcRegrasModal();
        } else if (act === "matching") {
          openFinConcMatchingModal();
        } else if (act === "export") {
          openFinConcOfxExportModal();
        } else if (act === "excel") {
          toast("Modelo de planilha de conciliação");
        } else if (act === "add") {
          openFinConcAddModal();
        } else if (act === "filters") {
          finDash.conc.filtersOpen = !finDash.conc.filtersOpen;
          renderFinModuleDash();
        } else if (act === "filters-close") {
          finDash.conc.filtersOpen = false;
          renderFinModuleDash();
        } else if (act === "filters-clear") {
          finDash.conc.tipo = "";
          finDash.conc.valor = "";
          finDash.conc.idTitulo = "";
          finDash.conc.filtersOpen = true;
          renderFinModuleDash();
        }
        return;
      }
      const concStatus = e.target.closest("[data-fin-conc-status]");
      if (concStatus) {
        finDash.conc.status = concStatus.dataset.finConcStatus || "";
        finDash.conc.catRowId = null;
        renderFinModuleDash();
        return;
      }
      const concVincular = e.target.closest("[data-fin-conc-vincular]");
      if (concVincular) {
        finDash.conc.rowMenuId = null;
        const id = concVincular.dataset.finConcVincular;
        if (id) openFinConcVincularTituloModal(id);
        return;
      }
      const concRowMenu = e.target.closest("[data-fin-conc-row-menu]");
      if (concRowMenu) {
        e.preventDefault();
        e.stopPropagation();
        const id = concRowMenu.dataset.finConcRowMenu;
        finDash.conc.rowMenuId = finDash.conc.rowMenuId === id ? null : id;
        renderFinModuleDash();
        return;
      }
      const concHist = e.target.closest("[data-fin-conc-hist]");
      if (concHist) {
        finDash.conc.rowMenuId = null;
        const id = concHist.dataset.finConcHist;
        if (id) openFinConcHistoricoModal(id);
        return;
      }
      const concDes = e.target.closest("[data-fin-conc-desconciliar]");
      if (concDes) {
        finDash.conc.rowMenuId = null;
        const id = concDes.dataset.finConcDesconciliar;
        if (id) openFinConcDesconciliarModal(id);
        return;
      }
      const concExcluir = e.target.closest("[data-fin-conc-excluir]");
      if (concExcluir) {
        finDash.conc.rowMenuId = null;
        const id = concExcluir.dataset.finConcExcluir;
        if (id) openFinConcExcluirModal(id);
        return;
      }
      const concGerar = e.target.closest("[data-fin-conc-gerar]");
      if (concGerar) {
        finDash.conc.rowMenuId = null;
        const id = concGerar.dataset.finConcGerar;
        if (id) openFinConcGerarTituloModal(id, { fromOfx: false });
        return;
      }
      const catToggle = e.target.closest("[data-fin-cat-toggle]");
      if (catToggle) {
        const id = catToggle.dataset.finCatToggle;
        finDash.conc.catRowId = finDash.conc.catRowId === id ? null : id;
        renderFinModuleDash();
        return;
      }
      const catPick = e.target.closest("[data-fin-cat-pick]");
      if (catPick) {
        const rowId = catPick.dataset.finCatPick;
        const catId = catPick.dataset.finCatId;
        if (rowId && catId) {
          finDash.conc.categories[rowId] = catId;
          finDash.conc.catRowId = null;
          renderFinModuleDash();
          toast(`Categorizado: ${finDreCatLabel(catId)}`);
        }
        return;
      }
      const finAuditAct = e.target.closest("[data-cli-fin-audit]");
      if (finAuditAct) {
        const act = finAuditAct.dataset.cliFinAudit;
        if (act === "import") {
          finDash.cartoes.imported = true;
          finDash.cartoes.dragging = false;
          cliFinAudit.fileName = cliFinAudit.fileName || "planilha-vendas.xlsx";
          cliFinAudit.modalTab = "relatorio";
          upsertCliFinAuditHistoryOnImport();
          openCliFinAuditModal();
          toast("Planilha processada — abrindo auditoria");
          return;
        }
        if (act === "rules") {
          finDash.tab = "config";
          finDash.config.section = "adquirentes";
          ensureFinOpenTabs();
          renderFinModuleDash();
          toast("Regras e Adquirentes");
          return;
        }
        return;
      }
      const finAuditHist = e.target.closest("[data-cli-fin-audit-history]");
      if (finAuditHist) {
        openCliFinAuditFromHistory(finAuditHist.dataset.cliFinAuditHistory);
        return;
      }
      const titulosTab = e.target.closest("[data-fin-titulos-tab]");
      if (titulosTab) {
        const next = titulosTab.dataset.finTitulosTab === "receber" ? "receber" : "pagar";
        if (finDash.titulosSub === next) return;
        finDash.titulosSub = next;
        clearFinTitulosFiltros();
        cliFinTituloSelectedIds = new Set();
        renderFinModuleDash();
        return;
      }
      if (handleFinTitulosToolbarClick(e)) return;
      if (handleFinTitulosRowAction(e)) return;
      const planoAction = e.target.closest("[data-cli-fin-plano]");
      if (planoAction || e.target.closest("[data-fin-plano-open]") || e.target.closest("[data-fin-plano-toggle]") || e.target.closest("[data-fin-plano-conta]") || e.target.closest("[data-fin-plano-flag]")) {
        if (handleFinPlanoContasClick(e)) return;
      }
      const cartaoAct = e.target.closest("[data-fin-cartao]");
      if (cartaoAct) {
        const act = cartaoAct.dataset.finCartao;
        if (act === "import") {
          finDash.cartoes.imported = true;
          finDash.cartoes.dragging = false;
          cliFinAudit.fileName = cliFinAudit.fileName || "planilha-vendas.xlsx";
          cliFinAudit.modalTab = "relatorio";
          openCliFinAuditModal();
          toast("Planilha processada — abrindo auditoria");
        } else if (act === "reimport") {
          finDash.cartoes.imported = false;
          finDash.cartoes.dragging = false;
          finDash.cartoes.filterOpen = null;
          renderFinModuleDash();
        }
        return;
      }
      const cartaoFilterBtn = e.target.closest("[data-fin-cartao-filter]");
      if (cartaoFilterBtn) {
        const key = cartaoFilterBtn.dataset.finCartaoFilter;
        finDash.cartoes.filterOpen = finDash.cartoes.filterOpen === key ? null : key;
        renderFinModuleDash();
        const input = document.querySelector(`[data-fin-cartao-filter-input="${key}"]`);
        if (input) {
          input.focus();
          const pos = input.value.length;
          try { input.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
        return;
      }
      const cartaoFilterSet = e.target.closest("[data-fin-cartao-filter-set]");
      if (cartaoFilterSet) {
        const key = cartaoFilterSet.dataset.finCartaoFilterSet;
        finDash.cartoes.filters[key] = cartaoFilterSet.dataset.value || "";
        finDash.cartoes.filterOpen = null;
        renderFinModuleDash();
        return;
      }
      if (finDash.cartoes.filterOpen && !e.target.closest(".fin-th-filter")) {
        finDash.cartoes.filterOpen = null;
        renderFinModuleDash();
        return;
      }
      const cobLado = e.target.closest("[data-fin-cob-lado]");
      if (cobLado) {
        finDash.cobrancas.lado = cobLado.dataset.finCobLado || "receber";
        renderFinModuleDash();
        return;
      }
      const cobAct = e.target.closest("[data-fin-cob]");
      if (cobAct && cobAct.dataset.finCob === "emit") {
        e.preventDefault();
        const sacado = (document.getElementById("finEmitSacado")?.value || "").trim();
        const valorRaw = document.getElementById("finEmitValor")?.value || "";
        const venc = document.getElementById("finEmitVenc")?.value || "";
        const desc = (document.getElementById("finEmitDesc")?.value || "").trim();
        const valor = parseFinValorInput(valorRaw);
        if (!sacado || !venc || !desc || !Number.isFinite(valor) || valor <= 0) {
          toast("Preencha sacado, valor, vencimento e descrição");
          return;
        }
        const id = `t${Date.now()}`;
        const nn = String(13000 + (ensureFinTitulos().length % 900)).padStart(8, "0");
        ensureFinTitulos().unshift({
          id,
          lado: "receber",
          sacado,
          valor,
          vencimento: formatFinDateBR(venc),
          desc,
          status: "pendente",
          nossoNumero: nn,
        });
        finDash.cobrancas.form = { sacado: "", valor: "", vencimento: "", desc: "" };
        finDash.cobrancas.lado = "receber";
        finDash.cobrancas.syncingId = id;
        renderFinModuleDash();
        toast("Boleto emitido — sincronizando Sicredi…");
        setTimeout(() => {
          if (finDash.cobrancas.syncingId === id) {
            finDash.cobrancas.syncingId = null;
            if (finDash.tab === "cobrancas") renderFinModuleDash();
            toast("Título sincronizado no Sicredi");
          }
        }, 1600);
        return;
      }
      const folhaAct = e.target.closest("[data-fin-folha]");
      if (folhaAct) {
        const act = folhaAct.dataset.finFolha;
        if (act === "import") {
          finDash.folha.imported = true;
          finDash.folha.filterOpen = null;
          renderFinModuleDash();
          toast("Folha importada — variações calculadas");
        } else if (act === "clear") {
          finDash.folha.imported = false;
          finDash.folha.filterOpen = null;
          finDash.folha.filters = { funcionario: "", base: "", pago: "", variacao: "" };
          renderFinModuleDash();
        }
        return;
      }
      const folhaFilterBtn = e.target.closest("[data-fin-folha-filter]");
      if (folhaFilterBtn) {
        const key = folhaFilterBtn.dataset.finFolhaFilter;
        finDash.folha.filterOpen = finDash.folha.filterOpen === key ? null : key;
        renderFinModuleDash();
        const input = document.querySelector(`[data-fin-folha-filter-input="${key}"]`);
        if (input) {
          input.focus();
          const pos = input.value.length;
          try { input.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
        return;
      }
      const folhaFilterSet = e.target.closest("[data-fin-folha-filter-set]");
      if (folhaFilterSet) {
        const key = folhaFilterSet.dataset.finFolhaFilterSet;
        finDash.folha.filters[key] = folhaFilterSet.dataset.value || "";
        finDash.folha.filterOpen = null;
        renderFinModuleDash();
        return;
      }
      if (finDash.folha.filterOpen && !e.target.closest(".fin-th-filter")) {
        finDash.folha.filterOpen = null;
        renderFinModuleDash();
        return;
      }
      const cfgSec = e.target.closest("[data-fin-cfg-sec]");
      if (cfgSec) {
        finDash.config.section = cfgSec.dataset.finCfgSec || "plano";
        renderFinModuleDash();
        return;
      }
      const cfgAct = e.target.closest("[data-fin-cfg]");
      if (cfgAct) {
        const act = cfgAct.dataset.finCfg;
        if (act === "add-group") {
          const label = (document.getElementById("finCfgNewGroup")?.value || finDash.config.newGroupLabel || "").trim();
          if (!label) { toast("Informe o nome da categoria"); return; }
          const plano = getFinDreTaxonomy();
          const id = `g${Date.now().toString(36)}`;
          plano.push({ id, label, tipo: "debito", children: [] });
          finDash.config.newGroupLabel = "";
          renderFinModuleDash();
          toast("Categoria adicionada ao plano de contas");
          return;
        }
        if (act === "save-acq") {
          if (saveCliFinAcqFromDom()) renderFinModuleDash();
          return;
        }
        return;
      }
      const cfgAddLeaf = e.target.closest("[data-fin-cfg-add-leaf]");
      if (cfgAddLeaf) {
        const gid = cfgAddLeaf.dataset.finCfgAddLeaf;
        const input = document.querySelector(`[data-fin-cfg-leaf-input="${gid}"]`);
        const label = (input?.value || "").trim();
        if (!label) { toast("Informe a subcategoria"); return; }
        const group = getFinDreTaxonomy().find((g) => g.id === gid);
        if (!group) return;
        group.children = group.children || [];
        group.children.push({ id: `${gid}-${Date.now().toString(36)}`, label });
        if (input) input.value = "";
        renderFinModuleDash();
        toast("Subcategoria incluída");
        return;
      }
      const cfgDelLeaf = e.target.closest("[data-fin-cfg-del-leaf]");
      if (cfgDelLeaf) {
        const [gid, lid] = (cfgDelLeaf.dataset.finCfgDelLeaf || "").split(":");
        const group = getFinDreTaxonomy().find((g) => g.id === gid);
        if (group) group.children = (group.children || []).filter((c) => c.id !== lid);
        renderFinModuleDash();
        return;
      }
      const cfgDelGroup = e.target.closest("[data-fin-cfg-del-group]");
      if (cfgDelGroup) {
        const gid = cfgDelGroup.dataset.finCfgDelGroup;
        const plano = getFinDreTaxonomy();
        const idx = plano.findIndex((g) => g.id === gid);
        if (idx >= 0) plano.splice(idx, 1);
        renderFinModuleDash();
        toast("Categoria removida");
        return;
      }
      const cfgDelAcq = e.target.closest("[data-fin-cfg-del-acq]");
      if (cfgDelAcq) {
        const id = cfgDelAcq.dataset.finCfgDelAcq;
        finDash.config.adquirentes = ensureFinAdquirentes().filter((a) => a.id !== id);
        if (ensureAcqFormState().editingId === id) resetAcqForm();
        toast("Acordo removido");
        renderFinModuleDash();
        return;
      }
      if (handleFinAcqUiEvent(e)) return;
      if (finDash.conc.catRowId && !e.target.closest(".fin-cat-cell")) {
        finDash.conc.catRowId = null;
        renderFinModuleDash();
        return;
      }
      const clearRec = e.target.closest("[data-fin-clear-receita]");
      if (clearRec) {
        finDash.receitaFilter = "";
        renderFinModuleDash();
        toast("Filtro de receita removido");
        return;
      }
      const receita = e.target.closest("[data-fin-receita]");
      if (receita) {
        const id = receita.dataset.finReceita || "";
        finDash.receitaFilter = finDash.receitaFilter === id ? "" : id;
        renderFinModuleDash();
        toast(finDash.receitaFilter ? "Filtro cruzado aplicado" : "Filtro de receita removido");
        return;
      }
      const dreToggle = e.target.closest("[data-fin-dre-toggle]");
      if (dreToggle) {
        const id = dreToggle.dataset.finDreToggle;
        finDash.dreOpen[id] = !finDash.dreOpen[id];
        renderFinModuleDash();
        return;
      }
      const drill = e.target.closest("[data-fin-drill]");
      if (drill) {
        openFinDrawer(drill.dataset.finDrill, getFinDashData());
        return;
      }
      const opsDetail = e.target.closest("[data-fin-ops-detail]");
      if (opsDetail) {
        openFinDrawer(opsDetail.dataset.finOpsDetail, getFinDashData());
      }
    });

    document.getElementById("finDrawerClose")?.addEventListener("click", () => closeFinDrawer());
    document.getElementById("finDrawerBackdrop")?.addEventListener("click", () => closeFinDrawer());
    document.getElementById("cliDrawerClose")?.addEventListener("click", () => {
      closeCliClienteDrawer();
      if (cliView === "lista") renderClientesList();
    });
    document.getElementById("cliDrawerBackdrop")?.addEventListener("click", () => {
      closeCliClienteDrawer();
      if (cliView === "lista") renderClientesList();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && finDash.drawer) closeFinDrawer();
      if (e.key === "Escape" && cliDrawerOpen) {
        closeCliClienteDrawer();
        if (cliView === "lista") renderClientesList();
      }
      if (e.key === "Escape" && finDash.conc?.catRowId) {
        finDash.conc.catRowId = null;
        renderFinModuleDash();
      }
    });

    document.getElementById("financeiroWrap")?.addEventListener("input", (e) => {
      if (liveApplyFinTitulosFiltrosFromEvent(e)) return;
      if (e.target.id === "cliFinPlanoSearch") {
        const pos = e.target.selectionStart;
        cliFinPlanoQuery = e.target.value || "";
        renderFinModuleDash();
        const el = document.getElementById("cliFinPlanoSearch");
        if (el) {
          el.focus();
          try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
        return;
      }
      if (e.target.id === "finPlanoContasSearch") {
        const pos = e.target.selectionStart;
        ensureFinPlanoContasState().qContas = e.target.value || "";
        refreshFinPlanoUi();
        const el = document.getElementById("finPlanoContasSearch");
        if (el) {
          el.focus();
          try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
        return;
      }
      if (e.target.id === "finEmpresaSearch") {
        finDash.empresaQuery = e.target.value || "";
        scheduleFinClientAcRefresh();
        return;
      }
      if (e.target.id === "finConcQ") {
        finDash.conc.q = e.target.value || "";
        const pos = e.target.selectionStart;
        renderFinModuleDash();
        const el = document.getElementById("finConcQ");
        if (el) {
          el.focus();
          try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
        return;
      }
      if (e.target.id === "finConcValor") {
        finDash.conc.valor = e.target.value || "";
        finDash.conc.filtersOpen = true;
        const pos = e.target.selectionStart;
        renderFinModuleDash();
        const el = document.getElementById("finConcValor");
        if (el) {
          el.focus();
          try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
        return;
      }
      if (e.target.id === "finConcIdTitulo") {
        finDash.conc.idTitulo = e.target.value || "";
        finDash.conc.filtersOpen = true;
        const pos = e.target.selectionStart;
        renderFinModuleDash();
        const el = document.getElementById("finConcIdTitulo");
        if (el) {
          el.focus();
          try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
        return;
      }
      const cartaoFilterInput = e.target.closest("[data-fin-cartao-filter-input]");
      if (cartaoFilterInput) {
        const key = cartaoFilterInput.dataset.finCartaoFilterInput;
        finDash.cartoes.filters[key] = cartaoFilterInput.value || "";
        const pos = cartaoFilterInput.selectionStart;
        if (cliFinAudit.modalOpen) refreshCliFinAuditModal();
        else renderFinModuleDash();
        const el = (cliFinAudit.modalOpen ? modalBody : document).querySelector(`[data-fin-cartao-filter-input="${key}"]`);
        if (el) {
          el.focus();
          try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
        return;
      }
      const folhaFilterInput = e.target.closest("[data-fin-folha-filter-input]");
      if (folhaFilterInput) {
        const key = folhaFilterInput.dataset.finFolhaFilterInput;
        finDash.folha.filters[key] = folhaFilterInput.value || "";
        const pos = folhaFilterInput.selectionStart;
        renderFinModuleDash();
        const el = document.querySelector(`[data-fin-folha-filter-input="${key}"]`);
        if (el) {
          el.focus();
          try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
        return;
      }
      if (e.target.id === "finEmitSacado") finDash.cobrancas.form.sacado = e.target.value || "";
      else if (e.target.id === "finEmitValor") finDash.cobrancas.form.valor = e.target.value || "";
      else if (e.target.id === "finEmitVenc") finDash.cobrancas.form.vencimento = e.target.value || "";
      else if (e.target.id === "finEmitDesc") finDash.cobrancas.form.desc = e.target.value || "";
      if (e.target.id === "finCfgNewGroup") finDash.config.newGroupLabel = e.target.value || "";
    });

    document.getElementById("financeiroWrap")?.addEventListener("change", (e) => {
      if (liveApplyFinTitulosFiltrosFromEvent(e)) return;
    });

    document.getElementById("clientesWrap")?.addEventListener("change", (e) => {
      if (liveApplyFinTitulosFiltrosFromEvent(e)) return;
    });

    document.getElementById("financeiroWrap")?.addEventListener("focusin", (e) => {
      if (e.target.id !== "finEmpresaSearch") return;
      if (!finDash.acOpen) toggleFinEmpresaMenu(true);
    });

    document.addEventListener("mousedown", (e) => {
      const finEmpOpt = e.target.closest("#financeiroWrap [data-fin-empresa-opt]");
      if (finEmpOpt) {
        e.preventDefault();
        e.stopPropagation();
        if (finEmpOpt.classList.contains("hidden")) return;
        applyFinClientScope(finEmpOpt.dataset.finEmpresaOpt || "all");
        return;
      }
      if (!finDash.acOpen) return;
      const wrap = document.getElementById("finEmpresaWrap");
      if (!wrap) return;
      if (wrap.contains(e.target)) return;
      finDash.acOpen = false;
      wrap.classList.remove("open");
      document.getElementById("finEmpresaSelectBtn")?.setAttribute("aria-expanded", "false");
    });

    (function bindCliDocsDrop() {
      const wrap = document.getElementById("clientesWrap");
      if (!wrap || wrap.dataset.cliDocsDropBound) return;
      wrap.dataset.cliDocsDropBound = "1";
      let dragDepth = 0;
      wrap.addEventListener("dragenter", (e) => {
        const zone = e.target.closest("[data-cli-docs-drop]");
        if (!zone) return;
        e.preventDefault();
        dragDepth += 1;
        zone.classList.add("is-drag");
      });
      wrap.addEventListener("dragover", (e) => {
        if (!e.target.closest("[data-cli-docs-drop]")) return;
        e.preventDefault();
      });
      wrap.addEventListener("dragleave", (e) => {
        const zone = e.target.closest("[data-cli-docs-drop]");
        if (!zone) return;
        dragDepth = Math.max(0, dragDepth - 1);
        if (!zone.contains(e.relatedTarget)) {
          dragDepth = 0;
          zone.classList.remove("is-drag");
        }
      });
      wrap.addEventListener("drop", (e) => {
        const zone = e.target.closest("[data-cli-docs-drop]");
        if (!zone) return;
        e.preventDefault();
        dragDepth = 0;
        zone.classList.remove("is-drag");
        ingestCliDocsUpload(e.dataTransfer?.files);
      });
    })();

    (function bindFinCartaoDrop() {
      const bindDropHost = (wrap) => {
        if (!wrap) return;
        wrap.addEventListener("dragenter", (e) => {
          if (!e.target.closest("[data-fin-cartao-drop]")) return;
          e.preventDefault();
          if (!finDash.cartoes.dragging) {
            finDash.cartoes.dragging = true;
            e.target.closest("[data-fin-cartao-drop]")?.classList.add("is-drag");
          }
        });
        wrap.addEventListener("dragover", (e) => {
          if (!e.target.closest("[data-fin-cartao-drop]")) return;
          e.preventDefault();
        });
        wrap.addEventListener("dragleave", (e) => {
          const hub = e.target.closest("[data-fin-cartao-drop]");
          if (!hub) return;
          if (hub.contains(e.relatedTarget)) return;
          finDash.cartoes.dragging = false;
          hub.classList.remove("is-drag");
        });
        wrap.addEventListener("drop", (e) => {
          if (!e.target.closest("[data-fin-cartao-drop]")) return;
          e.preventDefault();
          finDash.cartoes.dragging = false;
          finDash.cartoes.imported = true;
          const file = e.dataTransfer?.files?.[0];
          const openLaudo = !!e.target.closest("[data-cli-fin-audit-drop]")
            || finDash.tab === "cartoes"
            || (cliPerfilTab === "financeiro" && cliFinSubTab === "auditoria");
          if (openLaudo) {
            cliFinAudit.fileName = file?.name || "planilha-vendas.xlsx";
            cliFinAudit.modalTab = "relatorio";
            upsertCliFinAuditHistoryOnImport();
            openCliFinAuditModal();
            toast("Planilha processada — abrindo auditoria");
            return;
          }
          renderFinModuleDash();
          toast("Planilha solta e processada — divergências apuradas");
        });
      };
      bindDropHost(document.getElementById("financeiroWrap"));
      bindDropHost(document.getElementById("clientesWrap"));
    })();

    document.getElementById("financeiroWrap")?.addEventListener("change", (e) => {
      if (handleCliFinTitCheckChange(e)) return;
      if (e.target.id === "cliFinAuditPeriod") {
        cliFinAudit.period = e.target.value || "mes";
        if (cliFinAudit.period === "mes") {
          cliFinAudit.dateFrom = "2026-07-01";
          cliFinAudit.dateTo = "2026-07-31";
        } else if (cliFinAudit.period === "30d") {
          cliFinAudit.dateFrom = "2026-06-15";
          cliFinAudit.dateTo = "2026-07-14";
        }
        renderFinModuleDash();
        return;
      }
      if (e.target.id === "cliFinAuditHistoryMonth") {
        cliFinAudit.historyMonth = e.target.value || "";
        refreshCliFinAuditHistoryView();
        return;
      }
      if (e.target.id === "cliFinAuditBaseDateFrom" || e.target.id === "cliFinAuditBaseDateTo") {
        if (e.target.id === "cliFinAuditBaseDateFrom") cliFinAudit.dateFrom = e.target.value || "";
        if (e.target.id === "cliFinAuditBaseDateTo") cliFinAudit.dateTo = e.target.value || "";
        cliFinAudit.period = "custom";
        renderFinModuleDash();
        return;
      }
      if (e.target.id === "finConcTipo") {
        finDash.conc.tipo = e.target.value || "";
        finDash.conc.catRowId = null;
        finDash.conc.filtersOpen = true;
        renderFinModuleDash();
        return;
      }
      if (e.target.id === "finConcStatus") {
        finDash.conc.status = e.target.value || "";
        finDash.conc.catRowId = null;
        renderFinModuleDash();
        return;
      }
      if (e.target.id === "finConcSelAll") {
        const visible = filterFinConcMovements(getFinConcMovements()).map((r) => r.id);
        if (e.target.checked) {
          finDash.conc.selected = [...new Set([...(finDash.conc.selected || []), ...visible])];
        } else {
          const drop = new Set(visible);
          finDash.conc.selected = (finDash.conc.selected || []).filter((id) => !drop.has(id));
        }
        renderFinModuleDash();
        return;
      }
      if (e.target.matches?.("[data-fin-conc-row]")) {
        const id = e.target.dataset.finConcRow;
        const set = new Set(finDash.conc.selected || []);
        if (e.target.checked) set.add(id); else set.delete(id);
        finDash.conc.selected = [...set];
        renderFinModuleDash();
        return;
      }
      if (e.target.id === "finCobStatus") {
        finDash.cobrancas.status = e.target.value || "";
        renderFinModuleDash();
        return;
      }
      if (e.target.id === "cliFinExecPeriod") {
        cliFinExec.period = e.target.value || "mes";
        renderClientes();
        return;
      }
      if (e.target.id === "finDashPeriod") {
        finDash.period = e.target.value || "mes";
        syncFinPeriodCustomUi();
        renderFinModuleDash();
        toast(`Período: ${periodLabels[finDash.period] || getFinPeriodDisplayLabel()}`);
        return;
      }
      if (e.target.id === "finPeriodFrom" || e.target.id === "finPeriodTo") {
        if (e.target.id === "finPeriodFrom") finDash.periodFrom = e.target.value || "";
        if (e.target.id === "finPeriodTo") finDash.periodTo = e.target.value || "";
        if (finDash.period !== "custom") return;
        renderFinModuleDash();
        return;
      }
      if (e.target.id === "finDashAxis") {
        finDash.axis = e.target.value || "mensal";
        renderFinModuleDash();
      }
    });

    processosWrap.addEventListener("click", (e) => {
      const accToggle = e.target.closest("[data-proc-acc]");
      if (accToggle) {
        const id = accToggle.dataset.procAcc;
        if (procFiltros.expandedClients.has(id)) procFiltros.expandedClients.delete(id);
        else procFiltros.expandedClients.add(id);
        const item = accToggle.closest(".empresa-menu-item");
        item?.classList.toggle("open", procFiltros.expandedClients.has(id));
        accToggle.setAttribute("aria-expanded", procFiltros.expandedClients.has(id) ? "true" : "false");
        return;
      }
      const entrega = e.target.closest("[data-agenda-board-task]");
      if (entrega) {
        const id = Number(entrega.dataset.agendaBoardTask);
        openEntregaDetailModal(id);
        return;
      }
      const action = e.target.closest("[data-proc-action]");
      if (action?.dataset.procAction === "add") {
        openAddProcessoModal();
        return;
      }
      const editBtn = e.target.closest("[data-proc-edit]");
      if (editBtn) {
        e.stopPropagation();
        const proc = sections.find((s) => s.id === "processos")?.items.find((p) => String(p.id) === editBtn.dataset.procEdit);
        if (proc) openEditProcessoModal(proc);
        return;
      }
      const card = e.target.closest("[data-proc-id]");
      if (!card) return;
      const proc = sections.find((s) => s.id === "processos")?.items.find((p) => String(p.id) === card.dataset.procId);
      if (proc) openKanbanEtapasModal(proc);
    });

    procFilters.addEventListener("input", (e) => {
      const search = e.target.closest("[data-mod-empresa-search]");
      if (search) {
        e.stopPropagation();
        filterModEmpresaOptions(search.dataset.modEmpresaSearch || "processos", search.value);
      }
    });

    procFilters.addEventListener("change", (e) => {
      const t = e.target;
      if (t.id === "procDept") procFiltros.dept = t.value;
      else if (t.id === "procResp") procFiltros.responsavel = t.value;
      else return;
      renderProcessos();
    });

    procFilters.addEventListener("keydown", (e) => {
      if (e.target.closest("[data-mod-empresa-search]")) e.stopPropagation();
    });

    procFilters.addEventListener("click", (e) => {
      const statusBtn = e.target.closest("#procStatusBtn");
      const statusOpt = e.target.closest("#procStatusMenu .agenda-ops-status-opt");
      const statusWrap = document.getElementById("procStatusWrap");
      if (statusBtn && statusWrap) {
        e.stopPropagation();
        const open = !statusWrap.classList.contains("open");
        document.querySelectorAll(".agenda-ops-status.open").forEach((el) => {
          if (el !== statusWrap) el.classList.remove("open");
        });
        statusWrap.classList.toggle("open", open);
        statusBtn.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }
      if (statusOpt) {
        e.stopPropagation();
        procFiltros.status = statusOpt.dataset.value || "";
        statusWrap?.classList.remove("open");
        document.getElementById("procStatusBtn")?.setAttribute("aria-expanded", "false");
        syncProcStatusUi();
        renderProcessos();
        return;
      }

      const groupBtn = e.target.closest("[data-proc-group]");
      if (groupBtn) {
        procFiltros.groupBy = groupBtn.dataset.procGroup || "lista";
        renderProcessos();
        return;
      }

      const action = e.target.closest("[data-proc-action]");
      if (!action) return;
      const kind = action.dataset.procAction;
      if (kind === "add") openAddProcessoModal();
      else if (kind === "recorrencia") {
        openModal({
          title: "Criar recorrência",
          sub: "Molde com recorrência (simulação)",
          body: `<p style="font-size:.84rem;color:var(--muted)">Simulação do <code>SelecaoProcessoMoldeRecorrenciaDialog</code>.</p>`,
          foot: `<button type="button" class="btn-ghost" data-close>Cancelar</button>
            <button type="button" class="btn-primary" data-close onclick="toast('Recorrência criada')">Confirmar</button>`,
        });
      } else if (kind === "arquivados") {
        procFiltros.arquivados = !procFiltros.arquivados;
        renderProcessos();
        toast(procFiltros.arquivados ? "Exibindo arquivados" : "Exibindo processos ativos");
      } else if (kind === "view-card" || kind === "view-list") {
        const next = kind === "view-list" ? "list" : "card";
        if (procFiltros.view === next && procFiltros.groupBy === "lista") return;
        procFiltros.view = next;
        procFiltros.groupBy = "lista";
        renderProcessos();
      }
    });

    modalBody.addEventListener("click", (e) => {
      const etapa = e.target.closest("[data-etapa-id]");
      if (!etapa) return;
      const proc = sections.find((s) => s.id === "processos")?.items.find((p) => String(p.id) === etapa.dataset.procId);
      const et = proc?.etapas?.find((x) => String(x.id) === etapa.dataset.etapaId);
      if (!et) return;
      toast(`Etapa: ${et.nome}`);
    });

    const empresaSearch = document.getElementById("empresaSearch");
    const empresaEmpty = document.getElementById("empresaEmpty");

    function filterEmpresas(term) {
      const q = String(term || "").trim().toLowerCase();
      let visible = 0;
      document.querySelectorAll("#empresaOptions .empresa-option").forEach((opt) => {
        const isAll = opt.dataset.id === "all";
        let chipMatch = true;
        if (chipListFilter && !isAll) {
          const { field, value } = chipListFilter;
          chipMatch = (opt.dataset[field] || "") === value;
        }
        const hay = [opt.dataset.short, opt.dataset.code, opt.dataset.cnpj, opt.textContent]
          .join(" ")
          .toLowerCase();
        const textMatch = !q || hay.includes(q);
        const match = chipMatch && textMatch;
        opt.classList.toggle("hidden", !match);
        if (match) visible++;
      });
      empresaEmpty.classList.toggle("show", visible === 0);
    }

    empresaSearch.addEventListener("input", () => filterEmpresas(empresaSearch.value));
    empresaSearch.addEventListener("click", (e) => e.stopPropagation());
    empresaSearch.addEventListener("keydown", (e) => e.stopPropagation());

    document.getElementById("empresaSelectBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllChipSelects();
      document.querySelectorAll(".module-empresa-picker .empresa-wrap.open").forEach((el) => {
        el.classList.remove("open");
        el.querySelector("[data-mod-empresa-toggle]")?.setAttribute("aria-expanded", "false");
      });
      empresaWrap.classList.toggle("open");
      if (empresaWrap.classList.contains("open")) {
        empresaSearch.value = "";
        filterEmpresas("");
        setTimeout(() => empresaSearch.focus(), 0);
      }
    });

    document.getElementById("empresaMenu").addEventListener("click", (e) => {
      if (e.target.closest(".empresa-search")) {
        e.stopPropagation();
        return;
      }
      const opt = e.target.closest(".empresa-option");
      if (!opt || opt.classList.contains("hidden")) return;
      selectEmpresaFromOption(opt);
    });

    document.addEventListener("click", (e) => {
      const modBtn = e.target.closest("[data-mod-empresa-toggle]");
      if (modBtn) {
        e.stopPropagation();
        const scope = modBtn.dataset.modEmpresaToggle || "clientes";
        const modWrap = document.getElementById(`modEmpresaWrap-${scope}`);
        if (!modWrap) return;
        closeAllChipSelects();
        empresaWrap?.classList.remove("open");
        document.querySelectorAll(".module-empresa-picker .empresa-wrap.open").forEach((el) => {
          if (el !== modWrap) {
            el.classList.remove("open");
            el.querySelector("[data-mod-empresa-toggle]")?.setAttribute("aria-expanded", "false");
          }
        });
        const willOpen = !modWrap.classList.contains("open");
        modWrap.classList.toggle("open", willOpen);
        modBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
        if (willOpen) {
          const search = document.getElementById(`modEmpresaSearch-${scope}`);
          if (search) {
            search.value = "";
            filterModEmpresaOptions(scope, "");
            setTimeout(() => search.focus(), 0);
          }
        }
        return;
      }
      const modOpt = e.target.closest("[data-mod-empresa-opt]");
      if (modOpt && !modOpt.classList.contains("hidden")) {
        e.stopPropagation();
        const scope = modOpt.dataset.modEmpresaScope || "clientes";
        const id = modOpt.dataset.modEmpresaOpt || "all";
        setModuleEmpresaFilter(scope, id);
        return;
      }
      document.querySelectorAll(".module-empresa-picker .empresa-wrap.open").forEach((wrap) => {
        if (!wrap.contains(e.target)) {
          wrap.classList.remove("open");
          wrap.querySelector("[data-mod-empresa-toggle]")?.setAttribute("aria-expanded", "false");
        }
      });
    });

    document.addEventListener("input", (e) => {
      const search = e.target.closest("[data-mod-empresa-search]");
      if (search) filterModEmpresaOptions(search.dataset.modEmpresaSearch || "clientes", search.value);
    });

    dashboard.addEventListener("click", (e) => {
      if (e.target.closest("#dashSecurityDismiss")) {
        e.stopPropagation();
        securityAlertDismissed = true;
        renderSecurityAlert();
        toast("Alerta dispensado — espaço liberado");
        return;
      }
      if (e.target.closest("#dashSecurityGo") || e.target.closest("#dashSecurityAlert svg")) {
        gotoSecurityCertAcao();
        return;
      }
      const pend = e.target.closest("[data-dash-pend]");
      if (pend) {
        e.stopPropagation();
        handleDashPendencia(pend.dataset.dashPend, pend.dataset.dashId);
        return;
      }
      const card = e.target.closest("[data-goto]");
      if (!card) return;
      const target = card.dataset.goto;
      if (!openTabIds.includes(target)) openTabIds.push(target);
      setSection(target);
    });

    document.getElementById("chatFab").addEventListener("click", () => {
      chatPanel.classList.toggle("open");
    });

    document.getElementById("chatClose").addEventListener("click", () => chatPanel.classList.remove("open"));
    document.getElementById("modalClose").addEventListener("click", closeModal);
    backdrop.addEventListener("input", (e) => {
      if (!cliFinAudit.modalOpen) return;
      const laudoSearch = e.target.closest("[data-cli-fin-laudo=\"search\"]");
      if (laudoSearch) {
        cliFinAudit.laudoQuery = laudoSearch.value || "";
        cliFinAudit.laudoPage = 0;
        const pos = laudoSearch.selectionStart;
        refreshCliFinAuditModal();
        const el = modalBody.querySelector("[data-cli-fin-laudo=\"search\"]");
        if (el) {
          el.focus();
          try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
        return;
      }
      const cartaoFilterInput = e.target.closest("[data-fin-cartao-filter-input]");
      if (!cartaoFilterInput) return;
      const key = cartaoFilterInput.dataset.finCartaoFilterInput;
      finDash.cartoes.filters[key] = cartaoFilterInput.value || "";
      const pos = cartaoFilterInput.selectionStart;
      refreshCliFinAuditModal();
      const el = modalBody.querySelector(`[data-fin-cartao-filter-input="${key}"]`);
      if (el) {
        el.focus();
        try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
      }
    });
    backdrop.addEventListener("change", (e) => {
      if (!cliFinAudit.modalOpen) return;
      const laudoCtrl = e.target.closest("[data-cli-fin-laudo]");
      if (laudoCtrl && cliFinAudit.modalTab === "relatorio") {
        const act = laudoCtrl.dataset.cliFinLaudo;
        if (act === "status") {
          cliFinAudit.laudoStatus = laudoCtrl.value || "";
          cliFinAudit.laudoPage = 0;
          refreshCliFinAuditModal();
          return;
        }
        if (act === "bandeira") {
          cliFinAudit.laudoBandeira = laudoCtrl.value || "";
          cliFinAudit.laudoPage = 0;
          refreshCliFinAuditModal();
          return;
        }
        if (act === "sort") {
          cliFinAudit.laudoSort = laudoCtrl.value || "diff-desc";
          cliFinAudit.laudoPage = 0;
          refreshCliFinAuditModal();
          return;
        }
      }
      const viewToggle = e.target.closest("[data-cli-fin-audit-view-toggle]");
      if (!viewToggle) return;
      const key = viewToggle.dataset.cliFinAuditViewToggle;
      ensureCliFinAuditView();
      cliFinAudit.view[key] = !!viewToggle.checked;
      applyCliFinAuditView();
    });
    backdrop.addEventListener("mousemove", (e) => {
      if (!cliFinAudit.modalOpen) return;
      const hit = e.target.closest("[data-fin-dia-tip]");
      const tip = document.getElementById("finDiaTooltip");
      const wrap = tip?.closest(".fin-dia-chart-wrap");
      if (!tip || !wrap) return;
      if (!hit) {
        tip.classList.remove("is-on");
        tip.hidden = true;
        return;
      }
      tip.hidden = false;
      if (hit.dataset.tipMode === "composicao") {
        const bruto = Number(hit.dataset.bruto || 0);
        const previsto = Number(hit.dataset.previsto || 0);
        const erro = Number(hit.dataset.erro || 0);
        const liquido = Number(hit.dataset.liquido || 0);
        tip.innerHTML = `
          <strong>Dia ${uiSelectEscape(hit.dataset.dia || "")}</strong>
          <div class="tip-row"><span>Valor Bruto</span><b>${money(bruto)}</b></div>
          <div class="tip-row"><span>(−) Tarifa Prevista</span><b>${money(previsto)}</b></div>
          <div class="tip-row is-erro"><span>(−) Erro/Cobrado a mais</span><b>${money(erro)}</b></div>
          <div class="tip-row is-eq"><span>(=) Valor Líquido</span><b>${money(liquido)}</b></div>`;
      } else if (hit.dataset.tipMode === "evolucao") {
        const volume = Number(hit.dataset.volume || 0);
        const mais = Number(hit.dataset.mais || 0);
        const menos = Number(hit.dataset.menos || 0);
        const liquido = +(mais - menos).toFixed(2);
        tip.innerHTML = `
          <strong>Dia ${uiSelectEscape(hit.dataset.dia || "")}</strong>
          <div class="tip-row"><span>Volume bruto</span><b>${money(volume)}</b></div>
          <div class="tip-row diff-bad"><span>Cobrado a mais</span><b>${money(mais)}</b></div>
          <div class="tip-row diff-ok"><span>Cobrado a menos</span><b>${money(menos)}</b></div>
          <div class="tip-row is-eq"><span>Impacto líquido</span><b>${liquido >= 0 ? "+" : "−"}${money(Math.abs(liquido))}</b></div>`;
      } else {
        const previsto = Number(hit.dataset.previsto || 0);
        const realizado = Number(hit.dataset.realizado || 0);
        const diferenca = Number(hit.dataset.diferenca || 0);
        const volume = Number(hit.dataset.volume || 0);
        const diffCls = diferenca > 0.01 ? "diff-bad" : (diferenca < -0.01 ? "diff-ok" : "");
        tip.innerHTML = `
          <strong>Data ${uiSelectEscape(hit.dataset.dia || "")}</strong>
          <div class="tip-row"><span>Volume bruto</span><b>${money(volume)}</b></div>
          <div class="tip-row"><span>Previsto</span><b>${money(previsto)}</b></div>
          <div class="tip-row"><span>Realizado</span><b>${money(realizado)}</b></div>
          <div class="tip-row ${diffCls}"><span>Diferença</span><b>${diferenca >= 0 ? "+" : "−"} ${money(Math.abs(diferenca))}</b></div>`;
      }
      const rect = wrap.getBoundingClientRect();
      const left = Math.min(rect.width - 210, Math.max(8, e.clientX - rect.left + 12));
      const top = Math.max(8, e.clientY - rect.top - 96);
      tip.style.left = `${left}px`;
      tip.style.top = `${top}px`;
      tip.classList.add("is-on");
    });
    backdrop.addEventListener("mouseleave", () => {
      const tip = document.getElementById("finDiaTooltip");
      if (tip) {
        tip.classList.remove("is-on");
        tip.hidden = true;
      }
    });
    backdrop.addEventListener("click", (e) => {
      const ofxExpand = e.target.closest("[data-fin-ofx-expand]");
      if (ofxExpand && finDash.conc?.ofx?.modalOpen) {
        setFinConcOfxExpanded(!finDash.conc.ofx.expanded);
        return;
      }
      if (cliFinAudit.rulesModalOpen) {
        const rulesExpand = e.target.closest("[data-cli-fin-audit='rules-expand']");
        if (rulesExpand) {
          setCliFinAuditRulesExpanded(!cliFinAudit.rulesExpanded);
          return;
        }
        const saveAcq = e.target.closest("[data-fin-cfg=\"save-acq\"]");
        if (saveAcq) {
          if (saveCliFinAcqFromDom()) {
            refreshCliFinAuditRulesModal();
            renderClientes();
          }
          return;
        }
        const delAcqRules = e.target.closest("[data-fin-cfg-del-acq]");
        if (delAcqRules) {
          const id = delAcqRules.dataset.finCfgDelAcq;
          finDash.config.adquirentes = ensureFinAdquirentes().filter((a) => a.id !== id);
          if (ensureAcqFormState().editingId === id) resetAcqForm();
          toast("Acordo removido");
          refreshCliFinAuditRulesModal();
          renderClientes();
          return;
        }
        if (handleFinAcqUiEvent(e)) return;
      }
      const auditTab = e.target.closest("[data-cli-fin-audit-tab]");
      if (auditTab && cliFinAudit.modalOpen) {
        const next = auditTab.dataset.cliFinAuditTab || "relatorio";
        cliFinAudit.modalTab = ["relatorio", "dashboard"].includes(next) ? next : "relatorio";
        cliFinAudit.filterOpen = false;
        refreshCliFinAuditModal();
        return;
      }
      const cliAuditAct = e.target.closest("[data-cli-fin-audit]");
      if (cliAuditAct && cliFinAudit.modalOpen) {
        const act = cliAuditAct.dataset.cliFinAudit;
        if (act === "expand") {
          setCliFinAuditExpanded(!cliFinAudit.expanded);
          return;
        }
        if (act === "filter") {
          cliFinAudit.filterOpen = !cliFinAudit.filterOpen;
          syncCliFinAuditHeadTools();
          return;
        }
        if (act === "view-all") {
          ensureCliFinAuditView();
          const group = cliFinAudit.modalTab === "dashboard" ? "Dashboard" : "Relatório";
          CLI_FIN_AUDIT_VIEW_OPTS.filter((o) => o.group === group).forEach((o) => { cliFinAudit.view[o.value] = true; });
          syncCliFinAuditHeadTools();
          applyCliFinAuditView();
          return;
        }
        if (act === "view-none") {
          ensureCliFinAuditView();
          const group = cliFinAudit.modalTab === "dashboard" ? "Dashboard" : "Relatório";
          CLI_FIN_AUDIT_VIEW_OPTS.filter((o) => o.group === group).forEach((o) => { cliFinAudit.view[o.value] = false; });
          syncCliFinAuditHeadTools();
          applyCliFinAuditView();
          return;
        }
        if (act === "export-laudo") {
          openCliFinAuditLaudoPreview();
          return;
        }
        if (act === "export-laudo-html") {
          downloadCliFinAuditLaudoHtml();
          return;
        }
        if (act === "print-laudo") {
          printCliFinAuditLaudo();
          return;
        }
        return;
      }
      const laudoAct = e.target.closest("[data-cli-fin-laudo]");
      if (laudoAct && cliFinAudit.modalOpen && cliFinAudit.modalTab === "relatorio") {
        const act = laudoAct.dataset.cliFinLaudo;
        if (act === "page-prev") {
          cliFinAudit.laudoPage = Math.max(0, (cliFinAudit.laudoPage || 0) - 1);
          refreshCliFinAuditModal();
          return;
        }
        if (act === "page-next") {
          cliFinAudit.laudoPage = (cliFinAudit.laudoPage || 0) + 1;
          refreshCliFinAuditModal();
          return;
        }
      }
      if (cliFinAudit.modalOpen && cliFinAudit.filterOpen && !e.target.closest("#cliFinAuditFilterWrap")) {
        cliFinAudit.filterOpen = false;
        syncCliFinAuditHeadTools();
        return;
      }
      const cartaoFilterBtnModal = e.target.closest("[data-fin-cartao-filter]");
      if (cartaoFilterBtnModal && cliFinAudit.modalOpen) {
        const key = cartaoFilterBtnModal.dataset.finCartaoFilter;
        finDash.cartoes.filterOpen = finDash.cartoes.filterOpen === key ? null : key;
        refreshCliFinAuditModal();
        const input = modalBody.querySelector(`[data-fin-cartao-filter-input="${key}"]`);
        if (input) {
          input.focus();
          const pos = input.value.length;
          try { input.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
        return;
      }
      const cartaoFilterSetModal = e.target.closest("[data-fin-cartao-filter-set]");
      if (cartaoFilterSetModal && cliFinAudit.modalOpen) {
        const key = cartaoFilterSetModal.dataset.finCartaoFilterSet;
        finDash.cartoes.filters[key] = cartaoFilterSetModal.dataset.value || "";
        finDash.cartoes.filterOpen = null;
        refreshCliFinAuditModal();
        return;
      }
      if (cliFinAudit.modalOpen && finDash.cartoes.filterOpen && !e.target.closest(".fin-th-filter")) {
        finDash.cartoes.filterOpen = null;
        refreshCliFinAuditModal();
        return;
      }
      const reportAct = e.target.closest("[data-cli-fin-report]");
      if (reportAct) {
        const act = reportAct.dataset.cliFinReport;
        const c = CLIENTES.find((x) => x.id === cliPerfilId) || resolveFinAuditCliente();
        if (!c) return;
        if (act === "export-html") {
          downloadCliFinRelatorioHtml(c);
          return;
        }
        if (act === "print") {
          printCliFinRelatorio(c);
          return;
        }
        return;
      }
      if (e.target === backdrop || e.target.closest("[data-close]")) closeModal();
    });
    backdrop.addEventListener("change", (e) => {
      if (!cliFinAudit.modalOpen) return;
      if (e.target.id === "cliFinAuditModalPeriod") {
        cliFinAudit.period = e.target.value || "mes";
        if (cliFinAudit.period === "mes") {
          cliFinAudit.dateFrom = "2026-07-01";
          cliFinAudit.dateTo = "2026-07-31";
        } else if (cliFinAudit.period === "30d") {
          cliFinAudit.dateFrom = "2026-06-15";
          cliFinAudit.dateTo = "2026-07-14";
        }
        refreshCliFinAuditModal();
        return;
      }
      if (e.target.id === "cliFinAuditDateFrom" || e.target.id === "cliFinAuditDateTo") {
        if (e.target.id === "cliFinAuditDateFrom") cliFinAudit.dateFrom = e.target.value || "";
        if (e.target.id === "cliFinAuditDateTo") cliFinAudit.dateTo = e.target.value || "";
        cliFinAudit.period = "custom";
        refreshCliFinAuditModal();
      }
    });

    expandBtn.addEventListener("click", () => {
      const concOps = document.getElementById("finConcOps");
      if (concOps && finDash?.tab === "conciliacao" && typeof setFinConcOpsExpanded === "function") {
        const on = !finDash.conc.opsExpanded;
        setFinConcOpsExpanded(on);
        toast(on ? "Movimentações em tela toda" : "Modo normal");
        return;
      }
      const on = !contentPanel.classList.contains("is-expanded");
      setExpanded(on);
      toast(on ? "Tela toda" : "Modo normal");
    });

    const tabSwitcher = document.getElementById("tabSwitcher");
    const tabSwitcherBtn = document.getElementById("tabSwitcherBtn");

    tabSwitcherBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = tabSwitcher.classList.toggle("open");
      tabSwitcherBtn.setAttribute("aria-expanded", String(open));
      filterWrap?.classList.remove("open");
      filterBtn?.setAttribute("aria-expanded", "false");
      document.getElementById("tabAddWrap")?.classList.remove("open");
    });

    document.getElementById("tabSwitcherMenu").addEventListener("click", (e) => {
      const item = e.target.closest("[data-switch-tab]");
      if (!item) return;
      e.stopPropagation();
      tabSwitcher.classList.remove("open");
      tabSwitcherBtn.setAttribute("aria-expanded", "false");
      setSection(item.dataset.switchTab);
    });

    expandBackdrop.addEventListener("click", () => {
      if (finDash?.conc?.opsExpanded && typeof setFinConcOpsExpanded === "function") {
        setFinConcOpsExpanded(false);
        return;
      }
      setExpanded(false);
    });

    const filterLabels = {
      pendencias: "Pendências de hoje",
      resumo: "Resumo / KPIs",
      faturamento: "Visão de faturamento",
      impostos: "Status / composição",
      departamentos: "Receita por departamento",
      processos: "Histórico recente",
      health: "KPIs de saúde financeira",
      volume: "KPIs de volume",
      banner: "Alertas / contexto",
      charts: "Gráficos (fluxo e composição)",
      dre: "DRE gerencial",
    };

    const dashPeriod = document.getElementById("dashPeriod");
    const dashPeriodCustom = document.getElementById("dashPeriodCustom");

    function syncPeriodCustom() {
      const isCustom = dashPeriod.value === "custom";
      dashPeriodCustom.classList.toggle("show", isCustom);
    }

    dashPeriod.addEventListener("change", () => {
      syncPeriodCustom();
      if (current === "visao") {
        renderDashboard();
        toast(`Período: ${periodLabels[dashPeriod.value] || dashPeriod.value}`);
      } else if (current === "processos") {
        renderProcessos();
        toast(`Período: ${periodLabels[dashPeriod.value] || dashPeriod.value}`);
      }
    });

    ["periodFrom", "periodTo"].forEach((id) => {
      document.getElementById(id).addEventListener("change", () => {
        if (dashPeriod.value !== "custom") return;
        if (current === "visao") renderDashboard();
        else if (current === "processos") renderProcessos();
      });
    });

    filterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = filterWrap.classList.toggle("open");
      filterBtn.setAttribute("aria-expanded", String(open));
      tabSwitcher?.classList.remove("open");
      tabSwitcherBtn?.setAttribute("aria-expanded", "false");
    });

    document.getElementById("filterSelectAll").addEventListener("click", (e) => {
      e.stopPropagation();
      filterChecks().forEach((c) => { c.checked = true; });
      applyViewFilters();
    });

    document.getElementById("filterClearAll").addEventListener("click", (e) => {
      e.stopPropagation();
      filterChecks().forEach((c) => { c.checked = false; });
      applyViewFilters();
    });

    document.getElementById("filterOptions").addEventListener("change", () => {
      applyViewFilters();
    });

    exportBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      filterWrap.classList.remove("open");
      filterBtn.setAttribute("aria-expanded", "false");
      const selected = selectedFilters().map((v) => filterLabels[v] || v);
      if (!selected.length) {
        toast("Nada filtrado para exportar — marque ao menos um item");
        filterWrap.classList.add("open");
        filterBtn.setAttribute("aria-expanded", "true");
        return;
      }
      const empresa = document.getElementById("empresaName").textContent;
      const isFin = current === "financeiro";
      toast(`Exportando ${selected.length} seção(ões)`);
      openModal({
        title: "Exportar relatório",
        sub: `${empresa} · filtro atual`,
        body: `<p style="margin-bottom:10px">Serão exportadas as seções filtradas no ${isFin ? "módulo contábil" : "dashboard"}:</p>
          <ul style="padding-left:18px;line-height:1.7;font-size:.88rem">
            ${selected.map((s) => `<li>${s}</li>`).join("")}
          </ul>`,
        foot: `<button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" data-close onclick="toast('Download iniciado')">Baixar PDF</button>`,
      });
    });

    document.getElementById("filterPanel").addEventListener("click", (e) => e.stopPropagation());

    const userWrap = document.getElementById("userWrap");
    const userChipBtn = document.getElementById("userChipBtn");

    userChipBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = userWrap.classList.toggle("open");
      userChipBtn.setAttribute("aria-expanded", String(open));
      empresaWrap.classList.remove("open");
      closeAllChipSelects();
      document.getElementById("tabAddWrap")?.classList.remove("open");
      filterWrap?.classList.remove("open");
      filterBtn?.setAttribute("aria-expanded", "false");
      document.getElementById("notifWrap")?.classList.remove("open");
      document.getElementById("notifBtn")?.setAttribute("aria-expanded", "false");
    });

    window.addEventListener("resize", () => {
      if (document.getElementById("tabAddWrap")?.classList.contains("open")) positionAddMenu();
      if (document.getElementById("finPagesWrap")?.classList.contains("open")) positionFinPagesMenu();
      if (typeof syncOpenFinNavMenus === "function") syncOpenFinNavMenus();
    });

    window.addEventListener("scroll", () => {
      if (document.getElementById("tabAddWrap")?.classList.contains("open")) positionAddMenu();
      if (typeof syncOpenFinNavMenus === "function") syncOpenFinNavMenus();
    }, true);

    document.addEventListener("click", (e) => {
      if (!empresaWrap.contains(e.target)) empresaWrap.classList.remove("open");
      if (!e.target.closest(".chip-select")) closeAllChipSelects();
      if (!e.target.closest(".ui-select")) closeAllUiSelects();
      if (!e.target.closest("#agendaEntregaStatusWrap") && !e.target.closest("#procStatusWrap") && !e.target.closest("#cliProcStatusWrap") && !e.target.closest("#cliEntregaStatusWrap")) {
        document.getElementById("agendaEntregaStatusWrap")?.classList.remove("open");
        document.getElementById("agendaEntregaStatusBtn")?.setAttribute("aria-expanded", "false");
        document.getElementById("procStatusWrap")?.classList.remove("open");
        document.getElementById("procStatusBtn")?.setAttribute("aria-expanded", "false");
        document.getElementById("cliProcStatusWrap")?.classList.remove("open");
        document.getElementById("cliProcStatusBtn")?.setAttribute("aria-expanded", "false");
        document.getElementById("cliEntregaStatusWrap")?.classList.remove("open");
        document.getElementById("cliEntregaStatusBtn")?.setAttribute("aria-expanded", "false");
      }
      if (!e.target.closest("#cliDocsGenerateWrap")) {
        document.getElementById("cliDocsGenerateWrap")?.classList.remove("open");
        document.querySelector("[data-cli-doc-generate-toggle]")?.setAttribute("aria-expanded", "false");
      }
      if (!e.target.closest("[data-cli-doc-file]") && cliDocsFileMenuId) {
        cliDocsFileMenuId = null;
        syncCliDocsFileMenusDom();
      }
      if (!e.target.closest("#finEmpresaWrap") && finDash.acOpen) {
        finDash.acOpen = false;
        const wrap = document.getElementById("finEmpresaWrap");
        wrap?.classList.remove("open");
        document.getElementById("finEmpresaSelectBtn")?.setAttribute("aria-expanded", "false");
      }
      const addWrap = document.getElementById("tabAddWrap");
      if (addWrap && !addWrap.contains(e.target) && !e.target.closest("#addMenu")) {
        addWrap.classList.remove("open");
      }
      const finPagesWrap = document.getElementById("finPagesWrap");
      if (finPagesWrap && !finPagesWrap.contains(e.target) && !e.target.closest("#finPagesMenu")) {
        toggleFinPagesMenu(false);
      }
      if (filterWrap && !filterWrap.contains(e.target)) {
        filterWrap.classList.remove("open");
        filterBtn.setAttribute("aria-expanded", "false");
      }
      if (userWrap && !userWrap.contains(e.target)) {
        userWrap.classList.remove("open");
        userChipBtn.setAttribute("aria-expanded", "false");
      }
      if (tabSwitcher && !tabSwitcher.contains(e.target)) {
        tabSwitcher.classList.remove("open");
        tabSwitcherBtn.setAttribute("aria-expanded", "false");
      }
      const notifWrapEl = document.getElementById("notifWrap");
      if (notifWrapEl && !notifWrapEl.contains(e.target)) {
        notifWrapEl.classList.remove("open");
        document.getElementById("notifBtn")?.setAttribute("aria-expanded", "false");
      }
      const gsWrap = document.getElementById("globalSearchWrap");
      if (gsWrap && !gsWrap.contains(e.target)) {
        gsWrap.classList.remove("open");
      }

      const action = e.target.closest("[data-action]")?.dataset.action;
      if (!action) return;

      const actions = {
        mensagens: () => toast("Mensagens"),
        "minha-conta": () => {
          userWrap.classList.remove("open");
          userChipBtn.setAttribute("aria-expanded", "false");
          openModal({
            title: "Minha Conta",
            sub: "Dados pessoais e perfil",
            body: `
              <label>Nome completo</label>
              <input value="Marina Souza" />
              <label>E-mail</label>
              <input value="marina.souza@escritorio.com.br" />
              <label>Telefone</label>
              <input value="(63) 99999-0000" />
              <label>Cargo</label>
              <input value="Analista Fiscal" />`,
            foot: `
              <button type="button" class="btn-ghost" data-close>Cancelar</button>
              <button type="button" class="btn-primary" data-close onclick="toast('Conta atualizada')">Salvar</button>`,
          });
        },
        configuracoes: () => {
          userWrap.classList.remove("open");
          userChipBtn.setAttribute("aria-expanded", "false");
          gotoModule("configuracoes");
        },
        "acesso-cliente": () => {
          userWrap.classList.remove("open");
          userChipBtn.setAttribute("aria-expanded", "false");
          enterClienteAccess(portalClienteId || "farmelhor");
        },
        "acesso-escritorio": () => {
          userWrap.classList.remove("open");
          userChipBtn.setAttribute("aria-expanded", "false");
          enterEscritorioAccess();
        },
        sair: () => {
          userWrap.classList.remove("open");
          userChipBtn.setAttribute("aria-expanded", "false");
          openModal({
            title: "Sair",
            sub: "Encerrar sessão",
            body: `<p>Deseja sair do Processo Ágil?</p>`,
            foot: `
              <button type="button" class="btn-ghost" data-close>Cancelar</button>
              <button type="button" class="btn-primary" data-close onclick="toast('Sessão encerrada')">Sair</button>`,
          });
        },
        avatar: () => toast("Logo da empresa"),
        externos: () => openClienteCadastro(),
        tags: () => openModal({
          title: "Tags da empresa",
          sub: "Classifique e filtre este cliente",
          body: `
            <p style="margin-bottom:12px;font-size:.82rem;color:var(--muted)">Selecione as tags vinculadas a esta empresa.</p>
            <div style="display:flex;flex-direction:column;gap:6px">
              ${["Prioridade alta", "Simples Nacional", "Cliente VIP", "Folha terceirizada", "Auditoria"].map((t, i) => `
                <label class="filter-option" style="justify-content:flex-start">
                  <input type="checkbox" name="empresaTag" value="${t}" ${i < 2 ? "checked" : ""}>
                  <span>${t}</span>
                </label>`).join("")}
            </div>
            <label style="margin-top:12px">Nova tag</label>
            <input placeholder="Nome da tag" id="novaTagInput" />`,
          foot: `
            <button type="button" class="btn-ghost" data-close>Cancelar</button>
            <button type="button" class="btn-primary" data-close onclick="toast('Tags atualizadas')">Salvar</button>`,
        }),
        "empresa-config": () => openModal({
          title: "Configurações da empresa",
          sub: "Dados e preferências",
          wide: true,
          body: `
            <label>Razão social</label>
            <input value="DROGARIA FARMELHOR TAQUARALTO LTDA" />
            <label>CNPJ</label>
            <input value="00.000.000/0001-00" />
            <label>Regime</label>
            <select><option>Simples Nacional</option><option>Lucro Presumido</option></select>
            <label>Prioridade</label>
            <select><option>Alta</option><option>Média</option><option>Baixa</option></select>`,
          foot: `
            <button type="button" class="btn-ghost" data-close>Cancelar</button>
            <button type="button" class="btn-primary" data-close onclick="toast('Configurações salvas')">Salvar</button>`,
        }),
        regerar: () => openRegerarObrigacoesModal(),
      };

      actions[action]?.();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (filterWrap?.classList.contains("open")) {
          filterWrap.classList.remove("open");
          filterBtn.setAttribute("aria-expanded", "false");
          return;
        }
        if (tabSwitcher?.classList.contains("open")) {
          tabSwitcher.classList.remove("open");
          tabSwitcherBtn.setAttribute("aria-expanded", "false");
          return;
        }
        if (contentPanel.classList.contains("is-expanded")) {
          setExpanded(false);
          return;
        }
        closeModal();
        empresaWrap.classList.remove("open");
        document.getElementById("tabAddWrap")?.classList.remove("open");
        filterWrap?.classList.remove("open");
        filterBtn?.setAttribute("aria-expanded", "false");
        userWrap?.classList.remove("open");
        userChipBtn?.setAttribute("aria-expanded", "false");
        document.getElementById("notifWrap")?.classList.remove("open");
        document.getElementById("notifBtn")?.setAttribute("aria-expanded", "false");
        document.getElementById("globalSearchWrap")?.classList.remove("open");
        closeAllChipSelects();
        chatPanel.classList.remove("open");
      }
    });

    setupChipSelects();
    updateInfoChips();
    renderEmpresaOptions();
    fillAgendaFinEmpresaSelect();
    syncAccessChrome();
    setSection("visao");

    document.getElementById("globalSearch")?.addEventListener("input", (e) => {
      renderGlobalSearch(e.target.value);
    });

    document.getElementById("globalSearchMenu")?.addEventListener("click", (e) => {
      const clientItem = e.target.closest("[data-global-client]");
      if (clientItem) {
        const opt = document.querySelector(`#empresaOptions .empresa-option[data-id="${clientItem.dataset.globalClient}"]`);
        if (opt) selectEmpresaFromOption(opt);
        document.getElementById("globalSearch").value = "";
        renderGlobalSearch("");
        gotoModule("clientes");
        return;
      }
      const procItem = e.target.closest("[data-global-proc]");
      if (procItem) {
        const proc = sections.find((s) => s.id === "processos")?.items.find((p) => String(p.id) === procItem.dataset.globalProc);
        document.getElementById("globalSearch").value = "";
        renderGlobalSearch("");
        if (proc) {
          if (!openTabIds.includes("processos")) openTabIds.push("processos");
          skipToast = true;
          setSection("processos", true);
          openKanbanEtapasModal(proc);
        }
      }
    });

    document.getElementById("notifBtn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      const wrap = document.getElementById("notifWrap");
      const open = wrap.classList.toggle("open");
      e.currentTarget.setAttribute("aria-expanded", String(open));
      userWrap?.classList.remove("open");
      userChipBtn?.setAttribute("aria-expanded", "false");
    });

    document.getElementById("notifMenu")?.addEventListener("click", (e) => {
      const item = e.target.closest("[data-notif]");
      if (!item) return;
      document.getElementById("notifWrap")?.classList.remove("open");
      document.getElementById("notifBtn")?.setAttribute("aria-expanded", "false");
      if (item.dataset.notif === "cert") {
        openCertMonitor({
          clienteId: item.dataset.certId || null,
          mode: item.dataset.certId ? "all" : "acao",
        });
      } else if (item.dataset.notif === "cert-acao") {
        gotoSecurityCertAcao();
      } else {
        gotoModule("entregas");
      }
    });

    const themeToggle = document.getElementById("themeToggle");
    function syncThemeToggle() {
      if (!themeToggle) return;
      const dark = document.documentElement.classList.contains("dark");
      themeToggle.setAttribute("aria-pressed", String(dark));
      themeToggle.dataset.tip = dark ? "Modo claro" : "Modo noturno";
      themeToggle.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo noturno");
      themeToggle.title = dark ? "Modo claro" : "Modo noturno";
    }
    function setTheme(dark) {
      document.documentElement.classList.toggle("dark", !!dark);
      try { localStorage.setItem("pa-theme", dark ? "dark" : "light"); } catch (_) {}
      syncThemeToggle();
    }
    syncThemeToggle();
    themeToggle?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setTheme(!document.documentElement.classList.contains("dark"));
    });

    enhanceUiSelects(document);
