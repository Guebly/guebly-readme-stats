// @ts-check

import * as dotenv from "dotenv";
import { withRetry } from "../common/retry.js";
import { AppError, MissingFieldError } from "../common/error.js";
import { logger } from "../common/log.js";
import { graphqlRequest } from "../common/http.js";

dotenv.config();

const CONTRIBUTIONS_QUERY = `
  query userContributions($login: String!) {
    user(login: $login) {
      name
      login
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
              weekday
            }
          }
        }
      }
    }
  }
`;

/**
 * @param {object} variables Fetcher variables.
 * @param {string} token GitHub token.
 * @returns {Promise<import('axios').AxiosResponse>}
 */
const fetcher = (variables, token) => {
  return graphqlRequest(
    { query: CONTRIBUTIONS_QUERY, variables },
    { Authorization: `bearer ${token}` },
  );
};

/**
 * @param {string} username GitHub username.
 * @returns {Promise<object>} Contributions data.
 */
const getContributions = async (username) => {
  if (!username) {
    throw new MissingFieldError(["username"]);
  }

  const res = await withRetry(fetcher, { login: username });

  if (res.data.errors) {
    logger.error(res.data.errors);
    if (res.data.errors[0].type === "NOT_FOUND") {
      throw new AppError(
        res.data.errors[0].message || "Could not fetch user.",
        AppError.USER_NOT_FOUND,
      );
    }
    throw new AppError(
      "Could not fetch contribution data.",
      AppError.GRAPHQL_ERROR,
    );
  }

  const user = res.data.data.user;
  const calendar = user.contributionsCollection.contributionCalendar;

  return {
    name: user.name || user.login,
    login: user.login,
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks,
  };
};

export { getContributions };
export default getContributions;
