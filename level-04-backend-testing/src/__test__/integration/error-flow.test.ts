import request from "supertest";
import app, { resetTestState } from "../../app";
import { describe } from "@jest/globals";
import { beforeEach } from "@jest/globals";
import { test } from "@jest/globals";
import { expect } from "@jest/globals";

describe("error handling integration", () => {
  beforeEach(() => resetTestState());

  test("POST /api/users returns 400 and stable error shape for invalid input", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Incomplete User" })
      .expect(400);

    expect(res.body).toMatchObject({
      success: false,
      error: expect.any(String),
    });
  });
  test("POST /api/users returns 400 for malformed data", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        name: "",
        email: "not-an-email",
      })
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body).toHaveProperty("error");
  });
});
