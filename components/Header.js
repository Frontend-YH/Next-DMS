import Link from "next/link";

export default function Header() {
  return (
    <header className="relative flex flex-wrap gap-5 items-center justify-center p-5 bg-white border border-gray-400 mb-5">
      <Link href="/">
        <h1 className="text-7xl font-bold text-gray-700 text-center tracking-widest">
          Next DMS
        </h1>
      </Link>
      <Link href="/add-post">
        <button className="block text-base bg-gray-500 text-white border-0 rounded-md w-64 h-10 px-2.5 cursor-pointer m-0 shadow-md">
          Create New Document
        </button>
      </Link>
      <Link href="/">
        <button className="block text-base bg-gray-500 text-white border-0 rounded-md w-64 h-10 px-2.5 cursor-pointer m-0 shadow-md">
          List Documents
        </button>
      </Link>
    </header>
  );
}
