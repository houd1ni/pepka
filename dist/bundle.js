"use strict";const e=Symbol("Placeholder"),r=r=>{let t=0;for(const s of r)s!==e&&t++;return t},t=(r,t)=>{const s=r.length,o=r.slice(),p=t.length;let n=p,c=0;for(;n&&c<s;c++)o[c]===e&&(o[c]=t[p-n],n--);for(c=s;n;c++,n--)o[c]=t[p-n];return o},s=(e,o,p)=>{const n=e.length-o.length-r(p);if(n<1)return e(...t(o,p));{const r=(...r)=>s(e,t(o,p),r);return r.$args_left=n,r}},o=e=>(...t)=>e.length>r(t)?s(e,[],t):e(...t),p=r=>function(t){return t===e?r:r(t)};function n(r){return function(t,s){const o=t===e,n=arguments.length;if(1===n&&o)throw new Error("Senseless placeholder usage.");return arguments.length>1?o?p((e=>r(e,s))):r(t,s):e=>r(t,e)}}function c(e){return o(e)}const x=void 0,a=1/0,i=e=>typeof e,l=e=>null===e,u=e=>"number"==i(e),f=e=>Array.isArray(e),h=e=>"function"===i(e),d={u:"U",b:"B",n:"N",s:"S",f:"F"},m=e=>{const r=i(e);return"object"===r?l(e)?"Null":e.constructor.name:d[r[0]]+r.slice(1)},y=n(((e,r)=>m(r)===e)),g=n(((e,r)=>(r.push(e),r))),b=c(((e,r,t)=>(t[e]=r,t))),w=c(((e,r,t)=>t.reduce(e,r))),j=c(((e,r,t)=>{for(let s in t)switch(m(t[s])){case"Array":if(e>1&&"Array"===m(r[s]))switch(e){case 2:const o=r[s],p=t[s];for(const r in p)o[r]?j(e,o[r],p[r]):o[r]=p[r];break;case 3:r[s].push(...t[s])}else r[s]=t[s];break;case"Object":if("Object"===m(r[s])){j(e,r[s],t[s]);break}default:r[s]=t[s]}return r})),O=j(1),q=j(2),A=j(3),E=n(((e,r)=>{let t,s,o,p;for(t in e)s=e[t],[o,p]=h(s)?s(r):[s,r[t]],r[o]=p,t!==o&&delete r[t];return r})),k=n(((e,r)=>{const t=f(r);for(let s in r)e(r[s],s)||(t?r.splice(s,1):delete r[s]);return r})),S=n(((e,r)=>r.indexOf(e))),v=n(((e,r)=>{const t=m(e);if(t===m(r)&&("Object"===t||"Array"==t)){if(l(e)||l(r))return e===r;if(e===r)return!0;for(const t of[e,r])for(const s in t)if(!(t===r&&s in e||t===e&&s in r&&v(e[s],r[s])))return!1;return!0}return e===r})),P=o(((e,r,t,s)=>e(s)?r(s):t(s))),D=c(((e,r,t)=>P(e,r,J,t))),N=(...r)=>(...t)=>{let s,o=!0;for(let p=G(r)-1;p>-1;p--)o?(o=!1,s=r[p](...t)):s=s===e?r[p]():r[p](s);return s},B=n(((e,r)=>e.bind(r))),_=n(((e,r)=>r[e])),C=n(((e,r)=>{if((e=>"string"===i(e))(r))return r.includes(e);for(const t of r)if(v(t,e))return!0;return!1})),I=c(((e,r,t)=>t.slice(e,u(r)?r:a))),T=_(0),U=I(1,a),$=n(((e,r)=>e+r)),z=n(((e,r)=>r-e)),F=n(((e,r)=>e*r)),K=n(((e,r)=>e/r)),L=e=>o(((r,t)=>e(t,r))),X=e=>l(e)||(e=>e===x)(e),G=e=>e.length,H=e=>()=>e,J=e=>e,M=e=>!e,Q=e=>(...r)=>{const t=e(...r);return h(t)&&t.$args_left?Q(t):M(t)},R=e=>Object.entries(e),V=n(((e,r)=>e.test(r))),W=n(((e,r)=>(e(r),r))),Y=n(((e,r)=>[...r,e])),Z=n(((e,r)=>r.split(e))),ee=H(!0),re=H(!1),te=n(((e,r)=>oe($(e),r-e))),se=n(((e,r)=>e.filter(L(C)(r)))),oe=n(((e,r)=>[...Array(r)].map(((r,t)=>e(t))))),pe=n(((e,r)=>e>r)),ne=n(((e,r)=>e<r)),ce=n(((e,r)=>r>=e)),xe=n(((e,r)=>r<=e)),ae=n(((e,r)=>r.sort(e))),ie=n(((e,r)=>r.find(e))),le=n(((e,r)=>r.findIndex(e))),ue=n(((e,r)=>le(v(e),r))),fe=n(((e,r)=>{for(const[t,s]of e)if(t(r))return s(r)})),he=c(((e,r,t)=>({...t,[e]:r}))),de=c(((e,r,t)=>N((s=>{return he(s,G(e)<2?r:de(I(1,a,e),r,(o=t[s],l(o)||"object"!==i(o)?{}:t[s])),t);var o}),T)(e))),me=n(((e,r)=>r.every(e))),ye=n(((e,r)=>r.some(e))),ge=n(((e,r)=>e.every((e=>e(r))))),be=n(((e,r)=>e.some((e=>e(r))))),we=n(((e,r)=>r[e])),je=c(((e,r,t)=>v(t[e],r))),Oe=c(((e,r,t)=>v(r[e],t[e]))),qe=c(((e,r,t)=>P(G,(()=>X(t)?e:N(P(X,H(e),(t=>qe(e,I(1,a,r),t))),L(we)(t),T)(r)),H(t),r))),Ae=qe(x),Ee=c(((e,r,t)=>v(Ae(e,t),r))),ke=c(((e,r,t)=>v(Ae(e,r),Ae(e,t)))),Se=/^(.*?)(8|16|32|64)(Clamped)?Array$/,ve=(e,r=!1)=>{const t=m(e);switch(t){case"Null":case"String":case"Number":case"Boolean":case"Symbol":return e;case"Array":return r?[...e]:Te(ve,e);case"Object":if(r)return{...e};const s={};for(let r in e)s[r]=ve(e[r]);return s;default:return Se.test(t)?e.constructor.from(e):e}},Pe=c(((e,r,t)=>w(e,ve(r),t))),De=n(((e,r)=>Fe(e,r))),Ne=n(((e,r)=>{const t={};for(const s of e)s in r&&(t[s]=r[s]);return t})),Be=n(((e,r)=>Fe(((r,t)=>!C(t,e)),r))),_e=e=>Pe(((e,r)=>he(...r,e)),{},e),Ce=n(((e,r)=>e.concat(r))),Ie=n(((e,r)=>r.join(e))),Te=n(((e,r)=>r.map(e))),Ue=n(((e,r)=>r.forEach(e))),$e=c(((e,r,t)=>r(t)&&e(t))),ze=c(((e,r,t)=>t.replace(e,r))),Fe=n(((e,r)=>f(r)?r.filter(e):N(_e,Fe((([r,t])=>e(t,r))),R)(r))),Ke=n(((e,r)=>Object.assign({},e,r))),Le=n(((e,r)=>O(ve(e),ve(r)))),Xe=n(((e,r)=>q(ve(e),ve(r)))),Ge=n(((e,r)=>A(ve(e),ve(r)))),He=c(((e,r,t)=>he(e,r(t[e]),t))),Je=n(((e,r)=>E(e,Object.assign({},r)))),Me=(()=>{const e=async(r,t,s)=>{s<t.length&&(await r(t[s]),await e(r,t,++s))};return n(((r,t)=>e(r,t,0)))})(),Qe=n((async(e,r)=>(await e(r),r))),Re=n(((e,r)=>Promise.all(r.map(e)))),Ve=(()=>{const e=async(r,t,s)=>~s?await e(r,await r[s](t),--s):t;return(...r)=>t=>e(r,t,r.length-1)})(),We=J,Ye=J,Ze=J;exports.F=re,exports.T=ee,exports.__=e,exports.add=$,exports.all=me,exports.allPass=ge,exports.always=H,exports.any=ye,exports.anyPass=be,exports.append=Y,exports.assoc=he,exports.assocPath=de,exports.bind=B,exports.both=$e,exports.clone=ve,exports.cloneShallow=e=>ve(e,!0),exports.complement=Q,exports.compose=N,exports.composeAsync=Ve,exports.concat=Ce,exports.cond=fe,exports.curry=o,exports.curry2=n,exports.curry3=c,exports.divide=K,exports.echo=Ze,exports.empty=e=>{switch(m(e)){case"String":return"";case"Object":return{};case"Array":return[];default:return x}},exports.equals=v,exports.explore=(e,r="log")=>W((t=>console[r](e,t))),exports.filter=Fe,exports.find=ie,exports.findIndex=le,exports.flip=L,exports.forEach=Ue,exports.forEachAsync=Re,exports.forEachSerial=Me,exports.fromPairs=_e,exports.genBy=oe,exports.getTmpl=e=>{const r=[],t=[],s=e.length;let o,p,n,c=0,x=0,a=!1,i=T(e),l=!1;for(c=0;c<s;c++)switch(o=e[c],o){case"{":if(!i){a=!0,x=c;break}case"}":if(!i){a=!1,r.push(""),t.push(e.slice(x+1,c));break}default:n=e[c+1],l="\\"===o,a||l&&("{"===n||"}"===n)||(p=r.length-1,p<0&&(r.push(""),p++),r[p]+=o),i=l}return e=>{const s=[],o=r.length-1;for(const p in r)c=+p,s.push(r[c]),c!==o&&s.push(Ae(t[c].split("."),e));return s.join("")}},exports.gt=pe,exports.gte=ce,exports.head=T,exports.identity=J,exports.ifElse=P,exports.includes=C,exports.indexOf=ue,exports.intersection=se,exports.isEmpty=e=>{switch(m(e)){case"String":case"Array":return 0==G(e);case"Object":for(const r in e)return!1;return!0;default:return null}},exports.isNil=X,exports.join=Ie,exports.keys=e=>Object.keys(e),exports.last=e=>e[G(e)-1],exports.length=G,exports.lt=ne,exports.lte=xe,exports.map=Te,exports.mapKeys=Je,exports.memoize=e=>{let r,t=!1;return()=>t?r:(t=!0,r=e())},exports.mergeDeep=Le,exports.mergeDeepAdd=Ge,exports.mergeDeepX=Xe,exports.mergeShallow=Ke,exports.mirror=We,exports.multiply=F,exports.not=M,exports.nth=_,exports.omit=Be,exports.once=e=>{let r,t=!1;return(...s)=>t?r:(t=!0,r=e(...s))},exports.overProp=He,exports.path=Ae,exports.pathEq=Ee,exports.pathOr=qe,exports.pathsEq=ke,exports.pick=Ne,exports.pickBy=De,exports.prop=we,exports.propEq=je,exports.propsEq=Oe,exports.qappend=g,exports.qassoc=b,exports.qfilter=k,exports.qindexOf=S,exports.qmapKeys=E,exports.qmergeDeep=O,exports.qmergeDeepAdd=A,exports.qmergeDeepX=q,exports.qreduce=w,exports.range=te,exports.reduce=Pe,exports.reflect=Ye,exports.replace=ze,exports.reverse=e=>N((r=>Pe(((t,s,o)=>g(e[r-o],t)),[],e)),$(-1),G)(e),exports.sizeof=e=>{if("Object"===m(e)){let r=0;for(let t in e)r++;return r}return G(e)},exports.slice=I,exports.sort=ae,exports.split=Z,exports.subtract=z,exports.tail=U,exports.take=e=>(...r)=>r[e],exports.tap=W,exports.test=V,exports.toLower=e=>e.toLowerCase(),exports.toPairs=R,exports.toUpper=e=>e.toUpperCase(),exports.trim=e=>e.trim(),exports.type=m,exports.typeIs=y,exports.uncurry=e=>(...r)=>w(((e,r)=>e?e(r):e),e,r),exports.uniq=e=>w(((e,r)=>C(r,e)?e:g(r,e)),[],e),exports.values=e=>Object.values(e),exports.waitAll=e=>Promise.all(e),exports.waitTap=Qe,exports.when=D;
