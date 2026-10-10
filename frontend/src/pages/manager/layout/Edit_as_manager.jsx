import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTaskCenter } from "../../../context/Task.context.jsx";
import { useWorker } from "../../../context/Worker.context.jsx";

import { edit_task_as_manager_controller } from "../controller/edit_task_as_manager.controller.js";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";

export default function Edit_task_as_manager() {
  let params = useParams();
  const [form, set_form] = useState({});
  const navigate = useNavigate();
  const { notify } = useToast();

  const { tasks, refresh_tasks, task_loading } = useTaskCenter();
  const { worker, worker_loading } = useWorker();
  if (task_loading || worker_loading) {
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

  async function submit_handler(e) {
    e.preventDefault();
    const body = { ...form, task_id: the_task._id };
    const result = await edit_task_as_manager_controller(body);
    if (!result.success) {
      return notify(result.message, "error");
    }
    refresh_tasks();
    notify(result.message, "success");
    navigate("/manager");
  }

  function input_handler(e) {
    set_form(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const is_available_status = {
    in_progress: [],
    submitted: [],
    pending: ["in_progress"],
    canceled: [],
    approved: [],
    rejected: [],
  };
  const is_allowed_status = is_available_status[the_task.status];
  const is_out_of_option = is_allowed_status.length === 0;
  const can_change_worker =
    the_task.status === "pending" || the_task.status === "in_progress";

  return (
    <>
      <main className="min-h-screen w-full bg-canvas">
        <div className="max-w-[560px] mx-auto px-8 pt-8 pb-24">
          <div className="flex justify-between items-center pb-6">
            <h1 className="text-title-lg font-bold text-parchment">
              Manage task
            </h1>
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={function () {
                navigate("/manager");
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
              <span className="label-vintage">title</span>
              <h2 className="text-heading-md font-bold text-parchment">
                {the_task?.title}
              </h2>
            </div>

            <div>
              <span className="label-vintage">description</span>
              <p className="text-caption-md leading-normal text-prose">
                {the_task?.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-5">
              <div>
                <span className="label-vintage">priority</span>
                <span className="tag-vintage capitalize">
                  {the_task?.priority}
                </span>
              </div>
              <div>
                <span className="label-vintage">manager</span>
                <span className="text-body-md leading-normal text-chalk">
                  {the_task?.manager?.name}
                </span>
              </div>
            </div>

            <hr className="hr-hairline" />

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

            <div>
              <label className="label-vintage">worker</label>
              <select
                onChange={input_handler}
                name="worker_email"
                disabled={!can_change_worker}
                value={form?.worker_email ?? the_task?.assigned_to?.email}
                className="select-vintage"
              >
                <option value={the_task?.assigned_to?.email}>
                  {the_task?.assigned_to?.name ?? "not assigned yet"}(currently)
                </option>
                {worker.map(function (user) {
                  return (
                    <option key={user?.email} value={user?.email}>
                      {user?.name}
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
                  navigate("/manager");
                }}
              >
                Cancel
              </button>
              <button className="btn btn-md btn-primary" type="submit">
                Save edits
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
