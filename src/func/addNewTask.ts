import icon from "../assets/images/trash-con.svg"
import type { Task } from "../../types/Tasks"
import { saveItems, deleteItem } from "../index"
import updateList from "./updateList"

export default function addNewTask(newTask : Task) {
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
      updateList(checkbox, listItem)
      saveItems()
    })
  
    checkbox.type = "checkbox"
    checkbox.checked = newTask.completed
  
    span.textContent = newTask.title
    label.append(checkbox, span)
    listItem.appendChild(label)
    listItem.appendChild(img)
  
    updateList(checkbox, listItem)
  
    const trash = document.querySelectorAll(".trash")
    trash?.forEach((item) => {
      deleteItem(item)
    })
  }

  