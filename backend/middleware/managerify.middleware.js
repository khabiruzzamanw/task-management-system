import { App_error } from "../utils/app_outcome_handler";

export default async function managerify(req, res, next) {
  if (req.user?.role !== "manager") {
    throw new App_error("manager only", 403, "FORBIDDEN");
  }
  next();
}
