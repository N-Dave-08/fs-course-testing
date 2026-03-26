import request from "supertest";
import app, { resetTestState } from "../../app";
import { describe } from "@jest/globals";
import { beforeEach } from "@jest/globals";
import { test } from "@jest/globals";
import { expect } from "@jest/globals";

describe("Authentication", () => {
  beforeEach(() => resetTestState());

  test("POST /api/users returns users", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "user@example.com", password: "password123" });

    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });

  test("GET /api/users/me requires users", async () => {
    await request(app).get("/api/users/me").expect(401);
  });

  test("GET /api/users/me accepts valid token", async () => {
    await request(app)
      .get("/api/users/me")
      .set("Authorization", "Bearer test-token")
      .expect(200);
  });
});
