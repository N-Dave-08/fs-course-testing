# Exercises 01: Testing Fundamentals

## Learning Objectives

By completing these exercises, you will:
- ✅ Write your first Jest test
- ✅ Understand the AAA (Arrange-Act-Assert) pattern
- ✅ Organize tests with describe blocks
- ✅ Test synchronous and asynchronous functions
- ✅ Handle test setup and teardown
- ✅ Practice testing best practices

## Before You Start

**Prerequisites:**
- Jest installed (see [LEARNING-GUIDE.md](../LEARNING-GUIDE.md))
- TypeScript knowledge
- Basic understanding of testing concepts

**Setup:**
1. Navigate to `fs-course-testing/level-01-testing-fundamentals/`
2. Ensure Jest is configured in `package.json`
3. Create `src/` directory for source code
4. Create `src/__tests__/` directory for tests

---

## Exercise 1: Basic Test

**Objective:** Write your first test using the AAA pattern.

**Instructions:**
Create a test file that tests a simple `add` function:
1. Create the function to test: `src/math.ts`
2. Create the test file: `src/__tests__/math.test.ts`
3. Use AAA pattern (Arrange-Act-Assert)
4. Verify the test passes

**Step-by-Step:**

1. **Create the function to test** (`src/math.ts`):
```typescript
// src/math.ts
/**
 * Adds two numbers
 * @param a - First number
 * @param b - Second number
 * @returns Sum of a and b
 */
export function add(a: number, b: number): number {
  return a + b;
}
```

2. **Create the test file** (`src/__tests__/math.test.ts`):
```typescript
// src/__tests__/math.test.ts
import { add } from '../math';

describe('add function', () => {
  test('adds two positive numbers correctly', () => {
    // Arrange: Set up test data
    const a = 5;
    const b = 3;
    const expected = 8;

    // Act: Execute the function
    const result = add(a, b);

    // Assert: Verify the result
    expect(result).toBe(expected);
  });

  test('adds negative numbers correctly', () => {
    // Arrange
    const a = -5;
    const b = -3;
    const expected = -8;

    // Act
    const result = add(a, b);

    // Assert
    expect(result).toBe(expected);
  });

  test('adds positive and negative numbers', () => {
    // Arrange
    const a = 5;
    const b = -3;
    const expected = 2;

    // Act
    const result = add(a, b);

    // Assert
    expect(result).toBe(expected);
  });
});
```

**Verification Steps:**
1. Run tests: `pnpm test`
2. All tests should pass
3. Check test output shows 3 passing tests

**Expected Output:**
```
PASS  src/__tests__/math.test.ts
  add function
    ✓ adds two positive numbers correctly (2 ms)
    ✓ adds negative numbers correctly (1 ms)
    ✓ adds positive and negative numbers (1 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

**AAA Pattern Explained:**
- **Arrange**: Set up test data and expected results
- **Act**: Execute the function being tested
- **Assert**: Verify the result matches expectations

**Hints:**
- Use `describe()` to group related tests
- Use `test()` or `it()` for individual tests
- Use `expect()` for assertions
- Use `.toBe()` for primitive value equality

**Common Mistakes:**
- ❌ Not importing the function to test
- ❌ Forgetting to export the function
- ❌ Wrong assertion method (use `.toBe()` for primitives)
- ❌ Not following AAA pattern

**File:** `src/math.ts` and `src/__tests__/math.test.ts`

---

## Exercise 2: Test Structure

**Objective:** Organize tests with describe blocks and setup/teardown.

**Instructions:**
Create a test file for user operations:
1. Use `describe` blocks to group related tests
2. Use `beforeEach` for setup
3. Use `afterEach` for teardown
4. Test multiple scenarios

**Step-by-Step:**

1. **Create the user module** (`src/user.ts`):
```typescript
// src/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [];

export function createUser(name: string, email: string): User {
  const user: User = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(user);
  return user;
}

export function getUserById(id: number): User | undefined {
  return users.find(u => u.id === id);
}

export function getAllUsers(): User[] {
  return [...users];
}

export function clearUsers(): void {
  users = [];
}
```

2. **Create the test file** (`src/__tests__/user.test.ts`):
```typescript
// src/__tests__/user.test.ts
import {
  createUser,
  getUserById,
  getAllUsers,
  clearUsers,
} from '../user';

