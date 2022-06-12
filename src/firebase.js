import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuWm7W_eMRK_WwVIMzkxUqSJh2iuXmrSY",
  authDomain: "disneyplus-clone-9af43.firebaseapp.com",
  projectId: "disneyplus-clone-9af43",
  storageBucket: "disneyplus-clone-9af43.appspot.com",
  messagingSenderId: "479369575429",
  appId: "1:479369575429:web:ee8f25e973c65f70b9f06c",
  measurementId: "G-5N3GKBT2YD",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
