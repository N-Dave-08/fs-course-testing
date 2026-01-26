# Lesson 2: Testing Concepts (Long-form Enhanced)

> Tools change, but the fundamentals that make tests valuable don’t. This lesson focuses on writing tests that are readable, deterministic, and resilient during refactors.

## Table of Contents

- AAA (Arrange–Act–Assert) as a readability pattern
- Test isolation (order-independent tests)
- Naming tests as “behavior specs”
- Coverage: what it does and doesn’t mean
- Best practices, pitfalls, troubleshooting
- Advanced patterns (preview): flake reduction, mocking boundaries, contract thinking

## Learning Objectives

By the end of this lesson, you will be able to:
- Use Arrange–Act–Assert (AAA) to write readable tests
- Keep tests isolated and deterministic (no hidden shared state)
- Write descriptive test names that act like documentation
- Understand what test coverage does and does not tell you
- Recognize common pitfalls (testing implementation details, over-mocking, brittle tests)

## Why These Concepts Matter

Tools (Jest, RTL, Playwright) change over time, but fundamentals don’t.

When tests fail, good tests:
- explain what broke
- fail for the right reason
- are easy to fix

Bad tests:
- are flaky
- fail with unclear messages
- slow down teams

## Arrange–Act–Assert (AAA)

AAA is a structure that makes tests readable:
- **Arrange**: set up inputs and state
- **Act**: execute the behavior
- **Assert**: verify outcomes

```typescript
it("should add two numbers", () => {
  // Arrange
  const a = 1;
  const b = 2;

  // Act
  const result = add(a, b);

  // Assert
  expect(result).toBe(3);
});
```

### Why AAA helps

When a test fails, you can quickly see:
- what the setup was
- what the behavior under test is
- what expectation was violated

## Test Isolation (Independence)

Each test should be independent and order-agnostic.

```typescript
// Bad: Tests depend on each other
let counter = 0;
it("should increment", () => {
  counter++;
  expect(counter).toBe(1);
});
it("should increment again", () => {
  counter++;
  expect(counter).toBe(2); // Depends on previous test
});

// Good: Tests are independent
it("should increment", () => {
  let counter = 0;
  counter++;
  expect(counter).toBe(1);
});
```

### Rule of thumb

If running tests in a different order changes results, isolation is broken.

## Test Naming (Human-Readable Specs)

Bad names hide intent:

```typescript
it("test 1", () => {});
```

Good names describe behavior and conditions:

```typescript
it("should return user when valid id is provided", () => {});
it("should return null when user does not exist", () => {});
it("should throw when email is invalid", () => {});
```

### Naming pattern tip

Use: `should <expected behavior> when <condition>`

## Coverage (Useful, Not a Goal)

Coverage answers: “Which lines/branches ran during tests?”

It does not guarantee:
- correct assertions
- correct edge cases
- meaningful behavior tests

Aim for:
- **high coverage of critical paths** (auth, payments, core workflows)
- **meaningful tests** over 100% coverage
- **behavior-focused tests** over implementation detail tests

## Real-World Scenario: Refactoring Without Fear

If tests assert behavior:
- you can refactor internals freely
- tests remain stable

If tests assert implementation details:
- refactors cause many test changes
- teams stop refactoring and technical debt grows

## Best Practices

### 1) Prefer behavior assertions

Test inputs/outputs and user-visible outcomes.

### 2) Keep tests deterministic

Avoid reliance on:
- time
- random values
- network
- shared global state

### 3) Mock at boundaries

Mock external dependencies (HTTP, DB, clock), not your own core logic.

## Common Pitfalls and Solutions

### Pitfall 1: Testing implementation details

**Problem:** tests break on refactor even though behavior is unchanged.

**Solution:** assert behavior and outcomes, not internal calls.

### Pitfall 2: Over-mocking

**Problem:** tests pass but system fails in real integration.

**Solution:** keep integration tests for key boundaries and don’t mock everything.

### Pitfall 3: Shared state leaks

**Problem:** tests pass/fail depending on run order.

**Solution:** reset state in `beforeEach` and avoid global mutation.

## Troubleshooting

### Issue: Flaky tests

**Symptoms:**
- tests fail intermittently

**Solutions:**
1. Remove timers/sleeps; use deterministic waits or fake timers where appropriate.
2. Reset global/shared state between tests.
3. Avoid relying on network or filesystem unless the test is explicitly integration/e2e.

## Advanced Patterns (Preview)

### 1) Flake reduction strategy (concept)

If a test is flaky, don’t “slow it down” with sleeps. Usually you need:
- deterministic setup/teardown
- fake timers where appropriate
- isolation from global/shared state

### 2) Mocking boundaries (not everything)

Mocking is powerful, but over-mocking creates brittle tests.
Rule of thumb: mock **outside** your unit boundary (network, filesystem), not internal helpers you’re actively refactoring.

### 3) Contract thinking

Good tests describe a contract:
- inputs
- outputs
- error behavior
This makes failures actionable and prevents tests from becoming noise.

## Next Steps

Now that you understand core testing concepts:

1. ✅ **Practice**: Rewrite 3 tests to use AAA and better names
2. ✅ **Experiment**: Identify and remove shared state between tests
3. 📖 **Next Lesson**: Learn about [Test Structure](./lesson-03-test-structure.md)
4. 💻 **Complete Exercises**: Work through [Exercises 01](./exercises-01.md)

## Additional Resources

- [Kent C. Dodds: Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)

---

**Key Takeaways:**
- AAA improves readability and speeds up debugging.
- Isolated tests are order-independent and deterministic.
- Good test names act as documentation.
- Coverage is a signal, not a goal—prioritize meaningful tests.
