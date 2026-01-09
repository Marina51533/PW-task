import { test, expect } from '@playwright/test';

const baseURL = process.env.BASE_URL;

test.describe('Employees API - Authentication', () => {
  test('GET /api/Employees should fail with invalid authorization header', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/Employees`, {
      headers: {
        Authorization: 'Basic invalid-token',
        'Content-Type': 'application/json',
      },
    });

    expect(response.ok()).toBeFalsy();
  });

  test('GET /api/Employees should fail without authorization header', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/Employees`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response.ok()).toBeFalsy();
  });
});
