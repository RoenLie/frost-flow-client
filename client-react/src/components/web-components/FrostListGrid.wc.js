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
function t(t,i,e,s){for(var r,o=arguments.length,l=o<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,e):s,h=t.length-1;h>=0;h--)(r=t[h])&&(l=(o<3?r(l):o>3?r(i,e,l):r(i,e))||l);return o>3&&l&&Object.defineProperty(i,e,l),l}function i(t,i,e,s){if("a"===e&&!s)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof i?t!==i||!s:!i.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===e?s:"a"===e?s.call(t):s?s.value:i.get(t)}function e(t,i,e,s,r){if("m"===s)throw new TypeError("Private method is not writable");if("a"===s&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof i?t!==i||!r:!i.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===s?r.call(t,e):r?r.value=e:i.set(t,e),e
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const s=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol();class o{constructor(t,i){if(i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return s&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const l=new Map,h=t=>{let i=l.get(t);return void 0===i&&l.set(t,i=new o(t,r)),i},n=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return(t=>h("string"==typeof t?t:t+""))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var a,d,c,u;const p={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=null!==t;break;case Number:e=null===t?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch(t){e=null}}return e}},v=(t,i)=>i!==t&&(i==i||t==t),f={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:v};class w extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(t){var i;null!==(i=this.v)&&void 0!==i||(this.v=[]),this.v.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,e)=>{const s=this.Πp(e,i);void 0!==s&&(this.Πm.set(s,e),t.push(s))})),t}static createProperty(t,i=f){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const e="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,e,i);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,i,e){return{get(){return this[i]},set(s){const r=this[t];this[i]=s,this.requestUpdate(t,r,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||f}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const e of i)this.createProperty(e,t[e])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(n(t))}else void 0!==t&&i.push(n(t));return i}static Πp(t,i){const e=i.attribute;return!1===e?void 0:"string"==typeof e?e:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,e;(null!==(i=this.ΠU)&&void 0!==i?i:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(e=t.hostConnected)||void 0===e||e.call(t))}removeController(t){var i;null===(i=this.ΠU)||void 0===i||i.splice(this.ΠU.indexOf(t)>>>0,1)}Π_(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this.Πi.set(i,this[i]),delete this[i])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{s?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((i=>{const e=document.createElement("style");e.textContent=i.cssText,t.appendChild(e)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)})),this.Πo=new Promise((t=>this.Πl=t))}attributeChangedCallback(t,i,e){this.K(t,e)}Πj(t,i,e=f){var s,r;const o=this.constructor.Πp(t,e);if(void 0!==o&&!0===e.reflect){const l=(null!==(r=null===(s=e.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==r?r:p.toAttribute)(i,e.type);this.Πh=t,null==l?this.removeAttribute(o):this.setAttribute(o,l),this.Πh=null}}K(t,i){var e,s,r;const o=this.constructor,l=o.Πm.get(t);if(void 0!==l&&this.Πh!==l){const t=o.getPropertyOptions(l),h=t.converter,n=null!==(r=null!==(s=null===(e=h)||void 0===e?void 0:e.fromAttribute)&&void 0!==s?s:"function"==typeof h?h:null)&&void 0!==r?r:p.fromAttribute;this.Πh=l,this[l]=n(i,t.type),this.Πh=null}}requestUpdate(t,i,e){let s=!0;void 0!==t&&(((e=e||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],i)?(this.L.has(t)||this.L.set(t,i),!0===e.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,e))):s=!1),!this.isUpdatePending&&s&&(this.Πg=this.Πq())}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(t){Promise.reject(t)}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,i)=>this[i]=t)),this.Πi=void 0);let i=!1;const e=this.L;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(e)):this.Π$()}catch(t){throw i=!1,this.Π$(),t}i&&this.E(e)}willUpdate(t){}E(t){var i;null===(i=this.ΠU)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}Π$(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return!0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,i)=>this.Πj(i,this[i],t))),this.Πk=void 0),this.Π$()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g,m,b,y;w.finalized=!0,w.elementProperties=new Map,w.elementStyles=[],w.shadowRootOptions={mode:"open"},null===(d=(a=globalThis).reactiveElementPlatformSupport)||void 0===d||d.call(a,{ReactiveElement:w}),(null!==(c=(u=globalThis).reactiveElementVersions)&&void 0!==c?c:u.reactiveElementVersions=[]).push("1.0.0-rc.2");const x=globalThis.trustedTypes,$=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,W=`lit$${(Math.random()+"").slice(9)}$`,k="?"+W,M=`<${k}>`,R=document,S=(t="")=>R.createComment(t),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,F=/>/g,T=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,j=/'/g,L=/"/g,E=/^(?:script|style|textarea)$/i,O=(t=>(i,...e)=>({_$litType$:t,strings:i,values:e}))(1),N=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),P=new WeakMap,U=R.createTreeWalker(R,129,null,!1),q=(t,i)=>{const e=t.length-1,s=[];let r,o=2===i?"<svg>":"",l=A;for(let i=0;i<e;i++){const e=t[i];let h,n,a=-1,d=0;for(;d<e.length&&(l.lastIndex=d,n=l.exec(e),null!==n);)d=l.lastIndex,l===A?"!--"===n[1]?l=z:void 0!==n[1]?l=F:void 0!==n[2]?(E.test(n[2])&&(r=RegExp("</"+n[2],"g")),l=T):void 0!==n[3]&&(l=T):l===T?">"===n[0]?(l=null!=r?r:A,a=-1):void 0===n[1]?a=-2:(a=l.lastIndex-n[2].length,h=n[1],l=void 0===n[3]?T:'"'===n[3]?L:j):l===L||l===j?l=T:l===z||l===F?l=A:(l=T,r=void 0);const c=l===T&&t[i+1].startsWith("/>")?" ":"";o+=l===A?e+M:a>=0?(s.push(h),e.slice(0,a)+"$lit$"+e.slice(a)+W+c):e+W+(-2===a?(s.push(void 0),i):c)}const h=o+(t[e]||"<?>")+(2===i?"</svg>":"");return[void 0!==$?$.createHTML(h):h,s]};class I{constructor({strings:t,_$litType$:i},e){let s;this.parts=[];let r=0,o=0;const l=t.length-1,h=this.parts,[n,a]=q(t,i);if(this.el=I.createElement(n,e),U.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(s=U.nextNode())&&h.length<l;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const i of s.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(W)){const e=a[o++];if(t.push(i),void 0!==e){const t=s.getAttribute(e.toLowerCase()+"$lit$").split(W),i=/([.?@])?(.*)/.exec(e);h.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?J:"?"===i[1]?Z:"@"===i[1]?X:V})}else h.push({type:6,index:r})}for(const i of t)s.removeAttribute(i)}if(E.test(s.tagName)){const t=s.textContent.split(W),i=t.length-1;if(i>0){s.textContent=x?x.emptyScript:"";for(let e=0;e<i;e++)s.append(t[e],S()),U.nextNode(),h.push({type:2,index:++r});s.append(t[i],S())}}}else if(8===s.nodeType)if(s.data===k)h.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(W,t+1));)h.push({type:7,index:r}),t+=W.length-1}r++}}static createElement(t,i){const e=R.createElement("template");return e.innerHTML=t,e}}function _(t,i,e=t,s){var r,o,l,h;if(i===N)return i;let n=void 0!==s?null===(r=e.Σi)||void 0===r?void 0:r[s]:e.Σo;const a=C(i)?void 0:i._$litDirective$;return(null==n?void 0:n.constructor)!==a&&(null===(o=null==n?void 0:n.O)||void 0===o||o.call(n,!1),void 0===a?n=void 0:(n=new a(t),n.T(t,e,s)),void 0!==s?(null!==(l=(h=e).Σi)&&void 0!==l?l:h.Σi=[])[s]=n:e.Σo=n),void 0!==n&&(i=_(t,n.S(t,i.values),n,s)),i}class B{constructor(t,i){this.l=[],this.N=void 0,this.D=t,this.M=i}u(t){var i;const{el:{content:e},parts:s}=this.D,r=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:R).importNode(e,!0);U.currentNode=r;let o=U.nextNode(),l=0,h=0,n=s[0];for(;void 0!==n;){if(l===n.index){let i;2===n.type?i=new G(o,o.nextSibling,this,t):1===n.type?i=new n.ctor(o,n.name,n.strings,this,t):6===n.type&&(i=new Y(o,this,t)),this.l.push(i),n=s[++h]}l!==(null==n?void 0:n.index)&&(o=U.nextNode(),l++)}return r}v(t){let i=0;for(const e of this.l)void 0!==e&&(void 0!==e.strings?(e.I(t,e,i),i+=e.strings.length-2):e.I(t[i])),i++}}class G{constructor(t,i,e,s){this.type=2,this.N=void 0,this.A=t,this.B=i,this.M=e,this.options=s}setConnected(t){var i;null===(i=this.P)||void 0===i||i.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,i=this){t=_(this,t,i),C(t)?t===D||null==t||""===t?(this.H!==D&&this.R(),this.H=D):t!==this.H&&t!==N&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):(t=>{var i;return H(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])})(t)?this.g(t):this.m(t)}k(t,i=this.B){return this.A.parentNode.insertBefore(t,i)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const i=this.A.nextSibling;null!==i&&3===i.nodeType&&(null===this.B?null===i.nextSibling:i===this.B.previousSibling)?i.data=t:this.$(R.createTextNode(t)),this.H=t}_(t){var i;const{values:e,_$litType$:s}=t,r="number"==typeof s?this.C(t):(void 0===s.el&&(s.el=I.createElement(s.h,this.options)),s);if((null===(i=this.H)||void 0===i?void 0:i.D)===r)this.H.v(e);else{const t=new B(r,this),i=t.u(this.options);t.v(e),this.$(i),this.H=t}}C(t){let i=P.get(t.strings);return void 0===i&&P.set(t.strings,i=new I(t)),i}g(t){H(this.H)||(this.H=[],this.R());const i=this.H;let e,s=0;for(const r of t)s===i.length?i.push(e=new G(this.k(S()),this.k(S()),this,this.options)):e=i[s],e.I(r),s++;s<i.length&&(this.R(e&&e.B.nextSibling,s),i.length=s)}R(t=this.A.nextSibling,i){var e;for(null===(e=this.P)||void 0===e||e.call(this,!1,!0,i);t&&t!==this.B;){const i=t.nextSibling;t.remove(),t=i}}}class V{constructor(t,i,e,s,r){this.type=1,this.H=D,this.N=void 0,this.V=void 0,this.element=t,this.name=i,this.M=s,this.options=r,e.length>2||""!==e[0]||""!==e[1]?(this.H=Array(e.length-1).fill(D),this.strings=e):this.H=D}get tagName(){return this.element.tagName}I(t,i=this,e,s){const r=this.strings;let o=!1;if(void 0===r)t=_(this,t,i,0),o=!C(t)||t!==this.H&&t!==N,o&&(this.H=t);else{const s=t;let l,h;for(t=r[0],l=0;l<r.length-1;l++)h=_(this,s[e+l],i,l),h===N&&(h=this.H[l]),o||(o=!C(h)||h!==this.H[l]),h===D?t=D:t!==D&&(t+=(null!=h?h:"")+r[l+1]),this.H[l]=h}o&&!s&&this.W(t)}W(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class J extends V{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===D?void 0:t}}class Z extends V{constructor(){super(...arguments),this.type=4}W(t){t&&t!==D?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class X extends V{constructor(){super(...arguments),this.type=5}I(t,i=this){var e;if((t=null!==(e=_(this,t,i,0))&&void 0!==e?e:D)===N)return;const s=this.H,r=t===D&&s!==D||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==D&&(s===D||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var i,e;"function"==typeof this.H?this.H.call(null!==(e=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==e?e:this.element,t):this.H.handleEvent(t)}}class Y{constructor(t,i,e){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=i,this.options=e}I(t){_(this,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var K,Q,tt,it,et,st;null===(m=(g=globalThis).litHtmlPlatformSupport)||void 0===m||m.call(g,I,G),(null!==(b=(y=globalThis).litHtmlVersions)&&void 0!==b?b:y.litHtmlVersions=[]).push("2.0.0-rc.3"),(null!==(K=(st=globalThis).litElementVersions)&&void 0!==K?K:st.litElementVersions=[]).push("3.0.0-rc.2");class rt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var t,i;const e=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=e.firstChild),e}update(t){const i=this.render();super.update(t),this.Φt=((t,i,e)=>{var s,r;const o=null!==(s=null==e?void 0:e.renderBefore)&&void 0!==s?s:i;let l=o._$litPart$;if(void 0===l){const t=null!==(r=null==e?void 0:e.renderBefore)&&void 0!==r?r:null;o._$litPart$=l=new G(i.insertBefore(S(),t),t,void 0,e)}return l.I(t),l})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1)}render(){return N}}rt.finalized=!0,rt._$litElement$=!0,null===(tt=(Q=globalThis).litElementHydrateSupport)||void 0===tt||tt.call(Q,{LitElement:rt}),null===(et=(it=globalThis).litElementPlatformSupport)||void 0===et||et.call(it,{LitElement:rt});
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
const lt=1,ht=t=>(...i)=>({_$litDirective$:t,values:i});class nt{constructor(t){}T(t,i,e){this.Σdt=t,this.M=i,this.Σct=e}S(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const at=ht(class extends nt{constructor(t){var i;if(super(t),t.type!==lt||"class"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).filter((i=>t[i])).join(" ")}update(t,[i]){if(void 0===this.bt){this.bt=new Set;for(const t in i)i[t]&&this.bt.add(t);return this.render(i)}const e=t.element.classList;this.bt.forEach((t=>{t in i||(e.remove(t),this.bt.delete(t))}));for(const t in i){const s=!!i[t];s!==this.bt.has(t)&&(s?(e.add(t),this.bt.add(t)):(e.remove(t),this.bt.delete(t)))}return N}}),dt=ht(class extends nt{constructor(t){var i;if(super(t),t.type!==lt||"style"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((i,e)=>{const s=t[e];return null==s?i:i+`${e=e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(t,[i]){const{style:e}=t.element;if(void 0===this.St){this.St=new Set;for(const t in i)this.St.add(t);return this.render(i)}this.St.forEach((t=>{null==i[t]&&(this.St.delete(t),t.includes("-")?e.removeProperty(t):e[t]="")}));for(const t in i){const s=i[t];null!=s&&(this.St.add(t),t.includes("-")?e.setProperty(t,s):e[t]=s)}return N}});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ct,ut,pt,vt,ft;class wt{constructor(t){ct.set(this,[]),ut.set(this,void 0),pt.set(this,void 0),e(this,ut,t,"f"),e(this,pt,t,"f")}get value(){return i(this,ut,"f")}get previousValue(){return i(this,pt,"f")}next(t){void 0!==t?(e(this,pt,JSON.parse(JSON.stringify(i(this,ut,"f"))),"f"),e(this,ut,t,"f"),this.publish()):this.publish()}subscribe(t){const e=i(this,ct,"f").push(t);return{unsubscribe:()=>this.unsubscribe(e-1)}}unsubscribe(t){i(this,ct,"f").splice(t,1)}publish(){i(this,ct,"f").forEach((t=>{(async()=>{t(i(this,ut,"f"),i(this,pt,"f"))})()}))}}function gt(t,i=300){let e;return(...s)=>{clearTimeout(e),e=setTimeout((()=>{t.apply(this,s)}),i)}}ct=new WeakMap,ut=new WeakMap,pt=new WeakMap;class mt{constructor(){this.subscriptions=[]}subscribe(){this.subscriptions.forEach((t=>t[0].addEventListener(t[1],t[2])))}unsubscribe(){this.subscriptions.forEach((t=>t[0].removeEventListener(t[1],t[2]))),this.subscriptions.length=0}}class bt{constructor(){this.mode="ssr",this.rerender=()=>{},this.debounceRender=gt((()=>this.rerender()),100).bind(this),this.listApi=new Mt(this),this.columnApi=new yt(this),this.styleApi=new Ct(this),this.publishers={moveColumn:new wt([]),resizeColumn:new wt([]),hideColumn:new wt([]),sortColumn:new wt([]),rowData:new wt({rowData:[],lastRow:-1}),query:new wt(0),rowClick:new wt({data:{},field:"",index:0})}}}class yt{constructor(t){this.colDefs=new xt,this.columnMenuApi=new $t(this),this.moveColumnApi=new Wt(this),this.resizeColumnApi=new kt(this),this.root=t}toggleColumn(t){const i=this.colDefs.custom[t].hidden;this.colDefs.custom={...this.colDefs.custom,[t]:{...this.colDefs.custom[t],hidden:!i}},this.root.publishers.hideColumn.publish(),this.root.rerender()}}class xt{constructor(){vt.set(this,void 0),this.merged=[]}get custom(){return i(this,vt,"f")}set custom(t){e(this,vt,t,"f"),this.merged=this.base.map((t=>({...this.default,...t,...this.custom[t.field]}))).sort(((t,i)=>t.order-i.order))}createCustomColDefs(){return this.base.reduce(((t,i,e)=>{const s=i.width||i.minWidth||this.default.minWidth||100,r=e;return t[i.field]={...this.default,...i,width:s,order:r},t}),{})}}vt=new WeakMap;class $t extends mt{constructor(t){super(),this.open=!1,this.xy=[150,150],this.columnApi=t}openMenu(t){this.open=!0,this.xy=[t.clientX-15,t.clientY-15],this.subscriptions.push([window,"mousedown",this.closeMenu.bind(this)]),this.columnApi.root.rerender(),super.subscribe()}closeMenu(t){t.composedPath().some((t=>"fieldHeader-menu"==t.id))||(this.open=!1,this.xy=[0,0],this.columnApi.root.rerender(),super.unsubscribe())}}class Wt extends mt{constructor(t){super(),this.field="",this.label="",this.moving=!1,this.startPos=[100,100],this.offset=[0,0],this.frameQueue=!1,this.columnApi=t}mousedown(t,i,e){var s;t.preventDefault(),1===t.buttons&&(this.startPos=[t.clientX,t.clientY],this.field=i,this.label=(null===(s=this.columnApi.colDefs.merged.find((t=>t.field==i)))||void 0===s?void 0:s.label)||"",this.subscribe())}mousemove(t){if(t.preventDefault(),1===t.buttons){if(!this.moving){if(![Math.abs(t.clientX-this.startPos[0]),Math.abs(t.clientY-this.startPos[1])].some((t=>t>15)))return;this.moving=!0,function(t,i){if(document.styleSheets&&0!=document.getElementsByTagName("head").length){var e,s;if(document.styleSheets.length>0)for(var r=0,o=document.styleSheets.length;r<o;r++)if(!document.styleSheets[r].disabled){var l=document.styleSheets[r].media;if("string"==(s=typeof l)?""!==l&&-1===l.indexOf("screen")||(e=document.styleSheets[r]):"object"==s&&(""!==l.mediaText&&-1===l.mediaText.indexOf("screen")||(e=document.styleSheets[r])),void 0!==e)break}if(void 0===e){var h=document.createElement("style");for(h.type="text/css",document.getElementsByTagName("head")[0].appendChild(h),r=0;r<document.styleSheets.length;r++)document.styleSheets[r].disabled||(e=document.styleSheets[r]);s=typeof e.media}if("string"===s){for(r=0,o=e.rules.length;r<o;r++)if(e.rules[r].selectorText&&e.rules[r].selectorText.toLowerCase()==t.toLowerCase())return void(e.rules[r].style.cssText=i);e.addRule(t,i)}else if("object"===s){var n=e.cssRules?e.cssRules.length:0;for(r=0;r<n;r++)if(e.cssRules[r].selectorText&&e.cssRules[r].selectorText.toLowerCase()==t.toLowerCase())return void(e.cssRules[r].style.cssText=i);e.insertRule(t+"{"+i+"}",n)}}}(".cursorMove *","cursor:move !important;"),document.body.classList.add("cursorMove")}requestAnimationFrame((()=>{if(this.frameQueue)return;this.frameQueue=!0;const i=[t.clientX-this.startPos[0],t.clientY-this.startPos[1]];this.offset=i,this.columnApi.root.rerender(),this.frameQueue=!1}))}else this.unsubscribe()}mouseenter(t,i){if(1!==t.buttons)return void this.unsubscribe();const{columnApi:e}=this.columnApi.root;let s=e.colDefs.custom[i].moveable;if(s=void 0===s||s,!this.moving||!s||this.field==i)return;const r=e.colDefs.custom[this.field].order,o=e.colDefs.custom[i].order;e.colDefs.custom={...e.colDefs.custom,[this.field]:{...e.colDefs.custom[this.field],order:o},[i]:{...e.colDefs.custom[i],order:r}},this.columnApi.root.rerender()}mouseup(){this.unsubscribe()}subscribe(){this.subscriptions.push([window,"mousemove",this.mousemove.bind(this)],[window,"mouseup",this.mouseup.bind(this)]),super.subscribe()}unsubscribe(){const{publishers:t}=this.columnApi.root;this.moving&&t.moveColumn.publish(),this.field="",this.moving=!1,document.body.classList.remove("cursorMove"),super.unsubscribe(),this.columnApi.root.rerender()}}class kt extends mt{constructor(t){super(),this.field=null,this.resizing=!1,this.element=null,this.frameQueue=!1,this.columnApi=t}getRects(){var t;return null===(t=this.element)||void 0===t?void 0:t.getBoundingClientRect()}mousedown(t,i){var e;const s=t.target;this.element=null===(e=s.parentElement)||void 0===e?void 0:e.parentElement,this.field=i,this.subscribe()}mousemove(t){t.preventDefault(),requestAnimationFrame((()=>{if(this.frameQueue)return;if(this.frameQueue=!0,1!==t.buttons||null===this.field)return void this.unsubscribe();const i=this.getRects();if(!i)return;this.resizing=!0;const{columnApi:e}=this.columnApi.root,s=t.x-i.left;e.colDefs.custom={...e.colDefs.custom,[this.field]:{...e.colDefs.custom[this.field],width:s}},this.columnApi.root.rerender(),this.frameQueue=!1}))}mouseup(){this.unsubscribe()}subscribe(){this.subscriptions.push([window,"mousemove",this.mousemove.bind(this)],[window,"mouseup",this.mouseup.bind(this)]),super.subscribe()}unsubscribe(){const{publishers:t}=this.columnApi.root;this.resizing&&t.resizeColumn.publish(),super.unsubscribe(),this.field=null,this.resizing=!1,this.frameQueue=!1,this.columnApi.root.rerender()}}class Mt{constructor(t){this.scrollApi=new St(this),this.listWrapperApi=new Rt(this),this.childHeight=45,this.wrapperWidth=0,ft.set(this,0),this.querying=!1,this.ssrOptions={batchSize:100},this.rowData=[],this.lastRow=-1,this.checkedRows={},this.allRowsChecked=!1,this.root=t}get startNode(){const t=Math.floor(this.scrollApi.scrollTop/this.childHeight)-this.availableHeight;return Math.max(0,t)}get visibleNodeCount(){let t=this.rowData.length-this.startNode;t=t>0?t:0;const i=Math.floor(2*this.availableHeight);return Math.min(t,i)}get totalHeight(){return this.rowCount*this.childHeight||0}get availableHeight(){return Math.ceil(this.wrapperHeight/this.childHeight)||0}get offsetY(){return this.startNode*this.childHeight+(this.scrollApi.scrollTop>this.wrapperHeight?Math.ceil(this.wrapperHeight/2):0)||0}get startColumn(){return 0}get visibleColumnCount(){return 0}get totalWidth(){return 0}get availableWidth(){return 0}get offsetX(){return 0}get viewSaturated(){return this.rowCount>this.availableHeight||this.lastRow>-1}get sortModel(){return Object.entries(this.root.columnApi.colDefs.custom).filter((t=>t[1].sort)).map((t=>({sort:t[1].sort,colId:t[1].field})))}get rowCount(){return this.rowData.length}get wrapperHeight(){return i(this,ft,"f")}set wrapperHeight(t){e(this,ft,t,"f"),this.viewSaturated||this.getRows({startRow:0})}setDatasource(t){this.datasource=t}setColumnDefinitions(t,i){const{columnApi:e}=this.root;e.colDefs.default=t,e.colDefs.base=i,e.colDefs.custom=e.colDefs.createCustomColDefs()}checkAllRows(t){const i=t.target.checked;this.allRowsChecked=i,this.checkedRows=i?this.rowData.reduce(((t,i,e)=>(t[e]=!0,t)),{}):{},this.root.rerender()}checkRow(t){let i=this.checkedRows[t];i=void 0===i||!i,this.checkedRows[t]=i,this.checkedRows={...this.checkedRows},!i&&this.allRowsChecked&&(this.allRowsChecked=!1),Object.values(this.checkedRows).filter(Boolean).length==this.rowCount&&(this.allRowsChecked=!0),this.root.rerender()}sortRows(t){const{moveColumnApi:i,resizeColumnApi:e}=this.root.columnApi;if(i.moving||e.resizing)return;const s=this.root.columnApi.colDefs.custom[t].sort,r=s?"asc"==s?"desc":null:"asc";this.root.columnApi.colDefs.custom={...this.root.columnApi.colDefs.custom,[t]:{...this.root.columnApi.colDefs.custom[t],sort:r}},this.rowData=[],this.getRows({startRow:0,sortModel:this.sortModel}),this.root.publishers.sortColumn.publish()}getRows(t){if(!this.datasource)return;const i={startRow:t.startRow||0,endRow:(t.startRow||0)+this.ssrOptions.batchSize};t={sortModel:[],filterModel:{},...this.cachedRequest,...i,...t},this.querying||this.lastRow>-1||((async()=>{this.datasource.getRows({request:t,success:this.getRowsSuccess.bind(this),fail:this.getRowsFail.bind(this)})})(),this.querying=!0,this.cachedRequest={...this.cachedRequest,...t})}getRowsSuccess({rowData:t,lastRow:i}){this.lastRow=i,this.querying=!1,this.rowData=[...this.rowData,...t],this.allRowsChecked&&(this.checkedRows=this.rowData.reduce(((t,i,e)=>(t[e]=!0,t)),{})),this.root.publishers.rowData.next({rowData:t,lastRow:i}),this.root.publishers.query.next(this.rowCount),this.root.rerender(),i>0||this.viewSaturated||this.getRows({startRow:this.rowCount})}getRowsFail(){throw"VirtualScrollApi FAILED, method not implemented"}}ft=new WeakMap;class Rt extends mt{constructor(t){super(),this.frameQueue=!1,this.resizing=!1,this.debounceResize=gt(this.resizeEnd.bind(this)),this.calcWrapperHeight=()=>{const t=this.element;t&&requestAnimationFrame((()=>{if(this.frameQueue)return;this.frameQueue=!0,this.resizing||(this.resizing=!0,this.listApi.root.rerender()),this.debounceResize();const i=t.getBoundingClientRect();this.listApi.wrapperWidth=i.width,this.listApi.wrapperHeight=i.height,this.frameQueue=!1}))},this.listApi=t}resizeEnd(){this.resizing=!1,this.listApi.root.rerender()}subscribe(){this.subscriptions.push([window,"resize",this.calcWrapperHeight.bind(this)]),super.subscribe()}}class St extends mt{constructor(t){super(),this.scrollTop=0,this.scrollLeft=0,this.scrollYDirection=0,this.frameQueue=!1,this.listApi=t}get bottomTrigger(){if("normal"==this.listApi.root.mode)return!1;const t=this.element;if(!t)return!1;return Math.ceil(t.offsetHeight+this.scrollTop+2*this.listApi.childHeight)>t.scrollHeight&&this.scrollYDirection>0}onScroll(t){requestAnimationFrame((()=>{if(this.frameQueue)return;this.frameQueue=!0;const t=this.element;if(!t)return;const{listApi:i}=this;if(this.scrollYDirection=Math.sign(t.scrollTop-t.lastScrollTop),this.scrollTop=t.scrollTop,this.scrollLeft=t.scrollLeft,t.lastScrollLeft!=t.scrollLeft)return this.listApi.root.rerender(),t.lastScrollLeft=t.scrollLeft,t.lastScrollTop=t.scrollTop,void(this.frameQueue=!1);if(this.bottomTrigger)return i.getRows({startRow:i.rowData.length}),t.lastScrollLeft=t.scrollLeft,t.lastScrollTop=t.scrollTop,void(this.frameQueue=!1);const e=t.querySelector('[data-name="viewmover"]'),s=t.getBoundingClientRect(),r=null==e?void 0:e.getBoundingClientRect();s.top<Number(null==r?void 0:r.top)&&this.scrollTop>0&&this.listApi.root.rerender(),s.bottom>Number(null==r?void 0:r.bottom)&&this.listApi.root.rerender(),t.lastScrollLeft=t.scrollLeft,t.lastScrollTop=t.scrollTop,this.frameQueue=!1}))}subscribe(){const t=this.element;t&&(t.lastScrollTop=t.scrollTop,this.scrollTop=t.scrollTop,this.scrollLeft=t.scrollLeft,this.subscriptions.push([t,"scroll",this.onScroll.bind(this)]),super.subscribe())}}class Ct{constructor(t){this.root=t}get viewportWrapperStyle(){const{listApi:t}=this.root;return t.listWrapperApi.resizing?{height:"auto"}:{willChange:"height",height:`${t.wrapperHeight||300}px`,contentVisibility:"auto",containIntrinsicSize:`${t.wrapperHeight}px`}}get viewportStyle(){const{listApi:t}=this.root;return{willChange:"height",height:`${t.totalHeight}px`}}get viewMoverStyle(){const{listApi:t}=this.root;return{willChange:"transform",transform:`translateY(${t.offsetY}px)`}}get listHeaderStyle(){const{scrollApi:t}=this.root.listApi;return{willChange:"transform",transform:`translateX(${-t.scrollLeft}px)`}}get headerMenuStyle(){const{columnMenuApi:t}=this.root.columnApi;return{left:`${t.xy[0]}px`,top:`${t.xy[1]}px`}}get columnGhostStyle(){const{moveColumnApi:t}=this.root.columnApi;return{top:t.startPos[1]-5+"px",left:t.startPos[0]-15+"px",willChange:"translate",transform:`translateX(${t.offset[0]}px) translateY(${t.offset[1]}px) translateZ(0)`}}}let Ht=class extends rt{constructor(){super(...arguments),this.initialized=!1,this.hostId=Math.floor(999*Math.random()),this.visibleHeaders=O``,this.visibleRows=O``,this.headerMenu=O``,this.columnGhost=O``,this.subscribers=[],this.ListRow=t=>{const{listApi:i,columnApi:e}=this.api,s={height:`${i.childHeight}px`},r={listRow:!0,even:t%2==1,odd:t%2!=1,checked:i.checkedRows[t]};return O`
         <div class=${at(r)} style=${dt(s)}
            data-row-index=${t}
         >
            ${e.colDefs.merged.filter((t=>!t.hidden)).map((i=>this.ListRowField(i,t)))}
         </div>
      `},this.ListRowField=(t,i)=>{var e;const{listApi:s}=this.api,r={willChange:"width",width:`${t.width||t.minWidth}px`,minWidth:`${t.minWidth}px`},o=null===(e=s.rowData[i])||void 0===e?void 0:e[t.field],l={data:s.rowData[i],field:t.field,index:i};return O`
         <div class="rowField" style=${dt(r)}
            data-field=${t.field}
         >
            <!-- checkbox area -->
            ${t.checkbox?O`
               <div class="checkbox">
                  <input
                     title="select row"
                     type="checkbox"
                     .checked=${s.checkedRows[i]}
                     @change=${()=>s.checkRow(i)}
                  />
               </div>
            `:""}
            <!-- field renderer -->
            ${t.renderer?t.renderer(l):O`
               ${o?O`<div class="fieldText">${o}</div>`:""}
            `}
         </div>
      `},this.render=()=>{if(!this.api)return O``;const{listApi:t,columnApi:i,styleApi:e}=this.api,{moveColumnApi:s,resizeColumnApi:r,columnMenuApi:o}=this.api.columnApi,{viewportWrapperStyle:l,viewportStyle:h,viewMoverStyle:n,listHeaderStyle:a}=e;return this.visibleHeaders=i.colDefs.merged?O`
      ${i.colDefs.merged.filter((t=>!t.hidden)).map((i=>{const e="fieldHeader-"+i.field,l={willChange:"width",width:`${i.width||i.minWidth}px`,minWidth:`${i.minWidth}px`};return O`
               <div
                  id=${e}
                  style=${dt(l)}
                  class="headerField"
                  @mouseover=${t=>s.mouseenter(t,i.field)}
                  >
                     <!-- check all rows -->
                     ${i.checkbox?O`
                     <div class="checkbox">
                        <input type="checkbox"
                        .checked=${t.allRowsChecked}
                        @change=${t.checkAllRows.bind(t)}
                        />
                     </div>`:""}

                     <!-- header field text and functionality -->
                     <div class="headerFieldLabel">
                        ${i.label?O`<span>${i.label||i.field}</span>`:""}
                        <span
                           class="columnMover"
                           @mousedown=${t=>s.mousedown(t,i.field,e)}
                           @mouseup=${e=>t.sortRows(i.field)}
                        ></span>
                     </div>

                     <!-- header field menu area -->
                     <div class="columnMenuWrapper">
                        ${"asc"==i.sort?O`
                           <div class="columnSort"
                              @mouseup=${e=>t.sortRows(i.field)}>
                              <svg class="icon">
                                 <use id="use" xlink:href="#icon-chevron-up"></use>
                              </svg>
                           </div>
                        `:"desc"==i.sort?O`
                           <div class="columnSort"
                              @mouseup=${e=>t.sortRows(i.field)}>
                              <svg class="icon">
                                 <use id="use" xlink:href="#icon-chevron-down"></use>
                              </svg>
                           </div>
                        `:""}

                        ${!0!==i.menu?"":O`
                           <div class="columnMenu"
                              @click=${t=>o.openMenu(t)}>
                              <svg class="icon">
                                 <use id="use" xlink:href="#icon-bars-solid"></use>
                              </svg>
                           </div>
                        `}
                     </div>

                     <!-- header field resize functionality -->
                     <div class="columnResizer">
                     ${!1!==i.resizable?O`
                        <span @mousedown=${t=>r.mousedown(t,i.field)}></span>`:null}
                     </div>
               </div>
               `}))}
      `:O``,this.visibleRows=t.rowCount&&t.visibleNodeCount?O`
      ${new Array(t.visibleNodeCount).fill(null).map(((i,e)=>{const s=e+t.startNode;return this.ListRow(s)}))}
      `:O``,this.columnGhost=s.moving?O`
         <div class="columnGhost" style=${dt(this.api.styleApi.columnGhostStyle)}>
            <div class="label">
               ${this.api.columnApi.moveColumnApi.label}
            </div>
         </div>
      `:O``,this.headerMenu=o.open?O`
         <div class="headerMenuWrapper" style=${dt(e.headerMenuStyle)}
            id="fieldHeader-menu"
         >
            <div class="menu">
               <div class="fieldList">
                  ${i.colDefs.merged.map(((t,e)=>O`
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
      `:O``,O`
      <div class="host" id=${`listGridHost-${this.hostId}`}>
         <div class="wrapper">
            <!-- Header -->
            <div class="listHeaderWrapper">
               <div class="listHeader" style=${dt(a)}>
                  ${this.visibleHeaders}
               </div>
            </div>

            <!-- Rows -->
            <div class="listRowWrapper" id=${`listRowWrapper-${this.hostId}`}>
               <div class="viewportWrapper" style=${dt(l)}
                  id=${`viewportWrapper-${this.hostId}`}
               >
                  <div class="viewport" style=${dt(h)}
                  >
                     <div class="viewMover" style=${dt(n)}
                        @click=${this.onRowClick}
                        id=${`viewmover-${this.hostId}`} data-name="viewmover"
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
      `}}connectedCallback(){var t;super.connectedCallback(),(null===(t=this.api)||void 0===t?void 0:t.mode)&&setTimeout((()=>this.initialize(this.api)))}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe()}initialize(t){this.api=t,this.api.rerender=this.requestUpdate.bind(this),setTimeout((()=>this.subscribe()))}subscribe(){if(this.initialized)return;this.initialized=!0;const{listWrapperApi:t,scrollApi:i}=this.api.listApi;t.element=this.renderRoot.querySelector(`#listRowWrapper-${this.hostId}`),i.element=this.renderRoot.querySelector(`#viewportWrapper-${this.hostId}`),t.subscribe(),i.subscribe(),t.calcWrapperHeight()}unsubscribe(){const{listWrapperApi:t,scrollApi:i}=this.api.listApi;t.unsubscribe(),i.unsubscribe()}onRowClick(t){const i=t.composedPath(),e=[["data-row-index","index"],["data-field","field"]],s=i.reduce(((t,i)=>{const s=i;if(!s.getAttribute)return t;const r=e.reduce(((t,i)=>{const e=s.getAttribute(i[0]);return e&&(t[0]=i[1],t[1]=e),t}),[]);return r.length&&(t[r[0]]=r[1]),t}),{}),r={data:this.api.listApi.rowData[s.index],field:s.field,index:Number(s.index)};this.api.publishers.rowClick.next(r)}};Ht.styles=((t,...i)=>{const e=1===t.length?t[0]:i.reduce(((i,e,s)=>i+(t=>{if(t instanceof o)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[s+1]),t[0]);return h(e)})`
   * {
      box-sizing: border-box;
   }

   /*  */

   :host {
      --ff-listgrid-text-color: white;
      --ff-listgrid-header-wrapper-bg: hsla(200, 8%, 15%, 1);
      --ff-listgrid-header-border: hsla(240, 3%, 42%, 1);
      --ff-listgrid-header-field-bg: hsla(200, 8%, 15%, 1);
      --ff-listgrid-column-menu-highlight: hsla(187, 71%, 82%, 1);
      --ff-listgrid-header-menu-wrapper-bg: rgba(81, 35, 35, 1);
      --ff-listgrid-row-border: hsla(240, 3%, 42%, 0.2);
      --ff-listgrid-row-odd: hsla(200,8%,15%,1);
      --ff-listgrid-row-even: hsla(197,13%,11%,1);
      --ff-listgrid-row-checked-border: hsla(240, 3%, 42%, 1);
      --ff-listgrid-row-checked-bg: hsla(201, 97%, 13%, 1);
      --ff-listgrid-row-hover-bg: hsla(201, 96%, 11%,1);
      --ff-listgrid-column-ghost-bg: rgba(81, 35, 35, 1);
      --ff-listgrid-column-ghost-shadow: rgba(35, 35, 35, 1);
      --ff-listgrid-column-ghost-border-radius: 0.2rem;
      --ff-listgrid-header-menu-wrapper-shadow: rgba(35, 35, 35, 1);
      --ff-listgrid-header-menu-wrapper-border-radius: 0.2rem;
      --ff-listgrid-scrollbar-height: 0.75rem;
      --ff-listgrid-scrollbar-width: 0.75rem;
      --ff-listgrid-scrollbar-track: rgba(0, 0, 0, 0.15);
      --ff-listgrid-scrollbar-thumb: rgba(255, 255, 255, 0.09);
      --ff-listgrid-scrollbar-corner: rgba(0, 0, 0, 0);

      display: grid;
      grid-template-areas: "listgrid";
      grid-template-rows: 1fr;
      grid-template-columns: 1fr;
      color: var(--ff-listgrid-text-color);
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
      background-color: var(--ff-listgrid-header-wrapper-bg);
      border-bottom: 2px solid var(--ff-listgrid-header-border);
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
      background-color: var(--ff-listgrid-header-field-bg);
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
      color: var(--ff-listgrid-column-menu-highlight)
   }
   .listHeaderWrapper .listHeader .headerField .columnResizer {
      position: absolute;
      right: 0;
      display: grid;
      place-items: center;
      height: 50%;
      border: 1px solid var(--ff-listgrid-header-border);
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
   .listRowWrapper .viewportWrapper::-webkit-scrollbar {
      height: var(--ff-listgrid-scrollbar-height);
      width: var(--ff-listgrid-scrollbar-width);
   }
   .listRowWrapper .viewportWrapper::-webkit-scrollbar-track {
      background: var(--ff-listgrid-scrollbar-track);
   }
   .listRowWrapper .viewportWrapper::-webkit-scrollbar-thumb {
      background: var(--ff-listgrid-scrollbar-thumb);
   }
   .listRowWrapper .viewportWrapper::-webkit-scrollbar-corner {
      background: var(--ff-listgrid-scrollbar-corner);
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
      border-top: 1px solid var(--ff-listgrid-row-border);
      border-bottom: 1px solid var(--ff-listgrid-row-border);
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow.odd {
      background-color: var(--ff-listgrid-row-odd);
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow.even {
      background-color: var(--ff-listgrid-row-even);
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow.checked {
      border-top: 1px solid var(--ff-listgrid-row-checked-border);
      border-bottom: 1px solid var(--ff-listgrid-row-checked-border);
      background-color: var(--ff-listgrid-row-checked-bg);
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow.checked .rowField .checkbox {
      opacity: 1;
   }
   .listRowWrapper .viewportWrapper .viewport .viewMover .listRow:hover {
      background-color: var(--ff-listgrid-row-hover-bg);
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

      background-color: var(--ff-listgrid-column-ghost-bg);
      box-shadow: 0 0 5px 5px var(--ff-listgrid-column-ghost-shadow);
      border-radius: var(--ff-listgrid-column-ghost-border-radius);
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
      background-color: var(--ff-listgrid-header-menu-wrapper-bg);
      box-shadow: 0 0 5px 5px var(--ff-listgrid-header-menu-wrapper-shadow);
      border-radius: var(--ff-listgrid-header-menu-wrapper-border-radius);
   }
   .headerMenuWrapper .menu {
      display: grid;
      overflow: hidden;
   }
   .headerMenuWrapper .menu .fieldList {
      overflow: auto;
      display: grid;
   }
   .headerMenuWrapper .menu .fieldList::-webkit-scrollbar {
      height: var(--ff-listgrid-scrollbar-height);
      width: var(--ff-listgrid-scrollbar-width);
   }
   .headerMenuWrapper .menu .fieldList::-webkit-scrollbar-track {
      background: var(--ff-listgrid-scrollbar-track);
   }
   .headerMenuWrapper .menu .fieldList::-webkit-scrollbar-thumb {
      background: var(--ff-listgrid-scrollbar-thumb);
   }
   .headerMenuWrapper .menu .fieldList::-webkit-scrollbar-corner {
      background: var(--ff-listgrid-scrollbar-corner);
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
   `,t([function(t){return(i,e)=>void 0!==e?((t,i,e)=>{i.constructor.createProperty(e,t)})(t,i,e):ot(t,i)}({type:Object})],Ht.prototype,"api",void 0),Ht=t([(t=>i=>"function"==typeof i?((t,i)=>(window.customElements.define(t,i),i))(t,i):((t,i)=>{const{kind:e,elements:s}=i;return{kind:e,elements:s,finisher(i){window.customElements.define(t,i)}}})(t,i))("frost-list-grid")],Ht);export{Ht as FrostListGrid,bt as VirtualScrollApi};
