// @ts-check

const allowedUsers = process.env.ALLOWED_USERS
  ? process.env.ALLOWED_USERS.split(",")
  : undefined;

const allowedGists = process.env.ALLOWED_GISTS
  ? process.env.ALLOWED_GISTS.split(",")
  : undefined;

const excludedRepos = process.env.EXCLUDE_REPOS
  ? process.env.EXCLUDE_REPOS.split(",")
  : [];

export { allowedUsers, allowedGists, excludedRepos };
