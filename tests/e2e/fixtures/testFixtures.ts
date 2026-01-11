import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { EmployeesPage } from '../pageObjects/EmployeesPage';


type TestFixtures = {
  authenticatedPage: Page;
  loginPage: LoginPage;
  employeesPage: EmployeesPage;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await use(lp);
  },
  employeesPage: async ({ page }, use) => {
    const ep = new EmployeesPage(page);
    await use(ep);
  },
 
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(process.env.VALID_USERNAME!, process.env.VALID_PASSWORD!);
    await page.waitForURL(/Prod\/Benefits/);
    await use(page);
  },
});

// Use in tests: test('my test', async ({ authenticatedPage }) => { ... });