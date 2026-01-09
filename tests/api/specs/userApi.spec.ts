import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  test('should get user data', async ({ request }) => {
    const response = await request.get('/api/users/1');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
  });

  test('should create a new user', async ({ request }) => {
    const newUser = { name: 'John Doe', email: 'john@example.com' };
    const response = await request.post('/api/users', { data: newUser });
    expect(response.status()).toBe(201);
    const data = await response.json();
    expect(data.name).toBe(newUser.name);
  });
});