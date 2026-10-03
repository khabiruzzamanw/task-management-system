import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import demotion_service from "../service/demotion.service.js";

export default async function demotion_controller(req, res) {
  const { worker_email } = req.body;

  if (!worker_email) {
    throw new App_error("worker's email is missing", 400, "VALIDATION_ERROR");
  }

  const is_demoted = await demotion_service(worker_email);

  return new App_response("worker is demoted successfully", 200).send_response(
    res,
  );
}
