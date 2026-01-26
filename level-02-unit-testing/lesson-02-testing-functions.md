# Lesson 2: Testing Functions (Long-form Enhanced)

> Functions are the smallest unit of behavior. This lesson focuses on testing pure functions, testing side effects via dependency injection, and choosing edge cases that actually prevent regressions.

## Table of Contents

- Pure functions (ideal unit test targets)
- Side effects + dependency injection
- Edge cases (boundary conditions)
- Choosing strong assertions (values, shapes, errors)
- Best practices, pitfalls, troubleshooting
- Advanced patterns (preview): property tests, table tests, test data builders

## Learning Objectives

By the end of this lesson, you will be able to:
- Test pure functions with clear inputs/outputs
- Test functions with side effects by injecting dependencies
- Write edge-case tests that prevent regressions
- Choose good assertions (exact values, shape, errors)
- Avoid common pitfalls (testing internals, not covering boundaries, too much mocking)

## Why Function Tests Matter

Functions are the smallest unit of behavior.
Well-tested functions:
- are easy to refactor
- reduce regressions
- clarify expected behavior (including edge cases)

## Pure Functions (Ideal Unit Test Targets)

Pure functions are easy to test because:
- same input → same output
- no external dependencies
- no mutation of global state

```typescript
function calculateTotal(items: number[]): number {
  return items.reduce((sum, item) => sum + item, 0);
}

it("should calculate total", () => {
  expect(calculateTotal([1, 2, 3])).toBe(6);
});
```

### Add edge cases for robustness

```typescript
it("should return 0 for empty list", () => {
  expect(calculateTotal([])).toBe(0);
});
```

## Functions with Side Effects (Dependency Injection)

Side effects include:
- database writes
- HTTP calls
- file system writes
- time-based behavior

To test these, inject dependencies so you can control them.

```typescript
type User = { name: string };
type Database = { save: (user: User) => unknown };

function saveUser(user: User, db: Database) {
  return db.save(user);
}

it("should save user", () => {
  const mockDb: Database = {
    save: jest.fn(),
  };

  saveUser({ name: "Alice" }, mockDb);

  expect(mockDb.save).toHaveBeenCalledWith({ name: "Alice" });
});
```

### Why injection is important

If the function creates its own DB client internally, your tests become slower and harder to isolate.

## Edge Cases (Boundary Conditions)

Edge cases often cause production bugs:
- “exactly 100”
- empty input
- null/undefined (if allowed)
- large values

```typescript
function calculateDiscount(total: number): number {
  if (total > 100) return total * 0.1;
  return 0;
}

describe("calculateDiscount", () => {
  it("should apply discount for orders over 100", () => {
    expect(calculateDiscount(150)).toBe(15);
  });

  it("should return 0 for orders under 100", () => {
    expect(calculateDiscount(50)).toBe(0);
  });

  it("should handle exactly 100", () => {
    expect(calculateDiscount(100)).toBe(0);
  });
});
```

## Real-World Scenario: Pricing Bugs

Pricing and discount logic is classic “small bug, big impact”.
Unit tests around boundary cases protect revenue and user trust.

## Best Practices

### 1) Prefer pure functions for complex logic

Push business logic into pure functions and keep side effects at the edges.

### 2) Test behavior, not implementation

Assert outcomes (return value, error, calls to dependencies), not internal steps.

### 3) Name tests like requirements

A good test name should read like a sentence.

## Common Pitfalls and Solutions

### Pitfall 1: Not testing boundaries

**Problem:** bugs happen at “exactly” values and empty inputs.

**Solution:** add explicit boundary tests.

### Pitfall 2: Hard-coded dependencies

**Problem:** function creates DB clients internally; tests are slow and brittle.

**Solution:** inject dependencies as parameters.

### Pitfall 3: Over-mocking

**Problem:** you mock everything and miss integration issues.

**Solution:** keep unit tests focused, but also maintain integration tests for key boundaries.

## Troubleshooting

### Issue: Tests are hard to write because functions do “too much”

**Symptoms:**
- many mocks needed
- complex setup

**Solutions:**
1. Split functions into pure logic + side-effect wrapper.
2. Inject dependencies and pass state explicitly.

## Advanced Patterns (Preview)

### 1) Table-driven tests

When you have many similar cases (input → expected output), a small table keeps tests concise and readable.

### 2) Test data builders

Builders reduce repetitive setup and make it easier to express “only what matters” for the case.

### 3) Property-based testing (concept)

For some logic (parsers, validation, transforms), property tests can generate many cases automatically to catch edge bugs you didn’t think of.

## Next Steps

Now that you can test functions effectively:

1. ✅ **Practice**: Identify a “business logic” function and add boundary tests
2. ✅ **Experiment**: Refactor a side-effect-heavy function to inject dependencies
3. 📖 **Next Lesson**: Learn about [Mocking](./lesson-03-mocking.md)
4. 💻 **Complete Exercises**: Work through [Exercises 02](./exercises-02.md)

## Additional Resources

- [Jest Docs: Mock Functions](https://jestjs.io/docs/mock-functions)

---

**Key Takeaways:**
- Pure functions are ideal unit test targets.
- Inject dependencies to test side effects without real external systems.
- Edge cases (boundaries, empty inputs) prevent many production bugs.
