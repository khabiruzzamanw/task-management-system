import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTaskCenter } from "../../../context/Task.context.jsx";
import { useEmployee } from "../../../context/Employee.context.jsx";
import { edit_task_as_admin_controller } from "../controller/edit_task_as_admin.controller.js";
import { useAuth } from "../../../context/Auth.context.jsx";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";

export default function Edit_task_as_admin() {
  const { tasks, refresh_tasks, task_loading } = useTaskCenter();
  const { employee, employee_loading } = useEmployee();
  let params = useParams();
  const navigate = useNavigate();
  const { notify } = useToast();
  const [adds, set_adds] = useState({});
  if (task_loading || employee_loading) {
    return <Loading_screen />;
  }
  const the_task = tasks.find(function (task) {
    return task._id === params.task_id;
  });
  if (!the_task) {
    return (
      <div className="text-center text-3xl text-red-400 bg-white px-5 py-2.5">
        Couldn't find the task !!!!
      </div>
    );
  }
  const managers = employee.filter(function (user) {
    return user.role === "manager";
  });
  const elements = {
    title: the_task.title,
    description: the_task.description,
    status: the_task.status,
    priority: the_task.priority,
    manager_email: the_task?.manager?.email,
    task_id: the_task._id,
  };

  const form = { ...elements, ...adds };
  async function submit_handler(e) {
    e.preventDefault();
    const result = await edit_task_as_admin_controller({
      ...adds,
      task_id: the_task._id,
    });

    if (!result.success) {
      return notify(result.message, "error");
    }
    refresh_tasks();
    notify(result.message, "success");
    navigate("/admin");
  }

  function input_handler(e) {
    set_adds(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const is_available_status = {
    in_progress: ["canceled"],
    submitted: ["rejected", "approved", "canceled"],
    pending: ["canceled"],
    canceled: [],
    approved: [],
    rejected: [],
  };
  const is_allowed_status = is_available_status[the_task.status];
  const is_out_of_option = is_allowed_status.length === 0;
  const can_change_manager =
    the_task.status === "pending" || the_task.status === "in_progress";
  const can_edit =
    the_task.status === "pending" || the_task.status === "in_progress";

  return (
    <>
      <main className="min-h-screen w-full bg-canvas">
        <div className="max-w-[560px] mx-auto px-8 pt-8 pb-24">
          <div className="flex justify-between items-center pb-6">
            <h1 className="text-title-lg font-bold text-parchment">
              Edit task
            </h1>
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={function () {
                navigate("/admin");
              }}
            >
              back
            </button>
          </div>

          <hr className="hr-hairline" />

          <form
            onSubmit={submit_handler}
            className="card-vintage flex flex-col gap-5 mt-6"
          >
            <div>
              <label className="label-vintage">title</label>
              <input
                className="input-vintage"
                type="text"
                name="title"
                disabled={!can_edit}
                placeholder="Task title"
                value={form.title ?? the_task.title}
                onChange={input_handler}
                required
              />
            </div>

            <div>
              <label className="label-vintage">description</label>
              <textarea
                className="textarea-vintage"
                rows={4}
                name="description"
                disabled={!can_edit}
                placeholder="What needs to be done"
                value={form.description ?? the_task.description}
                onChange={input_handler}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label-vintage">priority</label>
                <select
                  className="select-vintage"
                  name="priority"
                  disabled={!can_edit}
                  value={form.priority ?? the_task.priority}
                  onChange={input_handler}
                >
                  <option value="high">high</option>
                  <option value="low">low</option>
                  <option value="urgent">urgent</option>
                </select>
              </div>

              <div>
                <label className="label-vintage">status</label>
                <select
                  className="select-vintage"
                  name="status"
                  disabled={is_out_of_option}
                  value={form.status ?? the_task.status}
                  onChange={input_handler}
                >
                  <option value={the_task.status}>
                    {the_task.status} (currently)
                  </option>
                  {is_allowed_status.map(function (s, index) {
                    return (
                      <option key={index} value={s}>
                        {s}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <hr className="hr-hairline" />

            <div>
              <label className="label-vintage">manager</label>
              <select
                className="select-vintage"
                name="manager_email"
                disabled={!can_change_manager}
                value={form.manager_email ?? the_task?.manager?.email}
                onChange={input_handler}
                required
              >
                <option value="">select a manager</option>
                {managers.map(function (manager) {
                  return (
                    <option key={manager.email} value={manager.email}>
                      {manager.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <hr className="hr-hairline" />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="btn btn-md btn-ghost"
                onClick={function () {
                  navigate("/admin");
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-md btn-primary">
                Save edited task
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
