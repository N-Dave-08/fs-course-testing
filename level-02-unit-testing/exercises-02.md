# Exercises 02: Unit Testing

## Learning Objectives

By completing these exercises, you will:
- ✅ Write unit tests for functions
- ✅ Test edge cases and error scenarios
- ✅ Create and use mocks
- ✅ Mock external dependencies
- ✅ Achieve good test coverage
- ✅ Understand testing best practices

## Before You Start

**Prerequisites:**
- Testing fundamentals (Level 1)
- Jest configured
- (Optional) Read mocking lesson first — this level teaches mocking as you go

**Setup:**
1. Navigate to `fs-course-testing/level-02-unit-testing/`
2. Ensure Jest is configured
3. Create `src/` and `src/__tests__/` directories

---

## Exercise 1: Function Tests

**Objective:** Write comprehensive tests for utility functions.

**Instructions:**
Create `src/utils.ts` with utility functions and `src/__tests__/utils.test.ts` with tests:
1. Test pure functions
2. Test edge cases
3. Test error cases

**Step-by-Step:**

1. **Create Utility Functions** (`src/utils.ts`):
```typescript
// src/utils.ts
/**
 * Calculates the factorial of a number
 */
export function factorial(n: number): number {
  if (n < 0) {
    throw new Error('Factorial is not defined for negative numbers');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formats a number as currency
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative');
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Clamps a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }
  return Math.min(Math.max(value, min), max);
}
```

2. **Create Tests** (`src/__tests__/utils.test.ts`):
```typescript
// src/__tests__/utils.test.ts
import {
  factorial,
  isValidEmail,
  formatCurrency,
  clamp,
} from '../utils';

describe('factorial', () => {
  test('calculates factorial of 0', () => {
    expect(factorial(0)).toBe(1);
  });

  test('calculates factorial of 1', () => {
    expect(factorial(1)).toBe(1);
  });

  test('calculates factorial of 5', () => {
    expect(factorial(5)).toBe(120);
  });

  test('throws error for negative numbers', () => {
    expect(() => factorial(-1)).toThrow('Factorial is not defined for negative numbers');
  });
});

describe('isValidEmail', () => {
  test('validates correct email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });

  test('rejects invalid email', () => {
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
  });

  test('handles edge cases', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('a@b.c')).toBe(true);
  });
});

describe('formatCurrency', () => {
  test('formats USD currency', () => {
    expect(formatCurrency(100)).toBe('$100.00');
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  test('formats different currencies', () => {
    expect(formatCurrency(100, 'EUR')).toContain('100');
  });

  test('throws error for negative amounts', () => {
    expect(() => formatCurrency(-10)).toThrow('Amount cannot be negative');
  });
});

describe('clamp', () => {
  test('clamps value within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  test('clamps value below minimum', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  test('clamps value above maximum', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  test('throws error if min > max', () => {
    expect(() => clamp(5, 10, 0)).toThrow('Min cannot be greater than max');
  });
});
```

**Verification Steps:**
1. Run tests: `pnpm test utils.test.ts`
2. All tests should pass
3. Check coverage

**Expected Output:**
```
PASS  src/__tests__/utils.test.ts
  factorial
    ✓ calculates factorial of 0 (1 ms)
    ✓ calculates factorial of 1
    ✓ calculates factorial of 5
    ✓ throws error for negative numbers
  isValidEmail
    ✓ validates correct email
    ✓ rejects invalid email
    ✓ handles edge cases
  formatCurrency
    ✓ formats USD currency
    ✓ formats different currencies
    ✓ throws error for negative amounts
  clamp
    ✓ clamps value within range
    ✓ clamps value below minimum
    ✓ clamps value above maximum
    ✓ throws error if min > max
```

**File:** `src/utils.ts` and `src/__tests__/utils.test.ts`

---

## Exercise 2: Mocking

**Objective:** Create and use mocks for external dependencies.

**Instructions:**
Create `src/service.ts` with external dependencies and `src/__tests__/service.test.ts` with mocks:
1. Mock external API calls
2. Mock database operations
3. Verify mock calls

**Step-by-Step:**

1. **Create Service** (`src/service.ts`):
```typescript
// src/service.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserRepository {
  findById: (id: number) => Promise<User | null>;
  create: (data: Omit<User, "id">) => Promise<User>;
}

export type FetchFn = (
  url: string
) => Promise<{ ok: boolean; json: () => Promise<User> }>;

export class UserService {
  constructor(
    private repo: UserRepository,
    private fetchFn: FetchFn
  ) {}

  async getUserById(id: number): Promise<User | null> {
    return this.repo.findById(id);
  }

  async createUser(name: string, email: string): Promise<User> {
    return this.repo.create({ name, email });
  }

  async fetchUserFromAPI(userId: string): Promise<User> {
    const response = await this.fetchFn(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  }
}
```

