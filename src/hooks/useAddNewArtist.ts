import { ArtistProfileData } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useAddNewArtist = () => {
  const add = async (data: ArtistProfileData) => {
    const response = await fetch(`/api/artist`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  };

  const {
    mutateAsync: addNewArtist,
    isPending: isAddNewArtistPending,
    isSuccess: isAddNewArtistSuccess,
    error: errorAddingNewArtist,
  } = useMutation({
    mutationFn: add,
  });

  return {
    addNewArtist,
    isAddNewArtistPending,
    isAddNewArtistSuccess,
    errorAddingNewArtist,
  };
};
