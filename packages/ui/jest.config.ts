/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
  roots: ['src'],
  testEnvironment: 'jest-environment-jsdom', // Use browser-like testing environment
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest' // That one tells Jest to use ts-jest when dealing with TypeScript files
  }
}
