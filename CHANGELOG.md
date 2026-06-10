# Changelog

Todas as mudanças relevantes do projeto estão documentadas aqui.

---

## v2.1.1 — 2026-06-09

### Segurança
- **Fix XSS**: `secondaryMessage` e `langName` agora são escapados com `escapeHTML()` em `buildErrorCard` e `languageBar` (`src/common/render.js`)
- **Fix path injection**: `username` na URL da API WakaTime agora usa `encodeURIComponent()` para prevenir path traversal (`src/fetchers/wakatime.js`)
- **Dependabot desativado**: PRs e branches automáticos do Dependabot encerrados; gerenciamento de dependências agora é manual

---

## v2.1.0 — 2026-06-04

### Novos
- **Activity Graph** (`/api/activity-graph`) — Gráfico de linhas com contribuições mensais (sparkline animado com área preenchida)
- **Rate Limit Dashboard** (`/api/status/rate-limit`) — Endpoint JSON com status de todos os tokens, cota restante e saúde geral
- **Embed Mode** (`/embed.html`) — Página standalone para embedar cards em portfólios, Notion, blogs e qualquer site
- Botão **Embed** no painel de compartilhamento do gerador visual

---

## v2.0.0 — 2026-06-03

### Novos Cards
- **Contributions Heatmap** (`/api/contributions`) — Calendário de contribuições estilo GitHub como card SVG standalone
- **Currently Working On** (`/api/working-on`) — Mostra o repositório mais recente com linguagem, stars, forks e atividade recente
- **Tech Stack** (`/api/tech-stack`) — Linguagens agrupadas por categoria (Frontend, Backend, Systems, Mobile, DevOps, Data)
- **Compare Users** (`/api/compare`) — Comparação lado a lado de dois usuários com destaque visual para o "vencedor" em cada métrica
- **Sponsors / Support** (`/api/sponsors`) — Exibe informações de GitHub Sponsors, contagem de patrocinadores e links sociais

### Novas Features
- **Full Profile README Generator** — Gera um README.md completo com múltiplos cards combinados, pronto para colar no perfil
- **Custom Colors via URL** — Suporte a parâmetros `title_color`, `text_color`, `icon_color`, `bg_color`, `border_color` em todos os cards
- **Custom Colors UI** — Painel de cores personalizadas no gerador visual com preview em tempo real

### Melhorias
- Frontend atualizado com 5 novos card types no seletor do gerador
- API Docs atualizada com todos os novos endpoints e badge "NEW"
- README atualizado com documentação completa de todos os 13 card types

### Manutenção
- Branches do Dependabot removidas (8 branches stale deletadas)
- Dependabot desativado (configuração já existia comentada)

---

## v1.1.0 — 2026-05-01

- Limpeza de sistema: remoção de workflows e scripts de geração automática

---

## v1.0.0 — 2026-04-28

- Release inicial do Guebly ReadMe Stats
- 8 card types: Stats, Top Languages, Streak, Social, Trophy, Repo Pin, Gist, WakaTime
- 10 temas exclusivos Guebly + 20+ temas clássicos
- Gerador visual com preview, download PNG, Story 9:16, compartilhamento social
- Deploy via Vercel com serverless functions
