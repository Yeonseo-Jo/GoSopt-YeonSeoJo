import TODO_DATA from "./todoData.js";

window.onload = function () {
  showTodoList(TODO_DATA);
  initCnt();
  onClickDone();
  handleModal();
  closeModal();
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

//!!
let cntDone;
// // let todoLists;
// const cntLists = () => {
//   const currTodoLists = [
//     ...document.getElementsByClassName("todolist__content"),
//   ];
//   todoLists = currTodoLists;
// };
// 할일 목록의 완료 상태를 관리하는 이벤트 함수

const onClickDone = () => {
  const todoLists = [...document.getElementsByClassName("todolist__content")];
  console.log(todoLists);
  const targetDay = document.querySelector(".highlight");
  let remainNum = targetDay.querySelector(".calender__remainNum");
  cntDone = todoLists.length;

  todoLists.forEach((targetLi) => {
    targetLi.addEventListener("click", () => {
      //할일 목록을 클릭하면 완료로, 남은 할 일 숫자 감소하도록 바꾸기.
      if (targetLi.dataset.checked === "false") {
        targetLi.dataset.checked = true;
        cntDone--;
      } else {
        // 완료한 일을 다시 클릭하면 미완료 상태로, 남은 할 일 숫자 증가하도록 바꾸기.
        targetLi.dataset.checked = false;
        cntDone++;
      }
      remainNum.innerText = cntDone;
      console.log(cntDone);
    });
  });
  return cntDone;
};

// 남은 할 일 개수 초기화 함수
const initCnt = () => {
  const todoLists = [...document.getElementsByClassName("todolist__content")];
  const targetDay = document.querySelector(".highlight");
  let remainNum = targetDay.querySelector(".calender__remainNum");
  let cntDone = todoLists.length;
  remainNum.innerHTML = cntDone;
};

//모달 열고 닫기
let targetCateg;
const handleModal = () => {
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

const closeModal = () => {
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
  console.log("*****", category, "****");
  const targetModal = document.querySelector(".addTodo__Modal");
  const targetForm = targetModal.querySelector(".modal__form");
  const targetInput = targetForm.querySelector("input");

  console.log(targetInput.value);
  console.log(category);
  let currCateg = document.getElementById(category);
  let newLi = document.createElement("li");
  newLi.classList.add("todolist__content");
  newLi.setAttribute("data-checked", false);
  newLi.innerHTML = `
    <i class="fa-solid fa-heart"></i>
    <p class="todolist__detail">${targetInput.value}</p>
    `;

  currCateg.appendChild(newLi);
  initCnt();
};
