import { expect } from '@playwright/test';
import { test } from '../fixtures/login';
import { LoginPage } from '../pageObjects/LoginPage';
import { TEST_USERS, TEST_DATA } from '../testData/testData';

test.describe('Login Tests', () => {

  test.beforeEach(async ({ page, loginPage}) => {
    await loginPage.gotoLoginPage();
    await expect(page).toHaveTitle('Log In - Paylocity Benefits Dashboard');
  });

  test('should login with valid credentials', async ({ page, loginPage }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.login(TEST_USERS.VALID_USER.username, TEST_USERS.VALID_USER.password);
    });
      await expect(page).toHaveURL(/Benefits/);
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await test.step('Attempt login with invalid credentials', async () => {
      await loginPage.login(TEST_USERS.INVALID_USER.username, TEST_USERS.INVALID_USER.password);
    });

    await test.step('Verify error message', async () => {
      const errorMsg = await loginPage.getErrorMessage();
      expect(errorMsg).toContain(TEST_DATA.ERROR_MESSAGES.INVALID_CREDENTIALS);
    });
  });
});