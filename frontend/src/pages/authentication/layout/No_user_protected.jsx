import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";

export default function No_user_protected_route() {
  const { user, user_loading } = useAuth();

  if (user_loading) {
    return <Loading_screen/>;
  }

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }
  if (user?.role === "manager") {
    return <Navigate to="/manager" replace />;
  }
  if (user?.role === "worker") {
    return <Navigate to="/worker" replace />;
  }

  return <Outlet />;
}
