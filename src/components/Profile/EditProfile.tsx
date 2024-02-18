import { ChangeEvent, SyntheticEvent } from "react";
import Uploader from "../Ui/Uploader";
import { Textarea } from "../Ui/Textarea";
import { useFormContext } from "react-hook-form";
import { UserData } from "@/types";
import Image from "next/image";
import XIcon from "../Ui/Icons/XIcon";
import { useGetUser } from "@/hooks/useGetUser";

interface EditProps {
  username?: string;
  handleUploadImage: (
    e: SyntheticEvent | ChangeEvent<HTMLInputElement>,
    type: string
  ) => Promise<void>;
}

export function EditProfileBanner({ username, handleUploadImage }: EditProps) {
  const { setValue } = useFormContext();
  const { bannerImage } = useGetUser(username);
  return (
    <div className="relative flex flex-col items-center w-full h-full bg-zinc-950 rounded-md border-zinc-700 ">
      <div className="z-10 flex flex-row items-center justify-center gap-2">
        <Uploader
          className="flex flex-col items-center justify-center w-12 h-12 border border-zinc-700 rounded-full hover:bg-zinc-800 bg-zinc-950 cursor-pointer mt-4 opacity-90"
          uploadFunction={(e) => handleUploadImage(e, "banner")}
          loadingState={false}
          tooltipContent="Add banner"
          className_tooltip="mt-2"
        />
        {bannerImage && (
          <XIcon
            className="flex flex-col items-center justify-center w-12 h-12 border border-zinc-700 rounded-full hover:bg-zinc-800 bg-zinc-950 cursor-pointer mt-4 opacity-90"
            onClick={() => setValue("banner", "")}
          />
        )}
      </div>
      {bannerImage && (
        <Image
          className="rounded-md"
          src={bannerImage}
          alt=""
          fill={true}
          objectFit="cover"
        />
      )}
    </div>
  );
}

export function EditProfileAvatar({ username, handleUploadImage }: EditProps) {
  const { avatarImage } = useGetUser(username);
  return (
    <div className="w-[250px] h-[250px] border-2 border-zinc-800 rounded-full flex flex-col bg-zinc-950 items-center justify-center">
      <Uploader
        className="flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-zinc-800 bg-zinc-950 cursor-pointer z-10 opacity-90"
        uploadFunction={(e) => handleUploadImage(e, "avatar")}
        loadingState={false}
        tooltipContent="Add image"
        className_tooltip="mt-2"
      />
      {avatarImage && (
        <Image
          className="rounded-full object-cover"
          src={avatarImage}
          alt=""
          fill={true}
        />
      )}
    </div>
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
