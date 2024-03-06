import { UserData } from "@/types";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (
  username?: string
): { userData: UserData; isUserDataLoading: boolean } => {
  const route = username ? `/api/user?username=${username}` : "/api/user";

  const {
    data: userData,
    isLoading: isUserDataLoading,
    error: errorGettingUser,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await fetch(route, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    },
  });

  return useMemo(() => {
    return {
      userData: {
        username: userData?.username || "",
        usernameLowercase: userData?.usernameLowercase || "",
        about: userData?.about || "",
        avatarImage: userData?.avatarImage || "",
        bannerImage: userData?.bannerImage || "",
      },
      isUserDataLoading,
      errorGettingUser,
    };
  }, [userData]);
};
