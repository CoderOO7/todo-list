import { todoAppFirebaseStorage } from "./modules/storage/firebaseStorage.js";
import { projectController } from "./modules/logic/projects.js";
import { todoController } from "./modules/logic/todos.js";
import { todoFilterDom, userAuthDom } from "./modules/domStuff.js";
import { renderDom } from "./modules/render.js";
import firebase from "./modules/firebase.js";
import firebaseAuthUI from "./modules/firebaseAuthUI";
import "./modules/staticEventsListeners.js";
import {
  PROJECT_COLLECTION_NAME,
  TODO_COLLECTION_NAME,
} from "./modules/constants.js";

(function initApp() {
  console.log("initApp");
  //Observer for change in user sign-in state
  firebase.auth().onAuthStateChanged(
    function (user) {
      if (user) {
        // User is signed in.
        const userName = user.displayName
          ? user.displayName
          : user.email
          ? user.email
          : "User";
        console.log(
          `%cWelcome :) ${userName}`,
          "color:green;font-family:system-ui;font-size:2rem;-webkit-text-stroke: 1px black;font-weight:bold"
        );

        user.getIdToken().then(function (accessToken) {
          (async () => {
            userAuthDom.handleLogIn(userName);
            document.querySelector(".header__signout-btn").onclick = () => {
              firebase.auth().signOut();
              window.location.reload();
            };

            {
              /* Fetch data from firestore */
              {
                //Fetch projects
                await todoAppFirebaseStorage
                  .getItems(PROJECT_COLLECTION_NAME)
                  .then((projects) => {
                    projects.forEach((project) => {
                      projectController.addProjectToStore(project.data());
                    });
                  });

                //Fetch todos
                await todoAppFirebaseStorage
                  .getItems(TODO_COLLECTION_NAME)
                  .then((todos) => {
                    todos.forEach((todo) => {
                      todoController.addTodoTaskToStore(todo.data());
                    });
                  });
              }
            }

            //Render DOM
            renderDom.todoFilter.list();
            renderDom.project.list();
            renderDom.todo.list();

            // Activating default tab on initial load
            const event = new MouseEvent("click");
            const _todayTaskFilterTab = document.querySelector(
              ".sidenav__filter-item[data-index='0']"
            );
            _todayTaskFilterTab.addEventListener(
              "click",
              todoFilterDom.activateFilterTab
            );
            _todayTaskFilterTab.dispatchEvent(event);
          })();
        });
      } else {
        // User is signed out.
        userAuthDom.handleLogOut();
        firebaseAuthUI.loadUI();
      }
    },
    function (error) {
      console.error(error);
    }
  );
})();
