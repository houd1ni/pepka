export type Split<S extends string> = S extends `${infer U}${infer V}` ? [U, ...Split<V>] : [];
export type StrLen<S extends string, Acc extends 0[] = []> = S extends `${string}${infer Rest}` ? StrLen<Rest, [...Acc, 0]> : Acc['length'];
export type FirstChar<T extends string> = T extends `${infer First}${string}` ? Split<T>['length'] extends 1 ? T : FirstChar<First> : T;
export type Tail<T extends string> = T extends `${string}${infer Tail}` ? Tail : T extends '' ? '' : string;
export type LastChar<T extends string> = T extends `${string}${infer Rest}` ? (Split<T>['length'] extends 1 ? T : LastChar<Rest>) : T;
export type StrTmpl = ((data: Record<string, any>) => string);
