import {projectList, toDoList, newProjectBtn, projectModal, 
    addProjectBtn, cancelProjectBtn, projectTitleInput, projectForm, 
    projectTitle, newToDoBtn, toDoModal, toDoForm, toDoTitleInput,
    addtoDoBtn, cancelToDoBtn, newtoDoBtn, header, main, sidebar, 
    projectArea, nightmodeBtn, nightmode, iconSelectModal} from './DOMElements';

function intialPageLoad() {
    projectModal.style.display = 'none';
    projectModal.close();
    toDoModal.style.display = 'none';
    toDoModal.close();
    newtoDoBtn.style.display = 'none';
    toDoList.style.display = 'none';
    iconSelectModal.close();
    iconSelectModal.style.display = 'none';

    const welcomeModal = document.querySelector('.welcome');
    welcomeModal.showModal();
    welcomeModal.style.display = 'flex';
    const enterBtn = document.getElementById('enter');
    enterBtn.addEventListener('click', () => {
        welcomeModal.close();
        welcomeModal.style.display = 'none';
        const backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.play();
    });
}

intialPageLoad();