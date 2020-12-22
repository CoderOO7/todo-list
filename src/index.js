import {todoAppLocalStorage} from './modules/storage/localStorage.js';
import {todoController} from './modules/logic/todos.js';
import {projectController} from './modules/logic/projects.js';
import './modules/staticEventsListeners.js';
import {renderDom} from './modules/render.js';


(function initApp(){

    todoAppLocalStorage.get.projects().forEach((project)=>{
        projectController.addProjectToStore(project);
    });
    todoAppLocalStorage.get.todos().forEach((todo)=>{
        todoController.addTodoTaskToStore(todo);
    });
    //Render DOM
    renderDom.todoFilter.list();
    renderDom.project.list();
    renderDom.todo.list();

})();