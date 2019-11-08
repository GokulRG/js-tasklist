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

    //Add the delete task event - Since the delete links are being generated dynamically, you need to have a delegation of events and not have to select the individual links. This means that we have to attach the event listener to the parent component
    taskList.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.parentElement.classList.contains('delete-item')) {
            if (confirm('Are you sure you want to delete this task?')) {
                event.target.parentElement.parentElement.remove();
            }
        }
    });

    //Clear All Tasks Event
    clearBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const tasks = document.querySelectorAll('li');
        if (confirm('Are you sure you want to clear all your tasks?')) {
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

//Local Storage
// const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
// tasks.push(taskInput.value);
// localStorage.setItem('tasks', JSON.stringify(tasks));
// taskInput.value = '';

//Load all event listeners
loadEventListeners();


