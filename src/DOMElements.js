import { addProject } from "./ToDo";

// DOM Elements
const projectList = document.querySelector('.project-list');
const toDoList = document.querySelector('.todo-list');
const newProjectBtn = document.querySelector('.newproject');
const projectModal = document.querySelector('.project-entry');
const addProjectBtn = document.querySelector('#addProjectBtn');
const cancelProjectBtn = document.querySelector('#cancelProjectBtn');
const projectTitleInput = document.querySelector('#project-title');
const projectForm = document.querySelector('#project-form');

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

export {projectList, toDoList, newProjectBtn, projectModal, addProjectBtn, cancelProjectBtn, projectTitleInput}