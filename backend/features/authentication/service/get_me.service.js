import { App_error } from "../../../utils/app_outcome_handler.js";
import User from "../../user/model/user.model.js";

export default async function get_me_service(_id) {
  const user_details = await User.findById(_id).select("-password");
  if (!user_details) {
    throw new App_error(
      "no user is with the id",
      401,
      "USER_NOT_FOUND",
      "mostly like user doesn't exits with this id or db faild to send user info",
    );
  }

  return user_details;
}
