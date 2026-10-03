import { App_response } from "../../../utils/app_outcome_handler.js";
import promotion_service from "../service/promotion.service.js";

export default async function promotion_controller(req, res) {
  const { worker_email } = req.body;
  if (!worker_email) {
    return new App_error("worker's email is missing", 400, "VALIDATION_ERROR");
  }
  await promotion_service(worker_email);

  return new App_response("worker is promoted successfully", 200).send_response(
    res,
  );
}
