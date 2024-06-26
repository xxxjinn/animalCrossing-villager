import { fetchDataFromFirestore, deleteVillager } from "../store/memberStore";
import { Component } from "../core/component";
import { navigation } from "../core/router";

export default class Home extends Component {
  /** 데이터 가져와서 villager item 생성 */
  renderVillagers(villagerData) {
    const villagersList = this.el.querySelector(".villagers-list");

    villagerData.forEach((data) => {
      const { name, favoriteColor, imageUrl, sex, birthday, personality, id } =
        data;

      const villagerHTML = /* html */ ` 
        <div class="villager" id=${id}>
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

      /** 성별에 따른 글자 색 변화 */
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

  /** 주민 삭제 */
  handleDeleteButtonClick(event) {
    const target = event.target;
    if (target.classList.contains("delete-button")) {
      const villagerElement = target.closest(".villager");
      const selectedVillagerId = villagerElement.getAttribute("id");
      const selectedVillagerData = this.state.find((data) => {
        if (data.id === selectedVillagerId) {
          return data;
        }
      });
      let confirmDelete = confirm(
        ` ${selectedVillagerData.name}을(를) 목록에서 삭제하시겠습니까?`
      );
      if (confirmDelete) {
        deleteVillager(selectedVillagerData)
          .then(() => {
            villagerElement.remove();
          })
          .catch((error) => {
            console.error("주민 삭제 오류:", error);
          });
      }
    }
  }

  /** 해당 주민 프로필로 이동 */
  navigationProfile = (event) => {
    const target = event.target;
    if (target.classList.contains("villager-info-ul")) {
      const villagerElement = target.closest(".villager");
      const selectedVillagerId = villagerElement.getAttribute("id");
      navigation(`/profile?id=${selectedVillagerId}`);
    }
  };

  async componentDidMount() {
    const villagerData = await fetchDataFromFirestore();
    this.state = villagerData;
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

  setEvent() {
    this.addEvent("click", ".villagers-list", (event) => {
      this.handleDeleteButtonClick(event);
    });

    this.addEvent("click", ".villagers-list", (event) => {
      this.navigationProfile(event);
    });
  }
}
