import TODO_DATA from "./todoData.js";

window.onload = function () {
  showTodoList(TODO_DATA);
  const cnt = onClickDone();
  // console.log(cnt);
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

// 할일 목록의 완료 상태를 관리하는 이벤트 함수
const onClickDone = () => {
  const todoLists = [...document.getElementsByClassName("todolist__content")];
  const targetDay = document.querySelector(".highlight");
  let remainNum = targetDay.querySelector(".calender__remainNum");
  let cntDone = todoLists.length;

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
