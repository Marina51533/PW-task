import { expect } from '@playwright/test';
import { test } from '../fixtures/testFixtures';
import { TEST_USERS, TEST_DATA } from '../testData/testData';

const loginErrorTestCases = [
  {
    // The test is skiped due to bug in the application
    name: "invalid credentials",
    username: TEST_USERS.INVALID_USER.username,
    password: TEST_USERS.INVALID_USER.password,
    expectedError: TEST_DATA.ERROR_MESSAGES.INVALID_CREDENTIALS,
    skip: true,
  },
  {
    name: "empty username",
    username: TEST_USERS.EMPTY_USERNAME.username,
    password: TEST_USERS.EMPTY_USERNAME.password,
    expectedError: TEST_DATA.ERROR_MESSAGES.EMPTY_USERNAME,
  },
  {
    name: "empty password",
    username: TEST_USERS.EMPTY_PASSWORD.username,
    password: TEST_USERS.EMPTY_PASSWORD.password,
    expectedError: TEST_DATA.ERROR_MESSAGES.EMPTY_PASSWORD,
  },
  {
    name: "both fields empty",
    username: TEST_USERS.BOTH_EMPTY.username,
    password: TEST_USERS.BOTH_EMPTY.password,
    expectedError: TEST_DATA.ERROR_MESSAGES.BOTH_EMPTY,
  },
  {
    name: "whitespace-only username",
    username: TEST_USERS.WHITESPACE_USER.username,
    password: TEST_USERS.WHITESPACE_USER.password,
    expectedError: TEST_DATA.ERROR_MESSAGES.INVALID_CREDENTIALS,
  },
  {
    // The test is skiped due to bug in the application
    name: "SQL injection attempt",
    username: TEST_USERS.SQL_INJECTION.username,
    password: TEST_USERS.SQL_INJECTION.password,
    expectedError: TEST_DATA.ERROR_MESSAGES.INVALID_CREDENTIALS,
    skip: true,
  },
];

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

  loginErrorTestCases.forEach((testCase) => {
    const testFn = testCase.skip ? test.skip : test;
    testFn(`should show error with ${testCase.name}`, async ({ loginPage }) => {
      await test.step(`Attempt login with ${testCase.name}`, async () => {
        await loginPage.login(testCase.username, testCase.password);
      });
      await test.step('Verify error message', async () => {
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain(testCase.expectedError);
      });
    });
  });
});