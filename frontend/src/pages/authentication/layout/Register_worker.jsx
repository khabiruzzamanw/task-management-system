import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register_worker_controller } from "../controller/register.controller.js";
import { useEmployee } from "../../../context/Employee.context.jsx";
import { useToast } from "../../../context/Notify.context.jsx";

export default function Register_worker() {
  const navigate = useNavigate();
  const { notify } = useToast();
  const [form, set_form] = useState({ name: "", email: "", password: "" });
  const { refresh_employee } = useEmployee();

  function input_handler(e) {
    set_form(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function form_handler(e) {
    e.preventDefault();
    const result = await register_worker_controller(form);
    if (!result.success) {
      return notify(result.message, "error");
    }
    refresh_employee();
    notify(result.message, "success");
    navigate("/admin");
  }
  return (
    <>
      <main className="min-h-screen w-full bg-canvas">
        <div className="max-w-[560px] mx-auto px-8 pt-8 pb-24">
          <div className="flex justify-between items-center pb-6">
            <h1 className="text-title-lg font-bold text-parchment">
              Register worker
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
            onSubmit={form_handler}
            className="card-vintage flex flex-col gap-5 mt-6"
          >
            <div>
              <label className="label-vintage">worker's name</label>
              <input
                className="input-vintage"
                type="text"
                name="name"
                placeholder="Worker's name"
                value={form.name}
                onChange={input_handler}
                required
              />
            </div>

            <div>
              <label className="label-vintage">worker's email</label>
              <input
                className="input-vintage"
                type="email"
                name="email"
                placeholder="*****@kr.org"
                value={form.email}
                onChange={input_handler}
                required
              />
            </div>

            <div>
              <label className="label-vintage">password</label>
              <input
                className="input-vintage"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={input_handler}
                required
              />
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
                Register worker
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
