import { renderTechStackCard } from "../src/cards/tech-stack.js";

const mockData = {
  name: "Test User",
  login: "testuser",
  categories: {
    Frontend: [
      { name: "JavaScript", color: "#f1e05a", percent: "45.2" },
      { name: "TypeScript", color: "#3178c6", percent: "20.1" },
      { name: "CSS", color: "#563d7c", percent: "5.3" },
    ],
    Backend: [
      { name: "Python", color: "#3572A5", percent: "15.0" },
      { name: "Go", color: "#00ADD8", percent: "8.4" },
    ],
    DevOps: [{ name: "Shell", color: "#89e051", percent: "3.5" }],
  },
  topLanguages: [
    { name: "JavaScript", color: "#f1e05a", percent: "45.2" },
    { name: "TypeScript", color: "#3178c6", percent: "20.1" },
    { name: "Python", color: "#3572A5", percent: "15.0" },
  ],
};

const mockDataEmpty = {
  name: "Empty User",
  login: "emptyuser",
  categories: {},
  topLanguages: [],
};

describe("renderTechStackCard", () => {
  it("renders SVG with valid data", () => {
    const svg = renderTechStackCard(mockData);
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    expect(svg).toContain("Tech Stack");
  });

  it("shows category headers", () => {
    const svg = renderTechStackCard(mockData);
    expect(svg).toContain("Frontend");
    expect(svg).toContain("Backend");
    expect(svg).toContain("DevOps");
  });

  it("shows languages with percentages", () => {
    const svg = renderTechStackCard(mockData);
    expect(svg).toContain("JavaScript");
    expect(svg).toContain("45.2%");
    expect(svg).toContain("Python");
  });

  it("shows language colors", () => {
    const svg = renderTechStackCard(mockData);
    expect(svg).toContain("#f1e05a");
    expect(svg).toContain("#3572A5");
  });

  it("handles empty data", () => {
    const svg = renderTechStackCard(mockDataEmpty);
    expect(svg).toContain("<svg");
    expect(svg).toContain("Tech Stack");
  });

  it("applies theme", () => {
    const svg = renderTechStackCard(mockData, { theme: "dark" });
    expect(svg).toContain("<svg");
  });

  it("hides border when requested", () => {
    const svg = renderTechStackCard(mockData, { hide_border: true });
    expect(svg).toContain('stroke-opacity="0"');
  });

  it("uses custom title", () => {
    const svg = renderTechStackCard(mockData, {
      custom_title: "My Stack",
    });
    expect(svg).toContain("My Stack");
  });
});
