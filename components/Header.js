import Link from "next/link"
import Login from './Login';

export default function Header() {

  return (
    <header className="relative flex flex-wrap gap-5 items-center justify-center p-5 bg-white border border-gray-400 mb-5">
      <Link href="/"><h1 className="text-7xl font-bold text-gray-700 text-center tracking-widest">Next DMS</h1></Link>
        <Login/>

    </header>
  );
}