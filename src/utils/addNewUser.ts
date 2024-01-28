export async function addNewUser() {
  try {
    fetch("/api/user", {
      method: "POST",
    });
  } catch (e) {
    console.error(e, "error adding new user");
  }
}
