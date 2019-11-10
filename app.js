//Define UI Variables
//If you select by ID use the # symbol
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

const loadEventListeners = () => {

    //DOM Loaded Event - Fetch Tasks from storage
    document.addEventListener('DOMContentLoaded', fetchTasks);
    //Add task event
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!taskInput.value) {
            alert('Add a Valid task!');
            return;
        }

        //Store task
        storeTask(taskInput.value);
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

    //Add the delete task event - Since the delete links are being generated dynamically, you need to have a delegation of events and not have to select the individual links. This means that we have to attach the event listener to the parent component
    taskList.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.parentElement.classList.contains('delete-item')) {
            if (confirm('Are you sure you want to delete this task?')) {
                const storedTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
                storedTasks.splice(storedTasks.indexOf(event.target.parentElement.parentElement.innerText), 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
                event.target.parentElement.parentElement.remove();
            }
        }
    });

    //Clear All Tasks Event
    clearBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const tasks = document.querySelectorAll('li');
        if (confirm('Are you sure you want to clear all your tasks?')) {
            //localStorage.setItem('tasks', ''); //This clears just our local Storage Variable // You can also do localStorage.clear.. which clears everything
            localStorage.clear();
            tasks.forEach(taskItem => {
                taskItem.remove();
            });
        }
    });

    //Filter through the tasks event
    filter.addEventListener('input', event => {
        event.preventDefault();
        if (!event.target.value) {
            document.querySelectorAll('li').forEach(listItem => {
                listItem.style.display = 'block';
            });
            return;
        }

        const text = event.target.value.toLowerCase();
        document.querySelectorAll('li').forEach(listItem => {
            const itemText = listItem.firstChild.textContent;
            if (itemText.toLowerCase().includes(text)) {
                listItem.style.display = 'block';
            } else {
                listItem.style.display = 'none';
            }
        });
    });

};

const storeTask = (taskString) => {
    const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(taskString);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const fetchTasks = () => {
    const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

    tasks.forEach(taskString => {
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create text node and append to li, now the text also appears
        li.appendChild(document.createTextNode(taskString));
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
    }); 
};

//Load all event listeners
loadEventListeners();
