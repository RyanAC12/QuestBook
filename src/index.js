import {projectList, toDoList, newProjectBtn, projectModal, 
    addProjectBtn, cancelProjectBtn, projectTitleInput, projectForm, 
    projectTitle, newToDoBtn, toDoModal, toDoForm, toDoTitleInput,
    addtoDoBtn, cancelToDoBtn} from './DOMElements';

function intialPageLoad() {
    projectModal.style.display = 'none';
    projectModal.close();
    toDoModal.style.display = 'none';
    toDoModal.close();
}

intialPageLoad();