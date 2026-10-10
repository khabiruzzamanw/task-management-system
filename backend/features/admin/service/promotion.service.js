import { App_error } from "../../../utils/app_outcome_handler.js";
import User from "../../user/model/user.model.js";
import Task from "../../task/model/task.model.js";
const ongoing_status = ["in_progress", "submitted"];
export default async function promotion_service(worker_email) {
  const is_worker = await User.findOne({ email: worker_email })
    .select("-password")
    .lean();
  if (!is_worker) {
    throw new App_error(`user is not found`, 404, "USER_NOT_FOUND");
  }
  if (is_worker.role !== "worker") {
    throw new App_error(`has to be worker to promote`, 403, "VALIDATION_ERROR");
  }
  const has_task = await Task.exists({
    assigned_to: is_worker._id,
    status: { $in: ongoing_status },
  });

  if (has_task) {
    throw new App_error(
      `${is_worker.name} has task to do`,
      403,
      "VALIDATION_ERROR",
    );
  }

  return await User.findOneAndUpdate(
    { _id: is_worker._id },
    { role: "manager", manager: null, refresh_token: null },
    { returnDocument: "after" },
  );
}
