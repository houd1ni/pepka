// Type tests for src/safe.ts — verified by tsc and tsgo.
// Covers all public functions and their curry cases.

import type { AnyFunc, AnyObject, Cond } from '../../src'
import {
  add,
  all,
  allPass,
  any,
  anyPass,
  append,
  assoc, assocPath,
  bind,
  both,
  callFrom,
  callWith,
  clone, cloneShallow,
  complement,
  compose,
  concat,
  cond,
  diff,
  divide,
  echo,
  empty,
  eq, equals,
  explore,
  F,
  filter,
  findIndex,
  flat, flatShallow, flatTo,
  flip,
  forEach,
  freeze, freezeShallow,
  fromPairs,
  genBy,
  gt,
  gte,
  head,
  ifElse,
  includes,
  indexOf,
  intersection,
  isEmpty,
  join,
  keys,
  last,
  lt,
  lte,
  map,
  mapKeys,
  mapObj,
  memoize,
  mergeDeep,
  mergeDeepAdd,
  mergeDeepX,
  mergeShallow,
  mirror,
  multiply,
  noop,
  not,
  notf,
  nth,
  omit,
  once,
  overProp,
  path,
  pathEq,
  pathExists,
  pathOr,
  pathsEq,
  pick, pickBy,
  prepend,
  prop, propEq,
  propLens,
  propsEq,
  push,
  range,
  reduce,
  reflect,
  replace,
  reverse,
  sizeof,
  slice,
  some,
  sort,
  split,
  startsWith, startsWithShallow,
  subtract,
  T,
  tail,
  take,
  tap,
  test,
  toPairs,
  uniq,
  uniqBy,
  uniqWith,
  values,
  weakEq,
  when,
  zip, zipObj, zipWith
} from '../../src'

// ── take (argN => getter) ──
const _take = take(2)
const _takeR: any = _take(1, 2, 3)

// ── ifElse ──
const _ifElseFn = ifElse((x: number) => x > 0, (x: number) => 'pos', (x: number) => 'neg')
const _ifElseR: any = _ifElseFn(5)
const _ifElseR2: any = ifElse((x: number) => x > 0, (x: number) => 'pos', (x: number) => 'neg', 5)

// ── when ──
const _whenFn = when((x: number) => x > 0, (x: number) => x * 2)
const _whenR: any = _whenFn(5)
const _whenR2: any = when((x: number) => x > 0, (x: number) => x * 2, 5)

// ── compose ──
const _composed: (x: number) => number = compose((x: number) => x + 1, (x: number) => x * 2)
const _composedR: number = _composed(5)

// ── bind (fn, context) ──
const _bound: any = bind(function(this: any, x: number) { return x } as any, { a: 1 })

// ── includes (curry2 — returns boolean) ──
const _includesStr: boolean = includes('el', 'hello')
const _includesStrC: boolean = includes('el')('hello')
const _includesArr: boolean = includes(2, [1, 2, 3])
const _includesArrC: boolean = includes(2)([1, 2, 3])

// ── nth (curry2 — preserves T for arrays, string for strings) ──
const _nthArr: number = nth(1, [1, 2, 3])
const _nthStr: string = nth(0, 'abc')
const _nthArrC: number = nth(1)([1, 2, 3])
const _nthStrC: string = nth(0)('abc')

// ── sort (curry2 — preserves T[]) ──
const _sorted: number[] = sort((a: number, b: number) => a - b, [3, 1, 2])
const _sortedC: number[] = sort((a: number, b: number) => a - b)([3, 1, 2])

// ── find / findIndex / indexOf ──
const _sliced: number[] = slice(1, 3, [1, 2, 3, 4])
const _slicedStr: string = slice(1, 3, 'hello')
const _slicedC: number[] = slice(1, 3)([1, 2, 3, 4])

// ── flip ──
const _flipped = flip((a: number, b: number) => a - b)
const _flippedR: number = _flipped(3, 5)

// ── head / tail / last ──
const _head: any = head([1, 2, 3])
const _headStr: string = head('abc')
const _tail: any[] = tail([1, 2, 3])
const _tailStr: string = tail('abc')
const _last: any = last([1, 2, 3])
const _lastStr: string = last('abc')

// ── math ──
const _add: number = add(1, 2)
const _addC: number = add(1)(2)
const _sub: number = subtract(5, 3)
const _subC: number = subtract(5)(3)
const _mul: number = multiply(2, 3)
const _mulC: number = multiply(2)(3)
const _div: number = divide(6, 2)
const _divC: number = divide(6)(2)

