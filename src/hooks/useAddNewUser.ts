import { useMutation } from "@tanstack/react-query";

export const useAddNewUser = () => {
  async function add(username: string) {
    const response = await fetch(`/api/user?username=${username}`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  const { mutateAsync: addNewUser, error: errorAddingNewUser } = useMutation({
    mutationFn: add,
  });

  return { addNewUser, errorAddingNewUser };
};
