import { Component } from "../core/component";

export default class Home extends Component {
  render() {
    this.el.innerHTML = /* html */ `
    <main class="main">
      <div class="main-wrap">
        <div class="main-top">
          <h1 class="main-top-text">주민 목록😺</h1>
          <a href="#/add">
            <button class="add-button">새로운 주민 등록하기</button></a
          >
        </div>
        <div class="main-middle">
          <div class="main-middle-header">
            <hr class="main-middle-hr" />
            <ul class="villagers-info-ul">
              <li><p class="villagers-info-li">프로필 사진</p></li>
              <li><p class="villagers-info-li">이름</p></li>
              <li><p class="villagers-info-li">성별</p></li>
              <li><p class="villagers-info-li">생일</p></li>
              <li><p class="villagers-info-li">성격</p></li>
              <li><p class="villagers-info-li">좋아하는 색</p></li>
            </ul>
            <hr class="main-middle-hr" />
          </div>
          <div class="villagers-list"></div>
        </div>
      </div>
    </main>
        `;
  }
}
