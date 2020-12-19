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
    
    return {
        getProjectsList,
        setActiveProject,
        getActiveProject,
        create,
        remove,
        updateActiveProject,
    }
})();

export {projectController};