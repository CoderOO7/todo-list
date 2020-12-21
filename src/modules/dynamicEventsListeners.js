import { todoTaskDom, projectDom, projectHeaderDom,todoFilterDom } from './domStuff.js';
import { renderDom } from './render.js';

const createTodoTaskBtnListener = (todocheckboxBtnEl, todoContentEl, todoEditBtnEl,todoDeleteBtnEl)=> {
    todocheckboxBtnEl.addEventListener("click",todoTaskDom.toggleTodoTaskCompletedState,false);
    todoContentEl.addEventListener("click",todoTaskDom.showTodoInfoModal,false);
    todoEditBtnEl.addEventListener("click", todoTaskDom.renderPopulatedTaskEditorForm, false);
    todoDeleteBtnEl.addEventListener("click", todoTaskDom.deleteTodoTask, false);
}

const createProjectItemListener = (projectItemEl) => projectItemEl.addEventListener("click", projectDom.activateProject, false);

const createTodoTaskEditFormBtnListener = () => {
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

const createTodoTaskInfoModalListener = (closeBtnEl) => {
    closeBtnEl.addEventListener("click",todoTaskDom.hideTodoInfoModal);
}

const createProjectHeaderListener = () => {
    const projectName = document.querySelector(".main__task-header-heading");
    projectName.addEventListener('click',projectHeaderDom.renderEditHeaderForm);
}

const createProjectHeaderEditFormListener = () => {
    const saveBtn = document.querySelector(".header-edit-form__action-btn--save");
    const cancelBtn =  document.querySelector(".header-edit-form__action-btn--cancel");

    saveBtn.addEventListener("click",projectHeaderDom.submitForm);
    cancelBtn.addEventListener("click",projectHeaderDom.cancelForm);
}

const createTodoFilterTabListener = (filterTabEl) => {
    filterTabEl.addEventListener("click",todoFilterDom.activateFilterTab); 
}

export {
  createProjectItemListener,
  createProjectHeaderListener,
  createProjectHeaderEditFormListener,
  createTodoTaskEditFormBtnListener,
  createTodoTaskInfoModalListener,
  createTodoTaskBtnListener,
  createTodoFilterTabListener,
};