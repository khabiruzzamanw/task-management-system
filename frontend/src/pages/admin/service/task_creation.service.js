export async function task_creation_service(task_form, access_token) {
  const response = await fetch("http://localhost:3000/api/task/create-task", {
    method: "POST",
    body: JSON.stringify(task_form),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error("fetch failed");
  }
  return await response.json();
}
