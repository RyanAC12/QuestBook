import {projectList, toDoList, newProjectBtn, projectModal, 
    addProjectBtn, cancelProjectBtn, projectTitleInput, projectForm, 
    projectTitle, newToDoBtn, toDoModal, toDoForm, toDoTitleInput,
    addtoDoBtn, cancelToDoBtn, newtoDoBtn} from './DOMElements';

function intialPageLoad() {
    projectModal.style.display = 'none';
    projectModal.close();
    toDoModal.style.display = 'none';
    toDoModal.close();
    newtoDoBtn.style.display = 'none';
    toDoList.style.display = 'none';
}

intialPageLoad();