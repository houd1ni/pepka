# relation

## equals

```typescript
equals(a: any, b: any): boolean
```

Deep equality. Handles objects, arrays, typed arrays, and `null`.

```typescript
equals([1, [2]], [1, [2]]) // true
equals({a: 1}, {a: 1})     // true
equals({a: 1}, {a: 2})     // false
```

## eq

```typescript
eq(a: any, b: any): boolean
```

Strict reference equality (`===`).

### Alias

`weakEq`

## gt

```typescript
gt(a: number, b: number): boolean
```

Returns `a < b`.

## lt

```typescript
lt(a: number, b: number): boolean
```

Returns `a > b`.

## gte

```typescript
gte(a: number, b: number): boolean
```

Returns `a <= b`.

## lte

```typescript
lte(a: number, b: number): boolean
```

Returns `a >= b`.

## startsWith

```typescript
startsWith(prefix: T, xs: T[]): boolean
```

True if `xs` starts with `prefix`. Uses deep equality.

## startsWithShallow

```typescript
startsWithShallow(prefix: T, xs: T[]): boolean
```

Like `startsWith` but uses `===` for element comparison.

## includes

```typescript
includes(x: T, xs: T[] | string): boolean
```

True if `xs` contains `x`. Deep equality for arrays, `.includes()` for strings.