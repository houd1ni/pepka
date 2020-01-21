"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=function(){},r=r=>r===e,t=(e,t=!1)=>{let s=0;for(let o in e)(t||!r(e[o]))&&s++;return s},s=(e,s)=>{const o=t(e,!0),p=s.length,n={};let x=0,c=0;for(;x<o;x++)n[x]=r(e[x])&&c<p?s[c++]:e[x];for(;c<p;c++)n[o+c]=s[c];return n},o=(e,r,p)=>e.length-t(r)-t(p)<1?e(...(e=>{const r=t(e),s=Array(r);for(let t=0;t<r;t++)s[t]=e[t];return s})(s(r,p))):(...t)=>o(e,s(r,p),t),p=e=>(...r)=>e.length>t(r)?o(e,{},r):e(...r),n=e=>typeof e,x=e=>null===e,c=e=>"number"==n(e),a=e=>e.toUpperCase(),l=e=>{const r=n(e);switch(!0){case"object"!==r:return a(r[0])+r.slice(1);case(e=>Array.isArray(e))(e):case x(e):return"Array";case(e=>e instanceof RegExp)(e):return"RegExp";default:return"Object"}},i=p((e,r)=>(r.push(e),r)),u=p((e,r,t)=>(t[e]=r,t)),f=p((e,r,t)=>t.reduce(e,r)),d=p((e,r)=>{for(let t in r)switch(l(r[t])){case"Array":case"Object":if("Object"===l(e[t])){d(e[t],r[t]);break}default:e[t]=r[t]}return e}),h=p((e,r)=>{if("object"==n(e)&&"object"==n(r)){if(x(e)||x(r))return e===r;for(let t of[e,r])for(let s in t)if(!h(e[s],r[s]))return!1}return e===r}),y=p((e,r,t,s)=>e(s)?r(s):t(s)),m=p((e,r,t)=>y(e,r,S,t)),b=(...e)=>r=>{for(let t=_(e)-1;t>-1;t--)r=e[t](r);return r},g=p((e,r)=>e.bind(r)),j=p((e,r)=>r[e]),w=p((e,r)=>r.includes(e)),O=p((e,r,t)=>t.slice(e,c(r)?r:1/0)),A=j(0),E=O(1,null),k=p((e,r)=>e+r),q=p((e,r)=>r-e),v=e=>p((r,t)=>e(t,r)),P=e=>x(e)||(e=>void 0===e)(e),_=e=>e.length,N=e=>()=>e,S=e=>e,C=e=>!e,D=e=>r=>C(e(r)),I=e=>Object.entries(e),L=p((e,r)=>(e(r),r)),R=p((e,r)=>[...r,e]),U=p((e,r)=>r.split(e)),z=N(!0),B=N(!1),F=p((e,r)=>e>r),K=p((e,r)=>e<r),M=p((e,r)=>r>=e),T=p((e,r)=>r<=e),G=p((e,r)=>r.findIndex(e)),H=p((e,r)=>{for(const[t,s]of e)if(t(r))return s(r)}),J=p((e,r,t)=>({...t,[e]:r})),Q=p((e,r)=>r[e]),V=p((e,r,t)=>y(_,b(y(P,N(e),t=>V(e,O(1,null,r),t)),v(Q)(t),A),N(t))(r)),W=V(void 0),X=e=>{switch(n(e)){case"object":switch(l(e)){case"Null":return e;case"Array":return se(X,e);case"Object":const r={};for(let t in e)r[t]=X(e[t]);return r}default:return e}},Y=p((e,r,t)=>f(e,X(r),t)),Z=p((e,r)=>xe(e,r)),$=p((e,r)=>xe((r,t)=>w(t,e),r)),ee=p((e,r)=>xe((r,t)=>!w(t,e),r)),re=e=>Y((e,r)=>J(...r,e),{},e),te=p((e,r)=>r.join(e)),se=p((e,r)=>r.map(e)),oe=p((e,r)=>r.forEach(e)),pe=p((e,r,t)=>r(t)&&e(t)),ne=p((e,r,t)=>t.replace(e,r)),xe=p((e,r)=>y(b(h("Array"),l),r=>r.filter(e),b(re,xe(([r,t])=>e(t,r)),I))(r)),ce=p((e,r)=>Object.assign({},e,r)),ae=p((e,r)=>d(X(e),r)),le=p((e,r)=>b(re,xe(D(P)),se(([r,t])=>x(e[r])?null:[e[r]||r,t]),I)(r)),ie=(()=>{const e=async(r,t,s)=>{s<t.length&&(await r(t[s]),await e(r,t,++s))};return p((r,t)=>e(r,t,0))})(),ue=p((e,r)=>Promise.all(r.map(e))),fe=(()=>{const e=async(r,t,s)=>~s?await e(r,await r[s](t),--s):t;return(...r)=>t=>e(r,t,r.length-1)})(),de=S,he=S,ye=S;exports.F=B,exports.T=z,exports.__=e,exports.add=k,exports.always=N,exports.append=R,exports.assoc=J,exports.bind=g,exports.both=pe,exports.clone=X,exports.complement=D,exports.compose=b,exports.composeAsync=fe,exports.cond=H,exports.curry=p,exports.echo=ye,exports.equals=h,exports.explore=(e,r="log")=>L(t=>console[r](e,t)),exports.filter=xe,exports.findIndex=G,exports.flip=v,exports.forEach=oe,exports.forEachAsync=ue,exports.forEachSerial=ie,exports.fromPairs=re,exports.gt=F,exports.gte=M,exports.head=A,exports.identity=S,exports.ifElse=y,exports.includes=w,exports.isEmpty=e=>{switch(l(e)){case"String":return""==e;case"Array":return 0==_(e);case"Null":return!1;case"Object":return 0==_(Object.keys(e));default:return!1}},exports.isNil=P,exports.join=te,exports.keys=e=>Object.keys(e),exports.last=e=>e[_(e)-1],exports.length=_,exports.lt=K,exports.lte=T,exports.map=se,exports.mapKeys=le,exports.memoize=e=>{let r,t=!1;return()=>t?r:(t=!0,r=e())},exports.mergeDeep=ae,exports.mergeShallow=ce,exports.mirror=de,exports.not=C,exports.nth=j,exports.omit=ee,exports.path=W,exports.pathOr=V,exports.pick=$,exports.pickBy=Z,exports.prop=Q,exports.qappend=i,exports.qassoc=u,exports.qmergeDeep=d,exports.qreduce=f,exports.reduce=Y,exports.reflect=he,exports.replace=ne,exports.slice=O,exports.split=U,exports.subtract=q,exports.tail=E,exports.tap=L,exports.toLower=e=>e.toLowerCase(),exports.toPairs=I,exports.toUpper=a,exports.trim=e=>e.trim(),exports.type=l,exports.values=e=>Object.values(e),exports.waitAll=e=>Promise.all(e),exports.when=m;
