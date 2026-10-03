import { Router } from "express";
import { authentify } from "../../../middleware/auth.middleware.js";
import adminify from "../../../middleware/adminify.mddleware.js";
import assign_worker_controller from "../../admin/controller/assign_worker.controller.js";
import demotion_controller from "../controller/demotion.controller.js";
import get_employee_list_controller from "../controller/get_employee.controller.js";
import promotion_controller from "../controller/promotion.controller.js";

const route = Router();

route.patch("/assign-worker", authentify, adminify, assign_worker_controller);
route.patch("/demote", authentify, adminify, demotion_controller);
route.get(
  "/get-employee-list",
  authentify,
  adminify,
  get_employee_list_controller,
);
route.patch("/promote", authentify, adminify, promotion_controller);

export default route;
