import { renderWorkingOnCard } from "../src/cards/working-on.js";

const mockData = {
  name: "Test User",
  login: "testuser",
  repo: {
    name: "awesome-project",
    description: "A really cool project",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 42,
    forks: 7,
    pushedAt: new Date(Date.now() - 3600000).toISOString(),
    url: "https://github.com/testuser/awesome-project",
  },
  recentRepos: [
    {
      name: "awesome-project",
      language: "JavaScript",
      languageColor: "#f1e05a",
      pushedAt: new Date().toISOString(),
    },
    {
      name: "another-repo",
      language: "Python",
      languageColor: "#3572A5",
      pushedAt: new Date().toISOString(),
    },
    {
      name: "third-repo",
      language: "Go",
      languageColor: "#00ADD8",
      pushedAt: new Date().toISOString(),
    },
  ],
};

const mockDataNoRepo = {
  name: "Empty User",
  login: "emptyuser",
  repo: null,
  recentRepos: [],
};

describe("renderWorkingOnCard", () => {
  it("renders SVG with valid data", () => {
    const svg = renderWorkingOnCard(mockData);
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    expect(svg).toContain("awesome-project");
  });

  it("shows repo description", () => {
    const svg = renderWorkingOnCard(mockData);
    expect(svg).toContain("A really cool project");
  });

  it("shows language info", () => {
    const svg = renderWorkingOnCard(mockData);
    expect(svg).toContain("JavaScript");
    expect(svg).toContain("#f1e05a");
  });

  it("shows stars and forks", () => {
    const svg = renderWorkingOnCard(mockData);
    expect(svg).toContain("42");
    expect(svg).toContain("7");
  });

  it("shows recent activity section", () => {
    const svg = renderWorkingOnCard(mockData);
    expect(svg).toContain("RECENT ACTIVITY");
    expect(svg).toContain("another-repo");
  });

  it("handles no repos gracefully", () => {
    const svg = renderWorkingOnCard(mockDataNoRepo);
    expect(svg).toContain("<svg");
    expect(svg).toContain("No public repositories found");
  });

  it("applies theme", () => {
    const svg = renderWorkingOnCard(mockData, { theme: "guebly" });
    expect(svg).toContain("<svg");
  });

  it("hides border when requested", () => {
    const svg = renderWorkingOnCard(mockData, { hide_border: true });
    expect(svg).toContain('stroke-opacity="0"');
  });

  it("uses custom title", () => {
    const svg = renderWorkingOnCard(mockData, {
      custom_title: "Currently hacking on",
    });
    expect(svg).toContain("Currently hacking on");
  });
});
