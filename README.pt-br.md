<div align="center">

<img src="https://readme.stats.guebly.com.br/api?username=degabrielofi&theme=guebly&show_icons=true&hide_border=true&count_private=true" width="420" alt="Guebly Stats Card" />

# ⚡ Guebly ReadMe Stats

**Cards de estatísticas GitHub dinâmicos, lindos e 100% grátis para o seu perfil.**

[![Live Demo](https://img.shields.io/badge/🌐_Demo_ao_vivo-readme.stats.guebly.com.br-6E40C9?style=for-the-badge&logoColor=white)](https://readme.stats.guebly.com.br)
[![License MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](./LICENSE)
[![Made by Guebly](https://img.shields.io/badge/Feito_por-Guebly-0D1117?style=for-the-badge&logo=github)](https://guebly.com.br)
[![Node 22+](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)

**[🇺🇸 English Documentation](./README.md)**

</div>

---

## O que é isso?

**Guebly ReadMe Stats** gera **cards SVG dinâmicos** para o seu README do GitHub — atualizados automaticamente a cada acesso. Sem editar imagem, sem atualização manual, sem dor de cabeça.

Cole uma URL no seu README, configure com parâmetros e pronto. O card aparece lindo, atualizado e com o seu estilo.

> Acesse o gerador visual em **[readme.stats.guebly.com.br](https://readme.stats.guebly.com.br)** — configure, copie e cole. Também tem botão pra baixar em PNG e compartilhar no Twitter, LinkedIn e WhatsApp.

---

## Tipos de card disponíveis

| # | Card | Endpoint | O que mostra |
|---|------|----------|-------------|
| 1 | **Stats** | `/api` | Commits, PRs, issues, stars, rank GitHub |
| 2 | **Top Languages** | `/api/top-langs` | Linguagens mais usadas com barra de progresso |
| 3 | **Streak** | `/api/streak` | Sequência atual e recorde de contribuições |
| 4 | **Social** | `/api/social` | Avatar, nome, seguidores e estatísticas rápidas |
| 5 | **Trophy** | `/api/trophy` | Conquistas e badges do GitHub |
| 6 | **Repo Pin** | `/api/pin` | Destaque um repositório específico |
| 7 | **Gist** | `/api/gist` | Exibe um gist com highlight de código |
| 8 | **WakaTime** | `/api/wakatime` | Tempo de código por linguagem (via WakaTime) |

---

## Início rápido

Copie qualquer snippet abaixo e substitua `SEU_USUARIO` pelo seu username do GitHub.

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

> Requer perfil público no [WakaTime](https://wakatime.com).

```md
![WakaTime](https://readme.stats.guebly.com.br/api/wakatime?username=SEU_USUARIO_WAKATIME&theme=guebly&hide_border=true)
```

---

## Temas

### Temas Exclusivos Guebly ⚡

Criados especialmente para o projeto — disponíveis apenas aqui.

| Tema | Estilo |
|------|--------|
| `guebly` | Roxo sobre escuro — o look assinatura |
| `guebly_neon` | Roxo + brilho ciano |
| `guebly_aurora` | Verde + violeta gradiente |
| `guebly_sunset` | Laranja quente no escuro profundo |
| `guebly_ice` | Gelo ciano |
| `guebly_rose` | Rosa sobre noir |
| `guebly_matrix` | Terminal verde — aesthetic hacker |
| `guebly_minimal` | Monocromático neutro |
| `guebly_gold` | Dourado sobre âmbar escuro |
| `guebly_cyber` | Cyberpunk névoa roxa |

### Temas Clássicos

`dark` · `radical` · `merko` · `gruvbox` · `tokyonight` · `onedark` · `cobalt` · `synthwave` · `dracula` · `github_dark` · `github_dark_dimmed` · `catppuccin_mocha` · `nord` · `react` · `nightowl` · `aura` · `rose_pine` · `outrun` · `ambient_gradient` · `monokai` · `highcontrast` · e mais de 40 outros.

Para ver todos os temas com preview: veja [themes/README.md](./themes/README.md)

### Como usar um tema

```md
![Stats](https://readme.stats.guebly.com.br/api?username=SEU_USUARIO&theme=guebly_neon)
```

### Cores customizadas

Você pode sobrescrever qualquer cor individualmente com valores hex (sem `#`):

```md
![Stats](https://readme.stats.guebly.com.br/api?username=SEU_USUARIO
  &title_color=6E40C9
  &text_color=ffffff
  &icon_color=A78BFA
  &bg_color=0D1117
  &border_color=30363D)
```

### Fundo gradiente

Use o formato `ângulo,cor1,cor2[,cor3...]`:

```md
&bg_color=30,6E40C9,0D1117
```

---

## Referência completa da API

### `/api` — Stats Card

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** Username do GitHub |
| `theme` | string | `default` | Tema do card |
| `show_icons` | boolean | `false` | Mostra ícones nas stats |
| `hide` | string | — | Oculta stats (separado por vírgula): `stars`, `commits`, `prs`, `issues`, `contribs` |
| `hide_rank` | boolean | `false` | Oculta o círculo de rank |
| `show` | string | — | Stats extras: `prs_merged`, `prs_merged_percentage`, `discussions_started`, `discussions_answered` |
| `include_all_commits` | boolean | `false` | Conta commits de todos os anos |
| `count_private` | boolean | `false` | Inclui contribuições privadas |
| `custom_title` | string | — | Título customizado |
| `hide_title` | boolean | `false` | Oculta o título |
| `hide_border` | boolean | `false` | Oculta a borda |
| `card_width` | number | — | Largura em px |
| `border_radius` | number | `4.5` | Raio da borda em px |
| `rank_icon` | string | `default` | Ícone do rank: `default`, `github`, `percentile` |
| `locale` | string | `en` | Código de idioma (ISO 639-1) |
| `disable_animations` | boolean | `false` | Desativa animações SVG |
| `cache_seconds` | number | `21600` | Duração do cache (mín. 21600) |
| `title_color` | hex | — | Cor do título (sem `#`) |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor dos ícones |
| `ring_color` | hex | — | Cor do anel do rank |
| `bg_color` | hex | — | Cor de fundo ou gradiente |
| `border_color` | hex | — | Cor da borda |

---

### `/api/top-langs` — Top Languages

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** |
| `theme` | string | `default` | Tema |
| `layout` | string | `normal` | Layout: `normal`, `compact`, `donut`, `donut-vertical`, `pie` |
| `langs_count` | number | `5` | Número de linguagens (máx. 20) |
| `hide` | string | — | Linguagens a ocultar (separado por vírgula) |
| `custom_title` | string | — | Título customizado |
| `hide_title` | boolean | `false` | Oculta o título |
| `hide_border` | boolean | `false` | Oculta a borda |
| `card_width` | number | — | Largura em px |
| `border_radius` | number | `4.5` | Raio da borda |
| `locale` | string | `en` | Idioma |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `bg_color` | hex | — | Cor de fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/streak` — Streak Card

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** |
| `theme` | string | `default` | Tema |
| `hide_border` | boolean | `false` | Oculta a borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `locale` | string | `en` | Idioma |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor da chama |
| `bg_color` | hex | — | Cor de fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/social` — Social Card

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** |
| `theme` | string | `default` | Tema |
| `hide_border` | boolean | `false` | Oculta a borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do nome |
| `text_color` | hex | — | Cor do texto e stats |
| `icon_color` | hex | — | Cor dos ícones e anel do avatar |
| `bg_color` | hex | — | Cor de fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/trophy` — Trophy Card

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** |
| `theme` | string | `default` | Tema |
| `hide_border` | boolean | `false` | Oculta a borda |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor dos ícones |
| `bg_color` | hex | — | Cor de fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/pin` — Repo Pin

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** |
| `repo` | string | — | **Obrigatório.** Nome do repositório |
| `theme` | string | `default` | Tema |
| `show_owner` | boolean | `false` | Mostra username do dono no título |
| `hide_border` | boolean | `false` | Oculta a borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `locale` | string | `en` | Idioma |
| `description_lines_count` | number | `3` | Máximo de linhas na descrição |
| `cache_seconds` | number | `1800` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor dos ícones |
| `bg_color` | hex | — | Cor de fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/gist` — Gist Card

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `id` | string | — | **Obrigatório.** ID do Gist |
| `username` | string | — | Username do dono do gist |
| `theme` | string | `default` | Tema |
| `hide_border` | boolean | `false` | Oculta a borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `cache_seconds` | number | `1800` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor dos ícones |
| `bg_color` | hex | — | Cor de fundo |
| `border_color` | hex | — | Cor da borda |

---

### `/api/wakatime` — WakaTime Card

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `username` | string | — | **Obrigatório.** Username do WakaTime |
| `theme` | string | `default` | Tema |
| `layout` | string | `normal` | Layout: `normal`, `compact` |
| `langs_count` | number | `5` | Linguagens a exibir |
| `api_domain` | string | `wakatime.com` | Domínio customizado do WakaTime |
| `range` | string | — | Período: `last_7_days`, `last_30_days`, `last_6_months`, `last_year`, `all_time` |
| `custom_title` | string | — | Título customizado |
| `hide_title` | boolean | `false` | Oculta o título |
| `hide_border` | boolean | `false` | Oculta a borda |
| `border_radius` | number | `4.5` | Raio da borda |
| `locale` | string | `en` | Idioma |
| `cache_seconds` | number | `21600` | Duração do cache |
| `title_color` | hex | — | Cor do título |
| `text_color` | hex | — | Cor do texto |
| `icon_color` | hex | — | Cor dos ícones |
| `bg_color` | hex | — | Cor de fundo |
| `border_color` | hex | — | Cor da borda |

---

## Compartilhando no Instagram, LinkedIn e mais

O site [readme.stats.guebly.com.br](https://readme.stats.guebly.com.br) tem um gerador visual completo com:

- **Download PNG em alta resolução (2x)** — clique em "Download PNG" depois de gerar seu card
- **Compartilhar direto no Twitter/X** — abre janela de post com o link
- **Compartilhar no LinkedIn** — abre o compartilhador do LinkedIn
- **Compartilhar no WhatsApp** — abre conversa com a mensagem pronta
- **Instagram** — baixe o PNG e poste diretamente no app

---

## Idiomas suportados

Os cards suportam múltiplos idiomas via parâmetro `locale`.

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

Quer rodar sua própria instância privada? Basta fazer o deploy direto pelo Vercel — sem precisar fazer fork.

### Pré-requisitos

- [Personal Access Token do GitHub](https://github.com/settings/tokens) (sem escopos para dados públicos; adicione `read:user` para contribuições privadas)
- Conta no [Vercel](https://vercel.com) (free tier funciona)

### Deploy no Vercel

1. Abra o [dashboard do Vercel](https://vercel.com/new) e importe o repositório
2. Configure as variáveis de ambiente abaixo
3. Clique em Deploy — pronto

### Variáveis de ambiente

| Variável | Obrigatório | Descrição |
|----------|------------|-----------|
| `PAT_1` | ✅ | GitHub Personal Access Token |
| `PAT_2` … `PAT_10` | ❌ | Tokens extras para balancear as requisições |
| `MULTI_PAGE_STARS` | ❌ | `true` para contagem precisa de stars (mais lento) |
| `BLOCKED_USERS` | ❌ | Usernames bloqueados (separados por vírgula) |
| `ALLOWED_USERS` | ❌ | Restringe o acesso a estes usuários apenas |
| `EXCLUDE_REPOS` | ❌ | Repositórios a ignorar nas estatísticas (separados por vírgula) |

### Múltiplos tokens

Configure `PAT_2`, `PAT_3`, … `PAT_10` para distribuir requisições entre vários tokens e evitar rate limiting do GitHub.

### Desenvolvimento local

```bash
git clone https://github.com/Guebly/guebly-readme-stats
cd guebly-readme-stats
npm install
cp .env.example .env   # preencha o PAT_1
npm run dev            # inicia servidor Express na porta 9000
```

Preview de um card: `http://localhost:9000/api?username=SEU_USUARIO`

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Vue 3 + Vite — gerador visual de cards |
| Backend | Node.js 22+ com funções serverless |
| API | GitHub GraphQL + WakaTime API |
| Renderização | SVG gerado no servidor |
| Deploy | Vercel (free tier) |

---

## Contribuindo

Tem ideia de novo tema, novo tipo de card, ou encontrou um bug? Contribuições que melhoram a plataforma para todos são bem-vindas.

- **Novos temas** — siga o guia em [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Bugs / sugestões de feature** — [abra uma issue](https://github.com/Guebly/guebly-readme-stats/issues)
- **Pull requests** — mantenha o foco e descreva qual problema está resolvendo

---

## Segurança

Para reportar vulnerabilidades de segurança, consulte [SECURITY.md](./SECURITY.md).

---

## Licença

MIT © [Guebly](https://guebly.com.br)
