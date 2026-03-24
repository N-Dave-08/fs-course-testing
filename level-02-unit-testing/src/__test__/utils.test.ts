import { describe, expect, test } from "@jest/globals";
import { clamp, factorial, formatCurrency, isValidEmail } from "../utils";

describe("factorial", () => {
  test("calculates factorial of 0", () => {
    expect(factorial(0)).toBe(1);
  });

  test("calculates factorial of 1", () => {
    expect(factorial(1)).toBe(1);
  });

  test("calculates factorial of 5", () => {
    expect(factorial(5)).toBe(120);
  });

  test("throws error for negative numbers", () => {
    expect(() => factorial(-1)).toThrow(
      "Factorial is not defined for negative numbers",
    );
  });
});

describe("isValidEmail", () => {
  test("validates correct email", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
  });

  test("rejects invalid email", () => {
    expect(isValidEmail("invalid-email")).toBe(false);
    expect(isValidEmail("test@")).toBe(false);
    expect(isValidEmail("@example.com")).toBe(false);
  });

  test("handles edge cases", () => {
    expect(isValidEmail(" ")).toBe(false);
    expect(isValidEmail("a@b.c")).toBe(true);
  });
});

describe("formatCurrency", () => {
  test("formats USD currency", () => {
    expect(formatCurrency(100)).toBe("$100.00");
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
  });

  test("formats different currencies", () => {
    expect(formatCurrency(100, "EUR")).toContain("100.00");
  });

  test("throws error for negative amounts", () => {
    expect(() => formatCurrency(-10)).toThrow("Amount cannot be negative");
  });
});

describe("clamp", () => {
  test("clamps value within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  test("clamps value below minimum", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  test("clamps value above minimum", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  test("throws error if min > max", () => {
    expect(() => clamp(5, 10, 0)).toThrow("Min cannot be greater than max");
  });
});
