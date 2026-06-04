// @ts-check

import { resolveColors } from "../common/color.js";
import { escapeHTML } from "../common/html.js";
import { formatNumber } from "../common/fmt.js";

/**
 * @param {object} data Working on data.
 * @param {object} options Card options.
 * @returns {string} SVG working-on card.
 */
export const renderWorkingOnCard = (data, options = {}) => {
  const {
    theme = "default",
    title_color,
    text_color,
    icon_color,
    bg_color,
    border_color,
    hide_border = false,
    border_radius,
    custom_title,
  } = options;

  const { titleColor, textColor, iconColor, bgColor, borderColor } =
    resolveColors({
      title_color,
      text_color,
      icon_color,
      bg_color,
      border_color,
      theme,
    });

  const width = 495;
  const height = 240;
  const rx = border_radius === undefined ? 4.5 : Number(border_radius);
  const bgFill = typeof bgColor === "object" ? bgColor[1] || "#0D1117" : bgColor;
  const borderAttr = hide_border ? 'stroke-opacity="0"' : `stroke="${borderColor}"`;

  const title = custom_title || `${escapeHTML(data.name)} is working on`;

  if (!data.repo) {
    return `
      <svg width="${width}" height="120" viewBox="0 0 ${width} 120"
        fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
        <rect x="0.5" y="0.5" rx="${rx}" width="${width - 1}" height="119"
          fill="${bgFill}" ${borderAttr}/>
        <text x="25" y="35" font-size="16" font-weight="600"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${titleColor}">${escapeHTML(title)}</text>
        <text x="25" y="72" font-size="14"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${textColor}" opacity="0.6">No public repositories found</text>
      </svg>
    `;
  }

  const repo = data.repo;
  const timeAgo = getTimeAgo(repo.pushedAt);
  const desc = repo.description ? escapeHTML(repo.description.slice(0, 80)) : "No description";

  const repoIcon = `<path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8.5V1.5z" fill="${iconColor}"/>`;
  const starIcon = `<path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" fill="${iconColor}" opacity="0.7"/>`;
  const forkIcon = `<path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="${iconColor}" opacity="0.7"/>`;

  const recentListSvg = data.recentRepos
    .slice(1, 4)
    .map((r, i) => {
      const y = 160 + i * 22;
      return `
        <circle cx="35" cy="${y - 4}" r="4" fill="${r.languageColor}"/>
        <text x="45" y="${y}" font-size="12" font-family="'Segoe UI',Ubuntu,Sans-Serif" fill="${textColor}" opacity="0.6">${escapeHTML(r.name)}</text>
        <text x="${width - 25}" y="${y}" text-anchor="end" font-size="10" font-family="'Segoe UI',Ubuntu,Sans-Serif" fill="${textColor}" opacity="0.35">${escapeHTML(r.language)}</text>
      `;
    })
    .join("");

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
      fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-labelledby="workingOnTitle">
      <title id="workingOnTitle">${escapeHTML(title)}</title>

      <style>
        .working-on-anim { animation: fadeIn 0.8s ease-in-out forwards; opacity: 0; }
        @keyframes fadeIn { to { opacity: 1; } }
      </style>

      <rect x="0.5" y="0.5" rx="${rx}" width="${width - 1}" height="${height - 1}"
        fill="${bgFill}" ${borderAttr}/>

      <g class="working-on-anim" style="animation-delay: 0s;">
        <text x="25" y="35" font-size="16" font-weight="600"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${titleColor}">${escapeHTML(title)}</text>
      </g>

      <g class="working-on-anim" style="animation-delay: 0.15s;">
        <svg x="25" y="52" viewBox="0 0 16 16" width="20" height="20">${repoIcon}</svg>
        <text x="50" y="68" font-size="18" font-weight="700"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${titleColor}">${escapeHTML(repo.name)}</text>
      </g>

      <g class="working-on-anim" style="animation-delay: 0.3s;">
        <text x="25" y="92" font-size="13"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${textColor}" opacity="0.7">${desc}</text>
      </g>

      <g class="working-on-anim" style="animation-delay: 0.45s;">
        <circle cx="31" cy="114" r="5" fill="${repo.languageColor}"/>
        <text x="42" y="118" font-size="12" font-family="'Segoe UI',Ubuntu,Sans-Serif" fill="${textColor}">${escapeHTML(repo.language)}</text>

        <g transform="translate(140, 106)">
          <svg viewBox="0 0 16 16" width="16" height="16">${starIcon}</svg>
          <text x="20" y="12" font-size="12" font-family="'Segoe UI',Ubuntu,Sans-Serif" fill="${textColor}">${formatNumber(repo.stars)}</text>
        </g>

        <g transform="translate(210, 106)">
          <svg viewBox="0 0 16 16" width="16" height="16">${forkIcon}</svg>
          <text x="20" y="12" font-size="12" font-family="'Segoe UI',Ubuntu,Sans-Serif" fill="${textColor}">${formatNumber(repo.forks)}</text>
        </g>

        <text x="${width - 25}" y="118" text-anchor="end" font-size="11"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${textColor}" opacity="0.4">updated ${escapeHTML(timeAgo)}</text>
      </g>

      <g class="working-on-anim" style="animation-delay: 0.6s;">
        <line x1="25" y1="136" x2="${width - 25}" y2="136" stroke="${textColor}" stroke-opacity="0.1"/>
        <text x="25" y="154" font-size="11" font-weight="600"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${textColor}" opacity="0.4" letter-spacing="1">RECENT ACTIVITY</text>
        ${recentListSvg}
      </g>
    </svg>
  `;
};

/**
 * @param {string} dateStr ISO date string.
 * @returns {string} Human-readable time ago.
 */
function getTimeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}
