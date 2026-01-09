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
  EMPTY_USERNAME: {
    username: '',
    password: process.env.VALID_PASSWORD!,
  },
  EMPTY_PASSWORD: {
    username: process.env.VALID_USERNAME!,
    password: '',
  },
  BOTH_EMPTY: {
    username: '',
    password: '',
  },
  WHITESPACE_USER: {
    username: '   ',
    password: process.env.VALID_PASSWORD!,
  },
  SQL_INJECTION: {
    username: "' OR '1'='1",
    password: 'password',
  },
} as const;

export const TEST_DATA = {
  ERROR_MESSAGES: {
    INVALID_CREDENTIALS: 'There were one or more problems that prevented you from logging in',
    EMPTY_USERNAME: 'The Username field is required',
    EMPTY_PASSWORD: 'The Password field is required',
    BOTH_EMPTY: 'There were one or more problems that prevented you from logging in',
  },
} as const;