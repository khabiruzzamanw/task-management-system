export  class App_error extends Error {
  constructor(
    message = "Something went wrong",
    status = 500,
    code = "INTERNAL_ERROR",
    details = null,
  ) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.success = false;
  }
  send_response(res) {
    const body = {
      success: this.success,
      message: this.message,
      code: this.code,
    };

    return res.status(this.status).json(body);
  }
}

export class App_response{
  constructor(message = "OK", status = 200, data = null) {
    this.message = message;
    this.status = status;
    this.data = data;
    this.success = true;
  }
  send_response(res) {
    const body = { success: this.success, message: this.message };
    if (this.data !== null) {
      body.data = this.data;
    }
    return res.status(this.status).json(body);
  }
}
