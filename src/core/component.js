export class Component {
  constructor(payload = {}) {
    //객체분해할당 시 tagName에 아무 값이 없으면 div가 기본값
    const { tagName = "div", state = {}, props = {} } = payload;
    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
    this.componentDidMount();
    this.setEvent();
  }
  render() {}
  componentDidMount() {}
  setEvent() {}

  addEvent(eventType, selector, callback) {
    const element = this.el.querySelector(selector);
    element?.addEventListener(eventType, (event) => {
      callback(event);
    });
  }
}
