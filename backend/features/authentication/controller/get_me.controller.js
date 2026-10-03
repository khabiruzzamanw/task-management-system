import { App_response } from "../../../utils/app_outcome_handler.js";
import get_me_service from "../service/get_me.service.js";

export async function get_me_controller(req, res) {
  const user = req.user;

  const user_info = await get_me_service(user._id);

return  new App_response("user details is fetched successfully", 200, user_info).send_response(res);
}
