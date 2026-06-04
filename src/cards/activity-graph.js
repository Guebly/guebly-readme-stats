// @ts-check

import { resolveColors } from "../common/color.js";
import { resolveGradient } from "../common/gradient.js";
import { escapeHTML } from "../common/html.js";
import { formatNumber } from "../common/fmt.js";

/**
 * @param {object} data Activity graph data.
 * @param {object} options Card options.
 * @returns {string} SVG activity graph card.
 */
export const renderActivityGraphCard = (data, options = {}) => {
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
      ring_color: "",
      theme,
    });

  const width = 495;
  const height = 210;
  const rx = border_radius === undefined ? 4.5 : Number(border_radius);
  const { bgFill, gradientDef } = resolveGradient(bgColor);
  const borderAttr = hide_border
    ? 'stroke-opacity="0"'
    : `stroke="${borderColor}"`;

  const title = custom_title || `${data.name}'s Activity`;
  const months = data.months || [];

  if (months.length === 0) {
    return `
      <svg width="${width}" height="120" viewBox="0 0 ${width} 120"
        fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
        ${gradientDef}
        <rect x="0.5" y="0.5" rx="${rx}" width="${width - 1}" height="119"
          fill="${bgFill}" ${borderAttr}/>
        <text x="25" y="35" font-size="16" font-weight="600"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${titleColor}">${escapeHTML(title)}</text>
        <text x="25" y="72" font-size="14"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${textColor}" opacity="0.6">No activity data available</text>
      </svg>
    `;
  }

  const padX = 50;
  const padTop = 65;
  const padBottom = 45;
  const graphW = width - padX - 30;
  const graphH = height - padTop - padBottom;
  const maxCount = Math.max(1, ...months.map((m) => m.count));

  const points = months.map((m, i) => {
    const x = padX + (i / Math.max(1, months.length - 1)) * graphW;
    const y = padTop + graphH - (m.count / maxCount) * graphH;
    return { x, y, ...m };
  });

  const polyline = points
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");

  const areaPath = [
    `M ${points[0].x.toFixed(1)},${(padTop + graphH).toFixed(1)}`,
    `L ${polyline
      .split(" ")
      .map((pt) => `L ${pt}`)
      .join(" ")
      .substring(2)}`,
    `L ${points[points.length - 1].x.toFixed(1)},${(padTop + graphH).toFixed(1)}`,
    "Z",
  ].join(" ");

  const dotsSvg = points
    .map(
      (p) =>
        `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="${iconColor}" opacity="0.9">
          <title>${escapeHTML(p.label)}: ${p.count} contributions</title>
        </circle>`,
    )
    .join("");

  const labelsSvg = points
    .map(
      (p) =>
        `<text x="${p.x.toFixed(1)}" y="${(padTop + graphH + 18).toFixed(1)}" text-anchor="middle" font-size="9"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${textColor}" opacity="0.5">${escapeHTML(p.label)}</text>`,
    )
    .join("");

  const gridLines = [0, 0.25, 0.5, 0.75, 1]
    .map((pct) => {
      const y = padTop + graphH - pct * graphH;
      const val = Math.round(maxCount * pct);
      return `
      <line x1="${padX}" y1="${y.toFixed(1)}" x2="${(padX + graphW).toFixed(1)}" y2="${y.toFixed(1)}"
        stroke="${textColor}" stroke-opacity="0.06" stroke-width="1"/>
      <text x="${padX - 8}" y="${(y + 3).toFixed(1)}" text-anchor="end" font-size="9"
        font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${textColor}" opacity="0.35">${formatNumber(val)}</text>
    `;
    })
    .join("");

  const totalText = `${formatNumber(data.totalContributions)} total`;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
      fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-labelledby="activityTitle">
      <title id="activityTitle">${escapeHTML(title)}</title>

      <style>
        .activity-line { animation: drawLine 1.2s ease-in-out forwards; }
        .activity-area { animation: fadeArea 1.2s ease-in-out forwards; opacity: 0; }
        @keyframes drawLine { from { stroke-dashoffset: 2000; } to { stroke-dashoffset: 0; } }
        @keyframes fadeArea { from { opacity: 0; } to { opacity: 0.15; } }
      </style>

      ${gradientDef}

      <rect x="0.5" y="0.5" rx="${rx}" width="${width - 1}" height="${height - 1}"
        fill="${bgFill}" ${borderAttr}/>

      <text x="25" y="35" font-size="16" font-weight="600"
        font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${titleColor}">${escapeHTML(title)}</text>

      <text x="${width - 25}" y="35" text-anchor="end" font-size="12"
        font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${textColor}" opacity="0.5">${escapeHTML(totalText)}</text>

      ${gridLines}

      <path d="${areaPath}" fill="${iconColor}" class="activity-area"/>

      <polyline points="${polyline}" fill="none"
        stroke="${iconColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
        class="activity-line" stroke-dasharray="2000"/>

      ${dotsSvg}
      ${labelsSvg}
    </svg>
  `;
};
