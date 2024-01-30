import SignOut from "./SignOut";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "./Ui/DropdownMenu";
import { IoIosArrowDown } from "react-icons/io";
import { LogOut, User, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetUser } from "@/hooks/useGetUser";

export default function DashboardDropdown({}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { username } = useGetUser();

  const dropdown_menu_item = "justify-between hover:bg-zinc-900 gap-3 px-3 ";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <IoIosArrowDown size={32} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-center justify-center bg-black border border-zinc-800 w-40 mr-8 ">
        <DropdownMenuLabel className="text-xl">{username}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800 w-full" />
        <DropdownMenuGroup className="w-full">
          {!isHome && (
            <DropdownMenuItem className={dropdown_menu_item}>
              <Home className="h-4 w-4 mr-2" />
              <Link href={"/"}>Home</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className={dropdown_menu_item}>
            <User className="h-4 w-4 mr-2" />
            <Link href={`/profile/${username}`}>Profile</Link>
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
