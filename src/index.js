import {todoAppLocalStorage} from './modules/storage/localStorage.js';
import {todoController} from './modules/logic/todos.js';
import {projectController} from './modules/logic/projects.js';
import './modules/staticEventsListeners.js';
import {renderDom} from './modules/render.js';
import {PROJECT_STORE_KEY, TODO_STORE_KEY} from './constants.js';

(function initApp(){

    todoAppLocalStorage.getItem(PROJECT_STORE_KEY).forEach((project)=>{
        projectController.addProjectToStore(project);
    });
    todoAppLocalStorage.getItem(TODO_STORE_KEY).forEach((todo)=>{
        todoController.addTodoTaskToStore(todo);
    });
    
    //Render DOM
    renderDom.todoFilter.list();
    renderDom.project.list();
    renderDom.todo.list();

})();