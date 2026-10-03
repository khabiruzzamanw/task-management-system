import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import task_creation_service from "../service/task_creation.service.js";

export async function task_creation_controller(req, res) {
  const { title, description, priority, status, manager_email } = req.body;

  const assigned_by = req.user._id;

  if (
    !title ||
    !description ||
    !priority ||
    !status ||
    !assigned_by ||
    !manager_email
  ) {
    throw new App_error(
      "task data is missing",
      400,
      "VALIDATION_ERROR",
      "some of the task info is missing from fillng space",
    );
  }

  const response = await task_creation_service({
    title,
    description,
    priority,
    status,
    manager_email,
    assigned_by,
  });

  return new App_response("task is created", 200).send_response(res);
}
