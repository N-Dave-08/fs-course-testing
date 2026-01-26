# Full Stack Course: Testing

Comprehensive testing strategies for full stack applications.

## Overview

This course teaches testing at all levels: unit tests, integration tests, and end-to-end tests. You'll learn Jest, React Testing Library, Supertest, and Playwright.

## Prerequisites

- TypeScript knowledge (from fs-course-typescript)
- Node.js 22+ LTS
- pnpm package manager
- Understanding of frontend and backend concepts

## Course Structure

This course consists of **6 progressive levels**:

1. **Level 1: Testing Fundamentals** - Introduction, concepts, test structure
2. **Level 2: Unit Testing** - Jest basics, testing functions, mocking
3. **Level 3: Frontend Testing** - React Testing Library, component testing, hooks
4. **Level 4: Backend Testing** - API testing, Supertest, database testing
5. **Level 5: Integration Testing** - Integration concepts, test databases, API integration
6. **Level 6: E2E Testing** - Playwright setup, E2E scenarios, workflows

## Tech Stack

- **Jest**: 30.1+ (testing framework)
- **React Testing Library**: 16.3+ (component testing)
- **Supertest**: 7.2+ (API testing)
- **Playwright**: 1.58+ (E2E testing)

## Getting Started

1. **Read the Setup Guide**: Start with [LEARNING-GUIDE.md](./LEARNING-GUIDE.md)
2. **Follow Setup Instructions**: Install testing dependencies
3. **Start Learning**: Begin with Level 1

## Related Courses

- **fs-course-frontend** - Test your Next.js applications
- **fs-course-backend** - Test your Express.js APIs
- **fs-course-database** - Test database operations
- **fs-course-typescript** - TypeScript knowledge required

## Cross-Repository Integration

This testing course validates all other course components:

- **Tests**: `fs-course-frontend` (React components, pages, hooks)
- **Tests**: `fs-course-backend` (API endpoints, middleware, services)
- **Tests**: `fs-course-database` (queries, migrations, relationships)
- **Integrates with**: `fs-course-infrastructure` (CI/CD pipeline)

### Integration Points

1. **Frontend Testing**:
   - Test Next.js components from `fs-course-frontend`
   - Test API integration with backend
   - E2E tests for full user flows

2. **Backend Testing**:
   - Test Express routes from `fs-course-backend`
   - Test database integration
   - Test authentication and authorization

3. **CI/CD Integration**:
   - Tests run in GitHub Actions (from `fs-course-infrastructure`)
   - Automated testing on every commit
   - Test coverage reporting

### Test Structure

```text
project/
├── frontend-tests/     # Tests for fs-course-frontend
├── backend-tests/      # Tests for fs-course-backend
├── database-tests/     # Tests for fs-course-database
└── e2e-tests/          # End-to-end tests for full stack
```
