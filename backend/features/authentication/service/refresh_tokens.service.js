import jsonwebtoken from "jsonwebtoken";
import { token_generator } from "../../../utils/token_generator.js";
import User from "../../user/model/user.model.js";
import variables from "../../../config/env_variables.js";
import { App_error } from "../../../utils/app_outcome_handler.js";
import { hash_token } from "../../../utils/token_hasher.js";

export default async function refresh_tokens_service(token) {
  const decoded_user = jsonwebtoken.verify(
    token,
    variables.REFRESH_TOKEN_SECRET_KEY,
  );
  if (!decoded_user) {
    throw new App_error("token is expired", 401, "TOKEN_EXPIRED");
  }
  const authorized_user = await User.findById(decoded_user._id).select(
    "-password",
  );
  if (!authorized_user) {
    throw new App_error("user is not found", 404, "USER_NOT_FOUND");
  }
  if (!authorized_user.refresh_token) {
    throw new App_error("refresh token is not found", 404, "TOKEN_NOT_FOUND");
  }

  if (hash_token(token) !== authorized_user.refresh_token) {
    throw new App_error("token is invalid or expired", 401, "INVALID_TOKEN");
  }

  const new_access_token = token_generator(
    { _id: authorized_user._id },
    "access",
  );
  const new_refresh_token = token_generator(
    {
      name: authorized_user.name,
      _id: authorized_user._id,
      email: authorized_user.email,
    },
    "refresh",
  );

  const new_hashed_refresh_token = hash_token(new_refresh_token);

  const user_with_new_refresh = await User.findByIdAndUpdate(
    authorized_user._id,
    { refresh_token: new_hashed_refresh_token },
    { returnDocument: "after" },
  );

  return {
    new_access_token,
    new_refresh_token,
    user_with_new_refresh,
  };
}
