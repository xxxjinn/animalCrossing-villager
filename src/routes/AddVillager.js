import { Component } from "../core/component";

export default class AddVillager extends Component {
  /** 선택한 이미지 미리보기 */
  previewImg(event) {
    const target = event.target;
    const selectedFile = target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const villagerImg = this.el.querySelector("#profile-img");
        villagerImg.src = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  render() {
    this.el.innerHTML = /* html */ `
    <div class="profile-wrap">
      <div class="header-text">
        <h1 class="profile-top-text">새로운 주민을 등록해보세요!</h1>
      </div>
      <main class="profile-main">
        <div class="profile-left"> 
          <label for="fileInput" class="custom-file-button"><img
            class="profile-img"
            id="profile-img"
            src="/images/previewVillager.png"
          /></label>
          <input type="file" id="fileInput" class="chooseImg" accept="image/*">
        </div>
        <div class="profile-right">
          <ul class="profile-ul">
            <ul class="profile-info">
              <li><p class="profile-info-li">이름:</p></li>
              <li><p class="profile-info-li">영어 이름:</p></li>
              <li><p class="profile-info-li">성별:</p></li>
              <li><p class="profile-info-li">생일:</p></li>
              <li><p class="profile-info-li">성격:</p></li>
              <li><p class="profile-info-li">좋아하는 색:</p></li>
              <li><p class="profile-info-li">말버릇:</p></li>
            </ul>
            <ul class="profile-info-input-ul">
              <li class="profile-info-input-li"><input type="text" class="profile-info-name profile-info-input"></input></li>
              <li class="profile-info-input-li"><input type="text" class="profile-info-engName profile-info-input"></input></li>
              <li class="profile-info-input-li">
                <select class="profile-info-sex">
                  <option value="여성">여성</option>
                  <option value="남성">남성</option>
                </select></li>
              <li class="profile-info-input-li"><input type="text" placeholder="예) 3월19일" class="profile-info-birthday profile-info-input"></input></li>
              <li class="profile-info-input-li"><input type="text" class="profile-info-personality profile-info-input"></input></li>
              <li class="profile-info-input-li"><input type="text" class="profile-info-favoriteColor profile-info-input"></input></li>
              <li class="profile-info-input-li"><input type="text" class="profile-info-speechHabit profile-info-input"></input></li> 
            </ul>
          </ul>
        </div>
      </main>
      <button class="add-btn">등록하기</button>
    </div>
    `;
  }

  setEvent() {
    this.addEvent("change", ".profile-left", (event) => {
      this.previewImg(event);
    });
  }
}
