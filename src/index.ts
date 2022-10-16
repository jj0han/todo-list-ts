import {v4 as uuidV4} from "uuid"
import type { Task } from "types/Tasks"
import addNewTask from "./func/addNewTask"

const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks : Task[] = getItems()
tasks.forEach((ts) => {
  addNewTask(ts)
})

form?.addEventListener("submit", (e) => {
  e.preventDefault()

  if(input?.value == "" || input?.value == null) return

  const task : Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  tasks.push(task)
  addNewTask(task)
  saveItems()
  input.value = ""
})

export function saveItems() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

export function getItems() : Task[] {
  const storedItems = localStorage.getItem("TASKS")
  if(storedItems == null) return []
  return JSON.parse(storedItems)
}

export function deleteItem(item: Element) {
//adiciona icone de lixeira quando passa o mouse por cima do item
if(item === null || item.parentElement === null) return
item.parentElement.addEventListener("mouseover", () => {
  for (let i = 0; i < tasks.length; i++) {
  if(item.getAttribute("id") === tasks[i].id) {
      item.classList.add("show")
  } 
  }
})

//retira icone de lixeira quando tira o mouse do item
item.parentElement.addEventListener("mouseleave", () => {
  for (let i = 0; i < tasks.length; i++) {
  if(item.getAttribute("id") === tasks[i].id) {
      if(item.classList.contains("show")) {
      item.classList.remove("show")
      }
  } 
  }
})

//remove item e salva array
item.addEventListener("click", () => {
  for (let i = 0; i < tasks.length; i++) {
  if(item.getAttribute("id") === tasks[i].id) {
      tasks.splice(i, 1)
      saveItems()
  }

  if(item === null || item.parentElement === null) {
      return
  } else {
      item.parentElement.style.opacity = "0"
  }
  setTimeout(() => {
      item.parentElement?.remove()
  }, 300)
  }
})
}