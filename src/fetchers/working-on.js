// @ts-check

import * as dotenv from "dotenv";
import { withRetry } from "../common/retry.js";
import { AppError, MissingFieldError } from "../common/error.js";
import { logger } from "../common/log.js";
import { graphqlRequest } from "../common/http.js";

dotenv.config();

const WORKING_ON_QUERY = `
  query userWorkingOn($login: String!) {
    user(login: $login) {
      name
      login
      repositories(first: 10, ownerAffiliations: OWNER, orderBy: {field: PUSHED_AT, direction: DESC}) {
        nodes {
          name
          description
          primaryLanguage {
            name
            color
          }
          pushedAt
          stargazerCount
          forkCount
          url
          isPrivate
        }
      }
    }
  }
`;

/**
 * @param {object} variables Fetcher variables.
 * @param {string} token GitHub token.
 * @returns {Promise<import('axios').AxiosResponse>} Axios response with working-on data.
 */
const fetcher = (variables, token) => {
  return graphqlRequest(
    { query: WORKING_ON_QUERY, variables },
    { Authorization: `bearer ${token}` },
  );
};

/**
 * @param {string} username GitHub username.
 * @returns {Promise<object>} Working on data.
 */
const getWorkingOn = async (username) => {
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
      "Could not fetch repository data.",
      AppError.GRAPHQL_ERROR,
    );
  }

  const user = res.data.data.user;
  const repos = user.repositories.nodes.filter((r) => !r.isPrivate);
  const topRepo = repos[0] || null;

  return {
    name: user.name || user.login,
    login: user.login,
    repo: topRepo
      ? {
          name: topRepo.name,
          description: topRepo.description || "",
          language: topRepo.primaryLanguage?.name || "Unknown",
          languageColor: topRepo.primaryLanguage?.color || "#858585",
          stars: topRepo.stargazerCount,
          forks: topRepo.forkCount,
          pushedAt: topRepo.pushedAt,
          url: topRepo.url,
        }
      : null,
    recentRepos: repos.slice(0, 5).map((r) => ({
      name: r.name,
      language: r.primaryLanguage?.name || "",
      languageColor: r.primaryLanguage?.color || "#858585",
      pushedAt: r.pushedAt,
    })),
  };
};

export { getWorkingOn };
export default getWorkingOn;
