# Módulo Contábil — Documentação completa

Documentação funcional e técnica do **Módulo Contábil** do protótipo **Processo Ágil**.

**Objetivo deste documento:** explicar, de ponta a ponta, o que o módulo faz, como a navegação está organizada, o que cada aba entrega e como os fluxos se conectam — para produto, design e desenvolvimento.

**Referência no código:**
- Navegação: `FIN_NAV_GROUPS` / abas: `FIN_TABS` em `prototipo-modular/js/01-core-data.js`
- Shell e Visão Geral: `prototipo-modular/js/04-fin-module.js`
- Operações (conciliação, títulos, plano, auditoria, config): `prototipo-modular/js/03-cli-auditoria.js` e `02-dashboard-agenda.js` (auditoria)
- Estilos: principalmente `css/03-conciliacao-cartoes.css`, `css/05a-config-perfil.css`, `css/08-dashboard.css`

---

## 1. O que é o Módulo Contábil

É o centro financeiro/contábil do sistema. A partir de um **cliente selecionado** (ou visão consolidada de várias empresas), o módulo permite:

1. **Enxergar saúde financeira** (Visão Geral: score, caixa, DRE/DFC/EBITDA)
2. **Operar o dia a dia** (títulos, conciliação bancária, cobranças)
3. **Auditar cartões** (cruzamento de vendas × taxas contratadas)
4. **Administrar estrutura** (folha, plano de contas)
5. **Configurar regras comerciais** (adquirentes / bandeiras / faixas)

No protótipo, os dados são **mock** (seeds em memória). Em produção, as mesmas telas devem persistir no backend real.

---

## 2. Como entrar e o shell comum

### 2.1 Entrada
- Aba do sistema: **Módulo Contábil** (`financeiroDash: true`)
- Também aparece no perfil do cliente (área Financeiro / Contábil, conforme contexto escritório × portal)

### 2.2 Shell comum (vale para quase todas as abas)

| Elemento | Função |
|----------|--------|
| **Seletor de cliente** | Troca a empresa sob análise. Sem cliente, várias abas pedem seleção; Visão Geral pode operar em consolidado |
| **Período** | Mês atual · Últimos 30 dias · Personalizado (De–Até) |
| **Navegação por grupos** | Dropdowns: Financeiro, Auditoria, Administrativo, Configurações + atalho Visão Geral |
| **Ações de cabeçalho** | Em Visão Geral: Limpar filtros · Recarregar dados · filtros de visão (mostrar/ocultar blocos) |

Arquivos-chave do shell: `renderFinGlobalHeaderHtml()`, `renderFinTabsHtml()`, `renderFinModuleDash()`.

---

## 3. Mapa completo da navegação

A UI usa **grupos** (`FIN_NAV_GROUPS`). Por baixo, cada item aponta para um `tab` de `FIN_TABS`.

| Grupo | Item no menu | ID interno (`tab`) | O que é |
|-------|--------------|--------------------|---------|
| — | Visão Geral | `dashboard` | Painel executivo + DRE/DFC/EBITDA |
| Financeiro | Títulos a Pagar e Receber | `titulos` | Contas a pagar/receber |
| Financeiro | Conciliação Bancária | `conciliacao` | Extrato OFX, categorização, gerar/transferir |
| Financeiro | Cobranças | `cobrancas` | Boletos Sicredi (protótipo) |
| Auditoria | Auditoria de Cartão | `cartoes` | Import planilha × regras de adquirente |
| Administrativo | Folha & Variações | `folha` | Folha e justificativas |
| Administrativo | Plano de Contas | `plano` | Modelos, árvore, mapeamento |
| Configurações | Regras Financeiras / Adquirentes | `config` | Acordos comerciais (mesma tela) |

> **Nota:** Em Configurações, “Regras Financeiras” e “Adquirentes” abrem a **mesma aba** (`config`), seção `adquirentes`.

---

## 4. Visão Geral (`dashboard`)

### 4.1 Propósito
Dar ao gestor a pergunta: **onde estou, para onde vou e o que fazer** — com base no período e no escopo (um cliente ou consolidado).

### 4.2 Sub-abas internas
| Sub-aba | Conteúdo |
|---------|----------|
| **Visão Geral** | Centro de decisão + KPIs + fluxo + origem/destino + feed |
| **DRE** | Demonstração do Resultado (gerencial) |
| **DFC** | Demonstração dos Fluxos de Caixa |
| **EBITDA** | Visão de EBITDA do período |

Controle: `finDash.reportTab` (`visao` | `dre` | `dfc` | `ebitda`).

### 4.3 Bloco “Centro de decisão”
Três colunas:

