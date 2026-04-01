import { AnyFunc } from "./types"
import { QPromise } from "./utils"

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
export const wait = (time: number) => new QPromise<any>(
  (ff) => setTimeout(ff, time),
  (timeout: any) => clearTimeout(timeout)
)