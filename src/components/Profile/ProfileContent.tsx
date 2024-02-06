"use client";
import { useGetUser } from "@/hooks/useGetUser";
import { useState } from "react";
import { EditProfileAbout } from "./EditProfile";
import EditIcon from "../Ui/Icons/EditIcon";
import { SaveIcon } from "lucide-react";

interface ProfileContentProps {
  username: string;
  isOwnProfile?: boolean;
  updateProfile: () => void;
}

export default function ProfileContent({
  username,
  isOwnProfile,
  updateProfile,
}: ProfileContentProps) {
  const { about } = useGetUser(username);

  const [isEditingAbout, setIsEditingAbout] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-between p-16 gap-6">
      <h3 className="h-12 pt-1 pb-1 text-4xl font-semibold w-60 text-center">
        {username}
      </h3>

      <div className="relative">
        {isEditingAbout ? (
          isOwnProfile && <EditProfileAbout />
        ) : (
          <p className="mx-12 px-2">{about}</p>
        )}
        {isEditingAbout
          ? isOwnProfile && (
              <SaveIcon
                className="absolute right-6 top-0 border-none cursor-pointer hover:bg-zinc-800 h-6 w-6 p-1 rounded-md"
                onClick={() => {
                  setIsEditingAbout(!isEditingAbout), updateProfile();
                }}
              />
            )
          : isOwnProfile && (
              <EditIcon
                className="absolute right-6 top-0 p-0 border-none h-6 w-6 p-1"
                onClick={() => setIsEditingAbout(!isEditingAbout)}
              />
            )}
      </div>
    </div>
  );
}
