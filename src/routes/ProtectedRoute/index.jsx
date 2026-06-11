// import { Navigate } from "react-router-dom";

//  export const ProtectedRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem("token");

//   if (!isLoggedIn) {
//     return <Navigate to="/register" />;
//   }

//   return children;
// };
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";//هي دالة من Firebase معناها:“راقب حالة تسجيل الدخول للمستخدم طول الوقت”
import { auth } from "../../firebase";

export const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (!user) {
    localStorage.removeItem("token");
    return <Navigate to="/register" />;
  }

  return children;
};