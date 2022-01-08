import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBrVedc_db-HbiM6ilTu1ZiKb0jUDeGWRE",
  authDomain: "chat-buddy-b3873.firebaseapp.com",
  projectId: "chat-buddy-b3873",
  storageBucket: "chat-buddy-b3873.appspot.com",
  messagingSenderId: "751249282818",
  appId: "1:751249282818:web:ff9654cb5131e3512cd41b",
  measurementId: "G-YTLTF524SD",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage, firebase };
