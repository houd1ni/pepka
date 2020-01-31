import { curry } from "./curry";
import { type } from "./common";
import { isFunc, isArray } from "./utils";
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
    let k, mapped, newKey, newValue;
    for (k in keyMap) {
        mapped = keyMap[k];
        [newKey, newValue] = isFunc(mapped)
            ? mapped(o)
            : [mapped, o[k]];
        if (k !== newKey) {
            o[newKey] = newValue;
            delete o[k];
        }
    }
    return o;
});
export const qfilter = curry((cond, data) => {
    const isArr = isArray(data);
    for (let k in data) {
        if (!cond(data[k], k)) {
            if (isArr) {
                data.splice(k, 1);
            }
            else {
                // TODO: handle Maps and Sets ?
                delete data[k];
            }
        }
    }
    return data;
});
