import { Component } from "./core/component";
import Header from "./components/Header";

export default class App extends Component {
  render() {
    const routerView = document.createElement("router-view");
    const header = new Header().el;

    this.el.append(header, routerView);
  }
}
