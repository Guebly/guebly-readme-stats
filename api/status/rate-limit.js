// @ts-check

import axios from "axios";
import { logger } from "../../src/common/log.js";

const TOKEN_KEYS = Object.keys(process.env).filter(
  (key) => /PAT_\d+$/.exec(key) || /GH_TOKEN_\d+$/.exec(key),
);

const getToken = (key) => process.env[key];

const fetchRateLimit = async (token) => {
  const res = await axios({
    url: "https://api.github.com/rate_limit",
    method: "get",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  return res.data;
};

export default async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age=0, s-maxage=60");

  try {
    const tokens = [];

    for (const key of TOKEN_KEYS) {
      const token = getToken(key);
      if (!token) {
        continue;
      }
      try {
        const data = await fetchRateLimit(token);
        const core = data.resources.core;
        const graphql = data.resources.graphql;
        tokens.push({
          id: key,
          core: {
            remaining: core.remaining,
            limit: core.limit,
            used: core.used,
            reset: new Date(core.reset * 1000).toISOString(),
          },
          graphql: {
            remaining: graphql.remaining,
            limit: graphql.limit,
            used: graphql.used,
            reset: new Date(graphql.reset * 1000).toISOString(),
          },
        });
      } catch (err) {
        tokens.push({
          id: key,
          error: err.response?.status === 401 ? "Invalid token" : err.message,
        });
      }
    }

    const totalGraphQL = tokens.reduce(
      (sum, t) => sum + (t.graphql?.remaining || 0),
      0,
    );
    const totalCore = tokens.reduce(
      (sum, t) => sum + (t.core?.remaining || 0),
      0,
    );
    const healthyCount = tokens.filter((t) => !t.error).length;

    res.send({
      status: healthyCount > 0 ? "operational" : "degraded",
      tokens_configured: TOKEN_KEYS.length,
      tokens_healthy: healthyCount,
      total_remaining: {
        core: totalCore,
        graphql: totalGraphQL,
      },
      tokens,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};
