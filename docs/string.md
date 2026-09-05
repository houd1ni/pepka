# string

## split

```typescript
split(sep: string | RegExp, str: string): string[]
```

Splits `str` by `sep`.

## replace

```typescript
replace(pattern: RegExp | string, replacement: string, str: string): string
```

Replaces the first match of `pattern` with `replacement`.

## trim

```typescript
trim(s: string): string
```

Removes whitespace from both ends.

## toLower

```typescript
toLower(s: string): string
```

Converts to lowercase.

## toUpper

```typescript
toUpper(s: string): string
```

Converts to uppercase.

## test

```typescript
test(re: RegExp, s: string): boolean
```

True if `re` matches `s`.

## getTmpl

```typescript
getTmpl(tmpl: string): (data: AnyObject) => string
```

Parses a template string with `{key}` placeholders and returns an interpolation function. Supports dotted paths (`{a.b.c}`) and escaping with `\{` `\}`.

```typescript
const greet = getTmpl('Hello, {name}!')
greet({ name: 'World' }) // 'Hello, World!'

const city = getTmpl('{user.address.city}')
city({ user: { address: { city: 'NYC' } } }) // 'NYC'
```