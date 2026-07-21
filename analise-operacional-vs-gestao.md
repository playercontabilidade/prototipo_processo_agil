# Operacional × Gestão · Processo Ágil

Classificação das abas e subabas do protótipo com base no propósito da tela: leitura/decisão (gestão) versus execução/rotina (operacional).

Fonte: mapa atual de sections, FIN_TABS, CLI_PERFIL_TABS e portal do cliente.

## Critério usado

- **Gestão** — panorama, KPIs, relatórios e storytelling para decidir
- **Operacional** — lançar, conciliar, cobrar, entregar, auditar detalhe
- **Config** — parametrizar o sistema
- **Híbrido** — mistura as duas natures na mesma superfície

## Contagem

| Camada | Itens |
|---|---|
| Gestão | 7 |
| Operacional | 16 |
| Híbrido | 3 |
| Configuração | 3 |

---

## Escritório · Abas raiz

| Caminho | Camada | Por quê | Audiência |
|---|---|---|---|
| Visão Geral | Gestão | Painel consolidado (faturamento, impostos, processos, entregas) para leitura e decisão, sem execução de tarefa. | Sócio / gestor / analista |
| Gestão de Clientes (lista) | Híbrido | Gestão da carteira + porta de entrada para o operacional do cliente selecionado. | Equipe interna |
| Módulo Contábil | Híbrido | Contém subabas de gestão (dashboard/DRE) e de operação (conciliação, títulos, cartões, folha). | Financeiro / analista |
| Gestão de Operações e Processos | Operacional | Execução e acompanhamento de etapas de processos (coleta, protocolo, status). | Operação / paralegal |
| Gestão de Prazos e Entregas / Agenda | Operacional | Calendário, feed e quadro de entregas — rotina diária de prazos. | Operação / analista |
| Segurança e Conformidade | Operacional | Monitoramento e ação sobre certificados (vencidos / a vencer). | Operação / TI fiscal |
| Configuração | Config | Setup do sistema (moldes, regras, obrigações, RH, integrações) — não é execução diária. | Admin / coordenação |

## Módulo Contábil · Subabas

| Caminho | Camada | Por quê | Audiência |
|---|---|---|---|
| Visão Geral (dashboard) · DRE · DFC · EBITDA | Gestão | Relatórios e KPIs de saúde financeira; leitura gerencial / storytelling. | Gestor / cliente (visão) / analista |
| Conciliação Bancária | Operacional | Extrato, XML, categorização — trabalho transacional do dia a dia. | Analista financeiro |
| Títulos a Pagar e Receber | Operacional | Gestão de contas, status, importação seletiva — execução de cobrança/pagamento. | Analista financeiro |
| Auditoria de Cartões | Operacional | Cruzamento de planilhas × taxas, divergências e laudo detalhado. | Analista financeiro |
| Cobranças Sicredi | Operacional | Emissão e acompanhamento de boletos/títulos. | Analista financeiro |
| Folha & Variações | Operacional | Fechamento de folha e justificativas salariais. | DP / folha |
| Plano de Contas | Config | Estrutura e modelos contábeis — base para operação e relatórios. | Coordenação / contador |
| Regras & Adquirentes | Config | Cadastro de taxas, bandeiras e acordos — parametrização. | Coordenação / financeiro |

## Cliente selecionado · Perfil

| Caminho | Camada | Por quê | Audiência |
|---|---|---|---|
| Obrigações | Operacional | Acompanhamento e execução de obrigações fiscais do cliente. | Analista fiscal |
| Processos | Operacional | Processos vinculados ao cliente — mesma lógica da operação do escritório. | Operação |
| Funcionários | Operacional | Cadastro/consulta operacional de pessoal do cliente. | DP / analista |
| Documentos | Operacional | Arquivos e anexos — rotina de troca documental. | Equipe / cliente |
| Comentários | Operacional | Feed de comunicação interna sobre o cliente. | Equipe interna |
| Entregas | Operacional | Prazos e entregas do cliente — execução e status. | Operação / cliente |
| Financeiro → Relatório Executivo | Gestão | Data storytelling (4 KPIs + gráficos + alertas + export) — panorama limpo para decisão. | Operador (interno) + cliente final |
| Financeiro → Conciliação / Títulos / Plano / Auditoria (atalhos ↗) | Operacional | Atalhos para o trabalho pesado no Módulo Contábil; não são painéis gerenciais. | Analista (interno) |
| Honorários | Híbrido | Cadastro operacional de itens + visão de total (gestão comercial do contrato). | Comercial / coordenação |

## Visão do Cliente (portal)

| Caminho | Camada | Por quê | Audiência |
|---|---|---|---|
| Documentos | Operacional | Acesso a arquivos da própria empresa — rotina, não decisão estratégica. | Cliente final |
| Entregas | Operacional | Acompanhamento de prazos/entregas vinculadas. | Cliente final |
| XML | Operacional | Consulta/gestão de notas e XMLs — dado operacional fiscal. | Cliente final |
| Financeiro → Relatório Executivo | Gestão | Única superfície financeira gerencial do portal; autonomia de leitura e exportação. | Cliente final |

---

## Leitura prática

### Gestão
- **Superfícies:** Visão Geral · Dashboard/DRE/DFC/EBITDA · Relatório Executivo
- **Pergunta:** “Como está a saúde financeira / operacional?”

### Operacional
- **Superfícies:** Processos · Entregas · Segurança · Conciliação · Títulos · Auditoria · Cobranças · Folha · Obrigações · Documentos · XML · atalhos ↗
- **Pergunta:** “O que preciso fazer / registrar / conciliar hoje?”

### Portal do cliente
- **Gestão:** Financeiro → Relatório Executivo
- **Operacional:** Documentos · Entregas · XML

## Resumo

Gestão é o “termômetro e o laudo”; Operacional é a “bancada de trabalho”; Config é o “manual de regras” que alimenta os dois.
