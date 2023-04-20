import TODO_DATA from "./todoData.js";

let CUR_DATA = TODO_DATA;
window.onload = function () {
  showTodoList(CUR_DATA);

  handleCntDone();
  onClickToDo();

  handleOpenModal();
  handleCloseModal();

  handleNavigate();
};

//투두리스트 영역을 로드하는 함수 (Template 이용!)
const showTodoList = (todoDatas) => {
  const todoSection = document.querySelector(".todolist");
  const todoTemplate = document.getElementById("todolist__template");

  todoDatas.forEach((data) => {
    let htmlContent = todoTemplate.cloneNode(true);
    let newTodoHtml = todoTemplate.innerHTML;

    let todoContentHtml = showTodoContent(data.todolist);

    newTodoHtml = newTodoHtml
      .replace("{color}", data.color)
      .replace("{category}", data.category)
      .replace("{categoryName}", data.category)
      .replace("{todoContent}", todoContentHtml);
    htmlContent.innerHTML = newTodoHtml;
    todoSection.appendChild(htmlContent.content);
  });
};

//투두리스트의 투두 내용들을 로드하는 함수
const showTodoContent = (todos) => {
  const todoContentTemplate = document.getElementById("todoContent__template");

  let todoContentHtml = "";

  todos.forEach((todo) => {
    let contenthtml = todoContentTemplate.cloneNode(true);
    let newContentHtml = contenthtml.innerHTML;
    newContentHtml = newContentHtml
      .replace("{checked}", todo.checked)
      .replace("{todoDetail}", todo.detail);
    todoContentHtml += newContentHtml;
  });
  return todoContentHtml;
};

/*** 남은 할 일 표시, 카운트 관리 함수들***/
// 남은 할 일 세기 위한 전역 변수
let cntDone;
let todoLists;

// 할 일 목록을 클릭할 경우 완료 상태 처리 함수
const onClickToDo = () => {
  todoLists = [...document.getElementsByClassName("todolist__content")];
  cntDone = todoLists.length;

  todoLists.forEach((targetLi) => {
    targetLi.addEventListener("click", () => {
      //할일 목록을 클릭하면 완료로
      if (targetLi.dataset.checked === "false") {
        targetLi.dataset.checked = true;
        // cntDone--;
      } else {
        // 완료한 일을 다시 클릭하면 미완료 상태로
        targetLi.dataset.checked = false;
      }

      handleCntDone();
    });
  });
};

// 남은 할 일 개수 초기화 함수
const handleCntDone = () => {
  todoLists = [...document.getElementsByClassName("todolist__content")];
  cntDone = todoLists.length;
  const targetDay = document.querySelector(".highlight");
  let remainNum = targetDay.querySelector(".calender__remainNum");

  todoLists.forEach((targetLi) => {
    if (targetLi.dataset.checked === "true") {
      cntDone--;
    }
  });
  remainNum.innerHTML = cntDone;
};

/*** 새로운 할 일 추가 모달 관련 함수들***/
// 모달을 연 카테고리를 구분하기 위한 전역변수
let targetCateg;

// 모달 열기 함수
const handleOpenModal = () => {
  const addBtns = [...document.getElementsByClassName("todolist__addBtn")];
  const targetModal = document.querySelector(".addTodo__Modal");
  const targetForm = targetModal.querySelector(".modal__form");
  const targetInput = targetForm.querySelector("input");

  addBtns.forEach((targetBtn) => {
    targetBtn.addEventListener("click", () => {
      targetInput.value = null;
      targetModal.style.display = "flex";
      targetInput.focus();
      targetCateg = targetBtn.parentNode.querySelector("h2").innerText;
    });
  });
};

// 모달 닫기 함수
const handleCloseModal = () => {
  const closeBtn = document.querySelector(".modal__submitBtn");
  const targetModal = document.querySelector(".addTodo__Modal");

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleForm(targetCateg);
    targetModal.style.display = "none";
    return false;
  });
};

// 폼 정보 받아와서 새 할 일 리스트 만들기
const handleForm = (category) => {
  const targetModal = document.querySelector(".addTodo__Modal");
  const targetForm = targetModal.querySelector(".modal__form");
  const targetInput = targetForm.querySelector("input");
  let currCateg = document.getElementById(category);
  let newLi = document.createElement("li");

  newLi.classList.add("todolist__content");
  newLi.setAttribute("data-checked", false);
  newLi.innerHTML = `
    <i class="fa-solid fa-heart"></i>
    <p class="todolist__detail">${targetInput.value}</p>
    `;

  currCateg.appendChild(newLi);
  newLi.addEventListener("click", () => {
    // 기본 값이 false이므로 만약 새로 추가한 list의 chekced 값이 true라면 한 번 눌렀다가 취소하는 경우.
    if (newLi.dataset.checked === "true") {
      newLi.dataset.checked = false;
      handleCntDone();
    } else {
      // 새로 추가한 list를 눌렀을 경우
      newLi.dataset.checked = true;
      handleCntDone();
    }
  });
  handleCntDone();
};

// footer 메뉴 라우팅
const handleNavigate = () => {
  const navigateBtns = [...document.getElementsByClassName("footer__button")];
  let btnName;
  navigateBtns.forEach((targetBtn) => {
    targetBtn.addEventListener("click", () => {
      btnName = targetBtn.querySelector("p").innerText;
      switch (btnName) {
        case "달력":
          window.location.href = "./index.html";
          break;
        case "MY":
          window.location.href = "./myCategory.html";
          break;
      }
    });
  });
};
