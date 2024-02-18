"use client";
import { useUser } from "@clerk/nextjs";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import { FormProvider, useForm } from "react-hook-form";
import { UserData } from "@/types";
import { updateUserData } from "@/utils/updateUserData";
import { useGetUser } from "@/hooks/useGetUser";
import { useEffect, useState } from "react";
import { Button } from "../Ui/Button";

interface ProfileProps {
  username: string;
}

export default function Profile({ username }: ProfileProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const userData = useGetUser(username);

  const defaultValues = userData
    ? {
        about: userData.about,
        avatarImage: userData.avatarImage,
        bannerImage: userData.bannerImage,
      }
    : { about: "", avatarImage: "", bannerImage: "" };

  const methods = useForm<UserData>({
    defaultValues,
  });

  const { getValues, watch } = methods;

  console.log("watch", watch());

  const { user } = useUser();
  const isOwnProfile = user?.username === userData.usernameLowercase;

  const updateProfile = async () => {
    const data = getValues();
    updateUserData(data);
  };

  useEffect(() => {
    methods.reset(defaultValues);
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="relative flex flex-col gap-16">
        {isOwnProfile &&
          (!isEditMode ? (
            <Button
              className="absolute right-1 top-64 border-none bg-zinc-900 hover:bg-zinc-800 z-10 rounded-xl"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              className="absolute right-1 border-none bg-zinc-800 hover:bg-zinc-500 top-64 z-10"
              onClick={() => {
                setIsEditMode(!isEditMode);
                updateProfile();
              }}
            >
              Save
            </Button>
          ))}
        <ProfileHeader
          username={username}
          isOwnProfile={isOwnProfile}
          updateProfile={updateProfile}
          isEditMode={isEditMode}
        />
        <ProfileContent
          username={username}
          isOwnProfile={isOwnProfile}
          updateProfile={updateProfile}
          isEditMode={isEditMode}
        />
      </div>
    </FormProvider>
  );
}
