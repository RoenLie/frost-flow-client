/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(t,i,e,s){for(var r,o=arguments.length,h=o<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,e):s,n=t.length-1;n>=0;n--)(r=t[n])&&(h=(o<3?r(h):o>3?r(i,e,h):r(i,e))||h);return o>3&&h&&Object.defineProperty(i,e,h),h}function i(t,i,e,s){if("a"===e&&!s)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof i?t!==i||!s:!i.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===e?s:"a"===e?s.call(t):s?s.value:i.get(t)}function e(t,i,e,s,r){if("m"===s)throw new TypeError("Private method is not writable");if("a"===s&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof i?t!==i||!r:!i.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===s?r.call(t,e):r?r.value=e:i.set(t,e),e
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const s=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol();class o{constructor(t,i){if(i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return s&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const h=new Map,n=t=>{let i=h.get(t);return void 0===i&&h.set(t,i=new o(t,r)),i},l=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return(t=>n("string"==typeof t?t:t+""))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var a,d,c,u;const p={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=null!==t;break;case Number:e=null===t?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch(t){e=null}}return e}},v=(t,i)=>i!==t&&(i==i||t==t),w={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:v};class f extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(t){var i;null!==(i=this.v)&&void 0!==i||(this.v=[]),this.v.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,e)=>{const s=this.Πp(e,i);void 0!==s&&(this.Πm.set(s,e),t.push(s))})),t}static createProperty(t,i=w){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const e="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,e,i);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,i,e){return{get(){return this[i]},set(s){const r=this[t];this[i]=s,this.requestUpdate(t,r,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||w}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const e of i)this.createProperty(e,t[e])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(l(t))}else void 0!==t&&i.push(l(t));return i}static Πp(t,i){const e=i.attribute;return!1===e?void 0:"string"==typeof e?e:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,e;(null!==(i=this.ΠU)&&void 0!==i?i:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(e=t.hostConnected)||void 0===e||e.call(t))}removeController(t){var i;null===(i=this.ΠU)||void 0===i||i.splice(this.ΠU.indexOf(t)>>>0,1)}Π_(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this.Πi.set(i,this[i]),delete this[i])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{s?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((i=>{const e=document.createElement("style");e.textContent=i.cssText,t.appendChild(e)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)})),this.Πo=new Promise((t=>this.Πl=t))}attributeChangedCallback(t,i,e){this.K(t,e)}Πj(t,i,e=w){var s,r;const o=this.constructor.Πp(t,e);if(void 0!==o&&!0===e.reflect){const h=(null!==(r=null===(s=e.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==r?r:p.toAttribute)(i,e.type);this.Πh=t,null==h?this.removeAttribute(o):this.setAttribute(o,h),this.Πh=null}}K(t,i){var e,s,r;const o=this.constructor,h=o.Πm.get(t);if(void 0!==h&&this.Πh!==h){const t=o.getPropertyOptions(h),n=t.converter,l=null!==(r=null!==(s=null===(e=n)||void 0===e?void 0:e.fromAttribute)&&void 0!==s?s:"function"==typeof n?n:null)&&void 0!==r?r:p.fromAttribute;this.Πh=h,this[h]=l(i,t.type),this.Πh=null}}requestUpdate(t,i,e){let s=!0;void 0!==t&&(((e=e||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],i)?(this.L.has(t)||this.L.set(t,i),!0===e.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,e))):s=!1),!this.isUpdatePending&&s&&(this.Πg=this.Πq())}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(t){Promise.reject(t)}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,i)=>this[i]=t)),this.Πi=void 0);let i=!1;const e=this.L;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(e)):this.Π$()}catch(t){throw i=!1,this.Π$(),t}i&&this.E(e)}willUpdate(t){}E(t){var i;null===(i=this.ΠU)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}Π$(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return!0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,i)=>this.Πj(i,this[i],t))),this.Πk=void 0),this.Π$()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m,g,b,y;f.finalized=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null===(d=(a=globalThis).reactiveElementPlatformSupport)||void 0===d||d.call(a,{ReactiveElement:f}),(null!==(c=(u=globalThis).reactiveElementVersions)&&void 0!==c?c:u.reactiveElementVersions=[]).push("1.0.0-rc.2");const x=globalThis.trustedTypes,$=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,W=`lit$${(Math.random()+"").slice(9)}$`,k="?"+W,M=`<${k}>`,S=document,R=(t="")=>S.createComment(t),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,F=/>/g,T=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,j=/'/g,E=/"/g,O=/^(?:script|style|textarea)$/i,D=(t=>(i,...e)=>({_$litType$:t,strings:i,values:e}))(1),L=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),P=new WeakMap,U=S.createTreeWalker(S,129,null,!1),q=(t,i)=>{const e=t.length-1,s=[];let r,o=2===i?"<svg>":"",h=A;for(let i=0;i<e;i++){const e=t[i];let n,l,a=-1,d=0;for(;d<e.length&&(h.lastIndex=d,l=h.exec(e),null!==l);)d=h.lastIndex,h===A?"!--"===l[1]?h=z:void 0!==l[1]?h=F:void 0!==l[2]?(O.test(l[2])&&(r=RegExp("</"+l[2],"g")),h=T):void 0!==l[3]&&(h=T):h===T?">"===l[0]?(h=null!=r?r:A,a=-1):void 0===l[1]?a=-2:(a=h.lastIndex-l[2].length,n=l[1],h=void 0===l[3]?T:'"'===l[3]?E:j):h===E||h===j?h=T:h===z||h===F?h=A:(h=T,r=void 0);const c=h===T&&t[i+1].startsWith("/>")?" ":"";o+=h===A?e+M:a>=0?(s.push(n),e.slice(0,a)+"$lit$"+e.slice(a)+W+c):e+W+(-2===a?(s.push(void 0),i):c)}const n=o+(t[e]||"<?>")+(2===i?"</svg>":"");return[void 0!==$?$.createHTML(n):n,s]};class I{constructor({strings:t,_$litType$:i},e){let s;this.parts=[];let r=0,o=0;const h=t.length-1,n=this.parts,[l,a]=q(t,i);if(this.el=I.createElement(l,e),U.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(s=U.nextNode())&&n.length<h;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const i of s.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(W)){const e=a[o++];if(t.push(i),void 0!==e){const t=s.getAttribute(e.toLowerCase()+"$lit$").split(W),i=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?J:"?"===i[1]?Z:"@"===i[1]?X:V})}else n.push({type:6,index:r})}for(const i of t)s.removeAttribute(i)}if(O.test(s.tagName)){const t=s.textContent.split(W),i=t.length-1;if(i>0){s.textContent=x?x.emptyScript:"";for(let e=0;e<i;e++)s.append(t[e],R()),U.nextNode(),n.push({type:2,index:++r});s.append(t[i],R())}}}else if(8===s.nodeType)if(s.data===k)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(W,t+1));)n.push({type:7,index:r}),t+=W.length-1}r++}}static createElement(t,i){const e=S.createElement("template");return e.innerHTML=t,e}}function _(t,i,e=t,s){var r,o,h,n;if(i===L)return i;let l=void 0!==s?null===(r=e.Σi)||void 0===r?void 0:r[s]:e.Σo;const a=C(i)?void 0:i._$litDirective$;return(null==l?void 0:l.constructor)!==a&&(null===(o=null==l?void 0:l.O)||void 0===o||o.call(l,!1),void 0===a?l=void 0:(l=new a(t),l.T(t,e,s)),void 0!==s?(null!==(h=(n=e).Σi)&&void 0!==h?h:n.Σi=[])[s]=l:e.Σo=l),void 0!==l&&(i=_(t,l.S(t,i.values),l,s)),i}class B{constructor(t,i){this.l=[],this.N=void 0,this.D=t,this.M=i}u(t){var i;const{el:{content:e},parts:s}=this.D,r=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:S).importNode(e,!0);U.currentNode=r;let o=U.nextNode(),h=0,n=0,l=s[0];for(;void 0!==l;){if(h===l.index){let i;2===l.type?i=new G(o,o.nextSibling,this,t):1===l.type?i=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(i=new Y(o,this,t)),this.l.push(i),l=s[++n]}h!==(null==l?void 0:l.index)&&(o=U.nextNode(),h++)}return r}v(t){let i=0;for(const e of this.l)void 0!==e&&(void 0!==e.strings?(e.I(t,e,i),i+=e.strings.length-2):e.I(t[i])),i++}}class G{constructor(t,i,e,s){this.type=2,this.N=void 0,this.A=t,this.B=i,this.M=e,this.options=s}setConnected(t){var i;null===(i=this.P)||void 0===i||i.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,i=this){t=_(this,t,i),C(t)?t===N||null==t||""===t?(this.H!==N&&this.R(),this.H=N):t!==this.H&&t!==L&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):(t=>{var i;return H(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])})(t)?this.g(t):this.m(t)}k(t,i=this.B){return this.A.parentNode.insertBefore(t,i)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const i=this.A.nextSibling;null!==i&&3===i.nodeType&&(null===this.B?null===i.nextSibling:i===this.B.previousSibling)?i.data=t:this.$(S.createTextNode(t)),this.H=t}_(t){var i;const{values:e,_$litType$:s}=t,r="number"==typeof s?this.C(t):(void 0===s.el&&(s.el=I.createElement(s.h,this.options)),s);if((null===(i=this.H)||void 0===i?void 0:i.D)===r)this.H.v(e);else{const t=new B(r,this),i=t.u(this.options);t.v(e),this.$(i),this.H=t}}C(t){let i=P.get(t.strings);return void 0===i&&P.set(t.strings,i=new I(t)),i}g(t){H(this.H)||(this.H=[],this.R());const i=this.H;let e,s=0;for(const r of t)s===i.length?i.push(e=new G(this.k(R()),this.k(R()),this,this.options)):e=i[s],e.I(r),s++;s<i.length&&(this.R(e&&e.B.nextSibling,s),i.length=s)}R(t=this.A.nextSibling,i){var e;for(null===(e=this.P)||void 0===e||e.call(this,!1,!0,i);t&&t!==this.B;){const i=t.nextSibling;t.remove(),t=i}}}class V{constructor(t,i,e,s,r){this.type=1,this.H=N,this.N=void 0,this.V=void 0,this.element=t,this.name=i,this.M=s,this.options=r,e.length>2||""!==e[0]||""!==e[1]?(this.H=Array(e.length-1).fill(N),this.strings=e):this.H=N}get tagName(){return this.element.tagName}I(t,i=this,e,s){const r=this.strings;let o=!1;if(void 0===r)t=_(this,t,i,0),o=!C(t)||t!==this.H&&t!==L,o&&(this.H=t);else{const s=t;let h,n;for(t=r[0],h=0;h<r.length-1;h++)n=_(this,s[e+h],i,h),n===L&&(n=this.H[h]),o||(o=!C(n)||n!==this.H[h]),n===N?t=N:t!==N&&(t+=(null!=n?n:"")+r[h+1]),this.H[h]=n}o&&!s&&this.W(t)}W(t){t===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class J extends V{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===N?void 0:t}}class Z extends V{constructor(){super(...arguments),this.type=4}W(t){t&&t!==N?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class X extends V{constructor(){super(...arguments),this.type=5}I(t,i=this){var e;if((t=null!==(e=_(this,t,i,0))&&void 0!==e?e:N)===L)return;const s=this.H,r=t===N&&s!==N||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==N&&(s===N||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var i,e;"function"==typeof this.H?this.H.call(null!==(e=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==e?e:this.element,t):this.H.handleEvent(t)}}class Y{constructor(t,i,e){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=i,this.options=e}I(t){_(this,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var K,Q,tt,it,et,st;null===(g=(m=globalThis).litHtmlPlatformSupport)||void 0===g||g.call(m,I,G),(null!==(b=(y=globalThis).litHtmlVersions)&&void 0!==b?b:y.litHtmlVersions=[]).push("2.0.0-rc.3"),(null!==(K=(st=globalThis).litElementVersions)&&void 0!==K?K:st.litElementVersions=[]).push("3.0.0-rc.2");class rt extends f{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var t,i;const e=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=e.firstChild),e}update(t){const i=this.render();super.update(t),this.Φt=((t,i,e)=>{var s,r;const o=null!==(s=null==e?void 0:e.renderBefore)&&void 0!==s?s:i;let h=o._$litPart$;if(void 0===h){const t=null!==(r=null==e?void 0:e.renderBefore)&&void 0!==r?r:null;o._$litPart$=h=new G(i.insertBefore(R(),t),t,void 0,e)}return h.I(t),h})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1)}render(){return L}}rt.finalized=!0,rt._$litElement$=!0,null===(tt=(Q=globalThis).litElementHydrateSupport)||void 0===tt||tt.call(Q,{LitElement:rt}),null===(et=(it=globalThis).litElementPlatformSupport)||void 0===et||et.call(it,{LitElement:rt});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(e){e.createProperty(i.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(e){e.createProperty(i.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht=1,nt=t=>(...i)=>({_$litDirective$:t,values:i});class lt{constructor(t){}T(t,i,e){this.Σdt=t,this.M=i,this.Σct=e}S(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const at=nt(class extends lt{constructor(t){var i;if(super(t),t.type!==ht||"class"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).filter((i=>t[i])).join(" ")}update(t,[i]){if(void 0===this.bt){this.bt=new Set;for(const t in i)i[t]&&this.bt.add(t);return this.render(i)}const e=t.element.classList;this.bt.forEach((t=>{t in i||(e.remove(t),this.bt.delete(t))}));for(const t in i){const s=!!i[t];s!==this.bt.has(t)&&(s?(e.add(t),this.bt.add(t)):(e.remove(t),this.bt.delete(t)))}return L}}),dt=nt(class extends lt{constructor(t){var i;if(super(t),t.type!==ht||"style"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((i,e)=>{const s=t[e];return null==s?i:i+`${e=e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(t,[i]){const{style:e}=t.element;if(void 0===this.St){this.St=new Set;for(const t in i)this.St.add(t);return this.render(i)}this.St.forEach((t=>{null==i[t]&&(this.St.delete(t),t.includes("-")?e.removeProperty(t):e[t]="")}));for(const t in i){const s=i[t];null!=s&&(this.St.add(t),t.includes("-")?e.setProperty(t,s):e[t]=s)}return L}});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ct,ut,pt,vt,wt;class ft{constructor(t){ct.set(this,[]),ut.set(this,void 0),pt.set(this,void 0),e(this,ut,t,"f"),e(this,pt,t,"f")}get value(){return i(this,ut,"f")}get previousValue(){return i(this,pt,"f")}next(t){void 0!==t?(e(this,pt,JSON.parse(JSON.stringify(i(this,ut,"f"))),"f"),e(this,ut,t,"f"),this.publish()):this.publish()}subscribe(t){const e=i(this,ct,"f").push(t);return{unsubscribe:()=>this.unsubscribe(e-1)}}unsubscribe(t){i(this,ct,"f").splice(t,1)}publish(){i(this,ct,"f").forEach((t=>{(async()=>{t(i(this,ut,"f"),i(this,pt,"f"))})()}))}}function mt(t,i=300){let e;return(...s)=>{clearTimeout(e),e=setTimeout((()=>{t.apply(this,s)}),i)}}ct=new WeakMap,ut=new WeakMap,pt=new WeakMap;class gt{constructor(){this.subscriptions=[]}subscribe(){this.subscriptions.forEach((t=>t[0].addEventListener(t[1],t[2])))}unsubscribe(){this.subscriptions.forEach((t=>t[0].removeEventListener(t[1],t[2]))),this.subscriptions.length=0}}class bt{constructor(t){this.root=t}toggleColumn(t){const{columnDefinitions:i}=this.root,e=i.custom[t].hidden;i.custom={...i.custom,[t]:{...i.custom[t],hidden:!e}},this.root.publishers.hideColumn.publish(),this.root.rerender()}}class yt{constructor(){vt.set(this,void 0),this.merged=[]}get custom(){return i(this,vt,"f")}set custom(t){e(this,vt,t,"f"),this.merged=this.base.map((t=>({...this.default,...t,...this.custom[t.field]}))).sort(((t,i)=>t.order-i.order))}createCustomColDefs(){return this.base.reduce(((t,i,e)=>{const s=i.width||i.minWidth||this.default.minWidth||100,r=e;return t[i.field]={...this.default,...i,width:s,order:r},t}),{})}}vt=new WeakMap;class xt extends gt{constructor(t){super(),this.open=!1,this.xy=[150,150],this.root=t}openMenu(t){this.open=!0,this.xy=[t.clientX-15,t.clientY-15],this.subscriptions.push([window,"mousedown",this.closeMenu.bind(this)]),this.root.rerender(),super.subscribe()}closeMenu(t){t.composedPath().some((t=>"fieldHeader-menu"==t.id))||(this.open=!1,this.xy=[0,0],this.root.rerender(),super.unsubscribe())}}class $t extends gt{constructor(t){super(),this.field="",this.label="",this.moving=!1,this.startPos=[100,100],this.offset=[0,0],this.frameQueue=!1,this.root=t}mousedown(t,i,e){var s;t.preventDefault(),1===t.buttons&&(this.startPos=[t.clientX,t.clientY],this.field=i,this.label=(null===(s=this.root.columnDefinitions.merged.find((t=>t.field==i)))||void 0===s?void 0:s.label)||"",this.subscribe())}mousemove(t){if(t.preventDefault(),1===t.buttons){if(!this.moving){if(![Math.abs(t.clientX-this.startPos[0]),Math.abs(t.clientY-this.startPos[1])].some((t=>t>15)))return;this.moving=!0,function(t,i){if(document.styleSheets&&0!=document.getElementsByTagName("head").length){var e,s;if(document.styleSheets.length>0)for(var r=0,o=document.styleSheets.length;r<o;r++)if(!document.styleSheets[r].disabled){var h=document.styleSheets[r].media;if("string"==(s=typeof h)?""!==h&&-1===h.indexOf("screen")||(e=document.styleSheets[r]):"object"==s&&(""!==h.mediaText&&-1===h.mediaText.indexOf("screen")||(e=document.styleSheets[r])),void 0!==e)break}if(void 0===e){var n=document.createElement("style");for(n.type="text/css",document.getElementsByTagName("head")[0].appendChild(n),r=0;r<document.styleSheets.length;r++)document.styleSheets[r].disabled||(e=document.styleSheets[r]);s=typeof e.media}if("string"===s){for(r=0,o=e.rules.length;r<o;r++)if(e.rules[r].selectorText&&e.rules[r].selectorText.toLowerCase()==t.toLowerCase())return void(e.rules[r].style.cssText=i);e.addRule(t,i)}else if("object"===s){var l=e.cssRules?e.cssRules.length:0;for(r=0;r<l;r++)if(e.cssRules[r].selectorText&&e.cssRules[r].selectorText.toLowerCase()==t.toLowerCase())return void(e.cssRules[r].style.cssText=i);e.insertRule(t+"{"+i+"}",l)}}}(".cursorMove *","cursor:move !important;"),document.body.classList.add("cursorMove")}requestAnimationFrame((()=>{if(this.frameQueue)return;this.frameQueue=!0;const i=[t.clientX-this.startPos[0],t.clientY-this.startPos[1]];this.offset=i,this.root.rerender(),this.frameQueue=!1}))}else this.unsubscribe()}mouseenter(t,i){if(1!==t.buttons)return void this.unsubscribe();const{columnDefinitions:e}=this.root;let s=e.custom[i].moveable;if(s=void 0===s||s,!this.moving||!s||this.field==i)return;const r=e.custom[this.field].order,o=e.custom[i].order;e.custom={...e.custom,[this.field]:{...e.custom[this.field],order:o},[i]:{...e.custom[i],order:r}},this.root.rerender()}mouseup(){this.unsubscribe()}subscribe(){this.subscriptions.push([window,"mousemove",this.mousemove.bind(this)],[window,"mouseup",this.mouseup.bind(this)]),super.subscribe()}unsubscribe(){const{publishers:t}=this.root;this.moving&&t.moveColumn.publish(),this.field="",this.moving=!1,document.body.classList.remove("cursorMove"),super.unsubscribe(),this.root.rerender()}}class Wt extends gt{constructor(t){super(),this.field=null,this.resizing=!1,this.element=null,this.frameQueue=!1,this.root=t}getRects(){var t;return null===(t=this.element)||void 0===t?void 0:t.getBoundingClientRect()}mousedown(t,i){var e;const s=t.target;this.element=null===(e=s.parentElement)||void 0===e?void 0:e.parentElement,this.field=i,this.subscribe()}mousemove(t){t.preventDefault(),requestAnimationFrame((()=>{if(this.frameQueue)return;if(this.frameQueue=!0,1!==t.buttons||null===this.field)return void this.unsubscribe();const i=this.getRects();if(!i)return;this.resizing=!0;const{columnDefinitions:e}=this.root,s=t.x-i.left;e.custom={...e.custom,[this.field]:{...e.custom[this.field],width:s}},this.root.rerender(),this.frameQueue=!1}))}mouseup(){this.unsubscribe()}subscribe(){this.subscriptions.push([window,"mousemove",this.mousemove.bind(this)],[window,"mouseup",this.mouseup.bind(this)]),super.subscribe()}unsubscribe(){const{publishers:t}=this.root;this.resizing&&t.resizeColumn.publish(),super.unsubscribe(),this.field=null,this.resizing=!1,this.frameQueue=!1,this.root.rerender()}}class kt{constructor(t){this.wrapperWidth=0,wt.set(this,0),this.querying=!1,this.rowData=[],this.lastRow=-1,this.checkedRows={},this.allRowsChecked=!1,this.root=t}get startNode(){const t=Math.floor(this.root.scrollApi.scrollTop/this.root.options.rowHeight)-this.availableHeight;return Math.max(0,t)}get visibleNodeCount(){let t=this.rowData.length-this.startNode;t=t>0?t:0;const i=Math.floor(2*this.availableHeight);return Math.min(t,i)}get totalHeight(){return this.rowCount*this.root.options.rowHeight||0}get availableHeight(){return Math.ceil(this.wrapperHeight/this.root.options.rowHeight)||0}get offsetY(){return this.startNode*this.root.options.rowHeight+(this.root.scrollApi.scrollTop>this.wrapperHeight?Math.ceil(this.wrapperHeight/2):0)||0}get startColumn(){return 0}get visibleColumnCount(){return 0}get totalWidth(){return 0}get availableWidth(){return 0}get offsetX(){return 0}get viewSaturated(){return this.rowCount>this.availableHeight||this.lastRow>-1}get sortModel(){return Object.entries(this.root.columnDefinitions.custom).filter((t=>t[1].sort)).map((t=>({sort:t[1].sort,colId:t[1].field})))}get rowCount(){return this.rowData.length}get wrapperHeight(){return i(this,wt,"f")}set wrapperHeight(t){e(this,wt,t,"f"),this.viewSaturated||this.getRows({startRow:0})}checkAllRows(t,i){const e=void 0!==i?i:t.target.checked;this.allRowsChecked=e,this.checkedRows=e?this.rowData.reduce(((t,i,e)=>(t[e]=!0,t)),{}):{},this.root.rerender()}checkRow(t,i){let e=void 0!==i?i:this.checkedRows[t];e=void 0===e||!e,this.root.options.multiSelect||(this.allRowsChecked&&(e=!0),this.allRowsChecked=!1,this.checkedRows={}),this.checkedRows[t]=e,this.checkedRows={...this.checkedRows},!e&&this.allRowsChecked&&(this.allRowsChecked=!1),Object.values(this.checkedRows).filter(Boolean).length==this.rowCount&&(this.allRowsChecked=!0),this.root.rerender()}clickRow(t){const i=t.composedPath(),e=[["data-row-index","index"],["data-field","field"]],s=i.reduce(((t,i)=>{const s=i;if(!s.getAttribute)return t;const r=e.reduce(((t,i)=>{const e=s.getAttribute(i[0]);return e&&(t[0]=i[1],t[1]=e),t}),[]);return r.length&&(t[r[0]]=r[1]),t}),{}),r={data:this.rowData[s.index],field:s.field,index:Number(s.index)};this.root.publishers.rowClick.next(r),this.root.options.selectOnClick&&this.checkRow(r.index)}sortRows(t){const{moveColumnApi:i,resizeColumnApi:e}=this.root;if(i.moving||e.resizing)return;const s=this.root.columnDefinitions.custom[t].sort,r=s?"asc"==s?"desc":null:"asc";this.root.columnDefinitions.custom={...this.root.columnDefinitions.custom,[t]:{...this.root.columnDefinitions.custom[t],sort:r}},this.rowData=[],this.getRows({startRow:0,sortModel:this.sortModel}),this.root.publishers.sortColumn.publish()}getRows(t){if(!this.datasource)return;const i={startRow:t.startRow||0,endRow:(t.startRow||0)+this.root.options.batchSize};t={sortModel:[],filterModel:{},...this.cachedRequest,...i,...t},this.querying||this.lastRow>-1||((async()=>{this.datasource.getRows({request:t,success:this.getRowsSuccess.bind(this),fail:this.getRowsFail.bind(this)})})(),this.querying=!0,this.cachedRequest={...this.cachedRequest,...t})}getRowsSuccess({rowData:t,lastRow:i}){this.lastRow=i,this.querying=!1,this.rowData=[...this.rowData,...t],this.allRowsChecked&&(this.checkedRows=this.rowData.reduce(((t,i,e)=>(t[e]=!0,t)),{})),this.root.publishers.rowData.next({rowData:t,lastRow:i}),this.root.publishers.query.next(this.rowCount),this.root.rerender(),i>0||this.viewSaturated||this.getRows({startRow:this.rowCount})}getRowsFail(){throw"VirtualScrollApi FAILED, method not implemented"}}wt=new WeakMap;class Mt extends gt{constructor(t){super(),this.frameQueue=!1,this.resizing=!1,this.debounceResize=mt(this.resizeEnd.bind(this)),this.calcWrapperHeight=()=>{const t=this.element;t&&requestAnimationFrame((()=>{if(this.frameQueue)return;this.frameQueue=!0,this.resizing||(this.resizing=!0,this.root.rerender()),this.debounceResize();const i=t.getBoundingClientRect();this.root.listApi.wrapperWidth=i.width,this.root.listApi.wrapperHeight=i.height,this.frameQueue=!1}))},this.root=t}resizeEnd(){this.resizing=!1,this.root.rerender()}subscribe(){this.subscriptions.push([window,"resize",this.calcWrapperHeight.bind(this)]),super.subscribe()}}class St extends gt{constructor(t){super(),this.scrollTop=0,this.scrollLeft=0,this.scrollYDirection=0,this.frameQueue=!1,this.root=t}get bottomTrigger(){if("normal"==this.root.mode)return!1;const t=this.element;if(!t)return!1;return Math.ceil(t.offsetHeight+this.scrollTop+2*this.root.options.rowHeight)>t.scrollHeight&&this.scrollYDirection>0}onScroll(t){requestAnimationFrame((()=>{if(this.frameQueue)return;this.frameQueue=!0;const t=this.element;if(!t)return;const{listApi:i}=this.root;if(this.scrollYDirection=Math.sign(t.scrollTop-t.lastScrollTop),this.scrollTop=t.scrollTop,this.scrollLeft=t.scrollLeft,t.lastScrollLeft!=t.scrollLeft)return this.root.rerender(),t.lastScrollLeft=t.scrollLeft,t.lastScrollTop=t.scrollTop,void(this.frameQueue=!1);if(this.bottomTrigger)return i.getRows({startRow:i.rowData.length}),t.lastScrollLeft=t.scrollLeft,t.lastScrollTop=t.scrollTop,void(this.frameQueue=!1);const e=t.querySelector("#viewmover"),s=t.getBoundingClientRect(),r=null==e?void 0:e.getBoundingClientRect(),o=this.root.options.listScrollDebounce?this.root.debounceRender:this.root.rerender;s.top<Number(null==r?void 0:r.top)&&this.scrollTop>0&&o(),s.bottom>Number(null==r?void 0:r.bottom)&&o(),t.lastScrollLeft=t.scrollLeft,t.lastScrollTop=t.scrollTop,this.frameQueue=!1}))}subscribe(){const t=this.element;t&&(t.lastScrollTop=t.scrollTop,this.scrollTop=t.scrollTop,this.scrollLeft=t.scrollLeft,this.subscriptions.push([t,"scroll",this.onScroll.bind(this)]),super.subscribe())}}class Rt{constructor(t){this.root=t}get viewportWrapperStyle(){const{listApi:t,listWrapperApi:i}=this.root;return i.resizing?{height:"auto"}:{willChange:"height",height:`${t.wrapperHeight||300}px`,contentVisibility:"auto",containIntrinsicSize:`${t.wrapperHeight}px`}}get viewportStyle(){const{listApi:t}=this.root;return{willChange:"height",height:`${t.totalHeight}px`}}get viewMoverStyle(){const{listApi:t}=this.root;return{willChange:"transform",transform:`translateY(${t.offsetY}px)`}}get listHeaderStyle(){const{scrollApi:t}=this.root;return{willChange:"transform",transform:`translateX(${-t.scrollLeft}px)`}}get headerMenuStyle(){const{columnMenuApi:t}=this.root;return{left:`${t.xy[0]}px`,top:`${t.xy[1]}px`}}get columnGhostStyle(){const{moveColumnApi:t}=this.root;return{top:t.startPos[1]-5+"px",left:t.startPos[0]-15+"px",willChange:"translate",transform:`translateX(${t.offset[0]}px) translateY(${t.offset[1]}px) translateZ(0)`}}}class Ct{constructor(t){this.root=t}initialize(){const{listWrapperApi:t,scrollApi:i}=this.root;t.element=this.root.hostEl.querySelector("#listRowWrapper"),i.element=this.root.hostEl.querySelector("#viewportWrapper"),i.subscribe(),t.subscribe(),t.calcWrapperHeight()}datasource(t){this.root.listApi.datasource=t}columnDefinitions(t,i){const{columnDefinitions:e}=this.root;e.default=t,e.base=i,e.custom=e.createCustomColDefs()}}class Ht{constructor(){this.mode="ssr",this.rerender=()=>{},this.debounceRender=mt((()=>this.rerender()),100).bind(this),this.setupApi=new Ct(this),this.listApi=new kt(this),this.scrollApi=new St(this),this.listWrapperApi=new Mt(this),this.columnApi=new bt(this),this.columnDefinitions=new yt,this.columnMenuApi=new xt(this),this.moveColumnApi=new $t(this),this.resizeColumnApi=new Wt(this),this.styleApi=new Rt(this),this.publishers={moveColumn:new ft([]),resizeColumn:new ft([]),hideColumn:new ft([]),sortColumn:new ft([]),rowData:new ft({rowData:[],lastRow:-1}),query:new ft(0),rowClick:new ft({data:{},field:"",index:0})},this.options={listScrollDebounce:!1,multiSelect:!1,selectOnClick:!1,batchSize:100,rowHeight:45}}}let At=class extends rt{constructor(){super(...arguments),this.initialized=!1,this.visibleHeaders=D``,this.visibleRows=D``,this.headerMenu=D``,this.columnGhost=D``,this.ListRow=t=>{const{listApi:i,columnApi:e,options:s,columnDefinitions:r}=this.api,o={height:`${s.rowHeight}px`},h={listRow:!0,even:t%2==1,odd:t%2!=1,checked:i.checkedRows[t]};return D`
         <div class=${at(h)} style=${dt(o)}
            data-row-index=${t}
         >
            ${r.merged.filter((t=>!t.hidden)).map((i=>this.ListRowField(i,t)))}
         </div>
      `},this.ListRowField=(t,i)=>{var e;const{listApi:s}=this.api,r={willChange:"width",width:`${t.width||t.minWidth}px`,minWidth:`${t.minWidth}px`},o=null===(e=s.rowData[i])||void 0===e?void 0:e[t.field],h={data:s.rowData[i],field:t.field,index:i};return D`
         <div class="rowField" style=${dt(r)}
            data-field=${t.field}
         >
            <!-- checkbox area -->
            ${t.checkbox?D`
               <div class="checkbox">
                  <input
                     title="select row"
                     type="checkbox"
                     .checked=${s.checkedRows[i]}
                     @change=${()=>s.checkRow(i)}
                     @click=${t=>{t.stopPropagation()}}
                  />
               </div>
            `:""}

            <!-- field renderer -->
            ${t.renderer?t.renderer(h):o?D`<div class="fieldText">${o}</div>`:""}
         </div>
      `},this.render=()=>{if(!this.api)return D``;const{listApi:t,columnApi:i,styleApi:e,moveColumnApi:s,resizeColumnApi:r,columnMenuApi:o,columnDefinitions:h}=this.api,{viewportWrapperStyle:n,viewportStyle:l,viewMoverStyle:a,listHeaderStyle:d}=e;return this.visibleHeaders=h.merged?D`
      ${h.merged.filter((t=>!t.hidden)).map((i=>{const e="fieldHeader-"+i.field,h={willChange:"width",width:`${i.width||i.minWidth}px`,minWidth:`${i.minWidth}px`};return D`
               <div
                  id=${e}
                  style=${dt(h)}
                  class="headerField"
                  @mouseover=${t=>s.mouseenter(t,i.field)}
                  >
                     <!-- check all rows -->
                     ${i.checkbox?D`
                     <div class="checkbox">
                        <input type="checkbox"
                        ?disabled=${!this.api.options.multiSelect}
                        .checked=${t.allRowsChecked}
                        @change=${t.checkAllRows.bind(t)}
                        />
                     </div>`:""}

                     <!-- header field text and functionality -->
                     <div class="headerFieldLabel">
                        ${i.label?D`<span>${i.label||i.field}</span>`:""}
                        <span
                           class="columnMover"
                           @mousedown=${t=>s.mousedown(t,i.field,e)}
                           @mouseup=${e=>t.sortRows(i.field)}
                        ></span>
                     </div>

                     <!-- header field menu area -->
                     <div class="columnMenuWrapper">
                        ${"asc"==i.sort?D`
                           <div class="columnSort"
                              @mouseup=${e=>t.sortRows(i.field)}>
                              <svg class="icon">
                                 <use id="use" xlink:href="#icon-chevron-up"></use>
                              </svg>
                           </div>
                        `:"desc"==i.sort?D`
                           <div class="columnSort"
                              @mouseup=${e=>t.sortRows(i.field)}>
                              <svg class="icon">
                                 <use id="use" xlink:href="#icon-chevron-down"></use>
                              </svg>
                           </div>
                        `:""}

                        ${!1!==i.menu?D`
                           <div class="columnMenu"
                              @click=${t=>o.openMenu(t)}>
                              <svg class="icon">
                                 <use id="use" xlink:href="#icon-bars-solid"></use>
                              </svg>
                           </div>
                        `:""}
                     </div>

                     <!-- header field resize functionality -->
                     <div class="columnResizer">
                     ${!1!==i.resizable?D`
                        <span @mousedown=${t=>r.mousedown(t,i.field)}></span>`:null}
                     </div>
               </div>
               `}))}
      `:D``,this.visibleRows=t.rowCount&&t.visibleNodeCount?D`
      ${new Array(t.visibleNodeCount).fill(null).map(((i,e)=>{const s=e+t.startNode;return this.ListRow(s)}))}
      `:D``,this.columnGhost=s.moving?D`
         <div class="columnGhost" style=${dt(this.api.styleApi.columnGhostStyle)}>
            <div class="label">
               ${this.api.moveColumnApi.label}
            </div>
         </div>
      `:D``,this.headerMenu=o.open?D`
         <div class="headerMenuWrapper" style=${dt(e.headerMenuStyle)}
            id="fieldHeader-menu"
         >
            <div class="menu">
               <div class="fieldList">
                  ${h.merged.map(((t,e)=>D`
                     <div class="field">
                        <input
                           id=${t.field+e}
                           type="checkbox"
                           ?disabled=${0==e}
                           ?checked=${!t.hidden}
                           @change=${()=>i.toggleColumn(t.field)}
                        />
                        <label for=${t.field+e}>${t.label}</label>
                     </div>
                  `))}
               </div>
            </div>
         </div>
      `:D``,D`
      <div class="host" id="listGridHost">
         <div class="wrapper">
            <!-- Header -->
            <div class="listHeaderWrapper">
               <div class="listHeader" style=${dt(d)}>
                  ${this.visibleHeaders}
               </div>
            </div>

            <!-- Rows -->
            <div class="listRowWrapper" id="listRowWrapper">
               <div class="viewportWrapper" style=${dt(n)}
                  id="viewportWrapper"
               >
                  <div class="viewport" style=${dt(l)}
                  >
                     <div class="viewMover" style=${dt(a)}
                        @click=${this.api.listApi.clickRow.bind(this.api.listApi)}
                        id="viewmover"
                     >
                        ${this.visibleRows}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         ${this.headerMenu}
         ${this.columnGhost}
      </div>

      <svg class="iconHost" xmlns="http://www.w3.org/2000/svg">
         <defs>
            <symbol id="icon-bars-solid" viewBox="0 0 448 512">
               <path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
            </symbol>
            <symbol id="icon-chevron-down" viewBox="0 0 448 512">
               <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
            </symbol>
            <symbol id="icon-chevron-up" viewBox="0 0 448 512">
               <path fill="currentColor" d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path>
            </symbol>
         </defs>
      </svg>
      `}}connectedCallback(){super.connectedCallback(),this.api&&this.initialize(this.api)}disconnectedCallback(){super.disconnectedCallback();const{listWrapperApi:t,scrollApi:i}=this.api;t.unsubscribe(),i.unsubscribe()}initialize(t){this.initialized||(this.initialized=!0,this.api=t,this.api.rerender=this.requestUpdate.bind(this),this.api.hostEl=this.renderRoot,setTimeout((()=>this.api.setupApi.initialize())))}};At.styles=((t,...i)=>{const e=1===t.length?t[0]:i.reduce(((i,e,s)=>i+(t=>{if(t instanceof o)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[s+1]),t[0]);return n(e)})`
   * {
      box-sizing: border-box;
   }
   div::-webkit-scrollbar {
      height: var(--ff-listgrid-scrollbar-height, var(--scrollbar-height));
      width: var(--ff-listgrid-scrollbar-width, var(--scrollbar-width));
   }
   div::-webkit-scrollbar-track {
      background: var(--ff-listgrid-scrollbar-track, var(--scrollbar-track));
   }
   div::-webkit-scrollbar-thumb {
      background: var(--ff-listgrid-scrollbar-thumb, var(--scrollbar-thumb));
   }
   div::-webkit-scrollbar-corner {
      background: var(--ff-listgrid-scrollbar-corner, var(--scrollbar-corner));
   }

   /*  */

   :host {
      --text-color: white;
      --header-wrapper-bg: hsla(200, 8%, 15%, 1);
      --header-border: hsla(240, 3%, 42%, 1);
      --header-field-bg: hsla(200, 8%, 15%, 1);
      --column-menu-highlight: hsla(187, 71%, 82%, 1);
      --header-menu-wrapper-bg: rgba(81, 35, 35, 1);
      --row-border: hsla(240, 3%, 42%, 0.2);
      --row-odd: hsla(200,8%,15%,1);
      --row-even: hsla(197,13%,11%,1);
      --row-checked-border: hsla(240, 3%, 42%, 1);
      --row-checked-bg: hsla(201, 97%, 13%, 1);
      --row-hover-bg: hsla(201, 96%, 11%,1);
      --column-ghost-bg: rgba(81, 35, 35, 1);
      --column-ghost-shadow: rgba(35, 35, 35, 1);
      --column-ghost-border-radius: 0.2rem;
      --header-menu-wrapper-shadow: rgba(35, 35, 35, 1);
      --header-menu-wrapper-border-radius: 0.2rem;
      --scrollbar-height: 0.75rem;
      --scrollbar-width: 0.75rem;
      --scrollbar-track: rgba(0, 0, 0, 0.15);
      --scrollbar-thumb: rgba(255, 255, 255, 0.09);
      --scrollbar-corner: rgba(0, 0, 0, 0);

      display: grid;
      grid-template-areas: "listgrid";
      grid-template-rows: 1fr;
      grid-template-columns: 1fr;
      color: var(--ff-listgrid-text-color, var(--text-color));
   }

   /*  */

   .host {
      display: grid;
      grid-area: listgrid;
      overflow: hidden;
      -webkit-font-smoothing: antialiased;
   }

   /*  */

   .iconHost {
      display: none;
   }

   /*  */

   .icon {
      width: 1rem;
      height: 1rem;
   }

   /*  */
   
   .wrapper {
      overflow: hidden;
      display: grid;
      grid-template-rows: 3rem 1fr;
      position: relative;
   }

   /*  */

   .listHeaderWrapper {
      position: relative;
      display: grid;
      grid-auto-flow: row;
      background-color: var(--ff-listgrid-header-wrapper-bg, var(--header-wrapper-bg));
      border-bottom: 2px solid var(--ff-listgrid-header-border, var(--header-border));
   }
   .listHeaderWrapper .listHeader {
      position: absolute;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      height: 100%;
   }
   .listHeaderWrapper .listHeader .headerField .checkbox {
      display: grid;
      place-items: center;
   }
   .listHeaderWrapper .listHeader .headerField {
      overflow: hidden;
      background-color: var(--ff-listgrid-header-field-bg, var(--header-field-bg));
      position: relative;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      padding-inline: 1rem;
   }
   .listHeaderWrapper .listHeader .headerField .headerFieldLabel {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      position: relative;
      overflow: hidden;
   }
   .listHeaderWrapper .listHeader .headerField .headerFieldLabel >span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
   }
   .listHeaderWrapper .listHeader .headerField .columnMover {
      position: absolute;
      display: grid;
      place-items: center;
      width: 100%;
      height: 100%;
      z-index: 1;
      cursor: grab;
   }
   .listHeaderWrapper .listHeader .headerField .columnMenuWrapper {
      display: grid;
      grid-auto-flow: column dense;
      column-gap: 0.25rem;
   }
   .listHeaderWrapper .listHeader .headerField .columnMenuWrapper .columnMenu,
   .listHeaderWrapper .listHeader .headerField .columnMenuWrapper .columnSort {
      cursor:pointer;
      display: grid;
      place-items: center;
   }
   .listHeaderWrapper .listHeader .headerField .columnMenuWrapper .columnMenu:hover,
   .listHeaderWrapper .listHeader .headerField .columnMenuWrapper .columnSort:hover {
      color: var(--ff-listgrid-column-menu-highlight, var(--column-menu-highlight))
   }
   .listHeaderWrapper .listHeader .headerField .columnResizer {
      position: absolute;
      right: 0;
      display: grid;
      place-items: center;
      height: 50%;
      border: 1px solid var(--ff-listgrid-header-border, var(--header-border));
   }
   .listHeaderWrapper .listHeader .headerField .columnResizer >* {
      position: absolute;
      cursor: ew-resize;
      user-select: none;
      z-index: 1;
      width: 20px;
      height: 30px;
      left: -10px;
   }

   /*  */
   
   .listRowWrapper {
      overflow: hidden;
      display: grid;
      background-color: hsl(202, 9%, 17%);
   }
   .listRowWrapper .viewportWrapper {
      overflow: auto;
   }
   .listRowWrapper .viewportWrapper .viewport {
      position: absolute;
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover {
      display: grid;
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      border-top: 1px solid var(--ff-listgrid-row-border, var(--row-border));
      border-bottom: 1px solid var(--ff-listgrid-row-border, var(--row-border));
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow.odd {
      background-color: var(--ff-listgrid-row-odd, var(--row-odd));
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow.even {
      background-color: var(--ff-listgrid-row-even, var(--row-even));
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow.checked {
      border-top: 1px solid var(--ff-listgrid-row-checked-border, var(--row-checked-border));
      border-bottom: 1px solid var(--ff-listgrid-row-checked-border, var(--row-checked-border));
      background-color: var(--ff-listgrid-row-checked-bg, var(--row-checked-bg));
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow.checked .rowField .checkbox {
      opacity: 1;
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow:hover {
      background-color: var(--ff-listgrid-row-hover-bg, var(--row-hover-bg));
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow .rowField {
      display: flex;
      align-items: center;
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow .rowField .checkbox {
      display: grid;
      place-items: center;
      padding-right: 0.4rem;
      opacity: 0.4;
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow .rowField .icons {
      display: flex;
      flex-flow: row;
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow .rowField .icons>* {
      display: grid;
      place-items: center;
      opacity: 0.4;
      margin-right: 0.4rem;
      transition: opacity 0.2s linear;
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow .rowField .icons>*:hover {
      opacity: 1;
      cursor: pointer;
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow .rowField .fieldText {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
   }

   /*  */
   
   .columnGhost {
      overflow: hidden;
      position: fixed;
      pointer-events: none;
      display: flex;
      z-index: 1;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      width: 7rem;
      height: 3rem;
      opacity: 0.9;

      background-color: var(--ff-listgrid-column-ghost-bg, var(--column-ghost-bg));
      box-shadow: 0 0 5px 5px var(--ff-listgrid-column-ghost-shadow, var(--column-ghost-shadow));
      border-radius: var(--ff-listgrid-column-ghost-border-radius, var(--ghost-border-radius));
   }
   .columnGhost .label {
      margin: 0.5rem;
      pointer-events: all;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }

   /*  */
   
   .headerMenuWrapper {
      overflow: hidden;
      position: fixed;
      display: grid;
      height: 13rem;
      width: 12rem;
      background-color: var(--ff-listgrid-header-menu-wrapper-bg, var(--header-menu-wrapper-bg));
      box-shadow: 0 0 5px 5px var(--ff-listgrid-header-menu-wrapper-shadow, var(--header-menu-wrapper-shadow));
      border-radius: var(--ff-listgrid-header-menu-wrapper-border-radius, var(--header-menu-wrapper-border-radius));
   }
   .headerMenuWrapper .menu {
      display: grid;
      overflow: hidden;
   }
   .headerMenuWrapper .menu .fieldList {
      overflow: auto;
      display: grid;
   }
   .headerMenuWrapper .menu .fieldList .field {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
   }
   .headerMenuWrapper .menu .fieldList .field label{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }
   `,t([function(t){return(i,e)=>void 0!==e?((t,i,e)=>{i.constructor.createProperty(e,t)})(t,i,e):ot(t,i)}({type:Object})],At.prototype,"api",void 0),At=t([(t=>i=>"function"==typeof i?((t,i)=>(window.customElements.define(t,i),i))(t,i):((t,i)=>{const{kind:e,elements:s}=i;return{kind:e,elements:s,finisher(i){window.customElements.define(t,i)}}})(t,i))("frost-list-grid")],At);export{At as FrostListGrid,Ht as ListGridApi};
