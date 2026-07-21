# Handoff · Gestão de Clientes

Pacote **separado** para enviar ao desenvolvedor.

## O que abre

Já inicia em:

**Gestão de Clientes** (listagem)

## O que pode usar

- Escolher **qualquer cliente**
- No perfil: **todas** as abas (Obrigações, Processos, Financeiro, etc.)
- Sub-abas do Financeiro (Conciliação, Títulos, Plano, Auditoria…)
- Visualizar dados da empresa, certificado e demais ações do perfil
- Voltar à listagem e trocar de cliente
- Regras e adquirentes (alterações recentes de bandeira única)

## O que está bloqueado

- Outras abas do **sistema** (Visão Geral, Agenda, etc.)
- Adicionar / fechar / trocar abas do topo fora de Gestão de Clientes

## Como abrir

Envie **esta pasta inteira**:

- `index.html`
- `styles.css`
- `app.js`
- `handoff.css`

Duplo clique em `index.html` (ou em `ABRIR.bat`).

## Como regenerar

```bat
powershell -ExecutionPolicy Bypass -File build.ps1
```
