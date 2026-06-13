// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpXSxkFz9-TC7bq0xAFBM3fTankF_gpHA",
  authDomain: "calendar-e8082.firebaseapp.com",
  projectId: "calendar-e8082",
  storageBucket: "calendar-e8082.firebasestorage.app",
  messagingSenderId: "103352360406",
  appId: "1:103352360406:web:a2478918048b4686d65877",
  measurementId: "G-9JB494H57L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()