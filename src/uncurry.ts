import { qreduce } from "./quick"
import { AnyFunc, Curried } from "./types"

// TODO: possibly introduce a second argument limiting unfolding.
export const uncurry = <
  Args extends any[] = any[],
  ReturnT = any
>(fn: Curried<Args>): AnyFunc =>
  (...args: Args) => qreduce<any>(
    ((fn: Curried<Args>, arg: any) => fn ? fn(arg) : fn), fn, args
  ) as ReturnT