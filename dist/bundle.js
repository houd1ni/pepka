"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const to=e=>typeof e,isNull=e=>null===e,isUndef=e=>void 0===e,_curry=(e,r,t)=>r.length+t.length<e.length?(...t)=>_curry(e,[...r,...t],t):e(...r,...t),curry=e=>(...r)=>_curry(e,r,[]),equals=curry((e,r)=>{if("object"==to(e)&&"object"==to(r)){if(isNull(e)||isNull(r))return e===r;for(let t of[e,r])for(let s in t)if(!equals(e[s],r[s]))return!1}return e===r}),ifElse=curry((e,r,t,s)=>e(s)?r(s):t(s)),when=curry((e,r,t)=>ifElse(e,r,identity,t)),compose=(...e)=>r=>{for(let t=length(e)-1;t>-1;t--)r=e[t](r);return r},isArray=e=>Array.isArray(e),isNil=e=>isNull(e)||isUndef(e),length=e=>e.length,always=e=>()=>e,identity=e=>e,trim=e=>e.trim(),last=e=>e[e.length-1],complement=e=>r=>!e(r),keys=e=>Object.keys(e),values=e=>Object.values(e),toPairs=e=>Object.entries(e),assoc=curry((e,r,t)=>({...t,[e]:r})),clone=e=>{switch(to(e)){case"object":switch(type(e)){case"Null":return e;case"Array":return map(clone,e);case"Object":const r={};for(let t in e)r[t]=clone(e[t]);return r}default:return e}},reduce=curry((e,r,t)=>t.reduce(e,clone(r))),fromPairs=e=>reduce((e,r)=>assoc(...r,e),{},e),join=curry((e,r)=>r.join(e)),map=curry((e,r)=>r.map(e)),forEach=curry((e,r)=>r.forEach(e)),both=curry((e,r,t)=>r(t)&&e(t)),type=e=>{const r=to(e);return"object"==r?isArray(e)?"Array":isNull(e)?"Null":"Object":r[0].toUpperCase()+r.slice(1)},isEmpty=e=>{switch(type(e)){case"String":return""==e;case"Array":return 0==length(e);case"Null":return!1;case"Object":return 0==length(Object.keys(e));default:return!1}},replace=curry((e,r,t)=>t.replace(e,r)),filter=curry((e,r)=>ifElse(compose(equals("Array"),type),r=>r.filter(e),compose(fromPairs,filter(([r,t])=>e(t,r)),toPairs))(r));exports.always=always,exports.assoc=assoc,exports.both=both,exports.clone=clone,exports.complement=complement,exports.compose=compose,exports.curry=curry,exports.equals=equals,exports.filter=filter,exports.forEach=forEach,exports.fromPairs=fromPairs,exports.identity=identity,exports.ifElse=ifElse,exports.isArray=isArray,exports.isEmpty=isEmpty,exports.isNil=isNil,exports.join=join,exports.keys=keys,exports.last=last,exports.length=length,exports.map=map,exports.reduce=reduce,exports.replace=replace,exports.toPairs=toPairs,exports.trim=trim,exports.type=type,exports.values=values,exports.when=when;
