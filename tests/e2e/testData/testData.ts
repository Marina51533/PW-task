// Test data constants
export const TEST_USERS = {
  VALID_USER: {
    username: process.env.VALID_USERNAME!,
    password: process.env.VALID_PASSWORD!,
  },
  INVALID_USER: {
    username: 'invalidUser',
    password: 'invalidPass',
  },
} as const;

export const TEST_DATA = {
  ERROR_MESSAGES: {
    INVALID_CREDENTIALS: 'There were one or more problems that prevented you from logging in',
  },
} as const;