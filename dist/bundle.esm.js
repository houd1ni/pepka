const e=e=>typeof e,r=e=>null===e,t=(c,n)=>{if("object"===e(c)&&"object"===e(n)){if(r(c)||r(n))return c===n;for(let e of[c,n])for(let r in e)if(!t(c[r],n[r]))return!1}return!0},c=(e,r,t)=>r.length+t.length<e.length?(...t)=>c(e,[...r,...t],t):e(...r,...t),n=e=>(...r)=>c(e,r,[]),l=n((e,r,t)=>e(t)?r(t):t),u=(...e)=>r=>{for(let t=i(e)-1;t>-1;t--)r=e[t](r);return r},a=n(t),s=e=>Array.isArray(e),o=e=>r(e)||(e=>void 0===e)(e),i=e=>e.length,f=e=>()=>e,j=e=>e,b=e=>e.trim(),h=e=>e[e.length-1],y=e=>r=>!e(r),p=e=>Object.keys(e),O=e=>Object.values(e),g=e=>Object.entries(e),A=n((e,r,t)=>({...t,[e]:r})),d=r=>{switch(e(r)){case"object":switch(E(r)){case"Null":return r;case"Array":return r.map(d);case"Object":const e={};for(let t in r)e[t]=d(r[t]);return e}default:return r}},m=n((e,r,t)=>t.reduce(e,d(r))),w=e=>m((e,r)=>A(...r,e),{},e),N=n((e,r)=>r.join(e)),k=n((e,r)=>r.map(e)),v=n((e,r)=>r.filter(e)),x=n((e,r)=>r.forEach(e)),C=n((e,r,t)=>r(t)&&e(t)),E=t=>{const c=e(t);return"object"==c?s(t)?"Array":r(t)?"Null":"Object":c[0].toUpperCase()+c.slice(1)},S=e=>{switch(E(e)){case"String":return""==e;case"Array":return 0==i(e);case"Null":return!1;case"Object":return 0==i(Object.keys(e));default:return!1}},U=n((e,r,t)=>t.replace(e,r)),q=n((e,r)=>u(w,v(([r,t])=>e(t,r)),g)(r));export{f as always,A as assoc,C as both,d as clone,y as complement,u as compose,n as curry,a as equals,v as filter,q as filterObj,x as forEach,w as fromPairs,j as identity,s as isArray,S as isEmpty,o as isNil,N as join,p as keys,h as last,i as length,k as map,m as reduce,U as replace,g as toPairs,b as trim,E as type,O as values,l as when};
