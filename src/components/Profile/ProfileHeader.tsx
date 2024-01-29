"use client";

import { useGetUser } from "@/hooks/useGetUser";
import Image from "next/image";

interface ProfileHeaderProps {
  username: string;
}

export default function ProfileHeader({ username }: ProfileHeaderProps) {
  const { image } = useGetUser(username);

  return (
    <div className="w-full h-[220px] flex flex-col justify-center items-center relative mt-8">
      <div className="w-full h-[220px] absolute">
        <Image className="" src="" alt="" fill={true} objectFit="cover" />
      </div>
      <div className="flex justify-center items-center w-[200px] h-[200px] absolute">
        <Image
          className="rounded-full object-cover"
          src=""
          alt=""
          width="200"
          height="200"
        />
      </div>
    </div>
  );
}
