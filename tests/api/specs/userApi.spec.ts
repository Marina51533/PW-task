import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  test('should login via API', async ({ request }) => {
    const response = await request.get('/Account/Login', {
      headers: {
        'Authorization': process.env.AUTH_HEADER!,
      },
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('success', true); // Assuming response structure
  });

  test('should fail login with invalid credentials', async ({ request }) => {
    const response = await request.get('/Account/Login', {
      headers: {
        'Authorization': 'Basic aW52YWxpZDppbnZhbGlk', // invalid base64
      },
    });
    expect(response.status()).toBe(401);
  });
});