
type Cond = (s: any) => boolean
interface AnyObject {
  [k: string]: any
}
type Reducer = <T>(accum: T, cur: any, index: number) => T

const undef = undefined
const nul = null
const to = (s: any) => typeof s
const isNull = (s: any) => s===nul
const isUndef = (s: any) => s===undef
const isNum = (s: any) => to(s)=='number'
const isArray = (s: any) => Array.isArray(s)

const _curry = (fn: Function, _args: any[], args: any[]) =>
  _args.length+args.length<fn.length
    ? (...args: any[]) => _curry(fn, [..._args, ...args], args)
    : fn(..._args, ...args)
export const curry = (fn: Function) =>
  (...args: any[]) => _curry(fn, args, [])
// unsafe wd be faster.
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
export const compose = (...fns: Function[]) =>
  (s: any) => {
    for(let i = length(fns)-1; i>-1; i--) {
      s = fns[i](s)
    }
    return s
  }

export const flip = (fn: Function) => curry((b: any, a: any) => fn(a, b))
export const isNil = (s: any) => isNull(s) || isUndef(s)
export const length = (s: any[] | string) => s.length
export const always = (s: any) => () => s
export const identity = (s: any) => s
export const trim = (s: string) => s.trim()
export const head = (s: any[] | string) => s[0]
export const last = (s: any[] | string) => s[s.length-1]
export const complement = (fn: Cond) => (s: any) => !fn(s)
export const keys = (o: AnyObject) => Object.keys(o)
export const values = (o: AnyObject) => Object.values(o)
export const toPairs = (o: AnyObject) => Object.entries(o)
export const tap = (fn: Function) => (s: any) => { fn(s); return s }
export const explore = (caption: string, level = 'log') => tap(
  (v: any) => console[level](caption, v)
)
export const slice = curry(
  (from: number, to: number, o: any[]) => o.slice(from, isNum(to)?to:Infinity)
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
    arr.reduce(fn, clone(accum))
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
    : t[0].toUpperCase() + t.slice(1)
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