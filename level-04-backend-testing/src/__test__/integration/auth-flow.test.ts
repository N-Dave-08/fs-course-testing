import request from "supertest";
import app, { resetTestState } from "../../app";
import { describe } from "@jest/globals";
import { beforeEach } from "@jest/globals";
import { test } from "@jest/globals";
import { expect } from "@jest/globals";

describe("Authentocation Flow Integration", () => {
  beforeEach(() => resetTestState());

  test("full auth cycle: denail, login, and access", async () => {
    await request(app).get("/api/users/me").expect(401);

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "user@example.com", password: "password123" })
      .expect(200);

    const token = loginRes.body.data.token;

    expect(token).toBeDefined();
    expect(typeof token).toBe("string");

    const authRes = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(authRes.body.success).toBe(true);
    expect(authRes.body.data).toHaveProperty("email", "user@example.com");
  });
});
