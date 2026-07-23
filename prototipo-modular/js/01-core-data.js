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
      const desdeMes = [
        "03/2019", "08/2020", "01/2021", "11/2018", "06/2022",
        "02/2020", "09/2021", "04/2019", "07/2023", "12/2018",
      ];
      CLIENTES.forEach((c, i) => {
        const isFilial = i === 2 || i === 6 || i === 8;
        const cert = certMap[c.id] || { validade: "15/03/2027", titular: `${c.short} Certificado` };
        Object.assign(c, {
          tipoUnidade: isFilial ? "Filial" : "Matriz",
          funcInternos: 4 + ((i * 3) % 11),
          funcExternos: 1 + (i % 5),
          clienteDesde: desdeMes[i] || "01/2020",
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
      { value: "em-andamento", label: "Em andamento", color: "#28519c", sucesso: null },
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
          /* mesma unidade do gráfico (milhares); parcela do imposto do mês */
          imp: Math.max(1, Math.round((imposto / 1000) * (row.atual / 42) * 10) / 10),
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
      { id: "financeiro", label: "Módulo Contábil", tip: "Módulo contábil", empty: "Sem lançamentos financeiros", desc: "Dashboard de análise financeira.", financeiroDash: true, items: [] },
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
      { id: "entregas", label: "Entregas", tip: "Prazos e entregas vinculadas" },
      { id: "documentos", label: "Documentos", tip: "Arquivos e anexos da empresa" },
      { id: "xml", label: "XML", tip: "Notas fiscais e XMLs" },
      { id: "financeiro", label: "Financeiro", tip: "Relatório Executivo e panorama financeiro" },
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

    function agendaTasksForModule() {
      let tasks = agendaTasksScoped();
      if (agendaEmpresaFilter && agendaEmpresaFilter !== "all") {
        tasks = tasks.filter((t) => t.clienteId === agendaEmpresaFilter);
      }
      return tasks;
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
      return agendaTasksForModule().filter((t) => t.date === iso && !t.arquivada);
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

    function openEntregaDetailModal(taskId, opts = {}) {
      const t = agendaTasks.find((x) => x.id === Number(taskId));
      if (!t) return;
      const clientView = opts.clientView === true || (opts.clientView !== false && isClientePortal());
      if (clientView) {
        openCliEntregaDetailModal(t);
        return;
      }
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

    /** Detalhe de entrega no Acesso ao Cliente · sem ações/histórico internos do escritório. */
    function openCliEntregaDetailModal(t) {
      const st = procStatusMeta(t.status);
      const docNome = `${t.nome.replace(/\s+/g, "-").toLowerCase()}-${(t.competencia || "doc").replace(/\//g, "-")}.pdf`;
      const recebida = !!t.recebimentoCliente;

      openModal({
        title: t.nome,
        sub: `Status de entrega · ${st.label}`,
        wide: true,
        body: `
          <div class="entrega-detail-head">
            <div>
              <h4>${t.nome}</h4>
              <div class="sub">Documento final · competência ${t.competencia || "—"}</div>
            </div>
            <span class="proc-badge ${st.badge}">${st.label}</span>
          </div>
          <div class="entrega-detail-grid">
            <div class="cell"><span class="lab">Prazo</span><span class="val">${t.prazoLegal || "—"}</span></div>
            <div class="cell"><span class="lab">Competência</span><span class="val">${t.competencia || "—"}</span></div>
            <div class="cell"><span class="lab">Data na agenda</span><span class="val">${fmtOpsDate(t.date)}</span></div>
            <div class="cell"><span class="lab">Recebimento</span><span class="val">${recebida ? "Confirmado pelo cliente" : "Pendente de confirmação"}</span></div>
          </div>
          <div class="entrega-detail-section">
            <h5>Documento</h5>
            <div class="cli-entrega-doc-row">
              <div class="cli-entrega-doc-meta">
                <strong>${docNome}</strong>
                <span>PDF · disponível para visualização e download</span>
              </div>
              <div class="cli-entrega-doc-actions">
                <button type="button" class="btn-ghost" data-cli-ent-action="visualizar" data-cli-entrega-id="${t.id}">Visualizar</button>
                <button type="button" class="btn-primary" data-cli-ent-action="baixar" data-cli-entrega-id="${t.id}">Baixar</button>
              </div>
            </div>
          </div>`,
        foot: `
          <button type="button" class="btn-ghost" data-close>Fechar</button>
          <button type="button" class="btn-primary" id="cliEntregaConfirmarBtn" data-entrega-id="${t.id}" ${recebida ? "disabled" : ""}>${recebida ? "Recebimento confirmado" : "Confirmar recebimento"}</button>`,
      });

      document.getElementById("cliEntregaConfirmarBtn")?.addEventListener("click", () => {
        t.recebimentoCliente = true;
        closeModal();
        if (typeof renderClientes === "function") renderClientes();
        toast("Recebimento confirmado");
      });

      document.getElementById("modalBody")?.querySelectorAll("[data-cli-ent-action]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const act = btn.dataset.cliEntAction;
          toast(act === "baixar" ? "Download do documento iniciado" : "Abrindo visualização do documento");
        });
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
      /** Todas as abas do módulo ficam visíveis na barra (sem menu +). */
      openTabIds: ["dashboard", "conciliacao", "titulos", "cartoes", "plano", "config"],
      /** Sub-abas analíticas do Painel: visao | dre | dfc | ebitda */
      reportTab: "visao",
      /** Sub-aba de Títulos: pagar | receber */
      titulosSub: "pagar",
      period: "mes",
      periodFrom: "2026-06-15",
      periodTo: "2026-07-14",
      unidade: "all",
      empresaQuery: "",
      empresaId: "all",
      axis: "mensal",
      acOpen: false,
      receitaFilter: "",
      dreOpen: { rb: true, ded: true, cust: true },
      drawer: null,
      conc: {
        q: "",
        tipo: "",
        valor: "",
        idTitulo: "",
        status: "",
        de: "",
        ate: "",
        selected: [],
        catRowId: null,
        categories: {},
        movs: null,
        contexto: "contabil",
        contextoOpen: false,
        banco: "SICREDI",
        bancoId: "b1",
        bancoPadraoId: "b1",
        bancos: null,
        bancoPickId: null,
        bancoPickPadrao: false,
        opsExpanded: false,
        bancoMeta: {
          codigo: "756",
          agencia: "0903",
          conta: "90850-7",
        },
        ofx: {
          q: "",
          tipo: "",
          conciliacao: "nao",
          de: "",
          ate: "",
          selected: [],
          modalOpen: false,
          expanded: false,
          sessionConciliados: [],
        },
        regras: {
          escopo: "todos",
          automacao: "inativo",
          tipo: "receber",
          match: "contem",
          keyword: "",
          wild: false,
          subplano: "",
          lista: null,
        },
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
        section: "adquirentes",
        editingGroupId: null,
        editingLeafId: null,
        newLeafLabel: "",
        newGroupLabel: "",
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
      },
      /** Mapeamento Plano Financeiro ↔ Planos Contábeis (importação / de-para) */
      planoMap: {
        q: "",
        selectedFinId: null,
        maps: null,
        prefixo: "",
        bancoIds: null,
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

    /** Plano Financeiro (gerencial) — lado esquerdo do mapeamento */
    const FIN_PLANO_FINANCEIRO_SEED = [
      { id: "793", codigo: "1", nome: "RECEITAS DIRETAS" },
      { id: "807", codigo: "1.1", nome: "Clientes - Venda de Mercadoria Fabricadas" },
      { id: "810", codigo: "1.2", nome: "Clientes - Serviços Prestados" },
      { id: "811", codigo: "1.3", nome: "Clientes - Revenda de Mercadoria" },
      { id: "808", codigo: "1.10", nome: "Adiantamento de Cliente - PIX" },
      { id: "809", codigo: "1.11", nome: "Adiantamento Transferência Bancária" },
      { id: "820", codigo: "2", nome: "DESPESAS OPERACIONAIS" },
      { id: "821", codigo: "2.1", nome: "Folha e Encargos" },
      { id: "822", codigo: "2.2", nome: "Infraestrutura e Aluguel" },
      { id: "823", codigo: "2.3", nome: "Tecnologia e Softwares" },
      { id: "830", codigo: "3", nome: "MOVIMENTAÇÕES FINANCEIRAS" },
      { id: "831", codigo: "3.1", nome: "Transferência entre contas" },
    ];

    /** Planos Contábeis (podem vir de outro sistema) — lado direito */
    const FIN_PLANO_CONTABIL_SEED = [
      { id: "57", codigo: "10", nome: "APLICAÇÕES FINANCEIRAS LIQUIDEZ", origem: "import" },
      { id: "83", codigo: "100", nome: "IMÓVEIS NÃO DESTINADOS AO USO", origem: "import" },
      { id: "84", codigo: "101", nome: "OUTROS INVESTIMENTOS", origem: "import" },
      { id: "249", codigo: "102", nome: "PARTICIPAÇÕES EM OUTRAS EMPRESAS", origem: "import" },
      { id: "250", codigo: "103", nome: "CAUÇÕES PERMANENTES", origem: "import" },
      { id: "85", codigo: "104", nome: "(-) PROVISÃO PARA PERDAS", origem: "import" },
      { id: "301", codigo: "3.1.01", nome: "Receita de Serviços Contábeis", origem: "import" },
      { id: "302", codigo: "3.1.02", nome: "Receita de Venda de Mercadorias", origem: "import" },
      { id: "303", codigo: "3.1.03", nome: "Receita de Revenda", origem: "import" },
      { id: "310", codigo: "1.1.05", nome: "Clientes Diversos", origem: "import" },
      { id: "320", codigo: "4.1.01", nome: "Despesas com Pessoal", origem: "import" },
      { id: "321", codigo: "4.2.01", nome: "Aluguéis e Condomínio", origem: "import" },
      { id: "322", codigo: "4.3.01", nome: "Serviços de TI / Cloud", origem: "import" },
      { id: "330", codigo: "1.8", nome: "Adiantamento de Cliente - Dinheiro", origem: "import" },
    ];

    const FIN_PLANO_MAP_SEED = {
      "807": ["302"],
      "810": ["301"],
      "811": ["303"],
      "808": ["330"],
      "821": ["320"],
      "822": ["321"],
      "823": ["322"],
    };

    /** Empresas assessoria / centros de custo — cadastro de modelo */
    const FIN_PLANO_EMPRESAS_ASSESSORIA = [
      { id: "ea1", nome: "Alpha Contábil ME" },
      { id: "ea2", nome: "Gamma Serviços Contábeis" },
      { id: "ea3", nome: "Assessoria Exemplo LTDA" },
    ];
    const FIN_PLANO_CENTROS_CUSTO = [
      { id: "cc1", nome: "Administrativo" },
      { id: "cc2", nome: "Operacional" },
      { id: "cc3", nome: "Comercial" },
      { id: "cc4", nome: "TI / Infraestrutura" },
    ];

    function finPlanoContaSeed(id, codigo, nome, tipo, natureza, parentId, extra) {
      const e = extra || {};
      return {
        id,
        codigo,
        nome,
        parentId: parentId || null,
        descricao: e.descricao || "",
        tipo: tipo || "sintetico",
        natureza: natureza || "devedora",
        dre: e.dre || "",
        ativa: e.ativa !== false,
        aceitaLancamentos: e.aceitaLancamentos != null ? !!e.aceitaLancamentos : tipo === "analitico",
      };
    }

    const FIN_PLANO_UNIVERSAL_CONTAS = [
      finPlanoContaSeed("pc1", "1", "ATIVO", "sintetico", "devedora", null),
      finPlanoContaSeed("pc11", "1.1", "CIRCULANTE", "sintetico", "devedora", "pc1"),
      finPlanoContaSeed("pc111", "1.1.01", "Caixa e Equivalentes de Caixa", "analitico", "devedora", "pc11"),
      finPlanoContaSeed("pc112", "1.1.02", "Clientes", "analitico", "devedora", "pc11"),
      finPlanoContaSeed("pc12", "1.2", "NÃO CIRCULANTE", "sintetico", "devedora", "pc1"),
      finPlanoContaSeed("pc121", "1.2.01", "Imobilizado", "analitico", "devedora", "pc12"),
      finPlanoContaSeed("pc2", "2", "PASSIVO", "sintetico", "credora", null),
      finPlanoContaSeed("pc21", "2.1", "CIRCULANTE", "sintetico", "credora", "pc2"),
      finPlanoContaSeed("pc211", "2.1.01", "Fornecedores", "analitico", "credora", "pc21"),
      finPlanoContaSeed("pc3", "3", "PATRIMÔNIO LÍQUIDO", "sintetico", "credora", null),
      finPlanoContaSeed("pc31", "3.1", "Capital Social", "analitico", "credora", "pc3"),
      finPlanoContaSeed("pc4", "4", "RECEITAS", "sintetico", "credora", null, { dre: "receita" }),
      finPlanoContaSeed("pc41", "4.1", "Receita de Serviços", "analitico", "credora", "pc4", { dre: "receita" }),
      finPlanoContaSeed("pc5", "5", "CUSTOS E DESPESAS", "sintetico", "devedora", null, { dre: "despesa" }),
      finPlanoContaSeed("pc51", "5.1", "Despesas Operacionais", "analitico", "devedora", "pc5", { dre: "despesa" }),
    ];

    const FIN_PLANO_MODELOS_SEED = [
      {
        id: "pm1",
        nome: "MODELO UNIVERSAL CONTÁBIL",
        meta: "Modelo universal · 4 níveis · Simples Nacional",
        tipo: "universal",
        isPadrao: true,
        empresaId: "ea1",
        centroCustoId: "",
        contas: FIN_PLANO_UNIVERSAL_CONTAS.map((c) => ({ ...c })),
      },
      {
        id: "pm2",
        nome: "Plano Farmácia / Varejo",
        meta: "Setorial · Lucro Presumido",
        tipo: "setorial",
        isPadrao: false,
        empresaId: "ea2",
        centroCustoId: "cc2",
        contas: [
          finPlanoContaSeed("pf1", "1", "ATIVO", "sintetico", "devedora", null),
          finPlanoContaSeed("pf11", "1.1", "Estoque de Mercadorias", "analitico", "devedora", "pf1"),
          finPlanoContaSeed("pf2", "2", "PASSIVO", "sintetico", "credora", null),
          finPlanoContaSeed("pf3", "3", "RECEITAS DE VENDA", "sintetico", "credora", null, { dre: "receita" }),
        ],
      },
      {
        id: "pm3",
        nome: "Plano Serviços Contábeis",
        meta: "Interno · centros de custo",
        tipo: "padrao",
        isPadrao: false,
        empresaId: "ea1",
        centroCustoId: "cc1",
        contas: [
          finPlanoContaSeed("ps1", "1", "ATIVO", "sintetico", "devedora", null),
          finPlanoContaSeed("ps2", "3.1.01", "Receita de Honorários", "analitico", "credora", null, { dre: "receita" }),
          finPlanoContaSeed("ps3", "4.1.01", "Despesas com Pessoal", "analitico", "devedora", null, { dre: "despesa" }),
        ],
      },
      {
        id: "pm4",
        nome: "Plano Lucro Real Ampliado",
        meta: "Modelo universal · consolidado",
        tipo: "universal",
        isPadrao: false,
        empresaId: "ea3",
        centroCustoId: "",
        contas: FIN_PLANO_UNIVERSAL_CONTAS.map((c) => ({ ...c, id: "lr-" + c.id })),
      },
      {
        id: "pm5",
        nome: "Mapeamento SPED ECD",
        meta: "Mapeamento amplo · contas referenciais",
        tipo: "padrao",
        isPadrao: false,
        empresaId: "ea2",
        centroCustoId: "cc4",
        contas: [
          finPlanoContaSeed("sp1", "10", "APLICAÇÕES FINANCEIRAS", "analitico", "devedora", null),
          finPlanoContaSeed("sp2", "100", "IMÓVEIS NÃO DESTINADOS AO USO", "analitico", "devedora", null),
        ],
      },
    ];

    /** UI state — lista de modelos × detalhe/árvore */
    let finPlanoContas = {
      modelos: null,
      selectedId: null,
      qContas: "",
      expanded: null,
    };

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
      { id: "dashboard", label: "Painel", tip: "Painel consolidado de saúde e fluxo de caixa" },
      { id: "conciliacao", label: "Conciliação Bancária", tip: "Extrato, XML e categorização na DRE" },
      { id: "titulos", label: "Títulos a Pagar e Receber", tip: "Gestão unificada de contas a pagar e a receber" },
      { id: "cartoes", label: "Auditoria de Cartões", tip: "Cruzamento Stone/Cielo × taxas cadastradas" },
      { id: "plano", label: "Plano de Contas", tip: "Modelos e estrutura do plano de contas do cliente" },
      { id: "config", label: "Regras & Adquirentes", tip: "Acordos comerciais, bandeiras, faixas e taxas" },
    ];

    /** Navegação hierárquica do Módulo Contábil (UI apenas — ids de tela inalterados). */
    const FIN_NAV_GROUPS = [
      { id: "visao", type: "direct", tab: "dashboard", label: "Painel" },
      {
        id: "financeiro",
        type: "dropdown",
        label: "Financeiro",
        items: [
          { tab: "titulos", label: "Títulos a Pagar e Receber" },
          { tab: "conciliacao", label: "Conciliação Bancária" },
        ],
      },
      {
        id: "auditoria",
        type: "dropdown",
        label: "Auditoria",
        items: [
          { tab: "cartoes", label: "Auditoria de Cartão" },
        ],
      },
      {
        id: "configuracoes",
        type: "dropdown",
        label: "Configurações",
        items: [
          { tab: "plano", label: "Plano de Contas" },
          { tab: "config", label: "Plano de Contas (DRE)", configSection: "plano" },
          { tab: "config", label: "Regras e Adquirentes", configSection: "adquirentes" },
        ],
      },
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
    /** Filtros da aba Entregas no Acesso ao Cliente (IDs próprios · sem conflito com agenda). */
    let cliEntregaQuery = "";
    let cliEntregaStatus = "";
    let cliEntregaKpiFilter = null;
    let cliEntregaResp = "";
    /** Accordion do Quadro de Entregas (portal) · seções abertas por padrão */
    let cliEntregaAccord = { atrasadas: true, abertas: true, prazo: true };
    let cliEntregaMonth = new Date(2026, 6, 1);
    let cliEntregaSelected = "2026-07-14";
    /** Documentos · pasta aberta (null = grid) e menu de arquivo aberto */
    let cliDocsFolderId = null;
    let cliDocsFileMenuId = null;
    let cliXmlLote = {
      active: false,
      pct: 0,
      ok: 0,
      erro: 0,
      total: 48,
      eta: 0,
      timer: null,
    };

    /** Extrator XML · Análise de NF-e (Acesso ao Cliente) */
    let cliXmlAnalise = {
      tab: "dashboard", /* importar | dashboard | produtos | config */
      cnpj: "",
      imported: true,
      _simReady: false,
      productId: null,
      charts: [],
      filtros: {
        q: "",
        de: "2026-06-01",
        ate: "2026-07-15",
        ncm: "",
        cfop: "",
        fornecedor: "",
        cliente: "",
        margem: "",
        regime: "",
        status: "",
      },
      config: {
        adminPct: 3.5,
        financeiroPct: 1.2,
        comissaoPct: 2.0,
        fretePct: 0.8,
        perdasPct: 0.5,
        outrosPct: 0.3,
        lucroDesejadoPct: 18,
        margemMinPct: 8,
        margemAtencaoPct: 12,
      },
      import: {
        running: false,
        pct: 100,
        phase: "Concluído · simulação pré-aprovada",
        filesTotal: 48,
        filesOk: 42,
        filesDup: 3,
        filesBad: 1,
        filesSkip: 2,
        logs: [],
        timer: null,
      },
    };
    let cliSearchQuery = "";
    let cliRegimeFilter = "";
    let cliEmpresaFilter = "all";
    let procEmpresaFilter = "all";
    let secEmpresaFilter = "all";
    let agendaEmpresaFilter = "all";
    let cliListKpiFilter = "";
    let cliListSelectedId = null;
    let cliListMenuId = null;
    let cliDrawerOpen = false;
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
    let cliFinSubTab = "relatorio"; // relatorio | atalhos → Módulo Contábil
    const CLI_FIN_AUDIT_VIEW_OPTS = [
      { value: "cabecalho", label: "Cabeçalho da auditoria", group: "Relatório" },
      { value: "resumo-tecnico", label: "Resumo da auditoria", group: "Relatório" },
      { value: "resumo-exec", label: "Resumo executivo", group: "Relatório" },
      { value: "insights-tecnicos", label: "Principais insights", group: "Relatório" },
      { value: "tabela-div", label: "Tabela de divergências", group: "Relatório" },
      { value: "recomendacoes", label: "Recomendações automáticas", group: "Relatório" },
      { value: "dash-alertas", label: "Faixa de alertas", group: "Dashboard" },
      { value: "dash-kpis", label: "Indicadores investigativos", group: "Dashboard" },
      { value: "chart-bruto-band", label: "Valor bruto por bandeira", group: "Dashboard" },
      { value: "chart-tarifa-band", label: "Tarifa por bandeira", group: "Dashboard" },
      { value: "chart-bruto-tipo", label: "Bruto por tipo de lançamento", group: "Dashboard" },
      { value: "chart-tarifa-tipo", label: "Tarifa por tipo de lançamento", group: "Dashboard" },
      { value: "chart-status-vendas", label: "Status das vendas", group: "Dashboard" },
      { value: "chart-tendencia", label: "Líquido × tarifa por dia", group: "Dashboard" },
      { value: "chart-rank-acq", label: "Ranking de adquirentes", group: "Dashboard" },
      { value: "chart-rank-band", label: "Ranking de bandeiras", group: "Dashboard" },
      { value: "chart-rank-regras", label: "Ranking de regras", group: "Dashboard" },
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
      laudoPreviewOpen: false,
      lastLaudoUrl: "",
      view: Object.fromEntries(CLI_FIN_AUDIT_VIEW_OPTS.map((o) => [o.value, true])),
      historyMonth: "",
      historyId: "h1",
      history: [
        { id: "h1", mes: "2026-07", label: "Julho/2026", arquivo: "planilha-vendas.xlsx", status: "alerta", divergencias: 42, impacto: 1234.56 },
        { id: "h2", mes: "2026-06", label: "Junho/2026", arquivo: "cielo-jun-2026.xlsx", status: "ok", divergencias: 3, impacto: 89.1 },
        { id: "h3", mes: "2026-05", label: "Maio/2026", arquivo: "stone-mai-2026.xlsx", status: "alerta", divergencias: 18, impacto: 540.2 },
        { id: "h4", mes: "2026-04", label: "Abril/2026", arquivo: "rede-abr-2026.xlsx", status: "ok", divergencias: 1, impacto: 12.4 },
      ],
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
    let cliFinTituloSelectedIds = new Set();
    /** Filtros da barra de Títulos (pagar/receber · compartilhado · sempre visível). */
    let cliFinTitulosFiltrosDraft = { q: "", status: "", valorMin: "", valorMax: "", vencIni: "", vencFim: "" };
    let cliFinTitulosFiltros = { q: "", status: "", valorMin: "", valorMax: "", vencIni: "", vencFim: "" };
    let cliFinTitulosImportTab = "upload";
    /** Títulos criados/editados no protótipo (além dos seeds). */
    let cliFinTitulosExtra = { pagar: [], receber: [] };
    /** Modal Ver título · abas dados | pagamento | historico */
    let cliFinTitVer = null;
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
      { id: "xml", label: "XML" },
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

    function openClientePerfil(clientId, tab) {
      const c = CLIENTES.find((x) => x.id === clientId);
      if (!c) return;
      bumpRecentClient(c.id);
      const opt = document.querySelector(`#empresaOptions .empresa-option[data-id="${c.id}"]`);
      if (opt) selectEmpresaFromOption(opt, { silentToast: true });
      closeCliClienteDrawer({ silent: true });
      cliListMenuId = null;
      cliView = "perfil";
      cliPerfilId = c.id;
      cliPerfilTab = (tab && CLI_PERFIL_TABS.some((t) => t.id === tab)) ? tab : "obrigacoes";
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
      cliPerfilTab = "entregas";
      syncAccessChrome();
      skipToast = true;
      setSection("entregas", true);
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
        syncModalCloseWithFoot();
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
      secEmpresaFilter = clienteId || "all";
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
      return agendaTasksForModule().filter((t) => !t.arquivada && String(t.date || "").startsWith(prefix));
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
        .filter((p) => !p.arquivado && (!isClientePortal() || p.clienteId === portalClienteId))
        .filter((p) => !agendaEmpresaFilter || agendaEmpresaFilter === "all" || p.clienteId === agendaEmpresaFilter);
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
      const pickerSlot = document.getElementById("agendaEmpresaPickerSlot");
      if (pickerSlot) pickerSlot.innerHTML = renderModuleEmpresaPickerHtml("agenda");
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
      return tasks.filter((t) => {
        if (agendaEmpresaFilter && agendaEmpresaFilter !== "all" && t.clienteId !== agendaEmpresaFilter) return false;
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

    function getModuleEmpresaFilter(scope) {
      if (scope === "clientes") return cliEmpresaFilter || "all";
      if (scope === "processos") return procEmpresaFilter || "all";
      if (scope === "seguranca") return secEmpresaFilter || "all";
      if (scope === "agenda") return agendaEmpresaFilter || "all";
      if (scope === "perfil") return cliPerfilId || "all";
      return "all";
    }

    function getModuleEmpresaDisplay(scope) {
      const id = getModuleEmpresaFilter(scope);
      if (!id || id === "all") {
        return { id: "all", code: "", name: "Todas as empresas", cnpjLine: "Filtrar por empresa" };
      }
      const c = CLIENTES.find((x) => x.id === id);
      if (!c) {
        if (scope === "perfil") return { id: "all", code: "", name: "Selecionar empresa", cnpjLine: "Trocar empresa" };
        return { id: "all", code: "", name: "Todas as empresas", cnpjLine: "Filtrar por empresa" };
      }
      return {
        id: c.id,
        code: c.code || "",
        name: c.fantasia || c.nome || c.short || "",
        cnpjLine: c.cnpj ? `CNPJ ${c.cnpj}` : "",
      };
    }

    function escModEmpresa(s) {
      return String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/"/g, "&quot;");
    }

    function renderModuleEmpresaPickerHtml(scope) {
      const sc = scope || "clientes";
      const hideAll = sc === "perfil";
      const tip = hideAll ? "Trocar empresa" : "Filtrar por empresa";
      const selected = getModuleEmpresaFilter(sc);
      const d = getModuleEmpresaDisplay(sc);
      const options = CLIENTES.map((c) => {
        const active = c.id === selected ? " active" : "";
        const label = escModEmpresa(c.fantasia || c.nome || "");
        return `
          <button type="button" class="empresa-option${active}" data-mod-empresa-opt="${c.id}" data-mod-empresa-scope="${sc}" data-code="${escModEmpresa(c.code || "")}" data-short="${label}" data-cnpj="${escModEmpresa(c.cnpj || "")}">
            <span class="opt-main"><span class="opt-code">${escModEmpresa(c.code || "")}</span>${label}</span>
            <small>CNPJ ${escModEmpresa(c.cnpj || "")}${c.estado ? ` · ${escModEmpresa(c.estado)}` : ""}${c.status ? ` · ${escModEmpresa(c.status)}` : ""}</small>
          </button>`;
      }).join("");
      return `
        <div class="module-empresa-picker${hideAll ? " is-perfil" : ""}" data-mod-empresa-scope="${sc}">
          <div class="empresa-wrap" id="modEmpresaWrap-${sc}">
            <button type="button" class="empresa-trigger tip-bottom" id="modEmpresaSelectBtn-${sc}" data-mod-empresa-toggle="${sc}" data-tip="${tip}" aria-expanded="false" aria-haspopup="listbox" aria-label="${tip}">
              <span class="trigger-text">
                <span class="name-line">
                  <span class="empresa-code"${d.code ? "" : " hidden"}>${escModEmpresa(d.code)}</span>
                  <span class="empresa-name">${escModEmpresa(d.name)}</span>
                </span>
                <span class="empresa-cnpj"${d.cnpjLine ? "" : " hidden"}>${escModEmpresa(d.cnpjLine)}</span>
              </span>
              <svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="empresa-menu" id="modEmpresaMenu-${sc}">
              <div class="empresa-search">
                <input type="search" id="modEmpresaSearch-${sc}" data-mod-empresa-search="${sc}" placeholder="Buscar empresa..." autocomplete="off" aria-label="Buscar empresa" />
              </div>
              <div class="empresa-options" id="modEmpresaOptions-${sc}">
                ${hideAll ? "" : `
                <button type="button" class="empresa-option${selected === "all" ? " active" : ""}" data-mod-empresa-opt="all" data-mod-empresa-scope="${sc}" data-code="" data-short="Todas as empresas" data-cnpj="">
                  <span class="opt-main">Todas as empresas</span>
                  <small>Mostra todas as empresas deste menu</small>
                </button>`}
                ${options}
              </div>
              <div class="empresa-empty" id="modEmpresaEmpty-${sc}" hidden>Nenhuma empresa encontrada</div>
            </div>
          </div>
        </div>`;
    }

    function filterModEmpresaOptions(scope, query) {
      const sc = scope || "clientes";
      const q = normalizeSearchText(query || "");
      let visible = 0;
      document.querySelectorAll(`#modEmpresaOptions-${sc} .empresa-option`).forEach((opt) => {
        const blob = normalizeSearchText([
          opt.dataset.short || "",
          opt.dataset.code || "",
          opt.dataset.cnpj || "",
          opt.textContent || "",
        ].join(" "));
        const show = !q || blob.includes(q) || opt.dataset.modEmpresaOpt === "all";
        opt.classList.toggle("hidden", !show);
        if (show) visible += 1;
      });
      const empty = document.getElementById(`modEmpresaEmpty-${sc}`);
      if (empty) empty.hidden = visible > 0;
    }

    function setModuleEmpresaFilter(scope, id, { silentToast } = {}) {
      const next = id || "all";
      const c = next !== "all" ? CLIENTES.find((x) => x.id === next) : null;
      const label = c ? (c.fantasia || c.nome || c.short) : "Todas as empresas";
      if (scope === "perfil") {
        if (!c) return;
        document.getElementById(`modEmpresaWrap-${scope}`)?.classList.remove("open");
        if (cliPerfilId === next) {
          if (!silentToast) toast(`Empresa: ${label}`);
          return;
        }
        bumpRecentClient(c.id);
        cliPerfilId = c.id;
        if (typeof renderClientes === "function") renderClientes();
        if (!silentToast) toast(`Empresa: ${label}`);
        return;
      }
      if (scope === "clientes") cliEmpresaFilter = next;
      else if (scope === "processos") procEmpresaFilter = next;
      else if (scope === "seguranca") {
        secEmpresaFilter = next;
        securityCertFilterClienteId = next !== "all" ? next : null;
      } else if (scope === "agenda") agendaEmpresaFilter = next;
      document.getElementById(`modEmpresaWrap-${scope}`)?.classList.remove("open");
      if (scope === "clientes" && typeof renderClientesList === "function") renderClientesList();
      else if (scope === "processos" && typeof renderProcessos === "function") renderProcessos();
      else if (scope === "seguranca" && typeof renderSegurancaCertificados === "function") renderSegurancaCertificados();
      else if (scope === "agenda" && typeof renderAgenda === "function") renderAgenda();
      if (!silentToast) toast(next === "all" ? "Filtro: todas as empresas" : `Filtro: ${label}`);
    }

    function selectEmpresaFromOption(opt, { silentToast, keepFilter } = {}) {
      if (!keepFilter) chipListFilter = null;
      document.querySelectorAll("#empresaOptions .empresa-option").forEach((o) => o.classList.remove("active"));
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
      document.getElementById("empresaWrap")?.classList.remove("open");
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
        imp: ids.reduce((acc, id) => acc + (empresaMetrics[id].faturamentoMensal[i].imp || 0), 0),
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

    function getDashEmpresaLabel() {
      if (selectedEmpresaId === "all") return "Todas as empresas";
      const c = CLIENTES.find((x) => x.id === selectedEmpresaId);
      return c?.fantasia || c?.nome || "Empresa";
    }

    function renderDashHero(data) {
      const periodLab = data._periodLabel || getDashPeriodDisplayLabel();
      const empresa = getDashEmpresaLabel();
      const pendencias = typeof buildDashPendencias === "function" ? buildDashPendencias() : [];
      const n = pendencias.length;
      const title = document.getElementById("dashHeroTitle");
      const sub = document.getElementById("dashHeroSub");
      const badge = document.getElementById("dashHeroBadge");
      if (title) title.textContent = "Visão Geral";
      if (sub) {
        sub.textContent = selectedEmpresaId === "all"
          ? `Carteira consolidada · ${periodLab} · ${n} pendência${n === 1 ? "" : "s"}`
          : `${empresa} · ${periodLab} · ${n} pendência${n === 1 ? "" : "s"}`;
      }
      if (badge) badge.textContent = periodLab;
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

      renderDashHero(data);

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
        /* Barras: atual · anterior · imposto pago */
        const w = 640;
        const h = 130;
        const pad = { t: 22, r: 8, b: 20, l: 8 };
        const plotW = w - pad.l - pad.r;
        const plotH = h - pad.t - pad.b;
        const maxY = Math.max(...months.flatMap((m) => [m.atual, m.ant, m.imp || 0]), 1) * 1.12;
        const n = months.length;
        const groupW = plotW / n;
        const barW = Math.min(12, groupW * 0.2);
        const gap = 2.5;
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
          const totalBarsW = barW * 3 + gap * 2;
          const x0 = cx - totalBarsW / 2;
          const xAnt = x0;
          const xAtual = x0 + barW + gap;
          const xImp = x0 + (barW + gap) * 2;
          const yAnt = yAt(m.ant);
          const yAtual = yAt(m.atual);
          const yImp = yAt(m.imp || 0);
          const hAnt = pad.t + plotH - yAnt;
          const hAtual = pad.t + plotH - yAtual;
          const hImp = pad.t + plotH - yImp;
          const delay = 0.05 + i * 0.06;
          return `
            <g data-fat-i="${i}">
              <rect class="bar-hit" x="${(cx - groupW / 2).toFixed(1)}" y="${pad.t}" width="${groupW.toFixed(1)}" height="${plotH}" data-fat-i="${i}" />
              <rect class="bar-anterior" x="${xAnt.toFixed(1)}" y="${yAnt.toFixed(1)}" width="${barW}" height="${Math.max(2, hAnt).toFixed(1)}" style="animation-delay:${delay}s" data-fat-i="${i}" />
              <rect class="bar-atual" x="${xAtual.toFixed(1)}" y="${yAtual.toFixed(1)}" width="${barW}" height="${Math.max(2, hAtual).toFixed(1)}" style="animation-delay:${delay + 0.05}s" data-fat-i="${i}" />
              <rect class="bar-imposto" x="${xImp.toFixed(1)}" y="${yImp.toFixed(1)}" width="${barW}" height="${Math.max(2, hImp).toFixed(1)}" style="animation-delay:${delay + 0.1}s" data-fat-i="${i}" />
              <text class="val" x="${cx.toFixed(1)}" y="${(yAtual - 6).toFixed(1)}" text-anchor="middle">${fmtMes(m.atual)}</text>
              <text class="lbl" x="${cx.toFixed(1)}" y="${h - 6}">${m.m}</text>
            </g>`;
        }).join("");

        lineHost.innerHTML = `
          <div class="line-chart-legend">
            <span class="atual">Atual</span>
            <span class="anterior">Período anterior</span>
            <span class="imposto">Imposto pago</span>
          </div>
          <div class="line-chart-tooltip" id="dashFatTooltip" hidden></div>
          <svg class="line-chart bar-chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Gráfico de barras do faturamento e imposto">
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
            <div class="row"><span>Anterior</span><b>${fmtMes(m.ant)}</b></div>
            <div class="row"><span>Imposto pago</span><b>${fmtMes(m.imp || 0)}</b></div>`;
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

