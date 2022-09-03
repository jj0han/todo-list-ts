import {v4 as uuidV4} from "../_snowpack/pkg/uuid.js";
const list = document.querySelector("#list");
const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-title");
const tasks = getItems();
tasks.forEach((ts) => {
  addNewTask(ts);
});
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value == "" || input?.value == null)
    return;
  const task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  };
  tasks.push(task);
  addNewTask(task);
  saveItems();
  input.value = "";
});
function addNewTask(newTask) {
  const listItem = document.createElement("li");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  listItem.classList.add("list-item");
  checkbox.classList.add("checkbox");
  checkbox.addEventListener("change", () => {
    newTask.completed = checkbox.checked;
    saveItems();
  });
  checkbox.type = "checkbox";
  checkbox.checked = newTask.completed;
  label.append(checkbox, newTask.title);
  listItem.appendChild(label);
  list?.appendChild(listItem);
}
function saveItems() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function getItems() {
  const storedItems = localStorage.getItem("TASKS");
  if (storedItems == null)
    return [];
  return JSON.parse(storedItems);
}
