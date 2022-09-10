import {v4 as uuidV4} from "uuid"
import icon from "./assets/images/trash-con.svg"

const list = document.querySelector<HTMLLIElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks : Task[] = getItems()
tasks.forEach((ts) => {
  addNewTask(ts)
})

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

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

function addNewTask(newTask : Task) {
  const listItem = document.createElement("li")
  const checkbox = document.createElement("input")
  const label = document.createElement("label")
  const span = document.createElement("span")
  const img = document.createElement("img")

  img.classList.add("trash")
  img.setAttribute("id", newTask.id)
  img.setAttribute("src", icon)

  listItem.classList.add("list-item")
  checkbox.classList.add("checkbox")
  span.classList.add("txt")

  checkbox.addEventListener("change", () => {
    newTask.completed = checkbox.checked
    saveItems()
  })

  checkbox.type = "checkbox"
  checkbox.checked = newTask.completed

  span.textContent = newTask.title
  label.append(checkbox, span)
  listItem.appendChild(label)
  listItem.appendChild(img)
  list?.appendChild(listItem)

  const trash = document.querySelectorAll(".trash")
  trash?.forEach((item) => {
    deleteItem(item)
  })
}

function saveItems() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function getItems() : Task[] {
  const storedItems = localStorage.getItem("TASKS")
  if(storedItems == null) return []
  return JSON.parse(storedItems)
}

function deleteItem(item: Element) {
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