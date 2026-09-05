# type

## type

```typescript
type(s: any): string
```

Returns the capitalized type name. Handles `Null`, `NaN`, typed arrays, and custom classes.

```typescript
type(42)             // 'Number'
type(null)           // 'Null'
type(NaN)            // 'NaN'
type([])             // 'Array'
type(new Uint8Array()) // 'Uint8Array'
```

## typeIs

```typescript
typeIs(t: string, s: any): boolean
```

True if `type(s) === t`.

```typescript
typeIs('Array', [1, 2]) // true
typeIs('Null', null)     // true
```

## isNull

```typescript
isNull<T>(s: T): boolean
```

True if `s` is `null`.

## isUndef

```typescript
isUndef<T>(s: T): boolean
```

True if `s` is `undefined`.

## isNil

```typescript
isNil<T>(s: T): boolean
```

True if `s` is `null` or `undefined`.

## isNum

```typescript
isNum<T>(s: T): boolean
```

True if `typeof s === 'number'`.

## isStr

```typescript
isStr<T>(s: T): boolean
```

True if `typeof s === 'string'`.

## isObj

```typescript
isObj<T>(s: T): boolean
```

True if `s` is a non-null object.

## isArray

```typescript
isArray<T>(s: T): boolean
```

True if `Array.isArray(s)`.

## isFunc

```typescript
isFunc<T extends AnyFunc>(value: T): true
isFunc(value: any): false
```

True if `typeof s === 'function'`. Overloaded for type narrowing.

## isSafe

```typescript
isSafe(prop: string): boolean
```

True if `prop` is not `__proto__`, `constructor`, or `prototype`.

## isEmpty

```typescript
isEmpty(s: any): boolean
```

True if `s` has no enumerable keys/indices.

## empty

```typescript
empty(s: any): any
```

Returns an empty value of the same type (empty array, string, or object).