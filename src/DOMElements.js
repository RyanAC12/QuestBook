import { addProject, projects, displayProject, addToDo, currentProject, createToDo } from "./ToDo";

// DOM Elements
const projectList = document.querySelector('.project-list');
const newProjectBtn = document.querySelector('.newproject');
const projectModal = document.querySelector('.project-entry');
const projectForm = document.querySelector('#project-form');
const projectTitleInput = document.querySelector('#project-title-input');
const addProjectBtn = document.querySelector('#addProjectBtn');
const cancelProjectBtn = document.querySelector('#cancelProjectBtn');

const projectTitle = document.querySelector('.project-title');
const toDoList = document.querySelector('.todo-list');
const newToDoBtn = document.querySelector('.new-todo');
const toDoModal = document.querySelector('.todo-entry');
const toDoForm = document.querySelector('#todo-form')
const toDoTitleInput = document.querySelector('#todo-title-input');
const toDoDescInput = document.querySelector('#todo-description-input');
const toDoDueDateInput = document.querySelector('#todo-duedate-input');
const toDoPriorityInput = document.querySelector('#todo-priority-input');
const addtoDoBtn = document.querySelector('#addToDoBtn');
const cancelToDoBtn = document.querySelector('#cancelToDoBtn');



// Event listeners
newProjectBtn.addEventListener('click', () => {
    projectModal.style.display = 'block';
    projectModal.showModal();
});

cancelProjectBtn.addEventListener('click', () => {
    projectModal.style.display = 'none';
    projectModal.close();
});

projectForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addProject();
});

projectList.addEventListener('click', function(e) {
    if (e.target.classList.contains('project')) {
        const projectID = e.target.dataset.title;
        currentProject = projects.find(project => project.title === projectID);
        displayProject(projectID);
    }
});

newToDoBtn.addEventListener('click', () => {
    toDoModal.style.display = 'block';
    toDoModal.showModal();
});

cancelToDoBtn.addEventListener('click', () => {
    toDoModal.style.display = 'none';
    toDoModal.close();
});

toDoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addToDo();
});

// Exports
export {projectList, toDoList, newProjectBtn, projectModal, 
    addProjectBtn, cancelProjectBtn, projectTitleInput, projectForm, 
    projectTitle, newToDoBtn, toDoModal, toDoForm, toDoTitleInput,
    addtoDoBtn, cancelToDoBtn, toDoDescInput, toDoDueDateInput, toDoPriorityInput}