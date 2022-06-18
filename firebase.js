import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCuVJqtQP46qZFi5YP6E481kMU_bKwCeZQ",
    authDomain: "g-chat-b8d5b.firebaseapp.com",
    projectId: "g-chat-b8d5b",
    storageBucket: "g-chat-b8d5b.appspot.com",
    messagingSenderId: "129846095078",
    appId: "1:129846095078:web:b9b96d145d4c63d4341f27"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) :
    firebase.app();

const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };