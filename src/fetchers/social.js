// @ts-check
import { graphqlRequest } from "../common/http.js";
import { withRetry } from "../common/retry.js";
import { MissingFieldError, AppError } from "../common/error.js";
import githubUsernameRegex from "github-username-regex";

const GRAPHQL_SOCIAL_QUERY = `
  query userSocial($login: String!) {
    user(login: $login) {
      name
      login
      bio
      avatarUrl
      location
      company
      websiteUrl
      followers { totalCount }
      following { totalCount }
      repositories(ownerAffiliations: OWNER) { totalCount }
      starredRepositories { totalCount }
    }
  }
`;

const fetcher = (variables, token) => {
  return graphqlRequest(
    { query: GRAPHQL_SOCIAL_QUERY, variables },
    { Authorization: `bearer ${token}` },
  );
};

/**
 * @param {string} username GitHub username.
 * @returns {Promise<object>} Social profile data.
 */
export const fetchSocial = async (username) => {
  if (!username) {
    throw new MissingFieldError(["username"]);
  }
  if (!githubUsernameRegex.test(username)) {
    throw new AppError("Invalid username", AppError.USER_NOT_FOUND);
  }

  const res = await withRetry(fetcher, { login: username });

  if (res.data.errors) {
    if (res.data.errors[0].type === "NOT_FOUND") {
      throw new AppError(
        res.data.errors[0].message || "Could not fetch user.",
        AppError.USER_NOT_FOUND,
      );
    }
    throw new AppError("GraphQL error", AppError.GRAPHQL_ERROR);
  }

  const u = res.data.data.user;
  return {
    name: u.name || u.login,
    login: u.login,
    bio: u.bio || "",
    avatarUrl: u.avatarUrl,
    location: u.location || "",
    company: u.company || "",
    website: u.websiteUrl || "",
    followers: u.followers.totalCount,
    following: u.following.totalCount,
    repos: u.repositories.totalCount,
    stars: u.starredRepositories.totalCount,
  };
};
