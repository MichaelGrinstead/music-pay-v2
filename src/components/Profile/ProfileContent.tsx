"use client";
import { useGetUser } from "@/hooks/useGetUser";
import { EditProfileAbout } from "./EditProfile";

interface ProfileContentProps {
  username: string;
  isOwnProfile?: boolean;
  updateProfile: () => void;
  isEditMode: boolean;
}

export default function ProfileContent({
  username,
  isOwnProfile,
  isEditMode,
}: ProfileContentProps) {
  const { about } = useGetUser(username);

  return (
    <div className="relative flex flex-col items-center justify-between p-16 gap-6">
      <h3 className="h-12 pt-1 pb-1 text-4xl font-semibold w-60 text-center">
        {username}
      </h3>

      <div className="relative w-full flex flex-col justify-center items-center">
        {isEditMode ? (
          isOwnProfile && <EditProfileAbout />
        ) : (
          <p className="mx-12 px-2">{about}</p>
        )}
      </div>
    </div>
  );
}
