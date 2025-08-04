import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDqYV3T0reV7qMd3JC95DUYUZM2Jsn_r-A",
  authDomain: "finaltask-75f5a.firebaseapp.com",
  projectId: "finaltask-75f5a",
  storageBucket: "finaltask-75f5a.firebasestorage.app",
  messagingSenderId: "671021883948",
  appId: "1:671021883948:web:df627296fc999e7f0f6789",
  measurementId: "G-6JYYC903VN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth,provider,db };