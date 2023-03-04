import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

console.log("key", process.env.FIREBASE_KEY);

const firebaseConfig = {
  apiKey: "AIzaSyBL9ga1gbdXfZ_-Uz_lx8nMlBALaMlai-8",
  authDomain: "dashboard-94739.firebaseapp.com",
  projectId: "dashboard-94739",
  storageBucket: "dashboard-94739.appspot.com",
  messagingSenderId: "632760164929",
  appId: "1:632760164929:web:26f059dcb560bbdc9a9cc0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
