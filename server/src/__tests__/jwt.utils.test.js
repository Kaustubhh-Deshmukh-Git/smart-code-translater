import { describe, it, expect, beforeAll } from "vitest";
import { generateToken, verifyToken } from "../utils/jwt.utils.js";

describe("jwt.utils", () => {
  beforeAll(() => {
    process.env.JWT_SECRET = "test-secret-key-123456789";
  });

  it("successfully signs and verifies a valid token payload", () => {
    const user = { _id: "user12345678901234567890", email: "user@example.com" };
    const token = generateToken(user);
    expect(typeof token).toBe("string");

    const decoded = verifyToken(token);
    expect(decoded.id).toBe(user._id);
    expect(decoded.email).toBe(user.email);
  });

  it("throws when verifying a tampered token", () => {
    const user = { _id: "user12345678901234567890", email: "user@example.com" };
    const token = generateToken(user);
    const tampered = token.slice(0, -5) + "xyz12";

    expect(() => verifyToken(tampered)).toThrow();
  });

  it("throws when verifying an invalid format token", () => {
    expect(() => verifyToken("invalid.token.string")).toThrow();
  });
});
