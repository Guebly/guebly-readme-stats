import "dotenv/config";
import statsCard from "./api/index.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";
import gistCard from "./api/gist.js";
import socialCard from "./api/social.js";
import streakCard from "./api/streak.js";
import trophyCard from "./api/trophy.js";
import profileCard from "./api/profile.js";
import contributionsCard from "./api/contributions.js";
import workingOnCard from "./api/working-on.js";
import techStackCard from "./api/tech-stack.js";
import compareCard from "./api/compare.js";
import sponsorsCard from "./api/sponsors.js";
import activityGraphCard from "./api/activity-graph.js";
import rateLimitStatus from "./api/status/rate-limit.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const router = express.Router();

router.get("/", statsCard);
router.get("/pin", repoCard);
router.get("/top-langs", langCard);
router.get("/wakatime", wakatimeCard);
router.get("/gist", gistCard);
router.get("/social", socialCard);
router.get("/streak", streakCard);
router.get("/trophy", trophyCard);
router.get("/profile", profileCard);
router.get("/contributions", contributionsCard);
router.get("/working-on", workingOnCard);
router.get("/tech-stack", techStackCard);
router.get("/compare", compareCard);
router.get("/sponsors", sponsorsCard);
router.get("/activity-graph", activityGraphCard);
router.get("/status/rate-limit", rateLimitStatus);

app.use("/api", router);

// Healthcheck (usado pelo health gate do deploy).
app.get("/health", (req, res) => res.status(200).send("ok"));

// Serve o frontend estático (build do Vite em ./dist) + fallback SPA.
const distDir = path.join(__dirname, "dist");
app.use(express.static(distDir));
// Fallback SPA (Express 5: rota sem path em vez de "*").
app.use((req, res) => res.sendFile(path.join(distDir, "index.html")));

const port = process.env.PORT || process.env.port || 9000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
