import { Component } from "../core/component";

export default class AddVillager extends Component {
  render() {
    this.el.innerHTML = /* html */ `
    <div class="profile-wrap">
      <div class="header-text">
        <h1 class="profile-top-text">주민을 등록해보세요!</h1>
      </div>
      <main class="profile-main">
        <div class="profile-left"> 
          <label for="fileInput" class="custom-file-button"><img
            class="villager-img"
            id="villager-img"
            src="./assets/graphics/previewVillager.png"
          /></label>
          <input type="file" id="fileInput" class="chooseImg" accept="image/*">
        </div>
        <div class="profile-right">
          <ul class="profile-ul">
            <ul class="villager-info">
              <li><p class="villager-info-li">이름:</p></li>
              <li><p class="villager-info-li">영어 이름:</p></li>
              <li><p class="villager-info-li">성별:</p></li>
              <li><p class="villager-info-li">생일:</p></li>
              <li><p class="villager-info-li">성격:</p></li>
              <li><p class="villager-info-li">좋아하는 색:</p></li>
              <li><p class="villager-info-li">말버릇:</p></li>
            </ul>
            <ul class="villager-info-input-ul">
              <li class="villager-info-input-li"><input type="text" class="villager-info-name villager-info-input"></input></li>
              <li class="villager-info-input-li"><input type="text" class="villager-info-engName villager-info-input"></input></li>
              <li class="villager-info-input-li">
                <select class="villager-info-sex">
                  <option value="여성">여성</option>
                  <option value="남성">남성</option>
                </select></li>
              <li class="villager-info-input-li"><input type="text" placeholder="예) 3월19일" class="villager-info-birthday villager-info-input"></input></li>
              <li class="villager-info-input-li"><input type="text" class="villager-info-personality villager-info-input"></input></li>
              <li class="villager-info-input-li"><input type="text" class="villager-info-favoriteColor villager-info-input"></input></li>
              <li class="villager-info-input-li"><input type="text" class="villager-info-speechHabit villager-info-input"></input></li>
              
            </ul>
          </ul>
        </div>
      </main>
      <button class="add-btn">등록하기</button>
    </div>
        `;
  }
}
