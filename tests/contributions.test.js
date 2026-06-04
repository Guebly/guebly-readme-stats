import { renderContributionsCard } from "../src/cards/contributions.js";

const mockData = {
  name: "Test User",
  login: "testuser",
  totalContributions: 1234,
  weeks: Array.from({ length: 52 }, (_, wi) => ({
    contributionDays: Array.from({ length: 7 }, (_, di) => ({
      contributionCount: Math.floor((wi + di) % 10),
      date: `2025-${String(Math.floor(wi / 4) + 1).padStart(2, "0")}-${String((di + 1) * 3).padStart(2, "0")}`,
      color: "#216e39",
      weekday: di,
    })),
  })),
};

describe("renderContributionsCard", () => {
  it("renders SVG with valid data", () => {
    const svg = renderContributionsCard(mockData);
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    expect(svg).toContain("Test User");
    expect(svg).toContain("1.2k contributions");
  });

  it("applies theme colors", () => {
    const svg = renderContributionsCard(mockData, { theme: "dark" });
    expect(svg).toContain("<svg");
  });

  it("applies custom colors", () => {
    const svg = renderContributionsCard(mockData, {
      title_color: "ff0000",
      bg_color: "000000",
    });
    expect(svg).toContain("#ff0000");
    expect(svg).toContain("#000000");
  });

  it("hides border when requested", () => {
    const svg = renderContributionsCard(mockData, { hide_border: true });
    expect(svg).toContain('stroke-opacity="0"');
  });

  it("uses custom title", () => {
    const svg = renderContributionsCard(mockData, {
      custom_title: "My Contributions",
    });
    expect(svg).toContain("My Contributions");
  });

  it("renders heatmap cells", () => {
    const svg = renderContributionsCard(mockData);
    expect(svg).toContain("data-count=");
    expect(svg).toContain("data-date=");
  });

  it("renders legend (Less/More)", () => {
    const svg = renderContributionsCard(mockData);
    expect(svg).toContain("Less");
    expect(svg).toContain("More");
  });

  it("renders month labels", () => {
    const svg = renderContributionsCard(mockData);
    expect(svg).toContain("Jan");
  });
});
