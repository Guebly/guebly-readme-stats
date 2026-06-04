// @ts-check

import { renderCompareCard } from "../src/cards/compare.js";
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
import { toBool } from "../src/common/ops.js";
import { buildErrorCard } from "../src/common/render.js";
import { getUserStats } from "../src/fetchers/stats.js";

// @ts-ignore
export default async (req, res) => {
  const {
    user1,
    user2,
    title_color,
    text_color,
    icon_color,
    bg_color,
    border_color,
    theme,
    hide_border,
    border_radius,
    cache_seconds,
  } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");

  const colors = { title_color, text_color, bg_color, border_color, theme };

  if (!user1 || !user2) {
    return res.send(
      buildErrorCard({
        message: "Missing required parameters: user1 and user2",
        secondaryMessage: "Usage: /api/compare?user1=alice&user2=bob",
        renderOptions: { ...colors, show_repo_link: false },
      }),
    );
  }

  const access1 = checkAccess({ res, id: user1, type: "username", colors });
  if (!access1.isPassed) {
    return access1.result;
  }

  const access2 = checkAccess({ res, id: user2, type: "username", colors });
  if (!access2.isPassed) {
    return access2.result;
  }

  try {
    const [stats1, stats2] = await Promise.all([
      getUserStats(user1, false, [], false, false, false),
      getUserStats(user2, false, [], false, false, false),
    ]);

    const cacheSeconds = cacheTTL({
      requested: parseInt(cache_seconds, 10),
      def: CACHE_TTL.STATS_CARD.DEFAULT,
      min: CACHE_TTL.STATS_CARD.MIN,
      max: CACHE_TTL.STATS_CARD.MAX,
    });
    applyCache(res, cacheSeconds);

    return res.send(
      renderCompareCard(stats1, stats2, {
        theme,
        title_color,
        text_color,
        icon_color,
        bg_color,
        border_color,
        hide_border: toBool(hide_border),
        border_radius,
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
            ...colors,
            show_repo_link: !(err instanceof MissingFieldError),
          },
        }),
      );
    }
    return res.send(
      buildErrorCard({
        message: "An unknown error occurred",
        renderOptions: colors,
      }),
    );
  }
};
