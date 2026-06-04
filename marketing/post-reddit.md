# Reddit Posts — Guebly ReadMe Stats

---

## r/github

**Title:** I built a tool that generates 14 types of dynamic stats cards for your GitHub README — open source, free forever

**Body:**

Hey everyone! I built **Guebly ReadMe Stats** — a free, open source tool that generates beautiful, dynamic SVG cards for your GitHub profile README.

**What it does:**
- 14 card types: Stats, Top Languages, Streak, Contributions Heatmap, Activity Graph (sparkline), Tech Stack, Social, Trophy, Compare Users, Currently Working On, Sponsors, Repo Pin, Gist, WakaTime
- 70+ themes (10 exclusive)
- Custom colors via URL parameters
- Live visual generator with preview
- Download PNG / Instagram Story export
- Embed mode for Notion, portfolios, blogs
- Self-hostable on Vercel (free tier)

**How to use:**
Just paste this in your README and replace `YOUR_USERNAME`:

```md
![Stats](https://readme.stats.guebly.com.br/api?username=YOUR_USERNAME&theme=guebly&show_icons=true&hide_border=true)
```

Or use the visual generator: **readme.stats.guebly.com.br**

GitHub: github.com/Guebly/guebly-readme-stats

Feedback welcome!

---

## r/webdev

**Title:** Open source GitHub stats card generator — 14 card types, 70+ themes, embed mode, built with Vue 3 + Node.js serverless

**Body:**

Built this as an open source project. Tech stack:

- **Frontend:** Vue 3 + Vite (visual card generator)
- **Backend:** Node.js 22+ serverless functions on Vercel
- **API:** GitHub GraphQL API
- **Rendering:** Server-side SVG generation
- **Tests:** Jest (95 tests passing)

Features that I think are unique:
- Activity Graph: sparkline of monthly commits with animated line drawing
- Compare Users: side-by-side stats comparison
- Tech Stack: languages grouped by category (Frontend, Backend, Mobile, etc.)
- Embed Mode: standalone page for portfolios and Notion
- Rate Limit Dashboard: JSON endpoint showing token health

All cards support gradient backgrounds, custom colors, 17 languages, and 70+ themes.

Live: readme.stats.guebly.com.br
Code: github.com/Guebly/guebly-readme-stats

Would love feedback from the community.

---

## r/opensource

**Title:** Guebly ReadMe Stats — free GitHub profile card generator (14 card types, MIT license)

**Body:**

Sharing a project I've been working on: **Guebly ReadMe Stats**.

It generates dynamic SVG cards for your GitHub profile README. 14 card types, 70+ themes, live preview, and completely free to use.

What makes it different from existing tools:
- More card types (contributions heatmap, activity graph, tech stack, compare users)
- Embed mode for non-GitHub sites
- Visual generator with PNG/Story export
- Self-hostable on Vercel free tier

MIT licensed, contributions welcome.

Link: github.com/Guebly/guebly-readme-stats
