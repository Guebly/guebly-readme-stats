// @ts-check
import { resolveColors } from "../common/color.js";
import { formatNumber } from "../common/fmt.js";
import { escapeHTML } from "../common/html.js";
import { wrapText } from "../common/fmt.js";

/** @type {Record<string, object>} */
const LABELS = {
  en: {
    activity: "GitHub Activity",
    activitySub: "contributions this year",
    community: "Community",
    followers: "Followers",
    following: "Following",
    projects: "Projects",
    repos: "Created",
    stars: "Favorited",
  },
  "pt-br": {
    activity: "Atividade no GitHub",
    activitySub: "contribuições este ano",
    community: "Comunidade",
    followers: "Seguidores",
    following: "Seguindo",
    projects: "Projetos",
    repos: "Criados",
    stars: "Favoritados",
  },
  es: {
    activity: "Actividad en GitHub",
    activitySub: "contribuciones este año",
    community: "Comunidad",
    followers: "Seguidores",
    following: "Siguiendo",
    projects: "Proyectos",
    repos: "Creados",
    stars: "Favoritos",
  },
  de: {
    activity: "GitHub-Aktivität",
    activitySub: "Beiträge dieses Jahr",
    community: "Community",
    followers: "Follower",
    following: "Folge ich",
    projects: "Projekte",
    repos: "Erstellt",
    stars: "Favorisiert",
  },
  fr: {
    activity: "Activité GitHub",
    activitySub: "contributions cette année",
    community: "Communauté",
    followers: "Abonnés",
    following: "Abonnements",
    projects: "Projets",
    repos: "Créés",
    stars: "Favoris",
  },
  it: {
    activity: "Attività GitHub",
    activitySub: "contributi quest'anno",
    community: "Comunità",
    followers: "Seguaci",
    following: "Seguiti",
    projects: "Progetti",
    repos: "Creati",
    stars: "Preferiti",
  },
  ja: {
    activity: "GitHub アクティビティ",
    activitySub: "今年のコントリビューション",
    community: "コミュニティ",
    followers: "フォロワー",
    following: "フォロー中",
    projects: "プロジェクト",
    repos: "作成済み",
    stars: "お気に入り",
  },
  "zh-cn": {
    activity: "GitHub 动态",
    activitySub: "今年的贡献",
    community: "社区",
    followers: "关注者",
    following: "正在关注",
    projects: "项目",
    repos: "已创建",
    stars: "已收藏",
  },
  ko: {
    activity: "GitHub 활동",
    activitySub: "올해 기여",
    community: "커뮤니티",
    followers: "팔로워",
    following: "팔로잉",
    projects: "프로젝트",
    repos: "생성됨",
    stars: "즐겨찾기",
  },
  ru: {
    activity: "Активность на GitHub",
    activitySub: "вклады за этот год",
    community: "Сообщество",
    followers: "Подписчики",
    following: "Подписки",
    projects: "Проекты",
    repos: "Созданы",
    stars: "Избранное",
  },
};

const getLabels = (locale) => LABELS[locale] || LABELS.en;

