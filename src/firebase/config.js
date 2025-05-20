import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTpLfMW2q7jiX3gRCFXDioDkKtZlnW6rU",
  authDomain: "easyreserve-app.firebaseapp.com",
  projectId: "easyreserve-app",
  storageBucket: "easyreserve-app.firebasestorage.app",
  messagingSenderId: "7829750640",
  appId: "1:7829750640:web:7d708012a569d4b3bf45b5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
