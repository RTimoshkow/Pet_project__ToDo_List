"use strict";

// Игорь: лучше сразу цепануть элементы, которые уже есть на странице и
// с которыми нам предстоит взаимодействовать
const todoUl = document.querySelector('.taskList')

let todoArray = [];
// Игорь: сразу при запуске приложения тянем всё из localStorage
getDataFromStorage();

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
function createTask(event) {
  // Игорь: так как кнопка которая добавляет тудушку лежит в тэге <form>,
  // будет происходить перезагрузка страницы каждый раз при нажатии на неё.
  // Это происходит потому, что нажатие на кнопку форма автоматически воспринимает
  // как submit и пытается отправить данные на сервер и вместе с этим перезгружает страницу.
  // Чтобы этого избежать мы превентим (отменяем) дефолтное поведение этого ивента
  event.preventDefault()
  
  const taskName = document.querySelector("#taskName");

  const todoObj = {
    id: match(todoArray),
    title: taskName.value,
  };

  todoArray.push(todoObj);

  // Игорь: обновляем localStorage
  updateLocalStorage();
  // Игорь: ...и сразу после этого отрисовываем всё что подтянули оттуда
  renderTodos();
  closeForm();
}

//Открывает поле редактирования задачи
function openEditionForm() {
  document.querySelector(".edition__todo").style.display = "block";
}

//Редактирование задачи
function editingTask() {}

document
  .querySelector("#buttonCreationTask")
  // Игорь: тут нужно передать в функцию создания тудушки объект 
  // ивента, в ней в комменте объясню почему
  .addEventListener("click", (event) => createTask(event));

// Игорь: Функция для первоначальной загрузки данных из localStorage
function getDataFromStorage() {
  // Игорь: собственно тянем
  const dataFromStorage = JSON.parse(localStorage.getItem("todo"))

  // Игорь: проверяем, если там лежит массив (если там ничего не будет
  // или по какой-то причине будет не массив, приложение может сломаться)
  if (Array.isArray(dataFromStorage)) {
    // Игорь: если всё окей, то обновляем наш массив с которым мы работаем
    todoArray = dataFromStorage
  } else {
    // Игорь: если нет, то пихаем туда пустой массив (при вызове этой функции
    // в этом случае в localStorage как раз он и залетит, так как изначально todoArray = [])
    updateLocalStorage()
  }

  // Игорь: ...и обновляем список на экране
  renderTodos();
}

// Игорь: функция которая просто пихает в localStorage то что на данный момент лежит в массиве
function updateLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todoArray));
}

// Игорь: вот тут самое интересное - отрисовка данных в список
function renderTodos() {
  // Игорь: сначала очищаем <ul>
  todoUl.innerHTML = ''

  // Игорь: потом проходимся по массиву и на каждый элемент создаём <li>
  todoArray.forEach((todoItem) => {
    todoUl.innerHTML += `<li class="todo__item"> 
    <span>${todoItem.title}</span>
    <div class="buttons__items">
      <button type="button" class="button__item" id="button__edition">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button type="button" class="button__item" id="button__delete">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  </li>`
  })

  // Игорь: и уже после создания всех элементов списка со всех их кнопками
  // развешиваем слушатели событий - querySelectorAll вернёт массивом
  // все кнопки которые нашёл с данным id и проходясь по ним добавляем прослушку
  document.querySelectorAll('#button__edition').forEach((button) => {
    button.addEventListener("click", openEditionForm)
  })
}
