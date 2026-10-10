import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { Worker_Provider } from "../../../context/Worker.context.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";

export default function Manager_protected_route() {
  const { user, user_loading } = useAuth();

  if (user_loading) {
    return <Loading_screen/>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "admin" || user?.role === "worker") {
    return <Navigate to="/login" replace />;
  }

  return (
    <Worker_Provider>
      <Outlet />
    </Worker_Provider>
  );
}
