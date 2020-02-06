"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=function(){},t=t=>{let r=0;for(const s of t)s!==e&&r++;return r},r=(t,r)=>{const s=t.size,o=new Map(t),p=r.length;let n=p,c=0;for(;n&&c<s;c++)o.get(c)===e&&(o.set(c,r[p-n]),n--);for(c=s+1;n;c++,n--)o.set(c,r[p-n]);return o},s=(e,o,p)=>{const n=e.length-o.size-t(p);if(n<1)return e(...r(o,p).values());{const t=(...t)=>s(e,r(o,p),t);return t.$args_left=n,t}},o=e=>(...r)=>e.length>t(r)?s(e,new Map,r):e(...r),p=e=>typeof e,n=e=>null===e,c=e=>"number"==p(e),x=e=>Array.isArray(e),i=e=>"function"===p(e),a={u:"U",b:"B",n:"N",s:"S",f:"F"},l=e=>{const t=p(e);return"object"===t?n(e)?"Null":e.constructor.name:a[t[0]]+t.slice(1)},u=o((e,t)=>(t.push(e),t)),f=o((e,t,r)=>(r[e]=t,r)),d=o((e,t,r)=>r.reduce(e,t)),y=o((e,t)=>{for(let r in t)switch(l(t[r])){case"Array":case"Object":if("Object"===l(e[r])){y(e[r],t[r]);break}default:e[r]=t[r]}return e}),m=o((e,t)=>{let r,s,o,p;for(r in e)s=e[r],[o,p]=i(s)?s(t):[s,t[r]],r!==o&&(t[o]=p,delete t[r]);return t}),h=o((e,t)=>{const r=x(t);for(let s in t)e(t[s],s)||(r?t.splice(s,1):delete t[s]);return t}),g=o((e,t)=>{const r=l(e);if(r===l(t)&&("Object"===r||"Array"==r)){if(n(e)||n(t))return e===t;if(e===t)return!0;for(const r of[e,t])for(const s in r)if(!(r===t&&s in e||r===e&&s in t&&g(e[s],t[s])))return!1;return!0}return e===t}),b=o((e,t,r,s)=>e(s)?t(s):r(s)),w=o((e,t,r)=>b(e,t,M,r)),j=(...e)=>t=>{for(let r=z(e)-1;r>-1;r--)t=e[r](t);return t},O=o((e,t)=>e.bind(t)),A=o((e,t)=>t[e]),q=o((e,t)=>{if((e=>"string"===p(e))(t))return t.includes(e);for(const r of t)if(g(r,e))return!0;return!1}),E=o((e,t,r)=>r.slice(e,c(t)?t:1/0)),k=A(0),v=E(1,null),_=o((e,t)=>e+t),N=o((e,t)=>t-e),P=e=>o((t,r)=>e(r,t)),S=e=>n(e)||(e=>void 0===e)(e),z=e=>e.length,B=e=>()=>e,M=e=>e,U=e=>!e,C=e=>(...t)=>{const r=e(...t);return i(r)&&r.$args_left?C(r):U(r)},D=e=>Object.entries(e),F=o((e,t)=>(e(t),t)),I=o((e,t)=>[...t,e]),K=o((e,t)=>t.split(e)),L=B(!0),$=B(!1),T=o((e,t)=>e.filter(e=>t.includes(e))),G=o((e,t)=>[...Array(t)].map((t,r)=>e(r))),H=o((e,t)=>e>t),J=o((e,t)=>e<t),Q=o((e,t)=>t>=e),R=o((e,t)=>t<=e),V=o((e,t)=>t.indexOf(e)),W=o((e,t)=>t.find(e)),X=o((e,t)=>t.findIndex(e)),Y=o((e,t)=>{for(const[r,s]of e)if(r(t))return s(t)}),Z=o((e,t,r)=>({...r,[e]:t})),ee=o((e,t)=>t[e]),te=o((e,t,r)=>r[e]===t),re=o((e,t,r)=>t[e]===r[e]),se=o((e,t,r)=>b(z,()=>S(r)?e:j(b(S,B(e),r=>se(e,E(1,null,t),r)),P(ee)(r),k)(t),B(r),t)),oe=se(void 0),pe=e=>{switch(l(e)){case"Null":return e;case"Array":return fe(pe,e);case"Object":const t={};for(let r in e)t[r]=pe(e[r]);return t;default:return e}},ne=o((e,t,r)=>d(e,pe(t),r)),ce=o((e,t)=>he(e,t)),xe=o((e,t)=>he((t,r)=>q(r,e),t)),ie=o((e,t)=>he((t,r)=>!q(r,e),t)),ae=e=>ne((e,t)=>Z(...t,e),{},e),le=o((e,t)=>e.concat(t)),ue=o((e,t)=>t.join(e)),fe=o((e,t)=>t.map(e)),de=o((e,t)=>t.forEach(e)),ye=o((e,t,r)=>t(r)&&e(r)),me=o((e,t,r)=>r.replace(e,t)),he=o((e,t)=>x(t)?t.filter(e):j(ae,he(([t,r])=>e(r,t)),D)(t)),ge=o((e,t)=>Object.assign({},e,t)),be=o((e,t)=>y(pe(e),pe(t))),we=o((e,t)=>{const r={};for(const s in t)r[e[s]||s]=t[s];return r}),je=(()=>{const e=async(t,r,s)=>{s<r.length&&(await t(r[s]),await e(t,r,++s))};return o((t,r)=>e(t,r,0))})(),Oe=o((e,t)=>Promise.all(t.map(e))),Ae=(()=>{const e=async(t,r,s)=>~s?await e(t,await t[s](r),--s):r;return(...t)=>r=>e(t,r,t.length-1)})(),qe=M,Ee=M,ke=M;exports.F=$,exports.T=L,exports.__=e,exports.add=_,exports.always=B,exports.append=I,exports.assoc=Z,exports.bind=O,exports.both=ye,exports.clone=pe,exports.complement=C,exports.compose=j,exports.composeAsync=Ae,exports.concat=le,exports.cond=Y,exports.curry=o,exports.echo=ke,exports.empty=e=>{switch(l(e)){case"String":return"";case"Object":return{};case"Array":return[];default:return}},exports.equals=g,exports.explore=(e,t="log")=>F(r=>console[t](e,r)),exports.filter=he,exports.find=W,exports.findIndex=X,exports.flip=P,exports.forEach=de,exports.forEachAsync=Oe,exports.forEachSerial=je,exports.fromPairs=ae,exports.genBy=G,exports.gt=H,exports.gte=Q,exports.head=k,exports.identity=M,exports.ifElse=b,exports.includes=q,exports.indexOf=V,exports.intersection=T,exports.isEmpty=e=>{switch(l(e)){case"String":return""==e;case"Array":return 0==z(e);case"Null":return!1;case"Object":return 0==z(Object.keys(e));default:return!1}},exports.isNil=S,exports.join=ue,exports.keys=e=>Object.keys(e),exports.last=e=>e[z(e)-1],exports.length=z,exports.lt=J,exports.lte=R,exports.map=fe,exports.mapKeys=we,exports.memoize=e=>{let t,r=!1;return()=>r?t:(r=!0,t=e())},exports.mergeDeep=be,exports.mergeShallow=ge,exports.mirror=qe,exports.not=U,exports.nth=A,exports.omit=ie,exports.path=oe,exports.pathOr=se,exports.pick=xe,exports.pickBy=ce,exports.prop=ee,exports.propEq=te,exports.propsEq=re,exports.qappend=u,exports.qassoc=f,exports.qfilter=h,exports.qmapKeys=m,exports.qmergeDeep=y,exports.qreduce=d,exports.reduce=ne,exports.reflect=Ee,exports.replace=me,exports.slice=E,exports.split=K,exports.subtract=N,exports.tail=v,exports.tap=F,exports.test=(e,t)=>e.test(t),exports.toLower=e=>e.toLowerCase(),exports.toPairs=D,exports.toUpper=e=>e.toUpperCase(),exports.trim=e=>e.trim(),exports.type=l,exports.uniq=e=>d((e,t)=>q(t,e)?e:u(t,e),[],e),exports.values=e=>Object.values(e),exports.waitAll=e=>Promise.all(e),exports.when=w;
