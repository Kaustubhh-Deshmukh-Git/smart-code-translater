import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("HTTP API integration tests", () => {
  beforeAll(() => {
    process.env.NODE_ENV = "test";
    process.env.JWT_SECRET = "test-secret-key-123456789";
  });

  describe("GET /api/health", () => {
    it("returns 200 with health metadata envelope", async () => {
      const res = await request(app).get("/api/health");
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe("ok");
      expect(typeof res.body.data.uptime).toBe("number");
      expect(typeof res.body.data.mongo).toBe("boolean");
    });
  });

  describe("Unknown route handling", () => {
    it("returns 404 envelope for unregistered endpoints", async () => {
      const res = await request(app).get("/api/not-a-real-route");
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("Route not found");
    });
  });

  describe("POST /api/code/translate authentication", () => {
    it("returns 401 without bearer token", async () => {
      const res = await request(app).post("/api/code/translate").send({
        code: 'print("hi")',
        sourceLanguage: "python",
        targetLanguage: "java",
      });
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("Please log in to access this route.");
    });
  });

  describe("POST /api/auth/register input validation", () => {
    it("returns 400 with validation failure message for invalid body", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "",
        email: "invalid-email",
        password: "1",
      });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(typeof res.body.message).toBe("string");
      expect(res.body.message.length).toBeGreaterThan(0);
    });
  });
});
