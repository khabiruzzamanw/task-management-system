import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import pass_change_service from "../service/pass_change.service.js";

export async function pass_change_controller(req, res) {
  const { new_password, current_password } = req.body;
  const user_id = req.user._id;

  if (!new_password || !current_password) {
    throw new App_error("pasword is missing", 400, "VALIDATION_ERROR");
  }
  if (new_password === current_password) {
    throw new App_error(
      "the current password is the same as new password",
      400,
      "SAME_PASSWORD",
    );
  }
  await pass_change_service({
    user_id,
    new_password,
    current_password,
  });

  return new App_response("password is changed", 200).send_response(res);
}
