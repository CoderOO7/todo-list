import firebase from  './firebase.js';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const firebaseAuthUI = (()=>{
    
    const uiConfig = {
        signInSuccessUrl: './',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        // Terms of service url/callback.
        tosUrl: 'https://www.termsofservicegenerator.net/live.php?token=4TkFemnB82ClTdd7H4ipTRpbTKAH7WXd',
        // Privacy policy url/callback.
        privacyPolicyUrl: function() {
            window.location.assign('https://www.privacypolicygenerator.info/live.php?token=975oEjhxtmpw140WAo50hgns267X0HaG');
        }
    }
    
    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    
    function loadUI(){
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
    }
    
    return {
        loadUI
    }
})();

export default firebaseAuthUI;