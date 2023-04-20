import TODO_DATA from "./todoData.js";

window.onload = function () {
  showTodoList(TODO_DATA);
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
