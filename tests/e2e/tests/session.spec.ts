import { expect } from '@playwright/test';
import { test } from '../fixtures/testFixtures';
import { TEST_USERS } from '../testData/testData';

test.describe('Session Management Tests', () => {

  test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.login(TEST_USERS.VALID_USER.username, TEST_USERS.VALID_USER.password);
    await expect(page).toHaveURL(/Benefits/);
  });

  test('should persist session after page refresh', async ({ page }) => {
    await test.step('Refresh page', async () => {
      await page.reload();
    });

    await test.step('Verify still logged in', async () => {
      await expect(page).toHaveURL(/Benefits/);
    });
  });

  test('should not allow back navigation to login page after login', async ({
    page,
  }) => {
    await test.step('Navigate back', async () => {
      await page.goBack();
    });

    await test.step('Verify not on login page', async () => {
      await expect(page).not.toHaveURL(/Account\/Login/);
    });
  });

});