1. **Onde estou?** — score /100 + badge (Excelente / Saudável / Atenção / Crítico) + saldo atual  
2. **Para onde vou?** — projeção de caixa em 7 / 15 / 30 dias  
3. **O que devo fazer?** — lista de recomendações/ações priorizadas  

### 4.4 KPIs e drill-down
Cards clicáveis (ex.: Saldo, a Receber, a Pagar, Inadimplência). Abrem drawer/detalhe conforme o protótipo (`data-fin-drill`).

### 4.5 Demais blocos (Visão)
- Gráfico de **fluxo de caixa**
- **Origem e destino** do dinheiro
- **Feed** de movimentações e alertas
- Filtros de visão (`FIN_FILTER_OPTS`): ligar/desligar seções (decision, kpis, fluxo, origem, feed)

### 4.6 Ações
- **Limpar filtros**
- **Recarregar dados**
- Filtro de visão no cabeçalho

---

## 5. Títulos a Pagar e Receber (`titulos`)

### 5.1 Propósito
Gestão unificada de **contas a pagar** e **contas a receber** do cliente.

### 5.2 Estrutura
- Sub-abas: **Títulos a Pagar** · **Títulos a Receber**
- Exige cliente selecionado

### 5.3 Capacidades (protótipo)
- Toolbar: Novo, Importar, filtros avançados (texto, status, valor min/max, vencimento)
- Filtro rápido por status: aberto · parcial · pago · vencido
- Seleção em lote (checkboxes)
- Tabela: sacado/fornecedor, descrição, vencimento, valor, status, ações
- Fluxos de **novo título** e **importação** (upload / código de barras, conforme UI)

### 5.4 Critério de produto
Paridade com o protótipo; no backend real: CRUD e filtros persistidos.

---

## 6. Conciliação Bancária (`conciliacao`)

### 6.1 Propósito
Conciliar extrato bancário com a operação: importar OFX, categorizar na DRE, gerar títulos, transferir entre contas e aplicar regras automáticas.

### 6.2 Painel de indicadores
- KPIs de saldo / posição de caixa do período
- Contexto **Contábil ↔ Financeiro**
- Ações: **Finalizar mês**, menu de contexto (exibir contexto, trocar banco)
- Ícone de **regras de conciliação automática** (modal próprio — distinto das regras de cartão)

### 6.3 Toolbar principal
| Controle | Função |
|----------|--------|
| **Importar OFX** | Abre hub → listagem de movimentações do extrato |
| Filtros | Tipo, valor, ID título, status, etc. |
| **Exportar OFX** | Exporta movimentações filtradas/selecionadas |
| Outros | Adicionar manualmente / Excel (conforme UI) |

### 6.4 Tabela de movimentações
Colunas típicas: título, descrição, data, tipo, valor, categoria DRE, status, ações.

Ações por linha (conforme fluxo):
- **Gerar** título a pagar/receber
- **Transferir** entre contas
- Categorizar na DRE

Status: aberto · conciliado (etc.).

### 6.5 Modal Importar / Exportar OFX

**Importar OFX**
1. Tela de upload (hub)
2. Listagem com filtros:
   - Buscar movimentação
   - Tipo (Todos / Crédito / Débito)
   - Conciliação (Não conciliadas / Conciliadas / Todas)
   - De / Até (digitação + calendário)
3. Bulk: selecionar, selecionar todas, limpar, editar, excluir
4. Por linha: Gerar · Transferir
5. Footer: **Importar tudo** (ação primária azul no design system)

**Exportar OFX**
- Mesma base de filtros/listagem
- Ação por linha: Exportar
- Footer: **Exportar tudo**

### 6.6 Fluxos auxiliares

#### Gerar título (a partir do OFX)
- Modal “Gerar título a pagar/receber”
- Dados do lançamento + classificação financeira (busca de plano de contas)
- Keyword para regras futuras
- Confirmação efetiva na operação “Importar tudo” (no protótipo)

#### Transferir entre contas
- Banco origem/destino, valores, subplano

#### Bancos
- Cadastro/troca: código, agência, conta, titular, saldo inicial

#### Regras de conciliação automática
- Escopo (banco / todos)
- Automação ativa/inativa
- Match por keyword → subplano
- Lista CRUD de regras

### 6.7 Critério de produto
Paridade visual/funcional com o protótipo; OFX, conciliação, gerar/transferir e regras no backend real.

---

## 7. Cobranças (`cobrancas`)

### 7.1 Propósito
Emissão e acompanhamento de boletos / títulos via integração **Sicredi** (protótipo).

### 7.2 Capacidades (protótipo)
- Formulário de emissão (sacado, valor, vencimento, descrição)
- Listagem de títulos emitidos
- Sync / status (simulado)

