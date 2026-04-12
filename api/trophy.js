// @ts-check
import { renderTrophyCard } from "../src/cards/trophy.js";
import { checkAccess } from "../src/common/access.js";
import {
  CACHE_TTL,
  cacheTTL,
  applyCache,
  applyErrorCache,
} from "../src/common/cache.js";
import { retrieveSecondaryMessage } from "../src/common/error.js";
import { toBool } from "../src/common/ops.js";
import { buildErrorCard } from "../src/common/render.js";
import { getUserStats } from "../src/fetchers/stats.js";

export default async (req, res) => {
  const {
    username,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    hide_border,
    border_color,
  } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");

  const access = checkAccess({
    res,
    id: username,
    type: "username",
    colors: { title_color, text_color, bg_color, border_color, theme },
  });
  if (!access.isPassed) {
    return access.result;
  }

  try {
    const stats = await getUserStats(username, false, [], false, false, false);
    const cacheSeconds = cacheTTL({
      requested: parseInt(cache_seconds, 10),
      def: CACHE_TTL.STATS_CARD.DEFAULT,
      min: CACHE_TTL.STATS_CARD.MIN,
      max: CACHE_TTL.STATS_CARD.MAX,
    });
    applyCache(res, cacheSeconds);

    return res.send(
      renderTrophyCard(stats, {
        title_color,
        icon_color,
        text_color,
        bg_color,
        theme,
        hide_border: toBool(hide_border),
        border_color,
      }),
    );
  } catch (err) {
    applyErrorCache(res);
    return res.send(
      buildErrorCard({
        message: err instanceof Error ? err.message : "Unknown error",
        secondaryMessage:
          err instanceof Error ? retrieveSecondaryMessage(err) : undefined,
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