describe('User Management', () => {
  // Setup: Run before each test
  beforeEach(() => {
    clearUsers(); // Clean state before each test
  });

  // Teardown: Run after each test (optional)
  afterEach(() => {
    // Can add cleanup logic here if needed
  });

  describe('createUser', () => {
    test('creates a user with correct properties', () => {
      // Arrange
      const name = 'Alice';
      const email = 'alice@example.com';

      // Act
      const user = createUser(name, email);

      // Assert
      expect(user).toHaveProperty('id');
      expect(user.name).toBe(name);
      expect(user.email).toBe(email);
      expect(typeof user.id).toBe('number');
    });

    test('assigns unique IDs to users', () => {
      // Arrange & Act
      const user1 = createUser('Alice', 'alice@example.com');
      const user2 = createUser('Bob', 'bob@example.com');

      // Assert
      expect(user1.id).not.toBe(user2.id);
      expect(user2.id).toBe(user1.id + 1);
    });
  });

  describe('getUserById', () => {
    test('returns user when found', () => {
      // Arrange
      const createdUser = createUser('Alice', 'alice@example.com');

      // Act
      const foundUser = getUserById(createdUser.id);

      // Assert
      expect(foundUser).toBeDefined();
      expect(foundUser?.id).toBe(createdUser.id);
      expect(foundUser?.name).toBe('Alice');
    });

    test('returns undefined when user not found', () => {
      // Act
      const user = getUserById(999);

      // Assert
      expect(user).toBeUndefined();
    });
  });

  describe('getAllUsers', () => {
    test('returns empty array when no users', () => {
      // Act
      const users = getAllUsers();

      // Assert
      expect(users).toEqual([]);
    });

    test('returns all users', () => {
      // Arrange
      createUser('Alice', 'alice@example.com');
      createUser('Bob', 'bob@example.com');

      // Act
      const users = getAllUsers();

      // Assert
      expect(users).toHaveLength(2);
      expect(users[0].name).toBe('Alice');
      expect(users[1].name).toBe('Bob');
    });
  });
});
```

**Verification Steps:**
1. Run tests: `pnpm test`
2. All tests should pass
3. Verify tests are isolated (each test starts fresh)

**Expected Output:**
```
PASS  src/__tests__/user.test.ts
  User Management
    createUser
      ✓ creates a user with correct properties (1 ms)
      ✓ assigns unique IDs to users (1 ms)
    getUserById
      ✓ returns user when found (1 ms)
      ✓ returns undefined when user not found (1 ms)
    getAllUsers
      ✓ returns empty array when no users (1 ms)
      ✓ returns all users (1 ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
```

**Hints:**
- `beforeEach` runs before each test (great for setup)
- `afterEach` runs after each test (great for cleanup)
- `beforeAll` runs once before all tests
- `afterAll` runs once after all tests
- Nested `describe` blocks organize related tests

**Common Mistakes:**
- ❌ Not cleaning up state between tests
- ❌ Tests depending on execution order
- ❌ Not using `beforeEach` for setup
- ❌ Sharing mutable state between tests

**File:** `src/user.ts` and `src/__tests__/user.test.ts`

---

## Exercise 3: Async Tests

**Objective:** Test asynchronous functions with promises and async/await.

**Instructions:**
Create tests for async functions:
1. Test promise-based functions
2. Test async/await functions
3. Handle errors in async code

**Step-by-Step:**

1. **Create async functions** (`src/async.ts`):
```typescript
// src/async.ts
/**
 * Fetches user data (simulated)
 */
export async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}` });
    }, 100);
  });
}

/**
 * Fetches user with error handling
 */
export async function fetchUserOrFail(id: number): Promise<{ id: number; name: string }> {
  if (id < 1) {
    throw new Error('Invalid user ID');
  }
  return fetchUser(id);
}

/**
 * Fetches multiple users
 */
export async function fetchUsers(ids: number[]): Promise<Array<{ id: number; name: string }>> {
  const promises = ids.map(id => fetchUser(id));
  return Promise.all(promises);
}
```

