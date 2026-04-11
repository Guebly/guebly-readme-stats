<template>
  <section class="generator" id="generator">
    <div class="container">
      <div class="gen-grid">

        <!-- ── Controls Panel ──────────────── -->
        <div class="panel fade-up fade-d3">
          <div class="panel-header"><div class="dot" /> Configuration</div>
          <div class="panel-body">

            <div class="field">
              <label class="mono">Card Type</label>
              <select v-model="cardType">
                <option value="stats">Stats Card</option>
                <option value="top-langs">Top Languages</option>
                <option value="pin">Repo Pin</option>
                <option value="gist">Gist Card</option>
                <option value="wakatime">WakaTime</option>
              </select>
            </div>

            <div class="field" v-if="cardType !== 'gist'">
              <label class="mono">{{ cardType === 'wakatime' ? 'WakaTime Username' : 'GitHub Username' }}</label>
              <input v-model="username" type="text" :placeholder="cardType === 'wakatime' ? 'your_wakatime_user' : 'degabrielofi'" />
            </div>

            <div class="field" v-if="cardType === 'pin'">
              <label class="mono">Repository</label>
              <input v-model="repoName" type="text" placeholder="my-awesome-repo" />
            </div>

            <div class="field" v-if="cardType === 'gist'">
              <label class="mono">Gist ID</label>
              <input v-model="gistId" type="text" placeholder="bbfce31e0217a3689c8d961a356cb10d" />
            </div>

            <div class="field">
              <label class="mono">Theme</label>
              <select v-model="theme">
                <optgroup label="⚡ Guebly Exclusive">
                  <option v-for="t in gueblyThemeNames" :key="t" :value="t">{{ formatName(t) }}</option>
                </optgroup>
                <optgroup label="Classic">
                  <option v-for="t in classicThemeNames" :key="t" :value="t">{{ formatName(t) }}</option>
                </optgroup>
              </select>
            </div>

            <div class="field">
              <label class="mono">Locale</label>
              <select v-model="locale">
                <option value="">English (default)</option>
                <option value="pt-br">Português (BR)</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
                <option value="it">Italiano</option>
                <option value="ja">日本語</option>
                <option value="zh-cn">中文</option>
                <option value="ko">한국어</option>
                <option value="ru">Русский</option>
              </select>
            </div>

            <div class="field" v-if="cardType === 'top-langs'">
              <label class="mono">Layout</label>
              <select v-model="langsLayout">
                <option value="compact">Compact</option>
                <option value="donut">Donut</option>
                <option value="donut-vertical">Donut Vertical</option>
                <option value="pie">Pie</option>
                <option value="normal">Normal (list)</option>
              </select>
            </div>

            <div class="field" v-if="cardType === 'wakatime'">
              <label class="mono">Display Format</label>
              <select v-model="wakaDisplayFormat">
                <option value="">Default</option>
                <option value="compact">Compact</option>
                <option value="percent">Percent</option>
                <option value="time">Time</option>
              </select>
            </div>

            <div class="field">
              <label class="mono">Options</label>
              <div class="toggle-row" v-if="cardType === 'stats'">
                <span>Show Icons</span>
                <button class="toggle" :class="{ active: showIcons }" @click="showIcons = !showIcons" />
              </div>
              <div class="toggle-row">
                <span>Hide Border</span>
                <button class="toggle" :class="{ active: hideBorder }" @click="hideBorder = !hideBorder" />
              </div>
              <div class="toggle-row" v-if="cardType === 'stats'">
                <span>Count Private</span>
                <button class="toggle" :class="{ active: countPrivate }" @click="countPrivate = !countPrivate" />
              </div>
              <div class="toggle-row" v-if="cardType === 'stats'">
                <span>Hide Rank</span>
                <button class="toggle" :class="{ active: hideRank }" @click="hideRank = !hideRank" />
              </div>
            </div>

          </div>
        </div>

        <!-- ── Preview Area ────────────────── -->
        <div class="preview-area fade-up fade-d4">
          <div class="preview-card">
            <div class="preview-ambient" />
            <div v-if="!generatedUrl" class="preview-placeholder mono">
              Type a {{ cardType === 'gist' ? 'Gist ID' : 'username' }} to preview
            </div>
            <img v-else :src="generatedUrl" alt="Card Preview" class="preview-img" @error="onImgError" @load="onImgLoad" />
          </div>

          <div class="code-block">
            <div class="code-header">
              <div class="code-tabs">
                <button v-for="tab in ['md','html','url']" :key="tab"
                  class="code-tab mono" :class="{ active: codeTab === tab }"
                  @click="codeTab = tab">
                  {{ { md: 'Markdown', html: 'HTML', url: 'URL' }[tab] }}
                </button>
              </div>
              <button class="copy-btn mono" @click="copyCode">{{ copied ? 'Copied!' : 'Copy' }}</button>
            </div>
            <div class="code-content mono">{{ codeOutput }}</div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({ isDark: Boolean });

