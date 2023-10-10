import {projectList, toDoList, newProjectBtn, projectModal, 
    addProjectBtn, cancelProjectBtn, projectTitleInput, projectForm, 
    projectTitle, newToDoBtn, toDoModal, toDoForm, toDoTitleInput,
    addtoDoBtn, cancelToDoBtn, toDoDescInput, toDoDueDateInput, toDoPriorityInput} 
    from './DOMElements';

// Project list
let projects = [];
let currentProject = "";

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

function displayProject(projectID) {
    const displayProject = projects.find(p => p.title === projectID);
    if (!displayProject) {
        alert('Project not found');
        return;
    }

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
    descriptionDiv.textContent = newToDo.description;
    newToDoDiv.appendChild(descriptionDiv);

    const dateDiv = document.createElement('div');
    dateDiv.className = 'todo-date';
    dateDiv.textContent = newToDo.dueDate;
    newToDoDiv.appendChild(dateDiv);

    const priorityDiv = document.createElement('div');
    priorityDiv.className = 'todo-priority';
    priorityDiv.textContent = newToDo.priority;
    newToDoDiv.appendChild(priorityDiv);

    toDoList.appendChild(newToDoDiv);
}

export {addProject, projects, displayProject, addToDo, currentProject, createToDo}