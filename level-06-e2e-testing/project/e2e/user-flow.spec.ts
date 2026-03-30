import { test, expect } from "@playwright/test";

test.describe("User Flow", () => {
  test("complete registration and login flow", async ({ page }) => {
    // Registration
    await page.goto("/register");
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*login/);

    // Login
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByText(/welcome/i)).toBeVisible();
  });
});
