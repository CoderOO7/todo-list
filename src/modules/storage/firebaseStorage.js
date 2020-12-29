import firebase from '../firebase.js';

const todoAppFirebaseStorage = (function(){
    
    const db = firebase.firestore();

    function addItem(collectionName, id, data){

      db.collection(collectionName)
        .doc(id)
        .set(data)
        .then(() => {
          console.log("%cItem successfully added","color:green");
        })
        .catch((error) => {
          console.error("Error adding item: ", error);
        });
    }

    function updateItem(collectionName, id, data){

      db.collection(collectionName)
        .doc(id)
        .update(data)
        .then(() => {
          console.log("%cItem successfully updated","color:green");
        })
        .catch(() => {
          console.error("Error updating item: ", error);
        });
    }

    function deleteItem(collectionName, id){

      db.collection(collectionName)
        .doc(id)
        .delete()
        .then(() => {
          console.log("%cItem successfully deleted","color:green");
        })
        .catch(() => {
          console.error("Error deleted item: ", error);
        });
        
    }

    function getItems(collectionName){

        return db
          .collection(collectionName)
          .get()
          .then((dataSnapshot) => {
            return dataSnapshot
          })
          .catch((error) => {
            console.error("Error fetching the data", error);
          });
    }

    return {
        addItem,
        deleteItem,
        updateItem,
        getItems
    }
})();

export {todoAppFirebaseStorage}; 