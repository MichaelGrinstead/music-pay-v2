import SignOut from "../Auth/SignOut";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "../Ui/DropdownMenu";
import { IoIosArrowDown } from "react-icons/io";
import { LogOut, User, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useGetUser } from "@/hooks/useGetUser";
import { useState } from "react";
import { LoadingSpinner } from "../Ui/LoadingSpinner";

export default function DashboardDropdown({}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";
  const { user } = useUser();
  const { userData, isUserDataLoading } = useGetUser();
  const { username, usernameLowercase } = userData;
  const name = user?.username === usernameLowercase ? username : "";

  const dropdown_menu_item = "justify-between hover:bg-zinc-900 gap-3 px-3 ";
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="focus:outline-none">
        <IoIosArrowDown size={32} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-center justify-center bg-black border border-zinc-800 w-40 mr-8 ">
        {isUserDataLoading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          <DropdownMenuLabel className="text-xl truncate max-w-36">
            {name}
          </DropdownMenuLabel>
        )}
        <DropdownMenuSeparator className="bg-zinc-800 w-full" />
        <DropdownMenuGroup className="w-full">
          {!isDashboard && (
            <DropdownMenuItem className={dropdown_menu_item}>
              <Home className="h-4 w-4 mr-2" />
              <Link href={"/dashboard"} onClick={() => setIsOpen(!isOpen)}>
                Dashboard
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className={dropdown_menu_item}>
            <User className="h-4 w-4 mr-2" />
            <Link
              href={`/profile/${username}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className={dropdown_menu_item}>
            <LogOut className="h-4 w-4 mr-2" />
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
