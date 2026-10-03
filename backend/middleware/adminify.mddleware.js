import { App_error } from "../utils/app_outcome_handler.js";

export default async function adminify(req, res, next) {
  if (req.user?.role !== "admin") {
    throw new App_error("only admin", 403, "FORBIDDEN");
  }
  next();
}
