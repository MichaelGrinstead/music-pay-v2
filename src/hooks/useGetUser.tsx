import { UserData } from "@/types";
import { useEffect, useState } from "react";

const defaultUserData: UserData = {
  about: "",
  avatar: "",
  banner: "",
};

export const useGetUser = (username?: string): UserData => {
  const [userData, setUserData] = useState(defaultUserData);

  const route = username ? `/api/user?username=${username}` : "/api/user";

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(route, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        if (data) setUserData(data);
      } catch (e) {
        console.error(e);
      }
    };

    getUser();
  }, []);

  return {
    about: userData.about || "",
    avatar: userData.avatar || "",
    banner: userData.banner || "",
  };
};
