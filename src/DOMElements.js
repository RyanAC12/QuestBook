import { addProject, projects, displayProject, addToDo, currentProject, createToDo, currentToDo, applyColorsBasedOnState } from "./ToDo";

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
const toDoDueDateInput = document.querySelector('#todo-duedate-input');
const toDoPriorityInput = document.querySelector('#todo-priority-input');
const addtoDoBtn = document.querySelector('#addToDoBtn');
const cancelToDoBtn = document.querySelector('#cancelToDoBtn');
const newtoDoBtn = document.querySelector('.buttonarea');

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const sidebar = document.querySelector('.sidebar');
const projectArea = document.querySelector('.project-area');
const nightmodeBtn = document.querySelector('#nightmode-btn');
const nightmodeIcon = document.querySelector('#nightmode-icon');

const muteBtn = document.querySelector('#mute-btn');
const muteIcon = document.querySelector('#mute-icon');


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

// Night Mode feature
let nightmode = false;

nightmodeBtn.addEventListener('click', setNightmode);

function setNightmode() {
    if (nightmode == false) {
        nightmode = true;
        header.style.backgroundColor = '#1f2937';
        header.style.color = '#f3f4f6';

        main.style.backgroundColor = '#1f2937';
        
        sidebar.style.backgroundColor = '#111827';
        sidebar.style.color = '#f3f4f6';

        projectArea.style.backgroundColor = '#111827';
        projectArea.style.color = '#f3f4f6';

        projectModal.style.backgroundColor = '#111827';
        projectModal.style.color = '#f3f4f6';
        toDoModal.style.backgroundColor = '#111827';
        toDoModal.style.color = '#f3f4f6';
        
        nightmodeIcon.style.filter = 'invert(100%)';
        muteIcon.style.filter = 'invert(100%)';
    }
    else if (nightmode == true) {
        nightmode = false;
        header.style.backgroundColor = '#f5f5f4';
        header.style.color = 'black';

        main.style.backgroundColor = '#f5f5f4';
        
        sidebar.style.backgroundColor = '#a8a29e';
        sidebar.style.color = 'black';

        projectArea.style.backgroundColor = '#d6d3d1';
        projectArea.style.color = 'black';

        projectModal.style.backgroundColor = 'white';
        projectModal.style.color = 'black';
        toDoModal.style.backgroundColor = 'white';
        toDoModal.style.color = 'black';

        nightmodeIcon.style.filter = 'none';
        muteIcon.style.filter = 'none';
    }
    console.log(currentProject.todos);
    
    
    const ToDoItems = document.querySelectorAll('.todo-item');
    currentProject.todos.forEach(todo => {
        ToDoItems.forEach(item => {
            if (item.dataset.title === todo.title) {
                if (todo.isCompleted == true) {
                    completedCheck = true;
                }
                else {
                    completedCheck = false;
                }
                applyColorsBasedOnState(item, completedCheck);
            }
        });
    });
}
let completedCheck = '';


// Mute background music
function toggleMute() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic) {
        backgroundMusic.muted = !backgroundMusic.muted;
        if (backgroundMusic.muted) {
            muteIcon.src = '/src/assets/volume-off.svg'
        }
        else {
            muteIcon.src = '/src/assets/volume-high.svg'
        }
    }
    else {
        console.error('Audio element not found');
    }
}

muteBtn.addEventListener('click', toggleMute);

// Button click sound effect
const buttonSound = document.getElementById('buttonSound');

const buttons = document.querySelectorAll('.sfx');
buttons.forEach(button => {
    button.addEventListener('click', playButtonSound)
});

function playButtonSound() {
    buttonSound.play();
}

// Exports
export {projectList, toDoList, newProjectBtn, projectModal, 
    addProjectBtn, cancelProjectBtn, projectTitleInput, projectForm, 
    projectTitle, newToDoBtn, toDoModal, toDoForm, toDoTitleInput,
    addtoDoBtn, cancelToDoBtn, toDoDueDateInput, toDoPriorityInput,
    newtoDoBtn, header, main, sidebar, projectArea, nightmodeBtn, nightmode}