import pass_change_service from "../service/pass_change.service.js";

export default async function pass_change_controller(
  new_password,
  current_password,
  access_token,
) {
  try {
    const data = await pass_change_service(
      new_password,
      current_password,
      access_token,
    );
    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error, success: false };
  }
}
