export type T_includes = {
    (s: string): (ss: string) => boolean;
    <T>(s: T): (ss: readonly T[]) => boolean;
    (s: string, ss: string): boolean;
    <T>(s: T, ss: readonly T[]): boolean;
};
export type T_typeIs = {
    (t: string): (s: any) => boolean;
    (t: string, s: any): boolean;
};
export type T_eq = {
    (a: any): (b: any) => boolean;
    (a: any, b: any): boolean;
};
export type T_equals = {
    (a: any): (b: any) => boolean;
    (a: any, b: any): boolean;
};
