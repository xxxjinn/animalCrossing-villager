import { Component } from "../core/component";
import { addVillager } from "../store/memberStore";

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
        this.state.imageUrl = villagerImg.src;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  /** 입력한 값 가져오기 */
  getVillagerInfo(fields) {
    const values = {};

    for (const field of fields) {
      const value = document.querySelector(`.profile-info-${field}`).value;

      if (!value) {
        return null;
      }
      values[field] = value;
    }
    this.state.villagerInfo = values;
    return values;
  }

  render() {
    this.el.innerHTML = /* html */ `
    <div class="add-profile-wrap">
        <h2 class="profile-top-text">새로운 주민을 등록해보세요!</h2>
      <main class="add-profile-main">
        <div class="add-profile-left"> 
          <label for="fileInput" class="custom-file-button"><img
            class="add-profile-img"
            id="add-profile-img"
            src="/images/previewVillager.png"
          /></label>
          <input type="file" id="fileInput" class="chooseImg" accept="image/*">
        </div>
        <div class="add-profile-right">
          <ul class="add-profile-ul">
            <ul class="add-profile-info">
              <li><p class="add-profile-info-li">이름:</p></li>
              <li><p class="add-profile-info-li">영어 이름:</p></li>
              <li><p class="add-profile-info-li">성별:</p></li>
              <li><p class="add-profile-info-li">생일:</p></li>
              <li><p class="add-profile-info-li">성격:</p></li>
              <li><p class="add-profile-info-li">좋아하는 색:</p></li>
              <li><p class="add-profile-info-li">말버릇:</p></li>
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

    this.addEvent("click", ".add-btn", () => {
      /** input value 받아오기 */
      const fields = [
        "name",
        "engName",
        "sex",
        "birthday",
        "personality",
        "favoriteColor",
        "speechHabit",
      ];

      const values = this.getVillagerInfo(fields);
      if (values === null) {
        alert("모든 정보를 입력해주세요!");
        return;
      }

      /**데이터 업로드하기 */
      if (!this.state.imageUrl) {
        alert("이미지를 업로드해주세요!");
      }
      addVillager(this.state);
    });
  }
}
