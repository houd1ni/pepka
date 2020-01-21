export const undef = undefined;
export const nul = null;
export const to = (s) => typeof s;
export const isNull = (s) => s === nul;
export const isUndef = (s) => s === undef;
export const isNum = (s) => to(s) == 'number';
export const isArray = (s) => Array.isArray(s);
export const isRegExp = (s) => s instanceof RegExp;