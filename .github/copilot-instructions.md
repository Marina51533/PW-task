---
applyTo: '**'
---

# RTFM

- Prefer reading existing code before adding new code.
- Follow the existing patterns in this repo (fixtures + page objects + Playwright Test).
- Read and follow the detailed guides:
	- `.github/instructions/e2e-tests.md`
	- `.github/instructions/api-tests.md`

# Project Overview

- Tech: Playwright Test + TypeScript.
- Test suites:
	- UI E2E: `tests/e2e/**`
	- API tests: `tests/api/**`
- Reporting:
	- Playwright HTML: `playwright-report/` (open via `npm run test:report`)
	- Allure: `allure-results/` → `npm run allure:generate` → `npm run allure:open`

# Directory Structure (this repo)

```
tests/
	api/
		helpers/
		specs/
		testData/
	e2e/
		config/
		fixtures/
		pageObjects/
		reporters/
		testData/
		tests/
```

# Key Files

- Playwright config: `playwright.config.ts`
- E2E fixtures entry: `tests/e2e/fixtures/testFixtures.ts`
- Page objects: `tests/e2e/pageObjects/*`
- API helpers: `tests/api/helpers/*`
- Env vars: `.env`

# Environment Variables

- UI
	- `BASE_URL_PROD`: base URL for UI navigation (used by page objects).
	- `VALID_USERNAME`, `VALID_PASSWORD`: UI login.
- API
	- `AUTH_HEADER`: Basic auth header for API tests.

# Adding Tests

## E2E UI tests

- Add new specs under `tests/e2e/tests/` and name them `*.spec.ts`.
- Always use the Page Object Model:
	- Put selectors + UI actions in `tests/e2e/pageObjects/`.
	- Keep test files focused on flows and assertions.
- Use fixtures from `tests/e2e/fixtures/testFixtures.ts`:
	- Import `test` from the fixture module.
	- Prefer `{ loginPage, employeesPage }` fixtures over raw `page` in test code.

## API tests

- Add new specs under `tests/api/specs/` and name them `*.spec.ts`.
- Put common logic in `tests/api/helpers/` and shared constants in `tests/api/testData/`.

# Running Tests

- All tests: `npm test`
- E2E only: `npm run test:e2e`
- E2E UI mode: `npm run test:e2e:ui`
- API only: `npm run test:api`
- HTML report: `npm run test:report`

# Linting

- Lint: `npm run lint`
- Fix: `npm run lint:fix`

# Conventions / Guardrails

- Don’t use `page.waitForTimeout()` in tests; wait on locators/conditions instead.
- Use `expect(...)` assertions in every test.
- Avoid direct selectors in test specs; keep them inside page objects.
- When renaming files referenced by imports, update all imports across the repo.
