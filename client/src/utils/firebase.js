import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: "prepinterview-ai.firebaseapp.com",
  projectId: "prepinterview-ai",
  storageBucket: "prepinterview-ai.firebasestorage.app",
  messagingSenderId: "489446703156",
  appId: "1:489446703156:web:1119d0f78277ec31794a61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };