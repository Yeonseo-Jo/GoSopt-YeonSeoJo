import ITEM_DATA from "./itemData.js";

//확인용
window.onload = function () {
  showCard(ITEM_DATA);
  handleCategory();
};

// 카드 보여주기 - 일단 태그 두개로 고정 ..
const showCard = (itemDatas) => {
  itemDatas.forEach((item) => {
    const cards = document.querySelector(".cards");
    const card = document.createElement("article");
    card.classList.add("cards__cardContent");
    //카테고리 필터링 위한 사용자 속성 추가
    card.setAttribute("data-category", item.category);
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
};

//nav 카테고리 선택 구현
let selectedCateg = [];
const categories = [...document.querySelectorAll(".nav__category > input")];
const selectAll = document.getElementById("ALL");

const handleCategory = () => {
  categories.forEach((category) => {
    category.addEventListener("click", (e) => {
      let targetCateg = e.currentTarget;
      initTags();
      handleCheck(targetCateg);
      showTags(selectedCateg);
      filterCards(targetCateg);
    });
  });
};

const handleCheck = (t) => {
  const currCateg = t.id;
  if (currCateg == "ALL") {
    // ALL 클릭시 전체 클릭, ALL 취소시 전체 취소
    categories.forEach((category) => {
      category.checked = selectAll.checked;
      handleSelectList();
    });
  } else {
    document.getElementById(currCateg).checked;
    handleSelectList();
  }
  //   handleSelectList();
};

//현재 선택된 카테고리 리스트를 관리하는 함수
const handleSelectList = () => {
  //체크박스가 checked되면 배열에  요소가 추가 된다.
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].checked === true) {
      selectedCateg.push(categories[i]);
    }
  }
  //체크박스의 상태가 checked였다가 취소되면 배열에서 요소를 제거해준다.
  categories.forEach((category) => {
    if (category.checked === false) {
      let idx = selectedCateg.indexOf(category);
      while (idx > -1) {
        selectedCateg.splice(idx, 1);
        idx = selectedCateg.indexOf(category);
      }
    }
  });

  selectedCateg = [...new Set(selectedCateg)];
};

const showTags = (selectedCateg) => {
  console.log(selectedCateg);
  selectedCateg.forEach((label) => {
    const tags = document.querySelector(".category-tags");
    const tag = document.createElement("div");

    tag.classList.add("category-tags__tagItems");
    tag.id = label.id;
    tag.innerHTML = `
      <span class="category-tags__label">${label.id}</span>
      <i class="fa-solid fa-xmark"></i>
      `;
    tags.appendChild(tag);

    const delBtn = tag.querySelector("i");

    delBtn.addEventListener("click", (e) => {
      console.log(e.currentTarget);
      // X 버튼으로 태그 삭제
      delCateg(e.currentTarget);
    });
  });
};

//클릭시 태그 영역 초기화 해주는 함수
const initTags = () => {
  const remainTags = document.querySelector(".category-tags");
  while (remainTags.firstChild) {
    remainTags.removeChild(remainTags.firstChild);
  }
};

//카테고리 태그 삭제
const delCateg = (t) => {
  const tagLabel = t.parentNode.id;
  if (tagLabel === "ALL") {
    selectedCateg.forEach((tag) => {
      document.getElementById(tag.id).checked = false;
      initTags();
      selectedCateg = [];
    });
  } else {
    document.getElementById(tagLabel).checked = false;
    handleSelectList();
    t.parentNode.remove();
  }
  filterCards();
};

// 카테고리에 맞게 카드 로드
const filterCards = () => {
  const cards = [...document.getElementsByClassName("cards__cardContent")];
  const categIds = [];
  selectedCateg.forEach((categ) => {
    categIds.push(categ.id);
  });
  if (categIds.length === 0) {
    // 카테고리가 아무것도 선택되어 있지 않으면 전체 카드를 보여준다.
    cards.forEach((card) => {
      card.style.display = "flex";
    });
  } else {
    cards.forEach((card) => {
      categIds.includes("ALL") || categIds.includes(card.dataset.category)
        ? (card.style.display = "flex")
        : (card.style.display = "none");
    });
  }
};

// //함수 실행
// showCard(ITEM_DATA);
// handleCategory();
