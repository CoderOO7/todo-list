import {todoController} from './todos.js';
import {todoAppFirebaseStorage} from '../storage/firebaseStorage.js';
import {PROJECT_COLLECTION_NAME} from '../../constants.js';

const projectFactory = ((name)=>{
    const id = '' + Date.now();
    return {id,name};
})

const projectController = (function(){
    const _projectStore = [];
    let _activeProjectIdx= null;

    function addProjectToStore(project){
        _projectStore.push(project);
    }

    function getProjectsList(){
        return _projectStore.slice();
    }

    function create(projectName){
        let newProject = projectFactory(projectName);
        addProjectToStore(newProject);
        todoAppFirebaseStorage.addItem(PROJECT_COLLECTION_NAME, newProject.id, newProject);
    }

    function remove(projectIdx){
        const _project = _projectStore[projectIdx];
        if(_project){
            const todosDeleted =  todoController.getTodosList()
                    .filter(todoTask=>todoTask.projectId === getActiveProject().id)
                    .every((todoTask)=>todoController.remove(todoTask.id));

            if(todosDeleted === true){
                _projectStore.splice(projectIdx,1);
                todoAppFirebaseStorage.deleteItem(PROJECT_COLLECTION_NAME, _project.id);
                return true;
            }

            return false;

        }else{
            console.error("Invalid project Idx :(");
        }
    }

    function updateActiveProject(projectName){
        if(_projectStore[_activeProjectIdx]){
            const _project = _projectStore[_activeProjectIdx];
            _project.name = projectName;
            todoAppFirebaseStorage.updateItem(PROJECT_COLLECTION_NAME,_project.id, _project);
            return true;
        }
        return false;
    }

    function setActiveProject(projectIdx){
        _activeProjectIdx = projectIdx;
    }

    function getActiveProject(){
        return {..._projectStore[_activeProjectIdx]};
    }

    function getActiveProjectTodos(){
        if(getActiveProject().id !== null){
            return todoController.getTodosList().filter(todoTask=>todoTask.projectId === getActiveProject().id);
        }
        else{
            console.error("The active project entry not found in db.");
        }
    }

    function getProjectTodosById(projectId){
        if(projectId){
            return todoController.getTodosList().filter(todoTask=>todoTask.projectId === projectId);
        }else{
            console.error("Provided project id is invalid");
        }
    }

    function getProjectById(projectId){
        const _project = _projectStore.find((project)=> project.id == projectId);
        if(_project){
            return {..._project};
        }else{
            console.error("The provided index value is not valid :(");
        }
    }
    
    return {
        addProjectToStore,
        getProjectsList,
        setActiveProject,
        getActiveProject,
        getActiveProjectTodos,
        getProjectTodosById,
        getProjectById,
        updateActiveProject,
        create,
        remove,
    }
})();

export {projectController};