// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgiDG4jUSsnY7X6DQPT-w7KYIvdewDCnc",
  authDomain: "blooming-marvellous-8a5f8.firebaseapp.com",
  projectId: "blooming-marvellous-8a5f8",
  storageBucket: "blooming-marvellous-8a5f8.firebasestorage.app",
  messagingSenderId: "448322308179",
  appId: "1:448322308179:web:b6d23124e93d6958e0dea6",
  measurementId: "G-ZY09THH2HV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
