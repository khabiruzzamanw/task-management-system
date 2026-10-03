import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import assign_worker_service from "../service/assign_worker.service.js";

export default async function assign_worker_controller(req, res) {
  const { manager_email, worker_email } = req.body;

  if (!manager_email || !worker_email) {
    throw new App_error("worker or manager email is missing",400,"VALIDATION_ERROR")
  }


    await assign_worker_service(manager_email, worker_email);

  return new App_response("worker is assign", 200).send_response(res);
}
