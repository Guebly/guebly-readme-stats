# Contributing to Guebly ReadMe Stats

First off — thank you for taking the time to contribute! Every bug report, feature idea, translation, and pull request makes this project better.

---

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Local Development](#local-development)
- [Project Structure](#project-structure)
- [Adding a Theme](#adding-a-theme)
- [Adding a Translation](#adding-a-translation)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [License](#license)

---

## Ways to Contribute

- **Report a bug** — open an issue with steps to reproduce
- **Suggest a feature** — open an issue describing the idea
- **Fix a bug** — fork, fix, and open a pull request
- **Add a translation** — help localize card text
- **Improve docs** — fix typos, add examples, clarify parameters
- **Add a theme** — design a new color palette

---

## Local Development

### Requirements

- Node.js ≥ 22 (use [nvm](https://github.com/nvm-sh/nvm): `nvm use`)
- A GitHub Personal Access Token ([generate one here](https://github.com/settings/tokens) — no scopes needed)

### Setup

```bash
# 1. Fork the repo and clone your fork
git clone https://github.com/YOUR_USERNAME/guebly-readme-stats
cd guebly-readme-stats/devcard

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# Then edit .env and add:  PAT_1=your_token_here

# 4. Start the development server
npm run dev
# → Express server running at http://localhost:9000
```

### Testing a card locally

Open your browser and navigate to:

```
http://localhost:9000/api?username=YOUR_USERNAME
http://localhost:9000/api/streak?username=YOUR_USERNAME
http://localhost:9000/api/social?username=YOUR_USERNAME
http://localhost:9000/api/top-langs?username=YOUR_USERNAME
```

### Running tests

```bash
npm test          # run all tests
npm run test:watch  # watch mode
```

### Linting & formatting

```bash
npm run lint      # check ESLint rules
npm run prettier  # check Prettier formatting
```

---

## Project Structure

```
devcard/
├── api/              # Vercel serverless function handlers (one per endpoint)
│   ├── index.js      # /api → stats card
│   ├── streak.js     # /api/streak → streak card
│   ├── social.js     # /api/social → social card
│   ├── top-langs.js  # /api/top-langs → top languages card
│   ├── pin.js        # /api/pin → repository pin card
│   ├── trophy.js     # /api/trophy → trophy card
│   ├── gist.js       # /api/gist → gist card
│   └── wakatime.js   # /api/wakatime → WakaTime card
│
├── src/
│   ├── cards/        # SVG rendering logic for each card type
│   ├── fetchers/     # GitHub / WakaTime API data fetchers
│   ├── common/       # Shared utilities (colors, cache, errors, icons, etc.)
│   └── translations.js  # All localized strings
│
├── themes/           # Theme color definitions
├── app/              # Vue 3 frontend (live card generator at readme.stats.guebly.com.br)
└── tests/            # Jest test files
```

### Request flow

```
User request → api/[card].js → src/fetchers/[card].js → GitHub API
                                        ↓
                             src/cards/[card].js (SVG renderer)
                                        ↓
                              SVG response (image/svg+xml)
```

---

## Adding a Theme

Themes are defined in the `themes/` directory.

1. Open `themes/index.js` (or the relevant theme file)
2. Add a new entry following the existing format:

```js
your_theme_name: {
  title_color: "6E40C9",     // hex without #
  icon_color:  "A78BFA",
  text_color:  "FFFFFF",
  bg_color:    "0D1117",
  border_color: "30363D",
},
```

3. Run `npm run themes:generate` to rebuild the theme exports
4. Test it with `?theme=your_theme_name` locally
5. Open a pull request with a short description and preview screenshot

> **Note:** Theme names should be lowercase and use underscores.

---

## Adding a Translation

Card text (like "Stars", "Commits", "Top Languages") is localized in `src/translations.js`.

To add a new language:

1. Open `src/translations.js`
2. Find each translation object and add a new key using the [ISO 639-1](https://www.andiamo.co.uk/resources/iso-language-codes/) language code:

```js
// Example: adding Brazilian Portuguese
{
  en: "Stars",
  "pt-br": "Estrelas",  // ← add here
  es: "Estrellas",
  // ...
}
```

3. Make sure **every** translation object has the new key
4. Test with `?locale=pt-br` locally
5. Open a pull request

---

## Bug Reports

A great bug report includes:

- **Summary** — what is broken?
- **Steps to reproduce** — exact URL or markdown snippet that shows the bug
- **Expected behavior** — what should happen?
- **Actual behavior** — what actually happens? (include a screenshot if visual)
- **Environment** — browser, deployed instance URL, or local

[Open a bug report →](../../issues/new)

---

## Feature Requests

A great feature request includes:

- **What** — describe the feature clearly
- **Why** — what problem does it solve or what value does it add?
- **Mockup or example** — links, screenshots, or code snippets are very helpful

[Open a feature request →](../../issues/new)

---

## Pull Request Process

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```

2. **Make your changes** — keep commits focused and descriptive

3. **Add or update tests** if you're changing card logic or fetchers

4. **Update the docs** in `README.md` if your change adds or modifies a parameter or feature

5. **Open a pull request** against `main` with:
   - A clear title describing the change
   - A description of what was changed and why
   - Screenshots or card previews if the change is visual

6. **Wait for review** — we'll aim to respond within a few days

---

## Code Style

This project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Run checks before opening a PR:

```bash
npm run lint
npm run prettier
```

Key conventions:
- Use ES modules (`import`/`export`), not CommonJS
- Use `const`/`let`, never `var`
- SVG rendering functions are named `render[CardName]Card`
- Data fetching functions are named `fetch[CardName]`
- All SVG output must HTML-encode user data (use `encodeHTML` from `src/common/html.js`)

---

## License

By contributing, you agree that your code will be released under the [MIT License](./LICENSE).
