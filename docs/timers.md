# timers

## debounce

```typescript
debounce<T extends AnyFunc>(time: number, fn: T): (...args: Parameters<T>) => Promise<ReturnType<T>>
```

Returns a debounced version of `fn`. Calls within `time` ms reset the timer. Resolves with the latest result when the timer fires. Not curried.

```typescript
const search = debounce(300, async (q: string) => fetch(`/api?q=${q}`))
search('a')   // cancelled
search('ab')  // cancelled
search('abc') // fires after 300ms
```

## throttle

```typescript
throttle<T extends AnyFunc>(time: number, fn: T): (...args: Parameters<T>) => ReturnType<T>
```

Returns a throttled version of `fn`. Calls during the `time` ms cooldown are ignored; the last result is returned. Not curried.

## wait

```typescript
wait(time: number): QPromise<any>
```

Returns a cancelable promise that resolves after `time` ms.