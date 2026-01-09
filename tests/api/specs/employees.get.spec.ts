import { test, expect } from '@playwright/test';
import { ApiHelper } from '../helpers/apiHelper';
import { API_TEST_DATA } from '../testData/apiTestData';

test.describe('Employees API - GET', () => {
  let apiHelper: ApiHelper;
  let createdEmployeeIds: string[] = [];

  test.beforeEach(async ({ request }) => {
    apiHelper = new ApiHelper(request);
    createdEmployeeIds = [];
  });

  test.afterEach(async () => {
    for (const id of createdEmployeeIds) {
      await apiHelper.cleanupTestEmployee(id);
    }
  });

  test('GET /api/Employees returns an array', async () => {
    const response = await apiHelper.getAllEmployees();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const employees = await response.json();
    expect(Array.isArray(employees)).toBeTruthy();

    if (employees.length > 0) {
      employees.forEach((employee: Record<string, unknown>) => {
        apiHelper.validateEmployeeStructure(employee);
      });
    }
  });

  test('GET /api/Employees/{id} returns created employee', async () => {
    const createResponse = await apiHelper.createEmployee(API_TEST_DATA.EMPLOYEES.VALID_EMPLOYEE);
    expect(createResponse.ok()).toBeTruthy();

    const createdEmployee = await createResponse.json();
    expect(createdEmployee.id).toBeDefined();
    createdEmployeeIds.push(createdEmployee.id);

    const getResponse = await apiHelper.getEmployeeById(createdEmployee.id);
    expect(getResponse.ok()).toBeTruthy();

    const retrievedEmployee = await getResponse.json();
    apiHelper.validateEmployeeStructure(retrievedEmployee);
    expect(retrievedEmployee.id).toBe(createdEmployee.id);
  });

  test('GET /api/Employees/{id} should fail for invalid UUID format', async () => {
    const response = await apiHelper.getEmployeeById('invalid-uuid');
    expect(response.ok()).toBeFalsy();
  });

  test('GET /api/Employees/{id} should fail for non-existent UUID', async () => {
    const response = await apiHelper.getEmployeeById('00000000-0000-0000-0000-000000000000');
    expect(response.ok()).toBeFalsy();
  });
});
