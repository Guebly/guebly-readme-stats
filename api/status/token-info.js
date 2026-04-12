// @ts-check

/**
 * @file Contains a simple cloud function that can be used to check which GitHub tokens are no
 * longer working. It returns a list of valid tokens, expired tokens and tokens with errors.
 *
 * @description This function is currently rate limited to 1 request per 5 minutes.
 */

import { graphqlRequest } from "../../src/common/http.js";
import { logger } from "../../src/common/log.js";
import { daysBetween } from "../../src/common/ops.js";

export const RATE_LIMIT_SECONDS = 60 * 5; // 1 request per 5 minutes

/**
 * Simple uptime check fetcher for the GitHub tokens.
 *
 * @param {any} variables Fetcher variables.
 * @param {string} token GitHub token.
 * @returns {Promise<import('axios').AxiosResponse>} The response.
 */
const uptimeFetcher = (variables, token) => {
  return graphqlRequest(
    {
      query: `
        query {
          rateLimit {
            remaining
            resetAt
          },
        }`,
      variables,
    },
    {
      Authorization: `bearer ${token}`,
    },
  );
};

const getAllTokens = () => {
  return Object.keys(process.env).filter(
    (key) => /PAT_\d+$/.exec(key) || /GH_TOKEN_\d+$/.exec(key),
  );
};

/**
 * @typedef {(variables: any, token: string) => Promise<import('axios').AxiosResponse>} Fetcher The fetcher function.
 * @typedef {{validTokens: string[], expiredTokens: string[], exhaustedTokens: string[], suspendedTokens: string[], errorTokens: string[], details: any}} TokenInfo The token info.
 */

/**
 * Check whether any of the GitHub tokens is expired.
 *
 * @param {Fetcher} fetcher The fetcher function.
 * @param {any} variables Fetcher variables.
 * @returns {Promise<TokenInfo>} The response.
 */
const getTokenInfo = async (fetcher, variables) => {
  /** @type {Record<string, any>} */
  const details = {};
  const tokens = getAllTokens();

  for (const tok of tokens) {
    try {
      const response = await fetcher(variables, process.env[tok]);
      const errors = response.data.errors;
      const hasErrors = Boolean(errors);
      const errorType = errors?.[0]?.type;
      const isRateLimited =
        (hasErrors && errorType === "RATE_LIMITED") ||
        response.data.data?.rateLimit?.remaining === 0;

      // Store tokens with errors.
      if (hasErrors && errorType !== "RATE_LIMITED") {
        details[tok] = {
          status: "error",
          error: {
            type: errors[0].type,
            message: errors[0].message,
          },
        };
        continue;
      } else if (isRateLimited) {
        const date1 = new Date();
        const date2 = new Date(response.data?.data?.rateLimit?.resetAt);
        details[tok] = {
          status: "exhausted",
          remaining: 0,
          resetIn: daysBetween(date2, date1) + " minutes",
        };
      } else {
        details[tok] = {
          status: "valid",
          remaining: response.data.data.rateLimit.remaining,
        };
      }
    } catch (err) {
      // Store the token if it is expired.
      const errorMessage = err.response?.data?.message?.toLowerCase();
      if (errorMessage === "bad credentials") {
        details[tok] = {
          status: "expired",
        };
      } else if (errorMessage === "sorry. your account was suspended.") {
        details[tok] = {
          status: "suspended",
        };
      } else {
        throw err;
      }
    }
  }

  const filterTokensByStatus = (status) => {
    return Object.keys(details).filter((tok) => details[tok].status === status);
  };

  const sortedDetails = Object.keys(details)
    .sort()
    .reduce((obj, key) => {
      obj[key] = details[key];
      return obj;
    }, {});

  return {
    validTokens: filterTokensByStatus("valid"),
    expiredTokens: filterTokensByStatus("expired"),
    exhaustedTokens: filterTokensByStatus("exhausted"),
    suspendedTokens: filterTokensByStatus("suspended"),
    errorTokens: filterTokensByStatus("error"),
    details: sortedDetails,
  };
};

/**
 * Cloud function that returns information about the used GitHub tokens.
 *
 * @param {any} _ The request.
 * @param {any} res The response.
 * @returns {Promise<void>} The response.
 */
export default async (_, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    // Add header to prevent abuse.
    const tokenInfo = await getTokenInfo(uptimeFetcher, {});
    if (tokenInfo) {
      res.setHeader(
        "Cache-Control",
        `max-age=0, s-maxage=${RATE_LIMIT_SECONDS}`,
      );
    }
    res.send(JSON.stringify(tokenInfo, null, 2));
  } catch (err) {
    // Throw error if something went wrong.
    logger.error(err);
    res.setHeader("Cache-Control", "no-store");
    res.send("Something went wrong: " + err.message);
  }
};
