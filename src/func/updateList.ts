const list = document.querySelector<HTMLLIElement>("#list")
const completedList = document.querySelector<HTMLElement>("#completed-list")

export default function updateList(checkbox: HTMLInputElement, listItem: HTMLElement) {
    if(checkbox.checked) {
        completedList?.appendChild(listItem)
    } else {
        list?.appendChild(listItem)
    }
}