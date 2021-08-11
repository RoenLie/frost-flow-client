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
function t(t,i,s,e){for(var o,n=arguments.length,h=n<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(o=t[l])&&(h=(n<3?o(h):n>3?o(i,s,h):o(i,s))||h);return n>3&&h&&Object.defineProperty(i,s,h),h
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const i=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol();class e{constructor(t,i){if(i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return i&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const o=new Map,n=t=>{let i=o.get(t);return void 0===i&&o.set(t,i=new e(t,s)),i},h=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return(t=>n("string"==typeof t?t:t+""))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l,r,c,a;const d={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},u=(t,i)=>i!==t&&(i==i||t==t),v={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:u};class f extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(t){var i;null!==(i=this.v)&&void 0!==i||(this.v=[]),this.v.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this.Πp(s,i);void 0!==e&&(this.Πm.set(e,s),t.push(e))})),t}static createProperty(t,i=v){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e)}}static getPropertyDescriptor(t,i,s){return{get(){return this[i]},set(e){const o=this[t];this[i]=e,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)i.unshift(h(t))}else void 0!==t&&i.push(h(t));return i}static Πp(t,i){const s=i.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,s;(null!==(i=this.ΠU)&&void 0!==i?i:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var i;null===(i=this.ΠU)||void 0===i||i.splice(this.ΠU.indexOf(t)>>>0,1)}Π_(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this.Πi.set(i,this[i]),delete this[i])}))}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((i=>{const s=document.createElement("style");s.textContent=i.cssText,t.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)})),this.Πo=new Promise((t=>this.Πl=t))}attributeChangedCallback(t,i,s){this.K(t,s)}Πj(t,i,s=v){var e,o;const n=this.constructor.Πp(t,s);if(void 0!==n&&!0===s.reflect){const h=(null!==(o=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==o?o:d.toAttribute)(i,s.type);this.Πh=t,null==h?this.removeAttribute(n):this.setAttribute(n,h),this.Πh=null}}K(t,i){var s,e,o;const n=this.constructor,h=n.Πm.get(t);if(void 0!==h&&this.Πh!==h){const t=n.getPropertyOptions(h),l=t.converter,r=null!==(o=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==o?o:d.fromAttribute;this.Πh=h,this[h]=r(i,t.type),this.Πh=null}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],i)?(this.L.has(t)||this.L.set(t,i),!0===s.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this.Πg=this.Πq())}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(t){Promise.reject(t)}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,i)=>this[i]=t)),this.Πi=void 0);let i=!1;const s=this.L;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this.Π$()}catch(t){throw i=!1,this.Π$(),t}i&&this.E(s)}willUpdate(t){}E(t){var i;null===(i=this.ΠU)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}Π$(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return!0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,i)=>this.Πj(i,this[i],t))),this.Πk=void 0),this.Π$()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var p,g,w,b;f.finalized=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null===(r=(l=globalThis).reactiveElementPlatformSupport)||void 0===r||r.call(l,{ReactiveElement:f}),(null!==(c=(a=globalThis).reactiveElementVersions)&&void 0!==c?c:a.reactiveElementVersions=[]).push("1.0.0-rc.2");const y=globalThis.trustedTypes,m=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,S=`lit$${(Math.random()+"").slice(9)}$`,C="?"+S,x=`<${C}>`,$=document,k=(t="")=>$.createComment(t),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,E=/>/g,j=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,A=/'/g,L=/"/g,U=/^(?:script|style|textarea)$/i,_=(t=>(i,...s)=>({_$litType$:t,strings:i,values:s}))(1),N=Symbol.for("lit-noChange"),P=Symbol.for("lit-nothing"),R=new WeakMap,I=$.createTreeWalker($,129,null,!1),B=(t,i)=>{const s=t.length-1,e=[];let o,n=2===i?"<svg>":"",h=O;for(let i=0;i<s;i++){const s=t[i];let l,r,c=-1,a=0;for(;a<s.length&&(h.lastIndex=a,r=h.exec(s),null!==r);)a=h.lastIndex,h===O?"!--"===r[1]?h=T:void 0!==r[1]?h=E:void 0!==r[2]?(U.test(r[2])&&(o=RegExp("</"+r[2],"g")),h=j):void 0!==r[3]&&(h=j):h===j?">"===r[0]?(h=null!=o?o:O,c=-1):void 0===r[1]?c=-2:(c=h.lastIndex-r[2].length,l=r[1],h=void 0===r[3]?j:'"'===r[3]?L:A):h===L||h===A?h=j:h===T||h===E?h=O:(h=j,o=void 0);const d=h===j&&t[i+1].startsWith("/>")?" ":"";n+=h===O?s+x:c>=0?(e.push(l),s.slice(0,c)+"$lit$"+s.slice(c)+S+d):s+S+(-2===c?(e.push(void 0),i):d)}const l=n+(t[s]||"<?>")+(2===i?"</svg>":"");return[void 0!==m?m.createHTML(l):l,e]};class W{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let o=0,n=0;const h=t.length-1,l=this.parts,[r,c]=B(t,i);if(this.el=W.createElement(r,s),I.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(e=I.nextNode())&&l.length<h;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(S)){const s=c[n++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(S),i=/([.?@])?(.*)/.exec(s);l.push({type:1,index:o,name:i[2],strings:t,ctor:"."===i[1]?K:"?"===i[1]?V:"@"===i[1]?Z:J})}else l.push({type:6,index:o})}for(const i of t)e.removeAttribute(i)}if(U.test(e.tagName)){const t=e.textContent.split(S),i=t.length-1;if(i>0){e.textContent=y?y.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],k()),I.nextNode(),l.push({type:2,index:++o});e.append(t[i],k())}}}else if(8===e.nodeType)if(e.data===C)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=e.data.indexOf(S,t+1));)l.push({type:7,index:o}),t+=S.length-1}o++}}static createElement(t,i){const s=$.createElement("template");return s.innerHTML=t,s}}function D(t,i,s=t,e){var o,n,h,l;if(i===N)return i;let r=void 0!==e?null===(o=s.Σi)||void 0===o?void 0:o[e]:s.Σo;const c=M(i)?void 0:i._$litDirective$;return(null==r?void 0:r.constructor)!==c&&(null===(n=null==r?void 0:r.O)||void 0===n||n.call(r,!1),void 0===c?r=void 0:(r=new c(t),r.T(t,s,e)),void 0!==e?(null!==(h=(l=s).Σi)&&void 0!==h?h:l.Σi=[])[e]=r:s.Σo=r),void 0!==r&&(i=D(t,r.S(t,i.values),r,e)),i}class q{constructor(t,i){this.l=[],this.N=void 0,this.D=t,this.M=i}u(t){var i;const{el:{content:s},parts:e}=this.D,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:$).importNode(s,!0);I.currentNode=o;let n=I.nextNode(),h=0,l=0,r=e[0];for(;void 0!==r;){if(h===r.index){let i;2===r.type?i=new H(n,n.nextSibling,this,t):1===r.type?i=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(i=new F(n,this,t)),this.l.push(i),r=e[++l]}h!==(null==r?void 0:r.index)&&(n=I.nextNode(),h++)}return o}v(t){let i=0;for(const s of this.l)void 0!==s&&(void 0!==s.strings?(s.I(t,s,i),i+=s.strings.length-2):s.I(t[i])),i++}}class H{constructor(t,i,s,e){this.type=2,this.N=void 0,this.A=t,this.B=i,this.M=s,this.options=e}setConnected(t){var i;null===(i=this.P)||void 0===i||i.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,i=this){t=D(this,t,i),M(t)?t===P||null==t||""===t?(this.H!==P&&this.R(),this.H=P):t!==this.H&&t!==N&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):(t=>{var i;return z(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])})(t)?this.g(t):this.m(t)}k(t,i=this.B){return this.A.parentNode.insertBefore(t,i)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const i=this.A.nextSibling;null!==i&&3===i.nodeType&&(null===this.B?null===i.nextSibling:i===this.B.previousSibling)?i.data=t:this.$($.createTextNode(t)),this.H=t}_(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this.C(t):(void 0===e.el&&(e.el=W.createElement(e.h,this.options)),e);if((null===(i=this.H)||void 0===i?void 0:i.D)===o)this.H.v(s);else{const t=new q(o,this),i=t.u(this.options);t.v(s),this.$(i),this.H=t}}C(t){let i=R.get(t.strings);return void 0===i&&R.set(t.strings,i=new W(t)),i}g(t){z(this.H)||(this.H=[],this.R());const i=this.H;let s,e=0;for(const o of t)e===i.length?i.push(s=new H(this.k(k()),this.k(k()),this,this.options)):s=i[e],s.I(o),e++;e<i.length&&(this.R(s&&s.B.nextSibling,e),i.length=e)}R(t=this.A.nextSibling,i){var s;for(null===(s=this.P)||void 0===s||s.call(this,!1,!0,i);t&&t!==this.B;){const i=t.nextSibling;t.remove(),t=i}}}class J{constructor(t,i,s,e,o){this.type=1,this.H=P,this.N=void 0,this.V=void 0,this.element=t,this.name=i,this.M=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this.H=Array(s.length-1).fill(P),this.strings=s):this.H=P}get tagName(){return this.element.tagName}I(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=D(this,t,i,0),n=!M(t)||t!==this.H&&t!==N,n&&(this.H=t);else{const e=t;let h,l;for(t=o[0],h=0;h<o.length-1;h++)l=D(this,e[s+h],i,h),l===N&&(l=this.H[h]),n||(n=!M(l)||l!==this.H[h]),l===P?t=P:t!==P&&(t+=(null!=l?l:"")+o[h+1]),this.H[h]=l}n&&!e&&this.W(t)}W(t){t===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class K extends J{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===P?void 0:t}}class V extends J{constructor(){super(...arguments),this.type=4}W(t){t&&t!==P?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class Z extends J{constructor(){super(...arguments),this.type=5}I(t,i=this){var s;if((t=null!==(s=D(this,t,i,0))&&void 0!==s?s:P)===N)return;const e=this.H,o=t===P&&e!==P||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==P&&(e===P||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var i,s;"function"==typeof this.H?this.H.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this.H.handleEvent(t)}}class F{constructor(t,i,s){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=i,this.options=s}I(t){D(this,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var G,Q,X,Y,tt,it;null===(g=(p=globalThis).litHtmlPlatformSupport)||void 0===g||g.call(p,W,H),(null!==(w=(b=globalThis).litHtmlVersions)&&void 0!==w?w:b.litHtmlVersions=[]).push("2.0.0-rc.3"),(null!==(G=(it=globalThis).litElementVersions)&&void 0!==G?G:it.litElementVersions=[]).push("3.0.0-rc.2");class st extends f{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var t,i;const s=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=s.firstChild),s}update(t){const i=this.render();super.update(t),this.Φt=((t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let h=n._$litPart$;if(void 0===h){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=h=new H(i.insertBefore(k(),t),t,void 0,s)}return h.I(t),h})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1)}render(){return N}}st.finalized=!0,st._$litElement$=!0,null===(X=(Q=globalThis).litElementHydrateSupport)||void 0===X||X.call(Q,{LitElement:st}),null===(tt=(Y=globalThis).litElementPlatformSupport)||void 0===tt||tt.call(Y,{LitElement:st});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(s){s.createProperty(i.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(s){s.createProperty(i.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ot=class extends st{_emitOpen(){const t={detail:this.rowData,bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("onOpen",t))}_emitPreview(){const t={detail:this.rowData,bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("onPreview",t))}render(){return _`
      <div class="icons">
         <div class="icon" @click=${this._emitPreview}>
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="eye" class="svg-inline--fa fa-eye fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
               <path fill="currentColor" d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"></path>
            </svg>
         </div>
         <div class="icon" @click=${this._emitOpen}>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="box-open" class="svg-inline--fa fa-box-open fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
               <path fill="currentColor" d="M425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9zm212.6-112.2L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9z"></path>
            </svg>
         </div>
      </div>
      `}};ot.styles=((t,...i)=>{const s=1===t.length?t[0]:i.reduce(((i,s,o)=>i+(t=>{if(t instanceof e)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return n(s)})`
   * {
      box-sizing: border-box;
   }
   .icons {
      display: flex;
      flex-flow: row;
   }
   .icon {
      display: grid;
      place-items: center;
      opacity: 0.4;
      margin-right: 0.4rem;
      transition: opacity 0.2s linear;
      width: 1rem;
      height: 1rem;
   }
   .icon:hover {
      opacity: 1;
      cursor: pointer;
   }
   `,t([function(t){return(i,s)=>void 0!==s?((t,i,s)=>{i.constructor.createProperty(s,t)})(t,i,s):et(t,i)}({type:Object})],ot.prototype,"rowData",void 0),ot=t([(t=>i=>"function"==typeof i?((t,i)=>(window.customElements.define(t,i),i))(t,i):((t,i)=>{const{kind:s,elements:e}=i;return{kind:s,elements:e,finisher(i){window.customElements.define(t,i)}}})(t,i))("frost-preview-or-open")],ot);export{ot as FrostPreviewOrOpen};