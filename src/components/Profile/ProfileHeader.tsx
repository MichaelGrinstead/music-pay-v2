"use client";

import { useGetUser } from "@/hooks/useGetUser";
import Image from "next/image";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { EditProfileBanner, EditProfileAvatar } from "./EditProfile";
import CameraIcon from "../Ui/Icons/CameraIcon";
import XIcon from "../Ui/Icons/XIcon";
import { uploadImage } from "@/utils/uploadImage";
import { useFormContext } from "react-hook-form";

interface ProfileHeaderProps {
  username: string;
  isOwnProfile?: boolean;
  updateProfile?: () => void;
}

export default function ProfileHeader({
  username,
  isOwnProfile,
  updateProfile,
}: ProfileHeaderProps) {
  const { avatar } = useGetUser(username);
  const { setValue } = useFormContext();

  const [isEditingBanner, setIsEditingBanner] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);

  const handleUploadImage = async (
    e: SyntheticEvent | ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const result = await uploadImage(e);
    if (result) setValue(type, result);
  };

  return (
    <div className="w-full h-[220px] flex flex-col justify-center items-center relative mt-8 rounded-sm border-t border-b border-zinc-700">
      {isEditingBanner ? (
        isOwnProfile && (
          <EditProfileBanner handleUploadImage={handleUploadImage} />
        )
      ) : (
        <div>
          <Image
            className="rounded-md"
            src="/bass 6.jpg"
            alt=""
            fill={true}
            objectFit="cover"
          />
        </div>
      )}

      <div className="absolute border border-zinc-700 rounded-full">
        {isEditingImage ? (
          isOwnProfile && (
            <EditProfileAvatar handleUploadImage={handleUploadImage} />
          )
        ) : (
          <div className="flex justify-center items-center w-[200px] h-[200px] rounded-full ">
            <Image
              className="rounded-full object-cover"
              src="/bass 8.jpg"
              alt=""
              fill={true}
            />
          </div>
        )}
        {!isEditingImage
          ? isOwnProfile && (
              <CameraIcon
                className="absolute group h-8 w-8 p-0 border-none bottom-2 right-5 rounded-full"
                className_span="absolute h-8 w-12 top-7 mr-6 hidden group-hover:block bg-zinc-950 rounded-lg"
                onClick={() => setIsEditingImage(!isEditingImage)}
              />
            )
          : isOwnProfile && (
              <XIcon
                className="absolute group h-8 w-8 p-0 border-none bottom-2 right-5 rounded-full"
                className_span="absolute h-8 w-12 top-7 mr-6 hidden group-hover:block bg-zinc-950 rounded-lg"
                onClick={() => setIsEditingImage(!isEditingImage)}
              />
            )}
      </div>

      {!isEditingBanner
        ? isOwnProfile && (
            <CameraIcon
              className="absolute group h-6  w-6 p-0 border-none bottom-0 right-0 rounded-md"
              className_span="absolute top-full  mr-8 mt-2 hidden group-hover:block"
              onClick={() => setIsEditingBanner(!isEditingBanner)}
            />
          )
        : isOwnProfile && (
            <XIcon
              className="absolute group h-8 w-8 p-0 border-none top-0 right-0 rounded-lg"
              className_span="absolute top-full  mr-8 mt-2 hidden group-hover:block"
              onClick={() => setIsEditingBanner(!isEditingBanner)}
            />
          )}
    </div>
  );
}
