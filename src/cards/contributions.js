// @ts-check

import { resolveColors } from "../common/color.js";
import { escapeHTML } from "../common/html.js";
import { formatNumber } from "../common/fmt.js";

/**
 * @param {object} data Contributions data.
 * @param {object} options Card options.
 * @returns {string} SVG contributions heatmap card.
 */
export const renderContributionsCard = (data, options = {}) => {
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

  const width = 720;
  const height = 200;
  const rx = border_radius === undefined ? 4.5 : Number(border_radius);
  const bgFill = typeof bgColor === "object" ? bgColor[1] || "#0D1117" : bgColor;
  const borderAttr = hide_border ? 'stroke-opacity="0"' : `stroke="${borderColor}"`;

  const title = custom_title || `${escapeHTML(data.name)}'s Contributions`;
  const cellSize = 11;
  const cellGap = 2;
  const totalCellSize = cellSize + cellGap;
  const weeks = data.weeks || [];
  const recentWeeks = weeks.slice(-52);

  const maxCount = Math.max(
    1,
    ...recentWeeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount)),
  );

  const getColor = (count) => {
    if (count === 0) return typeof iconColor === "string" ? iconColor + "15" : "#30363d";
    const intensity = count / maxCount;
    if (intensity <= 0.25) return typeof iconColor === "string" ? iconColor + "40" : "#0e4429";
    if (intensity <= 0.5) return typeof iconColor === "string" ? iconColor + "70" : "#006d32";
    if (intensity <= 0.75) return typeof iconColor === "string" ? iconColor + "aa" : "#26a641";
    return iconColor;
  };

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const gridStartX = 55;
  const gridStartY = 55;

  let cellsSvg = "";
  const monthPositions = [];
  let lastMonth = -1;

  recentWeeks.forEach((week, wi) => {
    week.contributionDays.forEach((day) => {
      const x = gridStartX + wi * totalCellSize;
      const y = gridStartY + day.weekday * totalCellSize;
      const color = getColor(day.contributionCount);
      cellsSvg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2" ry="2" fill="${color}" data-count="${day.contributionCount}" data-date="${day.date}">
        <title>${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}</title>
      </rect>`;

      const month = new Date(day.date).getMonth();
      if (month !== lastMonth && day.weekday === 0) {
        monthPositions.push({ month, x });
        lastMonth = month;
      }
    });
  });

  const monthLabelsSvg = monthPositions
    .map(
      (m) =>
        `<text x="${m.x}" y="${gridStartY - 8}" font-size="10" font-family="'Segoe UI',Ubuntu,Sans-Serif" fill="${textColor}" opacity="0.6">${monthLabels[m.month]}</text>`,
    )
    .join("");

  const dayLabelsSvg = dayLabels
    .map(
      (label, i) =>
        label
          ? `<text x="${gridStartX - 16}" y="${gridStartY + i * totalCellSize + 9}" text-anchor="end" font-size="9" font-family="'Segoe UI',Ubuntu,Sans-Serif" fill="${textColor}" opacity="0.5">${label}</text>`
          : "",
    )
    .join("");

  const totalText = `${formatNumber(data.totalContributions)} contributions in the last year`;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
      fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-labelledby="contribTitle">
      <title id="contribTitle">${escapeHTML(title)}</title>

      <rect x="0.5" y="0.5" rx="${rx}" width="${width - 1}" height="${height - 1}"
        fill="${bgFill}" ${borderAttr}/>

      <text x="25" y="32" font-size="16" font-weight="600"
        font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${titleColor}">${escapeHTML(title)}</text>

      <text x="${width - 25}" y="32" text-anchor="end" font-size="12"
        font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${textColor}" opacity="0.6">${escapeHTML(totalText)}</text>

      ${monthLabelsSvg}
      ${dayLabelsSvg}
      ${cellsSvg}

      <g transform="translate(${width - 120}, ${height - 24})">
        <text x="0" y="0" font-size="9" font-family="'Segoe UI',Ubuntu,Sans-Serif" fill="${textColor}" opacity="0.5">Less</text>
        <rect x="28" y="-9" width="${cellSize}" height="${cellSize}" rx="2" fill="${getColor(0)}"/>
        <rect x="${28 + totalCellSize}" y="-9" width="${cellSize}" height="${cellSize}" rx="2" fill="${getColor(maxCount * 0.25)}"/>
        <rect x="${28 + totalCellSize * 2}" y="-9" width="${cellSize}" height="${cellSize}" rx="2" fill="${getColor(maxCount * 0.5)}"/>
        <rect x="${28 + totalCellSize * 3}" y="-9" width="${cellSize}" height="${cellSize}" rx="2" fill="${getColor(maxCount * 0.75)}"/>
        <rect x="${28 + totalCellSize * 4}" y="-9" width="${cellSize}" height="${cellSize}" rx="2" fill="${getColor(maxCount)}"/>
        <text x="${28 + totalCellSize * 5 + 4}" y="0" font-size="9" font-family="'Segoe UI',Ubuntu,Sans-Serif" fill="${textColor}" opacity="0.5">More</text>
      </g>
    </svg>
  `;
};
