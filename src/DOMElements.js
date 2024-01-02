import { addProject, projects, displayProject, addToDo, currentProject, createToDo, currentToDo, applyColorsBasedOnState, deleteProject, saveProjects, loadProjects } from "./ToDo";

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
const deleteProjectBtn = document.querySelector('#delete-project');
const deleteProjectModal = document.querySelector('.delete-confirmation');
const sidebarClose = document.querySelector('#sidebar-close');

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
        sidebar.classList.toggle('open');
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

deleteProjectBtn.addEventListener('click', function() {
    if (currentProject !== '') {
        deleteProjectModal.showModal();
        deleteProjectModal.style.display = 'flex'; 
    }
    else {
        return;
    }
});

const confirmProjectDelete = document.querySelector('#delete-yes');
const cancelProjectDelete = document.querySelector('#delete-no');

cancelProjectDelete.addEventListener('click', () => {
    deleteProjectModal.close();
    deleteProjectModal.style.display = 'none';
})

confirmProjectDelete.addEventListener('click', function() {
    deleteProject(currentProject);
    deleteProjectModal.close();
    deleteProjectModal.style.display = 'none';
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
        sidebar.style.borderColor = 'white';

        projectArea.style.backgroundColor = '#111827';
        projectArea.style.color = '#f3f4f6';
        projectArea.style.borderColor = 'white';

        projectModal.style.backgroundColor = '#111827';
        projectModal.style.color = '#f3f4f6';
        toDoModal.style.backgroundColor = '#111827';
        toDoModal.style.color = '#f3f4f6';
        iconSelectModal.style.backgroundColor = '#111827';
        iconSelectModal.style.color = '#f3f4f6';
        deleteProjectModal.style.backgroundColor = '#111827';
        deleteProjectModal.style.color = '#f3f4f6';
        
        nightmodeIcon.style.filter = 'invert(100%)';
        muteIcon.style.filter = 'invert(100%)';
        sidebarMenu.style.filter = 'invert(100%)';
        sidebarClose.style.filter = 'invert(100%)';
        deleteProjectBtn.style.filter = 'invert(100%)';        
    }
    else if (nightmode == true) {
        nightmode = false;
        header.style.backgroundColor = '#f5f5f4';
        header.style.color = 'black';

        main.style.backgroundColor = '#f5f5f4';
        
        sidebar.style.backgroundColor = '#a8a29e';
        sidebar.style.color = 'black';
        sidebar.style.borderColor = 'black';

        projectArea.style.backgroundColor = '#d6d3d1';
        projectArea.style.color = 'black';
        projectArea.style.borderColor = 'black';

        projectModal.style.backgroundColor = 'white';
        projectModal.style.color = 'black';
        toDoModal.style.backgroundColor = 'white';
        toDoModal.style.color = 'black';
        iconSelectModal.style.backgroundColor = 'white';
        iconSelectModal.style.color = 'black';
        deleteProjectModal.style.backgroundColor = 'white';
        deleteProjectModal.style.color = 'black';

        nightmodeIcon.style.filter = 'none';
        muteIcon.style.filter = 'none';
        sidebarMenu.style.filter = 'none';
        sidebarClose.style.filter = 'none';
        deleteProjectBtn.style.filter = 'none';
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
            muteIcon.src = 'assets/volume-off.svg'
        }
        else {
            muteIcon.src = 'assets/volume-high.svg'
        }
    }
    else {
        console.error('Audio element not found');
    }
}

muteBtn.addEventListener('click', toggleMute);

// Icon Select
const iconSelectModal = document.querySelector('.icon-select');
const icons = document.querySelectorAll('.icon');
const iconSelectBtn = document.getElementById('icon-select-btn');

const currentIcon = document.querySelector('.currenticon');

iconSelectBtn.addEventListener('click', () => {
    iconSelectModal.style.display = 'flex';
    iconSelectModal.showModal();
});

icons.forEach(icon => {
    icon.addEventListener('click', () => {
            if (icon.id !== 'tree') {
                currentIcon.src = `assets/${icon.id}.gif`
                currentIcon.style.scale = '2.5';
            }
            else if (icon.id == 'tree') {
                currentIcon.src = `assets/tree.png`
                currentIcon.style.scale = '2';
            }
            iconSelectModal.close();
            iconSelectModal.style.display = 'none';
    });
});

// Mobile configurations
const sidebarMenu = document.getElementById('sidebar-menu');
sidebarMenu.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

const closeSidebar = document.getElementById('sidebar-close');
closeSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Exports
export {projectList, toDoList, newProjectBtn, projectModal, 
    addProjectBtn, cancelProjectBtn, projectTitleInput, projectForm, 
    projectTitle, newToDoBtn, toDoModal, toDoForm, toDoTitleInput,
    addtoDoBtn, cancelToDoBtn, toDoDueDateInput, toDoPriorityInput,
    newtoDoBtn, header, main, sidebar, projectArea, nightmodeBtn, nightmode, 
    iconSelectModal, deleteProjectModal, deleteProjectBtn}