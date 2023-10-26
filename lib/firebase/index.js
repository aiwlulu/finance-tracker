import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnFFgdcEN9jtpZOXeIqeCtgeVJXEizAbs",
  authDomain: "finance-tracker-3ef71.firebaseapp.com",
  projectId: "finance-tracker-3ef71",
  storageBucket: "finance-tracker-3ef71.appspot.com",
  messagingSenderId: "458687212056",
  appId: "1:458687212056:web:4288b06ac3bbb5c6f5316d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
