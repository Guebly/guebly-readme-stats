// @ts-check

/**
 * @type {string} A general message to ask user to try again later.
 */
const RETRY_LATER_MSG = "Please try again later";

/**
 * @type {Object<string, string>} A map of error types to secondary error messages.
 */
const ERROR_HINTS = {
  MAX_RETRY:
    "You can deploy own instance or wait until public will be no longer limited",
  NO_TOKENS:
    "Please add an env variable called PAT_1 with your GitHub API token in vercel",
  USER_NOT_FOUND: "Make sure the provided username is not an organization",
  GRAPHQL_ERROR: RETRY_LATER_MSG,
  GITHUB_REST_API_ERROR: RETRY_LATER_MSG,
  WAKATIME_USER_NOT_FOUND: "Make sure you have a public WakaTime profile",
};

/**
 * Custom error class to handle custom GRS errors.
 */
class AppError extends Error {
  /**
   * Custom error constructor.
   *
   * @param {string} message Error message.
   * @param {string} type Error type.
   */
  constructor(message, type) {
    super(message);
    this.type = type;
    this.secondaryMessage = ERROR_HINTS[type] || type;
  }

  static MAX_RETRY = "MAX_RETRY";
  static NO_TOKENS = "NO_TOKENS";
  static USER_NOT_FOUND = "USER_NOT_FOUND";
  static GRAPHQL_ERROR = "GRAPHQL_ERROR";
  static GITHUB_REST_API_ERROR = "GITHUB_REST_API_ERROR";
  static WAKATIME_ERROR = "WAKATIME_ERROR";
}

/**
 * Missing query parameter class.
 */
class MissingFieldError extends Error {
  /**
   * Missing query parameter error constructor.
   *
   * @param {string[]} missedParams An array of missing parameters names.
   * @param {string=} secondaryMessage Optional secondary message to display.
   */
  constructor(missedParams, secondaryMessage) {
    const msg = `Missing params ${missedParams
      .map((p) => `"${p}"`)
      .join(", ")} make sure you pass the parameters in URL`;
    super(msg);
    this.missedParams = missedParams;
    this.secondaryMessage = secondaryMessage;
  }
}

/**
 * Retrieve secondary message from an error object.
 *
 * @param {Error} err The error object.
 * @returns {string|undefined} The secondary message if available, otherwise undefined.
 */
const retrieveSecondaryMessage = (err) => {
  return "secondaryMessage" in err && typeof err.secondaryMessage === "string"
    ? err.secondaryMessage
    : undefined;
};

export {
  AppError,
  MissingFieldError,
  ERROR_HINTS,
  RETRY_LATER_MSG,
  retrieveSecondaryMessage,
};
