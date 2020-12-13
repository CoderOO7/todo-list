import { createTodoTaskEditFormBtnListener } from './dynamicEventsListeners.js';
import {projectController} from './logic/projects.js';
import {todoController} from './logic/todos.js';
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
        //TODO error_message modal
        alert("Please, don't leave field blank");
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
      taskeditorAddBtnEl.classList.remove("main__task-editor-action-btn--hide");
    }

    function closeTaskEditorForm(form) {
      form.reset();
      form.remove();
      _showTaskEditorAddBtn();
    }

    function renderTaskEditorForm(event) {
      renderDom.todoTaskEditForm();
      _hideTaskEditorAddBtn();
      createTodoTaskEditFormBtnListener();
    }

    function addTodoTask(event) {
      event.preventDefault();
      const _taskEditorForm = document.querySelector(".task-editor-form");

      const title = _taskEditorForm.elements.title.value;
      const description = _taskEditorForm.elements.description.value;
      const dueDate = _taskEditorForm.elements.dueDate.value;

      todoController.create(1,title,description,dueDate);
      renderDom.todos();
      closeTaskEditorForm(_taskEditorForm);
    }

    return {
      taskeditorAddBtnEl,
      renderTaskEditorForm,
      addTodoTask,
      closeTaskEditorForm,
    };
  })();

  return { projectDom, sidenavDom, todoTaskDom };
})();

export const { projectDom, sidenavDom, todoTaskDom } = DOMStuff;