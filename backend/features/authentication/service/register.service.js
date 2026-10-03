import { App_error } from "../../../utils/app_outcome_handler.js";
import User from "../../user/model/user.model.js";
import bcryptjs from "bcryptjs";

export default async function register_service({ reference, name, email, password }) {
  const is_already_exist = await User.findOne({ email });

  if (is_already_exist) {
    throw new App_error("email is alreaady registered", 409, "EMAIL_ALREADY_EXIST");
  }

  const hashed_pass = await bcryptjs.hash(password, 10);

  const new_user = new User({
    name,
    email,
    password: hashed_pass,
    role: "worker",
    reference,
    refresh_token: null,
  });

  return await new_user.save();
}
