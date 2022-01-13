// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAyKQOLZLPkZ8DhOdX2ISN5nxCAAdwyF1k",
  authDomain: "insta-clone-2ec96.firebaseapp.com",
  databaseURL: "https://insta-clone-2ec96-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "insta-clone-2ec96",
  storageBucket: "insta-clone-2ec96.appspot.com",
  messagingSenderId: "678828477139",
  appId: "1:678828477139:web:56627bd43055bf89f1a226",
  measurementId: "G-KDQRK3HG77"
});

// Initialize Firebase
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, auth, storage };