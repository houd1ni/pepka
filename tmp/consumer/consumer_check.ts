import type * as T from '../../dist/types'
import type * as P from '../../dist/index'

type a = T.AnyArgs
type b = T.T_eq
const o: P.AnyObject = {}
const f: P.AnyFunc<number, [string]> = s => s.length
const r: P.Reducer<string> = (acc, x) => acc + x
const c: P.Cond = (a, b) => a === b
type C = P.Curried<[number, string], boolean>
type I = P.Inverse<string>
type PV = P.PathValue<{a: {b: string}}, ['a','b'], string>
type CO = P.Composed<[string], number>
console.log(o, f, r, c)
