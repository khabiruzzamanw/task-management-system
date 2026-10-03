export async function login_service(form_data) {
  const response = await fetch("http://localhost:3000/api/authentication/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form_data),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("fetch failed");
  }
  return await response.json();
}
