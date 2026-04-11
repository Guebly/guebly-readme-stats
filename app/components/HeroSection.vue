<template>
  <section class="hero">
    <div class="container">
      <div class="badge mono fade-up">Open Source • Live</div>
      <h1 class="fade-up fade-d1">GitHub Stats for<br><span class="gradient">Your README</span></h1>
      <p class="hero-sub fade-up fade-d2">
        Generate dynamic, customizable stats cards for your GitHub profile.<br>
        10 exclusive themes. Live preview. Copy &amp; paste.
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero { text-align: center; padding: 100px 0 60px; }
.badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 16px; border-radius: 100px;
  background: var(--accent-subtle);
  border: 1px solid var(--accent-glow);
  color: var(--accent-light); font-size: 13px; font-weight: 500;
  margin-bottom: 28px;
}
.badge::before {
  content: ''; width: 6px; height: 6px;
  border-radius: 50%; background: var(--green);
}
h1 {
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 800; line-height: 1.05;
  letter-spacing: -0.03em; margin-bottom: 20px;
}
.gradient {
  background: linear-gradient(135deg, var(--accent-light) 0%, #22d3ee 50%, var(--accent) 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-sub {
  font-size: 18px; color: var(--text-muted);
  max-width: 520px; margin: 0 auto;
  line-height: 1.6; font-weight: 300;
}
</style>
