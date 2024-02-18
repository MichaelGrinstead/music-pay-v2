import { UserData } from "@/types";
import { useEffect, useState } from "react";

const defaultUserData: UserData = {
  username: "",
  usernameLowercase: "",
  about: "",
  avatarImage: "",
  bannerImage: "",
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
        console.log("data", data);

        if (data) setUserData(data);
      } catch (e) {
        console.error(e);
      }
    };

    getUser();
  }, []);

  return {
    username: userData.username || "",
    usernameLowercase: userData.usernameLowercase || "",
    about: userData.about || "",
    avatarImage: userData.avatarImage || "",
    bannerImage: userData.bannerImage || "",
  };
};
