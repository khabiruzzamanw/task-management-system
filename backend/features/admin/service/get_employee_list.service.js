import User from "../../user/model/user.model.js";

export default async function get_employee_list_service({ _id }) {
  const employee_list = await User.find({
    reference: _id,
    role: { $in: ["manager", "worker"] },
  }).select("email name role manager").lean();

  return employee_list;
}
