import { Component } from "./core/component";
import Header from "./components/Header";
import UpIcon from "./components/UpIcon";

export default class App extends Component {
  render() {
    const urlHash = window.location.hash;
    const header = new Header().el;
    /**실제 페이지 영역 */
    const routerView = document.createElement("router-view");

    this.el.append(header, routerView);

    if (urlHash === "#/") {
      const upIcon = new UpIcon().el;
      this.el.append(upIcon);
    }
  }
}
