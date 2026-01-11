import { test } from "../fixtures/testFixtures";
import { expect } from "@playwright/test";
import { TEST_USERS } from "../testData/testData";

// Product constraint: the Dependents field accepts values 0..32 (inclusive).
const MAX_DEPENDENTS = 32;

test.describe.serial("Employees UI - Add employee", () => {
  test.beforeEach(async ({ loginPage, employeesPage }) => {
    // Login before each test
    await loginPage.gotoLoginPage();
    await loginPage.login(
      TEST_USERS.VALID_USER.username,
      TEST_USERS.VALID_USER.password
    );
    // Wait for successful login and navigate to employees page
    await employeesPage.gotoEmployeesPage();
  });

  test.afterAll(async () => {
    // Cleanup runs after tests; per-test page is already closed, so use a fresh context.
  });

  test("should add employee with first name, last name, and dependents", async ({
    employeesPage,
  }) => {
    const firstName = `John_${Date.now()}`;
    const lastName = `Doe_${Date.now()}`;
    await employeesPage.addEmployee(firstName, lastName, 2);
    await expect
      .poll(() => employeesPage.isEmployeeInTable(firstName, lastName), {
        timeout: 15_000,
      })
      .toBe(true);
  });

  test("should add employee with zero dependents", async ({
    employeesPage,
  }) => {
    const firstName = `Jane_${Date.now()}`;
    const lastName = `Smith_${Date.now()}`;
    await employeesPage.addEmployee(firstName, lastName, 0);
    await expect
      .poll(() => employeesPage.isEmployeeInTable(firstName, lastName), {
        timeout: 15_000,
      })
      .toBe(true);
  });

  test("should add employee with maximum dependents (32)", async ({
    employeesPage,
  }) => {
    const firstName = `Max_${Date.now()}`;
    const lastName = `Dependent_${Date.now()}`;
    await employeesPage.addEmployee(firstName, lastName, MAX_DEPENDENTS);
    await expect
      .poll(() => employeesPage.isEmployeeInTable(firstName, lastName), {
        timeout: 15_000,
      })
      .toBe(true);
  });
});
