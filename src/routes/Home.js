import { fetchDataFromFirestore } from "../store/memberStore";
import { Component } from "../core/component";

export default class Home extends Component {
  constructor() {
    super();
  }

  renderVillagers(villagerData) {
    const villagersList = this.el.querySelector(".villagers-list");

    villagerData.forEach((data) => {
      const { name, favoriteColor, imageUrl, sex, birthday, personality } =
        data;

      const villagerHTML = /* html */ ` 
        <div class="villager">
          <ul class="villager-info-ul">
            <li class="villager-info-li-img">
              <img class="villager-img" src="${imageUrl}" />
            </li>
            <li class="villager-info-li"><p>${name}</p></li>
            <li class="villager-info-li"><p class="sex">${sex}</p></li>
            <li class="villager-info-li"><p>${birthday}</p></li>
            <li class="villager-info-li"><p>${personality}</p></li>
            <li class="villager-info-li"><p>${favoriteColor}</p></li>
          </ul>
          <div class="delete-villager">
            <button class="delete-button">주민 삭제</button>
          </div>
        </div>
      `;

      villagersList.insertAdjacentHTML("beforeend", villagerHTML);
      const sexElement = villagersList.querySelector(
        ".villager:last-child .sex"
      );

      const colorPalette = {
        sex: {
          남성: "#A8CAD5",
          여성: "#D5A8B8",
        },
      };
      sexElement.style.color = colorPalette.sex[sex];
    });
  }

  async componentDidMount() {
    const villagerData = await fetchDataFromFirestore();
    this.renderVillagers(villagerData);
  }

  render() {
    this.el.innerHTML = /* html */ `
      <main class="main">
        <div class="main-wrap">
          <div class="main-top">
            <h1 class="main-top-text">주민 목록😺</h1>
            <a href="#/add">
              <button class="add-button">새로운 주민 등록하기</button>
            </a>
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
            <div class="villagers-list">
            </div>
          </div>
        </div>
      </main>
    `;
  }
}
