"use client";
import { FormProvider, useForm } from "react-hook-form";
import { ArtistProfileData } from "@/types";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import {
  EditProfileAbout,
  EditProfileAvatar,
  EditProfileBanner,
} from "../Profile/EditProfile";
import { uploadImage } from "@/utils/uploadImage";
import Image from "next/image";
import { UserIcon } from "lucide-react";
import { Input } from "../Ui/Input";
import { Button } from "../Ui/Button";
import { useAddNewArtist } from "@/hooks/useAddNewArtist";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../Ui/LoadingSpinner";
import { useGetUser } from "@/hooks/useGetUser";

const defaultValues = {
  name: "",
  about: "",
  avatarImage: "",
  bannerImage: "",
};

export default function CreateArtistProfile() {
  const router = useRouter();

  const methods = useForm({
    defaultValues,
  });

  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const { setValue, getValues, register } = methods;

  const { userData } = useGetUser();
  const { username } = userData;

  const artistProfileData = getValues();
  const { avatarImage, bannerImage } = artistProfileData;

  const {
    addNewArtist,
    isAddNewArtistPending,
    isAddNewArtistSuccess,
    errorAddingNewArtist,
  } = useAddNewArtist();

  const handleUploadImage = async (
    e: SyntheticEvent | ChangeEvent<HTMLInputElement>,
    type: "bannerImage" | "avatarImage"
  ) => {
    if (type == "bannerImage") {
      setIsUploadingBanner(true);
    } else if (type == "avatarImage") {
      setIsUploadingAvatar(true);
    }
    const result = await uploadImage(e);
    if (result) {
      setValue(type, result);

      if (type == "bannerImage") {
        setIsUploadingBanner(false);
      } else if (type == "avatarImage") {
        setIsUploadingAvatar(false);
      }
    }
  };

  const createArtistProfile = async () => {
    const data = getValues();
    console.log(data);

    await addNewArtist(data);
  };

  useEffect(() => {
    if (isAddNewArtistSuccess) {
      router.push(`/profile/${username}/${artistProfileData.name}`);
    }
  }, [isAddNewArtistSuccess]);

  return (
    <FormProvider {...methods}>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-600">Create Artist Page</h1>

        <div className="w-[950px] h-[650px] mt-6 p-4 rounded-xl border bg-zinc-800">
          <div className="h-full flex flex-col gap-4 rounded-xl overflow-y-auto dark:[color-scheme:dark]">
            <div className="h-1/2 bg-black rounded-xl flex flex-col justify-center items-center relative  bg-black ">
              <EditProfileBanner
                handleUploadImage={handleUploadImage}
                isUploadingBanner={isUploadingBanner}
              />
              {bannerImage && (
                <Image src={bannerImage} alt="Artist Banner" fill />
              )}
              <div className="absolute border border-4 border-black rounded-full mt-36">
                <div className="absolute top-[128px] left-[68px] ">
                  <EditProfileAvatar
                    handleUploadImage={handleUploadImage}
                    isUploadingAvatar={isUploadingAvatar}
                  />
                </div>
                <div className="flex justify-center items-center w-[180px] h-[180px] rounded-full bg-zinc-900">
                  {avatarImage ? (
                    <Image
                      className="rounded-full object-cover"
                      src={avatarImage}
                      alt="Artist Avatar"
                      fill={true}
                    />
                  ) : (
                    <UserIcon className="w-[180px] h-[180px] text-zinc-800" />
                  )}
                </div>
              </div>
            </div>

            <div className="h-[350px] w-full flex flex-col items-center bg-black pt-12 text-center rounded-md">
              <Input
                {...register("name")}
                className="border-none p-6 text-3xl font-bold bg-zinc-900 placeholder:text-zinc-600 w-[350px] text-center rounded-md "
                placeholder="Enter Artist Name"
              />
              <div className="relative h-[150px] w-full flex flex-col justify-center items-center px-12 py-6">
                <EditProfileAbout />
              </div>
              <Button
                className="border-none bg-zinc-900 hover:bg-zinc-800 mb-4 z-10 rounded-xl h-12 w-72 text-xl"
                size="lg"
                onClick={() => createArtistProfile()}
              >
                {isAddNewArtistPending ? <LoadingSpinner /> : "Create"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