const baseUrl = import.meta.env.VITE_API_BASE_URL || "";

// ── State ──────────────────────────────
const cardType = ref("stats");
const username = ref("");
const repoName = ref("");
const gistId = ref("");
const theme = ref("guebly");
const locale = ref("");
const langsLayout = ref("compact");
const wakaDisplayFormat = ref("");
const showIcons = ref(true);
const hideBorder = ref(true);
const countPrivate = ref(true);
const hideRank = ref(false);
const codeTab = ref("md");
const copied = ref(false);

// ── Theme lists ────────────────────────
const gueblyThemeNames = [
  "guebly","guebly_neon","guebly_aurora","guebly_sunset","guebly_ice",
  "guebly_rose","guebly_matrix","guebly_minimal","guebly_gold","guebly_cyber"
];
const classicThemeNames = [
  "default","dark","radical","tokyonight","dracula","react","nord",
  "catppuccin_mocha","github_dark","github_dark_dimmed","onedark","cobalt",
  "synthwave","nightowl","aura","rose_pine","outrun","ambient_gradient",
  "gruvbox","monokai","highcontrast","algolia","bear","solarized-dark"
];

const formatName = (n) => n.replace(/_/g, " ").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

// ── URL builder ────────────────────────
const generatedUrl = computed(() => {
  const paths = {
    stats: "/api",
    "top-langs": "/api/top-langs",
    pin: "/api/pin",
    gist: "/api/gist",
    wakatime: "/api/wakatime",
  };

  if (cardType.value === "gist") {
    if (!gistId.value.trim()) return "";
    let params = `id=${enc(gistId.value)}&theme=${theme.value}`;
    if (hideBorder.value) params += "&hide_border=true";
    if (locale.value) params += `&locale=${locale.value}`;
    return `${baseUrl}${paths.gist}?${params}`;
  }

  if (!username.value.trim()) return "";

  let params = `username=${enc(username.value)}&theme=${theme.value}`;

  if (cardType.value === "pin") {
    if (!repoName.value.trim()) return "";
    params += `&repo=${enc(repoName.value)}`;
  }
  if (cardType.value === "top-langs") {
    params += `&layout=${langsLayout.value}&langs_count=8`;
  }
  if (cardType.value === "wakatime" && wakaDisplayFormat.value) {
    params += `&display_format=${wakaDisplayFormat.value}`;
  }
  if (cardType.value === "stats") {
    if (showIcons.value) params += "&show_icons=true";
    if (countPrivate.value) params += "&count_private=true";
    if (hideRank.value) params += "&hide_rank=true";
  }
  if (hideBorder.value) params += "&hide_border=true";
  if (locale.value) params += `&locale=${locale.value}`;

  return `${baseUrl}${paths[cardType.value]}?${params}`;
});

const enc = (v) => encodeURIComponent(v.trim());

// ── Code output ────────────────────────
const codeOutput = computed(() => {
  if (!generatedUrl.value) return "";
  const url = generatedUrl.value;
  if (codeTab.value === "md") return `![GitHub Stats](${url})`;
  if (codeTab.value === "html") return `<img src="${url}" alt="GitHub Stats" />`;
  return url;
});

