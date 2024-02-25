"use client";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();
  const { signOut } = useClerk();
  return (
    <div>
      <button onClick={() => signOut(() => router.push("./sign-in"))}>
        Sign Out
      </button>
    </div>
  );
}
