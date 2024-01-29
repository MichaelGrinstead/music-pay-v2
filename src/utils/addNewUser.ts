export async function addNewUser(username: string) {
  try {
    const response = await fetch(`/api/user?username=${username}`, {
      method: "POST",
    });
    if (response.ok) {
      return response.json();
    }
  } catch (e) {
    console.error(e, "error adding new user");
  }
}
