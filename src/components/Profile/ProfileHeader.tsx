"use client";

import { useGetUser } from "@/hooks/useGetUser";
import Image from "next/image";
import { ChangeEvent, SyntheticEvent } from "react";
import { EditProfileBanner, EditProfileAvatar } from "./EditProfile";
import { uploadImage } from "@/utils/uploadImage";
import { useFormContext } from "react-hook-form";

interface ProfileHeaderProps {
  username: string;
  isOwnProfile?: boolean;
  updateProfile?: () => void;
  isEditMode: boolean;
}

export default function ProfileHeader({
  username,
  isOwnProfile,
  isEditMode,
}: ProfileHeaderProps) {
  const { avatarImage, bannerImage } = useGetUser(username);
  const { setValue } = useFormContext();

  const handleUploadImage = async (
    e: SyntheticEvent | ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const result = await uploadImage(e);
    console.log("upload image result", result);
    if (result) setValue(type, result);
  };

  return (
    <div className="w-full h-[220px] flex flex-col justify-center items-center relative mt-8 rounded-sm bg-zinc-900">
      {isEditMode ? (
        isOwnProfile && (
          <EditProfileBanner handleUploadImage={handleUploadImage} />
        )
      ) : (
        <div>
          {bannerImage && (
            <Image
              className="rounded-md"
              src={bannerImage}
              alt=""
              fill={true}
              objectFit="cover"
            />
          )}
        </div>
      )}

      <div className="absolute border border-4 border-black rounded-full mt-48">
        {isEditMode ? (
          isOwnProfile && (
            <EditProfileAvatar handleUploadImage={handleUploadImage} />
          )
        ) : (
          <div className="flex justify-center items-center w-[250px] h-[250px] rounded-full bg-zinc-900">
            {avatarImage && (
              <Image
                className="rounded-full object-cover"
                src={avatarImage}
                alt=""
                fill={true}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
