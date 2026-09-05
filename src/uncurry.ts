import { qreduce } from './quick'
import { AnyFunc } from '../types/base'
import { Curried } from '../types/curry'

// TODO: possibly introduce a second argument limiting unfolding.
/** Uncurries a curried function into a single-call function that accepts all arguments at once.
 * @param fn - the curried function to uncurry
 */
export const uncurry = <
  Args extends any[] = any[],
  ReturnT = any
>(fn: Curried<Args>): AnyFunc =>
  (...args: Args) => qreduce(
    ((fn: Curried<Args>, arg: any) => fn ? fn(arg) : fn), fn, args
  ) as ReturnT