// ── comparison ──
const _gt: boolean = gt(2, 1)
const _lt: boolean = lt(1, 2)
const _gte: boolean = gte(2, 2)
const _lte: boolean = lte(2, 2)

// ── slice ──

// ── not ──
const _notAny: boolean = not(0 as any)

// ── keys / values / toPairs ──
const _keys: string[] = keys({ a: 1, b: 2 })
const _values: number[] = values({ a: 1, b: 2 })
const _toPairs: [string, number][] = toPairs({ a: 1, b: 2 })

// ── test (regex) ──
const _test: boolean = test(/^a/, 'abc')

// ── tap ──
const _tapR: number = tap((x: number) => x * 2, 42)
const _tapC: number = tap((x: number) => x * 2)(42)

// ── append / prepend ──
const _append: number[] = append(4, [1, 2, 3])
const _appendC: number[] = append(4)([1, 2, 3])
const _prepend: number[] = prepend(0, [1, 2, 3])
const _prependC: number[] = prepend(0)([1, 2, 3])

// ── flat (1 arg) / flatShallow (1 arg) / flatTo (curry2) ──
const _flat: any[] = flat([[1, 2], [3]])
const _flatShallow: any[] = flatShallow([[1, 2], [3]])
const _flatTo: any[] = flatTo(2, [[1, [2, [3]]]])
const _flatToC: any[] = flatTo(2)([[1, [2, [3]]]])

// ── split ──
const _split: string[] = split(',', 'a,b,c')
const _splitC: string[] = split(',')('a,b,c')

// ── T / F (functions returning true/false) ──
const _T: (...args: any[]) => true = T
const _F: (...args: any[]) => false = F

// ── callWith (args, fn) ──
const _callWithR: any = callWith([1, 2], (a: number, b: number) => a + b)

// ── noop ──
const _noop: void = noop()

// ── callFrom (args, fn, o) — 3 args via curry ──
const _callFromR: any = callFrom([1, 2], 'push', [3])

// ── complement ──
const _complement = complement((x: number) => x > 0)
const _complementR: boolean = _complement(-1)

// ── sizeof ──
const _sizeof: number = sizeof([1, 2, 3])
const _sizeofStr: number = sizeof('hello')

// ── range ──
const _range: number[] = range(1, 5)

// ── uniq / uniqWith / uniqBy ──
const _uniq: number[] = uniq([1, 1, 2])
const _uniqWith: number[] = uniqWith((a: any, b: any) => a === b, [1, 1, 2])
const _uniqBy: number[] = uniqBy((x: any) => x, [1, 1, 2])

// ── intersection / diff ──
const _intersection: number[] = intersection([1, 2, 3], [2, 3, 4])
const _diff: number[] = diff([1, 2, 3], [2, 3])

// ── genBy ──
const _genBy: number[] = genBy((i: number) => i * 2, 3)

// ── once ──
const _once = once((x: number) => x * 2)
const _onceR: number = _once(5)

// ── reverse ──
const _reverse: number[] = reverse([1, 2, 3])

// ── explore (caption, level?) => tap fn ──
const _explore = explore('debug')
const _exploreR: number = _explore(42)

// ── cond (pairs, s) ──
const _condFn = cond([
  [(x: number) => x < 0, (x: number) => 'neg'],
  [(x: number) => x > 0, (x: number) => 'pos'],
] as any)
const _condR: any = _condFn(5)

// ── assoc / assocPath ──
const _assoc: AnyObject = assoc('a', 1, { b: 2 })
const _assocC: AnyObject = assoc('a', 1)({ b: 2 })
const _assocPath: AnyObject = assocPath(['a', 'b'], 1, { a: {} })
const _assocPathC: AnyObject = assocPath(['a', 'b'])(1)({ a: {} })

// ── all / any ──
const _all: boolean = all((x: number) => x > 0, [1, 2, 3])
const _allC: boolean = all((x: number) => x > 0)([1, 2, 3])
const _any: boolean = any((x: number) => x > 2, [1, 2, 3])
const _anyC: boolean = any((x: number) => x > 2)([1, 2, 3])

// ── allPass / anyPass ──
const _allPass = allPass([(x: number) => x > 0, (x: number) => x < 10])
const _allPassR: boolean = _allPass(5)
const _anyPass = anyPass([(x: number) => x > 5, (x: number) => x < 0])
const _anyPassR: boolean = _anyPass(3)

