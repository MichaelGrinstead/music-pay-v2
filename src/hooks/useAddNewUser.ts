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

  const {
    mutateAsync: addNewUser,
    isPending: isAddNewUserPending,
    isSuccess: isAddNewUserSuccess,
    error: errorAddingNewUser,
  } = useMutation({
    mutationFn: add,
  });

  return {
    addNewUser,
    isAddNewUserPending,
    isAddNewUserSuccess,
    errorAddingNewUser,
  };
};
