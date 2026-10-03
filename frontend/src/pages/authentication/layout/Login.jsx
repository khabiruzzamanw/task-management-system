import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login_controller } from "../controller/login.controller.js";
import { useAuth } from "../../../context/Auth.context.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [worker, set_worker] = useState({});
  const { user, set_user, access_token, set_access_token, loading } = useAuth();

  function input_handler(e) {
    set_worker(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  if(loading){return(<><div className="text-4xl text-green-200">loading</div></>)}

  async function form_handler(e) {
    e.preventDefault();
    const stat = await login_controller(worker);
    console.log(stat.user);
    set_user(stat.user);
    set_access_token(stat.accessToken);
    if (!stat.success) {
      return console.log(`${stat.message}`);
    }
    console.log("yay");
    if (stat.user?.role === "admin") {
      navigate("/admin");
    } else if (stat.user?.role === "manager") {
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
