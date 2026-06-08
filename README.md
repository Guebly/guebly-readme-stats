<div align="center">

<img src="https://readme.stats.guebly.com.br/api?username=degabrielofi&theme=guebly&show_icons=true&hide_border=true&count_private=true" width="420" alt="Guebly Stats Card" />

# Guebly ReadMe Stats

**Cards SVG dinâmicos e bonitos para o README do seu perfil GitHub — sempre atualizados.**

[![Deploy](https://img.shields.io/badge/Deploy-readme.stats.guebly.com.br-6E40C9?style=for-the-badge&logoColor=white)](https://readme.stats.guebly.com.br)
[![Versão](https://img.shields.io/badge/v2.1.0-estável-22c55e?style=for-the-badge)](https://github.com/Guebly/guebly-readme-stats/releases)
[![Licença MIT](https://img.shields.io/badge/Licença-MIT-22c55e?style=for-the-badge)](./LICENSE)
[![Node 22+](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Feito por Guebly](https://img.shields.io/badge/Feito_por-Guebly-0D1117?style=for-the-badge&logo=github)](https://guebly.com.br)

**[English version](./README.pt-br.md)**

</div>

---

## O que é?

O **Guebly ReadMe Stats** gera cards SVG bonitos e dinâmicos para o README do seu perfil GitHub — atualizados automaticamente a cada requisição. Sem edição de imagem, sem atualizações manuais.

Basta colar uma URL no seu README, personalizar com parâmetros de query e pronto.

> Use o gerador visual em **[readme.stats.guebly.com.br](https://readme.stats.guebly.com.br)** — configure seu card, copie o snippet e baixe como PNG para compartilhar no Instagram, LinkedIn, Twitter e WhatsApp.

---

## Tipos de cards disponíveis

| # | Card | Endpoint | Exibe |
|---|------|----------|-------|
| 1 | **Stats** | `/api` | Commits, PRs, issues, estrelas, ranking GitHub |
| 2 | **Top Languages** | `/api/top-langs` | Linguagens de programação mais usadas |
| 3 | **Streak** | `/api/streak` | Sequência atual e mais longa de contribuições |
| 4 | **Social** | `/api/social` | Avatar, nome, seguidores e estatísticas rápidas |
| 5 | **Trophy** | `/api/trophy` | Badges de conquistas GitHub |
| 6 | **Repo Pin** | `/api/pin` | Destaque de um repositório específico |
| 7 | **Gist** | `/api/gist` | Exibição de gist com highlight de código |
| 8 | **WakaTime** | `/api/wakatime` | Tempo de codificação por linguagem |
| 9 | **Contributions Heatmap** | `/api/contributions` | Calendário de contribuições estilo GitHub |
| 10 | **Currently Working On** | `/api/working-on` | Repositório com push mais recente |
| 11 | **Tech Stack** | `/api/tech-stack` | Linguagens agrupadas por categoria (Frontend, Backend, etc.) |
| 12 | **Compare Users** | `/api/compare` | Comparação lado a lado de dois usuários |
| 13 | **Sponsors / Support** | `/api/sponsors` | Info de GitHub Sponsors e links sociais |
| 14 | **Activity Graph** | `/api/activity-graph` | Gráfico de contribuições mensais (sparkline) |

---

## Início rápido

Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub.

### Stats Card

```md
![GitHub Stats](https://readme.stats.guebly.com.br/api?username=SEU_USUARIO&theme=guebly&show_icons=true&hide_border=true)
```

### Top Languages

```md
![Top Langs](https://readme.stats.guebly.com.br/api/top-langs?username=SEU_USUARIO&theme=guebly&layout=compact&hide_border=true)
```

### Streak Card

```md
![Streak](https://readme.stats.guebly.com.br/api/streak?username=SEU_USUARIO&theme=guebly&hide_border=true)
```

### Social Card

```md
![Social](https://readme.stats.guebly.com.br/api/social?username=SEU_USUARIO&theme=guebly&hide_border=true)
```

### Trophy Card

```md
![Trophies](https://readme.stats.guebly.com.br/api/trophy?username=SEU_USUARIO&theme=guebly&hide_border=true)
```

### Repo Pin

```md
[![Meu Repo](https://readme.stats.guebly.com.br/api/pin?username=SEU_USUARIO&repo=NOME_DO_REPO&theme=guebly)](https://github.com/SEU_USUARIO/NOME_DO_REPO)
```

### WakaTime Card

> Requer um perfil público no [WakaTime](https://wakatime.com).

```md
![WakaTime](https://readme.stats.guebly.com.br/api/wakatime?username=SEU_USUARIO_WAKATIME&theme=guebly&hide_border=true)
```

### Contributions Heatmap

```md
![Contributions](https://readme.stats.guebly.com.br/api/contributions?username=SEU_USUARIO&theme=guebly&hide_border=true)
```

### Currently Working On

```md
![Working On](https://readme.stats.guebly.com.br/api/working-on?username=SEU_USUARIO&theme=guebly&hide_border=true)
```

### Tech Stack

```md
![Tech Stack](https://readme.stats.guebly.com.br/api/tech-stack?username=SEU_USUARIO&theme=guebly&hide_border=true)
```

### Compare Users

```md
![Compare](https://readme.stats.guebly.com.br/api/compare?user1=SEU_USUARIO&user2=OUTRO_USUARIO&theme=guebly&hide_border=true)
```

### Sponsors Card

```md
![Sponsors](https://readme.stats.guebly.com.br/api/sponsors?username=SEU_USUARIO&theme=guebly&hide_border=true)
```

### Activity Graph

```md
![Activity](https://readme.stats.guebly.com.br/api/activity-graph?username=SEU_USUARIO&theme=guebly&hide_border=true)
```

### README completo do perfil

Use a opção **Full Profile README** no [gerador visual](https://readme.stats.guebly.com.br) para gerar um README.md completo com múltiplos cards combinados — basta colar no repositório do seu perfil.

---

## Temas

### Temas exclusivos Guebly

Criados especificamente para este projeto — disponíveis apenas aqui.

<div align="center">

| Tema | Estilo | Preview |
|------|--------|---------|
| `guebly` | Roxo em fundo escuro — o visual assinatura | ![guebly](https://readme.stats.guebly.com.br/api?username=degabrielofi&theme=guebly&show_icons=true&hide_border=true&card_width=300&disable_animations=true) |
| `guebly_neon` | Roxo + ciano brilhante | ![guebly_neon](https://readme.stats.guebly.com.br/api?username=degabrielofi&theme=guebly_neon&show_icons=true&hide_border=true&card_width=300&disable_animations=true) |
| `guebly_aurora` | Verde + violeta degradê | ![guebly_aurora](https://readme.stats.guebly.com.br/api?username=degabrielofi&theme=guebly_aurora&show_icons=true&hide_border=true&card_width=300&disable_animations=true) |
| `guebly_sunset` | Laranja quente em fundo escuro | ![guebly_sunset](https://readme.stats.guebly.com.br/api?username=degabrielofi&theme=guebly_sunset&show_icons=true&hide_border=true&card_width=300&disable_animations=true) |
| `guebly_ice` | Ciano gélido | ![guebly_ice](https://readme.stats.guebly.com.br/api?username=degabrielofi&theme=guebly_ice&show_icons=true&hide_border=true&card_width=300&disable_animations=true) |
| `guebly_rose` | Rosa em fundo noir | ![guebly_rose](https://readme.stats.guebly.com.br/api?username=degabrielofi&theme=guebly_rose&show_icons=true&hide_border=true&card_width=300&disable_animations=true) |
| `guebly_matrix` | Estética terminal verde | ![guebly_matrix](https://readme.stats.guebly.com.br/api?username=degabrielofi&theme=guebly_matrix&show_icons=true&hide_border=true&card_width=300&disable_animations=true) |
| `guebly_minimal` | Monocromático neutro | ![guebly_minimal](https://readme.stats.guebly.com.br/api?username=degabrielofi&theme=guebly_minimal&show_icons=true&hide_border=true&card_width=300&disable_animations=true) |
| `guebly_gold` | Dourado em fundo âmbar | ![guebly_gold](https://readme.stats.guebly.com.br/api?username=degabrielofi&theme=guebly_gold&show_icons=true&hide_border=true&card_width=300&disable_animations=true) |
| `guebly_cyber` | Névoa roxa cyberpunk | ![guebly_cyber](https://readme.stats.guebly.com.br/api?username=degabrielofi&theme=guebly_cyber&show_icons=true&hide_border=true&card_width=300&disable_animations=true) |

</div>

### Temas clássicos

`dark` · `radical` · `merko` · `gruvbox` · `tokyonight` · `onedark` · `cobalt` · `synthwave` · `dracula` · `github_dark` · `github_dark_dimmed` · `catppuccin_mocha` · `nord` · `react` · `nightowl` · `aura` · `rose_pine` · `outrun` · `ambient_gradient` · `monokai` · `highcontrast` · mais de 40 outros.

Preview completo dos temas: [themes/README.md](./themes/README.md)

### Usando um tema

```md
![Stats](https://readme.stats.guebly.com.br/api?username=SEU_USUARIO&theme=guebly_neon)
```

### Cores personalizadas (via URL)

Sobrescreva qualquer cor individualmente com valores hex (sem `#`). Funciona em todos os tipos de cards:

```md
![Stats](https://readme.stats.guebly.com.br/api?username=SEU_USUARIO&title_color=6E40C9&text_color=ffffff&icon_color=A78BFA&bg_color=0D1117&border_color=30363D)
```

Você também pode usar o painel **Custom Colors** no gerador visual para pré-visualizar as cores em tempo real antes de copiar a URL.

### Fundo com degradê

Formato: `angulo,cor1,cor2[,cor3...]`

```md
&bg_color=30,6E40C9,0D1117
```

---

## Referência da API

---

### `/api` — Stats Card

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** Nome de usuário do GitHub |
| `theme` | string | `default` | Tema do card |
| `show_icons` | boolean | `false` | Mostrar ícones das estatísticas |
| `hide` | string | — | Ocultar stats (separados por vírgula): `stars`, `commits`, `prs`, `issues`, `contribs` |
| `hide_rank` | boolean | `false` | Ocultar o círculo de ranking |
| `show` | string | — | Stats extras: `prs_merged`, `prs_merged_percentage`, `discussions_started`, `discussions_answered` |
| `include_all_commits` | boolean | `false` | Contar commits de todos os tempos |
| `count_private` | boolean | `false` | Contar commits de repos privados (requer GitHub Settings > Profile > "Private contributions" = ON) |
| `custom_title` | string | — | Título customizado |
| `hide_title` | boolean | `false` | Ocultar título |
| `hide_border` | boolean | `false` | Ocultar borda |
| `card_width` | number | — | Largura customizada em px |
| `border_radius` | number | `4.5` | Raio da borda em px |
| `rank_icon` | string | `default` | Estilo do ícone de ranking: `default`, `github`, `percentile` |
| `locale` | string | `en` | Código do idioma (ISO 639-1) |
| `disable_animations` | boolean | `false` | Desabilitar animações SVG |
| `cache_seconds` | number | `21600` | Duração do cache em segundos (mín. 21600) |
| `title_color` | hex | — | Cor do título (sem `#`) |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor dos ícones |
| `ring_color` | hex | — | Cor do anel de ranking |
| `bg_color` | hex | — | Fundo ou degradê |
| `border_color` | hex | — | Cor da borda |

---

### `/api/top-langs` — Top Languages

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** |
| `theme` | string | `default` | Tema |
| `layout` | string | `normal` | Layout: `normal`, `compact`, `donut`, `donut-vertical`, `pie` |
| `langs_count` | number | `5` | Número de linguagens (máx. 20) |
| `hide` | string | — | Linguagens a ocultar (separadas por vírgula) |
| `custom_title` | string | — | Título customizado |
| `hide_title` | boolean | `false` | Ocultar título |
| `hide_border` | boolean | `false` | Ocultar borda |
| `card_width` | number | — | Largura em px |
| `border_radius` | number | `4.5` | Raio da borda |
| `locale` | string | `en` | Código do idioma |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor dos ícones |
| `bg_color` | hex | — | Fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/streak` — Streak Card

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** |
| `theme` | string | `default` | Tema |
| `hide_border` | boolean | `false` | Ocultar borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `locale` | string | `en` | Código do idioma |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor do ícone de fogo |
| `bg_color` | hex | — | Fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/social` — Social Card

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** |
| `theme` | string | `default` | Tema |
| `hide_border` | boolean | `false` | Ocultar borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do nome |
| `text_color` | hex | — | Cor do texto e stats |
| `icon_color` | hex | — | Cor dos ícones e anel do avatar |
| `bg_color` | hex | — | Fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/trophy` — Trophy Card

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** |
| `theme` | string | `default` | Tema |
| `hide_border` | boolean | `false` | Ocultar borda |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor dos ícones |
| `bg_color` | hex | — | Fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/pin` — Repo Pin

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** |
| `repo` | string | — | **Obrigatório.** Nome do repositório |
| `theme` | string | `default` | Tema |
| `show_owner` | boolean | `false` | Mostrar dono no título |
| `hide_border` | boolean | `false` | Ocultar borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `locale` | string | `en` | Código do idioma |
| `description_lines_count` | number | `3` | Máx. de linhas da descrição |
| `cache_seconds` | number | `1800` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor dos ícones |
| `bg_color` | hex | — | Fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/gist` — Gist Card

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `id` | string | — | **Obrigatório.** ID do Gist |
| `username` | string | — | Dono do gist |
| `theme` | string | `default` | Tema |
| `hide_border` | boolean | `false` | Ocultar borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `cache_seconds` | number | `1800` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor dos ícones |
| `bg_color` | hex | — | Fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/wakatime` — WakaTime Card

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** Usuário do WakaTime |
| `theme` | string | `default` | Tema |
| `layout` | string | `normal` | Layout: `normal`, `compact` |
| `langs_count` | number | `5` | Linguagens a exibir |
| `api_domain` | string | `wakatime.com` | Domínio customizado da API WakaTime |
| `range` | string | — | Período: `last_7_days`, `last_30_days`, `last_6_months`, `last_year`, `all_time` |
| `custom_title` | string | — | Título customizado |
| `hide_title` | boolean | `false` | Ocultar título |
| `hide_border` | boolean | `false` | Ocultar borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `locale` | string | `en` | Código do idioma |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor dos ícones |
| `bg_color` | hex | — | Fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/contributions` — Contributions Heatmap

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** Nome de usuário do GitHub |
| `theme` | string | `default` | Tema |
| `hide_border` | boolean | `false` | Ocultar borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `custom_title` | string | — | Título customizado |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor do heatmap (intensidade das células) |
| `bg_color` | hex | — | Fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/working-on` — Currently Working On

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** Nome de usuário do GitHub |
| `theme` | string | `default` | Tema |
| `hide_border` | boolean | `false` | Ocultar borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `custom_title` | string | — | Título customizado |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor dos ícones |
| `bg_color` | hex | — | Fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/tech-stack` — Tech Stack

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** Nome de usuário do GitHub |
| `theme` | string | `default` | Tema |
| `hide_border` | boolean | `false` | Ocultar borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `custom_title` | string | — | Título customizado |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor dos ícones de categoria |
| `bg_color` | hex | — | Fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/compare` — Compare Users

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `user1` | string | — | **Obrigatório.** Primeiro usuário |
| `user2` | string | — | **Obrigatório.** Segundo usuário |
| `theme` | string | `default` | Tema |
| `hide_border` | boolean | `false` | Ocultar borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor dos ícones |
| `bg_color` | hex | — | Fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/sponsors` — Sponsors / Support

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** Nome de usuário do GitHub |
| `theme` | string | `default` | Tema |
| `hide_border` | boolean | `false` | Ocultar borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `custom_title` | string | — | Título customizado |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor dos ícones |
| `bg_color` | hex | — | Fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/activity-graph` — Activity Graph

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** Nome de usuário do GitHub |
| `theme` | string | `default` | Tema |
| `hide_border` | boolean | `false` | Ocultar borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `custom_title` | string | — | Título customizado |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor da linha e pontos |
| `bg_color` | hex | — | Fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/status/rate-limit` — Dashboard de Rate Limit

Retorna JSON com status do token, quota restante de rate limit e visão geral de saúde. Sem autenticação necessária.

```
GET https://readme.stats.guebly.com.br/api/status/rate-limit
```

---

## Performance e cache

Os cards são servidos como SVG puro via funções serverless na Vercel, com cache agressivo para garantir performance:

| Aspecto | Detalhe |
|---------|---------|
| **Cache padrão** | 6 horas (21.600s) para a maioria dos endpoints |
| **Cache mínimo** | 6 horas — o parâmetro `cache_seconds` aceita valores >= 21600 |
| **Repo Pin / Gist** | Cache de 30 minutos (1.800s) por atualizar com mais frequência |
| **CDN** | Vercel Edge Network — os SVGs são servidos do edge mais próximo |
| **Rate limit** | Cada PAT tem 5.000 req/hora na API do GitHub; use múltiplos tokens para escalar |
| **Tamanho do SVG** | Geralmente < 10 KB — carrega mais rápido que qualquer imagem rasterizada |

> **Dica:** Para forçar atualização imediata, adicione um parâmetro aleatório como `&v=2` para invalidar o cache do navegador. O cache do servidor respeita o TTL configurado.

---

## Modo embed

Compartilhe seu card em qualquer site, portfólio ou Notion usando a página de embed:

```
https://readme.stats.guebly.com.br/embed.html?url=URL_DO_SEU_CARD
```

Ou use parâmetros de query diretamente:

```
https://readme.stats.guebly.com.br/embed.html?username=SEU_USUARIO&type=stats&theme=guebly
```

Tipos disponíveis: `stats`, `top-langs`, `streak`, `social`, `trophy`, `contributions`, `activity-graph`, `working-on`, `tech-stack`, `sponsors`.

---

## Compartilhamento em redes sociais

O site [readme.stats.guebly.com.br](https://readme.stats.guebly.com.br) inclui um gerador visual completo com compartilhamento integrado:

- **Download PNG (resolução 2x)** — gere seu card e clique em "Download PNG"
- **Compartilhar no Twitter/X** — abre um tweet com o link do card
- **Compartilhar no LinkedIn** — abre o diálogo de compartilhamento do LinkedIn
- **Compartilhar no WhatsApp** — abre uma conversa com a mensagem pronta
- **Instagram** — baixe o PNG e poste diretamente no app

---

## Idiomas suportados

| Código | Idioma |
|--------|--------|
| `en` | English (padrão) |
| `pt-br` | Português (BR) |
| `es` | Español |
| `de` | Deutsch |
| `fr` | Français |
| `it` | Italiano |
| `ja` | 日本語 |
| `zh-cn` | 中文 |
| `ko` | 한국어 |
| `ru` | Русский |
| `ar` | العربية |

---

## Self-hosting

Quer rodar sua própria instância privada? Você pode fazer deploy direto na Vercel — sem necessidade de fork.

### Pré-requisitos

- Um [GitHub Personal Access Token](https://github.com/settings/tokens) (nenhum scope necessário para dados públicos; adicione `read:user` para contagem de contribuições privadas)
- Uma conta na [Vercel](https://vercel.com) (o plano gratuito funciona)

### Deploy na Vercel

```
1. Abra o dashboard da Vercel em vercel.com/new
2. Importe o repositório Guebly/guebly-readme-stats
3. Configure as variáveis de ambiente (veja abaixo)
4. Clique em Deploy — pronto!
```

### Variáveis de ambiente

| Variável | Obrigatório | Descrição |
|----------|-------------|-----------|
| `PAT_1` | Sim | GitHub Personal Access Token |
| `PAT_2` ... `PAT_10` | Não | Tokens extras para balanceamento de carga |
| `MULTI_PAGE_STARS` | Não | Defina `true` para contagem precisa de estrelas (mais lento) |
| `BLOCKED_USERS` | Não | Lista de usuários bloqueados (separados por vírgula) |
| `ALLOWED_USERS` | Não | Lista de usuários permitidos — restringe o acesso apenas a eles |
| `EXCLUDE_REPOS` | Não | Nomes de repositórios a excluir das estatísticas (separados por vírgula) |

### Múltiplos tokens

Configure `PAT_2`, `PAT_3`, ... `PAT_10` para distribuir requisições entre tokens e evitar rate limiting da API do GitHub. Cada token adiciona 5.000 requisições/hora de capacidade.

### Desenvolvimento local

```bash
git clone https://github.com/Guebly/guebly-readme-stats
cd guebly-readme-stats
npm install
cp .env.example .env   # preencha PAT_1
npm run dev             # inicia servidor Express na porta 9000
```

Pré-visualize um card: `http://localhost:9000/api?username=SEU_USUARIO`

---

## Stack técnica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Vue 3 + Vite (gerador visual de cards) |
| Backend | Node.js 22+ serverless functions |
| API | GitHub GraphQL API + WakaTime API |
| Renderização | Geração de SVG server-side |
| Hospedagem | Vercel (plano gratuito) |

---

## Contribuindo

Tem uma ideia para um novo tema, um novo tipo de card ou uma correção de bug? Contribuições que melhoram a plataforma para todos são bem-vindas.

- **Novos temas** — siga o guia em [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Bugs / sugestões** — [abra uma issue](https://github.com/Guebly/guebly-readme-stats/issues)
- **Pull requests** — mantenha-os focados e descreva qual problema resolvem

---

## Segurança

Para reportar vulnerabilidades de segurança, veja [SECURITY.md](./SECURITY.md).

---

## Licença

MIT © [Guebly](https://guebly.com.br)
