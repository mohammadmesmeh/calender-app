import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/firebase";
import { ensureUserProfile } from "@/features/auth/services/userProfileService";
import { AuthContext } from "./AuthContext";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setInitializing] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingGoogle, setLoadingGoogle] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitializing(false);

      if (currentUser) {
        ensureUserProfile(currentUser).catch((error) => {
          console.error("Failed to ensure user profile:", error);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const signUpWithEmail = async (data) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      setUser(userCredential.user);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithGoogle = async () => {
    setLoadingGoogle(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } finally {
      setLoadingGoogle(false);
    }
  };

  const signInWithEmail = async (data) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      setUser(userCredential.user);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoadingGoogle(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      return result;
    } finally {
      setLoadingGoogle(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isInitializing,
        isLoading,
        isLoadingGoogle,
        signUpWithEmail,
        signUpWithGoogle,
        signInWithEmail,
        signInWithGoogle,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};