# Testing Patterns

## AAA Pattern

```typescript
it('should do something', () => {
  // Arrange
  const input = 'test';
  
  // Act
  const result = process(input);
  
  // Assert
  expect(result).toBe('expected');
});
```

## Test Isolation

- Each test should be independent
- Use beforeEach/afterEach for setup
- Clean up after tests

## Mocking Strategy

- Mock external dependencies
- Mock slow operations
- Keep mocks simple

## Test Organization

- Group related tests with describe
- Use descriptive test names
- Keep tests focused
