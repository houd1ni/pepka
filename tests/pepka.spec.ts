import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import {
  curry, curry2, curry3, __,
  compose, identity, always, noop, take, tap,
  map, filter, reduce, forEach, append, prepend, concat,
  head, tail, last, nth, slice, sort, find, findIndex, indexOf, uniq, uniqBy, uniqWith, reverse,
  range, zip, zipObj, zipWith, all, any, join, length, sizeof,
  flat, flatShallow, flatTo, intersection, diff, genBy,
  assoc, assocPath, prop, propEq, propsEq, path, pathEq, pathOr, pathExists, pathsEq,
  pick, pickBy, omit, keys, values, toPairs, fromPairs,
  clone, cloneShallow, freeze, freezeShallow, mergeDeep, mergeShallow,
  mergeDeepAdd, mergeDeepX, mapKeys, mapObj, overProp,
  ifElse, when, cond, complement, not, both, allPass, anyPass, T, F,
  equals, eq, gt, lt, gte, lte, startsWith, startsWithShallow, includes,
  add, subtract, multiply, divide,
  split, replace, trim, toLower, toUpper, test as regexTest, getTmpl,
  type, typeIs, isNull, isUndef, isNil, isNum, isStr, isObj, isArray, isEmpty, empty,
  composeAsync, waitAll, qwaitAll, forEachParallel, forEachSerial, waitTap,
  debounce, throttle, wait, QPromise, qfilterAsync,
  bind, flip, callWith, callFrom, memoize, once, explore, uncurry,
  symbol, echo, mirror, reflect, notf, push, some, weakEq, propLens,
  qmap, qfilter, qassoc, qassocPath, qpick, qomit, qreverse, quniq, quniqBy, quniqWith,
  qappend, qprepend, qreduce, qslice, qsort, qempty, qfreeze, qfreezeShallow,
  qmergeShallow, qmergeDeep, qmergeDeepX, qmergeDeepAdd, qmapKeys, qmapObj, qoverProp, qpush,
} from '../src'

const test = suite('pepka')

// ── curry ──

test('curry basic', () => {
  const f = curry((a: number, b: number, c: number) => a + b + c)
  assert.is(f(1, 2, 3), 6)
  assert.is(f(1)(2)(3), 6)
})

test('curry2 basic', () => {
  const add = curry2((a: number, b: number) => a + b)
  assert.is(add(1, 2), 3)
  assert.is(add(1)(2), 3)
  assert.is(add(__, 2)(1), 3)
})

test('curry3 basic', () => {
  const add3 = curry3((a: number, b: number, c: number) => a + b + c)
  assert.is(add3(1, 2, 3), 6)
  assert.is(add3(1)(2)(3), 6)
  assert.is(add3(1, 2)(3), 6)
})

test('__ placeholder', () => {
  const f = curry2((a: number, b: number) => a - b)
  assert.is(f(__, 3)(10), 7)
})

test('uncurry', () => {
  const curried = curry2((a: number, b: number) => a + b)
  const uncurried = uncurry(curried)
  assert.is(uncurried(1, 2), 3)
})

test('flip', () => {
  const sub = curry2((a: number, b: number) => a - b)
  const flipped = flip(sub)
  assert.is(flipped(3, 10), 7)
})

// ── compose / tap / take ──

test('compose right-to-left', () => {
  const f = compose((x: number) => x + 1, (x: number) => x * 2)
  assert.is(f(5), 11)
})

test('tap side effect', () => {
  let side = 0
  const r = tap((x: number) => { side = x }, 42)
  assert.is(r, 42)
  assert.is(side, 42)
})

test('take picks nth arg', () => {
  assert.is(take(1)(10, 20, 30), 20)
  assert.is(take(0)('a', 'b'), 'a')
})

// ── map / filter / reduce / forEach ──

test('map doubles', () => {
  assert.equal(map((x: number) => x * 2, [1, 2, 3]), [2, 4, 6])
})

test('map curried', () => {
  const dbl = map((x: number) => x * 2)
  assert.equal(dbl([1, 2, 3]), [2, 4, 6])
})

test('mapObj maps values', () => {
  const r = mapObj((v: number) => v + 1, { a: 1, b: 2 })
  assert.equal(r, { a: 2, b: 3 })
})

test('filter gt 1', () => {
  assert.equal(filter((x: number) => x > 1, [1, 2, 3]), [2, 3])
})

test('filter on object', () => {
  const r = filter((v: number) => v > 1, { a: 1, b: 2, c: 3 })
  assert.equal(r, { b: 2, c: 3 })
})

test('reduce sum', () => {
  assert.is(reduce((acc: number, cur: number) => acc + cur, 0, [1, 2, 3]), 6)
})

