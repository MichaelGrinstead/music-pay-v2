import { ChangeEvent, SyntheticEvent } from "react";
import Uploader from "../Ui/Uploader";

const handleUploadImage = async (
  e: SyntheticEvent | ChangeEvent<HTMLInputElement>
) => {};

export function EditProfileBanner({}) {
  return (
    <div className="relative w-full h-full bg-zinc-950 rounded-md border-zinc-700 ">
      <Uploader
        className="group absolute right-0 bottom-0 h-8 w-8 flex flex-col items-center justify-center hover:bg-zinc-800 bg-black rounded-xl cursor-pointer"
        uploadFunction={handleUploadImage}
        loadingState={false}
        spanText="Upload banner"
        className_span="mr-8"
      />
    </div>
  );
}

export function EditProfileImage() {
  return (
    <div className="w-[200px] h-[200px] border-2 border-zinc-800 rounded-full flex flex-col bg-zinc-950">
      <Uploader
        className="group absolute flex flex-col items-center justify-center w-12 h-12 top-20 left-[76px] rounded-full hover:bg-zinc-800 bg-zinc-950 cursor-pointer "
        uploadFunction={handleUploadImage}
        loadingState={false}
        spanText="Upload image"
        className_span="mr-0"
      />
    </div>
  );
}
