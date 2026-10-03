import Task from "../model/task.model.js";

export default async function get_tasks_service(get_tasks_user) {
  let tasks = [];

  if (get_tasks_user.role === "admin") {
    tasks = await Task.find({ assigned_by: get_tasks_user._id })
      .populate("manager", "name email")
      .populate("assigned_to", " name email")
      .lean();
  }
  if (get_tasks_user.role === "manager") {
    tasks = await Task.find({ manager: get_tasks_user._id })
      .populate("manager", "name email")
      .populate("assigned_to", " name email")
      .lean();
  }
  if (get_tasks_user.role === "worker") {
    tasks = await Task.find({ assigned_to: get_tasks_user._id })
      .populate("manager", "name email")
      .populate("assigned_to", " name email")
      .lean();
  }

  return tasks;
}
