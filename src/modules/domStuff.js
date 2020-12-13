import { createTodoTaskEditFormBtnListener } from './dynamicEventsListeners.js';
import {projectController} from './logic/projects.js';
import {renderDom} from './render.js';

const DOMStuff = (function () {
  const modalEl = document.querySelector(".modal");

  function _showBaseModal() {
    modalEl.classList.remove("modal--close");
  }

  function _hideBaseModal() {
    modalEl.classList.add("modal--close");
  }

  function _toggleClassName(el, className) {
    el.classList.toggle(className);
  }

  const projectDom = (() => {
    const showModalBtnEl = document.querySelector(
      ".sidenav__expandable-action--show-project-modal"
    );
    const _addProjectModalEl = document.querySelector(
      ".modal__item[data-modal='add-project']"
    );
    const _addProjectModalFormEl = document.querySelector(
      ".modal__form--add-project"
    );
    const addProjectModalFormBtnEl = document.querySelector(
      ".modal__form-action-btn--add-project"
    );
    const cancelProjectModalFormBtnEl = document.querySelector(
      ".modal__form-action-btn--cancel-project"
    );

    function showModal(event) {
      _showBaseModal();
      _addProjectModalEl.classList.remove("modal__item--close");
    }

    function closeModal(event) {
      _hideBaseModal();
      _addProjectModalFormEl.reset();
      _addProjectModalEl.classList.add("modal__item--close");
    }

    function addProject(event) {
      event.preventDefault();
      
      const _projectName = _addProjectModalFormEl.elements[0].value;
      if(_projectName !== ''){
        projectController.create(_projectName);
        renderDom.projects();
        closeModal();
      }else{
        //TODO error message modal
        alert("Please, don't leave input field blank");
      }
    }

    return {
      showModal,
      closeModal,
      addProject,
      showModalBtnEl,
      addProjectModalFormBtnEl,
      cancelProjectModalFormBtnEl,
    };
  })();

  const sidenavDom = (() => {
    const _sidenavEl = document.querySelector(".sidenav");
    const _sidenavExpandableListEl = document.querySelector(
      ".sidenav__expandable-list"
    );
    const sidenavToggleBtnEl = document.querySelector(".header__hamburger-btn");
    const sidenavExpandabletoggleEl = document.querySelector(
      ".sidenav__expandable-toggle"
    );

    function toggleSidenav() {
      _toggleClassName(_sidenavEl, "sidenav--active");
    }

    function toggleSidenavExpandableList() {
      _toggleClassName(
        _sidenavExpandableListEl,
        "sidenav__expandable-list--collapse"
      );
      // Toggle aria-expanded value
      sidenavExpandabletoggleEl.getAttribute("aria-expanded") === "true"
        ? sidenavExpandabletoggleEl.setAttribute("aria-expanded", "false")
        : sidenavExpandabletoggleEl.setAttribute("aria-expanded", "true");
    }

    return {
      toggleSidenav,
      toggleSidenavExpandableList,
      sidenavToggleBtnEl,
      sidenavExpandabletoggleEl,
    };
  })();

  const todoTaskDom = (() => {
    const taskeditorAddBtnEl = document.querySelector(".main__task-editor-action-btn--add");

    function _hideTaskEditorAddBtn() {
      taskeditorAddBtnEl.classList.add("main__task-editor-action-btn--hide");
    }

    function _showTaskEditorAddBtn() {
      console.log(taskeditorAddBtnEl);
      taskeditorAddBtnEl.classList.remove("main__task-editor-action-btn--hide");
    }

    function closeTaskEditorForm() {
      const taskEditorForm = document.querySelector(".task-editor-form");

      taskEditorForm.reset();
      taskEditorForm.remove();
      _showTaskEditorAddBtn();
    }

    function renderTaskEditorForm(event) {
      if (event.target.className.includes("main__task-editor-action-btn--add")) {
        const taskEditor = document.querySelector(".main__task-editor");

        const form = document.createElement("form");
        const formBody = document.createElement("div");
        const formInputTitle = document.createElement("input");
        const formTextarea = document.createElement("textarea");
        const formExtraFields = document.createElement("div");
        const formInputDatepicker = document.createElement("input");
        const formFooter = document.createElement("div");
        const formActionBtnAdd = document.createElement("button");
        const formActionBtnCancel = document.createElement("button");

        form.setAttribute("class", "task-editor-form");
        formBody.setAttribute("class", "task-editor-form__body");
        formInputTitle.setAttribute("class", "task-editor-form__control");
        formInputTitle.setAttribute("type", "text");
        formInputTitle.setAttribute("placeholder", "Title: 100DaysOfCode");

        formTextarea.setAttribute("class", "task-editor-form__control");
        formTextarea.setAttribute("cols", "30");
        formTextarea.setAttribute("rows", "3");
        formTextarea.setAttribute(
          "placeholder",
          "Description: eg. Code daily at least 1-hour for 100Days"
        );

        formExtraFields.setAttribute("class", "task-editor-form__extra_fields");
        formInputDatepicker.setAttribute(
          "class",
          "task-editor-form__control task-editor-form__control--datepicker"
        );
        formInputDatepicker.setAttribute("type", "date");
        formInputDatepicker.setAttribute("placeholder", "Due Date");

        formFooter.setAttribute("class", "task-editor-form__footer");
        formActionBtnAdd.setAttribute(
          "class",
          "task-editor-form__action-btn task-editor-form__action-btn--add"
        );
        formActionBtnCancel.setAttribute(
          "class",
          "task-editor-form__action-btn task-editor-form__action-btn--cancel"
        );

        formActionBtnAdd.textContent = "Add Task";
        formActionBtnCancel.textContent = "Cancel";

        form.append(formBody, formFooter);
        formBody.append(formInputTitle, formTextarea, formExtraFields);
        formExtraFields.append(formInputDatepicker);

        formFooter.append(formActionBtnAdd, formActionBtnCancel);

        taskEditor.insertBefore(form, taskEditor.childNodes[0]);

        _hideTaskEditorAddBtn();
        createTodoTaskEditFormBtnListener();
      }
    }

    function addTaskToDom(event) {
      event.preventDefault();
      if ( event.target.className.includes("task-editor-form__action-btn--add")) {
        const taskEditorForm = document.querySelector(".task-editor-form"); 
        const taskList = document.querySelector(".main__task-list");

        const taskItem = document.createElement("li");
        const taskItemInfo = document.createElement("div");
        const taskItemCheck = document.createElement("div");
        const taskItemContent = document.createElement("div");
        const taskItemDueDate = document.createElement("div");
        const taskItemActions = document.createElement("div");
        const taskItemEditBtn = document.createElement("button");
        const taskItemDeleteBtn = document.createElement("button");

        taskItem.setAttribute("class", "main__task-item");
        taskItemInfo.setAttribute("class", "main__task-item-info");
        taskItemCheck.setAttribute("class", "main__task-item-check");
        taskItemContent.setAttribute("class", "main__task-item-content");
        taskItemDueDate.setAttribute("class", "main__task-item-dueDate");
        taskItemActions.setAttribute("class", "main__task-item-actions");
        taskItemEditBtn.setAttribute("class","main__task-item-action-btn main__task-item-action-btn--edit");
        taskItemDeleteBtn.setAttribute("class","main__task-item-action-btn main__task-item-action-btn--delete");

        taskItemContent.textContent = taskEditorForm.elements[0].value;
        taskItemDueDate.textContent = taskEditorForm.elements[2].value;

        taskItemEditBtn.innerHTML =
            '<svg width="24" height="24"><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"></path><path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"></path></g></svg>';
        taskItemDeleteBtn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx=".5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z"></path></g></svg>';

        taskItem.append(taskItemInfo, taskItemActions);
        taskItemInfo.append(taskItemCheck,taskItemContent,taskItemDueDate);
        taskItemActions.append(taskItemEditBtn, taskItemDeleteBtn);
        
        taskList.insertBefore(taskItem, taskList.childNodes[0]);
        closeTaskEditorForm();
      }

      
    }

    return {
      taskeditorAddBtnEl,
      renderTaskEditorForm,
      addTaskToDom,
      closeTaskEditorForm,
    };
  })();

  return { projectDom, sidenavDom, todoTaskDom };
})();

export const { projectDom, sidenavDom, todoTaskDom } = DOMStuff;