# Testing Course Setup Guide

Complete setup instructions for the testing course.

## Prerequisites

1. **Node.js 22+ LTS**
2. **pnpm** package manager
3. **TypeScript knowledge** (from fs-course-typescript)

## Initial Setup

### Step 1: Navigate to Course Directory

```bash
cd fs-course-testing
```

### Step 2: Initialize Package.json

```bash
pnpm init
```

### Step 3: Install Testing Dependencies

```bash
# Core testing
pnpm add -D jest@^30.1.0 @jest/globals@^30.1.0

# TypeScript transform (Jest 30-friendly)
pnpm add -D @swc/core @swc/jest

# React Testing
pnpm add -D @testing-library/react@^16.3.2 @testing-library/jest-dom@^6.9.1

# API Testing
pnpm add -D supertest@^7.2.2 @types/supertest

# E2E Testing
pnpm add -D @playwright/test@^1.58.0

# TypeScript
pnpm add -D typescript@^5.7.0 @types/node@^22.0.0
```

### Step 4: Configure Jest

Create `jest.config.js`:

```javascript
module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
};
```

### Step 5: Configure Playwright

```bash
npx playwright install
```

### Step 6: Add Scripts to package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test"
  }
}
```

### Step 7: Verify Setup

Create `src/__tests__/example.test.ts`:

```typescript
import { describe, it, expect } from "@jest/globals";

describe('Example Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run: `pnpm test`

## Workflow

### Running Tests

```bash
# All tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage

# E2E tests
pnpm test:e2e
```

## Next Steps

1. ✅ Verify setup with example test
2. 📖 Start with [Level 1: Testing Fundamentals](./level-01-testing-fundamentals/lesson-01-introduction.md)

Happy testing!
