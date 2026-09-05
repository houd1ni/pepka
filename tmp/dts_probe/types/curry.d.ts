import type { AnyFunc } from './base';
export type { AnyFunc } from './base';
export type Placeholder = symbol;
export type Curried<Args extends any[] = any[], ReturnT = any> = (arg: Args[number]) => Curried<Args> | ReturnT;
export type Curried2<p0, p1, ReturnT> = {
    (a: Placeholder, b: p1): (a: p0) => ReturnT;
    (a: p0, b: Placeholder): (b: p1) => ReturnT;
    (a: p0): (b: p1) => ReturnT;
    (a: p0, b: p1): ReturnT;
};
export type Curried3<p0, p1, p2, ReturnT> = {
    (a: p0, b: p1): (c: p2) => ReturnT;
    (a: p0): (b: p1, c: p2) => ReturnT;
    (a: p0): (b: p1) => (c: p2) => ReturnT;
    (a: p0, b: p1, c: p2): ReturnT;
};
export type T_complement<F extends AnyFunc> = {
    (...args: Parameters<F>): ReturnType<F> extends AnyFunc ? T_complement<ReturnType<F>> : boolean;
};
