// @ts-check

import {
  textWidth,
  svgFlex,
  labeledIcon,
  languageBar,
} from "../common/render.js";
import StatCard from "../common/Card.js";
import { resolveColors } from "../common/color.js";
import { formatNumber, wrapText } from "../common/fmt.js";
import { escapeHTML } from "../common/html.js";
import { icons } from "../common/icons.js";
import { resolveEmojis } from "../common/ops.js";

/** Import language colors.
 *
 * @description Here we use the workaround found in
 * https://stackoverflow.com/questions/66726365/how-should-i-import-json-in-node
 * since vercel is using v16.14.0 which does not yet support json imports without the
 * --experimental-json-modules flag.
 */
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const languageColors = require("../common/languageColors.json"); // now works

const ICON_SIZE = 16;
const CARD_DEFAULT_WIDTH = 400;
const HEADER_MAX_LENGTH = 35;

/**
 * @typedef {import('./types').GistCardOptions} GistCardOptions Gist card options.
 * @typedef {import('../fetchers/types').GistData} GistData Gist data.
 */

/**
 * Render gist card.
 *
 * @param {GistData} gistData Gist data.
 * @param {Partial<GistCardOptions>} options Gist card options.
 * @returns {string} Gist card.
 */
const buildGistCard = (gistData, options = {}) => {
  const { name, nameWithOwner, description, language, starsCount, forksCount } =
    gistData;
  const {
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
    border_radius,
    border_color,
    show_owner = false,
    hide_border = false,
  } = options;

  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, iconColor, bgColor, borderColor } =
    resolveColors({
      title_color,
      icon_color,
      text_color,
      bg_color,
      border_color,
      theme,
    });

  const lineWidth = 59;
  const linesLimit = 10;
  const desc = resolveEmojis(description || "No description provided");
  const multiLineDescription = wrapText(desc, lineWidth, linesLimit);
  const descriptionLines = multiLineDescription.length;
  const descriptionSvg = multiLineDescription
    .map((line) => `<tspan dy="1.2em" x="25">${escapeHTML(line)}</tspan>`)
    .join("");

  const lineHeight = descriptionLines > 3 ? 12 : 10;
  const height =
    (descriptionLines > 1 ? 120 : 110) + descriptionLines * lineHeight;

  const totalStars = formatNumber(starsCount);
  const totalForks = formatNumber(forksCount);
  const svgStars = labeledIcon(icons.star, totalStars, "starsCount", ICON_SIZE);
  const svgForks = labeledIcon(icons.fork, totalForks, "forksCount", ICON_SIZE);

  const languageName = language || "Unspecified";
  // @ts-ignore
  const languageColor = languageColors[languageName] || "#858585";

  const svgLanguage = languageBar(languageName, languageColor);

  const starAndForkCount = svgFlex({
    items: [svgLanguage, svgStars, svgForks],
    sizes: [
      textWidth(languageName, 12),
      ICON_SIZE + textWidth(`${totalStars}`, 12),
      ICON_SIZE + textWidth(`${totalForks}`, 12),
    ],
    gap: 25,
  }).join("");

  const header = show_owner ? nameWithOwner : name;

  const card = new StatCard({
    defaultTitle:
      header.length > HEADER_MAX_LENGTH
        ? `${header.slice(0, HEADER_MAX_LENGTH)}...`
        : header,
    titlePrefixIcon: icons.gist,
    width: CARD_DEFAULT_WIDTH,
    height,
    border_radius,
    colors: {
      titleColor,
      textColor,
      iconColor,
      bgColor,
      borderColor,
    },
  });

  card.setCSS(`
    .description { font: 400 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
    .gray { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
    .icon { fill: ${iconColor} }
  `);
  card.setHideBorder(hide_border);

  return card.render(`
    <text class="description" x="25" y="-5">
        ${descriptionSvg}
    </text>

    <g transform="translate(30, ${height - 75})">
        ${starAndForkCount}
    </g>
  `);
};

export { buildGistCard, HEADER_MAX_LENGTH };
export default buildGistCard;
