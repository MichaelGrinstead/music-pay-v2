import { ChangeEvent, SyntheticEvent } from "react";
import Uploader from "../Ui/Uploader";
import { Textarea } from "../Ui/Textarea";
import { useFormContext } from "react-hook-form";
import { UserData } from "@/types";
import XIcon from "../Ui/Icons/XIcon";
import { useGetUser } from "@/hooks/useGetUser";

interface EditProfileBannerProps {
  username?: string;
  handleUploadImage: (
    e: SyntheticEvent | ChangeEvent<HTMLInputElement>,
    type: string
  ) => Promise<void>;
  isUploadingBanner: boolean;
}

export function EditProfileBanner({
  username,
  handleUploadImage,
  isUploadingBanner,
}: EditProfileBannerProps) {
  const { setValue } = useFormContext();
  const { bannerImage } = useGetUser(username);
  return (
    <div className="z-10 flex flex-row items-center justify-center gap-2 mt-4">
      <Uploader
        className="flex flex-col items-center justify-center w-12 h-12 border border-zinc-700 rounded-full hover:bg-zinc-800 bg-zinc-950 cursor-pointer  opacity-90"
        uploadFunction={(e) => handleUploadImage(e, "bannerImage")}
        loadingState={isUploadingBanner}
        tooltipContent="Add banner"
        className_tooltip="mt-2"
      />
      {bannerImage && (
        <XIcon
          className="flex flex-col items-center justify-center w-12 h-12 border border-zinc-700 rounded-full hover:bg-zinc-800 bg-zinc-950 cursor-pointer  opacity-90"
          onClick={() => setValue("bannerImage", "")}
        />
      )}
    </div>
  );
}

interface EditProfileAvatarProps {
  handleUploadImage: (
    e: SyntheticEvent | ChangeEvent<HTMLInputElement>,
    type: string
  ) => Promise<void>;
  isUploadingAvatar: boolean;
}

export function EditProfileAvatar({
  handleUploadImage,
  isUploadingAvatar,
}: EditProfileAvatarProps) {
  return (
    <Uploader
      className="absolute top-[101px] left-[101px] flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-zinc-800 bg-zinc-950 cursor-pointer z-10 opacity-90"
      uploadFunction={(e) => handleUploadImage(e, "avatarImage")}
      loadingState={isUploadingAvatar}
      tooltipContent="Add image"
      className_tooltip="mt-2"
    />
  );
}

export function EditProfileAbout() {
  const { register } = useFormContext<UserData>();
  return (
    <Textarea
      {...register("about")}
      className="h-[220px] w-full text-md py-0 px-2 mx-12 border-zinc-800 bg-zinc-950 rounded-md focus:outline-none focus:ring-0 focus:border-none"
    ></Textarea>
  );
}
