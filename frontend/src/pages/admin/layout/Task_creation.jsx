import { useState } from "react";
import { task_creation_controller } from "../controller/task_creation.controller.js";
import { useNavigate } from "react-router-dom";
import { useEmployee } from "../../../context/Employee.context.jsx";
import { useAuth } from "../../../context/Auth.context.jsx";
import { useTaskCenter } from "../../../context/Task.context.jsx";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";

export default function Task_creation() {
  const [task_form, set_task_form] = useState({
    title: "",
    description: "",
    priority: "high",
    status: "pending",
    manager_email: "",
  });
  const navigate = useNavigate();
  const { notify } = useToast();
  const { employee, employee_loading } = useEmployee();
  const { refresh_tasks, task_loading } = useTaskCenter();

  if (employee_loading || task_loading) {
    return <Loading_screen/>;
  }
  const managers = employee.filter(function (user) {
    return user.role === "manager";
  });

  async function submit_handler(e) {
    e.preventDefault();
    const result = await task_creation_controller(task_form);
    if (!result.success) {
      return notify(result.message, "error");
    }
    refresh_tasks();
    notify(result.message, "success");
    navigate("/admin");
  }

  function input_handler(e) {
    set_task_form(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }


  return (
    <>
      <main className="min-h-screen w-full bg-canvas">
        <div className="max-w-[560px] mx-auto px-8 pt-8 pb-24">
          <div className="flex justify-between items-center pb-6">
            <h1 className="text-title-lg font-bold text-parchment">
              Create task
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
                placeholder="Task title"
                value={task_form.title}
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
                placeholder="What needs to be done"
                value={task_form.description}
                onChange={input_handler}
                required
              />
            </div>

            <div>
              <label className="label-vintage">priority</label>
              <select
                className="select-vintage"
                name="priority"
                value={task_form.priority}
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
                value={task_form.status}
                onChange={input_handler}
              >
                <option value="pending">pending</option>
              </select>
            </div>

            <div>
              <label className="label-vintage">manager</label>
              <select
                className="select-vintage"
                name="manager_email"
                value={task_form.manager_email}
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
                Create task
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