2. **Create test file** (`src/__tests__/async.test.ts`):
```typescript
// src/__tests__/async.test.ts
import { fetchUser, fetchUserOrFail, fetchUsers } from '../async';

describe('Async Functions', () => {
  describe('fetchUser', () => {
    test('returns user data (promise)', () => {
      // Arrange
      const userId = 1;

      // Act & Assert
      return fetchUser(userId).then(user => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user.id).toBe(userId);
      });
    });

    test('returns user data (async/await)', async () => {
      // Arrange
      const userId = 1;

      // Act
      const user = await fetchUser(userId);

      // Assert
      expect(user).toEqual({
        id: 1,
        name: 'User 1',
      });
    });

    test('handles multiple async calls', async () => {
      // Arrange
      const userIds = [1, 2, 3];

      // Act
      const users = await fetchUsers(userIds);

      // Assert
      expect(users).toHaveLength(3);
      expect(users[0].id).toBe(1);
      expect(users[1].id).toBe(2);
      expect(users[2].id).toBe(3);
    });
  });

  describe('fetchUserOrFail', () => {
    test('returns user for valid ID', async () => {
      // Arrange
      const userId = 1;

      // Act
      const user = await fetchUserOrFail(userId);

      // Assert
      expect(user.id).toBe(userId);
    });

    test('throws error for invalid ID', async () => {
      // Arrange
      const invalidId = -1;

      // Act & Assert
      await expect(fetchUserOrFail(invalidId)).rejects.toThrow('Invalid user ID');
    });

    test('handles error with try-catch', async () => {
      // Arrange
      const invalidId = 0;

      // Act & Assert
      try {
        await fetchUserOrFail(invalidId);
        // Should not reach here
        expect(true).toBe(false); // Force test to fail
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('Invalid user ID');
      }
    });
  });
});
```

**Verification Steps:**
1. Run tests: `pnpm test`
2. All async tests should pass
3. Check that tests wait for async operations

**Expected Output:**
```
PASS  src/__tests__/async.test.ts
  Async Functions
    fetchUser
      ✓ returns user data (promise) (105 ms)
      ✓ returns user data (async/await) (102 ms)
      ✓ handles multiple async calls (105 ms)
    fetchUserOrFail
      ✓ returns user for valid ID (102 ms)
      ✓ throws error for invalid ID (1 ms)
      ✓ handles error with try-catch (1 ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
```

**Hints:**
- Use `async/await` for cleaner async tests
- Return promises from tests (Jest waits)
- Use `expect().rejects` for testing errors
- Use `Promise.all()` for parallel async operations

**Common Mistakes:**
- ❌ Not awaiting async functions
- ❌ Not returning promises from tests
- ❌ Forgetting to handle errors
- ❌ Tests passing when they should fail (not awaiting)

**File:** `src/async.ts` and `src/__tests__/async.test.ts`

---

## Running Exercises

### Run All Tests

```bash
pnpm test
```

### Run Tests in Watch Mode

```bash
pnpm test --watch
```

### Run Specific Test File

```bash
pnpm test math.test.ts
```

### Run Tests with Coverage

```bash
pnpm test --coverage
```

## Verification Checklist

After completing all exercises, verify:

- [ ] All tests pass
- [ ] Tests follow AAA pattern
- [ ] Tests are organized with describe blocks
- [ ] Setup/teardown works correctly
- [ ] Async tests work properly
- [ ] Error handling is tested
- [ ] No test dependencies (tests can run in any order)
- [ ] Test names are descriptive

## Troubleshooting

### Issue: "Jest not found"

**Solution:**
```bash
# Follow the main setup guide (recommended)
pnpm add -D jest @jest/globals
pnpm add -D @swc/core @swc/jest
```

### Issue: Tests not running

**Solution:**
1. Check `package.json` has test script:
   ```json
   {
     "scripts": {
       "test": "jest"
     }
   }
   ```

2. Check Jest configuration in `jest.config.js` or `package.json`

### Issue: "Cannot find module" in tests

**Solution:**
- Check import paths are correct
- Verify files exist
- Check `tsconfig.json` paths configuration

### Issue: Async tests timing out

**Solution:**
- Increase timeout: `jest.setTimeout(10000)`
- Ensure you're awaiting async operations
- Check for infinite loops or hanging promises

### Issue: Tests affecting each other

**Solution:**
- Use `beforeEach` to reset state
- Don't share mutable state between tests
- Use `afterEach` for cleanup

## Next Steps

After completing these exercises:

1. ✅ **Review**: Understand test structure and patterns
2. ✅ **Experiment**: Add more test cases
3. ✅ **Practice**: Test edge cases and error scenarios
4. 📖 **Continue**: Move to [Level 2: Unit Testing](../level-02-unit-testing/lesson-01-jest-basics.md)
5. 💻 **Reference**: Check `project/` folder for complete implementation

## Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://jestjs.io/docs/snapshot-testing)
- [Async Testing Guide](https://jestjs.io/docs/asynchronous)

---

**Key Takeaways:**
- Use AAA pattern (Arrange-Act-Assert)
- Organize tests with describe blocks
- Use setup/teardown for test isolation
- Always await async operations in tests
- Test both success and error cases
- Keep tests independent and isolated
- Write descriptive test names

**Good luck! Happy testing!**
