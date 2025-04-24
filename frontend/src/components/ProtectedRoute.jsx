import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  // Check for auth cookie directly
  const token = Cookies.get("authToken");
  console.log("ProtectedRoute - authToken exists:", !!token);

  if (token) {
    return children;
  }

  console.log("No auth token found, redirecting to login");
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
