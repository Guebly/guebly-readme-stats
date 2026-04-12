// @ts-check

import axios from "axios";
import { AppError, MissingFieldError } from "../common/error.js";

/**
 * WakaTime data fetcher.
 *
 * @param {{username: string, api_domain: string }} props Fetcher props.
 * @returns {Promise<import("./types").WakaTimeData>} WakaTime data response.
 */
const ALLOWED_WAKATIME_DOMAIN_RE = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const fetchWakatimeStats = async ({ username, api_domain }) => {
  if (!username) {
    throw new MissingFieldError(["username"]);
  }

  let domain = "wakatime.com";
  if (api_domain) {
    const cleaned = api_domain.replace(/\/$/gi, "").trim();
    if (!ALLOWED_WAKATIME_DOMAIN_RE.test(cleaned)) {
      throw new AppError("Invalid api_domain parameter", "INVALID_PARAM");
    }
    domain = cleaned;
  }

  try {
    const { data } = await axios.get(
      `https://${domain}/api/v1/users/${username}/stats?is_including_today=true`,
    );

    return data.data;
  } catch (err) {
    if (err.response.status < 200 || err.response.status > 299) {
      throw new AppError(
        `Could not resolve to a User with the login of '${username}'`,
        "WAKATIME_USER_NOT_FOUND",
      );
    }
    throw err;
  }
};

export { fetchWakatimeStats };
export default fetchWakatimeStats;
