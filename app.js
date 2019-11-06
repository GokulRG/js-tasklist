//Define UI Variables
//If you select by ID use the # symbol
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

const loadEventListeners = () => {
    //Add task event
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!taskInput.value) {
            alert('Add a Valid task!');
            return;
        }
        
        //Create an li element to put inside the tasklist above
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create text node and append to li, now the text also appears
        li.appendChild(document.createTextNode(taskInput.value));
        //Create delete link
        const link = document.createElement('a');
        //Add class to that
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append the link to li
        li.appendChild(link);
        //Append said li to ul
        taskList.appendChild(li);
        //Clear input
        taskInput.value = '';
    });
};

//Local Storage
// const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
// tasks.push(taskInput.value);
// localStorage.setItem('tasks', JSON.stringify(tasks));
// taskInput.value = '';

//Load all event listeners
loadEventListeners();


