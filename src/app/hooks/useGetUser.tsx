import { useEffect, useState } from "react";

const defaultProfileData = {
  about: "",
  image: "",
};

export const useGetUser = (): { userAbout: string; userImage: string } => {
  const [profileData, setProfileData] = useState(defaultProfileData);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("/api/user", {
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

  return { userAbout: profileData.about, userImage: profileData.image };
};
