# Testing Cheatsheet

## Jest Matchers

```typescript
expect(value).toBe(4);
expect(value).toEqual({ a: 1 });
expect(value).toBeTruthy();
expect(value).toContain('item');
expect(value).toHaveLength(3);
expect(() => fn()).toThrow();
```

## React Testing Library

```typescript
render(<Component />);
screen.getByText('Hello');
screen.getByRole('button');
fireEvent.click(button);
```

## Supertest

```typescript
await request(app).get('/users').expect(200);
await request(app).post('/users').send(data).expect(201);
```

## Playwright

```typescript
await page.goto('/');
await page.fill('input', 'value');
await page.click('button');
await expect(page).toHaveURL('/dashboard');
```
