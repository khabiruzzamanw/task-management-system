export async function register_worker_service(form_data, token) {
  const response = await fetch(
    "http://localhost:3000/api/authentication/register-user",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form_data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error(response.json().message);
  }
  return await response.json();
}
