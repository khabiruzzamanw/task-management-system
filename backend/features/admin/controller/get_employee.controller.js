import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import get_employee_list_service from "../service/get_employee_list.service.js";

export default async function get_employee_list_controller(req, res) {
  const _id = req.user._id;

  const employee_list = await get_employee_list_service({ _id });

  return new App_response("employee list fetchd", 200, {
    employee_list,
  }).send_response(res);
}
