import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { logout_controller } from "../../authentication/controller/logout.controller.js";

import { useTaskCenter } from "../../../context/Task.context.jsx";
import Task_view_card from "../../../components/Task_view_card.jsx";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";

export default function Manager() {
  const navigate = useNavigate();
  const { notify } = useToast();
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

  const manager_tasks = tasks.filter(function (task) {
    return task.manager?._id === user?._id;
  });

  async function logout_handler() {
    const data = await logout_controller(access_token);
    if (!data.success) return notify(data.message, "error");
    set_user(null);
    set_access_token_globally(null);
    navigate("/login");
  }

  return (
    <main className="min-h-screen w-full bg-canvas">
      <div className="max-w-[1100px] mx-auto px-8 pt-8 pb-24">
        {/* header */}
        <div className="flex flex-wrap justify-between items-start gap-4 pb-6">
          <div>
            <h1 className="text-title-lg font-bold text-parchment">
              Team tasks
            </h1>
            <p className="text-caption-md leading-normal text-fade">
              Manager overview. What's on your plate and who's carrying it.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-body-md leading-normal text-chalk">
                {user?.name}
              </span>
              <span className="text-xs leading-normal text-dim">Manager</span>
            </div>
            <span className="w-px h-8 bg-hairline-strong"></span>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => navigate("/change-password")}
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
              {manager_tasks.length}
            </span>
            <span className="text-xs leading-normal text-dim">all tasks</span>
          </div>
          <div className="card-vintage-stats">
            <span className="label-vintage">Pending</span>
            <span className="block text-display-xl font-bold leading-none py-2 text-parchment">
              {manager_tasks.filter((t) => t.status === "pending").length}
            </span>
            <span className="text-xs leading-normal text-dim">not started</span>
          </div>
          <div className="card-vintage-stats">
            <span className="label-vintage">In progress</span>
            <span className="block text-display-xl font-bold leading-none py-2 text-chalk">
              {manager_tasks.filter((t) => t.status === "in_progress").length}
            </span>
            <span className="text-xs leading-normal text-dim">
              being worked on
            </span>
          </div>
          <div className="card-vintage-stats">
            <span className="label-vintage">Submitted</span>
            <span className="block text-display-xl font-bold leading-none py-2 text-clear">
              {manager_tasks.filter((t) => t.status === "submitted").length}
            </span>
            <span className="text-xs leading-normal text-dim">
              waiting for approval
            </span>
          </div>
          <div className="card-vintage-stats">
            <span className="label-vintage">Approved</span>
            <span className="block text-display-xl font-bold leading-none py-2 text-clear">
              {manager_tasks.filter((t) => t.status === "approved").length}
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

        {/* tasks */}
        <div className="flex justify-between items-baseline mt-10 pb-3">
          <h2 className="text-title-sm font-bold text-parchment">Your tasks</h2>
          <span className="text-caption-md text-dim">
            {manager_tasks.length} total
          </span>
        </div>

        <hr className="hr-hairline mt-0" />

        {manager_tasks.length === 0 && (
          <div className="card-vintage-soft mt-4 py-8">
            <p className="text-body-md leading-normal text-chalk">
              Nothing on your plate.
            </p>
            <p className="text-caption-md leading-normal text-fade">
              Tasks the admin assigns to you will show up here.
            </p>
          </div>
        )}

        {manager_tasks.length > 0 && (
          <div className="flex flex-col gap-2 mt-4">
            {manager_tasks.map(function (task) {
              return (
                <Task_view_card
                  key={task._id}
                  task={task}
                  edit_path={`/manager/task/edit/${task._id}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
