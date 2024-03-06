import { UserData } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const update = async (data: UserData) => {
    const response = await fetch(`/api/user`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  };
  const { mutateAsync: updateUserData, error: errorUpdatingUser } = useMutation(
    {
      mutationFn: update,
    }
  );
  return { updateUserData, errorUpdatingUser };
};
