"use client";

import Image from "next/image";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { EditProfileBanner, EditProfileAvatar } from "./EditProfile";
import { uploadImage } from "@/utils/uploadImage";
import { useFormContext } from "react-hook-form";
import { Skeleton } from "../Ui/Skeleton";

interface ProfileHeaderProps {
  isOwnProfile?: boolean;
  isEditMode: boolean;
  isUserDataLoading?: boolean;
}

export default function ProfileHeader({
  isOwnProfile,
  isEditMode,
  isUserDataLoading,
}: ProfileHeaderProps) {
  const { setValue, getValues } = useFormContext();
  const profileData = getValues();
  const banner = profileData.bannerImage;
  const avatar = profileData.avatarImage;

  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const handleUploadImage = async (
    e: SyntheticEvent | ChangeEvent<HTMLInputElement>,
    type: "bannerImage" | "avatarImage"
  ) => {
    if (type == "bannerImage") {
      setIsUploadingBanner(true);
    } else if (type == "avatarImage") {
      setIsUploadingAvatar(true);
    }
    const result = await uploadImage(e);
    if (result) {
      setValue(type, result);

      if (type == "bannerImage") {
        setIsUploadingBanner(false);
      } else if (type == "avatarImage") {
        setIsUploadingAvatar(false);
      }
    }
  };

  return (
    <div className="w-full h-[220px] flex flex-col justify-center items-center relative mt-8 rounded-sm bg-zinc-900">
      {isEditMode && isOwnProfile && (
        <EditProfileBanner
          handleUploadImage={handleUploadImage}
          isUploadingBanner={isUploadingBanner}
        />
      )}

      {isUserDataLoading ? (
        <Skeleton className="w-full h-full bg-zinc-950" />
      ) : !banner ? (
        <div className="w-full h-full bg-zinc-950"></div>
      ) : (
        <div className="w-full h-full">
          <Image
            className="rounded-md"
            src={banner}
            alt="User Banner"
            fill={true}
            objectFit="cover"
          />
        </div>
      )}

      <div className="absolute border border-4 border-black rounded-full mt-48">
        {isEditMode && isOwnProfile && (
          <div className="absolute top-[101px] left-[101px] ">
            <EditProfileAvatar
              handleUploadImage={handleUploadImage}
              isUploadingAvatar={isUploadingAvatar}
            />
          </div>
        )}

        <div className="flex justify-center items-center w-[250px] h-[250px] rounded-full bg-zinc-900">
          {isUserDataLoading ? (
            <Skeleton className="w-full h-full rounded-full bg-zinc-950" />
          ) : !avatar ? (
            <div className="flex flex-col items-center justify-center w-full h-full rounded-full bg-zinc-950 text-md text-zinc-500">
              {!isEditMode && "No image set"}
            </div>
          ) : (
            <Image
              className="rounded-full object-cover"
              src={avatar}
              alt="User Avatar"
              fill={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
