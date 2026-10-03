export async function logout_service(token) {
  const response = await fetch("http://localhost:3000/api/authentication/logout", {
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
  });
  if (!response.ok) {
    throw new Error("fetch failed");
  }
  return await response.json();
}
