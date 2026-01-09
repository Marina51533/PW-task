import { APIRequestContext, expect } from '@playwright/test';
import { CreateEmployeeRequest, UpdateEmployeeRequest } from '../testData/apiTestData';

export class ApiHelper {
  private request: APIRequestContext;
  private baseURL: string;
  private authHeader: string;

  constructor(request: APIRequestContext, baseURL: string = '') {
    this.request = request;
    this.baseURL = baseURL || process.env.BASE_URL;
    this.authHeader = process.env.AUTH_HEADER || '';
  }

  getBaseURL() {
    return this.baseURL;
  }

  private getAuthHeaders() {
    if (!this.authHeader) {
      throw new Error('AUTH_HEADER environment variable is not set');
    }
    return {
      'Authorization': this.authHeader,
      'Content-Type': 'application/json',
    };
  }

  async getAllEmployees() {
    const response = await this.request.get(`${this.baseURL}/api/Employees`, {
      headers: this.getAuthHeaders(),
    });
    return response;
  }

  async createEmployee(employeeData: CreateEmployeeRequest) {
    const response = await this.request.post(`${this.baseURL}/api/Employees`, {
      headers: this.getAuthHeaders(),
      data: employeeData,
    });
    return response;
  }

  async updateEmployee(employeeData: UpdateEmployeeRequest) {
    const response = await this.request.put(`${this.baseURL}/api/Employees`, {
      headers: this.getAuthHeaders(),
      data: employeeData,
    });
    return response;
  }

  async getEmployeeById(id: string) {
    const response = await this.request.get(`${this.baseURL}/api/Employees/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return response;
  }

  async deleteEmployee(id: string) {
    const response = await this.request.delete(`${this.baseURL}/api/Employees/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return response;
  }

  validateEmployeeStructure(employee: Record<string, unknown>) {
    expect(employee).toHaveProperty('username');
    expect(employee).toHaveProperty('firstName');
    expect(employee).toHaveProperty('lastName');
    expect(typeof employee.username).toBe('string');
    expect(typeof employee.firstName).toBe('string');
    expect(typeof employee.lastName).toBe('string');

    if (employee.id) {
      expect(employee.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    }

    if (employee.dependants !== undefined) {
      expect(typeof employee.dependants).toBe('number');
      expect(employee.dependants).toBeGreaterThanOrEqual(0);
      expect(employee.dependants).toBeLessThanOrEqual(32);
    }

    if (employee.salary !== undefined) {
      expect(typeof employee.salary).toBe('number');
    }

    // Read-only fields should be present in responses
    if (employee.gross !== undefined) {
      expect(typeof employee.gross).toBe('number');
    }
    if (employee.benefitsCost !== undefined) {
      expect(typeof employee.benefitsCost).toBe('number');
    }
    if (employee.net !== undefined) {
      expect(typeof employee.net).toBe('number');
    }
  }

  async createTestEmployee(employeeData?: Partial<CreateEmployeeRequest>): Promise<string> {
    const testData = {
      username: `test.user.${Date.now()}`,
      firstName: 'Test',
      lastName: 'User',
      ...employeeData,
    };

    const response = await this.createEmployee(testData);
    expect(response.ok()).toBeTruthy();

    const createdEmployee = await response.json();
    expect(createdEmployee).toHaveProperty('id');

    return createdEmployee.id;
  }

  async cleanupTestEmployee(id: string) {
    const response = await this.deleteEmployee(id);
    // Don't assert here as the employee might already be deleted
    return response;
  }
}