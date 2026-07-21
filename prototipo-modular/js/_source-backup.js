    const icons = {
      visao: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
      clientes: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      financeiro: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h18v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>`,
      processos: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>`,
      entregas: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
      seguranca: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      configura: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
      documentos: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>`,
      xml: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h10M4 17h13"/><path d="M16 12l4 4-4 4"/></svg>`,
      obrigacoes: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
      imposto: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    };

    const CLIENTES = [
      { id: "farmelhor", code: "61918", nome: "Farmelhor Taquaralto", short: "Farmelhor", fantasia: "Farmelhor Taquaralto", razaoSocial: "DROGARIA FARMELHOR TAQUARALTO LTDA", cnpj: "00.000.000/0001-00", prioridade: "alta", status: "Ativo", regime: "Simples Nacional", estado: "TO", initials: "FT", faturamento: 482300, faturamentoAnterior: 421800 },
      { id: "centro", code: "61919", nome: "Farmácia Centro", short: "Centro", fantasia: "Farmácia Centro", razaoSocial: "FARMACIA CENTRO LTDA", cnpj: "11.111.111/0001-11", prioridade: "media", status: "Ativo", regime: "Lucro Presumido", estado: "GO", initials: "FC", faturamento: 210450, faturamentoAnterior: 198200 },
      { id: "norte", code: "61920", nome: "Drogaria Norte", short: "Norte", fantasia: "Drogaria Norte", razaoSocial: "DROGARIA NORTE LTDA", cnpj: "22.222.222/0001-22", prioridade: "baixa", status: "Inativo", regime: "Simples Nacional", estado: "PA", initials: "DN", faturamento: 156800, faturamentoAnterior: 172400 },
      { id: "sul", code: "61921", nome: "Farmácia Sul", short: "Sul", fantasia: "Farmácia Sul", razaoSocial: "FARMACIA SUL LTDA", cnpj: "33.333.333/0001-33", prioridade: "alta", status: "Ativo", regime: "Lucro Real", estado: "PR", initials: "FS", faturamento: 398500, faturamentoAnterior: 360200 },
      { id: "leste", code: "61922", nome: "Drogaria Leste", short: "Leste", fantasia: "Drogaria Leste", razaoSocial: "DROGARIA LESTE LTDA", cnpj: "44.444.444/0001-44", prioridade: "media", status: "Ativo", regime: "MEI", estado: "BA", initials: "DL", faturamento: 78400, faturamentoAnterior: 72100 },
      { id: "oeste", code: "61923", nome: "Clínica Oeste", short: "Oeste", fantasia: "Clínica Oeste", razaoSocial: "CLINICA OESTE LTDA", cnpj: "55.555.555/0001-55", prioridade: "baixa", status: "Ativo", regime: "Imune", estado: "MT", initials: "CO", faturamento: 265000, faturamentoAnterior: 248500 },
      { id: "alpha", code: "61924", nome: "Alpha Contábil ME", short: "Alpha", fantasia: "Alpha Contábil", razaoSocial: "ALPHA CONTABIL ME", cnpj: "66.666.666/0001-66", prioridade: "alta", status: "Inativo", regime: "Isento", estado: "SP", initials: "AC", faturamento: 92000, faturamentoAnterior: 101200 },
      { id: "beta", code: "61925", nome: "Beta Farmacêutica", short: "Beta", fantasia: "Beta Farmacêutica", razaoSocial: "BETA FARMACEUTICA LTDA", cnpj: "77.777.777/0001-77", prioridade: "media", status: "Ativo", regime: "Lucro Presumido", estado: "RJ", initials: "BF", faturamento: 334800, faturamentoAnterior: 311400 },
      { id: "gamma", code: "61926", nome: "Gamma Serviços", short: "Gamma", fantasia: "Gamma Serviços", razaoSocial: "GAMMA SERVICOS LTDA", cnpj: "88.888.888/0001-88", prioridade: "baixa", status: "Ativo", regime: "MEI", estado: "CE", initials: "GS", faturamento: 61200, faturamentoAnterior: 55800 },
      { id: "delta", code: "61927", nome: "Delta Comércio LTDA", short: "Delta", fantasia: "Delta Comércio", razaoSocial: "DELTA COMERCIO LTDA", cnpj: "99.999.999/0001-99", prioridade: "alta", status: "Ativo", regime: "Lucro Real", estado: "MG", initials: "DC", faturamento: 521700, faturamentoAnterior: 498300 },
    ];

    (function enrichClientesCadastro() {
      const enderecos = {
        farmelhor: "Av. Tocantins, 1200 — Taquaralto, Palmas/TO",
        centro: "Rua Goiás, 450 — Centro, Goiânia/GO",
        norte: "Tv. Dom Pedro, 88 — Belém/PA",
        sul: "Av. Paraná, 890 — Curitiba/PR",
        leste: "Rua da Bahia, 210 — Salvador/BA",
        oeste: "Av. Mato Grosso, 540 — Cuiabá/MT",
        alpha: "Rua Augusta, 300 — São Paulo/SP",
        beta: "Av. Rio Branco, 120 — Rio de Janeiro/RJ",
        gamma: "Av. Beira Mar, 75 — Fortaleza/CE",
        delta: "Av. Afonso Pena, 1500 — Belo Horizonte/MG",
      };
      /* Validades relativas a 14/07/2026 (hoje do protótipo) */
      const certMap = {
        farmelhor: { validade: "16/10/2026", titular: "João Pedro Farmelhor" },
        centro: { validade: "15/03/2027", titular: "Maria Helena Centro" },
        norte: { validade: "12/05/2026", titular: "Carlos Norte Silva" },
        sul: { validade: "30/07/2026", titular: "Ana Paula Sul" },
        leste: { validade: "22/01/2027", titular: "Roberto Leste" },
        oeste: { validade: "08/11/2026", titular: "Fernanda Oeste" },
        alpha: { validade: "01/06/2026", titular: "Lucas Alpha Contábil" },
        beta: { validade: "18/04/2027", titular: "Patricia Beta Farma" },
        gamma: { validade: "05/08/2026", titular: "Diego Gamma Serviços" },
        delta: { validade: "30/09/2026", titular: "Camila Delta Comércio" },
      };
      CLIENTES.forEach((c, i) => {
        const isFilial = i === 2 || i === 6 || i === 8;
        const cert = certMap[c.id] || { validade: "15/03/2027", titular: `${c.short} Certificado` };
        Object.assign(c, {
          tipoUnidade: isFilial ? "Filial" : "Matriz",
          funcInternos: 4 + ((i * 3) % 11),
          funcExternos: 1 + (i % 5),
          endereco: enderecos[c.id] || `${c.estado} — Brasil`,
          ie: `${10 + i}.${200 + i * 3}.${1000 + i * 17}`,
          im: `${50000 + i * 123}`,
          socios: isFilial
            ? [`Sócio administrador ${c.short}`, "Responsável legal Matriz"]
            : [`${c.short} Holdings`, `Sócio ${String.fromCharCode(65 + i)}`],
          certValidade: cert.validade,
          certTitular: cert.titular,
          certStatus: "ok",
        });
      });
    })();

    const PROC_STATUS_OPTIONS = [
      { value: "pendente", label: "Pendente", badge: "falha", color: "#e11d48", emoji: "🔴", sucesso: null },
      { value: "no-prazo", label: "No Prazo", badge: "andamento", color: "#f59e0b", emoji: "🟠", sucesso: null },
      { value: "atrasada", label: "Atrasada", badge: "falha", color: "#e11d48", emoji: "🔴", sucesso: false },
      { value: "ent-antecipada", label: "Ent. antecipada", badge: "sucesso", color: "#2f9e6b", emoji: "🟢", sucesso: true },
      { value: "entregue", label: "Entregue", badge: "sucesso", color: "#2f9e6b", emoji: "🟢", sucesso: true },
      { value: "ent-atrasada", label: "Ent. atrasada", badge: "falha", color: "#e11d48", emoji: "🔴", sucesso: false },
      { value: "dispensada", label: "Dispensada", badge: "arquivado", color: "#334155", emoji: "⚫", sucesso: true },
      { value: "dispensada-f-prazo", label: "Dispensada f/Prazo", badge: "arquivado", color: "#334155", emoji: "⚫", sucesso: true },
      { value: "justificado", label: "Justificado", badge: "andamento", color: "#8b5cf6", emoji: "🟣", sucesso: null },
      { value: "justificativa-atrasada", label: "Justificativa Atrasada", badge: "falha", color: "#e11d48", emoji: "🔴", sucesso: false },
      { value: "ent-justificada", label: "Ent. Justificada", badge: "sucesso", color: "#2f9e6b", emoji: "🟢", sucesso: true },
      { value: "dispensa-justificada", label: "Dispensa Justificada", badge: "arquivado", color: "#334155", emoji: "⚫", sucesso: true },
      { value: "em-andamento", label: "Em Andamento", badge: "andamento", color: "#f59e0b", emoji: "🟠", sucesso: null },
      { value: "concluida", label: "Concluída", badge: "sucesso", color: "#2f9e6b", emoji: "🟢", sucesso: true },
    ];

    /** Filtro simplificado da aba Operações e Processos */
    const PROC_FILTER_STATUS_OPTIONS = [
      { value: "sucesso", label: "Sucesso", color: "#2f9e6b", sucesso: true },
      { value: "erro", label: "Erro", color: "#b33a4a", sucesso: false },
      { value: "em-andamento", label: "Em andamento", color: "#3b6fd4", sucesso: null },
    ];

    const PROC_DEPT_OPTIONS = [
      "Fiscal",
      "Contábil",
      "Comercial",
      "Pessoal",
      "Paralegal",
      "Implantação",
      "Gestão de Processos",
      "Diretoria",
    ];

    function procDeptOptionsHtml(selected) {
      const opts = [...PROC_DEPT_OPTIONS];
      if (selected && !opts.includes(selected)) opts.unshift(selected);
      return opts.map((d) =>
        `<option value="${d}"${d === selected ? " selected" : ""}>${d}</option>`
      ).join("");
    }

    function procStatusMeta(status) {
      return PROC_STATUS_OPTIONS.find((o) => o.value === status)
        || { value: status, label: status || "—", badge: "andamento", color: "#94a3b8", sucesso: null };
    }

    function procFilterStatusMeta(value) {
      return PROC_FILTER_STATUS_OPTIONS.find((o) => o.value === value)
        || { value: "", label: "Todas", color: "#94a3b8", sucesso: undefined };
    }

    function matchesProcFilterStatus(sucessoFlag, filterValue) {
      if (!filterValue) return true;
      const meta = procFilterStatusMeta(filterValue);
      return meta.sucesso === sucessoFlag;
    }

    function digitsOnly(value) {
      return String(value || "").replace(/\D/g, "");
    }

    function normalizeSearchText(value) {
      return String(value || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    }

    /** Busca omnibar: Nome Fantasia, Razão Social ou CNPJ (com/sem pontuação). */
    function findClientesByOmniQuery(query) {
      const raw = String(query || "").trim();
      if (!raw) return null;
      const qText = normalizeSearchText(raw);
      const qDigits = digitsOnly(raw);
      return CLIENTES.filter((c) => {
        const fantasia = normalizeSearchText(c.fantasia || c.nome || c.short);
        const razao = normalizeSearchText(c.razaoSocial || c.nome);
        const short = normalizeSearchText(c.short);
        const cnpjDigits = digitsOnly(c.cnpj);
        if (qText && (fantasia.includes(qText) || razao.includes(qText) || short.includes(qText))) return true;
        if (qDigits.length >= 2 && cnpjDigits.includes(qDigits)) return true;
        return false;
      });
    }

    function renderProcStatusOptionsHtml(selected) {
      return [
        `<option value="">Todas</option>`,
        ...PROC_FILTER_STATUS_OPTIONS.map((o) =>
          `<option value="${o.value}" ${selected === o.value ? "selected" : ""}>${o.label}</option>`
        ),
      ].join("");
    }

    function buildEmpresaMetrics(c) {
      const scale = Math.max(0.12, c.faturamento / 482300);
      const aberto = Math.round(c.status === "Inativo" ? 0 : 400 + scale * 700);
      const imposto = Math.round(600 + scale * 1800);
      const mesesBase = [
        { m: "Fev", atual: 38, ant: 32 }, { m: "Mar", atual: 41, ant: 35 }, { m: "Abr", atual: 36, ant: 39 },
        { m: "Mai", atual: 44, ant: 37 }, { m: "Jun", atual: 48, ant: 40 }, { m: "Jul", atual: 42, ant: 38 },
      ];
      return {
        regime: c.regime,
        estado: c.estado,
        faturamento: c.faturamento,
        faturamentoAnterior: c.faturamentoAnterior,
        status: c.status,
        prioridade: c.prioridade,
        tempoHorasMes: Math.round(12 + scale * 28),
        tempoHorasSemana: +(3 + scale * 7).toFixed(1),
        tempoAtividades: Math.round(8 + scale * 20),
        entregas: { value: Math.max(1, Math.round(scale * 5)), meta: c.status === "Inativo" ? "Conta pausada" : "No curto prazo", delta: c.status === "Inativo" ? -1 : 1 },
        processos: { value: Math.max(1, Math.round(scale * 3)), meta: "Fluxos ativos", delta: 0 },
        financeiro: { value: aberto, meta: aberto ? "Cobrança em aberto" : "Em dia", format: "currency", delta: aberto ? -8 : -100 },
        imposto: { value: imposto, meta: c.regime === "MEI" ? "DAS MEI" : "Impostos do mês", format: "currency", delta: 2.4 },
        faturamentoMensal: mesesBase.map((row) => ({
          m: row.m,
          atual: Math.max(4, Math.round(row.atual * scale)),
          ant: Math.max(3, Math.round(row.ant * scale)),
        })),
        impostosDetalhe: [
          { nome: c.regime.includes("Lucro") ? "IRPJ/CSLL" : "DAS", valor: Math.round(imposto * 0.62), pct: 62 },
          { nome: "ISS", valor: Math.round(imposto * 0.2), pct: 20 },
          { nome: "INSS", valor: Math.round(imposto * 0.12), pct: 12 },
          { nome: "Outros", valor: Math.round(imposto * 0.06), pct: 6 },
        ],
        receitaDepartamentos: [
          { nome: "Fiscal", valor: Math.round(58200 * scale), clientes: Math.max(4, Math.round(87 * scale)) },
          { nome: "Contábil", valor: Math.round(42800 * scale), clientes: Math.max(3, Math.round(64 * scale)) },
          { nome: "Pessoal", valor: Math.round(31500 * scale), clientes: Math.max(3, Math.round(41 * scale)) },
          { nome: "Paralegal", valor: Math.round(18900 * scale), clientes: Math.max(2, Math.round(22 * scale)) },
        ],
        tempoLista: [
          { nome: "Obrigações fiscais", horas: Math.round(6 + scale * 10) + "h 20m" },
          { nome: "Processos", horas: Math.round(3 + scale * 6) + "h 10m" },
          { nome: "Documentos / entrega", horas: Math.round(2 + scale * 6) + "h 40m" },
          { nome: "Atendimento", horas: Math.round(1 + scale * 4) + "h 30m" },
        ],
        processosLista: [
          { nome: "Rotinas " + c.short, meta: c.status === "Ativo" ? "Em andamento" : "Pausado" },
          { nome: "Cadastro " + c.estado, meta: "Aguardando" },
        ],
        entregasList: [
          { nome: "DAS — Julho/2026", when: "20/07" },
          { nome: "Entrega " + c.short, when: "25/07" },
        ],
        financeiroList: [
          { label: "Recebido no mês", value: "R$ " + Math.round(c.faturamento / 180).toLocaleString("pt-BR") + ",00", pct: aberto ? 72 : 100 },
          { label: "Em aberto", value: "R$ " + aberto.toLocaleString("pt-BR") + ",00", pct: aberto ? 28 : 0 },
          { label: "Impostos provisionados", value: "R$ " + imposto.toLocaleString("pt-BR") + ",00", pct: 50 },
        ],
      };
    }

    const empresaMetrics = Object.fromEntries(CLIENTES.map((c) => [c.id, buildEmpresaMetrics(c)]));

    function renderEmpresaOptions() {
      const wrap = document.getElementById("empresaOptions");
      if (!wrap) return;
      const allBtn = wrap.querySelector('[data-id="all"]');
      wrap.querySelectorAll('.empresa-option:not([data-id="all"])').forEach((el) => el.remove());
      CLIENTES.forEach((c) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "empresa-option" + (c.id === selectedEmpresaId ? " active" : "");
        btn.dataset.id = c.id;
        btn.dataset.code = c.code;
        btn.dataset.short = c.nome;
        btn.dataset.cnpj = c.cnpj;
        btn.dataset.prioridade = c.prioridade;
        btn.dataset.status = c.status;
        btn.dataset.regime = c.regime;
        btn.dataset.estado = c.estado;
        btn.innerHTML = '<span class="opt-main"><span class="opt-code">' + c.code + "</span>" + c.nome + '</span><small>CNPJ ' + c.cnpj + " · " + c.estado + " · " + c.status + "</small>";
        wrap.appendChild(btn);
      });
      if (allBtn) {
        const small = allBtn.querySelector("small");
        if (small) small.textContent = "Consolida as " + CLIENTES.length + " empresas do grupo";
      }
    }

    function fillAgendaFinEmpresaSelect() {
      const sel = document.getElementById("agendaFinEmpresa");
      if (!sel) return;
      const current = sel.value || "all";
      sel.innerHTML = '<option value="all">Todas empresas</option>' + CLIENTES.map((c) =>
        '<option value="' + c.id + '">' + c.short + "</option>"
      ).join("");
      sel.value = [...sel.options].some((o) => o.value === current) ? current : "all";
    }

    const sections = [
      { id: "visao", label: "Visão Geral", tip: "Dashboard consolidado", empty: "", desc: "", actions: false, dashboard: true },
      { id: "clientes", label: "Gestão de Clientes", tip: "Gestão de clientes", empty: "Nenhum cliente cadastrado", desc: "Cadastre ou selecione um cliente para começar.", clientes: true, items: CLIENTES },
      { id: "financeiro", label: "Módulo Financeiro", tip: "Módulo financeiro", empty: "Sem lançamentos financeiros", desc: "Dashboard de análise financeira.", financeiroDash: true, items: [] },
      { id: "processos", label: "Gestão de Operações e Processos", tip: "Operações e processos", empty: "Nenhum processo encontrado", desc: "Adicione um processo usando o botão +", actions: false, processos: true, items: [
        { id: 1042, title: "Abertura de filial", status: "em-andamento", sucesso: null, dept: "Implantação", clienteId: "farmelhor", cliente: "Farmelhor Taquaralto", responsavel: "Ana Costa", criado: "2026-06-12", competencia: "2026-06", arquivado: false, etapas: [
          { id: 1, nome: "Coleta de documentos", status: "concluido", ordem: 1, obrigatorio: true, responsavel: "Ana Costa" },
          { id: 2, nome: "Protocolo Junta Comercial", status: "em_andamento", ordem: 2, obrigatorio: true, responsavel: "Ana Costa" },
          { id: 3, nome: "Inscrição Estadual", status: "pendente", ordem: 3, obrigatorio: true, responsavel: "Marcos Lima" },
          { id: 4, nome: "Atualizar cadastro interno", status: "pendente", ordem: 4, obrigatorio: false, responsavel: "Juliana Reis" },
        ]},
        { id: 998, title: "Alteração contratual", status: "no-prazo", sucesso: null, dept: "Paralegal", clienteId: "centro", cliente: "Farmácia Centro", responsavel: "Juliana Reis", criado: "2026-05-20", competencia: "2026-05", arquivado: false, etapas: [
          { id: 5, nome: "Análise do contrato", status: "concluido", ordem: 1, obrigatorio: true, responsavel: "Juliana Reis" },
          { id: 6, nome: "Elaborar minuta", status: "em_andamento", ordem: 2, obrigatorio: true, responsavel: "Juliana Reis" },
          { id: 7, nome: "Assinatura sócios", status: "pendente", ordem: 3, obrigatorio: true, responsavel: "Ana Costa" },
        ]},
        { id: 875, title: "Baixa de inscrição municipal", status: "entregue", sucesso: true, dept: "Comercial", clienteId: "norte", cliente: "Drogaria Norte", responsavel: "Marcos Lima", criado: "2026-03-08", competencia: "2026-03", arquivado: false, etapas: [
          { id: 8, nome: "Requerimento", status: "concluido", ordem: 1, obrigatorio: true, responsavel: "Marcos Lima" },
          { id: 9, nome: "Protocolo prefeitura", status: "concluido", ordem: 2, obrigatorio: true, responsavel: "Marcos Lima" },
          { id: 10, nome: "Arquivar comprovantes", status: "concluido", ordem: 3, obrigatorio: false, responsavel: "Juliana Reis" },
        ]},
        { id: 712, title: "Regularização eSocial", status: "atrasada", sucesso: false, dept: "Pessoal", clienteId: "farmelhor", cliente: "Farmelhor Taquaralto", responsavel: "Marcos Lima", criado: "2026-04-02", competencia: "2026-04", arquivado: false, etapas: [
          { id: 11, nome: "Diagnóstico", status: "concluido", ordem: 1, obrigatorio: true, responsavel: "Marcos Lima" },
          { id: 12, nome: "Envio eventos", status: "dispensado", ordem: 2, obrigatorio: true, responsavel: "Marcos Lima" },
          { id: 13, nome: "Retorno gov", status: "pendente", ordem: 3, obrigatorio: true, responsavel: "Ana Costa" },
        ]},
        { id: 640, title: "Encerramento 2025", status: "concluida", sucesso: true, dept: "Gestão de Processos", clienteId: "centro", cliente: "Farmácia Centro", responsavel: "Juliana Reis", criado: "2025-12-10", competencia: "2025-12", arquivado: true, etapas: [
          { id: 14, nome: "Fechamento contábil", status: "concluido", ordem: 1, obrigatorio: true, responsavel: "Juliana Reis" },
          { id: 15, nome: "Entrega obrigatória", status: "concluido", ordem: 2, obrigatorio: true, responsavel: "Juliana Reis" },
        ]},
        { id: 1180, title: "Apuração Lucro Real — 2º tri", status: "pendente", sucesso: null, dept: "Gestão de Processos", clienteId: "sul", cliente: "Farmácia Sul", responsavel: "Ana Costa", criado: "2026-06-28", competencia: "2026-06", arquivado: false, etapas: [
          { id: 16, nome: "Levantamento de balancete", status: "concluido", ordem: 1, obrigatorio: true, responsavel: "Juliana Reis" },
          { id: 17, nome: "Apuração IRPJ/CSLL", status: "em_andamento", ordem: 2, obrigatorio: true, responsavel: "Ana Costa" },
          { id: 18, nome: "Geração DARFs", status: "pendente", ordem: 3, obrigatorio: true, responsavel: "Ana Costa" },
        ]},
        { id: 1192, title: "Cadastro MEI — atualização", status: "justificado", sucesso: null, dept: "Comercial", clienteId: "leste", cliente: "Drogaria Leste", responsavel: "Juliana Reis", criado: "2026-07-01", competencia: "2026-07", arquivado: false, etapas: [
          { id: 19, nome: "Conferir dados PGMEI", status: "concluido", ordem: 1, obrigatorio: true, responsavel: "Juliana Reis" },
          { id: 20, nome: "Atualizar enquadramento", status: "em_andamento", ordem: 2, obrigatorio: true, responsavel: "Juliana Reis" },
          { id: 21, nome: "Validar DAS", status: "pendente", ordem: 3, obrigatorio: true, responsavel: "Ana Costa" },
        ]},
        { id: 1205, title: "Imunidade ISS — renovação", status: "em-andamento", sucesso: null, dept: "Paralegal", clienteId: "oeste", cliente: "Clínica Oeste", responsavel: "Marcos Lima", criado: "2026-06-18", competencia: "2026-06", arquivado: false, etapas: [
          { id: 22, nome: "Coleta de certificados", status: "concluido", ordem: 1, obrigatorio: true, responsavel: "Marcos Lima" },
          { id: 23, nome: "Protocolo prefeitura", status: "em_andamento", ordem: 2, obrigatorio: true, responsavel: "Marcos Lima" },
          { id: 24, nome: "Arquivo definitivo", status: "pendente", ordem: 3, obrigatorio: false, responsavel: "Juliana Reis" },
        ]},
        { id: 905, title: "Encerramento de atividades", status: "ent-atrasada", sucesso: false, dept: "Diretoria", clienteId: "alpha", cliente: "Alpha Contábil ME", responsavel: "Juliana Reis", criado: "2026-05-05", competencia: "2026-05", arquivado: false, etapas: [
          { id: 25, nome: "Inventário patrimonial", status: "concluido", ordem: 1, obrigatorio: true, responsavel: "Juliana Reis" },
          { id: 26, nome: "Protocolo baixa", status: "dispensado", ordem: 2, obrigatorio: true, responsavel: "Ana Costa" },
          { id: 27, nome: "Baixa CNPJ", status: "pendente", ordem: 3, obrigatorio: true, responsavel: "Marcos Lima" },
        ]},
        { id: 1218, title: "Migração Lucro Presumido", status: "ent-antecipada", sucesso: true, dept: "Comercial", clienteId: "beta", cliente: "Beta Farmacêutica", responsavel: "Ana Costa", criado: "2026-07-02", competencia: "2026-07", arquivado: false, etapas: [
          { id: 28, nome: "Simulação tributária", status: "concluido", ordem: 1, obrigatorio: true, responsavel: "Ana Costa" },
          { id: 29, nome: "Ajustes de plano de contas", status: "em_andamento", ordem: 2, obrigatorio: true, responsavel: "Juliana Reis" },
          { id: 30, nome: "Parametrizar obrigações", status: "pendente", ordem: 3, obrigatorio: true, responsavel: "Marcos Lima" },
        ]},
        { id: 1224, title: "Folha MEI — autenticação", status: "dispensada", sucesso: true, dept: "Pessoal", clienteId: "gamma", cliente: "Gamma Serviços", responsavel: "Marcos Lima", criado: "2026-06-10", competencia: "2026-06", arquivado: false, etapas: [
          { id: 31, nome: "Conferir colaboradores", status: "concluido", ordem: 1, obrigatorio: true, responsavel: "Marcos Lima" },
          { id: 32, nome: "Gerar guias", status: "concluido", ordem: 2, obrigatorio: true, responsavel: "Marcos Lima" },
        ]},
        { id: 1231, title: "SPED ECD — revisão", status: "justificativa-atrasada", sucesso: false, dept: "Gestão de Processos", clienteId: "delta", cliente: "Delta Comércio LTDA", responsavel: "Juliana Reis", criado: "2026-06-25", competencia: "2026-06", arquivado: false, etapas: [
          { id: 33, nome: "Importar balancete", status: "concluido", ordem: 1, obrigatorio: true, responsavel: "Juliana Reis" },
          { id: 34, nome: "Validar inconsistências", status: "em_andamento", ordem: 2, obrigatorio: true, responsavel: "Juliana Reis" },
          { id: 35, nome: "Assinatura e transmissão", status: "pendente", ordem: 3, obrigatorio: true, responsavel: "Ana Costa" },
        ]},
      ]},
      { id: "entregas", label: "Gestão de Prazos e Entregas", tip: "Prazos e entregas", empty: "Nenhuma entrega agendada", desc: "Datas de entrega serão listadas aqui.", agenda: true, items: [
        { title: "DAS — Julho/2026", meta: "Vence 20/07 · Farmelhor" },
        { title: "DCTFWeb", meta: "Vence 25/07 · Delta" },
        { title: "Reunião de agenda fiscal", meta: "14/07 · 10:00" },
      ]},
      { id: "seguranca", label: "Segurança e Conformidade", tip: "Monitoramento de certificados digitais", empty: "Nenhum certificado digital cadastrado", desc: "Monitore vencimentos e conformidade dos certificados digitais.", seguranca: true, items: [] },
      { id: "configura", label: "Configuração", tip: "Configuração do sistema", empty: "Nenhuma configuração disponível", desc: "Gerencie RH, processos, obrigações e integrações.", configura: true, items: [] },
    ];

    const obrigacoesItems = [
      { title: "DAS — Simples Nacional", meta: "Mensal · Ana Costa", dept: "Fiscal", grupo: false },
      { title: "DCTFWeb", meta: "Mensal · Ana Costa", dept: "Fiscal", grupo: false },
      { title: "Grupo Folha CLT", meta: "4 obrigações · Marcos Lima", dept: "Pessoal", grupo: true },
      { title: "eSocial eventos periódicos", meta: "Mensal · Marcos Lima", dept: "Pessoal", grupo: false },
      { title: "Balancete mensal", meta: "Mensal · Juliana Reis", dept: "Contábil", grupo: false },
      { title: "Grupo Encerramento", meta: "3 obrigações · Juliana Reis", dept: "Contábil", grupo: true },
      { title: "Conciliação especial do cliente", meta: "Exclusiva · Juliana Reis", dept: "Obrigação interna", grupo: false, interna: true },
      { title: "Checklist abertura 2026", meta: "Exclusiva · Ana Costa", dept: "Obrigação interna", grupo: false, interna: true },
    ];

    const PRIORIDADE_OPTIONS = [
      { value: "alta", label: "Alta" },
      { value: "media", label: "Média" },
      { value: "baixa", label: "Baixa" },
    ];
    const statusOptions = ["Ativo", "Inativo"];
    const REGIME_OPTIONS = [
      "Simples Nacional",
      "Lucro Presumido",
      "Lucro Real",
      "MEI",
      "Imune",
      "Isento",
    ];
    const UF_OPTIONS = [
      "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
      "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
      "RS", "RO", "RR", "SC", "SP", "SE", "TO",
    ];

    let current = "visao";
    let selectedEmpresaId = "farmelhor";
    let chipListFilter = null;
    let openTabIds = ["visao"];
    /** escritorio = menu completo · cliente = abas do topo (mesmo padrão do escritório) */
    let appAccessMode = "escritorio";
    /** Pool de abas do portal do cliente (+ / fechar no topo). */
    const CLIENT_PORTAL_TAB_POOL = [
      { id: "documentos", label: "Documentos", tip: "Arquivos e anexos da empresa" },
      { id: "entregas", label: "Entregas", tip: "Prazos e entregas vinculadas" },
      { id: "xml", label: "XML", tip: "Notas fiscais e XMLs" },
      { id: "financeiro", label: "Financeiro", tip: "Dashboard financeiro do cliente" },
    ];
    const CLIENT_PORTAL_TAB_IDS = CLIENT_PORTAL_TAB_POOL.map((t) => t.id);
    let portalClienteId = "farmelhor";
    let escritorioTabSnapshot = null;
    let skipToast = false;

    function isClientePortal() {
      return appAccessMode === "cliente";
    }

    function getPortalCliente() {
      return CLIENTES.find((c) => c.id === portalClienteId) || CLIENTES[0];
    }

    function agendaTasksScoped() {
      if (!isClientePortal()) return agendaTasks;
      return agendaTasks.filter((t) => t.clienteId === portalClienteId);
    }
    let agendaMonth = new Date(2026, 6, 1);
    let agendaSelected = "2026-07-14";

    const agendaTasks = [
      {
        id: 1, date: "2026-07-14", nome: "Contas a Pagar", status: "atrasada", competencia: "Jun/2026",
        clienteId: "farmelhor", razaoSocial: "DROGARIA FARMELHOR TAQUARALTO LTDA", cnpj: "00.000.000/0001-00",
        endereco: "Av. Tocantins, 1200 — Taquaralto, Palmas/TO", responsavel: "Ana Costa", prazoLegal: "10/07/2026",
      },
      {
        id: 2, date: "2026-07-14", nome: "Crédito e Cobrança", status: "em-andamento", competencia: "Jul/2026",
        clienteId: "centro", razaoSocial: "FARMACIA CENTRO LTDA", cnpj: "11.111.111/0001-11",
        endereco: "Rua Goiás, 450 — Centro, Goiânia/GO", responsavel: "Juliana Reis", prazoLegal: "20/07/2026",
      },
      {
        id: 3, date: "2026-07-14", nome: "Balancete mensal", status: "pendente", competencia: "Jun/2026",
        clienteId: "sul", razaoSocial: "FARMACIA SUL LTDA", cnpj: "33.333.333/0001-33",
        endereco: "Av. Paraná, 890 — Curitiba/PR", responsavel: "Juliana Reis", prazoLegal: "15/07/2026",
      },
      {
        id: 4, date: "2026-07-14", nome: "DAS MEI", status: "atrasada", competencia: "Jun/2026",
        clienteId: "leste", razaoSocial: "DROGARIA LESTE LTDA", cnpj: "44.444.444/0001-44",
        endereco: "Rua da Bahia, 210 — Salvador/BA", responsavel: "Ana Costa", prazoLegal: "20/06/2026",
      },
      {
        id: 5, date: "2026-07-15", nome: "Conciliação Bancária", status: "entregue", competencia: "Jul/2026",
        clienteId: "norte", razaoSocial: "DROGARIA NORTE LTDA", cnpj: "22.222.222/0001-22",
        endereco: "Tv. Dom Pedro, 88 — Belém/PA", responsavel: "Marcos Lima", prazoLegal: "18/07/2026",
      },
      {
        id: 6, date: "2026-07-15", nome: "Relatório de imunidade", status: "justificado", competencia: "Jul/2026",
        clienteId: "oeste", razaoSocial: "CLINICA OESTE LTDA", cnpj: "55.555.555/0001-55",
        endereco: "Av. Mato Grosso, 540 — Cuiabá/MT", responsavel: "Marcos Lima", prazoLegal: "22/07/2026",
      },
      {
        id: 7, date: "2026-07-16", nome: "Folha de Pagamento", status: "ent-atrasada", competencia: "Jun/2026",
        clienteId: "farmelhor", razaoSocial: "DROGARIA FARMELHOR TAQUARALTO LTDA", cnpj: "00.000.000/0001-00",
        endereco: "Av. Tocantins, 1200 — Taquaralto, Palmas/TO", responsavel: "Marcos Lima", prazoLegal: "07/07/2026",
      },
      {
        id: 8, date: "2026-07-16", nome: "PIS/COFINS mensal", status: "ent-antecipada", competencia: "Jun/2026",
        clienteId: "beta", razaoSocial: "BETA FARMACEUTICA LTDA", cnpj: "77.777.777/0001-77",
        endereco: "Av. Rio Branco, 120 — Rio de Janeiro/RJ", responsavel: "Ana Costa", prazoLegal: "25/07/2026",
      },
      {
        id: 9, date: "2026-07-17", nome: "Inventário patrimonial", status: "dispensada", competencia: "Mai/2026",
        clienteId: "alpha", razaoSocial: "ALPHA CONTABIL ME", cnpj: "66.666.666/0001-66",
        endereco: "Rua Augusta, 300 — São Paulo/SP", responsavel: "Juliana Reis", prazoLegal: "30/06/2026",
      },
      {
        id: 10, date: "2026-07-17", nome: "DAS MEI — guia", status: "concluida", competencia: "Jul/2026",
        clienteId: "gamma", razaoSocial: "GAMMA SERVICOS LTDA", cnpj: "88.888.888/0001-88",
        endereco: "Av. Beira Mar, 75 — Fortaleza/CE", responsavel: "Marcos Lima", prazoLegal: "20/07/2026",
      },
      {
        id: 11, date: "2026-07-18", nome: "ECD — revisões", status: "justificativa-atrasada", competencia: "2025",
        clienteId: "delta", razaoSocial: "DELTA COMERCIO LTDA", cnpj: "99.999.999/0001-99",
        endereco: "Av. Afonso Pena, 1500 — Belo Horizonte/MG", responsavel: "Juliana Reis", prazoLegal: "31/07/2026",
      },
      {
        id: 12, date: "2026-07-20", nome: "DAS — Simples Nacional", status: "no-prazo", competencia: "Jun/2026",
        clienteId: "farmelhor", razaoSocial: "DROGARIA FARMELHOR TAQUARALTO LTDA", cnpj: "00.000.000/0001-00",
        endereco: "Av. Tocantins, 1200 — Taquaralto, Palmas/TO", responsavel: "Ana Costa", prazoLegal: "20/07/2026",
      },
      {
        id: 13, date: "2026-07-20", nome: "Contas a Receber", status: "ent-justificada", competencia: "Jul/2026",
        clienteId: "centro", razaoSocial: "FARMACIA CENTRO LTDA", cnpj: "11.111.111/0001-11",
        endereco: "Rua Goiás, 450 — Centro, Goiânia/GO", responsavel: "Juliana Reis", prazoLegal: "25/07/2026",
      },
      {
        id: 14, date: "2026-07-20", nome: "IRPJ/CSLL estimativa", status: "dispensada-f-prazo", competencia: "Jun/2026",
        clienteId: "sul", razaoSocial: "FARMACIA SUL LTDA", cnpj: "33.333.333/0001-33",
        endereco: "Av. Paraná, 890 — Curitiba/PR", responsavel: "Ana Costa", prazoLegal: "30/07/2026",
      },
      {
        id: 15, date: "2026-07-22", nome: "eSocial eventos periódicos", status: "dispensa-justificada", competencia: "Jul/2026",
        clienteId: "beta", razaoSocial: "BETA FARMACEUTICA LTDA", cnpj: "77.777.777/0001-77",
        endereco: "Av. Rio Branco, 120 — Rio de Janeiro/RJ", responsavel: "Marcos Lima", prazoLegal: "22/07/2026",
      },
      {
        id: 16, date: "2026-07-22", nome: "Prestação de contas mensal", status: "no-prazo", competencia: "Jul/2026",
        clienteId: "oeste", razaoSocial: "CLINICA OESTE LTDA", cnpj: "55.555.555/0001-55",
        endereco: "Av. Mato Grosso, 540 — Cuiabá/MT", responsavel: "Juliana Reis", prazoLegal: "28/07/2026",
      },
      {
        id: 17, date: "2026-07-25", nome: "DCTFWeb", status: "no-prazo", competencia: "Jun/2026",
        clienteId: "delta", razaoSocial: "DELTA COMERCIO LTDA", cnpj: "99.999.999/0001-99",
        endereco: "Av. Afonso Pena, 1500 — Belo Horizonte/MG", responsavel: "Ana Costa", prazoLegal: "25/07/2026",
      },
      {
        id: 18, date: "2026-07-25", nome: "DAS — Simples Nacional", status: "atrasada", competencia: "Mai/2026",
        clienteId: "norte", razaoSocial: "DROGARIA NORTE LTDA", cnpj: "22.222.222/0001-22",
        endereco: "Tv. Dom Pedro, 88 — Belém/PA", responsavel: "Ana Costa", prazoLegal: "20/06/2026",
      },
      {
        id: 19, date: "2026-07-28", nome: "Guia GPS / INSS", status: "no-prazo", competencia: "Jul/2026",
        clienteId: "gamma", razaoSocial: "GAMMA SERVICOS LTDA", cnpj: "88.888.888/0001-88",
        endereco: "Av. Beira Mar, 75 — Fortaleza/CE", responsavel: "Marcos Lima", prazoLegal: "28/07/2026",
      },
      {
        id: 20, date: "2026-07-28", nome: "Declaração de isenção", status: "no-prazo", competencia: "2025",
        clienteId: "alpha", razaoSocial: "ALPHA CONTABIL ME", cnpj: "66.666.666/0001-66",
        endereco: "Rua Augusta, 300 — São Paulo/SP", responsavel: "Juliana Reis", prazoLegal: "31/07/2026",
      },
      {
        id: 21, date: "2026-07-30", nome: "EFD-Contribuições", status: "no-prazo", competencia: "Jun/2026",
        clienteId: "delta", razaoSocial: "DELTA COMERCIO LTDA", cnpj: "99.999.999/0001-99",
        endereco: "Av. Afonso Pena, 1500 — Belo Horizonte/MG", responsavel: "Ana Costa", prazoLegal: "15/08/2026",
      },
      {
        id: 22, date: "2026-07-30", nome: "DAS MEI", status: "no-prazo", competencia: "Jul/2026",
        clienteId: "leste", razaoSocial: "DROGARIA LESTE LTDA", cnpj: "44.444.444/0001-44",
        endereco: "Rua da Bahia, 210 — Salvador/BA", responsavel: "Ana Costa", prazoLegal: "20/07/2026",
      },
    ];

    function isoDate(y, m, d) {
      return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }

    function formatAgendaDayLabel(iso) {
      const [y, m, d] = iso.split("-").map(Number);
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
    }

    /* Parte 8: data longa sem weekday (subtítulo do quadro) */
    function formatAgendaDayLong(iso) {
      const [y, m, d] = iso.split("-").map(Number);
      const date = new Date(y, m - 1, d);
      const label = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
      return label.charAt(0).toUpperCase() + label.slice(1);
    }

    function tasksForDay(iso) {
      return agendaTasksScoped().filter((t) => t.date === iso && !t.arquivada);
    }

    const entregaActivityById = {};

    function nowLabel() {
      return new Date().toLocaleString("pt-BR", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      });
    }

    function buildDefaultEntregaHistorico(t) {
      const st = procStatusMeta(t.status);
      const items = [
        { kind: "sistema", when: "10/07/2026 · 09:12", who: "Sistema", text: "Entrega gerada automaticamente na competência " + (t.competencia || "—") },
        { kind: "sistema", when: "10/07/2026 · 09:15", who: "Marina Souza", text: `Responsável definido: ${t.responsavel}` },
        { kind: "sistema", when: "11/07/2026 · 14:30", who: t.responsavel, text: "Documentos solicitados ao cliente" },
      ];
      if (t.status === "atrasada") {
        items.push({ kind: "warn", when: "12/07/2026 · 08:00", who: "Sistema", text: "Prazo legal ultrapassado — status alterado para Atrasada" });
      } else {
        items.push({ kind: "sistema", when: "12/07/2026 · 16:40", who: t.responsavel, text: `Status atual: ${st.label}` });
      }
      return items;
    }

    function getEntregaHistorico(t) {
      if (!entregaActivityById[t.id]) {
        entregaActivityById[t.id] = buildDefaultEntregaHistorico(t);
      }
      return entregaActivityById[t.id];
    }

    function pushEntregaHistorico(t, entry) {
      getEntregaHistorico(t).unshift(entry);
    }

    function renderEntregaHistoricoHtml(t) {
      const items = getEntregaHistorico(t);
      if (!items.length) {
        return `<div class="entrega-hist"><div style="padding:12px;font-size:.76rem;color:var(--muted)">Nenhuma atividade registrada.</div></div>`;
      }
      return `<div class="entrega-hist" id="entregaHistList">${items.map((h) => {
        const dot = h.kind === "comment" ? "comment" : h.kind === "action" ? "action" : h.kind === "warn" ? "warn" : "";
        return `
          <div class="entrega-hist-item">
            <i class="entrega-hist-dot ${dot}" aria-hidden="true"></i>
            <div>
              <div class="who">${h.who}</div>
              <div class="txt">${h.text}</div>
              <div class="when">${h.when}</div>
            </div>
          </div>`;
      }).join("")}</div>`;
    }

    function openEntregaDetailModal(taskId) {
      const t = agendaTasks.find((x) => x.id === Number(taskId));
      if (!t) return;
      const st = procStatusMeta(t.status);
      const cliente = CLIENTES.find((c) => c.id === t.clienteId);
      const arquivada = !!t.arquivada;

      openModal({
        title: t.nome,
        sub: `${t.razaoSocial} · ${t.cnpj}`,
        wide: true,
        body: `
          <div class="entrega-detail-head">
            <div>
              <h4>${t.nome}</h4>
              <div class="sub">${arquivada ? "Arquivada" : "Entrega ativa no quadro"} · agenda ${fmtOpsDate(t.date)}</div>
            </div>
            <span class="proc-badge ${st.badge}">${st.label}</span>
          </div>
          <div class="entrega-detail-grid">
            <div class="cell"><span class="lab">Empresa</span><span class="val">${t.razaoSocial}</span></div>
            <div class="cell"><span class="lab">CNPJ</span><span class="val">${t.cnpj}</span></div>
            <div class="cell"><span class="lab">Responsável</span><span class="val">${t.responsavel}</span></div>
            <div class="cell"><span class="lab">Prazo legal</span><span class="val">${t.prazoLegal || "—"}</span></div>
            <div class="cell"><span class="lab">Competência</span><span class="val">${t.competencia || "—"}</span></div>
            <div class="cell"><span class="lab">Regime</span><span class="val">${cliente?.regime || "—"}</span></div>
            <div class="cell" style="grid-column:1/-1"><span class="lab">Endereço</span><span class="val">${t.endereco || "—"}</span></div>
          </div>
          <div class="entrega-detail-section">
            <h5>Histórico de atividades</h5>
            ${renderEntregaHistoricoHtml(t)}
          </div>
          <div class="entrega-detail-section">
            <h5>Adicionar comentário</h5>
            <div class="entrega-comment-row">
              <textarea id="entregaCommentInput" placeholder="Escreva uma observação sobre esta entrega..." aria-label="Comentário da entrega"></textarea>
              <button type="button" class="btn-primary" id="entregaCommentBtn" data-entrega-id="${t.id}">Enviar</button>
            </div>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Fechar</button>
          <button type="button" class="btn-ghost" id="entregaArquivarBtn" data-entrega-id="${t.id}" ${arquivada ? "disabled" : ""}>${arquivada ? "Arquivada" : "Arquivar"}</button>
          <button type="button" class="btn-ghost" id="entregaDispensarBtn" data-entrega-id="${t.id}">Dispensar</button>
          <button type="button" class="btn-primary" id="entregaConcluirBtn" data-entrega-id="${t.id}">Concluir</button>`,
      });

      document.getElementById("entregaCommentBtn")?.addEventListener("click", () => {
        const input = document.getElementById("entregaCommentInput");
        const text = (input?.value || "").trim();
        if (!text) {
          toast("Digite um comentário");
          return;
        }
        pushEntregaHistorico(t, {
          kind: "comment",
          when: nowLabel(),
          who: "Você",
          text,
        });
        const list = document.getElementById("entregaHistList");
        if (list) list.outerHTML = renderEntregaHistoricoHtml(t);
        if (input) input.value = "";
        toast("Comentário adicionado");
      });

      document.getElementById("entregaConcluirBtn")?.addEventListener("click", () => {
        t.status = "entregue";
        t.arquivada = false;
        pushEntregaHistorico(t, {
          kind: "action",
          when: nowLabel(),
          who: "Você",
          text: "Entrega marcada como concluída (Entregue)",
        });
        closeModal();
        renderAgenda();
        toast("Entrega concluída");
      });

      document.getElementById("entregaDispensarBtn")?.addEventListener("click", () => {
        t.status = "dispensada";
        pushEntregaHistorico(t, {
          kind: "action",
          when: nowLabel(),
          who: "Você",
          text: "Entrega dispensada",
        });
        closeModal();
        renderAgenda();
        toast("Entrega dispensada");
      });

      document.getElementById("entregaArquivarBtn")?.addEventListener("click", () => {
        t.arquivada = true;
        pushEntregaHistorico(t, {
          kind: "sistema",
          when: nowLabel(),
          who: "Você",
          text: "Entrega arquivada",
        });
        closeModal();
        renderAgenda();
        toast("Entrega arquivada");
      });
    }

    function renderAgendaCalendar() {
      const year = agendaMonth.getFullYear();
      const month = agendaMonth.getMonth();
      const monthLabel = agendaMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
      const firstDow = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const todayIso = "2026-07-14";
      const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

      const cells = [];
      for (let i = 0; i < firstDow; i++) {
        cells.push(`<button type="button" class="agenda-cal-day" disabled aria-hidden="true"></button>`);
      }
      for (let d = 1; d <= daysInMonth; d++) {
        const iso = isoDate(year, month, d);
        const has = tasksForDay(iso).length > 0;
        const classes = [
          "agenda-cal-day",
          has ? "has-tasks" : "",
          iso === todayIso ? "today" : "",
          iso === agendaSelected ? "selected" : "",
        ].filter(Boolean).join(" ");
        cells.push(`<button type="button" class="${classes}" data-agenda-day="${iso}" aria-label="${d}">${d}</button>`);
      }

      agendaCal.innerHTML = `
        <div class="agenda-cal-nav">
          <button type="button" id="agendaPrev" aria-label="Mês anterior">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <strong>${monthLabel}</strong>
          <button type="button" id="agendaNext" aria-label="Próximo mês">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
        <div class="agenda-cal-weekdays">${weekdays.map((w) => `<span>${w}</span>`).join("")}</div>
        <div class="agenda-cal-grid">${cells.join("")}</div>`;
    }

    let agendaClientQuery = "";
    let agendaOpsQuery = "";
    let agendaKpiFilter = null;
    let agendaDeptFilter = "";
    let agendaStatusFilter = "";
    let agendaEntregaQuery = "";
    let agendaEntregaFuncionario = "";
    let agendaEntregaStatus = "";
    let agendaEntregaResp = "";
    let agendaEntregaView = "tarefas";
    let agendaEntregaFiltersReady = false;
    let agendaFinYear = "2026";
    let agendaFinEmpresa = "all";
    let finDash = {
      tab: "dashboard",
      /** Abas abertas no módulo (Visão Geral fixa; demais via +). */
      openTabIds: ["dashboard"],
      /** Sub-abas analíticas da Visão Geral: visao | dre | dfc | ebitda */
      reportTab: "visao",
      period: "mes",
      periodFrom: "2026-06-15",
      periodTo: "2026-07-14",
      unidade: "all",
      empresaQuery: "",
      empresaId: "",
      axis: "mensal",
      acOpen: false,
      receitaFilter: "",
      dreOpen: { rb: true, ded: true, cust: true },
      drawer: null,
      conc: {
        tipo: "",
        valor: "",
        idTitulo: "",
        status: "",
        catRowId: null,
        categories: {},
        movs: null,
      },
      cartoes: {
        imported: false,
        dragging: false,
        filterOpen: null,
        filters: {
          dataHora: "",
          bandeira: "",
          tipo: "",
          bruto: "",
          prev: "",
          real: "",
          diff: "",
          parcelas: "",
          selo: "",
        },
      },
      cobrancas: {
        lado: "receber",
        status: "",
        form: { sacado: "", valor: "", vencimento: "", desc: "" },
        titulos: null,
        syncingId: null,
      },
      folha: {
        imported: false,
        filterOpen: null,
        filters: {
          funcionario: "",
          base: "",
          pago: "",
          variacao: "",
        },
      },
      config: {
        section: "plano",
        editingGroupId: null,
        editingLeafId: null,
        newLeafLabel: "",
        newGroupLabel: "",
        adquirentes: null,
        acqForm: {
          operadora: "Stone",
          inicio: "2026-01-01",
          fim: "2026-12-31",
          bandeiras: ["Visa", "Mastercard"],
          tipoLanc: "credito",
          descontoPct: "2,49",
          antecipacaoPct: "1,20",
          parcelas: "1-1:2,49;2-6:3,19;7-12:3,99",
        },
      },
    };

    let cliFinExec = {
      period: "mes",
      periodFrom: "",
      periodTo: "",
      lastDashUrl: "",
    };

    /** Espelho fiel da árvore DRE — só folhas são selecionáveis na categorização */
    const FIN_DRE_TAXONOMY = [
      {
        id: "rb",
        label: "Receita Bruta",
        tipo: "credito",
        children: [
          { id: "rb-s", label: "Prestação de Serviços" },
          { id: "rb-p", label: "Venda de Produtos" },
          { id: "rb-h", label: "Honorários Contábeis" },
          { id: "rb-o", label: "Outras Receitas" },
        ],
      },
      {
        id: "ded",
        label: "(−) Deduções e Impostos",
        tipo: "debito",
        children: [
          { id: "ded-i", label: "Impostos sobre receita" },
          { id: "ded-d", label: "Devoluções e abatimentos" },
        ],
      },
      {
        id: "cust",
        label: "(−) Custos Operacionais",
        tipo: "debito",
        children: [
          { id: "c-pessoal", label: "Pessoal e Encargos" },
          { id: "c-infra", label: "Infraestrutura" },
          { id: "c-tecnologia", label: "Tecnologia" },
          { id: "c-outros", label: "Outras Despesas" },
        ],
      },
    ];

    const FIN_ACQ_SEED = [
      {
        id: "aq1",
        operadora: "Stone",
        inicio: "01/01/2026",
        fim: "31/12/2026",
        bandeiras: ["Visa", "Mastercard", "Elo"],
        tipoLanc: "credito",
        descontoPct: 2.49,
        antecipacaoPct: 1.2,
        parcelas: "1x 2,49% · 2–6x 3,19% · 7–12x 3,99%",
      },
      {
        id: "aq2",
        operadora: "Cielo",
        inicio: "01/03/2026",
        fim: "28/02/2027",
        bandeiras: ["Visa", "Elo"],
        tipoLanc: "debito",
        descontoPct: 1.39,
        antecipacaoPct: 0.9,
        parcelas: "À vista 1,39%",
      },
    ];

    const FIN_CONC_MOVS = [
      { id: "fm1", tituloId: "10441", data: "14/07/2026", desc: "PIX RECEBIDO ACME INDUSTRIA LTDA", tipo: "credito", valor: 8450.0, status: "aberto" },
      { id: "fm2", tituloId: "10442", data: "14/07/2026", desc: "TED PAGFOR FORN CLEAN SERVICE", tipo: "debito", valor: 1260.4, status: "aberto" },
      { id: "fm3", tituloId: "10443", data: "13/07/2026", desc: "LIQUIDACAO CARTAO STONE LOTE 2291", tipo: "credito", valor: 9320.15, status: "conciliado", catId: "rb-p" },
      { id: "fm4", tituloId: "10444", data: "13/07/2026", desc: "TARIFA PACOTE EMPRESARIAL", tipo: "debito", valor: 89.9, status: "conciliado", catId: "c-outros" },
      { id: "fm5", tituloId: "10445", data: "12/07/2026", desc: "BOLETO RECEB NF 4412 HONORARIOS", tipo: "credito", valor: 3100.0, status: "aberto" },
      { id: "fm6", tituloId: "10446", data: "12/07/2026", desc: "FOLHA CLT TRANSF BANCARIA", tipo: "debito", valor: 18740.0, status: "aberto" },
      { id: "fm7", tituloId: "10447", data: "11/07/2026", desc: "XML NF-e 352607 ENVIO SEFAZ", tipo: "credito", valor: 560.0, status: "aberto" },
      { id: "fm8", tituloId: "10448", data: "11/07/2026", desc: "AWS CLOUD JUL/26", tipo: "debito", valor: 742.33, status: "conciliado", catId: "c-tecnologia" },
      { id: "fm9", tituloId: "10449", data: "10/07/2026", desc: "DEVOLUCAO VENDA POS 881", tipo: "debito", valor: 220.0, status: "aberto" },
      { id: "fm10", tituloId: "10450", data: "09/07/2026", desc: "ALUGUEL SALA COMERCIAL", tipo: "debito", valor: 4500.0, status: "conciliado", catId: "c-infra" },
    ];

    const FIN_CARTAO_ROWS = [
      { id: "c1", nsu: "48129011", dataHora: "10/07/2026 09:14", bandeira: "Mastercard", tipoLanc: "Crédito", bruto: 1280.0, prevPct: 2.49, realPct: 2.49, parcelas: 1, dia: "10/07" },
      { id: "c2", nsu: "48129044", dataHora: "10/07/2026 11:32", bandeira: "Visa", tipoLanc: "Débito", bruto: 540.0, prevPct: 1.39, realPct: 1.55, parcelas: 1, dia: "10/07" },
      { id: "c3", nsu: "PIX-9021", dataHora: "10/07/2026 16:05", bandeira: "Pix", tipoLanc: "Pix", bruto: 390.0, prevPct: 0.99, realPct: 0.99, parcelas: 1, dia: "10/07" },
      { id: "c4", nsu: "51288301", dataHora: "11/07/2026 10:08", bandeira: "Elo", tipoLanc: "Crédito", bruto: 890.5, prevPct: 2.69, realPct: 2.69, parcelas: 3, dia: "11/07" },
      { id: "c5", nsu: "51288419", dataHora: "11/07/2026 14:41", bandeira: "Visa", tipoLanc: "Crédito", bruto: 2100.0, prevPct: 2.39, realPct: 2.89, parcelas: 6, dia: "11/07" },
      { id: "c6", nsu: "52001102", dataHora: "12/07/2026 08:55", bandeira: "Amex", tipoLanc: "Crédito", bruto: 760.0, prevPct: 3.15, realPct: 3.15, parcelas: 2, dia: "12/07" },
      { id: "c7", nsu: "52001188", dataHora: "12/07/2026 13:20", bandeira: "Mastercard", tipoLanc: "Débito", bruto: 320.0, prevPct: 1.45, realPct: 1.2, parcelas: 1, dia: "12/07" },
      { id: "c8", nsu: "PIX-9144", dataHora: "12/07/2026 18:12", bandeira: "Pix", tipoLanc: "Pix", bruto: 275.0, prevPct: 0.99, realPct: 1.2, parcelas: 1, dia: "12/07" },
      { id: "c9", nsu: "53312007", dataHora: "13/07/2026 09:47", bandeira: "Hipercard", tipoLanc: "Crédito", bruto: 450.0, prevPct: 2.99, realPct: 3.4, parcelas: 4, dia: "13/07" },
      { id: "c10", nsu: "53312091", dataHora: "13/07/2026 15:33", bandeira: "Visa", tipoLanc: "Crédito", bruto: 1550.0, prevPct: 2.39, realPct: 2.39, parcelas: 1, dia: "13/07" },
      { id: "c11", nsu: "54000211", dataHora: "14/07/2026 10:02", bandeira: "Mastercard", tipoLanc: "Crédito", bruto: 980.0, prevPct: 2.49, realPct: 2.49, parcelas: 1, dia: "14/07", negada: true },
      { id: "c12", nsu: "54000302", dataHora: "14/07/2026 12:18", bandeira: "Elo", tipoLanc: "Débito", bruto: 210.0, prevPct: 1.49, realPct: 1.49, parcelas: 1, dia: "14/07" },
    ];

    const FIN_TITULOS_SEED = [
      { id: "t1", lado: "receber", sacado: "Acme Indústria Ltda", valor: 4250, vencimento: "20/07/2026", desc: "Honorários jul/26", status: "pendente", nossoNumero: "00012891" },
      { id: "t2", lado: "receber", sacado: "Beta Comércio SA", valor: 1890.5, vencimento: "10/07/2026", desc: "NF 4418 — mensalidade", status: "vencido", nossoNumero: "00012844" },
      { id: "t3", lado: "receber", sacado: "Casa Verde ME", valor: 980, vencimento: "05/07/2026", desc: "Boleto Sicredi ref. maio", status: "pago", nossoNumero: "00012702" },
      { id: "t4", lado: "pagar", sacado: "Clean Service Ltda", valor: 1260.4, vencimento: "18/07/2026", desc: "Manutenção predial", status: "pendente", nossoNumero: "FORN-8821" },
      { id: "t5", lado: "pagar", sacado: "AWS Brasil", valor: 742.33, vencimento: "08/07/2026", desc: "Cloud jul/26", status: "pago", nossoNumero: "FORN-2290" },
      { id: "t6", lado: "pagar", sacado: "Locadora Alfa", valor: 4500, vencimento: "12/07/2026", desc: "Aluguel sala comercial", status: "vencido", nossoNumero: "FORN-1102" },
      { id: "t7", lado: "receber", sacado: "Delta Serviços", valor: 3100, vencimento: "25/07/2026", desc: "Projeto auditoria ICMS", status: "pendente", nossoNumero: "00012910" },
      { id: "t8", lado: "pagar", sacado: "Energia Sul", valor: 680.9, vencimento: "15/07/2026", desc: "Conta energia", status: "pendente", nossoNumero: "FORN-4401" },
    ];

    const FIN_FOLHA_ROWS = [
      {
        id: "ff1", nome: "Marina Souza", initials: "MS", cargo: "Analista Fiscal",
        base: 5200, pago: 5550,
        itens: [{ label: "Horas extras", valor: 350 }],
      },
      {
        id: "ff2", nome: "Pedro Alves", initials: "PA", cargo: "Analista Fiscal",
        base: 4800, pago: 4800, itens: [],
      },
      {
        id: "ff3", nome: "Camila Dias", initials: "CD", cargo: "Analista Fiscal",
        base: 5100, pago: 5250,
        itens: [{ label: "Adicional noturno", valor: 150 }],
      },
      {
        id: "ff4", nome: "Rafael Nunes", initials: "RN", cargo: "Assistente",
        base: 2800, pago: 2650,
        itens: [{ label: "Atrasos", valor: -90 }, { label: "Faltas", valor: -60 }],
      },
      {
        id: "ff5", nome: "Bianca Lopes", initials: "BL", cargo: "Assistente",
        base: 2750, pago: 2750, itens: [],
      },
      {
        id: "ff6", nome: "Tiago Mendes", initials: "TM", cargo: "Analista Fiscal",
        base: 5400, pago: 5900,
        itens: [{ label: "Horas extras", valor: 350 }, { label: "Adicional noturno", valor: 150 }],
      },
      {
        id: "ff7", nome: "Helena Prado", initials: "HP", cargo: "Assistente",
        base: 2900, pago: 2850,
        itens: [{ label: "Atrasos", valor: -50 }],
      },
      {
        id: "ff8", nome: "Marcos Lima", initials: "ML", cargo: "Assistente Pessoal",
        base: 3100, pago: 3100, itens: [],
      },
    ];

    const FIN_TABS = [
      { id: "dashboard", label: "Visão Geral", tip: "Painel consolidado de saúde e fluxo de caixa" },
      { id: "conciliacao", label: "Conciliação Bancária", tip: "Extrato, XML e categorização na DRE" },
      { id: "cartoes", label: "Auditoria de Cartões", tip: "Cruzamento Stone/Cielo × taxas cadastradas" },
      { id: "cobrancas", label: "Cobranças Sicredi", tip: "Emissão de boletos e títulos a receber/pagar" },
      { id: "folha", label: "Folha & Variações", tip: "Fechamento da folha e justificativas salariais" },
      { id: "config", label: "Regras & Adquirentes", tip: "Plano de contas DRE e acordos de taxas" },
    ];

    const DASH_FILTER_OPTS = [
      { value: "pendencias", label: "Pendências de hoje" },
      { value: "resumo", label: "Resumo / KPIs" },
      { value: "faturamento", label: "Visão de faturamento" },
      { value: "impostos", label: "Status / composição" },
      { value: "departamentos", label: "Receita por departamento" },
      { value: "processos", label: "Histórico recente" },
    ];
    const FIN_FILTER_OPTS = [
      { value: "decision", label: "Centro de decisão" },
      { value: "kpis", label: "Indicadores executivos" },
      { value: "fluxo", label: "Gráfico de fluxo de caixa" },
      { value: "origem", label: "Origem e destino" },
      { value: "feed", label: "Movimentações e alertas" },
    ];
    const viewFilterState = {
      visao: Object.fromEntries(DASH_FILTER_OPTS.map((o) => [o.value, true])),
      financeiro: Object.fromEntries(FIN_FILTER_OPTS.map((o) => [o.value, true])),
    };
    let agendaExpandedTaskId = null;
    let agendaFeedFilter = "todas";
    const CERT_AVENCER_DIAS = 30;
    const APP_TODAY = new Date(2026, 6, 14); /* 14/07/2026 — hoje do protótipo */
    let securityAlertDismissed = false;
    let recentClientIds = CLIENTES.slice(0, 5).map((c) => c.id);
    let cliView = "lista"; // lista | perfil
    let cliPerfilId = null;
    let cliPerfilTab = "obrigacoes";
    let cliXmlLote = {
      active: false,
      pct: 0,
      ok: 0,
      erro: 0,
      total: 48,
      eta: 0,
      timer: null,
    };
    let cliSearchQuery = "";
    let cliRegimeFilter = "";
    const CLI_TIPO_OPTIONS = ["LTDA", "ME", "EIRELI", "SA", "Sociedade Simples", "MEI", "Outros"];
    let cliCadastro = createEmptyCliCadastro();
    let cliCadastroToastTimer = null;
    let cliFatPeriod = "2026-07";
    let cliProcView = "list"; // list | card
    let cliProcFiltros = { search: "", status: "", dept: "", responsavel: "" };
    let cliFuncNav = null; // null | todos | internos | externos
    let cliFinMovFiltros = {
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
    let cliFinSubTab = "conciliacao"; // conciliacao | receber | pagar | plano | auditoria
    const CLI_FIN_AUDIT_VIEW_OPTS = [
      { value: "cabecalho", label: "Cabeçalho da auditoria", group: "Laudo" },
      { value: "resumo-auditoria", label: "Resumo da auditoria", group: "Laudo" },
      { value: "resumo-exec", label: "Resumo executivo", group: "Laudo" },
      { value: "diagnostico", label: "Diagnóstico automático", group: "Laudo" },
      { value: "recomendacoes", label: "Recomendações da auditoria", group: "Laudo" },
      { value: "ops", label: "Indicadores operacionais", group: "Laudo" },
      { value: "resumo-div", label: "Resumo das divergências", group: "Laudo" },
      { value: "timeline", label: "Linha do tempo da auditoria", group: "Laudo" },
      { value: "tabela", label: "Tabela de divergências", group: "Laudo" },
      { value: "rodape", label: "Rodapé da auditoria", group: "Laudo" },
      { value: "dash-kpis", label: "KPIs do dashboard", group: "Dashboard" },
      { value: "chart-evolucao", label: "Gráfico · Evolução", group: "Dashboard" },
      { value: "pareto", label: "Pareto · Onde está o problema", group: "Dashboard" },
      { value: "taxas", label: "Comparação das taxas", group: "Dashboard" },
      { value: "distribuicao", label: "Distribuição das divergências", group: "Dashboard" },
      { value: "insights", label: "Insights automáticos", group: "Dashboard" },
      { value: "top5", label: "Maiores divergências", group: "Dashboard" },
    ];
    let cliFinAudit = {
      period: "mes",
      modalOpen: false,
      modalTab: "relatorio", /* relatorio | dashboard */
      rulesModalOpen: false,
      rulesExpanded: false,
      fileName: "",
      expanded: false,
      filterOpen: false,
      dateFrom: "2026-07-01",
      dateTo: "2026-07-31",
      laudoQuery: "",
      laudoStatus: "",
      laudoBandeira: "",
      laudoSort: "diff-desc",
      laudoPage: 0,
      laudoPageSize: 8,
      view: Object.fromEntries(CLI_FIN_AUDIT_VIEW_OPTS.map((o) => [o.value, true])),
    };
    let cliFeedFilter = "todos"; // todos | geral | privado | contatos | fiscal | financeiro | operacional | preferencias
    let cliFeedByClient = {};
    const CLI_FEED_ME = { nome: "Ana Costa", cargo: "Fiscal", initials: "AC" };
    const CLI_FEED_TEMAS = [
      { id: "contatos", label: "Contatos" },
      { id: "fiscal", label: "Fiscal" },
      { id: "financeiro", label: "Financeiro" },
      { id: "operacional", label: "Operacional" },
      { id: "preferencias", label: "Preferências" },
    ];
    let cliFinTituloStatusFiltro = ""; // "" | aberto | parcial | pago | vencido
    let cliFinPlanoQuery = "";
    let securityCertFilterClienteId = null;
    let securityCertFilterMode = "all"; /* all | acao | vencido | a-vencer | ok */
    let securityCertSearchQuery = "";
    let cfgState = {
      tab: "rh", /* rh | processos | obrigacoes | documentos | comunicacoes | chat | logs */
      rhView: "todos", /* todos | departamentos | cargos | funcionarios */
      rhScreen: "lista", /* lista | sessoes */
      rhQuery: "",
      rhMembersOpen: null,
      sessTab: "recentes",
      sessPage: 0,
      sessPeriod: { ini: "2026-07-01", fim: "2026-07-14" },
      sessFilters: { user: "", dept: "", cargo: "", status: "" },
      moldeOpen: {},
      docSub: "robos", /* robos | classificador | pastas | tipos */
      chat: { tenant: "", secret: "", ativo: true, hasSecret: true },
      emailTemplate: "Olá {{nome}},\n\nSegue o aviso do escritório:\n{{conteudo}}\n\nAtenciosamente,\nProcesso Ágil",
      emailTplPendente: "Ex: Olá {{clienteNome}}, a entrega {{nomeEntrega}} vence em {{dataVencimento}}.",
      emailTplAtrasada: "Ex: Olá {{clienteNome}}, a entrega {{nomeEntrega}} está atrasada desde {{dataVencimento}}.",
      logsShowExtra: true,
      logOpen: {},
      logs: {
        dataIni: "2026-07-01",
        dataFim: "2026-07-14",
        endpoint: "",
        metodo: "",
        usuario: "",
        operacao: "",
        ip: "",
        status: "",
        apenasErros: false,
      },
      obrFiltros: { tipo: "", competencia: "", reenvio: "" },
    };
    let cliHonorariosByClient = {};
    let cliHonorRelatorioAtualizado = "14/07/2026 17:40";

    const CLI_PERFIL_TABS = [
      { id: "obrigacoes", label: "Obrigações" },
      { id: "processos", label: "Processos" },
      { id: "funcionarios", label: "Funcionários" },
      { id: "documentos", label: "Documentos" },
      { id: "comentarios", label: "Comentários" },
      { id: "entregas", label: "Entregas" },
      { id: "financeiro", label: "Financeiro" },
      { id: "honorarios", label: "Honorários" },
    ];

    function resolveSection(id) {
      if (isClientePortal()) {
        const portal = CLIENT_PORTAL_TAB_POOL.find((t) => t.id === id);
        if (portal) {
          return {
            id: portal.id,
            label: portal.label,
            tip: portal.tip,
            empty: "Sem dados para exibir",
            desc: "Nenhum item encontrado nesta página.",
            portalCliente: true,
            items: [],
          };
        }
      }
      return sections.find((s) => s.id === id);
    }

    function bumpRecentClient(id) {
      recentClientIds = [id, ...recentClientIds.filter((x) => x !== id)].slice(0, 5);
    }

    function startOfDay(d) {
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    function parseBrDate(str) {
      const parts = String(str || "").split("/");
      if (parts.length !== 3) return null;
      const [dd, mm, yyyy] = parts.map(Number);
      if (!dd || !mm || !yyyy) return null;
      return new Date(yyyy, mm - 1, dd);
    }

    function diasParaExpiracao(validadeStr, hoje = APP_TODAY) {
      const dt = parseBrDate(validadeStr);
      if (!dt) return 0;
      return Math.round((startOfDay(dt) - startOfDay(hoje)) / 86400000);
    }

    function statusCertificadoPorDias(dias, limiteAVencer = CERT_AVENCER_DIAS) {
      if (dias < 0) return "vencido";
      if (dias <= limiteAVencer) return "a-vencer";
      return "ok";
    }

    function certStatusMeta(status) {
      /* badge alinhado ao Design System de processos (.proc-badge) */
      if (status === "vencido") return { cls: "cert-bad", badge: "falha", label: "Vencido", tip: "Certificado digital vencido" };
      if (status === "a-vencer") return { cls: "cert-warn", badge: "andamento", label: "A vencer", tip: "Certificado digital próximo do vencimento" };
      return { cls: "cert-ok", badge: "sucesso", label: "Válido", tip: "Certificado digital válido" };
    }

    function formatValidadeLabel(validadeStr, dias) {
      if (dias < 0) {
        const n = Math.abs(dias);
        return `Validade: ${validadeStr} (vencido há ${n} ${n === 1 ? "dia" : "dias"})`;
      }
      return `Validade: ${validadeStr} (${dias} ${dias === 1 ? "dia" : "dias"})`;
    }

    function getCertificadoRow(c) {
      const dias = diasParaExpiracao(c.certValidade);
      const status = statusCertificadoPorDias(dias);
      c.certStatus = status;
      const meta = certStatusMeta(status);
      return {
        id: c.id,
        razaoSocial: c.razaoSocial || c.nome,
        fantasia: c.fantasia || c.nome,
        cnpj: c.cnpj,
        titular: c.certTitular || (c.socios && c.socios[0]) || "Titular não informado",
        validade: c.certValidade,
        dias,
        status,
        meta,
        validadeLabel: formatValidadeLabel(c.certValidade, dias),
      };
    }

    function getCertificadosMonitor() {
      return CLIENTES.map(getCertificadoRow).sort((a, b) => a.dias - b.dias);
    }

    function getCertificadosAcao() {
      return getCertificadosMonitor().filter((r) => r.status === "vencido" || r.status === "a-vencer");
    }

    function getCertAlertCounts() {
      const rows = getCertificadosMonitor();
      return {
        total: rows.length,
        ok: rows.filter((r) => r.status === "ok").length,
        aVencer: rows.filter((r) => r.status === "a-vencer").length,
        vencidos: rows.filter((r) => r.status === "vencido").length,
        acao: rows.filter((r) => r.status !== "ok").length,
      };
    }

    function openEmpresaPerfil(clientId) {
      if (!openTabIds.includes("clientes")) openTabIds.push("clientes");
      skipToast = true;
      setSection("clientes", true);
      openClientePerfil(clientId);
    }

    function openClientePerfil(clientId) {
      const c = CLIENTES.find((x) => x.id === clientId);
      if (!c) return;
      bumpRecentClient(c.id);
      const opt = document.querySelector(`#empresaOptions .empresa-option[data-id="${c.id}"]`);
      if (opt) selectEmpresaFromOption(opt, { silentToast: true });
      cliView = "perfil";
      cliPerfilId = c.id;
      cliPerfilTab = "obrigacoes";
      renderClientes();
    }

    function closeClientePerfil() {
      if (isClientePortal()) {
        toast("No acesso cliente você permanece no perfil da sua empresa");
        return;
      }
      cliView = "lista";
      cliPerfilId = null;
      renderClientes();
    }

    function syncAccessChrome() {
      const nameEl = document.querySelector(".user-meta .user-name");
      const roleEl = document.querySelector(".user-meta .user-role");
      const btnCliente = document.getElementById("userMenuAcessoCliente");
      const btnEscritorio = document.getElementById("userMenuAcessoEscritorio");
      document.body.classList.toggle("is-cliente-portal", isClientePortal());
      if (btnCliente) btnCliente.hidden = isClientePortal();
      if (btnEscritorio) btnEscritorio.hidden = !isClientePortal();
      if (isClientePortal()) {
        const c = getPortalCliente();
        if (nameEl) nameEl.textContent = c.fantasia || c.nome;
        if (roleEl) roleEl.textContent = "Portal do Cliente";
      } else {
        if (nameEl) nameEl.textContent = "Marina Souza";
        if (roleEl) roleEl.textContent = "Analista Fiscal · Contabilidade";
      }
    }

    function enterClienteAccess(clientId) {
      const c = CLIENTES.find((x) => x.id === (clientId || portalClienteId)) || CLIENTES[0];
      if (!c) {
        toast("Cliente indisponível");
        return;
      }
      escritorioTabSnapshot = {
        current,
        openTabIds: [...openTabIds],
        cliView,
        cliPerfilId,
        selectedEmpresaId,
      };
      appAccessMode = "cliente";
      portalClienteId = c.id;
      selectedEmpresaId = c.id;
      openTabIds = [...CLIENT_PORTAL_TAB_IDS];
      cliView = "perfil";
      cliPerfilId = c.id;
      cliPerfilTab = "documentos";
      syncAccessChrome();
      skipToast = true;
      setSection("documentos", true);
      toast(`Acesso Cliente · ${c.fantasia || c.nome}`);
    }

    function enterEscritorioAccess() {
      const snap = escritorioTabSnapshot;
      appAccessMode = "escritorio";
      escritorioTabSnapshot = null;
      openTabIds = snap?.openTabIds?.length ? [...snap.openTabIds] : ["visao"];
      if (!openTabIds.includes("visao")) openTabIds.unshift("visao");
      current = snap?.current && openTabIds.includes(snap.current) ? snap.current : "visao";
      cliView = snap?.cliView || "lista";
      cliPerfilId = snap?.cliPerfilId || null;
      selectedEmpresaId = snap?.selectedEmpresaId || "farmelhor";
      syncAccessChrome();
      skipToast = true;
      setSection(current, true);
      toast("Voltou ao acesso do escritório");
    }

    function createEmptyCliCadastro() {
      return {
        step: 1,
        submitting: false,
        cepLoading: false,
        errors: {},
        data: {
          cnpj: "",
          razaoSocial: "",
          nomeFantasia: "",
          ie: "",
          im: "",
          regime: "Simples Nacional",
          tipo: "LTDA",
          dataAbertura: "",
          empresaAtiva: true,
          ehMatriz: true,
          matrizId: "",
          cep: "",
          logradouro: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          uf: "TO",
          ibge: "",
          telefone: "",
          whatsapp: "",
          email: "",
          website: "",
          instagram: "",
          facebook: "",
        },
      };
    }

    function openClienteCadastro() {
      cliCadastro = createEmptyCliCadastro();
      paintCliCadastroModal(true);
    }

    function closeClienteCadastro() {
      cliCadastro = createEmptyCliCadastro();
      closeModal();
    }

    function maskCnpj(value) {
      const d = digitsOnly(value).slice(0, 14);
      return d
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    function maskCep(value) {
      const d = digitsOnly(value).slice(0, 8);
      return d.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    function maskPhoneBr(value) {
      const d = digitsOnly(value).slice(0, 11);
      if (d.length === 0) return "";
      if (d.length <= 2) return `(${d}`;
      if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
      if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
      return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    }

    function fieldErrHtml(key) {
      const msg = cliCadastro.errors[key];
      return msg ? `<span class="cli-cad-field-err">${uiSelectEscape(msg)}</span>` : "";
    }

    function fieldInvalid(key) {
      return cliCadastro.errors[key] ? " is-invalid" : "";
    }

    function collectCliCadastroFromDom(root) {
      if (!root) return;
      const d = cliCadastro.data;
      const map = {
        cadCnpj: "cnpj",
        cadRazao: "razaoSocial",
        cadFantasia: "nomeFantasia",
        cadIe: "ie",
        cadIm: "im",
        cadRegime: "regime",
        cadTipo: "tipo",
        cadAbertura: "dataAbertura",
        cadMatrizId: "matrizId",
        cadCep: "cep",
        cadLogradouro: "logradouro",
        cadNumero: "numero",
        cadComplemento: "complemento",
        cadBairro: "bairro",
        cadCidade: "cidade",
        cadUf: "uf",
        cadIbge: "ibge",
        cadTelefone: "telefone",
        cadWhatsapp: "whatsapp",
        cadEmail: "email",
        cadWebsite: "website",
        cadInstagram: "instagram",
        cadFacebook: "facebook",
      };
      Object.entries(map).forEach(([id, key]) => {
        const el = root.querySelector("#" + id);
        if (!el) return;
        let v = el.value || "";
        if (key === "instagram") v = v.replace(/^@+/, "");
        d[key] = v;
      });
      const ativa = root.querySelector("#cadEmpresaAtiva");
      const matriz = root.querySelector("#cadEhMatriz");
      if (ativa) d.empresaAtiva = !!ativa.checked;
      if (matriz) d.ehMatriz = !!matriz.checked;
    }

    function validateCliCadastroAll() {
      const d = cliCadastro.data;
      const errors = {};
      if (digitsOnly(d.cnpj).length !== 14) errors.cnpj = "CNPJ inválido";
      if (!d.razaoSocial) errors.razaoSocial = "Informe a razão social";
      if (!d.regime) errors.regime = "Selecione o regime";
      if (!d.tipo) errors.tipo = "Selecione o tipo";
      if (!d.ehMatriz && !d.matrizId) errors.matrizId = "Vincule a empresa à matriz";
      if (digitsOnly(d.cep).length !== 8) errors.cep = "CEP inválido";
      if (!d.logradouro) errors.logradouro = "Informe o logradouro";
      if (!d.numero) errors.numero = "Informe o número";
      if (!d.bairro) errors.bairro = "Informe o bairro";
      if (!d.cidade) errors.cidade = "Informe a cidade";
      if (!d.uf) errors.uf = "Selecione a UF";
      if (!d.email) errors.email = "Informe o e-mail de contato";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) errors.email = "E-mail inválido";
      if (d.telefone && digitsOnly(d.telefone).length < 10) errors.telefone = "Telefone inválido";
      if (d.whatsapp && digitsOnly(d.whatsapp).length < 10) errors.whatsapp = "WhatsApp inválido";
      if (d.website && !/^https?:\/\//i.test(d.website) && d.website.includes(".")) {
        d.website = "https://" + d.website.replace(/^\/+/, "");
      }
      cliCadastro.errors = errors;
      return Object.keys(errors).length === 0;
    }

    function setCadField(id, value) {
      const el = modalBody?.querySelector("#" + id);
      if (!el) return;
      el.value = value ?? "";
      if (el.tagName === "SELECT") syncUiSelect(el);
    }

    async function lookupViaCep(cepDigits) {
      const hint = modalBody?.querySelector("#cadCepHint");
      cliCadastro.cepLoading = true;
      if (hint) {
        hint.textContent = "Consultando ViaCEP…";
        hint.classList.add("is-loading");
      }
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);
        if (!res.ok) throw new Error("CEP indisponível");
        const json = await res.json();
        if (json.erro) throw new Error("CEP não encontrado");
        cliCadastro.data.logradouro = json.logradouro || "";
        cliCadastro.data.bairro = json.bairro || "";
        cliCadastro.data.cidade = json.localidade || "";
        cliCadastro.data.uf = json.uf || cliCadastro.data.uf;
        cliCadastro.data.ibge = json.ibge || "";
        setCadField("cadLogradouro", cliCadastro.data.logradouro);
        setCadField("cadBairro", cliCadastro.data.bairro);
        setCadField("cadCidade", cliCadastro.data.cidade);
        setCadField("cadUf", cliCadastro.data.uf);
        setCadField("cadIbge", cliCadastro.data.ibge);
        ["cep", "logradouro", "bairro", "cidade", "uf"].forEach((k) => delete cliCadastro.errors[k]);
        modalBody?.querySelectorAll("#cadCep, #cadLogradouro, #cadBairro, #cadCidade, #cadUf").forEach((el) => el.classList.remove("is-invalid"));
        modalBody?.querySelectorAll("#cadCep, #cadLogradouro, #cadBairro, #cadCidade, #cadUf").forEach((el) => {
          const err = el.closest(".cli-field")?.querySelector(".cli-cad-field-err");
          if (err) err.remove();
        });
      } catch (_) {
        cliCadastro.errors.cep = "Não foi possível consultar o CEP";
        const cepInput = modalBody?.querySelector("#cadCep");
        cepInput?.classList.add("is-invalid");
        if (hint) hint.textContent = "Não foi possível consultar o CEP";
      } finally {
        cliCadastro.cepLoading = false;
        if (hint && !cliCadastro.errors.cep) {
          hint.textContent = "Endereço preenchido via ViaCEP.";
          hint.classList.remove("is-loading");
        } else if (hint && cliCadastro.errors.cep) {
          hint.classList.remove("is-loading");
        }
      }
    }

    function buildCliCadastroFormHtml() {
      const d = cliCadastro.data;
      const matrizes = CLIENTES.filter((c) => (c.tipoUnidade || "Matriz") !== "Filial");
      return `
        <div class="cli-cad-scroll">
          <section class="cli-cad-block">
            <h4>Dados de Identificação</h4>
            <hr class="cli-cad-hr" />
            <div class="cli-cad-form">
              <div class="cli-field">
                <label>CNPJ <span class="req">*</span></label>
                <input id="cadCnpj" inputmode="numeric" autocomplete="off" placeholder="00.000.000/0001-00" value="${uiSelectEscape(d.cnpj)}" class="${fieldInvalid("cnpj")}" />
                ${fieldErrHtml("cnpj")}
              </div>
              <div class="cli-field span-2">
                <label>Razão Social <span class="req">*</span></label>
                <input id="cadRazao" placeholder="RAZAO SOCIAL LTDA" value="${uiSelectEscape(d.razaoSocial)}" class="${fieldInvalid("razaoSocial")}" />
                ${fieldErrHtml("razaoSocial")}
              </div>
              <div class="cli-field span-2">
                <label>Nome Fantasia</label>
                <input id="cadFantasia" placeholder="Nome fantasia" value="${uiSelectEscape(d.nomeFantasia)}" />
              </div>
              <div class="cli-field">
                <label>Inscrição Estadual</label>
                <input id="cadIe" placeholder="10.000.000-0" value="${uiSelectEscape(d.ie)}" />
              </div>
              <div class="cli-field">
                <label>Inscrição Municipal</label>
                <input id="cadIm" placeholder="000000" value="${uiSelectEscape(d.im)}" />
              </div>
              <div class="cli-field">
                <label>Regime Tributário <span class="req">*</span></label>
                <select id="cadRegime" class="${fieldInvalid("regime")}">
                  ${REGIME_OPTIONS.map((r) => `<option value="${uiSelectEscape(r)}" ${d.regime === r ? "selected" : ""}>${uiSelectEscape(r)}</option>`).join("")}
                </select>
                ${fieldErrHtml("regime")}
              </div>
              <div class="cli-field">
                <label>Tipo da Empresa <span class="req">*</span></label>
                <select id="cadTipo" class="${fieldInvalid("tipo")}">
                  ${CLI_TIPO_OPTIONS.map((t) => `<option value="${uiSelectEscape(t)}" ${d.tipo === t ? "selected" : ""}>${uiSelectEscape(t)}</option>`).join("")}
                </select>
                ${fieldErrHtml("tipo")}
              </div>
              <div class="cli-field">
                <label>Data de Abertura</label>
                <input id="cadAbertura" type="date" value="${uiSelectEscape(d.dataAbertura)}" />
              </div>
              <div class="cli-field full">
                <div class="cli-cad-toggles">
                  <label class="cfg-switch">
                    <span class="lab">Empresa Ativa</span>
                    <input type="checkbox" id="cadEmpresaAtiva" ${d.empresaAtiva ? "checked" : ""} />
                  </label>
                  <label class="cfg-switch">
                    <span class="lab">É Matriz?</span>
                    <input type="checkbox" id="cadEhMatriz" ${d.ehMatriz ? "checked" : ""} />
                  </label>
                </div>
              </div>
              <div class="cli-field full" id="cadMatrizWrap" style="${d.ehMatriz ? "display:none" : ""}">
                <label>Vincular Filial à Matriz <span class="req">*</span></label>
                <select id="cadMatrizId" class="${fieldInvalid("matrizId")}">
                  <option value="">Selecione a matriz</option>
                  ${matrizes.map((c) => `<option value="${c.id}" ${d.matrizId === c.id ? "selected" : ""}>${uiSelectEscape(c.razaoSocial || c.nome)} · ${uiSelectEscape(c.cnpj)}</option>`).join("")}
                </select>
                ${fieldErrHtml("matrizId")}
                <p class="cli-cad-hint">Selecione a matriz já cadastrada a que esta filial pertence.</p>
              </div>
            </div>
          </section>

          <section class="cli-cad-block">
            <h4>Dados de Localização</h4>
            <hr class="cli-cad-hr" />
            <div class="cli-cad-form">
              <div class="cli-field">
                <label>CEP <span class="req">*</span></label>
                <input id="cadCep" inputmode="numeric" autocomplete="postal-code" placeholder="00000-000" value="${uiSelectEscape(d.cep)}" class="${fieldInvalid("cep")}" />
                ${fieldErrHtml("cep")}
                <p class="cli-cad-hint ${cliCadastro.cepLoading ? "is-loading" : ""}" id="cadCepHint">${cliCadastro.cepLoading ? "Consultando ViaCEP…" : "Preencha o CEP para autocompletar (ViaCEP)."}</p>
              </div>
              <div class="cli-field span-2">
                <label>Logradouro <span class="req">*</span></label>
                <input id="cadLogradouro" placeholder="Rua / Avenida" value="${uiSelectEscape(d.logradouro)}" class="${fieldInvalid("logradouro")}" />
                ${fieldErrHtml("logradouro")}
              </div>
              <div class="cli-field">
                <label>Número <span class="req">*</span></label>
                <input id="cadNumero" placeholder="Nº" value="${uiSelectEscape(d.numero)}" class="${fieldInvalid("numero")}" />
                ${fieldErrHtml("numero")}
              </div>
              <div class="cli-field span-2">
                <label>Complemento</label>
                <input id="cadComplemento" placeholder="Sala, andar…" value="${uiSelectEscape(d.complemento)}" />
              </div>
              <div class="cli-field">
                <label>Bairro <span class="req">*</span></label>
                <input id="cadBairro" value="${uiSelectEscape(d.bairro)}" class="${fieldInvalid("bairro")}" />
                ${fieldErrHtml("bairro")}
              </div>
              <div class="cli-field">
                <label>Cidade <span class="req">*</span></label>
                <input id="cadCidade" value="${uiSelectEscape(d.cidade)}" class="${fieldInvalid("cidade")}" />
                ${fieldErrHtml("cidade")}
              </div>
              <div class="cli-field">
                <label>UF <span class="req">*</span></label>
                <select id="cadUf" class="${fieldInvalid("uf")}">
                  ${UF_OPTIONS.map((u) => `<option value="${u}" ${d.uf === u ? "selected" : ""}>${u}</option>`).join("")}
                </select>
                ${fieldErrHtml("uf")}
              </div>
              <div class="cli-field">
                <label>Código IBGE</label>
                <input id="cadIbge" readonly value="${uiSelectEscape(d.ibge)}" placeholder="Preenchido via CEP" />
              </div>
            </div>
          </section>

          <section class="cli-cad-block">
            <h4>Dados de Contato</h4>
            <hr class="cli-cad-hr" />
            <div class="cli-cad-form">
              <div class="cli-field">
                <label>Telefone Geral</label>
                <div class="cli-input-adorn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <input id="cadTelefone" inputmode="tel" placeholder="(00) 0000-0000" value="${uiSelectEscape(d.telefone)}" class="${fieldInvalid("telefone")}" />
                </div>
                ${fieldErrHtml("telefone")}
              </div>
              <div class="cli-field">
                <label>WhatsApp</label>
                <div class="cli-input-adorn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  <input id="cadWhatsapp" inputmode="tel" placeholder="(00) 00000-0000" value="${uiSelectEscape(d.whatsapp)}" class="${fieldInvalid("whatsapp")}" />
                </div>
                ${fieldErrHtml("whatsapp")}
              </div>
              <div class="cli-field">
                <label>E-mail <span class="req">*</span></label>
                <div class="cli-input-adorn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
                  <input id="cadEmail" type="email" placeholder="contato@empresa.com" value="${uiSelectEscape(d.email)}" class="${fieldInvalid("email")}" />
                </div>
                ${fieldErrHtml("email")}
              </div>
              <div class="cli-field">
                <label>Website</label>
                <div class="cli-input-adorn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  <input id="cadWebsite" type="url" placeholder="https://www.empresa.com" value="${uiSelectEscape(d.website)}" />
                </div>
              </div>
              <div class="cli-field">
                <label>Instagram</label>
                <div class="cli-input-prefix">
                  <span class="pfx">@</span>
                  <input id="cadInstagram" placeholder="usuario" value="${uiSelectEscape((d.instagram || "").replace(/^@+/, ""))}" />
                </div>
              </div>
              <div class="cli-field">
                <label>Facebook</label>
                <div class="cli-input-adorn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  <input id="cadFacebook" placeholder="facebook.com/empresa" value="${uiSelectEscape(d.facebook)}" />
                </div>
              </div>
            </div>
          </section>
        </div>`;
    }

    function paintCliCadastroModal(isOpen) {
      const scrollTop = isOpen ? 0 : (modalBody?.scrollTop || 0);
      const bodyHtml = buildCliCadastroFormHtml();
      const footHtml = `
        <button type="button" class="btn-ghost" data-close id="cadCancelBtn">Cancelar</button>
        <button type="button" class="btn-primary" id="cadSaveBtn" ${cliCadastro.submitting ? "disabled" : ""}>
          ${cliCadastro.submitting ? "Salvando…" : "Salvar Cadastro"}
        </button>`;
      if (isOpen || !backdrop.classList.contains("open") || !modal.classList.contains("cli-cad-modal")) {
        openModal({
          title: "Novo Cliente",
          sub: "",
          wide: true,
          cadastro: true,
          body: bodyHtml,
          foot: footHtml,
        });
      } else {
        modalBody.innerHTML = bodyHtml;
        modalFoot.innerHTML = footHtml;
        enhanceUiSelects(modalBody);
      }
      bindClienteCadastroEvents(modalBody);
      modalFoot.querySelector("#cadSaveBtn")?.addEventListener("click", () => submitClienteCadastro());
      if (!isOpen) modalBody.scrollTop = scrollTop;
      const firstErr = modalBody.querySelector(".is-invalid, .cli-cad-field-err");
      if (firstErr && !isOpen) {
        firstErr.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }

    async function submitClienteCadastro() {
      collectCliCadastroFromDom(modalBody);
      if (!validateCliCadastroAll()) {
        paintCliCadastroModal(false);
        toast("Revise os campos obrigatórios");
        return;
      }
      cliCadastro.submitting = true;
      const saveBtn = document.getElementById("cadSaveBtn");
      if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.textContent = "Salvando…";
      }
      const d = cliCadastro.data;
      const payload = {
        entidade_juridica: {
          cnpj: d.cnpj,
          razao_social: d.razaoSocial,
          nome_fantasia: d.nomeFantasia || d.razaoSocial,
          inscricao_estadual: d.ie,
          inscricao_municipal: d.im,
          regime: d.regime,
          tipo: d.tipo,
          data_abertura: d.dataAbertura,
          status: d.empresaAtiva ? "Ativo" : "Inativo",
          eh_matriz: d.ehMatriz,
          matriz_id: d.ehMatriz ? null : d.matrizId,
        },
        endereco: {
          cep: d.cep,
          logradouro: d.logradouro,
          numero: d.numero,
          complemento: d.complemento,
          bairro: d.bairro,
          cidade: d.cidade,
          uf: d.uf,
          codigo_ibge: d.ibge,
        },
        contato: {
          telefone: d.telefone,
          whatsapp: d.whatsapp,
          email: d.email,
          website: d.website,
          instagram: d.instagram ? "@" + d.instagram.replace(/^@+/, "") : "",
          facebook: d.facebook,
        },
      };
      try {
        await new Promise((r) => setTimeout(r, 450));
        const id = "cli" + Date.now().toString(36);
        const nextCode = String(62000 + CLIENTES.length);
        const fantasia = payload.entidade_juridica.nome_fantasia;
        const short = fantasia.split(/\s+/)[0];
        const enderecoStr = [
          payload.endereco.logradouro,
          payload.endereco.numero,
          payload.endereco.complemento,
          payload.endereco.bairro,
          `${payload.endereco.cidade}/${payload.endereco.uf}`,
          `CEP ${payload.endereco.cep}`,
        ].filter(Boolean).join(", ").replace(/, (?=CEP)/, " — ");
        const novo = {
          id,
          code: nextCode,
          nome: fantasia,
          short,
          fantasia,
          razaoSocial: payload.entidade_juridica.razao_social,
          cnpj: payload.entidade_juridica.cnpj,
          prioridade: "media",
          status: payload.entidade_juridica.status,
          regime: payload.entidade_juridica.regime,
          estado: payload.endereco.uf,
          initials: short.slice(0, 2).toUpperCase(),
          faturamento: 50000,
          faturamentoAnterior: 45000,
          tipoUnidade: payload.entidade_juridica.eh_matriz ? "Matriz" : "Filial",
          matrizId: payload.entidade_juridica.matriz_id || null,
          tipoSocietario: payload.entidade_juridica.tipo,
          dataAbertura: payload.entidade_juridica.data_abertura,
          funcInternos: 0,
          funcExternos: 0,
          endereco: enderecoStr,
          ie: payload.entidade_juridica.inscricao_estadual || "—",
          im: payload.entidade_juridica.inscricao_municipal || "—",
          socios: ["Sócio administrador"],
          certStatus: "ok",
          certValidade: "31/12/2027",
          certTitular: "Sócio administrador",
          contato: payload.contato,
          ibge: payload.endereco.codigo_ibge,
          _payload: payload,
        };
        CLIENTES.push(novo);
        empresaMetrics[id] = buildEmpresaMetrics(novo);
        renderEmpresaOptions();
        cliCadastro = createEmptyCliCadastro();
        closeModal();
        toast("Cliente cadastrado com sucesso!", { success: true });
        openClientePerfil(id);
      } catch (_) {
        cliCadastro.submitting = false;
        paintCliCadastroModal(false);
        toast("Falha ao salvar o cadastro. Tente novamente.");
      }
    }

    function bindClienteCadastroEvents(root) {
      if (!root) return;
      root.querySelector("#cadEhMatriz")?.addEventListener("change", (e) => {
        collectCliCadastroFromDom(root);
        cliCadastro.data.ehMatriz = !!e.target.checked;
        if (cliCadastro.data.ehMatriz) cliCadastro.data.matrizId = "";
        const box = root.querySelector("#cadMatrizWrap");
        if (box) box.style.display = cliCadastro.data.ehMatriz ? "none" : "";
      });
      root.querySelector("#cadCnpj")?.addEventListener("input", (e) => {
        e.target.value = maskCnpj(e.target.value);
        cliCadastro.data.cnpj = e.target.value;
      });
      root.querySelector("#cadCep")?.addEventListener("input", (e) => {
        e.target.value = maskCep(e.target.value);
        cliCadastro.data.cep = e.target.value;
        const digits = digitsOnly(e.target.value);
        if (digits.length === 8) lookupViaCep(digits);
      });
      root.querySelector("#cadTelefone")?.addEventListener("input", (e) => {
        e.target.value = maskPhoneBr(e.target.value);
        cliCadastro.data.telefone = e.target.value;
      });
      root.querySelector("#cadWhatsapp")?.addEventListener("input", (e) => {
        e.target.value = maskPhoneBr(e.target.value);
        cliCadastro.data.whatsapp = e.target.value;
      });
      root.querySelector("#cadInstagram")?.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/^@+/, "").replace(/\s+/g, "");
        cliCadastro.data.instagram = e.target.value;
      });
    }


    function openCertMonitor({ clienteId = null, mode = "all", toastMsg } = {}) {
      securityCertFilterClienteId = clienteId || null;
      securityCertFilterMode = mode || "all";
      if (!openTabIds.includes("seguranca")) openTabIds.push("seguranca");
      skipToast = true;
      setSection("seguranca", true);
      toast(toastMsg || (clienteId
        ? `Monitoramento · ${CLIENTES.find((c) => c.id === clienteId)?.fantasia || "cliente"}`
        : mode === "acao"
          ? "Monitoramento · certificados que exigem ação"
          : "Monitoramento de certificados"));
    }

    function gotoSecurityCertForCliente(clientId) {
      openCertMonitor({ clienteId: clientId || null, mode: clientId ? "all" : "all" });
    }

    function gotoSecurityCertAcao() {
      openCertMonitor({
        clienteId: null,
        mode: "acao",
        toastMsg: "Monitoramento · vencidos e a vencer",
      });
    }

    function gotoModule(id) {
      if (id === "configuracoes") {
        if (isClientePortal()) {
          toast("Configurações do escritório indisponíveis no acesso cliente");
          return;
        }
        openModal({
          title: "Configurações",
          sub: "Preferências da conta e do sistema",
          body: `
            <label>Nome</label>
            <input value="Marina Souza" />
            <label>E-mail</label>
            <input value="marina.souza@escritorio.com.br" />
            <label>Cargo</label>
            <input value="Analista Fiscal" />
            <label>Departamento</label>
            <input value="Contabilidade" />`,
          foot: `
            <button type="button" class="btn-ghost" data-close>Cancelar</button>
            <button type="button" class="btn-primary" data-close onclick="toast('Configurações salvas')">Salvar</button>`,
        });
        return;
      }
      if (!resolveSection(id) && !sections.find((s) => s.id === id)) {
        toast("Módulo indisponível");
        return;
      }
      if (isClientePortal() && !CLIENT_PORTAL_TAB_IDS.includes(id)) {
        toast("Módulo indisponível no acesso cliente");
        return;
      }
      if (id !== "visao" && !openTabIds.includes(id)) openTabIds.push(id);
      skipToast = true;
      setSection(id, true);
    }

    function buildSecurityAlertText(counts) {
      const parts = [];
      if (counts.vencidos > 0) {
        parts.push(counts.vencidos === 1
          ? "1 certificado vencido"
          : `${counts.vencidos} certificados vencidos`);
      }
      if (counts.aVencer > 0) {
        parts.push(counts.aVencer === 1
          ? "1 a vencer"
          : `${counts.aVencer} a vencer`);
      }
      if (!parts.length) return "Atenção: certificados digitais em conformidade";
      return `Atenção: ${parts.join(" e ")}`;
    }

    function renderSecurityAlert() {
      const counts = getCertAlertCounts();
      const show = !securityAlertDismissed && counts.acao > 0;
      const textMsg = buildSecurityAlertText(counts);
      [
        { el: "agendaSecurityAlert", text: "agendaSecurityText" },
        { el: "dashSecurityAlert", text: "dashSecurityText" },
      ].forEach(({ el, text }) => {
        const box = document.getElementById(el);
        const label = document.getElementById(text);
        if (!box) return;
        box.classList.toggle("is-visible", show);
        if (label) label.textContent = textMsg;
      });
      syncNotificacoesCertificados();
    }

    function syncNotificacoesCertificados() {
      const host = document.getElementById("notifCertItems");
      const badge = document.querySelector("#notifBtn .badge");
      const alerts = getCertificadosAcao();
      if (badge) badge.classList.toggle("is-hidden", alerts.length === 0);
      if (!host) return;
      if (!alerts.length) {
        host.innerHTML = "";
        return;
      }
      host.innerHTML = alerts.slice(0, 5).map((r) => {
        const detalhe = r.status === "vencido"
          ? `${r.fantasia} · ${r.validadeLabel}`
          : `${r.fantasia} · ${r.dias} dia${r.dias === 1 ? "" : "s"} restantes`;
        return `
          <button type="button" class="notif-item" data-notif="cert" data-cert-id="${r.id}">
            <strong>Certificado digital · ${r.meta.label}</strong>
            <span>${detalhe}</span>
            <span class="proc-badge ${r.meta.badge}" style="margin-top:4px">${r.meta.label}</span>
          </button>`;
      }).join("");
      if (alerts.length > 5) {
        host.innerHTML += `
          <button type="button" class="notif-item" data-notif="cert-acao">
            <strong>Ver todos os alertas de certificado</strong>
            <span>${alerts.length} itens exigem ação</span>
          </button>`;
      }
    }

    function getEntregasDoPeriodo() {
      const y = agendaMonth.getFullYear();
      const m = String(agendaMonth.getMonth() + 1).padStart(2, "0");
      const prefix = `${y}-${m}`;
      return agendaTasksScoped().filter((t) => !t.arquivada && String(t.date || "").startsWith(prefix));
    }

    function renderAgendaMain() {
      renderSecurityAlert();
      const entregas = getEntregasDoPeriodo();
      const totais = entregas.length;
      const atrasadas = entregas.filter((t) => t.status === "atrasada").length;
      const noPrazo = entregas.filter((t) => t.status === "no-prazo").length;
      const pendentes = entregas.filter((t) => t.status === "atrasada" || t.status === "no-prazo" || procStatusMeta(t.status).sucesso === null).length;
      const pctOf = (n) => (totais ? Math.round((n / totais) * 100) : 0);

      const periodEl = document.querySelector(".agenda-overview-period");
      if (periodEl) {
        const label = agendaMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
        periodEl.textContent = label.charAt(0).toUpperCase() + label.slice(1);
      }

      const clearBtn = document.getElementById("agendaKpiClear");
      if (clearBtn) clearBtn.classList.toggle("is-visible", !!agendaKpiFilter);

      const kpis = document.getElementById("agendaKpis");
      if (kpis) {
        const kpiIcons = {
          totais: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
          pendentes: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
          prazo: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>`,
          atrasadas: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>`,
        };
        const cards = [
          { key: "totais", label: "Totais", value: totais, hint: "Entregas do período", cls: "totais" },
          { key: "pendentes", label: "Pendentes", value: pendentes, hint: "Entregas ainda em aberto", cls: "pendentes" },
          { key: "prazo", label: "No prazo", value: noPrazo, hint: "Entregas dentro do prazo", cls: "prazo" },
          { key: "atrasadas", label: "Atrasadas", value: atrasadas, hint: "Entregas fora do prazo", cls: "atrasadas" },
        ];
        kpis.innerHTML = cards.map((c) => {
          const pct = pctOf(c.value);
          const active = agendaKpiFilter === c.key;
          return `
          <button type="button" class="agenda-kpi ${c.cls}${active ? " active" : ""}" data-agenda-kpi="${c.key}" aria-pressed="${active}">
            <span class="kpi-filter-tag">Filtro</span>
            <span class="kpi-icon" aria-hidden="true">${kpiIcons[c.key]}</span>
            <span class="kpi-text">
              <span class="kpi-label">${c.label}</span>
              <span class="kpi-value-row">
                <span class="kpi-value">${c.value}</span>
                <span class="kpi-pct">${pct}%</span>
              </span>
              <span class="kpi-hint">${c.hint}</span>
            </span>
            <span class="kpi-bar" aria-hidden="true"><i style="width:${pct}%"></i></span>
          </button>`;
        }).join("");
      }

      renderAgendaOpsTable();
      renderAgendaEntregasBoard();
      syncAgendaQuickFilters();
    }

    function syncAgendaQuickFilters() {
      document.querySelectorAll("[data-agenda-feed-filter]").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.agendaFeedFilter === agendaFeedFilter);
      });
    }

    function syncAgendaEntregaStatusUi() {
      const label = document.getElementById("agendaEntregaStatusLabel");
      const dot = document.getElementById("agendaEntregaStatusDot");
      const menu = document.getElementById("agendaEntregaStatusMenu");
      const meta = agendaEntregaStatus
        ? procStatusMeta(agendaEntregaStatus)
        : { label: "Status", color: "#94a3b8" };
      if (label) label.textContent = meta.label || "Status";
      if (dot) dot.style.background = meta.color || "#94a3b8";
      if (menu) {
        menu.querySelectorAll(".agenda-ops-status-opt").forEach((btn) => {
          btn.classList.toggle("active", (btn.dataset.value || "") === agendaEntregaStatus);
        });
      }
    }

    function initAgendaEntregaStatusMenu() {
      const menu = document.getElementById("agendaEntregaStatusMenu");
      if (!menu) return;
      if (menu.dataset.ready !== "full-status-v2") {
        menu.innerHTML = [
          `<button type="button" class="agenda-ops-status-opt${!agendaEntregaStatus ? " active" : ""}" role="option" data-value="">
            <i class="status-dot" style="background:#94a3b8" aria-hidden="true"></i>
            <span>Todas</span>
          </button>`,
          ...PROC_STATUS_OPTIONS.map((o) => `
            <button type="button" class="agenda-ops-status-opt${agendaEntregaStatus === o.value ? " active" : ""}" role="option" data-value="${o.value}">
              <i class="status-dot" style="background:${o.color}" aria-hidden="true"></i>
              <span>${o.label}</span>
            </button>`),
        ].join("");
        menu.dataset.ready = "full-status-v2";
      }
      syncAgendaEntregaStatusUi();
    }

    function getAgendaOpsFilteredData() {
      const procs = (sections.find((s) => s.id === "processos")?.items || [])
        .filter((p) => !p.arquivado && (!isClientePortal() || p.clienteId === portalClienteId));
      return { procs, entregas: [] };
    }

    function resolveClienteForOps(p) {
      if (p.clienteId) {
        const c = CLIENTES.find((x) => x.id === p.clienteId);
        if (c) return c;
      }
      const byName = CLIENTES.find((c) => normalizeSearchText(c.nome) === normalizeSearchText(p.cliente || p.razaoSocial || ""));
      return byName || null;
    }

    function fmtOpsDate(iso) {
      if (!iso) return "—";
      if (/^\d{4}-\d{2}$/.test(iso)) return iso.split("-").reverse().join("/");
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(iso)) return iso;
      const [y, m, d] = String(iso).split("-");
      return d ? `${d}/${m}/${y}` : iso;
    }

    function renderAgendaOpsFlat(procs) {
      const opsBody = document.getElementById("agendaOpsBody");
      if (!opsBody) return;

      const sorted = [...procs].sort((a, b) => String(b.criado || "").localeCompare(String(a.criado || "")));

      opsBody.innerHTML = sorted.map((p) => {
        const prog = typeof procProgress === "function" ? procProgress(p.etapas) : { pct: 0 };
        const pct = prog.pct || 0;
        const st = procStatusMeta(p.status);
        return `
          <tr data-agenda-proc="${p.id}">
            <td>
              <span class="proc-name">${p.title}</span>
              <span class="proc-id">#${p.id} · ${p.dept || "—"}</span>
              <span class="proc-badge ${st.badge}" style="margin-top:4px;width:fit-content">${st.label}</span>
            </td>
            <td>${p.cliente || "—"}</td>
            <td>${p.responsavel || "—"}</td>
            <td>
              <div class="proc-dates">
                <span><span class="d-lab">Criado </span>${fmtOpsDate(p.criado)}</span>
                <span><span class="d-lab">Comp. </span>${fmtOpsDate(p.competencia)}</span>
              </div>
            </td>
            <td class="prog-cell">
              <div class="proc-progress">
                <div class="proc-progress-bar"><i style="width:${pct}%"></i></div>
                <span class="prog-pct">${pct}%</span>
              </div>
            </td>
            <td class="row-actions">
              <button type="button" class="agenda-edit-btn tip-bottom" data-agenda-edit="${p.id}" data-tip="Editar processo" aria-label="Editar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              </button>
            </td>
          </tr>`;
      }).join("") || `<tr><td colspan="6" style="text-align:center;color:var(--muted)">Nenhum processo ativo</td></tr>`;
    }

    function renderAgendaOpsTable() {
      const { procs } = getAgendaOpsFilteredData();
      renderAgendaOpsFlat(procs);
    }

    function populateAgendaEntregaFilters() {
      initAgendaEntregaStatusMenu();
      const viewSel = document.getElementById("agendaEntregaView");
      const funSel = document.getElementById("agendaEntregaFuncionario");
      const respSel = document.getElementById("agendaEntregaResp");
      if (!funSel || !respSel) return;

      if (!agendaEntregaFiltersReady) {
        const people = [...new Set(agendaTasks.map((t) => t.responsavel).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
        const peopleOpts = people.map((p) => `<option value="${p}">${p}</option>`).join("");
        funSel.innerHTML = `<option value="">Funcionário</option>${peopleOpts}`;
        respSel.innerHTML = `<option value="">Responsável</option>${peopleOpts}`;
        agendaEntregaFiltersReady = true;
      }

      if (viewSel) viewSel.value = agendaEntregaView || "tarefas";
      funSel.value = agendaEntregaFuncionario;
      respSel.value = agendaEntregaResp;
      syncAgendaEntregaStatusUi();
      enhanceUiSelects(document.getElementById("agendaEntregasFilters") || document);
    }

    function filterAgendaEntregaTasks(tasks) {
      const q = normalizeSearchText(agendaEntregaQuery);
      return tasks.filter((t) => {
        if (q) {
          const hay = normalizeSearchText([t.nome, t.razaoSocial, t.responsavel, t.cnpj].filter(Boolean).join(" "));
          if (!hay.includes(q)) return false;
        }
        if (agendaEntregaFuncionario && t.responsavel !== agendaEntregaFuncionario) return false;
        if (agendaEntregaStatus && t.status !== agendaEntregaStatus) return false;
        if (agendaEntregaResp && t.responsavel !== agendaEntregaResp) return false;
        return true;
      });
    }

    function buildAgendaEntregaColumns(tasks) {
      const view = agendaEntregaView || "tarefas";
      if (view === "empresas") {
        const keys = [...new Set(tasks.map((t) => t.razaoSocial || t.clienteId || "Sem empresa"))];
        return keys.map((k, i) => ({
          key: `emp-${i}`,
          cls: i % 3 === 0 ? "atrasadas" : i % 3 === 1 ? "hoje" : "prazo",
          title: k,
          items: tasks.filter((t) => (t.razaoSocial || t.clienteId || "Sem empresa") === k),
        }));
      }
      if (view === "funcionarios") {
        const keys = [...new Set(tasks.map((t) => t.responsavel || "Sem responsável"))].sort((a, b) => a.localeCompare(b, "pt-BR"));
        return keys.map((k, i) => ({
          key: `fun-${i}`,
          cls: i % 3 === 0 ? "atrasadas" : i % 3 === 1 ? "hoje" : "prazo",
          title: k,
          items: tasks.filter((t) => (t.responsavel || "Sem responsável") === k),
        }));
      }
      return [
        {
          key: "atrasadas",
          cls: "atrasadas",
          title: "Atrasadas",
          items: tasks.filter((t) => t.status === "atrasada" || t.status === "ent-atrasada" || t.status === "justificativa-atrasada"),
        },
        {
          key: "hoje",
          cls: "hoje",
          title: "Do dia selecionado",
          items: tasks,
        },
        {
          key: "prazo",
          cls: "prazo",
          title: "No prazo",
          items: tasks.filter((t) => t.status === "no-prazo" || t.status === "ent-antecipada" || t.status === "em-andamento"),
        },
      ];
    }

    function renderAgendaEntregasBoard() {
      // Parte 8: quadro filtrado pelo dia selecionado + KPI + filtros do board
      const board = document.getElementById("agendaEntregasBoard");
      if (!board) return;

      populateAgendaEntregaFilters();

      let tasks = tasksForDay(agendaSelected);
      if (agendaKpiFilter === "atrasadas") tasks = tasks.filter((t) => t.status === "atrasada" || t.status === "ent-atrasada");
      else if (agendaKpiFilter === "prazo") tasks = tasks.filter((t) => t.status === "no-prazo" || t.status === "ent-antecipada");
      else if (agendaKpiFilter === "pendentes") {
        tasks = tasks.filter((t) => t.status === "atrasada" || t.status === "no-prazo" || t.status === "pendente" || t.status === "em-andamento");
      }
      tasks = filterAgendaEntregaTasks(tasks);

      const titleEl = document.getElementById("agendaEntregasTitle");
      const subEl = document.getElementById("agendaEntregasSub");
      const countEl = document.getElementById("agendaEntregasCount");
      if (titleEl) titleEl.textContent = "Quadro de Entregas";
      if (subEl) subEl.textContent = formatAgendaDayLong(agendaSelected);
      if (countEl) {
        const n = tasks.length;
        countEl.textContent = n === 0
          ? "Nenhuma entrega encontrada"
          : n === 1
            ? "1 entrega encontrada"
            : `${n} entregas encontradas`;
      }

      if (!tasks.length) {
        board.innerHTML = `
          <div class="agenda-entregas-empty-day">
            <strong>Nenhuma entrega encontrada.</strong>
            <span>Selecione outra data ou altere os filtros.</span>
          </div>`;
        board.classList.add("is-refreshing");
        requestAnimationFrame(() => {
          setTimeout(() => board.classList.remove("is-refreshing"), 180);
        });
        return;
      }

      const cols = buildAgendaEntregaColumns(tasks);

      const cardHtml = (t) => {
        const st = procStatusMeta(t.status);
        const cli = CLIENTES.find((c) => c.id === t.clienteId);
        const empresaNome = cli?.fantasia || cli?.nome || t.razaoSocial || "—";
        const empresaTip = t.razaoSocial && t.razaoSocial !== empresaNome ? t.razaoSocial : empresaNome;
        return `
        <div class="agenda-entregas-card tip-bottom" data-tip="Detalhe da entrega" data-agenda-board-task="${t.id}" role="button" tabindex="0">
          <div class="row">
            <h5>${t.nome}</h5>
            <span class="agenda-tag ${t.status === "atrasada" || t.status === "ent-atrasada" || t.status === "justificativa-atrasada" ? "atrasada" : "no-prazo"}">${st.label}</span>
          </div>
          <div class="detail">
            <div class="meta"><b>Empresa</b><span class="val" title="${empresaTip}">${empresaNome}</span></div>
            <div class="meta"><b>Responsável</b><span class="val">${t.responsavel}</span></div>
            <div class="meta"><b>Prazo</b><span class="val">${t.prazoLegal}</span></div>
            <div class="meta"><b>Competência</b><span class="val">${t.competencia}</span></div>
          </div>
          <div class="card-actions">
            <button type="button" class="btn-ghost" data-task-extra="anexo" data-task-id="${t.id}">Anexar</button>
            <button type="button" class="btn-primary" data-task-extra="concluir" data-task-id="${t.id}">Concluir</button>
          </div>
        </div>`;
      };

      board.classList.toggle("view-grouped", agendaEntregaView !== "tarefas");
      board.innerHTML = cols.map((col) => `
        <div class="agenda-entregas-col ${col.cls}">
          <div class="agenda-entregas-col-head">
            <strong>${col.title}</strong>
            <span>${col.items.length}</span>
          </div>
          <div class="agenda-entregas-cards">
            ${col.items.length
              ? col.items.map(cardHtml).join("")
              : `<div class="agenda-entregas-empty">Nenhuma entrega</div>`}
          </div>
        </div>`).join("");

      // Parte 8: feedback visual ao atualizar o board
      board.classList.add("is-refreshing");
      requestAnimationFrame(() => {
        setTimeout(() => board.classList.remove("is-refreshing"), 180);
      });
    }

    function renderAgendaFeed() {
      // Parte 8: só atualiza o resumo do dia (#agendaFeedTitle / #agendaFeedCount) — sem cards
      const tasks = tasksForDay(agendaSelected);
      const titleEl = document.getElementById("agendaFeedTitle");
      const countEl = document.getElementById("agendaFeedCount");
      if (titleEl) titleEl.textContent = formatAgendaDayLabel(agendaSelected);
      if (countEl) {
        const n = tasks.length;
        countEl.textContent = `${n} tarefa${n === 1 ? "" : "s"}`;
      }
      // #agendaFeed removido do HTML — ok se não existir
    }

    function renderAgenda() {
      renderAgendaMain();
      renderAgendaCalendar();
      renderAgendaFeed();
    }

    function openEditProcessoModal(proc) {
      const arquivado = !!proc.arquivado;
      openModal({
        title: "Editar processo",
        sub: proc.title,
        body: `
          <label>Responsável</label>
          <input id="editProcResp" value="${proc.responsavel || ""}" />
          <label>Competência (AAAA-MM)</label>
          <input id="editProcComp" value="${proc.competencia || ""}" />
          <label>Departamento</label>
          <select id="editProcDept">
            ${procDeptOptionsHtml(proc.dept)}
          </select>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-ghost" id="editProcArchive">${arquivado ? "Desarquivar" : "Arquivar processo"}</button>
          <button type="button" class="btn-primary" id="editProcSave">Salvar</button>`,
      });
      document.getElementById("editProcSave")?.addEventListener("click", () => {
        proc.responsavel = document.getElementById("editProcResp")?.value || proc.responsavel;
        proc.competencia = document.getElementById("editProcComp")?.value || proc.competencia;
        proc.dept = document.getElementById("editProcDept")?.value || proc.dept;
        closeModal();
        renderAgendaOpsTable();
        if (typeof renderProcessos === "function") renderProcessos();
        toast("Processo atualizado");
      });
      document.getElementById("editProcArchive")?.addEventListener("click", () => {
        proc.arquivado = !proc.arquivado;
        closeModal();
        renderAgendaOpsTable();
        if (typeof renderProcessos === "function") renderProcessos();
        toast(proc.arquivado ? "Processo arquivado" : "Processo desarquivado");
      });
    }

    function renderGlobalSearch(term) {
      const menu = document.getElementById("globalSearchMenu");
      const wrap = document.getElementById("globalSearchWrap");
      if (!menu || !wrap) return;
      const q = String(term || "").trim().toLowerCase();
      if (!q) {
        wrap.classList.remove("open");
        menu.innerHTML = "";
        return;
      }
      const clients = CLIENTES.map((c) => ({
        type: "client",
        id: c.id,
        nome: c.nome,
        meta: `CNPJ ${c.cnpj} · ${c.estado} · ${c.status}`,
      })).filter((c) => `${c.nome} ${c.meta}`.toLowerCase().includes(q));

      const procs = (sections.find((s) => s.id === "processos")?.items || [])
        .filter((p) => !p.arquivado)
        .filter((p) => `${p.id} ${p.title} ${p.cliente || ""}`.toLowerCase().includes(q))
        .slice(0, 5)
        .map((p) => ({ type: "proc", id: p.id, nome: p.title, meta: `#${p.id} · ${p.cliente || p.dept || ""}` }));

      const results = [...clients, ...procs];
      wrap.classList.add("open");
      menu.innerHTML = results.length
        ? results.map((r) => r.type === "client"
          ? `<button type="button" class="global-search-item" data-global-client="${r.id}">
              <strong>${r.nome}</strong>
              <span>${r.meta}</span>
            </button>`
          : `<button type="button" class="global-search-item" data-global-proc="${r.id}">
              <strong>${r.nome}</strong>
              <span>${r.meta}</span>
            </button>`).join("")
        : `<div class="global-search-empty">Nenhum resultado encontrado</div>`;
    }
    let procFiltros = {
      search: "",
      status: "",
      dept: "",
      responsavel: "",
      arquivados: false,
      view: "list",
      groupBy: "lista", // lista | empresa
      expandedClients: new Set(),
    };

    const textTabs = document.getElementById("textTabs");
    const emptyIcon = document.getElementById("emptyIcon");
    const emptyTitle = document.getElementById("emptyTitle");
    const emptyDesc = document.getElementById("emptyDesc");
    const emptyState = document.getElementById("emptyState");
    const fakeList = document.getElementById("fakeList");
    const kanbanWrap = document.getElementById("kanbanWrap");
    const kanbanBoard = document.getElementById("kanbanBoard");
    const processosWrap = document.getElementById("processosWrap");
    const agendaWrap = document.getElementById("agendaWrap");
    const agendaCal = document.getElementById("agendaCal");
    const agendaFeed = document.getElementById("agendaFeed");
    const procKpis = document.getElementById("procKpis");
    const procFilters = document.getElementById("procFilters");
    const procGrid = document.getElementById("procGrid");
    const dashboard = document.getElementById("dashboard");
    const tabActions = document.getElementById("tabActions");
    const contentPanel = document.getElementById("contentPanel");
    const expandBtn = document.getElementById("expandBtn");
    const dashViewTools = document.getElementById("dashViewTools");
    const filterWrap = document.getElementById("filterWrap");
    const filterBtn = document.getElementById("filterBtn");
    const exportBtn = document.getElementById("exportBtn");
    const expandBackdrop = document.getElementById("expandBackdrop");
    const toastEl = document.getElementById("toast");
    const backdrop = document.getElementById("modalBackdrop");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalSub = document.getElementById("modalSub");
    const modalBody = document.getElementById("modalBody");
    const modalFoot = document.getElementById("modalFoot");
    const empresaWrap = document.getElementById("empresaWrap");
    const chatPanel = document.getElementById("chatPanel");

    function money(n) {
      return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    function moneyShort(n) {
      if (n >= 1000000) return `R$ ${(n / 1000000).toFixed(1).replace(".", ",")} mi`;
      return `R$ ${Math.round(n).toLocaleString("pt-BR")}`;
    }

    function updateInfoChips() {
      const ids = Object.keys(empresaMetrics);
      let regime, estado, status, prioridade;

      if (selectedEmpresaId === "all") {
        const regimes = [...new Set(ids.map((id) => empresaMetrics[id].regime))];
        const estados = [...new Set(ids.map((id) => empresaMetrics[id].estado))];
        regime = regimes.length === 1 ? regimes[0] : "Misto";
        estado = estados.length === 1 ? estados[0] : `${estados.length} UFs`;
        status = "Ativo";
        const ranks = { alta: 3, media: 2, baixa: 1 };
        prioridade = ids.reduce((best, id) => {
          const p = empresaMetrics[id].prioridade || "baixa";
          return ranks[p] > ranks[best] ? p : best;
        }, "baixa");
      } else {
        const data = empresaMetrics[selectedEmpresaId];
        regime = data.regime;
        estado = data.estado;
        status = data.status;
        prioridade = data.prioridade || "media";
      }

      document.getElementById("chipRegime").textContent = regime;
      document.getElementById("chipEstado").textContent = estado;
      document.getElementById("statusLabel").textContent = status;

      const badge = document.getElementById("priorityBadge");
      const prioLabel = PRIORIDADE_OPTIONS.find((p) => p.value === prioridade)?.label || "Média";
      badge.className = `chip-select-btn priority-${prioridade} tip-bottom`;
      badge.dataset.tip = "Nível de prioridade da empresa";
      document.getElementById("priorityLabel").textContent = prioLabel;

      const statusBtn = document.getElementById("statusPill");
      statusBtn.classList.toggle("status-inativo", status === "Inativo");

      syncChipMenus({ prioridade, status, regime, estado });
    }

    function syncChipMenus(values) {
      const menus = {
        prioridade: { el: document.getElementById("priorityMenu"), active: values.prioridade },
        status: { el: document.getElementById("statusMenu"), active: values.status },
        regime: { el: document.getElementById("regimeMenu"), active: values.regime },
        estado: { el: document.getElementById("estadoMenu"), active: values.estado },
      };

      if (menus.prioridade.el) {
        menus.prioridade.el.querySelectorAll(".chip-opt").forEach((opt) => {
          opt.classList.toggle("active", opt.dataset.value === values.prioridade);
        });
      }
      if (menus.status.el) {
        menus.status.el.querySelectorAll(".chip-opt").forEach((opt) => {
          opt.classList.toggle("active", opt.dataset.value === values.status);
        });
      }
      if (menus.regime.el) {
        menus.regime.el.querySelectorAll(".chip-opt").forEach((opt) => {
          opt.classList.toggle("active", opt.dataset.value === values.regime);
        });
      }
      if (menus.estado.el) {
        menus.estado.el.querySelectorAll(".chip-opt").forEach((opt) => {
          opt.classList.toggle("active", opt.dataset.value === values.estado);
        });
      }
    }

    function renderChipMenus() {
      const priorityMenu = document.getElementById("priorityMenu");
      const statusMenu = document.getElementById("statusMenu");
      const regimeMenu = document.getElementById("regimeMenu");
      const estadoMenu = document.getElementById("estadoMenu");

      priorityMenu.innerHTML = PRIORIDADE_OPTIONS.map((p) =>
        `<button type="button" class="chip-opt" role="option" data-value="${p.value}">${p.label}</button>`
      ).join("");

      statusMenu.innerHTML = statusOptions.map((s) =>
        `<button type="button" class="chip-opt" role="option" data-value="${s}">${s}</button>`
      ).join("");

      regimeMenu.innerHTML = REGIME_OPTIONS.map((r) =>
        `<button type="button" class="chip-opt" role="option" data-value="${r}">${r}</button>`
      ).join("");

      estadoMenu.innerHTML = UF_OPTIONS.map((uf) =>
        `<button type="button" class="chip-opt" role="option" data-value="${uf}">${uf}</button>`
      ).join("");
    }

    function closeAllChipSelects() {
      document.querySelectorAll(".chip-select.open").forEach((wrap) => {
        wrap.classList.remove("open");
        const btn = wrap.querySelector(".chip-select-btn[aria-expanded]");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    }

    function applyChipValue(field, value) {
      const matches = Object.keys(empresaMetrics).filter((id) => {
        const data = empresaMetrics[id];
        if (field === "prioridade") return data.prioridade === value;
        if (field === "status") return data.status === value;
        if (field === "regime") return data.regime === value;
        if (field === "estado") return data.estado === value;
        return false;
      });

      if (!matches.length) {
        toast("Nenhuma empresa com esse filtro");
        return;
      }

      chipListFilter = { field, value };

      let nextId = matches[0];
      if (matches.includes(selectedEmpresaId) && matches.length > 1) {
        const idx = matches.indexOf(selectedEmpresaId);
        nextId = matches[(idx + 1) % matches.length];
      }

      const opt = document.querySelector(`#empresaOptions .empresa-option[data-id="${nextId}"]`);
      if (!opt) return;
      selectEmpresaFromOption(opt, { silentToast: true, keepFilter: true });

      const titles = { prioridade: "Prioridade", status: "Status", regime: "Regime", estado: "Estado" };
      const labels = {
        prioridade: PRIORIDADE_OPTIONS.find((p) => p.value === value)?.label || value,
        status: value,
        regime: value,
        estado: value,
      };
      const short = opt.dataset.short || nextId;
      toast(`${titles[field]}: ${labels[field]} · ${short}`);
    }

    function selectEmpresaFromOption(opt, { silentToast, keepFilter } = {}) {
      if (!keepFilter) chipListFilter = null;
      document.querySelectorAll(".empresa-option").forEach((o) => o.classList.remove("active"));
      opt.classList.add("active");
      selectedEmpresaId = opt.dataset.id || "farmelhor";
      const code = opt.dataset.code || "";
      const short = opt.dataset.short || "";
      const cnpj = opt.dataset.cnpj || "";
      document.getElementById("empresaName").textContent = short;
      const codeEl = document.getElementById("empresaCode");
      const cnpjEl = document.getElementById("empresaCnpj");
      if (code) {
        codeEl.hidden = false;
        codeEl.textContent = code;
      } else {
        codeEl.hidden = true;
        codeEl.textContent = "";
      }
      if (cnpj) {
        cnpjEl.hidden = false;
        cnpjEl.textContent = `CNPJ ${cnpj}`;
      } else {
        cnpjEl.hidden = true;
        cnpjEl.textContent = selectedEmpresaId === "all" ? "Visão consolidada do grupo" : "";
        if (selectedEmpresaId === "all") cnpjEl.hidden = false;
      }
      const searchEl = document.getElementById("empresaSearch");
      if (searchEl) searchEl.value = "";
      filterEmpresas("");
      empresaWrap.classList.remove("open");
      updateInfoChips();
      if (current === "visao") renderDashboard();
      if (!silentToast) {
        toast(selectedEmpresaId === "all" ? "Exibindo todas as empresas" : `Empresa: ${short}`);
      }
    }

    function setupChipSelects() {
      renderChipMenus();

      document.querySelectorAll(".chip-select[data-chip]").forEach((wrap) => {
        const btn = wrap.querySelector(".chip-select-btn");
        const menu = wrap.querySelector(".chip-select-menu");
        if (!btn || !menu) return;

        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const willOpen = !wrap.classList.contains("open");
          closeAllChipSelects();
          empresaWrap.classList.remove("open");
          document.getElementById("tabAddWrap")?.classList.remove("open");
          filterWrap?.classList.remove("open");
          filterBtn?.setAttribute("aria-expanded", "false");
          userWrap?.classList.remove("open");
          userChipBtn?.setAttribute("aria-expanded", "false");
          if (willOpen) {
            wrap.classList.add("open");
            btn.setAttribute("aria-expanded", "true");
          }
        });

        menu.addEventListener("click", (e) => {
          const opt = e.target.closest(".chip-opt");
          if (!opt) return;
          e.stopPropagation();
          applyChipValue(wrap.dataset.chip, opt.dataset.value);
          closeAllChipSelects();
        });
      });
    }

    function getMetrics(empresaId) {
      if (empresaId !== "all") return empresaMetrics[empresaId];
      const ids = Object.keys(empresaMetrics);
      const sumMetric = (key) => ids.reduce((acc, id) => acc + empresaMetrics[id][key].value, 0);
      const sumField = (key) => ids.reduce((acc, id) => acc + empresaMetrics[id][key], 0);
      const avgDelta = (key) => {
        const vals = ids.map((id) => empresaMetrics[id][key].delta || 0);
        return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
      };
      const fat = sumField("faturamento");
      const fatAnt = sumField("faturamentoAnterior");
      const fatDelta = fatAnt ? ((fat - fatAnt) / fatAnt) * 100 : 0;

      const meses = empresaMetrics.farmelhor.faturamentoMensal.map((row, i) => ({
        m: row.m,
        atual: ids.reduce((acc, id) => acc + empresaMetrics[id].faturamentoMensal[i].atual, 0),
        ant: ids.reduce((acc, id) => acc + empresaMetrics[id].faturamentoMensal[i].ant, 0),
      }));

      return {
        faturamento: fat,
        faturamentoAnterior: fatAnt,
        faturamentoDelta: fatDelta,
        tempoHorasMes: sumField("tempoHorasMes"),
        tempoHorasSemana: Math.round(sumField("tempoHorasSemana") * 10) / 10,
        tempoAtividades: sumField("tempoAtividades"),
        entregas: { value: sumMetric("entregas"), meta: `${ids.length} empresas`, delta: avgDelta("entregas") },
        processos: { value: sumMetric("processos"), meta: "Todos do grupo", delta: avgDelta("processos") },
        financeiro: { value: sumMetric("financeiro"), meta: "Em aberto no grupo", format: "currency", delta: avgDelta("financeiro") },
        imposto: { value: sumMetric("imposto"), meta: "Impostos consolidados", format: "currency", delta: avgDelta("imposto") },
        faturamentoMensal: meses,
        impostosDetalhe: [
          { nome: "DAS / federal", valor: 2940.4, pct: 64 },
          { nome: "ISS", valor: 820.2, pct: 18 },
          { nome: "INSS / encargos", valor: 510.2, pct: 11 },
          { nome: "Outros", valor: 340.6, pct: 7 },
        ],
        receitaDepartamentos: (() => {
          const names = ["Fiscal", "Contábil", "Pessoal", "Paralegal"];
          return names.map((nome) => ({
            nome,
            valor: ids.reduce((acc, id) => {
              const row = empresaMetrics[id].receitaDepartamentos?.find((d) => d.nome === nome);
              return acc + (row?.valor || 0);
            }, 0),
            clientes: ids.reduce((acc, id) => {
              const row = empresaMetrics[id].receitaDepartamentos?.find((d) => d.nome === nome);
              return acc + (row?.clientes || 0);
            }, 0),
          }));
        })(),
        tempoLista: [
          { nome: "Obrigações fiscais", horas: "31h 10m" },
          { nome: "Processos", horas: "18h 10m" },
          { nome: "Documentos / entrega", horas: "15h 50m" },
          { nome: "Atendimento", horas: "11h 10m" },
        ],
        processosLista: ids.flatMap((id) => {
          const short = CLIENTES.find((c) => c.id === id)?.short || id;
          return empresaMetrics[id].processosLista.map((p) => ({ ...p, nome: `${p.nome} (${short})` }));
        }).slice(0, 6),
        entregasList: ids.flatMap((id) => {
          const short = CLIENTES.find((c) => c.id === id)?.short || id;
          return empresaMetrics[id].entregasList.map((e) => ({ ...e, nome: `${e.nome} (${short})` }));
        }).slice(0, 8),
        financeiroList: [
          { label: "Recebido no mês (grupo)", value: "R$ 5.100,00", pct: 79 },
          { label: "Em aberto (grupo)", value: money(sumMetric("financeiro")), pct: 21 },
          { label: "Impostos (grupo)", value: money(sumMetric("imposto")), pct: 50 },
        ],
      };
    }

    function deltaHtml(delta) {
      if (delta == null || Number.isNaN(delta)) return "";
      if (delta === 0) return `<span class="delta flat">0%</span>`;
      const up = delta > 0;
      const cls = up ? "up" : "down";
      const arrow = up ? "▲" : "▼";
      const sign = up ? "+" : "";
      return `<span class="delta ${cls}">${arrow} ${sign}${delta}%</span>`;
    }

    /**
     * Parte 6 — sparkline SVG reutilizável (sem libs externas; mesmo padrão do gráfico de área).
     * series: array de números. Retorna markup SVG + anima após insert via bindSparklines().
     */
    function renderSparklineSvg(series, opts = {}) {
      const vals = (series || []).map((v) => Number(v) || 0);
      if (vals.length < 2) return "";
      const w = opts.w || 120;
      const h = opts.h || 36;
      const padY = 4;
      const min = Math.min(...vals);
      const max = Math.max(...vals);
      const span = max - min || 1;
      const pts = vals.map((v, i) => {
        const x = (i / (vals.length - 1)) * w;
        const y = padY + (h - padY * 2) * (1 - (v - min) / span);
        return [x, y];
      });
      const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
      const area = `${line} L${w},${h} L0,${h} Z`;
      return `
        <svg class="sparkline" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
          <path class="spark-area is-animate" d="${area}" />
          <path class="spark-line is-animate" d="${line}" />
        </svg>`;
    }

    /** Parte 6 — anima traçado dos sparklines após inserir no DOM. */
    function bindSparklines(root) {
      (root || document).querySelectorAll(".sparkline .spark-line").forEach((el) => {
        if (typeof el.getTotalLength !== "function") return;
        const len = Math.ceil(el.getTotalLength()) || 200;
        el.style.setProperty("--spark-len", String(len));
      });
    }

    /**
     * Parte 6 — deriva série de tendência a partir de faturamentoMensal já existente
     * (não altera a lógica dos dados; só escala para visualização do KPI).
     */
    function sparkSeriesFromMonths(months, scale = 1, floor = 1) {
      return (months || []).map((m) => Math.max(floor, Math.round((Number(m.atual) || 0) * scale)));
    }

    /** Parte 6 — markup reutilizável de card KPI. */
    function renderKpiCard(c) {
      let iconHtml = c.icon || "";
      if (iconHtml.includes('width="18"')) {
        iconHtml = iconHtml.replace(/width="18"/g, 'width="16"').replace(/height="18"/g, 'height="16"');
      }
      return `
        <button type="button" class="dash-card ${c.cls} tip-bottom" data-tip="Ir para detalhes" data-goto="${c.goto}">
          <div class="card-top">
            <span class="card-icon">${iconHtml}</span>
            <span class="card-label">${c.label}</span>
          </div>
          <div class="card-value">${c.value}</div>
          <div class="card-meta">
            ${deltaHtml(c.delta)}
            <span class="cmp">Comparado ao mês anterior</span>
          </div>
          ${renderSparklineSvg(c.spark || [])}
        </button>`;
    }

    const periodLabels = {
      mes: "este mês",
      "30d": "últimos 30 dias",
      "3m": "últimos 3 meses",
      "6m": "últimos 6 meses",
      "12m": "últimos 12 meses",
      ano: "ano atual",
      custom: "período personalizado",
    };

    function formatDashDateBR(iso) {
      if (!iso) return "";
      const [y, m, d] = iso.split("-");
      return `${d}/${m}/${y}`;
    }

    function getDashPeriodDisplayLabel() {
      const period = document.getElementById("dashPeriod")?.value || "6m";
      if (period === "custom") {
        const from = document.getElementById("periodFrom")?.value;
        const to = document.getElementById("periodTo")?.value;
        if (from && to) return `${formatDashDateBR(from)} — ${formatDashDateBR(to)}`;
        if (from) return `A partir de ${formatDashDateBR(from)}`;
        if (to) return `Até ${formatDashDateBR(to)}`;
        return "Período personalizado";
      }
      const lab = periodLabels[period] || period;
      return lab.charAt(0).toUpperCase() + lab.slice(1);
    }

    function getPeriodRange() {
      const period = document.getElementById("dashPeriod")?.value || "6m";
      const now = new Date(2026, 6, 13);
      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      let start = new Date(now);

      if (period === "mes") {
        start = new Date(now.getFullYear(), now.getMonth(), 1);
      } else if (period === "3m") {
        start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      } else if (period === "6m") {
        start = new Date(now.getFullYear(), now.getMonth() - 5, 1);
      } else if (period === "12m") {
        start = new Date(now.getFullYear(), now.getMonth() - 11, 1);
      } else if (period === "ano") {
        start = new Date(now.getFullYear(), 0, 1);
      } else if (period === "custom") {
        const from = document.getElementById("periodFrom")?.value;
        const to = document.getElementById("periodTo")?.value;
        if (from) start = new Date(from + "T00:00:00");
        if (to) {
          const endCustom = new Date(to + "T23:59:59");
          return { start, end: endCustom };
        }
      }
      return { start, end };
    }

    function inPeriodRange(isoDate) {
      if (!isoDate) return true;
      const d = new Date(isoDate + "T12:00:00");
      const { start, end } = getPeriodRange();
      return d >= start && d <= end;
    }

    function applyPeriodFilter(base) {
      const period = document.getElementById("dashPeriod")?.value || "6m";
      const data = structuredClone
        ? structuredClone(base)
        : JSON.parse(JSON.stringify(base));
      const months = data.faturamentoMensal || [];
      let take = months.length;
      let scale = 1;

      if (period === "mes") { take = 1; scale = 1 / 6; }
      else if (period === "3m") { take = 3; scale = 3 / 6; }
      else if (period === "6m") { take = Math.min(6, months.length); scale = take / 6; }
      else if (period === "12m" || period === "ano") { take = months.length; scale = 1; }
      else if (period === "custom") {
        const from = document.getElementById("periodFrom")?.value;
        const to = document.getElementById("periodTo")?.value;
        if (from && to && from > to) scale = 0.5;
        else {
          const days = from && to
            ? Math.max(1, (new Date(to) - new Date(from)) / 86400000 + 1)
            : 180;
          scale = Math.min(1.2, Math.max(0.15, days / 180));
          take = Math.max(1, Math.min(months.length, Math.round(days / 30)));
        }
      }

      data.faturamentoMensal = months.slice(-take);
      data.faturamento = Math.round(data.faturamento * scale);
      data.faturamentoAnterior = Math.round((data.faturamentoAnterior || 0) * scale);
      data.tempoHorasMes = Math.round(data.tempoHorasMes * (period === "mes" ? 1 : scale * (period === "3m" ? 1.1 : 1)));
      data.tempoHorasSemana = Math.round(data.tempoHorasSemana * 10) / 10;
      if (data.imposto) data.imposto = { ...data.imposto, value: Math.round(data.imposto.value * scale * 100) / 100 };
      if (data.financeiro) data.financeiro = { ...data.financeiro, value: Math.round(data.financeiro.value * scale) };
      if (data.entregas) {
        data.entregas = {
          ...data.entregas,
          value: Math.max(1, Math.round(data.entregas.value * (period === "mes" ? 0.5 : period === "3m" ? 0.75 : 1))),
        };
      }
      data._periodLabel = getDashPeriodDisplayLabel();
      return data;
    }

    function normalizeHBarItems(items) {
      const list = [...(items || [])];
      const total = list.reduce((s, i) => s + (Number(i.valor) || 0), 0) || 1;
      return list
        .map((i) => ({
          ...i,
          valor: Number(i.valor) || 0,
          clientes: i.clientes != null ? Number(i.clientes) : null,
          pct: i.pct != null ? Number(i.pct) : Math.round(((Number(i.valor) || 0) / total) * 100),
        }))
        .sort((a, b) => b.valor - a.valor);
    }

    /** Componente reutilizável de barras horizontais (dashboards). */
    function renderHBarChart(host, items, options = {}) {
      if (!host) return [];
      const rows = normalizeHBarItems(items);
      const maxVal = Math.max(...rows.map((r) => r.valor), 1);
      const showPct = options.showPct !== false;
      const tipBuilder = typeof options.tooltip === "function"
        ? options.tooltip
        : (row) => `${row.nome}: ${moneyShort(row.valor)}${showPct ? ` (${row.pct}%)` : ""}`;

      host.classList.add("hbar-chart");
      host.innerHTML = rows.map((row, idx) => {
        const barPct = Math.max(4, Math.round((row.valor / maxVal) * 100));
        return `
          <div class="hbar-row tip-bottom" data-tip="${tipBuilder(row).replace(/"/g, "&quot;")}" style="animation-delay:${0.05 + idx * 0.07}s">
            <div class="hbar-row-top">
              <span class="name">${row.nome}</span>
              <span class="meta">
                ${showPct ? `<span class="pct">${row.pct}%</span>` : ""}
                <span class="val">${moneyShort(row.valor)}</span>
              </span>
            </div>
            <div class="hbar-track"><i data-w="${barPct}"></i></div>
          </div>`;
      }).join("") || `<div class="agenda-empty">${options.empty || "Sem dados"}</div>`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          host.querySelectorAll(".hbar-track > i").forEach((el) => {
            el.style.width = `${el.dataset.w || 0}%`;
          });
        });
      });

      return rows;
    }

    /** Parte 5 — ícones da Timeline (reutilizável). */
    const TIMELINE_ICONS = {
      ok: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>`,
      warn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>`,
      err: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="m15 9-6 6M9 9l6 6"/></svg>`,
      doc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>`,
      fin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      agenda: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
      user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>`,
      progress: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
    };

    /** Parte 5 — badge de status alinhado ao Design System (.proc-badge). */
    function timelineStatusMeta(status) {
      const map = {
        concluido: { cls: "sucesso", label: "Concluído" },
        finalizado: { cls: "sucesso", label: "Finalizado" },
        andamento: { cls: "andamento", label: "Em andamento" },
        atrasado: { cls: "falha", label: "Atrasado" },
        cancelado: { cls: "arquivado", label: "Cancelado" },
        sucesso: { cls: "sucesso", label: "Concluído" },
        falha: { cls: "falha", label: "Atrasado" },
      };
      return map[status] || map.andamento;
    }

    function timelineIconType(status, kind) {
      if (kind === "obrigacao") return "agenda";
      if (kind === "financeiro") return "fin";
      if (kind === "cliente") return "user";
      if (status === "sucesso" || status === "concluido" || status === "finalizado") return "ok";
      if (status === "falha" || status === "atrasado") return "err";
      if (status === "cancelado") return "warn";
      return "progress";
    }

    /** Parte 5 — formata data ISO existente sem alterar a fonte de dados. */
    function formatTimelineWhen(iso, timeHint) {
      if (!iso) return timeHint || "Recente";
      const [y, m, d] = String(iso).split("-").map(Number);
      if (!y || !m || !d) return timeHint || String(iso);
      const date = new Date(y, m - 1, d);
      const today = new Date(2026, 6, 14);
      const diff = Math.round((today - date) / 86400000);
      const hm = timeHint || "09:42";
      if (diff === 0) return `Hoje • ${hm}`;
      if (diff === 1) return `Ontem • ${hm}`;
      return `${String(d).padStart(2, "0")} ${date.toLocaleDateString("pt-BR", { month: "short" })} • ${hm}`;
    }

    /**
     * Parte 5 — monta eventos da Timeline a partir dos dados já existentes
     * (processos da seção + processosLista/entregasList do dashboard).
     * Não altera a lógica/fonte dos dados; apenas normaliza para exibição.
     */
    function buildHistoryTimelineEvents(data) {
      const events = [];
      const realProcs = (sections.find((s) => s.id === "processos")?.items || [])
        .filter((p) => !p.arquivado)
        .slice(0, 4);

      if (realProcs.length) {
        const timeHints = ["09:42", "16:18", "11:20", "14:05"];
        realProcs.forEach((p, i) => {
          const st = ["atrasada", "ent-atrasada", "justificativa-atrasada", "falha"].includes(p.status)
            ? "atrasado"
            : ["entregue", "concluida", "ent-antecipada", "dispensada", "dispensada-f-prazo", "ent-justificada", "dispensa-justificada", "sucesso"].includes(p.status)
              ? "concluido"
              : "andamento";
          events.push({
            title: p.title,
            desc: `Cliente: ${p.cliente || "—"}${p.dept ? ` · ${p.dept}` : ""}`,
            when: formatTimelineWhen(p.criado, timeHints[i % timeHints.length]),
            status: st,
            kind: "processo",
            responsavel: p.responsavel || "",
            tip: `${p.title} · ${p.responsavel || "Sem responsável"} · ${p.cliente || ""}`,
            goto: "processos",
          });
        });
      } else {
        (data.processosLista || []).slice(0, 4).forEach((p, i) => {
          const st = /andamento/i.test(p.meta || "") ? "andamento" : /pausado/i.test(p.meta || "") ? "cancelado" : "concluido";
          events.push({
            title: p.nome,
            desc: p.meta || "Movimentação de processo",
            when: formatTimelineWhen(null, ["09:42", "16:18", "11:20", "14:05"][i % 4]),
            status: st,
            kind: "processo",
            tip: p.nome,
            goto: "processos",
          });
        });
      }

      (data.entregasList || []).slice(0, 3).forEach((o) => {
        events.push({
          title: o.nome,
          desc: `Prazo ${o.when}`,
          when: `Prazo ${o.when}`,
          status: "andamento",
          kind: "obrigacao",
          tip: `${o.nome} · prazo ${o.when}`,
          goto: "entregas",
        });
      });

      return events.slice(0, 6);
    }

    /**
     * Parte 5 — componente reutilizável de Timeline vertical.
     * options: { empty, onClickAttr } — host recebe lista de eventos normalizados.
     */
    function renderTimeline(host, events, options = {}) {
      if (!host) return;
      const list = events || [];
      if (!list.length) {
        host.innerHTML = `<div class="timeline-empty">${options.empty || "Nenhuma atividade recente"}</div>`;
        return;
      }

      host.classList.add("timeline");
      host.innerHTML = list.map((ev) => {
        const st = timelineStatusMeta(ev.status);
        const iconKey = timelineIconType(ev.status, ev.kind);
        const iconCls = iconKey === "ok" ? "type-ok"
          : iconKey === "err" ? "type-err"
          : iconKey === "warn" ? "type-warn"
          : `type-${iconKey === "progress" ? "doc" : iconKey}`;
        const tip = (ev.tip || ev.title || "").replace(/"/g, "&quot;");
        const goto = ev.goto || "processos";
        const extra = ev.responsavel ? `<span>${ev.responsavel}</span>` : "";
        return `
          <button type="button" class="timeline-item tip-bottom" data-tip="${tip}" data-goto="${goto}" role="listitem">
            <div class="timeline-rail" aria-hidden="true">
              <span class="timeline-icon ${iconCls}">${TIMELINE_ICONS[iconKey] || TIMELINE_ICONS.doc}</span>
            </div>
            <div class="timeline-card">
              <div class="timeline-card-top">
                <h5 class="timeline-title">${ev.title}</h5>
                <span class="proc-badge ${st.cls}">${st.label}</span>
              </div>
              <p class="timeline-desc">${ev.desc || ""}</p>
              <div class="timeline-meta">
                <span class="when">${ev.when || ""}</span>
                ${extra}
              </div>
            </div>
          </button>`;
      }).join("");
    }

    function renderDashboard() {
      const raw = getMetrics(selectedEmpresaId);
      const data = applyPeriodFilter(raw);
      if (selectedEmpresaId !== "all") {
        data.faturamentoDelta = data.faturamentoAnterior
          ? Math.round(((data.faturamento - data.faturamentoAnterior) / data.faturamentoAnterior) * 1000) / 10
          : 0;
      }
      const periodLab = data._periodLabel || getDashPeriodDisplayLabel();
      const chartSub = document.getElementById("dashChartPeriod");
      if (chartSub) chartSub.textContent = periodLab;
      const fatPeriodText = document.getElementById("dashFatPeriodText");
      if (fatPeriodText) fatPeriodText.textContent = periodLab;

      const fatIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`;
      /* Parte 6: séries sparkline derivadas de faturamentoMensal (dados existentes). */
      const monthsSpark = data.faturamentoMensal || [];
      const fatSpark = sparkSeriesFromMonths(monthsSpark, 1);
      const impSpark = sparkSeriesFromMonths(monthsSpark, 0.08, 1);
      const procSpark = sparkSeriesFromMonths(monthsSpark, 0.05, 1);
      const entSpark = sparkSeriesFromMonths(monthsSpark, 0.06, 1);

      const cards = [
        {
          key: "faturamento",
          label: "Faturamento",
          cls: "faturamento",
          icon: fatIcon,
          value: moneyShort(data.faturamento),
          delta: data.faturamentoDelta,
          spark: fatSpark,
          goto: "financeiro",
        },
        {
          key: "imposto",
          label: "Impostos",
          cls: "imposto",
          icon: icons.imposto,
          value: money(data.imposto.value),
          delta: data.imposto.delta,
          spark: impSpark,
          goto: "financeiro",
        },
        {
          key: "processos",
          label: "Processos",
          cls: "processos",
          icon: icons.processos,
          value: data.processos.value,
          delta: data.processos.delta,
          spark: procSpark,
          goto: "processos",
        },
        {
          key: "entregas",
          label: "Entregas",
          cls: "entregas",
          icon: icons.entregas,
          value: data.entregas.value,
          delta: data.entregas.delta,
          spark: entSpark,
          goto: "entregas",
        },
      ];

      const dashGrid = document.getElementById("dashGrid");
      if (dashGrid) {
        dashGrid.innerHTML = cards.map(renderKpiCard).join("");
        bindSparklines(dashGrid);
      }

      const delta = Math.round((data.faturamentoDelta || 0) * 10) / 10;
      const sign = delta > 0 ? "+" : "";
      document.getElementById("dashOverviewMetric").innerHTML =
        `<span class="${delta >= 0 ? "sign" : ""}">${sign}${delta}%</span>`;

      const months = data.faturamentoMensal || [];
      const lineHost = document.getElementById("dashLineChart");
      if (lineHost && months.length) {
        /* Gráfico de barras verticais (atual vs anterior) — mesmos dados de faturamentoMensal */
        const w = 640;
        const h = 130;
        const pad = { t: 22, r: 8, b: 20, l: 8 };
        const plotW = w - pad.l - pad.r;
        const plotH = h - pad.t - pad.b;
        const maxY = Math.max(...months.flatMap((m) => [m.atual, m.ant]), 1) * 1.12;
        const n = months.length;
        const groupW = plotW / n;
        const barW = Math.min(16, groupW * 0.28);
        const gap = 3;
        const fmtMes = (v) => {
          const nVal = Number(v) || 0;
          const reais = nVal < 1000 ? nVal * 1000 : nVal;
          if (reais >= 1000000) return `R$ ${(reais / 1000000).toFixed(1).replace(".", ",")} mi`;
          if (reais >= 1000) return `R$ ${Math.round(reais / 1000)} mil`;
          return moneyShort(reais);
        };
        const yAt = (v) => pad.t + plotH - (v / maxY) * plotH;
        const gridYs = [0.25, 0.5, 0.75, 1].map((p) => {
          const y = pad.t + plotH * (1 - p);
          return `<line x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}" />`;
        }).join("");

        const bars = months.map((m, i) => {
          const cx = pad.l + groupW * i + groupW / 2;
          const xAnt = cx - barW - gap / 2;
          const xAtual = cx + gap / 2;
          const yAnt = yAt(m.ant);
          const yAtual = yAt(m.atual);
          const hAnt = pad.t + plotH - yAnt;
          const hAtual = pad.t + plotH - yAtual;
          const delay = 0.05 + i * 0.06;
          return `
            <g data-fat-i="${i}">
              <rect class="bar-hit" x="${(cx - groupW / 2).toFixed(1)}" y="${pad.t}" width="${groupW.toFixed(1)}" height="${plotH}" data-fat-i="${i}" />
              <rect class="bar-anterior" x="${xAnt.toFixed(1)}" y="${yAnt.toFixed(1)}" width="${barW}" height="${Math.max(2, hAnt).toFixed(1)}" style="animation-delay:${delay}s" data-fat-i="${i}" />
              <rect class="bar-atual" x="${xAtual.toFixed(1)}" y="${yAtual.toFixed(1)}" width="${barW}" height="${Math.max(2, hAtual).toFixed(1)}" style="animation-delay:${delay + 0.05}s" data-fat-i="${i}" />
              <text class="val" x="${cx.toFixed(1)}" y="${(yAtual - 6).toFixed(1)}" text-anchor="middle">${fmtMes(m.atual)}</text>
              <text class="lbl" x="${cx.toFixed(1)}" y="${h - 6}">${m.m}</text>
            </g>`;
        }).join("");

        lineHost.innerHTML = `
          <div class="line-chart-legend">
            <span class="atual">Atual</span>
            <span class="anterior">Período anterior</span>
          </div>
          <div class="line-chart-tooltip" id="dashFatTooltip" hidden></div>
          <svg class="line-chart bar-chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Gráfico de barras do faturamento">
            <g class="line-chart-grid">${gridYs}</g>
            ${bars}
          </svg>`;

        const tip = lineHost.querySelector("#dashFatTooltip");
        const showTip = (i) => {
          const m = months[i];
          if (!tip || !m) return;
          tip.hidden = false;
          tip.classList.add("is-visible");
          tip.innerHTML = `<strong>${m.m}</strong>
            <div class="row"><span>Atual</span><b>${fmtMes(m.atual)}</b></div>
            <div class="row"><span>Anterior</span><b>${fmtMes(m.ant)}</b></div>`;
          const svg = lineHost.querySelector(".line-chart");
          const rect = svg.getBoundingClientRect();
          const hostRect = lineHost.getBoundingClientRect();
          const cx = pad.l + groupW * i + groupW / 2;
          const px = rect.left - hostRect.left + (cx / w) * rect.width;
          tip.style.left = `${px}px`;
          tip.style.top = `${rect.top - hostRect.top + 8}px`;
          lineHost.querySelectorAll(".bar-atual").forEach((d) => d.classList.toggle("is-active", d.dataset.fatI === String(i)));
        };
        const hideTip = () => {
          if (!tip) return;
          tip.classList.remove("is-visible");
          tip.hidden = true;
          lineHost.querySelectorAll(".bar-atual").forEach((d) => d.classList.remove("is-active"));
        };
        lineHost.querySelectorAll("[data-fat-i]").forEach((el) => {
          el.addEventListener("mouseenter", () => showTip(Number(el.dataset.fatI)));
          el.addEventListener("mouseleave", hideTip);
        });
      } else if (lineHost) {
        lineHost.innerHTML = `<div class="dash-row"><span>Sem dados de faturamento</span></div>`;
      }

      const impostos = data.impostosDetalhe || [];
      const totalImp = impostos.reduce((s, i) => s + i.valor, 0);
      const fiscalTotal = document.getElementById("dashFiscalTotal");
      const fiscalCount = document.getElementById("dashFiscalCount");
      if (fiscalTotal) fiscalTotal.textContent = money(totalImp || 0);
      if (fiscalCount) {
        const n = impostos.length;
        fiscalCount.textContent = `${n} imposto${n === 1 ? "" : "s"}`;
      }

      const barColors = [
        "var(--accent)",
        "color-mix(in srgb, var(--accent) 72%, white)",
        "color-mix(in srgb, var(--accent) 48%, white)",
        "color-mix(in srgb, var(--accent) 28%, #c5d3e8)",
      ];
      const barsHost = document.getElementById("dashStatusBars");
      if (barsHost) {
        barsHost.innerHTML = impostos.map((i, idx) => `
          <div class="fiscal-row tip-bottom" data-tip="${i.nome}: ${money(i.valor)} (${i.pct}%)" style="animation-delay:${0.05 + idx * 0.07}s">
            <span class="name">${i.nome}</span>
            <div class="fiscal-bar"><i style="--bar-color:${barColors[idx % barColors.length]};background:${barColors[idx % barColors.length]}" data-w="${i.pct}"></i></div>
            <span class="pct">${i.pct}%</span>
            <span class="val">${moneyShort(i.valor)}</span>
          </div>`).join("") || `<div class="agenda-empty">Sem impostos no período</div>`;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            barsHost.querySelectorAll(".fiscal-bar > i").forEach((el) => {
              el.style.width = `${el.dataset.w || 0}%`;
            });
          });
        });
      }

      const deptRows = renderHBarChart(
        document.getElementById("dashDeptBars"),
        data.receitaDepartamentos || [],
        {
          showPct: true,
          tooltip: (row) =>
            `Departamento: ${row.nome} · Faturamento: ${moneyShort(row.valor)} · Participação: ${row.pct}%` +
            (row.clientes != null ? ` · Clientes: ${row.clientes}` : ""),
        }
      );
      const leader = deptRows[0];
      const leaderName = document.getElementById("dashDeptLeaderName");
      const leaderShare = document.getElementById("dashDeptLeaderShare");
      if (leaderName) leaderName.textContent = leader?.nome || "—";
      if (leaderShare) leaderShare.textContent = leader ? `${leader.pct}% do faturamento` : "—";

      /* Parte 5: Histórico Recente renderizado como Timeline (reutiliza dados existentes). */
      renderTimeline(
        document.getElementById("dashProcessosList"),
        buildHistoryTimelineEvents(data),
        { empty: "Nenhuma atividade recente" }
      );

      renderDashPendencias();
      applyDashFilters();
      renderSecurityAlert();
      requestAnimationFrame(() => {
        syncDashHistoryHeight();
        requestAnimationFrame(syncDashHistoryHeight);
      });
    }

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
      if (title) title.textContent = mode === "financeiro" ? "Filtrar módulo financeiro" : "Filtrar dashboard";
      if (hint) {
        hint.textContent = mode === "financeiro"
          ? "Escolha quais blocos deseja visualizar. A exportação usará o mesmo filtro."
          : "Escolha o que deseja visualizar. A exportação usará o mesmo filtro.";
      }
      filterPanel?.setAttribute("aria-label", mode === "financeiro" ? "Filtros do módulo financeiro" : "Filtros do dashboard");
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
      const standalone = !parent.classList.contains("proc-filter") && !parent.classList.contains("agenda-ops-filter");

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

    function openModal({ title, sub, body, foot, wide, molde, obr, regras, moldeDetail, emailTpl, classif, tipoDoc, aviso, cadastro, audit, auditRules }) {
      modal.classList.toggle("wide", (!!wide && !audit) || !!auditRules);
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
      backdrop.classList.add("open");
      enhanceUiSelects(modalBody);
    }

    function closeModal() {
      if (modal.classList.contains("cli-cad-modal")) {
        cliCadastro = createEmptyCliCadastro();
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
      const headTools = document.getElementById("modalHeadTools");
      if (headTools) {
        headTools.innerHTML = "";
        headTools.hidden = true;
      }
      const closeBtn = document.getElementById("modalClose");
      if (closeBtn) closeBtn.hidden = false;
      backdrop.classList.remove("open");
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
        Fiscal: "#3b6fd4",
        Pessoal: "#2f9e6b",
        Contábil: "#c47a1a",
        [INTERNA]: "#b45309",
        "Sem departamento": "#5b4db8",
      };
      const fallback = ["#3b6fd4", "#2f9e6b", "#c47a1a", "#0f7ea8", "#5b4db8"];

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
      if (procFiltros.search) {
        const matched = findClientesByOmniQuery(procFiltros.search);
        const ids = new Set((matched || []).map((c) => c.id));
        const names = new Set((matched || []).map((c) => normalizeSearchText(c.nome)));
        tasks = tasks.filter((t) =>
          (t.clienteId && ids.has(t.clienteId))
          || names.has(normalizeSearchText(t.razaoSocial || ""))
        );
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
        if (procFiltros.search) {
          const matched = findClientesByOmniQuery(procFiltros.search);
          const ids = new Set((matched || []).map((c) => c.id));
          const names = new Set((matched || []).map((c) => normalizeSearchText(c.nome)));
          const hit = (p.clienteId && ids.has(p.clienteId))
            || names.has(normalizeSearchText(p.cliente || ""));
          if (!hit) return false;
        }
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
        <div class="proc-filter search">
          <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="search" id="procSearch" placeholder="Nome, razão social ou CNPJ" value="${procFiltros.search}" aria-label="Buscar processos por empresa" />
        </div>
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
        procGrid.innerHTML = `<div class="empresa-group-list"><div class="empresa-board-empty">${procFiltros.search ? "Nenhuma empresa correspondente à busca" : "Nenhum item com esses filtros"}</div></div>`;
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
        { key: "em_andamento", label: "Em andamento", color: "#3b6fd4" },
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
          <button type="button" class="btn-ghost" data-close>Fechar</button>
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

    function renderClientesList() {
      const wrap = document.getElementById("clientesWrap");
      if (!wrap) return;
      const q = cliSearchQuery.trim();
      let list = [...CLIENTES];
      if (q) {
        const matched = findClientesByOmniQuery(q);
        const ids = new Set((matched || []).map((c) => c.id));
        list = matched ? CLIENTES.filter((c) => ids.has(c.id)) : [];
      }
      if (cliRegimeFilter) {
        list = list.filter((c) => c.regime === cliRegimeFilter);
      }
      wrap.innerHTML = `
        <div class="cli-list-toolbar">
          <div class="proc-filter search">
            <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="search" id="cliSearch" placeholder="Nome, razão social ou CNPJ" value="${cliSearchQuery.replace(/"/g, "&quot;")}" aria-label="Buscar clientes" />
          </div>
          <div class="proc-filter field">
            <svg class="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>
            <select id="cliRegimeFilter" aria-label="Filtrar por regime">
              <option value="">Regime</option>
              ${REGIME_OPTIONS.map((r) => `<option value="${r}" ${cliRegimeFilter === r ? "selected" : ""}>${r}</option>`).join("")}
            </select>
          </div>
          <span class="cli-count">${list.length} empresa${list.length === 1 ? "" : "s"}</span>
          <button type="button" class="btn-primary cli-add-btn" data-cli-add-empresa>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Nova empresa
          </button>
        </div>
        <div class="cli-grid" id="cliGrid">
          <div class="cli-list-head">
            <span>Identificação</span>
            <span>Unidade</span>
            <span>Regime</span>
          </div>
          ${list.length ? list.map((c) => {
            const tipo = c.tipoUnidade || "Matriz";
            const tipoCls = tipo === "Filial" ? "filial" : "matriz";
            return `
              <div class="cli-list-row is-${tipoCls}" data-cli-id="${c.id}" data-cli-open="${c.id}" role="button" tabindex="0" aria-label="Abrir ${c.fantasia || c.nome}">
                <div class="cli-id-cell">
                  <strong title="${c.razaoSocial || c.nome}">${c.razaoSocial || c.nome}</strong>
                  <span>${c.cnpj} · ${c.code}</span>
                </div>
                <div class="cell-tipo"><span class="cli-badge ${tipoCls}">${tipo}</span></div>
                <div class="cell-regime" style="font-size:.78rem;color:var(--navy)">${c.regime}</div>
              </div>`;
          }).join("") : `<div class="cli-empty-panel">${q || cliRegimeFilter ? "Nenhuma empresa correspondente aos filtros" : "Nenhum cliente cadastrado"}</div>`}
        </div>`;
      enhanceUiSelects(wrap);
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
          texto: `Para assuntos de nota fiscal e XML de ${short}, falar com o João (financeiro do cliente) — WhatsApp é o canal mais rápido. Evitar ligar depois das 17h.`,
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
          texto: "Preferem contato por e-mail corporativo. Sexta-feira pela manhã o sócio costuma estar indisponível — agendar revisões para terça ou quarta.",
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
          texto: "Honorários: cliente costuma questionar o rateio da folha. Antes de enviar o boleto, conferir se a média de funcionários bate com o relatório interno.",
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
          texto: "Regime e particularidades: pedem revisão do DAS antes do envio. Checklist interno na pasta do cliente — não inventar caminho novo.",
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
          texto: "Documentos assinados voltam com atraso se o pedido for feito só no fim do mês. Melhor alinhar com o RH do cliente até o dia 20.",
          at: new Date(2026, 6, 8, 10, 0),
          pinned: false,
          uteis: 1,
          utilMe: false,
        },
        {
          id: `${c.id}-f6`,
          autor: "Ana Costa",
          cargo: "Fiscal",
          visibilidade: "mim",
          tema: "preferencias",
          texto: "Lembrete pessoal: confirmar com o João o WhatsApp atualizado antes da próxima competência — número mudou em junho.",
          at: new Date(2026, 6, 7, 18, 20),
          pinned: false,
          uteis: 0,
          utilMe: false,
        },
      ];
    }

    function ensureCliFeed(c) {
      if (!cliFeedByClient[c.id]) cliFeedByClient[c.id] = seedCliFeed(c);
      return cliFeedByClient[c.id];
    }

    function cliFeedVisLabel(vis) {
      if (vis === "mim") return "Só para mim";
      if (vis === "privado") return "Privado";
      return "Geral";
    }

    function getCliFeedPosts(c, filter = cliFeedFilter) {
      const posts = ensureCliFeed(c).slice();
      const filtered = posts.filter((p) => {
        if (filter === "todos") return true;
        if (filter === "geral" || filter === "privado" || filter === "mim") return p.visibilidade === filter;
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
      const posts = getCliFeedPosts(c);
      const filters = [
        { id: "todos", label: "Todos" },
        { id: "geral", label: "Gerais" },
        { id: "privado", label: "Privados" },
        { id: "mim", label: "Só para mim" },
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
                  <span class="name">${cliFeedEsc(p.autor)}</span>
                  <span class="role">${cliFeedEsc(p.cargo || "")}</span>
                  <time class="when" datetime="${iso}" title="${cliFeedEsc(when)}">${cliFeedEsc(when)}</time>
                </div>
                <div class="cli-feed-tags">
                  ${p.pinned ? `<span class="cli-feed-tag pin">Fixado</span>` : ""}
                  <span class="cli-feed-tag vis-${p.visibilidade}">${cliFeedVisLabel(p.visibilidade)}</span>
                  <span class="cli-feed-tag tema-${p.tema}">${cliFeedEsc(temaMeta?.label || p.tema)}</span>
                </div>
                <p class="cli-feed-text">${cliFeedEsc(p.texto)}</p>
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
                  <option value="mim">Privado — só para mim</option>
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
      const m = getCliXmlVisaoModel(c);
      const lote = cliXmlLote;
      const restante = Math.max(0, lote.total - lote.ok - lote.erro);
      const etaTxt = lote.eta > 60
        ? `cerca de ${Math.ceil(lote.eta / 60)} min restante`
        : (lote.eta > 0 ? `cerca de ${lote.eta} s restante` : "finalizando…");
      return `
        <div class="cli-xml-visao" data-cli-xml-visao="1">
          <div class="xml-head">
            <div>
              <p class="kicker">Visão do Cliente · XML</p>
              <h3>Notas e o que sobrou na conta</h3>
              <p class="sub">${uiSelectEscape(c.fantasia || c.nome)} · ${uiSelectEscape(m.periodo)} · ${m.qtdNotas} notas no recorte</p>
            </div>
            <div class="xml-head-acts">
              <span class="xml-status is-${m.statusCls === "ok" ? "ok" : m.statusCls}">${uiSelectEscape(m.statusLabel)}</span>
              <button type="button" class="btn-ghost sm" data-cli-xml="import-lote">Importar XMLs</button>
            </div>
          </div>

          <section class="xml-lote" data-cli-xml-lote ${lote.active ? "" : "hidden"}>
            <div class="xml-lote-top">
              <strong>Processando lote de XMLs</strong>
              <span>${uiSelectEscape(etaTxt)}</span>
            </div>
            <div class="xml-lote-bar" aria-hidden="true"><i style="width:${Math.min(100, lote.pct)}%"></i></div>
            <div class="xml-lote-counters">
              <span class="is-ok"><b>${lote.ok}</b> ok</span>
              <span class="is-bad"><b>${lote.erro}</b> com problema</span>
              <span><b>${restante}</b> restantes</span>
              <span><b>${Math.round(lote.pct)}%</b> concluído</span>
            </div>
          </section>

          <section aria-label="Resumo executivo">
            <div class="xml-sec-title" style="margin-bottom:10px">
              <h4>Resumo executivo</h4>
              <p>Os 3 números que importam neste período.</p>
            </div>
            <div class="xml-kpis">
              <article class="xml-kpi">
                <p class="lab">Faturamento</p>
                <p class="val">${money(m.faturamento)}</p>
                <p class="hint"><b>${m.qtdOk}</b> notas processadas</p>
              </article>
              <article class="xml-kpi is-tax">
                <p class="lab">Impostos</p>
                <p class="val">${money(m.impostos)}</p>
                <p class="hint">Tributos das notas do período</p>
              </article>
              <article class="xml-kpi is-rest${m.sobrou < 0 ? " neg" : ""}">
                <p class="lab">O que sobrou</p>
                <p class="val">${money(m.sobrou)}</p>
                <p class="hint">Margem líquida · <b>${String(m.sobrouPct).replace(".", ",")}%</b></p>
              </article>
            </div>
          </section>

          <section class="xml-sec" aria-label="Diagnóstico">
            <div class="xml-sec-title">
              <h4>Diagnóstico</h4>
              <p>Produtos críticos e margens apertadas — onde o resultado está sofrendo.</p>
            </div>
            <div class="xml-crit-grid">
              ${m.criticos.map((p) => `
                <article class="xml-crit is-${p.tom}">
                  <p class="nome">${uiSelectEscape(p.nome)}</p>
                  <p class="meta">${uiSelectEscape(p.meta)}</p>
                  <p class="margem">${p.margemPct > 0 ? "+" : ""}${String(p.margemPct).replace(".", ",")}% de margem</p>
                </article>`).join("")}
            </div>
          </section>

          <section class="xml-sec" aria-label="Detalhamento">
            <div class="xml-sec-title">
              <h4>Detalhamento</h4>
              <p>Memória das notas do período · evidências do recorte.</p>
            </div>
            <div class="xml-table-wrap">
              <table class="xml-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Número</th>
                    <th>Tipo</th>
                    <th class="num">Valor</th>
                    <th class="num">Impostos</th>
                    <th>Situação</th>
                  </tr>
                </thead>
                <tbody>
                  ${m.notas.map((n) => `
                    <tr>
                      <td>${uiSelectEscape(n.data)}</td>
                      <td><strong>${uiSelectEscape(n.numero)}</strong></td>
                      <td>${uiSelectEscape(n.tipo)}</td>
                      <td class="num">${money(n.valor)}</td>
                      <td class="num">${money(n.impostos)}</td>
                      <td><span class="xml-seal${n.status === "problema" ? " is-bad" : ""}">${n.status === "problema" ? "Com problema" : "Ok"}</span></td>
                    </tr>`).join("")}
                </tbody>
              </table>
            </div>
          </section>

          <section class="xml-sec" aria-label="Log executivo">
            <div class="xml-sec-title">
              <h4>Acompanhamento</h4>
              <p>Histórico simples do processamento das suas notas.</p>
            </div>
            <ul class="xml-log">
              ${m.logs.map((l) => `
                <li>
                  <span class="when">${uiSelectEscape(l.when)}</span>
                  <span class="what">${uiSelectEscape(l.what)}</span>
                  <span class="res">${uiSelectEscape(l.res)}</span>
                </li>`).join("")}
            </ul>
          </section>
        </div>`;
    }

    function startCliXmlLoteDemo() {
      if (cliXmlLote.timer) clearInterval(cliXmlLote.timer);
      cliXmlLote = {
        active: true,
        pct: 0,
        ok: 0,
        erro: 0,
        total: 48,
        eta: 55,
        timer: null,
      };
      renderClientes();
      cliXmlLote.timer = setInterval(() => {
        if (!cliXmlLote.active) return;
        const step = 3 + Math.floor(Math.random() * 4);
        const room = cliXmlLote.total - cliXmlLote.ok - cliXmlLote.erro;
        if (room <= 0) {
          cliXmlLote.pct = 100;
          cliXmlLote.eta = 0;
          clearInterval(cliXmlLote.timer);
          cliXmlLote.timer = null;
          setTimeout(() => {
            cliXmlLote.active = false;
            toast("Lote concluído — visão do cliente atualizada");
            renderClientes();
          }, 700);
          renderClientes();
          return;
        }
        const take = Math.min(step, room);
        const errAdd = cliXmlLote.erro < 2 && Math.random() < 0.08 ? 1 : 0;
        const okAdd = take - errAdd;
        cliXmlLote.ok += Math.max(0, okAdd);
        cliXmlLote.erro += errAdd;
        const done = cliXmlLote.ok + cliXmlLote.erro;
        cliXmlLote.pct = Math.min(100, (done / cliXmlLote.total) * 100);
        cliXmlLote.eta = Math.max(0, Math.round((cliXmlLote.total - done) * 1.1));
        renderClientes();
      }, 450);
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
        const docs = [
          { nome: "Contrato social", meta: "PDF · atualizado há 12 dias" },
          { nome: "Cartão CNPJ", meta: "PDF · emitido em 2026" },
          { nome: "Alvará municipal", meta: "PDF · validade 2026" },
          { nome: "Certificado digital (A1)", meta: `Válido até ${c.certValidade}` },
          { nome: "Procuração contábil", meta: "PDF · vigente" },
        ];
        return `<div class="cli-obr-list">${docs.map((d) => `
          <article class="cli-obr-card">
            <div class="obr-main">
              <strong>${d.nome}</strong>
              <span>${d.meta}</span>
            </div>
            <span class="proc-badge dept">Anexo</span>
          </article>`).join("")}</div>`;
      }
      if (cliPerfilTab === "comentarios") {
        return renderCliFeed(c);
      }
      if (cliPerfilTab === "entregas") {
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
      if (cliPerfilTab === "financeiro") {
        if (isClientePortal()) {
          return renderCliFinExecutivo(c);
        }
        const subTabs = [
          { id: "conciliacao", label: "Conciliação" },
          { id: "receber", label: "Títulos a Receber" },
          { id: "pagar", label: "Títulos a Pagar" },
          { id: "plano", label: "Plano de Contas" },
          { id: "auditoria", label: "Auditoria de Cartões" },
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
                <h2>${c.fantasia || c.nome}</h2>
                <div class="cli-perfil-meta">
                  <span>${c.razaoSocial}</span>
                  <span>·</span>
                  <span>${c.cnpj}</span>
                  <span>·</span>
                  <span>${c.regime}</span>
                  <span>·</span>
                  <span>${c.estado}</span>
                  <span class="cli-badge ${c.status === "Ativo" ? "matriz" : "filial"}">${c.status}</span>
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
    }

    function renderClientes() {
      const wrap = document.getElementById("clientesWrap");
      if (!wrap) return;
      if (cliView === "perfil" && cliPerfilId) renderClientesPerfil();
      else renderClientesList();
    }

    function openAddEmpresaModal() {
      openClienteCadastro();
    }

    function getCliTitulos(c, tipo) {
      const base = Math.round((c.faturamento || 50000) / 100);
      if (tipo === "receber") {
        return [
          { id: "r1", nome: c.fantasia || c.nome, descricao: "Mensalidade contábil — Jul/2026", vencimento: "10/07/2026", valor: base, restante: base, status: "aberto" },
          { id: "r2", nome: c.fantasia || c.nome, descricao: "Honorários avulsos — SPED", vencimento: "05/07/2026", valor: 1200, restante: 400, status: "parcial" },
          { id: "r3", nome: "Farmácia Centro Filial", descricao: "Assessoria societária", vencimento: "28/06/2026", valor: 890, restante: 0, status: "pago" },
          { id: "r4", nome: c.fantasia || c.nome, descricao: "Consultoria tributária", vencimento: "01/07/2026", valor: 650, restante: 650, status: "vencido" },
        ];
      }
      return [
        { id: "p1", nome: "Tech Docs Ltda", descricao: "Licença sistema fiscal", vencimento: "12/07/2026", valor: 480, restante: 480, status: "aberto" },
        { id: "p2", nome: "Energia Norte", descricao: "Conta de energia — Jun", vencimento: "08/07/2026", valor: 312.4, restante: 0, status: "pago" },
        { id: "p3", nome: "Cloud Host BR", descricao: "Hospedagem mensal", vencimento: "15/07/2026", valor: 199, restante: 99.5, status: "parcial" },
        { id: "p4", nome: "Cartório Centro", descricao: "Taxas cartorárias", vencimento: "30/06/2026", valor: 245, restante: 245, status: "vencido" },
      ];
    }

    function getCliTitulosFiltrados(c, tipo) {
      return getCliTitulos(c, tipo).filter((t) => !cliFinTituloStatusFiltro || t.status === cliFinTituloStatusFiltro);
    }

    function getCliPlanoModelos() {
      return [
        { id: "pm1", nome: "Plano Contábil Padrão", meta: "Modelo universal · 4 níveis · Simples Nacional" },
        { id: "pm2", nome: "Plano Farmácia / Varejo", meta: "Setorial · Lucro Presumido" },
        { id: "pm3", nome: "Plano Serviços Contábeis", meta: "Interno · centros de custo" },
        { id: "pm4", nome: "Plano Lucro Real Ampliado", meta: "Modelo universal · consolidado" },
        { id: "pm5", nome: "Mapeamento SPED ECD", meta: "Mapeamento amplo · contas referenciais" },
      ];
    }

    function renderCliFinTitulosToolbar(tipo) {
      return `
        <div class="cli-fin-tit-toolbar">
          <button type="button" class="btn-ghost" data-cli-fin-tit-action="importar" data-cli-fin-tit-tipo="${tipo}">Importar</button>
          <button type="button" class="btn-primary" data-cli-fin-tit-action="novo" data-cli-fin-tit-tipo="${tipo}">Novo</button>
          <div class="cli-fin-filter-wrap" id="cliFinTitFilterWrap">
            <button type="button" class="btn-ghost" data-cli-fin-tit-filter-toggle aria-haspopup="menu" aria-expanded="false">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
              Filtros
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="cli-fin-filter-menu" role="menu" aria-label="Filtros de títulos">
              <button type="button" role="menuitem" class="${!cliFinTituloStatusFiltro ? "active" : ""}" data-cli-fin-tit-filter="">Todos os status</button>
              <button type="button" role="menuitem" class="${cliFinTituloStatusFiltro === "aberto" ? "active" : ""}" data-cli-fin-tit-filter="aberto">Em aberto</button>
              <button type="button" role="menuitem" class="${cliFinTituloStatusFiltro === "parcial" ? "active" : ""}" data-cli-fin-tit-filter="parcial">Parcial</button>
              <button type="button" role="menuitem" class="${cliFinTituloStatusFiltro === "pago" ? "active" : ""}" data-cli-fin-tit-filter="pago">Pago</button>
              <button type="button" role="menuitem" class="${cliFinTituloStatusFiltro === "vencido" ? "active" : ""}" data-cli-fin-tit-filter="vencido">Vencido</button>
            </div>
          </div>
          <button type="button" class="btn-ghost" data-cli-fin-tit-action="exportar" data-cli-fin-tit-tipo="${tipo}">Exportar</button>
        </div>`;
    }

    function renderCliFinTitulosTable(c, tipo) {
      const rows = getCliTitulosFiltrados(c, tipo);
      const nomeCol = tipo === "receber" ? "Cliente" : "Fornecedor";
      const statusLabel = { aberto: "Em aberto", parcial: "Parcial", pago: "Pago", vencido: "Vencido" };
      return `
        ${renderCliFinTitulosToolbar(tipo)}
        <div class="cli-fin-tit-table">
          <table>
            <thead>
              <tr>
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
                <tr>
                  <td><strong>${t.nome}</strong></td>
                  <td>${t.descricao}</td>
                  <td>${t.vencimento}</td>
                  <td class="valor">${money(t.valor)}</td>
                  <td class="valor">${money(t.restante)}</td>
                  <td><span class="cli-fin-tit-status ${t.status}">${statusLabel[t.status] || t.status}</span></td>
                  <td>
                    <div class="cli-fin-tit-actions">
                      <button type="button" data-cli-fin-tit-row="ver" data-id="${t.id}">Ver</button>
                      <button type="button" data-cli-fin-tit-row="baixar" data-id="${t.id}">Baixar</button>
                    </div>
                  </td>
                </tr>`).join("") : `<tr><td colspan="7"><div class="cli-empty-panel">Nenhum título correspondente</div></td></tr>`}
            </tbody>
          </table>
        </div>`;
    }

    function renderCliFinSubTabBody(c, metrics) {
      if (cliFinSubTab === "auditoria") return renderCliFinAuditoriaTab(c);
      if (cliFinSubTab === "receber") return renderCliFinTitulosTable(c, "receber");
      if (cliFinSubTab === "pagar") return renderCliFinTitulosTable(c, "pagar");
      if (cliFinSubTab === "plano") {
        const q = normalizeSearchText(cliFinPlanoQuery);
        const modelos = getCliPlanoModelos().filter((m) =>
          !q || normalizeSearchText(m.nome + " " + m.meta).includes(q)
        );
        return `
          <div class="cli-fin-plano-head">
            <div class="proc-filter search">
              <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
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
              <div class="cli-fin-plano-item">
                <div>
                  <strong>${m.nome}</strong>
                  <span>${m.meta}</span>
                </div>
                <span class="proc-badge dept">Modelo</span>
              </div>`).join("") : `<div class="cli-empty-panel">Nenhum modelo encontrado</div>`}
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
                <div class="cli-fin-import-wrap" id="cliFinImportWrap">
                  <button type="button" class="btn-ghost" data-cli-fin-import-toggle aria-haspopup="menu" aria-expanded="false">
                    Importar
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                  <div class="cli-fin-import-menu" role="menu" aria-label="Importar arquivo">
                    <button type="button" role="menuitem" data-cli-fin-import="ofx">Importar OFX</button>
                    <button type="button" role="menuitem" data-cli-fin-import="cnab">Importar CNAB</button>
                  </div>
                </div>
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
          "Revisar parametrização da taxa Visa Crédito.",
          "Solicitar conferência da adquirente.",
          "Validar operações do dia 11/07.",
          "Exportar relatório para contestação.",
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
        dias: [
          { dia: "10/07", volume: 2030, mais: 0.86, menos: 0 },
          { dia: "11/07", volume: 4175.5, mais: 10.50, menos: 0 },
          { dia: "12/07", volume: 2560, mais: 0, menos: 0.80 },
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
          { bandeira: "Visa", prevista: 2.39, real: 2.89, diff: 0.50 },
          { bandeira: "Mastercard", prevista: 1.45, real: 1.20, diff: -0.25 },
          { bandeira: "Elo", prevista: 2.69, real: 2.69, diff: 0 },
          { bandeira: "Amex", prevista: 3.15, real: 3.15, diff: 0 },
          { bandeira: "Pix", prevista: 0.99, real: 0.99, diff: 0 },
        ],
        dist: {
          auditadas: 12,
          corretas: 9,
          mais: 2,
          menos: 1,
          pctOk: 75.0,
        },
        insights: [
          "A maior divergência (R$ 10,50) concentra ~81% do impacto líquido.",
          "Visa responde por 2 das 3 ocorrências financeiras.",
          "Crédito concentrou o maior valor divergente no dia 11/07.",
          "Mastercard apresentou cobrança inferior (benefício) de R$ 0,80.",
        ],
        top5: [
          { data: "11/07/2026", nsu: "51288419", bandeira: "Visa", modalidade: "Crédito", valor: 2100.0, diff: 10.50, status: "Alerta" },
          { data: "10/07/2026", nsu: "48129044", bandeira: "Visa", modalidade: "Débito", valor: 540.0, diff: 0.86, status: "Alerta" },
          { data: "12/07/2026", nsu: "52001188", bandeira: "Mastercard", modalidade: "Débito", valor: 320.0, diff: -0.80, status: "Alerta" },
        ],
        tabela: [
          { data: "10/07/2026", nsu: "48129044", auth: "29044102", bandeira: "Visa", modalidade: "Débito", bruto: 540.0, prevPct: 1.39, realPct: 1.55, prev: 7.51, real: 8.37, diffPct: 0.16, diff: 0.86, status: "Alerta" },
          { data: "10/07/2026", nsu: "48129011", auth: "29011001", bandeira: "Mastercard", modalidade: "Crédito à vista", bruto: 1280.0, prevPct: 2.49, realPct: 2.49, prev: 31.87, real: 31.87, diffPct: 0, diff: 0, status: "OK" },
          { data: "10/07/2026", nsu: "48129102", auth: "29102011", bandeira: "Elo", modalidade: "Débito", bruto: 210.0, prevPct: 1.49, realPct: 1.49, prev: 3.13, real: 3.13, diffPct: 0, diff: 0, status: "OK" },
          { data: "11/07/2026", nsu: "51288419", auth: "88419021", bandeira: "Visa", modalidade: "Crédito", bruto: 2100.0, prevPct: 2.39, realPct: 2.89, prev: 50.19, real: 60.69, diffPct: 0.50, diff: 10.50, status: "Alerta" },
          { data: "11/07/2026", nsu: "51288301", auth: "88301990", bandeira: "Elo", modalidade: "Crédito", bruto: 890.5, prevPct: 2.69, realPct: 2.69, prev: 23.95, real: 23.95, diffPct: 0, diff: 0, status: "OK" },
          { data: "11/07/2026", nsu: "51288355", auth: "88355110", bandeira: "Amex", modalidade: "Crédito", bruto: 760.0, prevPct: 3.15, realPct: 3.15, prev: 23.94, real: 23.94, diffPct: 0, diff: 0, status: "OK" },
          { data: "11/07/2026", nsu: "51288480", auth: "88480122", bandeira: "Visa", modalidade: "Débito", bruto: 425.0, prevPct: 1.39, realPct: 1.39, prev: 5.91, real: 5.91, diffPct: 0, diff: 0, status: "OK" },
          { data: "12/07/2026", nsu: "52001188", auth: "01188220", bandeira: "Mastercard", modalidade: "Débito", bruto: 320.0, prevPct: 1.45, realPct: 1.20, prev: 4.64, real: 3.84, diffPct: -0.25, diff: -0.80, status: "Alerta" },
          { data: "12/07/2026", nsu: "52001102", auth: "01102550", bandeira: "Pix", modalidade: "Pix", bruto: 275.0, prevPct: 0.99, realPct: 0.99, prev: 2.72, real: 2.72, diffPct: 0, diff: 0, status: "OK" },
          { data: "12/07/2026", nsu: "52001240", auth: "01240110", bandeira: "Visa", modalidade: "Crédito", bruto: 980.0, prevPct: 2.39, realPct: 2.39, prev: 23.42, real: 23.42, diffPct: 0, diff: 0, status: "OK" },
          { data: "12/07/2026", nsu: "52001301", auth: "01301880", bandeira: "Mastercard", modalidade: "Crédito à vista", bruto: 650.0, prevPct: 2.49, realPct: 2.49, prev: 16.19, real: 16.19, diffPct: 0, diff: 0, status: "OK" },
          { data: "12/07/2026", nsu: "52001388", auth: "01388990", bandeira: "Elo", modalidade: "Crédito", bruto: 335.0, prevPct: 2.69, realPct: 2.69, prev: 9.01, real: 9.01, diffPct: 0, diff: 0, status: "OK" },
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

    function initCliFinAuditLaudoChart(L) {
      destroyCliFinLaudoChart();
      if (typeof ApexCharts === "undefined") return;
      const dias = L.dias || [];
      const el = document.querySelector("#cliLaudoChartEvolucao");
      if (el) {
        const cats = dias.map((d) => d.dia);
        const volume = dias.map((d) => d.volume);
        const mais = dias.map((d) => d.mais);
        const menos = dias.map((d) => -d.menos);
        const chart = new ApexCharts(el, {
          chart: { type: "line", height: 250, fontFamily: "DM Sans, sans-serif", toolbar: { show: false }, zoom: { enabled: false } },
          series: [
            { name: "Cobrado a mais", type: "column", data: mais },
            { name: "Cobrado a menos", type: "column", data: menos },
            { name: "Volume bruto", type: "line", data: volume },
          ],
          colors: ["#b33a4a", "#2f9e6b", "#1e4f8f"],
          stroke: { width: [0, 0, 3], curve: "smooth" },
          plotOptions: { bar: { columnWidth: "48%", borderRadius: 4, borderRadiusApplication: "end" } },
          fill: { opacity: [0.92, 0.92, 1] },
          markers: { size: [0, 0, 4], strokeWidth: 2, strokeColors: "#fff", hover: { size: 6 } },
          dataLabels: { enabled: false },
          grid: { borderColor: "#d4dce8", strokeDashArray: 4 },
          xaxis: {
            categories: cats,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: "#6b7c93", fontSize: "12px", fontWeight: 500 } },
          },
          yaxis: [
            {
              seriesName: "Cobrado a mais",
              title: { text: "Divergência (R$)", style: { color: "#6b7c93", fontSize: "11px", fontWeight: 600 } },
              labels: { formatter: (v) => Math.abs(v).toLocaleString("pt-BR", { maximumFractionDigits: 0 }), style: { colors: "#6b7c93", fontSize: "11px" } },
            },
            { seriesName: "Cobrado a menos", show: false },
            {
              opposite: true,
              seriesName: "Volume bruto",
              title: { text: "Volume bruto (R$)", style: { color: "#6b7c93", fontSize: "11px", fontWeight: 600 } },
              labels: { formatter: (v) => `R$ ${(v / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}k`, style: { colors: "#6b7c93", fontSize: "11px" } },
            },
          ],
          legend: { show: false },
          tooltip: {
            shared: true,
            intersect: false,
            custom({ series, dataPointIndex, w }) {
              const dia = w.globals.categoryLabels[dataPointIndex];
              const vol = series[2][dataPointIndex] || 0;
              const m = series[0][dataPointIndex] || 0;
              const men = Math.abs(series[1][dataPointIndex] || 0);
              const liquido = m - men;
              return `<div style="padding:10px 12px;min-width:200px;font-family:DM Sans,sans-serif">
                <div style="font-weight:700;font-size:12px;margin-bottom:6px">Dia ${dia}</div>
                <div style="display:flex;justify-content:space-between;gap:14px;font-size:11px;margin:2px 0"><span>Volume bruto</span><b style="color:#1e4f8f">${money(vol)}</b></div>
                <div style="display:flex;justify-content:space-between;gap:14px;font-size:11px;margin:2px 0"><span>Cobrado a mais</span><b style="color:#b33a4a">${money(m)}</b></div>
                <div style="display:flex;justify-content:space-between;gap:14px;font-size:11px;margin:2px 0"><span>Cobrado a menos</span><b style="color:#2f9e6b">${money(men)}</b></div>
                <div style="display:flex;justify-content:space-between;gap:14px;font-size:11px;margin-top:6px;padding-top:6px;border-top:1px solid #d4dce8"><span style="font-weight:600">Impacto líquido</span><b style="color:${liquido > 0 ? "#b33a4a" : "#2f9e6b"}">${liquido >= 0 ? "+" : "−"}${money(Math.abs(liquido))}</b></div>
              </div>`;
            },
          },
        });
        chart.render();
        cliFinLaudoCharts.push(chart);
      }
    }

    function renderCliFinAuditAnaliticoHtml() {
      const L = getCliFinAuditLaudoModel();
      const conformCls = L.conform >= 95 ? "ok" : (L.conform >= 90 ? "warn" : "bad");
      const impactoCls = L.impacto > 0.01 ? "bad" : "ok";
      return `
        <div class="cli-fin-audit-pane cli-laudo" data-cli-fin-audit-pane="dashboard">
          <div class="laudo-head">
            <div>
              <p class="kicker">Dashboard analítico</p>
              <h3>Auditoria de Cartões</h3>
            </div>
            <div class="laudo-head-meta">
              <span class="laudo-pill">Cliente · <strong>${uiSelectEscape(L.cliente)}</strong></span>
              <span class="laudo-pill">${uiSelectEscape(L.periodoLabel)}</span>
            </div>
          </div>

          <section data-cli-fin-audit-view="dash-kpis">
            <div class="laudo-sec-title">
              <h4>Resumo analítico</h4>
              <p>Volume, conformidade e impacto financeiro do recorte.</p>
            </div>
            <div class="laudo-exec-kpis">
              <article class="laudo-exec-kpi">
                <p class="lab">Volume auditado</p>
                <p class="val">${money(L.volume)}</p>
                <p class="sub"><b>${L.total}</b> transações · ${uiSelectEscape(L.periodoLabel)}</p>
              </article>
              <article class="laudo-exec-kpi is-green">
                <p class="lab">Conformidade</p>
                <p class="val ${conformCls}">${String(L.conform).replace(".", ",")}%</p>
                <p class="sub"><b>${L.corretas}</b> corretas · <b>${L.divergentes}</b> divergente</p>
              </article>
              <article class="laudo-exec-kpi is-red">
                <p class="lab">Impacto financeiro</p>
                <p class="val ${impactoCls}">${money(L.impacto)}</p>
                <p class="sub">Mais <b>${money(L.cobradoMais)}</b> · Menos <b>−${money(L.cobradoMenos)}</b></p>
              </article>
              <article class="laudo-exec-kpi is-amber">
                <p class="lab">Maior divergência</p>
                <p class="val">+${money(L.ops.maiorDiv.valor)}</p>
                <p class="sub"><b>${uiSelectEscape(L.ops.maiorDiv.titulo)}</b> · ${uiSelectEscape(L.ops.maiorDiv.data)}</p>
              </article>
            </div>
          </section>

          <section class="laudo-card" data-cli-fin-audit-view="chart-evolucao">
            <div class="laudo-chart-head" style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;margin-bottom:10px">
              <div>
                <h4 style="margin:0;font-size:.9rem;font-weight:750;color:var(--navy-deep)">Evolução das divergências</h4>
                <p style="margin:2px 0 0;font-size:.74rem;color:var(--muted)">Volume diário × cobrado a mais/menos</p>
              </div>
              <div class="laudo-legend" style="display:flex;flex-wrap:wrap;gap:10px;font-size:.72rem;color:var(--muted);font-weight:600">
                <span><i style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#b33a4a;margin-right:4px"></i>Cobrado a mais</span>
                <span><i style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#2f9e6b;margin-right:4px"></i>Cobrado a menos</span>
                <span><i style="display:inline-block;width:12px;height:2px;background:#1e4f8f;margin-right:4px;vertical-align:middle"></i>Volume bruto</span>
              </div>
            </div>
            <div id="cliLaudoChartEvolucao" style="min-height:260px"></div>
          </section>

          <section data-cli-fin-audit-view="pareto">
            <div class="laudo-sec-title">
              <h4>Onde está o problema?</h4>
              <p>Pareto do prejuízo · bandeira, modalidade e combinação.</p>
            </div>
            <div class="laudo-pareto-grid">
              <div class="laudo-card">
                <h4>A · Por bandeira</h4>
                <div class="chart-sub">Valor perdido · qtd. · % do prejuízo</div>
                ${renderCliFinLaudoParetoRows(L.paretoBand || [])}
              </div>
              <div class="laudo-card">
                <h4>B · Por modalidade</h4>
                <div class="chart-sub">Quantidade · valor · %</div>
                ${renderCliFinLaudoParetoRows(L.paretoMod || [])}
              </div>
              <div class="laudo-card">
                <h4>C · Bandeira + modalidade</h4>
                <div class="chart-sub">Total perdido · qtd. · ranking</div>
                ${renderCliFinLaudoParetoRows(L.paretoCombo || [])}
              </div>
            </div>
          </section>

          <section class="laudo-card" data-cli-fin-audit-view="taxas">
            <div class="laudo-sec-title">
              <h4>Comparação das taxas</h4>
              <p>Taxa prevista vs taxa real por bandeira.</p>
            </div>
            <div class="laudo-taxas">
              ${(L.taxas || []).map((t) => `
                <div class="laudo-taxa-row">
                  <div class="band">${uiSelectEscape(t.bandeira)}</div>
                  <div class="pair"><span>Prevista</span><strong>${String(t.prevista).replace(".", ",")}%</strong></div>
                  <div class="pair"><span>Real</span><strong>${String(t.real).replace(".", ",")}%</strong></div>
                  <div class="diff ${Math.abs(t.diff) < 0.005 ? "is-neu" : (t.diff > 0 ? "" : "is-ok")}">${t.diff > 0 ? "+" : ""}${String(t.diff).replace(".", ",")}%</div>
                </div>`).join("")}
            </div>
          </section>

          <section class="laudo-card" data-cli-fin-audit-view="distribuicao">
            <div class="laudo-sec-title">
              <h4>Distribuição das divergências</h4>
              <p>Proporção visual do universo auditado.</p>
            </div>
            <div class="laudo-dist-bar" aria-label="Distribuição das divergências">
              <i class="seg-ok" style="width:${L.dist.pctOk}%"></i>
              <i class="seg-mais" style="width:${((L.dist.mais / L.dist.auditadas) * 100).toFixed(1)}%"></i>
              <i class="seg-menos" style="width:${((L.dist.menos / L.dist.auditadas) * 100).toFixed(1)}%"></i>
            </div>
            <div class="laudo-dist-legend">
              <span><b class="ok"></b>Corretas · ${L.dist.corretas} (${String(L.dist.pctOk).replace(".", ",")}%)</span>
              <span><b class="mais"></b>Cobrado a mais · ${L.dist.mais}</span>
              <span><b class="menos"></b>Cobrado a menos · ${L.dist.menos}</span>
              <span><b class="base"></b>Auditadas · ${L.dist.auditadas}</span>
            </div>
          </section>

          <section data-cli-fin-audit-view="insights">
            <div class="laudo-sec-title">
              <h4>Insights automáticos</h4>
              <p>Sinais rápidos para ação do analista.</p>
            </div>
            <div class="laudo-insights">
              ${(L.insights || []).map((txt) => `
                <article class="laudo-insight">
                  <div class="ico" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></div>
                  <p>${uiSelectEscape(txt)}</p>
                </article>`).join("")}
            </div>
          </section>

          <section class="laudo-card" data-cli-fin-audit-view="top5">
            <div class="laudo-sec-title">
              <h4>Maiores divergências</h4>
              <p>Top ocorrências · atalho para os maiores impactos.</p>
            </div>
            <div class="laudo-top5-wrap">
              <table class="laudo-top5">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>NSU</th>
                    <th>Bandeira</th>
                    <th>Modalidade</th>
                    <th class="num">Valor</th>
                    <th class="num">Diferença</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${(L.top5 || []).map((r) => `
                    <tr>
                      <td>${uiSelectEscape(r.data)}</td>
                      <td>${uiSelectEscape(r.nsu)}</td>
                      <td><strong>${uiSelectEscape(r.bandeira)}</strong></td>
                      <td>${uiSelectEscape(r.modalidade)}</td>
                      <td class="num">${money(r.valor)}</td>
                      <td class="num diff">${r.diff >= 0 ? "+" : "−"}${money(Math.abs(r.diff))}</td>
                      <td><span class="seal">${uiSelectEscape(r.status)}</span></td>
                    </tr>`).join("")}
                </tbody>
              </table>
            </div>
          </section>
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
      return `
        <div class="cli-fin-audit-pane cli-laudo" data-cli-fin-audit-pane="relatorio">
          <div class="laudo-head">
            <div>
              <p class="kicker">Relatório Executivo</p>
              <h3>Auditoria de Cartões</h3>
            </div>
            <div class="laudo-head-meta">
              <span class="laudo-pill">Cliente · <strong>${uiSelectEscape(L.cliente)}</strong></span>
              <span class="laudo-pill">${uiSelectEscape(L.periodoLabel)}</span>
              <button type="button" class="laudo-export" data-cli-fin-audit="export-laudo">
                <i data-lucide="download"></i>
                Exportar PDF
              </button>
            </div>
          </div>

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
              <div class="hero-meta-row"><span>Processado em</span><strong>${uiSelectEscape(L.meta.processado)}</strong></div>
              <div class="hero-meta-row"><span>Tempo</span><strong>${uiSelectEscape(L.meta.tempo)}</strong></div>
            </div>
          </section>

          <section class="laudo-diag" data-cli-fin-audit-view="resumo-auditoria">
            <div class="diag-ico" aria-hidden="true">
              <i data-lucide="sparkles"></i>
            </div>
            <div class="diag-body">
              <div class="diag-head">
                <h4>Resumo da auditoria</h4>
              </div>
              <p>Foram auditadas <b>${L.total.toLocaleString("pt-BR")} transações</b> entre <b>${uiSelectEscape(L.periodoCurto)}</b>. Identificamos <b>${L.ocorrencias} divergências financeiras</b>, com impacto líquido de <b>${money(L.impacto)}</b>. A maior parte do valor divergente concentra-se em operações <b>${uiSelectEscape(L.ops.maiorDiv.titulo)}</b>.</p>
            </div>
          </section>

          <section data-cli-fin-audit-view="resumo-exec">
            <div class="laudo-sec-title">
              <h4>Resumo executivo</h4>
              <p>Volume, divergência, conformidade e não efetivadas.</p>
            </div>
            <div class="laudo-exec-kpis">
              <article class="laudo-exec-kpi">
                <p class="lab">Volume auditado</p>
                <p class="val">${money(L.volume)}</p>
                <p class="sub"><b>${L.total.toLocaleString("pt-BR")}</b> transações · ${uiSelectEscape(L.periodoLabel)}</p>
              </article>
              <article class="laudo-exec-kpi is-red">
                <p class="lab">Divergência financeira</p>
                <p class="val">${money(L.impacto)}</p>
                <p class="sub"><b>${L.ocorrencias}</b> ocorrências · <b>${String(L.divergPct).replace(".", ",")}%</b> de divergência</p>
              </article>
              <article class="laudo-exec-kpi is-green">
                <p class="lab">Conformidade</p>
                <p class="val">${String(L.conform).replace(".", ",")}%</p>
                <p class="sub"><b>${L.corretas}</b> corretas · <b>${L.divergentes}</b> divergente</p>
              </article>
              <article class="laudo-exec-kpi is-amber">
                <p class="lab">Não efetivadas</p>
                <p class="val">${money(L.naoEfet.valor)}</p>
                <p class="sub"><b>${L.naoEfet.qtd}</b> · ${String(L.naoEfet.pct).replace(".", ",")}%</p>
              </article>
            </div>
          </section>

          <section class="laudo-diag" data-cli-fin-audit-view="diagnostico">
            <div class="diag-ico" aria-hidden="true">
              <i data-lucide="file-text"></i>
            </div>
            <div class="diag-body">
              <div class="diag-head">
                <h4>Diagnóstico automático</h4>
                <span class="tag">Parecer técnico</span>
              </div>
              <p>Foram auditadas <b>${L.total.toLocaleString("pt-BR")} transações</b> referentes ao período entre <b>${uiSelectEscape(L.periodoCurto)}</b>. Identificamos duas cobranças acima da taxa contratada e uma cobrança abaixo. O impacto líquido encontrado foi de <b>${money(L.impacto)}</b>. A maior divergência ocorreu em uma operação <b>${uiSelectEscape(L.ops.maiorDiv.titulo)}</b> no dia <b>11/07</b>, representando aproximadamente <b>81%</b> do valor divergente. Recomendamos revisar especialmente as operações <b>${uiSelectEscape(L.ops.maiorDiv.titulo)}</b> realizadas nesse período.</p>
              <div class="diag-chips">
                ${(L.diagChips || []).map((c) => `
                  <span><i class="${uiSelectEscape(c.tom)}" aria-hidden="true"></i>${uiSelectEscape(c.label)}</span>`).join("")}
              </div>
            </div>
          </section>

          <section class="laudo-card" data-cli-fin-audit-view="recomendacoes">
            <div class="laudo-sec-title">
              <h4>Recomendações da auditoria</h4>
              <p>O que fazer agora, após o parecer.</p>
            </div>
            <div class="laudo-recom">
              ${L.recomendacoes.map((txt) => `
                <div class="laudo-recom-item">
                  <div class="chk" aria-hidden="true">${checkSvg}</div>
                  <p>${uiSelectEscape(txt)}</p>
                </div>`).join("")}
            </div>
          </section>

          <section data-cli-fin-audit-view="ops">
            <div class="laudo-sec-title">
              <h4>Indicadores operacionais</h4>
              <p>Maiores ofensores e concentrações por bandeira/modalidade.</p>
            </div>
            <div class="laudo-ops">
              <article class="laudo-ops-card">
                <p class="lab">Maior divergência</p>
                <p class="title">${uiSelectEscape(L.ops.maiorDiv.titulo)}</p>
                <p class="amt mais">+${money(L.ops.maiorDiv.valor)}</p>
                <p class="hint">${uiSelectEscape(L.ops.maiorDiv.data)}</p>
              </article>
              <article class="laudo-ops-card">
                <p class="lab">Maior cobrança inferior</p>
                <p class="title">${uiSelectEscape(L.ops.maiorInf.titulo)}</p>
                <p class="amt menos">−${money(Math.abs(L.ops.maiorInf.valor))}</p>
                <p class="hint">${uiSelectEscape(L.ops.maiorInf.data)}</p>
              </article>
              <article class="laudo-ops-card">
                <p class="lab">Bandeira mais impactada</p>
                <p class="title">${uiSelectEscape(L.ops.bandImpact.titulo)}</p>
                <p class="amt neu">${money(L.ops.bandImpact.valor)}</p>
                <p class="hint">${L.ops.bandImpact.qtd} ocorrências</p>
              </article>
              <article class="laudo-ops-card">
                <p class="lab">Modalidade mais impactada</p>
                <p class="title">${uiSelectEscape(L.ops.modImpact.titulo)}</p>
                <p class="amt neu">${money(L.ops.modImpact.valor)}</p>
                <p class="hint">Concentração do impacto</p>
              </article>
            </div>
          </section>

          <section class="laudo-card" data-cli-fin-audit-view="resumo-div">
            <div class="laudo-sec-title">
              <h4>Resumo das divergências</h4>
              <p>Bloco compacto por bandeira · leitura rápida do laudo.</p>
            </div>
            <div class="laudo-resumo-grid">
              ${L.resumoBand.map((b) => {
                let valHtml;
                let subHtml;
                if (b.okLabel) {
                  valHtml = `<b class="ok">${uiSelectEscape(b.sub)}</b>`;
                  subHtml = b.nome === "Pix" ? "Nenhuma inconsistência encontrada" : "Sem divergências no período";
                } else {
                  const sign = b.valor < 0 ? "−" : "";
                  const amtCls = b.valor < 0 ? "ok" : "bad";
                  valHtml = `${uiSelectEscape(b.sub)}<span class="pipe">|</span><b class="${amtCls}">${sign}${money(Math.abs(b.valor))}</b>`;
                  subHtml = b.valor < 0 ? "Cobrado a menos pela adquirente" : "Cobrado a mais vs taxa prevista";
                }
                return `
                <article class="laudo-resumo-item is-${b.tom}">
                  <p class="lab">${uiSelectEscape(b.nome)}</p>
                  <p class="val">${valHtml}</p>
                  <p class="sub">${subHtml}</p>
                </article>`;
              }).join("")}
            </div>
          </section>

          <section class="laudo-card" data-cli-fin-audit-view="timeline">
            <div class="laudo-sec-title">
              <h4>Linha do tempo da auditoria</h4>
              <p>Marcos financeiros do período · ordem cronológica.</p>
            </div>
            <div class="laudo-timeline">
              ${L.timeline.map((t) => {
                const sign = t.valor >= 0 ? "+" : "−";
                const cls = t.tom === "menos" ? "menos" : "mais";
                return `
                <div class="laudo-tl-item is-${cls}">
                  <div class="laudo-tl-dot" aria-hidden="true"></div>
                  <div class="laudo-tl-body">
                    <p class="when">${uiSelectEscape(t.data)}</p>
                    <p class="ttl">${uiSelectEscape(t.titulo)}</p>
                    <div class="laudo-tl-meta">
                      <span class="amt ${cls}">${sign}${money(Math.abs(t.valor))}</span>
                      <span class="chip">${uiSelectEscape(t.bandeira)}</span>
                    </div>
                  </div>
                </div>`;
              }).join("")}
            </div>
          </section>

          <section class="laudo-table-card" data-cli-fin-audit-view="tabela">
            <div class="laudo-sec-title">
              <h4>Tabela de divergências</h4>
              <p>Evidências transacionais · busca, filtros e paginação.</p>
            </div>
            <div class="laudo-table-tools">
              <input type="search" id="cliLaudoTableSearch" placeholder="Buscar data, bandeira, modalidade…" value="${uiSelectEscape(cliFinAudit.laudoQuery || "")}" data-cli-fin-laudo="search" />
              <select id="cliLaudoTableBandeira" data-cli-fin-laudo="bandeira" data-no-ui="1" aria-label="Filtrar bandeira">
                <option value="" ${!cliFinAudit.laudoBandeira ? "selected" : ""}>Bandeira · todas</option>
                ${(L.bandeirasOpts || []).map((b) => `
                  <option value="${uiSelectEscape(b)}" ${cliFinAudit.laudoBandeira === b ? "selected" : ""}>${uiSelectEscape(b)}</option>`).join("")}
              </select>
              <select id="cliLaudoTableStatus" data-cli-fin-laudo="status" data-no-ui="1" aria-label="Filtrar status">
                <option value="" ${!cliFinAudit.laudoStatus ? "selected" : ""}>Status · todos</option>
                <option value="Alerta" ${cliFinAudit.laudoStatus === "Alerta" ? "selected" : ""}>Alerta</option>
                <option value="OK" ${cliFinAudit.laudoStatus === "OK" ? "selected" : ""}>OK</option>
              </select>
              <select id="cliLaudoTableSort" data-cli-fin-laudo="sort" data-no-ui="1" aria-label="Ordenar">
                <option value="diff-desc" ${cliFinAudit.laudoSort === "diff-desc" ? "selected" : ""}>Maior diferença</option>
                <option value="diff-asc" ${cliFinAudit.laudoSort === "diff-asc" ? "selected" : ""}>Menor diferença</option>
                <option value="valor-desc" ${cliFinAudit.laudoSort === "valor-desc" ? "selected" : ""}>Maior valor</option>
                <option value="data-asc" ${cliFinAudit.laudoSort === "data-asc" ? "selected" : ""}>Data</option>
              </select>
            </div>
            <div class="laudo-full-table-wrap">
              <table class="laudo-full-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Bandeira</th>
                    <th>Modalidade</th>
                    <th class="num">Valor bruto</th>
                    <th class="num">Taxa prevista</th>
                    <th class="num">Taxa real</th>
                    <th class="num">Desconto previsto</th>
                    <th class="num">Desconto real</th>
                    <th class="num">Diferença %</th>
                    <th class="num">Diferença R$</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${L.tableRows.length ? L.tableRows.map((r) => `
                    <tr>
                      <td>${uiSelectEscape(r.data)}</td>
                      <td><strong>${uiSelectEscape(r.bandeira)}</strong></td>
                      <td>${uiSelectEscape(r.modalidade)}</td>
                      <td class="num">${money(r.bruto)}</td>
                      <td class="num">${String(r.prevPct).replace(".", ",")}%</td>
                      <td class="num">${String(r.realPct).replace(".", ",")}%</td>
                      <td class="num">${money(r.prev)}</td>
                      <td class="num">${money(r.real)}</td>
                      <td class="num ${r.diffPct > 0.005 ? "diff-bad" : (r.diffPct < -0.005 ? "diff-ok" : "")}">${r.diffPct > 0 ? "+" : ""}${String(r.diffPct).replace(".", ",")}%</td>
                      <td class="num ${r.diff > 0.01 ? "diff-bad" : (r.diff < -0.01 ? "diff-ok" : "")}">${r.diff >= 0 ? "+" : "−"}${money(Math.abs(r.diff))}</td>
                      <td><span class="seal ${r.status === "OK" ? "ok" : "alerta"}">${uiSelectEscape(r.status)}</span></td>
                    </tr>`).join("") : `<tr><td colspan="11" style="text-align:center;color:var(--muted);padding:22px">Nenhum lançamento com os filtros atuais.</td></tr>`}
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

          <footer class="laudo-foot" data-cli-fin-audit-view="rodape">
            <div class="laudo-foot-meta">
              <span>Arquivo: <b>${uiSelectEscape(L.meta.arquivo)}</b></span>
              <span>Registros: <b>${L.meta.registros}</b></span>
              <span>Auditoria realizada: <b>${uiSelectEscape(L.meta.realizada)}</b></span>
              <span>Motor: <b>${uiSelectEscape(L.meta.motor)}</b></span>
              <span>Tempo: <b>${uiSelectEscape(L.meta.tempo)}</b></span>
            </div>
          </footer>
        </div>`;
    }

    function renderCliFinAuditModalTabsHtml() {
      const tabs = [
        { id: "relatorio", label: "Relatório Executivo" },
        { id: "dashboard", label: "Dashboard" },
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

    function renderFinAdquirentesListHtml() {
      const acqs = ensureFinAdquirentes();
      return `
        <div class="fin-op-card fin-acq-list-card">
          <div class="fin-card-head">
            <h4>Regras cadastradas</h4>
            <span class="chart-sub">${acqs.length} acordo${acqs.length === 1 ? "" : "s"} ativo${acqs.length === 1 ? "" : "s"} — usados no cruzamento da auditoria.</span>
          </div>
          <div class="fin-acq-list">
            ${acqs.map((a) => `
              <article class="fin-acq-item">
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
                <button type="button" class="btn-ghost sm" data-fin-cfg-del-acq="${a.id}">Remover</button>
              </article>`).join("") || `<div class="fin-table-empty">Nenhum acordo cadastrado.</div>`}
          </div>
        </div>`;
    }

    function renderFinAdquirentesHtml(opts = {}) {
      const f = finDash.config.acqForm || {};
      const bandeirasOpts = ["Visa", "Mastercard", "Elo", "Amex", "Hipercard"];
      const selectedBands = new Set(f.bandeiras || []);
      const saveLabel = opts.saveLabel || "Salvar acordo";
      const saveAttr = opts.saveAttr || "data-fin-cfg=\"save-acq\"";
      const stacked = !!opts.stacked;
      return `
        <div class="fin-config-acq-grid${stacked ? " is-stacked" : ""}">
          <div class="fin-emit-card fin-acq-form-card">
            <div class="fin-emit-head">
              <div>
                <h3>${stacked ? "Regras e Adquirentes" : "Acordo comercial (adquirente)"}</h3>
                <p>${stacked
                  ? "Cadastre operadora, bandeiras e taxas usadas no cruzamento desta auditoria."
                  : "Cadastre operadora, bandeiras e taxas usadas no cruzamento da Auditoria de Cartões."}</p>
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
                <div class="fin-band-checks">
                  ${bandeirasOpts.map((b) => `
                    <label class="fin-check-pill">
                      <input type="checkbox" data-fin-acq-band="${b}" ${selectedBands.has(b) ? "checked" : ""} />
                      <span class="fin-band-name">${b}</span>
                    </label>`).join("")}
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
              <label class="fin-field fin-field-wide">
                <span>Faixas de parcelas (intervalos de taxas)</span>
                <input type="text" id="finAcqParc" placeholder="1-1:2,49;2-6:3,19;7-12:3,99" value="${uiSelectEscape(f.parcelas || "")}" />
              </label>
              <div class="fin-emit-actions">
                <button type="button" class="btn-primary" ${saveAttr}>${saveLabel}</button>
              </div>
            </div>
          </div>
          ${renderFinAdquirentesListHtml()}
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
      const c = CLIENTES.find((x) => x.id === cliPerfilId);
      cliFinAudit.rulesModalOpen = true;
      cliFinAudit.modalOpen = false;
      cliFinAudit.filterOpen = false;
      cliFinAudit.rulesExpanded = false;
      openModal({
        title: "Regras e Adquirentes",
        sub: `${c?.fantasia || c?.nome || "Cliente"} · taxas usadas no cruzamento da auditoria`,
        body: renderFinAdquirentesHtml({ stacked: true, saveLabel: "Salvar regra", saveAttr: 'data-fin-cfg="save-acq"' }),
        wide: true,
        auditRules: true,
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
      const c = CLIENTES.find((x) => x.id === cliPerfilId);
      modalSub.textContent = `${c?.fantasia || c?.nome || "Cliente"} · taxas usadas no cruzamento da auditoria`;
      modalBody.innerHTML = renderFinAdquirentesHtml({ stacked: true, saveLabel: "Salvar regra", saveAttr: 'data-fin-cfg="save-acq"' });
      enhanceUiSelects(modalBody);
      const tools = document.getElementById("modalHeadTools");
      if (tools) tools.innerHTML = renderCliFinAuditRulesHeadExpandHtml();
      setCliFinAuditRulesExpanded(!!cliFinAudit.rulesExpanded);
    }

    function saveCliFinAcqFromDom(opts = {}) {
      const bands = [...document.querySelectorAll("[data-fin-acq-band]:checked")].map((el) => el.dataset.finAcqBand);
      const op = document.getElementById("finAcqOp")?.value || "Stone";
      const ini = document.getElementById("finAcqIni")?.value || "";
      const fim = document.getElementById("finAcqFim")?.value || "";
      const tipo = document.getElementById("finAcqTipo")?.value || "credito";
      const descPct = parseFinValorInput(document.getElementById("finAcqDesc")?.value || "");
      const antPct = parseFinValorInput(document.getElementById("finAcqAnt")?.value || "");
      const parcelas = (document.getElementById("finAcqParc")?.value || "").trim();
      if (!bands.length || !Number.isFinite(descPct)) {
        toast("Selecione bandeiras e informe o desconto %");
        return false;
      }
      ensureFinAdquirentes().unshift({
        id: `aq${Date.now()}`,
        operadora: op,
        inicio: formatFinDateBR(ini) || "—",
        fim: formatFinDateBR(fim) || "—",
        bandeiras: bands,
        tipoLanc: tipo,
        descontoPct: descPct,
        antecipacaoPct: Number.isFinite(antPct) ? antPct : 0,
        parcelas: parcelas || "—",
      });
      if (!opts.silent) toast(`Acordo ${op} salvo — disponível na Auditoria de Cartões`);
      return true;
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
        el.hidden = v[el.dataset.cliFinAuditView] === false;
      });
    }

    function renderCliFinAuditHeadToolsHtml() {
      const expanded = !!cliFinAudit.expanded;
      const filterOpen = !!cliFinAudit.filterOpen;
      const view = ensureCliFinAuditView();
      const tab = cliFinAudit.modalTab;
      const groups = tab === "dashboard" ? ["Dashboard"] : ["Laudo"];
      const tip = tab === "dashboard" ? "Escolher seções do dashboard" : "Escolher seções do laudo";
      const hint = tab === "dashboard"
        ? "Marque o que deseja exibir no Dashboard analítico."
        : "Marque o que deseja exibir no Relatório Executivo.";
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
      if (closeBtn) closeBtn.hidden = false;
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

    function openCliFinAuditModal() {
      const c = CLIENTES.find((x) => x.id === cliPerfilId);
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
        requestAnimationFrame(() => initCliFinAuditLaudoChart(getCliFinAuditLaudoModel()));
      }
      requestAnimationFrame(() => syncCliFinLaudoIcons());
    }

    function refreshCliFinAuditModal() {
      if (!cliFinAudit.modalOpen || !backdrop.classList.contains("open")) return;
      const c = CLIENTES.find((x) => x.id === cliPerfilId);
      modalSub.textContent = `${c?.fantasia || c?.nome || "Cliente"} · ${cliFinAuditPeriodLabel()}${cliFinAudit.fileName ? ` · ${cliFinAudit.fileName}` : ""}`;
      modalBody.innerHTML = renderCliFinAuditModalInner();
      modalFoot.innerHTML = `<button type="button" class="btn-ghost" data-close>Fechar</button>`;
      enhanceUiSelects(modalBody);
      syncCliFinAuditHeadTools();
      applyCliFinAuditView();
      setCliFinAuditExpanded(!!cliFinAudit.expanded);
      destroyCliFinLaudoChart();
      if (cliFinAudit.modalTab === "dashboard") {
        requestAnimationFrame(() => initCliFinAuditLaudoChart(getCliFinAuditLaudoModel()));
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
      if (finDash.empresaId) {
        const one = CLIENTES.find((c) => c.id === finDash.empresaId);
        return one ? [one] : [];
      }
      if (finDash.unidade && finDash.unidade !== "all") {
        const one = CLIENTES.find((c) => c.id === finDash.unidade);
        return one ? [one] : [];
      }
      return [...CLIENTES];
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
        { id: "produtos", nome: "Venda de Produtos", pct: 28, color: "#2979ff" },
        { id: "honorarios", nome: "Honorários Contábeis", pct: 16, color: "#ff6d00" },
        { id: "outras", nome: "Outras Receitas", pct: 10, color: "#aa00ff" },
      ];
      const filterId = finDash.receitaFilter || "";
      const filterItem = receitasBase.find((r) => r.id === filterId);
      const catFactor = filterItem ? Math.max(0.22, filterItem.pct / 100) : 1;
      const despesasBase = [
        { id: "pessoal", nome: "Pessoal e Encargos", pct: 38, color: "#e53935" },
        { id: "infra", nome: "Infraestrutura", pct: 22, color: "#ff6d00" },
        { id: "tecnologia", nome: "Tecnologia", pct: 18, color: "#2979ff" },
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

    function renderFinSparkline(values, color = "#3b6fd4") {
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
      const shades = ["#132a52", "#1e4f8f", "#3b6fd4", "#6b8caf", "#9aafc8"];
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
        const color = neg ? "#b33a4a" : (isProj ? (alerta ? "#b33a4a" : "#3b6fd4") : "#1e4f8f");
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

    function renderFinClientPickerHtml() {
      const selected = finDash.empresaId ? CLIENTES.find((c) => c.id === finDash.empresaId) : null;
      if (selected && !finDash.acOpen) {
        const nome = uiSelectEscape(selected.fantasia || selected.nome || "Cliente");
        const cnpj = uiSelectEscape(selected.cnpj || "CNPJ não informado");
        return `
          <div class="fin-client-picker">
            <div class="fin-client-chip" role="status" aria-live="polite">
              <div class="info">
                <strong>${nome}</strong>
                <span>${cnpj}</span>
              </div>
              <button type="button" class="fin-client-change" data-fin-client-change>Trocar</button>
            </div>
          </div>`;
      }
      const acMatches = CLIENTES.filter((c) => {
        const q = normalizeSearchText(finDash.empresaQuery);
        if (!q) return true;
        return normalizeSearchText([c.fantasia, c.nome, c.razaoSocial, c.cnpj].join(" ")).includes(q);
      }).slice(0, 8);
      return `
        <div class="fin-client-picker">
          <div class="proc-filter search">
            <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="search" id="finDashEmpresa" placeholder="Buscar cliente ou CNPJ..." value="${(finDash.empresaQuery || "").replace(/"/g, "&quot;")}" autocomplete="off" aria-label="Buscar cliente" aria-expanded="${finDash.acOpen}" />
            <div class="fin-ac-menu${finDash.acOpen ? " open" : ""}" id="finDashAcMenu" role="listbox">
              ${acMatches.length ? acMatches.map((c) => `
                <button type="button" data-fin-ac="${c.id}">
                  <strong>${uiSelectEscape(c.fantasia || c.nome)}</strong>
                  <span>${uiSelectEscape(c.cnpj || "")}</span>
                </button>`).join("") : `<div class="fin-ac-empty">Nenhum cliente encontrado</div>`}
            </div>
          </div>
        </div>`;
    }

    function finTabIcon(id) {
      const map = {
        conciliacao: icons.financeiro,
        cartoes: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>`,
        cobrancas: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>`,
        folha: icons.clientes,
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
            <button type="button" class="btn-ghost" data-fin-dash="limpar">Limpar Filtros</button>
            <button type="button" class="btn-primary" data-fin-dash="reload">Recarregar Dados</button>
            ${renderFinPagesMenuHtml()}
            <div class="fin-header-tools" id="finHeaderTools"></div>
          </div>
        </header>`;
    }

    function parkFinPanelTools() {
      const home = document.querySelector(".content-panel .panel-tools");
      const viewTools = document.getElementById("dashViewTools");
      const expandBtn = document.getElementById("expandBtn");
      if (!home) return;
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
      if (viewTools) host.appendChild(viewTools);
      if (expandBtn) host.appendChild(expandBtn);
      home.classList.add("is-fin-parked");
    }

    function ensureFinOpenTabs() {
      if (!Array.isArray(finDash.openTabIds) || !finDash.openTabIds.length) {
        finDash.openTabIds = ["dashboard"];
      }
      finDash.openTabIds = finDash.openTabIds.filter((id) => FIN_TABS.some((t) => t.id === id));
      if (!finDash.openTabIds.includes("dashboard")) finDash.openTabIds.unshift("dashboard");
      if (!finDash.openTabIds.includes(finDash.tab)) finDash.tab = "dashboard";
    }

    function closedFinTabs() {
      ensureFinOpenTabs();
      return FIN_TABS.filter((t) => t.id !== "dashboard" && !finDash.openTabIds.includes(t.id));
    }

    function addFinTab(id) {
      if (!FIN_TABS.some((t) => t.id === id) || id === "dashboard") return;
      ensureFinOpenTabs();
      if (!finDash.openTabIds.includes(id)) finDash.openTabIds.push(id);
      finDash.tab = id;
      finDash.acOpen = false;
      closeFinDrawer();
      renderFinModuleDash();
    }

    function closeFinTab(id) {
      if (id === "dashboard") {
        toast("Visão Geral não pode ser fechada");
        return;
      }
      ensureFinOpenTabs();
      const idx = finDash.openTabIds.indexOf(id);
      if (idx < 0) return;
      finDash.openTabIds.splice(idx, 1);
      if (finDash.tab === id) {
        finDash.tab = finDash.openTabIds[Math.max(0, idx - 1)] || "dashboard";
      }
      closeFinDrawer();
      renderFinModuleDash();
    }

    function renderFinTabsHtml() {
      ensureFinOpenTabs();
      const extraOpen = finDash.openTabIds.some((id) => id !== "dashboard");
      /* Sem páginas extras: some a barra "Visão Geral" e libera espaço acima dos KPIs. */
      if (!extraOpen) return "";
      const openTabs = FIN_TABS.filter((t) => finDash.openTabIds.includes(t.id));
      return `
        <div class="fin-tabs-bar">
          <nav class="fin-tabs" role="tablist" aria-label="Operações financeiras">
            ${openTabs.map((t) => {
              const canClose = t.id !== "dashboard";
              return `
              <div role="tab" data-fin-tab="${t.id}" class="fin-tab${finDash.tab === t.id ? " active" : ""}${t.tip ? " tip-bottom" : ""}" aria-selected="${finDash.tab === t.id ? "true" : "false"}"${t.tip ? ` data-tip="${uiSelectEscape(t.tip)}"` : ""} title="${uiSelectEscape(t.tip || t.label)}">
                <span class="fin-tab-label">${t.label}</span>
                ${canClose ? `<button type="button" class="fin-tab-close tip-bottom" data-fin-close-tab="${t.id}" data-tip="Fechar ${uiSelectEscape(t.label)}" aria-label="Fechar ${uiSelectEscape(t.label)}">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>` : ""}
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
      if (!hit) return "";
      return `${hit.group.label} › ${hit.leaf.label}`;
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
        const status = catId ? "conciliado" : (m.status || "aberto");
        return { ...m, catId, status };
      });
    }

    function filterFinConcMovements(rows) {
      const tipo = finDash.conc.tipo || "";
      const status = finDash.conc.status || "";
      const valorQ = normalizeSearchText(finDash.conc.valor || "");
      const idQ = normalizeSearchText(finDash.conc.idTitulo || "");
      return rows.filter((r) => {
        if (tipo && r.tipo !== tipo) return false;
        if (status && r.status !== status) return false;
        if (idQ && !normalizeSearchText(String(r.tituloId || r.id)).includes(idQ)) return false;
        if (valorQ) {
          const raw = normalizeSearchText(String(r.valor));
          const fmt = normalizeSearchText(money(r.valor));
          if (!raw.includes(valorQ) && !fmt.includes(valorQ)) return false;
        }
        return true;
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
      const section = finDash.config.section || "plano";
      const plano = getFinDreTaxonomy();

      return `
        <div class="fin-op-panel fin-config-panel">
          <div class="fin-config-nav" role="tablist">
            <button type="button" class="${section === "plano" ? "active" : ""}" data-fin-cfg-sec="plano">Plano de Contas (DRE)</button>
            <button type="button" class="${section === "adquirentes" ? "active" : ""}" data-fin-cfg-sec="adquirentes">Adquirentes &amp; Taxas</button>
          </div>

          ${section === "plano" ? `
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
            </div>` : `
            ${renderFinAdquirentesHtml()}`}
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

      return { saldo, receber, pagar, nivel, nivelCls, periodLabel, dre, nome: c.fantasia || c.nome, cnpj: c.cnpj || "" };
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
              <label class="proc-filter field">
                <span class="lbl">Período</span>
                <select id="cliFinExecPeriod" data-no-ui="1" aria-label="Período financeiro">
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
  :root { --navy:#132a52; --accent:#3b6fd4; --muted:#6b7c93; --ok:#2f9e6b; --bad:#b33a4a; --bg:#f3f5f8; --card:#fff; --border:#dbe3ef; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: "Segoe UI", system-ui, sans-serif; background: linear-gradient(160deg,#e8eef8,#f7f9fc 40%,#eef6f2); color:var(--navy); }
  .wrap { max-width: 920px; margin: 0 auto; padding: 28px 20px 48px; }
  .hero { background: var(--card); border:1px solid var(--border); border-radius:16px; padding:22px 24px; margin-bottom:18px; display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap; }
  .hero h1 { margin:0 0 6px; font-size:1.35rem; }
  .hero p { margin:0; color:var(--muted); font-size:.9rem; }
  .badge { align-self:flex-start; padding:6px 12px; border-radius:999px; font-weight:700; font-size:.75rem; background:rgba(59,111,212,.12); color:var(--accent); }
  .badge.ok,.badge.excel { background:rgba(47,158,107,.14); color:#1f7a52; }
  .badge.warn { background:rgba(196,127,22,.16); color:#9a5f0c; }
  .badge.bad { background:rgba(179,58,74,.14); color:var(--bad); }
  .kpis { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:18px; }
  .kpi { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:18px; border-left:4px solid var(--accent); }
  .kpi.receber { border-left-color:var(--ok); }
  .kpi.pagar { border-left-color:var(--bad); }
  .kpi .lab { font-size:.75rem; color:var(--muted); font-weight:650; }
  .kpi .val { font-size:1.55rem; font-weight:800; margin-top:6px; letter-spacing:-.02em; }
  .kpi .sub { font-size:.72rem; color:var(--muted); margin-top:4px; }
  .card { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:18px 20px; }
  .card h2 { margin:0 0 4px; font-size:1.05rem; }
  .card .sub { color:var(--muted); font-size:.78rem; margin-bottom:12px; }
  table { width:100%; border-collapse:collapse; font-size:.86rem; }
  th { text-align:left; font-size:.7rem; color:var(--muted); padding:8px 6px; border-bottom:1px solid var(--border); }
  td { padding:9px 6px; border-bottom:1px solid #eef2f7; }
  tr.parent td { background:#f7f9fc; }
  td.child { padding-left:18px; color:#3a4d6b; }
  .num { text-align:right; font-variant-numeric:tabular-nums; }
  .delta { font-weight:700; font-size:.75rem; padding:2px 8px; border-radius:999px; }
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
              <button type="button" class="btn-primary" data-fin-folha="import">Importar arquivo de folha</button>
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

    function renderFinConciliacaoPanel() {
      const all = getFinConcMovements();
      const rows = filterFinConcMovements(all);
      const abertos = all.filter((r) => r.status === "aberto").length;
      return `
        <div class="fin-op-panel fin-conc-panel">
          <div class="fin-op-toolbar">
            <button type="button" class="btn-primary" data-fin-conc="import">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Importar Extrato / XML
            </button>
            <div class="fin-op-filters">
              <div class="proc-filter field tipo tip-bottom" data-tip="Filtrar por tipo">
                <select id="finConcTipo" aria-label="Filtrar tipo">
                  <option value="" ${!finDash.conc.tipo ? "selected" : ""}>Tipo</option>
                  <option value="credito" ${finDash.conc.tipo === "credito" ? "selected" : ""}>Crédito</option>
                  <option value="debito" ${finDash.conc.tipo === "debito" ? "selected" : ""}>Débito</option>
                </select>
              </div>
              <div class="proc-filter field valor tip-bottom" data-tip="Filtrar por valor">
                <input type="search" id="finConcValor" placeholder="Valor" value="${(finDash.conc.valor || "").replace(/"/g, "&quot;")}" aria-label="Filtrar valor" />
              </div>
              <div class="proc-filter field id-titulo tip-bottom" data-tip="Filtrar por ID do título">
                <input type="search" id="finConcIdTitulo" placeholder="ID título" value="${(finDash.conc.idTitulo || "").replace(/"/g, "&quot;")}" aria-label="Filtrar ID do título" />
              </div>
              <div class="proc-filter field status tip-bottom" data-tip="Filtrar por status">
                <select id="finConcStatus" aria-label="Filtrar status">
                  <option value="" ${!finDash.conc.status ? "selected" : ""}>Status</option>
                  <option value="conciliado" ${finDash.conc.status === "conciliado" ? "selected" : ""}>Conciliado</option>
                  <option value="aberto" ${finDash.conc.status === "aberto" ? "selected" : ""}>Em aberto</option>
                </select>
              </div>
            </div>
            <div class="fin-op-actions">
              <button type="button" class="btn-ghost" data-fin-conc="export">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Exportar
              </button>
              <button type="button" class="btn-primary" data-fin-conc="add">Adicionar manualmente</button>
            </div>
            <div class="fin-op-meta">${rows.length} movimentações · ${abertos} em aberto</div>
          </div>

          <div class="fin-op-card fin-table-card">
            <div class="fin-table-scroll">
              <table class="fin-data-table fin-conc-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>ID título</th>
                    <th>Descrição original do banco</th>
                    <th>Categoria</th>
                    <th class="num">Valor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows.length ? rows.map((r) => {
                    const open = finDash.conc.catRowId === r.id;
                    const catLab = r.catId ? finDreCatLabel(r.catId) : "";
                    return `
                      <tr class="${open ? "is-cat-open" : ""}">
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
                      </tr>`;
                  }).join("") : `<tr><td colspan="6" class="fin-table-empty">Nenhuma movimentação com os filtros atuais.</td></tr>`}
                </tbody>
              </table>
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
            <text x="${w - 8}" y="${padT + 8}" text-anchor="end" font-size="9" fill="#1e4f8f">Volume</text>
            <line x1="${padL}" y1="${zeroY}" x2="${w - padR}" y2="${zeroY}" stroke="var(--border)" stroke-width="1.2" />
            <polyline points="${linePts}" fill="none" stroke="#1e4f8f" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" />
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
                  <circle cx="${cx.toFixed(1)}" cy="${vy.toFixed(1)}" r="3.4" fill="#1e4f8f" stroke="#fff" stroke-width="1.5" />
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
            <text x="${w - padR + 6}" y="${padT + 12}" font-size="8" fill="#1e4f8f">${moneyShort(maxVol)}</text>
            <text x="${w - padR + 6}" y="${h - padB}" font-size="8" fill="#1e4f8f">0</text>
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
      const imported = finDash.cartoes.imported;
      if (!imported) {
        return `
          <div class="fin-op-panel fin-cartoes-panel">
            <div class="fin-upload-hub${finDash.cartoes.dragging ? " is-drag" : ""}" data-fin-cartao-drop>
              <div class="hub-ico" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/><rect x="1" y="4" width="22" height="12" rx="2" opacity=".15"/></svg>
              </div>
              <h3>Importar Planilha de Vendas</h3>
              <p>Arraste e solte o arquivo da Stone/Cielo ou selecione no computador para cruzar vendas com as taxas parametrizadas.</p>
              <button type="button" class="btn-primary" data-fin-cartao="import">Importar Planilha de Vendas</button>
              <div class="hub-hint">Formatos aceitos no protótipo: .xlsx · .csv</div>
            </div>
          </div>`;
      }
      const a = getFinCartoesAudit();
      const tarifaCls = a.tarifaDiff > 0.01 ? "bad" : (a.tarifaDiff < -0.01 ? "ok" : "neutral");
      const tarifaLabel = a.tarifaDiff > 0.01 ? "Tarifa cobrada a mais" : (a.tarifaDiff < -0.01 ? "Tarifa cobrada a menos" : "Tarifa alinhada");
      const filtroHint = a.hasActiveFilter ? ` · filtro: ${a.rows.length} de ${a.all.length}` : "";
      return `
        <div class="fin-op-panel fin-cartoes-panel">
          <div class="fin-upload-hub fin-upload-hub-compact">
            <div class="hub-compact-copy">
              <strong>Planilha processada</strong>
              <span>Cruzamento Stone/Cielo × taxas do cadastro${filtroHint}</span>
            </div>
            <button type="button" class="btn-ghost" data-fin-cartao="reimport">Trocar planilha</button>
            <button type="button" class="btn-primary" data-fin-cartao="import">Reprocessar</button>
          </div>

          <div class="fin-cartao-kpis">
            <article class="fin-cartao-kpi">
              <div class="label">Valor Bruto</div>
              <div class="value">${money(a.bruto)}</div>
              <div class="sub">${a.hasActiveFilter ? "Vendido no filtro atual" : "Total vendido (efetivado)"}</div>
            </article>
            <article class="fin-cartao-kpi">
              <div class="label">Valor Líquido</div>
              <div class="value">${money(a.liquido)}</div>
              <div class="sub">${a.hasActiveFilter ? "Líquido no filtro atual" : "A receber após taxas"}</div>
            </article>
            <article class="fin-cartao-kpi ${tarifaCls}">
              <div class="label">${tarifaLabel}</div>
              <div class="value">${a.tarifaDiff >= 0 ? "+" : "−"} ${money(Math.abs(a.tarifaDiff))}</div>
              <div class="sub">Previsto × real aplicado</div>
            </article>
            <article class="fin-cartao-kpi warn">
              <div class="label">Não efetivadas</div>
              <div class="value">${money(a.naoEfet)}</div>
              <div class="sub">${a.hasActiveFilter ? "Negadas no filtro" : "Transações negadas"}</div>
            </article>
            <article class="fin-cartao-kpi accent">
              <div class="label">Lucro líquido diário</div>
              <div class="value">${money(a.lucroDiario)}</div>
              <div class="sub">${a.hasActiveFilter ? "Média nos dias filtrados" : "Média no horizonte da planilha"}</div>
            </article>
          </div>

          <div class="fin-cartao-charts is-compact">
            <section class="fin-op-card fin-mini-chart">
              <h4>Tarifa × Bandeira</h4>
              <div class="chart-sub">${a.hasActiveFilter ? "Desconto real no filtro" : "Desconto real acumulado"}</div>
              ${renderFinMiniBars(a.byBand, "#b33a4a")}
            </section>
            <section class="fin-op-card fin-mini-chart">
              <h4>Valor bruto × Tipo</h4>
              <div class="chart-sub">${a.hasActiveFilter ? "Crédito, débito e Pix filtrados" : "Crédito, débito e Pix"}</div>
              ${renderFinMiniBars(a.byTipo, "#3b6fd4")}
            </section>
            <section class="fin-op-card fin-mini-chart">
              <h4>Composição diária</h4>
              <div class="chart-sub">Líquido + tarifa prevista + erro · altura = bruto</div>
              ${renderFinTarifaDiaChart(a.byDia, a.dias)}
            </section>
          </div>

          <div class="fin-op-card fin-table-card fin-cartao-table-card">
            <div class="fin-card-head">
              <h4>Tabela de Divergências</h4>
              <span class="chart-sub">Os filtros do cabeçalho atualizam a tabela, os KPIs e os gráficos acima</span>
            </div>
            <div class="fin-table-scroll">
              <table class="fin-data-table fin-cartao-table">
                <thead>
                  <tr>
                    ${renderFinCartaoTh("dataHora", "Data e hora")}
                    ${renderFinCartaoTh("bandeira", "Bandeira", { options: a.bandeiras })}
                    ${renderFinCartaoTh("tipo", "Tipo", { options: a.tipos })}
                    ${renderFinCartaoTh("bruto", "Valor bruto", { num: true })}
                    ${renderFinCartaoTh("prev", "Desconto previsto", { num: true })}
                    ${renderFinCartaoTh("real", "Desconto real", { num: true })}
                    ${renderFinCartaoTh("diff", "Diferença", { num: true })}
                    ${renderFinCartaoTh("parcelas", "Parcelas", { options: a.parcelasOpts })}
                    ${renderFinCartaoTh("selo", "Selo", { options: ["OK", "Alerta", "Negada"] })}
                  </tr>
                </thead>
                <tbody>
                  ${renderFinCartaoRows(a.rows)}
                </tbody>
              </table>
            </div>
          </div>
        </div>`;
    }

    function renderFinDashboardPanel(data) {
      const scopeLabel = data.clientes.length === 1
        ? (data.clientes[0].fantasia || data.clientes[0].nome)
        : `${data.clientes.length}\u00a0empresas`;
      const inadAlert = data.taxaInadimplencia >= 12;
      const reportTab = finDash.reportTab || "visao";
      const isVisao = reportTab === "visao";

      const trend = (v, base) => {
        const up = v >= base;
        return { cls: up ? "up" : "down", arrow: up ? "↑" : "↓" };
      };
      const t7 = trend(data.projecaoCaixa7, data.saldoAtual);
      const t15 = trend(data.projecaoCaixa15, data.saldoAtual);
      const t30 = trend(data.projecaoCaixa30, data.saldoAtual);

      const tabsHtml = `
        <nav class="fin-report-nav" role="tablist" aria-label="Relatórios financeiros">
          <button type="button" role="tab" data-fin-report-tab="visao" class="${isVisao ? "active" : ""}" aria-selected="${isVisao}">Visão Geral</button>
          <button type="button" role="tab" data-fin-report-tab="dre" class="${reportTab === "dre" ? "active" : ""}" aria-selected="${reportTab === "dre"}">DRE</button>
          <button type="button" role="tab" data-fin-report-tab="dfc" class="${reportTab === "dfc" ? "active" : ""}" aria-selected="${reportTab === "dfc"}">DFC</button>
          <button type="button" role="tab" data-fin-report-tab="ebitda" class="${reportTab === "ebitda" ? "active" : ""}" aria-selected="${reportTab === "ebitda"}">EBITDA</button>
        </nav>`;

      const actionsHtml = (data.recomendacoes || []).map((a) => `
        <li>
          <span class="dot${a.urgent ? " urgent" : a.ok ? " ok" : ""}" aria-hidden="true"></span>
          <span>${a.texto}</span>
        </li>`).join("");

      const feedHtml = (data.feedItems || []).slice(0, 8).map((item) => {
        const kind = item.kind || "alert";
        const ico = kind === "in" ? "↓" : kind === "out" ? "↑" : "!";
        const amt = item.valor != null
          ? `<span class="amt ${kind}">${kind === "out" ? "−" : "+"}${money(item.valor)}</span>`
          : `<span class="amt alert">Ação</span>`;
        return `
          <li>
            <div class="avatar ${kind}" aria-hidden="true">${ico}</div>
            <div class="body">
              <div class="title">${kind === "alert" ? "🚨 " : ""}${uiSelectEscape(item.title)}</div>
              <div class="meta">${uiSelectEscape(item.meta || "")}</div>
            </div>
            ${amt}
          </li>`;
      }).join("");

      const visaoHtml = `
        <div class="fin-exec fin-report-panel" data-fin-report-panel="visao" ${isVisao ? "" : "hidden"}>
          <section class="fin-exec-decision" data-fin-filter="decision" aria-label="Centro de decisão financeira">
            <div class="fin-exec-col onde">
              <div class="col-kicker"><span class="ico" aria-hidden="true"><i data-lucide="gauge"></i></span> Onde estou?</div>
              <div class="fin-score-block">
                <div>
                  <div class="fin-score-row">
                    <div class="score">${data.score}<em>/100</em></div>
                    <span class="fin-score-badge ${data.scoreTone === "bad" ? "bad" : data.scoreTone === "warn" ? "warn" : ""}">${data.scoreLabel}</span>
                  </div>
                  <div class="fin-exec-meta">
                    Saldo atual <strong>${money(data.saldoAtual)}</strong><br>
                    ${data.caixaSaude} · ${scopeLabel}
                  </div>
                </div>
                <div class="fin-score-gauge ${data.scoreTone === "bad" ? "bad" : data.scoreTone === "warn" ? "warn" : ""}" aria-hidden="true">
                  <svg viewBox="0 0 120 78" role="img">
                    <path class="track" d="M14 62 A46 46 0 0 1 106 62"/>
                    <path class="fill" pathLength="100" d="M14 62 A46 46 0 0 1 106 62" stroke-dasharray="${Math.max(0, Math.min(100, Number(data.score) || 0))} 100"/>
                    <text class="needle-lbl" x="60" y="58" text-anchor="middle">${data.score}</text>
                  </svg>
                </div>
              </div>
            </div>
            <div class="fin-exec-col para">
              <div class="col-kicker"><span class="ico" aria-hidden="true"><i data-lucide="trending-up"></i></span> Para onde vou?</div>
              <div class="fin-proj-list">
                <div class="fin-proj-row">
                  <span class="lbl">7 dias</span>
                  <span class="val ${t7.cls}">${money(data.projecaoCaixa7)} <span class="trend">${t7.arrow}</span></span>
                </div>
                <div class="fin-proj-row">
                  <span class="lbl">15 dias</span>
                  <span class="val ${t15.cls}">${money(data.projecaoCaixa15)} <span class="trend">${t15.arrow}</span></span>
                </div>
                <div class="fin-proj-row">
                  <span class="lbl">30 dias</span>
                  <span class="val ${t30.cls}">${money(data.projecaoCaixa30)} <span class="trend">${t30.arrow}</span></span>
                </div>
              </div>
            </div>
            <div class="fin-exec-col fazer">
              <div class="col-kicker"><span class="ico" aria-hidden="true"><i data-lucide="list-checks"></i></span> O que devo fazer?</div>
              <ul class="fin-action-list">${actionsHtml}</ul>
            </div>
          </section>

          <section class="fin-exec-kpis" data-fin-filter="kpis" aria-label="Indicadores executivos">
            <button type="button" class="fin-exec-kpi saldo" data-fin-drill="saldo">
              <div class="lbl">Saldo Atual</div>
              <div class="val">${money(data.saldoAtual)}</div>
              <div class="hint">Disponível · ${scopeLabel}</div>
            </button>
            <button type="button" class="fin-exec-kpi fluxo" data-fin-drill="resumo">
              <div class="lbl">Fluxo Líquido</div>
              <div class="val">${money(data.geracaoCaixa)}</div>
              <div class="hint">Entradas − saídas no período</div>
            </button>
            <button type="button" class="fin-exec-kpi margem" data-fin-drill="margem">
              <div class="lbl">Margem Operacional</div>
              <div class="val">${String(data.margemOperacional).replace(".", ",")}%</div>
              <div class="hint">${money(data.margemValor)} no período</div>
            </button>
            <button type="button" class="fin-exec-kpi inad${inadAlert ? " is-alert" : ""}" data-fin-drill="inad">
              <div class="lbl">Inadimplência <span class="badge ${inadAlert ? "bad" : "warn"}">${inadAlert ? "Risco alto" : "Monitorar"}</span></div>
              <div class="val">${String(data.taxaInadimplencia).replace(".", ",")}%</div>
              <div class="hint">${money(data.receberVencidos)} vencido</div>
            </button>
            <button type="button" class="fin-exec-kpi receber" data-fin-drill="receber">
              <div class="lbl">Contas a Receber</div>
              <div class="val">${money(data.totalReceber)}</div>
              <div class="hint">${data.qtdReceber} títulos em aberto</div>
            </button>
            <button type="button" class="fin-exec-kpi pagar" data-fin-drill="pagar">
              <div class="lbl">Contas a Pagar</div>
              <div class="val">${money(data.totalPagar)}</div>
              <div class="hint">${data.qtdPagar} títulos em aberto</div>
            </button>
          </section>

          <section class="fin-exec-card" data-fin-filter="fluxo">
            <div class="card-head">
              <div>
                <h4>Fluxo de Caixa</h4>
                <div class="card-sub">Entradas, saídas e saldo projetado · ${data.periodLabel}</div>
              </div>
              <div class="card-head-tools">
                <select class="chart-axis" id="finDashAxis" aria-label="Eixo temporal">
                  <option value="mensal" ${finDash.axis === "mensal" ? "selected" : ""}>Mensal</option>
                  <option value="trimestral" ${finDash.axis === "trimestral" ? "selected" : ""}>Trimestral</option>
                  <option value="anual" ${finDash.axis === "anual" ? "selected" : ""}>Anual</option>
                </select>
              </div>
            </div>
            <div class="fin-exec-legend">
              <span><i style="background:#2f9e6b"></i> Entradas</span>
              <span><i style="background:#b33a4a"></i> Saídas</span>
              <span><i class="line" style="background:#1e4f8f"></i> Saldo projetado</span>
            </div>
            <div id="finExecComboChart"></div>
          </section>

          <section class="fin-exec-split" data-fin-filter="origem">
            <div class="fin-exec-card">
              <div class="card-head">
                <div>
                  <h4>Origem das Receitas</h4>
                  <div class="card-sub">Barras monocromáticas · tons de azul</div>
                </div>
              </div>
              <div id="finExecOrigemChart"></div>
            </div>
            <div class="fin-exec-card">
              <div class="card-head">
                <div>
                  <h4>Destino das Despesas</h4>
                  <div class="card-sub">Barras monocromáticas · tons de vermelho/cinza</div>
                </div>
              </div>
              <div id="finExecDestinoChart"></div>
            </div>
          </section>

          <section class="fin-exec-card" data-fin-filter="feed">
            <div class="card-head">
              <div>
                <h4>Últimas Movimentações e Alertas</h4>
                <div class="card-sub">Feed operacional com alertas automáticos</div>
              </div>
            </div>
            <ul class="fin-exec-feed">${feedHtml || `<li><div class="body"><div class="title">Sem movimentações no filtro atual</div></div></li>`}</ul>
          </section>
        </div>`;

      const reportsHtml = `
        <div id="relatorios-placeholder" ${isVisao ? "hidden" : ""}>
          <div class="fin-report-panel" data-fin-report-panel="dre" ${reportTab === "dre" ? "" : "hidden"}>
            <div class="fin-rpt-kpis">
              <div class="fin-rpt-kpi">
                <div class="k-lbl">Receita Bruta</div>
                <div class="k-val">${money(262185.96)}</div>
                <div class="k-hint">100% da base · período atual</div>
              </div>
              <div class="fin-rpt-kpi green">
                <div class="k-lbl">Receita Líquida</div>
                <div class="k-val pos">${money(251517.96)}</div>
                <div class="k-hint">Após deduções · 88%</div>
              </div>
              <div class="fin-rpt-kpi amber">
                <div class="k-lbl">Lucro Bruto</div>
                <div class="k-val">${money(206142.96)}</div>
                <div class="k-hint">Margem bruta 78,6%</div>
              </div>
              <div class="fin-rpt-kpi green">
                <div class="k-lbl">Resultado Líquido</div>
                <div class="k-val pos">${money(206142.96)}</div>
                <div class="k-hint">Margem líquida 37%</div>
              </div>
            </div>

            <div class="fin-rpt-grid">
              <div class="fin-rpt-card">
                <table class="fin-rpt-table" aria-label="Demonstração do Resultado">
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th class="num">Valor (R$)</th>
                      <th class="num">% Receita</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="is-section"><td colspan="3">Receitas</td></tr>
                    <tr class="is-total">
                      <td>Receita Bruta</td>
                      <td class="num">${money(262185.96)}</td>
                      <td class="num">100%</td>
                    </tr>
                    <tr class="is-indent">
                      <td>Prestação de Serviços</td>
                      <td class="num">${money(120605.54)}</td>
                      <td class="num pct">46%</td>
                    </tr>
                    <tr class="is-indent">
                      <td>Venda de Produtos</td>
                      <td class="num">${money(73412.07)}</td>
                      <td class="num pct">28%</td>
                    </tr>
                    <tr class="is-indent">
                      <td>Honorários Contábeis</td>
                      <td class="num">${money(41949.75)}</td>
                      <td class="num pct">16%</td>
                    </tr>
                    <tr class="is-indent">
                      <td>Outras Receitas</td>
                      <td class="num">${money(26218.60)}</td>
                      <td class="num pct">10%</td>
                    </tr>
                    <tr class="is-section"><td colspan="3">Deduções</td></tr>
                    <tr class="is-indent">
                      <td>(−) Deduções e Impostos</td>
                      <td class="num val-neg">−${money(10668)}</td>
                      <td class="num pct">12%</td>
                    </tr>
                    <tr class="is-indent-2">
                      <td>ISS / Impostos sobre serviço</td>
                      <td class="num val-neg">−${money(4800.60)}</td>
                      <td class="num pct">1,8%</td>
                    </tr>
                    <tr class="is-indent-2">
                      <td>PIS / COFINS / Outros</td>
                      <td class="num val-neg">−${money(5867.40)}</td>
                      <td class="num pct">2,2%</td>
                    </tr>
                    <tr class="is-total">
                      <td>(=) Receita Líquida</td>
                      <td class="num">${money(251517.96)}</td>
                      <td class="num">88%</td>
                    </tr>
                    <tr class="is-section"><td colspan="3">Custos e resultado</td></tr>
                    <tr class="is-indent">
                      <td>(−) Custos Operacionais</td>
                      <td class="num val-neg">−${money(45375)}</td>
                      <td class="num pct">17,3%</td>
                    </tr>
                    <tr class="is-indent-2">
                      <td>Custo de pessoal direto</td>
                      <td class="num val-neg">−${money(27225)}</td>
                      <td class="num pct">10,4%</td>
                    </tr>
                    <tr class="is-indent-2">
                      <td>Infraestrutura e sistemas</td>
                      <td class="num val-neg">−${money(18150)}</td>
                      <td class="num pct">6,9%</td>
                    </tr>
                    <tr class="is-total">
                      <td>(=) Lucro Bruto</td>
                      <td class="num">${money(206142.96)}</td>
                      <td class="num">78,6%</td>
                    </tr>
                    <tr class="is-total is-result">
                      <td>(=) Resultado Líquido</td>
                      <td class="num val-pos">${money(206142.96)}</td>
                      <td class="num">37%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="fin-rpt-stack">
                <div class="fin-rpt-card pad">
                  <div class="rpt-head">
                    <div>
                      <h4>Evolução da Margem Líquida</h4>
                      <div class="rpt-sub">Últimos 6 meses · % sobre receita</div>
                    </div>
                  </div>
                  <div id="finDreMargemChart" class="fin-rpt-chart"></div>
                </div>
                <div class="fin-rpt-card pad">
                  <div class="rpt-head">
                    <div>
                      <h4>Leitura executiva</h4>
                      <div class="rpt-sub">Pontos de atenção do DRE</div>
                    </div>
                  </div>
                  <ul class="fin-rpt-summary">
                    <li><span class="lbl">Carga tributária efetiva</span><span class="val">4,1%</span></li>
                    <li><span class="lbl">Custo / Receita Bruta</span><span class="val">17,3%</span></li>
                    <li><span class="lbl">Margem bruta</span><span class="val pos">78,6%</span></li>
                    <li><span class="lbl">Var. resultado vs mês ant.</span><span class="val pos">+6,4%</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="fin-rpt-notes">
              <div class="fin-rpt-note">
                <strong>Serviços concentram 46% da receita</strong>
                <p>A composição está saudável, com honorários e produtos equilibrando a base. Manter ticket médio e recorrência reduz volatilidade no próximo trimestre.</p>
              </div>
              <div class="fin-rpt-note">
                <strong>Resultado líquido em destaque</strong>
                <p>Margem de 37% acima da meta interna (30%). O ganho veio principalmente da contenção de custos de infraestrutura no período.</p>
              </div>
            </div>
          </div>

          <div class="fin-report-panel" data-fin-report-panel="dfc" ${reportTab === "dfc" ? "" : "hidden"}>
            <div class="fin-rpt-kpis">
              <div class="fin-rpt-kpi green">
                <div class="k-lbl">Recebimentos</div>
                <div class="k-val pos">${money(262185.96)}</div>
                <div class="k-hint">Clientes e recorrentes</div>
              </div>
              <div class="fin-rpt-kpi red">
                <div class="k-lbl">Pagamentos</div>
                <div class="k-val neg">−${money(140811.28)}</div>
                <div class="k-hint">Fornecedores e operacionais</div>
              </div>
              <div class="fin-rpt-kpi green">
                <div class="k-lbl">Geração de Caixa</div>
                <div class="k-val pos">${money(121374.68)}</div>
                <div class="k-hint">Entradas − saídas</div>
              </div>
              <div class="fin-rpt-kpi">
                <div class="k-lbl">Saldo Final</div>
                <div class="k-val">${money(121374.68)}</div>
                <div class="k-hint">Após movimentação do período</div>
              </div>
            </div>

            <div class="fin-rpt-grid">
              <div class="fin-rpt-card">
                <table class="fin-rpt-table" aria-label="Demonstração do Fluxo de Caixa">
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th class="num">Valor (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="is-section"><td colspan="2">Atividades operacionais</td></tr>
                    <tr>
                      <td>Recebimentos de Clientes</td>
                      <td class="num">${money(262185.96)}</td>
                    </tr>
                    <tr class="is-indent">
                      <td>Contratos mensais</td>
                      <td class="num">${money(178286.45)}</td>
                    </tr>
                    <tr class="is-indent">
                      <td>Projetos e avulsos</td>
                      <td class="num">${money(83899.51)}</td>
                    </tr>
                    <tr>
                      <td>Pagamentos a Fornecedores</td>
                      <td class="num val-neg">−${money(140811.28)}</td>
                    </tr>
                    <tr class="is-indent">
                      <td>Pessoal e encargos</td>
                      <td class="num val-neg">−${money(68450.20)}</td>
                    </tr>
                    <tr class="is-indent">
                      <td>Sistemas e infraestrutura</td>
                      <td class="num val-neg">−${money(39220.48)}</td>
                    </tr>
                    <tr class="is-indent">
                      <td>Demais fornecedores</td>
                      <td class="num val-neg">−${money(33140.60)}</td>
                    </tr>
                    <tr class="is-total is-result">
                      <td>Geração de Caixa Operacional</td>
                      <td class="num val-pos">${money(121374.68)}</td>
                    </tr>
                    <tr class="is-section"><td colspan="2">Investimentos e financiamento</td></tr>
                    <tr>
                      <td>Aquisição de equipamentos</td>
                      <td class="num val-neg">−${money(8200)}</td>
                    </tr>
                    <tr>
                      <td>Aplicações financeiras (resgate líquido)</td>
                      <td class="num">${money(8200)}</td>
                    </tr>
                    <tr class="is-total">
                      <td>Variação líquida de caixa</td>
                      <td class="num val-pos">${money(121374.68)}</td>
                    </tr>
                    <tr>
                      <td>Saldo inicial de caixa</td>
                      <td class="num">${money(0)}</td>
                    </tr>
                    <tr class="is-total">
                      <td>Saldo final de caixa</td>
                      <td class="num">${money(121374.68)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="fin-rpt-stack">
                <div class="fin-rpt-card pad">
                  <div class="rpt-head">
                    <div>
                      <h4>Evolução do Caixa (Últimos 6 meses)</h4>
                      <div class="rpt-sub">Saldo acumulado · Fev/26 → Jul/26</div>
                    </div>
                  </div>
                  <div id="finDfcCaixaChart" class="fin-rpt-chart tall"></div>
                </div>
                <div class="fin-rpt-card pad">
                  <div class="rpt-head">
                    <div>
                      <h4>Entradas × Saídas</h4>
                      <div class="rpt-sub">Comparativo mensal</div>
                    </div>
                  </div>
                  <div id="finDfcFluxoChart" class="fin-rpt-chart"></div>
                </div>
                <div class="fin-rpt-card pad">
                  <div class="rpt-head">
                    <div>
                      <h4>Resumo do período</h4>
                      <div class="rpt-sub">Saldo e movimentação</div>
                    </div>
                  </div>
                  <ul class="fin-rpt-summary">
                    <li><span class="lbl">Saldo Inicial</span><span class="val">${money(0)}</span></li>
                    <li><span class="lbl">Entradas</span><span class="val pos">${money(262185.96)}</span></li>
                    <li><span class="lbl">Saídas</span><span class="val neg">−${money(140811.28)}</span></li>
                    <li><span class="lbl">Investimentos líquidos</span><span class="val">${money(0)}</span></li>
                    <li><span class="lbl">Saldo Final</span><span class="val pos">${money(121374.68)}</span></li>
                    <li><span class="lbl">Cobertura de saídas</span><span class="val">1,86×</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="fin-report-panel" data-fin-report-panel="ebitda" ${reportTab === "ebitda" ? "" : "hidden"}>
            <div class="fin-rpt-kpis">
              <div class="fin-rpt-kpi">
                <div class="k-lbl">Receita Bruta</div>
                <div class="k-val">${money(262185.96)}</div>
                <div class="k-hint">Base 100%</div>
              </div>
              <div class="fin-rpt-kpi red">
                <div class="k-lbl">Despesas Operacionais</div>
                <div class="k-val neg">−${money(140811.28)}</div>
                <div class="k-hint">53,7% da receita</div>
              </div>
              <div class="fin-rpt-kpi green">
                <div class="k-lbl">EBITDA</div>
                <div class="k-val pos">${money(121374.68)}</div>
                <div class="k-hint">Margem 46,3%</div>
              </div>
              <div class="fin-rpt-kpi amber">
                <div class="k-lbl">Var. EBITDA 6m</div>
                <div class="k-val pos">+31,4%</div>
                <div class="k-hint">Fev → Jul/26</div>
              </div>
            </div>

            <div class="fin-rpt-grid">
              <div class="fin-rpt-card">
                <table class="fin-rpt-table" aria-label="Demonstração do EBITDA">
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th class="num">Valor (R$)</th>
                      <th class="num">% Receita</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="is-total">
                      <td>Receita Bruta</td>
                      <td class="num">${money(262185.96)}</td>
                      <td class="num">100%</td>
                    </tr>
                    <tr class="is-section"><td colspan="3">Despesas operacionais</td></tr>
                    <tr>
                      <td>Despesas Operacionais</td>
                      <td class="num val-neg">−${money(140811.28)}</td>
                      <td class="num">53,7%</td>
                    </tr>
                    <tr class="is-indent">
                      <td>Pessoal e encargos</td>
                      <td class="num val-neg">−${money(68450.20)}</td>
                      <td class="num pct">26,1%</td>
                    </tr>
                    <tr class="is-indent">
                      <td>Tecnologia e sistemas</td>
                      <td class="num val-neg">−${money(26218.60)}</td>
                      <td class="num pct">10,0%</td>
                    </tr>
                    <tr class="is-indent">
                      <td>Ocupação e utilidades</td>
                      <td class="num val-neg">−${money(20974.88)}</td>
                      <td class="num pct">8,0%</td>
                    </tr>
                    <tr class="is-indent">
                      <td>Marketing e comercial</td>
                      <td class="num val-neg">−${money(13109.30)}</td>
                      <td class="num pct">5,0%</td>
                    </tr>
                    <tr class="is-indent">
                      <td>Administrativas e outras</td>
                      <td class="num val-neg">−${money(12058.30)}</td>
                      <td class="num pct">4,6%</td>
                    </tr>
                    <tr class="is-total is-result">
                      <td>EBITDA</td>
                      <td class="num val-pos">${money(121374.68)}</td>
                      <td class="num">46,3%</td>
                    </tr>
                    <tr class="is-section"><td colspan="3">Conciliação</td></tr>
                    <tr class="is-indent">
                      <td>(−) Depreciação e amortização</td>
                      <td class="num val-neg">−${money(8450)}</td>
                      <td class="num pct">3,2%</td>
                    </tr>
                    <tr class="is-indent">
                      <td>(−) Juros e encargos financeiros</td>
                      <td class="num val-neg">−${money(3120)}</td>
                      <td class="num pct">1,2%</td>
                    </tr>
                    <tr class="is-total">
                      <td>EBIT (aproximado)</td>
                      <td class="num">${money(109804.68)}</td>
                      <td class="num">41,9%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="fin-rpt-stack">
                <div class="fin-rpt-card pad">
                  <div class="rpt-head">
                    <div>
                      <h4>Evolução do EBITDA (Últimos 6 meses)</h4>
                      <div class="rpt-sub">Linha suave · tendência operacional</div>
                    </div>
                  </div>
                  <div id="finEbitdaLineChart" class="fin-rpt-chart tall"></div>
                </div>
                <div class="fin-rpt-card pad">
                  <div class="rpt-head">
                    <div>
                      <h4>Composição das despesas</h4>
                      <div class="rpt-sub">Barras horizontais monocromáticas</div>
                    </div>
                  </div>
                  <div id="finEbitdaCompChart" class="fin-rpt-chart"></div>
                </div>
                <div class="fin-rpt-card pad">
                  <div class="rpt-head">
                    <div>
                      <h4>Composição do EBITDA</h4>
                      <div class="rpt-sub">Indicadores do período</div>
                    </div>
                  </div>
                  <div class="fin-ebitda-metrics">
                    <div class="metric">
                      <span class="m-lbl">Margem Bruta</span>
                      <span class="m-val">46,3%</span>
                      <div class="m-bar"><i style="width:46.3%"></i></div>
                    </div>
                    <div class="metric">
                      <span class="m-lbl">Margem EBITDA</span>
                      <span class="m-val">46,3%</span>
                      <div class="m-bar"><i class="tone-2" style="width:46.3%"></i></div>
                    </div>
                    <div class="metric">
                      <span class="m-lbl">Custo sobre Receita</span>
                      <span class="m-val">53,7%</span>
                      <div class="m-bar"><i class="tone-3" style="width:53.7%"></i></div>
                    </div>
                    <div class="metric">
                      <span class="m-lbl">Pessoal / Receita</span>
                      <span class="m-val">26,1%</span>
                      <div class="m-bar"><i class="tone-2" style="width:26.1%"></i></div>
                    </div>
                    <div class="metric">
                      <span class="m-lbl">EBITDA do Período</span>
                      <span class="m-val">${money(121374.68)}</span>
                      <div class="m-bar"><i class="tone-4" style="width:100%"></i></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;

      return `${tabsHtml}${visaoHtml}${reportsHtml}`;
    }

    let finExecCharts = [];

    function destroyFinExecCharts() {
      finExecCharts.forEach((c) => {
        try { c.destroy(); } catch (_) { /* noop */ }
      });
      finExecCharts = [];
    }

    function moneyTip(val) {
      return money(Number(val) || 0);
    }

    function switchFinReportTab(next) {
      const tab = next || "visao";
      finDash.reportTab = tab;
      document.querySelectorAll("[data-fin-report-tab]").forEach((btn) => {
        const on = btn.dataset.finReportTab === tab;
        btn.classList.toggle("active", on);
        btn.setAttribute("aria-selected", on ? "true" : "false");
      });
      document.querySelectorAll("[data-fin-report-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.finReportPanel !== tab;
      });
      const placeholder = document.getElementById("relatorios-placeholder");
      if (placeholder) placeholder.hidden = tab === "visao";
      destroyFinExecCharts();
      requestAnimationFrame(() => {
        initFinExecCharts(getFinDashData());
        scheduleFinChartResize();
      });
      applyViewFilters();
    }

    function scheduleFinChartResize() {
      const run = () => {
        finExecCharts.forEach((c) => {
          try { c.resize(); } catch (_) { /* noop */ }
        });
      };
      requestAnimationFrame(() => {
        run();
        setTimeout(run, 80);
        setTimeout(run, 220);
      });
    }

    function apexBase(height) {
      return {
        chart: {
          height: height || 320,
          width: "100%",
          toolbar: { show: false },
          fontFamily: "DM Sans, sans-serif",
          parentHeightOffset: 0,
          animations: { enabled: true, speed: 420 },
          redrawOnParentResize: true,
          redrawOnWindowResize: true,
        },
        grid: {
          borderColor: "#eef1f5",
          strokeDashArray: 3,
          padding: { left: 8, right: 8, top: 8, bottom: 0 },
        },
        legend: { show: false },
        dataLabels: { enabled: false },
      };
    }

    function initFinExecCharts(data) {
      destroyFinExecCharts();
      if (typeof ApexCharts === "undefined" || !data) return;
      const tab = finDash.reportTab || "visao";
      const meses6 = ["Fev/26", "Mar/26", "Abr/26", "Mai/26", "Jun/26", "Jul/26"];

      if (tab === "visao") {
        const series = data.chartSeries || [];
        const cats = series.map((r) => r.m);
        const entradas = series.map((r) => r.entradas);
        const saidas = series.map((r) => r.saidas);
        const saldo = series.map((r) => r.saldoCaixa);

        const comboEl = document.getElementById("finExecComboChart");
        if (comboEl) {
          const combo = new ApexCharts(comboEl, {
            ...apexBase(340),
            chart: { ...apexBase(340).chart, type: "line" },
            series: [
              { name: "Entradas", type: "column", data: entradas },
              { name: "Saídas", type: "column", data: saidas },
              { name: "Saldo projetado", type: "line", data: saldo },
            ],
            colors: ["#2f9e6b", "#b33a4a", "#1e4f8f"],
            stroke: { width: [0, 0, 3], curve: "smooth" },
            plotOptions: {
              bar: { columnWidth: "55%", borderRadius: 3 },
            },
            xaxis: {
              categories: cats,
              labels: { style: { colors: "#6b7c93", fontSize: "11px" } },
              axisBorder: { show: false },
              axisTicks: { show: false },
            },
            yaxis: {
              labels: {
                formatter: (v) => {
                  const n = Math.abs(v);
                  if (n >= 1e6) return `R$ ${(v / 1e6).toFixed(1)}M`;
                  if (n >= 1e3) return `R$ ${(v / 1e3).toFixed(0)}k`;
                  return `R$ ${Math.round(v)}`;
                },
                style: { colors: "#6b7c93", fontSize: "11px" },
              },
            },
            tooltip: {
              shared: true,
              intersect: false,
              y: { formatter: (v) => moneyTip(v) },
            },
            markers: { size: 0, hover: { size: 5 } },
          });
          combo.render();
          finExecCharts.push(combo);
        }

        const receitaItems = (data.receitas || []).map((r) => ({
          nome: r.nome,
          valor: r.valor || Math.round((data.recebido || 0) * ((r.pct || 0) / 100)),
        }));
        const despesaItems = (data.despesas || []).map((d) => ({
          nome: d.nome,
          valor: Math.round((data.pago || 0) * ((d.pct || 0) / 100)),
        }));

        const origemEl = document.getElementById("finExecOrigemChart");
        if (origemEl && receitaItems.length) {
          const blueShades = ["#132a52", "#1e4f8f", "#3b6fd4", "#6b8caf", "#9aafc8"];
          const origem = new ApexCharts(origemEl, {
            ...apexBase(260),
            chart: { ...apexBase(260).chart, type: "bar" },
            series: [{ name: "Receita", data: receitaItems.map((x) => x.valor) }],
            plotOptions: {
              bar: { horizontal: true, borderRadius: 4, barHeight: "62%", distributed: true },
            },
            colors: blueShades,
            dataLabels: {
              enabled: true,
              textAnchor: "start",
              offsetX: 8,
              formatter: (v) => moneyTip(v),
              style: { fontSize: "11px", fontWeight: 700, colors: ["#1e4f8f"] },
              background: { enabled: false },
            },
            xaxis: {
              categories: receitaItems.map((x) => x.nome),
              labels: { show: false },
              axisBorder: { show: false },
              axisTicks: { show: false },
            },
            yaxis: {
              labels: { style: { colors: "#4a5d73", fontSize: "12px", fontWeight: 600 } },
            },
            grid: { borderColor: "#eef1f5", xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } },
            tooltip: { y: { formatter: (v) => moneyTip(v) } },
          });
          origem.render();
          finExecCharts.push(origem);
        }

        const destinoEl = document.getElementById("finExecDestinoChart");
        if (destinoEl && despesaItems.length) {
          const redShades = ["#7a2430", "#b33a4a", "#c45c68", "#8a8f98", "#b0b5bc"];
          const destino = new ApexCharts(destinoEl, {
            ...apexBase(260),
            chart: { ...apexBase(260).chart, type: "bar" },
            series: [{ name: "Despesa", data: despesaItems.map((x) => x.valor) }],
            plotOptions: {
              bar: { horizontal: true, borderRadius: 4, barHeight: "62%", distributed: true },
            },
            colors: redShades,
            dataLabels: {
              enabled: true,
              textAnchor: "start",
              offsetX: 8,
              formatter: (v) => moneyTip(v),
              style: { fontSize: "11px", fontWeight: 700, colors: ["#7a2430"] },
              background: { enabled: false },
            },
            xaxis: {
              categories: despesaItems.map((x) => x.nome),
              labels: { show: false },
              axisBorder: { show: false },
              axisTicks: { show: false },
            },
            yaxis: {
              labels: { style: { colors: "#4a5d73", fontSize: "12px", fontWeight: 600 } },
            },
            grid: { borderColor: "#eef1f5", xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } },
            tooltip: { y: { formatter: (v) => moneyTip(v) } },
          });
          destino.render();
          finExecCharts.push(destino);
        }
        return;
      }

      if (tab === "dre") {
        const dreEl = document.getElementById("finDreMargemChart");
        if (!dreEl) return;
        const dre = new ApexCharts(dreEl, {
          ...apexBase(320),
          chart: { ...apexBase(320).chart, type: "area" },
          series: [{ name: "Margem líquida %", data: [31.2, 32.8, 34.1, 35.6, 36.2, 37.0] }],
          colors: ["#1e4f8f"],
          stroke: { curve: "smooth", width: 3 },
          fill: {
            type: "gradient",
            gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.05, stops: [0, 90, 100] },
          },
          markers: { size: 4, strokeWidth: 2, strokeColors: "#fff", hover: { size: 6 } },
          xaxis: {
            categories: meses6,
            labels: { style: { colors: "#6b7c93", fontSize: "11px", fontWeight: 600 } },
            axisBorder: { show: false },
            axisTicks: { show: false },
          },
          yaxis: {
            min: 28,
            max: 40,
            labels: {
              formatter: (v) => `${String(v.toFixed(0)).replace(".", ",")}%`,
              style: { colors: "#6b7c93", fontSize: "11px" },
            },
          },
          tooltip: { y: { formatter: (v) => `${String(v.toFixed(1)).replace(".", ",")}%` } },
        });
        dre.render();
        finExecCharts.push(dre);
        return;
      }

      if (tab === "dfc") {
        const dfcEl = document.getElementById("finDfcCaixaChart");
        if (dfcEl) {
          const dfc = new ApexCharts(dfcEl, {
            ...apexBase(340),
            chart: { ...apexBase(340).chart, type: "bar" },
            series: [{ name: "Saldo de caixa", data: [78500, 84200, 91350, 98800, 109400, 121374.68] }],
            colors: ["#1e4f8f"],
            plotOptions: { bar: { columnWidth: "52%", borderRadius: 5 } },
            xaxis: {
              categories: meses6,
              labels: { style: { colors: "#6b7c93", fontSize: "11px", fontWeight: 600 } },
              axisBorder: { show: false },
              axisTicks: { show: false },
            },
            yaxis: { labels: { show: false }, axisBorder: { show: false } },
            tooltip: { y: { formatter: (v) => moneyTip(v) } },
          });
          dfc.render();
          finExecCharts.push(dfc);
        }

        const fluxoEl = document.getElementById("finDfcFluxoChart");
        if (fluxoEl) {
          const fluxo = new ApexCharts(fluxoEl, {
            ...apexBase(300),
            chart: { ...apexBase(300).chart, type: "bar" },
            series: [
              { name: "Entradas", data: [198400, 205200, 214800, 228500, 241100, 262185.96] },
              { name: "Saídas", data: [142100, 138800, 145400, 151200, 148900, 140811.28] },
            ],
            colors: ["#2f9e6b", "#b33a4a"],
            plotOptions: { bar: { columnWidth: "62%", borderRadius: 3 } },
            legend: {
              show: true,
              position: "top",
              horizontalAlign: "right",
              fontSize: "11px",
              fontWeight: 600,
              markers: { width: 8, height: 8, radius: 2 },
            },
            xaxis: {
              categories: meses6,
              labels: { style: { colors: "#6b7c93", fontSize: "11px", fontWeight: 600 } },
              axisBorder: { show: false },
              axisTicks: { show: false },
            },
            yaxis: { labels: { show: false }, axisBorder: { show: false } },
            tooltip: { shared: true, intersect: false, y: { formatter: (v) => moneyTip(v) } },
          });
          fluxo.render();
          finExecCharts.push(fluxo);
        }
        return;
      }

      if (tab === "ebitda") {
        const ebitdaEl = document.getElementById("finEbitdaLineChart");
        if (ebitdaEl) {
          const ebitda = new ApexCharts(ebitdaEl, {
            ...apexBase(340),
            chart: { ...apexBase(340).chart, type: "area" },
            series: [{ name: "EBITDA", data: [92400, 97800, 101200, 108500, 114800, 121374.68] }],
            colors: ["#1e4f8f"],
            stroke: { curve: "smooth", width: 3 },
            fill: {
              type: "gradient",
              gradient: { shadeIntensity: 1, opacityFrom: 0.32, opacityTo: 0.04, stops: [0, 90, 100] },
            },
            markers: { size: 0, hover: { size: 5 } },
            xaxis: {
              categories: meses6,
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
            tooltip: { y: { formatter: (v) => moneyTip(v) } },
          });
          ebitda.render();
          finExecCharts.push(ebitda);
        }

        const compEl = document.getElementById("finEbitdaCompChart");
        if (compEl) {
          const compItems = [
            { nome: "Pessoal", valor: 68450.20 },
            { nome: "Tecnologia", valor: 26218.60 },
            { nome: "Ocupação", valor: 20974.88 },
            { nome: "Marketing", valor: 13109.30 },
            { nome: "Administrativas", valor: 12058.30 },
          ];
          const blues = ["#132a52", "#1e4f8f", "#3b6fd4", "#6b8caf", "#9aafc8"];
          const comp = new ApexCharts(compEl, {
            ...apexBase(280),
            chart: { ...apexBase(280).chart, type: "bar" },
            series: [{ name: "Despesa", data: compItems.map((x) => x.valor) }],
            plotOptions: {
              bar: { horizontal: true, borderRadius: 4, barHeight: "58%", distributed: true },
            },
            colors: blues,
            dataLabels: {
              enabled: true,
              textAnchor: "start",
              offsetX: 8,
              formatter: (v) => moneyTip(v),
              style: { fontSize: "11px", fontWeight: 700, colors: ["#1e4f8f"] },
              background: { enabled: false },
            },
            xaxis: {
              categories: compItems.map((x) => x.nome),
              labels: { show: false },
              axisBorder: { show: false },
              axisTicks: { show: false },
            },
            yaxis: {
              labels: { style: { colors: "#4a5d73", fontSize: "12px", fontWeight: 600 } },
            },
            grid: { borderColor: "#eef1f5", xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } },
            tooltip: { y: { formatter: (v) => moneyTip(v) } },
          });
          comp.render();
          finExecCharts.push(comp);
        }
      }
    }

    function renderFinModuleDash() {
      const wrap = document.getElementById("financeiroWrap");
      if (!wrap) return;
      parkFinPanelTools();
      const selected = finDash.empresaId ? CLIENTES.find((c) => c.id === finDash.empresaId) : null;
      const hasClient = !!selected;
      if (!FIN_TABS.some((t) => t.id === finDash.tab)) finDash.tab = "dashboard";

      let workspaceHtml = renderFinEmptyStateHtml();
      let dashData = null;
      if (finDash.tab === "dashboard") {
        dashData = getFinDashData();
        workspaceHtml = renderFinDashboardPanel(dashData);
      } else if (hasClient) {
        if (finDash.tab === "conciliacao") workspaceHtml = renderFinConciliacaoPanel();
        else if (finDash.tab === "cartoes") workspaceHtml = renderFinCartoesPanel();
        else if (finDash.tab === "cobrancas") workspaceHtml = renderFinCobrancasPanel();
        else if (finDash.tab === "folha") workspaceHtml = renderFinFolhaPanel();
        else if (finDash.tab === "config") workspaceHtml = renderFinConfigPanel();
        else workspaceHtml = renderFinTabStubHtml(finDash.tab);
      }

      wrap.innerHTML = `
        <div class="fin-shell">
          ${renderFinGlobalHeaderHtml()}
          ${renderFinTabsHtml()}
          <div class="fin-workspace">${workspaceHtml}</div>
        </div>`;

      mountFinPanelTools();
      enhanceUiSelects(wrap);
      syncFinPeriodCustomUi(wrap);
      if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
        lucide.createIcons({ attrs: { "stroke-width": 2 } });
      }
      if (finDash.tab === "dashboard" && dashData) {
        destroyFinExecCharts();
        requestAnimationFrame(() => {
          initFinExecCharts(dashData);
          scheduleFinChartResize();
        });
        applyViewFilters();
        if (finDash.drawer) openFinDrawer(finDash.drawer.kind, dashData);
      } else if (finDash.drawer && finDash.tab !== "dashboard") {
        destroyFinExecCharts();
        closeFinDrawer();
      } else {
        destroyFinExecCharts();
      }
      const emitForm = wrap.querySelector("#finEmitForm");
      if (emitForm && !emitForm.dataset.bound) {
        emitForm.dataset.bound = "1";
        emitForm.addEventListener("submit", (ev) => {
          ev.preventDefault();
          emitForm.querySelector("[data-fin-cob='emit']")?.click();
        });
      }
    }

    let cfgStore = null;

    function ensureCfgStore() {
      if (cfgStore) return cfgStore;
      const funcionarios = [
        { id: "f1", nome: "Marina Souza", cargo: "Analista Fiscal", dept: "Fiscal", email: "marina.souza@escritorio.com.br", initials: "MS" },
        { id: "f2", nome: "Pedro Alves", cargo: "Analista Fiscal", dept: "Fiscal", email: "pedro.alves@escritorio.com.br", initials: "PA" },
        { id: "f3", nome: "Camila Dias", cargo: "Analista Fiscal", dept: "Fiscal", email: "camila.dias@escritorio.com.br", initials: "CD" },
        { id: "f4", nome: "Rafael Nunes", cargo: "Assistente", dept: "Fiscal", email: "rafael.nunes@escritorio.com.br", initials: "RN" },
        { id: "f5", nome: "Bianca Lopes", cargo: "Assistente", dept: "Fiscal", email: "bianca.lopes@escritorio.com.br", initials: "BL" },
        { id: "f6", nome: "Tiago Mendes", cargo: "Analista Fiscal", dept: "Fiscal", email: "tiago.mendes@escritorio.com.br", initials: "TM" },
        { id: "f7", nome: "Helena Prado", cargo: "Assistente", dept: "Fiscal", email: "helena.prado@escritorio.com.br", initials: "HP" },
        { id: "f8", nome: "Igor Santos", cargo: "Analista Fiscal", dept: "Fiscal", email: "igor.santos@escritorio.com.br", initials: "IS" },
        { id: "f9", nome: "Marcos Lima", cargo: "Assistente", dept: "Pessoal", email: "marcos.lima@escritorio.com.br", initials: "ML" },
        { id: "f10", nome: "Patrícia Gomes", cargo: "Assistente", dept: "Pessoal", email: "patricia.gomes@escritorio.com.br", initials: "PG" },
        { id: "f11", nome: "Bruno Teixeira", cargo: "Assistente", dept: "Pessoal", email: "bruno.teixeira@escritorio.com.br", initials: "BT" },
        { id: "f12", nome: "Larissa Moura", cargo: "Assistente", dept: "Pessoal", email: "larissa.moura@escritorio.com.br", initials: "LM" },
        { id: "f13", nome: "Juliana Reis", cargo: "Coordenador Contábil", dept: "Contábil", email: "juliana.reis@escritorio.com.br", initials: "JR" },
        { id: "f14", nome: "Felipe Rocha", cargo: "Coordenador Contábil", dept: "Contábil", email: "felipe.rocha@escritorio.com.br", initials: "FR" },
        { id: "f15", nome: "Amanda Vieira", cargo: "Assistente", dept: "Contábil", email: "amanda.vieira@escritorio.com.br", initials: "AV" },
        { id: "f16", nome: "Ricardo Pinto", cargo: "Assistente", dept: "Contábil", email: "ricardo.pinto@escritorio.com.br", initials: "RP" },
        { id: "f17", nome: "Sueli Barbosa", cargo: "Assistente", dept: "Contábil", email: "sueli.barbosa@escritorio.com.br", initials: "SB" },
        { id: "f18", nome: "Ana Costa", cargo: "Analista Fiscal", dept: "Fiscal", email: "ana.costa@escritorio.com.br", initials: "AC" },
        { id: "f19", nome: "Carlos Eduardo", cargo: "Sócio Proprietário", dept: "Comercial", email: "carlos.eduardo@escritorio.com.br", initials: "CE" },
        { id: "f20", nome: "Denise Freitas", cargo: "Assistente", dept: "Comercial", email: "denise.freitas@escritorio.com.br", initials: "DF" },
      ];
      cfgStore = {
        funcionarios,
        departamentos: [
          { id: "d1", nome: "Fiscal", desc: "Obrigações e apurações fiscais", status: "Ativo" },
          { id: "d2", nome: "Pessoal", desc: "Folha, eSocial e admitidos", status: "Ativo" },
          { id: "d3", nome: "Contábil", desc: "Balancetes e encerramentos", status: "Ativo" },
          { id: "d4", nome: "Comercial", desc: "Captação e onboarding", status: "Ativo" },
          { id: "d5", nome: "Paralegal", desc: "Contratos e protocolos societários", status: "Ativo" },
          { id: "d6", nome: "Implantação", desc: "Abertura e parametrização de clientes", status: "Ativo" },
          { id: "d7", nome: "Gestão de Processos", desc: "Rotinas e acompanhamento operacional", status: "Ativo" },
          { id: "d8", nome: "Diretoria", desc: "Decisões estratégicas e encerramentos", status: "Ativo" },
        ],
        cargos: [
          { id: "c1", nome: "Sócio Proprietário", desc: "Gestão estratégica do escritório", status: "Ativo" },
          { id: "c2", nome: "Analista Fiscal", desc: "Apuração e transmissão de obrigações", status: "Ativo" },
          { id: "c3", nome: "Assistente", desc: "Apoio operacional às áreas", status: "Ativo" },
          { id: "c4", nome: "Coordenador Contábil", desc: "Supervisão da rotina contábil", status: "Ativo" },
        ],
        moldes: [
          {
            id: "m1",
            titulo: "Auditoria ICMS",
            desc: "Checklist e etapas para auditoria de ICMS em empresas do Lucro Real.",
            departamento: "Fiscal",
            tags: ["ICMS", "Lucro Real"],
            etapas: [
              { titulo: "Extrair EFD ICMS IPI", desc: "Etapa é realizada no módulo fiscal", status: "Em Espera", obrigatoria: true, documento: true },
              { titulo: "Conferir arquivos XML", desc: "Validação dos documentos fiscais importados", status: "Pendente", obrigatoria: true, documento: true },
              { titulo: "Cruzar CIAP e créditos", desc: "Análise de créditos e permanentes", status: "Em Espera", obrigatoria: false, documento: true },
              { titulo: "Apurar diferenças", desc: "Comparativo entre escrituração e apuração", status: "Pendente", obrigatoria: true, documento: false },
              { titulo: "Gerar relatório preliminar", desc: "Documento de resumo para revisão interna", status: "Em Espera", obrigatoria: false, documento: true },
              { titulo: "Enviar ao cliente", desc: "Disponibilização do parecer final", status: "Em Espera", obrigatoria: false, documento: false },
            ],
          },
          {
            id: "m2",
            titulo: "Cadastro de Empresas",
            desc: "Fluxo padrão de abertura e parametrização inicial do cliente.",
            departamento: "Comercial",
            tags: ["Onboarding"],
            etapas: [
              { titulo: "Coletar documentos", desc: "Contrato social, CNPJ e procurações", status: "Em Espera", obrigatoria: true, documento: true },
              { titulo: "Parametrizar sistema", desc: "Regime, obrigações e acessos", status: "Pendente", obrigatoria: true, documento: false },
              { titulo: "Validar certificados", desc: "Conferir validade e titularidade", status: "Em Espera", obrigatoria: true, documento: true },
              { titulo: "Liberar operação", desc: "Ativar empresa no ambiente produtivo", status: "Em Espera", obrigatoria: false, documento: false },
            ],
          },
          {
            id: "m3",
            titulo: "Migração de Regime",
            desc: "Etapas para mudança de enquadramento tributário.",
            departamento: "Fiscal",
            tags: ["Regime"],
            etapas: [
              { titulo: "Diagnosticar regime atual", desc: "Levantamento de impactos e prazos", status: "Em Espera", obrigatoria: true, documento: false },
              { titulo: "Simular novo enquadramento", desc: "Comparativo de carga tributária", status: "Pendente", obrigatoria: true, documento: true },
              { titulo: "Atualizar obrigações", desc: "Ajustar calendário e regras", status: "Em Espera", obrigatoria: true, documento: false },
              { titulo: "Comunicar alteração", desc: "Avisar cliente e equipes internas", status: "Em Espera", obrigatoria: false, documento: true },
            ],
          },
        ],
        obrigacoes: [
          {
            id: "o1",
            titulo: "DIEF - DECLARAÇÃO DE INFORMAÇÕES ECONÔMICO-FISCAIS",
            tipo: "manual",
            competencia: "Mês anterior",
            reenvio: "Ignorar",
            departamento: "Fiscal",
            geraDocumento: true,
            tipoDocumento: "OBRIGAÇÕES ACESSÓRIAS",
            tempoPrevisto: "10",
            geraMulta: true,
            notificarEmail: false,
            frequencia: "Mensalmente",
            diaUtil: false,
            dataDinamica: false,
            dia: 20,
            mes: "Junho",
            prazoLegal: "20/06/2026",
            prazoTecnico: "15/06/2026",
            regras: ["Regime normal nacional", "Simples nacional", "Simples CIEE", "Todas as empresas", "Simples bananal"],
            externa: false,
            visivelCliente: false,
          },
          {
            id: "o2",
            titulo: "13º SALÁRIO",
            tipo: "manual",
            competencia: "Competência definida",
            reenvio: "Reprocessa e mantém arquivos anteriores",
            departamento: "Pessoal",
            geraDocumento: true,
            tipoDocumento: "Declaração",
            tempoPrevisto: "45",
            geraMulta: false,
            frequencia: "Anualmente",
            dia: 20,
            mes: "Dezembro",
            regras: ["Todas as empresas"],
          },
          {
            id: "o3",
            titulo: "DAS — Simples Nacional",
            tipo: "automática",
            competencia: "Mês atual",
            reenvio: "Reprocessa e mantém arquivos anteriores",
            departamento: "Fiscal",
            geraDocumento: true,
            tipoDocumento: "Guia",
            tempoPrevisto: "15",
            frequencia: "Mensalmente",
            dia: 20,
            mes: "Julho",
            regras: ["Simples nacional"],
          },
          {
            id: "o4",
            titulo: "DCTFWeb",
            tipo: "automática",
            competencia: "Mês anterior",
            reenvio: "Ignorar",
            departamento: "Fiscal",
            geraDocumento: true,
            tipoDocumento: "OBRIGAÇÕES ACESSÓRIAS",
            tempoPrevisto: "20",
            frequencia: "Mensalmente",
            dia: 15,
            mes: "Julho",
            regras: ["Regime normal nacional"],
          },
        ],
        logs: [
          { id: "l1", metodo: "GET", endpoint: "/chat/config", quando: "14/07/2026 17:42:11", usuario: "marina.souza@escritorio.com.br", ip: "187.45.12.90", status: 200, payload: '{\n  "tenant": "processo-agil",\n  "ativo": true\n}' },
          { id: "l2", metodo: "POST", endpoint: "/api/robos/sync", quando: "14/07/2026 16:18:03", usuario: "ana.costa@escritorio.com.br", ip: "187.45.12.91", status: 500, payload: '{\n  "error": "Timeout ao conectar no host do robô",\n  "code": "ROBOT_TIMEOUT"\n}' },
          { id: "l3", metodo: "PUT", endpoint: "/obrigacoes/regras/12", quando: "13/07/2026 11:05:44", usuario: "juliana.reis@escritorio.com.br", ip: "10.0.0.14", status: 200, payload: '{\n  "id": 12,\n  "reenvio": "Ignorar"\n}' },
          { id: "l4", metodo: "DELETE", endpoint: "/rh/cargos/99", quando: "12/07/2026 09:22:50", usuario: "marina.souza@escritorio.com.br", ip: "187.45.12.90", status: 403, payload: '{\n  "error": "Sem permissão para excluir cargo em uso"\n}' },
        ],
        avisos: [],
        gruposObr: [
          { id: "g1", nome: "Obrigações mensais", itens: 4 },
          { id: "g2", nome: "Folha e DP", itens: 3 },
        ],
        regrasObr: [
          { id: "r1", nome: "Todas as empresas", regimes: "Qualquer", estado: "Todos", atividades: "Qualquer", tipo: "Geral", obrigacoes: 4, tags: [] },
          { id: "r2", nome: "Simples nacional", regimes: "Simples Nacional", estado: "Todos", atividades: "Qualquer", tipo: "Regime", obrigacoes: 6, tags: ["SN"] },
          { id: "r3", nome: "Simples CIEE", regimes: "Simples Nacional", estado: "TO", atividades: "Educação", tipo: "Atividade", obrigacoes: 2, tags: ["CIEE"] },
          { id: "r4", nome: "Regime normal nacional", regimes: "Lucro Real / Presumido", estado: "Todos", atividades: "Qualquer", tipo: "Regime", obrigacoes: 5, tags: ["RN"] },
        ],
        pastasDoc: [
          { id: "p1", titulo: "FISCAL", desc: "Responsável pelo todos os documentos fiscais e análises para o cliente", destaque: false },
          { id: "p2", titulo: "CONTABIL", desc: "Responsável pelo todos os documentos contábeis e análises para o cliente", destaque: false },
          { id: "p3", titulo: "FINANCEIRO", desc: "Boletos e contratos com os cliente", destaque: false },
          { id: "p4", titulo: "IMPLANTAÇÃO", desc: "Responsável pela a recepção dos clientes", destaque: false },
        ],
        tiposDoc: [
          { id: "td1", nome: "ADMISSÕES", departamento: "Pessoal", pastaPai: "", visivelCliente: true, secoes: ["DEPARTAMENTO PESSOAL", "IMPLANTAÇÃO"] },
          { id: "td2", nome: "ADVERTÊNCIAS", departamento: "Pessoal", pastaPai: "", visivelCliente: false, secoes: ["DEPARTAMENTO PESSOAL"] },
          { id: "td3", nome: "AFASTAMENTOS", departamento: "Pessoal", pastaPai: "", visivelCliente: false, secoes: ["DEPARTAMENTO PESSOAL"] },
          { id: "td4", nome: "CONTRATOS", departamento: "Comercial", pastaPai: "", visivelCliente: true, secoes: ["FINANCEIRO", "PARALEGAL"] },
          { id: "td5", nome: "CERTIFICADOS", departamento: "Fiscal", pastaPai: "FISCAL", visivelCliente: true, secoes: ["CERTIFICADO DIGITAL", "FISCAL"] },
          { id: "td6", nome: "OBRIGAÇÕES ACESSÓRIAS", departamento: "Fiscal", pastaPai: "FISCAL", visivelCliente: false, secoes: ["FISCAL"] },
        ],
        classificadorRegras: ["NF-e → Fiscal", "Extrato → Financeiro", "Contrato → Jurídico"],
      };
      return cfgStore;
    }

    function getCfgTipoDocName(t) {
      return typeof t === "string" ? t : (t?.nome || "");
    }

    function getCfgSecoesDocumento() {
      const store = ensureCfgStore();
      const base = [
        "FISCAL",
        "CONTABIL",
        "FINANCEIRO",
        "IMPLANTAÇÃO",
        "PARALEGAL",
        "CERTIFICADO DIGITAL",
        "DEPARTAMENTO PESSOAL",
      ];
      const fromPastas = (store.pastasDoc || []).map((p) => p.titulo);
      return [...new Set([...base, ...fromPastas])];
    }

    function fmtCfgDateBR(iso) {
      if (!iso) return "—";
      const [y, m, d] = iso.split("-");
      return `${d}/${m}/${y}`;
    }

    function parseCfgIso(iso) {
      const [y, m, d] = (iso || "").split("-").map(Number);
      if (!y || !m || !d) return null;
      return new Date(y, m - 1, d);
    }

    function toCfgIso(date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }

    function parseCfgDateBR(str) {
      const m = String(str || "").trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (!m) return null;
      const d = Number(m[1]);
      const mo = Number(m[2]);
      const y = Number(m[3]);
      const date = new Date(y, mo - 1, d);
      if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return null;
      return toCfgIso(date);
    }

    function renderCfgDateRangeHtml({ iniId, fimId, iniIso, fimIso, block = false }) {
      return `
        <div class="cfg-date-range${block ? " block" : ""}">
          <input type="date" id="${iniId}" value="${iniIso || ""}" aria-label="Data inicial" />
          <span class="sep">até</span>
          <input type="date" id="${fimId}" value="${fimIso || ""}" aria-label="Data final" />
        </div>`;
    }

    function bindCfgDateInputs(root = document) {
      root.querySelectorAll(".cfg-date-range input[type='date']").forEach((input) => {
        if (input.dataset.dateBound === "1") return;
        input.dataset.dateBound = "1";
        input.addEventListener("change", () => {
          const syncMap = {
            cfgSessIni: "cfgSessIniFilter",
            cfgSessFim: "cfgSessFimFilter",
            cfgSessIniFilter: "cfgSessIni",
            cfgSessFimFilter: "cfgSessFim",
          };
          const other = document.getElementById(syncMap[input.id]);
          if (other) other.value = input.value;
        });
      });
    }

    function readCfgDateRange(iniId, fimId) {
      const ini = document.getElementById(iniId)?.value || "";
      const fim = document.getElementById(fimId)?.value || "";
      if (!ini || !fim) {
        toast("Informe as datas do período");
        return null;
      }
      if (ini > fim) {
        toast("A data inicial não pode ser maior que a final");
        return null;
      }
      return { ini, fim };
    }

    function openCfgConfirmModal({ title, sub, message, confirmLabel = "Confirmar", danger = false, onConfirm }) {
      openModal({
        title,
        sub: sub || "",
        body: `<p style="margin:0;font-size:.88rem;color:var(--navy-deep);line-height:1.5">${message}</p>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="${danger ? "btn-ghost" : "btn-primary"}" id="cfgConfirmOk" style="${danger ? "color:#b42318;border-color:rgba(180,35,24,.35)" : ""}">${confirmLabel}</button>`,
      });
      document.getElementById("cfgConfirmOk")?.addEventListener("click", () => {
        closeModal();
        onConfirm?.();
      });
    }

    function openCfgPeriodoModal({ ini, fim, onApply, title = "Selecionar período" }) {
      openModal({
        title,
        sub: "Informe a data inicial e a data final do filtro",
        body: `
          <div class="cfg-date-range-modal">
            <p class="hint">Escolha o período no mesmo formato da Visão Geral.</p>
            ${renderCfgDateRangeHtml({
              iniId: "cfgPeriodoIni",
              fimId: "cfgPeriodoFim",
              iniIso: ini || cfgState.sessPeriod.ini,
              fimIso: fim || cfgState.sessPeriod.fim,
              block: true,
            })}
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="cfgCalApply">Aplicar período</button>`,
      });
      bindCfgDateInputs(modalBody);
      document.getElementById("cfgPeriodoIni")?.focus();
      document.getElementById("cfgCalApply")?.addEventListener("click", () => {
        const range = readCfgDateRange("cfgPeriodoIni", "cfgPeriodoFim");
        if (!range) return;
        closeModal();
        onApply?.(range.ini, range.fim);
      });
    }

    function syncCfgRhCounts() {
      const s = ensureCfgStore();
      s.departamentos.forEach((d) => {
        d.funcs = s.funcionarios.filter((f) => f.dept === d.nome).length;
      });
      s.cargos.forEach((c) => {
        c.funcs = s.funcionarios.filter((f) => f.cargo === c.nome).length;
      });
    }

    function getCfgMock() {
      const s = ensureCfgStore();
      syncCfgRhCounts();
      return s;
    }

    function openCfgNovoDepartamentoModal() {
      openModal({
        title: "Novo departamento",
        sub: "Cadastre um departamento da estrutura interna",
        body: `
          <label for="cfgDeptNome">Nome *</label>
          <input id="cfgDeptNome" type="text" placeholder="Ex: Fiscal" maxlength="80" />
          <label for="cfgDeptDesc">Descrição</label>
          <textarea id="cfgDeptDesc" placeholder="Breve descrição das responsabilidades"></textarea>
          <label for="cfgDeptStatus">Status</label>
          <select id="cfgDeptStatus">
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="cfgDeptSave">Criar departamento</button>`,
      });
      document.getElementById("cfgDeptNome")?.focus();
      document.getElementById("cfgDeptSave")?.addEventListener("click", () => {
        const nome = document.getElementById("cfgDeptNome")?.value?.trim();
        if (!nome) {
          toast("Informe o nome do departamento");
          return;
        }
        const store = ensureCfgStore();
        if (store.departamentos.some((d) => normalizeSearchText(d.nome) === normalizeSearchText(nome))) {
          toast("Já existe um departamento com este nome");
          return;
        }
        store.departamentos.push({
          id: "d" + Date.now().toString(36),
          nome,
          desc: document.getElementById("cfgDeptDesc")?.value?.trim() || "Sem descrição",
          status: document.getElementById("cfgDeptStatus")?.value || "Ativo",
        });
        closeModal();
        toast("Departamento criado");
        renderConfigura();
      });
    }

    function openCfgNovoCargoModal() {
      const depts = ensureCfgStore().departamentos;
      openModal({
        title: "Novo cargo",
        sub: "Cadastre um cargo e vincule a um departamento",
        body: `
          <label for="cfgCargoNome">Nome *</label>
          <input id="cfgCargoNome" type="text" placeholder="Ex: Analista Fiscal" maxlength="80" />
          <label for="cfgCargoDesc">Descrição</label>
          <textarea id="cfgCargoDesc" placeholder="Principais atribuições do cargo"></textarea>
          <label for="cfgCargoDept">Departamento</label>
          <select id="cfgCargoDept">
            ${depts.map((d) => `<option value="${d.nome}">${d.nome}</option>`).join("")}
          </select>
          <label for="cfgCargoStatus">Status</label>
          <select id="cfgCargoStatus">
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="cfgCargoSave">Criar cargo</button>`,
      });
      document.getElementById("cfgCargoNome")?.focus();
      document.getElementById("cfgCargoSave")?.addEventListener("click", () => {
        const nome = document.getElementById("cfgCargoNome")?.value?.trim();
        if (!nome) {
          toast("Informe o nome do cargo");
          return;
        }
        const store = ensureCfgStore();
        if (store.cargos.some((c) => normalizeSearchText(c.nome) === normalizeSearchText(nome))) {
          toast("Já existe um cargo com este nome");
          return;
        }
        store.cargos.push({
          id: "c" + Date.now().toString(36),
          nome,
          desc: document.getElementById("cfgCargoDesc")?.value?.trim() || "Sem descrição",
          status: document.getElementById("cfgCargoStatus")?.value || "Ativo",
          deptPadrao: document.getElementById("cfgCargoDept")?.value || "",
        });
        closeModal();
        toast("Cargo criado");
        renderConfigura();
      });
    }

    let cfgMoldeDraft = null;

    function captureCfgMoldeDraftFields() {
      if (!cfgMoldeDraft) return;
      cfgMoldeDraft.nome = document.getElementById("cfgMoldeNome")?.value || "";
      cfgMoldeDraft.desc = document.getElementById("cfgMoldeDesc")?.value || "";
      cfgMoldeDraft.dept = document.getElementById("cfgMoldeDept")?.value || "";
      cfgMoldeDraft.sub = !!document.getElementById("cfgMoldeSub")?.checked;
    }

    function renderCfgMoldeEtapasBox() {
      const etapas = cfgMoldeDraft?.etapas || [];
      if (!etapas.length) return `<div class="cfg-molde-empty">Nenhuma etapa adicionada.</div>`;
      return etapas.map((e, i) => `
        <div class="cfg-molde-chip">
          <span><strong>${i + 1}.</strong> ${e.titulo}</span>
          <button type="button" data-cfg-molde-del-etapa="${i}">Remover</button>
        </div>`).join("");
    }

    function renderCfgMoldeObrBox() {
      const items = cfgMoldeDraft?.obrigacoes || [];
      if (!items.length) return `<div class="cfg-molde-empty">Nenhuma obrigação vinculada.</div>`;
      return items.map((o, i) => `
        <div class="cfg-molde-chip">
          <span>${o.tipo === "grupo" ? "Grupo" : "Obrigação"} · ${o.titulo}</span>
          <button type="button" data-cfg-molde-del-obr="${i}">Remover</button>
        </div>`).join("");
    }

    function bindCfgMoldeModalEvents() {
      document.getElementById("cfgMoldeAddEtapa")?.addEventListener("click", () => {
        captureCfgMoldeDraftFields();
        const n = (cfgMoldeDraft.etapas.length || 0) + 1;
        cfgMoldeDraft.etapas.push({ titulo: `Etapa ${n}` });
        openCfgNovoMoldeModal(true);
      });
      document.getElementById("cfgMoldeAddObr")?.addEventListener("click", () => {
        captureCfgMoldeDraftFields();
        const opts = ensureCfgStore().obrigacoes;
        const o = opts[(cfgMoldeDraft.obrigacoes.length) % opts.length];
        cfgMoldeDraft.obrigacoes.push({ tipo: "obrigacao", titulo: o.titulo, id: o.id });
        openCfgNovoMoldeModal(true);
      });
      document.getElementById("cfgMoldeAddGrupo")?.addEventListener("click", () => {
        captureCfgMoldeDraftFields();
        cfgMoldeDraft.obrigacoes.push({ tipo: "grupo", titulo: "Grupo padrão de obrigações", id: "g1" });
        openCfgNovoMoldeModal(true);
      });
      modalBody.querySelectorAll("[data-cfg-molde-del-etapa]").forEach((btn) => {
        btn.addEventListener("click", () => {
          captureCfgMoldeDraftFields();
          cfgMoldeDraft.etapas.splice(Number(btn.dataset.cfgMoldeDelEtapa), 1);
          openCfgNovoMoldeModal(true);
        });
      });
      modalBody.querySelectorAll("[data-cfg-molde-del-obr]").forEach((btn) => {
        btn.addEventListener("click", () => {
          captureCfgMoldeDraftFields();
          cfgMoldeDraft.obrigacoes.splice(Number(btn.dataset.cfgMoldeDelObr), 1);
          openCfgNovoMoldeModal(true);
        });
      });
      document.getElementById("cfgMoldeSave")?.addEventListener("click", () => {
        captureCfgMoldeDraftFields();
        const nome = (cfgMoldeDraft.nome || "").trim();
        const desc = (cfgMoldeDraft.desc || "").trim();
        if (!nome) {
          toast("Informe o nome do processo");
          return;
        }
        if (!desc) {
          toast("Informe a descrição do processo");
          return;
        }
        const store = ensureCfgStore();
        store.moldes.push({
          id: "m" + Date.now().toString(36),
          titulo: nome,
          desc,
          departamento: cfgMoldeDraft.dept || "",
          subProcesso: !!cfgMoldeDraft.sub,
          etapas: [...cfgMoldeDraft.etapas],
          obrigacoes: [...cfgMoldeDraft.obrigacoes],
        });
        cfgMoldeDraft = null;
        closeModal();
        toast("Processo molde criado");
        renderConfigura();
      });
    }

    function openCfgNovoMoldeModal(keepDraft) {
      if (!keepDraft || !cfgMoldeDraft) {
        cfgMoldeDraft = { nome: "", desc: "", dept: "", sub: false, etapas: [], obrigacoes: [] };
      }
      const depts = ensureCfgStore().departamentos;
      const etapasCount = cfgMoldeDraft.etapas.length;
      openModal({
        title: "Novo Processo Molde",
        sub: "Defina o template, etapas e obrigações vinculadas",
        molde: true,
        body: `
          <div class="cfg-molde-form">
            <div class="field">
              <label for="cfgMoldeNome">Nome do Processo *</label>
              <input id="cfgMoldeNome" type="text" placeholder="Digite o nome do processo..." value="${(cfgMoldeDraft.nome || "").replace(/"/g, "&quot;")}" />
            </div>
            <div class="field">
              <label for="cfgMoldeDesc">Descrição *</label>
              <textarea id="cfgMoldeDesc" placeholder="Descreva o processo...">${(cfgMoldeDraft.desc || "").replace(/</g, "&lt;")}</textarea>
            </div>
            <div class="field">
              <label for="cfgMoldeDept">Departamento</label>
              <select id="cfgMoldeDept">
                <option value="">Selecionar departamento...</option>
                ${depts.map((d) => `<option value="${d.nome}" ${cfgMoldeDraft.dept === d.nome ? "selected" : ""}>${d.nome}</option>`).join("")}
              </select>
            </div>
            <label class="cfg-molde-check">
              <input type="checkbox" id="cfgMoldeSub" ${cfgMoldeDraft.sub ? "checked" : ""} />
              <span>É um subProcesso?<small>Não pode ser alterado depois</small></span>
            </label>
            <div>
              <div class="cfg-molde-section-head">
                <h4>Etapas do Processo <em>(${etapasCount} cadastrada${etapasCount === 1 ? "" : "s"})</em></h4>
              </div>
              <div class="cfg-molde-box" id="cfgMoldeEtapasBox">${renderCfgMoldeEtapasBox()}</div>
              <button type="button" class="cfg-molde-add" id="cfgMoldeAddEtapa">+ Adicionar Nova Etapa</button>
            </div>
            <div>
              <div class="cfg-molde-section-head">
                <h4>Obrigações vinculadas</h4>
                <div class="cfg-molde-section-actions">
                  <button type="button" id="cfgMoldeAddObr">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
                    Obrigação
                  </button>
                  <button type="button" id="cfgMoldeAddGrupo">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h6l2 2h10v10H3z"/></svg>
                    Grupo
                  </button>
                </div>
              </div>
              <div class="cfg-molde-box" id="cfgMoldeObrBox">${renderCfgMoldeObrBox()}</div>
            </div>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="cfgMoldeSave">Salvar</button>`,
      });
      bindCfgMoldeModalEvents();
      if (!keepDraft) document.getElementById("cfgMoldeNome")?.focus();
    }

    function findCfgMolde(id) {
      return ensureCfgStore().moldes.find((m) => m.id === id);
    }

    function ensureCfgMoldeEtapas(m) {
      if (!m) return [];
      if (!Array.isArray(m.etapas) || !m.etapas.length) {
        m.etapas = (m._draftEtapas || []).map((e, i) => ({
          titulo: e.titulo || `Etapa ${i + 1}`,
          desc: "Etapa configurada no molde",
          status: i % 2 ? "Pendente" : "Em Espera",
          obrigatoria: i < 2,
          documento: i % 2 === 0,
        }));
      }
      // Normaliza etapas criadas no form de novo molde (só {titulo})
      m.etapas = m.etapas.map((e, i) => ({
        titulo: e.titulo || `Etapa ${i + 1}`,
        desc: e.desc || "Etapa configurada no molde",
        status: e.status || (i % 2 ? "Pendente" : "Em Espera"),
        obrigatoria: !!e.obrigatoria,
        documento: !!e.documento,
      }));
      return m.etapas;
    }

    function openCfgMoldeDetalheModal(id) {
      const m = findCfgMolde(id);
      if (!m) return;
      const etapas = ensureCfgMoldeEtapas(m);
      const obrigatorias = etapas.filter((e) => e.obrigatoria).length;
      const comDoc = etapas.filter((e) => e.documento).length;
      const statusCls = (s) => {
        if (s === "Pendente") return "pendente";
        if (s === "Concluída" || s === "Ok") return "ok";
        return "espera";
      };

      openModal({
        title: "Processo molde",
        sub: m.desc || "",
        moldeDetail: true,
        body: `
          <div class="cfg-molde-detail">
            <div class="cfg-molde-detail-top">
              <div>
                <div class="proc-label">Processo:</div>
                <h3>
                  ${m.titulo}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </h3>
                <p class="sub">${m.titulo}</p>
              </div>
              <div class="cfg-molde-detail-actions">
                <button type="button" data-cfg-molde-act="tags" data-id="${m.id}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41 11.17 4H4v7.17l9.41 9.42a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.83z"/><circle cx="7.5" cy="7.5" r="1.1"/></svg>
                  Tags
                </button>
                <button type="button" data-cfg-molde-act="dept" data-id="${m.id}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>
                  Departamento
                </button>
                <button type="button" data-cfg-molde-act="rec" data-id="${m.id}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-14.3-7.2L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 14.3 7.2L21 16"/><path d="M16 21h5v-5"/></svg>
                  Recorrências
                </button>
                <button type="button" data-cfg-molde-act="inst" data-id="${m.id}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
                  Instâncias
                </button>
              </div>
            </div>
            <div class="cfg-molde-stats">
              <span>Etapas: Total: <b>${etapas.length}</b></span>
              <span>Obrigatórias: <b class="obrig">${obrigatorias}</b></span>
              <span>Com Documento: <b class="docs">${comDoc}</b></span>
            </div>
            <div class="cfg-molde-etapas">
              ${etapas.length ? etapas.map((e, i) => `
                <article class="cfg-molde-etapa">
                  <div class="row">
                    <span class="status ${statusCls(e.status)}">${e.status}</span>
                    <span class="titulo">${i + 1}. ${e.titulo}</span>
                    ${e.obrigatoria ? `<span class="obrigatoria">Obrigatória</span>` : ""}
                  </div>
                  <div class="desc">${e.desc}</div>
                </article>`).join("") : `<div class="cfg-empty">Nenhuma etapa cadastrada neste molde</div>`}
            </div>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Fechar</button>
          <button type="button" class="btn-ghost danger" id="cfgMoldeDetailDel" style="color:#b42318;border-color:rgba(180,35,24,.35)">Excluir</button>`,
      });

      modalBody.querySelectorAll("[data-cfg-molde-act]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const act = btn.dataset.cfgMoldeAct;
          const mid = btn.dataset.id;
          closeModal();
          if (act === "tags") openCfgMoldeTagsModal(mid);
          else if (act === "dept") openCfgMoldeDeptModal(mid);
          else if (act === "rec") openCfgMoldeRecModal(mid);
          else if (act === "inst") openCfgMoldeInstModal(mid);
        });
      });
      document.getElementById("cfgMoldeDetailDel")?.addEventListener("click", () => {
        openCfgConfirmModal({
          title: "Excluir processo molde",
          message: `Confirma a exclusão de <strong>${m.titulo}</strong>?`,
          confirmLabel: "Excluir",
          danger: true,
          onConfirm: () => {
            const store = ensureCfgStore();
            const idx = store.moldes.findIndex((x) => x.id === m.id);
            if (idx >= 0) store.moldes.splice(idx, 1);
            toast("Molde excluído");
            renderConfigura();
          },
        });
      });
    }

    function openCfgMoldeTagsModal(id) {
      const m = findCfgMolde(id);
      if (!m) return;
      if (!m.tags) m.tags = [];
      openModal({
        title: `Tags — ${m.titulo}`,
        sub: "Organize o molde com etiquetas",
        body: `
          <label>Nova tag</label>
          <input id="cfgTagInput" type="text" placeholder="Ex: ICMS, Lucro Real" />
          <div class="cfg-molde-box" style="margin-top:8px">${m.tags.length ? m.tags.map((t, i) => `
            <div class="cfg-molde-chip"><span>${t}</span><button type="button" data-del-tag="${i}">Remover</button></div>
          `).join("") : `<div class="cfg-molde-empty">Nenhuma tag cadastrada.</div>`}</div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Fechar</button>
          <button type="button" class="btn-primary" id="cfgTagAdd">Adicionar tag</button>`,
      });
      const refresh = () => openCfgMoldeTagsModal(id);
      document.getElementById("cfgTagAdd")?.addEventListener("click", () => {
        const v = document.getElementById("cfgTagInput")?.value?.trim();
        if (!v) { toast("Informe a tag"); return; }
        m.tags.push(v);
        toast("Tag adicionada");
        refresh();
      });
      modalBody.querySelectorAll("[data-del-tag]").forEach((btn) => {
        btn.addEventListener("click", () => {
          m.tags.splice(Number(btn.dataset.delTag), 1);
          refresh();
        });
      });
    }

    function openCfgMoldeDeptModal(id) {
      const m = findCfgMolde(id);
      if (!m) return;
      const depts = ensureCfgStore().departamentos;
      openModal({
        title: `Departamento — ${m.titulo}`,
        sub: "Defina o departamento responsável pelo molde",
        body: `
          <label>Departamento</label>
          <select id="cfgMoldeDeptEdit">
            <option value="">Selecionar...</option>
            ${depts.map((d) => `<option value="${d.nome}" ${m.departamento === d.nome ? "selected" : ""}>${d.nome}</option>`).join("")}
          </select>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="cfgMoldeDeptSave">Salvar</button>`,
      });
      document.getElementById("cfgMoldeDeptSave")?.addEventListener("click", () => {
        m.departamento = document.getElementById("cfgMoldeDeptEdit")?.value || "";
        closeModal();
        toast("Departamento atualizado");
        renderConfigura();
      });
    }

    function openCfgMoldeRecModal(id) {
      const m = findCfgMolde(id);
      if (!m) return;
      openModal({
        title: `Recorrências — ${m.titulo}`,
        sub: "Configuração de repetição do processo molde",
        body: `
          <label>Frequência</label>
          <select id="cfgMoldeRecFreq">
            ${["Mensal", "Trimestral", "Semestral", "Anual", "Sob demanda"].map((f) => `
              <option ${m.recorrencia === f ? "selected" : ""}>${f}</option>`).join("")}
          </select>
          <label>Dia de referência</label>
          <input id="cfgMoldeRecDia" type="number" min="1" max="31" value="${m.recDia || 10}" />`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="cfgMoldeRecSave">Salvar</button>`,
      });
      document.getElementById("cfgMoldeRecSave")?.addEventListener("click", () => {
        m.recorrencia = document.getElementById("cfgMoldeRecFreq")?.value || "Mensal";
        m.recDia = Number(document.getElementById("cfgMoldeRecDia")?.value) || 10;
        closeModal();
        toast("Recorrência salva");
      });
    }

    function openCfgMoldeInstModal(id) {
      const m = findCfgMolde(id);
      if (!m) return;
      const inst = m.instancias || [
        { cliente: "Farmelhor Taquaralto", status: "Ativa" },
        { cliente: "Alpha Contábil ME", status: "Pausada" },
      ];
      openModal({
        title: `Instâncias — ${m.titulo}`,
        sub: "Processos implantados a partir deste molde",
        body: inst.map((i) => `
          <div class="cfg-molde-chip">
            <span>${i.cliente}</span>
            <span class="proc-badge ${i.status === "Ativa" ? "sucesso" : "arquivado"}">${i.status}</span>
          </div>`).join("") || `<div class="cfg-molde-empty">Nenhuma instância</div>`,
        foot: `<button type="button" class="btn-primary" data-close>Fechar</button>`,
      });
    }

    function openCfgEditEntityModal(tipo, id) {
      const store = ensureCfgStore();
      const list = tipo === "departamento" ? store.departamentos : store.cargos;
      const item = list.find((x) => x.id === id);
      if (!item) return;
      openModal({
        title: tipo === "departamento" ? "Editar departamento" : "Editar cargo",
        sub: item.nome,
        body: `
          <label>Nome *</label>
          <input id="cfgEditNome" value="${item.nome.replace(/"/g, "&quot;")}" />
          <label>Descrição</label>
          <textarea id="cfgEditDesc">${(item.desc || "").replace(/</g, "&lt;")}</textarea>
          <label>Status</label>
          <select id="cfgEditStatus">
            <option value="Ativo" ${item.status === "Ativo" ? "selected" : ""}>Ativo</option>
            <option value="Inativo" ${item.status === "Inativo" ? "selected" : ""}>Inativo</option>
          </select>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="cfgEditSave">Salvar</button>`,
      });
      document.getElementById("cfgEditSave")?.addEventListener("click", () => {
        const nome = document.getElementById("cfgEditNome")?.value?.trim();
        if (!nome) { toast("Informe o nome"); return; }
        item.nome = nome;
        item.desc = document.getElementById("cfgEditDesc")?.value?.trim() || item.desc;
        item.status = document.getElementById("cfgEditStatus")?.value || item.status;
        closeModal();
        toast(tipo === "departamento" ? "Departamento atualizado" : "Cargo atualizado");
        renderConfigura();
      });
    }

    function openCfgFuncMenuModal(id) {
      const f = ensureCfgStore().funcionarios.find((x) => x.id === id);
      if (!f) return;
      openModal({
        title: f.nome,
        sub: `${f.cargo} · ${f.dept}`,
        body: `
          <p style="margin:0 0 12px;font-size:.84rem;color:var(--muted)">${f.email}</p>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button type="button" class="btn-ghost" id="cfgFuncEdit" style="justify-content:flex-start">Editar cadastro</button>
            <button type="button" class="btn-ghost" id="cfgFuncReset" style="justify-content:flex-start">Redefinir senha</button>
            <button type="button" class="btn-ghost" id="cfgFuncOff" style="justify-content:flex-start;color:#b42318;border-color:rgba(180,35,24,.35)">Desativar usuário</button>
          </div>`,
        foot: `<button type="button" class="btn-ghost" data-close>Fechar</button>`,
      });
      document.getElementById("cfgFuncEdit")?.addEventListener("click", () => {
        closeModal();
        openModal({
          title: "Editar funcionário",
          sub: f.nome,
          body: `
            <label>Nome</label><input id="cfgFnNome" value="${f.nome.replace(/"/g, "&quot;")}" />
            <label>E-mail</label><input id="cfgFnEmail" value="${f.email.replace(/"/g, "&quot;")}" />
            <label>Cargo</label>
            <select id="cfgFnCargo">${ensureCfgStore().cargos.map((c) => `<option ${c.nome === f.cargo ? "selected" : ""}>${c.nome}</option>`).join("")}</select>
            <label>Departamento</label>
            <select id="cfgFnDept">${ensureCfgStore().departamentos.map((d) => `<option ${d.nome === f.dept ? "selected" : ""}>${d.nome}</option>`).join("")}</select>`,
          foot: `
            <button type="button" class="btn-ghost" data-close>Cancelar</button>
            <button type="button" class="btn-primary" id="cfgFnSave">Salvar</button>`,
        });
        document.getElementById("cfgFnSave")?.addEventListener("click", () => {
          f.nome = document.getElementById("cfgFnNome")?.value?.trim() || f.nome;
          f.email = document.getElementById("cfgFnEmail")?.value?.trim() || f.email;
          f.cargo = document.getElementById("cfgFnCargo")?.value || f.cargo;
          f.dept = document.getElementById("cfgFnDept")?.value || f.dept;
          closeModal();
          toast("Funcionário atualizado");
          renderConfigura();
        });
      });
      document.getElementById("cfgFuncReset")?.addEventListener("click", () => {
        closeModal();
        toast(`Link de redefinição enviado para ${f.email}`);
      });
      document.getElementById("cfgFuncOff")?.addEventListener("click", () => {
        closeModal();
        toast(`${f.nome} desativado (simulação)`);
      });
    }

    function openCfgObrigacaoModal(editItem) {
      const creating = arguments.length === 0;
      if (!creating && !editItem) {
        toast("Obrigação não encontrada");
        return;
      }
      const o = creating ? null : editItem;
      const store = ensureCfgStore();
      const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
      const regrasOpts = [
        "Regime normal nacional",
        "Simples nacional",
        "Simples CIEE",
        "Todas as empresas",
        "Simples bananal",
        "Lucro presumido",
        "Lucro real",
        "MEI",
        "Folha",
      ];
      const selectedRegras = new Set(o?.regras || (o ? [] : []));
      // Em edição, inclui regras customizadas da obrigação que não estão no catálogo
      (o?.regras || []).forEach((r) => {
        if (!regrasOpts.includes(r)) regrasOpts.push(r);
      });
      const esc = (v) => String(v || "").replace(/"/g, "&quot;");
      const tipoDocs = ["OBRIGAÇÕES ACESSÓRIAS", ...store.tiposDoc.map(getCfgTipoDocName), "Guia", "Declaração"]
        .filter((v, i, a) => a.indexOf(v) === i);

      openModal({
        title: o ? "Editar obrigação" : "Cadastro de nova obrigação",
        sub: o
          ? "Edite a obrigação preenchendo os campos abaixo."
          : "Inicie o cadastro de uma nova obrigação preenchendo os campos abaixo.",
        obr: true,
        body: `
          <div class="cfg-obr-form">
            <div class="cfg-obr-col">
              <div class="cfg-obr-field">
                <label for="cfgObrTitulo">Nome *</label>
                <input id="cfgObrTitulo" maxlength="100" placeholder="Digite o nome da obrigação" value="${esc(o?.titulo)}" />
                <span class="counter" id="cfgObrNomeCount">${(o?.titulo || "").length}/100</span>
              </div>
              <div class="cfg-obr-field">
                <label for="cfgObrDept">Departamento *</label>
                <select id="cfgObrDept">
                  <option value="">Selecione um departamento</option>
                  ${store.departamentos.map((d) => `<option value="${d.nome}" ${o?.departamento === d.nome ? "selected" : ""}>${d.nome}</option>`).join("")}
                </select>
              </div>
              <div class="cfg-obr-row">
                <label class="cfg-obr-check">
                  <input type="checkbox" id="cfgObrGeraDoc" ${(o ? o.geraDocumento !== false : true) ? "checked" : ""} />
                  Gera documento
                </label>
              </div>
              <div class="cfg-obr-field">
                <label for="cfgObrTipoDoc">Tipo de Documento *</label>
                <select id="cfgObrTipoDoc">
                  <option value="">Selecione um tipo de documento</option>
                  ${tipoDocs.map((t) => `<option ${o?.tipoDocumento === t ? "selected" : ""}>${t}</option>`).join("")}
                </select>
              </div>
              <div class="cfg-obr-field">
                <label for="cfgObrComp">Competências referentes a</label>
                <select id="cfgObrComp">
                  ${["Mês anterior", "Mês atual", "Competência definida"].map((c) => `<option ${(o?.competencia || "Mês anterior") === c ? "selected" : ""}>${c}</option>`).join("")}
                </select>
              </div>
              <div class="cfg-obr-field">
                <label for="cfgObrReenvio">Procedimento ao reenviar?</label>
                <select id="cfgObrReenvio">
                  ${["Ignorar", "Reprocessa e mantém arquivos anteriores"].map((r) => `<option ${(o?.reenvio || "Ignorar") === r ? "selected" : ""}>${r}</option>`).join("")}
                </select>
              </div>
              <div class="cfg-obr-field">
                <label for="cfgObrTempo">Tempo Previsto (minutos)</label>
                <input id="cfgObrTempo" type="number" min="0" placeholder="Ex: 30" value="${esc(o?.tempoPrevisto || "")}" />
              </div>
              <div class="cfg-obr-row">
                <label class="cfg-obr-check"><input type="checkbox" id="cfgObrMulta" ${o?.geraMulta ? "checked" : ""} /> Gera Multa</label>
              </div>
            </div>
            <div class="cfg-obr-col">
              <div class="cfg-obr-field">
                <label for="cfgObrFreq">Frequência *</label>
                <select id="cfgObrFreq">
                  ${["Mensalmente", "Trimestralmente", "Anualmente", "Sob demanda"].map((f) => `<option ${(o?.frequencia || "Mensalmente") === f ? "selected" : ""}>${f}</option>`).join("")}
                </select>
              </div>
              <div class="cfg-obr-row">
                <label class="cfg-obr-check"><input type="checkbox" id="cfgObrDiaUtil" ${o?.diaUtil ? "checked" : ""} /> Dia útil</label>
                <label class="cfg-obr-check"><input type="checkbox" id="cfgObrDataDin" ${o?.dataDinamica ? "checked" : ""} /> Data dinâmica</label>
              </div>
              <div class="cfg-obr-field">
                <label for="cfgObrDia">Dia (1-31) *</label>
                <input id="cfgObrDia" type="number" min="1" max="31" value="${o?.dia || 1}" />
              </div>
              <div class="cfg-obr-field">
                <label for="cfgObrMes">Mês *</label>
                <select id="cfgObrMes">
                  ${meses.map((m) => `<option ${(o?.mes || "Julho") === m ? "selected" : ""}>${m}</option>`).join("")}
                </select>
              </div>
              <div class="cfg-obr-field">
                <span class="lab">Prazo Legal</span>
                <input id="cfgObrPrazoLegal" placeholder="DD/MM/YYYY" value="${esc(o?.prazoLegal)}" />
              </div>
              <div class="cfg-obr-field">
                <span class="lab">Prazo Técnico</span>
                <input id="cfgObrPrazoTec" placeholder="DD/MM/YYYY" value="${esc(o?.prazoTecnico)}" />
              </div>
              <div class="cfg-obr-field is-block">
                <span class="lab">Regras (opcional)</span>
                <div class="cfg-obr-regras-wrap">
                  <div class="cfg-obr-regras" id="cfgObrRegrasBox">
                    ${regrasOpts.map((r) => `
                      <button type="button" class="cfg-obr-regra${selectedRegras.has(r) ? " on" : ""}" data-cfg-regra="${r}">${r}</button>
                    `).join("")}
                  </div>
                  <button type="button" class="cfg-obr-add-regra" id="cfgObrCriarRegra">+ Criar regra</button>
                  <div class="cfg-obr-checks">
                    <label class="cfg-obr-check"><input type="checkbox" id="cfgObrEmail" ${o?.notificarEmail ? "checked" : ""} /> Notificar por e-mail</label>
                    <label class="cfg-obr-check"><input type="checkbox" id="cfgObrExterna" ${o?.externa ? "checked" : ""} /> Externa</label>
                    <label class="cfg-obr-check wrap"><input type="checkbox" id="cfgObrVisivel" ${o?.visivelCliente ? "checked" : ""} /> Visível para cliente externo</label>
                  </div>
                </div>
              </div>
            </div>
          </div>`,
        foot: `
          ${o ? `<span class="cfg-obr-foot-hint">Revise os dados e finalize a edição.</span>` : `<button type="button" class="btn-ghost" data-close>Cancelar</button>`}
          <button type="button" class="btn-primary ${o ? "cfg-obr-save-wide" : ""}" id="cfgObrSave" style="min-width:140px">${o ? "Salvar" : "Adicionar"}</button>`,
      });

      const nomeInput = document.getElementById("cfgObrTitulo");
      const countEl = document.getElementById("cfgObrNomeCount");
      nomeInput?.addEventListener("input", () => {
        if (countEl) countEl.textContent = `${nomeInput.value.length}/100`;
      });
      nomeInput?.focus();
      if (nomeInput && o) {
        const len = nomeInput.value.length;
        try { nomeInput.setSelectionRange(len, len); } catch (_) { /* ignore */ }
      }

      modalBody.querySelectorAll("[data-cfg-regra]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const key = btn.dataset.cfgRegra;
          if (selectedRegras.has(key)) {
            selectedRegras.delete(key);
            btn.classList.remove("on");
          } else {
            selectedRegras.add(key);
            btn.classList.add("on");
          }
        });
      });

      document.getElementById("cfgObrCriarRegra")?.addEventListener("click", () => {
        const nome = prompt("Nome da nova regra:");
        if (!nome?.trim()) return;
        const key = nome.trim().replace(/_/g, " ").replace(/\s+/g, " ");
        if (![...modalBody.querySelectorAll("[data-cfg-regra]")].some((b) => b.dataset.cfgRegra === key)) {
          const box = document.getElementById("cfgObrRegrasBox");
          const b = document.createElement("button");
          b.type = "button";
          b.className = "cfg-obr-regra on";
          b.dataset.cfgRegra = key;
          b.textContent = key;
          selectedRegras.add(key);
          b.addEventListener("click", () => {
            if (selectedRegras.has(key)) {
              selectedRegras.delete(key);
              b.classList.remove("on");
            } else {
              selectedRegras.add(key);
              b.classList.add("on");
            }
          });
          box?.appendChild(b);
        }
        toast("Regra criada");
      });

      document.getElementById("cfgObrSave")?.addEventListener("click", () => {
        const titulo = document.getElementById("cfgObrTitulo")?.value?.trim();
        const dept = document.getElementById("cfgObrDept")?.value || "";
        if (!titulo) { toast("Informe o nome da obrigação"); return; }
        if (!dept) { toast("Selecione um departamento"); return; }
        const payload = {
          titulo,
          tipo: document.getElementById("cfgObrGeraDoc")?.checked ? "automática" : "manual",
          competencia: document.getElementById("cfgObrComp")?.value || "Mês anterior",
          reenvio: document.getElementById("cfgObrReenvio")?.value || "Ignorar",
          departamento: dept,
          geraDocumento: !!document.getElementById("cfgObrGeraDoc")?.checked,
          tipoDocumento: document.getElementById("cfgObrTipoDoc")?.value || "",
          tempoPrevisto: document.getElementById("cfgObrTempo")?.value || "",
          geraMulta: !!document.getElementById("cfgObrMulta")?.checked,
          notificarEmail: !!document.getElementById("cfgObrEmail")?.checked,
          frequencia: document.getElementById("cfgObrFreq")?.value || "Mensalmente",
          diaUtil: !!document.getElementById("cfgObrDiaUtil")?.checked,
          dataDinamica: !!document.getElementById("cfgObrDataDin")?.checked,
          dia: Number(document.getElementById("cfgObrDia")?.value) || 1,
          mes: document.getElementById("cfgObrMes")?.value || "Julho",
          prazoLegal: document.getElementById("cfgObrPrazoLegal")?.value?.trim() || "",
          prazoTecnico: document.getElementById("cfgObrPrazoTec")?.value?.trim() || "",
          regras: [...selectedRegras],
          externa: !!document.getElementById("cfgObrExterna")?.checked,
          visivelCliente: !!document.getElementById("cfgObrVisivel")?.checked,
        };
        if (o) Object.assign(o, payload);
        else store.obrigacoes.push({ id: "o" + Date.now().toString(36), ...payload });
        closeModal();
        toast(o ? "Obrigação atualizada" : "Obrigação adicionada");
        renderConfigura();
      });
    }

    function openCfgGruposObrModal() {
      const store = ensureCfgStore();
      openModal({
        title: "Grupos de obrigações",
        sub: "Organize obrigações em conjuntos reutilizáveis",
        body: `
          ${store.gruposObr.map((g) => `
            <div class="cfg-molde-chip">
              <span><strong>${g.nome}</strong> · ${g.itens} obrigação(ões)</span>
            </div>`).join("")}
          <label style="margin-top:12px">Novo grupo</label>
          <input id="cfgGrupoNome" placeholder="Nome do grupo" />`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Fechar</button>
          <button type="button" class="btn-primary" id="cfgGrupoAdd">Criar grupo</button>`,
      });
      document.getElementById("cfgGrupoAdd")?.addEventListener("click", () => {
        const nome = document.getElementById("cfgGrupoNome")?.value?.trim();
        if (!nome) { toast("Informe o nome do grupo"); return; }
        store.gruposObr.push({ id: "g" + Date.now().toString(36), nome, itens: 0 });
        closeModal();
        toast("Grupo criado");
        openCfgGruposObrModal();
      });
    }

    function openCfgNovaRegraObrModal() {
      const store = ensureCfgStore();
      openModal({
        title: "Nova regra de obrigação",
        sub: "Defina os critérios de aplicação da regra",
        regras: true,
        body: `
          <div class="cfg-regra-form">
            <label class="full">Nome *
              <input id="cfgNovaRegraNome" maxlength="80" placeholder="Ex: Simples nacional" />
            </label>
            <label>Regime
              <select id="cfgNovaRegraRegime">
                <option>Qualquer</option>
                <option>Simples Nacional</option>
                <option>Lucro Presumido</option>
                <option>Lucro Real</option>
                <option>MEI</option>
              </select>
            </label>
            <label>Estado (UF)
              <input id="cfgNovaRegraUf" maxlength="2" placeholder="Ex: TO (vazio = Todos)" style="text-transform:uppercase" />
            </label>
            <label>Atividade
              <select id="cfgNovaRegraAtiv">
                <option>Qualquer</option>
                <option>Comércio</option>
                <option>Serviços</option>
                <option>Indústria</option>
                <option>Educação</option>
              </select>
            </label>
            <label>Tipo de regra
              <select id="cfgNovaRegraTipo">
                <option>Geral</option>
                <option>Regime</option>
                <option>Atividade</option>
                <option>Estado</option>
              </select>
            </label>
            <label class="full">Tags (separadas por vírgula)
              <input id="cfgNovaRegraTags" placeholder="Ex: SN, CIEE" />
            </label>
            <label class="full">Descrição (opcional)
              <textarea id="cfgNovaRegraDesc" placeholder="Observações sobre a regra"></textarea>
            </label>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" id="cfgNovaRegraBack">Voltar</button>
          <button type="button" class="btn-primary" id="cfgNovaRegraSave">Criar regra</button>`,
      });
      document.getElementById("cfgNovaRegraNome")?.focus();
      document.getElementById("cfgNovaRegraBack")?.addEventListener("click", () => {
        closeModal();
        openCfgRegrasObrModal();
      });
      document.getElementById("cfgNovaRegraSave")?.addEventListener("click", () => {
        const nome = document.getElementById("cfgNovaRegraNome")?.value?.trim().replace(/_/g, " ").replace(/\s+/g, " ");
        if (!nome) { toast("Informe o nome da regra"); return; }
        const uf = (document.getElementById("cfgNovaRegraUf")?.value || "").trim().toUpperCase();
        const tags = (document.getElementById("cfgNovaRegraTags")?.value || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        store.regrasObr.unshift({
          id: "r" + Date.now().toString(36),
          nome,
          regimes: document.getElementById("cfgNovaRegraRegime")?.value || "Qualquer",
          estado: uf || "Todos",
          atividades: document.getElementById("cfgNovaRegraAtiv")?.value || "Qualquer",
          tipo: document.getElementById("cfgNovaRegraTipo")?.value || "Geral",
          obrigacoes: 0,
          tags,
          desc: document.getElementById("cfgNovaRegraDesc")?.value?.trim() || "",
        });
        closeModal();
        toast("Regra criada");
        openCfgRegrasObrModal();
      });
    }

    function openCfgRegrasObrModal(filters) {
      const store = ensureCfgStore();
      const f = filters || { q: "", regime: "", uf: "", atividade: "", tipo: "" };
      let list = [...store.regrasObr];
      if (f.q) {
        const q = normalizeSearchText(f.q);
        list = list.filter((r) => normalizeSearchText(`${r.nome} ${r.regimes} ${r.estado}`).includes(q));
      }
      if (f.regime && f.regime !== "Qualquer") list = list.filter((r) => r.regimes === f.regime || r.regimes === "Qualquer");
      if (f.uf) list = list.filter((r) => r.estado === "Todos" || normalizeSearchText(r.estado).includes(normalizeSearchText(f.uf)));
      if (f.atividade && f.atividade !== "Qualquer") list = list.filter((r) => r.atividades === f.atividade || r.atividades === "Qualquer");
      if (f.tipo && f.tipo !== "Todos") list = list.filter((r) => r.tipo === f.tipo);

      const ico = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h10M4 18h14"/><path d="m15 10 5 5-5 5"/></svg>`;

      openModal({
        title: "Regras de Obrigação",
        sub: "Gerencie e atribua regras às obrigações",
        regras: true,
        body: `
          <div class="cfg-regras-wrap">
            <div class="cfg-regras-filtros">
              <div class="title">Filtros</div>
              <div class="cfg-regras-filtros-grid">
                <label>Pesquisar por nome
                  <input type="search" id="cfgRegraFilterQ" placeholder="Pesquisar por nome" value="${(f.q || "").replace(/"/g, "&quot;")}" />
                </label>
                <label>Regime
                  <select id="cfgRegraFilterRegime">
                    ${["Qualquer", "Simples Nacional", "Lucro Presumido", "Lucro Real", "MEI"].map((r) => `
                      <option ${(!f.regime && r === "Qualquer") || f.regime === r ? "selected" : ""}>${r}</option>`).join("")}
                  </select>
                </label>
                <label>Estado (UF)
                  <input id="cfgRegraFilterUf" maxlength="2" placeholder="UF" value="${(f.uf || "").replace(/"/g, "&quot;")}" style="text-transform:uppercase" />
                </label>
                <label>Atividade
                  <select id="cfgRegraFilterAtiv">
                    ${["Qualquer", "Comércio", "Serviços", "Indústria", "Educação"].map((a) => `
                      <option ${(!f.atividade && a === "Qualquer") || f.atividade === a ? "selected" : ""}>${a}</option>`).join("")}
                  </select>
                </label>
                <label>Tipo de regra
                  <select id="cfgRegraFilterTipo">
                    ${["Todos", "Geral", "Regime", "Atividade", "Estado"].map((t) => `
                      <option ${(!f.tipo && t === "Todos") || f.tipo === t ? "selected" : ""}>${t}</option>`).join("")}
                  </select>
                </label>
                <label>&nbsp;
                  <button type="button" class="btn-ghost" id="cfgRegraFilterTags" style="height:34px;width:100%">Tags</button>
                </label>
              </div>
            </div>
            <div class="cfg-regras-head">
              <strong>Regras existentes</strong>
              <button type="button" id="cfgRegraNova">+ Nova regra</button>
            </div>
            <div class="cfg-regras-list">
              ${list.length ? list.map((r) => `
                <article class="cfg-regra-card" data-regra-id="${r.id}">
                  <div class="ico">${ico}</div>
                  <div class="info">
                    <strong>${r.nome}</strong>
                    <div class="meta">Regimes: ${r.regimes || "Qualquer"} · Estado: ${r.estado || "Todos"} · Atividades: ${r.atividades || "Qualquer"} · Tipo: ${r.tipo || "Geral"}</div>
                    <button type="button" class="link" data-cfg-regra-obrs="${r.id}">${r.obrigacoes || 0} obrigação(ões) associada(s)</button>
                  </div>
                  <div class="actions">
                    <button type="button" class="cfg-icon-btn tip-bottom" data-tip="Ações" data-cfg-regra-menu="${r.id}" aria-label="Menu">${cfgIconMore()}</button>
                    <button type="button" class="btn-atribuir" data-cfg-regra-atribuir="${r.id}">Atribuir</button>
                  </div>
                </article>`).join("") : `<div class="cfg-empty">Nenhuma regra encontrada</div>`}
            </div>
          </div>`,
        foot: `<button type="button" class="btn-ghost" data-close>Fechar</button>`,
      });

      const collectFilters = () => ({
        q: document.getElementById("cfgRegraFilterQ")?.value || "",
        regime: document.getElementById("cfgRegraFilterRegime")?.value || "",
        uf: document.getElementById("cfgRegraFilterUf")?.value || "",
        atividade: document.getElementById("cfgRegraFilterAtiv")?.value || "",
        tipo: document.getElementById("cfgRegraFilterTipo")?.value || "",
      });

      const refresh = () => {
        const next = collectFilters();
        closeModal();
        openCfgRegrasObrModal(next);
      };

      ["cfgRegraFilterQ", "cfgRegraFilterUf"].forEach((id) => {
        document.getElementById(id)?.addEventListener("keydown", (e) => {
          if (e.key === "Enter") refresh();
        });
      });
      ["cfgRegraFilterRegime", "cfgRegraFilterAtiv", "cfgRegraFilterTipo"].forEach((id) => {
        document.getElementById(id)?.addEventListener("change", refresh);
      });
      document.getElementById("cfgRegraFilterTags")?.addEventListener("click", () => {
        toast("Filtro por tags em prototipação");
      });
      document.getElementById("cfgRegraNova")?.addEventListener("click", () => {
        closeModal();
        openCfgNovaRegraObrModal();
      });
      modalBody.querySelectorAll("[data-cfg-regra-atribuir]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const r = store.regrasObr.find((x) => x.id === btn.dataset.cfgRegraAtribuir);
          toast(`Regra "${r?.nome || ""}" atribuída à obrigação atual`);
        });
      });
      modalBody.querySelectorAll("[data-cfg-regra-obrs]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const r = store.regrasObr.find((x) => x.id === btn.dataset.cfgRegraObrs);
          toast(`${r?.obrigacoes || 0} obrigação(ões) associada(s) a ${r?.nome || ""}`);
        });
      });
      modalBody.querySelectorAll("[data-cfg-regra-menu]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const r = store.regrasObr.find((x) => x.id === btn.dataset.cfgRegraMenu);
          openModal({
            title: r?.nome || "Regra",
            sub: "Ações da regra",
            body: `
              <div style="display:flex;flex-direction:column;gap:8px">
                <button type="button" class="btn-ghost" id="cfgRegraEditar" style="justify-content:flex-start">Editar</button>
                <button type="button" class="btn-ghost" id="cfgRegraExcluir" style="justify-content:flex-start;color:#b42318;border-color:rgba(180,35,24,.35)">Excluir</button>
              </div>`,
            foot: `<button type="button" class="btn-ghost" data-close>Fechar</button>`,
          });
          document.getElementById("cfgRegraEditar")?.addEventListener("click", () => {
            closeModal();
            toast("Edição de regra em prototipação");
            openCfgRegrasObrModal(f);
          });
          document.getElementById("cfgRegraExcluir")?.addEventListener("click", () => {
            const idx = store.regrasObr.findIndex((x) => x.id === r?.id);
            if (idx >= 0) store.regrasObr.splice(idx, 1);
            closeModal();
            toast("Regra excluída");
            openCfgRegrasObrModal(f);
          });
        });
      });
    }

    function openCfgObrFiltrosModal() {
      const f = cfgState.obrFiltros;
      openModal({
        title: "Filtros avançados",
        sub: "Refine a lista de obrigações",
        body: `
          <label>Tipo</label>
          <select id="cfgObrFTipo">
            <option value="">Todos</option>
            <option value="manual" ${f.tipo === "manual" ? "selected" : ""}>manual</option>
            <option value="automática" ${f.tipo === "automática" ? "selected" : ""}>automática</option>
          </select>
          <label>Competência</label>
          <select id="cfgObrFComp">
            <option value="">Todas</option>
            ${["Mês anterior", "Mês atual", "Competência definida"].map((c) => `<option ${f.competencia === c ? "selected" : ""}>${c}</option>`).join("")}
          </select>
          <label>Reenvio</label>
          <select id="cfgObrFReenvio">
            <option value="">Todos</option>
            ${["Ignorar", "Reprocessa e mantém arquivos anteriores"].map((r) => `<option ${f.reenvio === r ? "selected" : ""}>${r}</option>`).join("")}
          </select>`,
        foot: `
          <button type="button" class="btn-ghost" id="cfgObrFClear">Limpar</button>
          <button type="button" class="btn-primary" id="cfgObrFApply">Aplicar</button>`,
      });
      document.getElementById("cfgObrFClear")?.addEventListener("click", () => {
        cfgState.obrFiltros = { tipo: "", competencia: "", reenvio: "" };
        closeModal();
        renderConfigura();
        toast("Filtros limpos");
      });
      document.getElementById("cfgObrFApply")?.addEventListener("click", () => {
        cfgState.obrFiltros = {
          tipo: document.getElementById("cfgObrFTipo")?.value || "",
          competencia: document.getElementById("cfgObrFComp")?.value || "",
          reenvio: document.getElementById("cfgObrFReenvio")?.value || "",
        };
        closeModal();
        renderConfigura();
        toast("Filtros aplicados");
      });
    }

    function openCfgNovoAvisoModal() {
      const destinatarios = ["ADMIN", "USER", "EXTERNAL", "SISTEMA"];
      const selectedDest = new Set();
      let capaNome = "";

      const calIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`;
      const imgIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`;

      openModal({
        title: "Novo aviso",
        sub: "Crie um comunicado para a equipe ou clientes",
        aviso: true,
        body: `
          <div class="cfg-aviso-form">
            <section class="cfg-aviso-block">
              <h4>Conteúdo principal</h4>
              <label class="cfg-aviso-field">
                <span>Título <span class="req">*</span></span>
                <input type="text" id="cfgAvisoTitulo" maxlength="120" placeholder="Ex: Manutenção programada" />
              </label>
              <label class="cfg-aviso-field">
                <span>Descrição <span class="req">*</span></span>
                <textarea id="cfgAvisoMsg" placeholder="Escreva o conteúdo do aviso..."></textarea>
              </label>
            </section>

            <section class="cfg-aviso-block">
              <h4>Controles de tempo</h4>
              <div class="cfg-aviso-field">
                <span>Agendar (opcional)</span>
                <div class="cfg-aviso-dt">
                  <div class="cfg-aviso-dt-box">
                    <span class="ico">${calIcon}</span>
                    <input type="datetime-local" id="cfgAvisoAgendar" aria-label="Agendar publicação" />
                  </div>
                  <button type="button" class="cfg-aviso-dt-clear" id="cfgAvisoAgendarClear" aria-label="Limpar agendamento" disabled>×</button>
                </div>
              </div>
              <div class="cfg-aviso-field">
                <span>Expirar em (opcional)</span>
                <div class="cfg-aviso-dt">
                  <div class="cfg-aviso-dt-box">
                    <span class="ico">${calIcon}</span>
                    <input type="date" id="cfgAvisoExpirar" aria-label="Data de expiração" />
                  </div>
                  <button type="button" class="cfg-aviso-dt-clear" id="cfgAvisoExpirarClear" aria-label="Limpar expiração" disabled>×</button>
                </div>
              </div>
            </section>

            <section class="cfg-aviso-block">
              <h4>Configurações de engajamento</h4>
              <div class="cfg-aviso-checks">
                <label class="cfg-aviso-check">
                  <input type="checkbox" id="cfgAvisoCurtidas" checked />
                  Permitir curtidas e descurtidas
                </label>
                <label class="cfg-aviso-check">
                  <input type="checkbox" id="cfgAvisoComents" checked />
                  Permitir comentários
                </label>
              </div>
            </section>

            <section class="cfg-aviso-block">
              <h4>Segmentação de público</h4>
              <p class="hint">Destinatários (deixe vazio para todos)</p>
              <div class="cfg-aviso-dest" id="cfgAvisoDest">
                ${destinatarios.map((d) => `
                  <button type="button" class="cfg-aviso-chip" data-cfg-aviso-dest="${d}">${d}</button>
                `).join("")}
              </div>
            </section>

            <section class="cfg-aviso-block">
              <h4>Mídia</h4>
              <div class="cfg-aviso-capa">
                <button type="button" class="cfg-aviso-capa-btn" id="cfgAvisoCapaBtn">
                  ${imgIcon}
                  Selecionar capa
                </button>
                <input type="file" id="cfgAvisoCapa" accept="image/*" hidden />
                <span class="cfg-aviso-capa-name" id="cfgAvisoCapaName">Nenhuma imagem selecionada</span>
              </div>
            </section>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="cfgAvisoSave" style="min-width:140px">Publicar</button>`,
      });

      const syncClear = (inputId, clearId) => {
        const input = document.getElementById(inputId);
        const clear = document.getElementById(clearId);
        if (!input || !clear) return;
        const refresh = () => { clear.disabled = !input.value; };
        input.addEventListener("input", refresh);
        input.addEventListener("change", refresh);
        clear.addEventListener("click", () => {
          input.value = "";
          refresh();
          input.focus();
        });
        refresh();
      };
      syncClear("cfgAvisoAgendar", "cfgAvisoAgendarClear");
      syncClear("cfgAvisoExpirar", "cfgAvisoExpirarClear");

      modalBody.querySelectorAll("[data-cfg-aviso-dest]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const key = btn.dataset.cfgAvisoDest;
          if (selectedDest.has(key)) {
            selectedDest.delete(key);
            btn.classList.remove("on");
          } else {
            selectedDest.add(key);
            btn.classList.add("on");
          }
        });
      });

      const fileInput = document.getElementById("cfgAvisoCapa");
      const nameEl = document.getElementById("cfgAvisoCapaName");
      document.getElementById("cfgAvisoCapaBtn")?.addEventListener("click", () => fileInput?.click());
      fileInput?.addEventListener("change", () => {
        const file = fileInput.files?.[0];
        capaNome = file?.name || "";
        if (nameEl) {
          nameEl.textContent = capaNome || "Nenhuma imagem selecionada";
          nameEl.classList.toggle("has-file", !!capaNome);
        }
      });

      document.getElementById("cfgAvisoTitulo")?.focus();
      document.getElementById("cfgAvisoSave")?.addEventListener("click", () => {
        const titulo = document.getElementById("cfgAvisoTitulo")?.value?.trim();
        const msg = document.getElementById("cfgAvisoMsg")?.value?.trim();
        if (!titulo || !msg) { toast("Preencha título e descrição"); return; }

        const agendar = document.getElementById("cfgAvisoAgendar")?.value || "";
        const expirar = document.getElementById("cfgAvisoExpirar")?.value || "";
        const dest = [...selectedDest];
        const publico = dest.length ? dest.join(", ") : "Todos";

        let quando = "Agora";
        if (agendar) {
          const d = new Date(agendar);
          if (!Number.isNaN(d.getTime())) {
            quando = d.toLocaleString("pt-BR", {
              day: "2-digit", month: "2-digit", year: "numeric",
              hour: "2-digit", minute: "2-digit",
            });
          }
        }

        ensureCfgStore().avisos.push({
          id: "a" + Date.now().toString(36),
          titulo,
          msg,
          publico,
          destinatarios: dest,
          agendar,
          expirar,
          curtidas: !!document.getElementById("cfgAvisoCurtidas")?.checked,
          comentarios: !!document.getElementById("cfgAvisoComents")?.checked,
          capa: capaNome,
          quando,
        });
        closeModal();
        toast(agendar ? "Aviso agendado" : "Aviso publicado");
        renderConfigura();
      });
    }

    function openCfgEmailTemplateModal() {
      const vars = [
        { label: "Protocolo da entrega(id)", token: "{{protocoloEntrega}}" },
        { label: "Nome da entrega", token: "{{nomeEntrega}}" },
        { label: "Data de vencimento legal", token: "{{dataVencimento}}" },
        { label: "Data Tecnica", token: "{{dataTecnica}}" },
        { label: "Tipo de documento", token: "{{tipoDocumento}}" },
        { label: "Nome da empresa", token: "{{clienteNome}}" },
        { label: "Cnpj da empresa", token: "{{cnpjEmpresa}}" },
        { label: "Endereco", token: "{{endereco}}" },
        { label: "Tempo previsto em minutos", token: "{{tempoPrevisto}}" },
        { label: "anexos", token: "{{anexos}}" },
        { label: "dicas", token: "{{dicas}}" },
        { label: "Analista Responsável", token: "{{analistaResponsavel}}" },
      ];
      let focusedField = "cfgEmailPendente";

      openModal({
        title: "Template de e-mail - Obrigações",
        sub: "Personalize as mensagens de entrega pendente e atrasada",
        emailTpl: true,
        body: `
          <div class="cfg-email-tpl">
            <div class="cfg-email-vars">
              <div class="cfg-email-vars-head">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                Variáveis disponíveis — clique para inserir no campo focado
              </div>
              <div class="cfg-email-vars-list">
                ${vars.map((v) => `
                  <button type="button" class="cfg-email-var" data-cfg-email-var="${v.token.replace(/"/g, "&quot;")}">${v.label}</button>
                `).join("")}
              </div>
            </div>
            <div class="cfg-email-field">
              <label for="cfgEmailPendente">Mensagem para entrega pendente</label>
              <textarea id="cfgEmailPendente" placeholder="Ex: Olá {{clienteNome}}, a entrega {{nomeEntrega}} vence em {{dataVencimento}}.">${(cfgState.emailTplPendente || "").replace(/</g, "&lt;")}</textarea>
            </div>
            <div class="cfg-email-field">
              <label for="cfgEmailAtrasada">Mensagem para entrega atrasada</label>
              <textarea id="cfgEmailAtrasada" placeholder="Ex: Olá {{clienteNome}}, a entrega {{nomeEntrega}} está atrasada desde {{dataVencimento}}.">${(cfgState.emailTplAtrasada || "").replace(/</g, "&lt;")}</textarea>
            </div>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Fechar</button>
          <button type="button" class="btn-ghost" id="cfgEmailTest">Testar envio</button>
          <button type="button" class="btn-primary" id="cfgEmailSave" style="min-width:110px;border-radius:999px">Salvar</button>`,
      });

      const pendente = document.getElementById("cfgEmailPendente");
      const atrasada = document.getElementById("cfgEmailAtrasada");
      pendente?.addEventListener("focus", () => { focusedField = "cfgEmailPendente"; });
      atrasada?.addEventListener("focus", () => { focusedField = "cfgEmailAtrasada"; });
      pendente?.focus();

      const insertAtCursor = (el, text) => {
        if (!el) return;
        const start = el.selectionStart ?? el.value.length;
        const end = el.selectionEnd ?? el.value.length;
        const before = el.value.slice(0, start);
        const after = el.value.slice(end);
        el.value = before + text + after;
        const pos = start + text.length;
        el.focus();
        try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
      };

      modalBody.querySelectorAll("[data-cfg-email-var]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const token = btn.dataset.cfgEmailVar || "";
          const el = document.getElementById(focusedField) || pendente;
          insertAtCursor(el, token);
        });
      });

      document.getElementById("cfgEmailTest")?.addEventListener("click", () => {
        toast("E-mail de teste enviado (simulação)");
      });

      document.getElementById("cfgEmailSave")?.addEventListener("click", () => {
        cfgState.emailTplPendente = pendente?.value || "";
        cfgState.emailTplAtrasada = atrasada?.value || "";
        cfgState.emailTemplate = cfgState.emailTplPendente;
        closeModal();
        toast("Template de e-mail salvo");
      });
    }

    function openCfgSessRankingModal() {
      const ranking = getCfgSessoesMock().ranking;
      openModal({
        title: "Ranking completo",
        sub: "Tempo ativo no período filtrado",
        body: ranking.map((r, i) => `
          <div class="cfg-sess-rank-item">
            <span class="pos">${i + 1}º</span>
            <div>
              <div class="mail">${r.email}</div>
              <div class="bar"><i style="width:${r.pct}%"></i></div>
              <div class="meta">${r.tempo}</div>
            </div>
          </div>`).join(""),
        foot: `<button type="button" class="btn-primary" data-close>Fechar</button>`,
      });
    }

    function openCfgSessRowModal(id) {
      const s = getCfgSessoesMock().sessoes.find((x) => x.id === id);
      if (!s) return;
      openModal({
        title: "Sessão do usuário",
        sub: s.email,
        body: `
          <div class="cfg-molde-chip"><span>Status</span><strong>${s.online ? "Online" : "Inativo"}</strong></div>
          <div class="cfg-molde-chip"><span>Início</span><strong>${s.inicio}</strong></div>
          <div class="cfg-molde-chip"><span>Último seen</span><strong>${s.lastSeen}</strong></div>
          <div class="cfg-molde-chip"><span>Tempo ativo</span><strong>${s.tempo}</strong></div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Fechar</button>
          <button type="button" class="btn-ghost" id="cfgSessKill" style="color:#b42318;border-color:rgba(180,35,24,.35)">Encerrar sessão</button>`,
      });
      document.getElementById("cfgSessKill")?.addEventListener("click", () => {
        closeModal();
        toast("Sessão encerrada (simulação)");
      });
    }

    function openCfgPastaSecaoModal(editItem) {
      const o = editItem || null;
      openModal({
        title: o ? "Editar Seção" : "Nova Pasta",
        sub: o ? "Modifique os dados da seção" : "Cadastre uma nova seção de documentos",
        body: `
          <div class="cfg-secao-banner">
            <div class="ico" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </div>
            <div>
              <strong>${o ? "Editar Seção" : "Nova Seção"}</strong>
              <span>${o ? "Modifique os dados da seção" : "Preencha os dados da nova seção"}</span>
            </div>
          </div>
          <div class="cfg-secao-field">
            <label>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>
              Título da Seção <span class="req">*</span>
            </label>
            <input id="cfgPastaTitulo" maxlength="80" value="${(o?.titulo || "").replace(/"/g, "&quot;")}" placeholder="Ex: FISCAL" />
          </div>
          <div class="cfg-secao-field">
            <label>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></svg>
              Descrição <span class="opt">Opcional</span>
            </label>
            <textarea id="cfgPastaDesc" placeholder="Descreva a seção">${(o?.desc || "").replace(/</g, "&lt;")}</textarea>
          </div>
          <div class="cfg-secao-destaque">
            <div class="left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 2 3.1 6.3L22 9.3l-5 4.9 1.2 7L12 17.8 5.8 21.2 7 14.2 2 9.3l6.9-1L12 2z"/></svg>
              <div>
                <strong>Destaque</strong>
                <span>Marque se esta seção deve ser destacada</span>
              </div>
            </div>
            <label class="cfg-switch" style="margin:0">
              <input type="checkbox" id="cfgPastaDestaque" ${o?.destaque ? "checked" : ""} aria-label="Destaque" />
            </label>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="cfgPastaSave" style="min-width:160px">
            ${o ? "Atualizar Seção" : "Criar Seção"}
          </button>`,
      });
      document.getElementById("cfgPastaTitulo")?.focus();
      document.getElementById("cfgPastaSave")?.addEventListener("click", () => {
        const titulo = document.getElementById("cfgPastaTitulo")?.value?.trim();
        if (!titulo) { toast("Informe o título da seção"); return; }
        const payload = {
          titulo: titulo.toUpperCase(),
          desc: document.getElementById("cfgPastaDesc")?.value?.trim() || "",
          destaque: !!document.getElementById("cfgPastaDestaque")?.checked,
        };
        const store = ensureCfgStore();
        if (o) Object.assign(o, payload);
        else store.pastasDoc.push({ id: "p" + Date.now().toString(36), ...payload });
        closeModal();
        toast(o ? "Seção atualizada" : "Seção criada");
        renderConfigura();
      });
    }

    function openCfgTipoDocModal(editItem) {
      const o = editItem || null;
      const store = ensureCfgStore();
      const secoes = getCfgSecoesDocumento();
      const selected = new Set(o?.secoes || []);
      const esc = (v) => String(v || "").replace(/"/g, "&quot;");

      openModal({
        title: o ? "Editar Tipo de Documento" : "Novo Tipo de Documento",
        sub: o
          ? "Atualize a taxonomia e as permissões deste tipo."
          : "Cadastre um novo tipo e vincule às seções operacionais.",
        tipoDoc: true,
        body: `
          <div class="cfg-tipo-form">
            <section class="cfg-tipo-block">
              <h4>Identificação Básica</h4>
              <div class="cfg-secao-field">
                <label>Nome do Tipo <span class="req">*</span></label>
                <input id="cfgTipoNome" maxlength="80" value="${esc(o?.nome)}" placeholder="Ex: ADMISSÕES" />
              </div>
              <div class="cfg-secao-field">
                <label>Departamento <span class="req">*</span></label>
                <select id="cfgTipoDept">
                  <option value="">Selecione um departamento</option>
                  ${store.departamentos.map((d) => `
                    <option value="${esc(d.nome)}" ${(o?.departamento || "") === d.nome ? "selected" : ""}>${d.nome}</option>
                  `).join("")}
                </select>
              </div>
              <div class="cfg-secao-field">
                <label>Pasta pai <span class="opt">Opcional</span></label>
                <select id="cfgTipoPastaPai">
                  <option value="">Sem pasta pai (raiz do departamento)</option>
                  ${store.pastasDoc.map((p) => `
                    <option value="${esc(p.titulo)}" ${(o?.pastaPai || "") === p.titulo ? "selected" : ""}>${p.titulo}</option>
                  `).join("")}
                </select>
              </div>
            </section>

            <section class="cfg-tipo-block">
              <h4>Permissão de Visualização</h4>
              <label class="cfg-tipo-perm">
                <input type="checkbox" id="cfgTipoVisivel" ${o?.visivelCliente ? "checked" : ""} />
                <div>
                  <strong>Visível para cliente externo</strong>
                  <span>Define se o cliente final terá acesso a esta categoria no portal dele.</span>
                </div>
              </label>
            </section>

            <section class="cfg-tipo-block">
              <h4>Vinculação de Seções</h4>
              <div class="cfg-tipo-secoes" id="cfgTipoSecoes">
                ${secoes.map((s) => `
                  <label class="cfg-tipo-secao">
                    <input type="checkbox" value="${esc(s)}" ${selected.has(s) ? "checked" : ""} />
                    ${s}
                  </label>
                `).join("")}
              </div>
            </section>
          </div>`,
        foot: `<button type="button" class="btn-primary" id="cfgTipoDocSave">Salvar</button>`,
      });

      document.getElementById("cfgTipoNome")?.focus();
      document.getElementById("cfgTipoDocSave")?.addEventListener("click", () => {
        const nome = document.getElementById("cfgTipoNome")?.value?.trim();
        const departamento = document.getElementById("cfgTipoDept")?.value || "";
        if (!nome) { toast("Informe o nome do tipo"); return; }
        if (!departamento) { toast("Selecione o departamento"); return; }

        const secoesSel = [...modalBody.querySelectorAll("#cfgTipoSecoes input:checked")].map((el) => el.value);
        const payload = {
          nome: nome.toUpperCase(),
          departamento,
          pastaPai: document.getElementById("cfgTipoPastaPai")?.value || "",
          visivelCliente: !!document.getElementById("cfgTipoVisivel")?.checked,
          secoes: secoesSel,
        };

        if (o) Object.assign(o, payload);
        else store.tiposDoc.push({ id: "td" + Date.now().toString(36), ...payload });

        closeModal();
        toast(o ? "Tipo de documento atualizado" : "Tipo de documento criado");
        renderConfigura();
      });
    }

    function openCfgClassificadorModal() {
      const empresas = CLIENTES.map((c) => ({
        id: c.id,
        nome: c.fantasia || c.nome,
        cnpj: c.cnpj,
        tags: [c.regime, c.estado].filter(Boolean),
      }));
      let query = "";
      let selectedTags = [];
      const allTags = [...new Set(empresas.flatMap((e) => e.tags))];

      const paint = () => {
        const q = normalizeSearchText(query);
        const filtered = empresas.filter((e) => {
          const okQ = !q || normalizeSearchText(`${e.nome} ${e.cnpj}`).includes(q);
          const okT = !selectedTags.length || selectedTags.every((t) => e.tags.includes(t));
          return okQ && okT;
        });

        openModal({
          title: "Classificador inteligente",
          sub: "",
          classif: true,
          body: `
            <div class="cfg-classif">
              <div class="cfg-classif-head">
                <div>
                  <h3>Classificador inteligente</h3>
                  <p>Operação, métricas e configuração do fluxo documental automático.</p>
                </div>
                <button type="button" class="btn-primary" id="cfgClassifRefresh" style="border-radius:999px">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;vertical-align:-2px"><path d="M21 12a9 9 0 0 0-14.3-7.2L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 14.3 7.2L21 16"/><path d="M16 21h5v-5"/></svg>
                  Atualizar
                </button>
              </div>
              <div class="cfg-classif-search">
                <div class="cfg-classif-search-row">
                  <div class="search">
                    <span class="ico" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </span>
                    <input type="search" id="cfgClassifQ" placeholder="Empresas" value="${(query || "").replace(/"/g, "&quot;")}" />
                    <button type="button" class="clear" id="cfgClassifClearQ" aria-label="Limpar busca">×</button>
                  </div>
                  <button type="button" class="btn-primary" id="cfgClassifBuscar" style="border-radius:999px;height:38px">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;vertical-align:-2px"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    Buscar
                  </button>
                  <button type="button" class="btn-ghost" id="cfgClassifLimpar" style="border-radius:999px;height:38px">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;vertical-align:-2px"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                    Limpar filtros
                  </button>
                </div>
                <div class="cfg-classif-tags">
                  <span class="lab">Filtrar por tags</span>
                  <button type="button" id="cfgClassifTagsBtn" aria-expanded="false">
                    <span id="cfgClassifTagsLabel">${selectedTags.length ? selectedTags.join(", ") : "Nenhuma tag selecionada"}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                  <div id="cfgClassifTagsMenu" hidden style="display:none;flex-wrap:wrap;gap:6px;margin-top:8px">
                    ${allTags.map((t) => `
                      <label class="cfg-obr-check" style="border:1px solid var(--border);border-radius:999px;padding:4px 10px">
                        <input type="checkbox" data-cfg-classif-tag="${t}" ${selectedTags.includes(t) ? "checked" : ""} /> ${t}
                      </label>`).join("")}
                  </div>
                </div>
                <div class="cfg-classif-hint">Busque sem texto para listar todas as empresas ou use tags para filtrar.</div>
              </div>
              <div class="cfg-classif-actions">
                <button type="button" id="cfgClassifGerenciador">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Acesso ao gerenciador
                </button>
                <button type="button" id="cfgClassifHierarquia">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v6M8 21h8M6 9h12v4H6zM10 13v8M14 13v8"/></svg>
                  Hierarquia por data
                </button>
              </div>
              ${filtered.length && (query || selectedTags.length) ? `
                <div class="cfg-classif-results">
                  ${filtered.slice(0, 12).map((e) => `
                    <button type="button" class="cfg-classif-empresa" data-cfg-classif-emp="${e.id}">
                      <span>
                        <strong>${e.nome}</strong>
                        <small>${e.cnpj}</small>
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                    </button>`).join("")}
                </div>` : `
                <div class="cfg-classif-info">
                  <div class="ico" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>
                  </div>
                  <div>
                    <strong>Escolha uma empresa</strong>
                    <span>O resumo, a caixa de entrada e o dashboard são por empresa. Regex e regras de classificação são compartilhados por todas as empresas.</span>
                  </div>
                </div>`}
            </div>`,
          foot: `<button type="button" class="btn-ghost" data-close>Fechar</button>`,
        });

        const apply = () => {
          query = document.getElementById("cfgClassifQ")?.value || "";
          selectedTags = [...modalBody.querySelectorAll("[data-cfg-classif-tag]:checked")].map((el) => el.dataset.cfgClassifTag);
          paint();
        };

        document.getElementById("cfgClassifBuscar")?.addEventListener("click", apply);
        document.getElementById("cfgClassifQ")?.addEventListener("keydown", (e) => {
          if (e.key === "Enter") apply();
        });
        document.getElementById("cfgClassifClearQ")?.addEventListener("click", () => {
          query = "";
          paint();
        });
        document.getElementById("cfgClassifLimpar")?.addEventListener("click", () => {
          query = "";
          selectedTags = [];
          paint();
          toast("Filtros limpos");
        });
        document.getElementById("cfgClassifRefresh")?.addEventListener("click", () => {
          toast("Classificador atualizado");
          paint();
        });
        document.getElementById("cfgClassifTagsBtn")?.addEventListener("click", () => {
          const menu = document.getElementById("cfgClassifTagsMenu");
          if (!menu) return;
          const open = menu.style.display === "flex";
          menu.hidden = open;
          menu.style.display = open ? "none" : "flex";
        });
        modalBody.querySelectorAll("[data-cfg-classif-tag]").forEach((el) => {
          el.addEventListener("change", () => {
            selectedTags = [...modalBody.querySelectorAll("[data-cfg-classif-tag]:checked")].map((x) => x.dataset.cfgClassifTag);
            const lab = document.getElementById("cfgClassifTagsLabel");
            if (lab) lab.textContent = selectedTags.length ? selectedTags.join(", ") : "Nenhuma tag selecionada";
          });
        });
        document.getElementById("cfgClassifGerenciador")?.addEventListener("click", () => {
          toast("Abrindo gerenciador do classificador");
        });
        document.getElementById("cfgClassifHierarquia")?.addEventListener("click", () => {
          toast("Hierarquia por data");
        });
        modalBody.querySelectorAll("[data-cfg-classif-emp]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const emp = empresas.find((e) => e.id === btn.dataset.cfgClassifEmp);
            toast(`Empresa selecionada: ${emp?.nome || ""}`);
          });
        });
      };

      paint();
    }

    function openCfgGerarCfgModal() {
      openModal({
        title: "Gerar arquivo .cfg",
        sub: "Exportação da configuração dos robôs",
        body: `
          <label>Ambiente</label>
          <select id="cfgRobEnv"><option>Produção</option><option>Homologação</option></select>
          <label>Incluir</label>
          <select id="cfgRobInc"><option>Todos os robôs</option><option>Apenas ativos</option></select>
          <p style="margin:8px 0 0;font-size:.76rem;color:var(--muted)">O arquivo será gerado localmente (simulação do protótipo).</p>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-primary" id="cfgRobGen">Gerar .cfg</button>`,
      });
      document.getElementById("cfgRobGen")?.addEventListener("click", () => {
        closeModal();
        toast(`Arquivo robos-${document.getElementById("cfgRobEnv")?.value || "prod"}.cfg gerado`);
      });
    }

    function getCfgSessoesMock() {
      const funcs = ensureCfgStore().funcionarios;
      const ranking = [
        { email: "admin@processoagil.com.br", tempo: "48h 12m", pct: 92 },
        { email: "marina.souza@escritorio.com.br", tempo: "36h 40m", pct: 70 },
        { email: "ana.costa@escritorio.com.br", tempo: "31h 05m", pct: 60 },
        { email: "juliana.reis@escritorio.com.br", tempo: "28h 18m", pct: 54 },
      ];
      const sessoes = funcs.slice(0, 8).map((f, i) => ({
        id: "s" + f.id,
        email: f.email,
        initials: f.initials,
        dept: i % 3 === 0 ? "ADMIN" : "USER",
        online: i < 5,
        inicio: `14/07/2026 ${String(8 + i).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
        lastSeen: i < 5 ? "agora" : `14/07/2026 ${String(10 + i).padStart(2, "0")}:12`,
        tempo: `${1 + (i % 4)}h ${String(10 + i * 3).padStart(2, "0")}m`,
        sessoesHoje: 1 + (i % 5),
      }));
      return { ranking, sessoes };
    }

    function renderCfgSessoesChart() {
      const pts = [40, 55, 48, 70, 62, 80, 74, 88, 76, 92, 85, 95, 78, 90, 84, 96, 88, 70, 82, 91, 86, 94, 89, 97, 85, 93, 88, 90, 84, 92, 87];
      const w = 640;
      const h = 180;
      const pad = 16;
      const max = 100;
      const step = (w - pad * 2) / (pts.length - 1);
      const coords = pts.map((v, i) => {
        const x = pad + i * step;
        const y = h - pad - ((v / max) * (h - pad * 2));
        return [x, y];
      });
      const line = coords.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
      const area = `${line} L${coords[coords.length - 1][0].toFixed(1)},${(h - pad).toFixed(1)} L${coords[0][0].toFixed(1)},${(h - pad).toFixed(1)} Z`;
      return `
        <svg class="cfg-sess-chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="cfgSessFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#3b6fd4" stop-opacity=".28"/>
              <stop offset="100%" stop-color="#3b6fd4" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <path d="${area}" fill="url(#cfgSessFill)"/>
          <path d="${line}" fill="none" stroke="#3b6fd4" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
        </svg>`;
    }

    function renderCfgSessoesPanel() {
      const data = getCfgMock();
      const sess = getCfgSessoesMock();
      const tabs = [
        ["recentes", "Sessões recentes"],
        ["usuarios", "Usuários"],
        ["inatividade", "Sessões encerradas por inatividade"],
        ["resumo", "Resumo por usuário"],
        ["abas", "Tempo por aba"],
      ];
      return `
        <div class="cfg-sess">
          <div class="cfg-sess-crumb">
            <button type="button" data-cfg-act="voltar-rh">Recursos Humanos</button>
            <span class="sep">›</span>
            <span class="curr">Monitoramento de Usuários</span>
          </div>
          <div class="cfg-sess-head">
            <div>
              <h2>Monitoramento de Usuários</h2>
              <p>Acompanhe o uso do sistema, sessões e produtividade da equipe.</p>
            </div>
            <div class="cfg-sess-head-actions">
              ${renderCfgDateRangeHtml({
                iniId: "cfgSessIni",
                fimId: "cfgSessFim",
                iniIso: cfgState.sessPeriod.ini,
                fimIso: cfgState.sessPeriod.fim,
              })}
              <button type="button" class="btn-ghost" data-cfg-act="sess-exportar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;vertical-align:-2px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>
                Exportar relatório
              </button>
            </div>
          </div>
          <div class="cfg-sess-layout">
            <aside class="cfg-sess-filters">
              <div class="cfg-sess-filters-head">
                <strong>Filtros</strong>
                <div class="tools">
                  <button type="button" data-cfg-act="sess-limpar">Limpar</button>
                  <button type="button" data-cfg-act="sess-reload" aria-label="Recarregar" title="Recarregar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-14.3-7.2L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 14.3 7.2L21 16"/><path d="M16 21h5v-5"/></svg>
                  </button>
                </div>
              </div>
              <label>Usuário
                <select id="cfgSessUser">
                  <option value="">Todos</option>
                  ${data.funcionarios.map((f) => `<option value="${f.id}" ${cfgState.sessFilters.user === f.id ? "selected" : ""}>${f.nome}</option>`).join("")}
                </select>
              </label>
              <label>Departamento
                <select id="cfgSessDept">
                  <option value="">Todos</option>
                  ${data.departamentos.map((d) => `<option value="${d.id}" ${cfgState.sessFilters.dept === d.id ? "selected" : ""}>${d.nome}</option>`).join("")}
                </select>
              </label>
              <label>Cargo
                <select id="cfgSessCargo">
                  <option value="">Todos</option>
                  ${data.cargos.map((c) => `<option value="${c.id}" ${cfgState.sessFilters.cargo === c.id ? "selected" : ""}>${c.nome}</option>`).join("")}
                </select>
              </label>
              <label>Status
                <select id="cfgSessStatus">
                  <option value="">Todos</option>
                  <option value="online" ${cfgState.sessFilters.status === "online" ? "selected" : ""}>Online</option>
                  <option value="offline" ${cfgState.sessFilters.status === "offline" ? "selected" : ""}>Inativo</option>
                </select>
              </label>
              <label>Período
                ${renderCfgDateRangeHtml({
                  iniId: "cfgSessIniFilter",
                  fimId: "cfgSessFimFilter",
                  iniIso: cfgState.sessPeriod.ini,
                  fimIso: cfgState.sessPeriod.fim,
                  block: true,
                })}
              </label>
              <button type="button" class="btn-primary" style="width:100%;margin-top:4px" data-cfg-act="sess-aplicar">Aplicar filtros</button>
            </aside>
            <div class="cfg-sess-main">
              <div class="cfg-sess-kpis">
                <div class="cfg-sess-kpi online"><span class="lab">Usuários online agora</span><strong>12</strong></div>
                <div class="cfg-sess-kpi inativos"><span class="lab">Usuários inativos</span><strong>8</strong></div>
                <div class="cfg-sess-kpi horas"><span class="lab">Total de horas ativas (hoje)</span><strong>46h 18m</strong></div>
                <div class="cfg-sess-kpi media"><span class="lab">Média por sessão</span><strong>2h 47m</strong></div>
                <div class="cfg-sess-kpi hoje"><span class="lab">Sessões hoje</span><strong>31</strong></div>
              </div>
              <div class="cfg-sess-mid">
                <article class="cfg-sess-card">
                  <div class="cfg-sess-card-head">
                    <h3>Atividade ao longo do tempo</h3>
                    <select aria-label="Granularidade" style="height:30px;border:1px solid var(--border);border-radius:7px;padding:0 8px;font:inherit;font-size:.72rem;background:transparent;color:var(--navy-deep)">
                      <option>Diário</option>
                      <option>Semanal</option>
                      <option>Mensal</option>
                    </select>
                  </div>
                  ${renderCfgSessoesChart()}
                </article>
                <article class="cfg-sess-card">
                  <div class="cfg-sess-card-head"><h3>Ranking por tempo ativo</h3></div>
                  ${sess.ranking.map((r, i) => `
                    <div class="cfg-sess-rank-item">
                      <span class="pos">${i + 1}º</span>
                      <div>
                        <div class="mail">${r.email}</div>
                        <div class="bar"><i style="width:${r.pct}%"></i></div>
                        <div class="meta">${r.tempo}</div>
                      </div>
                    </div>`).join("")}
                  <button type="button" class="btn-ghost" style="width:100%;margin-top:8px" data-cfg-act="sess-ranking">Ver ranking completo</button>
                </article>
              </div>
              <div class="cfg-sess-table-wrap">
                <div class="cfg-sess-tabs" role="tablist">
                  ${tabs.map(([id, lab]) => `
                    <button type="button" class="${cfgState.sessTab === id ? "active" : ""}" data-cfg-sess-tab="${id}">${lab}</button>
                  `).join("")}
                </div>
                <div style="overflow:auto">
                  <table class="cfg-sess-table">
                    <thead>
                      <tr>
                        <th>Usuário</th>
                        <th>Departamento</th>
                        <th>Status</th>
                        <th>Sessão iniciada</th>
                        <th>Último seen</th>
                        <th>Tempo ativo</th>
                        <th>Sessões hoje</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      ${sess.sessoes.map((s) => `
                        <tr>
                          <td>
                            <div class="cfg-sess-user">
                              <span class="cfg-avatar">${s.initials}</span>
                              <span>${s.email}</span>
                            </div>
                          </td>
                          <td><span class="cfg-sess-badge ${s.dept === "ADMIN" ? "admin" : "user"}">${s.dept}</span></td>
                          <td><span class="cfg-sess-badge ${s.online ? "online" : "offline"}">${s.online ? "Online" : "Inativo"}</span></td>
                          <td>${s.inicio}</td>
                          <td>${s.lastSeen}</td>
                          <td>${s.tempo}</td>
                          <td>${s.sessoesHoje}</td>
                          <td>
                            <button type="button" class="cfg-icon-btn tip-bottom" data-tip="Ações" data-cfg-act="sess-row" data-id="${s.id}" aria-label="Ações">${cfgIconMore()}</button>
                          </td>
                        </tr>`).join("")}
                    </tbody>
                  </table>
                </div>
                <div class="cfg-sess-foot">
                  <span>Mostrando 1 a ${sess.sessoes.length} de ${sess.sessoes.length} sessões</span>
                  <div class="cfg-sess-pager">
                    <button type="button" aria-label="Anterior" data-cfg-act="sess-prev">‹</button>
                    <button type="button" aria-label="Próxima" data-cfg-act="sess-next">›</button>
                    <span>Itens por página</span>
                    <select aria-label="Itens por página" style="height:28px;border:1px solid var(--border);border-radius:6px;padding:0 6px;font:inherit;font-size:.72rem;background:transparent">
                      <option>10</option>
                      <option selected>25</option>
                      <option>50</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    }

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
                <button type="button" class="btn-ghost" data-close>Fechar</button>
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
      if (securityCertFilterClienteId) {
        rows = rows.filter((r) => r.id === securityCertFilterClienteId);
      }
      if (securityCertFilterMode === "acao") {
        rows = rows.filter((r) => r.status === "vencido" || r.status === "a-vencer");
      } else if (securityCertFilterMode !== "all") {
        rows = rows.filter((r) => r.status === securityCertFilterMode);
      }
      const q = normalizeSearchText(securityCertSearchQuery);
      if (q) {
        rows = rows.filter((r) => {
          const blob = normalizeSearchText([r.razaoSocial, r.fantasia, r.cnpj, r.titular, r.validade].join(" "));
          return blob.includes(q);
        });
      }
      const filters = [
        { id: "all", label: "Todos" },
        { id: "acao", label: "Exigem ação" },
        { id: "vencido", label: "Vencidos" },
        { id: "a-vencer", label: "A vencer" },
        { id: "ok", label: "Válidos" },
      ];
      const clienteNome = securityCertFilterClienteId
        ? (CLIENTES.find((c) => c.id === securityCertFilterClienteId)?.fantasia || "empresa")
        : null;
      const hasActiveFilters = !!(securityCertFilterClienteId || securityCertFilterMode !== "all" || securityCertSearchQuery.trim());
      const searchEsc = (securityCertSearchQuery || "").replace(/"/g, "&quot;");
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
            <div class="sec-kpis" aria-label="Resumo de certificados">
              <div class="sec-kpi total"><span class="lab">Total</span><strong>${counts.total}</strong></div>
              <div class="sec-kpi ok"><span class="lab">Válidos</span><strong>${counts.ok}</strong></div>
              <div class="sec-kpi warn"><span class="lab">A vencer</span><strong>${counts.aVencer}</strong></div>
              <div class="sec-kpi bad"><span class="lab">Vencidos</span><strong>${counts.vencidos}</strong></div>
            </div>
          </div>
          <div class="sec-filters" role="toolbar" aria-label="Filtros de certificado">
            <div class="proc-filter search sec-search">
              <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="search" id="secCertSearch" placeholder="Buscar razão social, CNPJ ou titular" value="${searchEsc}" autocomplete="off" aria-label="Buscar certificados" />
            </div>
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
        renderSegurancaCertificados();
        toast("Filtros removidos");
      });
      const searchEl = document.getElementById("secCertSearch");
      searchEl?.addEventListener("input", () => {
        securityCertSearchQuery = searchEl.value || "";
        const pos = searchEl.selectionStart;
        renderSegurancaCertificados();
        const again = document.getElementById("secCertSearch");
        if (again) {
          again.focus();
          try { again.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
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
      cliPerfilTab = pageId;
      const certRow = getCertificadoRow(c);
      const cert = certRow.meta;
      wrap.innerHTML = `
        <div class="cli-perfil">
          <div class="cli-perfil-head">
            <div class="cli-perfil-head-main">
              <div class="cli-perfil-head-left">
                <h2>${c.fantasia || c.nome}</h2>
                <div class="cli-perfil-meta">
                  <span>${c.razaoSocial}</span>
                  <span>·</span>
                  <span>${c.cnpj}</span>
                  <span>·</span>
                  <span>${c.regime}</span>
                  <span>·</span>
                  <span>${c.estado}</span>
                  <span class="cli-badge ${c.status === "Ativo" ? "matriz" : "filial"}">${c.status}</span>
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
      contentPanel.classList.toggle("is-expanded", on);
      expandBackdrop.classList.toggle("show", on);
      document.body.classList.toggle("panel-expanded", on);
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
      dashViewTools.hidden = !(section.dashboard || section.financeiroDash);
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
      if (e.target.id === "agendaEntregaSearch") {
        agendaEntregaQuery = e.target.value || "";
        renderAgendaEntregasBoard();
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
      if (e.target.closest("[data-cli-add-empresa]")) {
        openClienteCadastro();
        return;
      }
      const openBtn = e.target.closest("[data-cli-open], .cli-list-row[data-cli-id]");
      if (openBtn) {
        openClientePerfil(openBtn.dataset.cliOpen || openBtn.dataset.cliId);
        return;
      }
      if (e.target.closest("[data-cli-back]")) {
        closeClientePerfil();
        return;
      }
      const tab = e.target.closest("[data-cli-tab]");
      if (tab) {
        cliPerfilTab = tab.dataset.cliTab || "obrigacoes";
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
        const vis = visRaw === "mim" || visRaw === "privado" ? visRaw : "geral";
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
      const entregaCard = e.target.closest("[data-cli-entrega-id]");
      if (entregaCard) {
        openEntregaDetailModal(Number(entregaCard.dataset.cliEntregaId));
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
      const finImportToggle = e.target.closest("[data-cli-fin-import-toggle]");
      if (finImportToggle) {
        const wrap = document.getElementById("cliFinImportWrap");
        const open = !wrap?.classList.contains("open");
        wrap?.classList.toggle("open", open);
        finImportToggle.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }
      const finImport = e.target.closest("[data-cli-fin-import]");
      if (finImport) {
        document.getElementById("cliFinImportWrap")?.classList.remove("open");
        const kind = finImport.dataset.cliFinImport;
        toast(kind === "ofx" ? "Importação OFX iniciada" : "Importação CNAB iniciada");
        return;
      }
      if (e.target.closest("[data-cli-fin-filtros]")) {
        openCliFinFiltrosAvancadosModal();
        return;
      }
      const finSub = e.target.closest("[data-cli-fin-sub]");
      if (finSub) {
        cliFinSubTab = finSub.dataset.cliFinSub || "conciliacao";
        cliFinTituloStatusFiltro = "";
        document.getElementById("cliFinTitFilterWrap")?.classList.remove("open");
        renderClientes();
        return;
      }
      const cliAuditAct = e.target.closest("[data-cli-fin-audit]");
      if (cliAuditAct) {
        const act = cliAuditAct.dataset.cliFinAudit;
        if (act === "import") {
          finDash.cartoes.imported = true;
          finDash.cartoes.dragging = false;
          cliFinAudit.fileName = cliFinAudit.fileName || "planilha-vendas.xlsx";
          cliFinAudit.modalTab = "relatorio";
          openCliFinAuditModal();
          toast("Planilha processada — abrindo auditoria");
          return;
        }
        if (act === "rules") {
          openCliFinAuditRulesModal();
          return;
        }
        return;
      }
      const cliDelAcq = e.target.closest("[data-fin-cfg-del-acq]");
      if (cliDelAcq && cliFinSubTab === "auditoria" && !cliFinAudit.rulesModalOpen) {
        const id = cliDelAcq.dataset.finCfgDelAcq;
        finDash.config.adquirentes = ensureFinAdquirentes().filter((a) => a.id !== id);
        toast("Acordo removido");
        renderClientes();
        return;
      }
      const finDashBtn = e.target.closest("[data-cli-fin-dash]");
      if (finDashBtn) {
        const c = CLIENTES.find((x) => x.id === cliPerfilId);
        if (!c) return;
        openCliFinDashboardHtml(c);
        return;
      }
      const titFilterToggle = e.target.closest("[data-cli-fin-tit-filter-toggle]");
      if (titFilterToggle) {
        const wrap = document.getElementById("cliFinTitFilterWrap");
        const open = !wrap?.classList.contains("open");
        wrap?.classList.toggle("open", open);
        titFilterToggle.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }
      const titFilter = e.target.closest("[data-cli-fin-tit-filter]");
      if (titFilter) {
        cliFinTituloStatusFiltro = titFilter.dataset.cliFinTitFilter || "";
        document.getElementById("cliFinTitFilterWrap")?.classList.remove("open");
        renderClientes();
        return;
      }
      const titAction = e.target.closest("[data-cli-fin-tit-action]");
      if (titAction) {
        const kind = titAction.dataset.cliFinTitAction;
        const tipo = titAction.dataset.cliFinTitTipo === "pagar" ? "a pagar" : "a receber";
        if (kind === "importar") toast(`Importar títulos ${tipo}`);
        else if (kind === "novo") toast(`Novo título ${tipo}`);
        else if (kind === "exportar") toast(`Exportar títulos ${tipo}`);
        return;
      }
      const titRow = e.target.closest("[data-cli-fin-tit-row]");
      if (titRow) {
        toast(titRow.dataset.cliFinTitRow === "baixar" ? "Baixa do título" : "Detalhe do título");
        return;
      }
      const planoAction = e.target.closest("[data-cli-fin-plano]");
      if (planoAction) {
        const kind = planoAction.dataset.cliFinPlano;
        if (kind === "novo") toast("Criar novo modelo de plano de contas");
        else if (kind === "editar") toast("Editar modelo universal");
        else toast("Abrindo mapeamento amplo");
        return;
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
      if (e.target.id === "cliSearch") {
        cliSearchQuery = e.target.value || "";
        renderClientesList();
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
        renderClientes();
        const el = document.getElementById("cliFinPlanoSearch");
        if (el) {
          el.focus();
          try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
      }
    });

    document.getElementById("clientesWrap")?.addEventListener("change", (e) => {
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
      const tabBtn = e.target.closest("[data-fin-tab]");
      if (tabBtn) {
        const tab = tabBtn.dataset.finTab || "dashboard";
        ensureFinOpenTabs();
        if (!finDash.openTabIds.includes(tab)) finDash.openTabIds.push(tab);
        if (finDash.tab === tab) return;
        finDash.tab = tab;
        finDash.acOpen = false;
        closeFinDrawer();
        renderFinModuleDash();
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
      const changeClient = e.target.closest("[data-fin-client-change]");
      if (changeClient) {
        finDash.empresaId = "";
        finDash.unidade = "all";
        finDash.empresaQuery = "";
        finDash.acOpen = true;
        finDash.tab = "dashboard";
        closeFinDrawer();
        renderFinModuleDash();
        document.getElementById("finDashEmpresa")?.focus();
        return;
      }
      const ac = e.target.closest("[data-fin-ac]");
      if (ac) {
        const id = ac.dataset.finAc || "";
        if (!id) return;
        const cli = CLIENTES.find((c) => c.id === id);
        finDash.empresaId = id;
        finDash.unidade = id;
        finDash.empresaQuery = cli?.fantasia || cli?.nome || "";
        finDash.acOpen = false;
        finDash.tab = "dashboard";
        renderFinModuleDash();
        toast(`Cliente selecionado: ${finDash.empresaQuery}`);
        return;
      }
      const action = e.target.closest("[data-fin-dash]");
      if (action) {
        const act = action.dataset.finDash;
        if (act === "limpar") {
          finDash.empresaId = "";
          finDash.unidade = "all";
          finDash.empresaQuery = "";
          finDash.period = "mes";
          finDash.periodFrom = "";
          finDash.periodTo = "";
          finDash.receitaFilter = "";
          finDash.acOpen = true;
          finDash.tab = "dashboard";
          finDash.reportTab = "visao";
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
            section: "plano",
            editingGroupId: null,
            editingLeafId: null,
            newGroupLabel: "",
            newLeafLabel: "",
            plano: null,
            adquirentes: null,
            acqForm: {
              operadora: "Stone",
              inicio: "2026-01-01",
              fim: "2026-12-31",
              bandeiras: ["Visa", "Mastercard"],
              tipoLanc: "credito",
              descontoPct: "2,49",
              antecipacaoPct: "1,20",
              parcelas: "1-1:2,49;2-6:3,19;7-12:3,99",
            },
          };
          closeFinDrawer();
          renderFinModuleDash();
          toast("Filtros limpos");
          document.getElementById("finDashEmpresa")?.focus();
          return;
        }
        if (act === "reload") {
          finDash.acOpen = false;
          renderFinModuleDash();
          toast(finDash.empresaId ? "Dados recarregados" : "Selecione um cliente para operar");
        }
        return;
      }
      const concAct = e.target.closest("[data-fin-conc]");
      if (concAct) {
        const act = concAct.dataset.finConc;
        if (act === "import") {
          toast("Extrato / XML importado (protótipo)");
          renderFinModuleDash();
        } else if (act === "export") {
          const n = filterFinConcMovements(getFinConcMovements()).length;
          toast(`Exportando ${n} movimentação(ões) · planilha gerada`);
        } else if (act === "add") {
          openFinConcAddModal();
        }
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
      const cartaoAct = e.target.closest("[data-fin-cartao]");
      if (cartaoAct) {
        const act = cartaoAct.dataset.finCartao;
        if (act === "import") {
          finDash.cartoes.imported = true;
          finDash.cartoes.dragging = false;
          renderFinModuleDash();
          toast("Planilha processada — divergências apuradas");
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
        renderFinModuleDash();
        return;
      }
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
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && finDash.drawer) closeFinDrawer();
      if (e.key === "Escape" && finDash.conc?.catRowId) {
        finDash.conc.catRowId = null;
        renderFinModuleDash();
      }
    });

    document.getElementById("financeiroWrap")?.addEventListener("input", (e) => {
      if (e.target.id === "finDashEmpresa") {
        finDash.empresaQuery = e.target.value || "";
        finDash.acOpen = true;
        if (!finDash.empresaQuery) finDash.empresaId = "";
        const pos = e.target.selectionStart;
        renderFinModuleDash();
        const el = document.getElementById("finDashEmpresa");
        if (el) {
          el.focus();
          try { el.setSelectionRange(pos, pos); } catch (_) { /* ignore */ }
        }
        return;
      }
      if (e.target.id === "finConcValor") {
        finDash.conc.valor = e.target.value || "";
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

    document.getElementById("financeiroWrap")?.addEventListener("focusin", (e) => {
      if (e.target.id === "finDashEmpresa") {
        finDash.acOpen = true;
        renderFinModuleDash();
        document.getElementById("finDashEmpresa")?.focus();
      }
    });

    document.addEventListener("mousedown", (e) => {
      if (!finDash.acOpen) return;
      const wrap = document.getElementById("financeiroWrap");
      if (!wrap?.contains(e.target)) return;
      if (e.target.closest(".fin-client-picker")) return;
      finDash.acOpen = false;
      renderFinModuleDash();
    });

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
          const fromCliente = !!e.target.closest("[data-cli-fin-audit-drop]") || (cliPerfilTab === "financeiro" && cliFinSubTab === "auditoria");
          if (fromCliente) {
            cliFinAudit.fileName = file?.name || "planilha-vendas.xlsx";
            cliFinAudit.modalTab = "relatorio";
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
      if (e.target.id === "finConcTipo") {
        finDash.conc.tipo = e.target.value || "";
        finDash.conc.catRowId = null;
        renderFinModuleDash();
        return;
      }
      if (e.target.id === "finConcStatus") {
        finDash.conc.status = e.target.value || "";
        finDash.conc.catRowId = null;
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
      const t = e.target;
      if (t.id === "procSearch") {
        procFiltros.search = t.value.trim();
        renderProcessosGrid(getProcessosFiltrados());
        renderProcessosQuantidade();
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
      if (e.target.id === "procSearch" && e.key === "Enter") {
        procFiltros.search = e.target.value.trim();
        renderProcessos();
      }
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
          foot: `<button type="button" class="btn-ghost" data-close>Fechar</button>
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
          toast("Acordo removido");
          refreshCliFinAuditRulesModal();
          renderClientes();
          return;
        }
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
          CLI_FIN_AUDIT_VIEW_OPTS.forEach((o) => { cliFinAudit.view[o.value] = true; });
          syncCliFinAuditHeadTools();
          applyCliFinAuditView();
          return;
        }
        if (act === "view-none") {
          ensureCliFinAuditView();
          CLI_FIN_AUDIT_VIEW_OPTS.forEach((o) => { cliFinAudit.view[o.value] = false; });
          syncCliFinAuditHeadTools();
          applyCliFinAuditView();
          return;
        }
        if (act === "export-laudo") {
          toast("Exportação do laudo em PDF (protótipo)");
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

    expandBackdrop.addEventListener("click", () => setExpanded(false));

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
        body: `<p style="margin-bottom:10px">Serão exportadas as seções filtradas no ${isFin ? "módulo financeiro" : "dashboard"}:</p>
          <ul style="padding-left:18px;line-height:1.7;font-size:.88rem">
            ${selected.map((s) => `<li>${s}</li>`).join("")}
          </ul>`,
        foot: `<button type="button" class="btn-ghost" data-close>Fechar</button>
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
    });

    document.addEventListener("click", (e) => {
      if (!empresaWrap.contains(e.target)) empresaWrap.classList.remove("open");
      if (!e.target.closest(".chip-select")) closeAllChipSelects();
      if (!e.target.closest(".ui-select")) closeAllUiSelects();
      if (!e.target.closest("#agendaEntregaStatusWrap") && !e.target.closest("#procStatusWrap") && !e.target.closest("#cliProcStatusWrap")) {
        document.getElementById("agendaEntregaStatusWrap")?.classList.remove("open");
        document.getElementById("agendaEntregaStatusBtn")?.setAttribute("aria-expanded", "false");
        document.getElementById("procStatusWrap")?.classList.remove("open");
        document.getElementById("procStatusBtn")?.setAttribute("aria-expanded", "false");
        document.getElementById("cliProcStatusWrap")?.classList.remove("open");
        document.getElementById("cliProcStatusBtn")?.setAttribute("aria-expanded", "false");
      }
      if (!e.target.closest("#cliFinImportWrap")) {
        document.getElementById("cliFinImportWrap")?.classList.remove("open");
        document.querySelector("[data-cli-fin-import-toggle]")?.setAttribute("aria-expanded", "false");
      }
      if (!e.target.closest("#cliFinTitFilterWrap")) {
        document.getElementById("cliFinTitFilterWrap")?.classList.remove("open");
        document.querySelector("[data-cli-fin-tit-filter-toggle]")?.setAttribute("aria-expanded", "false");
      }
      if (!e.target.closest("#finDashEmpresa") && !e.target.closest("#finDashAcMenu") && finDash.acOpen) {
        finDash.acOpen = false;
        const wrap = document.getElementById("financeiroWrap");
        if (wrap?.classList.contains("show")) renderFinModuleDash();
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
              <button type="button" class="btn-ghost" data-close>Fechar</button>
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
