import ITEM_DATA from "./itemData.js";

//확인용
window.onload = function () {
  console.log("자바스크립트 연결!");
  let i;
  for (i = 0; i < ITEM_DATA.length; i++) {
    console.log(ITEM_DATA[i].category);
  }
  showCard(ITEM_DATA);
};

//카드 보여주기 - 일단 태그 두개로 고정 ..
const showCard = (itemDatas) => {
  itemDatas.map((item) => {
    const cards = document.querySelector(".cards");
    const card = document.createElement("article");
    card.classList.add("cards__cardContent");
    card.innerHTML = `
        <header>
        <h2>${item.name}</h2>
      </header>
      <div class="cards__tagWrapper">
        <ul class="cards__tagItems">
          <li class="cards__tag">${item.tags[0]}</li>
          <li class="cards__tag">${item.tags[1]}</li>
        </ul>
        <button class="cards__tagBtn">+</button>
      </div>
      <img class="cards__img" src="${item.imgSrc}" alt="${item.imgAlt}" />
      <button class="cards__button">
        <i class="fa-solid fa-heart"></i>
      </button>
        `;
    cards.appendChild(card);
  });

  console.log("성공!");
};
