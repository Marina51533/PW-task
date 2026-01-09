import { test, expect } from '@playwright/test';
import { ApiHelper } from '../helpers/apiHelper';
import { API_TEST_DATA } from '../testData/apiTestData';
import type { UpdateEmployeeRequest } from '../testData/apiTestData';

test.describe('Employees API - PUT', () => {
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

  test('PUT /api/Employees updates employee when all required fields are present', async () => {
    const createResponse = await apiHelper.createEmployee(API_TEST_DATA.EMPLOYEES.VALID_EMPLOYEE);
    expect(createResponse.ok()).toBeTruthy();

    const createdEmployee = await createResponse.json();
    expect(createdEmployee.id).toBeDefined();
    createdEmployeeIds.push(createdEmployee.id);

    const updatePayload = {
      id: createdEmployee.id,
      // Swagger Employee schema says these are required even for PUT
      username: createdEmployee.username,
      firstName: API_TEST_DATA.EMPLOYEES.EMPLOYEE_UPDATE.firstName,
      lastName: API_TEST_DATA.EMPLOYEES.EMPLOYEE_UPDATE.lastName,
      dependants: API_TEST_DATA.EMPLOYEES.EMPLOYEE_UPDATE.dependants,
      salary: API_TEST_DATA.EMPLOYEES.EMPLOYEE_UPDATE.salary,
    };

    const updateResponse = await apiHelper.updateEmployee(updatePayload);
    expect(updateResponse.ok()).toBeTruthy();

    const updatedEmployee = await updateResponse.json();
    apiHelper.validateEmployeeStructure(updatedEmployee);

    expect(updatedEmployee.firstName).toBe(updatePayload.firstName);
    expect(updatedEmployee.lastName).toBe(updatePayload.lastName);
  });

  test('Contract: PUT should fail when required fields are missing (partial payload)', async () => {
    const employeeId = await apiHelper.createTestEmployee();
    createdEmployeeIds.push(employeeId);

    const response = await apiHelper.updateEmployee({
      id: employeeId,
      firstName: 'Only',
      lastName: 'Partial',
      // username intentionally omitted
    });

    expect(response.ok()).toBeFalsy();
  });

  test('Contract: PUT should fail when unknown properties are provided (additionalProperties=false)', async () => {
    const employeeId = await apiHelper.createTestEmployee();
    createdEmployeeIds.push(employeeId);

    const response = await apiHelper.updateEmployee({
      id: employeeId,
      username: `extra.put.${Date.now()}`,
      firstName: 'Extra',
      lastName: 'Put',
      extraField: 'should-not-be-accepted',
    } as unknown as UpdateEmployeeRequest);

    expect(response.ok()).toBeFalsy();
  });

  test('PUT should fail to update non-existent employee', async () => {
    const response = await apiHelper.updateEmployee({
      id: '00000000-0000-0000-0000-000000000000',
      username: 'non.existent',
      firstName: 'Updated',
      lastName: 'Name',
    });

    expect(response.ok()).toBeFalsy();
  });
});
