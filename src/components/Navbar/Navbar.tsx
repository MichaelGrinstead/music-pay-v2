"use client";

import { useUser } from "@clerk/nextjs";
import Logo from "../Ui/Logo";
import NavbarUser from "./NavbarUser";
import Link from "next/link";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="relative flex flex-row items-center justify-around bg-black sticky top-0 h-20 z-10">
      <Logo />

      <div className="flex flex-row items-center justify-center gap-8">
        <Link href="">About</Link>
        <Link href="/create-artist">Create Artist</Link>
        <Link href="">Bookings</Link>
      </div>

      {isSignedIn && <NavbarUser />}
    </nav>
  );
}
