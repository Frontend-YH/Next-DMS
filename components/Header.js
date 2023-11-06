"use client";
import Link from "next/link";
import UserStatus from "./UserStatus";

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-center p-5 bg-white border-b border-gray-500">
      <Link href="/">
        <h1 className="sm:text-7xl text-5xl font-bold text-gray-700 md:ml-20 ml-0">
          Next DMS
        </h1>
      </Link>
      <div className="ml-auto md:mr-20 mr-0">
        <UserStatus />
      </div>
    </header>
  );
}
