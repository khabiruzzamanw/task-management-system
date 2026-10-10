import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authentication_route from "./features/authentication/route/authentication.route.js";
import task_route from "./features/task/route/task.route.js";
import admin_route from "./features/admin/route/admin.route.js";
import manager_route from "./features/manager/route/manager.route.js";
import { App_error } from "./utils/app_outcome_handler.js";
import variables from "./config/env_variables.js";

const app = express();
const corsOptions = {
  origin: variables.CLIENT_URL,
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
app.use("/api/user/manager", manager_route);
app.use("/api/task", task_route);



app.use((err, req, res, next) => {
  if (err instanceof App_error) return err.send_response(res);
  if (err.name === "TokenExpiredError")
    return new App_error("token expired", 401, "TOKEN_EXPIRED").send_response(
      res,
    );
  if (err.name === "JsonWebTokenError")
    return new App_error("invalid token", 401, "INVALID_TOKEN").send_response(
      res,
    );
  if (err.name === "ValidationError" || err.name === "CastError")
    return new App_error(err.message, 400, "VALIDATION_ERROR").send_response(
      res,
    );
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

export default app;
