import { createTodoTaskEditFormBtnListener } from './dynamicEventsListeners.js';
import { projectController } from './logic/projects.js';
import { todoController } from './logic/todos.js';
import { renderDom } from './render.js';

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

    function _highlightActiveProjectTab(_currentActiveProjectEl) {
      const _prevActiveProjectEl = document.querySelector(".sidenav__item-project--active");
      if (_prevActiveProjectEl) {
        _prevActiveProjectEl.classList.remove("sidenav__item-project--active");
      }
      _currentActiveProjectEl.classList.add("sidenav__item-project--active");
    }

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

      const _projectName = _addProjectModalFormEl.elements.projectName.value.trim();
      if (_projectName !== '') {
        projectController.create(_projectName);
        renderDom.project.list();
        closeModal();
      } else {
        //TODO error_message modal
        alert("Please, don't leave field blank");
      }
    }

    function activateProject(event) {
      const _activeProjectEl = event.currentTarget;
      const _activeProjectIdx = _activeProjectEl.dataset.index;

      _highlightActiveProjectTab(_activeProjectEl);
      projectController.setActiveProject(_activeProjectIdx);
      renderDom.todo.list(projectController.getActiveProject().id);
    }

    return {
      showModal,
      closeModal,
      addProject,
      activateProject,
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

    function _getTaskEditorFormData(_taskEditorForm) {
      const data = {};

      data.title = _taskEditorForm.elements.title.value.trim();
      data.description = _taskEditorForm.elements.description.value.trim();
      data.dueDate = _taskEditorForm.elements.dueDate.value;

      return data;
    }

    function closeTaskEditorForm(event) {
      const _taskEditorForm = document.querySelector(".task-editor-form");
      const _activeProjectId = projectController.getActiveProject().id;
      _taskEditorForm.reset();
      _taskEditorForm.remove();
      _showTaskEditorAddBtn();
      renderDom.todo.list(_activeProjectId);
    }

    function renderTaskEditorForm(event) {
      renderDom.todo.taskEditForm();
      _hideTaskEditorAddBtn();
    }

    function renderPopulatedTaskEditorForm(event){
      const _todoTaskId = event.currentTarget.parentNode.parentNode.dataset.todoTaskId;
      todoController.setActiveTodoTaskId(_todoTaskId);
      renderDom.todo.taskEditForm(_todoTaskId);
      _hideTaskEditorAddBtn();
    }

    function addTodoTask(event) {
      event.preventDefault();

      const _taskEditorForm = document.querySelector(".task-editor-form");
      const _taskEditorFormData = _getTaskEditorFormData(_taskEditorForm);
      const _activeProjectId = projectController.getActiveProject().id;

      todoController.create(
        _activeProjectId,
        _taskEditorFormData.title,
        _taskEditorFormData.description,
        _taskEditorFormData.dueDate
      );
      closeTaskEditorForm();
    }

    function deleteTodoTask(event) {
      const todoTaskEl = event.currentTarget.parentNode.parentNode;

      if (todoTaskEl.className === "main__task-item") {
        const _isDeleted = todoController.remove(todoTaskEl.dataset.todoTaskId);
        if (_isDeleted) {
          console.log("%cTodo is deleted succussfully", "color:green");
          renderDom.todo.list(projectController.getActiveProject().id);
        }
        else
          console.error("Due to technincal error unable to delete the todo");
      }
    }

    function editTodoTask(event) {
      event.preventDefault();

      const _taskEditorForm = document.querySelector(".task-editor-form");
      const _todoTaskId = todoController.getActiveTodoTaskId();
      const _taskEditorFormData = _getTaskEditorFormData(_taskEditorForm);
      const _isUpdated = todoController.update(
        _todoTaskId,
        _taskEditorFormData.title,
        _taskEditorFormData.description,
        _taskEditorFormData.dueDate
      );
      if(_isUpdated){
        console.log("%cTodo is updated succussfully", "color:green");
        closeTaskEditorForm();
      }
    }


    return {
      taskeditorAddBtnEl,
      renderTaskEditorForm,
      renderPopulatedTaskEditorForm,
      addTodoTask,
      closeTaskEditorForm,
      editTodoTask,
      deleteTodoTask,
    };
  })();

  const mainHeaderDom = (()=>{
    function ProjectHeader(event){

    }

    function TodayHeader(event){

    }
  })();
  
  return { projectDom, sidenavDom, todoTaskDom };
})();

export const { projectDom, sidenavDom, todoTaskDom } = DOMStuff;