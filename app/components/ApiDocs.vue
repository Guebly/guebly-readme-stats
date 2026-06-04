<template>
  <section class="api-section" id="api">
    <div class="container">
      <h2 class="section-title">API Endpoints</h2>
      <p class="section-sub">All endpoints return SVG images. Use them anywhere that renders images.</p>
      <div v-for="ep in endpoints" :key="ep.path" class="endpoint">
        <span class="method mono">GET</span>
        <span class="ep-path mono">{{ ep.path }}</span>
        <span v-if="ep.isNew" class="ep-new mono">NEW</span>
        <span class="ep-desc">{{ ep.desc }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
const endpoints = [
  { path: "/api?username=:user", desc: "Stats Card" },
  { path: "/api/top-langs?username=:user", desc: "Top Languages" },
  { path: "/api/streak?username=:user", desc: "Streak Card" },
  { path: "/api/social?username=:user", desc: "Social Card" },
  { path: "/api/trophy?username=:user", desc: "Trophy Card" },
  { path: "/api/pin?username=:user&repo=:repo", desc: "Repo Pin" },
  { path: "/api/gist?id=:gist_id", desc: "Gist Card" },
  { path: "/api/wakatime?username=:user", desc: "WakaTime Stats" },
  { path: "/api/contributions?username=:user", desc: "Contributions Heatmap", isNew: true },
  { path: "/api/working-on?username=:user", desc: "Currently Working On", isNew: true },
  { path: "/api/tech-stack?username=:user", desc: "Tech Stack", isNew: true },
  { path: "/api/compare?user1=:user1&user2=:user2", desc: "Compare Users", isNew: true },
  { path: "/api/sponsors?username=:user", desc: "Sponsors / Support", isNew: true },
  { path: "/api/activity-graph?username=:user", desc: "Activity Graph", isNew: true },
  { path: "/api/status/rate-limit", desc: "Rate Limit Dashboard (JSON)", isNew: true },
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
.ep-new {
  padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700;
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  color: var(--accent-light); flex-shrink: 0;
}
.ep-desc { font-size: 13px; color: var(--text-muted); margin-left: auto; flex-shrink: 0; }

@media (max-width: 600px) {
  .endpoint { flex-wrap: wrap; }
  .ep-desc { margin-left: 0; width: 100%; }
}
</style>
