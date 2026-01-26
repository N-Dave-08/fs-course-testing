# Exercises 03: Frontend Testing

## Learning Objectives

By completing these exercises, you will:
- ✅ Test React components with React Testing Library
- ✅ Test component rendering and props
- ✅ Test user interactions
- ✅ Test custom hooks
- ✅ Write integration tests
- ✅ Practice frontend testing best practices

## Before You Start

**Prerequisites:**
- Testing fundamentals (Level 1)
- React Testing Library installed
- Understanding of React components
- Jest configured

**Setup:**
1. Navigate to `fs-course-testing/level-03-frontend-testing/`
2. Install: `pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event`
3. Create `src/` and `src/__tests__/` directories

---

## Exercise 1: Component Tests

**Objective:** Test React components.

**Instructions:**
Create `src/components/Button.tsx` and `src/__tests__/components/Button.test.tsx`:
1. Test rendering
2. Test props
3. Test user interactions

**Step-by-Step:**

1. **Create Component** (`src/components/Button.tsx`):
```typescript
// src/components/Button.tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export default function Button({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}
```

2. **Create Tests** (`src/__tests__/components/Button.test.tsx`):
```typescript
// src/__tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../../components/Button';

describe('Button Component', () => {
  test('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies variant class', () => {
    render(<Button label="Click me" onClick={() => {}} variant="secondary" />);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveClass('btn-secondary');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button label="Click me" onClick={() => {}} disabled />);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeDisabled();
  });
});
```

**Verification:**
- All tests pass
- Component renders correctly
- Interactions work

**File:** `src/components/Button.tsx` and `src/__tests__/components/Button.test.tsx`

---

## Exercise 2: Hook Tests

**Objective:** Test custom hooks.

**Instructions:**
Create `src/hooks/useCounter.ts` and `src/__tests__/hooks/useCounter.test.ts`:
1. Test state changes
2. Test effects
3. Test return values

**Step-by-Step:**

1. **Create Hook** (`src/hooks/useCounter.ts`):
```typescript
// src/hooks/useCounter.ts
import { useState } from 'react';

export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
```

2. **Create Tests** (`src/__tests__/hooks/useCounter.test.ts`):
```typescript
// src/__tests__/hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../../hooks/useCounter';

describe('useCounter Hook', () => {
  test('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  test('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  test('increments count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  test('decrements count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });

  test('resets count', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(10);
  });
});
```

**Verification:**
- Hook tests pass
- State changes work
- All methods work

**File:** `src/hooks/useCounter.ts` and `src/__tests__/hooks/useCounter.test.ts`

---

## Exercise 3: Integration Tests

**Objective:** Test component integration.

**Instructions:**
Create a small form component and an integration test:
1. Create `src/components/UserForm.tsx`
2. Create `src/__tests__/integration/UserFlow.test.tsx`
1. Test multiple components together
2. Test data flow
3. Test user workflows

### Create the component (`src/components/UserForm.tsx`)

```typescript
import { useState } from "react";

export default function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSuccess(true);
      }}
    >
      <label>
        Name
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Email
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <button type="submit">Submit</button>

      {success ? <div>Success</div> : null}
    </form>
  );
}
```

**Expected Code Structure:**
```typescript
// src/__tests__/integration/UserFlow.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserForm from '../../components/UserForm';

describe('User Flow Integration', () => {
  test('complete user registration flow', async () => {
    const user = userEvent.setup();
    render(<UserForm />);

    // Fill form
    await user.type(screen.getByLabelText(/name/i), 'Alice');
    await user.type(screen.getByLabelText(/email/i), 'alice@example.com');

    // Submit
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Verify success
    expect(await screen.findByText(/success/i)).toBeInTheDocument();
  });
});
```

**Verification:**
- Integration tests pass
- User flows work
- Components work together

**File:** `src/__tests__/integration/UserFlow.test.tsx`

---

## Running Exercises

```bash
pnpm test
```

## Verification Checklist

- [ ] Component tests pass
- [ ] Hook tests pass
- [ ] Integration tests pass
- [ ] All interactions work
- [ ] Best practices followed

## Next Steps

1. ✅ **Review**: Understand frontend testing
2. ✅ **Experiment**: Add more tests
3. 📖 **Continue**: Move to [Level 4: Backend Testing](../level-04-backend-testing/lesson-01-api-testing.md)
4. 💻 **Reference**: Check `project/` folder

---

**Key Takeaways:**
- Test user interactions, not implementation
- Use React Testing Library
- Test accessibility
- Test user flows
- Keep tests simple and focused

**Good luck! Happy testing!**
