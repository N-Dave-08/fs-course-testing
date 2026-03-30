import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login-page";
test("login with page object", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("user@example.com", "password123");
  await expect(page).toHaveURL(/.*dashboard/);
});
