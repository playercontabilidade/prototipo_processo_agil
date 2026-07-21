# Visão do Cliente · Módulo XML

Documentação complementar da **aba Visão do Cliente** no módulo de XML / notas fiscais.

## Separação dos artefatos

| Artefato | Público | Arquivo |
|----------|---------|---------|
| **Visão Funcional** | Dono da empresa, contador, CS, Product | [`01-visao-funcional.md`](./01-visao-funcional.md) |
| **Visão Técnica** | Engenhaira, dados, suporte L2 | [`02-visao-tecnica.md`](./02-visao-tecnica.md) |

## O que cada visão cobre

### Funcional (negócio)
- O que o cliente vê e por quê
- Hierarquia do dashboard (Resumo → Diagnóstico → Detalhamento)
- Indicadores em linguagem simples (faturamento, impostos, o que sobrou)
- UX de importação em lote (como o cliente acompanha o progresso)
- Log executivo (acompanhamento de processamento sem jargão)

### Técnica (arquitetura)
- Modelo ERD (`DocumentoFiscal`, `ItemDocumentoFiscal`, `ProdutoFiscal`)
- Pipeline Upload → Validação → Classificação → Margem → Dashboard
- Dicionário de dados com tipos, precisão e origem
- Logs técnicos (schema, XML inválido, rastreio)
- Índices e cardinalidades

## Contexto do protótipo atual

Hoje a aba **XML** no perfil do cliente lista arquivos de forma simplificada. Esta documentação define o **alvo estrutural** para evoluir essa visão sem misturar linguagem de negócio com detalhes de implementação.
