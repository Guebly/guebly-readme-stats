<div align="center">

<img src="https://readme.stats.guebly.com.br/api?username=degabrielofi&theme=guebly&show_icons=true&hide_border=true&count_private=true" width="420" alt="Guebly Stats Card" />

# ⚡ Guebly ReadMe Stats

**Dynamic, beautiful GitHub stats cards for your profile README — always up to date.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-readme.stats.guebly.com.br-6E40C9?style=for-the-badge&logoColor=white)](https://readme.stats.guebly.com.br)
[![License MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](./LICENSE)
[![Made by Guebly](https://img.shields.io/badge/Made_by-Guebly-0D1117?style=for-the-badge&logo=github)](https://guebly.com.br)
[![Node 22+](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)

**[🇧🇷 Documentação em Português](./README.pt-br.md)**

</div>

---

## What is this?

**Guebly ReadMe Stats** generates beautiful, dynamic SVG cards for your GitHub profile README — updated automatically on every request. No image editing, no manual updates.

Just paste a URL into your README, customize with query parameters, and you're done.

> Use the visual generator at **[readme.stats.guebly.com.br](https://readme.stats.guebly.com.br)** — configure your card, copy the snippet, and even download as PNG to share on Instagram, LinkedIn, Twitter, and WhatsApp.

---

## Available card types

| # | Card | Endpoint | Shows |
|---|------|----------|-------|
| 1 | **Stats** | `/api` | Commits, PRs, issues, stars, GitHub rank |
| 2 | **Top Languages** | `/api/top-langs` | Most used programming languages |
| 3 | **Streak** | `/api/streak` | Current and longest contribution streak |
| 4 | **Social** | `/api/social` | Avatar, name, followers and quick stats |
| 5 | **Trophy** | `/api/trophy` | GitHub achievement badges |
| 6 | **Repo Pin** | `/api/pin` | Highlight a specific repository |
| 7 | **Gist** | `/api/gist` | Display a gist with code highlighting |
| 8 | **WakaTime** | `/api/wakatime` | Coding time breakdown by language |

---

## Quick Start

Replace `YOUR_USERNAME` with your GitHub username.

### Stats Card

```md
![GitHub Stats](https://readme.stats.guebly.com.br/api?username=YOUR_USERNAME&theme=guebly&show_icons=true&hide_border=true)
```

### Top Languages

```md
![Top Langs](https://readme.stats.guebly.com.br/api/top-langs?username=YOUR_USERNAME&theme=guebly&layout=compact&hide_border=true)
```

### Streak Card

```md
![Streak](https://readme.stats.guebly.com.br/api/streak?username=YOUR_USERNAME&theme=guebly&hide_border=true)
```

### Social Card

```md
![Social](https://readme.stats.guebly.com.br/api/social?username=YOUR_USERNAME&theme=guebly&hide_border=true)
```

### Trophy Card

```md
![Trophies](https://readme.stats.guebly.com.br/api/trophy?username=YOUR_USERNAME&theme=guebly&hide_border=true)
```

### Repo Pin

```md
[![My Repo](https://readme.stats.guebly.com.br/api/pin?username=YOUR_USERNAME&repo=REPO_NAME&theme=guebly)](https://github.com/YOUR_USERNAME/REPO_NAME)
```

### WakaTime Card

> Requires a public [WakaTime](https://wakatime.com) profile.

```md
![WakaTime](https://readme.stats.guebly.com.br/api/wakatime?username=YOUR_WAKATIME_USERNAME&theme=guebly&hide_border=true)
```

---

## Themes

### Guebly Exclusive Themes ⚡

Created specifically for this project — only available here.

| Theme | Style |
|-------|-------|
| `guebly` | Purple on dark — the signature look |
| `guebly_neon` | Purple + cyan glow |
| `guebly_aurora` | Green + violet gradient |
| `guebly_sunset` | Warm orange on deep dark |
| `guebly_ice` | Cyan frost |
| `guebly_rose` | Pink on noir |
| `guebly_matrix` | Green terminal aesthetic |
| `guebly_minimal` | Neutral monochrome |
| `guebly_gold` | Gold on dark amber |
| `guebly_cyber` | Cyberpunk purple haze |

### Classic Themes

`dark` · `radical` · `merko` · `gruvbox` · `tokyonight` · `onedark` · `cobalt` · `synthwave` · `dracula` · `github_dark` · `github_dark_dimmed` · `catppuccin_mocha` · `nord` · `react` · `nightowl` · `aura` · `rose_pine` · `outrun` · `ambient_gradient` · `monokai` · `highcontrast` · 40+ more.

Full theme preview: [themes/README.md](./themes/README.md)

### Using a theme

```md
![Stats](https://readme.stats.guebly.com.br/api?username=YOUR_USERNAME&theme=guebly_neon)
```

### Custom colors

Override any color individually with hex values (no `#`):

```md
![Stats](https://readme.stats.guebly.com.br/api?username=YOUR_USERNAME&title_color=6E40C9&text_color=ffffff&icon_color=A78BFA&bg_color=0D1117&border_color=30363D)
```

### Gradient background

Format: `angle,color1,color2[,color3...]`

```md
&bg_color=30,6E40C9,0D1117
```

---

## API Reference

### `/api` — Stats Card

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | — | **Required.** GitHub username |
| `theme` | string | `default` | Card theme |
| `show_icons` | boolean | `false` | Show stat icons |
| `hide` | string | — | Hide stats (comma-separated): `stars`, `commits`, `prs`, `issues`, `contribs` |
| `hide_rank` | boolean | `false` | Hide the rank circle |
| `show` | string | — | Extra stats: `prs_merged`, `prs_merged_percentage`, `discussions_started`, `discussions_answered` |
| `include_all_commits` | boolean | `false` | Count all-time commits |
| `count_private` | boolean | `false` | Count commits from private repos (requires GitHub Settings › Profile › "Private contributions" = ON) |
| `custom_title` | string | — | Override card title |
| `hide_title` | boolean | `false` | Hide card title |
| `hide_border` | boolean | `false` | Hide card border |
| `card_width` | number | — | Custom width in px |
| `border_radius` | number | `4.5` | Border radius in px |
| `rank_icon` | string | `default` | Rank icon style: `default`, `github`, `percentile` |
| `locale` | string | `en` | Language code (ISO 639-1) |
| `disable_animations` | boolean | `false` | Disable SVG animations |
| `cache_seconds` | number | `21600` | Cache duration in seconds (min 21600) |
| `title_color` | hex | — | Title color (no `#`) |
| `text_color` | hex | — | Body text color |
| `icon_color` | hex | — | Icon color |
| `ring_color` | hex | — | Rank ring color |
| `bg_color` | hex | — | Background or gradient |
| `border_color` | hex | — | Border color |

---

### `/api/top-langs` — Top Languages

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | — | **Required.** |
| `theme` | string | `default` | Theme |
| `layout` | string | `normal` | Layout: `normal`, `compact`, `donut`, `donut-vertical`, `pie` |
| `langs_count` | number | `5` | Number of languages (max 20) |
| `hide` | string | — | Languages to hide (comma-separated) |
| `custom_title` | string | — | Override title |
| `hide_title` | boolean | `false` | Hide title |
| `hide_border` | boolean | `false` | Hide border |
| `card_width` | number | — | Width in px |
| `border_radius` | number | `4.5` | Border radius |
| `locale` | string | `en` | Language code |
| `cache_seconds` | number | `21600` | Cache duration |
| `title_color` | hex | — | Title color |
| `text_color` | hex | — | Text color |
| `bg_color` | hex | — | Background |
| `border_color` | hex | — | Border color |

---

### `/api/streak` — Streak Card

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | — | **Required.** |
| `theme` | string | `default` | Theme |
| `hide_border` | boolean | `false` | Hide border |
| `border_radius` | number | `4.5` | Border radius |
| `locale` | string | `en` | Language code |
| `cache_seconds` | number | `21600` | Cache duration |
| `title_color` | hex | — | Title color |
| `text_color` | hex | — | Text color |
| `icon_color` | hex | — | Flame icon color |
| `bg_color` | hex | — | Background |
| `border_color` | hex | — | Border color |

---

### `/api/social` — Social Card

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | — | **Required.** |
| `theme` | string | `default` | Theme |
| `hide_border` | boolean | `false` | Hide border |
| `border_radius` | number | `4.5` | Border radius |
| `cache_seconds` | number | `21600` | Cache duration |
| `title_color` | hex | — | Name color |
| `text_color` | hex | — | Text and stats color |
| `icon_color` | hex | — | Icon and avatar ring color |
| `bg_color` | hex | — | Background |
| `border_color` | hex | — | Border color |

---

### `/api/trophy` — Trophy Card

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | — | **Required.** |
| `theme` | string | `default` | Theme |
| `hide_border` | boolean | `false` | Hide border |
| `cache_seconds` | number | `21600` | Cache duration |
| `title_color` | hex | — | Title color |
| `text_color` | hex | — | Text color |
| `icon_color` | hex | — | Icon color |
| `bg_color` | hex | — | Background |
| `border_color` | hex | — | Border color |

---

### `/api/pin` — Repo Pin

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | — | **Required.** |
| `repo` | string | — | **Required.** Repository name |
| `theme` | string | `default` | Theme |
| `show_owner` | boolean | `false` | Show owner in title |
| `hide_border` | boolean | `false` | Hide border |
| `border_radius` | number | `4.5` | Border radius |
| `locale` | string | `en` | Language code |
| `description_lines_count` | number | `3` | Max description lines |
| `cache_seconds` | number | `1800` | Cache duration |
| `title_color` | hex | — | Title color |
| `text_color` | hex | — | Text color |
| `icon_color` | hex | — | Icon color |
| `bg_color` | hex | — | Background |
| `border_color` | hex | — | Border color |

---

### `/api/gist` — Gist Card

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | string | — | **Required.** Gist ID |
| `username` | string | — | Gist owner username |
| `theme` | string | `default` | Theme |
| `hide_border` | boolean | `false` | Hide border |
| `border_radius` | number | `4.5` | Border radius |
| `cache_seconds` | number | `1800` | Cache duration |
| `title_color` | hex | — | Title color |
| `text_color` | hex | — | Text color |
| `icon_color` | hex | — | Icon color |
| `bg_color` | hex | — | Background |
| `border_color` | hex | — | Border color |

---

### `/api/wakatime` — WakaTime Card

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | — | **Required.** WakaTime username |
| `theme` | string | `default` | Theme |
| `layout` | string | `normal` | Layout: `normal`, `compact` |
| `langs_count` | number | `5` | Languages to display |
| `api_domain` | string | `wakatime.com` | Custom WakaTime API domain |
| `range` | string | — | Range: `last_7_days`, `last_30_days`, `last_6_months`, `last_year`, `all_time` |
| `custom_title` | string | — | Override title |
| `hide_title` | boolean | `false` | Hide title |
| `hide_border` | boolean | `false` | Hide border |
| `border_radius` | number | `4.5` | Border radius |
| `locale` | string | `en` | Language code |
| `cache_seconds` | number | `21600` | Cache duration |
| `title_color` | hex | — | Title color |
| `text_color` | hex | — | Text color |
| `icon_color` | hex | — | Icon color |
| `bg_color` | hex | — | Background |
| `border_color` | hex | — | Border color |

---

## Sharing on Instagram, LinkedIn & more

The site [readme.stats.guebly.com.br](https://readme.stats.guebly.com.br) includes a full visual generator with sharing built in:

- **Download PNG (2x resolution)** — generate your card and click "Download PNG"
- **Share on Twitter/X** — opens a tweet with the card link
- **Share on LinkedIn** — opens the LinkedIn share dialog
- **Share on WhatsApp** — opens a conversation with the message ready
- **Instagram** — download the PNG and post directly in the app

---

## Supported languages

| Code | Language |
|------|----------|
| `en` | English (default) |
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

Want to run your own private instance? You can deploy directly to Vercel — no fork required.

### Prerequisites

- A [GitHub Personal Access Token](https://github.com/settings/tokens) (no scopes needed for public data; add `read:user` for private contribution counts)
- A [Vercel](https://vercel.com) account (free tier works)

### Deploy to Vercel

1. Open the [Vercel dashboard](https://vercel.com/new) and import the repository
2. Set the environment variables below
3. Deploy — done

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PAT_1` | ✅ | GitHub Personal Access Token |
| `PAT_2` … `PAT_10` | ❌ | Extra tokens for request load-balancing |
| `MULTI_PAGE_STARS` | ❌ | Set `true` for accurate star counts (slower) |
| `BLOCKED_USERS` | ❌ | Comma-separated list of blocked usernames |
| `ALLOWED_USERS` | ❌ | Comma-separated list — restricts access to these users only |
| `EXCLUDE_REPOS` | ❌ | Comma-separated repository names to exclude from stats |

### Multiple tokens

Set `PAT_2`, `PAT_3`, … `PAT_10` to distribute requests across tokens and avoid GitHub API rate limiting.

### Local development

```bash
git clone https://github.com/Guebly/guebly-readme-stats
cd guebly-readme-stats
npm install
cp .env.example .env   # fill in PAT_1
npm run dev            # starts Express server on port 9000
```

Preview a card: `http://localhost:9000/api?username=YOUR_USERNAME`

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vue 3 + Vite (visual card generator) |
| Backend | Node.js 22+ serverless functions |
| API | GitHub GraphQL API + WakaTime API |
| Rendering | Server-side SVG generation |
| Hosting | Vercel (free tier) |

---

## Contributing

Have an idea for a new theme, a new card type, or a bug fix? Contributions that improve the platform for everyone are welcome.

- **New themes** — follow the guide in [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Bug reports / feature requests** — [open an issue](https://github.com/Guebly/guebly-readme-stats/issues)
- **Pull requests** — keep them focused and describe what problem they solve

---

## Security

To report security vulnerabilities, see [SECURITY.md](./SECURITY.md).

---

## License

MIT © [Guebly](https://guebly.com.br)
