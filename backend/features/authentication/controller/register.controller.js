import variables from "../../../config/env_variables.js";
import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import register_service from "../service/register.service.js";

const max_length = 72;
const min_length = 8;

export async function register_controller(req, res) {
  const { name, password, email } = req.body;

  if (!email || !password || !name) {
    throw new App_error(" email or pasword or name is missing", 400, "VALIDATION_ERROR");
  }


  const email_parts = email.split("@");
  if (!email_parts) {
    throw new App_error("the email is inappropriate", 401, "INVALID_EMAIL");
  }

  if (email_parts.length !== 2 || email_parts[1] !== variables.ORG_DOMAIN) {
    throw new App_error(
      "the email is inappropriate",
      401,
      "INVALID_EMAIL_DOMAIN",
    );
  }

  if (password.length < min_length || password.length > max_length) {
    throw new App_error(
      "password has to be between 8 and 72 chars",
      400,
      "WEAK_PASSWORD",
    );
  }

  await register_service({ reference: req.user._id, name, password, email });
  return new App_response(
    "a user is registered successfully",
    200,
  ).send_response(res);
}
