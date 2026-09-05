// Type tests for src/quick.ts — verified by tsc and tsgo.

import {
  qappend, qassoc, qreduce, qmergeDeep, qmergeShallow, qmergeDeepX, qmergeDeepAdd,
  qmapKeys, qmap, qmapObj, qfilter, qempty, qfreeze, qfreezeShallow,
  qprepend, qsort, qassocPath, qreverse, qomit, qoverProp, qpick, qslice,
  quniqWith, quniq, qpush, quniqBy, flip,
} from '../../src'
import type { AnyObject } from '../../src'

// ── qappend ──
const _qappend: number[] = qappend(4, [1, 2, 3])
const _qappendC: number[] = qappend(4)([1, 2, 3])

// ── qprepend (returns new length via unshift) ──
const _qprepend: number = qprepend(0, [1, 2, 3])
const _qprependC: number = qprepend(0)([1, 2, 3])

// ── qassoc ──
const _qassoc: AnyObject = qassoc('a', 1, { b: 2 })
const _qassocC: AnyObject = qassoc('a', 1)({ b: 2 })

// ── qassocPath ──
const _qassocPath: AnyObject = qassocPath(['a', 'b'], 1, { a: {} })

// ── qreduce ──
const _qreduce: number = qreduce((acc: number, cur: number) => acc + cur, 0, [1, 2, 3])

// ── qmergeShallow ──
const _qmergeShallow: AnyObject = qmergeShallow({ a: 1 }, { b: 2 })
const _qmergeShallowC: AnyObject = qmergeShallow({ a: 1 })({ b: 2 })

// ── qmergeDeep ──
const _qmergeDeep: AnyObject = qmergeDeep({ a: { x: 1 } }, { a: { y: 2 } })
const _qmergeDeepC: AnyObject = qmergeDeep({ a: { x: 1 } })({ a: { y: 2 } })

// ── qmergeDeepX ──
const _qmergeDeepX: AnyObject = qmergeDeepX({ a: [1] }, { a: [2] })

// ── qmergeDeepAdd ──
const _qmergeDeepAdd: AnyObject = qmergeDeepAdd({ a: 1 }, { a: 2 })

// ── qmapKeys ──
const _qmapKeys: AnyObject = qmapKeys({ a: 'b' }, { a: 1 })

// ── qmap ──
const _qmap: number[] = qmap((x: number) => x * 2, [1, 2, 3])
const _qmapC: number[] = qmap((x: number) => x * 2)([1, 2, 3])

// ── qmapObj ──
const _qmapObj: AnyObject = qmapObj((v: any) => v + 1, { a: 1 })

// ── qfilter ──
const _qfilter: number[] = qfilter((x: number) => x > 1, [1, 2, 3])
const _qfilterC: number[] = qfilter((x: number) => x > 1)([1, 2, 3])

// ── qempty ──
const _qempty: [] = qempty([])

// ── qfreeze / qfreezeShallow ──
const _qfreeze: Readonly<AnyObject> = qfreeze({ a: 1 })
const _qfreezeShallow: Readonly<AnyObject> = qfreezeShallow({ a: 1 })

// ── qsort ──
const _qsort: number[] = qsort((a: number, b: number) => a - b, [3, 1, 2])

// ── qslice ──
const _qslice: number[] = qslice(1, 3, [1, 2, 3, 4])

// ── qreverse ──
const _qreverse: number[] = qreverse([1, 2, 3])

// ── qomit ──
const _qomit: AnyObject = qomit(['b'], { a: 1, b: 2 })

// ── qoverProp ──
const _qoverProp: AnyObject = qoverProp('a', (v: any) => v + 1, { a: 1 })

// ── qpick ──
const _qpick: AnyObject = qpick(['a'], { a: 1, b: 2 })

// ── quniqWith ──
const _quniqWith: number[] = quniqWith((x: number) => x, [1, 1, 2])

// ── quniq ──
const _quniq: number[] = quniq([1, 1, 2])

// ── quniqBy ──
const _quniqBy: number[] = quniqBy((x: number) => x, [1, 1, 2])

