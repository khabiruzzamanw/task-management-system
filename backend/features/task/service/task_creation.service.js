import User from "../../user/model/user.model.js";
import Task from "../model/task.model.js";

export default async function task_creation_service({
  title,
  description,
  priority,
  status,
  manager_email,
  assigned_by,
}) {
  const manager_user = await User.findOne({ email: manager_email })
    .select("_id")
    .lean();

  const new_task = new Task({
    title,
    description,
    priority,
    status,
    manager: manager_user._id,
    assigned_by,
  });

  return await new_task.save();
}
