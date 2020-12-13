import {projectController} from './logic/projects.js';

const renderDom = (function(){

    function _clearNode(el){
        while(el.firstChild){
            el.removeChild(el.firstChild);
        }
    }

    function projects(){
        const sidenavExpandableListEl = document.querySelector(".sidenav__expandable-list");
        _clearNode(sidenavExpandableListEl);
        
        const projectArr = projectController.getProjectsList();
        projectArr.forEach((project)=>{
            
            const sidenavItem = document.createElement("li");
            const sidenavItemIcon = document.createElement("span");
            const sidenavItemContent = document.createElement("span");
            const sidenavItemCounter = document.createElement("span");
    
            sidenavItem.setAttribute("class", "sidenav__item");
            sidenavItemIcon.setAttribute("class", "sidenav__item-icon");
            sidenavItemContent.setAttribute("class", "sidenav__item-content");
            sidenavItemCounter.setAttribute("class", "sidenav__item-counter");
    
            sidenavItemContent.textContent = project.name;
    
            sidenavExpandableListEl.append(sidenavItem);
            sidenavItem.append(
                sidenavItemIcon,
                sidenavItemContent,
                sidenavItemCounter
            );
        })
    }

    return{projects}
})();

export {renderDom};