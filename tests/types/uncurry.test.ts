// Type tests for src/uncurry.ts — verified by tsc and tsgo.

import { uncurry } from '../../src'

// ── uncurry ──
const _uncurried = uncurry((a: number) => (b: number) => a + b)
const _r1: number = _uncurried(1, 2)