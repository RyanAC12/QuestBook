import {projectList, toDoList, newProjectBtn, projectModal, 
    addProjectBtn, cancelProjectBtn, projectTitleInput, projectForm, 
    projectTitle, newToDoBtn, toDoModal, toDoForm, toDoTitleInput,
    addtoDoBtn, cancelToDoBtn, toDoDescInput, toDoDueDateInput, toDoPriorityInput,
    newtoDoBtn} 
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

    toDoList.appendChild(newToDoDiv);
}

export {addProject, projects, displayProject, addToDo, currentProject, createToDo}