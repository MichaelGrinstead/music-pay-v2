export async function addNewUser(username: string) {
  try {
    fetch(`/api/user/${username}`, {
      method: "POST",
    });
  } catch (e) {
    console.error(e, "error adding new user");
  }
}