// ── Copy ───────────────────────────────
const copyCode = async () => {
  if (!codeOutput.value) return;
  await navigator.clipboard.writeText(codeOutput.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1500);
};

// ── Image handlers ─────────────────────
const onImgError = () => {};
const onImgLoad = () => {};
</script>

<style scoped>
.generator { padding: 40px 0 80px; }
.gen-grid {
  display: grid; grid-template-columns: 360px 1fr;
  gap: 32px; align-items: start;
}
@media (max-width: 800px) { .gen-grid { grid-template-columns: 1fr; } }

/* ── Panel ────────────────────────── */
.panel {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 16px; overflow: hidden;
}
.panel-header {
  padding: 16px 20px; border-bottom: 1px solid var(--border);
  font-size: 14px; font-weight: 600; color: var(--text-muted);
  display: flex; align-items: center; gap: 8px;
}
.dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
.panel-body { padding: 20px; }

/* ── Fields ───────────────────────── */
.field { margin-bottom: 16px; }
.field:last-child { margin-bottom: 0; }
label {
  display: block; font-size: 11px; font-weight: 600;
  color: var(--text-muted); margin-bottom: 6px;
  text-transform: uppercase; letter-spacing: .06em;
}
input, select {
  width: 100%; padding: 10px 14px;
  background: var(--surface-2); border: 1px solid var(--border);
  border-radius: 10px; color: var(--text);
  font-family: 'JetBrains Mono', monospace; font-size: 14px;
  outline: none; transition: border-color .2s, box-shadow .2s;
}
input:focus, select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}
select {
  cursor: pointer; appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%237d8590' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 12px center;
}
select option { background: var(--surface-2); color: var(--text); }

/* ── Toggles ──────────────────────── */
.toggle-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 7px 0;
}
.toggle-row span { font-size: 13px; color: var(--text-muted); }
.toggle {
  position: relative; width: 40px; height: 22px;
  background: var(--surface-2); border-radius: 11px;
  cursor: pointer; transition: background .2s;
  border: 1px solid var(--border);
}
.toggle.active { background: var(--accent); border-color: var(--accent); }
.toggle::after {
  content: ''; position: absolute; top: 2px; left: 2px;
  width: 16px; height: 16px; border-radius: 50%; background: #fff;
  transition: transform .2s;
}
.toggle.active::after { transform: translateX(18px); }

/* ── Preview ──────────────────────── */
.preview-area { display: flex; flex-direction: column; gap: 20px; }
.preview-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 16px; min-height: 200px;
  display: flex; align-items: center; justify-content: center;
  padding: 32px; position: relative; overflow: hidden;
}
.preview-ambient {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse at 20% 50%, var(--accent-subtle) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 50%, #22d3ee08 0%, transparent 50%);
}
.preview-placeholder { color: var(--text-muted); font-size: 14px; z-index: 1; }
.preview-img {
  max-width: 100%; height: auto; border-radius: 8px;
  position: relative; z-index: 1;
  filter: drop-shadow(0 4px 24px #00000040);
}

/* ── Code block ───────────────────── */
.code-block {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 16px; overflow: hidden;
}
.code-header {
  padding: 12px 20px; border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
}
.code-tabs { display: flex; gap: 0; }
.code-tab {
  padding: 6px 16px; font-size: 12px; font-weight: 600;
  color: var(--text-muted); cursor: pointer;
  border-radius: 6px; transition: all .15s;
  background: none; border: none;
}
.code-tab.active { background: var(--accent-subtle); color: var(--accent-light); }
.copy-btn {
  padding: 6px 14px; border-radius: 8px;
  background: var(--surface-2); border: 1px solid var(--border);
  color: var(--text-muted); font-size: 12px; cursor: pointer;
  font-weight: 500; transition: all .2s;
}
.copy-btn:hover { border-color: var(--accent); color: var(--text); }
.code-content {
  padding: 16px 20px; font-size: 13px; line-height: 1.7;
  color: var(--accent-light); overflow-x: auto;
  white-space: pre-wrap; word-break: break-all;
  min-height: 48px;
}
</style>
