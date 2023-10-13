import { Component } from "../core/component";

export default class Header extends Component {
  constructor() {
    super({
      tagName: "header",
    });
  }
  render() {
    this.el.innerHTML = /* html */ `
    <a href="/" class="logo">
        <img src="/images/logo.webp" alt="logo" class="logo-img"/>
    </a>
    `;
  }
}
