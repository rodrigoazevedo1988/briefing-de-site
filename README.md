# Briefing - Criação de Site

Formulário interativo para criação de briefing de projetos de websites, com geração de PDF no formato do documento original.

## Funcionalidades

- **Wizard de 6 passos** — Navegação intuitiva por seções
- **21 campos** organizados em seções temáticas
- **Picklists inteligentes** para campos de objetivo, call-to-action, estilo visual e tipografia
- **Auto-save** — Dados salvos automaticamente no localStorage
- **Preview do PDF** antes de baixar
- **Geração de PDF** no layout exato do documento de briefing

## Seções do Formulário

1. **A Empresa** — Nome, história, diferenciais e promessa
2. **Produtos e Serviços** — Oferta, carro-chefe e processo
3. **Público-Alvo** — Perfil, dores e desejos
4. **Sobre o Site** — Objetivo, seções, call-to-action e referências
5. **Identidade Visual** — Estilo, cores, tipografia e materiais
6. **Informações Complementares** — Contatos, prazo e observações

## Tech Stack

- **React** + **Vite**
- **Tailwind CSS**
- **html2pdf.js** para geração de PDF

## Getting Started

```bash
npm install
npm run dev
```

Acesse http://localhost:5173

## Build para Produção

```bash
npm run build
```

A saída será em `/dist`
