import {
  createProjectItemListener,
  createTodoTaskBtnListener,
  createTodoTaskEditFormBtnListener,
} from "./dynamicEventsListeners.js";
import { projectController } from "./logic/projects.js";
import { todoController } from "./logic/todos.js";
import { format } from "date-fns";

const renderDom = (function () {
  function _clearNode(parentNode) {
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.firstChild);
    }
  }

  const project = (() => {
    function list() {
      const sidenavExpandableListEl = document.querySelector(
        ".sidenav__expandable-list"
      );
      _clearNode(sidenavExpandableListEl);

      const projectArr = projectController.getProjectsList();
      projectArr.forEach((project, idx) => {
        const sidenavItem = document.createElement("li");
        const sidenavItemIcon = document.createElement("span");
        const sidenavItemContent = document.createElement("span");
        const sidenavItemCounter = document.createElement("span");

        sidenavItem.setAttribute(
          "class",
          "sidenav__item sidenav__item-project"
        );
        sidenavItem.setAttribute("data-index", idx);
        sidenavItemIcon.setAttribute("class", "sidenav__item-icon");
        sidenavItemContent.setAttribute("class", "sidenav__item-content");
        sidenavItemCounter.setAttribute("class", "sidenav__item-counter");

        sidenavItemContent.textContent = project.name;

        sidenavExpandableListEl.append(sidenavItem);
        sidenavItem.append(
          sidenavItemIcon,
          sidenavItemContent,
          sidenavItemCounter
        );

        createProjectItemListener(sidenavItem);
      });
    }

    function header() {}

    return { list, header };
  })();

  const todo = (() => {
    function list(_activeProjectId = null) {
      const taskList = document.querySelector(".main__task-list");
      _clearNode(taskList);

      const todosArr = todoController.getTodosList(_activeProjectId);
      todosArr.forEach((todoTask) => {
        const taskItem = document.createElement("li");
        const taskItemInfo = document.createElement("div");
        const taskItemCheck = document.createElement("div");
        const taskItemContent = document.createElement("div");
        const taskItemDueDate = document.createElement("div");
        const taskItemActions = document.createElement("div");
        const taskItemEditBtn = document.createElement("button");
        const taskItemDeleteBtn = document.createElement("button");

        taskItem.setAttribute("class", "main__task-item");
        taskItem.setAttribute("data-todo-task-id", todoTask.id);
        taskItemInfo.setAttribute("class", "main__task-item-info");
        taskItemCheck.setAttribute("class", "main__task-item-check");
        taskItemContent.setAttribute("class", "main__task-item-content");
        taskItemDueDate.setAttribute("class", "main__task-item-dueDate");
        taskItemActions.setAttribute("class", "main__task-item-actions");
        taskItemEditBtn.setAttribute(
          "class",
          "main__task-item-action-btn main__task-item-action-btn--edit"
        );
        taskItemDeleteBtn.setAttribute(
          "class",
          "main__task-item-action-btn main__task-item-action-btn--delete"
        );

        taskItemContent.textContent = todoTask.title;
        taskItemDueDate.textContent = todoTask.dueDate;

        taskItemEditBtn.innerHTML =
          '<svg width="24" height="24"><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"></path><path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"></path></g></svg>';
        taskItemDeleteBtn.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx=".5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z"></path></g></svg>';

        taskItem.append(taskItemInfo, taskItemActions);
        taskItemInfo.append(taskItemCheck, taskItemContent, taskItemDueDate);
        taskItemActions.append(taskItemEditBtn, taskItemDeleteBtn);

        taskList.append(taskItem);

        createTodoTaskBtnListener(taskItemEditBtn, taskItemDeleteBtn);
      });
    }

    function taskEditForm(todoTaskId = null) {
      const taskEditor = document.querySelector(".main__task-editor");
      const taskList = document.querySelector(".main__task-list");

      const todayDate = format(new Date(), "yyyy-MM-dd");

      const form = document.createElement("form");
      const formBody = document.createElement("div");
      const formInputTitle = document.createElement("input");
      const formTextarea = document.createElement("textarea");
      const formExtraFields = document.createElement("div");
      const formInputDatepicker = document.createElement("input");
      const formFooter = document.createElement("div");
      const formActionBtnAdd = document.createElement("button");
      const formActionBtnSave = document.createElement("button");
      const formActionBtnCancel = document.createElement("button");

      form.setAttribute("class", "task-editor-form");
      formBody.setAttribute("class", "task-editor-form__body");
      formInputTitle.setAttribute("class", "task-editor-form__control");
      formInputTitle.setAttribute("type", "text");
      formInputTitle.setAttribute("name", "title");
      formInputTitle.setAttribute("placeholder", "Title: 100DaysOfCode");

      formTextarea.setAttribute("class", "task-editor-form__control");
      formTextarea.setAttribute("name", "description");
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
      formInputDatepicker.setAttribute("name", "dueDate");
      formInputDatepicker.setAttribute("placeholder", "Due Date");
      formInputDatepicker.setAttribute("value", `${todayDate}`);

      formFooter.setAttribute("class", "task-editor-form__footer");
      formActionBtnAdd.setAttribute(
        "class",
        "task-editor-form__action-btn task-editor-form__action-btn--add"
      );
      formActionBtnSave.setAttribute(
        "class",
        "task-editor-form__action-btn task-editor-form__action-btn--save"
      );
      formActionBtnCancel.setAttribute(
        "class",
        "task-editor-form__action-btn task-editor-form__action-btn--cancel"
      );
      formActionBtnCancel.setAttribute("type", "button");

      formActionBtnAdd.textContent = "Add Task";
      formActionBtnSave.textContent = "Save";
      formActionBtnCancel.textContent = "Cancel";

      form.append(formBody, formFooter);
      formBody.append(formInputTitle, formTextarea, formExtraFields);
      formExtraFields.append(formInputDatepicker);

      // Populate the form fields with saved values
      if (todoTaskId !== null && todoTaskId !== undefined) {
        const todoTaskEl = document.querySelector(
          `[data-todo-task-id="${todoTaskId}"]`
        );
        const todoTask = todoController.getTodoTask(todoTaskId);
        formInputTitle.value = todoTask.title;
        formTextarea.value = todoTask.description;
        formInputDatepicker.value = todoTask.dueDate;

        formFooter.append(formActionBtnSave, formActionBtnCancel);
        taskList.replaceChild(form, todoTaskEl);
      } else {
        formFooter.append(formActionBtnAdd, formActionBtnCancel);
        taskEditor.append(form);
      }

      createTodoTaskEditFormBtnListener();
    }

    return { list, taskEditForm };
  })();

  return { project, todo };
})();

export { renderDom };
