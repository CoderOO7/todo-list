import firebase from '../firebase.js';

const todoAppFirebaseStorage = (function(){
    
    const db = firebase.firestore();
    const auth = firebase.auth();

    function addItem(collectionName, id, data){
      if(auth.currentUser){
        db.collection(`users/${auth.currentUser.uid}/${collectionName}`)
          .doc(id)
          .set(data)
          .then(() => {
            console.log("%cItem successfully added to DB","color:green");
          })
          .catch((error) => {
            console.error("Error adding item to DB: ", error);
          });
      }else{
        console.error('User must logged in');
      }
    }

    function updateItem(collectionName, id, data) {
      if (auth.currentUser) {
        db.collection(`users/${auth.currentUser.uid}/${collectionName}`)
          .doc(id)
          .update(data)
          .then(() => {
            console.log("%cItem successfully updated in DB", "color:green");
          })
          .catch(() => {
            console.error("Error updating item in DB: ", error);
          });
      }else{
        console.error('User must logged in');
      }
    }

    function deleteItem(collectionName, id){
      if (auth.currentUser) {
        db.collection(`users/${auth.currentUser.uid}/${collectionName}`)
          .doc(id)
          .delete()
          .then(() => {
            console.log("%cItem successfully deleted from DB","color:green");
          })
          .catch(() => {
            console.error("Error deleting item from DB: ", error);
          });
      }else{
        console.error('User must logged in');
      }
    }

    function getItems(collectionName){
      if(auth.currentUser){
        return db
          .collection(`users/${auth.currentUser.uid}/${collectionName}`)
          .get()
          .then((dataSnapshot) => {
            return dataSnapshot
          })
          .catch((error) => {
            console.error("Error fetching the data from DB", error);
          });
      }else{
        console.error('User must logged in');
      }
    }

    return {
        addItem,
        deleteItem,
        updateItem,
        getItems
    }
})();

export {todoAppFirebaseStorage}; 