import {projectList, toDoList, newProjectBtn, projectModal, 
    addProjectBtn, cancelProjectBtn, projectTitleInput, projectForm, 
    projectTitle, newToDoBtn, toDoModal, toDoForm, toDoTitleInput,
    addtoDoBtn, cancelToDoBtn, toDoDescInput, toDoDueDateInput, toDoPriorityInput,
    newtoDoBtn, header, main, sidebar, projectArea, nightmodeBtn} 
    from './DOMElements';

// Project list
let projects = [];
let currentProject = "";
let currentToDo = "";

// Project constructor
function Project(title) {
    this.title = title
    this.todos = []
}

// To do item constructor
function ToDo(title, description, dueDate, priority) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.isCompleted = false;
}

// Add project to project list
function addProject() {
    if (!projectTitleInput.value) {
        alert('Please enter a quest name!');
        return;
    }
    if (titleExists(projectTitleInput.value, projects)) {
        alert('This quest name is taken!');
        return;
    }
    const newProject = new Project(projectTitleInput.value);
    projects.push(newProject);
    const newProjectDiv = document.createElement('div');
    newProjectDiv.className = 'project';
    newProjectDiv.dataset.title = newProject.title;
    newProjectDiv.textContent = newProject.title;

    projectList.appendChild(newProjectDiv);
    projectTitleInput.value = '';

    projectModal.style.display = 'none';
    projectModal.close();
}

// Check if project title exists
function titleExists(title, projects) {
    return projects.some(project => project.title === title);
}

// Display project and its todos on project area
function displayProject(projectID) {
    const displayProject = projects.find(p => p.title === projectID);
    if (!displayProject) {
        alert('Project not found');
        return;
    }
    newtoDoBtn.style.display = 'flex';
    toDoList.style.display = 'flex';

    projectTitle.innerHTML = '';
    projectTitle.textContent = displayProject.title;
    toDoList.innerHTML = '';

    if (currentProject.todos == '') {
        return;
    }
    else {
     currentProject.todos.forEach(item => createToDo(item));
    }
}

// Add item to to-do list
function addToDo() {
    if (!toDoTitleInput.value) {
        alert('Please enter a task name!');
        return;
    }
    if (titleExists(toDoTitleInput.value, currentProject.todos)) {
        alert('This task already exists!');
        return;
    }
    
    const newToDo = new ToDo(
        toDoTitleInput.value,
        toDoDescInput.value, 
        toDoDueDateInput.value, 
        toDoPriorityInput.value);

    
    currentProject.todos.push(newToDo);
    createToDo(newToDo);

    toDoTitleInput.value = '';
    toDoDescInput.value = '';
    toDoDueDateInput.value = '';
    toDoPriorityInput.value = '';

    toDoModal.style.display = 'none';
    toDoModal.close();
}

// Helper function
function createToDo(newToDo) {
    const newToDoDiv = document.createElement('li');
    newToDoDiv.className = 'todo-item';
    newToDoDiv.dataset.title = newToDo.title;
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'todo-title';
    titleDiv.textContent = newToDo.title;
    newToDoDiv.appendChild(titleDiv);
    
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'todo-description';
    const descriptionLabel = document.createElement('span');
    descriptionLabel.className = 'label';
    descriptionLabel.textContent = "Description:";
    descriptionDiv.appendChild(descriptionLabel);
    const descriptionData = document.createElement('span');
    descriptionData.textContent = newToDo.description;
    descriptionDiv.appendChild(descriptionData);
    newToDoDiv.appendChild(descriptionDiv);

    const dateDiv = document.createElement('div');
    dateDiv.className = 'todo-date';
    const dateLabel = document.createElement('span');
    dateLabel.className = 'label';
    dateLabel.textContent = "Due:";
    dateDiv.appendChild(dateLabel);
    const dateData = document.createElement('span');
    dateData.textContent = newToDo.dueDate;
    dateDiv.appendChild(dateData);
    newToDoDiv.appendChild(dateDiv);

    const priorityDiv = document.createElement('div');
    priorityDiv.className = 'todo-priority';
    const priorityLabel = document.createElement('span');
    priorityLabel.className = 'label';
    priorityLabel.textContent = "Priority:";
    priorityDiv.appendChild(priorityLabel);
    const priorityData = document.createElement('span');
    priorityData.textContent = newToDo.priority;
    priorityDiv.appendChild(priorityData);
    newToDoDiv.appendChild(priorityDiv);
    
    const completeBtn = document.createElement('button');
    completeBtn.className = newToDo.title;
    completeBtn.textContent = 'Complete';
    completeBtn.addEventListener('click', function() {
        currentToDo = currentProject.todos.find(todo => todo.title === completeBtn.className);
        completeToDo(currentToDo);
    });
    newToDoDiv.appendChild(completeBtn);
   
    const deleteBtn = document.createElement('button');
    deleteBtn.className = newToDo.title;
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        currentToDo = currentProject.todos.find(todo => todo.title === deleteBtn.className);
        deleteToDo(currentToDo);
    });
    newToDoDiv.appendChild(deleteBtn);

    if (newToDo.isCompleted) {
        titleDiv.style.textDecoration = 'line-through';
        newToDoDiv.style.backgroundColor = '#475569';
        completeBtn.style.display = 'none';
    }

    toDoList.appendChild(newToDoDiv);
}

function completeToDo(currentToDo) {
    const ToDoItems = document.querySelectorAll('.todo-item');
    ToDoItems.forEach(item => {
        if (item.dataset.title === currentToDo.title) {
            const currentTitleDiv = item.querySelector('.todo-title');
            if (currentTitleDiv) {
                currentTitleDiv.style.textDecoration = 'line-through';
            }
            item.style.backgroundColor = '#475569';
            const buttons = item.querySelectorAll('button');
            buttons.forEach(button => {
                if (button.textContent === 'Complete') {
                    button.style.display = 'none';
                }
            });
        }
    });
    currentToDo.isCompleted = true;
}

function deleteToDo(currentToDo) {
    const ToDoList = document.querySelector('.todo-list');
    const ToDoItems = document.querySelectorAll('.todo-item');
    ToDoItems.forEach(item => {
        if (item.dataset.title === currentToDo.title) {
            ToDoList.removeChild(item);
        }
    });
    const index = currentProject.todos.findIndex(todo => todo.title === currentToDo.title);
        if (index > -1) {
        currentProject.todos.splice(index, 1);
        }
}

export {addProject, projects, displayProject, addToDo, currentProject, createToDo, currentToDo}