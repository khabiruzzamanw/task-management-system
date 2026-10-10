import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { logout_controller } from "../../authentication/controller/logout.controller.js";
import { useTaskCenter } from "../../../context/Task.context.jsx";
import Task_view_card from "../../../components/Task_view_card.jsx";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";

export default function Admin() {
  const { user, set_user, set_access_token_globally } = useAuth();
  const navigate = useNavigate();
  const { notify } = useToast();
  const { tasks, task_loading } = useTaskCenter();

  async function logout_handler() {
    const result = await logout_controller();
    if (!result.success) {
      return notify(result.message, "error");
    }
    set_user(null);
    set_access_token_globally(null);
    navigate("/login");
  }
  if (task_loading) {
    return <Loading_screen />;
  }

  return (
    <main className="min-h-screen w-full bg-canvas">
      <div className="max-w-[1100px] mx-auto px-8 pt-8 pb-24">
        {/* header */}
        <div className="flex flex-wrap justify-between items-start gap-4 pb-6">
          <div>
            <h1 className="text-title-lg font-bold text-parchment">
              Task manager
            </h1>
            <p className="text-caption-md leading-normal text-fade">
              Admin overview. Everything you've created and who's on it.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-body-md leading-normal text-chalk">
                {user?.name}
              </span>
              <span className="text-xs leading-normal text-dim">
                Administrator
              </span>
            </div>
            <span className="w-px h-8 bg-hairline-strong"></span>
            <button
              className="btn btn-sm btn-ghost"
              onClick={function () {
                navigate("/change-password");
              }}
            >
              Change password
            </button>
            <button className="btn btn-sm btn-outline" onClick={logout_handler}>
              Log out
            </button>
          </div>
        </div>

        <hr className="hr-hairline" />

        {/* stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <div className="card-vintage-stats">
            <span className="label-vintage">Total</span>
            <span className="block text-display-xl font-bold leading-none py-2 text-parchment">
              {tasks.length}
            </span>
            <span className="text-xs leading-normal text-dim">all tasks</span>
          </div>
          <div className="card-vintage-stats">
            <span className="label-vintage">Pending</span>
            <span className="block text-display-xl font-bold leading-none py-2 text-parchment">
              {tasks.filter((t) => t.status === "pending").length}
            </span>
            <span className="text-xs leading-normal text-dim">not started</span>
          </div>
          <div className="card-vintage-stats">
            <span className="label-vintage">In progress</span>
            <span className="block text-display-xl font-bold leading-none py-2 text-chalk">
              {tasks.filter((t) => t.status === "in_progress").length}
            </span>
            <span className="text-xs leading-normal text-dim">
              being worked on
            </span>
          </div>

          <div className="card-vintage-stats">
            <span className="label-vintage">Submitted</span>
            <span className="block text-display-xl font-bold leading-none py-2 text-clear">
              {tasks.filter((t) => t.status === "submitted").length}
            </span>
            <span className="text-xs leading-normal text-dim">
              Waiting for approval
            </span>
          </div>
          <div className="card-vintage-stats">
            <span className="label-vintage">Approved</span>
            <span className="block text-display-xl font-bold leading-none py-2 text-clear">
              {tasks.filter((t) => t.status === "approved").length}
            </span>
            <span className="text-xs leading-normal text-dim">finished</span>
          </div>

          <div className="card-vintage-stats">
            <span className="label-vintage">Rejected</span>
            <span className="block text-display-xl font-bold leading-none py-2 text-clear">
              {tasks.filter((t) => t.status === "rejected").length}
            </span>
            <span className="text-xs leading-normal text-dim">Bad work</span>
          </div>
        </div>

        {/* actions */}
        <div className="card-vintage-soft grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <span className="label-vintage">Tasks</span>
            <div className="flex flex-wrap gap-2">
              <button
                className="btn btn-sm btn-accent"
                onClick={() => navigate("/task-creation")}
              >
                Create task
              </button>
            </div>
          </div>
          <div>
            <span className="label-vintage">People</span>
            <div className="flex flex-wrap gap-2">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => navigate("/register-worker")}
              >
                Register worker
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => navigate("/assign-worker")}
              >
                Assign worker
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => navigate("/promote")}
              >
                Give a promotion
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => navigate("/demote")}
              >
                Give a demotion
              </button>
            </div>
          </div>
        </div>

        {/* tasks */}
        <div className="flex justify-between items-baseline mt-10 pb-3">
          <h2 className="text-title-sm font-bold text-parchment">All tasks</h2>
          <span className="text-caption-md text-dim">{tasks.length} total</span>
        </div>

        <hr className="hr-hairline mt-0" />

        {tasks.length === 0 && (
          <div className="card-vintage-soft mt-4 py-8">
            <p className="text-body-md leading-normal text-chalk">
              No tasks yet.
            </p>
            <p className="text-caption-md leading-normal text-fade">
              Create one and assign it to a manager to get started.
            </p>
          </div>
        )}

        {tasks.length > 0 && (
          <div className="flex flex-col gap-2 mt-4">
            {tasks.map(function (task) {
              return (
                <Task_view_card
                  key={task._id}
                  task={task}
                  edit_path={`/admin/task/edit/${task._id}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
