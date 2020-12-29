import {todoAppFirebaseStorage} from './modules/storage/firebaseStorage.js';
import {todoController} from './modules/logic/todos.js';
import {projectController} from './modules/logic/projects.js';
import {todoFilterDom} from './modules/domStuff.js';
import './modules/staticEventsListeners.js';
import {renderDom} from './modules/render.js';
import {PROJECT_COLLECTION_NAME, TODO_COLLECTION_NAME} from './constants.js';

(async function initApp(){

    await todoAppFirebaseStorage.getItems(PROJECT_COLLECTION_NAME)
    .then((projects)=>{
        projects.forEach((project)=>{
            projectController.addProjectToStore(project.data());
        })
    })
    
    await todoAppFirebaseStorage.getItems(TODO_COLLECTION_NAME)
    .then((todos)=>{
        todos.forEach((todo)=>{
            todoController.addTodoTaskToStore(todo.data());
        })
    })
    
    //Render DOM
    renderDom.todoFilter.list();
    renderDom.project.list();
    renderDom.todo.list();

    // Activating default tab on initial load
    const event = new MouseEvent('click');
    const _todayTaskFilterTab = document.querySelector(".sidenav__filter-item[data-index='0']");
    _todayTaskFilterTab.addEventListener('click',todoFilterDom.activateFilterTab);
    _todayTaskFilterTab.dispatchEvent(event);
})();