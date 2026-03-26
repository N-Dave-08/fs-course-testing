import request from "supertest";
import app, { resetTestState } from "../../app";
import { describe } from "@jest/globals";
import { beforeEach } from "@jest/globals";
import { test } from "@jest/globals";
import { expect } from "@jest/globals";

describe("Database Operations", () => {
  beforeEach(async () => {
    resetTestState();
  });

  test("create user in database", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ email: "test@example.com", name: "Test User" })
      .expect(201);

    expect(res.body.success).toBe(true);
  });

  test("queries user from database", async () => {
    await request(app)
      .post("/api/users")
      .send({ email: "test@example.com", name: "Test" })
      .expect(201);

    const res = await request(app).get("/api/users").expect(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0].email).toBe("test@example.com");
  });
});
