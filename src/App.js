import { Component } from "./core/component";
import Header from "./components/Header";

export default class App extends Component {
  render() {
    const header = new Header().el;
    /**실제 페이지 영역 */
    const routerView = document.createElement("router-view");

    this.el.append(header, routerView);
  }
}
