import { Component } from "../core/component";

export default class UpIcon extends Component {
  constructor() {
    super({
      tagName: "up-icon",
    });
  }
  render() {
    this.el.innerHTML = /* html */ `
    <div class="upArrow-wrap">
        <img src="/images/upArrow.png" alt="upArrow" class="upArrow-img"/>
    </div>
    `;
  }

  setEvent() {
    this.addEvent("click", ".upArrow-wrap", () => {
      var body = document.getElementsByTagName("body")[0];
      window.scroll({
        behavior: "smooth",
        top: body.offsetTop,
      });
    });
  }
}
