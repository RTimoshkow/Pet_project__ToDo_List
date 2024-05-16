"use strict";

let todoArray = [];
const fromStorage = JSON.parse(localStorage.getItem("todo"));

// ОТКРЫВАЕТ МОДАЛЬНОЕ ОКНО
function openForm() {
  document.getElementById("formCreate").style.top = "5%";
  document.getElementById("formCreate").style.right = "5%";
  document.querySelector(".modal").style.display = "block";
}

//ЗАКРЫВАЕТ МОДАЛЬНОЕ ОКНО
function closeForm() {
  document.getElementById("formCreate").style.top = "-100%";
  let bgc = document.querySelector(".modal");
  setTimeout(() => (bgc.style.display = "none"), 700);
}

document.getElementById("openForm").addEventListener("click", openForm);
document.getElementById("closeForm").addEventListener("click", closeForm);

//Фунция для вставки тега в список
function insertTag(tag, text) {
  return document.querySelector(tag).insertAdjacentHTML(
    "beforeend",
    `<li class="todo__item"> 
        <span>${text}</span>
        <div class="buttons__items">
          <button type="button" class="button__item" id="button__edition">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button type="button" class="button__item" id="button__delete">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </li>`
  );
}

//Генерация случайного числа
function randomNumber() {
  const number = Math.floor(Math.random() * 10);
  return number;
}

//Проверка на совпадение
function match(arr) {
  let num = randomNumber();
  const arrValues = [];
  arr.forEach((item) => arrValues.push(item.id));

  for (let i = 0; i < arrValues.length; i++) {
    if (arrValues[i] == num) {
      return match(arr);
    }
  }
  return num;
}

//СОЗДАНИЕ ЗАДАЧИ
function createTask() {
  const taskName = document.querySelector("#taskName");

  if (fromStorage) {
    todoArray = fromStorage;
  }

  const todoObj = {
    id: match(todoArray),
    title: taskName.value,
  };

  todoArray.push(todoObj);
  localStorage.setItem("todo", JSON.stringify(todoArray));

  closeForm();
}

//Открывает поле редактирования задачи
function openEditionForm() {
  document.querySelector(".edition__todo").style.display = "block";
}

document
  .getElementById("button__edition")
  .addEventListener("click", openEditionForm);

//Редактирование задачи
function editingTask() {}

document
  .querySelector("#buttonCreationTask")
  .addEventListener("click", createTask);

function init() {
  if (fromStorage) {
    fromStorage.forEach((item) => {
      insertTag(".taskList", item.title);
    });
  }
}
init();
