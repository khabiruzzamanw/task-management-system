import { App_response } from "../../../utils/app_outcome_handler.js";
import logout_service from "../service/logout.service.js";

export async function logout_controller(req, res) {
  await logout_service(req.user._id);
  res.clearCookie("refreshToken", {
    httpOnly: true,
  });
  return new App_response("logout successfull", 200).send_response(res);
}
