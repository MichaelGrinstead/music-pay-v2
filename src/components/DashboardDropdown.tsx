import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import SignOut from "./SignOut";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "./Ui/DropdownMenu";
import { IoIosArrowDown } from "react-icons/io";
import { LogOut } from "lucide-react";

interface DashboardDropdownProps {
  username: string;
}

export default function DashboardDropdown({
  username,
}: DashboardDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <IoIosArrowDown size={32} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-center justify-center bg-black border border-gray-500 w-44 mr-8 ">
        <DropdownMenuLabel className="text-xl">{username}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-500" />
        <DropdownMenuGroup className="w-full hover:bg-gray-900">
          <DropdownMenuItem>
            <LogOut className="h-4 w-4 mr-2" />
            <SignOut />
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
