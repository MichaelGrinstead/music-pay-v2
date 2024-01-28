"use client";
import Link from "next/link";
import { User } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import DashboardDropdown from "./DashboardDropdown";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  return (
    <nav className="flex flex-row items-center justify-between sticky top-0 h-20 ">
      <div className="ml-6">
        <Link href={"./"}>
          <h3 className="text-2xl">Music-Pay</h3>
        </Link>
      </div>
      {isSignedIn && (
        <div className="flex flex-row items-start justify-center gap-1 mr-6">
          <User className="h-6 w-6" />
          <DashboardDropdown username={user.username as string} />
        </div>
      )}
    </nav>
  );
}
