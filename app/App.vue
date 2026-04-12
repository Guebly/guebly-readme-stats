<template>
  <div class="app" :class="{ dark: isDark }">
    <div class="bg-grid" />
    <div class="bg-glow" />
    <NavBar :isDark="isDark" @toggle-theme="toggle" />
    <HeroSection />
    <Generator :isDark="isDark" />
    <ThemesGallery />
    <ApiDocs />
    <FooterSection />
  </div>
</template>

<script setup>
import { useThemeMode } from "./composables/useThemeMode.js";
import NavBar from "./components/NavBar.vue";
import HeroSection from "./components/HeroSection.vue";
import Generator from "./components/Generator.vue";
import ThemesGallery from "./components/ThemesGallery.vue";
import ApiDocs from "./components/ApiDocs.vue";
import FooterSection from "./components/FooterSection.vue";

const { isDark, toggle } = useThemeMode();
</script>

<style>
/* ── Reset & Base ───────────────────── */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Outfit', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  transition: background .35s, color .35s;
}

/* ── Dark Theme (default) ───────────── */
.app.dark {
  --bg: #06080c;
  --surface: #0d1117;
  --surface-2: #151b23;
  --surface-3: #1c2333;
  --border: #1a1e26;
  --border-hover: #2d333b;
  --text: #e6edf3;
  --text-secondary: #c9d1d9;
  --text-muted: #7d8590;
  --accent: #6E40C9;
  --accent-light: #8b5cf6;
  --accent-glow: #6E40C940;
  --accent-subtle: #6E40C915;
  --green: #3fb950;
  --shadow: 0 8px 32px #00000060;
  background: var(--bg);
  color: var(--text);
}

/* ── Light Theme ────────────────────── */
.app:not(.dark) {
  --bg: #f8f9fb;
  --surface: #ffffff;
  --surface-2: #f0f2f5;
  --surface-3: #e8ebef;
  --border: #d8dee4;
  --border-hover: #bbc0c7;
  --text: #1f2328;
  --text-secondary: #3d444d;
  --text-muted: #656d76;
  --accent: #6E40C9;
  --accent-light: #7c4ddb;
  --accent-glow: #6E40C925;
  --accent-subtle: #6E40C910;
  --green: #1a7f37;
  --shadow: 0 8px 32px #00000012;
  background: var(--bg);
  color: var(--text);
}

/* ── Globals ────────────────────────── */
.app {
  min-height: 100vh;
  position: relative;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

.mono { font-family: 'JetBrains Mono', monospace; }

/* ── Ambient BG ─────────────────────── */
.bg-grid {
  position: fixed; inset: 0; z-index: 0;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: 0.18;
  mask-image: radial-gradient(ellipse 70% 50% at 50% 0%, black 20%, transparent 100%);
  pointer-events: none;
  transition: opacity .35s;
}
.app:not(.dark) .bg-grid { opacity: 0.08; }

.bg-glow {
  position: fixed; top: -200px; left: 50%; transform: translateX(-50%);
  width: 900px; height: 500px;
  background: radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%);
  z-index: 0; pointer-events: none;
}

/* ── Animations ─────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp 0.6s ease-out both; }
.fade-d1 { animation-delay: .1s; }
.fade-d2 { animation-delay: .2s; }
.fade-d3 { animation-delay: .3s; }
.fade-d4 { animation-delay: .4s; }
</style>
