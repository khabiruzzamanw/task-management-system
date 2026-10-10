import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login_controller } from "../controller/login.controller.js";
import { useAuth } from "../../../context/Auth.context.jsx";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [worker, set_worker] = useState({});

  const { set_user, set_access_token_globally, user_loading } = useAuth();
  const { notify } = useToast();

  function input_handler(e) {
    set_worker(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  if (user_loading) {
    return (
      <>
        <Loading_screen />
      </>
    );
  }

  async function form_handler(e) {
    e.preventDefault();
    const result = await login_controller(worker);
    if (!result.success) {
      return notify(result.message, "error");
    }

    set_user(result.data.user);
    set_access_token_globally(result.data.accessToken);

    if (result.data.user?.role === "admin") {
      navigate("/admin");
    } else if (result.data.user?.role === "manager") {
      navigate("/manager");
    } else {
      navigate("/worker");
    }
  }
  return (
    <>
      <main className="min-h-screen w-full bg-canvas flex items-center justify-center px-8">
        <div className="w-full max-w-[400px]">
          <div className="pb-6">
            <h1 className="text-title-lg font-bold text-parchment">
              Task manager
            </h1>
            <p className="text-caption-md leading-normal text-fade">
              Log in to continue.
            </p>
          </div>

          <hr className="hr-hairline" />

          <form
            onSubmit={form_handler}
            className="card-vintage flex flex-col gap-5 mt-6"
          >
            <div>
              <label className="label-vintage">email</label>
              <input
                className="input-vintage"
                type="email"
                name="email"
                placeholder="*****@kr.org"
                value={worker.email}
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
                value={worker.password}
                onChange={input_handler}
                required
              />
            </div>

            <hr className="hr-hairline" />

            <div className="flex justify-end">
              <button type="submit" className="btn btn-md btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
