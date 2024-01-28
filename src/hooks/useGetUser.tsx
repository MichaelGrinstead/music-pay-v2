import { useEffect, useState } from "react";

const defaultProfileData = {
  username: "",
  about: "",
  image: "",
};

export const useGetUser = (
  username: string
): { username: string; userAbout: string; userImage: string } => {
  const [profileData, setProfileData] = useState(defaultProfileData);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        if (data) setProfileData(data);
      } catch (e) {
        console.error(e);
      }
    };

    getUser();
  }, []);

  return {
    username,
    userAbout: profileData.about,
    userImage: profileData.image,
  };
};
