import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { Tasks_Provider } from "../../../context/Task.context.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";

export default function Auth_protected_route() {
  const { user, user_loading } = useAuth();

  if (user_loading) {
    return <Loading_screen/>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Tasks_Provider>
      <Outlet />
    </Tasks_Provider>
  );
}
