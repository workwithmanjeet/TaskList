// Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filterList = document.querySelector('#filter');
const taskInput= document.querySelector("#task");


// load all event listeners

loadEventListeners();



// load all event
function loadEventListeners(){


    // Dom Load event
    document.addEventListener('DOMContentLoaded',getTasks);

    // add task event 
    form.addEventListener("submit",addTask );
    // remove task event
    taskList.addEventListener('click',removeTask) ;
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks event
    filter.addEventListener('keyup', filterTask );


}

// get  tasks from loacal storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')==null){
        tasks=[]

    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement("li");
        // add class
        li.className='collection-item';
        // Create text Node and append to li
        li.appendChild(document.createTextNode(task));
        
        // create new link element
        const link = document.createElement('a');
        link.className='delete-item secondary-content';
        // icon
        link.innerHTML='<i class ="fa fa-remove"></i>';
        // .append link to li
        li.appendChild(link);
        // console.log(li);

        // append li to ul
        taskList.appendChild(li);
    })

}

// add task
function addTask(e){
    if(taskInput.value == ""){
        alert("Add a Task");
    }
    else{
          // create li allement
    const li = document.createElement("li");
    // add class
    li.className='collection-item';
    // Create text Node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    
    // create new link element
    const link = document.createElement('a');
    link.className='delete-item secondary-content';
    // icon
    link.innerHTML='<i class ="fa fa-remove"></i>';
    // .append link to li
    li.appendChild(link);
    // console.log(li);

    // append li to ul
    taskList.appendChild(li);
    // console.log(li);


    // store in local storage
    storeTaskLocal(taskInput.value);

    taskInput.value='';
    e.preventDefault();

    }
  
}

// store task in local storage
function storeTaskLocal(task){
    let tasks;
    if(localStorage.getItem('tasks')==null){
        tasks=[]

    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks)); 

}




// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you Sure')){
            e.target.parentElement.parentElement.remove();
            // Remove from LS
            removeTaskLocal(e.target.parentElement.parentElement); 
            // console.log(e.target.parentElement);

        }

    }

}


// remove from LS
function removeTaskLocal(taskItem){
    console.log("removeTask");
    let tasks;
    if(localStorage.getItem('tasks')==null){
        tasks=[]

    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent == task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); 


}

// clear Task
function clearTasks(){
    // slower
    // taskList.innerHTML="";
    // faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // clear from LS
    clearTasksLocal();




}
// clear all tasks from LS
function clearTasksLocal(){
    localStorage.clear();
}

// filter task
function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item =task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display='block';
        
        }
        else{
            task.style.display='none';
        }

    });

    // console.log(text);



}