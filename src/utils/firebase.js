import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCm3BXFtLieKzZy3mBNJLulreOtQR7h3Y",
  authDomain: "consistencyapp-21e64.firebaseapp.com",
  projectId: "consistencyapp-21e64",
  storageBucket: "consistencyapp-21e64.firebasestorage.app",
  messagingSenderId: "526727859667",
  appId: "1:526727859667:web:52a0a34dc253f9f4c33326"
};

// Initialize Firebase
export const app_fire = initializeApp(firebaseConfig);
export const auth = getAuth(app_fire);