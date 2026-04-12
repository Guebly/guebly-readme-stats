// @ts-check
import { resolveColors } from "../common/color.js";
import { formatNumber } from "../common/fmt.js";
import { escapeHTML } from "../common/html.js";

/** @type {Record<string, {repos:string,stars:string,followers:string,since:string,contributions:string}>} */
const LABELS = {
  en: {
    repos: "Repos",
    stars: "Stars",
    followers: "Followers",
    since: "Since",
    contributions: "Contributions",
  },
  "pt-br": {
    repos: "Projetos",
    stars: "Estrelas",
    followers: "Seguidores",
    since: "Desde",
    contributions: "Contribuições",
  },
  es: {
    repos: "Proyectos",
    stars: "Estrellas",
    followers: "Seguidores",
    since: "Desde",
    contributions: "Contribuciones",
  },
  de: {
    repos: "Projekte",
    stars: "Sterne",
    followers: "Follower",
    since: "Seit",
    contributions: "Beiträge",
  },
  fr: {
    repos: "Projets",
    stars: "Étoiles",
    followers: "Abonnés",
    since: "Depuis",
    contributions: "Contributions",
  },
  it: {
    repos: "Progetti",
    stars: "Stelle",
    followers: "Seguaci",
    since: "Dal",
    contributions: "Contributi",
  },
  ja: {
    repos: "リポジトリ",
    stars: "スター",
    followers: "フォロワー",
    since: "開始",
    contributions: "コントリビュート",
  },
  "zh-cn": {
    repos: "仓库",
    stars: "星标",
    followers: "关注者",
    since: "起始",
    contributions: "贡献",
  },
  ko: {
    repos: "저장소",
    stars: "스타",
    followers: "팔로워",
    since: "시작",
    contributions: "기여",
  },
  ru: {
    repos: "Проекты",
    stars: "Звёзды",
    followers: "Подписчики",
    since: "С",
    contributions: "Вклады",
  },
  ar: {
    repos: "مشاريع",
    stars: "نجوم",
    followers: "متابعون",
    since: "منذ",
    contributions: "إسهامات",
  },
};

const getLabels = (locale) => LABELS[locale] || LABELS.en;