test('forEach iterates', () => {
  let sum = 0
  forEach((x: number) => { sum += x }, [1, 2, 3])
  assert.is(sum, 6)
})

// ── logic ──

test('both AND logic', () => {
  const f = both((x: number) => x > 0, (x: number) => x < 10)
  assert.is(f(5), true)
  assert.is(f(-1), false)
  assert.is(f(11), false)
})

test('allPass', () => {
  const f = allPass([(x: number) => x > 0, (x: number) => x < 10])
  assert.is(f(5), true)
  assert.is(f(-1), false)
})

test('anyPass', () => {
  const f = anyPass([(x: number) => x < 0, (x: number) => x > 10])
  assert.is(f(-1), true)
  assert.is(f(5), false)
  assert.is(f(11), true)
})

test('complement', () => {
  const f = complement((x: number) => x > 0)
  assert.is(f(5), false)
  assert.is(f(-1), true)
})

test('not', () => {
  assert.is(not(true), false)
  assert.is(not(false), true)
})

test('T and F', () => {
  assert.is(T(), true)
  assert.is(F(), false)
})

test('cond', () => {
  const f = cond([
    [(x: number) => x < 0, always('neg')],
    [(x: number) => x > 0, always('pos')],
    [() => true, always('zero')],
  ])
  assert.is(f(-1), 'neg')
  assert.is(f(1), 'pos')
  assert.is(f(0), 'zero')
})

test('when', () => {
  const f = when((x: number) => x > 0, (x: number) => x * 2)
  assert.is(f(5), 10)
  assert.is(f(-1), -1)
})

// ── ifElse ──

test('ifElse positive', () => {
  const f = ifElse((x: number) => x > 0, always('pos'), always('neg'))
  assert.is(f(5), 'pos')
  assert.is(f(-1), 'neg')
})

// ── slice / sort / find ──

test('slice array', () => {
  assert.equal(slice(1, 3, [1, 2, 3, 4]), [2, 3])
})

test('slice string', () => {
  assert.is(slice(1, 3, 'hello'), 'el')
})

test('sort', () => {
  assert.equal(sort((a: number, b: number) => a - b, [3, 1, 2]), [1, 2, 3])
})

test('find', () => {
  assert.is(find((x: number) => x > 1, [1, 2, 3]), 2)
})

test('findIndex', () => {
  assert.is(findIndex((x: number) => x > 1, [1, 2, 3]), 1)
})

test('indexOf', () => {
  assert.is(indexOf(2, [1, 2, 3]), 1)
  assert.is(indexOf(4, [1, 2, 3]), -1)
})

// ── join / concat / append / prepend ──

test('join with delimiter', () => {
  assert.is(join('-', [1, 2, 3]), '1-2-3')
})

test('concat arrays (b+a)', () => {
  assert.equal(concat([1, 2], [3, 4]), [3, 4, 1, 2])
})

test('concat strings (b+a)', () => {
  assert.is(concat('ab', 'cd'), 'cdab')
})

test('append', () => {
  assert.equal(append(4, [1, 2, 3]), [1, 2, 3, 4])
})

test('prepend puts element at start', () => {
  assert.equal(prepend(0, [1, 2, 3]), [0, 1, 2, 3])
})

// ── all / any ──

test('all true', () => {
  assert.is(all((x: number) => x > 0, [1, 2, 3]), true)
  assert.is(all((x: number) => x > 1, [1, 2, 3]), false)
})

test('any true', () => {
  assert.is(any((x: number) => x > 2, [1, 2, 3]), true)
  assert.is(any((x: number) => x > 3, [1, 2, 3]), false)
})

test('some', () => {
  assert.is(some((x: number) => x > 2, [1, 2, 3]), true)
  assert.is(some((x: number) => x > 3, [1, 2, 3]), false)
})

// ── eq / equals / includes ──

test('eq reference equality', () => {
  assert.is(eq(1, 1), true)
  assert.is(eq(1, '1'), false)
})

test('weakEq is eq (strict)', () => {
  assert.is(weakEq(1, 1), true)
  assert.is(weakEq('1', 1), false)
})

test('equals deep equality', () => {
  assert.is(equals([1, 2], [1, 2]), true)
  assert.is(equals({ a: 1 }, { a: 1 }), true)
  assert.is(equals([1, 2], [1, 3]), false)
})

test('includes', () => {
  assert.is(includes(2, [1, 2, 3]), true)
  assert.is(includes(4, [1, 2, 3]), false)
  assert.is(includes('el', 'hello'), true)
})

// ── relation ──

