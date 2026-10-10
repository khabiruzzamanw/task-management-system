import { Router } from "express";
import { get_me_controller } from "../controller/get_me.controller.js";
import { logout_controller } from "../controller/logout.controller.js";
import { pass_change_controller } from "../controller/pass_change.controller.js";
import refresh_token_controller from "../controller/refresh_tokens.controller.js";
import { register_controller } from "../controller/register.controller.js";
import login_controller from "../controller/login.controller.js";
import adminify from "../../../middleware/adminify.middleware.js";
import { authentify } from "../../../middleware/auth.middleware.js";

const route = Router();

route.post("/login", login_controller);
route.post("/register-user", authentify, adminify, register_controller);
route.get("/refresh-tokens", refresh_token_controller);
route.patch("/change-pass", authentify, pass_change_controller);
route.get("/get-me", authentify, get_me_controller);
route.delete("/logout", authentify, logout_controller);

export default route;
