import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjLgt8ni5GXWhSI6AzF8lPptFSgWMLbPQ",
  authDomain: "easymart-211aa.firebaseapp.com",
  projectId: "easymart-211aa",
  storageBucket: "easymart-211aa.firebasestorage.app",
  messagingSenderId: "15241429035",
  appId: "1:15241429035:web:f49eca12f74d3eabdeaa6e",
  measurementId: "G-FX221233P8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
