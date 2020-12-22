import {todoAppLocalStorage} from '../storage/localStorage.js'

const todoTaskFactory = ((activeProjectId,title,description,dueDate)=>{
    const id = '' + Date.now();
    const projectId = activeProjectId;
    return {
        id,
        projectId,
        title,
        description,
        dueDate,
        completed: false
    };
})

const todoController = (function(){
    const _todoTaskStore = [];
    let _activeTodoTaksId = null;

    function addTodoTaskToStore(todoTask){
        _todoTaskStore.push(todoTask);
    }

    function setActiveTodoTaskId(todoTaskId){
        _activeTodoTaksId = todoTaskId;
    }

    function getActiveTodoTaskId(){
        return _activeTodoTaksId;
    }

    function getTodosList(){
        return _todoTaskStore.slice();
    }

    function getTodoTask(todoTaskId){
        let _todoTaskItem = null;
        _todoTaskStore.forEach((todoTask,idx)=>{
            if(todoTask.id === todoTaskId){
                return  _todoTaskItem  = JSON.parse(JSON.stringify(_todoTaskStore[idx]));
            }
        })
        return _todoTaskItem;
    }

    function create(activeProjectId,title,description,date){
        let newTodoTask = todoTaskFactory(activeProjectId,title,description,date);
        addTodoTaskToStore(newTodoTask);
        todoAppLocalStorage.populate.todos([..._todoTaskStore]);
    }

    function remove(todoTaskId){
        let _isDeleted = false;
        _todoTaskStore.forEach((todoTask,idx)=>{
            if(todoTask.id === todoTaskId){
                _todoTaskStore.splice(idx,1);
                todoAppLocalStorage.populate.todos([..._todoTaskStore]);
                _isDeleted = true;
                return;
            }
        });
        return _isDeleted;
    }

    function update(todoTaskId,title,description,dueDate, completed = false){
        let _isUpdated = false;
        _todoTaskStore.forEach((todoTask,idx)=>{
            if(todoTask.id === todoTaskId){
                _todoTaskStore[idx].title = title;
                _todoTaskStore[idx].description = description;
                _todoTaskStore[idx].dueDate = dueDate;
                _todoTaskStore[idx].completed = completed;
                todoAppLocalStorage.populate.todos([..._todoTaskStore]);
                _isUpdated =true;
                return;
            }
        })
        return _isUpdated;
    }
    
    return {
        addTodoTaskToStore,
        setActiveTodoTaskId,
        getActiveTodoTaskId,
        getTodosList,
        getTodoTask,
        create,
        remove,
        update,
    }
})();

export {todoController};