// Truncate string to maxLen chars, appending "…" if cut.
const trunc = (str, maxLen) =>
  str.length > maxLen ? str.slice(0, maxLen - 1) + "…" : str;

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
    locale = "en",
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

  const lbl = getLabels(locale);
  const width = 495;
  const sinceYear = new Date(profile.createdAt).getFullYear();
  const initial = escapeHTML(
    ((profile.name || profile.login || "?")[0] || "?").toUpperCase(),
  );

  // ── Header rows (bio + info) ──────────────────────────────────────
  const hasBio = Boolean(profile.bio);
  const hasLocation = Boolean(profile.location);
  const hasCompany = Boolean(profile.company);

  const bioSvg = hasBio
    ? `<text x="100" y="62" font-size="11"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${textColor}" opacity="0.6"
        font-style="italic">${escapeHTML(trunc(profile.bio, 62))}</text>`
    : "";

  // Info row: location + company on the same line, separated by a gap
  const pinPath =
    "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z";
  const buildingPath =
    "M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022z";

  const infoY = hasBio ? 78 : 64;
  let infoSvg = "";
  let infoX = 100;

  if (hasLocation) {
    infoSvg += `
      <svg x="${infoX}" y="${infoY - 10}" width="11" height="11" viewBox="0 0 16 16">
        <path d="${pinPath}" fill="${textColor}" opacity="0.4"/>
      </svg>
      <text x="${infoX + 15}" y="${infoY}" font-size="11"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${textColor}" opacity="0.5">${escapeHTML(trunc(profile.location, 22))}</text>`;
    infoX += 15 + Math.min(profile.location.length, 22) * 6.4 + 16;
  }

  if (hasCompany) {
    infoSvg += `
      <svg x="${infoX}" y="${infoY - 10}" width="11" height="11" viewBox="0 0 16 16">
        <path d="${buildingPath}" fill="${textColor}" opacity="0.4"/>
      </svg>
      <text x="${infoX + 15}" y="${infoY}" font-size="11"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${textColor}" opacity="0.5">${escapeHTML(trunc(profile.company, 20))}</text>`;
  }

  // ── Stats (5 columns) ─────────────────────────────────────────────
  const repoIcon =
    "M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8.5V1.5z";
  const starIcon =
    "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z";
  const commitIcon =
    "M11.93 8.5a4.002 4.002 0 01-7.86 0H.75a.75.75 0 010-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 010 1.5h-3.32zM8 6a2.5 2.5 0 100 5 2.5 2.5 0 000-5z";
  const followersIcon =
    "M2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z";
  const calendarIcon =
    "M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0zm0 3.5h-2a.25.25 0 00-.25.25V6h11V3.75a.25.25 0 00-.25-.25h-2v.75a.75.75 0 01-1.5 0v-.75h-5v.75a.75.75 0 01-1.5 0v-.75zm-2.25 4v6.75c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V7.5H2.5z";

  const stats = [
    {
      icon: repoIcon,
      value: String(formatNumber(profile.repos)),
      label: lbl.repos,
    },
    {
      icon: starIcon,
      value: String(formatNumber(profile.stars)),
      label: lbl.stars,
    },
    {
      icon: commitIcon,
      value: String(formatNumber(profile.contributions)),
      label: lbl.contributions,
    },
    {
      icon: followersIcon,
      value: String(formatNumber(profile.followers)),
      label: lbl.followers,
    },
    { icon: calendarIcon, value: String(sinceYear), label: lbl.since },
  ];

  const colW = (width - 48) / 5; // ~89.4px per column

  const statsSvg = stats
    .map(
      (s, i) => `
      <g transform="translate(${24 + i * colW + colW / 2}, 0)">
        <g transform="translate(-5, 1) scale(0.625)">
          <path d="${s.icon}" fill="${iconColor}" opacity="0.65"/>
        </g>
        <text text-anchor="middle" y="23"
          font-size="17" font-weight="800"
          font-family="'Segoe UI', Ubuntu, Sans-Serif"
          fill="${titleColor}">${escapeHTML(s.value)}</text>
        <text text-anchor="middle" y="36"
          font-size="9.5" font-family="'Segoe UI', Ubuntu, Sans-Serif"
          fill="${textColor}" opacity="0.5">${escapeHTML(s.label)}</text>
      </g>`,
    )
    .join("");

  // ── Languages ────────────────────────────────────────────────────
  const hasLangs = profile.topLanguages.length > 0;
  const langSpacing = hasLangs
    ? Math.min(96, Math.floor((width - 48) / profile.topLanguages.length))
    : 96;

  const langsSvg = profile.topLanguages
    .map(
      (lang, i) => `
      <g transform="translate(${24 + i * langSpacing}, 0)">
        <circle cx="6" cy="7" r="5" fill="${lang.color}" />
        <text x="16" y="12" font-size="11"
          font-family="'Segoe UI', Ubuntu, Sans-Serif"
          fill="${textColor}" opacity="0.75">${escapeHTML(lang.name)}</text>
      </g>`,
    )
    .join("");

  // ── Dimensions ───────────────────────────────────────────────────
  const dividerY = 100;
  const statsY = 116; // stats group translateY (icons need a few extra px)
  const langDividerY = 180;
  const langsY = 204;
  const height = hasLangs ? 242 : 190;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
      fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-labelledby="profileTitle">
      <title id="profileTitle">${escapeHTML(profile.name)}'s GitHub Profile</title>

      <rect x="0.5" y="0.5" rx="4.5" width="${width - 1}" height="${height - 1}"
        fill="${bgFill}" ${borderAttr} />

      <!-- ── Avatar ────────────────────────────────────────── -->
      <circle cx="52" cy="50" r="32" stroke="${iconColor}" stroke-width="1.5"
        fill="none" opacity="0.3" />
      ${
        profile.avatarUrl
          ? `<clipPath id="avc-ph-${escapeHTML(profile.login)}">
               <circle cx="52" cy="50" r="30"/>
             </clipPath>
             <image x="22" y="20" width="60" height="60"
               clip-path="url(#avc-ph-${escapeHTML(profile.login)})"
               href="${profile.avatarUrl}"
               preserveAspectRatio="xMidYMid slice"/>`
          : `<circle cx="52" cy="50" r="32" fill="${iconColor}" opacity="0.1"/>
             <text x="52" y="58" text-anchor="middle"
               font-size="24" font-weight="700"
               font-family="'Segoe UI', Ubuntu, Sans-Serif"
               fill="${iconColor}">${initial}</text>`
      }

      <!-- ── Identity ──────────────────────────────────────── -->
      <text x="100" y="28" font-size="17" font-weight="700"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${titleColor}">${escapeHTML(profile.name)}</text>

      <text x="100" y="44" font-size="12"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${textColor}" opacity="0.5">@${escapeHTML(profile.login)}</text>

      <!-- Bio (if set) -->
      ${bioSvg}

      <!-- Location + Company row -->
      ${infoSvg}

      <!-- ── Stats divider ─────────────────────────────────── -->
      <line x1="24" y1="${dividerY}" x2="${width - 24}" y2="${dividerY}"
        stroke="${textColor}" stroke-opacity="0.1" stroke-width="1" />

      <!-- ── Stats ─────────────────────────────────────────── -->
      <g transform="translate(0, ${statsY})">
        ${statsSvg}
      </g>

      <!-- ── Column dividers ───────────────────────────────── -->
      ${[1, 2, 3, 4]
        .map(
          (i) => `
      <line x1="${24 + i * colW}" y1="${dividerY}" x2="${24 + i * colW}" y2="${dividerY + 72}"
        stroke="${textColor}" stroke-opacity="0.07" stroke-width="1" />`,
        )
        .join("")}

      ${
        hasLangs
          ? `
      <!-- ── Languages divider ─────────────────────────────── -->
      <line x1="24" y1="${langDividerY}" x2="${width - 24}" y2="${langDividerY}"
        stroke="${textColor}" stroke-opacity="0.1" stroke-width="1" />

      <!-- ── Languages ─────────────────────────────────────── -->
      <g transform="translate(0, ${langsY - 7})">
        ${langsSvg}
      </g>`
          : ""
      }
    </svg>
  `;
};
