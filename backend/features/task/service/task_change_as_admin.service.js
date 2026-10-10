import { App_error } from "../../../utils/app_outcome_handler.js";
import User from "../../user/model/user.model.js";
import Task from "../model/task.model.js";

const is_available_status = {
  in_progress: ["canceled"],
  submitted: ["rejected", "approved", "canceled"],
  pending: ["canceled"],
  canceled: [],
  approved: [],
  rejected: [],
};

export default async function task_change_as_admin_service(
  admin_id,
  task_id,
  status,
  priority,
  title,
  description,

  manager_email,
) {
  const task = await Task.findOne({ _id: task_id, assigned_by: admin_id });
  if (!task) {
    throw new App_error("task isn't found ", 404, "TASK_NOT_FOUND");
  }
  const can_change_manager =
    task.status === "pending" || task.status === "in_progress";
  const can_edit = task.status === "pending" || task.status === "in_progress";
  const is_allowed_status = is_available_status[task.status];

  if (title !== undefined && can_edit) {
    task.title = title;
  }

  if (description !== undefined && can_edit) {
    task.description = description;
  }

  if (priority !== undefined && can_edit) {
    task.priority = priority;
  }

  if (status !== undefined) {
    if (!is_allowed_status.includes(status)) {
      throw new App_error(
        `you can't change this task status to ${status}`,
        403,
        "FORBIDDEN",
        "admin can only edit task status into some specific field",
      );
    }
    task.status = status;
  }

  if (manager_email !== undefined && can_change_manager) {
    const manager_user = await User.findOne({
      email: manager_email,
      role: "manager",
    })
      .select("_id")
      .lean();
    if (!manager_user) {
      throw new App_error("manager is not found", 404, "USER_NOT_FOUND");
    }
    task.manager = manager_user._id;
    task.assigned_to = null;
    task.status = "pending";
  }

  await task.save();
  return;
}
