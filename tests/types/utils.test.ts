// Type tests for src/utils.ts — verified by tsc and tsgo.

import {
  isNull, isUndef, isNil, isNum, isStr, isObj, isArray, isFunc, isSafe,
  QPromise,
} from '../../src/utils'

// ── is* type guards ──
const _isNull: boolean = isNull(null)
const _isUndef: boolean = isUndef(undefined)
const _isNil: boolean = isNil(null)
const _isNum: boolean = isNum(42)
const _isStr: boolean = isStr('hi')
const _isObj: boolean = isObj({})
const _isArray: boolean = isArray([])
const _isFunc: boolean = isFunc(() => {})
const _isSafe: boolean = isSafe('toString')

// ── QPromise ──
const _qp: QPromise<number> = new QPromise((resolve: (v: number) => void, _reject: (e: any) => void) => resolve(42))