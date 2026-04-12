// @ts-check
import { resolveColors } from "../common/color.js";
import { formatNumber } from "../common/fmt.js";
import { escapeHTML } from "../common/html.js";

/**
 * @param {object} profile Profile highlight data.
 * @param {object} options Card options.
 * @returns {string} SVG card markup.
 */
export const renderProfileCard = (profile, options = {}) => {
  const {
    theme = "default",
    title_color,
    text_color,
    icon_color,
    bg_color,
    border_color,
    hide_border = false,
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

  const bgFill =
    typeof bgColor === "object" ? bgColor[1] || "#0D1117" : bgColor;
  const borderAttr = hide_border
    ? 'stroke-opacity="0"'
    : `stroke="${borderColor}"`;

  const width = 495;

  // Avatar initial
  const initial = escapeHTML(
    ((profile.name || profile.login || "?")[0] || "?").toUpperCase(),
  );

  // Account creation year
  const sinceYear = new Date(profile.createdAt).getFullYear();

  // Stats — non-developer language
  const yearsLabel = profile.codingYears === 1 ? "yr coding" : "yrs coding";
  const stats = [
    { value: formatNumber(profile.repos), label: "Projects" },
    { value: formatNumber(profile.stars), label: "Stars" },
    { value: formatNumber(profile.followers), label: "Followers" },
    { value: String(profile.codingYears), label: yearsLabel },
  ];

  const colW = (width - 48) / 4;

  const statsSvg = stats
    .map(
      (s, i) => `
    <g transform="translate(${24 + i * colW + colW / 2}, 0)">
      <text text-anchor="middle" y="0"
        font-size="22" font-weight="800"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${titleColor}">${s.value}</text>
      <text text-anchor="middle" y="20"
        font-size="10" font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${textColor}" opacity="0.55" text-transform="uppercase">${s.label}</text>
    </g>`,
    )
    .join("");

  // Languages row — up to 4, spaced evenly
  const langSpacing =
    profile.topLanguages.length > 0
      ? Math.min(115, Math.floor((width - 48) / profile.topLanguages.length))
      : 115;

  const langsSvg = profile.topLanguages
    .map(
      (lang, i) => `
    <g transform="translate(${24 + i * langSpacing}, 0)">
      <circle cx="6" cy="6" r="5.5" fill="${lang.color}" />
      <text x="16" y="11" font-size="11"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${textColor}" opacity="0.75">${escapeHTML(lang.name)}</text>
    </g>`,
    )
    .join("");

  const hasLangs = profile.topLanguages.length > 0;
  const height = hasLangs ? 240 : 195;
  const statsY = 125;
  const langsY = 195;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
      fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-labelledby="profileTitle">
      <title id="profileTitle">${escapeHTML(profile.name)}'s GitHub Highlights</title>

      <rect x="0.5" y="0.5" rx="4.5" width="${width - 1}" height="${height - 1}"
        fill="${bgFill}" ${borderAttr} />

      <!-- Avatar circle (initial, no external image → renders in canvas) -->
      <circle cx="56" cy="56" r="39" fill="${iconColor}" opacity="0.12" />
      <circle cx="56" cy="56" r="39" stroke="${iconColor}" stroke-width="1.5"
        fill="none" opacity="0.25" />
      <text x="56" y="65" text-anchor="middle"
        font-size="30" font-weight="700"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${iconColor}">${initial}</text>

      <!-- Identity -->
      <text x="112" y="36" font-size="18" font-weight="700"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${titleColor}">${escapeHTML(profile.name)}</text>

      <text x="112" y="55" font-size="12"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${textColor}" opacity="0.6">@${escapeHTML(profile.login)}</text>

      <text x="112" y="73" font-size="11"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${iconColor}" opacity="0.9">⚡ Coding since ${sinceYear}</text>

      ${
        profile.location
          ? `<text x="112" y="90" font-size="10"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${textColor}" opacity="0.5">📍 ${escapeHTML(profile.location)}</text>`
          : ""
      }

      <!-- Divider -->
      <line x1="24" y1="108" x2="${width - 24}" y2="108"
        stroke="${textColor}" stroke-opacity="0.1" stroke-width="1" />

      <!-- Stats -->
      <g transform="translate(0, ${statsY})">
        ${statsSvg}
      </g>

      ${
        hasLangs
          ? `
      <!-- Languages -->
      <line x1="24" y1="178" x2="${width - 24}" y2="178"
        stroke="${textColor}" stroke-opacity="0.1" stroke-width="1" />
      <g transform="translate(0, ${langsY})">
        ${langsSvg}
      </g>`
          : ""
      }
    </svg>
  `;
};
