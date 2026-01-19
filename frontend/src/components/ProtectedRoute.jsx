import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to={"/login"} replace />;
  if (!user.isVerified) return <Navigate to={"/verify-email"} />;

  return children;
};

export default ProtectedRoute;
