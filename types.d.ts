import { F } from 'ts-toolbelt'

type Currier = <F extends (...args: any) => any>(f: F) => F.Curry<F>