// @ts-check

import * as dotenv from "dotenv";
import { withRetry } from "../common/retry.js";
import { AppError, MissingFieldError } from "../common/error.js";
import { logger } from "../common/log.js";
import { graphqlRequest } from "../common/http.js";

dotenv.config();

const SPONSORS_QUERY = `
  query userSponsors($login: String!) {
    user(login: $login) {
      name
      login
      avatarUrl
      hasSponsorsListing
      sponsors(first: 30) {
        totalCount
        nodes {
          ... on User {
            login
            avatarUrl
          }
          ... on Organization {
            login
            avatarUrl
          }
        }
      }
      sponsoring(first: 1) {
        totalCount
      }
      websiteUrl
    }
  }
`;

/**
 * @param {object} variables Fetcher variables.
 * @param {string} token GitHub token.
 * @returns {Promise<import('axios').AxiosResponse>} Axios response with sponsors data.
 */
const fetcher = (variables, token) => {
  return graphqlRequest(
    { query: SPONSORS_QUERY, variables },
    { Authorization: `bearer ${token}` },
  );
};

/**
 * @param {string} username GitHub username.
 * @returns {Promise<object>} Sponsors data.
 */
const getSponsors = async (username) => {
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
      "Could not fetch sponsors data.",
      AppError.GRAPHQL_ERROR,
    );
  }

  const user = res.data.data.user;

  const socialLinks = [];
  if (user.websiteUrl) {
    socialLinks.push({
      provider: "WEBSITE",
      url: user.websiteUrl,
      displayName: user.websiteUrl.replace(/^https?:\/\//, ""),
    });
  }

  const sponsorNodes = user.sponsors?.nodes || [];

  return {
    name: user.name || user.login,
    login: user.login,
    avatarUrl: user.avatarUrl,
    hasSponsorsListing: user.hasSponsorsListing || false,
    sponsorCount: user.sponsors?.totalCount || 0,
    sponsoringCount: user.sponsoring?.totalCount || 0,
    sponsors: sponsorNodes
      .filter((s) => s && s.login)
      .slice(0, 12)
      .map((s) => ({
        login: s.login,
        avatarUrl: s.avatarUrl,
      })),
    description: "",
    socialLinks,
  };
};

export { getSponsors };
export default getSponsors;
