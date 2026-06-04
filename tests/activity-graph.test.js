import { renderActivityGraphCard } from "../src/cards/activity-graph.js";

const mockData = {
  name: "Test User",
  login: "testuser",
  totalContributions: 1234,
  months: [
    { month: "2025-01", label: "Jan", count: 45 },
    { month: "2025-02", label: "Feb", count: 82 },
    { month: "2025-03", label: "Mar", count: 120 },
    { month: "2025-04", label: "Apr", count: 95 },
    { month: "2025-05", label: "May", count: 150 },
    { month: "2025-06", label: "Jun", count: 88 },
    { month: "2025-07", label: "Jul", count: 110 },
    { month: "2025-08", label: "Aug", count: 75 },
    { month: "2025-09", label: "Sep", count: 130 },
    { month: "2025-10", label: "Oct", count: 102 },
    { month: "2025-11", label: "Nov", count: 140 },
    { month: "2025-12", label: "Dec", count: 97 },
  ],
};

const mockDataEmpty = {
  name: "Empty User",
  login: "emptyuser",
  totalContributions: 0,
  months: [],
};

describe("renderActivityGraphCard", () => {
  it("renders SVG with valid data", () => {
    const svg = renderActivityGraphCard(mockData);
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    expect(svg).toContain("Test User");
  });

  it("shows total contributions", () => {
    const svg = renderActivityGraphCard(mockData);
    expect(svg).toContain("1.2k total");
  });

  it("renders polyline graph", () => {
    const svg = renderActivityGraphCard(mockData);
    expect(svg).toContain("<polyline");
    expect(svg).toContain("points=");
  });

  it("renders area fill", () => {
    const svg = renderActivityGraphCard(mockData);
    expect(svg).toContain("activity-area");
  });

  it("renders dot markers", () => {
    const svg = renderActivityGraphCard(mockData);
    expect(svg).toContain("Jan: 45 contributions");
    expect(svg).toContain("May: 150 contributions");
  });

  it("renders month labels", () => {
    const svg = renderActivityGraphCard(mockData);
    expect(svg).toContain(">Jan<");
    expect(svg).toContain(">Dec<");
  });

  it("renders grid lines", () => {
    const svg = renderActivityGraphCard(mockData);
    expect(svg).toContain("stroke-opacity");
  });

  it("handles empty data", () => {
    const svg = renderActivityGraphCard(mockDataEmpty);
    expect(svg).toContain("<svg");
    expect(svg).toContain("No activity data available");
  });

  it("applies theme", () => {
    const svg = renderActivityGraphCard(mockData, { theme: "guebly" });
    expect(svg).toContain("#6E40C9");
  });

  it("hides border when requested", () => {
    const svg = renderActivityGraphCard(mockData, { hide_border: true });
    expect(svg).toContain('stroke-opacity="0"');
  });

  it("uses custom title", () => {
    const svg = renderActivityGraphCard(mockData, {
      custom_title: "My Activity",
    });
    expect(svg).toContain("My Activity");
  });

  it("supports gradient background", () => {
    const svg = renderActivityGraphCard(mockData, {
      theme: "guebly_aurora",
    });
    expect(svg).toContain("linearGradient");
    expect(svg).toContain("url(#gradient)");
  });
});
