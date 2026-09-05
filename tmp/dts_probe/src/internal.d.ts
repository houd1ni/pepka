import { AnyArray } from '../types/base';
import { StrLen } from '../types/string';
export declare const length: <T extends AnyArray | string>(s: T) => T extends string ? StrLen<T> : T['length'];
export declare const is_typed_arr: (x: any) => x is ArrayBufferView<ArrayBufferLike>;
/** @param start string | any[] @param s string | any[] */
export declare const startsWithWith: (comparator: (x: any, y: any) => boolean) => {
    (a: import("./curry").Placeholder, b: string | any[]): (a: string | any[]) => boolean;
    (a: string | any[], b: import("./curry").Placeholder): (b: string | any[]) => boolean;
    (a: string | any[]): (b: string | any[]) => boolean;
    (a: string | any[], b: string | any[]): boolean;
};