test('gt/lt/gte/lte (b OP a)', () => {
  assert.is(gt(1, 2), true)
  assert.is(gt(2, 1), false)
  assert.is(lt(2, 1), true)
  assert.is(lt(1, 2), false)
  assert.is(gte(2, 2), true)
  assert.is(lte(2, 2), true)
})

test('startsWithShallow', () => {
  assert.is(startsWithShallow('hel', 'hello'), true)
  assert.is(startsWithShallow('xyz', 'hello'), false)
})

// ── identity / always / noop / echo / reflect ──

test('identity returns input', () => {
  assert.is(identity(42), 42)
})

test('echo is identity alias', () => {
  assert.is(echo(42), 42)
})

test('reflect is identity alias', () => {
  assert.is(reflect(42), 42)
})

test('always returns constant', () => {
  const f = always(42)
  assert.is(f(), 42)
  assert.is(f(), 42)
})

test('noop returns undefined', () => {
  assert.is(noop(), undefined)
})

test('empty / isEmpty', () => {
  assert.equal(empty([1, 2]), [])
  assert.equal(empty('abc'), '')
  assert.is(isEmpty([]), true)
  assert.is(isEmpty([1]), false)
  assert.is(isEmpty(''), true)
})

// ── type / typeIs / is* ──

test('type returns capitalized type name', () => {
  assert.is(type(42), 'Number')
  assert.is(type('hi'), 'String')
  assert.is(type([]), 'Array')
  assert.is(type({}), 'Object')
  assert.is(type(null), 'Null')
})

test('typeIs checks type name', () => {
  assert.is(typeIs('Number', 42), true)
  assert.is(typeIs('String', 42), false)
})

test('isNull/isUndef/isNil', () => {
  assert.is(isNull(null), true)
  assert.is(isNull(undefined), false)
  assert.is(isUndef(undefined), true)
  assert.is(isUndef(null), false)
  assert.is(isNil(null), true)
  assert.is(isNil(undefined), true)
})

test('isNum/isStr/isObj/isArray', () => {
  assert.is(isNum(42), true)
  assert.is(isStr('hi'), true)
  assert.is(isObj({}), true)
  assert.is(isArray([]), true)
})

// ── math ──

test('add/subtract/multiply/divide', () => {
  assert.is(add(1, 2), 3)
  assert.is(subtract(5, 3), -2)
  assert.is(multiply(2, 3), 6)
  assert.is(divide(6, 2), 1/3)
})

// ── string ──

test('split', () => {
  assert.equal(split(',', 'a,b,c'), ['a', 'b', 'c'])
})

test('replace', () => {
  assert.is(replace('a', 'x', 'abc'), 'xbc')
})

test('trim', () => {
  assert.is(trim('  hi  '), 'hi')
})

test('toLower/toUpper', () => {
  assert.is(toLower('HI'), 'hi')
  assert.is(toUpper('hi'), 'HI')
})

test('regexTest', () => {
  assert.is(regexTest(/^h/, 'hello'), true)
  assert.is(regexTest(/^x/, 'hello'), false)
})

test('getTmpl', () => {
  const tmpl = getTmpl('Hello {{name}}!')
  assert.is(tmpl({ name: 'World' }), 'Hello World!')
})

// ── startsWith ──

test('startsWith', () => {
  assert.is(startsWith('hel', 'hello'), true)
  assert.is(startsWith('xyz', 'hello'), false)
})

// ── list utils ──

test('head/tail/last', () => {
  assert.is(head([1, 2, 3]), 1)
  assert.equal(tail([1, 2, 3]), [2, 3])
  assert.is(last([1, 2, 3]), 3)
})

test('head/tail on string', () => {
  assert.is(head('abc'), 'a')
  assert.is(tail('abc'), 'bc')
})

test('nth', () => {
  assert.is(nth(1, [1, 2, 3]), 2)
  assert.is(nth(1, 'abc'), 'b')
})

test('length/sizeof', () => {
  assert.is(length([1, 2, 3]), 3)
  assert.is(length('abc'), 3)
  assert.is(sizeof([1, 2, 3]), 3)
})

test('reverse', () => {
  assert.equal(reverse([1, 2, 3]), [3, 2, 1])
})

test('uniq', () => {
  assert.equal(uniq([1, 1, 2, 2, 3]), [1, 2, 3])
})

test('uniqWith comparator', () => {
  assert.equal(uniqWith((a: number, b: number) => a === b, [1, 1, 2]), [1, 2])
})

test('uniqBy is alias of uniqWith', () => {
  assert.equal(uniqBy((a: number, b: number) => a === b, [1, 1, 2]), [1, 2])
})

test('range', () => {
  assert.equal(range(0, 3), [0, 1, 2])
})

