import {todoController} from './todos.js';

const projectFactory = ((name)=>{
    const id = '' + Date.now();
    return {id,name};
})

const projectController = (function(){
    const _projectStore = [];
    let _activeProjectIdx= null;

    function _addProjectToStore(project){
        _projectStore.push(project);
    }

    function getProjectsList(){
        return _projectStore.slice();
    }

    function create(projectName){
        let newProject = projectFactory(projectName);
        _addProjectToStore(newProject);
    }

    function remove(projectId){
        console.log(projectId);
    }

    function updateActiveProject(projectName){
        if(_projectStore[_activeProjectIdx]){
            _projectStore[_activeProjectIdx].name = projectName;
            return true;
        }
        return false;
    }

    function setActiveProject(projectIdx){
        _activeProjectIdx = projectIdx;
    }

    function getActiveProject(){
        return _projectStore[_activeProjectIdx];
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
        if(projectId !== null && projectId !== undefined){
            return todoController.getTodosList().filter(todoTask=>todoTask.projectId === projectId);
        }
    }
    
    return {
        getProjectsList,
        setActiveProject,
        getActiveProject,
        getActiveProjectTodos,
        getProjectTodosById,
        updateActiveProject,
        create,
        remove,
    }
})();

export {projectController};