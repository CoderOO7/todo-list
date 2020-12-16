import { todoTaskDom, projectDom } from './domStuff.js';
import { renderDom } from './render.js';

function createTodoTaskBtnListener(todoEditBtnEl,todoDeleteBtnEl) {
    todoEditBtnEl.addEventListener("click", todoTaskDom.renderPopulatedTaskEditorForm, false);
    todoDeleteBtnEl.addEventListener("click", todoTaskDom.deleteTodoTask, false);
}

function createProjectItemListener(projectItemEl) {
    projectItemEl.addEventListener("click", projectDom.activateProject, false);
}

function createTodoTaskEditFormBtnListener() {
    const taskeditorFormAddBtnEl = document.querySelector(".task-editor-form__action-btn--add");
    const taskeditorFormSaveBtnEl = document.querySelector(".task-editor-form__action-btn--save");
    const taskeditorFormCancelBtnEl = document.querySelector(".task-editor-form__action-btn--cancel");

    if(taskeditorFormAddBtnEl){
        taskeditorFormAddBtnEl.addEventListener('click', todoTaskDom.addTodoTask);
    }else{
        taskeditorFormSaveBtnEl.addEventListener('click',todoTaskDom.editTodoTask);
    }
    taskeditorFormCancelBtnEl.addEventListener('click', todoTaskDom.closeTaskEditorForm);
}

export { createTodoTaskEditFormBtnListener, createProjectItemListener, createTodoTaskBtnListener }