// ── startsWith / startsWithShallow ──
const _startsWith: boolean = startsWith('hel', 'hello')
const _startsWithC: boolean = startsWith('hel')('hello')
const _startsWithShallow: boolean = startsWithShallow('hel', 'hello')
const _startsWithShallowC: boolean = startsWithShallow('hel')('hello')

// ── prop / propEq / propsEq / propLens ──
const _prop: any = prop('a', { a: 1 })
const _propC: any = prop('a')({ a: 1 })
const _propEq: boolean = propEq('a', 1, { a: 1 })
const _propsEq: boolean = propsEq('a', { a: 1 }, { a: 1 })

// ── path / pathEq / pathOr / pathExists / pathsEq ──
const _path: any = path(['a', 'b'], { a: { b: 1 } })
const _pathC: any = path(['a', 'b'])({ a: { b: 1 } })
const _pathEq: boolean = pathEq(['a', 'b'], 1, { a: { b: 1 } })
const _pathOr: any = pathOr(0, ['a', 'b'], { a: {} })
const _pathExists: boolean = pathExists(['a', 'b'], { a: { b: 1 } })
const _pathsEq: boolean = pathsEq(['a'], { a: 1 }, { a: 1 })

// ── clone / cloneShallow ──
const _clone: AnyObject = clone({ a: { b: 1 } })
const _cloneShallow: AnyObject = cloneShallow({ a: 1 })

// ── freeze / freezeShallow ──
const _freeze: Readonly<AnyObject> = freeze({ a: 1 })
const _freezeShallow: Readonly<AnyObject> = freezeShallow({ a: 1 })

// ── reduce ──
const _reduce: number = reduce((acc: number, cur: number) => acc + cur, 0, [1, 2, 3])
const _reduceC1: number = reduce((acc: number, cur: number) => acc + cur, 0)([1, 2, 3])
const _reduceC2: any = reduce((acc: number, cur: number) => acc + cur)(0)([1, 2, 3])

// ── pick / pickBy / omit ──
const _pick: AnyObject = pick(['a', 'b'], { a: 1, b: 2, c: 3 })
const _pickC: AnyObject = pick(['a', 'b'])({ a: 1, b: 2, c: 3 })
const _pickBy: AnyObject = pickBy((v: any) => v > 1, { a: 1, b: 2 })
const _omit: AnyObject = omit(['c'], { a: 1, b: 2, c: 3 })
const _omitC: AnyObject = omit(['c'])({ a: 1, b: 2, c: 3 })

// ── fromPairs ──
const _fromPairs: AnyObject = fromPairs([['a', 1], ['b', 2]])

// ── concat — union type, use any for result ──
const _concat: any = concat([4], [1, 2, 3])
const _concatC: any = concat([4])([1, 2, 3])
const _concatStr: any = concat('d', 'abc')

// ── map / mapObj ──
const _map: number[] = map((x: number) => x * 2, [1, 2, 3])
const _mapC: number[] = map((x: number) => x * 2)([1, 2, 3])
const _mapStr: string[] = map((x: number) => String(x), [1, 2, 3])
const _mapObj: AnyObject = mapObj((v: any) => v + 1, { a: 1 })

// ── join ──
const _join: string = join('-', [1, 2, 3])
const _joinC: string = join('-')([1, 2, 3])

// ── forEach (curry2 — returns void, preserves T) ──
const _forEach: void = forEach((s: number, i: number, arr: number[]) => s, [1, 2, 3])
const _forEachC: void = forEach((s: number, i: number, arr: number[]) => s)([1, 2, 3])

// ── both ──
const _bothFn = both((x: number) => x > 0, (x: number) => x < 10)
const _bothR: boolean = _bothFn(5)
const _bothR2: boolean = both((x: number) => x > 0, (x: number) => x < 10, 5)

// ── isEmpty / empty ──
const _isEmpty: boolean | null = isEmpty([])
const _empty: any = empty([1, 2])

// ── replace (a, b, where) ──
const _replace: string = replace('a', 'x', 'abc')
const _replaceC: string = replace('a')('x')('abc')

// ── filter ──
const _filter: number[] = filter((x: number) => x > 1, [1, 2, 3])
const _filterC: number[] = filter((x: number) => x > 1)([1, 2, 3])

// ── memoize (keyGen, fn) ──
const _memoized = memoize((x: number) => String(x), (x: number) => x * 2)
const _memoizedR: number = _memoized(5)

