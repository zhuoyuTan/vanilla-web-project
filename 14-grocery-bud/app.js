// ****** SELECT ITEMS **********
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit", addItem);
// clear list
clearBtn.addEventListener("click", clearItems);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);
// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value !== "" && !editFlag){
        const element = document.createElement("article");
        let attribute = document.createAttribute("data-id");
        attribute.value = id;
        element.setAttributeNode(attribute);
        element.classList.add("grocery-item");
        element.innerHTML = 
        `
        <p class="title">${value}</p>
        <div class="btn-container">
            <!-- edit btn -->
            <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
            </button>
            <!-- delete btn -->
            <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
            </button>
        </div>
          `;
        const editBtn = element.querySelector(".edit-btn");
        const deleteBtn = element.querySelector(".delete-btn");
        editBtn.addEventListener("click",editItem);
        deleteBtn.addEventListener("click",deleteItem);

        // append child
        list.appendChild(element);
        // display alert
        displayAlert("item added to the list", "success");
        // show container
        container.classList.add("show-container");
        // set local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();

    }
    else if (value !== "" && editFlag){
        editElement.innerHTML = value;
        console.log(editElement);
        displayAlert("value changed", "success");

        editLocalStorage(id,value);
        setBackToDefault();
    }
    else{
        displayAlert("please enter value", "danger");
    }
    
}

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    },1000)
}
function clearItems() {
    const items = document.querySelectorAll(".grocery-item");
    // delete all grocery items
    items.forEach(function (item){
        list.removeChild(item);
    });

    // hide clear btn
    container.classList.remove("show-container");
    displayAlert("Cleared all grocery items","danger");
    setBackToDefault();
    localStorage.removeItem("list");
}

function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);

    if (list.children.length === 0){
        container.classList.remove("show-container");
    }
    displayAlert("Item removed","danger");

    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);
}
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;

    editFlag = true;
    editID = element.dataset.id;

    submitBtn.textContent = "edit";
}
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
    const grocery = { id:id, value:value };
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list",JSON.stringify(items));

}
function getLocalStorage() {
    if (localStorage.getItem("list")){
        return JSON.parse(localStorage.getItem("list"));
    }
    else{
        return [];
    }
}
function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function(item){
        if (item.id !== id){
            return item;
        }
    })
    localStorage.setItem("list",JSON.stringify(items));

}

function editLocalStorage(id, value) {
    let items = getLocalStorage();

    items = items.map(function(item){
        if (item.id === id){
            item.value = value;
        }
        return item;
    })
}
// ****** SETUP ITEMS **********

function setupItems() {
    let items = getLocalStorage();

    if (items.length > 0){
        items.forEach(function (item){
            createListItem(item.id,item.value);
        })
        container.classList.add("show-container");
    }
    
}
function createListItem(id, value) {
    const element = document.createElement("article");
    let attribute = document.createAttribute("data-id");
    attribute.value = id;
    element.setAttributeNode(attribute);
    element.classList.add("grocery-item");
    element.innerHTML = 
    `
    <p class="title">${value}</p>
    <div class="btn-container">
        <!-- edit btn -->
        <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
        </button>
        <!-- delete btn -->
        <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
        </button>
    </div>
      `;
    const editBtn = element.querySelector(".edit-btn");
    const deleteBtn = element.querySelector(".delete-btn");
    editBtn.addEventListener("click",editItem);
    deleteBtn.addEventListener("click",deleteItem);

    // append child
    list.appendChild(element);
}

