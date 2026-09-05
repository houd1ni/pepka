// Type tests for src/common.ts — verified by tsc and tsgo.

import {
  symbol, toLower, toUpper, type, typeIs,
  eq, equals, includes, always, identity, trim,
} from '../../src'

// ── symbol ──
const _sym: symbol = symbol

// ── toLower / toUpper ──
const _lower: string = toLower('HELLO')
const _upper: string = toUpper('hello')

// ── type / typeIs ──
const _type: string = type(42)
const _typeIs: boolean = typeIs('Number', 42)

// ── eq ──
const _eq: boolean = eq(1, 1)
const _eqCurried: boolean = eq(1)(1)

// ── equals ──
const _equals: boolean = equals([1, 2], [1, 2])
const _equalsCurried: boolean = equals([1, 2])([1, 2])

// ── includes (curry2 — returns boolean) ──
const _includesStr: boolean = includes('el', 'hello')
const _includesStrC: boolean = includes('el')('hello')
const _includesArr: boolean = includes(2, [1, 2, 3])
const _includesArrC: boolean = includes(2)([1, 2, 3])
// Keep old assertions for backward compat
const _includes: boolean = includes(2, [1, 2, 3])
const _includesCurried: boolean = includes(2)([1, 2, 3])

// ── always ──
const _always: () => number = always(42)
const _alwaysVal: number = _always()

// ── identity ──
const _id: number = identity(42)

// ── trim ──
const _trim: string = trim('  hi  ')