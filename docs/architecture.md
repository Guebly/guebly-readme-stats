# Arquitetura — Guebly ReadMe Stats

## Visão geral

O projeto gera cards SVG dinâmicos com estatísticas do GitHub. Funciona como serverless functions no Vercel, com um frontend Vue 3 para o gerador visual.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Vue 3 + Vite |
| Backend | Node.js 22+ serverless (Vercel) |
| API externa | GitHub GraphQL API, WakaTime API |
| Renderização | SVG gerado no servidor |
| Testes | Jest |
| Lint | ESLint + Prettier |

## Estrutura de diretórios

```
├── api/                    # Serverless functions (Vercel)
│   ├── index.js            # /api — Stats Card
│   ├── top-langs.js        # /api/top-langs
│   ├── streak.js           # /api/streak
│   ├── social.js           # /api/social
│   ├── trophy.js           # /api/trophy
│   ├── pin.js              # /api/pin
│   ├── gist.js             # /api/gist
│   ├── wakatime.js         # /api/wakatime
│   ├── contributions.js    # /api/contributions
│   ├── working-on.js       # /api/working-on
│   ├── tech-stack.js       # /api/tech-stack
│   ├── compare.js          # /api/compare
│   └── sponsors.js         # /api/sponsors
├── src/
│   ├── cards/              # Renderizadores de cards (SVG)
│   ├── fetchers/           # Buscam dados da API do GitHub
│   ├── common/             # Utilitários compartilhados
│   │   ├── Card.js         # Classe base para cards
│   │   ├── access.js       # Allowlist/blocklist
│   │   ├── cache.js        # Headers de cache
│   │   ├── color.js        # Resolução de cores e temas
│   │   ├── error.js        # Classes de erro
│   │   ├── fmt.js          # Formatação (números, bytes, texto)
│   │   ├── html.js         # Escaping HTML/XSS
│   │   ├── http.js         # Requisições GraphQL
│   │   ├── render.js       # Utilitários de renderização SVG
│   │   └── retry.js        # Retry com múltiplos tokens
│   └── translations.js     # Sistema de i18n
├── themes/                 # Definições de temas
├── app/                    # Frontend Vue 3
│   ├── App.vue
│   └── components/
├── tests/                  # Testes Jest
├── express.js              # Servidor de desenvolvimento local
└── vercel.json             # Configuração de deploy
```

## Fluxo de uma requisição

```
Requisição HTTP → api/*.js → checkAccess() → fetcher → card renderer → SVG response
                                                ↓
                                          GitHub GraphQL API
                                          (com retry + múltiplos tokens)
```

1. O endpoint em `api/` recebe a requisição e extrai os query params
2. `checkAccess()` verifica allowlist/blocklist
3. O fetcher (`src/fetchers/`) busca dados via GraphQL com retry automático
4. O card renderer (`src/cards/`) gera o SVG com base nos dados e opções
5. Headers de cache são aplicados e o SVG é retornado

## Como adicionar um novo card

1. Criar fetcher em `src/fetchers/novo-card.js`
2. Criar renderer em `src/cards/novo-card.js`
3. Criar endpoint em `api/novo-card.js`
4. Registrar rota em `express.js` (dev local)
5. Exportar em `src/cards/index.js`
6. Adicionar traduções em `src/translations.js`
7. Adicionar ao frontend: `Generator.vue` e `ApiDocs.vue`
8. Criar testes em `tests/novo-card.test.js`
9. Documentar em `README.md` e `README.pt-br.md`

## Sistema de temas

Temas são definidos em `themes/index.js` como objetos com 5-6 propriedades de cor:

```js
{
  title_color: "hex",
  icon_color: "hex",
  text_color: "hex",
  bg_color: "hex" | "angle,color1,color2",
  border_color: "hex",
  ring_color: "hex"  // opcional
}
```

A função `resolveColors()` em `src/common/color.js` faz merge entre tema + overrides do usuário + fallback.

## Sistema de tokens

O projeto usa múltiplos GitHub Personal Access Tokens (`PAT_1` a `PAT_10`) para evitar rate limiting. O sistema de retry (`src/common/retry.js`) alterna automaticamente entre tokens quando um atinge o limite.

## Cache

Headers de cache são configurados por tipo de card em `src/common/cache.js`. Cards com dados que mudam pouco (top-langs) têm TTL maior; cards dinâmicos (stats) têm TTL menor.
