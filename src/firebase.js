// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Validate required environment variables
const missingKeys = [];
if (!firebaseConfig.apiKey) missingKeys.push("VITE_FIREBASE_API_KEY");
if (!firebaseConfig.projectId) missingKeys.push("VITE_FIREBASE_PROJECT_ID");
if (!firebaseConfig.appId) missingKeys.push("VITE_FIREBASE_APP_ID");

if (missingKeys.length > 0) {
  console.error(
    `[Firebase Config Error] Missing required environment variables: ${missingKeys.join(", ")}.\n` +
    `If this is a deployed site (Vercel, Netlify, Firebase Hosting, etc.), add these variables to your hosting dashboard's Environment Variables settings.`
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore Database
export const db = getFirestore(app);