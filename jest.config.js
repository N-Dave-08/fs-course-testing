module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  testEnvironment: "node",
  roots: [
    "<rootDir>/src",
    "<rootDir>/level-01-testing-fundamentals",
    "<rootDir>/level-02-unit-testing",
  ],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "level-01-testing-fundamentals/**/*.ts",
    "level-02-unit-testing/**/*.ts",
  ],
};
