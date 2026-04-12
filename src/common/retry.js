// @ts-check

import { AppError } from "./error.js";
import { logger } from "./log.js";

// Script variables.

// Count available tokens — accepts PAT_N (preferred) and GH_TOKEN_N (legacy).
const TOKEN_KEYS = Object.keys(process.env).filter(
  (key) => /PAT_\d+$/.exec(key) || /GH_TOKEN_\d+$/.exec(key),
);
const PAT_COUNT = TOKEN_KEYS.length;
const RETRIES = process.env.NODE_ENV === "test" ? 7 : PAT_COUNT;

/**
 * Returns token N (1-based), checking PAT_N first, then GH_TOKEN_N.
 *
 * @param {number} n Token index (1-based).
 * @returns {string|undefined} The token value, or undefined if not set.
 */
const getToken = (n) => process.env[`PAT_${n}`] || process.env[`GH_TOKEN_${n}`];

/**
 * @typedef {import("axios").AxiosResponse} AxiosResponse Axios response.
 * @typedef {(variables: any, token: string, retriesForTests?: number) => Promise<AxiosResponse>} FetcherFunction Fetcher function.
 */

/**
 * Try to execute the fetcher function until it succeeds or the max number of retries is reached.
 *
 * @param {FetcherFunction} fetcher The fetcher function.
 * @param {any} variables Object with arguments to pass to the fetcher function.
 * @param {number} retries How many times to retry.
 * @returns {Promise<any>} The response from the fetcher function.
 */
const withRetry = async (fetcher, variables, retries = 0) => {
  if (!RETRIES) {
    throw new AppError("No GitHub API tokens found", AppError.NO_TOKENS);
  }

  if (retries > RETRIES) {
    throw new AppError(
      "Downtime due to GitHub API rate limiting",
      AppError.MAX_RETRY,
    );
  }

  try {
    // try to fetch with the first token since RETRIES is 0 index i'm adding +1
    let response = await fetcher(
      variables,
      // @ts-ignore
      getToken(retries + 1),
      // used in tests for faking rate limit
      retries,
    );

    // react on both type and message-based rate-limit signals.
    const errors = response?.data?.errors;
    const errorType = errors?.[0]?.type;
    const errorMsg = errors?.[0]?.message || "";
    const isRateLimited =
      (errors && errorType === "RATE_LIMITED") || /rate limit/i.test(errorMsg);

    // if rate limit is hit increase the RETRIES and recursively call the withRetry
    // with username, and current RETRIES
    if (isRateLimited) {
      logger.log(`Token #${retries + 1} Failed`);
      retries++;
      // directly return from the function
      return withRetry(fetcher, variables, retries);
    }

    // finally return the response
    return response;
  } catch (err) {
    /** @type {any} */
    const e = err;

    // network/unexpected error → let caller treat as failure
    if (!e?.response) {
      throw e;
    }

    // prettier-ignore
    // also checking for bad credentials if any tokens gets invalidated
    const isBadCredential =
      e?.response?.data?.message === "Bad credentials";
    const isAccountSuspended =
      e?.response?.data?.message === "Sorry. Your account was suspended.";

    if (isBadCredential || isAccountSuspended) {
      logger.log(`Token #${retries + 1} Failed`);
      retries++;
      // directly return from the function
      return withRetry(fetcher, variables, retries);
    }

    // HTTP error with a response → return it for caller-side handling
    return e.response;
  }
};

export { withRetry, RETRIES };
export default withRetry;
