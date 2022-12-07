import { to, isNull } from "./utils";
// It's faster that toUpperCase() !
const caseMap = {
    u: 'U', b: 'B', n: 'N', s: 'S', f: 'F'
};
export const toLower = (s) => s.toLowerCase();
export const toUpper = (s) => s.toUpperCase();
export const type = (s) => {
    const t = to(s);
    return t === 'object'
        ? isNull(s) ? 'Null' : s.constructor.name
        : caseMap[t[0]] + t.slice(1);
};
