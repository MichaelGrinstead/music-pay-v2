"use client";
import { useGetUser } from "@/hooks/useGetUser";

export default function ProfileContent() {
  const { userAbout } = useGetUser();

  return (
    <div className="flex flex-col items-center justify-between p-24">
      {userAbout && <p>{userAbout}</p>}
    </div>
  );
}
