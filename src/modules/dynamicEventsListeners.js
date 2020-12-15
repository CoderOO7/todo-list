import { todoTaskDom, projectDom } from './domStuff.js';
import { renderDom } from './render.js';

function createTodoTaskBtnListener(todoEditBtnEl,todoDeleteBtnEl) {
    todoEditBtnEl.addEventListener("click", todoTaskDom.editTodoTask, false);
    todoDeleteBtnEl.addEventListener("click", todoTaskDom.deleteTodoTask, false);
}

function createProjectItemListener(projectItemEl) {
    projectItemEl.addEventListener("click", projectDom.activateProject, false);
}

function createTodoTaskEditFormBtnListener() {
    const taskeditorFormAddBtnEl = document.querySelector(".task-editor-form__action-btn--add");
    const taskeditorFormCancelBtnEl = document.querySelector(".task-editor-form__action-btn--cancel");

    taskeditorFormAddBtnEl.addEventListener('click', todoTaskDom.addTodoTask);
    taskeditorFormCancelBtnEl.addEventListener('click', todoTaskDom.closeTaskEditorForm);
}

export { createTodoTaskEditFormBtnListener, createProjectItemListener, createTodoTaskBtnListener }