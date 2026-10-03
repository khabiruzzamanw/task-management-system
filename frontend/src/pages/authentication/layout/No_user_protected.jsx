import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";

export default function No_user_protected_route() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-4xl text-white">loading</div>;
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
