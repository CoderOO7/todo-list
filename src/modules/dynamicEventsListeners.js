import { todoTaskDom, projectDom, projectHeaderDom } from './domStuff.js';
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

function createProjectHeaderListener(){
    const projectName = document.querySelector(".main__task-header-heading");
    projectName.addEventListener('click',projectHeaderDom.renderEditHeaderForm);
}

function createProjectHeaderEditFormListener(){
    const saveBtn = document.querySelector(".header-edit-form__action-btn--save");
    const cancelBtn =  document.querySelector(".header-edit-form__action-btn--cancel");

    saveBtn.addEventListener("click",projectHeaderDom.submitForm);
    cancelBtn.addEventListener("click",projectHeaderDom.cancelForm);
}

export {
  createProjectItemListener,
  createProjectHeaderListener,
  createProjectHeaderEditFormListener,
  createTodoTaskEditFormBtnListener,
  createTodoTaskBtnListener,
};