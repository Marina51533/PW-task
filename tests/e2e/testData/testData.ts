// Test data constants
export const TEST_USERS = {
  VALID_USER: {
    username: 'validUser',
    password: 'validPass',
  },
  INVALID_USER: {
    username: 'invalidUser',
    password: 'invalidPass',
  },
} as const;

export const TEST_DATA = {
  ERROR_MESSAGES: {
    INVALID_CREDENTIALS: 'Invalid credentials',
  },
} as const;