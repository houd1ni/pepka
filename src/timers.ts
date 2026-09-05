import { AnyFunc } from '../types/base'
import { QPromise } from './async'

/** Debounces a function: returns a new function that waits `time` ms
 * of inactivity before calling `fn`, coalescing all pending calls.
 * @param time - debounce delay in ms
 * @param fn - the function to debounce
 */
export const debounce = <T extends AnyFunc>(time: number, fn: T) => {
  let queue: AnyFunc[] = []
  let to: NodeJS.Timeout
  return ((...args: Parameters<T>) => new Promise<ReturnType<T>>((ff) => {
    clearTimeout(to)
    to = setTimeout(async () => {
      const res = await fn(...args)
      for(ff of queue) ff(res)
      queue.splice(0)
    }, time)
    queue.push(ff)
  }))
}
/** Throttles a function: returns a new function that calls `fn`
 * immediately, then ignores subsequent calls for `time` ms.
 * @param time - throttle interval in ms
 * @param fn - the function to throttle
 */
export const throttle = <T extends AnyFunc>(time: number, fn: T) => {
  let on = true
  let res: any
  return (...args: Parameters<T>) => {
    if(on) {
      on = false
      setTimeout(() => on = true, time)
      res = fn(...args)
    }
    return res
  }
}
/** Returns a cancellable QPromise that resolves after `time` ms.
 * @param time - delay in ms
 */
export const wait = (time: number) => new QPromise<any>(
  (ff) => setTimeout(ff, time),
  (timeout: any) => clearTimeout(timeout)
)