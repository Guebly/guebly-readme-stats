// @ts-check

import { resolveColors } from "../common/color.js";
import { escapeHTML } from "../common/html.js";

const PROVIDER_ICONS = {
  TWITTER: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  YOUTUBE: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  LINKEDIN: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 110-4 2 2 0 010 4z",
  WEBSITE: "M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z",
};

/**
 * @param {object} data Sponsors data.
 * @param {object} options Card options.
 * @returns {string} SVG sponsors/support card.
 */
export const renderSponsorsCard = (data, options = {}) => {
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
  const rx = border_radius === undefined ? 4.5 : Number(border_radius);
  const bgFill = typeof bgColor === "object" ? bgColor[1] || "#0D1117" : bgColor;
  const borderAttr = hide_border ? 'stroke-opacity="0"' : `stroke="${borderColor}"`;

  const title = custom_title || `Support ${escapeHTML(data.name)}`;

  const heartIcon = `<path d="M7.655 14.916v-.001h-.002l-.006-.003-.018-.01a7.643 7.643 0 01-.245-.14 15.576 15.576 0 01-2.734-2.072C2.8 10.881 1 8.684 1 5.5 1 2.934 3.012 1 5.5 1 6.858 1 8.065 1.627 8.882 2.596 9.697 1.627 10.903 1 12.26 1 14.748 1 16.76 2.934 16.76 5.5c0 3.184-1.8 5.381-3.65 7.19a15.576 15.576 0 01-2.979 2.212l-.018.01-.006.004h-.002z" fill="${iconColor}"/>`;

  let y = 60;
  let bodySvg = "";

  if (data.hasSponsorsListing) {
    bodySvg += `
      <g transform="translate(${width / 2 - 10}, 50)">
        <svg viewBox="0 0 18 16" width="20" height="20">${heartIcon}</svg>
      </g>
      <text x="${width / 2}" y="86" text-anchor="middle" font-size="13"
        font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${textColor}" opacity="0.7">${escapeHTML(data.description.slice(0, 60) || "GitHub Sponsors enabled")}</text>
    `;
    y = 110;

    bodySvg += `
      <text x="${width / 2 - 60}" y="${y}" text-anchor="middle" font-size="24" font-weight="800"
        font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${titleColor}">${data.sponsorCount}</text>
      <text x="${width / 2 - 60}" y="${y + 18}" text-anchor="middle" font-size="11"
        font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${textColor}" opacity="0.5">Sponsors</text>

      <text x="${width / 2 + 60}" y="${y}" text-anchor="middle" font-size="24" font-weight="800"
        font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${titleColor}">${data.sponsoringCount}</text>
      <text x="${width / 2 + 60}" y="${y + 18}" text-anchor="middle" font-size="11"
        font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${textColor}" opacity="0.5">Sponsoring</text>
    `;
    y += 42;

    if (data.sponsors.length > 0) {
      y += 10;
      const avatarSize = 28;
      const gap = 6;
      const totalWidth = data.sponsors.length * (avatarSize + gap) - gap;
      const startX = (width - totalWidth) / 2;

      data.sponsors.forEach((s, i) => {
        const x = startX + i * (avatarSize + gap);
        bodySvg += `
          <clipPath id="sp-${i}"><circle cx="${x + avatarSize / 2}" cy="${y + avatarSize / 2}" r="${avatarSize / 2}"/></clipPath>
          <image x="${x}" y="${y}" width="${avatarSize}" height="${avatarSize}"
            clip-path="url(#sp-${i})" href="${s.avatarUrl}"
            preserveAspectRatio="xMidYMid slice"/>
        `;
      });
      y += avatarSize + 16;
    }
  } else {
    bodySvg += `
      <text x="${width / 2}" y="80" text-anchor="middle" font-size="14"
        font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${textColor}" opacity="0.6">GitHub Sponsors not enabled</text>
    `;
    y = 100;
  }

  if (data.socialLinks.length > 0) {
    y += 8;
    bodySvg += `
      <line x1="25" y1="${y - 10}" x2="${width - 25}" y2="${y - 10}"
        stroke="${textColor}" stroke-opacity="0.1"/>
      <text x="${width / 2}" y="${y + 8}" text-anchor="middle" font-size="10" font-weight="600"
        font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${textColor}" opacity="0.4" letter-spacing="1.5">LINKS</text>
    `;
    y += 26;

    data.socialLinks.slice(0, 4).forEach((link) => {
      const displayText = link.displayName || link.url.replace(/^https?:\/\//, "");
      bodySvg += `
        <text x="${width / 2}" y="${y}" text-anchor="middle" font-size="12"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${iconColor}" opacity="0.8">${escapeHTML(displayText.slice(0, 40))}</text>
      `;
      y += 20;
    });
  }

  const height = Math.max(y + 20, 150);

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
      fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-labelledby="sponsorsTitle">
      <title id="sponsorsTitle">${escapeHTML(title)}</title>

      <rect x="0.5" y="0.5" rx="${rx}" width="${width - 1}" height="${height - 1}"
        fill="${bgFill}" ${borderAttr}/>

      <text x="25" y="32" font-size="16" font-weight="600"
        font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${titleColor}">${escapeHTML(title)}</text>

      ${bodySvg}
    </svg>
  `;
};
