import { test, expect } from '@playwright/test';
import { ApiHelper } from '../helpers/apiHelper';
import { API_TEST_DATA } from '../testData/apiTestData';

test.describe('Employees API - DELETE', () => {
  let apiHelper: ApiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new ApiHelper(request);
  });

  test('DELETE /api/Employees/{id} deletes existing employee', async () => {
    const createResponse = await apiHelper.createEmployee(API_TEST_DATA.EMPLOYEES.VALID_EMPLOYEE);
    expect(createResponse.ok()).toBeTruthy();

    const createdEmployee = await createResponse.json();
    expect(createdEmployee.id).toBeDefined();

    const deleteResponse = await apiHelper.deleteEmployee(createdEmployee.id);
    expect(deleteResponse.ok()).toBeTruthy();
  });

  test('DELETE /api/Employees/{id} should fail for non-existent UUID', async () => {
    const response = await apiHelper.deleteEmployee('00000000-0000-0000-0000-000000000000');
    expect(response.ok()).toBeFalsy();
  });

  test('DELETE /api/Employees/{id} should fail for invalid UUID format', async () => {
    const response = await apiHelper.deleteEmployee('invalid-uuid');
    expect(response.ok()).toBeFalsy();
  });
});
