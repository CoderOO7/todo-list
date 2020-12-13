import {todoTaskDom} from './domStuff.js';

function createTodoTasksBtnListener(){

}

function createTodoTaskEditFormBtnListener(){
    const taskeditorFormAddBtnEl = document.querySelector(".task-editor-form__action-btn--add");
    const taskeditorFormCancelBtnEl = document.querySelector(".task-editor-form__action-btn--cancel");
    
    taskeditorFormAddBtnEl.addEventListener('click',todoTaskDom.addTodoTask);
    taskeditorFormCancelBtnEl.addEventListener('click',todoTaskDom.closeTaskEditorForm);
}

export {createTodoTaskEditFormBtnListener}