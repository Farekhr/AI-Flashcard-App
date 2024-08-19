

// firebase.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

let db

if (typeof window !== "undefined") {
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT5usRV2H__kyt--i5lyj65XttoSkSp3k",
  authDomain: "flashcardai-3f62c.firebaseapp.com",
  projectId: "flashcardai-3f62c",
  storageBucket: "flashcardai-3f62c.appspot.com",
  messagingSenderId: "979227645112",
  appId: "1:979227645112:web:e20862edc6510bc6b5904d",
  measurementId: "G-WT2YE9EDGJ"
};

    const app = initializeApp(firebaseConfig)
    db = getFirestore(app)
}

export { db }