test('zip', () => {
  assert.equal(zip([1, 2], ['a', 'b']), [[1, 'a'], [2, 'b']])
})

test('zipObj', () => {
  assert.equal(zipObj(['a', 'b'], [1, 2]), { a: 1, b: 2 })
})

test('zipWith', () => {
  assert.equal(zipWith((a: number, b: number) => a + b, [1, 2], [3, 4]), [4, 6])
})

test('flat', () => {
  assert.equal(flat([[1, 2], [3, 4]]), [1, 2, 3, 4])
})

test('flatShallow', () => {
  assert.equal(flatShallow([1, [2, [3]]]), [1, 2, [3]])
})

test('flatTo', () => {
  assert.equal(flatTo(1, [1, [2, [3]]]), [1, 2, [3]])
  assert.equal(flatTo(2, [1, [2, [3]]]), [1, 2, 3])
})

test('intersection', () => {
  assert.equal(intersection([1, 2, 3], [2, 3, 4]), [2, 3])
})

test('diff (symmetric)', () => {
  assert.equal(diff([1, 2, 3], [2, 3, 4]), [4, 1])
})

test('genBy', () => {
  const gen = genBy((i: number) => i * 2, 3)
  assert.equal(gen, [0, 2, 4])
})

// ── assoc / prop / path / pick / omit ──

test('assoc sets key', () => {
  assert.equal(assoc('a', 1, { b: 2 }), { a: 1, b: 2 })
})

test('assocPath sets nested', () => {
  assert.equal(assocPath(['a', 'b'], 1, {}), { a: { b: 1 } })
})

test('prop gets key', () => {
  assert.is(prop('a', { a: 1 }), 1)
})

test('propEq', () => {
  assert.is(propEq('a', 1, { a: 1 }), true)
  assert.is(propEq('a', 2, { a: 1 }), false)
})

test('path', () => {
  assert.is(path(['a', 'b'], { a: { b: 1 } }), 1)
})

test('pathOr default', () => {
  assert.is(pathOr(0, ['a', 'x'], { a: {} }), 0)
})

test('pathEq', () => {
  assert.is(pathEq(['a', 'b'], 1, { a: { b: 1 } }), true)
})

test('pathExists', () => {
  assert.is(pathExists(['a', 'b'], { a: { b: 1 } }), true)
  assert.is(pathExists(['a', 'x'], { a: {} }), false)
})

test('pick selects keys', () => {
  assert.equal(pick(['a', 'b'], { a: 1, b: 2, c: 3 }), { a: 1, b: 2 })
})

test('pickBy filters by key predicate', () => {
  assert.equal(pickBy((k: string) => k === 'b', { a: 1, b: 2 }), { b: 2 })
})

test('omit removes keys', () => {
  assert.equal(omit(['c'], { a: 1, b: 2, c: 3 }), { a: 1, b: 2 })
})

test('keys/values/toPairs/fromPairs', () => {
  assert.equal(keys({ a: 1, b: 2 }), ['a', 'b'])
  assert.equal(values({ a: 1, b: 2 }), [1, 2])
  assert.equal(toPairs({ a: 1 }), [['a', 1]])
  assert.equal(fromPairs([['a', 1]]), { a: 1 })
})

// ── merge / clone / freeze ──

test('mergeShallow', () => {
  assert.equal(mergeShallow({ a: 1 }, { b: 2 }), { a: 1, b: 2 })
})

test('mergeDeep', () => {
  const r = mergeDeep({ a: { x: 1 } }, { a: { y: 2 } })
  assert.equal(r, { a: { x: 1, y: 2 } })
})

test('mergeDeepX', () => {
  const r = mergeDeepX({ a: [1] }, { a: [2] })
  assert.equal(r, { a: [1] })
})

test('mergeDeepAdd overwrites', () => {
  const r = mergeDeepAdd({ a: 1 }, { a: 2 })
  assert.equal(r, { a: 2 })
})

test('mapKeys is identity on object', () => {
  assert.equal(mapKeys((k: string) => k.toUpperCase(), { a: 1, b: 2 }), { a: 1, b: 2 })
})

test('overProp', () => {
  assert.equal(overProp('a', (v: number) => v + 1, { a: 1 }), { a: 2 })
})

test('clone deep copies', () => {
  const o = { a: { b: 1 } }
  const c = clone(o)
  assert.equal(c, o)
  assert.is(c === o, false)
  assert.is(c.a === o.a, false)
})

test('cloneShallow', () => {
  const o = { a: 1, b: 2 }
  const c = cloneShallow(o)
  assert.equal(c, o)
  assert.is(c === o, false)
})

test('freeze', () => {
  const o = freeze({ a: 1 })
  assert.is(Object.isFrozen(o), true)
})

