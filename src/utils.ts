

export const undef = undefined
export const nul = null
export const to = (s: any) => typeof s
export const isNull = (s: any) => s===nul
export const isUndef = (s: any) => s===undef
export const isNum = (s: any) => to(s)=='number'
export const isArray = (s: any) => Array.isArray(s)
export const isFunc = (s: any) => to(s)==='function'
export const isStr = (s: any) => to(s)==='string'