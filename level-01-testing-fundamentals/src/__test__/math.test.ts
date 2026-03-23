import { describe } from "@jest/globals";
import { add } from "../math";
import { test } from "@jest/globals";
import { expect } from "@jest/globals";

describe("add function", () => {
  test("adds two positive numbers correctly", () => {
    const a = 5;
    const b = 3;
    const expected = 8;

    const result = add(a, b);

    expect(result).toBe(expected);
  });

  test("adds negative numbers correctly", () => {
    const a = -5;
    const b = -3;
    const expected = -8;

    const result = add(a, b);

    expect(result).toBe(expected);
  });

  test("adds positive and negative correctly", () => {
    const a = 5;
    const b = -3;
    const expected = 2;

    const result = add(a, b);

    expect(result).toBe(expected);
  });
});
