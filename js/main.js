const elForm = document.querySelector(".js-hero-form");
const elInput = elForm.querySelector(".js-hero-input");
const elFormBtn = elForm.querySelector(".form-btn");
const elList = document.querySelector(".js-hero-list");

const elAllTodo = document.querySelector(".js-all-number");
const elUncomplateTodo = document.querySelector(".js-uncomplate-number");
const elComplateTodo = document.querySelector(".js-complate-number");

const localTodos = JSON.parse(window.localStorage.getItem("todos"))
const arr = localTodos || [];

function AddArray(){
    elList.innerHTML = null;

    const complate = arr.filter(item => item.isComplate)
    const uncomplate = arr.filter(item => !item.isComplate)
    const All = arr.length

    for (let i = 0; i < arr.length; i++) {
        arr[i].id = i;
        const elItem = document.createElement("li");
        const elNumber = document.createElement("span");
        const elCheckBox = document.createElement("input");
        const elText = document.createElement("p")
        const elBtnBox = document.createElement("div");
        const elDelate = document.createElement("button");
        const elEdit = document.createElement("button");

        elItem.classList.add("p-4", "bg-info", "rounded-3", "d-flex", "mb-4", "align-items-center");

        elNumber.classList.add("me-2", "d-inline-block");
        elNumber.textContent = (arr[i].id+1) + ".";

        elCheckBox.classList.add("js-checkbox", "form-check-input", "me-3");
        elCheckBox.setAttribute("type", "checkbox");
        elCheckBox.dataset.id = arr[i].id;

        elText.classList.add("me-4", "mb-0");
        elText.textContent = arr[i].title;
        if(arr[i].isComplate){
            elText.style.textDecoration = "line-through";
            elCheckBox.setAttribute("checked", "");
        }
        else{
            elCheckBox.removeAttribute("checked");
        }

        elDelate.classList.add("delate-btn", "btn", "btn-danger", "me-3");
        elDelate.textContent = "Delate";
        elDelate.dataset.id = arr[i].id;

        elEdit.classList.add("edit-btn", "btn", "btn-success");
        elEdit.textContent = "Edit";
        elEdit.dataset.id = arr[i].id;

        elBtnBox.appendChild(elDelate);
        elBtnBox.appendChild(elEdit);

        elItem.appendChild(elNumber);
        elItem.appendChild(elCheckBox);
        elItem.appendChild(elText);
        elItem.appendChild(elBtnBox);

        elList.appendChild(elItem);
    }

    elAllTodo.textContent = All;
    elUncomplateTodo.textContent = uncomplate.length;
    elComplateTodo.textContent = complate.length;
};

const FormTypes = {
    edit: "edit",
    add: "add",
};

let formType = FormTypes.add;
let editId = null;

elForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    const elInputValue = elInput.value;
    
    if(formType === FormTypes.add){
        const obj = {
            id: 0,
            title: elInputValue,
            isComplate: false,
        };
    
        arr.push(obj);
        elForm.reset();
        AddArray()
        window.localStorage.setItem("todos", JSON.stringify(arr))
        // console.log(obj.id);
    }
    else if(formType === FormTypes.edit){
        const obj = {
            id: editId,
            title: elInputValue,
            isComplate: false,
        };

        const EditIndex = arr.findIndex(function(element){
            return element.id === obj.id
        });

        arr.splice(EditIndex, 1, obj);
        elForm.reset();
        AddArray();
        formType = FormTypes.add;
        elFormBtn.textContent = "Add";
        window.localStorage.setItem("todos", JSON.stringify(arr))
    }
});

elList.addEventListener("click", function(evt){
    if(evt.target.matches(".delate-btn") ){
        const delateBtnId = Number(evt.target.dataset.id);
        arr.splice(delateBtnId, 1);
        AddArray()
        window.localStorage.setItem("todos", JSON.stringify(arr))
    }
    else if(evt.target.matches(".edit-btn")){
        const EdnitBtnId = Number(evt.target.dataset.id);

        const Edited = arr.find(function(todo){
            return todo.id === EdnitBtnId;
        });

        elInput.value = Edited.title
        elFormBtn.textContent = "Edit";
        formType = FormTypes.edit;
        editId = EdnitBtnId
    }
    else if(evt.target.matches(".js-checkbox")){
        const checkId = Number(evt.target.dataset.id);

        const checked = arr.find(function(todo){
            return todo.id === checkId;
        });

        if(!checked.isComplate){
            checked.isComplate = true;
        }
        else{
            checked.isComplate = false;
        }
        AddArray()
        window.localStorage.setItem("todos", JSON.stringify(arr))
    }
});

AddArray()