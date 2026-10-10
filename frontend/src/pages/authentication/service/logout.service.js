import fetch_handler from "../../../utils/fetch_handler.js";
export async function logout_service() {
  return await fetch_handler("authentication/logout", { method: "DELETE" });
}
