// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzjDR8zEVqAy3KBVAgL49dUUBQUkjMz7A",
  authDomain: "ai-flashcards-saas-fc763.firebaseapp.com",
  projectId: "ai-flashcards-saas-fc763",
  storageBucket: "ai-flashcards-saas-fc763.appspot.com",
  messagingSenderId: "458640026483",
  appId: "1:458640026483:web:90df7735124a771f1bb306"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;