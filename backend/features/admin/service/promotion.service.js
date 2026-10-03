import User from "../../user/model/user.model.js";

export default async function promotion_service(worker_email) {
  const promoted_user = await User.findOneAndUpdate(
    { email: worker_email, role: "worker" },
    { role: "manager", manager: null, refresh_token: null },
    { returnDocument: "after" },
  );

  return promoted_user;
}
