import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDhnuxhN0zKhfnjyA8r7Km3FKNnv421T7I',
  authDomain: 'typing-express.firebaseapp.com',
  projectId: 'typing-express',
  storageBucket: 'typing-express.firebasestorage.app',
  messagingSenderId: '343824668937',
  appId: '1:343824668937:web:57ab0a0d571289bd7adbd8',
  measurementId: 'G-8Q4L7JC182',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
