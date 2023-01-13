const e=Symbol("Placeholder"),r=r=>{let t=0;for(const n of r)n!==e&&t++;return t},t=(r,t)=>{const n=r.length,s=r.slice(),c=t.length;let o=c,u=0;for(;o&&u<n;u++)s[u]===e&&(s[u]=t[c-o],o--);for(u=n;o;u++,o--)s[u]=t[c-o];return s},n=(e,s,c)=>{const o=e.length-s.length-r(c);if(o<1)return e(...t(s,c));{const r=(...r)=>n(e,t(s,c),r);return r.$args_left=o,r}},s=e=>(...t)=>e.length>r(t)?n(e,[],t):e(...t),c=r=>function(t){return t===e?r:r(t)};function o(r){return function(t,n){const s=t===e,o=arguments.length;if(1===o&&s)throw new Error("Senseless placeholder usage.");return arguments.length>1?s?c((e=>r(e,n))):r(t,n):e=>r(t,e)}}function u(e){return s(e)}const a=void 0,i=1/0,l=e=>typeof e,f=e=>null===e,h=e=>"number"==l(e),b=e=>Array.isArray(e),g=e=>"function"===l(e),p={u:"U",b:"B",n:"N",s:"S",f:"F"},y=e=>e.toLowerCase(),d=e=>e.toUpperCase(),j=e=>{const r=l(e);return"object"===r?f(e)?"Null":e.constructor.name:p[r[0]]+r.slice(1)},m=o(((e,r)=>j(r)===e)),w=o(((e,r)=>(r.push(e),r))),O=u(((e,r,t)=>(t[e]=r,t))),A=u(((e,r,t)=>t.reduce(e,r))),S=u(((e,r,t)=>{for(let n in t)switch(j(t[n])){case"Array":if(e>1&&"Array"===j(r[n]))switch(e){case 2:const s=r[n],c=t[n];for(const r in c)s[r]?S(e,s[r],c[r]):s[r]=c[r];break;case 3:r[n].push(...t[n])}else r[n]=t[n];break;case"Object":if("Object"===j(r[n])){S(e,r[n],t[n]);break}default:r[n]=t[n]}return r})),k=S(1),v=S(2),N=S(3),x=o(((e,r)=>{let t,n,s,c;for(t in e)n=e[t],[s,c]=g(n)?n(r):[n,r[t]],r[s]=c,t!==s&&delete r[t];return r})),C=o(((e,r)=>{for(let t in r)r[t]=e(r[t],+t,r);return r})),P=o(((e,r)=>{const t=b(r);for(let n in r)e(r[n],n)||(t?r.splice(n,1):delete r[n]);return r})),$=o(((e,r)=>r.indexOf(e))),B=e=>(...r)=>A(((e,r)=>e?e(r):e),e,r),E=e=>(...r)=>r[e],U=o(((e,r)=>{const t=j(e);if(t===j(r)&&("Object"===t||"Array"==t)){if(f(e)||f(r))return e===r;if(e===r)return!0;for(const t of[e,r])for(const n in t)if(!(t===r&&n in e||t===e&&n in r&&U(e[n],r[n])))return!1;return!0}return e===r})),_=s(((e,r,t,n)=>e(n)?r(n):t(n))),F=u(((e,r,t)=>_(e,r,X,t))),I=(...r)=>(...t)=>{let n,s=!0;for(let c=V(r)-1;c>-1;c--)s?(s=!1,n=r[c](...t)):n=n===e?r[c]():r[c](n);return n},L=o(((e,r)=>e.bind(r))),q=o(((e,r)=>r[e])),z=o(((e,r)=>{if((e=>"string"===l(e))(r))return r.includes(e);for(const t of r)if(U(t,e))return!0;return!1})),D=u(((e,r,t)=>t.slice(e,h(r)?r:i))),G=e=>o(((r,t)=>e(t,r))),H=q(0),J=D(1,i),K=o(((e,r)=>e+r)),M=o(((e,r)=>r-e)),Q=o(((e,r)=>e*r)),R=o(((e,r)=>e/r)),T=e=>f(e)||(e=>e===a)(e),V=e=>e.length,W=e=>()=>e,X=e=>e,Y=e=>e.trim(),Z=e=>e[V(e)-1],ee=e=>!e,re=e=>(...r)=>{const t=e(...r),n=g(t);return!n||n&&t.$args_left<=0?ee(t):re(t)},te=e=>Object.keys(e),ne=e=>Object.values(e),se=e=>Object.entries(e),ce=o(((e,r)=>e.test(r))),oe=o(((e,r)=>(e(r),r))),ue=o(((e,r)=>[...r,e])),ae=o(((e,r)=>r.split(e))),ie=W(!0),le=W(!1),fe=o(((e,r)=>r(...e))),he=(...e)=>{},be=e=>{if("Object"===j(e)){let r=0;for(let t in e)r++;return r}return V(e)},ge=o(((e,r)=>de(K(e),r-e))),pe=e=>A(((e,r)=>z(r,e)?e:w(r,e)),[],e),ye=o(((e,r)=>e.filter(G(z)(r)))),de=o(((e,r)=>[...Array(r)].map(((r,t)=>e(t))))),je=e=>{let r,t=!1;return(...n)=>t?r:(t=!0,r=e(...n))},me=e=>I((r=>Qe(((t,n,s)=>w(e[r-s],t)),[],e)),K(-1),V)(e),we=o(((e,r)=>e>r)),Oe=o(((e,r)=>e<r)),Ae=o(((e,r)=>r>=e)),Se=o(((e,r)=>r<=e)),ke=o(((e,r)=>r.sort(e))),ve=o(((e,r)=>r.find(e))),Ne=o(((e,r)=>r.findIndex(e))),xe=o(((e,r)=>Ne(U(e),r))),Ce=(e,r="log")=>oe((t=>console[r](e,t))),Pe=o(((e,r)=>{for(const[t,n]of e)if(t(r))return n(r)})),$e=u(((e,r,t)=>({...t,[e]:r}))),Be=u(((e,r,t)=>I((n=>{return $e(n,V(e)<2?r:Be(D(1,i,e),r,(s=t[n],f(s)||"object"!==l(s)?{}:t[n])),t);var s}),H)(e))),Ee=o(((e,r)=>r.every(e))),Ue=o(((e,r)=>r.some(e))),_e=o(((e,r)=>e.every((e=>e(r))))),Fe=o(((e,r)=>e.some((e=>e(r))))),Ie=o(((e,r)=>r[e])),Le=u(((e,r,t)=>U(t[e],r))),qe=u(((e,r,t)=>U(r[e],t[e]))),ze=u(((e,r,t)=>_(V,(()=>T(t)?e:I(_(T,W(e),(t=>ze(e,D(1,i,r),t))),G(Ie)(t),H)(r)),W(t),r))),De=ze(a),Ge=u(((e,r,t)=>U(De(e,t),r))),He=u(((e,r,t)=>U(De(e,r),De(e,t)))),Je=/^(.*?)(8|16|32|64)(Clamped)?Array$/,Ke=(e,r=!1)=>{const t=j(e);switch(t){case"Null":case"String":case"Number":case"Boolean":case"Symbol":return e;case"Array":return r?[...e]:Ze(I(Ke,E(0)),e);case"Object":if(r)return{...e};const n={};for(let r in e)n[r]=Ke(e[r]);return n;default:return Je.test(t)?e.constructor.from(e):e}},Me=e=>Ke(e,!0),Qe=u(((e,r,t)=>A(e,Ke(r),t))),Re=o(((e,r)=>cr(e,r))),Te=o(((e,r)=>{const t={};for(const n of e)n in r&&(t[n]=r[n]);return t})),Ve=o(((e,r)=>cr(((r,t)=>!z(t,e)),r))),We=e=>Qe(((e,r)=>$e(...r,e)),{},e),Xe=o(((e,r)=>r.concat(e))),Ye=o(((e,r)=>r.join(e))),Ze=o(((e,r)=>r.map(e))),er=o(((e,r)=>r.forEach(e))),rr=u(((e,r,t)=>r(t)&&e(t))),tr=e=>{switch(j(e)){case"String":case"Array":return 0==V(e);case"Object":for(const r in e)return!1;return!0;default:return null}},nr=e=>{switch(j(e)){case"String":return"";case"Object":return{};case"Array":return[];default:return a}},sr=u(((e,r,t)=>t.replace(e,r))),cr=o(((e,r)=>b(r)?r.filter(e):I(We,cr((([r,t])=>e(t,r))),se)(r))),or=e=>{let r,t=!1;return()=>t?r:(t=!0,r=e())},ur=o(((e,r)=>Object.assign({},e,r))),ar=o(((e,r)=>k(Ke(e),Ke(r)))),ir=o(((e,r)=>v(Ke(e),Ke(r)))),lr=o(((e,r)=>N(Ke(e),Ke(r)))),fr=u(((e,r,t)=>$e(e,r(t[e]),t))),hr=o(((e,r)=>x(e,Object.assign({},r)))),br=o(((e,r)=>Ze(((e,t)=>[e,r[t]]),e))),gr=o(((e,r)=>Qe(((e,t,n)=>$e(t,r[n],e)),{},e))),pr=u(((e,r,t)=>Ze(((r,n)=>e(r,t[n])),r))),yr=(()=>{const e=async(r,t,n)=>{n<t.length&&(await r(t[n]),await e(r,t,++n))};return o(((r,t)=>e(r,t,0)))})(),dr=e=>Promise.all(e),jr=o((async(e,r)=>(await e(r),r))),mr=o(((e,r)=>Promise.all(r.map(e)))),wr=(()=>{const e=async(r,t,n)=>~n?await e(r,await r[n](t),--n):t;return(...r)=>t=>e(r,t,r.length-1)})(),Or=X,Ar=X,Sr=X,kr=re,vr=ue,Nr=e=>{const r=[],t=[],n=e.length;let s,c,o,u=0,a=0,i=!1,l=H(e),f=!1;for(u=0;u<n;u++)switch(s=e[u],s){case"{":if(!l){i=!0,a=u;break}case"}":if(!l){i=!1,r.push(""),t.push(e.slice(a+1,u));break}default:o=e[u+1],f="\\"===s,i||f&&("{"===o||"}"===o)||(c=r.length-1,c<0&&(r.push(""),c++),r[c]+=s),l=f}return e=>{const n=[],s=r.length-1;for(const c in r)u=+c,n.push(r[u]),u!==s&&n.push(De(t[u].split("."),e));return n.join("")}};export{le as F,ie as T,e as __,K as add,Ee as all,_e as allPass,W as always,Ue as any,Fe as anyPass,ue as append,$e as assoc,Be as assocPath,L as bind,rr as both,fe as callWith,Ke as clone,Me as cloneShallow,re as complement,I as compose,wr as composeAsync,Xe as concat,Pe as cond,s as curry,o as curry2,u as curry3,R as divide,Sr as echo,nr as empty,U as equals,Ce as explore,cr as filter,ve as find,Ne as findIndex,G as flip,er as forEach,mr as forEachAsync,yr as forEachSerial,We as fromPairs,de as genBy,Nr as getTmpl,we as gt,Ae as gte,H as head,X as identity,_ as ifElse,z as includes,xe as indexOf,ye as intersection,tr as isEmpty,T as isNil,Ye as join,te as keys,Z as last,V as length,Oe as lt,Se as lte,Ze as map,hr as mapKeys,or as memoize,ar as mergeDeep,lr as mergeDeepAdd,ir as mergeDeepX,ur as mergeShallow,Or as mirror,Q as multiply,he as noop,ee as not,kr as notf,q as nth,Ve as omit,je as once,fr as overProp,De as path,Ge as pathEq,ze as pathOr,He as pathsEq,Te as pick,Re as pickBy,Ie as prop,Le as propEq,qe as propsEq,vr as push,w as qappend,O as qassoc,P as qfilter,$ as qindexOf,C as qmap,x as qmapKeys,k as qmergeDeep,N as qmergeDeepAdd,v as qmergeDeepX,A as qreduce,ge as range,Qe as reduce,Ar as reflect,sr as replace,me as reverse,be as sizeof,D as slice,ke as sort,ae as split,M as subtract,J as tail,E as take,oe as tap,ce as test,y as toLower,se as toPairs,d as toUpper,Y as trim,j as type,m as typeIs,B as uncurry,pe as uniq,ne as values,dr as waitAll,jr as waitTap,F as when,br as zip,gr as zipObj,pr as zipWith};