test('freezeShallow', () => {
  const o = freezeShallow({ a: { b: 1 } })
  assert.is(Object.isFrozen(o), true)
  assert.is(Object.isFrozen(o.a), false)
})

// ── bind / callWith / callFrom / memoize / once / explore ──

test('bind', () => {
  const obj = { x: 42, getX() { return this.x } }
  const f = bind(obj.getX, obj)
  assert.is(f(), 42)
})

test('callWith spreads args into fn', () => {
  assert.is(callWith([42], (x: number) => x * 2), 84)
})

test('callFrom invokes method by name', () => {
  const obj = { x: 42, getX() { return this.x } }
  assert.is(callFrom([], 'getX', obj), 42)
})

test('memoize with keyGen', () => {
  let calls = 0
  const f = memoize((x: number) => String(x), (x: number) => { calls++; return x * 2 })
  assert.is(f(5), 10)
  assert.is(f(5), 10)
  assert.is(calls, 1)
})

test('once', () => {
  let calls = 0
  const f = once(() => { calls++; return 42 })
  f(); f()
  assert.is(calls, 1)
})

// ── symbol / mirror / notf / push / propLens ──

test('symbol', () => {
  assert.is(typeof symbol, 'symbol')
})

test('mirror is identity alias', () => {
  assert.equal(mirror({ a: 'b' }), { a: 'b' })
})

test('notf is complement alias', () => {
  const f = notf((x: number) => x > 0)
  assert.is(f(5), false)
  assert.is(f(-1), true)
})

test('push is append alias', () => {
  assert.equal(push(4, [1, 2, 3]), [1, 2, 3, 4])
})

test('propLens is overProp alias', () => {
  assert.equal(propLens('a', (v: number) => v + 1, { a: 1 }), { a: 2 })
})

// ── quick variants ──

test('qmap', () => {
  assert.equal(qmap((x: number) => x * 2, [1, 2, 3]), [2, 4, 6])
})

test('qfilter', () => {
  assert.equal(qfilter((x: number) => x > 1, [1, 2, 3]), [2, 3])
})

test('qassoc', () => {
  const o = { b: 2 }
  const r = qassoc('a', 1, o)
  assert.equal(r, { a: 1, b: 2 })
  assert.is(r, o)
})

test('qassocPath', () => {
  const o: Record<string, any> = {}
  qassocPath(['a', 'b'], 1, o)
  assert.equal(o, { a: { b: 1 } })
})
test('qassocPath leaf/child coexistence', () => {
  const leaf = (() => 'leaf') as any
  const o: Record<string, any> = {}
  qassocPath(['a', 'b'], leaf, o)
  qassocPath(['a', 'b', 'c'], 42, o)
  assert.is(o.a.b, leaf)
  assert.equal(o.a.b.c, 42)
  const leaf2 = (() => 'leaf2') as any
  const o2: Record<string, any> = {}
  qassocPath(['a', 'b', 'c'], 42, o2)
  qassocPath(['a', 'b'], leaf2, o2)
  assert.is(typeof o2.a.b, 'function')
  assert.equal(o2.a.b.c, 42)
})

test('qpick', () => {
  const o = { a: 1, b: 2 }
  const r = qpick(['a'], o)
  assert.equal(r, { a: 1 })
  assert.is(r, o)
})

test('qomit', () => {
  const o = { a: 1, b: 2 }
  const r = qomit(['b'], o)
  assert.equal(r, { a: 1 })
  assert.is(r, o)
})

test('qreverse', () => {
  assert.equal(qreverse([1, 2, 3]), [3, 2, 1])
})

test('quniq', () => {
  assert.equal(quniq([1, 1, 2]), [1, 2])
})

test('quniqBy is quniqWith alias', () => {
  assert.equal(quniqBy((x: number) => x, [1, 1, 2]), [1, 2])
})

test('quniqWith', () => {
  assert.equal(quniqWith((x: number) => x, [1, 1, 2]), [1, 2])
})

test('qappend', () => {
  const arr = [1, 2]
  qappend(3, arr)
  assert.equal(arr, [1, 2, 3])
})

test('qprepend returns new length (unshift)', () => {
  const arr = [1, 2]
  assert.is(qprepend(0, arr), 3)
  assert.equal(arr, [0, 1, 2])
})

test('qreduce', () => {
  assert.is(qreduce((acc: number, cur: number) => acc + cur, 0, [1, 2, 3]), 6)
})

test('qslice', () => {
  const arr = [1, 2, 3, 4]
  qslice(1, 3, arr)
  assert.equal(arr, [2, 3])
})

test('qsort', () => {
  const arr = [3, 1, 2]
  qsort((a: number, b: number) => a - b, arr)
  assert.equal(arr, [1, 2, 3])
})

