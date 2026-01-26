# Exercises 04: Backend Testing

## Learning Objectives

By completing these exercises, you will:
- ✅ Test API endpoints with Supertest
- ✅ Test authentication flows
- ✅ Test database operations
- ✅ Mock external dependencies
- ✅ Test error handling
- ✅ Practice backend testing patterns

## Before You Start

**Prerequisites:**
- Backend API knowledge
- Supertest installed
- Understanding of Express routes

**Setup:**
1. Navigate to `fs-course-testing/level-04-backend-testing/`
2. Install: `pnpm add -D supertest @types/supertest`
3. Install a minimal Express app dependency:
   - `pnpm add express`
   - `pnpm add -D @types/express`
4. Create directories:
   - `src/`
   - `src/__tests__/`

### Create a minimal app under test

Create `src/app.ts` (simple in-memory store + auth stub for tests):

```typescript
import express from "express";

type User = { id: number; name: string; email: string };

const app = express();
app.use(express.json());

let users: User[] = [];
let nextId = 1;

app.get("/api/users", (_req, res) => {
  res.json({ success: true, data: users });
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body ?? {};
  if (!name || !email) return res.status(400).json({ success: false, error: "Invalid input" });

  const user: User = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json({ success: true, data: user });
});

app.post("/api/auth/login", (_req, res) => {
  // For exercises: return a deterministic token
  res.json({ success: true, data: { token: "test-token" } });
});

app.get("/api/users/me", (req, res) => {
  const auth = String(req.header("Authorization") ?? "");
  if (!auth.startsWith("Bearer ")) return res.sendStatus(401);
  const token = auth.replace("Bearer ", "");
  if (token !== "test-token") return res.sendStatus(401);
  return res.json({ success: true, data: { id: 1, email: "user@example.com", name: "User" } });
});

// Test helper (reset between tests)
export function resetTestState() {
  users = [];
  nextId = 1;
}

export default app;
```

---

## Exercise 1: API Endpoints

**Objective:** Test API endpoints.

**Instructions:**
Create `src/__tests__/api/users.test.ts`:
1. Test GET endpoints
2. Test POST endpoints
3. Test error handling

**Expected Code Structure:**
```typescript
// src/__tests__/api/users.test.ts
import request from 'supertest';
import app, { resetTestState } from '../../app';

describe('Users API', () => {
  beforeEach(() => resetTestState());

  test('GET /api/users returns users', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('POST /api/users creates user', async () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe(newUser.name);
  });
});
```

**Verification:**
- API tests pass
- Endpoints work correctly
- Error handling works

**File:** `src/__tests__/api/users.test.ts`

---

## Exercise 2: Authentication

**Objective:** Test auth flows.

**Instructions:**
Create `src/__tests__/api/auth.test.ts`:
1. Test login endpoint
2. Test protected routes
3. Test token validation

**Expected Code Structure:**
```typescript
// src/__tests__/api/auth.test.ts
import request from 'supertest';
import app, { resetTestState } from '../../app';

describe('Authentication', () => {
  beforeEach(() => resetTestState());

  test('POST /api/auth/login returns token', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@example.com',
        password: 'password123',
      })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
  });

  test('GET /api/users/me requires authentication', async () => {
    await request(app)
      .get('/api/users/me')
      .expect(401);
  });

  test('GET /api/users/me accepts valid token', async () => {
    await request(app)
      .get('/api/users/me')
      .set('Authorization', 'Bearer test-token')
      .expect(200);
  });
});
```

**Verification:**
- Auth tests pass
- Token validation works
- Protected routes work

**File:** `src/__tests__/api/auth.test.ts`

---

## Exercise 3: “Database-like” Integration (Two Options)

**Objective:** Practice deterministic state resets for integration tests.

**Instructions:**
Create `src/__tests__/database/users.test.ts`:
1. Test create operations
2. Test query operations
3. Cleanup between tests (reset state)

**Expected Code Structure:**
```typescript
// src/__tests__/database/users.test.ts
import request from "supertest";
import app, { resetTestState } from "../../app";

describe('Database Operations', () => {
  beforeEach(async () => {
    resetTestState();
  });

  test('creates user in database', async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ email: "test@example.com", name: "Test User" })
      .expect(201);

    expect(res.body.success).toBe(true);
  });

  test('queries user from database', async () => {
    await request(app)
      .post("/api/users")
      .send({ email: "test@example.com", name: "Test" })
      .expect(201);

    const res = await request(app).get("/api/users").expect(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0].email).toBe("test@example.com");
  });
});
```

**Option B (advanced, optional):** If you already have Prisma + a test DB configured (from `fs-course-database`), you can replace the in-memory store with real Prisma and use `TEST_DATABASE_URL` as shown in `lesson-03-database-testing.md`.

**Verification:**
- Database tests pass
- Cleanup works
- Operations work correctly

**File:** `src/__tests__/database/users.test.ts`

---

## Running Exercises

```bash
pnpm test
```

## Verification Checklist

- [ ] API tests pass
- [ ] Auth tests pass
- [ ] Database tests pass
- [ ] Cleanup works
- [ ] All endpoints tested

## Next Steps

1. ✅ **Review**: Understand backend testing
2. ✅ **Experiment**: Add more tests
3. 📖 **Continue**: Move to [Level 5: Integration Testing](../level-05-integration-testing/lesson-01-integration-concepts.md)
4. 💻 **Reference**: Check `project/` folder

---

**Key Takeaways:**
- Use Supertest for API testing
- Test happy paths and errors
- Clean up test data
- Mock external services
- Test authentication flows
- Isolate tests

**Good luck! Happy testing!**
