const projectFactory = ((name)=>{
    const id = + Date.now();
    return {id,name};
})

const projectController = (function(){
    const _projectStore = [];

    function _addProjectToStore(project){
        _projectStore.push(project);
        console.log(_projectStore)
    }

    function getProjectsList(){
        return _projectStore.slice();
    }

    function create(projectName){
        let newProject = projectFactory(projectName);
        _addProjectToStore(newProject);
    }

    function remove(projectId){
        console.log(projecId);
    }

    function edit(projectId){
        console.log(projectId);
    }
    
    return {
        getProjectsList,
        create,
        remove,
        edit,
    }
})();

export {projectController};