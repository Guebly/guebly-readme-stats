<template>
  <section class="api-section" id="api">
    <div class="container">
      <h2 class="section-title">API Endpoints</h2>
      <p class="section-sub">All endpoints return SVG images. Use them anywhere that renders images.</p>
      <div v-for="ep in endpoints" :key="ep.path" class="endpoint">
        <span class="method mono">GET</span>
        <span class="ep-path mono">{{ ep.path }}</span>
        <span class="ep-desc">{{ ep.desc }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
const endpoints = [
  { path: "/api?username=:user", desc: "Stats Card" },
  { path: "/api/top-langs?username=:user", desc: "Top Languages" },
  { path: "/api/pin?username=:user&repo=:repo", desc: "Repo Pin" },
  { path: "/api/gist?id=:gist_id", desc: "Gist Card" },
  { path: "/api/wakatime?username=:user", desc: "WakaTime Stats" },
];
</script>

<style scoped>
.api-section { padding: 40px 0 80px; }
.section-title { font-size: 32px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 8px; }
.section-sub { color: var(--text-muted); font-size: 15px; margin-bottom: 32px; }
.endpoint {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 12px; padding: 18px 24px;
  margin-bottom: 10px; display: flex; align-items: center; gap: 14px;
}
.method {
  padding: 4px 10px; border-radius: 6px;
  font-size: 12px; font-weight: 700;
  background: color-mix(in srgb, var(--green) 15%, transparent);
  color: var(--green);
  flex-shrink: 0;
}
.ep-path { font-size: 14px; color: var(--text-muted); }
.ep-desc { font-size: 13px; color: var(--text-muted); margin-left: auto; flex-shrink: 0; }

@media (max-width: 600px) {
  .endpoint { flex-wrap: wrap; }
  .ep-desc { margin-left: 0; width: 100%; }
}
</style>
