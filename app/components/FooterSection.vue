<template>
  <footer>
    <div class="container">
      <p>Built by <a :href="gueblyUrl" target="_blank">Guebly</a> — Open source, forever free.</p>
    </div>
  </footer>
</template>

<script setup>
const gueblyUrl = import.meta.env.VITE_GUEBLY_URL || "https://www.guebly.com.br";
</script>

<style scoped>
footer {
  border-top: 1px solid var(--border);
  padding: 32px 0;
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
}
footer a { color: var(--accent-light); text-decoration: none; }
footer a:hover { text-decoration: underline; }
</style>
