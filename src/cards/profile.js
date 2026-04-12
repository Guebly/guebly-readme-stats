// @ts-check
import { resolveColors } from "../common/color.js";
import { formatNumber } from "../common/fmt.js";
import { escapeHTML } from "../common/html.js";

/** @type {Record<string, {projects:string,stars:string,followers:string,since:string,coding:string}>} */
const LABELS = {
  en: {
    projects: "Projects",
    stars: "Stars",
    followers: "Followers",
    since: "Since",
    coding: "Coding since",
  },
  "pt-br": {
    projects: "Projetos",
    stars: "Estrelas",
    followers: "Seguidores",
    since: "Desde",
    coding: "Criando desde",
  },
  es: {
    projects: "Proyectos",
    stars: "Estrellas",
    followers: "Seguidores",
    since: "Desde",
    coding: "Creando desde",
  },
  de: {
    projects: "Projekte",
    stars: "Sterne",
    followers: "Follower",
    since: "Seit",
    coding: "Coder seit",
  },
  fr: {
    projects: "Projets",
    stars: "Étoiles",
    followers: "Abonnés",
    since: "Depuis",
    coding: "Code depuis",
  },
  it: {
    projects: "Progetti",
    stars: "Stelle",
    followers: "Seguaci",
    since: "Dal",
    coding: "Sviluppa dal",
  },
  ja: {
    projects: "プロジェクト",
    stars: "スター",
    followers: "フォロワー",
    since: "開始",
    coding: "開始年",
  },
  "zh-cn": {
    projects: "项目",
    stars: "星标",
    followers: "关注者",
    since: "起始",
    coding: "编程自",
  },
  ko: {
    projects: "프로젝트",
    stars: "스타",
    followers: "팔로워",
    since: "시작",
    coding: "시작 연도",
  },
  ru: {
    projects: "Проекты",
    stars: "Звёзды",
    followers: "Подписчики",
    since: "С",
    coding: "Кодит с",
  },
  ar: {
    projects: "مشاريع",
    stars: "نجوم",
    followers: "متابعون",
    since: "منذ",
    coding: "يطور منذ",
  },
};

const getLabels = (locale) => LABELS[locale] || LABELS.en;

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

  // ── Stats row ────────────────────────────────────────────────────
  const stats = [
    { value: formatNumber(profile.repos), label: lbl.projects },
    { value: formatNumber(profile.stars), label: lbl.stars },
    { value: formatNumber(profile.followers), label: lbl.followers },
    { value: String(sinceYear), label: lbl.since },
  ];

  const colW = (width - 48) / 4; // ~111.75px per column

  const statsSvg = stats
    .map(
      (s, i) => `
      <g transform="translate(${24 + i * colW + colW / 2}, 0)">
        <text text-anchor="middle" y="0"
          font-size="21" font-weight="800"
          font-family="'Segoe UI', Ubuntu, Sans-Serif"
          fill="${titleColor}">${escapeHTML(s.value)}</text>
        <text text-anchor="middle" y="19"
          font-size="10" font-family="'Segoe UI', Ubuntu, Sans-Serif"
          fill="${textColor}" opacity="0.5">${escapeHTML(s.label)}</text>
      </g>`,
    )
    .join("");

  // ── Languages row ────────────────────────────────────────────────
  const hasLangs = profile.topLanguages.length > 0;
  const langSpacing = hasLangs
    ? Math.min(112, Math.floor((width - 48) / profile.topLanguages.length))
    : 112;

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
  const height = hasLangs ? 248 : 198;
  const statsY = 126; // values baseline
  const langDividerY = 182;
  const langsY = 208; // center of lang row

  // ── Clock icon path (SVG, replaces emoji) ────────────────────────
  const clockPath =
    "M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z";

  // ── Location pin path ─────────────────────────────────────────────
  const pinPath =
    "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z";

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
      fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-labelledby="profileTitle">
      <title id="profileTitle">${escapeHTML(profile.name)}'s GitHub Highlights</title>

      <rect x="0.5" y="0.5" rx="4.5" width="${width - 1}" height="${height - 1}"
        fill="${bgFill}" ${borderAttr} />

      <!-- ── Avatar circle (initial) ──────────────────────── -->
      <circle cx="52" cy="54" r="36" fill="${iconColor}" opacity="0.1" />
      <circle cx="52" cy="54" r="36" stroke="${iconColor}" stroke-width="1.5"
        fill="none" opacity="0.3" />
      <text x="52" y="62" text-anchor="middle"
        font-size="28" font-weight="700"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${iconColor}">${initial}</text>

      <!-- ── Identity ──────────────────────────────────────── -->
      <text x="104" y="34" font-size="17" font-weight="700"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${titleColor}">${escapeHTML(profile.name)}</text>

      <text x="104" y="52" font-size="12"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${textColor}" opacity="0.55">@${escapeHTML(profile.login)}</text>

      <!-- Coding since row -->
      <svg x="104" y="60" width="12" height="12" viewBox="0 0 16 16">
        <path d="${clockPath}" fill="${iconColor}" opacity="0.8" />
      </svg>
      <text x="120" y="71" font-size="11"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${iconColor}" opacity="0.85">${escapeHTML(lbl.coding)} ${sinceYear}</text>

      ${
        profile.location
          ? `
      <svg x="104" y="78" width="12" height="12" viewBox="0 0 16 16">
        <path d="${pinPath}" fill="${textColor}" opacity="0.4" />
      </svg>
      <text x="120" y="89" font-size="10"
        font-family="'Segoe UI', Ubuntu, Sans-Serif"
        fill="${textColor}" opacity="0.45">${escapeHTML(profile.location)}</text>`
          : ""
      }

      <!-- ── Stats divider ─────────────────────────────────── -->
      <line x1="24" y1="104" x2="${width - 24}" y2="104"
        stroke="${textColor}" stroke-opacity="0.1" stroke-width="1" />

      <!-- ── Stats ─────────────────────────────────────────── -->
      <g transform="translate(0, ${statsY})">
        ${statsSvg}
      </g>

      <!-- ── Column dividers ───────────────────────────────── -->
      ${[1, 2, 3]
        .map(
          (i) => `
      <line x1="${24 + i * colW}" y1="112" x2="${24 + i * colW}" y2="160"
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
