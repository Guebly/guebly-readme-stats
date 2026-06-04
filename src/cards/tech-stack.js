// @ts-check

import { resolveColors } from "../common/color.js";
import { resolveGradient } from "../common/gradient.js";
import { escapeHTML } from "../common/html.js";
import { textWidth } from "../common/render.js";

const CATEGORY_ICONS = {
  Frontend:
    "M7.375 16l3.77-12h1.48l-3.77 12h-1.48zM4.475 12.696l-3.4-4.281 3.4-4.281 1.167.928L2.575 8.415l3.067 3.353-1.167.928zM11.525 12.696l-1.167-.928 3.067-3.353-3.067-3.353 1.167-.928 3.4 4.281-3.4 4.281z",
  Backend:
    "M3 3a2 2 0 012-2h6a2 2 0 012 2v.223c0 .275.224.5.5.5.276 0 .5.224.5.5v8.554c0 .276-.224.5-.5.5a.5.5 0 00-.5.5V14a2 2 0 01-2 2H5a2 2 0 01-2-2v-.723a.5.5 0 00-.5-.5.5.5 0 01-.5-.5V3.723a.5.5 0 00.5-.5c.276 0 .5-.225.5-.5V3z",
  Systems:
    "M14 3.5V15a1 1 0 01-1 1H3a1 1 0 01-1-1V1a1 1 0 011-1h7.5L14 3.5zM4 4h6v1H4V4zm0 3h6v1H4V7zm0 3h6v1H4v-1z",
  Mobile:
    "M11 1a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V2a1 1 0 011-1h6zM5 0a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V2a2 2 0 00-2-2H5zm3 14a1 1 0 100-2 1 1 0 000 2z",
  DevOps:
    "M6 9a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3A.5.5 0 016 9zM2 2a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V2zm2-1a1 1 0 00-1 1v4h10V2a1 1 0 00-1-1H4zm9 6H3v7a1 1 0 001 1h8a1 1 0 001-1V7z",
  Data: "M0 2C0 .9.9 0 2 0h12c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2h-3l-4 4v-4H2c-1.1 0-2-.9-2-2V2zm4.83 3.21L3 8h2.13l.6-1.2L7 8h2.13l-2.3-3.39L8 3H5.87L5.27 4.2 4 3H1.87l2.96 2.21z",
  Other:
    "M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z",
};

const CATEGORY_ORDER = [
  "Frontend",
  "Backend",
  "Systems",
  "Mobile",
  "DevOps",
  "Data",
  "Other",
];

/**
 * @param {object} data Tech stack data.
 * @param {object} options Card options.
 * @returns {string} SVG tech-stack card.
 */
export const renderTechStackCard = (data, options = {}) => {
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
  const rx = border_radius === undefined ? 4.5 : Number(border_radius);
  const { bgFill, gradientDef } = resolveGradient(bgColor);
  const borderAttr = hide_border
    ? 'stroke-opacity="0"'
    : `stroke="${borderColor}"`;

  const title = custom_title || `${data.name}'s Tech Stack`;

  const activeCategories = CATEGORY_ORDER.filter(
    (cat) => data.categories[cat] && data.categories[cat].length > 0,
  );

  let y = 65;
  let categoriesSvg = "";

  for (const cat of activeCategories) {
    const langs = data.categories[cat].slice(0, 6);
    const iconPath = CATEGORY_ICONS[cat] || CATEGORY_ICONS.Other;

    categoriesSvg += `
      <g transform="translate(25, ${y})">
        <svg viewBox="0 0 16 16" width="14" height="14" y="-11">
          <path d="${iconPath}" fill="${iconColor}" opacity="0.6"/>
        </svg>
        <text x="22" y="0" font-size="12" font-weight="600"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${titleColor}" opacity="0.8">${escapeHTML(cat)}</text>
      </g>
    `;

    y += 22;

    langs.forEach((lang, i) => {
      const x = 35 + (i % 3) * 150;
      const rowY = y + Math.floor(i / 3) * 22;
      const nameW = textWidth(lang.name, 12);

      categoriesSvg += `
        <circle cx="${x}" cy="${rowY - 4}" r="4" fill="${lang.color}"/>
        <text x="${x + 10}" y="${rowY}" font-size="12"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${textColor}">${escapeHTML(lang.name)}</text>
        <text x="${x + 10 + nameW + 6}" y="${rowY}" font-size="10"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${textColor}" opacity="0.4">${lang.percent}%</text>
      `;
    });

    y += Math.ceil(langs.length / 3) * 22 + 14;
  }

  const height = Math.max(y + 20, 120);

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
      fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-labelledby="techStackTitle">
      <title id="techStackTitle">${escapeHTML(title)}</title>

      <style>
        .ts-anim { animation: tsIn 0.6s ease-in-out forwards; opacity: 0; }
        @keyframes tsIn { to { opacity: 1; } }
      </style>

      ${gradientDef}

      <rect x="0.5" y="0.5" rx="${rx}" width="${width - 1}" height="${height - 1}"
        fill="${bgFill}" ${borderAttr}/>

      <g class="ts-anim">
        <text x="25" y="35" font-size="16" font-weight="600"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${titleColor}">${escapeHTML(title)}</text>
      </g>

      <g class="ts-anim" style="animation-delay: 0.2s;">
        ${categoriesSvg}
      </g>
    </svg>
  `;
};
