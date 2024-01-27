import Navbar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs";

export default function Home() {
  const user = currentUser();
  console.log(user);
  return (
    <main>
      <Navbar />
      <div className="flex flex-col items-center justify-between p-24 mt-40">
        <h1 className="text-9xl">Music-Pay</h1>
      </div>
    </main>
  );
}
