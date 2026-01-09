import { test, expect } from '@playwright/test';
import { ApiHelper } from '../helpers/apiHelper';
import { API_TEST_DATA } from '../testData/apiTestData';

test.describe('Employees API - POST', () => {
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

  test('POST /api/Employees creates employee with valid data', async () => {
    const employeeData = API_TEST_DATA.EMPLOYEES.VALID_EMPLOYEE;

    const response = await apiHelper.createEmployee(employeeData);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const createdEmployee = await response.json();
    apiHelper.validateEmployeeStructure(createdEmployee);

    expect(createdEmployee.username).toBeDefined();
    expect(typeof createdEmployee.username).toBe('string');

    expect(createdEmployee.firstName).toBe(employeeData.firstName);
    expect(createdEmployee.lastName).toBe(employeeData.lastName);
    expect(createdEmployee.dependants).toBe(employeeData.dependants);

    expect(createdEmployee.id).toBeDefined();
    createdEmployeeIds.push(createdEmployee.id);
  });

  test('POST /api/Employees creates employee with minimal required data', async () => {
    const employeeData = API_TEST_DATA.EMPLOYEES.EMPLOYEE_WITH_MINIMAL_DATA;

    const response = await apiHelper.createEmployee(employeeData);
    expect(response.ok()).toBeTruthy();

    const createdEmployee = await response.json();
    apiHelper.validateEmployeeStructure(createdEmployee);

    expect(createdEmployee.username).toBeDefined();
    expect(createdEmployee.firstName).toBeDefined();
    expect(createdEmployee.lastName).toBeDefined();

    expect(createdEmployee.id).toBeDefined();
    createdEmployeeIds.push(createdEmployee.id);
  });

  test('POST /api/Employees creates employee with maximum dependants (32)', async () => {
    const employeeData = API_TEST_DATA.EMPLOYEES.EMPLOYEE_WITH_MAX_DEPENDANTS;

    const response = await apiHelper.createEmployee(employeeData);
    expect(response.ok()).toBeTruthy();

    const createdEmployee = await response.json();
    apiHelper.validateEmployeeStructure(createdEmployee);
    expect(createdEmployee.dependants).toBe(32);

    expect(createdEmployee.id).toBeDefined();
    createdEmployeeIds.push(createdEmployee.id);
  });

  test('Contract: POST should fail when username is missing (required by Swagger)', async () => {
    const response = await apiHelper.createEmployee(API_TEST_DATA.EMPLOYEES.INVALID_EMPLOYEE_MISSING_USERNAME);
    expect(response.ok()).toBeFalsy();
  });

  test('Contract: POST should fail when firstName is missing (required by Swagger)', async () => {
    const response = await apiHelper.createEmployee(API_TEST_DATA.EMPLOYEES.INVALID_EMPLOYEE_MISSING_FIRSTNAME);
    expect(response.ok()).toBeFalsy();
  });

  test('Contract: POST should fail when lastName is missing (required by Swagger)', async () => {
    const response = await apiHelper.createEmployee(API_TEST_DATA.EMPLOYEES.INVALID_EMPLOYEE_MISSING_LASTNAME);
    expect(response.ok()).toBeFalsy();
  });

  test('Contract: POST should fail when unknown properties are provided (additionalProperties=false)', async () => {
    const response = await apiHelper.createEmployee(API_TEST_DATA.EMPLOYEES.INVALID_EMPLOYEE_WITH_EXTRA_PROPERTY);
    expect(response.ok()).toBeFalsy();
  });

  test('POST should fail to create employee with names exceeding max length (50)', async () => {
    const response = await apiHelper.createEmployee(API_TEST_DATA.EMPLOYEES.INVALID_EMPLOYEE_LONG_NAMES);
    expect(response.ok()).toBeFalsy();
  });

  test('POST should fail to create employee with negative dependants', async () => {
    const response = await apiHelper.createEmployee(API_TEST_DATA.EMPLOYEES.INVALID_EMPLOYEE_NEGATIVE_DEPENDANTS);
    expect(response.ok()).toBeFalsy();
  });

  test('POST should fail to create employee with too many dependants (>32)', async () => {
    const response = await apiHelper.createEmployee(API_TEST_DATA.EMPLOYEES.INVALID_EMPLOYEE_TOO_MANY_DEPENDANTS);
    expect(response.ok()).toBeFalsy();
  });
});
