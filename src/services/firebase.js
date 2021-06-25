import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDWqWEm__ird89l778rApMDmrfdyihQ_pk",
  authDomain: "covidapp-3c338.firebaseapp.com",
  databaseURL: "https://covidapp-3c338-default-rtdb.firebaseio.com",
  projectId: "covidapp-3c338",
  storageBucket: "covidapp-3c338.appspot.com",
  messagingSenderId: "97209935381",
  appId: "1:97209935381:web:0ae7be50f1642e6ab2501c"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };