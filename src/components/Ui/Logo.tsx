import Link from "next/link";

export default function Logo() {
  return (
    <div className="absolute left-6">
      <Link href={"./dashboard"}>
        <h3 className="text-2xl">Music-Pay</h3>
      </Link>
    </div>
  );
}
