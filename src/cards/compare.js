// @ts-check

import { resolveColors } from "../common/color.js";
import { escapeHTML } from "../common/html.js";
import { formatNumber } from "../common/fmt.js";

/**
 * @param {object} user1 First user stats.
 * @param {object} user2 Second user stats.
 * @param {object} options Card options.
 * @returns {string} SVG compare card.
 */
export const renderCompareCard = (user1, user2, options = {}) => {
  const {
    theme = "default",
    title_color,
    text_color,
    icon_color,
    bg_color,
    border_color,
    hide_border = false,
    border_radius,
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

  const width = 600;
  const height = 340;
  const rx = border_radius === undefined ? 4.5 : Number(border_radius);
  const bgFill =
    typeof bgColor === "object" ? bgColor[1] || "#0D1117" : bgColor;
  const borderAttr = hide_border
    ? 'stroke-opacity="0"'
    : `stroke="${borderColor}"`;

  const stats = [
    { label: "Commits", key: "totalCommits" },
    { label: "PRs", key: "totalPRs" },
    { label: "Issues", key: "totalIssues" },
    { label: "Stars", key: "totalStars" },
    { label: "Contributed to", key: "contributedTo" },
  ];

  const colL = 200;
  const colR = 400;
  const startY = 100;
  const rowHeight = 40;

  const rowsSvg = stats
    .map((stat, i) => {
      const y = startY + i * rowHeight;
      const v1 = user1[stat.key] || 0;
      const v2 = user2[stat.key] || 0;
      const winner = v1 > v2 ? "left" : v2 > v1 ? "right" : "tie";
      const leftOpacity = winner === "right" ? "0.5" : "1";
      const rightOpacity = winner === "left" ? "0.5" : "1";
      const leftWeight = winner === "left" ? "700" : "400";
      const rightWeight = winner === "right" ? "700" : "400";

      return `
        <text x="${colL}" y="${y}" text-anchor="end" font-size="16" font-weight="${leftWeight}"
          font-family="'Segoe UI',Ubuntu,Sans-Serif" fill="${titleColor}" opacity="${leftOpacity}">${formatNumber(v1)}</text>
        <text x="${width / 2}" y="${y}" text-anchor="middle" font-size="12"
          font-family="'Segoe UI',Ubuntu,Sans-Serif" fill="${textColor}" opacity="0.5">${stat.label}</text>
        <text x="${colR}" y="${y}" font-size="16" font-weight="${rightWeight}"
          font-family="'Segoe UI',Ubuntu,Sans-Serif" fill="${titleColor}" opacity="${rightOpacity}">${formatNumber(v2)}</text>
        ${winner === "tie" ? "" : `<circle cx="${winner === "left" ? colL + 12 : colR - 12}" cy="${y - 5}" r="3" fill="${iconColor}" opacity="0.6"/>`}
      `;
    })
    .join("");

  const rank1 = user1.rank
    ? `${user1.rank.level} (${user1.rank.percentile.toFixed(0)}%)`
    : "";
  const rank2 = user2.rank
    ? `${user2.rank.level} (${user2.rank.percentile.toFixed(0)}%)`
    : "";
  const rankY = startY + stats.length * rowHeight + 10;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
      fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-labelledby="compareTitle">
      <title id="compareTitle">${escapeHTML(user1.name)} vs ${escapeHTML(user2.name)}</title>

      <style>
        .compare-anim { animation: fadeInCompare 0.6s ease-in-out forwards; opacity: 0; }
        @keyframes fadeInCompare { to { opacity: 1; } }
      </style>

      <rect x="0.5" y="0.5" rx="${rx}" width="${width - 1}" height="${height - 1}"
        fill="${bgFill}" ${borderAttr}/>

      <line x1="${width / 2}" y1="30" x2="${width / 2}" y2="${height - 30}"
        stroke="${textColor}" stroke-opacity="0.08" stroke-width="1"/>

      <g class="compare-anim">
        <text x="${colL}" y="38" text-anchor="end" font-size="18" font-weight="700"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${titleColor}">${escapeHTML(user1.name)}</text>
        <text x="${colL}" y="56" text-anchor="end" font-size="12"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${textColor}" opacity="0.5">@${escapeHTML(user1.login || "")}</text>
      </g>

      <g class="compare-anim" style="animation-delay: 0.1s;">
        <text x="${width / 2}" y="45" text-anchor="middle" font-size="14" font-weight="600"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${iconColor}" opacity="0.7">VS</text>
      </g>

      <g class="compare-anim" style="animation-delay: 0.2s;">
        <text x="${colR}" y="38" font-size="18" font-weight="700"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${titleColor}">${escapeHTML(user2.name)}</text>
        <text x="${colR}" y="56" font-size="12"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${textColor}" opacity="0.5">@${escapeHTML(user2.login || "")}</text>
      </g>

      <line x1="25" y1="72" x2="${width - 25}" y2="72"
        stroke="${textColor}" stroke-opacity="0.1" stroke-width="1"/>

      <g class="compare-anim" style="animation-delay: 0.3s;">
        ${rowsSvg}
      </g>

      <line x1="25" y1="${rankY - 15}" x2="${width - 25}" y2="${rankY - 15}"
        stroke="${textColor}" stroke-opacity="0.1" stroke-width="1"/>

      <g class="compare-anim" style="animation-delay: 0.5s;">
        <text x="${colL}" y="${rankY + 5}" text-anchor="end" font-size="14" font-weight="600"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${iconColor}">${rank1}</text>
        <text x="${width / 2}" y="${rankY + 5}" text-anchor="middle" font-size="11"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${textColor}" opacity="0.5">Rank</text>
        <text x="${colR}" y="${rankY + 5}" font-size="14" font-weight="600"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${iconColor}">${rank2}</text>
      </g>
    </svg>
  `;
};
