import { LitElement, html } from "lit-element";

class CustomElement extends LitElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("connected component");
  }

  _alert() {
    alert("works");
  }

  render() {
    return html`<button @click="${this._alert}">My custom element</button>`;
  }
}

window.customElements.define("custom-button", CustomElement);
