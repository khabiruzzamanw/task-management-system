import { App_error } from "../../../utils/app_outcome_handler.js";
import User from "../../user/model/user.model.js";
import Task from "../model/task.model.js";
const is_available_status = {
  in_progress: [],
  submitted: [],
  pending: ["in_progress"],
  canceled: [],
  approved: [],
  rejected: [],
};

export default async function task_change_as_manager_service(
  task_id,
  manager_id,
  worker_email,
  status,
) {
  const task = await Task.findOne({ _id: task_id, manager: manager_id });
  if (!task) {
    throw new App_error("task not found", 404, "TASK_NOT_FOUND");
  }

  const can_change_worker =
    task.status === "pending" || task.status === "in_progress";

  if (status !== undefined) {
    const is_allowed_status = is_available_status[task.status];
    if (!is_allowed_status.includes(status)) {
      throw new App_error(
        `you can't change this task status to ${status}`,
        403,
        "FORBIDDEN",
        "manager can only edit task status into some specific field",
      );
    }
    task.status = status;
  }
  if (worker_email !== undefined && can_change_worker) {
    if (worker_email === null || worker_email === "") {
      task.assigned_to = null;
    } else {
      if (task?.assigned_to !== null && task?.status === "submitted") {
        throw new App_error(
          "the task is already submitted ",
          409,
          "DATA_CONFLICT_RISK",
        );
      }
      const worker = await User.findOne({
        email: worker_email,
        manager: manager_id,
        role: "worker",
      })
        .select("_id")
        .lean();
      if (!worker) {
        throw new App_error("worker is not found", 404, "USER_NOT_FOUND");
      }
      task.assigned_to = worker._id;
      task.status = "in_progress";
    }
  }

  await task.save();
  return;
}
