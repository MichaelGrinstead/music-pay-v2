"use client";
import Link from "next/link";
import SignOut from "./SignOut";
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  return (
    <nav className="flex flex-row items-center justify-between sticky top-0 h-20 ">
      <div className="ml-6">
        <Link href={"./"}>
          <h3 className="text-2xl">Music-Pay</h3>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 mr-6">
        <h3 className="text-lg">{user?.username}</h3>
        {isSignedIn && <SignOut />}
      </div>
    </nav>
  );
}
