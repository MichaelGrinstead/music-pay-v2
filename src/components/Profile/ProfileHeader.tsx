"use client";

import { useGetUser } from "@/hooks/useGetUser";
import Image from "next/image";
import { useState } from "react";
import { EditProfileBanner, EditProfileImage } from "./EditProfileBanner";
import CameraIcon from "../Ui/Icons/CameraIcon";
import XIcon from "../Ui/Icons/XIcon";

interface ProfileHeaderProps {
  username: string;
}

export default function ProfileHeader({ username }: ProfileHeaderProps) {
  const { image } = useGetUser(username);

  const [isEditingBanner, setIsEditingBanner] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);

  return (
    <div className="w-full h-[220px] flex flex-col justify-center items-center relative mt-8 rounded-sm border-t border-b border-zinc-700">
      {isEditingBanner ? (
        <EditProfileBanner />
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

      <div className="absolute">
        {isEditingImage ? (
          <EditProfileImage />
        ) : (
          <div className="flex justify-center items-center w-[200px] h-[200px] rounded-full border border-white ">
            <Image
              className="rounded-full object-cover"
              src="/bass 8.jpg"
              alt=""
              fill={true}
            />
          </div>
        )}
        {!isEditingImage ? (
          <CameraIcon
            className="absolute group h-8 w-8 p-0 border-none bottom-2 right-5 rounded-full"
            className_span="absolute h-8 w-12 top-7 mr-6 hidden group-hover:block bg-zinc-950 rounded-lg"
            onClick={() => setIsEditingImage(!isEditingImage)}
          />
        ) : (
          <XIcon
            className="absolute group h-8 w-8 p-0 border-none bottom-2 right-5 rounded-full"
            className_span="absolute h-8 w-12 top-7 mr-6 hidden group-hover:block bg-zinc-950 rounded-lg"
            onClick={() => setIsEditingImage(!isEditingImage)}
          />
        )}
      </div>

      {!isEditingBanner ? (
        <CameraIcon
          className="absolute group h-8 w-8 p-0 border-none bottom-0 right-0 rounded-lg"
          className_span="absolute top-full  mr-8 mt-2 hidden group-hover:block"
          onClick={() => setIsEditingBanner(!isEditingBanner)}
        />
      ) : (
        <XIcon
          className="absolute group h-8 w-8 p-0 border-none top-0 right-0 rounded-lg"
          className_span="absolute top-full  mr-8 mt-2 hidden group-hover:block"
          onClick={() => setIsEditingBanner(!isEditingBanner)}
        />
      )}
    </div>
  );
}
