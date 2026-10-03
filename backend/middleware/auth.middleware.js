import jsonwebtoken from "jsonwebtoken";
import User from "../features/user/model/user.model.js";
import variables from "../config/env_variables.js";
import { App_error } from "../utils/app_outcome_handler.js";

export async function authentify(req, res, next) {
  const token = req.headers?.authorization;
  if (!token) {
    throw new App_error("token isn't sent", 401, "UNAUTHENTICATED");
  }

  const access_token = token.split(" ")[1];
  const decoded_user = jsonwebtoken.verify(
    access_token,
    variables.ACCESS_TOKEN_SECRET_KEY,
  );

  if (!decoded_user) {
    throw new App_error("token is invalid", 401, "TOKEN_IS_INVALID");
  }

  const authorized_user = await User.findById(decoded_user._id).select(
    "-password",
  );

  if (!authorized_user) {
    throw new App_error("token is expired", 401, "TOKEN_IS_EXPIRED");
  }

  req.user = authorized_user;
  next();
}
