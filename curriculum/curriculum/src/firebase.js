import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0lGZ1k7u7gxBnV1f5uscEU-oHKz_TL1I",
  authDomain: "typpingapp.firebaseapp.com",
  projectId: "typpingapp",
  storageBucket: "typpingapp.firebasestorage.app",
  messagingSenderId: "319889183003",
  appId: "1:319889183003:web:9fc7a6ff19f70df34a43be"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {auth, provider, db};