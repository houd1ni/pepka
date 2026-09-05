# function

## compose

```typescript
compose(...fns: AnyFunc[]): Composed<TIn, TOut>
```

Not curried.

Performs right-to-left function composition. The rightmost function may accept any number of arguments; the remaining functions accept a single value.

```typescript
const f = compose(Math.floor, (x: number) => x * 3.7)
f(5) // 18
```

## composeAsync

```typescript
composeAsync(...fns: AnyFunc[]): Composed<TIn, Promise<TOut>>
```

Not curried.

Like `compose`, but each stage awaits a Promise if one is returned. Returns a `Promise`.

```typescript
const f = composeAsync(
  async (x: number) => x + 1,
  (x: number) => Promise.resolve(x * 2)
)
await f(5) // 11
```

## curry

```typescript
curry(fn: AnyFunc):
```

Curries a function of any arity. Supports the `__` placeholder for partial application in any position.

```typescript
const add3 = curry((a: number, b: number, c: number) => a + b + c)
add3(1)(2)(3)   // 6
add3(1, 2)(3)   // 6
add3(1)(2, 3)   // 6
add3(1, 2, 3)   // 6
```

## curry2

```typescript
curry2<Func extends (a: any, b: any) => any>(fn: Func):2
```

Curries a binary function. More performant than `curry` for two-argument functions.

```typescript
const add = curry2((a: number, b: number) => a + b)
add(1)(2) // 3
add(1, 2) // 3
```

## curry3

```typescript
curry3<Func extends (a: any, b: any, c: any) => any>(fn: Func):3
```

Curries a ternary function.

```typescript
const f = curry3((a: number, b: number, c: number) => a * b + c)
f(1)(2)(3) // 5
f(1, 2, 3) // 5
```

## __

```typescript
const __: Placeholder = Symbol('Placeholder')
```

Placeholder symbol for partial application with `curry`. Skip an argument position.

```typescript
const f = curry((a: number, b: number, c: number) => a - b + c)
f(__, 2, 3)(1)  // 2
f(1, __, 3)(2)  // 2
```

## uncurry

```typescript
uncurry(fn: AnyFunc): AnyFunc
```

Converts a curried function back to a function that accepts all arguments at once.

```typescript
const add = curry2((a: number, b: number) => a + b)
uncurry(add)(1, 2) // 3
```

## flip

```typescript
flip<T extends AnyFunc>(fn: T):2
```

Returns a curried function that swaps the first two arguments of `fn`.

```typescript
const div = curry2((a: number, b: number) => a / b)
flip(div)(2)(10) // 5 (10 / 2)
```

## bind

```typescript
bind(fn: AnyFunc, context: any): AnyFunc
```

`Function.prototype.bind`.

```typescript
const obj = { x: 42, getX() { return this.x } }
bind(obj.getX, obj)() // 42
```

## memoize

```typescript
memoize(fn: AnyFunc, resolver?: (args: any[]) => string): AnyFunc
```

Returns a memoized version of `fn` that caches results. Optional `resolver` produces a custom cache key. Not curried.

```typescript
const expensive = memoize((n: number) => n * 2)
expensive(5) // 10 (computed)
expensive(5) // 10 (cached)
```

## once

```typescript
once<Func extends AnyFunc>(fn: Func): Func
```

Returns a function that invokes `fn` at most once. Subsequent calls return the first result.

```typescript
const init = once(() => console.log('init'))
init() // logs 'init'
init() // noop
```

## tap

```typescript
tap(fn: AnyFunc, x: T): T
```

Calls `fn(x)` for side effects, returns `x` unchanged.

```typescript
compose(tap(console.log), (x: number) => x * 2)(5) // logs 10, returns 10
```

## callWith

```typescript
callWith(args: any[], fn: AnyFunc): any
```

Calls `fn(...args)`.

```typescript
callWith([1, 2, 3], (a, b, c) => a + b + c) // 6
```

## callFrom

```typescript
callFrom(args: any[], fn: string, o: AnyObject): any
```

Calls `o[fn](...args)`.

```typescript
callFrom(['hello'], 'toUpperCase', 'hi') // 'HI'
```

## identity

```typescript
identity<T>(s: T): T
```

Returns its argument unchanged.

```typescript
identity(42) // 42
```

### Aliases

`mirror`, `reflect`, `echo`

## always

```typescript
always<T>(s: T): () => T
```

Returns a function that always returns `s`.

```typescript
const f = always(42)
f() // 42
```

## explore

```typescript
explore(caption: string, level?: 'log' | 'warn' | 'error'): (x: T) => T
```

Like `tap`, but logs `caption` and `x` at the given console level. Useful in `compose` chains for debugging. Not curried.

```typescript
compose(explore('the number'), (x: number) => x * 2)(5) // logs 'the number', 10
```

## take

```typescript
take(argN: number): (...args: any[]) => any
```

Returns a function that picks the nth argument.

```typescript
const second = take(1)
second(1, 2, 3) // 2
```

## noop

```typescript
noop(...args: any[]): void
```

No-operation. Accepts any arguments, returns `undefined`.