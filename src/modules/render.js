import {
  createProjectItemListener,
  createProjectHeaderListener,
  createProjectHeaderEditFormListener,
  createTodoTaskBtnListener,
  createTodoTaskEditFormBtnListener,
  createTodoFilterTabListener,
  createTodoTaskInfoModalListener
} from "./dynamicEventsListeners.js";
import { projectController } from "./logic/projects.js";
import { todoController } from "./logic/todos.js";
import {todoFilterController} from "./logic/todoFilters.js";
import {clearNode,getTodayDate} from "./helper.js";
import { todoTaskDom } from "./domStuff.js";

const renderDom = (function () {
  
  const project = (() => {
    function list() {
      const sidenavExpandableListEl = document.querySelector(
        ".sidenav__expandable-list"
      );
      clearNode(sidenavExpandableListEl);

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

    function header() {
      const mainHeaderEl = document.querySelector(".main__task-header");
      clearNode(mainHeaderEl);

      const headerContent = document.createElement("div");
      headerContent.classList.add("main__task-header-content");

      const headerHeading = document.createElement("h1");
      headerHeading.classList.add("main__task-header-heading");
      headerHeading.textContent = projectController.getActiveProject().name;

      const headerActions = document.createElement("div");
      headerActions.classList.add("main__task-header-actions");

      const headerActionBtn = document.createElement("button");
      headerActionBtn.classList.add(
        "main__task-header-action-btn",
        "main__task-header-action-btn--sort"
      );
      headerActionBtn.innerHTML = `Due Date 
            <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M16.854 5.146l3 3a.502.502 0 01-.708.708L17 6.707V18.5a.5.5 0 01-1 0V6.707l-2.146 2.147a.502.502 0 01-.708-.708l3-3a.502.502 0 01.708 0zM7.5 5a.5.5 0 01.5.5v11.791l2.146-2.145a.502.502 0 01.708.708l-3 3a.502.502 0 01-.708 0l-3-3a.502.502 0 01.708-.708L7 17.293V5.5a.5.5 0 01.5-.5z">
            </path>
        </svg>`;

      headerContent.append(headerHeading, headerActions);
      headerActions.append(headerActionBtn);
      //Append to DOM
      mainHeaderEl.append(headerContent, headerActions);
      //Attach listener to header fields
      createProjectHeaderListener();
    }

    function editHeaderForm() {
      const mainHeaderContentEl = document.querySelector(".main__task-header-content");
      clearNode(mainHeaderContentEl);

      const form = document.createElement("form");
      const formBody = document.createElement("div");
      const formInputProjectName = document.createElement("input");
      const formFooter = document.createElement("div");
      const formActionBtnSave = document.createElement("button");
      const formActionBtnCancel = document.createElement("button");

      form.classList.add("header-edit-form");
      formBody.classList.add("header-edit-form__body");
      
      formInputProjectName.classList.add("header-edit-form__control");
      formInputProjectName.setAttribute("type", "text");
      formInputProjectName.setAttribute("name", "name");
      formInputProjectName.value = projectController.getActiveProject().name;

      formActionBtnSave.textContent = "Save";
      formActionBtnSave.classList.add(
        "header-edit-form__action-btn","header-edit-form__action-btn--save"
      );
      formActionBtnCancel.textContent = "Cancel";
      formActionBtnCancel.setAttribute("type","button");
      formActionBtnCancel.classList.add(
        "header-edit-form__action-btn","header-edit-form__action-btn--cancel"
      );

      formFooter.classList.add("header-edit-form__footer");

      form.append(formBody,formFooter);
      formBody.append(formInputProjectName);
      formFooter.append(formActionBtnSave, formActionBtnCancel);
      //Append to DOM
      mainHeaderContentEl.appendChild(form);
      //Attach listener to form fields
      createProjectHeaderEditFormListener();
    }

    return { list, header, editHeaderForm };
  })();

  const todo = (() => {
    function list(_todosArr = null) {
      const taskList = document.querySelector(".main__task-list");
      clearNode(taskList);
      
      if(_todosArr !== null && _todosArr.length > 0){
        _todosArr.forEach((todoTask) => {
          const taskItem = document.createElement("li");
          const taskItemInfo = document.createElement("div");
          const taskItemCheckboxBtn = document.createElement("button");
          const taskItemCheckboxCircle = document.createElement("div");
          const taskItemContent = document.createElement("div");
          const taskItemDueDate = document.createElement("div");
          const taskItemActions = document.createElement("div");
          const taskItemEditBtn = document.createElement("button");
          const taskItemDeleteBtn = document.createElement("button");
  
          taskItem.setAttribute("class", "main__task-item");
          taskItem.setAttribute("data-todo-task-id", todoTask.id);
          taskItemInfo.setAttribute("class", "main__task-item-info");
          taskItemCheckboxBtn.setAttribute("type", "button");
          taskItemCheckboxBtn.setAttribute("role", "checkbox");
          if(todoTask.isCompleted){
            taskItemCheckboxBtn.setAttribute("aria-checked", "true");
          }else{
            taskItemCheckboxBtn.setAttribute("aria-checked", "false");
          }
          taskItemCheckboxBtn.setAttribute("class", "main__task-item-checkbox-btn");
          taskItemCheckboxCircle.setAttribute("class", "main__task-item-checkbox-circle");
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
  
          taskItemCheckboxCircle.innerHTML = `<svg width="24" height="24"><path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path></svg>`;
          taskItemContent.textContent = todoTask.title;
          taskItemDueDate.textContent = todoTask.dueDate;
  
          taskItemEditBtn.innerHTML =
            '<svg width="24" height="24"><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"></path><path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"></path></g></svg>';
          taskItemDeleteBtn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx=".5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z"></path></g></svg>';
  
          taskItem.append(taskItemInfo, taskItemActions);
          taskItemInfo.append(taskItemCheckboxBtn, taskItemContent, taskItemDueDate);
          taskItemCheckboxBtn.append(taskItemCheckboxCircle);
          taskItemActions.append(taskItemEditBtn, taskItemDeleteBtn);
  
          taskList.append(taskItem);
  
          createTodoTaskBtnListener(taskItemCheckboxBtn, taskItemContent, taskItemEditBtn, taskItemDeleteBtn);
        });
      }
    }

    function taskEditForm(todoTaskId = null) {
      const taskEditor = document.querySelector(".main__task-editor");
      const taskList = document.querySelector(".main__task-list");

      const todayDate = getTodayDate();

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

    function taskInfoModal(todoTaskId){
      const _baseModalEl = document.querySelector(".modal");

      const _todoTask = todoController.getTodoTask(todoTaskId);
      
      const modalItem = document.createElement("section");
      const modalHeader = document.createElement("header");
      const closeBtn = document.createElement("span");
      const modalBody = document.createElement("div");
      const taskTitle = document.createElement("h1");
      const taskDescription = document.createElement("p");
      const taskDueDate = document.createElement("p");
      const taskProject = document.createElement("p");

      modalItem.classList.add("modal__item","modal__todo-task-info");
      modalHeader.classList.add("modal__todo-task-info_header");
      modalBody.classList.add("modal__todo-task-info_body");
      taskTitle.classList.add("modal__todo-task-info_title");
      
      closeBtn.classList.add("modal__todo-task-info_btn--close");
      closeBtn.setAttribute("role","button");
      closeBtn.textContent = "X";
      
      taskTitle.textContent = _todoTask.title;
      taskDescription.textContent = `Description: ${_todoTask.description}`;
      taskDueDate.textContent = `DueDate: ${_todoTask.dueDate}`;
      taskProject.textContent = `Project: ${projectController.getProjectById(_todoTask.projectId).name}`;

      modalItem.append(modalHeader,modalBody);
      modalHeader.append(taskTitle,closeBtn);
      modalBody.append(taskDescription,taskDueDate,taskProject);
      _baseModalEl.append(modalItem);

      createTodoTaskInfoModalListener(closeBtn);
    }


    return { list, taskEditForm, taskInfoModal };
  })();

  const todoFilter = (()=>{
    function header(){
      const mainHeaderEl = document.querySelector(".main__task-header");
      clearNode(mainHeaderEl);
      
      const headerContent = document.createElement("div");
      headerContent.classList.add("main__task-header-content");

      const headerHeading = document.createElement("h1");
      headerHeading.classList.add("main__task-header-heading");
      headerHeading.textContent = todoFilterController.getActiveFilterTab().name;

      const headerActions = document.createElement("div");
      headerActions.classList.add("main__task-header-actions");

      const headerActionBtn = document.createElement("button");
      headerActionBtn.classList.add(
        "main__task-header-action-btn",
        "main__task-header-action-btn--sort"
      );
      headerActionBtn.innerHTML = `Due Date 
            <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M16.854 5.146l3 3a.502.502 0 01-.708.708L17 6.707V18.5a.5.5 0 01-1 0V6.707l-2.146 2.147a.502.502 0 01-.708-.708l3-3a.502.502 0 01.708 0zM7.5 5a.5.5 0 01.5.5v11.791l2.146-2.145a.502.502 0 01.708.708l-3 3a.502.502 0 01-.708 0l-3-3a.502.502 0 01.708-.708L7 17.293V5.5a.5.5 0 01.5-.5z">
            </path>
        </svg>`;

      // If current active tab is 'Today'
      if(todoFilterController.getActiveFilterTab().name === "Today"){
        const headerSpan = document.createElement("span");
        
        const todayTime = new Date();
        const todayDate = todayTime.getDate(); 
        const todayMonthName = todayTime.toLocaleString('default', { month: 'long' });
        
        headerSpan.classList.add("main__task-header__today-date");
        headerSpan.innerHTML = `${todayDate}<sup>th</sup>${todayMonthName}`;
        
        headerContent.append(headerHeading,headerSpan,headerActions);
      }else{
        headerContent.append(headerHeading, headerActions);
      }

      headerActions.append(headerActionBtn);
      //Append to DOM
      mainHeaderEl.append(headerContent, headerActions);
    }

    function list(){
      const _filterListEl = document.querySelector(".sidenav__filters-list");
      clearNode(_filterListEl);
      
      const _todoFilterArr = todoFilterController.getTodoFilterList();
      _todoFilterArr.forEach((_todoFilter,_idx)=>{
        const sidenavItem = document.createElement("li");
        const sidenavItemIcon = document.createElement("span");
        const sidenavItemContent = document.createElement("span");
        const sidenavItemCounter = document.createElement("span");

        sidenavItem.setAttribute(
          "class",
          "sidenav__item sidenav__filter-item"
        );
        sidenavItem.setAttribute("data-index", _idx);
        sidenavItemIcon.setAttribute("class", "sidenav__item-icon");
        sidenavItemContent.setAttribute("class", "sidenav__item-content");
        sidenavItemCounter.setAttribute("class", "sidenav__item-counter");

        switch (_todoFilter.name) {
          case "All tasks":
            sidenavItemIcon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24">
            <g fill="currentColor" fill-rule="nonzero">
                <path d="M10 14.5a2 2 0 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z" opacity="0.1"></path>
                <path d="M8.062 4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z">
                </path>
            </g>
        </svg>`;
            break;

          case "Today":
            sidenavItemIcon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24">
            <g fill="currentColor" fill-rule="evenodd">
                <path fill-rule="nonzero" d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z" opacity=".1">
                </path>
                <path fill-rule="nonzero" d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z">
                </path>
                <text font-family="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'" font-size="9" transform="translate(4 2)" font-weight="500">
                    <tspan x="8" y="15" text-anchor="middle">03</tspan>
                </text>
            </g>
        </svg>`;
            break;

          case "Week":
            sidenavItemIcon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24">
            <g fill="currentColor" fill-rule="nonzero">
                <path d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z" opacity="0.1">
                </path>
                <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z">
                </path>
            </g>
        </svg>`;
            break;
        }
        sidenavItemContent.textContent = _todoFilter.name;

        sidenavItem.append(
          sidenavItemIcon,
          sidenavItemContent,
          sidenavItemCounter
        );
        //Load to DOM
        _filterListEl.appendChild(sidenavItem);
        //Attach listener
        createTodoFilterTabListener(sidenavItem);
      })
    }

    return {header,list}
})();

  return { project, todo, todoFilter};
})();

export { renderDom };
