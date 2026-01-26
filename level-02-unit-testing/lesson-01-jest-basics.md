# Lesson 1: Jest Basics (Long-form Enhanced)

> Jest is the workhorse test runner for many TypeScript projects. This lesson focuses on the core pieces you’ll use daily: matchers, error assertions, and writing tests that actually protect behavior.

## Table of Contents

- Jest building blocks (`describe`/`it`/`expect`)
- High-value matchers (`toBe` vs `toEqual`, etc.)
- Testing errors (sync + async)
- Best practices, pitfalls, troubleshooting
- Advanced patterns (preview): custom matchers, table tests, avoiding weak assertions

## Learning Objectives

By the end of this lesson, you will be able to:
- Write basic Jest tests using `describe`, `it`, and `expect`
- Use common matchers (`toBe`, `toEqual`, `toContain`, `toHaveLength`, `toThrow`)
- Understand deep equality vs reference equality
- Test errors reliably (sync and async)
- Avoid common pitfalls (wrong matcher, testing the wrong thing, weak assertions)

## Why Jest Matters

Jest is a widely used JavaScript/TypeScript testing framework.
It provides:
- a test runner (find/run tests)
- assertions (`expect`)
- mocking utilities (covered later)

The goal is not memorizing every matcher—it's writing tests that clearly describe behavior.

## Core Building Blocks

- `describe(name, fn)`: group tests for a unit/feature
- `it(name, fn)` / `test(name, fn)`: a single test case
- `expect(value)`: build assertions

## Matchers (Common + High Value)

```typescript
expect(value).toBe(4); // exact equality (Object.is)
expect(value).toEqual({ a: 1 }); // deep equality (object shape/content)
expect(value).toBeTruthy(); // truthy check (use sparingly)
expect(value).toBeFalsy(); // falsy check (use sparingly)
expect(value).toBeDefined(); // not undefined
expect(value).toBeNull(); // exactly null
expect(value).toContain("item"); // array/string contains
expect(value).toHaveLength(3); // length
```

### `toBe` vs `toEqual` (Important)

- `toBe` is for primitives or exact reference identity
- `toEqual` is for comparing object contents

```typescript
expect({ a: 1 }).toEqual({ a: 1 }); // ✅
expect({ a: 1 }).toBe({ a: 1 }); // ❌ (different references)
```

## Testing Functions (Simple Example)

```typescript
function add(a: number, b: number): number {
  return a + b;
}

describe("add", () => {
  it("should add two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

### Make assertions meaningful

Avoid tests that don't assert anything meaningful (or only assert “defined”).
Prefer checking exact outputs and edge cases.

## Testing Errors (Sync)

```typescript
function divide(a: number, b: number): number {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

it("should throw when dividing by zero", () => {
  expect(() => divide(10, 0)).toThrow("Division by zero");
});
```

## Testing Errors (Async)

If a function returns a promise and rejects, use `rejects`:

```typescript
await expect(asyncFn()).rejects.toThrow("some error");
```

## Real-World Scenario: Safer Refactors

If you have a solid Jest suite:
- you can refactor logic confidently
- bugs show up immediately in CI
- test output points to the exact behavior that changed

## Best Practices

### 1) Prefer specific assertions

“Truthy” assertions can hide bugs. Prefer `toBe(true)` or exact checks when possible.

### 2) Test edge cases

Add tests for:
- empty arrays/strings
- invalid input
- boundary values

### 3) Keep tests readable

Test names should read like requirements.

## Common Pitfalls and Solutions

### Pitfall 1: Using the wrong matcher

**Problem:** comparing objects with `toBe`.

**Solution:** use `toEqual` for objects/arrays.

### Pitfall 2: Weak assertions

**Problem:** `expect(result).toBeDefined()` for complex behavior.

**Solution:** assert the actual value/shape you care about.

### Pitfall 3: Testing implementation details

**Problem:** tests break on refactor even if behavior stays correct.

**Solution:** test outputs and observable behavior.

## Troubleshooting

### Issue: Tests are failing intermittently

**Symptoms:**
- failures appear randomly

**Solutions:**
1. Remove shared state between tests.
2. Avoid reliance on real time; use fake timers when needed.
3. Ensure async tests properly `await`.

## Advanced Patterns (Preview)

### 1) Table-driven tests (reduce duplication)

When you have many similar cases, use a small table of inputs/expected outputs to keep tests concise.

### 2) Custom matchers (when it improves clarity)

For complex assertions, custom matchers can make failure messages clearer—use them sparingly.

### 3) Avoid weak assertions

Assertions like “defined” or “truthy” can hide bugs. Prefer exact outputs and behavior-focused checks.

## Next Steps

Now that you know Jest basics:

1. ✅ **Practice**: Write tests for a pure function and its edge cases
2. ✅ **Experiment**: Add a failing test first, then fix the code (TDD loop)
3. 📖 **Next Lesson**: Learn about [Testing Functions](./lesson-02-testing-functions.md)
4. 💻 **Complete Exercises**: Work through [Exercises 02](./exercises-02.md)

## Additional Resources

- [Jest Docs: Using Matchers](https://jestjs.io/docs/using-matchers)

---

**Key Takeaways:**
- Use `describe`/`it`/`expect` to express behavior as executable specs.
- Know `toBe` vs `toEqual` to avoid incorrect comparisons.
- Prefer meaningful, specific assertions and cover edge cases.
