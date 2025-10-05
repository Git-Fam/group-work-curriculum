// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDydJWpSyOIknbk-SWJS-W55-6NtAfYPjM",
  authDomain: "review-cddde.firebaseapp.com",
  projectId: "review-cddde",
  storageBucket: "review-cddde.appspot.com",
  messagingSenderId: "61540835378",
  appId: "1:61540835378:web:090d18d4a767f96056dc2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
