import { curry } from "./curry";
import { type } from "./common";
export const qappend = curry((s, xs) => { xs.push(s); return xs; });
export const qassoc = curry((prop, v, obj) => {
    obj[prop] = v;
    return obj;
});
export const qreduce = curry((fn, accum, arr) => arr.reduce(fn, accum));
export const qmergeDeep = curry((o1, o2) => {
    for (let k in o2) {
        switch (type(o2[k])) {
            case 'Array':
            case 'Object':
                if (type(o1[k]) === 'Object') {
                    qmergeDeep(o1[k], o2[k]);
                    break;
                }
            default:
                o1[k] = o2[k];
                break;
        }
    }
    return o1;
});
/** qmapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export const qmapKeys = curry((keyMap, o) => {
    for (let k in keyMap) {
        if (k !== keyMap[k]) {
            o[keyMap[k]] = o[k];
            delete o[k];
        }
    }
    return o;
});
