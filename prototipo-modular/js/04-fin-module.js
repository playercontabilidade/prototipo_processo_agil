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
          <button type="button" role="tab" data-fin-report-tab="visao" class="${isVisao ? "active" : ""}" aria-selected="${isVisao}">Resumo</button>
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
              <div class="col-kicker">Onde estou?</div>
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
              <div class="col-kicker">Para onde vou?</div>
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
              <div class="col-kicker">O que devo fazer?</div>
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
              <span><i class="line" style="background:#28519c"></i> Saldo projetado</span>
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
            colors: ["#2f9e6b", "#b33a4a", "#28519c"],
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
          const blueShades = ["#1c386e", "#28519c", "#28519c", "#6b8caf", "#9aafc8"];
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
              style: { fontSize: "11px", fontWeight: 700, colors: ["#ffffff"] },
              background: { enabled: false },
              dropShadow: { enabled: true, top: 0, left: 0, blur: 2, color: "#000", opacity: 0.35 },
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
              style: { fontSize: "11px", fontWeight: 700, colors: ["#ffffff"] },
              background: { enabled: false },
              dropShadow: { enabled: true, top: 0, left: 0, blur: 2, color: "#000", opacity: 0.35 },
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
          colors: ["#28519c"],
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
            colors: ["#28519c"],
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
            colors: ["#28519c"],
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
          const blues = ["#1c386e", "#28519c", "#28519c", "#6b8caf", "#9aafc8"];
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
              style: { fontSize: "11px", fontWeight: 700, colors: ["#28519c"] },
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
      const selected = getFinSelectedCliente();
      const hasClient = !!selected;
      if (!FIN_TABS.some((t) => t.id === finDash.tab)) finDash.tab = "dashboard";

      let workspaceHtml = renderFinEmptyStateHtml();
      let dashData = null;
      if (finDash.tab === "dashboard") {
        dashData = getFinDashData();
        workspaceHtml = renderFinDashboardPanel(dashData);
      } else if (hasClient) {
        if (finDash.tab === "conciliacao") workspaceHtml = renderFinConciliacaoPanel();
        else if (finDash.tab === "titulos") workspaceHtml = renderFinTitulosPanel();
        else if (finDash.tab === "cartoes") workspaceHtml = renderFinCartoesPanel();
        else if (finDash.tab === "cobrancas") workspaceHtml = renderFinCobrancasPanel();
        else if (finDash.tab === "folha") workspaceHtml = renderFinFolhaPanel();
        else if (finDash.tab === "plano") workspaceHtml = renderFinPlanoPanel();
        else if (finDash.tab === "config") workspaceHtml = renderFinConfigPanel();
        else workspaceHtml = renderFinTabStubHtml(finDash.tab);
      } else if (isFinAllClientsScope()) {
        workspaceHtml = `
          <div class="fin-empty-state">
            <div>
              <div class="empty-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <p>Selecione um cliente específico para operar nesta aba. A visão consolidada está disponível em <strong>Painel</strong>.</p>
            </div>
          </div>`;
      }

      wrap.innerHTML = `
        <div class="fin-shell">
          <div class="fin-shell-chrome">
            ${renderFinGlobalHeaderHtml()}
            ${renderFinTabsHtml()}
          </div>
          <div class="fin-workspace">${workspaceHtml}</div>
        </div>`;

      mountFinPanelTools();
      enhanceUiSelects(wrap);
      syncFinPeriodCustomUi(wrap);
      syncCliFinTitCheckAllState(wrap);
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
            <p class="hint">Escolha o período no mesmo formato do Painel.</p>
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
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
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
        foot: `<button type="button" class="btn-ghost" data-close>Fechar</button>`,
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
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
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
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="button" class="btn-ghost" id="cfgEmailTest">Testar envio</button>
          <button type="button" class="btn-primary" id="cfgEmailSave" style="min-width:110px;border-radius:var(--radius-pill)">Salvar</button>`,
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
        foot: `<button type="button" class="btn-ghost" data-close>Fechar</button>`,
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
                <button type="button" class="btn-primary" id="cfgClassifRefresh" style="border-radius:var(--radius-pill)">
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
                  <button type="button" class="btn-primary" id="cfgClassifBuscar" style="border-radius:var(--radius-pill);height:38px">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;vertical-align:-2px"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    Buscar
                  </button>
                  <button type="button" class="btn-ghost" id="cfgClassifLimpar" style="border-radius:var(--radius-pill);height:38px">
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
                      <label class="cfg-obr-check" style="border:1px solid var(--border);border-radius:var(--radius-pill);padding:4px 10px">
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
              <stop offset="0%" stop-color="#28519c" stop-opacity=".28"/>
              <stop offset="100%" stop-color="#28519c" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <path d="${area}" fill="url(#cfgSessFill)"/>
          <path d="${line}" fill="none" stroke="#28519c" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
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
                    <select aria-label="Granularidade" style="height:30px;border:1px solid var(--border);border-radius:var(--radius-sm);padding:0 8px;font:inherit;font-size:.72rem;background:transparent;color:var(--navy-deep)">
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
                    <select aria-label="Itens por página" style="height:28px;border:1px solid var(--border);border-radius:var(--radius-sm);padding:0 6px;font:inherit;font-size:.72rem;background:transparent">
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

