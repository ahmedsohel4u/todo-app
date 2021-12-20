const inputValue = document.getElementById('user-value');
const taskParent = document.getElementById('task-parent');
const task = document.getElementById('task');
const clearBtn = document.getElementById('clear-btn');
const addTask = document.getElementById('add-task');
const taskName = document.querySelectorAll('.task-name');



// Data Come from localStorage
createTask();

// Create LocalStorage for storign data

function createLocalStorage () {
    let getLocalStorage = localStorage.getItem('NewItem');
    if (getLocalStorage === null) {
        arr = [];
    } else {
        arr = JSON.parse(getLocalStorage);
    }
    const userInputValue = inputValue.value;
    if (arr.indexOf(userInputValue) === -1) {
        arr.push(userInputValue);
    } else {
        alert('Note can\'t be duplicute');
    }
    localStorage.setItem('NewItem', `${JSON.stringify(arr)}`);
};

// Create task

function createTask() {
    let getLocalStorage = localStorage.getItem('NewItem');
    if (getLocalStorage === null) {
        arr = [];
    } else {
        arr = JSON.parse(getLocalStorage);
    }
    
// Update the task panding

    const taskLength = task.innerHTML = arr.length;
    taskLength > 0 ? clearBtn.className = 'clear-btn' : clearBtn.className = 'clear-btn-disabled';

    let createElements = '';
    arr.forEach((element, index) =>{
        createElements += `<p class="task-name">${element}<span onclick="deleteTask(${index});"><i class="fas fa-trash"></i></span></p>`;
    });
    taskParent.innerHTML = createElements;
};

// Delete Task 

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem('NewItem');
    arr = JSON.parse(getLocalStorage);
    arr.splice(index, 1);

    localStorage.setItem('NewItem', `${JSON.stringify(arr)}`);
    createTask();
};


// Cleare all panding task

function clearAll() {
    arr = [];

    localStorage.setItem('NewItem', `${JSON.stringify(arr)}`);
    createTask();
};

// Add event when the function occurs

inputValue.addEventListener('keyup', (e) => {
    if (e.target.value) {
        addTask.className = 'plus-icon';
        if (e.key === 'Enter') {
            createLocalStorage();
            createTask();
            e.target.value = '';
        };
    } else {
        addTask.className = 'plus-icon-disabled';
    };
});
addTask.addEventListener('click', (ev) => {
    if (inputValue.value) {
        createLocalStorage();
        createTask();
        inputValue.value = '';
    };
});

clearBtn.addEventListener('click', () => {
    clearAll();
});