test('qempty', () => {
  const arr = [1, 2, 3]
  const r = qempty(arr)
  assert.equal(r, [])
  assert.is(r, arr)
})

test('qfreeze/qfreezeShallow', () => {
  const o = qfreeze({ a: { b: 1 } })
  assert.is(Object.isFrozen(o), true)
  assert.is(Object.isFrozen(o.a), true)
  const o2 = qfreezeShallow({ a: { b: 1 } })
  assert.is(Object.isFrozen(o2), true)
  assert.is(Object.isFrozen(o2.a), false)
})

test('qmergeShallow', () => {
  const o = { a: 1 }
  const r = qmergeShallow(o, { b: 2 })
  assert.equal(r, { a: 1, b: 2 })
  assert.is(r, o)
})

test('qmergeDeep', () => {
  const o = { a: { x: 1 } }
  const r = qmergeDeep(o, { a: { y: 2 } })
  assert.equal(r, { a: { x: 1, y: 2 } })
  assert.is(r, o)
})

test('qmergeDeepX', () => {
  const o = { a: [1] }
  const r = qmergeDeepX(o, { a: [2] })
  assert.equal(r, { a: [1] })
  assert.is(r, o)
})

test('qmergeDeepAdd', () => {
  const o = { a: 1 }
  const r = qmergeDeepAdd(o, { a: 2 })
  assert.equal(r, { a: 2 })
  assert.is(r, o)
})

test('qmapKeys', () => {
  const o = { a: 1 }
  const r = qmapKeys((k: string) => k.toUpperCase(), o)
  assert.equal(r, { a: 1 })
  assert.is(r, o)
})

test('qmapObj', () => {
  const o = { a: 1, b: 2 }
  const r = qmapObj((v: number) => v + 1, o)
  assert.equal(r, { a: 2, b: 3 })
})

test('qoverProp', () => {
  const o = { a: 1 }
  const r = qoverProp('a', (v: number) => v + 1, o)
  assert.equal(r, { a: 2 })
  assert.is(r, o)
})

test('qpush is qappend alias', () => {
  const arr: number[] = [1, 2]
  qpush(3, arr)
  assert.equal(arr, [1, 2, 3])
})

// ── async ──

test('waitAll', async() => {
  const r = await waitAll([Promise.resolve(1), Promise.resolve(2)])
  assert.equal(r, [1, 2])
})

test('qwaitAll', async() => {
  const r = await qwaitAll([Promise.resolve(1), Promise.resolve(2)])
  assert.equal(r, [1, 2])
})

test('composeAsync', async() => {
  const f = composeAsync(async(x: number) => x + 1, async(x: number) => x * 2)
  assert.is(await f(5), 11)
})

test('forEachParallel', async() => {
  let sum = 0
  await forEachParallel(async(x: number) => { sum += x }, [1, 2, 3])
  assert.is(sum, 6)
})

test('forEachSerial', async() => {
  const order: number[] = []
  await forEachSerial(async(x: number) => { order.push(x) }, [1, 2, 3])
  assert.equal(order, [1, 2, 3])
})

test('waitTap', async() => {
  let side = 0
  const r = await waitTap(async(x: number) => { side = x }, 42)
  assert.is(r, 42)
  assert.is(side, 42)
})

test('qfilterAsync', async() => {
  const r = await qfilterAsync(async(x: number) => x > 1, [1, 2, 3])
  assert.equal(r, [2, 3])
})

test('QPromise', async() => {
  const p = new QPromise((resolve: (v: number) => void) => resolve(42))
  assert.is(await p, 42)
})

// ── timers ──

test('debounce', async() => {
  let calls = 0
  const f = debounce(10, () => { calls++ })
  f(); f(); f()
  await wait(15)
  assert.is(calls, 1)
})

test('throttle', async() => {
  let calls = 0
  const f = throttle(10, () => { calls++ })
  f(); f(); f()
  assert.is(calls, 1)
  await wait(15)
})

test('wait', async() => {
  const start = Date.now()
  await wait(20)
  assert.ok(Date.now() - start >= 15)
})

// ── partial application (curried) ──

test('gt partial', () => {
  const gt2 = gt(2)
  assert.is(gt2(1), false)
  assert.is(gt2(3), true)
})

test('lt partial', () => {
  const lt1 = lt(1)
  assert.is(lt1(0), true)
  assert.is(lt1(2), false)
})

test('gte partial', () => {
  const gte2 = gte(2)
  assert.is(gte2(2), true)
  assert.is(gte2(3), true)
  assert.is(gte2(1), false)
})

