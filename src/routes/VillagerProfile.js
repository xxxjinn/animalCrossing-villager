import { Component } from "../core/component";
import { fetchOneVillagerData } from "../store/memberStore";

export default class VillagerProfile extends Component {
  renderVillager(villagerData) {
    const {
      name,
      engName,
      sex,
      birthday,
      personality,
      favoriteColor,
      speechHabit,
      imageUrl,
    } = villagerData[0];

    const profileInfoUl = this.el.querySelector(".profile-info-ul");
    const profileContainer = document.createElement("ul");
    profileContainer.classList.add("profileContainer");

    const profileImg = this.el.querySelector(".villager-profile-img");
    profileImg.src = imageUrl;

    profileContainer.innerHTML = /* html */ `
        <li class="villager-info-name villager-profile-info"><p>${name}</p></li>
        <li class="villager-info-engName villager-profile-info"><p>${engName}</p></li>
        <li class="villager-info-sex villager-profile-info"><p>${sex}</p></li>
        <li class="villager-info-birthday villager-profile-info"><p>${birthday}</p></li>
        <li class="villager-info-personality villager-profile-info"><p>${personality}</p></li>
        <li class="villager-info-favoriteColor villager-profile-info"><p>${favoriteColor}</p></li>
        <li class="villager-info-speechHabit villager-profile-info"><p>${speechHabit}</p></li>
        `;
    profileInfoUl.appendChild(profileContainer);
  }

  async componentDidMount() {
    const villagerId = history.state;
    const villagerData = await fetchOneVillagerData(villagerId);
    this.renderVillager(villagerData);
  }

  render() {
    this.el.innerHTML = /* html */ `
          <div class="profile-wrap">
      <div class="header-text">
        <h1 class="profile-top-text">주민 상세 프로필</h1>
      </div>
      <main class="profile-main">
        <div class="profile-left">
          <img class="villager-profile-img" id="villager-profile-img" src="" />
          <input type="file" class="image-upload" accept="image/*" />
        </div>
        <div class="profile-right">
          <h2 class="profile-info-h2">주민 정보</h2>
          <hr class="profile-info-hr" />
          <ul class="profile-info-ul">
            <ul class="profile-info">
              <li><p class="profile-info-li">이름:</p></li>
              <li><p class="profile-info-li">영어 이름:</p></li>
              <li><p class="profile-info-li">성별:</p></li>
              <li><p class="profile-info-li">생일:</p></li>
              <li><p class="profile-info-li">성격:</p></li>
              <li><p class="profile-info-li">좋아하는 색:</p></li>
              <li><p class="profile-info-li">말버릇:</p></li>
            </ul>
          </ul>
        </div>
      </main>
      <button class="edit-btn">정보 수정</button>
    </div>
    `;
  }
}
