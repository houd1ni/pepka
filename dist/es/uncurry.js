import { qreduce } from "./quick";
// TODO: possibly introduce a second argument limiting unfolding.
export const uncurry = (fn) => (...args) => qreduce(((fn, arg) => fn ? fn(arg) : fn), fn, args);
