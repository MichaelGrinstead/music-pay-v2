import { UserData } from "@/types";

export const updateUserData = async (data: UserData) => {
  try {
    const response = await fetch(`/api/user`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return response.json();
    }
  } catch (e) {
    console.error(e, "error updating user data");
  }
};
