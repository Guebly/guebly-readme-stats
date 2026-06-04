// @ts-check

import * as dotenv from "dotenv";
import { withRetry } from "../common/retry.js";
import { AppError, MissingFieldError } from "../common/error.js";
import { logger } from "../common/log.js";
import { graphqlRequest } from "../common/http.js";

dotenv.config();

const TECH_STACK_QUERY = `
  query userTechStack($login: String!) {
    user(login: $login) {
      name
      login
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
        nodes {
          primaryLanguage {
            name
            color
          }
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                name
                color
              }
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
 * @returns {Promise<import('axios').AxiosResponse>} Axios response with tech stack data.
 */
const fetcher = (variables, token) => {
  return graphqlRequest(
    { query: TECH_STACK_QUERY, variables },
    { Authorization: `bearer ${token}` },
  );
};

const CATEGORIES = {
  Frontend: [
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "SCSS",
    "Sass",
    "Less",
    "Vue",
    "Svelte",
    "Astro",
    "MDX",
  ],
  Backend: [
    "Python",
    "Java",
    "Go",
    "Ruby",
    "PHP",
    "Rust",
    "C#",
    "Kotlin",
    "Scala",
    "Elixir",
    "Erlang",
    "Haskell",
    "Clojure",
    "Perl",
    "Lua",
    "Dart",
    "R",
    "Julia",
  ],
  Systems: [
    "C",
    "C++",
    "Assembly",
    "Zig",
    "Nim",
    "Objective-C",
    "Objective-C++",
    "Makefile",
    "CMake",
  ],
  Mobile: ["Swift", "Kotlin", "Dart", "Objective-C"],
  DevOps: [
    "Shell",
    "PowerShell",
    "Dockerfile",
    "Nix",
    "HCL",
    "Jsonnet",
    "Batchfile",
  ],
  Data: ["Jupyter Notebook", "R", "MATLAB", "SQL", "PLSQL"],
};

/**
 * @param {string} langName Language name.
 * @returns {string} Category name.
 */
const categorize = (langName) => {
  for (const [category, languages] of Object.entries(CATEGORIES)) {
    if (languages.includes(langName)) {
      return category;
    }
  }
  return "Other";
};

/**
 * @param {string} username GitHub username.
 * @returns {Promise<object>} Tech stack data.
 */
const getTechStack = async (username) => {
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
      "Could not fetch tech stack data.",
      AppError.GRAPHQL_ERROR,
    );
  }

  const user = res.data.data.user;
  const langMap = {};

  for (const repo of user.repositories.nodes) {
    for (const edge of repo.languages.edges) {
      const name = edge.node.name;
      if (!langMap[name]) {
        langMap[name] = { size: 0, color: edge.node.color || "#858585" };
      }
      langMap[name].size += edge.size;
    }
  }

  const sorted = Object.entries(langMap)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.size - a.size);

  const totalSize = sorted.reduce((sum, l) => sum + l.size, 0);

  const categorized = {};
  for (const lang of sorted) {
    const cat = categorize(lang.name);
    if (!categorized[cat]) {
      categorized[cat] = [];
    }
    categorized[cat].push({
      name: lang.name,
      color: lang.color,
      percent: totalSize > 0 ? ((lang.size / totalSize) * 100).toFixed(1) : "0",
    });
  }

  return {
    name: user.name || user.login,
    login: user.login,
    categories: categorized,
    topLanguages: sorted.slice(0, 12).map((l) => ({
      name: l.name,
      color: l.color,
      percent: totalSize > 0 ? ((l.size / totalSize) * 100).toFixed(1) : "0",
    })),
  };
};

export { getTechStack };
export default getTechStack;
