// @ts-check

import * as dotenv from "dotenv";
import { withRetry } from "../common/retry.js";
import { AppError, MissingFieldError } from "../common/error.js";
import { logger } from "../common/log.js";
import { graphqlRequest } from "../common/http.js";

dotenv.config();

const ACTIVITY_QUERY = `
  query userActivity($login: String!) {
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
 * @returns {Promise<import('axios').AxiosResponse>} Axios response with activity data.
 */
const fetcher = (variables, token) => {
  return graphqlRequest(
    { query: ACTIVITY_QUERY, variables },
    { Authorization: `bearer ${token}` },
  );
};

/**
 * @param {string} username GitHub username.
 * @returns {Promise<object>} Activity graph data with monthly aggregation.
 */
const getActivityGraph = async (username) => {
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
      "Could not fetch activity data.",
      AppError.GRAPHQL_ERROR,
    );
  }

  const user = res.data.data.user;
  const weeks = user.contributionsCollection.contributionCalendar.weeks;

  const monthlyMap = {};
  for (const week of weeks) {
    for (const day of week.contributionDays || []) {
      const key = day.date.substring(0, 7);
      if (!monthlyMap[key]) {
        monthlyMap[key] = 0;
      }
      monthlyMap[key] += day.contributionCount;
    }
  }

  const sortedKeys = Object.keys(monthlyMap).sort();
  const months = sortedKeys.map((key) => ({
    month: key,
    label: new Date(key + "-01").toLocaleDateString("en", { month: "short" }),
    count: monthlyMap[key],
  }));

  return {
    name: user.name || user.login,
    login: user.login,
    totalContributions:
      user.contributionsCollection.contributionCalendar.totalContributions,
    months,
  };
};

export { getActivityGraph };
export default getActivityGraph;
