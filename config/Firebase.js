import firebase from 'firebase';
import 'firebase/firestore'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCBBApZlr3J-xUwUNVe-EpGhJO9v9oN4lo",
  authDomain: "peep-3b5e9.firebaseapp.com",
  databaseURL: "https://ontoo-88.firebaseio.com",
  projectId: "peep-3b5e9",
  storageBucket: "peep-3b5e9.appspot.com",
  messagingSenderId: "989797529807",
  appId: "1:989797529807:web:69a70c1bc995d2cc66dfba",
  measurementId: "G-S26XTFZBQQ",
};

let Firebase = firebase.initializeApp(firebaseConfig);

login = async (user, success_callback, failed_callback) => {
  await firebase
  .auth()
  .signInWithEmailAndPassword(user.email, user.password)
  .then(success_callback, failed_callback);
};

export const db = firebase.firestore();
export const realtime = firebase.database();

export default Firebase;
