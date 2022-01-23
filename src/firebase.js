import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDFhrE2k0utQVql2eviWLv7NoW339v2pGo",
  authDomain: "fir-8d970.firebaseapp.com",
  projectId: "fir-8d970",
  storageBucket: "fir-8d970.appspot.com",
  messagingSenderId: "422682424231",
  appId: "1:422682424231:web:a8a63f37c6b8f871a9fc82",
  measurementId: "G-YJY34SK38L",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export { db, auth, signup, signIn };
