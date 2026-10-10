import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import pass_change_service from "../service/pass_change.service.js";
const max_length = 72;
const min_length = 8;



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
const is_pass_inappropriate =   new_password.length < min_length || new_password.length > max_length ||   current_password.length < min_length || current_password.length > max_length

  if (!is_pass_inappropriate) {
    throw new App_error(`password has to be between 8 and 72 chars`, 403, "VALIDATION_ERROR");
}
  await pass_change_service({
    user_id,
    new_password,
    current_password,
  });

  return new App_response("password is changed", 200).send_response(res);
}
