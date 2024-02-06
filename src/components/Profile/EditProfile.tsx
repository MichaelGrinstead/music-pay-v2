import { ChangeEvent, SyntheticEvent } from "react";
import Uploader from "../Ui/Uploader";
import { Textarea } from "../Ui/Textarea";
import { useFormContext } from "react-hook-form";
import { useGetUser } from "@/hooks/useGetUser";
import { useUser } from "@clerk/nextjs";
import { UserData } from "@/types";

interface EditProps {
  handleUploadImage: (
    e: SyntheticEvent | ChangeEvent<HTMLInputElement>,
    type: string
  ) => Promise<void>;
}

export function EditProfileBanner({ handleUploadImage }: EditProps) {
  return (
    <div className="relative w-full h-full bg-zinc-950 rounded-md border-zinc-700 ">
      <Uploader
        className="group absolute right-0 bottom-0 h-8 w-8 flex flex-col items-center justify-center hover:bg-zinc-800 bg-black rounded-xl cursor-pointer"
        uploadFunction={(e) => handleUploadImage(e, "banner")}
        loadingState={false}
        spanText="Upload banner"
        className_span="mr-8"
      />
    </div>
  );
}

export function EditProfileAvatar({ handleUploadImage }: EditProps) {
  return (
    <div className="w-[200px] h-[200px] border-2 border-zinc-800 rounded-full flex flex-col bg-zinc-950">
      <Uploader
        className="group absolute flex flex-col items-center justify-center w-12 h-12 top-20 left-[76px] rounded-full hover:bg-zinc-800 bg-zinc-950 cursor-pointer "
        uploadFunction={(e) => handleUploadImage(e, "avatar")}
        loadingState={false}
        spanText="Upload image"
        className_span="mr-0"
      />
    </div>
  );
}

export function EditProfileAbout() {
  const { register } = useFormContext<UserData>();
  return (
    <Textarea
      {...register("about")}
      className="h-[240px] w-[1312px] text-md py-0 px-2 mx-12 border-none bg-zinc-950 rounded-md focus:outline-none focus:ring-0 focus:border-none"
    ></Textarea>
  );
}
