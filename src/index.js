import {projectList, toDoList, newProjectBtn, projectModal, 
    addProjectBtn, cancelProjectBtn, projectTitleInput, projectForm, 
    projectTitle, newToDoBtn, toDoModal, toDoForm, toDoTitleInput,
    addtoDoBtn, cancelToDoBtn, newtoDoBtn, header, main, sidebar, 
    projectArea, nightmodeBtn, nightmode, iconSelectModal, deleteProjectModal} from './DOMElements';

import { saveProjects, loadProjects, createProjectElement, renderProjects } from './ToDo';

import './styles.css';

function intialPageLoad() {
    loadProjects();
    renderProjects();

    projectModal.style.display = 'none';
    projectModal.close();
    toDoModal.style.display = 'none';
    toDoModal.close();
    newtoDoBtn.style.display = 'none';
    toDoList.style.display = 'none';
    iconSelectModal.close();
    iconSelectModal.style.display = 'none';
    deleteProjectModal.close();
    deleteProjectModal.style.display = 'none';

    const welcomeModal = document.querySelector('.welcome');
    welcomeModal.showModal();
    welcomeModal.style.display = 'flex';
    const enterBtn = document.getElementById('enter');
    enterBtn.addEventListener('click', () => {
        welcomeModal.close();
        welcomeModal.style.display = 'none';
        const backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.volume = 0.1;
        backgroundMusic.play();
    });
}

intialPageLoad(); 