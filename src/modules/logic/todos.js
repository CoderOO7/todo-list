const todoTaskFactory = ((activeProjectId,title,description,dueDate)=>{
    const id = +Date.now();
    const projectId = activeProjectId;
    return {
        id,
        projectId,
        title,
        description,
        dueDate
    };
})

const todoController = (function(){
    const _todoTaskStore = [];

    function _addTodoTaskToStore(todoTask){
        _todoTaskStore.push(todoTask);
        console.log(_todoTaskStore);
    }

    function getTodosList(){
        return _todoTaskStore.slice();
    }

    function create(activeProjectId,title,description,date){
        let newTodoTask = todoTaskFactory(activeProjectId,title,description,date);
        _addTodoTaskToStore(newTodoTask);
    }

    function remove(todoTaskId){
        console.log(todoTaskId);
    }

    function edit(todoTaskId){
        console.log(todoTaskId);
    }
    
    return {
        getTodosList,
        create,
        remove,
        edit,
    }
})();

export {todoController};