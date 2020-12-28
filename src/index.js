import {todoAppLocalStorage} from './modules/storage/localStorage.js';
import {todoController} from './modules/logic/todos.js';
import {projectController} from './modules/logic/projects.js';
import {todoFilterDom} from './modules/domStuff.js';
import './modules/staticEventsListeners.js';
import {renderDom} from './modules/render.js';
import {PROJECT_STORE_KEY, TODO_STORE_KEY} from './constants.js';

(function initApp(){

    if(todoAppLocalStorage.getItem(PROJECT_STORE_KEY)){
        todoAppLocalStorage.getItem(PROJECT_STORE_KEY).forEach((project)=>{
            projectController.addProjectToStore(project);
        });
    }
    if(todoAppLocalStorage.getItem(TODO_STORE_KEY)){
        todoAppLocalStorage.getItem(TODO_STORE_KEY).forEach((todo)=>{
            todoController.addTodoTaskToStore(todo);
        });
    }
    
    //Render DOM
    renderDom.todoFilter.list();
    renderDom.project.list();
    renderDom.todo.list();

    // Activating default tab on intial load 
    const _todayTaskFilterTab = document.querySelector(".sidenav__filter-item[data-index='0']");
    todoFilterDom.activateFilterTab(_todayTaskFilterTab.click());

})();