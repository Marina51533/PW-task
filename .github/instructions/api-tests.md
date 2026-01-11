**# API Testing Instructions for AI Assistant**

This document outlines the structure and best practices for writing and maintaining API tests using Playwright in this project.

**## Applies To**

- `tests/api/**/*.spec.ts`

**## Directory Structure**

The API tests are organized as follows:

- `tests/api/`
  - `helpers/`: Shared utilities for API calls, auth headers, and common assertions.
  - `specs/`: The actual API test files (`.spec.ts`).
  - `testData/`: Static test data/constants used by API tests.

**## Running Tests**

- Run all API tests:
  - `npm run test:api`

- Run a single spec:
  - `npx playwright test tests/api/specs/<file>.spec.ts --project=chromium`

- Open the HTML report:
  - `npm run test:report`

**## Environment Variables**

API tests rely on values from `.env` (loaded by the test runner setup):

- `AUTH_HEADER`: Basic auth header value used for authenticated API calls.
- `BASE_URL_PROD`: Base URL for the target environment.

If you need to support multiple environments, add additional env vars (e.g. `BASE_URL_DEV`, `BASE_URL_STAGING`) and select between them in the shared API helper.

**## Writing API Tests**

**### Use the API helper**

- Prefer using the shared helper in `tests/api/helpers/` for:
  - Creating request contexts
  - Setting auth headers consistently
  - Building endpoints from the base URL
  - Reusing common assertions

This keeps specs focused on behavior/contract validation.

**### Test Structure**

- Test files must end with `.spec.ts`.
- Group related tests under `test.describe()`.
- Use explicit assertions (`expect(...)`) in each test.

**### What to Validate**

- HTTP status codes
- Response schema/shape (required fields, types)
- Business rules (validation errors for bad input)
- Idempotency/cleanup when creating data

**## Best Practices**

1. **Keep tests independent**: Each spec should not rely on the order of other specs.
2. **Prefer deterministic data**: Use unique values when creating entities to avoid collisions.
3. **Clean up when needed**: If a test creates records, delete them in the same test (or in `afterAll`) using the API.
4. **Avoid UI dependencies**: API tests should not use the browser UI.
5. **Minimize duplication**: Put shared logic in `tests/api/helpers/` and shared constants in `tests/api/testData/`.
