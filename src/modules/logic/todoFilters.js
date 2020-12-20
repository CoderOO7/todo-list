import {todoController} from './todos.js';
import {getTodayDate,areDateEquals,isDateFallInCurrentWeek} from '../helper.js';
import {parseISO,isEqual} from 'date-fns';

const todoFilterFactory = ((id,name)=>{
    const _id = id.toString();
    return {
        id: _id,
        name: name
    }
});

const todoFilterController = (()=>{
    const _defaultStore = [
        todoFilterFactory(1,'All tasks'),
        todoFilterFactory(2,'Today'),
        todoFilterFactory(3,'Week'),
    ]

    let _activeFilterTabIdx = null;

    function setActiveFilterTab(filterTabIdx){
        _activeFilterTabIdx = filterTabIdx;
    }

    function getActiveFilterTab(){
        return _defaultStore[_activeFilterTabIdx];
    }

    function getTodoFilterList(){
        return _defaultStore.slice();
    }

    function getActiveFilterTabTodos(){
        const _todolist = todoController.getTodosList();
        switch(getActiveFilterTab().id){
            //All tasks
            case "1":
                return _todolist;
            // Today
            case "2":
                return _todolist.filter((_todoTask) => areDateEquals(_todoTask.dueDate, getTodayDate()));
            // Week
            case "3":
                return  _todolist.filter((_todoTask) => isDateFallInCurrentWeek(_todoTask.dueDate));
                
        }
    }

    return{
        setActiveFilterTab,
        getTodoFilterList,
        getActiveFilterTab,
        getActiveFilterTabTodos,
    }
})();

export {todoFilterController};