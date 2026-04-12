// @ts-check
import { resolveColors } from "../common/color.js";
import { formatNumber } from "../common/fmt.js";

const TROPHIES = [
  {
    key: "commits",
    label: "Commits",
    icon: "M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z",
    thresholds: [1, 100, 500, 1000, 5000],
  },
  {
    key: "stars",
    label: "Stars",
    icon: "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z",
    thresholds: [1, 10, 50, 100, 500],
  },
  {
    key: "prs",
    label: "Pull Requests",
    icon: "M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z",
    thresholds: [1, 10, 50, 100, 500],
  },
  {
    key: "issues",
    label: "Issues",
    icon: "M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z",
    thresholds: [1, 10, 50, 100, 500],
  },
  {
    key: "contribs",
    label: "Contributed To",
    icon: "M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8V1.5z",
    thresholds: [1, 5, 10, 25, 50],
  },
  {
    key: "followers",
    label: "Followers",
    icon: "M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z",
    thresholds: [1, 10, 50, 100, 500],
  },
];

const RANK_COLORS_DARK = [
  "#cd7f32",
  "#c0c0c0",
  "#ffd700",
  "#b9f2ff",
  "#ff6ec7",
];
const RANK_LABELS = ["Bronze", "Silver", "Gold", "Diamond", "Crown"];

const getTrophyRank = (value, thresholds) => {
  let rank = -1;
  for (let i = 0; i < thresholds.length; i++) {
    if (value >= thresholds[i]) {
      rank = i;
    }
  }
  return rank;
};

/**
 * @param {object} stats Stats data
 * @param {object} options Card options
 * @returns {string} SVG card markup.
 */
export const renderTrophyCard = (stats, options = {}) => {
  const {
    theme = "default",
    title_color,
    text_color,
    icon_color,
    bg_color,
    border_color,
    hide_border = false,
  } = options;

  const { titleColor, textColor, bgColor, borderColor } = resolveColors({
    title_color,
    text_color,
    icon_color,
    bg_color,
    border_color,
    theme,
  });

  const statValues = {
    commits: stats.totalCommits,
    stars: stats.totalStars,
    prs: stats.totalPRs,
    issues: stats.totalIssues,
    contribs: stats.contributedTo,
    followers: stats.followers || 0,
  };

  const trophySize = 120;
  const cols = Math.min(TROPHIES.length, 6);
  const rows = Math.ceil(TROPHIES.length / cols);
  const width = cols * trophySize + 20;
  const height = rows * (trophySize + 10) + 40;

  const trophies = TROPHIES.map((t, i) => {
    const value = statValues[t.key] || 0;
    const rank = getTrophyRank(value, t.thresholds);
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 10 + col * trophySize;
    const y = 30 + row * (trophySize + 10);
    const rankColor = rank >= 0 ? RANK_COLORS_DARK[rank] : textColor;
    const rankLabel = rank >= 0 ? RANK_LABELS[rank] : "Locked";
    const opacity = rank >= 0 ? 1 : 0.3;

    return `
      <g transform="translate(${x}, ${y})" opacity="${opacity}">
        <rect x="5" y="0" width="${trophySize - 10}" height="${trophySize - 5}"
          rx="8" fill="none" stroke="${rankColor}" stroke-width="1.5" stroke-opacity="0.4" />
        <svg x="${trophySize / 2 - 12}" y="15" width="24" height="24" viewBox="0 0 16 16" fill="${rankColor}">
          <path d="${t.icon}" />
        </svg>
        <text x="${trophySize / 2}" y="52" text-anchor="middle"
          font-size="10" font-weight="600" font-family="'Segoe UI', Ubuntu, Sans-Serif"
          fill="${rankColor}">${rankLabel}</text>
        <text x="${trophySize / 2}" y="70" text-anchor="middle"
          font-size="11" font-weight="700" font-family="'Segoe UI', Ubuntu, Sans-Serif"
          fill="${titleColor}">${t.label}</text>
        <text x="${trophySize / 2}" y="88" text-anchor="middle"
          font-size="13" font-weight="800" font-family="'Segoe UI', Ubuntu, Sans-Serif"
          fill="${textColor}">${formatNumber(value)}</text>
        <text x="${trophySize / 2}" y="105" text-anchor="middle"
          font-size="9" font-family="'Segoe UI', Ubuntu, Sans-Serif"
          fill="${textColor}" opacity="0.5">next: ${rank < 4 ? t.thresholds[rank + 1] : "MAX"}</text>
      </g>
    `;
  }).join("");

  const borderAttr = hide_border
    ? 'stroke-opacity="0"'
    : `stroke="${borderColor}"`;
  const bgFill = typeof bgColor === "object" ? bgColor[1] || "#000" : bgColor;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
      fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-labelledby="trophyTitle">
      <title id="trophyTitle">${stats.name}'s Trophies</title>
      <rect x="0.5" y="0.5" rx="4.5" width="${width - 1}" height="${height - 1}"
        fill="${bgFill}" ${borderAttr} />
      <text x="${width / 2}" y="22" text-anchor="middle"
        font-size="14" font-weight="600" font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${titleColor}">${stats.name}'s Trophies</text>
      ${trophies}
    </svg>
  `;
};
