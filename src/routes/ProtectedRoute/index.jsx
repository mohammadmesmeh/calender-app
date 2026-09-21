import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import LoadingScreen from "../../components/feedback/LoadingScreen";

export const ProtectedRoute = ({ children }) => {
  const { user, isInitializing } = useAuth();

  if (isInitializing) {
    return <LoadingScreen/>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};