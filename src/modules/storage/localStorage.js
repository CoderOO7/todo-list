const todoAppLocalStorage = (function(window, document){

    function _storageAvailable(type) {
        try {
            const storage = window[type];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return false;
        }
    }

    function _storeItem(key,value){
        if(_storageAvailable){
            window.localStorage.setItem(key,JSON.stringify(value));
        }else{
            console.error("Storage quota exceeded :(");
        }
    }

    const populate = (()=>{
        function projects(projectArr){
            _storeItem('project',projectArr);
        }

        function todos(todoArr){
            _storeItem('todos',todoArr);
        }

        return {
            projects,
            todos
        }
    })()
    
    const get = (()=>{
        function projects(){
            return JSON.parse(window.localStorage.getItem('projects'));
        }

        function todos(){
            return JSON.parse(window.localStorage.getItem('todos'));
        }

        return {
            projects,
            todos,
        }
    })()
    
    return {
        populate,
        get
    }

})(window,document);

export {todoAppLocalStorage}