test('lte partial', () => {
  const lte2 = lte(2)
  assert.is(lte2(2), true)
  assert.is(lte2(1), true)
  assert.is(lte2(3), false)
})

test('subtract partial', () => {
  const sub5 = subtract(5)
  assert.is(sub5(3), -2)
  assert.is(sub5(10), 5)
})

test('divide partial', () => {
  const div6 = divide(6)
  assert.is(div6(2), 1/3)
  assert.is(div6(12), 2)
})

test('nth partial', () => {
  const second = nth(1)
  assert.is(second([10, 20, 30]), 20)
})

test('indexOf partial', () => {
  const idx2 = indexOf(2)
  assert.is(idx2([1, 2, 3]), 1)
  assert.is(idx2([3, 4, 5]), -1)
})

test('findIndex partial', () => {
  const idx = findIndex((x: number) => x > 1)
  assert.is(idx([1, 2, 3]), 1)
})

test('range partial', () => {
  const from1 = range(1)
  assert.equal(from1(5), [1, 2, 3, 4])
})

test('intersection partial', () => {
  const with123 = intersection([1, 2, 3])
  assert.equal(with123([2, 3, 4]), [2, 3])
})

test('diff partial', () => {
  const from123 = diff([1, 2, 3])
  assert.equal(from123([2, 3]), [1])
})

test('genBy partial', () => {
  const doubler = genBy((i: number) => i * 2)
  assert.equal(doubler(3), [0, 2, 4])
})

test('uniqWith partial', () => {
  const byMod = uniqWith((a: number, b: number) => a % 2 === b % 2)
  assert.equal(byMod([1, 3, 2, 4]), [1, 2])
})

test('uniqBy partial', () => {
  const byAbs = uniqBy((a: number, b: number) => Math.abs(a) === Math.abs(b))
  assert.equal(byAbs([1, -1, 2]), [1, 2])
})

test('some partial', () => {
  const hasGt1 = some((x: number) => x > 1)
  assert.is(hasGt1([0, 1, 2]), true)
  assert.is(hasGt1([0, 0]), false)
})

test('weakEq partial', () => {
  const eq1 = weakEq(1)
  assert.is(eq1(1), true)
  assert.is(eq1('1' as any), false)
})

test('regexTest partial', () => {
  const isAlpha = regexTest(/^[a-z]+$/)
  assert.is(isAlpha('abc'), true)
  assert.is(isAlpha('123'), false)
})

test('pickBy partial', () => {
  const pickAC = pickBy((k: string) => k === 'a' || k === 'c')
  assert.equal(pickAC({ a: 1, b: -1, c: 3 }), { a: 1, c: 3 })
})

test('mapObj partial', () => {
  const inc = mapObj((v: number) => v + 1)
  assert.equal(inc({ a: 1, b: 2 }), { a: 2, b: 3 })
})

test('zip partial', () => {
  const withNums = zip([1, 2])
  assert.equal(withNums(['a', 'b']), [[1, 'a'], [2, 'b']])
})

test('zipObj partial', () => {
  const withKeys = zipObj(['a', 'b'])
  assert.equal(withKeys([1, 2]), { a: 1, b: 2 })
})

test('propEq partial', () => {
  const isA1 = propEq('a', 1)
  assert.is(isA1({ a: 1, b: 2 }), true)
  assert.is(isA1({ a: 2 }), false)
})

test('pathEq partial', () => {
  const isAB1 = pathEq(['a', 'b'], 1)
  assert.is(isAB1({ a: { b: 1 } }), true)
  assert.is(isAB1({ a: { b: 2 } }), false)
})

test('pathOr partial', () => {
  const getAB = pathOr(0, ['a', 'b'])
  assert.is(getAB({ a: { b: 5 } }), 5)
  assert.is(getAB({ a: {} }), 0)
})

test('pathExists partial', () => {
  assert.is(pathExists(['a', 'b'], { a: { b: 1 } }), true)
  assert.is(pathExists(['a', 'b'], { a: {} }), false)
})

test('replace partial', () => {
  const replaceA = replace('a')
  const replaceAx = replaceA('x')
  assert.is(replaceAx('abc'), 'xbc')
})

test('overProp partial', () => {
  const incA = overProp('a', (v: number) => v + 1)
  assert.equal(incA({ a: 1, b: 2 }), { a: 2, b: 2 })
})

test('overProp partial 2 levels', () => {
  const overA = overProp('a')
  const incA = overA((v: number) => v + 1)
  assert.equal(incA({ a: 1 }), { a: 2 })
})

test('assoc partial', () => {
  const setA = assoc('a')
  const setA1 = setA(1)
  assert.equal(setA1({ b: 2 }), { a: 1, b: 2 })
})

