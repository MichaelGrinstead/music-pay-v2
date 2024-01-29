import { useEffect, useState } from "react";

interface ProfileData {
  username: string;
  about: string;
  image: string;
}

const defaultProfileData: ProfileData = {
  username: "",
  about: "",
  image: "",
};

export const useGetUser = (username?: string): ProfileData => {
  const [profileData, setProfileData] = useState(defaultProfileData);

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
        console.log("useGetUser", data);
        if (data) setProfileData(data);
      } catch (e) {
        console.error(e);
      }
    };

    getUser();
  }, []);

  return {
    username: profileData.username,
    about: profileData.about,
    image: profileData.image,
  };
};
