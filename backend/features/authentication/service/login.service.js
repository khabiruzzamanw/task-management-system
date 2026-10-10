import { App_error } from "../../../utils/app_outcome_handler.js";
import { hash_token } from "../../../utils/token_hasher.js";
import User from "../../user/model/user.model.js";
import bcryptjs from "bcryptjs";

export async function login_service({ email, password }) {
  const does_exist = await User.findOne({ email }).select("+password");

  if (!does_exist) {
    throw new App_error(
      "email or password is incorrect",
      401,
      "INVALID_CREDENTIALS",
    );
  }

  const is_pass_correct = await bcryptjs.compare(password, does_exist.password);

  if (!is_pass_correct) {
    throw new App_error(
      "email or password is incorrect",
      401,
      "INVALID_CREDENTIALS",
    );
  }
  return does_exist;
}

export async function update_refresh_token(_id, token) {
  const hashed_refresh_token = hash_token(token);
  const updated_user = await User.findByIdAndUpdate(
    _id,
    { refresh_token: hashed_refresh_token },
    { returnDocument: "after" },
  );
  return updated_user;
}
