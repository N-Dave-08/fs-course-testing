# Coverage Best Practices

## Coverage Goals

- **Aim for 80%+ coverage** of critical paths
- **Focus on business logic** over implementation
- **Test edge cases** and error handling

## What to Test

- ✅ Business logic
- ✅ User-facing features
- ✅ Error handling
- ✅ Edge cases

## What Not to Test

- ❌ Third-party library code
- ❌ Framework code
- ❌ Trivial getters/setters
- ❌ Implementation details

## Coverage Tools

```bash
# Generate coverage report
pnpm test:coverage

# View in browser
open coverage/lcov-report/index.html
```
