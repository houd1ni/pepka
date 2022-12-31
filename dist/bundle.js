"use strict";const e=Symbol("Placeholder"),r=r=>{let t=0;for(const s of r)s!==e&&t++;return t},t=(r,t)=>{const s=r.length,o=r.slice(),p=t.length;let n=p,c=0;for(;n&&c<s;c++)o[c]===e&&(o[c]=t[p-n],n--);for(c=s;n;c++,n--)o[c]=t[p-n];return o},s=(e,o,p)=>{const n=e.length-o.length-r(p);if(n<1)return e(...t(o,p));{const r=(...r)=>s(e,t(o,p),r);return r.$args_left=n,r}},o=e=>(...t)=>e.length>r(t)?s(e,[],t):e(...t),p=r=>function(t){return t===e?r:r(t)};function n(r){return function(t,s){const o=t===e,n=arguments.length;if(1===n&&o)throw new Error("Senseless placeholder usage.");return arguments.length>1?o?p((e=>r(e,s))):r(t,s):e=>r(t,e)}}function c(e){return o(e)}const x=void 0,a=1/0,i=e=>typeof e,l=e=>null===e,u=e=>"number"==i(e),f=e=>Array.isArray(e),h=e=>"function"===i(e),d={u:"U",b:"B",n:"N",s:"S",f:"F"},m=e=>{const r=i(e);return"object"===r?l(e)?"Null":e.constructor.name:d[r[0]]+r.slice(1)},y=n(((e,r)=>m(r)===e)),g=n(((e,r)=>(r.push(e),r))),b=c(((e,r,t)=>(t[e]=r,t))),w=c(((e,r,t)=>t.reduce(e,r))),j=c(((e,r,t)=>{for(let s in t)switch(m(t[s])){case"Array":if(e>1&&"Array"===m(r[s]))switch(e){case 2:const o=r[s],p=t[s];for(const r in p)o[r]?j(e,o[r],p[r]):o[r]=p[r];break;case 3:r[s].push(...t[s])}else r[s]=t[s];break;case"Object":if("Object"===m(r[s])){j(e,r[s],t[s]);break}default:r[s]=t[s]}return r})),O=j(1),q=j(2),A=j(3),E=n(((e,r)=>{let t,s,o,p;for(t in e)s=e[t],[o,p]=h(s)?s(r):[s,r[t]],r[o]=p,t!==o&&delete r[t];return r})),k=n(((e,r)=>{const t=f(r);for(let s in r)e(r[s],s)||(t?r.splice(s,1):delete r[s]);return r})),S=n(((e,r)=>r.indexOf(e))),v=e=>(...r)=>r[e],P=n(((e,r)=>{const t=m(e);if(t===m(r)&&("Object"===t||"Array"==t)){if(l(e)||l(r))return e===r;if(e===r)return!0;for(const t of[e,r])for(const s in t)if(!(t===r&&s in e||t===e&&s in r&&P(e[s],r[s])))return!1;return!0}return e===r})),D=o(((e,r,t,s)=>e(s)?r(s):t(s))),N=c(((e,r,t)=>D(e,r,M,t))),B=(...r)=>(...t)=>{let s,o=!0;for(let p=H(r)-1;p>-1;p--)o?(o=!1,s=r[p](...t)):s=s===e?r[p]():r[p](s);return s},_=n(((e,r)=>e.bind(r))),C=n(((e,r)=>r[e])),I=n(((e,r)=>{if((e=>"string"===i(e))(r))return r.includes(e);for(const t of r)if(P(t,e))return!0;return!1})),T=c(((e,r,t)=>t.slice(e,u(r)?r:a))),U=e=>n(((r,t)=>e(t,r))),$=C(0),z=T(1,a),F=n(((e,r)=>e+r)),K=n(((e,r)=>r-e)),L=n(((e,r)=>e*r)),X=n(((e,r)=>e/r)),G=e=>l(e)||(e=>e===x)(e),H=e=>e.length,J=e=>()=>e,M=e=>e,Q=e=>!e,R=e=>(...r)=>{const t=e(...r);return h(t)&&t.$args_left?R(t):Q(t)},V=e=>Object.entries(e),W=n(((e,r)=>e.test(r))),Y=n(((e,r)=>(e(r),r))),Z=n(((e,r)=>[...r,e])),ee=n(((e,r)=>r.split(e))),re=J(!0),te=J(!1),se=n(((e,r)=>pe(F(e),r-e))),oe=n(((e,r)=>e.filter(U(I)(r)))),pe=n(((e,r)=>[...Array(r)].map(((r,t)=>e(t))))),ne=n(((e,r)=>e>r)),ce=n(((e,r)=>e<r)),xe=n(((e,r)=>r>=e)),ae=n(((e,r)=>r<=e)),ie=n(((e,r)=>r.sort(e))),le=n(((e,r)=>r.find(e))),ue=n(((e,r)=>r.findIndex(e))),fe=n(((e,r)=>ue(P(e),r))),he=n(((e,r)=>{for(const[t,s]of e)if(t(r))return s(r)})),de=c(((e,r,t)=>({...t,[e]:r}))),me=c(((e,r,t)=>B((s=>{return de(s,H(e)<2?r:me(T(1,a,e),r,(o=t[s],l(o)||"object"!==i(o)?{}:t[s])),t);var o}),$)(e))),ye=n(((e,r)=>r.every(e))),ge=n(((e,r)=>r.some(e))),be=n(((e,r)=>e.every((e=>e(r))))),we=n(((e,r)=>e.some((e=>e(r))))),je=n(((e,r)=>r[e])),Oe=c(((e,r,t)=>P(t[e],r))),qe=c(((e,r,t)=>P(r[e],t[e]))),Ae=c(((e,r,t)=>D(H,(()=>G(t)?e:B(D(G,J(e),(t=>Ae(e,T(1,a,r),t))),U(je)(t),$)(r)),J(t),r))),Ee=Ae(x),ke=c(((e,r,t)=>P(Ee(e,t),r))),Se=c(((e,r,t)=>P(Ee(e,r),Ee(e,t)))),ve=/^(.*?)(8|16|32|64)(Clamped)?Array$/,Pe=(e,r=!1)=>{const t=m(e);switch(t){case"Null":case"String":case"Number":case"Boolean":case"Symbol":return e;case"Array":return r?[...e]:Ue(B(Pe,v(0)),e);case"Object":if(r)return{...e};const s={};for(let r in e)s[r]=Pe(e[r]);return s;default:return ve.test(t)?e.constructor.from(e):e}},De=c(((e,r,t)=>w(e,Pe(r),t))),Ne=n(((e,r)=>Ke(e,r))),Be=n(((e,r)=>{const t={};for(const s of e)s in r&&(t[s]=r[s]);return t})),_e=n(((e,r)=>Ke(((r,t)=>!I(t,e)),r))),Ce=e=>De(((e,r)=>de(...r,e)),{},e),Ie=n(((e,r)=>e.concat(r))),Te=n(((e,r)=>r.join(e))),Ue=n(((e,r)=>r.map(e))),$e=n(((e,r)=>r.forEach(e))),ze=c(((e,r,t)=>r(t)&&e(t))),Fe=c(((e,r,t)=>t.replace(e,r))),Ke=n(((e,r)=>f(r)?r.filter(e):B(Ce,Ke((([r,t])=>e(t,r))),V)(r))),Le=n(((e,r)=>Object.assign({},e,r))),Xe=n(((e,r)=>O(Pe(e),Pe(r)))),Ge=n(((e,r)=>q(Pe(e),Pe(r)))),He=n(((e,r)=>A(Pe(e),Pe(r)))),Je=c(((e,r,t)=>de(e,r(t[e]),t))),Me=n(((e,r)=>E(e,Object.assign({},r)))),Qe=(()=>{const e=async(r,t,s)=>{s<t.length&&(await r(t[s]),await e(r,t,++s))};return n(((r,t)=>e(r,t,0)))})(),Re=n((async(e,r)=>(await e(r),r))),Ve=n(((e,r)=>Promise.all(r.map(e)))),We=(()=>{const e=async(r,t,s)=>~s?await e(r,await r[s](t),--s):t;return(...r)=>t=>e(r,t,r.length-1)})(),Ye=M,Ze=M,er=M;exports.F=te,exports.T=re,exports.__=e,exports.add=F,exports.all=ye,exports.allPass=be,exports.always=J,exports.any=ge,exports.anyPass=we,exports.append=Z,exports.assoc=de,exports.assocPath=me,exports.bind=_,exports.both=ze,exports.clone=Pe,exports.cloneShallow=e=>Pe(e,!0),exports.complement=R,exports.compose=B,exports.composeAsync=We,exports.concat=Ie,exports.cond=he,exports.curry=o,exports.curry2=n,exports.curry3=c,exports.divide=X,exports.echo=er,exports.empty=e=>{switch(m(e)){case"String":return"";case"Object":return{};case"Array":return[];default:return x}},exports.equals=P,exports.explore=(e,r="log")=>Y((t=>console[r](e,t))),exports.filter=Ke,exports.find=le,exports.findIndex=ue,exports.flip=U,exports.forEach=$e,exports.forEachAsync=Ve,exports.forEachSerial=Qe,exports.fromPairs=Ce,exports.genBy=pe,exports.getTmpl=e=>{const r=[],t=[],s=e.length;let o,p,n,c=0,x=0,a=!1,i=$(e),l=!1;for(c=0;c<s;c++)switch(o=e[c],o){case"{":if(!i){a=!0,x=c;break}case"}":if(!i){a=!1,r.push(""),t.push(e.slice(x+1,c));break}default:n=e[c+1],l="\\"===o,a||l&&("{"===n||"}"===n)||(p=r.length-1,p<0&&(r.push(""),p++),r[p]+=o),i=l}return e=>{const s=[],o=r.length-1;for(const p in r)c=+p,s.push(r[c]),c!==o&&s.push(Ee(t[c].split("."),e));return s.join("")}},exports.gt=ne,exports.gte=xe,exports.head=$,exports.identity=M,exports.ifElse=D,exports.includes=I,exports.indexOf=fe,exports.intersection=oe,exports.isEmpty=e=>{switch(m(e)){case"String":case"Array":return 0==H(e);case"Object":for(const r in e)return!1;return!0;default:return null}},exports.isNil=G,exports.join=Te,exports.keys=e=>Object.keys(e),exports.last=e=>e[H(e)-1],exports.length=H,exports.lt=ce,exports.lte=ae,exports.map=Ue,exports.mapKeys=Me,exports.memoize=e=>{let r,t=!1;return()=>t?r:(t=!0,r=e())},exports.mergeDeep=Xe,exports.mergeDeepAdd=He,exports.mergeDeepX=Ge,exports.mergeShallow=Le,exports.mirror=Ye,exports.multiply=L,exports.not=Q,exports.nth=C,exports.omit=_e,exports.once=e=>{let r,t=!1;return(...s)=>t?r:(t=!0,r=e(...s))},exports.overProp=Je,exports.path=Ee,exports.pathEq=ke,exports.pathOr=Ae,exports.pathsEq=Se,exports.pick=Be,exports.pickBy=Ne,exports.prop=je,exports.propEq=Oe,exports.propsEq=qe,exports.qappend=g,exports.qassoc=b,exports.qfilter=k,exports.qindexOf=S,exports.qmapKeys=E,exports.qmergeDeep=O,exports.qmergeDeepAdd=A,exports.qmergeDeepX=q,exports.qreduce=w,exports.range=se,exports.reduce=De,exports.reflect=Ze,exports.replace=Fe,exports.reverse=e=>B((r=>De(((t,s,o)=>g(e[r-o],t)),[],e)),F(-1),H)(e),exports.sizeof=e=>{if("Object"===m(e)){let r=0;for(let t in e)r++;return r}return H(e)},exports.slice=T,exports.sort=ie,exports.split=ee,exports.subtract=K,exports.tail=z,exports.take=v,exports.tap=Y,exports.test=W,exports.toLower=e=>e.toLowerCase(),exports.toPairs=V,exports.toUpper=e=>e.toUpperCase(),exports.trim=e=>e.trim(),exports.type=m,exports.typeIs=y,exports.uncurry=e=>(...r)=>w(((e,r)=>e?e(r):e),e,r),exports.uniq=e=>w(((e,r)=>I(r,e)?e:g(r,e)),[],e),exports.values=e=>Object.values(e),exports.waitAll=e=>Promise.all(e),exports.waitTap=Re,exports.when=N;
