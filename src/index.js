import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


firebase.initializeApp ({
  apiKey: "AIzaSyDjkMApv3GSYdMO6u4OsDSc_5J6Q6xbCDw",
  authDomain: "react-firebase-hooks-e1625.firebaseapp.com",
  projectId: "react-firebase-hooks-e1625",
  storageBucket: "react-firebase-hooks-e1625.appspot.com",
  messagingSenderId: "39882153265",
  appId: "1:39882153265:web:9ab64ef1b2f3177a672410"
})

const auth = firebase.auth()
const db = firebase.firestore()

export const FirebaseContext = createContext(null)

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{firebase, db, auth}}>
      <App/>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

