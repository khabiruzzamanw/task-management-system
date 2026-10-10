import { useState } from "react";
import { useEmployee } from "../../../context/Employee.context";
import promotion_controller from "../controller/promotion.controller";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/Notify.context";
import Loading_screen from "../../../components/Loading_screen";

export default function Promotion() {
  const { employee, employee_loading, refresh_employee } = useEmployee();
  const [promoting_email, set_promoting_email] = useState(null);
  const navigate = useNavigate();
  const { notify } = useToast();
  if (employee_loading) {
    return <Loading_screen/>;
  }

  async function promote_handler(email) {
    set_promoting_email(email);
    const result = await promotion_controller(email);
    set_promoting_email(null);

    if (!result.success) {
      return notify(result.message, "error");
    }
    refresh_employee();
    notify(result.message, "success");
  }


  const workers = employee.filter(function (worker) {
    return worker.role === "worker";
  });

  return (
    <>
      <main className="min-h-screen w-full bg-canvas">
        <div className="max-w-[700px] mx-auto px-8 pt-8 pb-24">
          <div className="flex justify-between items-center pb-6">
            <h1 className="text-title-lg font-bold text-parchment">
              Promote worker
            </h1>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => navigate("/admin")}
            >
              Back
            </button>
          </div>

          <hr className="hr-hairline" />

          <div className="flex flex-col gap-3 mt-6">
            {workers.length === 0 && (
              <p className="text-caption-md leading-normal text-fade">
                No workers to promote
              </p>
            )}

            {workers.map(function (worker) {
              return (
                <div
                  key={worker._id}
                  className="card-vintage flex justify-between items-center gap-4"
                >
                  <div className="min-w-0">
                    <h3 className="text-heading-md font-bold text-parchment truncate">
                      {worker.name}
                    </h3>
                    <p className="text-caption-md leading-normal text-prose truncate">
                      {worker.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="tag-vintage">{worker.role}</span>
                    <button
                      className="btn btn-sm btn-primary"
                      disabled={promoting_email === worker.email}
                      onClick={function () {
                        promote_handler(worker.email);
                      }}
                    >
                      {promoting_email === worker.email
                        ? "Promoting..."
                        : "Promote"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
