import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authentication_route from "./features/authentication/route/authentication.route.js";
import task_route from "./features/task/route/task.route.js";
import admin_route from "./features/admin/route/admin.route.js";
import { App_error } from "./utils/app_outcome_handler.js";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));




app.use("/api/authentication", authentication_route);
app.use("/api/user/admin", admin_route);
app.use("/api/task", task_route);
















app.use(function (error, req, res, next) {
  if (error instanceof App_error) {
    return error.send_response(res);
  }
  console.log(error.code);
  console.log(error?.details);
});
export default app;
