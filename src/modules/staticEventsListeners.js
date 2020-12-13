import {projectDom,sidenavDom, todoTaskDom} from './domStuff.js';

projectDom.showModalBtnEl.addEventListener('click',projectDom.showModal,false);
projectDom.addProjectModalFormBtnEl.addEventListener('click',projectDom.addProject,false);
projectDom.cancelProjectModalFormBtnEl.addEventListener('click',projectDom.closeModal,false);

sidenavDom.sidenavToggleBtnEl.addEventListener('click',sidenavDom.toggleSidenav,false);
sidenavDom.sidenavExpandabletoggleEl.addEventListener('click',sidenavDom.toggleSidenavExpandableList,false);

todoTaskDom.taskeditorAddBtnEl.addEventListener('click',todoTaskDom.renderTaskEditorForm,false);

window.addEventListener("DOMContentLoaded", (e) => {
    const ww = window.innerWidth;
    /* For Desktop display by default open sideNav*/
    if (ww > 750) {
        sidenavDom.toggleSidenav();
    }
});