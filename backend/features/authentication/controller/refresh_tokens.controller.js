import refresh_tokens_service from "../service/refresh_tokens.service.js";
import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import { cookie_options } from "../../../utils/cookie_handler.js";

export default async function refresh_token_controller(req, res) {
  const token = req.cookies?.refreshToken;
  if (!token) {
    throw new App_error("token is expired", 401, "NO_REFRESH_TOKEN");
  }

  const refreshed_data = await refresh_tokens_service(token);
  res.cookie("refreshToken", refreshed_data.new_refresh_token, cookie_options);

  return new App_response("tokens are refreshed", 200, {
    user: {
      _id: refreshed_data.user_with_new_refresh._id,
      name: refreshed_data.user_with_new_refresh.name,
      email: refreshed_data.user_with_new_refresh.email,
      role: refreshed_data.user_with_new_refresh.role,
    },
    accessToken: refreshed_data.new_access_token,
  }).send_response(res);
}
