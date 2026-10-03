


export async function get_me_service() {
  const response = await fetch("http://localhost:3000/api/authentication/get-me");
  if (!response.ok) {
    new error();
    error.json({
      message: "couldn't fetch data from server",
      success:false,
    })
    return error;

  }

  return  await response.json();

}
