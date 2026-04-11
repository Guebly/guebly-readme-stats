<template>
  <nav>
    <div class="container nav-inner">
      <a href="/" class="logo">
        <img :src="logoUrl" alt="Guebly" class="logo-img" />
        <span class="logo-text">ReadMe Stats <span class="muted">by Guebly</span></span>
      </a>
      <div class="nav-right">
        <a href="#generator" class="nav-link">Generator</a>
        <a href="#themes" class="nav-link">Themes</a>
        <a href="#api" class="nav-link">API</a>
        <a :href="gueblyUrl" target="_blank" class="nav-link">guebly.com.br</a>
        <button class="theme-toggle" @click="$emit('toggle-theme')" :title="isDark ? 'Switch to light' : 'Switch to dark'">
          <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({ isDark: Boolean });
defineEmits(["toggle-theme"]);

const logoUrl = import.meta.env.VITE_LOGO_URL || "https://www.guebly.com.br/guebly.png";
const gueblyUrl = import.meta.env.VITE_GUEBLY_URL || "https://www.guebly.com.br";
</script>

<style scoped>
nav {
  position: sticky; top: 0; z-index: 100;
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 64px;
}
.logo {
  display: flex; align-items: center; gap: 10px;
  text-decoration: none; color: var(--text);
}
.logo-img { width: 32px; height: 32px; border-radius: 8px; object-fit: contain; }
.logo-text { font-weight: 700; font-size: 17px; }
.logo-text .muted { color: var(--text-muted); font-weight: 400; }
.nav-right { display: flex; align-items: center; gap: 20px; }
.nav-link {
  color: var(--text-muted); text-decoration: none;
  font-size: 14px; font-weight: 500;
  transition: color .2s;
}
.nav-link:hover { color: var(--text); }
.theme-toggle {
  width: 36px; height: 36px; border-radius: 10px;
  background: var(--surface-2); border: 1px solid var(--border);
  color: var(--text-muted); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all .2s;
}
.theme-toggle:hover {
  border-color: var(--accent); color: var(--accent-light);
}

@media (max-width: 700px) {
  .nav-link { display: none; }
}
</style>
