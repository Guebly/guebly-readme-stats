// @ts-check
import { StatCard } from "../common/Card.js";
import { resolveColors } from "../common/color.js";
import { formatNumber } from "../common/fmt.js";
import { escapeHTML } from "../common/html.js";
import { wrapText } from "../common/fmt.js";

/**
 * @param {object} social Social data.
 * @param {object} options Card options.
 * @returns {string} SVG card markup.
 */
export const renderSocialCard = (social, options = {}) => {
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

  const width = 450;
  const bioLines = social.bio ? wrapText(social.bio, 45, 2) : [];
  const height = 177 + bioLines.length * 18;

  const card = new StatCard({
    customTitle: social.name,
    width,
    height,
    border_radius,
    colors: { titleColor, textColor, iconColor, bgColor, borderColor },
  });

  card.setHideBorder(hide_border);

  card.setCSS(`
    .username { font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; opacity: 0.7; }
    .bio-text { font: 400 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; opacity: 0.8; }
    .stat-icon { fill: ${iconColor}; }
    .stat-text { font: 600 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; }
    .stat-label { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; opacity: 0.6; }
    .location-text { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; opacity: 0.6; }
    .avatar-ring { stroke: ${iconColor}; stroke-width: 2; fill: none; opacity: 0.4; }
  `);

  const statsY = 72 + bioLines.length * 18;

  const bioSvg = bioLines
    .map(
      (line, i) =>
        `<text class="bio-text" x="90" y="${42 + i * 18}">${escapeHTML(line)}</text>`,
    )
    .join("");

  const locationSvg = social.location
    ? `<g transform="translate(90, ${38 + bioLines.length * 18})">
        <svg class="stat-icon" width="12" height="12" viewBox="0 0 16 16">
          <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 018 14.58a31.481 31.481 0 01-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0110 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 002 6c0 4.314 6 10 6 10z"/>
          <circle cx="8" cy="6" r="2.5"/>
        </svg>
        <text class="location-text" x="18" y="10">${escapeHTML(social.location)}</text>
      </g>`
    : "";

  const stats = [
    {
      icon: `<path d="M2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"/>`,
      value: social.followers,
      label: "followers",
    },
    {
      icon: `<path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>`,
      value: social.stars,
      label: "starred",
    },
    {
      icon: `<path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9z"/>`,
      value: social.repos,
      label: "repos",
    },
    {
      icon: `<path d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5z"/>`,
      value: social.following,
      label: "following",
    },
  ];

  const statsWidth = width - 50;
  const statGap = statsWidth / stats.length;

  const statsSvg = stats
    .map(
      (s, i) => `
      <g transform="translate(${i * statGap}, 0)">
        <svg class="stat-icon" width="14" height="14" viewBox="0 0 16 16">${s.icon}</svg>
        <text class="stat-text" x="18" y="12">${formatNumber(s.value)}</text>
        <text class="stat-label" x="18" y="26">${s.label}</text>
      </g>
    `,
    )
    .join("");

  const body = `
    <!-- Avatar -->
    <g transform="translate(12, 0)">
      <clipPath id="avatar-clip-${escapeHTML(social.login)}">
        <circle cx="32" cy="32" r="30" />
      </clipPath>
      <circle class="avatar-ring" cx="32" cy="32" r="31" />
      <image
        x="2" y="2" width="60" height="60"
        clip-path="url(#avatar-clip-${escapeHTML(social.login)})"
        href="${social.avatarUrl}&s=120"
        preserveAspectRatio="xMidYMid slice"
      />
    </g>

    <!-- Username -->
    <text class="username" x="90" y="24">@${escapeHTML(social.login)}</text>

    <!-- Bio -->
    ${bioSvg}

    <!-- Location -->
    ${locationSvg}

    <!-- Stats row -->
    <g transform="translate(25, ${statsY})">
      ${statsSvg}
    </g>
  `;

  return card.render(body);
};
