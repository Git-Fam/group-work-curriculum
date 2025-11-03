import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"; // Realtime Database のインポートを追加

const firebaseConfig = {
  apiKey: "AIzaSyDtN8qikYEoiAmQToC6GFqY-fKE-WurNpk",
  authDomain: "reservationsite-b9160.firebaseapp.com",
  projectId: "reservationsite-b9160",
  storageBucket: "reservationsite-b9160.firebasestorage.app",
  messagingSenderId: "463932966191",
  appId: "1:463932966191:web:1fcdfcc66f58e2a1454dda"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export const getCurrentUserId = () => {
  const user = auth.currentUser;
  return user ? user.uid : null;
};

export const fetchBookedTimes = async (date) => {
  try {
    const reservationsRef = collection(db, "reservations");
    const q = query(reservationsRef, where("date", "==", date));
    const querySnapshot = await getDocs(q);

    const times = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.time) {
        times[data.time] = (times[data.time] || 0) + 1;
      }
    });

    return times;
  } catch (error) {
    console.error("Error fetching booked times:", error.message);
    throw error;
  }
};



export const fetchUserName = async (uid) => {
  try {
    const usersQuery = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(usersQuery);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      console.log("Document data:", userDoc.data());
      return userDoc.data().name;
    } else {
      console.error(`No document found for uid: ${uid}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return null;
  }
};

export { auth, db, storage};
