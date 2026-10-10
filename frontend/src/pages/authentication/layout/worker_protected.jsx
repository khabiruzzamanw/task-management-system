import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";

export default function Worker_protected_route() {
  const { user, user_loading } = useAuth();

  if (user_loading) {
    return <Loading_screen/>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "admin" || user?.role === "manager") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
