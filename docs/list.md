# list

## map

```typescript
map(fn: (x: T, i?: number, list?: T[]) => U, arr: T[]): U[]
```

Maps `fn` over `arr`, producing a new array.

```typescript
map(x => x * 2, [1, 2, 3]) // [2, 4, 6]
```

## qmap

```typescript
qmap(pipe: (s: any, i?: number, list?: T) => any, arr: T): T
```

Maps `pipe` over `arr` in place. Returns the mutated `arr`.

## filter

```typescript
filter(pred: (x: T, i?: number) => boolean, arr: T[]): T[]
```

Returns a new array with only elements for which `pred` is true.

```typescript
filter(x => x > 2, [1, 2, 3, 4]) // [3, 4]
```

## qfilter

```typescript
qfilter(cond: (v: any, k: string | number) => boolean, data: T): T
```

Filters in place — removes elements/keys where `cond` is false. Works on arrays and objects.

## reduce

```typescript
reduce(fn: Reducer<T>, initial: T, arr: any[]): T
```

Left-to-right fold. `Reducer<T> = (accum: T, cur: any, index: number) => T`.

```typescript
reduce((a, b) => a + b, 0, [1, 2, 3]) // 6
```

## qreduce

```typescript
qreduce(fn: Reducer, accum: any, arr: T[]): any
```

In-place `Array.reduce`.

## forEach

```typescript
forEach(fn: (x: T, i: number, arr: T[]) => any, arr: any[]): void
```

Calls `fn` for each element. Returns `undefined`.

## append

```typescript
append(x: T, xs: T[]): T[]
```

Returns a **new** array with `x` at the end.

```typescript
append(4, [1, 2, 3]) // [1, 2, 3, 4]
```

### Alias

`push`

## qappend

```typescript
qappend(s: any, xs: any[]): any[]
```

Pushes `s` into `xs` in place. Returns `xs`.

### Alias

`qpush`

## prepend

```typescript
prepend(x: T, xs: T[]): T[]
```

Returns a **new** array with `x` at the front.

```typescript
prepend(0, [1, 2, 3]) // [0, 1, 2, 3]
```

## qprepend

```typescript
qprepend(x: any, xs: any[]): number
```

`xs.unshift(x)` in place.

## concat

```typescript
concat(xs1: T[], xs2: T[]): T[]
```

Concatenates two arrays or strings.

```typescript
concat([1, 2], [3, 4]) // [1, 2, 3, 4]
concat('ab', 'cd')     // 'abcd'
```

## head

```typescript
head(s: string | T[]): string | T | undefined
```

First element of an array or first character of a string.

```typescript
head([1, 2, 3]) // 1
head('abc')     // 'a'
```

## tail

```typescript
tail(s: string | T[]): string | T[]
```

All elements after the first.

```typescript
tail([1, 2, 3]) // [2, 3]
tail('abc')     // 'bc'
```

## last

```typescript
last(s: string | T[]): string | T | undefined
```

Last element of an array or last character of a string.

```typescript
last([1, 2, 3]) // 3
last('abc')     // 'c'
```

## nth

```typescript
nth(i: number, data: string | ArrayLike<T>): T | string
```

Element at index `i`.

```typescript
nth(1, [10, 20, 30]) // 20
nth(0, 'abc')        // 'a'
```

## slice

```typescript
slice(from: number, to: number, o: any[] | string): any[] | string
```

Shallow copy of a portion.

```typescript
slice(1, 3, [1, 2, 3, 4]) // [2, 3]
```

## qslice

```typescript
qslice(from: number, to: number, xs: any[] | string): any[] | string
```

Slices in place for arrays (shifts elements left, truncates). Strings are immutable so a copy is returned.

## flat

```typescript
flat(xs: any[]): any[]
```

Fully flattens an array to any depth.

```typescript
flat([1, [2, [3, [4]]]]) // [1, 2, 3, 4]
```

## flatShallow

```typescript
flatShallow(xs: any[]): any[]
```

Flattens one level deep.

```typescript
flatShallow([1, [2, [3]]]) // [1, 2, [3]]
```

## flatTo

```typescript
flatTo(depth: number, xs: any[]): any[]
```

Flattens up to `depth`.

```typescript
flatTo(2, [1, [2, [3, [4]]]]) // [1, 2, 3, [4]]
```

## sort

```typescript
sort(sortFn: (a: T, b: T) => number, xs: T[]): T[]
```

