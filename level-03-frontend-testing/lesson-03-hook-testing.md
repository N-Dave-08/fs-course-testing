# Lesson 3: Hook Testing (Long-form Enhanced)

> Hook tests are great when a hook is truly a reusable unit of logic (state machines, async flows, derived state). This lesson focuses on testing the hook’s *contract* with `renderHook`, and knowing when to test via components instead.

## Table of Contents

- When hook tests are worth it (vs component tests)
- `renderHook` + `act` basics
- Context wrappers (provider pattern)
- Async hook behavior (effects/promises)
- Best practices, pitfalls, troubleshooting
- Advanced patterns (preview): fake timers, MSW for data hooks, contract thinking

## Learning Objectives

By the end of this lesson, you will be able to:
- Test custom hooks using `renderHook` and `act`
- Assert state updates and returned hook API contracts
- Test hooks that depend on context using wrapper components
- Handle async hook behavior (promises, effects) safely
- Avoid common pitfalls (missing `act`, testing hooks that should be tested via components)

## Why Hook Testing Matters

Custom hooks often contain:
- shared state logic
- data fetching logic
- derived state and memoization rules

Testing hook behavior directly can be faster and clearer than testing via a full component—when the hook is a true reusable unit.

```mermaid
flowchart LR
  hook[CustomHook] --> state[StateAndActions]
  state --> component[ComponentsReuseHook]
```

## Testing Custom Hooks

```typescript
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

test("increments counter", () => {
  const { result } = renderHook(() => useCounter(0));

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

### Why `act` is required

`act` ensures React flushes updates and effects before you assert.
Without it, tests can become flaky or fail with warnings.

## Testing Hooks with Context (Wrapper Pattern)

If your hook uses context, provide a wrapper that renders the provider:

```typescript
import { renderHook } from "@testing-library/react";

test("uses context value", () => {
  const mockUser = { id: "1", email: "test@example.com" };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider value={{ user: mockUser }}>{children}</AuthProvider>
  );

  const { result } = renderHook(() => useAuth(), { wrapper });
  expect(result.current.user).toBe(mockUser);
});
```

### Tip: test your provider separately when possible

If your provider has logic (login/logout, refresh token, etc.), consider:
- component tests for provider behavior
- hook tests for the hook API contract

## Testing Async Hook Behavior

If a hook updates after a promise resolves (e.g., data fetching), you need async waits.
A common approach:
- trigger the async action
- wait for the hook state to update (pattern varies by library/version)

Key rule: don’t assert immediately after starting async work.

## Real-World Scenario: `useAuth` Hook

A realistic `useAuth` hook might expose:
- `user`
- `login()`
- `logout()`
- `loading`
- `error`

Hook tests can validate:
- calling `login()` updates state
- errors are surfaced correctly
- `logout()` clears user state

## Best Practices

### 1) Test hook contracts, not internal implementation

Assert what the hook returns and how it changes over time.

### 2) Prefer component tests when UI behavior is the goal

If a hook is only used by one component and is UI-driven, a component test may be more valuable.

### 3) Keep hook APIs small and stable

Large hook APIs are hard to test and maintain.

## Common Pitfalls and Solutions

### Pitfall 1: Missing `act`

**Problem:** warnings and flaky assertions.

**Solution:** wrap state updates in `act`.

### Pitfall 2: Over-testing hooks

**Problem:** you test trivial hooks directly, adding maintenance cost.

**Solution:** focus on hooks with real logic (state machines, async, derived state).

### Pitfall 3: Context wrapper drift

**Problem:** wrapper doesn’t match real provider setup.

**Solution:** create reusable test wrappers that mirror app providers.

## Troubleshooting

### Issue: Hook tests fail with React “act” warnings

**Symptoms:**
- console warnings about updates not wrapped in `act`

**Solutions:**
1. Wrap updates in `act`.
2. For async updates, await the async work and then assert after updates flush.

## Advanced Patterns (Preview)

### 1) Fake timers for time-based hooks

If a hook uses timers, fake timers keep tests fast and deterministic.

### 2) MSW for data-fetching hooks (concept)

When hooks fetch data, MSW can mock the network boundary consistently across tests.

### 3) Contract-first testing

Test what the hook returns and guarantees (state + actions + error behavior) rather than implementation details.

## Next Steps

Now that you can test hooks:

1. ✅ **Practice**: Write hook tests for a custom hook’s contract (state + actions)
2. ✅ **Experiment**: Add a wrapper provider and verify context-driven behavior
3. 📖 **Next Level**: Move into backend and integration testing
4. 💻 **Complete Exercises**: Work through [Exercises 03](./exercises-03.md)

## Additional Resources

- [Testing Library: React Hooks Testing](https://testing-library.com/docs/react-testing-library/api/#renderhook)

---

**Key Takeaways:**
- Use `renderHook` + `act` to test stateful hooks reliably.
- Provide context via wrapper components for hooks that depend on providers.
- Test hook contracts (what the hook returns/does), not internal details.
