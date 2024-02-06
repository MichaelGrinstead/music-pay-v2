"use client";
import { useUser } from "@clerk/nextjs";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import { FormProvider, useForm } from "react-hook-form";
import { UserData } from "@/types";
import { updateUserData } from "@/utils/updateUserData";
import { useGetUser } from "@/hooks/useGetUser";
import { useEffect } from "react";

interface ProfileProps {
  username: string;
}

export default function Profile({ username }: ProfileProps) {
  const userData = useGetUser(username);

  const defaultValues = userData
    ? {
        about: userData.about,
        avatar: userData.avatar,
        banner: userData.banner,
      }
    : { about: "", avatar: "", banner: "" };

  const methods = useForm<UserData>({
    defaultValues,
  });

  const { getValues } = methods;

  const { user } = useUser();
  const isOwnProfile = user?.username?.toLowerCase() === username.toLowerCase();

  const updateProfile = async () => {
    const data = getValues();
    if (data.about) {
      const result = await updateUserData({ about: data.about });
      console.log("result", result);
    } else if (data.avatar) {
      const result = await updateUserData({ avatar: data.avatar });
      console.log("result", result);
    } else if (data.banner) {
      const result = await updateUserData({ banner: data.banner });
      console.log("result", result);
    }
  };

  useEffect(() => {
    methods.reset(defaultValues);
  });

  return (
    <FormProvider {...methods}>
      <div>
        <ProfileHeader
          username={username}
          isOwnProfile={isOwnProfile}
          updateProfile={updateProfile}
        />
        <ProfileContent
          username={username}
          isOwnProfile={isOwnProfile}
          updateProfile={updateProfile}
        />
      </div>
    </FormProvider>
  );
}
