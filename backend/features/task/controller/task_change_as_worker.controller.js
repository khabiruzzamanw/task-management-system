import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import task_change_as_worker_service from "../service/task_change_as_worker.service.js";

const worker_allowed_status = ["submitted", undefined];

export default async function task_change_as_worker_controller(req, res) {
  const { task_id, status } = req.body;
  const worker_id = req.user._id;

  if (!status || !task_id) {
    throw new App_error(
      "task status is missing",
      400,
      "VALIDATION_ERROR",
      "task status is missing from fillng space",
    );
  }
  if (!worker_allowed_status.includes(status)) {
    throw new App_error(
      "you are not permitted to do this",
      403,
      "FORBIDDEN",
      "worker can only edit task status into submitted ",
    );
  }

  await task_change_as_worker_service(task_id, status, worker_id);
  return new App_response(
    "task's status is updated successfully",
    200,
  ).send_response(res);
}
