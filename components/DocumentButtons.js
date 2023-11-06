import Link from "next/link";

export default function CreateDocumentBtn() {
  return (
    <Link href="/add-post">
      <button className="bg-gray-500 hover:bg-blue-900 text-white text-sm py-2 px-4 rounded shadow-md">
        Create Document
      </button>
    </Link>
  );
}
