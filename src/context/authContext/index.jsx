import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingGoogle, setLoadingGoogle] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
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

  const googleProvider = new GoogleAuthProvider();

  const signUpWithGoogle = async () => {
    setLoadingGoogle(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoadingGoogle,
        signUpWithEmail,
        signUpWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};