import fetch_handler from "../../../utils/fetch_handler.js";
export default async function demotion_service(manager_email) {
  return await fetch_handler("user/admin/demote", {
    method: "PATCH",
    body: JSON.stringify({ manager_email }),
  });
}
