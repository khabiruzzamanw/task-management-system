import User from "../../user/model/user.model.js";

export default async function demotion_service(worker_email) {
  const promoted_user = await User.findOneAndUpdate(
    { email: worker_email, role: "manager" },
    { role: "worker", manager: null, refresh_token: null },
    { returnDocument: "after" },
  );

  return promoted_user;
}
