"use client";

import { useGetUser } from "@/app/hooks/useGetUser";
import Image from "next/image";

export default function ProfileHeader() {
  const { userImage } = useGetUser();

  return (
    <div className="w-full h-[220px] flex flex-col justify-center items-center relative mt-8">
      <div className="w-full h-[220px] absolute">
        <Image className="" src="" alt="" layout="fill" objectFit="cover" />
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
