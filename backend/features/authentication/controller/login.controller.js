import { token_generator } from "../../../utils/token_generator.js";
import {
  login_service,
  update_refresh_token,
} from "../service/login.service.js";
import variables from "../../../config/env_variables.js";
import { App_error, App_response } from "../../../utils/app_outcome_handler.js";

export default async function login_controller(req, res) {
  const { email, password } = req.body;

  const email_parts = email.split("@");

  if (email_parts.length !== 2 || email_parts[1] !== variables.ORG_DOMAIN) {
    throw new App_error("email is inappropriate", 400, "INVALID_EMAIL");
  }

  const logged_user = await login_service({ email, password });
  const access_token = token_generator({ _id: logged_user._id }, "access");
  const refresh_token = token_generator(
    {
      _id: logged_user._id,
      name: logged_user.name,
      email: logged_user.email,
    },
    "refresh",
  );

  await update_refresh_token(logged_user._id, refresh_token);

  res.cookie("refreshToken", refresh_token, {
    httpOnly: true,
  });

  return new App_response("login successful", 200, {
    user: {
      _id: logged_user._id,
      role: logged_user.role,
      name: logged_user.name,
    },
    accessToken: access_token,
  }).send_response(res);
}
