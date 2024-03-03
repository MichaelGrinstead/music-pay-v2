import { ChangeEvent, SyntheticEvent } from "react";
import Uploader from "../Ui/Uploader";
import { Textarea } from "../Ui/Textarea";
import { useFormContext } from "react-hook-form";
import { UserData } from "@/types";
import XIcon from "../Ui/Icons/XIcon";
import { useGetUser } from "@/hooks/useGetUser";
import { Tooltip } from "../Ui/Tooltip";

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
  const { userData } = useGetUser(username);
  const { bannerImage } = userData;
  return (
    <div className="absolute top-4 z-10 flex flex-row items-center justify-center gap-2">
      <Uploader
        className="flex flex-col items-center justify-center w-12 h-12 bg-zinc-800  rounded-full hover:bg-zinc-800 bg-zinc-950 cursor-pointer  opacity-90"
        uploadFunction={(e) => handleUploadImage(e, "bannerImage")}
        loadingState={isUploadingBanner}
        tooltipContent="Add banner"
        className_tooltip="mt-2"
      />
      {bannerImage && (
        <Tooltip content="Remove banner">
          <XIcon
            className="flex flex-col items-center justify-center w-12 h-12  rounded-full hover:bg-zinc-800 bg-zinc-950 cursor-pointer  opacity-90"
            onClick={() => setValue("bannerImage", "")}
          />
        </Tooltip>
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
    <div className="relative h-[220px] w-full border-zinc-800 bg-zinc-950">
      <h6 className="absolute top-2 left-4 text-md text-zinc-600">About</h6>
      <Textarea
        {...register("about")}
        className="h-full w-full text-lg px-4 py-8 rounded-md placeholder:text-zinc-500"
        placeholder="Enter an about me here..."
      ></Textarea>
    </div>
  );
}