> Em entregas parciais, esta aba pode ficar **fora de escopo** — ver seção 12.

---

## 8. Auditoria de Cartão (`cartoes`)

### 8.1 Propósito
Importar planilha de vendas (Stone/Cielo etc.) e **cruzar** com as taxas cadastradas nos acordos de adquirente → apontar divergências.

### 8.2 Tela base
1. **Período da auditoria** (mês / 30d / personalizado De–Até)
2. Botão **Configuração de regras e adquirentes** (mesmo fluxo de cadastro de acordos da Config)
3. **Upload** (arrastar/soltar ou Importar) — `.xlsx` / `.csv` no protótipo
4. Lista lateral das **regras cadastradas** (editar / remover)

### 8.3 Após importar — modal de resultados

#### A) Relatório Técnico
- Cabeçalho / status da auditoria
- Resumo técnico + resumo executivo
- Insights
- Tabela de divergências (filtros, ordenação, paginação)
- Recomendações
- Exportar laudo
- Filtro de seções + expandir tela cheia

#### B) Dashboard Analítico
- Faixa de alertas + KPIs investigativos
- Gráficos: bruto/tarifa por bandeira e por tipo; status das vendas; líquido × tarifa/dia; rankings (adquirentes, bandeiras, regras)
- Mesmo controle de seções + expandir

### 8.4 Regra de negócio (núcleo)
Para cada venda importada:

1. Localiza acordo (operadora + **uma bandeira** + tipo crédito/débito/pix + vigência)
2. Aplica faixa de parcela + desconto + antecipação → **taxa prevista**
3. Compara com taxa/desconto **real** da planilha
4. Gera diferença e selo:
   - **OK** — dentro da tolerância
   - **Alerta** — divergência
   - **Negada** — venda negada / não efetiva

As regras vêm de **Configurações → Regras e Adquirentes** (e do modal espelho na própria auditoria).

---

## 9. Folha & Variações (`folha`)

### 9.1 Propósito
Acompanhar fechamento de folha, variações salariais e justificativas.

### 9.2 Capacidades (protótipo)
- Tabela de colaboradores
- Filtros por coluna
- Justificativas de variação

> Pode ficar **fora de escopo** em entregas parciais — ver seção 12.

---

## 10. Plano de Contas (`plano`)

### 10.1 Propósito
Gerir **modelos** de plano de contas do cliente (estrutura hierárquica) e o **mapeamento** entre plano financeiro (Processo Ágil) e planos contábeis importados.

### 10.2 Lista de modelos
- Busca de modelos
- Badges: Universal / Setorial / Modelo
- Ações: **Criar novo modelo** · **Editar modelo universal** · **Mapeamento amplo**
- Clique no item → detalhe do modelo

### 10.3 Detalhe do modelo
- Busca de contas
- **Nova conta** · **Mapeamento amplo**
- Breadcrumb: Modelos › nome do modelo
- Toggles: Modelo padrão · Universal
- Meta: empresa / centro de custo (quando houver)
- Árvore:
  - Expandir / recolher
  - Código, nome
  - Tags: Analítico/Sintético · Credora/Devedora · Inativa
  - Ações: subconta · editar · excluir

### 10.4 Modais
| Modal | Campos principais |
|-------|-------------------|
| Novo/editar modelo | Nome, empresa, centro de custo, flags |
| Nova/editar conta | Código, nome, descrição, tipo, natureza, pai |
| Mapeamento amplo | Duas colunas: Plano Financeiro ↔ Planos Contábeis |

### 10.5 Mapeamento amplo (detalhe)
- Coluna esquerda: Plano Financeiro (com busca “Buscar por código ou nome…”)
- Coluna direita: Planos Contábeis
- Associar / editar vínculo / excluir
- Footer: Bancos, Configurar layout, Novo plano contábil, Importar PDF/Excel
- A busca do mapeamento segue o **mesmo layout** da busca de plano em “Gerar título (OFX)”

### 10.6 Critério de produto
Paridade com o protótipo; CRUD e mapeamento no backend real.

---

## 11. Configurações — Regras e Adquirentes (`config`)

### 11.1 Propósito
Cadastrar **acordos comerciais** usados pela Auditoria de Cartão.

### 11.2 Cadastro de acordo
| Campo | Detalhe |
|-------|---------|
| Adquirente | Stone, Cielo, Rede, Getnet, PagSeguro |
| Tipo | Crédito / Débito / Pix |
| Vigência | Início e fim do contrato |
| Bandeira | **Uma bandeira por regra** (Visa, Mastercard, Elo, Amex, Hipercard) |
| Desconto padrão (%) | Taxa base |
| Antecipação (%) | Taxa de antecipação |
| Faixas | De / Até / Taxa % (adicionar/remover linhas) |

