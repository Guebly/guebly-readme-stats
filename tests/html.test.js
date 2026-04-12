import { escapeHTML } from "../src/common/html.js";

describe("escapeHTML", () => {
  it("encodes < and >", () => {
    const result = escapeHTML("<script>");
    expect(result).not.toContain("<");
    expect(result).not.toContain(">");
  });

  it("encodes &", () => {
    const result = escapeHTML("foo & bar");
    expect(result).not.toContain("&b");
  });

  it("leaves plain ASCII untouched", () => {
    expect(escapeHTML("hello world")).toBe("hello world");
  });

  it("encodes non-ASCII characters", () => {
    const result = escapeHTML("café");
    expect(result).not.toContain("é");
    expect(result).toContain("&#");
  });

  it("removes backspace characters", () => {
    expect(escapeHTML("test\u0008val")).toBe("testval");
  });
});
