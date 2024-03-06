"use client";

import { EditProfileAbout } from "./EditProfile";
import { useFormContext } from "react-hook-form";

interface ProfileContentProps {
  name: string;
  isOwnProfile?: boolean;
  updateProfile: () => void;
  isEditMode: boolean;
  isUserDataLoading: boolean;
}

export default function ProfileContent({
  name,
  isOwnProfile,
  isEditMode,
  isUserDataLoading,
}: ProfileContentProps) {
  const { getValues } = useFormContext();
  const { about } = getValues();

  return (
    <div className="relative flex flex-col items-center justify-between p-16 gap-6">
      <h3 className="h-12 pt-1 pb-1 text-4xl font-semibold w-60 text-center">
        {name}
      </h3>

      <div className="relative h-[220px] w-full flex flex-col justify-center items-center ">
        {isEditMode ? (
          isOwnProfile && <EditProfileAbout />
        ) : (
          <div className="h-full w-full">
            <h6 className="absolute top-2 left-4 text-md text-zinc-500">
              About
            </h6>
            <p className="px-4 py-8 h-full w-full text-lg">{about}</p>
          </div>
        )}
      </div>
    </div>
  );
}
