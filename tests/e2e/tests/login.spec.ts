import { expect, test } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { TEST_USERS, TEST_DATA } from '../testData/testData';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage('https://example.com/login'); // Replace with actual URL
  });

  test('should login with valid credentials', async ({ page }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.login(TEST_USERS.VALID_USER.username, TEST_USERS.VALID_USER.password);
    });

    await test.step('Verify successful login', async () => {
      await expect(page).toHaveURL(/dashboard/);
    });
  });

  test('should show error with invalid credentials', async () => {
    await test.step('Attempt login with invalid credentials', async () => {
      await loginPage.login(TEST_USERS.INVALID_USER.username, TEST_USERS.INVALID_USER.password);
    });

    await test.step('Verify error message', async () => {
      const errorMsg = await loginPage.getErrorMessage();
      expect(errorMsg).toContain(TEST_DATA.ERROR_MESSAGES.INVALID_CREDENTIALS);
    });
  });
});