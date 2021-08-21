
//select elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');

const input = document.getElementById('input');
const addIcon = document.getElementById('addIcon');

//set icons
const check = "fa-check-circle";
const unCheck = "fa-circle-thin";
const lineThrough = "lineThrough";

let LIST, id;


let data= localStorage.getItem("task");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
}


function loadList(array){
    array.forEach(item => {
        addTask(item.name, item.id, item.done, item.trash);
    });
}

//get date info
const options = {weekday : "long", month:"short", day:"numeric"}
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


// task function

function addTask(task, id, done , trash){

    if(trash){return;}

    const DONE = done ? check : unCheck;
    const LINE = done ? lineThrough : "";

    const item = `<li class="item">
    <i class="fa ${DONE} co" job="complete" id="0"></i>
    <p class="text ${LINE}">${task}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>        
    </li>`
    const position = "beforeend"
    list.insertAdjacentHTML(position, item);
}

document.addEventListener('keyup', (eve)=>{
    if(eve.key === "Enter"){
        const task = input.value;
        if(task){
            addTask(task,id,false,false);

            LIST.push({
                name : task,
                id,
                done: false,
                trash: false
            });
            localStorage.setItem("task", JSON.stringify(LIST));

            id++;
        } input.value = "";
    }
});


function completeTasks(element){
    element.classList.toggle(check);
    element.classList.toggle(unCheck);
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);

    LIST[element.id].done = LIST[element.id].done ? false : true;

}

function removeTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true
}
const listItem = document.querySelector('.item');

list.addEventListener("click",(e)=>{
    const event = e.target;
    const eventJob = event.attributes.job.value;

    if(eventJob == "complete"){
        completeTasks(event);
    }else if(eventJob=="delete"){
        removeTask(event);
    }
    localStorage.setItem("task", JSON.stringify(LIST));

})

clear.addEventListener("click", ()=>{
    localStorage.clear();
    location.reload();
});

addIcon.addEventListener('click', ()=>{
        const task = input.value;
        if(task){
            addTask(task,id,false,false);

            LIST.push({
                name : task,
                id,
                done: false,
                trash: false
            });
            localStorage.setItem("task", JSON.stringify(LIST));

            id++;
        } input.value = "";
});