import { renderSponsorsCard } from "../src/cards/sponsors.js";

const mockDataWithSponsors = {
  name: "Test User",
  login: "testuser",
  avatarUrl: "https://avatars.githubusercontent.com/u/12345",
  hasSponsorsListing: true,
  sponsorCount: 15,
  sponsoringCount: 8,
  sponsors: [
    {
      login: "sponsor1",
      avatarUrl: "https://avatars.githubusercontent.com/u/1",
    },
    {
      login: "sponsor2",
      avatarUrl: "https://avatars.githubusercontent.com/u/2",
    },
    {
      login: "sponsor3",
      avatarUrl: "https://avatars.githubusercontent.com/u/3",
    },
  ],
  description: "Supporting open source development",
  socialLinks: [
    {
      provider: "TWITTER",
      url: "https://twitter.com/testuser",
      displayName: "@testuser",
    },
    {
      provider: "WEBSITE",
      url: "https://testuser.dev",
      displayName: "testuser.dev",
    },
  ],
};

const mockDataNoSponsors = {
  name: "No Sponsor User",
  login: "nosponsor",
  avatarUrl: "https://avatars.githubusercontent.com/u/99999",
  hasSponsorsListing: false,
  sponsorCount: 0,
  sponsoringCount: 0,
  sponsors: [],
  description: "",
  socialLinks: [],
};

describe("renderSponsorsCard", () => {
  it("renders SVG with sponsors data", () => {
    const svg = renderSponsorsCard(mockDataWithSponsors);
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    expect(svg).toContain("Support Test User");
  });

  it("shows sponsor and sponsoring counts", () => {
    const svg = renderSponsorsCard(mockDataWithSponsors);
    expect(svg).toContain("15");
    expect(svg).toContain("8");
    expect(svg).toContain("Sponsors");
    expect(svg).toContain("Sponsoring");
  });

  it("shows description", () => {
    const svg = renderSponsorsCard(mockDataWithSponsors);
    expect(svg).toContain("Supporting open source development");
  });

  it("renders sponsor avatars", () => {
    const svg = renderSponsorsCard(mockDataWithSponsors);
    expect(svg).toContain("sp-0");
    expect(svg).toContain("sp-1");
    expect(svg).toContain("sp-2");
  });

  it("shows social links", () => {
    const svg = renderSponsorsCard(mockDataWithSponsors);
    expect(svg).toContain("LINKS");
    expect(svg).toContain("@testuser");
    expect(svg).toContain("testuser.dev");
  });

  it("handles no sponsors listing", () => {
    const svg = renderSponsorsCard(mockDataNoSponsors);
    expect(svg).toContain("<svg");
    expect(svg).toContain("GitHub Sponsors not enabled");
  });

  it("applies theme", () => {
    const svg = renderSponsorsCard(mockDataWithSponsors, { theme: "dark" });
    expect(svg).toContain("<svg");
  });

  it("hides border when requested", () => {
    const svg = renderSponsorsCard(mockDataWithSponsors, { hide_border: true });
    expect(svg).toContain('stroke-opacity="0"');
  });

  it("uses custom title", () => {
    const svg = renderSponsorsCard(mockDataWithSponsors, {
      custom_title: "Back Me Up",
    });
    expect(svg).toContain("Back Me Up");
  });

  it("applies custom colors", () => {
    const svg = renderSponsorsCard(mockDataWithSponsors, {
      title_color: "ff0000",
      bg_color: "111111",
    });
    expect(svg).toContain("#ff0000");
    expect(svg).toContain("#111111");
  });
});
