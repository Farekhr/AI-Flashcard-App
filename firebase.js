// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirebase} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClNkwIZcs0GtAirUaxM_NCPuCl14qr3Ak",
  authDomain: "ai-chat-bot-b0b9a.firebaseapp.com",
  projectId: "ai-chat-bot-b0b9a",
  storageBucket: "ai-chat-bot-b0b9a.appspot.com",
  messagingSenderId: "443401414757",
  appId: "1:443401414757:web:3d35ff776d2a84df72fe8c",
  measurementId: "G-TP8Q0DDL3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirebase(app);

export {db};