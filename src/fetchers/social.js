// @ts-check
import axios from "axios";
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
      contributionsCollection {
        contributionCalendar { totalContributions }
      }
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

  // Fetch avatar as base64 so the SVG is self-contained (no external URL).
  // External href in SVG-as-<img> is blocked by Chrome and triggers @error.
  let avatarDataUri = null;
  try {
    const avatarResp = await axios.get(u.avatarUrl, {
      responseType: "arraybuffer",
      params: { s: 80 },
      timeout: 4000,
    });
    const ct =
      /** @type {string} */ (avatarResp.headers["content-type"]) || "image/png";
    avatarDataUri = `data:${ct.split(";")[0]};base64,${Buffer.from(avatarResp.data).toString("base64")}`;
  } catch {
    // falls back to initial-based avatar in renderer
  }

  return {
    name: u.name || u.login,
    login: u.login,
    bio: u.bio || "",
    avatarUrl: avatarDataUri,
    location: u.location || "",
    company: u.company || "",
    website: u.websiteUrl || "",
    followers: u.followers.totalCount,
    following: u.following.totalCount,
    repos: u.repositories.totalCount,
    stars: u.starredRepositories.totalCount,
    contributions:
      u.contributionsCollection.contributionCalendar.totalContributions,
  };
};
