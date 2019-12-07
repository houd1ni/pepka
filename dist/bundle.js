"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const to=r=>typeof r,isNull=r=>null===r,isUndef=r=>void 0===r,_equals=(r,e)=>{if("object"===to(r)&&"object"===to(e)){if(isNull(r)||isNull(e))return r===e;for(let t of[r,e])for(let s in t)if(!_equals(r[s],e[s]))return!1}},_curry=(r,e,t)=>(e.push(...t),e.length<r.length?(...t)=>_curry(r,e,t):r(...e,...t)),curry=r=>(...e)=>_curry(r,[],e),when=curry((r,e,t)=>r(t)?e(t):t),compose=(...r)=>e=>{for(let t=length(r)-1;t>-1;t--)e=r[t](e);return e},equals=curry(_equals),isArray=r=>Array.isArray(r),isNil=r=>isNull(r)||isUndef(r),length=r=>r.length,always=r=>()=>r,identity=()=>r=>r,trim=r=>r.trim(),join=curry((r,e)=>e.join(r)),complement=r=>e=>!r(e),map=curry((r,e)=>e.map(r)),filter=curry((r,e)=>e.filter(r)),forEach=curry((r,e)=>e.forEach(r)),both=curry((r,e,t)=>e(t)&&r(t)),type=r=>{const e=to(r);return"object"==e?isArray(r)?"Array":isNull(r)?"Null":"Object":e[0].toUpperCase()+e.slice(1)},isEmpty=r=>{switch(type(r)){case"String":return""==r;case"Array":return 0==length(r);case"Null":return!1;case"Object":return 0==length(Object.keys(r));default:return!1}},replace=curry((r,e,t)=>t.replace(r,e));exports.always=always,exports.both=both,exports.complement=complement,exports.compose=compose,exports.curry=curry,exports.equals=equals,exports.filter=filter,exports.forEach=forEach,exports.identity=identity,exports.isArray=isArray,exports.isEmpty=isEmpty,exports.isNil=isNil,exports.join=join,exports.length=length,exports.map=map,exports.replace=replace,exports.trim=trim,exports.type=type,exports.when=when;