// ── mergeShallow / mergeDeep / mergeDeepX / mergeDeepAdd ──
const _mergeShallow: AnyObject = mergeShallow({ a: 1 }, { b: 2 })
const _mergeShallowC: AnyObject = mergeShallow({ a: 1 })({ b: 2 })
const _mergeDeep: AnyObject = mergeDeep({ a: { x: 1 } }, { a: { y: 2 } })
const _mergeDeepC: AnyObject = mergeDeep({ a: { x: 1 } })({ a: { y: 2 } })
const _mergeDeepX: AnyObject = mergeDeepX({ a: [1] }, { a: [2] })
const _mergeDeepAdd: AnyObject = mergeDeepAdd({ a: 1 }, { a: 2 })

// ── overProp ──
const _overProp: AnyObject = overProp('a', (v: any) => v + 1, { a: 1 })
const _overPropC: AnyObject = overProp('a')((v: any) => v + 1)({ a: 1 })

// ── mapKeys (keyMap, o) — keyMap is an object, not a function ──
const _mapKeys: AnyObject = mapKeys({ a: 'b' }, { a: 1 })
const _mapKeysC: AnyObject = mapKeys({ a: 'b' })({ a: 1 })

// ── zip / zipObj / zipWith ──
const _zip: any[] = zip([1, 2], ['a', 'b'])
const _zipObj: AnyObject = zipObj(['a', 'b'], [1, 2])
const _zipWith: number[] = zipWith((a: number, b: number) => a + b, [1, 2], [3, 4])

// ── mirror / reflect / echo / notf / push / some / weakEq ──
const _mirror: AnyObject = mirror({ a: 1 })
const _reflect: any = reflect({ a: 1 })
const _echo: any = echo(42)
const _notf: any = notf(() => {})
const _push: any[] = push(4, [1, 2, 3])
const _some: boolean = some((x: number) => x > 1, [1, 2, 3])
const _weakEq: boolean = weakEq(1, 1)

// ── propLens ──
const _propLens: any = propLens('a')

// ── Partial application (curried) tests ──
// curry2 functions: fn(a) => (b) => result
const _bindC: any = bind(function(this: any, x: number) { return x } as any)
const _nthC: any = nth(1)
const _findIndexC: (arr: any[]) => number = findIndex((x: number) => x > 1)
const _indexOfC: (arr: any[]) => number = indexOf(2)
const _gtC: (b: any) => boolean = gt(2)
const _ltC: (b: any) => boolean = lt(1)
const _gteC: (b: any) => boolean = gte(2)
const _lteC: (b: any) => boolean = lte(2)
const _testC: (s: string) => boolean = test(/^a/)
const _callWithC: (fn: any) => any = callWith([1, 2])
const _rangeC: (end: number) => number[] = range(1)
const _uniqWithC: (xs: any[]) => any[] = uniqWith((a: any, b: any) => a === b)
const _intersectionC: (b: any[]) => any[] = intersection([1, 2, 3])
const _diffC: (b: any[]) => any[] = diff([1, 2, 3])
const _genByC: (n: number) => any[] = genBy((i: number) => i * 2)
const _pathExistsC: (o: any) => boolean = pathExists(['a', 'b'])
const _pickByC: (o: any) => any = pickBy((v: any) => v > 1)
const _mapObjC: (o: any) => any = mapObj((v: any) => v + 1)
const _mergeDeepXC: (b: any) => any = mergeDeepX({ a: [1] })
const _mergeDeepAddC: (b: any) => any = mergeDeepAdd({ a: 1 })
const _zipC: (b: any[]) => any[] = zip([1, 2])
const _zipObjC: (vals: any[]) => any = zipObj(['a', 'b'])
const _someC: (xs: any[]) => boolean = some((x: number) => x > 1)
const _weakEqC: (b: any) => boolean = weakEq(1)

// curry3 functions: fn(a) => (b, c) => result; fn(a, b) => (c) => result; fn(a)(b) => (c) => result
const _propEqC1: (v: any, o: any) => boolean = propEq('a')
const _propEqC2: (o: any) => boolean = propEq('a', 1)
const _propEqC3: (o: any) => boolean = propEq('a')(1)
const _propsEqC1: (vals: any[], o: any) => boolean = propsEq('a')
const _propsEqC2: (o: any) => boolean = propsEq('a', { a: 1 })
const _pathEqC1: (v: any, o: any) => boolean = pathEq(['a', 'b'])
const _pathEqC2: (o: any) => boolean = pathEq(['a', 'b'], 1)
const _pathOrC1: (p: any[], o: any) => any = pathOr(0)
const _pathOrC2: (o: any) => any = pathOr(0, ['a', 'b'])
const _pathsEqC1: (vals: any[], o: any) => boolean = pathsEq(['a'])
const _pathsEqC2: (o: any) => boolean = pathsEq(['a'], { a: 1 })

