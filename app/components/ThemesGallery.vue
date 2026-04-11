<template>
  <section class="themes-section" id="themes">
    <div class="container">
      <h2 class="section-title">Themes</h2>
      <p class="section-sub">10 exclusive Guebly themes + 20 community classics. Click to apply.</p>
      <div class="themes-grid">
        <div v-for="t in allThemes" :key="t.name"
          class="theme-card" :class="{ selected: selected === t.name }"
          @click="select(t.name)">
          <div class="theme-preview">
            <div v-for="(c, i) in t.colors" :key="i" :style="{ background: c }" />
          </div>
          <div class="theme-name mono">
            {{ t.label }}
            <span v-if="t.exclusive" class="exclusive mono">EXCLUSIVE</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["select-theme"]);
const selected = ref("guebly");

const fmt = (n) => n.replace(/_/g, " ").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

const guebly = [
  { name: "guebly",         colors: ["#6E40C9","#0D1117","#c9d1d9","#6E40C9"], exclusive: true },
  { name: "guebly_neon",    colors: ["#A855F7","#0a0a0f","#22D3EE","#e2e8f0"], exclusive: true },
  { name: "guebly_aurora",  colors: ["#302b63","#24243e","#34d399","#a78bfa"], exclusive: true },
  { name: "guebly_sunset",  colors: ["#1a0a00","#2d1810","#f97316","#fef3c7"], exclusive: true },
  { name: "guebly_ice",     colors: ["#0c1222","#164e63","#67e8f9","#a5f3fc"], exclusive: true },
  { name: "guebly_rose",    colors: ["#1a0a14","#4c0519","#fb7185","#f472b6"], exclusive: true },
  { name: "guebly_matrix",  colors: ["#020a02","#052e16","#4ade80","#22c55e"], exclusive: true },
  { name: "guebly_minimal", colors: ["#171717","#262626","#f5f5f5","#a3a3a3"], exclusive: true },
  { name: "guebly_gold",    colors: ["#1c1408","#78350f","#fbbf24","#f59e0b"], exclusive: true },
  { name: "guebly_cyber",   colors: ["#0d001a","#1a0033","#f0abfc","#e879f9"], exclusive: true },
];

const classic = [
  { name: "default",           colors: ["#fffefe","#e4e2e2","#2f80ed","#434d58"] },
  { name: "dark",              colors: ["#151515","#151515","#fff","#79ff97"] },
  { name: "radical",           colors: ["#141321","#141321","#fe428e","#a9fef7"] },
  { name: "tokyonight",        colors: ["#1a1b27","#1a1b27","#70a5fd","#38bdae"] },
  { name: "dracula",           colors: ["#282a36","#282a36","#ff6e96","#f8f8f2"] },
  { name: "react",             colors: ["#20232a","#20232a","#61dafb","#ffffff"] },
  { name: "nord",              colors: ["#2e3440","#2e3440","#81a1c1","#d8dee9"] },
  { name: "catppuccin_mocha",  colors: ["#1e1e2e","#1e1e2e","#94e2d5","#cdd6f4"] },
  { name: "github_dark",       colors: ["#0D1117","#0D1117","#58A6FF","#C3D1D9"] },
  { name: "onedark",           colors: ["#282c34","#282c34","#e4bf7a","#df6d74"] },
  { name: "cobalt",            colors: ["#193549","#193549","#e683d9","#75eeb2"] },
  { name: "synthwave",         colors: ["#2b213a","#2b213a","#e2e9ec","#e5289e"] },
  { name: "nightowl",          colors: ["#011627","#011627","#c792ea","#7fdbca"] },
  { name: "aura",              colors: ["#15141b","#15141b","#a277ff","#61ffca"] },
  { name: "rose_pine",         colors: ["#191724","#191724","#9ccfd8","#e0def4"] },
  { name: "outrun",            colors: ["#141439","#141439","#ffcc00","#8080ff"] },
  { name: "gruvbox",           colors: ["#282828","#282828","#fabd2f","#8ec07c"] },
  { name: "monokai",           colors: ["#272822","#272822","#eb1f6a","#f1f1eb"] },
  { name: "solarized-dark",    colors: ["#002b36","#002b36","#268bd2","#859900"] },
  { name: "ambient_gradient",  colors: ["#4158d0","#c850c0","#ffcc70","#ffffff"] },
];

const allThemes = [...guebly, ...classic].map(t => ({ ...t, label: fmt(t.name) }));

const select = (name) => {
  selected.value = name;
  // Scroll to generator and update theme via URL hash trick
  const themeSelect = document.querySelector('#generator select[class=""]') || 
    document.querySelector('#generator select');
  // Emit event - parent can handle if wired up, 
  // but for simplicity we dispatch a custom event
  window.dispatchEvent(new CustomEvent("guebly-theme-select", { detail: name }));
};
</script>

<style scoped>
.themes-section { padding: 60px 0 80px; }
.section-title { font-size: 32px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 8px; }
.section-sub { color: var(--text-muted); font-size: 15px; margin-bottom: 40px; }
.themes-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}
.theme-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 12px; padding: 14px; cursor: pointer;
  transition: all .2s;
}
.theme-card:hover {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent-glow), 0 8px 32px #00000030;
  transform: translateY(-2px);
}
.theme-card.selected {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent);
}
.theme-preview {
  width: 100%; height: 44px; border-radius: 8px;
  display: flex; overflow: hidden;
}
.theme-preview div { flex: 1; }
.theme-name {
  font-size: 12px; font-weight: 600; margin-top: 10px;
  display: flex; align-items: center; gap: 8px;
}
.exclusive {
  color: var(--accent-light); font-size: 9px;
  background: var(--accent-subtle); padding: 2px 8px;
  border-radius: 4px; font-weight: 700; letter-spacing: .06em;
}
</style>
