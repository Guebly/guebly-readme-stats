// @ts-check
import { graphqlRequest } from "../common/http.js";
import { withRetry } from "../common/retry.js";
import { MissingFieldError, AppError } from "../common/error.js";
import githubUsernameRegex from "github-username-regex";

const GRAPHQL_CONTRIB_QUERY = `
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
            }
          }
        }
      }
    }
  }
`;

const fetcher = (variables, token) => {
  return graphqlRequest(
    { query: GRAPHQL_CONTRIB_QUERY, variables },
    { Authorization: `bearer ${token}` },
  );
};

/**
 * @param {string} username GitHub username.
 * @returns {Promise<{name:string, totalContributions:number, currentStreak:number, longestStreak:number, currentStreakStart:string, currentStreakEnd:string, longestStreakStart:string, longestStreakEnd:string}>} Streak stats.
 */
export const fetchStreak = async (username) => {
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
  const calendar = user.contributionsCollection.contributionCalendar;

  // Flatten all days
  const days = calendar.weeks
    .flatMap((w) => w.contributionDays)
    .sort((a, b) => a.date.localeCompare(b.date));

  // Calculate streaks
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let currentStreakStart = "";
  let currentStreakEnd = "";
  let longestStreakStart = "";
  let longestStreakEnd = "";
  let tempStart = "";

  const today = new Date().toISOString().split("T")[0];
  for (const day of days) {
    if (day.contributionCount > 0) {
      if (tempStreak === 0) {
        tempStart = day.date;
      }
      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
        longestStreakStart = tempStart;
        longestStreakEnd = day.date;
      }
    } else {
      tempStreak = 0;
    }
  }

  // Current streak: count back from today/yesterday
  currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    const d = days[i];
    if (d.date > today) {
      continue;
    }
    if (currentStreak === 0 && d.date === today && d.contributionCount === 0) {
      continue;
    }
    if (d.contributionCount > 0) {
      if (currentStreak === 0) {
        currentStreakEnd = d.date;
      }
      currentStreak++;
      currentStreakStart = d.date;
    } else {
      break;
    }
  }

  return {
    name: user.name || user.login,
    totalContributions: calendar.totalContributions,
    currentStreak,
    longestStreak,
    currentStreakStart,
    currentStreakEnd,
    longestStreakStart,
    longestStreakEnd,
  };
};
