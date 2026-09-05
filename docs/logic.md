# logic

## ifElse

```typescript
ifElse(cond: (x: any) => boolean, pipeYes: (x: any) => any, pipeNo: (x: any) => any, x: any): any
```

If `cond(x)` is truthy, returns `pipeYes(x)`, otherwise `pipeNo(x)`.

```typescript
const abs = ifElse((x: number) => x < 0, x => -x, identity)
abs(-5) // 5
abs(5)  // 5
```

## when

```typescript
when(cond: (x: any) => boolean, pipe: (x: any) => any, x: any): any
```

If `cond(x)` is truthy, returns `pipe(x)`, otherwise returns `x` unchanged.

```typescript
const doubleIfEven = when((x: number) => x % 2 === 0, x => x * 2)
doubleIfEven(4) // 8
doubleIfEven(3) // 3
```

## cond

```typescript
cond(pairs: [pred: (x: any) => boolean, fn: (x: any) => any][], x: any): any
```

Returns the result of the first pair whose predicate matches.

```typescript
const classify = cond([
  [(x: number) => x < 0, () => 'negative'],
  [(x: number) => x === 0, () => 'zero'],
  [(x: number) => x > 0, () => 'positive'],
])
classify(-5) // 'negative'
classify(0)  // 'zero'
classify(5)  // 'positive'
```

## complement

```typescript
complement<F extends AnyFunc>(fn: F): (...args: any[]) => boolean
```

Returns a function that returns the logical negation of `fn(...args)`.

```typescript
const isEven = (x: number) => x % 2 === 0
const isOdd = complement(isEven)
isOdd(3) // true
```

### Alias

`notf`

## not

```typescript
not(x: any): boolean
```

Logical negation of `x`.

## both

```typescript
both(cond1: Cond, cond2: Cond, x: any): boolean
```

True if both conditions are satisfied for `x`.

## allPass

```typescript
allPass(preds: Cond[], x: any): boolean
```

True if all predicates return true for `x`.

## anyPass

```typescript
anyPass(preds: Cond[], x: any): boolean
```

True if any predicate returns true for `x`.

## T

```typescript
T(...args: any[]): true
```

Always returns `true`.

## F

```typescript
F(...args: any[]): false
```

Always returns `false`.