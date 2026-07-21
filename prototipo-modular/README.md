# Protótipo modular (HTML / CSS / JS em partes)

Pasta **separada** da versão atual na raiz. Se algo der errado, use `../backup-atual/`.

## Uso no dia a dia

1. Edite arquivos em `partials/`, `css/` ou `js/`
2. Dê **duplo clique** em `build.bat` (nesta pasta)  
   ou em `../ABRIR-PROTOTIPO.bat` (raiz do projeto)
3. O build regenera tudo e abre `menu-suspenso.html` (uma aba só)

## Design Guide

Abra `design-guide.html` no navegador — referência visual (cores, tipografia, formulários, modal, fazer/não fazer).  
Tokens-fonte: `css/01-base.css`.

## Estrutura

```
prototipo-modular/
  partials/          HTML em pedaços
  css/               fonte do CSS (edite aqui)
  js/                fonte do JS (edite aqui)
  design-guide.html  guia visual do produto
  build.bat          atalho de um clique
  build.ps1          concatena css/js + HTML
  styles.css         GERADO
  app.js             GERADO
  menu-suspenso.html GERADO (apresentação)
```

## Regras

- Edite só: `partials/`, `css/`, `js/`
- Não edite à mão: `menu-suspenso.html`, `styles.css`, `app.js`
- Raiz do projeto e `../backup-atual/` ficam intactas

## Voltar à versão anterior

Copie de `../backup-atual/` para a raiz:
- `menu-suspenso.html`, `styles.css`, `app.js`
