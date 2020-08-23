"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=function(){},r=r=>{let t=0;for(const s of r)s!==e&&t++;return t},t=(r,t)=>{const s=r.length,o=r.slice(),p=t.length;let n=p,x=0;for(;n&&x<s;x++)o[x]===e&&(o[x]=t[p-n],n--);for(x=s;n;x++,n--)o[x]=t[p-n];return o},s=(e,o,p)=>{const n=e.length-o.length-r(p);if(n<1)return e(...t(o,p));{const r=(...r)=>s(e,t(o,p),r);return r.$args_left=n,r}},o=e=>(...t)=>e.length>r(t)?s(e,[],t):e(...t),p=e=>typeof e,n=e=>null===e,x=e=>"number"==p(e),c=e=>Array.isArray(e),a=e=>"function"===p(e),i={u:"U",b:"B",n:"N",s:"S",f:"F"},l=e=>{const r=p(e);return"object"===r?n(e)?"Null":e.constructor.name:i[r[0]]+r.slice(1)},u=o((e,r)=>(r.push(e),r)),f=o((e,r,t)=>(t[e]=r,t)),d=o((e,r,t)=>t.reduce(e,r)),m=o((e,r,t)=>{for(let s in t)switch(l(t[s])){case"Array":if(e>1&&"Array"===l(r[s]))switch(e){case 2:const o=r[s],p=t[s];for(const r in p)o[r]?m(e,o[r],p[r]):o[r]=p[r];break;case 3:r[s].push(...t[s])}else r[s]=t[s];break;case"Object":if("Object"===l(r[s])){m(e,r[s],t[s]);break}default:r[s]=t[s]}return r}),y=m(1),h=m(2),g=m(3),b=o((e,r)=>{let t,s,o,p;for(t in e)s=e[t],[o,p]=a(s)?s(r):[s,r[t]],r[o]=p,t!==o&&delete r[t];return r}),j=o((e,r)=>{const t=c(r);for(let s in r)e(r[s],s)||(t?r.splice(s,1):delete r[s]);return r}),O=o((e,r)=>r.indexOf(e)),q=o((e,r)=>{const t=l(e);if(t===l(r)&&("Object"===t||"Array"==t)){if(n(e)||n(r))return e===r;if(e===r)return!0;for(const t of[e,r])for(const s in t)if(!(t===r&&s in e||t===e&&s in r&&q(e[s],r[s])))return!1;return!0}return e===r}),w=o((e,r,t,s)=>e(s)?r(s):t(s)),A=o((e,r,t)=>w(e,r,F,t)),v=(...r)=>(t=e)=>{for(let s=$(r)-1;s>-1;s--)t=t===e?r[s]():r[s](t);return t},E=o((e,r)=>e.bind(r)),P=o((e,r)=>r[e]),k=o((e,r)=>{if((e=>"string"===p(e))(r))return r.includes(e);for(const t of r)if(q(t,e))return!0;return!1}),S=o((e,r,t)=>t.slice(e,x(r)?r:1/0)),D=P(0),_=S(1,null),N=o((e,r)=>e+r),B=o((e,r)=>r-e),C=e=>o((r,t)=>e(t,r)),U=e=>n(e)||(e=>void 0===e)(e),$=e=>e.length,z=e=>()=>e,F=e=>e,I=e=>!e,K=e=>(...r)=>{const t=e(...r);return a(t)&&t.$args_left?K(t):I(t)},L=e=>Object.entries(e),X=o((e,r)=>e.test(r)),M=o((e,r)=>(e(r),r)),T=o((e,r)=>[...r,e]),G=o((e,r)=>r.split(e)),H=z(!0),J=z(!1),Q=o((e,r)=>V(N(e),r-e)),R=o((e,r)=>e.filter(C(k)(r))),V=o((e,r)=>[...Array(r)].map((r,t)=>e(t))),W=o((e,r)=>e>r),Y=o((e,r)=>e<r),Z=o((e,r)=>r>=e),ee=o((e,r)=>r<=e),re=o((e,r)=>r.sort(e)),te=o((e,r)=>r.find(e)),se=o((e,r)=>r.findIndex(e)),oe=o((e,r)=>se(q(e),r)),pe=o((e,r)=>{for(const[t,s]of e)if(t(r))return s(r)}),ne=o((e,r,t)=>({...t,[e]:r})),xe=o((e,r,t)=>v(s=>{return ne(s,$(e)<2?r:xe(S(1,null,e),r,(o=t[s],n(o)||"object"!==p(o)?{}:t[s])),t);var o},D)(e)),ce=o((e,r)=>r.every(e)),ae=o((e,r)=>r.some(e)),ie=o((e,r)=>e.every(e=>e(r))),le=o((e,r)=>e.some(e=>e(r))),ue=o((e,r)=>r[e]),fe=o((e,r,t)=>q(t[e],r)),de=o((e,r,t)=>q(r[e],t[e])),me=o((e,r,t)=>w($,()=>U(t)?e:v(w(U,z(e),t=>me(e,S(1,null,r),t)),C(ue)(t),D)(r),z(t),r)),ye=me(void 0),he=o((e,r,t)=>q(ye(e,t),r)),ge=o((e,r,t)=>q(ye(e,r),ye(e,t))),be=/^(.*?)(8|16|32|64)(Clamped)?Array$/,je=e=>{const r=l(e);switch(r){case"Null":return e;case"Array":return ke(je,e);case"Object":const t={};for(let r in e)t[r]=je(e[r]);return t;case"String":case"Number":case"Boolean":case"Symbol":return e;default:return be.test(r)?ke(je,e):e}},Oe=o((e,r,t)=>d(e,je(r),t)),qe=o((e,r)=>Ne(e,r)),we=o((e,r)=>{const t={};for(const s of e)s in r&&(t[s]=r[s]);return t}),Ae=o((e,r)=>Ne((r,t)=>!k(t,e),r)),ve=e=>Oe((e,r)=>ne(...r,e),{},e),Ee=o((e,r)=>e.concat(r)),Pe=o((e,r)=>r.join(e)),ke=o((e,r)=>r.map(e)),Se=o((e,r)=>r.forEach(e)),De=o((e,r,t)=>r(t)&&e(t)),_e=o((e,r,t)=>t.replace(e,r)),Ne=o((e,r)=>c(r)?r.filter(e):v(ve,Ne(([r,t])=>e(t,r)),L)(r)),Be=o((e,r)=>Object.assign({},e,r)),Ce=o((e,r)=>y(je(e),je(r))),Ue=o((e,r)=>h(je(e),je(r))),$e=o((e,r)=>g(je(e),je(r))),ze=o((e,r,t)=>ne(e,r(t[e]),t)),Fe=o((e,r)=>b(e,Object.assign({},r))),Ie=(()=>{const e=async(r,t,s)=>{s<t.length&&(await r(t[s]),await e(r,t,++s))};return o((r,t)=>e(r,t,0))})(),Ke=o((e,r)=>Promise.all(r.map(e))),Le=(()=>{const e=async(r,t,s)=>~s?await e(r,await r[s](t),--s):t;return(...r)=>t=>e(r,t,r.length-1)})(),Xe=F,Me=F,Te=F;exports.F=J,exports.T=H,exports.__=e,exports.add=N,exports.all=ce,exports.allPass=ie,exports.always=z,exports.any=ae,exports.anyPass=le,exports.append=T,exports.assoc=ne,exports.assocPath=xe,exports.bind=E,exports.both=De,exports.clone=je,exports.complement=K,exports.compose=v,exports.composeAsync=Le,exports.concat=Ee,exports.cond=pe,exports.curry=o,exports.echo=Te,exports.empty=e=>{switch(l(e)){case"String":return"";case"Object":return{};case"Array":return[];default:return}},exports.equals=q,exports.explore=(e,r="log")=>M(t=>console[r](e,t)),exports.filter=Ne,exports.find=te,exports.findIndex=se,exports.flip=C,exports.forEach=Se,exports.forEachAsync=Ke,exports.forEachSerial=Ie,exports.fromPairs=ve,exports.genBy=V,exports.gt=W,exports.gte=Z,exports.head=D,exports.identity=F,exports.ifElse=w,exports.includes=k,exports.indexOf=oe,exports.intersection=R,exports.isEmpty=e=>{switch(l(e)){case"String":case"Array":return 0==$(e);case"Object":for(const r in e)return!1;return!0;default:return null}},exports.isNil=U,exports.join=Pe,exports.keys=e=>Object.keys(e),exports.last=e=>e[$(e)-1],exports.length=$,exports.lt=Y,exports.lte=ee,exports.map=ke,exports.mapKeys=Fe,exports.memoize=e=>{let r,t=!1;return()=>t?r:(t=!0,r=e())},exports.mergeDeep=Ce,exports.mergeDeepAdd=$e,exports.mergeDeepX=Ue,exports.mergeShallow=Be,exports.mirror=Xe,exports.not=I,exports.nth=P,exports.omit=Ae,exports.once=e=>{let r,t=!1;return(...s)=>t?r:(t=!0,r=e(...s))},exports.overProp=ze,exports.path=ye,exports.pathEq=he,exports.pathOr=me,exports.pathsEq=ge,exports.pick=we,exports.pickBy=qe,exports.prop=ue,exports.propEq=fe,exports.propsEq=de,exports.qappend=u,exports.qassoc=f,exports.qfilter=j,exports.qindexOf=O,exports.qmapKeys=b,exports.qmergeDeep=y,exports.qmergeDeepAdd=g,exports.qmergeDeepX=h,exports.qreduce=d,exports.range=Q,exports.reduce=Oe,exports.reflect=Me,exports.replace=_e,exports.reverse=e=>v(r=>Oe((t,s,o)=>u(e[r-o],t),[],e),N(-1),$)(e),exports.sizeof=e=>{if("Object"===l(e)){let r=0;for(let t in e)r++;return r}return $(e)},exports.slice=S,exports.sort=re,exports.split=G,exports.subtract=B,exports.tail=_,exports.tap=M,exports.test=X,exports.toLower=e=>e.toLowerCase(),exports.toPairs=L,exports.toUpper=e=>e.toUpperCase(),exports.trim=e=>e.trim(),exports.type=l,exports.uniq=e=>d((e,r)=>k(r,e)?e:u(r,e),[],e),exports.values=e=>Object.values(e),exports.waitAll=e=>Promise.all(e),exports.when=A;
