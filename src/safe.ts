import { __, curry } from './curry'
import { to, isNum, nul, isUndef, undef, isNull, isArray } from './utils'
import { qmergeDeep, qreduce } from './quick'
import { AnyFunc, Cond, AnyObject, Reducer } from './types'

export const equals = curry((a: any, b: any) => {
  if(to(a)=='object' && to(b)=='object') {
    if(isNull(a) || isNull(b)) {
      return a===b
    }
    for(let v of [a, b]) {
      for(let k in v) {
        if(!equals(a[k], b[k])) {
          return false
        }
      }
    }
  }
  return a===b
})
export const ifElse = curry(
  (
    cond: (s: any) => boolean,
    pipeYes: (s: any) => any,
    pipeNo: (s: any) => any,
    s: any
  ) => cond(s) ? pipeYes(s) : pipeNo(s)
)
export const when = curry(
  (
    cond: (s: any) => boolean,
    pipe: (s: any) => any,
    s: any
  ) => ifElse(cond, pipe, identity, s)
)
export const compose = (
  (...fns: Function[]) =>
    (s: any) => {
      for(let i = length(fns)-1; i>-1; i--) {
        s = fns[i](s)
      }
      return s
    }
)// as F.Compose

export const bind = curry(
  (fn: AnyFunc, context: any) => fn.bind(context)
)
export const nth = curry(
  (i: number, data: any[]) => data[i]
)
export const includes = curry(
  (s: any, ss: any[]) => ss.includes(s)
)
export const slice = curry(
  (from: number, to: number|null, o: any[] | string) =>
    o.slice(from, (isNum(to)?to:Infinity) as number)
)
export const toLower = (s: string) => s.toLowerCase()
export const toUpper = (s: string) => s.toUpperCase()
export const head = nth(0)
export const tail = slice(1, nul)
export const add = curry((n: number, m: number) => n+m)
export const subtract = curry((n: number, m: number) => m-n)
export const flip = (fn: Function) => curry((b: any, a: any) => fn(a, b))
export const isNil = (s: any) => isNull(s) || isUndef(s)
export const length = (s: any[] | string) => s.length
export const always = <T=any>(s: T) => () => s
export const identity = (s: any) => s
export const trim = (s: string) => s.trim()
export const last = (s: any[] | string) => s[length(s)-1]
export const not = (o: boolean) => !o
export const complement = (fn: Cond) => (s: any) => not(fn(s))
export const keys = (o: AnyObject) => Object.keys(o)
export const values = (o: AnyObject) => Object.values(o)
export const toPairs = (o: AnyObject) => Object.entries(o)
export const tap = curry((fn: Function, s: any) => { fn(s); return s })
export const append = (s: any, xs: any[]) => [...xs, s]
export const split = curry((s: string, xs: string) => xs.split(s))
export const T = always<true>(true)
export const F = always<false>(false)
export const gt = curry(
  (a: number, b: number) => a>b
)
export const lt = curry(
  (a: number, b: number) => a<b
)
export const gte = curry(
  (a: number, b: number) => b>=a
)
export const lte = curry(
  (a: number, b: number) => b<=a
)
export const findIndex = curry(
  (fn: Cond, s: any[]) => s.findIndex(fn)
)
export const explore = (caption: string, level = 'log') => tap(
  (v: any) => console[level](caption, v)
)
export const cond = curry(
  (pairs: [Cond, Function][], s: any) => {
    for(const [cond, fn] of pairs) {
      if(cond(s)) {
        return fn(s)
      }
    }
  }
)
export const assoc = curry(
  (prop: string, v: any, obj: AnyObject) => ({
    ...obj,
    [prop]: v
  })
)
export const prop = curry(
  (key: string, o: AnyObject) => o[key]
)
export const pathOr = curry(
  (_default: any, path: string[], o: any) =>
    ifElse(length,
      compose(
        ifElse(isNil,
          always(_default),
          (o: any) => pathOr(_default, slice(1, nul, path), o)
        ),
        flip(prop)(o),
        head
      ),
      always(o)
    )(path)
)
export const path = pathOr(undef)
export const clone = (s: any) => {
  switch(to(s)) {
    case 'object':
      switch(type(s)) {
        case 'Null': return s
        case 'Array': return map(clone, s)
        case 'Object':
          const out = {}
          for(let k in s) {
            out[k] = clone(s[k])
          }
          return out
      }
    default: return s
  }
}
export const reduce = curry(
  (fn: Reducer, accum: any, arr: any[]) =>
    qreduce(fn, clone(accum), arr)
)
export const pickBy = curry(
  (cond: Cond, o: AnyObject) => filter(cond, o)
)
export const pick = curry(
  (props: string[], o: AnyObject) => filter(
    (_: any, k: string) => includes(k, props),
    o
  )
)
export const omit = curry(
  (props: string[], o: AnyObject) => filter(
    (_: any, k: string) => !includes(k, props),
    o
  )
)
export const fromPairs = (pairs: [string, any][]) => reduce(
  (o: AnyObject, pair: [string, any]) => assoc(...pair, o),
  {}, pairs
)
export const join = curry(
  (delimeter: string, arr: string[]) => arr.join(delimeter)
)
export const map = curry(
  (pipe: (s: any) => any, arr: any[]) => arr.map(pipe)
)
export const forEach = curry(
  (pipe: (s: any) => any, arr: any[]) => arr.forEach(pipe)
)
export const both = curry(
  (cond1: Cond, cond2: Cond, s: any) => cond2(s) && cond1(s)
)
export const type = (s: any) => {
  const t = to(s)
  return t=='object'
    ? isArray(s) ? 'Array' : (isNull(s) ? 'Null' : 'Object')
    : toUpper(t[0]) + t.slice(1)
}
export const isEmpty = (s: any) => {
  switch(type(s)) {
    case 'String': return s==''
    case 'Array': return length(s)==0
    case 'Null': return false
    case 'Object': return length(Object.keys(s)) == 0
    default: return false
  }
}
export const replace = curry(
  (
    a: string | RegExp,
    b: string,
    where: string
  ) => where.replace(a, b)
)
export const filter = curry(
  (
    cond: (v: any, k: string | number) => boolean,
    data: any[] | AnyObject
  ) => ifElse(
    compose(equals('Array'), type),
    (arr: any[]) => arr.filter(cond),
    compose(
      fromPairs,
      filter(([k, v]) => cond(v, k)),
      toPairs
    )
  )(data)
)
export const memoize = (fn: Function) => {
  let cache: any
  let cached = false
  return () => cached ? cache : (cached = true, cache = fn())
}
export const mergeShallow = curry(
  (o1: AnyObject, o2: AnyObject): AnyObject =>
    Object.assign({}, o1, o2)
)
export const mergeDeep = curry(
  (a: AnyObject, b: AnyObject) => qmergeDeep(clone(a), b)
)
/** mapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export const mapKeys = curry(
  (
    keyMap: {[oldKey: string]: string},
    o: AnyObject
  ) => compose(
    fromPairs,
    filter(complement(isNil)),
    map((([k, v]) => isNull(keyMap[k]) ? nul : [keyMap[k] || k, v])),
    toPairs
  )(o)
)

// ASYNCS

/** One promise waits for another. */
export const forEachSerial = (() => {
  const pipe = async (fn: AnyFunc, items: any[], i: number) => {
    if(i<items.length) {
      await fn(items[i])
      await pipe(fn, items, ++i)
    }
  }
  return curry(
    (fn: AnyFunc, items: any[]) => pipe(fn, items, 0)
  )
})()
/** Promise.all wrapper for functional pipelining. */
export const waitAll = (promises: Promise<any>[]) => Promise.all(promises)
/** Waits for all promises mapped by the fn. */
export const forEachAsync = curry(
  (fn: (item: any) => Promise<any>, items: any[]) =>
    Promise.all(items.map(fn))
)
/** The same as compose, but waits for promises in chains and returns a Promise.  */
export const composeAsync = (() => {
  const pipe = async (fns: AnyFunc[], data: any, i: number): Promise<any> =>
    ~i ? await pipe(fns, await fns[i](data), --i) : data
  return <T = any>(...fns: AnyFunc[]) =>
    (data?: any) => pipe(fns, data, fns.length-1) as Promise<T>
})()

// ALIASES

export const mirror = identity
export const reflect = identity
export const echo = identity