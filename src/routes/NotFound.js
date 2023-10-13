import { Component } from "../core/component";

export default class NotFound extends Component {
  render() {
    this.el.innerHTML = /* html */ `
    <div>not found page</div>
        `;
  }
}
