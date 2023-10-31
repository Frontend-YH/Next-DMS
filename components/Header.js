import './header.css';
import Link from "next/link"
import Login from './Login';

export default function Header() {

  return (
    <header className="header">
        <Link href="/"><h1 className="m-5">Next DMS</h1></Link><br/>
        <Link href="/add-post"><button className="bg-gray-500 hover:bg-blue-900 text-white text-sm py-2 px-4 rounded shadow-md">Create New Document</button></Link>
        <Link href="/"><button className="bg-gray-500 hover:bg-blue-900 text-white text-sm py-2 px-4 rounded shadow-md">List Documents</button></Link>
        <Login/>
    </header>
  )
}
 