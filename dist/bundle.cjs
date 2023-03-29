"use strict";const e=Symbol("Placeholder"),r=r=>{let t=0;for(const s of r)s!==e&&t++;return t},t=(r,t)=>{const s=r.length,o=r.slice(),p=t.length;let n=p,x=0;for(;n&&x<s;x++)o[x]===e&&(o[x]=t[p-n],n--);for(x=s;n;x++,n--)o[x]=t[p-n];return o},s=(e,o,p)=>{const n=e.length-o.length-r(p);if(n<1)return e(...t(o,p));{const r=(...r)=>s(e,t(o,p),r);return r.$args_left=n,r}},o=e=>(...t)=>e.length>r(t)?s(e,[],t):e(...t),p=r=>function(t){return t===e?r:r(t)};function n(r){return function(t,s){const o=t===e,n=arguments.length;if(1===n&&o)throw new Error("Senseless placeholder usage.");return arguments.length>1?o?p((e=>r(e,s))):r(t,s):e=>r(t,e)}}function x(e){return o(e)}const c=void 0,a=1/0,l=e=>typeof e,i=e=>null===e,u=e=>"number"==l(e),f=e=>Array.isArray(e),h=e=>"function"===l(e),m=e=>!i(e)&&"object"===l(e),d={u:"U",b:"B",n:"N",s:"S",f:"F"},y=e=>{const r=l(e);return"object"===r?i(e)?"Null":e.constructor.name:d[r[0]]+r.slice(1)},g=n(((e,r)=>y(r)===e)),b=e=>(...r)=>r[e],w=n(((e,r)=>e===r)),q=n(((e,r)=>e==r)),j=n(((e,r)=>{const t=y(e);if(w(t,y(r))&&(w(t,"Object")||w(t,"Array"))){if(i(e)||i(r))return w(e,r);if(w(e,r))return!0;for(const t of[e,r])for(const s in t)if(!(w(t,r)&&s in e||w(t,e)&&s in r&&j(e[s],r[s])))return!1;return!0}return w(e,r)})),O=o(((e,r,t,s)=>e(s)?r(s):t(s))),A=x(((e,r,t)=>O(e,r,M,t))),S=(...r)=>(...t)=>{let s,o=!0;for(let p=H(r)-1;p>-1;p--)o?(o=!1,s=r[p](...t)):s=s===e?r[p]():r[p](s);return s},E=n(((e,r)=>e.bind(r))),k=n(((e,r)=>r[e])),z=n(((e,r)=>{if((e=>"string"===l(e))(r))return r.includes(e);for(const t of r)if(j(t,e))return!0;return!1})),P=x(((e,r,t)=>t.slice(e,u(r)?r:a))),v=e=>n(((r,t)=>e(t,r))),D=k(0),N=P(1,a),B=n(((e,r)=>e+r)),T=n(((e,r)=>r-e)),_=n(((e,r)=>e*r)),C=n(((e,r)=>e>r)),F=n(((e,r)=>e<r)),I=n(((e,r)=>r>=e)),U=n(((e,r)=>r<=e)),$=n(((e,r)=>r.sort(e))),K=n(((e,r)=>r.find(e))),L=n(((e,r)=>r.findIndex(e))),W=n(((e,r)=>L(j(e),r))),X=n(((e,r)=>e/r)),G=e=>i(e)||(e=>e===c)(e),H=e=>e.length,J=e=>()=>e,M=e=>e,Q=e=>!e,R=n(((e,r)=>e.test(r))),V=n(((e,r)=>(e(r),r))),Y=n(((e,r)=>[...r,e])),Z=n(((e,r)=>[...r,e])),ee=n(((e,r)=>r.flat(e))),re=n(((e,r)=>r.split(e))),te=J(!0),se=J(!1),oe=n(((e,r)=>r(...e))),pe=o(((e,r,t)=>t[r](...e))),ne=e=>(...r)=>{const t=e(...r),s=h(t);return!s||s&&t.$args_left<=0?Q(t):ne(t)},xe=n(((e,r)=>ae(B(e),r-e))),ce=n(((e,r)=>e.filter(v(z)(r)))),ae=n(((e,r)=>[...Array(r)].map(((r,t)=>e(t))))),le=n(((e,r)=>{for(const[t,s]of e)if(t(r))return s(r)})),ie=x(((e,r,t)=>({...t,[e]:r}))),ue=x(((e,r,t)=>S((s=>ie(s,H(e)<2?r:ue(P(1,a,e),r,m(t[s])?t[s]:{}),t)),D)(e))),fe=n(((e,r)=>r.every(e))),he=n(((e,r)=>r.some(e))),me=n(((e,r)=>e.every((e=>e(r))))),de=n(((e,r)=>e.some((e=>e(r))))),ye=n(((e,r)=>r[e])),ge=x(((e,r,t)=>j(t[e],r))),be=x(((e,r,t)=>j(r[e],t[e]))),we=x(((e,r,t)=>O(H,(()=>G(t)?e:S(O(G,J(e),(t=>we(e,P(1,a,r),t))),v(ye)(t),D)(r)),J(t),r))),qe=we(c),je=x(((e,r,t)=>j(qe(e,t),r))),Oe=x(((e,r,t)=>j(qe(e,r),qe(e,t)))),Ae=/^(.*?)(8|16|32|64)(Clamped)?Array$/,Se=(e,r=!1)=>{const t=y(e);switch(t){case"Null":case"String":case"Number":case"Boolean":case"Symbol":return e;case"Array":return r?[...e]:Ne(S(Se,b(0)),e);case"Object":if(r)return{...e};const s={};for(let r in e)s[r]=Se(e[r]);return s;default:return Ae.test(t)?e.constructor.from(e):e}},Ee=x(((e,r,t)=>or(e,Se(r),t))),ke=n(((e,r)=>Ce(e,r))),ze=n(((e,r)=>{const t={};for(const s of e)s in r&&(t[s]=r[s]);return t})),Pe=n(((e,r)=>Ce(((r,t)=>!z(t,e)),r))),ve=n(((e,r)=>r.concat(e))),De=n(((e,r)=>r.join(e))),Ne=n(((e,r)=>r.map(e))),Be=n(((e,r)=>r.forEach(e))),Te=x(((e,r,t)=>r(t)&&e(t))),_e=x(((e,r,t)=>t.replace(e,r))),Ce=n(((e,r)=>f(r)?r.filter(e):ur(e,{...r}))),Fe=n(((e,r)=>Object.assign({},e,r))),Ie=n(((e,r)=>nr(Se(e),Se(r)))),Ue=n(((e,r)=>xr(Se(e),Se(r)))),$e=n(((e,r)=>cr(Se(e),Se(r)))),Ke=x(((e,r,t)=>ie(e,r(t[e]),t))),Le=n(((e,r)=>lr(e,Object.assign({},r)))),We=n(((e,r)=>Ne(((e,t)=>[e,r[t]]),e))),Xe=n(((e,r)=>Ee(((e,t,s)=>ie(t,r[s],e)),{},e))),Ge=x(((e,r,t)=>Ne(((r,s)=>e(r,t[s])),r))),He=(()=>{const e=async(r,t,s)=>{s<t.length&&(await r(t[s]),await e(r,t,++s))};return n(((r,t)=>e(r,t,0)))})(),Je=n((async(e,r)=>(await e(r),r))),Me=n(((e,r)=>Promise.all(r.map(e)))),Qe=(()=>{const e=async(r,t,s)=>~s?await e(r,[await r[s](...t)],--s):D(t);return(...r)=>(...t)=>e(r,t,r.length-1)})(),Re=M,Ve=M,Ye=M,Ze=ne,er=Y,rr=he,tr=n(((e,r)=>(r.push(e),r))),sr=x(((e,r,t)=>(t[e]=r,t))),or=x(((e,r,t)=>t.reduce(e,r))),pr=x(((e,r,t)=>{for(let s in t)switch(y(t[s])){case"Array":if(e>1&&"Array"===y(r[s]))switch(e){case 2:const o=r[s],p=t[s];for(const r in p)o[r]?pr(e,o[r],p[r]):o[r]=p[r];break;case 3:r[s].push(...t[s])}else r[s]=t[s];break;case"Object":if("Object"===y(r[s])){pr(e,r[s],t[s]);break}default:r[s]=t[s]}return r})),nr=pr(1),xr=pr(2),cr=pr(3),ar=n(((e,r)=>Object.assign(e,r))),lr=n(((e,r)=>{let t,s,o,p;for(t in e)t in r&&(s=e[t],[o,p]=h(s)?s(r[t],t,r):[s,r[t]],r[G(o)?t:o]=p,t!==o&&delete r[t]);return r})),ir=n(((e,r)=>{for(let t in r)r[t]=e(r[t],+t,r);return r})),ur=n(((e,r)=>{const t=f(r);let s,o;t&&(s=0,o=[]);for(let s in r)e(r[s],s)||(t?o.push(+s):delete r[s]);if(t)for(const e of o)r.splice(e-s++,1);return r})),fr=e=>{let r;for(const t in e)r=e[t],m(r)&&fr(r);return Object.freeze(e)},hr=e=>Object.freeze(e),mr=n(((e,r)=>r.unshift(e))),dr=x(((e,r,t)=>{const s=e[0];return sr(s,e.length<2?r:dr(e.slice(1),r,m(t[s])?t[s]:{}),t)}));exports.F=se,exports.T=te,exports.__=e,exports.add=B,exports.all=fe,exports.allPass=me,exports.always=J,exports.any=he,exports.anyPass=de,exports.append=Y,exports.assoc=ie,exports.assocPath=ue,exports.bind=E,exports.both=Te,exports.callFrom=pe,exports.callWith=oe,exports.clone=Se,exports.cloneShallow=e=>Se(e,!0),exports.complement=ne,exports.compose=S,exports.composeAsync=Qe,exports.concat=ve,exports.cond=le,exports.curry=o,exports.curry2=n,exports.curry3=x,exports.divide=X,exports.echo=Ye,exports.empty=e=>{switch(y(e)){case"String":return"";case"Object":return{};case"Array":return[];default:return c}},exports.eq=w,exports.equals=j,exports.explore=(e,r="log")=>V((t=>console[r](e,t))),exports.filter=Ce,exports.find=K,exports.findIndex=L,exports.flat=e=>e.flat(a),exports.flatShallow=e=>e.flat(),exports.flatTo=ee,exports.flip=v,exports.forEach=Be,exports.forEachAsync=Me,exports.forEachSerial=He,exports.freeze=e=>fr(Se(e)),exports.freezeShallow=e=>hr(Se(e)),exports.fromPairs=e=>Object.fromEntries(e),exports.genBy=ae,exports.getTmpl=e=>{const r=[],t=[],s=e.length;let o,p,n,x=0,c=0,a=!1,l=D(e),i=!1;for(x=0;x<s;x++)switch(o=e[x],o){case"{":if(!l){a=!0,c=x;break}case"}":if(!l){a=!1,r.push(""),t.push(e.slice(c+1,x));break}default:n=e[x+1],i="\\"===o,a||i&&("{"===n||"}"===n)||(p=r.length-1,p<0&&(r.push(""),p++),r[p]+=o),l=i}return e=>{const s=[],o=r.length-1;for(const p in r)x=+p,s.push(r[x]),x!==o&&s.push(qe(t[x].split("."),e));return s.join("")}},exports.gt=C,exports.gte=I,exports.head=D,exports.identity=M,exports.ifElse=O,exports.includes=z,exports.indexOf=W,exports.intersection=ce,exports.isEmpty=e=>{switch(y(e)){case"String":case"Array":return 0==H(e);case"Object":for(const r in e)return!1;return!0;default:return null}},exports.isNil=G,exports.join=De,exports.keys=e=>Object.keys(e),exports.last=e=>e[H(e)-1],exports.length=H,exports.lt=F,exports.lte=U,exports.map=Ne,exports.mapKeys=Le,exports.memoize=e=>{let r,t=!1;return()=>t?r:(t=!0,r=e())},exports.mergeDeep=Ie,exports.mergeDeepAdd=$e,exports.mergeDeepX=Ue,exports.mergeShallow=Fe,exports.mirror=Re,exports.multiply=_,exports.noop=()=>{},exports.not=Q,exports.notf=Ze,exports.nth=k,exports.omit=Pe,exports.once=e=>{let r,t=!1;return(...s)=>t?r:(t=!0,r=e(...s))},exports.overProp=Ke,exports.path=qe,exports.pathEq=je,exports.pathOr=we,exports.pathsEq=Oe,exports.pick=ze,exports.pickBy=ke,exports.prepend=Z,exports.prop=ye,exports.propEq=ge,exports.propsEq=be,exports.push=er,exports.qappend=tr,exports.qassoc=sr,exports.qassocPath=dr,exports.qempty=e=>{if(f(e))e.splice(0);else for(const r in e)delete e[r];return e},exports.qfilter=ur,exports.qfreeze=fr,exports.qfreezeShallow=hr,exports.qmap=ir,exports.qmapKeys=lr,exports.qmergeDeep=nr,exports.qmergeDeepAdd=cr,exports.qmergeDeepX=xr,exports.qmergeShallow=ar,exports.qprepend=mr,exports.qreduce=or,exports.range=xe,exports.reduce=Ee,exports.reflect=Ve,exports.replace=_e,exports.reverse=e=>S((r=>Ee(((t,s,o)=>tr(e[r-o],t)),[],e)),B(-1),H)(e),exports.sizeof=e=>{if("Object"===y(e)){let r=0;for(let t in e)r++;return r}return H(e)},exports.slice=P,exports.some=rr,exports.sort=$,exports.split=re,exports.subtract=T,exports.tail=N,exports.take=b,exports.tap=V,exports.test=R,exports.toLower=e=>e.toLowerCase(),exports.toPairs=e=>Object.entries(e),exports.toUpper=e=>e.toUpperCase(),exports.trim=e=>e.trim(),exports.type=y,exports.typeIs=g,exports.uncurry=e=>(...r)=>or(((e,r)=>e?e(r):e),e,r),exports.uniq=e=>or(((e,r)=>z(r,e)?e:tr(r,e)),[],e),exports.values=e=>Object.values(e),exports.waitAll=e=>Promise.all(e),exports.waitTap=Je,exports.weakEq=q,exports.when=A,exports.zip=We,exports.zipObj=Xe,exports.zipWith=Ge;
