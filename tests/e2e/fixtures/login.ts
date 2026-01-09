import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';

// Custom fixtures example
type TestFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<TestFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage('https://example.com/login');
    await loginPage.login('user', 'pass');
    await page.waitForURL(/dashboard/);
    await use(page);
  },
});

// Use in tests: test('my test', async ({ authenticatedPage }) => { ... });