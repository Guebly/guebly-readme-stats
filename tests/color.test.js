import { isHexColor, isGradient } from "../src/common/color.js";

describe("isHexColor", () => {
  it("accepts 6-char hex", () => expect(isHexColor("6E40C9")).toBe(true));
  it("accepts 3-char hex", () => expect(isHexColor("fff")).toBe(true));
  it("accepts 8-char hex with alpha", () =>
    expect(isHexColor("6E40C9FF")).toBe(true));
  it("accepts 4-char hex with alpha", () =>
    expect(isHexColor("fffa")).toBe(true));
  it("rejects hex with # prefix", () =>
    expect(isHexColor("#6E40C9")).toBe(false));
  it("rejects invalid characters", () =>
    expect(isHexColor("ZZZZZZ")).toBe(false));
  it("rejects wrong length", () => expect(isHexColor("6E40C")).toBe(false));
  it("rejects empty string", () => expect(isHexColor("")).toBe(false));
});

describe("isGradient", () => {
  it("accepts valid gradient (angle + 2 colors)", () => {
    expect(isGradient(["30", "6E40C9", "0D1117"])).toBe(true);
  });
  it("rejects when less than 3 elements", () => {
    expect(isGradient(["30", "6E40C9"])).toBe(false);
  });
  it("rejects when a color is invalid", () => {
    expect(isGradient(["30", "ZZZZZZ", "0D1117"])).toBe(false);
  });
});
