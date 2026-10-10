import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import demotion_service from "../service/demotion.service.js";

export default async function demotion_controller(req, res) {
  const { manager_email } = req.body;

  if (!manager_email) {
    throw new App_error("manager's email is missing", 400, "VALIDATION_ERROR");
  }
  await demotion_service(manager_email);

  return new App_response(
    "managers is demoted successfully",
    200,
  ).send_response(res);
}
