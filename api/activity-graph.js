// @ts-check

import { renderActivityGraphCard } from "../src/cards/activity-graph.js";
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
import { getActivityGraph } from "../src/fetchers/activity-graph.js";

// @ts-ignore
export default async (req, res) => {
  const {
    username,
    title_color,
    text_color,
    icon_color,
    bg_color,
    border_color,
    theme,
    hide_border,
    border_radius,
    cache_seconds,
    custom_title,
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
    const data = await getActivityGraph(username);
    const cacheSeconds = cacheTTL({
      requested: parseInt(cache_seconds, 10),
      def: CACHE_TTL.STATS_CARD.DEFAULT,
      min: CACHE_TTL.STATS_CARD.MIN,
      max: CACHE_TTL.STATS_CARD.MAX,
    });
    applyCache(res, cacheSeconds);

    return res.send(
      renderActivityGraphCard(data, {
        theme,
        title_color,
        text_color,
        icon_color,
        bg_color,
        border_color,
        hide_border: toBool(hide_border),
        border_radius,
        custom_title,
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
