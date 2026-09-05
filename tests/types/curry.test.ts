// Type tests for src/curry.ts — verified by tsc and tsgo.

import { curry, curry2, curry3, __ } from '../../src'

// ── curry ──
const _curried = curry((a: number, b: number, c: number) => a + b + c)
const _c1: number = _curried(1, 2, 3)
const _c2: number = _curried(1, 2)(3)
const _c3: number = _curried(1)(2, 3)
const _c4: number = _curried(1)(2)(3)
const _c5: number = _curried(__, 2, 3)(1)
const _c6: number = _curried(__, __, 3)(1, 2)
const _c7: number = _curried(__, 2, __)(1, 3)

// ── curry2 ──
const _add2 = curry2((a: number, b: number) => a + b)
const _r1: number = _add2(1, 2)
const _r2: (b: number) => number = _add2(1)
const _r3: (a: number) => number = _add2(__, 2)
const _r4: number = _add2(1)(2)

// ── curry3 ──
const _add3 = curry3((a: number, b: number, c: number) => a + b + c)
const _r5: number = _add3(1, 2, 3)
const _r6: (b: number, c: number) => number = _add3(1)
const _r7: number = _add3(1)(2)(3)
const _r8: number = _add3(1, 2)(3)
const _r9: number = _add3(1)(2, 3)

// ── __ placeholder ──
const _ph: typeof __ = __