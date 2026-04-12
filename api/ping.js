// @ts-check
// Minimal health-check — no GitHub token required, no imports that can crash.
export default (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "no-store");
  res.send(
    `<svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="60" rx="6" fill="#0D1117"/>
      <text x="100" y="36" text-anchor="middle" font-size="16" font-family="sans-serif" fill="#6E40C9">✓ API online</text>
    </svg>`,
  );
};
