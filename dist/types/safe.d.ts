import type { AnyObject, Cond, AnyFunc, IndexesOfArray, Reducer } from './base.js';
export type T_ifElse = {
    <T>(pred: (x: T) => any): {
        (onTrue: (x: T) => any, onFalse: (x: T) => any, x: T): any;
        (onTrue: (x: T) => any, onFalse: (x: T) => any): (x: T) => any;
        (onTrue: (x: T) => any): {
            (onFalse: (x: T) => any, x: T): any;
            (onFalse: (x: T) => any): (x: T) => any;
        };
    };
    <T>(pred: (x: T) => any, onTrue: (x: T) => any): {
        (onFalse: (x: T) => any, x: T): any;
        (onFalse: (x: T) => any): (x: T) => any;
    };
    <T>(pred: (x: T) => any, onTrue: (x: T) => any, onFalse: (x: T) => any): (x: T) => any;
    <T>(pred: (x: T) => any, onTrue: (x: T) => any, onFalse: (x: T) => any, x: T): any;
};
export type T_when = {
    <T>(cond: (x: T) => any): {
        (pipe: (x: T) => any, x: T): any;
        (pipe: (x: T) => any): (x: T) => any;
    };
    <T>(cond: (x: T) => any, pipe: (x: T) => any): (x: T) => any;
    <T>(cond: (x: T) => any, pipe: (x: T) => any, x: T): any;
};
export type T_both = {
    <T>(c1: (x: T) => any): {
        (c2: (x: T) => any, x: T): boolean;
        (c2: (x: T) => any): (x: T) => boolean;
    };
    <T>(c1: (x: T) => any, c2: (x: T) => any): (x: T) => boolean;
    <T>(c1: (x: T) => any, c2: (x: T) => any, x: T): boolean;
};
export type T_cond = {
    (pairs: [Cond, AnyFunc][]): (s: any) => any;
    (pairs: [Cond, AnyFunc][], s: any): any;
};
export type T_filter = {
    <T>(cond: (v: T, k: any) => boolean): (data: T[]) => T[];
    (cond: (v: any, k: any) => boolean): (data: AnyObject) => AnyObject;
    <T>(cond: (v: T, k: any) => boolean, data: T[]): T[];
    (cond: (v: any, k: any) => boolean, data: AnyObject): AnyObject;
};
export type T_map = {
    <T, U>(fn: (x: T) => U): (arr: T[]) => U[];
    <T, U>(fn: (x: T, i: number, list: any[]) => U): (arr: T[]) => U[];
    (fn: (x: any, i: string, o: AnyObject) => any): (data: AnyObject) => AnyObject;
    <T, U>(fn: (x: T) => U, arr: T[]): U[];
    <T, U>(fn: (x: T, i: number, list: any[]) => U, arr: T[]): U[];
    (fn: (x: any, i: string, o: AnyObject) => any, data: AnyObject): AnyObject;
};
export type T_join = {
    (delim: string): (arr: ArrayLike<any> & {
        join: AnyFunc<string, [delim: string]>;
    }) => string;
    (delim: string, arr: ArrayLike<any> & {
        join: AnyFunc<string, [delim: string]>;
    }): string;
};
export type T_slice = {
    (from: number): {
        <T>(to: number, xs: T[]): T[];
        (to: number, xs: string): string;
        (to: number): <T>(xs: T[]) => T[];
        (to: number): (xs: string) => string;
    };
    (from: number, to: number): <T>(xs: T[]) => T[];
    (from: number, to: number): (xs: string) => string;
    <T>(from: number, to: number, xs: T[]): T[];
    (from: number, to: number, xs: string): string;
};
export type T_tap = {
    (fn: AnyFunc): {
        <T>(x: T): T;
        (): undefined;
    };
    <T>(fn: (x: T) => any, x: T): T;
};
export type T_not = {
    (x: true): false;
    (x: false): true;
    (x: any): boolean;
};
export type T_keys = {
    <T extends readonly any[]>(o: T): IndexesOfArray<T>[];
    <T extends any[]>(o: T): string[];
    <T extends AnyObject>(o: T): (keyof T)[];
};
export type T_nth = {
    (i: number): {
        <T>(data: T[]): T;
        (data: string): string;
    };
    <T>(i: number, data: T[]): T;
    (i: number, data: string): string;
};
export type T_sort = {
    <T>(sortFn: (a: T, b: T) => number): (xs: readonly T[]) => T[];
    <T>(sortFn: (a: T, b: T) => number, xs: readonly T[]): T[];
};
export type T_forEach = {
    <T>(fn: (s: T, i: number, arr: T[]) => any): (arr: T[]) => void;
    <T>(fn: (s: T, i: number, arr: T[]) => any, arr: T[]): void;
};
export type T_memoize = {
    <Args extends any[]>(keyGen: (...args: Args) => string): (fn: AnyFunc<any, Args>) => (...args: Args) => any;
    <Args extends any[]>(keyGen: (...args: Args) => string, fn: AnyFunc<any, Args>): (...args: Args) => any;
};
export type T_bind = {
    (fn: AnyFunc): (context: any) => AnyFunc;
    (fn: AnyFunc, context: any): AnyFunc;
};
export type T_find = {
    (fn: Cond): <T>(s: T[]) => T | undefined;
    <T>(fn: Cond, s: T[]): T | undefined;
};
export type T_findIndex = {
    (fn: Cond): (s: any[]) => number;
    (fn: Cond, s: any[]): number;
};
export type T_indexOf = {
    (x: any): (xs: any[]) => number;
    (x: any, xs: any[]): number;
};
export type T_append = {
    <T>(x: T): (xs: T[]) => T[];
    <T>(x: T, xs: T[]): T[];
};
export type T_prepend = {
    <T>(x: T): (xs: T[]) => T[];
    <T>(x: T, xs: T[]): T[];
};
export type T_flatTo = {
    (depth: number): (xs: any[]) => any[];
    (depth: number, xs: any[]): any[];
};
export type T_split = {
    (s: string | RegExp): (xs: string) => string[];
    (s: string | RegExp, xs: string): string[];
};
export type T_callWith = {
    (args: any[]): (fn: AnyFunc) => any;
    (args: any[], fn: AnyFunc): any;
};
export type T_range = {
    (from: number): (to: number) => number[];
    (from: number, to: number): number[];
};
export type T_uniqWith = {
    <T>(cond: (x: T, y: T) => boolean): (xs: T[]) => T[];
    <T>(cond: (x: T, y: T) => boolean, xs: T[]): T[];
};
export type T_intersection = {
    (xs1: any[]): (xs2: any[]) => any[];
    (xs1: any[], xs2: any[]): any[];
};
export type T_diff = {
    (xs1: any[]): (xs2: any[]) => any[];
    (xs1: any[], xs2: any[]): any[];
};
export type T_genBy = {
    (generator: (i: number) => any): (length: number) => any[];
    (generator: (i: number) => any, length: number): any[];
};
export type T_assoc = {
    (prop: string): {
        (v: any, obj: AnyObject): AnyObject;
        (v: any): (obj: AnyObject) => AnyObject;
    };
    (prop: string, v: any): (obj: AnyObject) => AnyObject;
    (prop: string, v: any, obj: AnyObject): AnyObject;
};
export type T_assocPath = {
    (_path: string[]): {
        (v: any, o: AnyObject): AnyObject;
        (v: any): (o: AnyObject) => AnyObject;
    };
    (_path: string[], v: any): (o: AnyObject) => AnyObject;
    (_path: string[], v: any, o: AnyObject): AnyObject;
};
export type T_all = {
    (pred: Cond): (xs: any[]) => boolean;
    (pred: Cond, xs: any[]): boolean;
};
export type T_any = {
    (pred: Cond): (xs: any[]) => boolean;
    (pred: Cond, xs: any[]): boolean;
};
export type T_allPass = {
    (preds: Cond[]): (x: any) => boolean;
    (preds: Cond[], x: any): boolean;
};
export type T_anyPass = {
    (preds: Cond[]): (x: any) => boolean;
    (preds: Cond[], x: any): boolean;
};
export type T_prop = {
    <K extends string>(key: K): <O extends AnyObject>(o: O) => O[K];
    <O extends AnyObject, K extends keyof O>(key: K, o: O): O[K];
};
export type T_propEq = {
    (key: string): {
        (value: any, o: AnyObject): boolean;
        (value: any): (o: AnyObject) => boolean;
    };
    (key: string, value: any): (o: AnyObject) => boolean;
    (key: string, value: any, o: AnyObject): boolean;
};
export type T_propsEq = {
    (key: string): {
        (o1: AnyObject, o2: AnyObject): boolean;
        (o1: AnyObject): (o2: AnyObject) => boolean;
    };
    (key: string, o1: AnyObject): (o2: AnyObject) => boolean;
    (key: string, o1: AnyObject, o2: AnyObject): boolean;
};
export type T_pathOr = {
    (_default: any): {
        (_path: (string | number)[]): (o: AnyObject) => any;
        (_path: (string | number)[], o: AnyObject): any;
    };
    (_default: any, _path: (string | number)[]): (o: AnyObject) => any;
    (_default: any, _path: (string | number)[], o: AnyObject): any;
};
export type T_pathEq = {
    (_path: string[]): {
        (value: any, o: AnyObject): boolean;
        (value: any): (o: AnyObject) => boolean;
    };
    (_path: string[], value: any): (o: AnyObject) => boolean;
    (_path: string[], value: any, o: AnyObject): boolean;
};
export type T_pathsEq = {
    (_path: string[]): {
        (o1: AnyObject, o2: AnyObject): boolean;
        (o1: AnyObject): (o2: AnyObject) => boolean;
    };
    (_path: string[], o1: AnyObject): (o2: AnyObject) => boolean;
    (_path: string[], o1: AnyObject, o2: AnyObject): boolean;
};
export type T_pick = {
    (props: (string | number)[]): (o: AnyObject) => AnyObject;
    (props: (string | number)[], o: AnyObject): AnyObject;
};
export type T_pickBy = {
    (cond: Cond): (o: AnyObject) => AnyObject;
    (cond: Cond, o: AnyObject): AnyObject;
};
export type T_omit = {
    <const K extends string>(props: readonly K[]): <O extends AnyObject>(o: O) => Omit<O, K>;
    <const K extends string, O extends AnyObject>(props: readonly K[], o: O): Omit<O, K>;
};
export type T_concat = {
    (a: any): (b: string | any[]) => string | any[];
    (a: any, b: string | any[]): string | any[];
};
export type T_mapObj = {
    (pipe: (s: any, i?: string, list?: AnyObject) => any): (o: AnyObject) => AnyObject;
    (pipe: (s: any, i?: string, list?: AnyObject) => any, o: AnyObject): AnyObject;
};
export type T_reduce = {
    <T>(reducer: Reducer<T>): {
        (accum: T, arr: any[]): T;
        (accum: T): (arr: any[]) => T;
    };
    <T>(reducer: Reducer<T>, accum: T): (arr: any[]) => T;
    <T>(reducer: Reducer<T>, accum: T, arr: any[]): T;
};
export type T_replace = {
    (a: string | RegExp): {
        (b: string | ((substring: string, ...ps: any[]) => string), where: string): string;
        (b: string | ((substring: string, ...ps: any[]) => string)): (where: string) => string;
    };
    (a: string | RegExp, b: string | ((substring: string, ...ps: any[]) => string)): (where: string) => string;
    (a: string | RegExp, b: string | ((substring: string, ...ps: any[]) => string), where: string): string;
};
export type T_mergeShallow = {
    (o1: AnyObject): (o2: AnyObject) => AnyObject;
    (o1: AnyObject, o2: AnyObject): AnyObject;
};
export type T_mergeDeep = {
    (a: AnyObject): (b: AnyObject) => AnyObject;
    (a: AnyObject, b: AnyObject): AnyObject;
};
export type T_mergeDeepX = {
    (a: AnyObject): (b: AnyObject) => AnyObject;
    (a: AnyObject, b: AnyObject): AnyObject;
};
export type T_mergeDeepAdd = {
    (a: AnyObject): (b: AnyObject) => AnyObject;
    (a: AnyObject, b: AnyObject): AnyObject;
};
export type T_overProp = {
    (prop: string): {
        (pipe: AnyFunc, data: any): any;
        (pipe: AnyFunc): (data: any) => any;
    };
    (prop: string, pipe: AnyFunc): (data: any) => any;
    (prop: string, pipe: AnyFunc, data: any): any;
};
export type T_mapKeys = {
    (keyMap: ((v: any, k: string, o: AnyObject) => string) | {
        [oldKey: string]: string | AnyFunc;
    }): (o: AnyObject) => AnyObject;
    (keyMap: ((v: any, k: string, o: AnyObject) => string) | {
        [oldKey: string]: string | AnyFunc;
    }, o: AnyObject): AnyObject;
};
export type T_zip = {
    <T1>(a: T1[]): <T2>(b: T2[]) => [T1, T2][];
    <T1, T2>(a: T1[], b: T2[]): [T1, T2][];
};
export type T_zipObj = {
    <T1>(a: T1[]): <T2>(b: T2[]) => {
        [k: string]: T2;
    };
    <T1 extends string | number, T2>(a: T1[], b: T2[]): {
        [k: string]: T2;
    };
};
export type T_zipWith = {
    <T1>(pipe: (a: T1, b: any) => any): {
        <T2, T3>(a: T1[], b: T2[]): T3[];
        <T2>(a: T1[], b: T2[]): any[];
    };
    <T1, T2>(pipe: (a: T1, b: T2) => any): <T3>(a: T1[], b: T2[]) => T3[];
    <T1, T2, T3>(pipe: (a: T1, b: T2) => T3, a: T1[], b: T2[]): T3[];
};
export type T_test = {
    (re: RegExp): (s: string) => boolean;
    (re: RegExp, s: string): boolean;
};
