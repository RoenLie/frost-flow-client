import { LitElement, html } from 'lit';
import { customElement } from "lit/decorators.js";


@customElement( 'lit-blog' )
export class Blog extends LitElement {
   render() {
      return html`
      <slot></slot>
    `;
   }
}