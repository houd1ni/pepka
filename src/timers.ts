import { AnyFunc } from "./types"

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
// export const debouncePrepared = 
export const throttle = <T extends AnyFunc>(time: number, fn: T) => {
  let on = true
  return (...args: Parameters<T>) => {
    if(on) {
      on = false
      setTimeout(() => on = true, time)
      return fn(...args)
    }
  }
}
export const wait = (time: number) => new Promise((ff) => setTimeout(ff, time))