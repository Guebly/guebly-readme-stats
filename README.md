<div align="center">

# ⚡ Guebly ReadMe Stats

**Dynamic GitHub stats cards for your profile README.**

[![Live](https://img.shields.io/badge/Live-readme.stats.guebly.com.br-6E40C9?style=for-the-badge)](https://readme.stats.guebly.com.br)
[![Guebly](https://img.shields.io/badge/by-Guebly-0D1117?style=for-the-badge)](https://guebly.com.br)

</div>

---

## 🚀 Quick Start

```md
![Stats](https://readme.stats.guebly.com.br/api?username=YOUR_USERNAME&theme=guebly&show_icons=true&hide_border=true)
```

```md
![Top Langs](https://readme.stats.guebly.com.br/api/top-langs?username=YOUR_USERNAME&theme=guebly&layout=compact&hide_border=true)
```

## 🎨 Exclusive Themes

| Theme | Preview Colors |
|-------|---------------|
| `guebly` | Purple on dark — the signature look |
| `guebly_neon` | Purple + Cyan glow |
| `guebly_aurora` | Green + Violet gradient |
| `guebly_sunset` | Orange warmth on deep dark |
| `guebly_ice` | Cyan frost |
| `guebly_rose` | Pink on noir |
| `guebly_matrix` | Green terminal aesthetic |
| `guebly_minimal` | Neutral monochrome |
| `guebly_gold` | Gold on dark amber |
| `guebly_cyber` | Cyberpunk purple haze |

Plus all 40+ community themes from the original project.

## 📡 API Endpoints

| Endpoint | Description |
|----------|------------|
| `/api?username=:user` | Stats card |
| `/api/top-langs?username=:user` | Top languages |
| `/api/pin?username=:user&repo=:repo` | Repository pin |
| `/api/gist?id=:gist_id` | Gist card |

## 🔧 Deploy Your Own

1. Fork this repo
2. Create a [GitHub Personal Access Token](https://github.com/settings/tokens) (no scopes needed)
3. Deploy to Vercel and add `PAT_1` environment variable with your token
4. Point your subdomain (`readme.stats.guebly.com.br`) to Vercel

## 📦 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PAT_1` | ✅ | GitHub Personal Access Token |
| `FETCH_MULTI_PAGE_STARS` | ❌ | Set to `true` for full star count |

## 🏗 Built With

- **Frontend**: Vue 3 + Vite (landing page with live generator)
- **Backend**: Node.js serverless functions (Vercel)
- **API**: GitHub GraphQL API + WakaTime API
- **Rendering**: SVG generation server-side
- **Deploy**: Vercel (free tier)

---

<div align="center">

**[guebly.com.br](https://guebly.com.br)**

Based on [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) by Anurag Hazra (MIT License).

</div>
