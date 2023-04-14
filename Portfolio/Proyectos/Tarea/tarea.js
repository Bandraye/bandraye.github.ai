const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

function addTodo(todo) {
  let todoText = input.value;
  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLocalStorage();
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLocalStorage();
    });

    todosUL.appendChild(todoEl);
    input.value = "";

    updateLocalStorage();
  }
}

function updateLocalStorage() {
  todosEl = document.querySelectorAll("li");
  const todos = [];
  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
    console.log(todos);
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
