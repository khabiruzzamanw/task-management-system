import User from "../../user/model/user.model.js";

export default async function assign_worker_service(
  manager_email,
  worker_email,
) {
  const the_manager = await User.findOne({ email: manager_email }).select(
    "-password",
  );

  return await User.findOneAndUpdate(
    { email: worker_email },
    { manager: the_manager._id },
    { returnDocument: "after" },
  );
}
