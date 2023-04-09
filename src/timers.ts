import { AnyFunc } from "./types"

export const debounce = <T extends AnyFunc>(time: number, fn: T) => {
  let queue: AnyFunc[] = []
  let to: NodeJS.Timeout
  return ((...args: Parameters<T>) => new Promise<ReturnType<T>>((ff) => {
    const qel = async () => {
      clearTimeout(to)
      to = setTimeout(async () => {
        const res = await fn!(...args)
        if(queue.includes(qel)) ff(res)
      }, time)
    }
    queue.splice(0)
    queue.push(qel)
    qel()
  }))
}