// ── qpush ──
const _qpush: number[] = qpush(4, [1, 2, 3])

// ── Partial application (curried) tests ──
// curry2 functions: fn(a) => (b) => result
const _qmapKeysC: (o: any) => any = qmapKeys({ a: 'b' })
const _qmapObjC: (o: any) => any = qmapObj((v: any) => v + 1)
const _qsortC: (xs: any[]) => any[] = qsort((a: number, b: number) => a - b)
const _qomitC: (o: any) => any = qomit(['b'])
const _qpickC: (o: any) => any = qpick(['a'])
const _quniqWithC: (xs: any[]) => any[] = quniqWith((x: number) => x)
const _quniqByC: (xs: any[]) => any[] = quniqBy((x: number) => x)
const _qpushC: (xs: any[]) => any[] = qpush(4)

// curry3 functions: fn(a) => (b, c) => result; fn(a, b) => (c) => result; fn(a)(b) => (c) => result
const _qassocPathC1: (v: any, o: any) => any = qassocPath(['a', 'b'])
const _qassocPathC2: (o: any) => any = qassocPath(['a', 'b'], 1)
const _qassocPathC3: (o: any) => any = qassocPath(['a', 'b'])(1)
const _qreduceC1: (acc: number, arr: any[]) => number = qreduce((a: number, b: number) => a + b)
const _qreduceC2: (arr: any[]) => number = qreduce((a: number, b: number) => a + b, 0)
const _qreduceC3: (arr: any[]) => number = qreduce((a: number, b: number) => a + b)(0)
const _qoverPropC1: (fn: any, o: any) => any = qoverProp('a')
const _qoverPropC2: (o: any) => any = qoverProp('a', (v: any) => v + 1)
const _qoverPropC3: (o: any) => any = qoverProp('a')((v: any) => v + 1)
const _qsliceC1: (end: number, xs: any[]) => any[] = qslice(1)
const _qsliceC2: (xs: string | any[]) => string | any[] = qslice(1, 3)
const _qsliceC3: (xs: string | any[]) => string | any[] = qslice(1)(3)

// ── qmap with different return type (T → U) — regression ──
// Old T_qmap forced <T> (pipe return = T), breaking type-changing maps.
// Fix: <T, U> so pipe can return a different type.
const _qmapNumToStr: string[] = qmap((x: number) => x.toString(), [1, 2, 3])
const _qmapNumToStrC: string[] = qmap((x: number) => x.toString())([1, 2, 3])
const _qmapStrToNum: number[] = qmap((x: string) => parseInt(x, 10), ['1', '2', '3'])
const _qmapStrToNumC: number[] = qmap((x: string) => parseInt(x, 10))(['1', '2', '3'])
const _qmapObjToNum: number[] = qmap((x: { a: number }) => x.a, [{ a: 1 }, { a: 2 }])
const _qmapObjToStr: string[] = qmap((x: { a: number }) => x.a.toString(), [{ a: 1 }, { a: 2 }])

// ── flip(quick curry2_fn) — overload ordering regression ──
// Full-arity overload must be LAST so Parameters<T>[1] resolves.
const _flipQmapKeys = flip(qmapKeys)
const _flipQmapKeysR: AnyObject = _flipQmapKeys({ a: 1 } as AnyObject, { a: 'b' })
const _flipQmapObj = flip(qmapObj)
const _flipQmapObjR: AnyObject = _flipQmapObj({ a: 1 } as AnyObject, (v: any) => v + 1)
const _flipQmergeShallow = flip(qmergeShallow)
const _flipQmergeShallowR: AnyObject = _flipQmergeShallow({ b: 2 } as AnyObject, { a: 1 } as AnyObject)
const _flipQpick = flip(qpick)
const _flipQpickR: AnyObject = _flipQpick({ a: 1, b: 2 } as AnyObject, ['a'])
const _flipQomit = flip(qomit)
const _flipQomitR: AnyObject = _flipQomit({ a: 1, b: 2 } as AnyObject, ['b'])