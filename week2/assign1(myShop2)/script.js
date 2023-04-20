import ITEM_DATA from "./itemData.js";

window.onload = function () {
  showCard(ITEM_DATA);
  handleCategory();
  onClickModal();
};

/***카드 로드 관련 함수 ***/
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
        <div class="cards__tagModal">
        <ul class="cards__modalContents">
          <li class="cards__Modaltag">${item.tags[0]}</li>
          <li class="cards__Modaltag">${item.tags[1]}</li>
        </ul>
        <i class="fa-solid fa-xmark delModal"></i>
      </div>
      </div>

      <img class="cards__img" src="${item.imgSrc}" alt="${item.imgAlt}" />
      <button class="cards__button">
        <i class="fa-solid fa-heart"></i>
      </button>
        `;
    cards.appendChild(card);
  });
};

/*** 카테고리 태그 관련 함수 ***/
/*** global 변수 ***/
// 선택 된 카테고리들의 id를 담는 리스트
let selectedCateg = [];
// 카테고리들을 담는 리스트
const categories = [...document.querySelectorAll(".nav__category > input")];

// 카테고리 태그 관련 함수들을 최종 핸들링 해주는 함수
const handleCategory = () => {
  categories.forEach((category) => {
    category.addEventListener("click", (e) => {
      let targetCateg = e.currentTarget;
      // 태그가 중복으로 쌓이지 않도록 태그 영역을 초기화 해 줌
      initTags();
      handleCheck(targetCateg);
      showTags(selectedCateg);
      filterCards(targetCateg);
    });
  });
};

// 체크박스의 선택 상태 관리 함수
const handleCheck = (t) => {
  const currCateg = t.id;
  if (currCateg == "ALL") {
    // ALL 클릭시 전체 클릭, ALL 취소시 전체 취소
    categories.forEach((category) => {
      category.checked = document.getElementById("ALL").checked;
    });
  } else {
    document.getElementById(currCateg).checked;
  }
  handleSelectList();
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

  // 리스트에 요소가 중복되지 않도록 set으로 중복 제거
  selectedCateg = [...new Set(selectedCateg)];
};

// 선택된 카테고리의 카테고리 태그를 나타내는 함수
const showTags = (selectedCateg) => {
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

    // 카테고리 태그의 x버튼 삭제 구현
    const delBtn = tag.querySelector("i");

    delBtn.addEventListener("click", (e) => {
      // X 버튼을 누르면 태그가 삭제된다
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

//카테고리 태그 삭제 함수
const delCateg = (t) => {
  const tagLabel = t.parentNode.id;
  if (tagLabel === "ALL") {
    selectedCateg.forEach((tag) => {
      document.getElementById(tag.id).checked = false;
      // ALL을 삭제하면 전체 태그 삭제, 선택된 태그도 초기화
      initTags();
      selectedCateg = [];
    });
  } else {
    // 특정 태그를 삭제하면 해당 되는 카테고리 태그를 없애고, 선택된 태그 리스트에서도 빼 줌
    document.getElementById(tagLabel).checked = false;
    handleSelectList();
    t.parentNode.remove();
  }
  filterCards();
};

// 카테고리에 맞게 카드를 필터링 해서 보여주는 함수
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
      // 선택된 카테고리 태그가 ALL이면 모든 카드를 보여주고, 특정 카테고리 태그이면 해당되는 카테고리를 가진 카드만 보여준다.
      categIds.includes("ALL") || categIds.includes(card.dataset.category)
        ? (card.style.display = "flex")
        : // 선택된 카테고리 태그에 없는 카테고리를 가진 카드는 숨겨준다.
          (card.style.display = "none");
    });
  }
};

/*** 해시태그 모달 구현 함수***/
const onClickModal = () => {
  // 해시태그 모달을 보여줄수 있는 + 버튼들의 리스트
  const targetBtns = [...document.getElementsByClassName("cards__tagBtn")];

  targetBtns.forEach((openBtn) => {
    const targetCardTag = openBtn.parentNode;
    const targetModal = targetCardTag.querySelector(".cards__tagModal");
    const delBtn = targetModal.querySelector(".delModal");

    // 해시태그 모달을 보여주는 이벤트
    openBtn.addEventListener("click", () => {
      console.log(targetModal);
      targetModal.style.display = "flex";
    });

    // 해시태그 모달을 닫아주는 이벤트
    delBtn.addEventListener("click", () => {
      targetModal.style.display = "none";
    });
  });
};
