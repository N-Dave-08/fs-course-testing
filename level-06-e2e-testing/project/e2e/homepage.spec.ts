import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Next.js/);
  });

  test("navigation works", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /about/i }).click();
    await expect(page).toHaveURL(/.*about/);
  });

  test("interactions work", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: /click/i });
    await button.click();
    await expect(page.getByText(/success/i)).toBeVisible();
  });
});
