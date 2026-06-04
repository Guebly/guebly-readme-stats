import { renderCompareCard } from "../src/cards/compare.js";

const mockUser1 = {
  name: "Alice",
  login: "alice",
  totalCommits: 1200,
  totalPRs: 85,
  totalIssues: 42,
  totalStars: 500,
  contributedTo: 30,
  rank: { level: "A+", percentile: 12.5 },
};

const mockUser2 = {
  name: "Bob",
  login: "bob",
  totalCommits: 800,
  totalPRs: 120,
  totalIssues: 60,
  totalStars: 300,
  contributedTo: 45,
  rank: { level: "A", percentile: 25.0 },
};

describe("renderCompareCard", () => {
  it("renders SVG with valid data", () => {
    const svg = renderCompareCard(mockUser1, mockUser2);
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
  });

  it("shows both usernames", () => {
    const svg = renderCompareCard(mockUser1, mockUser2);
    expect(svg).toContain("Alice");
    expect(svg).toContain("Bob");
    expect(svg).toContain("@alice");
    expect(svg).toContain("@bob");
  });

  it("shows VS separator", () => {
    const svg = renderCompareCard(mockUser1, mockUser2);
    expect(svg).toContain("VS");
  });

  it("shows stat labels", () => {
    const svg = renderCompareCard(mockUser1, mockUser2);
    expect(svg).toContain("Commits");
    expect(svg).toContain("PRs");
    expect(svg).toContain("Issues");
    expect(svg).toContain("Stars");
    expect(svg).toContain("Contributed to");
  });

  it("shows rank info", () => {
    const svg = renderCompareCard(mockUser1, mockUser2);
    expect(svg).toContain("A+");
    expect(svg).toContain("Rank");
  });

  it("shows formatted stat values", () => {
    const svg = renderCompareCard(mockUser1, mockUser2);
    expect(svg).toContain("1.2k");
    expect(svg).toContain("800");
  });

  it("applies theme", () => {
    const svg = renderCompareCard(mockUser1, mockUser2, { theme: "guebly" });
    expect(svg).toContain("<svg");
  });

  it("hides border when requested", () => {
    const svg = renderCompareCard(mockUser1, mockUser2, { hide_border: true });
    expect(svg).toContain('stroke-opacity="0"');
  });

  it("handles missing rank gracefully", () => {
    const noRank1 = { ...mockUser1, rank: null };
    const noRank2 = { ...mockUser2, rank: null };
    const svg = renderCompareCard(noRank1, noRank2);
    expect(svg).toContain("<svg");
  });

  it("handles zero stats", () => {
    const empty1 = { ...mockUser1, totalCommits: 0, totalPRs: 0 };
    const empty2 = { ...mockUser2, totalCommits: 0, totalPRs: 0 };
    const svg = renderCompareCard(empty1, empty2);
    expect(svg).toContain("<svg");
  });
});
