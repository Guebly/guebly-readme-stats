// @ts-check
import { StatCard } from "../common/Card.js";
import { resolveColors } from "../common/color.js";

const formatDate = (dateStr) => {
  if (!dateStr) {
    return "N/A";
  }
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * @param {object} streak Streak data.
 * @param {object} options Card options.
 * @returns {string} SVG card markup.
 */
export const renderStreakCard = (streak, options = {}) => {
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

  const width = 495;
  const height = 195;

  const card = new StatCard({
    customTitle: `${streak.name}'s Contribution Streak`,
    width,
    height,
    border_radius,
    colors: { titleColor, textColor, iconColor, bgColor, borderColor },
  });

  card.setHideBorder(hide_border);

  card.setCSS(`
    .stat-label { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; opacity: 0.7; }
    .stat-value { font: 700 28px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${titleColor}; }
    .stat-sub { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; opacity: 0.5; }
    .fire { fill: ${iconColor}; }
    .divider { stroke: ${textColor}; stroke-opacity: 0.15; }
  `);

  const body = `
    <!-- Total Contributions -->
    <g transform="translate(70, 28)">
      <text class="stat-label" text-anchor="middle" y="0">Total Contributions</text>
      <text class="stat-value" text-anchor="middle" y="50">${streak.totalContributions}</text>
      <text class="stat-sub" text-anchor="middle" y="68">Last year</text>
    </g>

    <line class="divider" x1="140" y1="0" x2="140" y2="100" />

    <!-- Current Streak -->
    <g transform="translate(247, 28)">
      <text class="stat-label" text-anchor="middle" y="0">Current Streak</text>
      <svg class="fire" x="-8" y="10" width="16" height="16" viewBox="0 0 16 16">
        <path d="M7.998 14.5c2.832 0 5-1.98 5-4.5 0-1.463-.68-2.19-1.879-3.383l-.036-.037c-1.013-1.008-2.3-2.29-2.834-4.434-.322.256-.63.579-.864.953-.432.696-.621 1.58-.046 2.73.473.947.67 2.284-.278 3.232-.61.61-1.545.84-2.403.633a2.79 2.79 0 0 1-1.436-.874A3.198 3.198 0 0 0 3 10c0 2.52 2.167 4.5 4.998 4.5Z"/>
      </svg>
      <text class="stat-value" text-anchor="middle" y="50">
        ${streak.currentStreak}
      </text>
      <text class="stat-sub" text-anchor="middle" y="68">
        ${
          streak.currentStreak > 0
            ? `${formatDate(streak.currentStreakStart)} – ${formatDate(streak.currentStreakEnd)}`
            : "No active streak"
        }
      </text>
    </g>

    <line class="divider" x1="355" y1="0" x2="355" y2="100" />

    <!-- Longest Streak -->
    <g transform="translate(425, 28)">
      <text class="stat-label" text-anchor="middle" y="0">Longest Streak</text>
      <text class="stat-value" text-anchor="middle" y="50">${streak.longestStreak}</text>
      <text class="stat-sub" text-anchor="middle" y="68">
        ${
          streak.longestStreak > 0
            ? `${formatDate(streak.longestStreakStart)} – ${formatDate(streak.longestStreakEnd)}`
            : "N/A"
        }
      </text>
    </g>
  `;

  return card.render(body);
};
