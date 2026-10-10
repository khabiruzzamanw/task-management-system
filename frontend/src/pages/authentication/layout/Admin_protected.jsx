import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { Employee_Provider } from "../../../context/Employee.context.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";

export default function Admin_protected_route() {
  const { user, user_loading } = useAuth();

  if (user_loading) {
    return <Loading_screen/>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "manager") {
    return <Navigate to="/manager" replace />;
  }

  if (user.role === "worker") {
    return <Navigate to="/worker" replace />;
  }

  return (
    <Employee_Provider>
      <Outlet />
    </Employee_Provider>
  );
}
