import { App_error } from "../../../utils/app_outcome_handler.js";
import User from "../../user/model/user.model.js";

export default async function assign_worker_service(
  manager_email,
  worker_email,
) {
  const the_manager = await User.findOne({ email: manager_email }).select(
    "-password",
  );
  const the_worker = await User.findOne({ email: worker_email }).select(
    "-password",
  );

  if (!the_manager || !the_worker) {
    throw new App_error(
      "worker or manager is not found",
      403,
      "USER_NOT_FOUND",
    );
  }
  if (the_manager.role !== "manager" || the_worker.role !== "worker") {
    throw new App_error(
      "to assign worker manager has to be manager and worker has to be worker",
      403,
      "VALIDATION_ERROR",
    );
  }
  if (the_worker.manager) {
    throw new App_error(`${the_worker.name} is already assigned to a manager`,409,"CONFLICT")
  }

  return await User.findOneAndUpdate(
    { email: worker_email },
    { manager: the_manager._id },
    { returnDocument: "after" },
  );
}
