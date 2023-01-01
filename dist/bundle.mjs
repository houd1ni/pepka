const e=Symbol("Placeholder"),r=r=>{let t=0;for(const n of r)n!==e&&t++;return t},t=(r,t)=>{const n=r.length,s=r.slice(),c=t.length;let o=c,u=0;for(;o&&u<n;u++)s[u]===e&&(s[u]=t[c-o],o--);for(u=n;o;u++,o--)s[u]=t[c-o];return s},n=(e,s,c)=>{const o=e.length-s.length-r(c);if(o<1)return e(...t(s,c));{const r=(...r)=>n(e,t(s,c),r);return r.$args_left=o,r}},s=e=>(...t)=>e.length>r(t)?n(e,[],t):e(...t),c=r=>function(t){return t===e?r:r(t)};function o(r){return function(t,n){const s=t===e,o=arguments.length;if(1===o&&s)throw new Error("Senseless placeholder usage.");return arguments.length>1?s?c((e=>r(e,n))):r(t,n):e=>r(t,e)}}function u(e){return s(e)}const a=void 0,i=1/0,l=e=>typeof e,f=e=>null===e,h=e=>"number"==l(e),b=e=>Array.isArray(e),g=e=>"function"===l(e),p={u:"U",b:"B",n:"N",s:"S",f:"F"},y=e=>e.toLowerCase(),d=e=>e.toUpperCase(),j=e=>{const r=l(e);return"object"===r?f(e)?"Null":e.constructor.name:p[r[0]]+r.slice(1)},m=o(((e,r)=>j(r)===e)),w=o(((e,r)=>(r.push(e),r))),O=u(((e,r,t)=>(t[e]=r,t))),A=u(((e,r,t)=>t.reduce(e,r))),S=u(((e,r,t)=>{for(let n in t)switch(j(t[n])){case"Array":if(e>1&&"Array"===j(r[n]))switch(e){case 2:const s=r[n],c=t[n];for(const r in c)s[r]?S(e,s[r],c[r]):s[r]=c[r];break;case 3:r[n].push(...t[n])}else r[n]=t[n];break;case"Object":if("Object"===j(r[n])){S(e,r[n],t[n]);break}default:r[n]=t[n]}return r})),k=S(1),v=S(2),N=S(3),x=o(((e,r)=>{let t,n,s,c;for(t in e)n=e[t],[s,c]=g(n)?n(r):[n,r[t]],r[s]=c,t!==s&&delete r[t];return r})),C=o(((e,r)=>{const t=b(r);for(let n in r)e(r[n],n)||(t?r.splice(n,1):delete r[n]);return r})),P=o(((e,r)=>r.indexOf(e))),$=e=>(...r)=>A(((e,r)=>e?e(r):e),e,r),B=e=>(...r)=>r[e],E=o(((e,r)=>{const t=j(e);if(t===j(r)&&("Object"===t||"Array"==t)){if(f(e)||f(r))return e===r;if(e===r)return!0;for(const t of[e,r])for(const n in t)if(!(t===r&&n in e||t===e&&n in r&&E(e[n],r[n])))return!1;return!0}return e===r})),U=s(((e,r,t,n)=>e(n)?r(n):t(n))),_=u(((e,r,t)=>U(e,r,W,t))),F=(...r)=>(...t)=>{let n,s=!0;for(let c=T(r)-1;c>-1;c--)s?(s=!1,n=r[c](...t)):n=n===e?r[c]():r[c](n);return n},I=o(((e,r)=>e.bind(r))),L=o(((e,r)=>r[e])),q=o(((e,r)=>{if((e=>"string"===l(e))(r))return r.includes(e);for(const t of r)if(E(t,e))return!0;return!1})),z=u(((e,r,t)=>t.slice(e,h(r)?r:i))),D=e=>o(((r,t)=>e(t,r))),G=L(0),H=z(1,i),J=o(((e,r)=>e+r)),K=o(((e,r)=>r-e)),M=o(((e,r)=>e*r)),Q=o(((e,r)=>e/r)),R=e=>f(e)||(e=>e===a)(e),T=e=>e.length,V=e=>()=>e,W=e=>e,X=e=>e.trim(),Y=e=>e[T(e)-1],Z=e=>!e,ee=e=>(...r)=>{const t=e(...r);return g(t)&&t.$args_left?ee(t):Z(t)},re=e=>Object.keys(e),te=e=>Object.values(e),ne=e=>Object.entries(e),se=o(((e,r)=>e.test(r))),ce=o(((e,r)=>(e(r),r))),oe=o(((e,r)=>[...r,e])),ue=o(((e,r)=>r.split(e))),ae=V(!0),ie=V(!1),le=e=>{if("Object"===j(e)){let r=0;for(let t in e)r++;return r}return T(e)},fe=o(((e,r)=>ge(J(e),r-e))),he=e=>A(((e,r)=>q(r,e)?e:w(r,e)),[],e),be=o(((e,r)=>e.filter(D(q)(r)))),ge=o(((e,r)=>[...Array(r)].map(((r,t)=>e(t))))),pe=e=>{let r,t=!1;return(...n)=>t?r:(t=!0,r=e(...n))},ye=e=>F((r=>Je(((t,n,s)=>w(e[r-s],t)),[],e)),J(-1),T)(e),de=o(((e,r)=>e>r)),je=o(((e,r)=>e<r)),me=o(((e,r)=>r>=e)),we=o(((e,r)=>r<=e)),Oe=o(((e,r)=>r.sort(e))),Ae=o(((e,r)=>r.find(e))),Se=o(((e,r)=>r.findIndex(e))),ke=o(((e,r)=>Se(E(e),r))),ve=(e,r="log")=>ce((t=>console[r](e,t))),Ne=o(((e,r)=>{for(const[t,n]of e)if(t(r))return n(r)})),xe=u(((e,r,t)=>({...t,[e]:r}))),Ce=u(((e,r,t)=>F((n=>{return xe(n,T(e)<2?r:Ce(z(1,i,e),r,(s=t[n],f(s)||"object"!==l(s)?{}:t[n])),t);var s}),G)(e))),Pe=o(((e,r)=>r.every(e))),$e=o(((e,r)=>r.some(e))),Be=o(((e,r)=>e.every((e=>e(r))))),Ee=o(((e,r)=>e.some((e=>e(r))))),Ue=o(((e,r)=>r[e])),_e=u(((e,r,t)=>E(t[e],r))),Fe=u(((e,r,t)=>E(r[e],t[e]))),Ie=u(((e,r,t)=>U(T,(()=>R(t)?e:F(U(R,V(e),(t=>Ie(e,z(1,i,r),t))),D(Ue)(t),G)(r)),V(t),r))),Le=Ie(a),qe=u(((e,r,t)=>E(Le(e,t),r))),ze=u(((e,r,t)=>E(Le(e,r),Le(e,t)))),De=/^(.*?)(8|16|32|64)(Clamped)?Array$/,Ge=(e,r=!1)=>{const t=j(e);switch(t){case"Null":case"String":case"Number":case"Boolean":case"Symbol":return e;case"Array":return r?[...e]:We(F(Ge,B(0)),e);case"Object":if(r)return{...e};const n={};for(let r in e)n[r]=Ge(e[r]);return n;default:return De.test(t)?e.constructor.from(e):e}},He=e=>Ge(e,!0),Je=u(((e,r,t)=>A(e,Ge(r),t))),Ke=o(((e,r)=>tr(e,r))),Me=o(((e,r)=>{const t={};for(const n of e)n in r&&(t[n]=r[n]);return t})),Qe=o(((e,r)=>tr(((r,t)=>!q(t,e)),r))),Re=e=>Je(((e,r)=>xe(...r,e)),{},e),Te=o(((e,r)=>e.concat(r))),Ve=o(((e,r)=>r.join(e))),We=o(((e,r)=>r.map(e))),Xe=o(((e,r)=>r.forEach(e))),Ye=u(((e,r,t)=>r(t)&&e(t))),Ze=e=>{switch(j(e)){case"String":case"Array":return 0==T(e);case"Object":for(const r in e)return!1;return!0;default:return null}},er=e=>{switch(j(e)){case"String":return"";case"Object":return{};case"Array":return[];default:return a}},rr=u(((e,r,t)=>t.replace(e,r))),tr=o(((e,r)=>b(r)?r.filter(e):F(Re,tr((([r,t])=>e(t,r))),ne)(r))),nr=e=>{let r,t=!1;return()=>t?r:(t=!0,r=e())},sr=o(((e,r)=>Object.assign({},e,r))),cr=o(((e,r)=>k(Ge(e),Ge(r)))),or=o(((e,r)=>v(Ge(e),Ge(r)))),ur=o(((e,r)=>N(Ge(e),Ge(r)))),ar=u(((e,r,t)=>xe(e,r(t[e]),t))),ir=o(((e,r)=>x(e,Object.assign({},r)))),lr=(()=>{const e=async(r,t,n)=>{n<t.length&&(await r(t[n]),await e(r,t,++n))};return o(((r,t)=>e(r,t,0)))})(),fr=e=>Promise.all(e),hr=o((async(e,r)=>(await e(r),r))),br=o(((e,r)=>Promise.all(r.map(e)))),gr=(()=>{const e=async(r,t,n)=>~n?await e(r,await r[n](t),--n):t;return(...r)=>t=>e(r,t,r.length-1)})(),pr=W,yr=W,dr=W,jr=e=>{const r=[],t=[],n=e.length;let s,c,o,u=0,a=0,i=!1,l=G(e),f=!1;for(u=0;u<n;u++)switch(s=e[u],s){case"{":if(!l){i=!0,a=u;break}case"}":if(!l){i=!1,r.push(""),t.push(e.slice(a+1,u));break}default:o=e[u+1],f="\\"===s,i||f&&("{"===o||"}"===o)||(c=r.length-1,c<0&&(r.push(""),c++),r[c]+=s),l=f}return e=>{const n=[],s=r.length-1;for(const c in r)u=+c,n.push(r[u]),u!==s&&n.push(Le(t[u].split("."),e));return n.join("")}};export{ie as F,ae as T,e as __,J as add,Pe as all,Be as allPass,V as always,$e as any,Ee as anyPass,oe as append,xe as assoc,Ce as assocPath,I as bind,Ye as both,Ge as clone,He as cloneShallow,ee as complement,F as compose,gr as composeAsync,Te as concat,Ne as cond,s as curry,o as curry2,u as curry3,Q as divide,dr as echo,er as empty,E as equals,ve as explore,tr as filter,Ae as find,Se as findIndex,D as flip,Xe as forEach,br as forEachAsync,lr as forEachSerial,Re as fromPairs,ge as genBy,jr as getTmpl,de as gt,me as gte,G as head,W as identity,U as ifElse,q as includes,ke as indexOf,be as intersection,Ze as isEmpty,R as isNil,Ve as join,re as keys,Y as last,T as length,je as lt,we as lte,We as map,ir as mapKeys,nr as memoize,cr as mergeDeep,ur as mergeDeepAdd,or as mergeDeepX,sr as mergeShallow,pr as mirror,M as multiply,Z as not,L as nth,Qe as omit,pe as once,ar as overProp,Le as path,qe as pathEq,Ie as pathOr,ze as pathsEq,Me as pick,Ke as pickBy,Ue as prop,_e as propEq,Fe as propsEq,w as qappend,O as qassoc,C as qfilter,P as qindexOf,x as qmapKeys,k as qmergeDeep,N as qmergeDeepAdd,v as qmergeDeepX,A as qreduce,fe as range,Je as reduce,yr as reflect,rr as replace,ye as reverse,le as sizeof,z as slice,Oe as sort,ue as split,K as subtract,H as tail,B as take,ce as tap,se as test,y as toLower,ne as toPairs,d as toUpper,X as trim,j as type,m as typeIs,$ as uncurry,he as uniq,te as values,fr as waitAll,hr as waitTap,_ as when};