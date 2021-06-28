import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";


@customElement( "frost-flow-nav-top" )
export class NavTopComponent extends LitElement {
   @property( { type: String } ) title = 'My app';

   static styles = css`
    div {
      background-color: coral;
    }
  `;

   render() {
      return html`
      <div>hei</div>
      `;
   }
}