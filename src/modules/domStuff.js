import { DEFAULT_PROJECT_ID } from '../constants.js';
import { projectController } from './logic/projects.js';
import { todoFilterController } from './logic/todoFilters.js';
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

  function _highlightActiveTab(_currentActiveTabEl) {
    const _prevActiveTabEl = document.querySelector(".sidenav__item--active");
    if (_prevActiveTabEl) {
      _prevActiveTabEl.classList.remove("sidenav__item--active");
    }
    _currentActiveTabEl.classList.add("sidenav__item--active");
  }

  function _showEror(formField){
    formField.classList.add("error--validation");

    if(formField.validity.valueMissing){
      formField.setAttribute("Placeholder","Field can't be blank");

    }else if(formField.validity.patternMismatch){
      console.log(formField);
      formField.value = '';
      formField.setAttribute("Placeholder","Allow only alphabets,digits and space");
    }
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
      const _projectNameEl = _addProjectModalFormEl.elements.projectName;
      const _projectName = _projectNameEl.value.trim();

      if (_projectNameEl.validity.valid) {
        projectController.create(_projectName);
        renderDom.project.list();
        closeModal();

      }else{
        _showEror(_projectNameEl);
      }
    }

    function activateProject(event) {
      const _activeProjectEl = event.currentTarget;
      const _activeProjectIdx = _activeProjectEl.dataset.index;

      _highlightActiveTab(_activeProjectEl);
      projectController.setActiveProject(_activeProjectIdx);
      renderDom.project.header();
      renderDom.todo.taskEditButton();
      renderDom.todo.list(projectController.getActiveProjectTodos());
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

  const projectHeaderDom = (()=>{

    function renderEditHeaderForm(event){
      renderDom.project.editHeaderForm();
  }

    function submitForm(event){
      event.preventDefault();

      const _formEl  = document.querySelector(".header-edit-form");
      //fetch form fields value
      const _nameEl = _formEl.elements.name;
      if(_nameEl.validity.valid){
        const _updated = projectController.updateActiveProject(_nameEl.value);
        if(_updated){
          renderDom.project.header();
          renderDom.project.list();
          console.log("%cProject is updated successfully", "color:green");

        }else{
          console.error("Due to technical error unable to update the project");
        }
      }else{
        _showEror(_nameEl);
      }
    }

    function cancelForm(event){
      const _formEl  = document.querySelector(".header-edit-form");

      _formEl.reset();
      _formEl.remove();
      renderDom.project.header();
    }

    return {renderEditHeaderForm,submitForm,cancelForm}
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

    function _hideTaskEditorAddBtn() {
      const taskeditorAddBtnEl = document.querySelector(".main__task-editor-action-btn--add");
      if(taskeditorAddBtnEl){
        taskeditorAddBtnEl.classList.add("main__task-editor-action-btn--hide");
      }
    }

    function _showTaskEditorAddBtn() {
      const taskeditorAddBtnEl = document.querySelector(".main__task-editor-action-btn--add");
      if(taskeditorAddBtnEl){
        taskeditorAddBtnEl.classList.remove("main__task-editor-action-btn--hide");
      }
    }

    function _toggleTodoCheckboxBtn(taskCheckboxBtnEl){
        taskCheckboxBtnEl.getAttribute("aria-checked") === "false"
          ? taskCheckboxBtnEl.setAttribute("aria-checked","true")
          : taskCheckboxBtnEl.setAttribute("aria-checked","false");
    }

    function hideTodoInfoModal(event){ 
      const _todoInfoModalEl = event.currentTarget.parentNode.parentNode;
      if(_todoInfoModalEl.className === "modal__todo-task-info");{
        _todoInfoModalEl.remove();
        _hideBaseModal();
      }
    }

    function showTodoInfoModal(event){
      const _todoTaskId = event.currentTarget.parentNode.parentNode.dataset.todoTaskId;
      _showBaseModal();
      renderDom.todo.taskInfoModal(_todoTaskId);
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

      _taskEditorForm.reset();
      _taskEditorForm.remove();
      _showTaskEditorAddBtn();
      renderDom.todo.list(projectController.getActiveProjectTodos());
    }

    function renderTaskEditorForm(event) {
      console.log(event);
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

      const _titleEl = _taskEditorForm.elements.title;
      if(_titleEl.validity.valid){

        todoController.create(
          _activeProjectId,
          _taskEditorFormData.title,
          _taskEditorFormData.description,
          _taskEditorFormData.dueDate
        );
        closeTaskEditorForm();

      }else{
        _showEror(_titleEl);
      } 
    }

    function deleteTodoTask(event) {
      const todoTaskEl = event.currentTarget.parentNode.parentNode;

      if (todoTaskEl.className === "main__task-item") {
        const _isDeleted = todoController.remove(todoTaskEl.dataset.todoTaskId);
        if (_isDeleted) {
          console.log("%cTodo is deleted successfully", "color:green");
          renderDom.todo.list(projectController.getActiveProjectTodos());
        }
        else
          console.error("Due to technincal error unable to delete the todo");
      }
    }

    function editTodoTask(event) {
      event.preventDefault();

      const _taskEditorForm = document.querySelector(".task-editor-form");
      const _formTitleEl = _taskEditorForm.elements.title;
      const _todoTaskId = todoController.getActiveTodoTaskId();
      const _taskEditorFormData = _getTaskEditorFormData(_taskEditorForm);

      if(_formTitleEl.validity.valid){
        const _isUpdated = todoController.update(
          _todoTaskId,
          _taskEditorFormData.title,
          _taskEditorFormData.description,
          _taskEditorFormData.dueDate
        );
        if(_isUpdated){
          console.log("%cTodo is updated successfully", "color:green");
          closeTaskEditorForm();
        }

      }else{
        _showEror(_formTitleEl);
      }
    }

    function toggleTodoTaskCompletedState(event){
      const _todoTaskCheckboxBtnEl = event.currentTarget;
      const _todoTaskId = event.currentTarget.parentNode.parentNode.dataset.todoTaskId;

      const _todoTaskObj = todoController.getTodoTask(_todoTaskId);
      _todoTaskObj.completed = true;
      const _isUpdated =  todoController.update(
        _todoTaskId,
        _todoTaskObj.title,
        _todoTaskObj.description,
        _todoTaskObj.dueDate,
        _todoTaskObj.completed
      );
      if(_isUpdated){
        _toggleTodoCheckboxBtn(_todoTaskCheckboxBtnEl);
      }
    }


    return {
      renderTaskEditorForm,
      renderPopulatedTaskEditorForm,
      addTodoTask,
      closeTaskEditorForm,
      editTodoTask,
      deleteTodoTask,
      toggleTodoTaskCompletedState,
      showTodoInfoModal,
      hideTodoInfoModal
    };
  })();

  const todoFilterDom = (()=>{
    
    function activateFilterTab(event){
      const _activeFilterTabEl = event.currentTarget;
      const _activeFilterTabIdx = _activeFilterTabEl.dataset.index;

      _highlightActiveTab(_activeFilterTabEl);
      todoFilterController.setActiveFilterTab(_activeFilterTabIdx);
      
      renderDom.todoFilter.header();
      renderDom.todo.list(todoFilterController.getActiveFilterTabTodos());
    }

    return {
      activateFilterTab,
    };
  })();

  return { projectDom, projectHeaderDom, sidenavDom, todoTaskDom, todoFilterDom };
})();

export const { projectDom, projectHeaderDom, sidenavDom, todoTaskDom, todoFilterDom } = DOMStuff;