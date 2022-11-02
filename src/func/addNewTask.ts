import icon from "../assets/images/trash-con.svg"
import pencil from "../assets/images/pencil.svg"
import type { Task } from "../../types/Tasks"
import { saveItems, deleteItem, editItem } from "../index"
import updateList from "./updateList"

export default function addNewTask(newTask : Task) {
    const listItem = document.createElement("li")
    const checkbox = document.createElement("input")
    const label = document.createElement("label")
    const span = document.createElement("span")
    const img = document.createElement("img")
    const edit = document.createElement("img")
    const imgsContainer = document.createElement("div")

    imgsContainer.style.display = "flex"

    img.classList.add("trash")
    img.setAttribute("id", newTask.id)
    img.setAttribute("src", icon)

    edit.classList.add("edit")
    edit.setAttribute("id", newTask.id)
    edit.setAttribute("src", pencil)
  
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
    imgsContainer.appendChild(edit)
    imgsContainer.appendChild(img)
    listItem.appendChild(imgsContainer)
  
    updateList(checkbox, listItem)
  
    const trash = document.querySelectorAll(".trash")
    trash?.forEach((item) => {
      deleteItem(item)
    })

    const editInputs = document.querySelectorAll(".edit")
    editInputs.forEach((input) => {
      editItem(input)
    })
  }
