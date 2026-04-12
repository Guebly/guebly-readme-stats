// @ts-check

import { buildErrorCard } from "./render.js";
import { blockedUsers } from "./blocklist.js";
import { allowedUsers, allowedGists } from "./envs.js";

const NOT_ALLOWED_USERNAME_MESSAGE = "This username is not whitelisted";
const NOT_ALLOWED_GIST_MESSAGE = "This gist ID is not whitelisted";
const BLOCKED_MESSAGE = "This username is blacklisted";

/**
 * Guards access using allowlist/blocklist.
 *
 * @param {Object} args The parameters object.
 * @param {any} args.res The response object.
 * @param {string} args.id Resource identifier (username or gist id).
 * @param {"username"|"gist"|"wakatime"} args.type The type of identifier.
 * @param {{ title_color?: string, text_color?: string, bg_color?: string, border_color?: string, theme?: string }} args.colors Color options for the error card.
 * @returns {{ isPassed: boolean, result?: any }} The result object indicating success or failure.
 */
const checkAccess = ({ res, id, type, colors }) => {
  if (!["username", "gist", "wakatime"].includes(type)) {
    throw new Error(
      'Invalid type. Expected "username", "gist", or "wakatime".',
    );
  }

  const currentAllowlist = type === "gist" ? allowedGists : allowedUsers;
  const notAllowedMsg =
    type === "gist" ? NOT_ALLOWED_GIST_MESSAGE : NOT_ALLOWED_USERNAME_MESSAGE;

  if (Array.isArray(currentAllowlist) && !currentAllowlist.includes(id)) {
    const result = res.send(
      buildErrorCard({
        message: notAllowedMsg,
        secondaryMessage: "Please deploy your own instance",
        renderOptions: {
          ...colors,
          show_repo_link: false,
        },
      }),
    );
    return { isPassed: false, result };
  }

  if (
    type === "username" &&
    currentAllowlist === undefined &&
    blockedUsers.includes(id)
  ) {
    const result = res.send(
      buildErrorCard({
        message: BLOCKED_MESSAGE,
        secondaryMessage: "Please deploy your own instance",
        renderOptions: {
          ...colors,
          show_repo_link: false,
        },
      }),
    );
    return { isPassed: false, result };
  }

  return { isPassed: true };
};

export { checkAccess };