/**
 * @param {object} social Social data.
 * @param {object} options Card options.
 * @returns {string} SVG story card (450×800, 9:16).
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

  const lbl = getLabels(locale);
  const width = 450;
  const height = 800;
  const rx = border_radius === undefined ? 18 : Number(border_radius);

  const bgFill =
    typeof bgColor === "object" ? bgColor[1] || "#0D1117" : bgColor;
  const borderAttr = hide_border
    ? 'stroke-opacity="0"'
    : `stroke="${borderColor}"`;

  // ── Avatar ────────────────────────────────────────────────────────
  const avatarCX = 225;
  const avatarCY = 110;
  const avatarR = 65;

  const avatarInitial = escapeHTML(
    ((social.name || social.login || "?")[0] || "?").toUpperCase(),
  );

  const avatarInner = social.avatarUrl
    ? `<clipPath id="avc-s-${escapeHTML(social.login)}">
         <circle cx="${avatarCX}" cy="${avatarCY}" r="${avatarR}"/>
       </clipPath>
       <image x="${avatarCX - avatarR}" y="${avatarCY - avatarR}"
         width="${avatarR * 2}" height="${avatarR * 2}"
         clip-path="url(#avc-s-${escapeHTML(social.login)})"
         href="${social.avatarUrl}"
         preserveAspectRatio="xMidYMid slice"/>`
    : `<circle cx="${avatarCX}" cy="${avatarCY}" r="${avatarR}"
         fill="${iconColor}" opacity="0.1"/>
       <text x="${avatarCX}" y="${avatarCY + 17}" text-anchor="middle"
         font-size="46" font-weight="700"
         font-family="'Segoe UI',Ubuntu,Sans-Serif"
         fill="${iconColor}">${avatarInitial}</text>`;

  // ── Identity (name + @login) ──────────────────────────────────────
  const nameY = 210;
  const loginY = 232;

  // ── Bio ───────────────────────────────────────────────────────────
  const bioLines = social.bio ? wrapText(social.bio, 42, 3) : [];
  const bioStartY = 266;
  const bioSvg = bioLines
    .map(
      (line, i) =>
        `<text x="${width / 2}" y="${bioStartY + i * 22}" text-anchor="middle"
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
    infoData.push({ path: pinPath, text: social.location.slice(0, 32) });
  }
  if (social.company) {
    infoData.push({
      path: buildingPath,
      text: social.company.replace(/^@/, "").slice(0, 32),
    });
  }
  if (social.website) {
    infoData.push({
      path: linkPath,
      text: social.website.replace(/^https?:\/\//, "").slice(0, 34),
    });
  }

  // Info starts below last bio line
  const infoBaseY =
    bioStartY + bioLines.length * 22 + (bioLines.length > 0 ? 18 : 0);

  const infoSvg = infoData
    .map((item, i) => {
      const lineY = infoBaseY + i * 24 + 18;
      const textWidth = item.text.length * 6.6;
      const totalW = 16 + 6 + textWidth;
      const startX = (width - Math.min(totalW, width - 48)) / 2;
      return `
        <g transform="translate(${startX}, ${lineY - 12}) scale(0.75)">
          <path d="${item.path}" fill="${textColor}" opacity="0.4"/>
        </g>
        <text x="${startX + 14}" y="${lineY}"
          font-size="12" font-family="'Segoe UI',Ubuntu,Sans-Serif"
          fill="${textColor}" opacity="0.55">${escapeHTML(item.text)}</text>`;
    })
    .join("");

  // ── Section divider (after profile info) ─────────────────────────
  const afterInfo =
    infoBaseY + infoData.length * 24 + (infoData.length > 0 ? 22 : 0);
  const dividerY = Math.max(afterInfo + 18, 360);

  // ── Icons ─────────────────────────────────────────────────────────
  const commitIcon =
    "M11.93 8.5a4.002 4.002 0 01-7.86 0H.75a.75.75 0 010-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 010 1.5h-3.32zM8 6a2.5 2.5 0 100 5 2.5 2.5 0 000-5z";
  const followersIcon =
    "M2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z";
  const followingIcon =
    "M6 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM2 6a4 4 0 116.663 3.003A6.001 6.001 0 0111.35 13h1.4a.75.75 0 010 1.5H1.25a.75.75 0 010-1.5h1.351A6.001 6.001 0 015.337 9.003 4.002 4.002 0 012 6zm11.5-3.5a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0V6.25h-1.5a.75.75 0 010-1.5h1.5v-1.5a.75.75 0 01.75-.75z";
  const repoIcon =
    "M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8.5V1.5z";
  const starIcon =
    "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z";

  // ── Section 1: Activity (full width, centered) ────────────────────
  // Layout: section header → icon (20px) → value (font-size 36) → sub-label
  // Icon scale 1.25 → 20px rendered from 16-unit path
  const iconScale1 = 1.25;
  const iconHalf1 = (16 * iconScale1) / 2; // 10

  const s1HeaderY = dividerY + 28; // section label
  const s1IconTop = dividerY + 42; // top of icon group
  const s1ValueY = s1IconTop + 20 + 16 + 10; // icon(20) + gap(16) + ascent(10) ≈ baseline
  const s1SubY = s1ValueY + 22; // sub label below value

  const s1Svg = `
    <!-- Section 1: Activity -->
    <text x="${width / 2}" y="${s1HeaderY}" text-anchor="middle"
      font-size="11" font-family="'Segoe UI',Ubuntu,Sans-Serif"
      fill="${textColor}" opacity="0.4"
      letter-spacing="2">${escapeHTML(lbl.activity.toUpperCase())}</text>
    <g transform="translate(${width / 2 - iconHalf1}, ${s1IconTop}) scale(${iconScale1})">
      <path d="${commitIcon}" fill="${iconColor}" opacity="0.8"/>
    </g>
    <text x="${width / 2}" y="${s1ValueY}" text-anchor="middle"
      font-size="42" font-weight="800"
      font-family="'Segoe UI',Ubuntu,Sans-Serif"
      fill="${titleColor}">${escapeHTML(String(formatNumber(social.contributions || 0)))}</text>
    <text x="${width / 2}" y="${s1SubY}" text-anchor="middle"
      font-size="12" font-family="'Segoe UI',Ubuntu,Sans-Serif"
      fill="${textColor}" opacity="0.5">${escapeHTML(lbl.activitySub)}</text>`;

  // ── Divider between S1 and S2 ─────────────────────────────────────
  const sep1Y = s1SubY + 30;

  // ── Section 2: Community (2 columns: followers / following) ──────
  const colL = 113;
  const colR = 337;
  const iconScale2 = 1.25;
  const iconHalf2 = (16 * iconScale2) / 2; // 10

  const s2HeaderY = sep1Y + 28;
  const s2IconTop = sep1Y + 42;
  const s2ValueY = s2IconTop + 20 + 14 + 10;
  const s2LabelY = s2ValueY + 18;

  const s2Svg = `
    <!-- Section 2: Community -->
    <text x="${width / 2}" y="${s2HeaderY}" text-anchor="middle"
      font-size="11" font-family="'Segoe UI',Ubuntu,Sans-Serif"
      fill="${textColor}" opacity="0.4"
      letter-spacing="2">${escapeHTML(lbl.community.toUpperCase())}</text>

    <!-- Followers (left) -->
    <g transform="translate(${colL - iconHalf2}, ${s2IconTop}) scale(${iconScale2})">
      <path d="${followersIcon}" fill="${iconColor}" opacity="0.75"/>
    </g>
    <text x="${colL}" y="${s2ValueY}" text-anchor="middle"
      font-size="28" font-weight="800"
      font-family="'Segoe UI',Ubuntu,Sans-Serif"
      fill="${titleColor}">${escapeHTML(String(formatNumber(social.followers)))}</text>
    <text x="${colL}" y="${s2LabelY}" text-anchor="middle"
      font-size="11" font-family="'Segoe UI',Ubuntu,Sans-Serif"
      fill="${textColor}" opacity="0.5">${escapeHTML(lbl.followers)}</text>

    <!-- Following (right) -->
    <g transform="translate(${colR - iconHalf2}, ${s2IconTop}) scale(${iconScale2})">
      <path d="${followingIcon}" fill="${iconColor}" opacity="0.75"/>
    </g>
    <text x="${colR}" y="${s2ValueY}" text-anchor="middle"
      font-size="28" font-weight="800"
      font-family="'Segoe UI',Ubuntu,Sans-Serif"
      fill="${titleColor}">${escapeHTML(String(formatNumber(social.following)))}</text>
    <text x="${colR}" y="${s2LabelY}" text-anchor="middle"
      font-size="11" font-family="'Segoe UI',Ubuntu,Sans-Serif"
      fill="${textColor}" opacity="0.5">${escapeHTML(lbl.following)}</text>`;

  // ── Divider between S2 and S3 ─────────────────────────────────────
  const sep2Y = s2LabelY + 30;

  // ── Section 3: Projects (2 columns: repos / stars) ────────────────
  const s3HeaderY = sep2Y + 28;
  const s3IconTop = sep2Y + 42;
  const s3ValueY = s3IconTop + 20 + 14 + 10;
  const s3LabelY = s3ValueY + 18;

  const s3Svg = `
    <!-- Section 3: Projects -->
    <text x="${width / 2}" y="${s3HeaderY}" text-anchor="middle"
      font-size="11" font-family="'Segoe UI',Ubuntu,Sans-Serif"
      fill="${textColor}" opacity="0.4"
      letter-spacing="2">${escapeHTML(lbl.projects.toUpperCase())}</text>

    <!-- Repos (left) -->
    <g transform="translate(${colL - iconHalf2}, ${s3IconTop}) scale(${iconScale2})">
      <path d="${repoIcon}" fill="${iconColor}" opacity="0.75"/>
    </g>
    <text x="${colL}" y="${s3ValueY}" text-anchor="middle"
      font-size="28" font-weight="800"
      font-family="'Segoe UI',Ubuntu,Sans-Serif"
      fill="${titleColor}">${escapeHTML(String(formatNumber(social.repos)))}</text>
    <text x="${colL}" y="${s3LabelY}" text-anchor="middle"
      font-size="11" font-family="'Segoe UI',Ubuntu,Sans-Serif"
      fill="${textColor}" opacity="0.5">${escapeHTML(lbl.repos)}</text>

    <!-- Stars (right) -->
    <g transform="translate(${colR - iconHalf2}, ${s3IconTop}) scale(${iconScale2})">
      <path d="${starIcon}" fill="${iconColor}" opacity="0.75"/>
    </g>
    <text x="${colR}" y="${s3ValueY}" text-anchor="middle"
      font-size="28" font-weight="800"
      font-family="'Segoe UI',Ubuntu,Sans-Serif"
      fill="${titleColor}">${escapeHTML(String(formatNumber(social.stars)))}</text>
    <text x="${colR}" y="${s3LabelY}" text-anchor="middle"
      font-size="11" font-family="'Segoe UI',Ubuntu,Sans-Serif"
      fill="${textColor}" opacity="0.5">${escapeHTML(lbl.stars)}</text>`;

  // ── Column divider (S2 + S3 vertical separator) ───────────────────
  const colDivTop = sep1Y + 14;
  const colDivBottom = s3LabelY + 10;

  // ── Branding ──────────────────────────────────────────────────────
  const bottomDividerY = s3LabelY + 38;
  const brandingY = bottomDividerY + 30;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
      fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-labelledby="socialTitle">
      <title id="socialTitle">${escapeHTML(social.name)}'s GitHub Social Card</title>

      <rect x="0.5" y="0.5" rx="${rx}" width="${width - 1}" height="${height - 1}"
        fill="${bgFill}" ${borderAttr}/>

      <!-- Avatar ring + image/initial -->
      <circle cx="${avatarCX}" cy="${avatarCY}" r="${avatarR + 3}"
        stroke="${iconColor}" stroke-width="1.5" fill="none" opacity="0.3"/>
      ${avatarInner}

      <!-- Name -->
      <text x="${width / 2}" y="${nameY}" text-anchor="middle"
        font-size="22" font-weight="700"
        font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${titleColor}">${escapeHTML(social.name)}</text>

      <!-- @username -->
      <text x="${width / 2}" y="${loginY}" text-anchor="middle"
        font-size="13" font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${textColor}" opacity="0.5">@${escapeHTML(social.login)}</text>

      <!-- Bio -->
      ${bioSvg}

      <!-- Location / Company / Website -->
      ${infoSvg}

      <!-- Profile → Sections divider -->
      <line x1="24" y1="${dividerY}" x2="${width - 24}" y2="${dividerY}"
        stroke="${textColor}" stroke-opacity="0.1" stroke-width="1"/>

      ${s1Svg}

      <!-- S1 → S2 divider -->
      <line x1="24" y1="${sep1Y}" x2="${width - 24}" y2="${sep1Y}"
        stroke="${textColor}" stroke-opacity="0.1" stroke-width="1"/>

      ${s2Svg}

      <!-- S2 → S3 divider -->
      <line x1="24" y1="${sep2Y}" x2="${width - 24}" y2="${sep2Y}"
        stroke="${textColor}" stroke-opacity="0.1" stroke-width="1"/>

      ${s3Svg}

      <!-- Column divider (left vs right in S2 + S3) -->
      <line x1="${width / 2}" y1="${colDivTop}" x2="${width / 2}" y2="${colDivBottom}"
        stroke="${textColor}" stroke-opacity="0.07" stroke-width="1"/>

      <!-- Bottom divider -->
      <line x1="24" y1="${bottomDividerY}" x2="${width - 24}" y2="${bottomDividerY}"
        stroke="${textColor}" stroke-opacity="0.1" stroke-width="1"/>

      <!-- Branding -->
      <text x="${width / 2}" y="${brandingY}" text-anchor="middle"
        font-size="12" font-family="'Segoe UI',Ubuntu,Sans-Serif"
        fill="${iconColor}" opacity="0.35">readme.stats.guebly.com.br</text>
    </svg>
  `;
};
