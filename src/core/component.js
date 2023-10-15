export class Component {
  constructor(payload = {}) {
    //객체분해할당 시 tagName에 아무 값이 없으면 div가 기본값
    const { tagName = "div", state = {}, props = {} } = payload;
    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
    this.componentDidMount();
  }
  render() {}
  componentDidMount() {}
}
