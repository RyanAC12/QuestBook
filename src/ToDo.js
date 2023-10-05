import {projectList, toDoList, newProjectBtn, projectModal, addProjectBtn, cancelProjectBtn, projectTitleInput} from './DOMElements';

// Project list
let projects = [];


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
        alert('Please enter a quest name!')
    }
    const newProject = new Project(projectTitleInput.value);
    projects.push(newProject);
    const newProjectDiv = document.createElement('div');
    newProjectDiv.className = 'project';
    newProjectDiv.textContent = newProject.title;

    projectList.appendChild(newProjectDiv);
    projectTitleInput.value = '';

    projectModal.style.display = 'none';
    projectModal.close();
}

export {addProject, projects}