# Exercises 06: E2E Testing

## Learning Objectives

By completing these exercises, you will:
- ✅ Write E2E tests with Playwright
- ✅ Test complete user flows
- ✅ Implement Page Object Model
- ✅ Test real browser interactions
- ✅ Handle async operations
- ✅ Practice E2E testing best practices

## Before You Start

**Prerequisites:**
- Integration testing (Level 5)
- Playwright installed
- Application running
- Understanding of E2E concepts

**Setup:**
1. Navigate to `fs-course-testing/level-06-e2e-testing/`
2. Install: `pnpm add -D @playwright/test`
3. Create `e2e/` directory

---

## Exercise 1: Basic E2E Test

**Objective:** Create basic E2E test.

**Instructions:**
Create `e2e/homepage.spec.ts`:
1. Test homepage loads
2. Test navigation
3. Test basic interactions

**Expected Code Structure:**
```typescript
// e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    // Uses baseURL from playwright.config.ts
    await page.goto('/');
    await expect(page).toHaveTitle(/Next.js/);
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');
    // Prefer role-based locators when possible
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL(/.*about/);
  });

  test('interactions work', async ({ page }) => {
    await page.goto('/');
    const button = page.getByRole('button', { name: /click/i });
    await button.click();
    await expect(page.getByText(/success/i)).toBeVisible();
  });
});
```

**Verification:**
- E2E tests pass
- Browser interactions work
- Navigation works

**File:** `e2e/homepage.spec.ts`

---

## Exercise 2: User Flow

**Objective:** Test complete user flow.

**Instructions:**
Create `e2e/userFlow.spec.ts`:
1. Test registration
2. Test login
3. Test dashboard access

**Expected Code Structure:**
```typescript
// e2e/userFlow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test('complete registration and login flow', async ({ page }) => {
    // Registration
    await page.goto('/register');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/.*login/);

    // Login
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByText(/welcome/i)).toBeVisible();
  });
});
```

**Verification:**
- Complete flow works
- User can register and login
- Dashboard accessible

**File:** `e2e/userFlow.spec.ts`

---

## Exercise 3: Page Object Model

**Objective:** Implement Page Object Model.

**Instructions:**
Create page classes and refactor tests.

**Expected Code Structure:**
```typescript
// e2e/pages/LoginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }
}
```

```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login with page object', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');
  await expect(page).toHaveURL(/.*dashboard/);
});
```

**Verification:**
- Page objects work
- Tests are maintainable
- Code is reusable

**Files:** `e2e/pages/` and `e2e/*.spec.ts`

---

## Running Exercises

```bash
# Install Playwright browsers
npx playwright install

# Run tests
pnpm test:e2e
```

## Verification Checklist

- [ ] E2E tests pass
- [ ] User flows work
- [ ] Page objects work
- [ ] Tests are maintainable
- [ ] All interactions work

## Next Steps

1. ✅ **Review**: Understand E2E testing
2. ✅ **Experiment**: Add more E2E tests
3. 📖 **Complete**: Review all testing levels
4. 💻 **Reference**: Check `project/` folder

---

**Key Takeaways:**
- E2E tests real user flows
- Use Page Object Model
- Test in real browsers
- Handle async operations
- Keep tests maintainable
- Test critical paths

**Good luck! Happy testing!**
