import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';

const settings = { timestampsInSnapshots: true };
const config = {
    apiKey: "AIzaSyCSlg4WCuQR7wlpLjfSHoBzK2cRolFtbs0",
    authDomain: "todo-list-c1025.firebaseapp.com",
    projectId: "todo-list-c1025",
    storageBucket: "todo-list-c1025.appspot.com",
    messagingSenderId: "684108198095",
    appId: "1:684108198095:web:833c3c6c796b3c0b1307ba",
    measurementId: "G-QJNNLCBVFK"
};

firebase.initializeApp(config);
firebase.firestore().settings(settings);
firebase.analytics();

export default firebase;