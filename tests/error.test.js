import { AppError, MissingFieldError } from "../src/common/error.js";

describe("AppError", () => {
  it("creates error with message and type", () => {
    const err = new AppError("something failed", "USER_NOT_FOUND");
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe("something failed");
    expect(err.type).toBe("USER_NOT_FOUND");
  });

  it("has correct static error type constants", () => {
    expect(AppError.NO_TOKENS).toBeDefined();
    expect(AppError.MAX_RETRY).toBeDefined();
    expect(AppError.USER_NOT_FOUND).toBeDefined();
  });
});

describe("MissingFieldError", () => {
  it("creates error listing missing fields", () => {
    const err = new MissingFieldError(["username", "repo"]);
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toContain("username");
    expect(err.message).toContain("repo");
  });
});