// curry (arity 3) functions
const _callFromC1: (fn: any, o: any) => any = callFrom([1, 2])
const _callFromC2: (o: any) => any = callFrom([1, 2], 'push')
const _callFromC3: (o: any) => any = callFrom([1, 2])('push')

// ── flip(curry2_fn) — overload ordering regression ──
// Full-arity overload must be LAST so Parameters<T>[1] resolves (not undefined).
const _flipConcat = flip(concat)
const _flipConcatR: string | any[] = _flipConcat(' ', 'abc')
// NOTE: first arg must NOT be 'any' — 'any' matches Placeholder (symbol)
// in the first Curried2 overload, returning a curried fn instead of the result.
// Use typed args (as AnyObject, as AnyFunc, etc.) to ensure the full-arity
// (a: p0, b: p1): ReturnT overload is selected.
const _flipPath = flip(path)
const _flipPathR: any = _flipPath({ a: 1 } as AnyObject, ['a'])
const _flipPathExists = flip(pathExists)
const _flipPathExistsR: boolean = _flipPathExists({ a: 1 } as AnyObject, ['a'])
const _flipSplit = flip(split)
const _flipSplitR: string[] = _flipSplit('abc', ',')
const _flipEq = flip(eq)
const _flipEqR: boolean = _flipEq(2, 1)
const _flipEquals = flip(equals)
const _flipEqualsR: boolean = _flipEquals(2, 1)
const _flipOmit = flip(omit)
const _flipOmitR: AnyObject = _flipOmit({ a: 1, b: 2 } as AnyObject, ['b'])
const _flipPick = flip(pick)
const _flipPickR: AnyObject = _flipPick({ a: 1, b: 2 } as AnyObject, ['a'])
const _flipIntersection = flip(intersection)
const _flipIntersectionR: any[] = _flipIntersection([2, 3], [1, 2, 3])
const _flipDiff = flip(diff)
const _flipDiffR: any[] = _flipDiff([2, 3], [1, 2, 3])
const _flipRange = flip(range)
const _flipRangeR: number[] = _flipRange(5, 1)
const _flipMergeShallow = flip(mergeShallow)
const _flipMergeShallowR: AnyObject = _flipMergeShallow({ b: 2 } as AnyObject, { a: 1 } as AnyObject)
const _flipMergeDeep = flip(mergeDeep)
const _flipMergeDeepR: AnyObject = _flipMergeDeep({ b: 2 } as AnyObject, { a: 1 } as AnyObject)
const _flipMergeDeepX = flip(mergeDeepX)
const _flipMergeDeepXR: AnyObject = _flipMergeDeepX({ a: [2] } as AnyObject, { a: [1] } as AnyObject)
const _flipMergeDeepAdd = flip(mergeDeepAdd)
const _flipMergeDeepAddR: AnyObject = _flipMergeDeepAdd({ a: 2 } as AnyObject, { a: 1 } as AnyObject)
const _flipMapKeys = flip(mapKeys)
const _flipMapKeysR: AnyObject = _flipMapKeys({ a: 1 } as AnyObject, { a: 'b' })
const _flipMapObj = flip(mapObj)
const _flipMapObjR: AnyObject = _flipMapObj({ a: 1 } as AnyObject, (v: any) => v + 1)
const _flipTest = flip(test)
const _flipTestR: boolean = _flipTest('hello', /el/)
const _flipPickBy = flip(pickBy)
const _flipPickByR: AnyObject = _flipPickBy({ a: 1, b: 2 } as AnyObject, (v: any) => v > 0)
const _flipCond = flip(cond)
const _flipCondR: any = _flipCond(5, [[(x: number) => x > 0, (x: number) => 'pos']] as [Cond, AnyFunc][])
const _flipBind = flip(bind)
const _flipBindR: AnyFunc = _flipBind({ a: 1 } as AnyObject, ((x: number) => x) as AnyFunc)
const _flipCallWith = flip(callWith)
const _flipCallWithR: any = _flipCallWith(((x: number) => x * 2) as AnyFunc, [5])