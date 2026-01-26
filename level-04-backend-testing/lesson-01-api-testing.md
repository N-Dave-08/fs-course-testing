# Lesson 1: API Testing (Long-form Enhanced)

> API tests validate the contract clients rely on: status codes, JSON shapes, headers, and auth/validation behaviors. This lesson focuses on making API tests deterministic and meaningful (not brittle snapshots of dynamic data).

## Table of Contents

- What API tests validate (contract testing)
- Testing success + failure paths (4xx/5xx)
- Auth and authorization cases (401 vs 403)
- Writing stable assertions (shape over exact data)
- Best practices, pitfalls, troubleshooting
- Advanced patterns (preview): seeded test data, error shape contracts, CI isolation

## Learning Objectives

By the end of this lesson, you will be able to:
- Write API tests for Express routes using HTTP-level assertions
- Test request/response behavior (status codes, JSON shape, headers)
- Test validation and error responses (4xx vs 5xx)
- Test authentication and authorization flows
- Avoid common pitfalls (testing implementation details, unstable test data, brittle assumptions)

## Why API Testing Matters

API tests give high confidence because they validate the contract clients rely on:
- status codes
- response body shape
- auth requirements
- validation errors

They also catch integration issues that pure unit tests can’t.

```mermaid
flowchart LR
  test[Test] --> http[HTTPRequest]
  http --> app[ExpressApp]
  app --> res[HTTPResponse]
  res --> assert[Assertions]
```

## Testing Express Routes (GET)

```typescript
import request from "supertest";
import app from "../src/server";

test("GET /users returns users", async () => {
  const response = await request(app).get("/users").expect(200);

  expect(response.body).toHaveProperty("users");
});
```

### What to assert

Good assertions:
- status code
- JSON shape (required fields)
- key headers (content-type)

Avoid over-asserting exact lists unless the list content is deterministic.

## Testing POST Requests (Create)

```typescript
import request from "supertest";
import app from "../src/server";

test("POST /users creates user", async () => {
  const response = await request(app)
    .post("/users")
    .send({ name: "Alice", email: "alice@example.com" })
    .expect(201);

  expect(response.body.user).toHaveProperty("id");
});
```

### Test invalid input too

Make sure you cover:
- missing fields
- invalid email format
- unexpected field types

These are common real-world failure cases.

## Testing Authentication (401) and Authorization (403)

```typescript
import request from "supertest";
import app from "../src/server";

test("GET /protected requires auth", async () => {
  await request(app).get("/protected").expect(401);
});

test("GET /protected with token succeeds", async () => {
  const token = "valid-token";
  await request(app)
    .get("/protected")
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
});
```

### Important

For realistic auth tests, generate tokens the same way your app does (or use a test helper) so you don’t hardcode magic tokens.

## Real-World Scenario: Keeping Frontend and Backend in Sync

If you change an error response shape or status code, frontend behavior can break.
API tests catch that contract break early, before users do.

## Best Practices

### 1) Test the contract, not internal implementation

API tests should act like a client.

### 2) Use deterministic test data

Seed known data or reset DB state per test to avoid flaky results.

### 3) Cover both success and failure paths

At minimum:
- happy path
- invalid input (400)
- unauthenticated (401)
- unauthorized (403)
- not found (404)

## Common Pitfalls and Solutions

### Pitfall 1: Tests depend on production database

**Problem:** tests are slow and can damage data.

**Solution:** use a dedicated test DB and reset state between tests.

### Pitfall 2: Over-asserting dynamic values

**Problem:** tests fail due to timestamps/IDs changing.

**Solution:** assert types/shapes and stable fields; avoid exact matches for dynamic values.

### Pitfall 3: Not testing error responses

**Problem:** client UX breaks on validation/auth failures.

**Solution:** write explicit tests for 4xx responses and error body shape.

## Troubleshooting

### Issue: Tests are flaky in CI

**Symptoms:**
- tests pass locally but fail randomly in CI

**Solutions:**
1. Ensure DB is reset/isolated per test.
2. Avoid relying on test order.
3. Avoid real network calls in API tests.

## Advanced Patterns (Preview)

### 1) Seeded/controlled test data

When you need deterministic lists, seed fixtures per test (or per describe block) so assertions don’t depend on previous runs.

### 2) Error shape contract tests

If your backend guarantees a consistent error shape, write tests that enforce it for:
- validation errors (400)
- auth failures (401/403)
- not found (404)

### 3) CI isolation mindset

In CI, you often run tests in parallel. Isolation must be explicit:
- unique DB per job (or strict reset)
- no shared ports
- no reliance on external network

## Next Steps

Now that you can write API tests:

1. ✅ **Practice**: Add tests for 400/401/403/404 behaviors
2. ✅ **Experiment**: Assert on consistent error response shape
3. 📖 **Next Lesson**: Learn about [Supertest](./lesson-02-supertest.md)
4. 💻 **Complete Exercises**: Work through [Exercises 04](./exercises-04.md)

## Additional Resources

- [Supertest](https://github.com/ladjs/supertest)
- [Express testing guide](https://expressjs.com/en/advanced/best-practice-performance.html)

---

**Key Takeaways:**
- API tests validate the contract your clients depend on.
- Cover both success and failure paths (validation/auth/not-found).
- Keep test data deterministic and tests independent to avoid flakiness.