2. **Create Tests with Mocks** (`src/__tests__/service.test.ts`):
```typescript
// src/__tests__/service.test.ts
import { UserService, UserRepository, FetchFn } from "../service";

describe('UserService', () => {
  let userService: UserService;
  let repo: UserRepository;
  let fetchFn: jest.MockedFunction<FetchFn>;

  beforeEach(() => {
    repo = {
      findById: jest.fn(),
      create: jest.fn(),
    };
    fetchFn = jest.fn();
    userService = new UserService(repo, fetchFn);
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    test('returns user when found', async () => {
      const mockUser = { id: 1, name: 'Alice', email: 'alice@example.com' };
      (repo.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.getUserById(1);

      expect(result).toEqual(mockUser);
      expect(repo.findById).toHaveBeenCalledWith(1);
    });

    test('returns null when user not found', async () => {
      (repo.findById as jest.Mock).mockResolvedValue(null);

      const result = await userService.getUserById(999);

      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    test('creates user successfully', async () => {
      const mockUser = { id: 1, name: 'Bob', email: 'bob@example.com' };
      (repo.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.createUser('Bob', 'bob@example.com');

      expect(result).toEqual(mockUser);
      expect(repo.create).toHaveBeenCalledWith({ name: "Bob", email: "bob@example.com" });
    });
  });

  describe('fetchUserFromAPI', () => {
    test('fetches user from API successfully', async () => {
      const mockUser = { id: 1, name: 'Charlie', email: 'charlie@example.com' };
      fetchFn.mockResolvedValue({
        ok: true,
        json: async () => mockUser,
      });

      const result = await userService.fetchUserFromAPI('1');

      expect(result).toEqual(mockUser);
      expect(fetchFn).toHaveBeenCalledWith('https://api.example.com/users/1');
    });

    test('throws error when API fails', async () => {
      fetchFn.mockResolvedValue({
        ok: false,
      });

      await expect(userService.fetchUserFromAPI('1')).rejects.toThrow('Failed to fetch user');
    });
  });
});
```

**Verification Steps:**
1. Run tests
2. Verify mocks are called
3. Check mock return values

**Expected Behavior:**
- Mocks replace real dependencies
- Can verify mock calls
- Can control mock behavior
- Tests run without external dependencies

**Hints:**
- Prefer dependency injection (constructor params) for easy mocking
- `jest.fn()` creates mock functions
- `mockResolvedValue()` for async mocks
- `toHaveBeenCalledWith()` verifies calls

**Common Mistakes:**
- ❌ Not clearing mocks between tests
- ❌ Wrong mock setup
- ❌ Not verifying mock calls

**File:** `src/service.ts` and `src/__tests__/service.test.ts`

---

## Exercise 3: Test Coverage

**Objective:** Achieve good test coverage.

**Instructions:**
1. Test all code paths
2. Test error handling
3. Check coverage report
4. Aim for 80%+ coverage

**Coverage Commands:**
```bash
# Run tests with coverage
pnpm test --coverage

# Or configure in package.json
# "test:coverage": "jest --coverage"
```

**Coverage Goals:**
- **Statements**: 80%+
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+

**Verification Steps:**
1. Run coverage report
2. Identify untested code
3. Add tests for missing coverage
4. Re-run coverage

**Expected Coverage Report:**
```
File      | % Stmts | % Branch | % Funcs | % Lines
----------|---------|----------|---------|--------
utils.ts  |     100 |      100 |     100 |    100
service.ts|      95 |       90 |     100 |     95
```

**Hints:**
- Test all branches (if/else)
- Test error cases
- Test edge cases
- Don't aim for 100% (unrealistic)

**Common Mistakes:**
- ❌ Only testing happy path
- ❌ Missing error cases
- ❌ Not testing edge cases
- ❌ Ignoring coverage report

**Command:** `pnpm test:coverage` or `pnpm test --coverage`

---

## Running Exercises

### Run All Tests

```bash
pnpm test
```

### Run with Coverage

```bash
pnpm test --coverage
```

### Run Specific Test File

```bash
pnpm test utils.test.ts
```

## Verification Checklist

After completing all exercises, verify:

- [ ] All functions have tests
- [ ] Edge cases are tested
- [ ] Error cases are tested
- [ ] Mocks work correctly
- [ ] Mock calls are verified
- [ ] Coverage is 80%+
- [ ] Tests are isolated
- [ ] Tests run fast

## Troubleshooting

### Issue: Mocks not working

**Solution:**
- Check mock setup is correct
- Verify jest.mock() is called
- Clear mocks in beforeEach

### Issue: Coverage too low

**Solution:**
- Add tests for missing branches
- Test error cases
- Test edge cases
- Check coverage report details

### Issue: Tests affecting each other

**Solution:**
- Use beforeEach/afterEach
- Clear mocks between tests
- Don't share state

## Next Steps

1. ✅ **Review**: Understand unit testing
2. ✅ **Experiment**: Add more test cases
3. 📖 **Continue**: Move to [Level 3: Frontend Testing](../level-03-frontend-testing/lesson-01-react-testing-library.md)
4. 💻 **Reference**: Check `project/` folder

---

**Key Takeaways:**
- Test all code paths
- Mock external dependencies
- Test edge cases and errors
- Aim for good coverage (80%+)
- Keep tests isolated
- Verify mock behavior
- Write descriptive test names

**Good luck! Happy testing!**
