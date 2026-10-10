import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { logout_controller } from "../../authentication/controller/logout.controller.js";
import { useTaskCenter } from "../../../context/Task.context.jsx";
import Task_view_card from "../../../components/Task_view_card.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";

export default function Worker() {
  const navigate = useNavigate();
  const {
    user,
    set_user,
    user_loading,
    access_token,
    set_access_token_globally,
  } = useAuth();
  const { tasks, task_loading } = useTaskCenter();
  if (task_loading || user_loading) {
    return <Loading_screen />;
  }

  const worker_tasks = tasks.filter(function (task) {
    return task?.assigned_to?._id === user?._id;
  });

  async function logout_handler() {
    const data = await logout_controller(access_token);
    if (!data.success) return;
    set_user(null);
    set_access_token_globally(null);
    navigate("/login");
  }

  return (
    <main className="min-h-screen w-full bg-canvas">
      <div className="max-w-[1100px] mx-auto px-8 pt-8 pb-24">
        <div className="flex justify-between items-center pb-6">
          <div>
            <h1 className="text-title-lg font-bold text-parchment">My tasks</h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-body-md leading-normal text-chalk">
              {user?.name || "name not found"}
            </span>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => navigate("/change-password")}
            >
              Change password
            </button>
            <button
              className="text-caption-md leading-normal text-fade btn btn-sm"
              onClick={logout_handler}
            >
              logout
            </button>
          </div>
        </div>

        <hr className="hr-hairline" />
        {/* stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <div className="card-vintage-stats">
            <span className="label-vintage">Total</span>
            <span className="block text-display-xl font-bold leading-none py-2 text-parchment">
              {worker_tasks.length}
            </span>
            <span className="text-xs leading-normal text-dim">all tasks</span>
          </div>
          <div className="card-vintage-stats">
            <span className="label-vintage">In progress</span>
            <span className="block text-display-xl font-bold leading-none py-2 text-chalk">
              {worker_tasks.filter((t) => t.status === "in_progress").length}
            </span>
            <span className="text-xs leading-normal text-dim">
              being worked on
            </span>
          </div>
          <div className="card-vintage-stats">
            <span className="label-vintage">Submitted</span>
            <span className="block text-display-xl font-bold leading-none py-2 text-clear">
              {worker_tasks.filter((t) => t.status === "submitted").length}
            </span>
            <span className="text-xs leading-normal text-dim">
              waiting for approval
            </span>
          </div>
          <div className="card-vintage-stats">
            <span className="label-vintage">Approved</span>
            <span className="block text-display-xl font-bold leading-none py-2 text-clear">
              {worker_tasks.filter((t) => t.status === "approved").length}
            </span>
            <span className="text-xs leading-normal text-dim">finished</span>
          </div>
          <div className="card-vintage-stats">
            <span className="label-vintage">Rejected</span>
            <span className="block text-display-xl font-bold leading-none py-2 text-alert">
              {tasks.filter((t) => t.status === "rejected").length}
            </span>
            <span className="text-xs leading-normal text-dim">Bad work</span>
          </div>
        </div>
        <hr className="hr-hairline" />
        <div>
          {worker_tasks.map(function (task) {
            return (
              <Task_view_card
                key={task._id}
                task={task}
                edit_path={`/worker/task/edit/${task._id}`}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
