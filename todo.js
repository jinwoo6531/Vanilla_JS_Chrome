const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

function deleteToDo(event) {
    //console.dir을 통해 부모를 찾자
    //console.log(event.target.parentNode);

    //html에서 제거
    const delBtn = event.target;
    const li = delBtn.parentNode;
    toDoList.removeChild(li);

    //배열에서 제거
    const cleanTodo = toDos.filter((item) => {
        return item.id !== parseInt(li.id);
    })

    //제거한것을 배열에 다시 담고 저장(새로고침하면 값이 저장된게 보인다)
    toDos = cleanTodo;
    saveToDos();
    
}



function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) { 
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.addEventListener("click",deleteToDo);    
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId,
    }

    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(e) {
    e.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";

}

function loadToDos() {
    const loadToDos = localStorage.getItem(TODOS_LS);
    if(loadToDos !== null) {
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(toDo => paintToDo(toDo.text));
    } 
}



function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();