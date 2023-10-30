import './header.css';
import Link from "next/link"

export default function Header() {

  const createDocumentBtn = {

    display: "block",
    fontSize: "16px",
    backgroundColor: "#777777", /* #779B29 */
    color: "#ffffff",
    border: "0px",
    borderRadius: "6px",
    width: "270px",
    height: "40px",
    padding: "10px",
    cursor: "pointer",
    margin: "0px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"

  }

  return (
    <header className="header">
        <Link href="/"><h1>J-DMS</h1></Link><br/>
        <Link href="/add-post"><button style={createDocumentBtn}>Create New Document</button></Link>
        <Link href="/"><button style={createDocumentBtn}>List Documents</button></Link>
    </header>
  )
}
 