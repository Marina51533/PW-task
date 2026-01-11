**# E2E Testing Instructions for AI Assistant**

This document outlines the structure and best practices for creating and maintaining end-to-end (E2E) tests using Playwright in this project.

**## Applies To**

- `e2e/**/*.spec.ts`

**## Directory Structure**

The `e2e` directory is organized as follows:

- `e2e/`

  - `api/`: Contains API endpoint constants.
  - `fixtures/`: Reusable test setups, like authentication.
  - `page_objects/`: Page Object Models (POMs) for abstracting UI interactions.
  - `reporters/`: Custom reporters for test results.
  - `test_data/`: Static data and files for tests.
  - `tests/`: The actual test files (`.spec.ts`).

**## Running Tests**

You can run E2E tests using the following npm scripts:

- `npm run test:e2e`: Runs all Playwright tests.
- `npm run test:e2e:ui`: Opens the Playwright UI for interactive test development.

**## Artifacts & Logs**

- ****Test Reports**** : After a test run, an HTML report is generated in the `playwright-report/` directory.
- ****Test Results**** : Raw test results are stored in `test-results/`.
- ****Screenshots & Videos**** : On failure, Playwright automatically captures screenshots and records videos, which are attached to the HTML report.

**## Writing Tests**

**### Page Object Model (POM)**

- ****Always use the Page Object Model.**** Create a class for each page or significant component.
- Page objects should encapsulate selectors and the methods that interact with the page.
- ****Structure**** :

  - `e2e/page_objects/basePage.ts`: A base class for common functionality (e.g., navigation).
  - `e2e/page_objects/myPage.ts`: Extends `BasePage` and contains selectors and methods specific to `MyPage`.

  ```typescript

  // e2e/page_objects/homePage.ts

  import { Page } from "@playwright/test";

  import { BasePage } from "./basePage";



  export class HomePage extends BasePage {

      constructor(page: Page) {

          super(page);

      }



      async goTo() {

          await this.page.goto("/");

      }



      async getTitle() {

          return this.page.locator("h1");

      }

  }

  ```

**### Fixtures**

- Use fixtures for setting up preconditions for all tests.
- The primary fixture is in `tests/e2e/fixtures/testFixtures.ts`, which provides an authenticated `page` object for tests that require a logged-in user.

  ```typescript

  // e2e/tests/my.spec.ts

  import { test } from "@/e2e/fixtures/testFixtures";



  test("should do something on an authenticated page", async ({ page }) => {

      // 'page' is already logged in here

  });

  ```

**### Test Structure**

- Test files must end with `.spec.ts`.
- Group related tests within a `describe` block.
- Use descriptive names for tests.

  ```typescript

  // e2e/tests/homepage.spec.ts

  import { expect, test } from "@playwright/test";

  import { HomePage } from "@/e2e/page_objects/homePage";



  test.describe("Homepage", () => {

      test("should display the main heading", async ({ page }) => {

          const homePage = new HomePage(page);

          await homePage.goTo();

          await expect(homePage.getTitle()).toBeVisible();

      });

  });

  ```

**## Configuration**

- The main Playwright configuration is in `playwright.config.ts`.
- It defines browsers, viewport sizes, and other global settings.
- Base URLs and API endpoints are configured in `e2e/api/urls.ts`.

**## Best Practices**

1. ****Use Page Objects**** : Do not use selectors directly in tests.
2. ****Use Fixtures**** : For setup and teardown, especially for authentication.
3. ****Use `data-testid`**** : Prefer using `data-testid` attributes for selecting elements to decouple tests from CSS or JS changes.
4. ****Descriptive Naming**** : Write clear and descriptive names for test files, `describe` blocks, and `test` cases. Use camelCase for file names, variables, and functions.
5. ****Keep Tests Independent**** : Each test should be able to run independently without relying on the state of previous tests.
6. ****Avoid `test.skip()`**** : Remove or fix skipped tests.
7. ****One Assertion per Test (Ideally)**** : While not a strict rule, aim for tests that verify one specific piece of functionality.
8. ****Use `test.describe()`**** : Group related tests for better organization.
9. ****Use Test Steps**** : Use `test.step()` to logically group interactions and assertions within a test. This improves readability and reporting.
10. ****Avoid Hardcoded Data**** : Store test data in `e2e/test_data/` or define it in constants, rather than hardcoding it directly in tests.
