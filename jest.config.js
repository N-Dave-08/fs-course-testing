module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  testEnvironment: "node",
  roots: [
    "<rootDir>/src",
    "<rootDir>/level-01-testing-fundamentals",
    "<rootDir>/level-02-unit-testing",
    "<rootDir>/level-03-frontend-testing",
    "<rootDir>/level-04-backend-testing",
  ],
  testMatch: [
    "**/__tests__/**/*.ts",
    "**/__tests__/**/*.tsx",
    "**/?(*.)+(spec|test).ts",
  ],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "level-01-testing-fundamentals/**/*.ts",
    "level-02-unit-testing/**/*.ts",
    "level-03-frontend-testing/**/*.ts",
    "level-04-backend-testing/**/*.{ts,tsx}",
  ],
};
