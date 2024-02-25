import { User } from "lucide-react";
import NavbarDropdown from "./NavbarDropdown";

export default function NavbarUser() {
  return (
    <div className="absolute flex flex-row items-start justify-center gap-1 right-6">
      <User className="h-6 w-6" />
      <NavbarDropdown />
    </div>
  );
}
