import { Component } from "../core/component";

export default class VillagerProfile extends Component {
  render() {
    const value = history.state;
    this.el.innerHTML = /* html */ `
      <div>
        <p>villager profile page</p>
        <h1>${value}</h1>
      </div>
        `;
  }
}
