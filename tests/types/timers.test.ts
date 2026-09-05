// Type tests for src/timers.ts — verified by tsc and tsgo.

import { debounce, throttle, wait } from '../../src'

// ── debounce ──
const _debounced = debounce(100, () => 'hi')
const _debouncedVal: Promise<string> = _debounced()

// ── throttle ──
const _throttled = throttle(100, () => 42)
const _throttledVal: number = _throttled()

// ── wait ──
const _waited: Promise<void> = wait(100)