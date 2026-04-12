// @ts-check
import { graphqlRequest } from "../common/http.js";
import { withRetry } from "../common/retry.js";
import { MissingFieldError, AppError } from "../common/error.js";
import githubUsernameRegex from "github-username-regex";

const PROFILE_QUERY = `
  query profileHighlight($login: String!) {
    user(login: $login) {
      name
      login
      bio
      company
      location
      createdAt
      followers { totalCount }
      following  { totalCount }
      contributionsCollection {
        contributionCalendar { totalContributions }
      }
      repositories(
        first: 100
        ownerAffiliations: OWNER
        isFork: false
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        totalCount
        nodes {
          stargazerCount
          primaryLanguage { name color }
        }
      }
    }
  }
`;

const fetcher = (variables, token) =>
  graphqlRequest(
    { query: PROFILE_QUERY, variables },
    { Authorization: `bearer ${token}` },
  );

/**
 * @param {string} username GitHub username.
 * @returns {Promise<object>} Profile highlight data for non-developer audience.
 */
export const fetchProfile = async (username) => {
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

  const user = res.data.data.user;
  const repos = user.repositories;

  const totalStars = repos.nodes.reduce(
    (sum, r) => sum + (r.stargazerCount || 0),
    0,
  );

  const langMap = {};
  for (const repo of repos.nodes) {
    if (repo.primaryLanguage) {
      const { name, color } = repo.primaryLanguage;
      if (!langMap[name]) {
        langMap[name] = { count: 0, color: color || "#888" };
      }
      langMap[name].count++;
    }
  }
  const topLanguages = Object.entries(langMap)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([name, { color }]) => ({ name, color }));

  return {
    name: user.name || user.login,
    login: user.login,
    bio: user.bio || "",
    company: (user.company || "").replace(/^@/, ""),
    location: user.location || "",
    createdAt: user.createdAt,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    repos: repos.totalCount,
    stars: totalStars,
    contributions:
      user.contributionsCollection.contributionCalendar.totalContributions,
    topLanguages,
  };
};
