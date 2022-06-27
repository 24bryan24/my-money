import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB8WCWt9VyB6F17bbk5Qxb4iEd-G-J9E3Q",
  authDomain: "mymoney-97cb2.firebaseapp.com",
  projectId: "mymoney-97cb2",
  storageBucket: "mymoney-97cb2.appspot.com",
  messagingSenderId: "497198891331",
  appId: "1:497198891331:web:6c3ec7c7938022a3592ff6"
};

// initialize Firebase
firebase.initializeApp(firebaseConfig)

// initialize services
const firestoreProject = firebase.firestore()
const authorizeProject = firebase.auth();

export { firestoreProject, authorizeProject }