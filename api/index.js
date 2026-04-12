// @ts-check

import { buildStatsCard } from "../src/cards/stats.js";
import { checkAccess } from "../src/common/access.js";
import {
  CACHE_TTL,
  cacheTTL,
  applyCache,
  applyErrorCache,
} from "../src/common/cache.js";
import {
  MissingFieldError,
  retrieveSecondaryMessage,
} from "../src/common/error.js";
import { toArray, toBool } from "../src/common/ops.js";
import { buildErrorCard } from "../src/common/render.js";
import { getUserStats } from "../src/fetchers/stats.js";
import { isLocaleAvailable } from "../src/translations.js";

// @ts-ignore
export default async (req, res) => {
  const {
    username,
    hide,
    hide_title,
    hide_border,
    card_width,
    hide_rank,
    show_icons,
    include_all_commits,
    commits_year,
    line_height,
    title_color,
    ring_color,
    icon_color,
    text_color,
    text_bold,
    bg_color,
    theme,
    cache_seconds,
    exclude_repo,
    custom_title,
    locale,
    disable_animations,
    border_radius,
    number_format,
    number_precision,
    border_color,
    rank_icon,
    show,
  } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");

  const access = checkAccess({
    res,
    id: username,
    type: "username",
    colors: {
      title_color,
      text_color,
      bg_color,
      border_color,
      theme,
    },
  });
  if (!access.isPassed) {
    return access.result;
  }

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(
      buildErrorCard({
        message: "Something went wrong",
        secondaryMessage: "Language not found",
        renderOptions: {
          title_color,
          text_color,
          bg_color,
          border_color,
          theme,
        },
      }),
    );
  }

  try {
    const showStats = toArray(show);
    const stats = await getUserStats(
      username,
      toBool(include_all_commits),
      toArray(exclude_repo),
      showStats.includes("prs_merged") ||
        showStats.includes("prs_merged_percentage"),
      showStats.includes("discussions_started"),
      showStats.includes("discussions_answered"),
      parseInt(commits_year, 10),
    );
    const cacheSeconds = cacheTTL({
      requested: parseInt(cache_seconds, 10),
      def: CACHE_TTL.STATS_CARD.DEFAULT,
      min: CACHE_TTL.STATS_CARD.MIN,
      max: CACHE_TTL.STATS_CARD.MAX,
    });

    applyCache(res, cacheSeconds);

    return res.send(
      buildStatsCard(stats, {
        hide: toArray(hide),
        show_icons: toBool(show_icons),
        hide_title: toBool(hide_title),
        hide_border: toBool(hide_border),
        card_width: parseInt(card_width, 10),
        hide_rank: toBool(hide_rank),
        include_all_commits: toBool(include_all_commits),
        commits_year: parseInt(commits_year, 10),
        line_height,
        title_color,
        ring_color,
        icon_color,
        text_color,
        text_bold: toBool(text_bold),
        bg_color,
        theme,
        custom_title,
        border_radius,
        border_color,
        number_format,
        number_precision: parseInt(number_precision, 10),
        locale: locale ? locale.toLowerCase() : null,
        disable_animations: toBool(disable_animations),
        rank_icon,
        show: showStats,
      }),
    );
  } catch (err) {
    applyErrorCache(res);
    if (err instanceof Error) {
      return res.send(
        buildErrorCard({
          message: err.message,
          secondaryMessage: retrieveSecondaryMessage(err),
          renderOptions: {
            title_color,
            text_color,
            bg_color,
            border_color,
            theme,
            show_repo_link: !(err instanceof MissingFieldError),
          },
        }),
      );
    }
    return res.send(
      buildErrorCard({
        message: "An unknown error occurred",
        renderOptions: {
          title_color,
          text_color,
          bg_color,
          border_color,
          theme,
        },
      }),
    );
  }
};
