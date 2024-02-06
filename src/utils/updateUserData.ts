export const updateUserData = async ({
  about,
  avatar,
  banner,
}: {
  about?: string;
  avatar?: string;
  banner?: string;
}) => {
  const body = about
    ? JSON.stringify({ about })
    : avatar
    ? JSON.stringify({ avatar })
    : banner
    ? JSON.stringify({ banner })
    : null;

  try {
    const response = await fetch(`/api/user`, {
      method: "PUT",
      body,
    });
    if (response.ok) {
      return response.json();
    }
  } catch (e) {
    console.error(e, "error updating user data");
  }
};
