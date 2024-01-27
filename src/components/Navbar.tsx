import Link from "next/link";
import SignOut from "./SignOut";
import { currentUser } from "@clerk/nextjs";

export default async function Navbar() {
  const user = await currentUser();

  return (
    <nav className="flex flex-row items-center justify-between sticky top-0 h-20 border-b border-white ">
      <div className="ml-6">
        <Link href={"./"}>
          <h3 className="text-2xl">Music-Pay</h3>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 mr-6">
        <h3 className="text-lg">{user?.username}</h3>
        <SignOut />
      </div>
    </nav>
  );
}
