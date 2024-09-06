import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  console.log("Authenticated:", isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
