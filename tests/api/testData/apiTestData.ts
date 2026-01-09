// API Test data and types for Employee endpoints
export interface Employee {
  partitionKey?: string; // readOnly
  sortKey?: string; // readOnly, uuid
  username: string; // required, maxLength: 50
  id?: string; // uuid
  firstName: string; // required, maxLength: 50
  lastName: string; // required, maxLength: 50
  dependants?: number; // min: 0, max: 32
  expiration?: string; // date-time, nullable
  salary?: number; // float
  gross?: number; // readOnly, float
  benefitsCost?: number; // readOnly, float
  net?: number; // readOnly, float
}

export interface CreateEmployeeRequest {
  username: string;
  firstName: string;
  lastName: string;
  dependants?: number;
  salary?: number;
}

export interface UpdateEmployeeRequest extends Partial<CreateEmployeeRequest> {
  id: string;
}

// Sample test data
export const API_TEST_DATA = {
  EMPLOYEES: {
    VALID_EMPLOYEE: {
      username: 'john.doe',
      firstName: 'John',
      lastName: 'Doe',
      dependants: 2,
      salary: 75000,
    } as CreateEmployeeRequest,

    EMPLOYEE_WITH_MINIMAL_DATA: {
      username: 'jane.smith',
      firstName: 'Jane',
      lastName: 'Smith',
    } as CreateEmployeeRequest,

    EMPLOYEE_WITH_MAX_DEPENDANTS: {
      username: 'bob.wilson',
      firstName: 'Bob',
      lastName: 'Wilson',
      dependants: 32,
      salary: 100000,
    } as CreateEmployeeRequest,

    EMPLOYEE_UPDATE: {
      firstName: 'John',
      lastName: 'Updated',
      dependants: 3,
      salary: 80000,
    } as Partial<CreateEmployeeRequest>,

    INVALID_EMPLOYEE_MISSING_REQUIRED: {} as Record<string, never>,

    INVALID_EMPLOYEE_MISSING_USERNAME: {
      firstName: 'No',
      lastName: 'Username',
    } as unknown as CreateEmployeeRequest,

    INVALID_EMPLOYEE_MISSING_FIRSTNAME: {
      username: 'missing.firstname',
      lastName: 'Lastname',
    } as unknown as CreateEmployeeRequest,

    INVALID_EMPLOYEE_MISSING_LASTNAME: {
      username: 'missing.lastname',
      firstName: 'Firstname',
    } as unknown as CreateEmployeeRequest,

    INVALID_EMPLOYEE_WITH_EXTRA_PROPERTY: {
      username: 'extra.property',
      firstName: 'Extra',
      lastName: 'Property',
      extraField: 'should-not-be-accepted',
    } as unknown as CreateEmployeeRequest,

    INVALID_EMPLOYEE_LONG_NAMES: {
      username: 'a'.repeat(51), // exceeds maxLength 50
      firstName: 'a'.repeat(51), // exceeds maxLength 50
      lastName: 'a'.repeat(51), // exceeds maxLength 50
    } as CreateEmployeeRequest,

    INVALID_EMPLOYEE_NEGATIVE_DEPENDANTS: {
      username: 'negative.dependants',
      firstName: 'Negative',
      lastName: 'Dependants',
      dependants: -1, // below minimum 0
    } as CreateEmployeeRequest,

    INVALID_EMPLOYEE_TOO_MANY_DEPENDANTS: {
      username: 'too.many.dependants',
      firstName: 'Too',
      lastName: 'Many',
      dependants: 33, // above maximum 32
    } as CreateEmployeeRequest,
  },
} as const;

// API response validation schemas
export const API_RESPONSES = {
  EMPLOYEE_LIST: {
    type: 'array',
    items: {
      type: 'object',
      required: ['username', 'firstName', 'lastName'],
      properties: {
        partitionKey: { type: 'string' },
        sortKey: { type: 'string', format: 'uuid' },
        username: { type: 'string', maxLength: 50 },
        id: { type: 'string', format: 'uuid' },
        firstName: { type: 'string', maxLength: 50 },
        lastName: { type: 'string', maxLength: 50 },
        dependants: { type: 'integer', minimum: 0, maximum: 32 },
        expiration: { type: 'string', format: 'date-time' },
        salary: { type: 'number' },
        gross: { type: 'number' },
        benefitsCost: { type: 'number' },
        net: { type: 'number' },
      },
    },
  },

  EMPLOYEE_SINGLE: {
    type: 'object',
    required: ['username', 'firstName', 'lastName'],
    properties: {
      partitionKey: { type: 'string' },
      sortKey: { type: 'string', format: 'uuid' },
      username: { type: 'string', maxLength: 50 },
      id: { type: 'string', format: 'uuid' },
      firstName: { type: 'string', maxLength: 50 },
      lastName: { type: 'string', maxLength: 50 },
      dependants: { type: 'integer', minimum: 0, maximum: 32 },
      expiration: { type: 'string', format: 'date-time' },
      salary: { type: 'number' },
      gross: { type: 'number' },
      benefitsCost: { type: 'number' },
      net: { type: 'number' },
    },
  },
} as const;