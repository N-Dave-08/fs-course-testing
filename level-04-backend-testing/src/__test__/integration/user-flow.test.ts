import request from "supertest";
import app, { resetTestState } from "../../app";
import { describe } from "@jest/globals";
import { beforeEach } from "@jest/globals";
import { test } from "@jest/globals";
import { expect } from "@jest/globals";

describe("User Flow Integration", () => {
  beforeEach(() => resetTestState());

  test("create user then appears in list", async () => {
    await request(app)
      .post("/api/users")
      .send({ name: "Test User", email: "test@example.com" })
      .expect(201);

    const res = await request(app).get("/api/users").expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data[0].email).toBe("test@example.com");
  });
});
