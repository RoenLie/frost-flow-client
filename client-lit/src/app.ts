import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from "lit/decorators.js";


@customElement( 'lit-app' )
export class App extends LitElement {
   static styles = css`
    .header {
      padding: 20px;
      font-size: 25px;
      text-align: center;
      background: white;
    }

    .topnav {
      background-color: #4f4c4c;
      overflow: hidden;
    }

    .topnav a {
      float: left;
      color: #f2f2f2;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
    }

    .topnav a:hover {
      background-color: #ddd;
      color: black;
    }

    .topnav a.active {
      background-color: #008CBA;
      color: white;
    }
  `;

   render(): TemplateResult {
      return html`
      <slot></slot>
    `;
   }
}