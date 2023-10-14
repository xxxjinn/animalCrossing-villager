import { Component } from "../core/component";

export default class NotFound extends Component {
  render() {
    this.el.innerHTML = /* html */ `
    <div class="wrap">
      <p class="icon">😿</p>
      <h1 class="head-text">404 Not Found</h1>
      <p class="main-text">요청하신 페이지의 경로가 올바르지 않습니다.</p>
    </div>
    `;
  }
}
