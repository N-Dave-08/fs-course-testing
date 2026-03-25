import { act, renderHook } from "@testing-library/react";
import { describe } from "vitest";
import useCounter from "../../hooks/useCounter";

describe("useCounter Hook", () => {
  test("initializes with default value", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  test("initializes with custom value", () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  test("increments count", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test("decrements count", () => {
    const { result } = renderHook(() => useCounter(2));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(1);
  });

  test("resets count", () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });
});
