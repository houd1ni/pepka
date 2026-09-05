# object

## assoc

```typescript
assoc(key: string, val: T, obj: AnyObject): AnyObject
```

Sets `key` to `val` on a shallow clone of `obj`.

```typescript
assoc('x', 42, {a: 1}) // {a: 1, x: 42}
```

## qassoc

```typescript
qassoc(prop: string, v: any, obj: AnyObject): AnyObject
```

Sets `obj[prop] = v` in place. Returns `obj`.

## assocPath

```typescript
assocPath(path: string[], val: T, obj: AnyObject): AnyObject
```

Sets a nested path on a shallow clone.

```typescript
assocPath(['a', 'b'], 42, {a: {}}) // {a: {b: 42}}
```

## qassocPath

```typescript
qassocPath(path: string[], v: any, o: AnyObject): AnyObject
```

Sets a nested path in place.

## prop

```typescript
prop(key: string, o: AnyObject): any
```

Returns `o[key]`.

```typescript
prop('x', {x: 42}) // 42
```

## propEq

```typescript
propEq(key: string, val: any, o: AnyObject): boolean
```

True if `o[key]` deeply equals `val`.

```typescript
propEq('x', 42, {x: 42}) // true
```

## propsEq

```typescript
propsEq(key: string, o1: AnyObject, o2: AnyObject): boolean
```

True if `o1[key]` deeply equals `o2[key]`.

## path

```typescript
path(path: (string|number)[], o: AnyObject): any
```

Reads a nested property.

```typescript
path(['a', 'b'], {a: {b: 42}}) // 42
```

## pathOr

```typescript
pathOr(default: T, path: (string|number)[], o: AnyObject): T | any
```

Reads a nested property or returns `default`.

```typescript
pathOr(0, ['a', 'b'], {a: {}}) // 0
```

## pathEq

```typescript
pathEq(path: (string|number)[], val: any, o: AnyObject): boolean
```

True if the value at `path` deeply equals `val`.

## pathsEq

```typescript
pathsEq(path: (string|number)[], o1: AnyObject, o2: AnyObject): boolean
```

True if `o1` and `o2` have deeply equal values at `path`.

## pathExists

```typescript
pathExists(path: (string|number)[], o: AnyObject): boolean
```

True if a non-symbol value exists at `path`.

## pick

```typescript
pick(keys: string[], o: AnyObject): AnyObject
```

Returns a new object with only `keys`.

```typescript
pick(['a', 'b'], {a: 1, b: 2, c: 3}) // {a: 1, b: 2}
```

## qpick

```typescript
qpick(props: string[], o: AnyObject): AnyObject
```

Deletes all keys from `o` except `props`, in place.

## pickBy

```typescript
pickBy(pred: (v: any, k: string) => boolean, o: AnyObject): AnyObject
```

Returns a new object with keys for which `pred` is true.

```typescript
pickBy(v => v > 1, {a: 1, b: 2}) // {b: 2}
```

## omit

```typescript
omit(keys: string[], o: AnyObject): AnyObject
```

Returns a new object without `keys`.

```typescript
omit(['a'], {a: 1, b: 2}) // {b: 2}
```

## qomit

```typescript
qomit(props: string[], o: AnyObject): AnyObject
```

Removes `props` from `o` in place.

## keys

```typescript
keys(o: AnyObject): string[]
```

Own enumerable keys.

```typescript
keys({a: 1, b: 2}) // ['a', 'b']
```

## values

```typescript
values(o: AnyObject | any[]): any[]
```

Own enumerable values.

## toPairs

```typescript
toPairs(o: AnyObject | any[]): [string, any][]
```

Key-value pairs.

```typescript
toPairs({a: 1}) // [['a', 1]]
```

## fromPairs

```typescript
fromPairs(pairs: [string, any][]): AnyObject
```

Builds an object from key-value pairs.

```typescript
fromPairs([['a', 1], ['b', 2]]) // {a: 1, b: 2}
```

## clone

```typescript
clone<T>(s: T, shallow?: boolean): T
```

Deep clones any value (objects, arrays, typed arrays, dates, etc).

```typescript
const o = {a: [1]}
const c = clone(o)
c.a[0] = 9
o.a[0] // 1 (unchanged)
```

