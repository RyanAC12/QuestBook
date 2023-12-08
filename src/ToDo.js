import {projectList, toDoList, newProjectBtn, projectModal, 
    addProjectBtn, cancelProjectBtn, projectTitleInput, projectForm, 
    projectTitle, newToDoBtn, toDoModal, toDoForm, toDoTitleInput,
    addtoDoBtn, cancelToDoBtn, toDoDueDateInput, toDoPriorityInput,
    newtoDoBtn, header, main, sidebar, projectArea, nightmodeBtn, nightmode,
    deleteProjectBtn} 
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
function ToDo(title, dueDate, priority, isCompleted) {
    this.title = title
    this.dueDate = dueDate
    this.priority = priority
    this.isCompleted = isCompleted;
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
    saveProjects();
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
    deleteProjectBtn.style.display = 'flex';

    projectTitle.innerHTML = '';
    projectTitle.textContent = displayProject.title;
    toDoList.innerHTML = '';

    if (currentProject.todos == '') {
        return;
    }
    else {
     currentProject.todos.forEach(item => createToDo(item));
    }
    saveProjects();
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
        toDoDueDateInput.value, 
        toDoPriorityInput.value);

    
    currentProject.todos.push(newToDo);
    createToDo(newToDo);

    toDoTitleInput.value = '';
    toDoDueDateInput.value = '';
    toDoPriorityInput.value = '';

    toDoModal.style.display = 'none';
    toDoModal.close();
    saveProjects();
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
        completeBtn.style.display = 'none';
    }

    applyColorsBasedOnState(newToDoDiv, newToDo.isCompleted);
    
    toDoList.appendChild(newToDoDiv);
}


// Complete to-do items
function completeToDo(currentToDo) {
    const ToDoItems = document.querySelectorAll('.todo-item');
    ToDoItems.forEach(item => {
        if (item.dataset.title === currentToDo.title) {
            const currentTitleDiv = item.querySelector('.todo-title');
            if (currentTitleDiv) {
                currentTitleDiv.style.textDecoration = 'line-through';
            }
            if (nightmode == true) {
                item.style.backgroundColor = '#334155';
            }
            else {
                item.style.backgroundColor = '#737373';
            }
            const buttons = item.querySelectorAll('button');
            buttons.forEach(button => {
                if (button.textContent === 'Complete') {
                    button.style.display = 'none';
                }
            });
        }
    });
    currentToDo.isCompleted = true;
    saveProjects();
}


// Delete to-do items
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
    saveProjects();
}


// Delete projects
function deleteProject(currentProject) {
    const ProjectList = document.querySelector('.project-list');
    const projectsEach = document.querySelectorAll('.project');
    projectsEach.forEach(project => {
        if (project.dataset.title === currentProject.title) {
            ProjectList.removeChild(project);
        }
    });
    const index = projects.findIndex(project => project.title === currentProject.title);
        if (index > -1) {
        projects.splice(index, 1);
        }
    projectTitle.innerHTML = '';
    toDoList.innerHTML = '';
    newtoDoBtn.style.display = 'none';
    toDoList.style.display = 'none';
    currentProject = '';
    deleteProjectBtn.style.display = 'none';
    saveProjects();
}

// Function for dynamic colors on objects in nightmode
function applyColorsBasedOnState(item, isCompleted) {
    if (nightmode == true) {
        item.style.backgroundColor = isCompleted ? '#334155' : '#64748b';
    }
    else {
        item.style.backgroundColor = isCompleted ? '#737373' : '#e5e5e5';
    }
}

// LocalStorage Implementation
// Function to save projects
function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Function to load projects
function loadProjects() {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
        const parsedProjects = JSON.parse(savedProjects);

        // Instantiate each project and its to-dos
        projects = parsedProjects.map(projData => {
            const project = new Project(projData.title);
            project.todos = projData.todos.map(todoData => 
                new ToDo(todoData.title, todoData.dueDate, todoData.priority, todoData.isCompleted)
            );
            return project;
        });
    }
}

// Create and render projects for page reloads
function renderProjects() {
    projectList.innerHTML = ''
    projects.forEach(project => {
        createProjectElement(project)
    })
}

function createProjectElement(project) {
    const newProjectDiv = document.createElement('div');
    newProjectDiv.className = 'project';
    newProjectDiv.dataset.title = project.title;
    newProjectDiv.textContent = project.title;

    projectList.appendChild(newProjectDiv);
}

export {addProject, projects, displayProject, addToDo, currentProject, createToDo, currentToDo, applyColorsBasedOnState, deleteProject, saveProjects, loadProjects, createProjectElement, renderProjects}