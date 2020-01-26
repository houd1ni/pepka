import { to, isNull } from "./utils";
export const toLower = (s) => s.toLowerCase();
export const toUpper = (s) => s.toUpperCase();
export const type = (s) => {
    const t = to(s);
    switch (true) {
        case t !== 'object': return toUpper(t[0]) + t.slice(1);
        case isNull(s): return 'Null';
        default: return s.constructor.name;
    }
};