Returns a **new** sorted array (does not mutate).

```typescript
sort((a, b) => a - b, [3, 1, 2]) // [1, 2, 3]
```

## qsort

```typescript
qsort(sortFn: (a: any, b: any) => number, xs: any[]): any[]
```

`xs.sort(sortFn)` in place.

## find

```typescript
find(pred: (x: T) => boolean, arr: T[]): T | undefined
```

First element satisfying `pred`.

```typescript
find(x => x > 2, [1, 2, 3]) // 3
```

## findIndex

```typescript
findIndex(pred: (x: T) => boolean, arr: T[]): number
```

Index of first element satisfying `pred`, or `-1`.

## indexOf

```typescript
indexOf(x: T, xs: T[]): number
```

Index of `x` using deep equality, or `-1`.

## uniq

```typescript
uniq(xs: T[]): T[]
```

Returns a **new** array with duplicates removed (deep equality).

```typescript
uniq([1, 1, 2, 3, 2]) // [1, 2, 3]
```

## quniq

```typescript
quniq(xs: any[]): any[]
```

Removes duplicates in place (deep equality). Uses `identity` as the getter.

### Alias

`quniqBy`

## uniqWith

```typescript
uniqWith(cond: (x: any, y: any) => boolean, xs: T[]): T[]
```

Removes duplicates using `cond` for comparison.

```typescript
uniqWith((a, b) => a.id === b.id, [{id:1}, {id:2}, {id:1}]) // [{id:1}, {id:2}]
```

## quniqWith

```typescript
quniqWith(getter: AnyFunc, xs: any[]): any[]
```

Removes duplicates in place, comparing by `getter(x)`.

## uniqBy

```typescript
uniqBy(getter: (x: T) => any, xs: T[]): T[]
```

Removes duplicates by `getter(x)`. Alias of `uniqWith`.

## intersection

```typescript
intersection(xs1: T[], xs2: T[]): T[]
```

Elements in `xs1` that also appear in `xs2`.

## diff

```typescript
diff(xs1: T[], xs2: T[]): T[]
```

Elements in `xs1` that do not appear in `xs2`.

## reverse

```typescript
reverse(xs: T[]): T[]
```

Returns a **new** reversed array (uses `toReversed()`).

## qreverse

```typescript
qreverse(arr: any[]): any[]
```

`arr.reverse()` in place.

## range

```typescript
range(from: number, to: number): number[]
```

Generates integers from `from` to `to - 1`.

```typescript
range(0, 5) // [0, 1, 2, 3, 4]
range(3, 6) // [3, 4, 5]
```

## genBy

```typescript
genBy(generator: (i: number) => T, length: number): T[]
```

Generates an array by calling `generator(i)` for each index.

```typescript
genBy(i => i * 2, 5) // [0, 2, 4, 6, 8]
```

## zip

```typescript
zip(a: T1[], b: T2[]): [T1, T2][]
```

Zips two arrays into pairs.

```typescript
zip([1, 2], ['a', 'b']) // [[1, 'a'], [2, 'b']]
```

## zipObj

```typescript
zipObj(keys: K[], values: V[]): { [k: string]: V }
```

Zips two arrays into an object.

```typescript
zipObj(['a', 'b'], [1, 2]) // { a: 1, b: 2 }
```

## zipWith

```typescript
zipWith(fn: (a: T1, b: T2) => T3, a: T1[], b: T2[]): T3[]
```

Zips using a combining function.

```typescript
zipWith((a, b) => a + b, [1, 2], [10, 20]) // [11, 22]
```

## all

```typescript
all(pred: (x: T) => boolean, xs: T[]): boolean
```

True if `pred` is true for every element.

## any

```typescript
any(pred: (x: T) => boolean, xs: T[]): boolean
```

True if `pred` is true for at least one element.

### Alias

`some`

## join

```typescript
join(sep: string, xs: any[]): string
```

Joins array elements with separator.

## length

```typescript
length(s: T[] | string | TypedArray): number
```

Returns `.length` of arrays, strings, or typed arrays.

## sizeof

```typescript
sizeof(s: any[] | string | AnyObject): number
```

Number of indices (keys for objects, length for arrays/strings).

## qempty

```typescript
qempty<T>(o: T): T extends any[] ? [] : {}
```

Empties `o` in place (splices arrays, deletes all keys from objects).