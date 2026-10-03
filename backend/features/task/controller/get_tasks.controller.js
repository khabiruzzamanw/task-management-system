import { App_response } from "../../../utils/app_outcome_handler.js";
import get_tasks_service from "../service/get_tasks.service.js";

export default async function get_tasks_controller(req, res) {
  const get_tasks_user = req.user;

  const tasks = await get_tasks_service(get_tasks_user);

  return new App_response("tasks is fetched successfully", 200, { tasks }).send_response(res);
}
