import { App_error } from "../../../utils/app_outcome_handler.js";
import Task from "../../task/model/task.model.js";
import User from "../../user/model/user.model.js";

const ongoing_status = ["in_progress", "submitted", "pending"];

export default async function demotion_service(manager_email) {
  const is_manager = await User.findOne({ email: manager_email })
    .select("-password -refresh_token")
    .lean();
  if (!is_manager) {
    throw new App_error(`user in not found`, 404, "USER_NOT_FOUND");
  }
  if (is_manager.role !== "manager") {
    throw new App_error(
      `${is_manager.name} is not a manager`,
      403,
      "VALIDATION_ERROR",
    );
  }
  const has_task = await Task.exists({
    manager: is_manager._id,
    status: { $in: ongoing_status },
  });

  if (has_task) {
    throw new App_error(
      `${is_manager.name} have tasks to manage`,
      403,
      "VALIDATION_ERROR",
    );
  }

  await User.updateMany({ manager: is_manager._id }, { manager: null });
  await User.findOneAndUpdate(
    { _id: is_manager._id },
    { role: "worker", manager: null, refresh_token: null },
  );
}
