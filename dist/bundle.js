"use strict";const e=Symbol("Placeholder"),r=r=>{let t=0;for(const s of r)s!==e&&t++;return t},t=(r,t)=>{const s=r.length,o=r.slice(),n=t.length;let p=n,c=0;for(;p&&c<s;c++)o[c]===e&&(o[c]=t[n-p],p--);for(c=s;p;c++,p--)o[c]=t[n-p];return o},s=(e,o,n)=>{const p=e.length-o.length-r(n);if(p<1)return e(...t(o,n));{const r=(...r)=>s(e,t(o,n),r);return r.$args_left=p,r}},o=e=>(...t)=>e.length>r(t)?s(e,[],t):e(...t),n=r=>function(t){return t===e?r:r(t)};function p(r){return function(t,s){const o=t===e,p=arguments.length;if(1===p&&o)throw new Error("Senseless placeholder usage.");return arguments.length>1?o?n((e=>r(e,s))):r(t,s):e=>r(t,e)}}function c(e){return o(e)}const a=void 0,x=1/0,l=e=>typeof e,i=e=>null===e,u=e=>"number"==l(e),f=e=>Array.isArray(e),h=e=>"function"===l(e),m={u:"U",b:"B",n:"N",s:"S",f:"F"},d=e=>{const r=l(e);return"object"===r?i(e)?"Null":e.constructor.name:m[r[0]]+r.slice(1)},y=p(((e,r)=>(r.push(e),r))),g=c(((e,r,t)=>(t[e]=r,t))),b=c(((e,r,t)=>t.reduce(e,r))),w=c(((e,r,t)=>{for(let s in t)switch(d(t[s])){case"Array":if(e>1&&"Array"===d(r[s]))switch(e){case 2:const o=r[s],n=t[s];for(const r in n)o[r]?w(e,o[r],n[r]):o[r]=n[r];break;case 3:r[s].push(...t[s])}else r[s]=t[s];break;case"Object":if("Object"===d(r[s])){w(e,r[s],t[s]);break}default:r[s]=t[s]}return r})),j=w(1),O=w(2),q=w(3),A=p(((e,r)=>{let t,s,o,n;for(t in e)s=e[t],[o,n]=h(s)?s(r):[s,r[t]],r[o]=n,t!==o&&delete r[t];return r})),E=p(((e,r)=>{const t=f(r);for(let s in r)e(r[s],s)||(t?r.splice(s,1):delete r[s]);return r})),S=p(((e,r)=>r.indexOf(e))),k=p(((e,r)=>{const t=d(e);if(t===d(r)&&("Object"===t||"Array"==t)){if(i(e)||i(r))return e===r;if(e===r)return!0;for(const t of[e,r])for(const s in t)if(!(t===r&&s in e||t===e&&s in r&&k(e[s],r[s])))return!1;return!0}return e===r})),P=o(((e,r,t,s)=>e(s)?r(s):t(s))),v=c(((e,r,t)=>P(e,r,X,t))),D=(...r)=>(t=Symbol())=>{for(let s=K(r)-1;s>-1;s--)t=t===e?r[s]():r[s](t);return t},N=p(((e,r)=>e.bind(r))),B=p(((e,r)=>r[e])),_=p(((e,r)=>{if((e=>"string"===l(e))(r))return r.includes(e);for(const t of r)if(k(t,e))return!0;return!1})),C=c(((e,r,t)=>t.slice(e,u(r)?r:x))),T=B(0),U=C(1,x),$=p(((e,r)=>e+r)),z=p(((e,r)=>r-e)),F=e=>o(((r,t)=>e(t,r))),I=e=>i(e)||(e=>e===a)(e),K=e=>e.length,L=e=>()=>e,X=e=>e,G=e=>!e,H=e=>(...r)=>{const t=e(...r);return h(t)&&t.$args_left?H(t):G(t)},J=e=>Object.entries(e),M=p(((e,r)=>e.test(r))),Q=p(((e,r)=>(e(r),r))),R=p(((e,r)=>[...r,e])),V=p(((e,r)=>r.split(e))),W=L(!0),Y=L(!1),Z=p(((e,r)=>re($(e),r-e))),ee=p(((e,r)=>e.filter(F(_)(r)))),re=p(((e,r)=>[...Array(r)].map(((r,t)=>e(t))))),te=p(((e,r)=>e>r)),se=p(((e,r)=>e<r)),oe=p(((e,r)=>r>=e)),ne=p(((e,r)=>r<=e)),pe=p(((e,r)=>r.sort(e))),ce=p(((e,r)=>r.find(e))),ae=p(((e,r)=>r.findIndex(e))),xe=p(((e,r)=>ae(k(e),r))),le=p(((e,r)=>{for(const[t,s]of e)if(t(r))return s(r)})),ie=c(((e,r,t)=>({...t,[e]:r}))),ue=c(((e,r,t)=>D((s=>{return ie(s,K(e)<2?r:ue(C(1,x,e),r,(o=t[s],i(o)||"object"!==l(o)?{}:t[s])),t);var o}),T)(e))),fe=p(((e,r)=>r.every(e))),he=p(((e,r)=>r.some(e))),me=p(((e,r)=>e.every((e=>e(r))))),de=p(((e,r)=>e.some((e=>e(r))))),ye=p(((e,r)=>r[e])),ge=c(((e,r,t)=>k(t[e],r))),be=c(((e,r,t)=>k(r[e],t[e]))),we=c(((e,r,t)=>P(K,(()=>I(t)?e:D(P(I,L(e),(t=>we(e,C(1,x,r),t))),F(ye)(t),T)(r)),L(t),r))),je=we(a),Oe=c(((e,r,t)=>k(je(e,t),r))),qe=c(((e,r,t)=>k(je(e,r),je(e,t)))),Ae=/^(.*?)(8|16|32|64)(Clamped)?Array$/,Ee=(e,r=!1)=>{const t=d(e);switch(t){case"Null":case"String":case"Number":case"Boolean":case"Symbol":return e;case"Array":return r?[...e]:_e(Ee,e);case"Object":if(r)return{...e};const s={};for(let r in e)s[r]=Ee(e[r]);return s;default:return Ae.test(t)?e.constructor.from(e):e}},Se=c(((e,r,t)=>b(e,Ee(r),t))),ke=p(((e,r)=>$e(e,r))),Pe=p(((e,r)=>{const t={};for(const s of e)s in r&&(t[s]=r[s]);return t})),ve=p(((e,r)=>$e(((r,t)=>!_(t,e)),r))),De=e=>Se(((e,r)=>ie(...r,e)),{},e),Ne=p(((e,r)=>e.concat(r))),Be=p(((e,r)=>r.join(e))),_e=p(((e,r)=>r.map(e))),Ce=p(((e,r)=>r.forEach(e))),Te=c(((e,r,t)=>r(t)&&e(t))),Ue=c(((e,r,t)=>t.replace(e,r))),$e=p(((e,r)=>f(r)?r.filter(e):D(De,$e((([r,t])=>e(t,r))),J)(r))),ze=p(((e,r)=>Object.assign({},e,r))),Fe=p(((e,r)=>j(Ee(e),Ee(r)))),Ie=p(((e,r)=>O(Ee(e),Ee(r)))),Ke=p(((e,r)=>q(Ee(e),Ee(r)))),Le=c(((e,r,t)=>ie(e,r(t[e]),t))),Xe=p(((e,r)=>A(e,Object.assign({},r)))),Ge=(()=>{const e=async(r,t,s)=>{s<t.length&&(await r(t[s]),await e(r,t,++s))};return p(((r,t)=>e(r,t,0)))})(),He=p((async(e,r)=>(await e(r),r))),Je=p(((e,r)=>Promise.all(r.map(e)))),Me=(()=>{const e=async(r,t,s)=>~s?await e(r,await r[s](t),--s):t;return(...r)=>t=>e(r,t,r.length-1)})(),Qe=X,Re=X,Ve=X;exports.F=Y,exports.T=W,exports.__=e,exports.add=$,exports.all=fe,exports.allPass=me,exports.always=L,exports.any=he,exports.anyPass=de,exports.append=R,exports.assoc=ie,exports.assocPath=ue,exports.bind=N,exports.both=Te,exports.clone=Ee,exports.cloneShallow=e=>Ee(e,!0),exports.complement=H,exports.compose=D,exports.composeAsync=Me,exports.concat=Ne,exports.cond=le,exports.curry=o,exports.curry2=p,exports.curry3=c,exports.echo=Ve,exports.empty=e=>{switch(d(e)){case"String":return"";case"Object":return{};case"Array":return[];default:return a}},exports.equals=k,exports.explore=(e,r="log")=>Q((t=>console[r](e,t))),exports.filter=$e,exports.find=ce,exports.findIndex=ae,exports.flip=F,exports.forEach=Ce,exports.forEachAsync=Je,exports.forEachSerial=Ge,exports.fromPairs=De,exports.genBy=re,exports.getTmpl=e=>{const r=[],t=[],s=e.length;let o,n,p=0,c=0,a=!1;for(p=0;p<s;p++)switch(o=e[p],o){case"{":a=!0,c=p;break;case"}":a=!1,r.push(""),t.push(e.slice(c+1,p));break;default:a||(n=r.length-1,n<0&&(r.push(""),n++),r[n]+=o)}return e=>{const s=[],o=r.length-1;for(const n in r)p=+n,s.push(r[p]),p!==o&&s.push(je(t[p].split("."),e));return s.join("")}},exports.gt=te,exports.gte=oe,exports.head=T,exports.identity=X,exports.ifElse=P,exports.includes=_,exports.indexOf=xe,exports.intersection=ee,exports.isEmpty=e=>{switch(d(e)){case"String":case"Array":return 0==K(e);case"Object":for(const r in e)return!1;return!0;default:return null}},exports.isNil=I,exports.join=Be,exports.keys=e=>Object.keys(e),exports.last=e=>e[K(e)-1],exports.length=K,exports.lt=se,exports.lte=ne,exports.map=_e,exports.mapKeys=Xe,exports.memoize=e=>{let r,t=!1;return()=>t?r:(t=!0,r=e())},exports.mergeDeep=Fe,exports.mergeDeepAdd=Ke,exports.mergeDeepX=Ie,exports.mergeShallow=ze,exports.mirror=Qe,exports.not=G,exports.nth=B,exports.omit=ve,exports.once=e=>{let r,t=!1;return(...s)=>t?r:(t=!0,r=e(...s))},exports.overProp=Le,exports.path=je,exports.pathEq=Oe,exports.pathOr=we,exports.pathsEq=qe,exports.pick=Pe,exports.pickBy=ke,exports.prop=ye,exports.propEq=ge,exports.propsEq=be,exports.qappend=y,exports.qassoc=g,exports.qfilter=E,exports.qindexOf=S,exports.qmapKeys=A,exports.qmergeDeep=j,exports.qmergeDeepAdd=q,exports.qmergeDeepX=O,exports.qreduce=b,exports.range=Z,exports.reduce=Se,exports.reflect=Re,exports.replace=Ue,exports.reverse=e=>D((r=>Se(((t,s,o)=>y(e[r-o],t)),[],e)),$(-1),K)(e),exports.sizeof=e=>{if("Object"===d(e)){let r=0;for(let t in e)r++;return r}return K(e)},exports.slice=C,exports.sort=pe,exports.split=V,exports.subtract=z,exports.tail=U,exports.tap=Q,exports.test=M,exports.toLower=e=>e.toLowerCase(),exports.toPairs=J,exports.toUpper=e=>e.toUpperCase(),exports.trim=e=>e.trim(),exports.type=d,exports.uncurry=e=>(...r)=>b(((e,r)=>e?e(r):e),e,r),exports.uniq=e=>b(((e,r)=>_(r,e)?e:y(r,e)),[],e),exports.values=e=>Object.values(e),exports.waitAll=e=>Promise.all(e),exports.waitTap=He,exports.when=v;
