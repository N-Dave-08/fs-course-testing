// calculates the factorial of a number
export function factorial(n: number): number {
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers");
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

// validates email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// formats a number as currency
export function formatCurrency(
  amount: number,
  currency: string = "USD",
): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative");
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

// clamps a number betwwen min and max
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error("Min cannot be greater than max");
  }
  return Math.min(Math.max(value, min), max);
}
