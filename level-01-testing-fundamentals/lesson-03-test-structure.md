# Lesson 3: Test Structure (Long-form Enhanced)

> As your codebase grows, tests become a system. This lesson focuses on structure (describe blocks, hooks, async patterns) so your suite stays readable and deterministic instead of flaky and confusing.

## Table of Contents

- Organizing behavior with nested `describe`
- Setup/teardown hooks (what runs when)
- Reliable async tests (and common failure modes)
- Keeping suites maintainable at scale
- Best practices, pitfalls, troubleshooting
- Advanced patterns (preview): test data builders, time control, resource cleanup

## Learning Objectives

By the end of this lesson, you will be able to:
- Structure tests using nested `describe` blocks for clarity
- Use setup/teardown hooks (`beforeAll`, `beforeEach`, `afterEach`, `afterAll`) correctly
- Write reliable async tests (promises, async/await)
- Keep tests readable and maintainable as the suite grows
- Avoid common pitfalls (shared state in `beforeAll`, leaking resources, async tests that “pass” incorrectly)

## Why Test Structure Matters

As your codebase grows, test quality depends on:
- organization (where to find tests)
- clarity (what behavior is covered)
- reliability (no shared state leaks)

Poor structure leads to:
- duplicated setup
- confusing failures
- flakiness and slow suites

## Describe Blocks (Organize by Unit of Behavior)

Group related tests:

```typescript
describe("UserService", () => {
  describe("createUser", () => {
    it("should create a user with valid data", () => {});
    it("should throw when email is invalid", () => {});
  });

  describe("getUser", () => {
    it("should return user by id", () => {});
    it("should return null if not found", () => {});
  });
});
```

### Practical organization tips

- outer `describe`: module/class/feature
- inner `describe`: method/function or endpoint
- `it`: single behavior under a specific condition

## Setup and Teardown (Hooks)

Hooks help you reuse setup code and ensure clean state.

```typescript
describe("Database Tests", () => {
  beforeAll(() => {
    // Run once before all tests in this block
    // Example: connect to a test DB
  });

  beforeEach(() => {
    // Run before each test
    // Example: reset database tables
  });

  afterEach(() => {
    // Run after each test
    // Example: cleanup mocks
  });

  afterAll(() => {
    // Run once after all tests in this block
    // Example: disconnect from DB
  });
});
```

### The most common mistake: state in `beforeAll`

If you create shared mutable state in `beforeAll`, tests can affect each other.
Prefer per-test setup when state changes.

## Async Tests (Do It Correctly)

Async tests should await the operation under test:

```typescript
it("should fetch data", async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});
```

### Common async pitfall

If you forget to `await` (or return the promise), the test can finish before the async work runs.

## Real-World Scenario: Testing a Service with Dependencies

Typical structure:
- outer describe: `AuthService`
- inner describe: `login`
- hooks: reset mocks and fake DB state
- tests: valid login, invalid password, locked account, etc.

Good structure makes failures easy to locate and fix.

## Best Practices

### 1) Keep tests close to the code they validate

Choose a consistent convention (e.g., `src/foo.test.ts` or `tests/foo.test.ts`) and apply it everywhere.

### 2) Clean up resources

Close DB connections, stop servers, and restore mocks to avoid leaking state across suites.

### 3) Keep “arrange” local where possible

Prefer building state in each test over relying on shared state across tests.

## Common Pitfalls and Solutions

### Pitfall 1: Global shared state

**Problem:** tests pass locally but fail in CI or in random order.

**Solution:** reset state in `beforeEach`, avoid shared mutable variables.

### Pitfall 2: Leaking handles (tests never exit)

**Problem:** Jest hangs after tests finish.

**Solution:** close servers, DB clients, and timers; ensure `afterAll` cleans up.

### Pitfall 3: Async tests that silently pass

**Problem:** missing `await` lets tests pass even when the code is broken.

**Solution:** always `await` async calls and assert results/errors.

## Troubleshooting

### Issue: Jest process doesn’t exit

**Symptoms:**
- “Jest did not exit one second after the test run has completed”

**Solutions:**
1. Close DB connections and servers in `afterAll`.
2. Clear timers and intervals.
3. Remove dangling event listeners or open handles.

## Advanced Patterns (Preview)

### 1) Test data builders (reduce duplication)

As suites grow, repeated “arrange” code becomes noise. Builders let you create clean defaults and override only what matters.

### 2) Control time (fake timers)

If code depends on timeouts/intervals, use fake timers so tests are fast and deterministic.

### 3) Resource cleanup is non-negotiable

If you open DB connections, servers, or file handles in tests, you must close them (usually in `afterAll`) or your suite will hang in CI.

## Next Steps

Now that you can structure tests well:

1. ✅ **Practice**: Organize a feature’s tests with nested describes
2. ✅ **Experiment**: Add setup/teardown hooks and verify tests are order-independent
3. 📖 **Next Level**: Move into Jest fundamentals and unit testing
4. 💻 **Complete Exercises**: Work through [Exercises 01](./exercises-01.md)

## Additional Resources

- [Jest Docs: Setup and Teardown](https://jestjs.io/docs/setup-teardown)

---

**Key Takeaways:**
- Good structure makes tests readable, maintainable, and debuggable.
- Use hooks to manage setup/cleanup without creating shared mutable state.
- Async tests must await promises to avoid false positives.
