import request from "supertest";
import app, { resetTestState } from "../../app";
import { describe } from "@jest/globals";
import { beforeEach } from "@jest/globals";
import { test } from "@jest/globals";
import { expect } from "@jest/globals";

describe("Users API", () => {
  beforeEach(() => resetTestState());

  test("GET /api/users return users", async () => {
    const res = await request(app).get("/api/users").expect(200);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("POST /api/users create users", async () => {
    const newUser = {
      name: "Test User",
      email: "test@example.com",
    };

    const res = await request(app).post("/api/users").send(newUser).expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe(newUser.name);
  });
});
