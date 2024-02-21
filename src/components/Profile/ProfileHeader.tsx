"use client";

import Image from "next/image";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { EditProfileBanner, EditProfileAvatar } from "./EditProfile";
import { uploadImage } from "@/utils/uploadImage";
import { useFormContext } from "react-hook-form";
import { Skeleton } from "../Ui/Skeleton";

interface ProfileHeaderProps {
  username: string;
  isOwnProfile?: boolean;
  updateProfile?: () => void;
  isEditMode: boolean;
}

export default function ProfileHeader({
  isOwnProfile,
  isEditMode,
}: ProfileHeaderProps) {
  const { setValue, getValues } = useFormContext();
  const profileData = getValues();
  const banner = profileData.bannerImage;
  const avatar = profileData.avatarImage;

  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const handleUploadImage = async (
    e: SyntheticEvent | ChangeEvent<HTMLInputElement>,
    type: string
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

      {!banner ? (
        <Skeleton className="w-full h-full bg-zinc-950" />
      ) : (
        <div className="w-full h-full">
          <Image
            className="rounded-md"
            src={banner}
            alt=""
            fill={true}
            objectFit="cover"
          />
        </div>
      )}

      <div className="absolute border border-4 border-black rounded-full mt-48">
        {isEditMode && isOwnProfile && (
          <EditProfileAvatar
            handleUploadImage={handleUploadImage}
            isUploadingAvatar={isUploadingAvatar}
          />
        )}

        <div className="flex justify-center items-center w-[250px] h-[250px] rounded-full bg-zinc-900">
          {!avatar ? (
            <Skeleton className="w-full h-full rounded-full bg-zinc-950" />
          ) : (
            <Image
              className="rounded-full object-cover"
              src={avatar}
              alt=""
              fill={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
