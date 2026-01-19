import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) return <Navigate to={"/"} replace />;
  if (isAuthenticated && !user.isVerified)
    return <Navigate to={"/verify-email"} replace />;

  return children;
};

export default RedirectAuthenticatedUser;
