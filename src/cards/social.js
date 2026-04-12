// @ts-check
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
  const height = 800;
  const rx = border_radius === undefined ? 18 : Number(border_radius);

  const bgFill =
    typeof bgColor === "object" ? bgColor[1] || "#0D1117" : bgColor;
  const borderAttr = hide_border
    ? 'stroke-opacity="0"'
    : `stroke="${borderColor}"`;

  // ── Avatar ───────────────────────────────────────────────────────
  const avatarCX = 225;
  const avatarCY = 120;
  const avatarR = 68;

  const avatarInitial = escapeHTML(
    ((social.name || social.login || "?")[0] || "?").toUpperCase(),
  );

  const avatarInner = social.avatarUrl
    ? `<clipPath id="avc-story-${escapeHTML(social.login)}">
         <circle cx="${avatarCX}" cy="${avatarCY}" r="${avatarR}"/>
       </clipPath>
       <image x="${avatarCX - avatarR}" y="${avatarCY - avatarR}"
         width="${avatarR * 2}" height="${avatarR * 2}"
         clip-path="url(#avc-story-${escapeHTML(social.login)})"
         href="${social.avatarUrl}"
         preserveAspectRatio="xMidYMid slice"/>`
    : `<circle cx="${avatarCX}" cy="${avatarCY}" r="${avatarR}"
         fill="${iconColor}" opacity="0.1"/>
       <text x="${avatarCX}" y="${avatarCY + 18}" text-anchor="middle"
         font-size="48" font-weight="700"
         font-family="'Segoe UI',Ubuntu,Sans-Serif"
         fill="${iconColor}">${avatarInitial}</text>`;

  // ── Bio ──────────────────────────────────────────────────────────
  const bioLines = social.bio ? wrapText(social.bio, 42, 3) : [];
  const bioStartY = 240;
  const bioSvg = bioLines
    .map(
      (line, i) =>
        `<text x="${width / 2}" y="${bioStartY + i * 20}" text-anchor="middle"
          font-size="13" font-style="italic"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${textColor}" opacity="0.7">${escapeHTML(line)}</text>`,
    )
    .join("");

  // ── Info items (location / company / website) ─────────────────────
  const pinPath =
    "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z";
  const buildingPath =
    "M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022z";
  const linkPath =
    "M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z";

  const infoData = [];
  if (social.location) {
    infoData.push({ path: pinPath, text: social.location.slice(0, 30) });
  }
  if (social.company) {
    infoData.push({
      path: buildingPath,
      text: social.company.replace(/^@/, "").slice(0, 30),
    });
  }
  if (social.website) {
    infoData.push({
      path: linkPath,
      text: social.website.replace(/^https?:\/\//, "").slice(0, 32),
    });
  }

  const infoBaseY =
    bioStartY + bioLines.length * 20 + (bioLines.length > 0 ? 14 : 0);

  const infoSvg = infoData
    .map((item, i) => {
      const lineY = infoBaseY + i * 22 + 16;
      const textWidth = item.text.length * 6.6;
      const totalW = 16 + 6 + textWidth;
      const startX = (width - Math.min(totalW, width - 48)) / 2;
      return `
        <g transform="translate(${startX}, ${lineY - 11}) scale(0.75)">
          <path d="${item.path}" fill="${textColor}" opacity="0.4"/>
        </g>
        <text x="${startX + 14}" y="${lineY}"
          font-size="12" font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${textColor}" opacity="0.55">${escapeHTML(item.text)}</text>`;
    })
    .join("");

  // ── Divider position ──────────────────────────────────────────────
  const dividerY = Math.max(
    infoBaseY + infoData.length * 22 + 30,
    bioLines.length === 0 && infoData.length === 0 ? 238 : 300,
  );

  // ── Stats icons ───────────────────────────────────────────────────
  const repoIcon =
    "M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8.5V1.5z";
  const starIcon =
    "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z";
  const commitIcon =
    "M11.93 8.5a4.002 4.002 0 01-7.86 0H.75a.75.75 0 010-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 010 1.5h-3.32zM8 6a2.5 2.5 0 100 5 2.5 2.5 0 000-5z";
  const followersIcon =
    "M2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z";
  const followingIcon =
    "M6 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM2 6a4 4 0 116.663 3.003A6.001 6.001 0 0111.35 13h1.4a.75.75 0 010 1.5H1.25a.75.75 0 010-1.5h1.351A6.001 6.001 0 015.337 9.003 4.002 4.002 0 012 6zm11.5-3.5a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0V6.25h-1.5a.75.75 0 010-1.5h1.5v-1.5a.75.75 0 01.75-.75z";

  // ── Stats layout (2+2+1) ──────────────────────────────────────────
  const statsData = [
    {
      icon: commitIcon,
      value: String(formatNumber(social.contributions || 0)),
      label: "Contributions",
    },
    {
      icon: followersIcon,
      value: String(formatNumber(social.followers)),
      label: "Followers",
    },
    {
      icon: followingIcon,
      value: String(formatNumber(social.following)),
      label: "Following",
    },
    {
      icon: repoIcon,
      value: String(formatNumber(social.repos)),
      label: "Repos",
    },
    {
      icon: starIcon,
      value: String(formatNumber(social.stars)),
      label: "Starred",
    },
  ];

  const colL = 113;
  const colR = 337;
  const rowSpacing = 100;
  const statsStartY = dividerY + 68;

  const statPositions = [
    { x: colL, y: statsStartY },
    { x: colR, y: statsStartY },
    { x: colL, y: statsStartY + rowSpacing },
    { x: colR, y: statsStartY + rowSpacing },
    { x: width / 2, y: statsStartY + rowSpacing * 2 },
  ];

  const statsSvg = statsData
    .map((s, i) => {
      const { x, y } = statPositions[i];
      return `
        <g transform="translate(${x - 8}, ${y - 46})">
          <path d="${s.icon}" fill="${iconColor}" opacity="0.7"/>
        </g>
        <text x="${x}" y="${y}" text-anchor="middle"
          font-size="26" font-weight="800"
          font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${titleColor}">${escapeHTML(s.value)}</text>
        <text x="${x}" y="${y + 18}" text-anchor="middle"
          font-size="11" font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${textColor}" opacity="0.5">${escapeHTML(s.label)}</text>`;
    })
    .join("");

  // vertical col divider between the two columns
  const colDividerX = width / 2;
  const colDividerY1 = dividerY + 20;
  const colDividerY2 = statsStartY + rowSpacing + 38;

  const bottomDividerY = statsStartY + rowSpacing * 2 + 52;
  const brandingY = bottomDividerY + 36;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
      fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-labelledby="socialTitle">
      <title id="socialTitle">${escapeHTML(social.name)}'s GitHub Social Card</title>

      <rect x="0.5" y="0.5" rx="${rx}" width="${width - 1}" height="${height - 1}"
        fill="${bgFill}" ${borderAttr}/>

      <!-- ── Avatar ring ── -->
      <circle cx="${avatarCX}" cy="${avatarCY}" r="${avatarR + 3}"
        stroke="${iconColor}" stroke-width="1.5" fill="none" opacity="0.3"/>
      ${avatarInner}

      <!-- ── Identity ── -->
      <text x="${width / 2}" y="214" text-anchor="middle"
        font-size="22" font-weight="700"
        font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${titleColor}">${escapeHTML(social.name)}</text>
      <text x="${width / 2}" y="233" text-anchor="middle"
        font-size="13" font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${textColor}" opacity="0.5">@${escapeHTML(social.login)}</text>

      <!-- ── Bio ── -->
      ${bioSvg}

      <!-- ── Info ── -->
      ${infoSvg}

      <!-- ── Section divider ── -->
      <line x1="24" y1="${dividerY}" x2="${width - 24}" y2="${dividerY}"
        stroke="${textColor}" stroke-opacity="0.1" stroke-width="1"/>

      <!-- ── Stats ── -->
      ${statsSvg}

      <!-- ── Column divider ── -->
      <line x1="${colDividerX}" y1="${colDividerY1}"
        x2="${colDividerX}" y2="${colDividerY2}"
        stroke="${textColor}" stroke-opacity="0.07" stroke-width="1"/>

      <!-- ── Bottom divider ── -->
      <line x1="24" y1="${bottomDividerY}" x2="${width - 24}" y2="${bottomDividerY}"
        stroke="${textColor}" stroke-opacity="0.1" stroke-width="1"/>

      <!-- ── Branding ── -->
      <text x="${width / 2}" y="${brandingY}" text-anchor="middle"
        font-size="12" font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${iconColor}" opacity="0.35">readme.stats.guebly.com.br</text>
    </svg>
  `;
};
