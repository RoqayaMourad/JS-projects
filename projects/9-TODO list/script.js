//-------------selectors------------------------
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")
const todoMessage = document.querySelector(".todo-message");

//saved tasks look like [{id, text, completed}]
const storageKey = "javascriptLab.todo.v1";
//the old version saved only the text, like ["task one", "task two"]
const oldStorageKey = "todos";
let todos = [];


//------------------event listeners-----------------
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change' , filterTodo);
todoInput.addEventListener('input', clearMessage);


//---------------functions---------------------
//add todo
function addTodo(e) {
    //prevent form from submitting
    e.preventDefault();

    /*
todoList.innerHTML = `<div class="todo">
    <li class="todo-item"></li>
    <button class="check-btn"><i class="fa fa-check" aria-hidden="true"></i></button>
    <button class="trash-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
</div>`
add it to addtodo function
//why does it add only one element and how to loop it ?!
*/
var inputValue = todoInput.value.trim();
if (inputValue === "") {
    showMessage("Please enter a task");
    todoInput.focus();
    return false;
} else {
    const todo = { id: createId(), text: inputValue, completed: false };
    todos.push(todo);
    //add to localstorage
    saveLocalTodos();

    //append to list
    todoList.appendChild(createTodoElement(todo));
    //keep the selected filter applied
    filterTodo();

    //clear input value
    todoInput.value = "";
    clearMessage();
}
}

//build one task: li > text + check button + trash button
function createTodoElement(todo) {
    //todo li
    const todoLi = document.createElement('li');
    todoLi.classList.add("todo");
    todoLi.dataset.id = todo.id;
    if (todo.completed) {
        todoLi.classList.add("checked");
    }

    //task text, added as text so html characters are shown as typed
    const newTodo = document.createElement('span');
    newTodo.textContent = todo.text;
    newTodo.classList.add("todo-item");
    todoLi.appendChild(newTodo)

    //create cheack button
    const checkButton = document.createElement('button');
    checkButton.classList.add("check-btn");
    checkButton.setAttribute("aria-label", "Mark as completed: " + todo.text);
    checkButton.setAttribute("aria-pressed", todo.completed);
    checkButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>'
    todoLi.appendChild(checkButton);

    //create trash button
    const trashButton = document.createElement('button');
    trashButton.classList.add("trash-btn");
    trashButton.setAttribute("aria-label", "Delete: " + todo.text);
    trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'
    todoLi.appendChild(trashButton);

    return todoLi;
}

//delete or check
function deleteCheck(e){
    const item = e.target;
    //delete item
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall")
        removeLocal(todo);
        //wait till the animation ends
        todo.addEventListener('transitionend', function(){
             todo.remove();
        })
    }

    //check
    if (item.classList[0] === "check-btn") {
        const todo = item.parentElement;
      todo.classList.toggle("checked");
        const completed = todo.classList.contains("checked");
        item.setAttribute("aria-pressed", completed);
        //save the completed state
        const saved = todos.find(function(savedTodo){
            return savedTodo.id === todo.dataset.id;
        });
        if (saved) {
            saved.completed = completed;
            saveLocalTodos();
        }
        //keep the selected filter applied
        filterTodo();
    }
}
//filter
function filterTodo(){
    const todoItems = Array.from(todoList.children);
    todoItems.forEach(function(todo){
        switch(filterOption.value){

            case "all":
            todo.style.display = 'flex';
            break;

            case "completed":
            if (todo.classList.contains('checked')) {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
            break;

            case "uncompleted":
            if (!todo.classList.contains('checked')) {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
            break;
        }
    });
}

//inline message under the form
function showMessage(text) {
    todoMessage.textContent = text;
}
function clearMessage() {
    todoMessage.textContent = "";
}

//every task gets its own id, so two tasks with the same text stay separate
function createId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

//save to localstorage function
function saveLocalTodos(){
    try {
        localStorage.setItem(storageKey, JSON.stringify(todos))
    } catch (error) {
        //storage is not available, the list still works until the page is closed
    }
}

//true if something is saved under the key, even if it can not be read
function hasLocalEntry(key) {
    try {
        return localStorage.getItem(key) !== null;
    } catch (error) {
        return false;
    }
}

//read a saved list, returns null if nothing usable is saved
function readLocalList(key) {
    try {
        const saved = JSON.parse(localStorage.getItem(key));
        return Array.isArray(saved) ? saved : null;
    } catch (error) {
        return null;
    }
}

//accept both the old format (text only) and the new one
function toTodo(saved) {
    if (typeof saved === "string") {
        return { id: createId(), text: saved, completed: false };
    }
    if (saved && typeof saved.text === "string") {
        return { id: saved.id || createId(), text: saved.text, completed: saved.completed === true };
    }
    return null;
}

//show the todos
function getTodos(){
    if (hasLocalEntry(storageKey)) {
        //tasks saved by this version, an empty list stays empty
        //if the entry can not be read the list starts empty and nothing is written until a task changes
        const saved = readLocalList(storageKey) || [];
        todos = saved.map(toTodo).filter(Boolean);
    } else {
        //first visit with this version: copy tasks from the old format
        //the old "todos" entry is left as it is
        const oldSaved = readLocalList(oldStorageKey);
        if (oldSaved !== null) {
            todos = oldSaved.map(toTodo).filter(Boolean);
            saveLocalTodos();
        }
    }

   todos.forEach(function(todo){
    //append to list
    todoList.appendChild(createTodoElement(todo));
   })
   filterTodo();
}

//remove localstorage
function removeLocal(todo) {
    todos = todos.filter(function(savedTodo){
        return savedTodo.id !== todo.dataset.id;
    });
    saveLocalTodos();
}
