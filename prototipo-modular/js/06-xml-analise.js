    /* —— Extrator XML · Análise de Notas Fiscais (Acesso ao Cliente) —— */

    function xmlOnlyDigits(v) {
      return String(v || "").replace(/\D/g, "");
    }

    function xmlFormatCnpj(digits) {
      const d = xmlOnlyDigits(digits).slice(0, 14);
      if (d.length !== 14) return d;
      return d.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    }

    function xmlValidCnpj(digits) {
      const c = xmlOnlyDigits(digits);
      if (c.length !== 14 || /^(\d)\1+$/.test(c)) return false;
      const calc = (base, factors) => {
        let sum = 0;
        for (let i = 0; i < factors.length; i++) sum += Number(base[i]) * factors[i];
        const mod = sum % 11;
        return mod < 2 ? 0 : 11 - mod;
      };
      const d1 = calc(c, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
      const d2 = calc(c, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
      if (d1 === Number(c[12]) && d2 === Number(c[13])) return true;
      /* Protótipo: aceita CNPJs seed dos clientes (DV fictício no dataset) */
      return (typeof CLIENTES !== "undefined") && CLIENTES.some((x) => xmlOnlyDigits(x.cnpj) === c);
    }

    /** Escala monetária em centavos (evita float) */
    function xmlToCents(n) {
      const x = Number(String(n).replace(",", "."));
      if (!Number.isFinite(x)) return 0;
      return Math.round(x * 100);
    }

    function xmlFromCents(c) {
      return (Number(c) || 0) / 100;
    }

    function xmlMoney(cents) {
      return money(xmlFromCents(cents));
    }

    function xmlPct(num, den) {
      if (!den) return 0;
      return Math.round((num * 10000) / den) / 100;
    }

    function xmlPctLabel(p) {
      return `${String(p).replace(".", ",")}%`;
    }

    function ensureCliXmlAnalise(c) {
      if (!cliXmlAnalise.cnpj && c?.cnpj) {
        cliXmlAnalise.cnpj = xmlOnlyDigits(c.cnpj);
      }
      if (!cliXmlAnalise._seed) {
        cliXmlAnalise._seed = buildCliXmlAnaliseSeed(c);
      }
      if (!cliXmlAnalise._simReady) {
        applyCliXmlSimulacaoPreAprovada(c, { silent: true });
      }
      return cliXmlAnalise;
    }

    function applyCliXmlSimulacaoPreAprovada(c, opts = {}) {
      const st = cliXmlAnalise;
      if (st.import?.timer) {
        clearInterval(st.import.timer);
        st.import.timer = null;
      }
      if (!st.cnpj && c?.cnpj) st.cnpj = xmlOnlyDigits(c.cnpj);
      if (!st._seed) st._seed = buildCliXmlAnaliseSeed(c);
      st.imported = true;
      st._simReady = true;
      st.tab = opts.keepTab ? st.tab : (opts.tab || "dashboard");
      st.import = {
        running: false,
        pct: 100,
        phase: "Concluído · simulação pré-aprovada",
        filesTotal: 48,
        filesOk: 42,
        filesDup: 3,
        filesBad: 1,
        filesSkip: 2,
        logs: [
          { when: "09:40:12", level: "info", msg: `Lote demo · CNPJ ${xmlOnlyDigits(st.cnpj)} · 48 arquivos` },
          { when: "09:40:18", level: "info", msg: "Leitura recursiva de pastas/ZIP concluída" },
          { when: "09:40:22", level: "bad", msg: "1 arquivo corrompido isolado — lote continua" },
          { when: "09:40:28", level: "warn", msg: "3 duplicidades removidas (chave NF-e + hash)" },
          { when: "09:40:35", level: "info", msg: "Classificação Entrada/Saída × CFOP aplicada" },
          { when: "09:40:41", level: "warn", msg: "2 notas canceladas excluídas dos totais" },
          { when: "09:40:48", level: "warn", msg: "Conflito potencial CNPJ×CFOP registrado (não bloqueante)" },
          { when: "09:40:55", level: "ok", msg: "Esteira finalizada · 42 válidos · base gerencial pronta" },
        ],
        timer: null,
      };
      if (!opts.silent) {
        toast("Simulação pré-aprovada carregada — dashboard disponível", { success: true });
      }
    }

    function buildCliXmlAnaliseSeed(c) {
      const cnpj = xmlOnlyDigits(c?.cnpj || "00000000000100");
      const cfg = cliXmlAnalise.config;
      const produtos = [
        {
          id: "xp1",
          nome: "Medicamento Genérico X 500mg",
          codigo: "MED-X500",
          ncm: "30049099",
          cfopCompra: "1102",
          cfopVenda: "5102",
          cst: "00",
          regime: "Simples Nacional",
          fornecedor: "Farma Distribuidora Sul",
          clientePrincipal: "Consumidor final",
          qtdCompra: 420,
          qtdVenda: 310,
          custoDocCents: 1850,
          acrescimosCents: 40,
          descontosCents: 20,
          creditoCents: 95,
          precoVendaCents: 2490,
          tribEntradaCents: 180,
          tribSaidaCents: 210,
        },
        {
          id: "xp2",
          nome: "Kit Higiene Promo",
          codigo: "KIT-HIG",
          ncm: "34011900",
          cfopCompra: "1102",
          cfopVenda: "5102",
          cst: "102",
          regime: "Simples Nacional",
          fornecedor: "Higiene Brasil LTDA",
          clientePrincipal: "Loja Centro",
          qtdCompra: 180,
          qtdVenda: 165,
          custoDocCents: 980,
          acrescimosCents: 15,
          descontosCents: 30,
          creditoCents: 40,
          precoVendaCents: 1290,
          tribEntradaCents: 70,
          tribSaidaCents: 85,
        },
        {
          id: "xp3",
          nome: "Suplemento Vita Plus",
          codigo: "VITA-P",
          ncm: "21069090",
          cfopCompra: "1403",
          cfopVenda: "5405",
          cst: "60",
          regime: "Lucro Presumido",
          fornecedor: "Nutri Supply",
          clientePrincipal: "Consumidor final",
          qtdCompra: 90,
          qtdVenda: 72,
          custoDocCents: 3200,
          acrescimosCents: 0,
          descontosCents: 50,
          creditoCents: 160,
          precoVendaCents: 4590,
          tribEntradaCents: 290,
          tribSaidaCents: 410,
        },
        {
          id: "xp4",
          nome: "Fralda Confort P",
          codigo: "FRA-P",
          ncm: "96190000",
          cfopCompra: "1102",
          cfopVenda: "5102",
          cst: "00",
          regime: "Simples Nacional",
          fornecedor: "Baby Care Atacado",
          clientePrincipal: "Consumidor final",
          qtdCompra: 240,
          qtdVenda: 198,
          custoDocCents: 2750,
          acrescimosCents: 60,
          descontosCents: 0,
          creditoCents: 110,
          precoVendaCents: 2890,
          tribEntradaCents: 220,
          tribSaidaCents: 195,
        },
        {
          id: "xp5",
          nome: "Álcool Gel 500ml",
          codigo: "ALC-500",
          ncm: "38089419",
          cfopCompra: "1102",
          cfopVenda: "5102",
          cst: "102",
          regime: "Simples Nacional",
          fornecedor: "Higiene Brasil LTDA",
          clientePrincipal: "Consumidor final",
          qtdCompra: 500,
          qtdVenda: 0,
          custoDocCents: 620,
          acrescimosCents: 0,
          descontosCents: 10,
          creditoCents: 25,
          precoVendaCents: 0,
          tribEntradaCents: 45,
          tribSaidaCents: 0,
        },
        {
          id: "xp6",
          nome: "Dipirona Sódica 1g",
          codigo: "DIP-1G",
          ncm: "30049069",
          cfopCompra: "1102",
          cfopVenda: "5102",
          cst: "00",
          regime: "Simples Nacional",
          fornecedor: "Farma Distribuidora Sul",
          clientePrincipal: "Consumidor final",
          qtdCompra: 600,
          qtdVenda: 540,
          custoDocCents: 410,
          acrescimosCents: 5,
          descontosCents: 0,
          creditoCents: 18,
          precoVendaCents: 690,
          tribEntradaCents: 32,
          tribSaidaCents: 48,
        },
        {
          id: "xp7",
          nome: "Termômetro Digital",
          codigo: "TERM-D",
          ncm: "90251990",
          cfopCompra: "2102",
          cfopVenda: "6102",
          cst: "00",
          regime: "Lucro Presumido",
          fornecedor: "MedTech Import",
          clientePrincipal: "Clínica Oeste",
          qtdCompra: 40,
          qtdVenda: 28,
          custoDocCents: 8900,
          acrescimosCents: 200,
          descontosCents: 100,
          creditoCents: 450,
          precoVendaCents: 12990,
          tribEntradaCents: 980,
          tribSaidaCents: 1450,
        },
        {
          id: "xp8",
          nome: "Máscara Cirúrgica cx/50",
          codigo: "MASC-50",
          ncm: "63079010",
          cfopCompra: "1102",
          cfopVenda: "5102",
          cst: "102",
          regime: "Simples Nacional",
          fornecedor: "Higiene Brasil LTDA",
          clientePrincipal: "Consumidor final",
          qtdCompra: 120,
          qtdVenda: 95,
          custoDocCents: 1450,
          acrescimosCents: 0,
          descontosCents: 40,
          creditoCents: 55,
          precoVendaCents: 1680,
          tribEntradaCents: 90,
          tribSaidaCents: 105,
        },
      ];

      const notas = [
        { chave: "35260700000000000100550010000012341000012345", numero: "1234", serie: "1", data: "02/07/2026", emitente: "Farma Distribuidora Sul", destinatario: c?.fantasia || "Cliente", tipo: "entrada", qtd: 100, valorCents: 185000, tribCents: 18000, produtoId: "xp1", cancelada: false },
        { chave: "35260700000000000100550010000012991000012990", numero: "1299", serie: "1", data: "08/07/2026", emitente: c?.fantasia || "Cliente", destinatario: "Consumidor final", tipo: "saida", qtd: 80, valorCents: 199200, tribCents: 16800, produtoId: "xp1", cancelada: false },
        { chave: "35260700000000000100550010000008811000008811", numero: "881", serie: "1", data: "01/07/2026", emitente: "Baby Care Atacado", destinatario: c?.fantasia || "Cliente", tipo: "entrada", qtd: 60, valorCents: 165000, tribCents: 13200, produtoId: "xp4", cancelada: false },
        { chave: "35260700000000000100550010000008821000008822", numero: "882", serie: "1", data: "01/07/2026", emitente: c?.fantasia || "Cliente", destinatario: "Consumidor final", tipo: "saida", qtd: 40, valorCents: 115600, tribCents: 7800, produtoId: "xp4", cancelada: true },
        { chave: "35260700000000000100550010000021021000021021", numero: "2102", serie: "1", data: "11/07/2026", emitente: c?.fantasia || "Cliente", destinatario: "Consumidor final", tipo: "saida", qtd: 120, valorCents: 82800, tribCents: 5760, produtoId: "xp6", cancelada: false },
        { chave: "35260700000000000100550010000004561000004560", numero: "456", serie: "1", data: "05/07/2026", emitente: "Higiene Brasil LTDA", destinatario: c?.fantasia || "Cliente", tipo: "entrada", qtd: 200, valorCents: 124000, tribCents: 9000, produtoId: "xp2", cancelada: false },
        { chave: "35260700000000000100550010000031001000031001", numero: "3100", serie: "1", data: "12/07/2026", emitente: c?.fantasia || "Cliente", destinatario: "Loja Centro", tipo: "saida", qtd: 90, valorCents: 116100, tribCents: 7650, produtoId: "xp2", cancelada: false },
        { chave: "35260700000000000100550010000007771000007770", numero: "777", serie: "1", data: "03/07/2026", emitente: "Nutri Supply", destinatario: c?.fantasia || "Cliente", tipo: "entrada", qtd: 40, valorCents: 128000, tribCents: 11600, produtoId: "xp3", cancelada: false },
      ];

      return { cnpjEmpresa: cnpj, produtos, notas, cfgSnapshot: { ...cfg } };
    }

    function xmlCustoEfetivoCents(p) {
      return (p.custoDocCents || 0) + (p.acrescimosCents || 0) - (p.descontosCents || 0) - (p.creditoCents || 0);
    }

    function xmlCustoOpPct(cfg) {
      return (cfg.adminPct || 0) + (cfg.financeiroPct || 0) + (cfg.comissaoPct || 0)
        + (cfg.fretePct || 0) + (cfg.perdasPct || 0) + (cfg.outrosPct || 0);
    }

    function xmlCalcProduto(p, cfg) {
      const cef = xmlCustoEfetivoCents(p);
      const pv = p.precoVendaCents || 0;
      const semVenda = !p.qtdVenda || pv <= 0;
      const mbCents = pv - cef;
      const mbPct = pv > 0 ? xmlPct(mbCents, pv) : 0;
      const tsCents = p.tribSaidaCents || 0;
      const copCents = Math.round(pv * xmlCustoOpPct(cfg) / 100);
      const mlCents = pv - cef - tsCents - copCents;
      const mlPct = pv > 0 ? xmlPct(mlCents, pv) : 0;
      const lucroAlvo = (cfg.lucroDesejadoPct || 0) / 100;
      const copPct = xmlCustoOpPct(cfg) / 100;
      const tribSaidaPct = pv > 0 ? (tsCents / pv) : 0.08;
      const denom = 1 - lucroAlvo - copPct - tribSaidaPct;
      const pIdeal = denom > 0.05 ? Math.round(cef / denom) : Math.round(cef * 1.35);
      const reajustePct = pv > 0 ? xmlPct(pIdeal - pv, pv) : 0;
      const cargaEntradaPct = cef > 0 ? xmlPct(p.tribEntradaCents || 0, cef) : 0;

      let status = "saudavel";
      if (semVenda) status = "sem-venda";
      else if (mlPct < 0) status = "prejuizo";
      else if (mlPct < (cfg.margemMinPct || 0)) status = "baixa";
      else if (mlPct < (cfg.margemAtencaoPct || 0)) status = "atencao";
      else status = "saudavel";

      return {
        cef, pv, mbCents, mbPct, tsCents, copCents, mlCents, mlPct,
        pIdeal, reajustePct, cargaEntradaPct, status, semVenda,
        totalCompraCents: cef * (p.qtdCompra || 0),
        totalVendaCents: pv * (p.qtdVenda || 0),
        tribEntradaTotalCents: (p.tribEntradaCents || 0) * (p.qtdCompra || 0),
        tribSaidaTotalCents: tsCents * (p.qtdVenda || 0),
      };
    }

    function xmlStatusMeta(status) {
      const map = {
        "sem-venda": { label: "Sem venda", cls: "muted" },
        prejuizo: { label: "Prejuízo", cls: "bad" },
        baixa: { label: "Baixa", cls: "warn" },
        atencao: { label: "Atenção", cls: "warn2" },
        saudavel: { label: "Saudável", cls: "ok" },
      };
      return map[status] || map.saudavel;
    }

    /** Comparativo visual compra × venda (lista, resumo e detalhe). */
    function renderCliXmlCompraVendaVisual({
      compraCents = 0,
      vendaCents = 0,
      qtdCompra = null,
      qtdVenda = null,
      compact = false,
      title = "Compra vs. Venda",
      hint = "Comparativo do recorte atual",
    } = {}) {
      const max = Math.max(compraCents, vendaCents, 1);
      const compraW = Math.max(4, Math.round((compraCents / max) * 100));
      const vendaW = Math.max(vendaCents > 0 ? 4 : 0, Math.round((vendaCents / max) * 100));
      const diff = vendaCents - compraCents;
      const diffCls = vendaCents <= 0 ? "muted" : (diff < 0 ? "neg" : "ok");
      const diffLabel = vendaCents <= 0
        ? "Sem venda no período"
        : `${diff >= 0 ? "+" : "−"}${xmlMoney(Math.abs(diff))}`;
      const metaCompra = qtdCompra != null ? `${qtdCompra} un` : "Entrada";
      const metaVenda = qtdVenda != null
        ? (qtdVenda > 0 ? `${qtdVenda} un` : "Sem saída")
        : "Saída";
      return `
        <article class="cli-xml-cv${compact ? " is-compact" : ""}" aria-label="${uiSelectEscape(title)}">
          ${compact ? "" : `
            <div class="cli-xml-cv-head">
              <div>
                <h4>${uiSelectEscape(title)}</h4>
                <p class="hint">${uiSelectEscape(hint)}</p>
              </div>
              <div class="cli-xml-cv-diff is-${diffCls}">
                <span class="lab">Resultado bruto</span>
                <strong>${diffLabel}</strong>
              </div>
            </div>`}
          <div class="cli-xml-cv-sides">
            <div class="cli-xml-cv-side is-compra">
              <span class="lab">Compra</span>
              <strong>${xmlMoney(compraCents)}</strong>
              <span class="meta">${uiSelectEscape(metaCompra)}</span>
            </div>
            <div class="cli-xml-cv-side is-venda">
              <span class="lab">Venda</span>
              <strong>${vendaCents > 0 ? xmlMoney(vendaCents) : "—"}</strong>
              <span class="meta">${uiSelectEscape(metaVenda)}</span>
            </div>
          </div>
          <div class="cli-xml-cv-bars" aria-hidden="true">
            <div class="row is-compra">
              <span>Compra</span>
              <div class="track"><i style="width:${compraW}%"></i></div>
            </div>
            <div class="row is-venda">
              <span>Venda</span>
              <div class="track"><i style="width:${vendaW}%"></i></div>
            </div>
          </div>
          ${compact ? `<p class="cli-xml-cv-compact-diff is-${diffCls}">${diffLabel}</p>` : ""}
        </article>`;
    }

    function renderCliXmlCvMiniBars(compraCents, vendaCents) {
      const max = Math.max(compraCents, vendaCents, 1);
      const compraW = Math.max(3, Math.round((compraCents / max) * 100));
      const vendaW = Math.max(vendaCents > 0 ? 3 : 0, Math.round((vendaCents / max) * 100));
      return `
        <div class="cli-xml-cv-mini" title="Compra ${xmlMoney(compraCents)} · Venda ${vendaCents > 0 ? xmlMoney(vendaCents) : "—"}" aria-label="Comparativo compra e venda">
          <span class="seg is-compra" style="width:${compraW}%"></span>
          <span class="seg is-venda" style="width:${vendaW}%"></span>
        </div>`;
    }

    function getCliXmlProdutosCalc(c) {
      const st = ensureCliXmlAnalise(c);
      const seed = st._seed;
      const cfg = st.config;
      return seed.produtos.map((p) => ({ ...p, calc: xmlCalcProduto(p, cfg) }));
    }

    function getCliXmlDashboardKpis(c) {
      const list = getCliXmlProdutosCalc(c);
      const seed = ensureCliXmlAnalise(c)._seed;
      const notasValidas = seed.notas.filter((n) => !n.cancelada);
      let totalCompra = 0;
      let totalVenda = 0;
      let impEntrada = 0;
      let impSaida = 0;
      list.forEach((p) => {
        totalCompra += p.calc.totalCompraCents;
        totalVenda += p.calc.totalVendaCents;
        impEntrada += p.calc.tribEntradaTotalCents;
        impSaida += p.calc.tribSaidaTotalCents;
      });
      const lucroBruto = totalVenda - totalCompra;
      const cfg = cliXmlAnalise.config;
      const copTotal = Math.round(totalVenda * xmlCustoOpPct(cfg) / 100);
      const lucroLiq = totalVenda - totalCompra - impSaida - copTotal;
      const margemNeg = list.filter((p) => p.calc.status === "prejuizo").length;
      const abaixoMin = list.filter((p) => p.calc.status === "baixa" || p.calc.status === "prejuizo").length;
      return {
        totalCompra, totalVenda, impEntrada, impSaida, lucroBruto, lucroLiq, margemNeg, abaixoMin,
        notasOk: notasValidas.length,
        notasCanceladas: seed.notas.length - notasValidas.length,
      };
    }

    function filterCliXmlProdutos(c) {
      const f = ensureCliXmlAnalise(c).filtros;
      const q = normalizeSearchText(f.q || "");
      return getCliXmlProdutosCalc(c).filter((p) => {
        if (q && !normalizeSearchText(`${p.nome} ${p.codigo} ${p.ncm}`).includes(q)) return false;
        if (f.ncm && !String(p.ncm).includes(f.ncm)) return false;
        if (f.cfop && p.cfopCompra !== f.cfop && p.cfopVenda !== f.cfop) return false;
        if (f.fornecedor && !normalizeSearchText(p.fornecedor).includes(normalizeSearchText(f.fornecedor))) return false;
        if (f.cliente && !normalizeSearchText(p.clientePrincipal).includes(normalizeSearchText(f.cliente))) return false;
        if (f.regime && p.regime !== f.regime) return false;
        if (f.status && p.calc.status !== f.status) return false;
        if (f.margem === "neg" && p.calc.mlPct >= 0) return false;
        if (f.margem === "pos" && (p.calc.semVenda || p.calc.mlPct < 0)) return false;
        if (f.margem === "sem" && !p.calc.semVenda) return false;
        return true;
      });
    }

    function destroyCliXmlCharts() {
      (cliXmlAnalise.charts || []).forEach((ch) => {
        try { ch.destroy(); } catch (_) { /* ignore */ }
      });
      cliXmlAnalise.charts = [];
    }

    function renderCliXmlAnaliseModule(c) {
      ensureCliXmlAnalise(c);
      const tabs = [
        { id: "importar", label: "Importar" },
        { id: "dashboard", label: "Dashboard" },
        { id: "produtos", label: "Produtos" },
        { id: "config", label: "Configurações" },
      ];
      const tab = cliXmlAnalise.tab;
      let body = "";
      if (tab === "importar") body = renderCliXmlImportTab(c);
      else if (tab === "dashboard") body = renderCliXmlDashboardTab(c);
      else if (tab === "produtos") body = renderCliXmlProdutosTab(c);
      else body = renderCliXmlConfigTab(c);

      return `
        <div class="cli-xml-mod" data-cli-xml-mod="1">
          <div class="cli-xml-mod-head">
            <div>
              <p class="kicker">Extrator XML · Análise gerencial</p>
              <h3>Análise de Notas Fiscais</h3>
              <p class="sub">Foco analítico — não substitui escrituração ou apuração fiscal oficial.</p>
            </div>
            <div class="cli-xml-mod-badge">
              <span class="cli-xml-pill">${cliXmlAnalise.imported ? "Base carregada" : "Aguardando importação"}</span>
            </div>
          </div>
          <div class="cli-xml-mod-tabs" role="tablist" aria-label="Módulo XML">
            ${tabs.map((t) => `
              <button type="button" role="tab" class="${tab === t.id ? "active" : ""}" aria-selected="${tab === t.id}" data-cli-xml-tab="${t.id}">${t.label}</button>
            `).join("")}
          </div>
          <div class="cli-xml-mod-body">${body}</div>
        </div>`;
    }

    function renderCliXmlImportTab(c) {
      const st = ensureCliXmlAnalise(c);
      const imp = st.import;
      const cnpjDigits = xmlOnlyDigits(st.cnpj || c?.cnpj || "");
      const cnpjOk = xmlValidCnpj(cnpjDigits);
      const cnpjShow = cnpjDigits.length === 14 ? xmlFormatCnpj(cnpjDigits) : (cnpjDigits || "—");

      return `
        <section class="cli-xml-import" aria-label="Importação de XMLs">
          <div class="cli-xml-import-grid">
            <div class="cli-xml-card cli-xml-rules">
              <div class="cli-xml-card-inner">
                <h4>1. Regras de classificação automática</h4>
                <p class="hint">CNPJ do cliente · ${uiSelectEscape(cnpjShow)} · usado para Entrada/Saída sem preenchimento manual.</p>
                <ul>
                  <li><strong>Entrada/Compra</strong> — CNPJ analisado como destinatário + CFOP de entrada</li>
                  <li><strong>Saída/Venda</strong> — CNPJ analisado como emitente + CFOP de saída</li>
                  <li><strong>Deduplicação</strong> — chave de acesso da NF-e + hash do arquivo</li>
                  <li><strong>Exclusões</strong> — notas canceladas e eventos sem efeito econômico fora dos totais</li>
                  <li><strong>Créditos</strong> — imposto destacado ≠ aumento automático de custo (créditos recuperáveis vs. não recuperáveis)</li>
                </ul>
              </div>
            </div>

            <div class="cli-xml-card cli-xml-card-upload">
              <div class="cli-xml-card-inner">
                <h4>2. Upload multiformato</h4>
                <p class="hint">XML individual, pasta estruturada ou ZIP (leitura recursiva de subpastas).</p>
                <div class="cli-xml-drop" data-cli-xml="drop-zone" tabindex="0" role="button" aria-label="Área de upload de XMLs">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/></svg>
                  <strong>Arraste XMLs ou ZIP aqui</strong>
                  <span>ou clique para selecionar · .xml · .zip</span>
                  <input type="file" id="cliXmlFileInput" accept=".xml,.zip,application/zip,text/xml" multiple hidden />
                </div>
                <div class="cli-xml-import-acts">
                  <button type="button" class="btn-primary" data-cli-xml="start-import" ${!cnpjOk || imp.running ? "disabled" : ""}>Iniciar esteira</button>
                  <button type="button" class="btn-ghost" data-cli-xml="demo-lote" ${imp.running ? "disabled" : ""}>Simular lote demo</button>
                </div>
              </div>
            </div>
          </div>

          <div class="cli-xml-card cli-xml-esteira" ${imp.running || imp.logs.length ? "" : "hidden"}>
            <div class="cli-xml-esteira-top">
              <div>
                <h4>Esteira de processamento</h4>
                <p class="hint">${uiSelectEscape(imp.phase || "Aguardando…")} · assíncrono (UI não bloqueada)</p>
              </div>
              <strong class="cli-xml-esteira-pct">${Math.round(imp.pct)}%</strong>
            </div>
            <div class="cli-xml-esteira-bar" aria-hidden="true"><i style="width:${Math.min(100, imp.pct)}%"></i></div>
            <div class="cli-xml-esteira-counters">
              <span class="ok"><b>${imp.filesOk}</b> válidos</span>
              <span class="dup"><b>${imp.filesDup}</b> duplicados</span>
              <span class="bad"><b>${imp.filesBad}</b> corrompidos</span>
              <span class="skip"><b>${imp.filesSkip}</b> sem efeito econômico</span>
              <span><b>${imp.filesTotal}</b> no lote</span>
            </div>
            <div class="cli-xml-log-wrap">
              <h5>Trilha de auditoria</h5>
              <ul class="cli-xml-log" id="cliXmlImportLog">
                ${imp.logs.slice().reverse().map((l) => `
                  <li class="is-${l.level || "info"}">
                    <time>${uiSelectEscape(l.when)}</time>
                    <span>${uiSelectEscape(l.msg)}</span>
                  </li>`).join("") || `<li class="is-info"><span>Sem eventos ainda</span></li>`}
              </ul>
            </div>
          </div>
        </section>`;
    }

    function renderCliXmlDashboardTab(c) {
      if (!cliXmlAnalise.imported) {
        return `
          <div class="cli-xml-empty">
            <h4>Dashboard aguardando base</h4>
            <p>Importe XMLs na aba Importar para consolidar indicadores do período.</p>
            <button type="button" class="btn-primary" data-cli-xml-tab="importar">Ir para Importar</button>
          </div>`;
      }
      const k = getCliXmlDashboardKpis(c);
      const list = getCliXmlProdutosCalc(c);
      const cards = [
        { lab: "Total Comprado", val: xmlMoney(k.totalCompra), mem: "Σ (Custo efetivo × qtd comprada) das notas de entrada válidas", tone: "" },
        { lab: "Total Vendido", val: xmlMoney(k.totalVenda), mem: "Σ (Preço praticado × qtd vendida) das saídas não canceladas", tone: "" },
        { lab: "Impostos na Entrada", val: xmlMoney(k.impEntrada), mem: "Tributos destacados nas entradas · créditos elegíveis tratados no C_ef", tone: "tax" },
        { lab: "Impostos na Saída", val: xmlMoney(k.impSaida), mem: "Tributos de saída (T_s) descontados na margem líquida estimada", tone: "tax" },
        { lab: "Lucro Bruto", val: xmlMoney(k.lucroBruto), mem: "Total vendido − Total comprado (sem T_s nem C_op)", tone: k.lucroBruto < 0 ? "neg" : "ok" },
        { lab: "Lucro Líquido Estimado", val: xmlMoney(k.lucroLiq), mem: "Vendas − compras − T_s − custos operacionais configurados", tone: k.lucroLiq < 0 ? "neg" : "ok" },
        { lab: "Produtos c/ Margem Negativa", val: String(k.margemNeg), mem: "Contagem com margem líquida < 0% (exclui Sem venda)", tone: k.margemNeg ? "neg" : "" },
        { lab: "Produtos Abaixo do Mínimo", val: String(k.abaixoMin), mem: "Status Prejuízo ou Baixa vs. margem mínima configurada", tone: k.abaixoMin ? "warn" : "" },
      ];

      return `
        <section class="cli-xml-dash" aria-label="Dashboard geral">
          <div class="cli-xml-dash-note">
            Período ${uiSelectEscape(cliXmlAnalise.filtros.de)} → ${uiSelectEscape(cliXmlAnalise.filtros.ate)}
            · ${k.notasOk} notas com efeito econômico · ${k.notasCanceladas} canceladas excluídas
          </div>
          <div class="cli-xml-kpi-grid">
            ${cards.map((card) => `
              <article class="cli-xml-kpi ${card.tone ? `is-${card.tone}` : ""}" title="${uiSelectEscape(card.mem)}">
                <p class="lab">${uiSelectEscape(card.lab)}</p>
                <p class="val">${card.val}</p>
                <p class="mem">${uiSelectEscape(card.mem)}</p>
              </article>`).join("")}
          </div>
          <div class="cli-xml-charts">
            <article class="cli-xml-chart-card">
              <h4>Produtos mais vendidos</h4>
              <p class="hint">R$ e volume no período</p>
              <div id="cliXmlChartTop" class="cli-xml-chart"></div>
            </article>
            <article class="cli-xml-chart-card">
              <h4>Menor margem líquida</h4>
              <p class="hint">Ordenado pela margem líquida real</p>
              <div id="cliXmlChartMargem" class="cli-xml-chart"></div>
            </article>
            <article class="cli-xml-chart-card">
              <h4>Compra vs. Venda</h4>
              <p class="hint">Comparativo consolidado</p>
              <div id="cliXmlChartComp" class="cli-xml-chart"></div>
            </article>
            <article class="cli-xml-chart-card">
              <h4>Carga tributária e evolução</h4>
              <p class="hint">Maior carga (%) · tendência da margem líquida</p>
              <div id="cliXmlChartTrib" class="cli-xml-chart"></div>
            </article>
          </div>
          <div class="cli-xml-mini-tables">
            <div>
              <h5>Top vendas (volume)</h5>
              <ul>${[...list].filter((p) => p.qtdVenda).sort((a, b) => b.qtdVenda - a.qtdVenda).slice(0, 4).map((p) => `
                <li><span>${uiSelectEscape(p.nome)}</span><b>${p.qtdVenda} un · ${xmlMoney(p.calc.totalVendaCents)}</b></li>`).join("")}
              </ul>
            </div>
            <div>
              <h5>Menores margens</h5>
              <ul>${[...list].filter((p) => !p.calc.semVenda).sort((a, b) => a.calc.mlPct - b.calc.mlPct).slice(0, 4).map((p) => `
                <li><span>${uiSelectEscape(p.nome)}</span><b class="${p.calc.mlPct < 0 ? "neg" : ""}">${xmlPctLabel(p.calc.mlPct)}</b></li>`).join("")}
              </ul>
            </div>
          </div>
        </section>`;
    }

    function renderCliXmlProdutosTab(c) {
      if (!cliXmlAnalise.imported) {
        return `
          <div class="cli-xml-empty">
            <h4>Catálogo sem dados</h4>
            <p>Conclua a importação para consultar produtos e margens.</p>
            <button type="button" class="btn-primary" data-cli-xml-tab="importar">Ir para Importar</button>
          </div>`;
      }
      const f = cliXmlAnalise.filtros;
      const rows = filterCliXmlProdutos(c);
      return `
        <section class="cli-xml-produtos" aria-label="Catálogo de produtos">
          <div class="cli-xml-filters">
            <div class="proc-filter search">
              <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="search" id="cliXmlFiltroQ" placeholder="Buscar nome ou código…" value="${uiSelectEscape(f.q)}" aria-label="Buscar produto" />
            </div>
            <div class="proc-filter field">
              <input type="date" id="cliXmlFiltroDe" value="${uiSelectEscape(f.de)}" aria-label="De" title="De" />
            </div>
            <div class="proc-filter field">
              <input type="date" id="cliXmlFiltroAte" value="${uiSelectEscape(f.ate)}" aria-label="Até" title="Até" />
            </div>
            <div class="proc-filter field">
              <input type="text" id="cliXmlFiltroNcm" value="${uiSelectEscape(f.ncm)}" placeholder="NCM" aria-label="NCM" />
            </div>
            <div class="proc-filter field">
              <input type="text" id="cliXmlFiltroCfop" value="${uiSelectEscape(f.cfop)}" placeholder="CFOP" aria-label="CFOP" />
            </div>
            <div class="proc-filter field">
              <input type="text" id="cliXmlFiltroForn" value="${uiSelectEscape(f.fornecedor)}" placeholder="Fornecedor" aria-label="Fornecedor" />
            </div>
            <div class="proc-filter field">
              <input type="text" id="cliXmlFiltroCli" value="${uiSelectEscape(f.cliente)}" placeholder="Cliente" aria-label="Cliente" />
            </div>
            <div class="proc-filter field">
              <select id="cliXmlFiltroMargem" aria-label="Margem">
                <option value="">Margem · todas</option>
                <option value="sem" ${f.margem === "sem" ? "selected" : ""}>Sem venda</option>
                <option value="neg" ${f.margem === "neg" ? "selected" : ""}>Negativa</option>
                <option value="pos" ${f.margem === "pos" ? "selected" : ""}>Positiva</option>
              </select>
            </div>
            <div class="proc-filter field">
              <select id="cliXmlFiltroRegime" aria-label="Regime">
                <option value="">Regime · todos</option>
                <option value="Simples Nacional" ${f.regime === "Simples Nacional" ? "selected" : ""}>Simples Nacional</option>
                <option value="Lucro Presumido" ${f.regime === "Lucro Presumido" ? "selected" : ""}>Lucro Presumido</option>
              </select>
            </div>
            <div class="proc-filter field">
              <select id="cliXmlFiltroStatus" aria-label="Status">
                <option value="">Status · todos</option>
                <option value="sem-venda" ${f.status === "sem-venda" ? "selected" : ""}>Sem venda</option>
                <option value="prejuizo" ${f.status === "prejuizo" ? "selected" : ""}>Prejuízo</option>
                <option value="baixa" ${f.status === "baixa" ? "selected" : ""}>Baixa</option>
                <option value="atencao" ${f.status === "atencao" ? "selected" : ""}>Atenção</option>
                <option value="saudavel" ${f.status === "saudavel" ? "selected" : ""}>Saudável</option>
              </select>
            </div>
          </div>
          <div class="cli-xml-table-wrap">
            <table class="cli-xml-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>NCM</th>
                  <th>CFOP Compra</th>
                  <th>CST/CSOSN</th>
                  <th>Regime</th>
                  <th>Fornecedor</th>
                  <th class="num">Qtd. Compra</th>
                  <th class="num">Custo Unit.</th>
                  <th class="num">Total Compra</th>
                  <th class="num">Total Venda</th>
                  <th class="num">Tributos</th>
                  <th class="num">Carga Ent.</th>
                  <th class="num">Margem Líq.</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${rows.length ? rows.map((p) => {
                  const st = xmlStatusMeta(p.calc.status);
                  return `
                  <tr data-cli-xml-prod="${p.id}" tabindex="0" role="button">
                    <td><strong>${uiSelectEscape(p.nome)}</strong><small>${uiSelectEscape(p.codigo)}</small></td>
                    <td>${uiSelectEscape(p.ncm)}</td>
                    <td>${uiSelectEscape(p.cfopCompra)}</td>
                    <td>${uiSelectEscape(p.cst)}</td>
                    <td>${uiSelectEscape(p.regime)}</td>
                    <td>${uiSelectEscape(p.fornecedor)}</td>
                    <td class="num">${p.qtdCompra}</td>
                    <td class="num">${xmlMoney(p.calc.cef)}</td>
                    <td class="num">${xmlMoney(p.calc.totalCompraCents)}</td>
                    <td class="num">${p.calc.semVenda ? "—" : xmlMoney(p.calc.totalVendaCents)}</td>
                    <td class="num">${xmlMoney(p.calc.tribEntradaTotalCents)}</td>
                    <td class="num">${xmlPctLabel(p.calc.cargaEntradaPct)}</td>
                    <td class="num ${p.calc.semVenda ? "" : (p.calc.mlPct < 0 ? "neg" : "")}">${p.calc.semVenda ? "—" : xmlPctLabel(p.calc.mlPct)}</td>
                    <td><span class="cli-xml-status is-${st.cls}">${st.label}</span></td>
                  </tr>`;
                }).join("") : `<tr><td colspan="14"><div class="cli-empty-panel">Nenhum produto no filtro</div></td></tr>`}
              </tbody>
            </table>
          </div>
          <p class="cli-xml-legend">Clique em um produto para ver o comparativo compra × venda e a memória de cálculo. Status: Sem venda → Prejuízo → Baixa → Atenção → Saudável.</p>
        </section>`;
    }

    function renderCliXmlConfigTab(c) {
      const cfg = ensureCliXmlAnalise(c).config;
      const totalOp = xmlCustoOpPct(cfg);
      return `
        <section class="cli-xml-config" aria-label="Configurações de custos e margens">
          <p class="cli-xml-dash-note">Alterações recalculam estimativas da sessão sem sobrescrever histórico passado das notas.</p>
          <div class="cli-xml-config-grid">
            <div class="cli-xml-card">
              <h4>Custos operacionais (% sobre a venda)</h4>
              <div class="cli-xml-config-fields">
                ${[
                  ["adminPct", "Administrativo", cfg.adminPct],
                  ["financeiroPct", "Financeiro", cfg.financeiroPct],
                  ["comissaoPct", "Comissão", cfg.comissaoPct],
                  ["fretePct", "Frete", cfg.fretePct],
                  ["perdasPct", "Perdas/Quebras", cfg.perdasPct],
                  ["outrosPct", "Outros", cfg.outrosPct],
                ].map(([key, lab, val]) => `
                  <label class="cli-xml-field">
                    <span>${lab}</span>
                    <input type="number" step="0.1" min="0" max="100" data-cli-xml-cfg="${key}" value="${val}" />
                  </label>`).join("")}
              </div>
              <p class="cli-xml-field-msg is-ok">Total C_op: <strong>${xmlPctLabel(Math.round(totalOp * 100) / 100)}</strong></p>
            </div>
            <div class="cli-xml-card">
              <h4>Metas de negócio</h4>
              <div class="cli-xml-config-fields">
                <label class="cli-xml-field">
                  <span>Lucro líquido desejado (%)</span>
                  <input type="number" step="0.1" min="0" max="100" data-cli-xml-cfg="lucroDesejadoPct" value="${cfg.lucroDesejadoPct}" />
                </label>
                <label class="cli-xml-field">
                  <span>Margem mínima aceitável (%)</span>
                  <input type="number" step="0.1" min="0" max="100" data-cli-xml-cfg="margemMinPct" value="${cfg.margemMinPct}" />
                </label>
                <label class="cli-xml-field">
                  <span>Margem de atenção (%)</span>
                  <input type="number" step="0.1" min="0" max="100" data-cli-xml-cfg="margemAtencaoPct" value="${cfg.margemAtencaoPct}" />
                </label>
              </div>
              <button type="button" class="btn-primary" data-cli-xml="save-config">Aplicar e recalcular</button>
            </div>
          </div>
        </section>`;
    }

    function openCliXmlProdutoModal(c, productId) {
      const p = getCliXmlProdutosCalc(c).find((x) => x.id === productId);
      if (!p) return;
      const calc = p.calc;
      const st = xmlStatusMeta(calc.status);
      const notas = (ensureCliXmlAnalise(c)._seed.notas || []).filter((n) => n.produtoId === productId);
      const cfg = cliXmlAnalise.config;

      openModal({
        title: p.nome,
        sub: `${p.codigo} · NCM ${p.ncm} · Status ${st.label}`,
        wide: true,
        body: `
          <div class="cli-xml-prod-detail">
            <div class="cli-xml-prod-cv-grid">
              ${renderCliXmlCompraVendaVisual({
                compraCents: calc.totalCompraCents,
                vendaCents: calc.totalVendaCents,
                qtdCompra: p.qtdCompra,
                qtdVenda: p.qtdVenda,
                title: "Compra vs. Venda",
                hint: "Totais do produto no período · custo efetivo × preço praticado",
              })}
              <div class="cli-xml-cv-unit">
                <h4>Unitário</h4>
                <div class="cli-xml-cv-sides">
                  <div class="cli-xml-cv-side is-compra">
                    <span class="lab">Custo efetivo</span>
                    <strong>${xmlMoney(calc.cef)}</strong>
                    <span class="meta">C_ef por unidade</span>
                  </div>
                  <div class="cli-xml-cv-side is-venda">
                    <span class="lab">Preço de venda</span>
                    <strong>${calc.semVenda ? "—" : xmlMoney(calc.pv)}</strong>
                    <span class="meta">${calc.semVenda ? "Sem saída" : "P_v praticado"}</span>
                  </div>
                </div>
                <p class="cli-xml-cv-unit-ml ${calc.semVenda ? "is-muted" : (calc.mlPct < 0 ? "is-neg" : "is-ok")}">
                  Margem líquida:
                  <strong>${calc.semVenda ? "Sem venda" : `${xmlMoney(calc.mlCents)} · ${xmlPctLabel(calc.mlPct)}`}</strong>
                </p>
              </div>
            </div>
            <div class="cli-xml-memoria">
              <h4>Memória de cálculo</h4>
              <dl>
                <div><dt>Custo documental (C_doc)</dt><dd>${xmlMoney(p.custoDocCents)}</dd></div>
                <div><dt>Acréscimos (A)</dt><dd>${xmlMoney(p.acrescimosCents)}</dd></div>
                <div><dt>Descontos (D)</dt><dd>− ${xmlMoney(p.descontosCents)}</dd></div>
                <div><dt>Créditos elegíveis (C_r)</dt><dd>− ${xmlMoney(p.creditoCents)}</dd></div>
                <div class="is-highlight"><dt>Custo efetivo (C_ef = C_doc + A − D − C_r)</dt><dd>${xmlMoney(calc.cef)}</dd></div>
                <div><dt>Preço praticado (P_v)</dt><dd>${calc.semVenda ? "—" : xmlMoney(calc.pv)}</dd></div>
                <div><dt>Margem bruta (R$ / %)</dt><dd>${calc.semVenda ? "—" : `${xmlMoney(calc.mbCents)} · ${xmlPctLabel(calc.mbPct)}`}</dd></div>
                <div><dt>Tributos de saída (T_s)</dt><dd>${xmlMoney(calc.tsCents)}</dd></div>
                <div><dt>Custos operacionais (C_op · ${xmlPctLabel(xmlCustoOpPct(cfg))})</dt><dd>${xmlMoney(calc.copCents)}</dd></div>
                <div class="is-highlight"><dt>Margem líquida estimada</dt><dd>${calc.semVenda ? "Sem venda" : `${xmlMoney(calc.mlCents)} · ${xmlPctLabel(calc.mlPct)}`}</dd></div>
                <div><dt>Preço ideal (meta ${xmlPctLabel(cfg.lucroDesejadoPct)})</dt><dd>${xmlMoney(calc.pIdeal)}</dd></div>
                <div><dt>Reajuste necessário</dt><dd>${calc.semVenda ? "—" : xmlPctLabel(calc.reajustePct)}</dd></div>
              </dl>
              <p class="cli-xml-legend">Imposto destacado não aumenta custo automaticamente — apenas créditos recuperáveis entram em C_r.</p>
            </div>
            <div class="cli-xml-nf-rel">
              <h4>Notas fiscais relacionadas</h4>
              <div class="cli-xml-table-wrap">
                <table class="cli-xml-table sm">
                  <thead>
                    <tr>
                      <th>Chave</th>
                      <th>Nº/Série</th>
                      <th>Data</th>
                      <th>Emitente</th>
                      <th>Destinatário</th>
                      <th>Tipo</th>
                      <th class="num">Qtd</th>
                      <th class="num">Valor</th>
                      <th class="num">Tributos</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${notas.map((n) => `
                      <tr class="${n.cancelada ? "is-cancel" : ""}">
                        <td class="mono" title="${uiSelectEscape(n.chave)}">${uiSelectEscape(n.chave.slice(0, 10))}…${uiSelectEscape(n.chave.slice(-6))}</td>
                        <td>${uiSelectEscape(n.numero)}/${uiSelectEscape(n.serie)}</td>
                        <td>${uiSelectEscape(n.data)}</td>
                        <td>${uiSelectEscape(n.emitente)}</td>
                        <td>${uiSelectEscape(n.destinatario)}</td>
                        <td>${n.cancelada ? "Cancelada" : (n.tipo === "entrada" ? "Entrada" : "Saída")}</td>
                        <td class="num">${n.qtd}</td>
                        <td class="num">${xmlMoney(n.valorCents)}</td>
                        <td class="num">${xmlMoney(n.tribCents)}</td>
                      </tr>`).join("") || `<tr><td colspan="9"><div class="cli-empty-panel">Sem notas vinculadas</div></td></tr>`}
                  </tbody>
                </table>
              </div>
            </div>
          </div>`,
        foot: `<button type="button" class="btn-ghost" data-close>Fechar</button>`,
      });
      modal.classList.add("cli-xml-prod-modal");
    }

    function initCliXmlDashboardCharts(c) {
      destroyCliXmlCharts();
      if (typeof ApexCharts === "undefined" || !cliXmlAnalise.imported) return;
      const list = getCliXmlProdutosCalc(c);
      const top = [...list].filter((p) => p.qtdVenda).sort((a, b) => b.calc.totalVendaCents - a.calc.totalVendaCents).slice(0, 5);
      const low = [...list].filter((p) => !p.calc.semVenda).sort((a, b) => a.calc.mlPct - b.calc.mlPct).slice(0, 5);
      const k = getCliXmlDashboardKpis(c);
      const base = {
        fontFamily: "DM Sans, sans-serif",
        toolbar: { show: false },
        animations: { enabled: true, speed: 400 },
      };
      const mount = (id, opts) => {
        const el = document.getElementById(id);
        if (!el) return;
        const chart = new ApexCharts(el, opts);
        chart.render();
        cliXmlAnalise.charts.push(chart);
      };

      mount("cliXmlChartTop", {
        chart: { ...base, type: "bar", height: 220 },
        series: [{ name: "R$ vendido", data: top.map((p) => xmlFromCents(p.calc.totalVendaCents)) }],
        plotOptions: { bar: { borderRadius: 4, columnWidth: "55%" } },
        colors: ["#28519c"],
        xaxis: { categories: top.map((p) => p.codigo) },
        dataLabels: { enabled: false },
        grid: { borderColor: "#d4dce8", strokeDashArray: 4 },
        yaxis: { labels: { formatter: (v) => money(v) } },
        tooltip: {
          y: {
            formatter: (v, { dataPointIndex }) => {
              const p = top[dataPointIndex];
              return `${money(v)} · ${p ? p.qtdVenda : 0} un`;
            },
          },
        },
      });

      mount("cliXmlChartMargem", {
        chart: { ...base, type: "bar", height: 220 },
        series: [{ name: "Margem líquida %", data: low.map((p) => p.calc.mlPct) }],
        plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: "60%" } },
        colors: ["#b33a4a"],
        xaxis: { categories: low.map((p) => p.codigo), labels: { formatter: (v) => `${v}%` } },
        dataLabels: { enabled: true, formatter: (v) => `${String(v).replace(".", ",")}%` },
        grid: { borderColor: "#d4dce8", strokeDashArray: 4 },
      });

      mount("cliXmlChartComp", {
        chart: { ...base, type: "donut", height: 220 },
        series: [xmlFromCents(k.totalCompra), xmlFromCents(k.totalVenda)],
        labels: ["Comprado", "Vendido"],
        colors: ["#c47f16", "#28519c"],
        legend: { position: "bottom" },
        dataLabels: { enabled: false },
        plotOptions: { pie: { donut: { size: "62%" } } },
      });

      const carga = [...list].map((p) => ({ nome: p.codigo, carga: p.calc.cargaEntradaPct, ml: p.calc.semVenda ? null : p.calc.mlPct }))
        .sort((a, b) => b.carga - a.carga).slice(0, 6);
      mount("cliXmlChartTrib", {
        chart: { ...base, type: "line", height: 220 },
        series: [
          { name: "Carga entrada %", type: "column", data: carga.map((x) => x.carga) },
          { name: "Margem líquida %", type: "line", data: carga.map((x) => x.ml == null ? 0 : x.ml) },
        ],
        colors: ["#c47f16", "#2f9e6b"],
        stroke: { width: [0, 3] },
        xaxis: { categories: carga.map((x) => x.nome) },
        dataLabels: { enabled: false },
        grid: { borderColor: "#d4dce8", strokeDashArray: 4 },
        legend: { position: "top" },
      });
    }

    function refreshCliXmlUi() {
      const inPortalXml = isClientePortal() && current === "xml";
      const inPerfilXml = !isClientePortal() && cliView === "perfil" && cliPerfilTab === "xml";
      if (inPortalXml) renderPortalClientePage("xml");
      else if (inPerfilXml) renderClientes();
      else renderClientes();
      if (cliXmlAnalise.tab === "dashboard" && cliXmlAnalise.imported) {
        const c = CLIENTES.find((x) => x.id === cliPerfilId) || getPortalCliente();
        requestAnimationFrame(() => initCliXmlDashboardCharts(c));
      }
    }

    function cliXmlPushLog(level, msg) {
      const now = new Date();
      const when = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      cliXmlAnalise.import.logs.push({ when, level, msg });
      if (cliXmlAnalise.import.logs.length > 40) cliXmlAnalise.import.logs.shift();
    }

    function startCliXmlImportPipeline(opts = {}) {
      const st = cliXmlAnalise;
      if (st.import.running) return;
      const c = CLIENTES.find((x) => x.id === cliPerfilId) || getPortalCliente();
      if (c?.cnpj) st.cnpj = xmlOnlyDigits(c.cnpj);
      if (!xmlValidCnpj(st.cnpj)) {
        toast("Cliente sem CNPJ válido para classificação automática");
        return;
      }
      if (st.import.timer) clearInterval(st.import.timer);
      const total = opts.total || 36;
      st.import = {
        running: true,
        pct: 0,
        phase: "Leitura recursiva de arquivos",
        filesTotal: total,
        filesOk: 0,
        filesDup: 0,
        filesBad: 0,
        filesSkip: 0,
        logs: [],
        timer: null,
      };
      cliXmlPushLog("info", `Lote iniciado · CNPJ ${xmlOnlyDigits(st.cnpj)} · ${total} arquivos`);
      refreshCliXmlUi();

      const phases = [
        "Validação e limpeza (corrompidos isolados)",
        "Deduplicação por chave NF-e + hash",
        "Classificação Entrada/Saída × CFOP",
        "Exclusão de canceladas / sem efeito econômico",
        "Consolidação gerencial",
      ];
      let tick = 0;
      st.import.timer = setInterval(() => {
        tick += 1;
        const room = st.import.filesTotal - st.import.filesOk - st.import.filesDup - st.import.filesBad - st.import.filesSkip;
        if (room <= 0) {
          st.import.pct = 100;
          st.import.phase = "Concluído";
          clearInterval(st.import.timer);
          st.import.timer = null;
          st.import.running = false;
          st.imported = true;
          st.tab = "dashboard";
          cliXmlPushLog("ok", `Esteira finalizada · ${st.import.filesOk} válidos · ${st.import.filesDup} duplicados · ${st.import.filesBad} inválidos · ${st.import.filesSkip} excluídos dos totais`);
          toast("Importação concluída — dashboard atualizado", { success: true });
          refreshCliXmlUi();
          return;
        }
        const step = Math.min(room, 2 + Math.floor(Math.random() * 3));
        let bad = 0;
        let dup = 0;
        let skip = 0;
        if (st.import.filesBad < 2 && Math.random() < 0.12) bad = 1;
        else if (st.import.filesDup < 3 && Math.random() < 0.18) dup = 1;
        else if (st.import.filesSkip < 2 && Math.random() < 0.1) skip = 1;
        const ok = Math.max(0, step - bad - dup - skip);
        st.import.filesOk += ok;
        st.import.filesBad += bad;
        st.import.filesDup += dup;
        st.import.filesSkip += skip;
        const done = st.import.filesOk + st.import.filesDup + st.import.filesBad + st.import.filesSkip;
        st.import.pct = Math.min(99, (done / st.import.filesTotal) * 100);
        st.import.phase = phases[Math.min(phases.length - 1, Math.floor((done / st.import.filesTotal) * phases.length))];
        if (bad) cliXmlPushLog("bad", "Arquivo corrompido isolado — lote continua");
        if (dup) cliXmlPushLog("warn", "Duplicidade removida (chave de acesso / hash)");
        if (skip) cliXmlPushLog("warn", "Nota cancelada ou evento sem efeito econômico excluído dos totais");
        if (ok && Math.random() < 0.25) {
          cliXmlPushLog("info", Math.random() < 0.5
            ? "Classificado como Entrada (destinatário = CNPJ analisado)"
            : "Classificado como Saída (emitente = CNPJ analisado)");
        }
        if (tick % 4 === 0 && Math.random() < 0.35) {
          cliXmlPushLog("warn", "Conflito potencial CNPJ×CFOP registrado na trilha (não bloqueante)");
        }
        refreshCliXmlUi();
      }, 380);
    }

    function syncCliXmlFiltrosFromDom() {
      const f = cliXmlAnalise.filtros;
      const g = (id) => document.getElementById(id);
      if (g("cliXmlFiltroQ")) f.q = g("cliXmlFiltroQ").value || "";
      if (g("cliXmlFiltroDe")) f.de = g("cliXmlFiltroDe").value || "";
      if (g("cliXmlFiltroAte")) f.ate = g("cliXmlFiltroAte").value || "";
      if (g("cliXmlFiltroNcm")) f.ncm = g("cliXmlFiltroNcm").value || "";
      if (g("cliXmlFiltroCfop")) f.cfop = g("cliXmlFiltroCfop").value || "";
      if (g("cliXmlFiltroForn")) f.fornecedor = g("cliXmlFiltroForn").value || "";
      if (g("cliXmlFiltroCli")) f.cliente = g("cliXmlFiltroCli").value || "";
      if (g("cliXmlFiltroMargem")) f.margem = g("cliXmlFiltroMargem").value || "";
      if (g("cliXmlFiltroRegime")) f.regime = g("cliXmlFiltroRegime").value || "";
      if (g("cliXmlFiltroStatus")) f.status = g("cliXmlFiltroStatus").value || "";
    }

    function handleCliXmlModClick(e) {
      const tabBtn = e.target.closest("[data-cli-xml-tab]");
      if (tabBtn) {
        cliXmlAnalise.tab = tabBtn.dataset.cliXmlTab;
        destroyCliXmlCharts();
        refreshCliXmlUi();
        return true;
      }

      const act = e.target.closest("[data-cli-xml]");
      if (act) {
        const kind = act.dataset.cliXml;
        if (kind === "drop-zone") {
          document.getElementById("cliXmlFileInput")?.click();
          return true;
        }
        if (kind === "start-import") {
          startCliXmlImportPipeline({ total: 28 });
          return true;
        }
        if (kind === "demo-lote") {
          const c = CLIENTES.find((x) => x.id === cliPerfilId) || getPortalCliente();
          applyCliXmlSimulacaoPreAprovada(c, { tab: "dashboard" });
          destroyCliXmlCharts();
          refreshCliXmlUi();
          return true;
        }
        if (kind === "save-config") {
          toast("Parâmetros aplicados — estimativas recalculadas (histórico preservado)", { success: true });
          refreshCliXmlUi();
          return true;
        }
        if (kind === "import-lote") {
          const c = CLIENTES.find((x) => x.id === cliPerfilId) || getPortalCliente();
          applyCliXmlSimulacaoPreAprovada(c, { tab: "dashboard" });
          destroyCliXmlCharts();
          refreshCliXmlUi();
          return true;
        }
      }

      const prod = e.target.closest("[data-cli-xml-prod]");
      if (prod) {
        const c = CLIENTES.find((x) => x.id === cliPerfilId) || getPortalCliente();
        openCliXmlProdutoModal(c, prod.dataset.cliXmlProd);
        return true;
      }
      return false;
    }

    function handleCliXmlModInput(e) {
      if (e.target.id === "cliXmlFileInput") {
        const files = Array.from(e.target.files || []);
        e.target.value = "";
        if (!files.length) return true;
        cliXmlPushLog("info", `${files.length} arquivo(s) selecionado(s): ${files.map((f) => f.name).slice(0, 3).join(", ")}${files.length > 3 ? "…" : ""}`);
        toast(`${files.length} arquivo(s) na fila — inicie a esteira`);
        if (!cliXmlAnalise.import.running) {
          cliXmlAnalise.import.logs = cliXmlAnalise.import.logs || [];
          refreshCliXmlUi();
        }
        return true;
      }

      if (e.target.matches("[data-cli-xml-cfg]")) {
        const key = e.target.dataset.cliXmlCfg;
        const val = Number(String(e.target.value).replace(",", "."));
        if (key && Number.isFinite(val)) cliXmlAnalise.config[key] = val;
        return true;
      }

      if (e.target.id?.startsWith("cliXmlFiltro")) {
        syncCliXmlFiltrosFromDom();
        refreshCliXmlUi();
        const el = document.getElementById(e.target.id);
        if (el && e.target.type === "search") {
          try { el.focus(); el.setSelectionRange(e.target.selectionStart, e.target.selectionStart); } catch (_) { /* ignore */ }
        }
        return true;
      }
      return false;
    }
