import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { logout_controller } from "../../authentication/controller/logout.controller.js";
import Task_card_as_admin from "../components/Task_card_as_admin.jsx";
import { useTaskCenter } from "../../../context/Task.context.jsx";

export default function Admin() {
  const { user, loading, set_user, access_token, set_access_token } = useAuth();
  const navigate = useNavigate();
  // const [search, set_search] = useState("");
  // const [priority, set_priority] = useState("All");
  // const [status, set_status] = useState("all");

  const { tasks, refresh_tasks } = useTaskCenter();

  // if (tasks.length === 0) {
  //   return console.log("wait till tasks load");
  // }

  async function logout_handler() {
    const data = await logout_controller(access_token);
    if (!data.success) return;
    set_user(null);
    set_access_token(null);
    navigate("/login");
  }

  if (loading) {
    return <div className="text-4xl text-green-300">Loading</div>;
  }

  // const q = search.trim().toLowerCase();
  // const visible = DUMMY_TASKS.filter(
  //   (t) =>
  //     (priority === "All" || t.priority === priority) &&
  //     (status === "all" || t.status === status) &&
  //     (!q ||
  //       t.title.toLowerCase().includes(q) ||
  //       t.logger_name.toLowerCase().includes(q)),
  // );

  // const stats = [
  //   { label: "Total", value: DUMMY_TASKS.length },
  //   {
  //     label: "In progress",
  //     value: DUMMY_TASKS.filter((t) => t.status === "in_progress").length,
  //   },
  //   {
  //     label: "Done",
  //     value: DUMMY_TASKS.filter((t) => t.status === "done").length,
  //   },
  //   {
  //     label: "Overdue",
  //     value: DUMMY_TASKS.filter((t) => t.is_overdue && t.status !== "done")
  //       .length,
  //     alert: true,
  //   },
  // ];

  return (
    <main className="min-h-screen w-full bg-canvas">
      <div className="max-w-[1100px] mx-auto px-8 pt-8 pb-24">
        <div className="flex justify-between items-center pb-6">
          <h1 className="text-title-lg font-bold text-parchment">
            Task manager
          </h1>
          <div className="flex items-center gap-4">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => navigate("/register-worker")}
            >
              Register worker
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
            <button
              className="btn btn-sm btn-primary"
              onClick={() => navigate("/task-creation")}
            >
              Create Task
            </button>
            <div className="flex flex-col items-end">
              <span className="text-body-md leading-normal text-chalk">
                {user?.name}
              </span>
              <button
                className="text-caption-md leading-normal text-fade btn btn-sm"
                onClick={function () {
                  navigate("/change-password");
                }}
              >
                Change Password
              </button>
              <button
                className="text-caption-md leading-normal text-fade btn btn-sm"
                onClick={logout_handler}
              >
                logout
              </button>
            </div>
          </div>
        </div>

        <hr className="hr-hairline" />

        <div>
          {tasks.map(function (task) {
            return(<div>
              <span className="">{task.title}</span>
              <span className="">{task.description}</span>
              <span className="">{task.priority}</span>
              <span className="">{task.status}</span>
              <span className="">
                {task.assigned_to === null
                  ? "not assigned yet"
                  : task.assigned_to}
              </span>
              <span className="">{task.manager}</span>
            </div>)
          })}
        </div>
      </div>
    </main>
  );
}
