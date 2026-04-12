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
                <optgroup label="✨ Highlights">
                  <option value="profile">Profile Highlight ✨</option>
                </optgroup>
                <optgroup label="Developer Cards">
                  <option value="stats">Stats Card</option>
                  <option value="top-langs">Top Languages</option>
                  <option value="streak">Streak Card</option>
                  <option value="social">Social Card</option>
                  <option value="trophy">Trophy Card</option>
                  <option value="pin">Repo Pin</option>
                  <option value="gist">Gist Card</option>
                  <option value="wakatime">WakaTime</option>
                </optgroup>
              </select>
            </div>

            <div class="field" v-if="cardType !== 'gist'">
              <label class="mono">{{ cardType === 'wakatime' ? 'WakaTime Username' : 'GitHub Username' }}</label>
              <input v-model="username" type="text" :placeholder="cardType === 'wakatime' ? 'your_wakatime_user' : 'degabrielofi'" @input="previewError = ''" />
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
            <div v-else-if="previewError" class="preview-placeholder mono preview-error">
              {{ previewError }}
            </div>
            <img v-else :src="generatedUrl" alt="Card Preview" class="preview-img"
              @error="onImgError" @load="onImgLoad" :key="generatedUrl" />
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

          <!-- ── Share Panel ─────────────────── -->
          <div class="share-panel" v-if="generatedUrl">
            <div class="share-label mono">Share your card</div>
            <div class="share-row">
              <button class="share-btn download" @click="downloadPng" :disabled="downloading">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                {{ downloading ? 'Gerando...' : 'Download PNG' }}
              </button>
              <button class="share-btn twitter" @click="shareTwitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X / Twitter
              </button>
              <button class="share-btn linkedin" @click="shareLinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </button>
              <button class="share-btn whatsapp" @click="shareWhatsApp">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                WhatsApp
              </button>
            </div>
            <p class="share-hint mono">Instagram: baixe o PNG e poste direto no app</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({ isDark: Boolean });

const baseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_SITE_URL || window.location.origin;

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
const previewError = ref("");

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
    streak: "/api/streak",
    social: "/api/social",
    trophy: "/api/trophy",
    profile: "/api/profile",
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
const onImgError = () => {
  previewError.value = "Could not load card — check the username and try again.";
};
const onImgLoad = () => {
  previewError.value = "";
};

// ── Share & Download ───────────────────
const downloading = ref(false);

const downloadPng = async () => {
  if (!generatedUrl.value || downloading.value) return;
  downloading.value = true;
  try {
    // Fetch SVG as text (same-origin → no CORS issue, no canvas taint)
    const response = await fetch(generatedUrl.value + "&_dl=1");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const svgText = await response.text();

    // Create a blob URL so the img.src is "local" — canvas won't be tainted
    const svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const blobUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = blobUrl;
    });

    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = (img.naturalWidth || 495) * scale;
    canvas.height = (img.naturalHeight || 200) * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(blobUrl);

    await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `guebly-${cardType.value}-${(username.value || gistId.value || "card").trim()}.png`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        resolve();
      }, "image/png");
    });
  } catch {
    alert("Não foi possível gerar o PNG. Tente salvar a imagem clicando com o botão direito nela.");
  } finally {
    downloading.value = false;
  }
};

const shareText = () =>
  `Veja meu card de estatísticas do GitHub gerado com @Guebly ReadMe Stats!`;

const shareTwitter = () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText())}&url=${encodeURIComponent(generatedUrl.value)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

const shareLinkedIn = () => {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(generatedUrl.value)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

const shareWhatsApp = () => {
  const text = `${shareText()} ${generatedUrl.value}`;
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};
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
.preview-placeholder { color: var(--text-muted); font-size: 14px; z-index: 1; text-align: center; }
.preview-error { color: #f87171; font-size: 13px; }
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

/* ── Share Panel ──────────────────── */
.share-panel {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 16px; padding: 20px;
}
.share-label {
  font-size: 11px; font-weight: 600; color: var(--text-muted);
  text-transform: uppercase; letter-spacing: .06em; margin-bottom: 12px;
}
.share-row {
  display: flex; flex-wrap: wrap; gap: 8px;
}
.share-btn {
  display: flex; align-items: center; gap: 7px;
  padding: 8px 16px; border-radius: 10px; font-size: 13px;
  font-weight: 600; cursor: pointer; border: 1px solid transparent;
  transition: all .2s; font-family: 'JetBrains Mono', monospace;
  white-space: nowrap;
}
.share-btn:disabled { opacity: .5; cursor: not-allowed; }
.share-btn.download {
  background: var(--accent); color: #fff; border-color: var(--accent);
}
.share-btn.download:hover:not(:disabled) { filter: brightness(1.15); }
.share-btn.twitter {
  background: var(--surface-2); color: var(--text);
  border-color: var(--border);
}
.share-btn.twitter:hover { border-color: #1d9bf0; color: #1d9bf0; }
.share-btn.linkedin {
  background: var(--surface-2); color: var(--text);
  border-color: var(--border);
}
.share-btn.linkedin:hover { border-color: #0a66c2; color: #0a66c2; }
.share-btn.whatsapp {
  background: var(--surface-2); color: var(--text);
  border-color: var(--border);
}
.share-btn.whatsapp:hover { border-color: #25d366; color: #25d366; }
.share-hint {
  margin-top: 10px; font-size: 11px; color: var(--text-muted);
  line-height: 1.5;
}
</style>
