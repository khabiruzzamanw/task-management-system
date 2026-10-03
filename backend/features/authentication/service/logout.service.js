import { App_error } from "../../../utils/app_outcome_handler.js";
import User from "../../user/model/user.model.js";

export default async function logout_service(_id) {
  const logged_out_user = await User.findByIdAndUpdate(
    _id,
    { refresh_token: null },
    { returnDocument: "after" },
  );
  if (!logged_out_user) {
    throw new App_error(
      "token is bad",
      401,
      "INVALID_TOKEN",
      "mostly it seems either token is expired or db could perform logout",
    );
  }
}
