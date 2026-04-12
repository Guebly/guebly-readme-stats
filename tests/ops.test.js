import {
  toBool,
  toArray,
  clamp,
  normalize,
  chunk,
  daysBetween,
} from "../src/common/ops.js";

describe("toBool", () => {
  it('returns true for "true"', () => expect(toBool("true")).toBe(true));
  it('returns false for "false"', () => expect(toBool("false")).toBe(false));
  it("is case-insensitive", () => {
    expect(toBool("TRUE")).toBe(true);
    expect(toBool("False")).toBe(false);
  });
  it("passes through booleans unchanged", () => {
    expect(toBool(true)).toBe(true);
    expect(toBool(false)).toBe(false);
  });
  it("returns undefined for unknown strings", () => {
    expect(toBool("yes")).toBeUndefined();
    expect(toBool("1")).toBeUndefined();
  });
});

describe("toArray", () => {
  it("splits comma-separated values", () => {
    expect(toArray("a,b,c")).toEqual(["a", "b", "c"]);
  });
  it("returns empty array for falsy input", () => {
    expect(toArray("")).toEqual([]);
    expect(toArray(null)).toEqual([]);
    expect(toArray(undefined)).toEqual([]);
  });
  it("handles single value", () => {
    expect(toArray("js")).toEqual(["js"]);
  });
});

describe("clamp", () => {
  it("clamps to min", () => expect(clamp(0, 10, 100)).toBe(10));
  it("clamps to max", () => expect(clamp(200, 10, 100)).toBe(100));
  it("returns value within range", () => expect(clamp(50, 10, 100)).toBe(50));
  it("returns min for NaN input", () => expect(clamp(NaN, 10, 100)).toBe(10));
});

describe("normalize", () => {
  it("lowercases and trims", () => {
    expect(normalize("  Hello World  ")).toBe("hello world");
  });
  it("handles already-normalized strings", () => {
    expect(normalize("guebly")).toBe("guebly");
  });
});

describe("chunk", () => {
  it("splits array into chunks", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
  it("handles uneven splits", () => {
    expect(chunk([1, 2, 3], 2)).toEqual([[1, 2], [3]]);
  });
  it("returns empty for empty input", () => {
    expect(chunk([], 2)).toEqual([]);
  });
});

describe("daysBetween", () => {
  it("returns positive minutes when d1 is after d2", () => {
    const d1 = new Date("2024-01-01T01:00:00Z");
    const d2 = new Date("2024-01-01T00:00:00Z");
    expect(daysBetween(d1, d2)).toBe(60);
  });
  it("returns 0 for same dates", () => {
    const d = new Date("2024-01-01T00:00:00Z");
    expect(daysBetween(d, d)).toBe(0);
  });
});
