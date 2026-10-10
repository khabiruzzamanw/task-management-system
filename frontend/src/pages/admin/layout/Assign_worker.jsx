import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmployee } from "../../../context/Employee.context";
import assign_worker_controller from "../controller/assign_worker.controller";
import { useToast } from "../../../context/Notify.context";
import Loading_screen from "../../../components/Loading_screen";

export default function Assign_worker() {
  const { employee, employee_loading, refresh_employee } = useEmployee();
  const navigate = useNavigate();
  const { notify } = useToast();
  const [worker_email, set_worker_email] = useState("");
  const [manager_email, set_manager_email] = useState("");
  const [submitting, set_submitting] = useState(false);
  if (employee_loading) {
    return <Loading_screen />;
  }

  async function submit_handler(e) {
    e.preventDefault();
    set_submitting(true);
    const result = await assign_worker_controller(worker_email, manager_email);
    set_submitting(false);
    set_worker_email("");
    set_manager_email("");

    if (!result.success) {
      return notify(result.message, "error");
    }
    notify(result.message, "success");
    refresh_employee();
  }

  const managers = employee.filter(function (u) {
    return u.role === "manager";
  });
  const workers = employee.filter(function (u) {
    return u.role === "worker" && u.manager === null;
  });

  return (
    <main className="min-h-screen w-full bg-canvas">
      <div className="max-w-[560px] mx-auto px-8 pt-8 pb-24">
        <div className="flex justify-between items-center pb-6">
          <h1 className="text-title-lg font-bold text-parchment">
            Assign worker
          </h1>
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={() => navigate("/admin")}
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
            <label className="label-vintage">worker</label>
            <select
              className="select-vintage"
              value={worker_email}
              onChange={(e) => set_worker_email(e.target.value)}
              required
            >
              <option value="">select a worker</option>
              {workers.map((w) => (
                <option key={w._id} value={w.email}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label-vintage">manager</label>
            <select
              className="select-vintage"
              value={manager_email}
              onChange={(e) => set_manager_email(e.target.value)}
              required
            >
              <option value="">select a manager</option>
              {managers.map((m) => (
                <option key={m._id} value={m.email}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <hr className="hr-hairline" />

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-md btn-primary"
              disabled={submitting}
            >
              {submitting ? "Assigning..." : "Assign"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
