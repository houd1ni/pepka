const e=e=>typeof e,r=e=>null===e,t=(e,r,c)=>r.length+c.length<e.length?(...c)=>t(e,[...r,...c],c):e(...r,...c),c=e=>(...r)=>t(e,r,[]),n=c((t,c)=>{if("object"==e(t)&&"object"==e(c)){if(r(t)||r(c))return t===c;for(let e of[t,c])for(let r in e)if(!n(t[r],c[r]))return!1}return t===c}),l=c((e,r,t,c)=>e(c)?r(c):t(c)),u=c((e,r,t)=>l(e,r,j,t)),a=(...e)=>r=>{for(let t=i(e)-1;t>-1;t--)r=e[t](r);return r},s=e=>Array.isArray(e),o=e=>r(e)||(e=>void 0===e)(e),i=e=>e.length,f=e=>()=>e,j=e=>e,b=e=>e.trim(),h=e=>e[e.length-1],y=e=>r=>!e(r),O=e=>Object.keys(e),g=e=>Object.values(e),p=e=>Object.entries(e),A=c((e,r,t)=>({...t,[e]:r})),d=r=>{switch(e(r)){case"object":switch(C(r)){case"Null":return r;case"Array":return m(d,r);case"Object":const e={};for(let t in r)e[t]=d(r[t]);return e}default:return r}},w=c((e,r,t)=>t.reduce(e,d(r))),N=e=>w((e,r)=>A(...r,e),{},e),k=c((e,r)=>r.join(e)),m=c((e,r)=>r.map(e)),v=c((e,r)=>r.forEach(e)),x=c((e,r,t)=>r(t)&&e(t)),C=t=>{const c=e(t);return"object"==c?s(t)?"Array":r(t)?"Null":"Object":c[0].toUpperCase()+c.slice(1)},E=e=>{switch(C(e)){case"String":return""==e;case"Array":return 0==i(e);case"Null":return!1;case"Object":return 0==i(Object.keys(e));default:return!1}},S=c((e,r,t)=>t.replace(e,r)),U=c((e,r)=>l(a(n("Array"),C),r=>r.filter(e),a(N,U(([r,t])=>e(t,r)),p))(r));export{f as always,A as assoc,x as both,d as clone,y as complement,a as compose,c as curry,n as equals,U as filter,v as forEach,N as fromPairs,j as identity,l as ifElse,s as isArray,E as isEmpty,o as isNil,k as join,O as keys,h as last,i as length,m as map,w as reduce,S as replace,p as toPairs,b as trim,C as type,g as values,u as when};
