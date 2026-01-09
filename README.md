# PW-task

This is a Playwright test framework following best practices.

## Structure

- `tests/e2e/`: End-to-end tests
  - `api/`: API endpoint constants
  - `fixtures/`: Reusable test setups (e.g., authentication)
  - `pageObjects/`: Page Object Model classes
  - `reporters/`: Custom reporters
  - `testData/`: Static data and files for tests
  - `tests/`: Test specifications (.spec.ts)
- `tests/api/`: API tests
  - `specs/`: API test specifications

## Running Tests

- `npm test`: Run all tests
- `npm run test:e2e`: Run E2E tests
- `npm run test:e2e:ui`: Run E2E tests with Playwright UI
- `npm run test:api`: Run API tests
- `npm run test:headed`: Run tests in headed mode
- `npm run test:ui`: Run tests with UI mode
- `npm run test:report`: Open Playwright HTML report

## Lint

- `npm run lint`: Run ESLint
- `npm run lint:fix`: Auto-fix lint issues where possible

## Allure report

1) Run tests to produce `allure-results/`
2) `npm run allure:generate`
3) `npm run allure:open`

## Best Practices

- Page Object Model: No locators in test code
- Fixtures: Use custom fixtures for setup
- Naming: camelCase for variables, readonly for locators
- Use `data-testid` for selectors
- One assertion per test ideally
- Use `test.step()` for logical grouping
- Store test data in `test_data/`