Ações: Salvar · Atualizar · Cancelar edição · Remover

### 11.3 Lista
Cards com operadora, tipo, bandeira, vigência, taxas e faixas. Clique para editar.

### 11.4 Seção “Plano de Contas (DRE)” em Config
Existe no protótipo uma segunda seção em Config para árvore de categorias da DRE.  
Em entregas parciais, isso fica **fora de escopo** — o plano estruturado vive na aba **Plano de Contas**.

---

## 12. Escopo de entrega (referência de priorização)

Quando a equipe precisa fatiar o trabalho, use esta matriz (ajustável por projeto):

| Aba | Status típico de entrega |
|-----|--------------------------|
| Visão Geral | FAZER |
| Títulos a Pagar e Receber | FAZER (revisão do prototipado) |
| Conciliação Bancária | FAZER (revisão do prototipado) |
| Cobranças | NÃO FAZER (fase posterior) |
| Auditoria de Cartão | FAZER (completa) |
| Folha & Variações | NÃO FAZER (fase posterior) |
| Plano de Contas | FAZER (revisão do prototipado) |
| Regras e Adquirentes | FAZER |
| Plano de Contas (DRE) dentro de Config | NÃO FAZER |

### Ordem sugerida de desenvolvimento
1. Shell + Visão Geral (4 sub-abas)  
2. Regras e Adquirentes  
3. Auditoria de Cartão completa  
4. Títulos  
5. Conciliação (incl. OFX)  
6. Plano de Contas  

---

## 13. Arquitetura técnica (protótipo)

### 13.1 Estado
- Objeto global `finDash` — tab ativa, período, conciliação, cartões, config, etc.
- Seeds: `FIN_*_SEED` em `01-core-data.js`
- Plano de contas: `finPlanoContas` / `FIN_PLANO_MODELOS_SEED`

### 13.2 Renderização
- `renderFinModuleDash()` escolhe o painel conforme `finDash.tab`
- Modais via `openModal(...)` + classes específicas (`fin-ofx-import-modal`, `fin-pmap-modal`, `cli-fin-audit-modal`, …)

### 13.3 Build
Fontes em `prototipo-modular/`. Gerar bundle:

```powershell
powershell -ExecutionPolicy Bypass -File prototipo-modular/build.ps1
```

Saída: `styles.css`, `app.js`, `menu-suspenso.html`.

### 13.4 Design system (filtros)
Filtros de listagem usam o padrão `.proc-filter` / `.fin-op-filters` (altura ~34–36px, borda única no card, ícone à esquerda).  
No modal OFX, há reset local de estilos de `.modal-body input` para evitar borda dupla e desalinhamento — **somente** em `.modal.fin-ofx-import-modal .fin-ofx-filters`.

---

## 14. Glossário rápido

| Termo | Significado |
|-------|-------------|
| **OFX** | Arquivo de extrato bancário (Open Financial Exchange) |
| **DRE** | Demonstração do Resultado do Exercício (visão gerencial) |
| **DFC** | Demonstração dos Fluxos de Caixa |
| **Adquirente** | Operadora de cartão (Stone, Cielo, …) |
| **Bandeira** | Visa, Mastercard, etc. (uma por regra no cadastro) |
| **Conciliação** | Casar extrato com lançamentos/títulos/categorias |
| **Plano financeiro** | Estrutura usada no Processo Ágil |
| **Plano contábil** | Estrutura importada/externa, vinculada via mapeamento |

---

## 15. Como validar no protótipo

1. Abrir **Módulo Contábil**  
2. Selecionar um cliente  
3. Percorrer a navegação por grupos  
4. Validar, no mínimo:
   - Visão Geral (4 sub-abas + filtros de visão)
   - Conciliação → Importar OFX / Exportar OFX
   - Auditoria de Cartão → importar → laudo + dashboard
   - Config → salvar/editar adquirente
   - Plano de Contas → modelo → árvore → mapeamento amplo
   - Títulos → pagar/receber + filtros  

---

## 16. Manutenção deste documento

| Quando atualizar | O quê |
|------------------|-------|
| Nova aba ou grupo em `FIN_NAV_GROUPS` | Seção 3 |
| Mudança de fluxo OFX / auditoria / plano | Seções 6, 8, 10 |
| Mudança de escopo de entrega | Seção 12 |
| Novo seed / estado relevante | Seção 13 |

**Última atualização:** alinhada ao protótipo modular (navegação `FIN_NAV_GROUPS` / `FIN_TABS`).
