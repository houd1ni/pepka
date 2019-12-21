interface Args {
  [i: number]: any
}

export const __ = function Placeholder() {}

const isPl = (s: any) => s === __
const countArgs = (s: Args) => {
  let i = 0
  for (let k in s) !isPl(s[k]) && i++
  return i
}
const extractArgs = (args: Args) => {
  const len = countArgs(args)
  const arr = Array(len)
  for (let i=0; i<len; i++) {
    arr[i] = args[i]
  }
  return arr
}

// { 0: __, 1: 10 }, [ 11 ]
const addArgs = (args: Args, _args: any[]) => {
  const len = countArgs(args)
  const new_len = _args.length
  let i = 0, j = 0
  for (; i<len; i++) {
    if (isPl(args[i])) {
      args[i] = _args[j++]
    }
    if (j == new_len) {
      break
    }
  }
  for (; j < new_len; j++) {
    args[len+j] = _args[j]
  }
  return args
}

const _curry = (fn: Function, args: Args, _args: any[]) =>
  countArgs(addArgs(args, _args)) < fn.length
    ? (..._args: any[]) => _curry(fn, args, _args)
    : fn(...extractArgs(args))

export const curry = (fn: Function) =>
  (...args: any[]) => _curry(fn, {}, args)