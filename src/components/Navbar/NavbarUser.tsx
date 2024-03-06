import Image from "next/image";
import NavbarDropdown from "./NavbarDropdown";
import { useGetUser } from "@/hooks/useGetUser";
import { Skeleton } from "../Ui/Skeleton";

export default function NavbarUser() {
  const { userData, isUserDataLoading } = useGetUser();
  const { avatarImage } = userData;
  return (
    <div className="absolute flex flex-row items-start justify-center gap-1 right-6">
      {isUserDataLoading ? (
        <Skeleton className="h-[28px] w-[28px] rounded-full bg-zinc-800" />
      ) : (
        <div>
          <Image
            className="rounded-full"
            src={avatarImage}
            alt={""}
            height={28}
            width={28}
          />
        </div>
      )}
      <NavbarDropdown />
    </div>
  );
}