test('assocPath partial', () => {
  const setAB = assocPath(['a', 'b'])
  const setAB1 = setAB(1)
  assert.equal(setAB1({ a: {} }), { a: { b: 1 } })
})

test('reduce partial', () => {
  const sumFrom = reduce((acc: number, cur: number) => acc + cur, 0)
  assert.is(sumFrom([1, 2, 3]), 6)
})

test('reduce partial 2 levels', () => {
  const sumReducer = reduce((acc: number, cur: number) => acc + cur)
  const sumFrom0 = sumReducer(0)
  assert.is(sumFrom0([1, 2, 3]), 6)
})

test('both partial', () => {
  const posAndSmall = both((x: number) => x > 0, (x: number) => x < 10)
  assert.is(posAndSmall(5), true)
  assert.is(posAndSmall(15), false)
})

test('both partial 2 levels', () => {
  const pos = both((x: number) => x > 0)
  const posAndSmall = pos((x: number) => x < 10)
  assert.is(posAndSmall(5), true)
  assert.is(posAndSmall(-1), false)
})

test('callFrom partial', () => {
  const arr = [1, 2, 3]
  const pushArgs = callFrom([4])
  const result = pushArgs('push', arr)
  assert.is(result, 4)
  assert.equal(arr, [1, 2, 3, 4])
})

// ── quick partial application ──

test('qmap partial', () => {
  const dbl = qmap((x: number) => x * 2)
  assert.equal(dbl([1, 2, 3]), [2, 4, 6])
})

test('qfilter partial', () => {
  const gt1 = qfilter((x: number) => x > 1)
  assert.equal(gt1([1, 2, 3]), [2, 3])
})

test('qsort partial', () => {
  const asc = qsort((a: number, b: number) => a - b)
  assert.equal(asc([3, 1, 2]), [1, 2, 3])
})

test('qomit partial', () => {
  const withoutB = qomit(['b'])
  assert.equal(withoutB({ a: 1, b: 2, c: 3 }), { a: 1, c: 3 })
})

test('qpick partial', () => {
  const onlyA = qpick(['a'])
  assert.equal(onlyA({ a: 1, b: 2 }), { a: 1 })
})

test('qassoc partial', () => {
  const setA = qassoc('a')
  const setA1 = setA(1)
  assert.equal(setA1({ b: 2 }), { a: 1, b: 2 })
})

test('qassocPath partial', () => {
  const setAB = qassocPath(['a', 'b'])
  const setAB1 = setAB(1)
  assert.equal(setAB1({ a: {} }), { a: { b: 1 } })
})

test('qreduce partial', () => {
  const sumFrom = qreduce((acc: number, cur: number) => acc + cur, 0)
  assert.is(sumFrom([1, 2, 3]), 6)
})

test('qreduce partial 2 levels', () => {
  const sumReducer = qreduce((acc: number, cur: number) => acc + cur)
  const sumFrom0 = sumReducer(0)
  assert.is(sumFrom0([1, 2, 3]), 6)
})

test('qoverProp partial', () => {
  const incA = qoverProp('a', (v: number) => v + 1)
  assert.equal(incA({ a: 1 }), { a: 2 })
})

test('qoverProp partial 2 levels', () => {
  const overA = qoverProp('a')
  const incA = overA((v: number) => v + 1)
  assert.equal(incA({ a: 1 }), { a: 2 })
})

test('qslice partial', () => {
  const from1 = qslice(1)
  const from1to3 = from1(3)
  assert.equal(from1to3([1, 2, 3, 4]), [2, 3])
})

test('quniqWith partial', () => {
  const byParity = quniqWith((x: number) => x % 2)
  assert.equal(byParity([1, 3, 2, 4]), [1, 2])
})

test('quniqBy partial', () => {
  const byAbs = quniqBy((x: number) => Math.abs(x))
  assert.equal(byAbs([1, -1, 2]), [1, 2])
})

test('qpush partial', () => {
  const push4 = qpush(4)
  assert.equal(push4([1, 2, 3]), [1, 2, 3, 4])
})

test('qprepend partial', () => {
  const prepend0 = qprepend(0)
  assert.is(prepend0([1, 2, 3]), 4)
})

test('qappend partial', () => {
  const append4 = qappend(4)
  assert.equal(append4([1, 2, 3]), [1, 2, 3, 4])
})

test('qmapKeys partial', () => {
  const renameA = qmapKeys({ a: 'b' })
  assert.equal(renameA({ a: 1 }), { b: 1 })
})

test('qmapObj partial', () => {
  const inc = qmapObj((v: number) => v + 1)
  assert.equal(inc({ a: 1, b: 2 }), { a: 2, b: 3 })
})

test.run()