export default async function pass_change_service(new_password, current_password,access_token) {
  const response = await fetch("http://localhost:3000/api/authentication/change-pass", {
    method: "PATCH",
    body: JSON.stringify({ new_password,current_password }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.json().message);
  }
  return await response.json();
}
