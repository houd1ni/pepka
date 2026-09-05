# async

## composeAsync

```typescript
composeAsync(...fns: AnyFunc[]): Composed<TIn, Promise<TOut>>
```

Like `compose`, but each stage awaits a Promise if one is returned. Returns a `Promise`. Not curried.

```typescript
const f = composeAsync(
  async (x: number) => x + 1,
  (x: number) => Promise.resolve(x * 2)
)
await f(5) // 11
```

## waitAll

```typescript
waitAll<T>(promises: Promise<T>[]): Promise<T[]>
```

Wrapper for `Promise.all`.

## qwaitAll

```typescript
qwaitAll<T>(xs: Promise<T>[]): Promise<T[]>
```

Custom `Promise.all` that resolves with in-place resolved values (mutates the input array).

## forEachParallel

```typescript
forEachParallel(fn: (item: any) => Promise<any>, items: any[]): Promise<any[]>
```

Maps `fn` over `items` and runs all in parallel via `Promise.all`.

## forEachSerial

```typescript
forEachSerial(fn: (item: any) => Promise<any>, items: any[]): Promise<void>
```

Runs `fn` on each item sequentially, waiting for each to resolve.

## waitTap

```typescript
waitTap(fn: (s: any) => Promise<any>, s: T): Promise<T>
```

Awaits `fn(s)`, then returns `s` unchanged (async `tap`).

## qfilterAsync

```typescript
qfilterAsync(cond: (v: any, k: string | number) => Promise<boolean> | boolean, data: T): Promise<T>
```

Async filter — `cond` may be async. Mutates the input in place.

## QPromise

```typescript
class QPromise<T> extends Promise<T>
```

Cancelable Promise extension. The `cancel()` method rejects or resolves and calls an `oncancel` callback.

```typescript
const p = new QPromise((res, rej, onCancel) => {
  const t = setTimeout(res, 1000)
  onCancel(() => clearTimeout(t))
})
p.cancel() // cancels the timeout