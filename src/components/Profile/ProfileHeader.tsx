"use client";

import { useGetUser } from "@/app/hooks/useGetUser";
import Image from "next/image";

export default function ProfileHeader() {
  const { userImage } = useGetUser();

  return (
    <div className="flex flex-col items-center justify-between p-24 mt-40">
      {/* <Image alt={""} src={userImage} /> */}
    </div>
  );
}
