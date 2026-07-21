# Visão Funcional · Cliente (Módulo XML)

**Público:** dono da empresa, contador, customer success, product.  
**Objetivo:** deixar claro *o que aconteceu com as notas* e *o que sobrou na conta*, sem jargão técnico.

---

## 1. Propósito da tela

A Visão do Cliente responde três perguntas em segundos:

1. **Quanto entrou?** (faturamento das notas no período)
2. **Quanto foi de imposto?** (carga tributária vinculada às notas)
3. **O que sobrou?** (resultado após custos/impostos — a “margem que importa”)

Tudo o que for “como o XML foi parseado” ou “erro de schema” fica fora desta visão (vai para suporte / visão técnica).

---

## 2. Hierarquia modular do dashboard

Ordem de leitura fixa. Cada bloco tem **um job**.

### Bloco A — Resumo Executivo (topo · no máximo 3 indicadores)

| # | Indicador (rótulo ao cliente) | O que significa | Exemplo de leitura |
|---|------------------------------|-----------------|--------------------|
| 1 | **Faturamento** | Soma das notas de venda no período | “R$ 128.450,00 em notas” |
| 2 | **Impostos** | Total de tributos associados às notas | “R$ 18.320,00 de impostos” |
| 3 | **O que sobrou** | Resultado após custos/impostos (margem líquida / lucro real do recorte) | “Sobrou R$ 22.110,00 (17,2%)” |

**Regras de produto**
- Nunca mais de **3 KPIs** no primeiro viewport.
- Sem score numérico artificial (evita discussão de “fórmula”).
- Status textual opcional ao lado: *Tudo certo* · *Atenção em produtos* · *Há notas com problema*.

### Bloco B — Diagnóstico

Foco em **onde o resultado está apertando**:

- Produtos / itens com margem crítica (baixa ou negativa)
- Concentração: quais notas ou grupos puxam o resultado
- Alertas simples: “3 produtos com margem negativa”, “2 notas sem classificação de custo”

### Bloco C — Detalhamento

Memória de cálculo e evidências:

- Lista de notas do período (número, data, valor, situação)
- Drill-down: itens da nota → produto → margem do item
- Exportar relatório (PDF/planilha) para o cliente ou contador

---

## 3. Linguagem de negócio (glossário curto)

| Termo na tela | Explicação para o cliente |
|---------------|---------------------------|
| Faturamento | Valor das vendas/notas no período escolhido |
| Impostos | Tributos ligados a essas notas |
| O que sobrou / Margem líquida | Depois de custos e impostos, quanto permanece |
| Lucro real (do período) | Resultado do recorte fiscal importado — não é o DRE contábil completo da empresa |
| Produto crítico | Item que vende muito ou com margem muito baixa |
| Nota com problema | XML que não entrou no cálculo (incompleto ou rejeitado) |

---

## 4. UX — importação de lotes pesados

Quando o cliente (ou o escritório em nome dele) sobe **muitos XMLs de uma vez**, a experiência deve ser transparente e calma.

### 4.1 Estados da importação

| Estado | O que o cliente vê |
|--------|--------------------|
| Preparando | “Recebendo arquivos…” |
| Processando | Barra de progresso + contadores |
| Concluído com sucesso | “X notas prontas na sua visão” |
| Concluído com ressalvas | “X ok · Y com problema — veja a lista” |
| Falhou | “Não foi possível processar o lote. Tente de novo ou fale com o suporte.” |

### 4.2 Componentes obrigatórios na UI de lote

1. **Barra de progresso dinâmica** (0–100%), atualizada por arquivo concluído (não só por tempo).
2. **Contadores**
   - Processados com sucesso
   - Com erro / rejeitados
   - Restantes
3. **Estimativa de tempo restante** (texto humano: “cerca de 1 min restante”).
4. **Lista compacta de erros** (nome do arquivo + motivo em português: “arquivo incompleto”, “nota duplicada”, “não reconhecemos o tipo”).
5. **Ação pós-lote:** botão *Ver no dashboard* (atualiza a Visão do Cliente) e *Baixar relatório do lote*.

### 4.3 Princípios UX

- Não travar a tela inteira: permitir minimizar o painel de progresso e continuar navegando.
- Não usar termos como “schema”, “parse”, “timeout” na face do cliente.
- Em lotes > 50 arquivos, mostrar aviso prévio: “Isso pode levar alguns minutos.”

---

## 5. Log executivo (nível cliente)

Histórico legível do que aconteceu com os XMLs do cliente.

| Campo exibido | Exemplo |
|---------------|---------|
| Quando | 16/07/2026 · 09:42 |
| O que | Importação em lote |
| Resultado | 48 notas ok · 2 com problema |
| Impacto no período | Faturamento +R$ 12.300,00 |
| Quem | Escritório / Cliente (portal) |

O cliente **não** vê stack trace nem código de erro interno. Se quiser detalhe, o CTA é “Falar com o escritório / suporte”.

---

## 6. Critérios de aceite (produto)

- [ ] Topo com no máximo 3 indicadores: Faturamento, Impostos, O que sobrou
- [ ] Diagnóstico lista produtos críticos sem exigir conhecimento técnico
- [ ] Detalhamento permite abrir nota → itens
- [ ] Lote mostra progresso, sucessos, erros e tempo restante
- [ ] Log executivo registra cada importação em linguagem de negócio
- [ ] Nenhuma menção a schema/XML inválido na UI do cliente (apenas “nota com problema”)

---

## 7. Fora de escopo desta visão

- Motor de validação XSD / regras SEFAZ (documentado na visão técnica)
- Pareamento contábil completo (DRE do escritório)
- Auditoria de cartões / conciliação bancária (módulos vizinhos)
