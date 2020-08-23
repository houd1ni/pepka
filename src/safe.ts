import { __, curry } from './curry'
import { isNum, nul, isUndef, undef, isNull, isArray, isFunc, isStr, isObj } from './utils'
import { qmergeDeep, qreduce, qappend, qmapKeys, qmergeDeepX, qmergeDeepAdd } from './quick'
import { AnyFunc, Cond, AnyObject, Reducer } from './types'
import { type } from './common'
// over, lensProp

export const equals = curry((a: any, b: any) => {
  const typea = type(a)
  if(typea===type(b) && (typea==='Object' || typea=='Array')) {
    if(isNull(a) || isNull(b)) {
      return a===b
    }
    if(a===b) {
      return true
    }
    for(const v of [a, b]) {
      for(const k in v) {
        if(
          !((v===b) && (k in a)) &&
          !((v===a) && (k in b) && equals(a[k], b[k]))
        ) {
          return false
        }
      }
    }
    return true
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
    (s: any = __) => {
      for(let i = length(fns)-1; i>-1; i--) {
        s = s===__ ? fns[i]() : fns[i](s)
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
  (s: any, ss: any[]) => {
    if(isStr(ss)) {
      return ss.includes(s)
    } else {
      for(const a of ss) {
        if(equals(a, s)) {
          return true
        }
      }
      return false
    }
  }
)
export const slice = curry(
  (from: number, to: number|null, o: any[] | string) =>
    o.slice(from, (isNum(to)?to:Infinity) as number)
)
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
export const complement = (fn: AnyFunc) => (...args: any) => {
  const out = fn(...args)
  return (isFunc(out) && (out as any).$args_left) ? complement(out) : not(out)
}
export const keys = (o: AnyObject | any[]) => Object.keys(o)
export const values = (o: AnyObject | any[]) => Object.values(o)
export const toPairs = (o: AnyObject | any[]) => Object.entries(o)
export const test = curry((re: RegExp, s: string) => re.test(s))
export const tap = curry((fn: Function, s: any) => { fn(s); return s })
export const append = curry((s: any, xs: any[]) => [...xs, s])
export const split = curry((s: string, xs: string) => xs.split(s))
export const T = always<true>(true) as (...args: any[]) => true
export const F = always<false>(false) as (...args: any[]) => false
export const sizeof = (s: any[] | string | AnyObject) => {
  if(type(s) === 'Object') {
    let len = 0
    for(let _k in s as AnyObject) len++
    return len
  } else return length(s as any[])
}
export const range = curry((from: number, to: number) =>
  genBy(add(from), to-from)
)
export const uniq = (xs: any[]) => qreduce(
  (accum: any[], x: any) =>
    includes(x, accum) ? accum : qappend(x, accum),
[], xs)
export const intersection = curry(
  (xs1: any[], xs2: any[]) => xs1.filter(flip(includes)(xs2))
)
export const genBy = curry(
  (
    generator: (i: number) => any,
    length: number
  ) => [...Array(length)].map((_, i) => generator(i))
)
export const once = <Func extends AnyFunc>(fn: Func) => {
  let done = false, cache: any
  return (...args: Parameters<Func>) => {
    if(done) {
      return cache
    } else {
      done = true
      return cache = fn(...args)
    }
  }
}
export const reverse = (xs: any[]) => compose(
  (ln: number) => reduce(
    (nxs: any[], _: any, i: number) => qappend(xs[ln-i], nxs),
    [], xs
  ),
  add(-1),
  length
)(xs)
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
// : <U=any>(sortFn: (v: U)=>-1|1, xs: U[]) => U[] 
export const sort = curry((sortFn: any, xs: any[]) => xs.sort(sortFn))
export const find = curry(
  (fn: Cond, s: any[]) => s.find(fn)
)
export const findIndex = curry(
  (fn: Cond, s: any[]) => s.findIndex(fn)
)
export const indexOf = curry(
  (x: any, xs: any[]) => findIndex(equals(x), xs)
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
export const assocPath = curry(
  (_path: string[], v: any, o: AnyObject) => compose(
    (first: string) => assoc(
      first,
      length(_path)<2
        ? v
        : assocPath(slice(1, null, _path), v, isObj(o[first]) ? o[first] : {}),
      o
    ),
    head
  )(_path)
)
export const all = curry((pred: Cond, xs: any[]) => xs.every(pred))
export const any = curry((pred: Cond, xs: any[]) => xs.some(pred))
export const allPass = curry(
  (preds: Cond[], x: any) => preds.every((pred) => pred(x))
)
export const anyPass = curry(
  (preds: Cond[], x: any) => preds.some((pred) => pred(x))
)
export const prop = curry(
  (key: string, o: AnyObject) => o[key]
)
export const propEq = curry(
  (key: string, value: any, o: AnyObject) => equals(o[key], value)
)
export const propsEq = curry(
  (key: string, o1: any, o2: AnyObject) => equals(o1[key], o2[key])
)
export const pathOr = curry(
  (_default: any, path: string[], o: any) =>
    ifElse(length,
      () => isNil(o)
        ? _default
        : compose(
            ifElse(isNil,
              always(_default),
              (o: any) => pathOr(_default, slice(1, nul, path), o)
            ),
            flip(prop)(o),
            head
          )(path),
      always(o),
    path)
)
export const path = pathOr(undef)
export const pathEq = curry(
  (_path: string[], value: any, o: AnyObject) => equals(path(_path, o), value)
)
export const pathsEq = curry(
  (_path: string[], o1: AnyObject, o2: AnyObject) =>
    equals(path(_path, o1), path(_path, o2))
)
const typed_arr_re = /^(.*?)(8|16|32|64)(Clamped)?Array$/
export const clone = (s: any) => {
  const t = type(s)
  switch(t) {
    case 'Null': return s
    case 'Array': return map(clone, s)
    case 'Object':
      const out = {}
      for(let k in s) {
        out[k] = clone(s[k])
      }
      return out
    case 'String': case 'Number':
    case 'Boolean': case 'Symbol':
      return s
    default:
      return typed_arr_re.test(t) ? map(clone, s) : s
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
  (props: string[], o: AnyObject) => {
    const out = {}
    for(const p of props) {
      if(p in o) {
        out[p] = o[p]
      }
    }
    return out
  }
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
type Concat = ((a: string, b: string) => string)
            | ((a: any[], b: any[]) => any[])
export const concat = curry(
  ((a, b) => a.concat(b)) as Concat
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
export const isEmpty = (s: any) => {
  switch(type(s)) {
    case 'String': case 'Array': return length(s)==0
    case 'Object':
      for(const _k in s) return false
      return true
    default: return null
  }
}
export const empty = (s: any) => {
  switch(type(s)) {
    case 'String': return ''
    case 'Object': return {}
    case 'Array': return []
    default: return undef
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
  ) => isArray(data)
    ? data.filter(cond)
    : compose(
      fromPairs,
      filter(([k, v]) => cond(v, k)),
      toPairs
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
  (a: AnyObject, b: AnyObject) => qmergeDeep(clone(a), clone(b))
)
export const mergeDeepX = curry(
  (a: AnyObject, b: AnyObject) => qmergeDeepX(clone(a), clone(b))
)
export const mergeDeepAdd = curry(
  (a: AnyObject, b: AnyObject) => qmergeDeepAdd(clone(a), clone(b))
)
export const overProp = curry(
  (prop: string, pipe: AnyFunc, data: any) =>
    assoc(prop, pipe(data[prop]), data)
)
/** mapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export const mapKeys = curry(
  (
    keyMap: {[oldKey: string]: string},
    o: AnyObject
  ) => qmapKeys(keyMap, Object.assign({}, o))
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
