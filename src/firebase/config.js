import firebase from 'firebase/app'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARi0Xsr-4UNUhPWHwwBCD8nHhePn0_nyk",
  authDomain: "shapati-firebase.firebaseapp.com",
  projectId: "shapati-firebase",
  storageBucket: "shapati-firebase.appspot.com",
  messagingSenderId: "405188418543",
  appId: "1:405188418543:web:ca95afb331bf3fc244b41a",
  measurementId: "G-BYGRH8NWMP"
};

// init firebase

firebase.initializeApp(firebaseConfig)

// init services 

const projectFirestore=firebase.firestore()

export {projectFirestore}



