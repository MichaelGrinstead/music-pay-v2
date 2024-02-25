"use client";

import { useUser } from "@clerk/nextjs";
import Logo from "../Ui/Logo";
import NavbarUser from "./NavbarUser";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="relative flex flex-row items-center justify-between sticky top-0 h-20 ">
      <Logo />
      {isSignedIn && <NavbarUser />}
    </nav>
  );
}
