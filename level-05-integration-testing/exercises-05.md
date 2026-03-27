# Exercises 05: Integration Testing

## Learning Objectives

By completing these exercises, you will:

- ✅ Write deterministic integration tests that span multiple components
- ✅ Test API flows at the HTTP boundary (Supertest)
- ✅ Reset state safely between tests (avoid order dependence)
- ✅ Practice “contract + state” assertions (response shape + internal state)

## Before You Start

**Prerequisites:**

- Completed Level 4 lessons and exercises (backend testing)
- Supertest installed

**Setup:**

1. Navigate to `fs-course-testing/level-05-integration-testing/`
2. Create `src/__tests__/integration/` directory
3. Reuse the minimal Express app from Level 4 (`src/app.ts`)

---

## Exercise 1: API Integration Flow (CRUD-ish)

**Objective:** Validate a realistic request flow across the HTTP boundary.

**Deliverable:** `src/__tests__/integration/userFlow.test.ts`

**Instructions:**

1. Ensure your `src/app.ts` supports:
   - `POST /api/users` (create)
   - `GET /api/users` (list)
   - (Optional) `PUT /api/users/:id` (update) — if you add it, test it
2. Write a test that:
   - creates a user via POST
   - fetches the list and asserts the user exists
   - uses deterministic state reset in `beforeEach` (via `resetTestState()`)

**Expected test shape (guide):**

```typescript
import request from "supertest";
import app, { resetTestState } from "../../app";

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
```

---

## Exercise 2: Error Flow Integration (400)

**Objective:** Validate error contracts and keep assertions stable.

**Deliverable:** `src/__tests__/integration/errorFlow.test.ts`

**Instructions:**
Write tests that:

1. Send invalid input to `POST /api/users`
2. Assert:
   - `400` status code
   - error response has a stable shape (ex: `{ success: false, error: "..." }`)

**Tip:** Don’t over-assert full strings unless they’re stable by design.

---

## Exercise 3: Auth Integration Flow (401 vs 200)

**Objective:** Test authentication as a boundary.

**Deliverable:** `src/__tests__/integration/authFlow.test.ts`

**Instructions:**
Using the auth stub in `src/app.ts`:

1. Assert `GET /api/users/me` returns 401 without auth header
2. Call `POST /api/auth/login` and capture the token
3. Assert `GET /api/users/me` returns 200 with `Authorization: Bearer <token>`

---

## Optional (Advanced): Real DB-backed Integration

If you already have Prisma + a test database configured (from `fs-course-database`):

- swap the in-memory store in your app for Prisma
- use `TEST_DATABASE_URL`
- reset state in `beforeEach` (delete in FK-safe order / truncate strategy)

This is the “real” integration style used in production systems, but it requires more setup.

---

## Running Exercises

```bash
pnpm test
```

## Verification Checklist

- [x] Tests are order-independent (reset state per test)
- [x] I tested both success and error flows
- [x] Assertions check stable contracts (shape + status)
- [x] Auth flow distinguishes 401 vs 200 correctly

---

**Key Takeaways:**

- Integration tests validate boundaries where many real bugs occur.
- Deterministic reset is the difference between reliable tests and flaky suites.
- Assert contracts (status + shape) rather than brittle dynamic data.