## cloneShallow

```typescript
cloneShallow(s: any): any
```

Shallow clone (one level).

```typescript
const o = {a: {b: 1}}
const c = cloneShallow(o)
c.a === o.a // true (same reference)
```

## freeze

```typescript
freeze<T>(o: T): Readonly<T>
```

Deep freezes a clone of `o` recursively.

```typescript
const o = freeze({a: {b: 1}})
o.a.b = 9 // TypeError
```

## qfreeze

```typescript
qfreeze<T>(o: T): Readonly<T>
```

Deep freezes `o` in place (recursively).

## freezeShallow

```typescript
freezeShallow<T>(o: T): Readonly<T>
```

Shallow freezes a clone of `o`.

## qfreezeShallow

```typescript
qfreezeShallow<T>(o: T): Readonly<T>
```

Shallow freezes `o` in place.

## mergeShallow

```typescript
mergeShallow(o1: AnyObject, o2: AnyObject): AnyObject
```

Shallow merge into a new object.

```typescript
mergeShallow({a: 1}, {b: 2}) // {a: 1, b: 2}
```

## qmergeShallow

```typescript
qmergeShallow(o1: AnyObject, o2: AnyObject): AnyObject
```

`Object.assign(o1, o2)` in place.

## mergeDeep

```typescript
mergeDeep(o1: AnyObject, o2: AnyObject): AnyObject
```

Deep merge into a clone. Arrays are replaced.

```typescript
mergeDeep({a: {x: 1}}, {a: {y: 2}}) // {a: {x: 1, y: 2}}
```

## qmergeDeep

```typescript
qmergeDeep(o1: AnyObject, o2: AnyObject): AnyObject
```

Deep merge into `o1` in place. Arrays are replaced.

## mergeDeepX

```typescript
mergeDeepX(o1: AnyObject, o2: AnyObject): AnyObject
```

Deep merge. Arrays at same keys are merged element-wise by index.

```typescript
mergeDeepX({a: [1, {b: 1}]}, {a: [2]}) // {a: [2, {b: 1}]}
```

## qmergeDeepX

```typescript
qmergeDeepX(o1: AnyObject, o2: AnyObject): AnyObject
```

Deep merge in place. Arrays at same keys are merged element-wise by index.

## mergeDeepAdd

```typescript
mergeDeepAdd(o1: AnyObject, o2: AnyObject): AnyObject
```

Deep merge. Arrays at same keys are concatenated.

```typescript
mergeDeepAdd({a: [1]}, {a: [2]}) // {a: [1, 2]}
```

## qmergeDeepAdd

```typescript
qmergeDeepAdd(o1: AnyObject, o2: AnyObject): AnyObject
```

Deep merge in place. Arrays at same keys are concatenated.

## mapKeys

```typescript
mapKeys(keyMap: {[old: string]: string | AnyFunc}, o: AnyObject): AnyObject
```

Renames keys on a clone. Removes a key when new name is `null`. Values can be transformed via a function.

```typescript
mapKeys({a: 'b'}, {a: 44}) // {b: 44}
```

## qmapKeys

```typescript
qmapKeys(keyMap: {[old: string]: string | AnyFunc}, o: AnyObject): AnyObject
```

Renames keys in place. Removes a key when new name is `null`.

```typescript
qmapKeys({a: 'b'}, {a: 44}) // {b: 44}
```

## mapObj

```typescript
mapObj(fn: (v: any, k: string, o: AnyObject) => any, o: AnyObject): AnyObject
```

Maps values of an object, producing a new object.

```typescript
mapObj(v => v * 2, {a: 1}) // {a: 2}
```

## qmapObj

```typescript
qmapObj(pipe: (s: any, k?: string, o?: AnyObject) => any, o: AnyObject): AnyObject
```

Maps values of `o` in place.

## overProp

```typescript
overProp(prop: string, fn: AnyFunc, o: AnyObject): AnyObject
```

Applies `fn` to `o[prop]` and sets the result.

```typescript
overProp('x', v => v + 1, {x: 1}) // {x: 2}
```

### Alias

`propLens`

## qoverProp

```typescript
qoverProp(prop: string, pipe: AnyFunc, data: any): any
```

Applies `pipe` to `data[prop]` and sets it in place.