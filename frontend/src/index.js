import Admin from "./pages/admin/layout/Admin.jsx";
import Worker from "./pages/worker/layout/Worker.jsx";
import Login from "./pages/authentication/layout/Login.jsx";
import { Auth_Provider } from "./context/Auth.context.jsx";
import Admin_protected_route from "./pages/authentication/layout/Admin_protected.jsx";
import Register_worker from "./pages/authentication/layout/Register_worker.jsx";
import Task_creation from "./pages/admin/layout/Task_creation.jsx";
import Promotion from "./pages/admin/layout/Promotion.jsx";
import Demotion from "./pages/admin/layout/Demotion.jsx";
import Assign_worker from "./pages/admin/layout/Assign_worker.jsx";
import Auth_protected_route from "./pages/authentication/layout/auth_protected.jsx";
import Pass_change from "./pages/authentication/layout/Pass_change.jsx";
import Manager from "./pages/manager/layout/Manager.jsx";
import Manager_protected_route from "./pages/authentication/layout/manager_protected.jsx";
import Worker_protected_route from "./pages/authentication/layout/worker_protected.jsx";
import No_user_protected_route from "./pages/authentication/layout/No_user_protected.jsx";
import Edit_task_as_worker from "./pages/worker/layout/Edit_task_as_worker.jsx";
import Edit_task_as_manager from "./pages/manager/layout/Edit_as_manager.jsx";
import Edit_task_as_admin from "./pages/admin/layout/Edit_task_as_admin.jsx";
import { Toast_Provider } from "./context/Notify.context.jsx";

export {
  Admin,
  Worker,
  Login,
  Auth_Provider,
  Admin_protected_route,
  Register_worker,
  Task_creation,
  Promotion,
  Demotion,
  Assign_worker,
  Auth_protected_route,
  Pass_change,
  Manager,
  Manager_protected_route,
  Worker_protected_route,
  No_user_protected_route,
  Edit_task_as_worker,
  Edit_task_as_manager,
  Edit_task_as_admin,
  Toast_Provider,
};
