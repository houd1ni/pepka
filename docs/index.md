# pepka

A fast, tree-shakeable functional programming utility library.

> **Note:** pepka's API mirrors [Ramda](https://ramdajs.com/docs/) for most operations.
> Quick (`q`-prefixed) variants mutate in place for performance — `clone` or `cloneShallow` first if purity matters.

## sections

- [function](function.md) — composition, curry, partial application, identity, tap, noop, explore
- [list](list.md) — map, filter, reduce, append, head, tail, zip, uniq, sort, find, range
- [object](object.md) — assoc, prop, path, pick, omit, clone, freeze, merge, mapKeys
- [logic](logic.md) — ifElse, when, cond, complement, both, allPass, anyPass, T, F
- [relation](relation.md) — equals, eq, gt, lt, gte, lte, startsWith, includes
- [math](math.md) — add, subtract, multiply, divide
- [string](string.md) — split, replace, trim, toLower, toUpper, test, getTmpl
- [type](type.md) — type, typeIs, isNull, isUndef, isNil, isNum, isStr, isObj, isArray, isFunc, isSafe, isEmpty, empty
- [async](async.md) — composeAsync, waitAll, qwaitAll, forEachParallel, forEachSerial, waitTap, qfilterAsync, QPromise
- [timers](timers.md) — debounce, throttle, wait

## quick

The `q` prefix means the function operates **in place** — it mutates the input rather than returning a new value. Use `clone` or `cloneShallow` first if purity matters. Quick variants are documented alongside their non-quick counterparts above.

## aliases

`mirror`, `reflect`, `echo` → [identity](function.md#identity)
`notf` → [complement](logic.md#complement)
`push` → [append](list.md#append)
`some` → [any](list.md#any)
`weakEq` → [eq](relation.md#eq)
`uniqBy` → [uniqWith](list.md#uniqwith)
`propLens` → [overProp](object.md#overprop)
`qpush` → [qappend](quick.md#qappend)
`quniqBy` → [quniqWith](quick.md#quniqwith)