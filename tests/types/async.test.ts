// Type tests for src/async.ts — verified by tsc and tsgo.

import {
  composeAsync, waitAll, qwaitAll, forEachParallel, forEachSerial, waitTap, qfilterAsync,
} from '../../src'

import type { AnyObject } from '../../src'

// ── composeAsync ──
const _composed = composeAsync(async (x: number) => x + 1, async (x: number) => x * 2)
const _r1: Promise<number> = _composed(5)

// ── waitAll ──
const _waitAll: Promise<number[]> = waitAll([Promise.resolve(1), Promise.resolve(2)])

// ── qwaitAll ──
const _qwaitAll: Promise<number[]> = qwaitAll([Promise.resolve(1), Promise.resolve(2)])

// ── forEachParallel ──
const _feParallel: Promise<any[]> = forEachParallel(async (x: number) => x, [1, 2, 3])

// ── forEachSerial ──
const _feSerial: Promise<void> = forEachSerial(async (x: number) => x, [1, 2, 3])

// ── waitTap ──
const _waitTap: Promise<number> = waitTap(async () => 'side effect', 42)

// ── qfilterAsync (curry2 — preserves T) ──
const _qfilterAsyncArr: Promise<number[]> = qfilterAsync(async (x: number) => x > 1, [1, 2, 3])
const _qfilterAsyncArrC: Promise<number[]> = qfilterAsync(async (x: number) => x > 1)([1, 2, 3])
const _qfilterAsyncObj: Promise<AnyObject> = qfilterAsync(async (v: any) => v > 1, { a: 1, b: 2 })
const _qfilterAsyncObjC: Promise<AnyObject> = qfilterAsync(async (v: any) => v > 1)({ a: 1, b: 2 })