import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAKZh_--cy-MYQrBYf1JeQwxxH2W7xMe1g",
  authDomain: "react-app-curso-2b23c.firebaseapp.com",
  projectId: "react-app-curso-2b23c",
  storageBucket: "react-app-curso-2b23c.appspot.com",
  messagingSenderId: "516153207559",
  appId: "1:516153207559:web:31bc3fd8b79c036ef1b3a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// referencia a la base de datos
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();
export{
    app,
    db,
    googleAuthProvider,
}