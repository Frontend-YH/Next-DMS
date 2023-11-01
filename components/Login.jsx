"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
//import { useRouter } from 'next/navigation';

export default function Login() {

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [loggedIn, setLoggedIn] = useState("");

    useEffect(() => {
        // Perform localStorage action
        setLoggedIn(localStorage.getItem("user") || "")
        
      }, [])

    const userEventHandler = ((event) => {
        setUser(event.target.value);
    }) 

    const passwordEventHandler = ((event) => {
        setPassword(event.target.value);
    }) 

    //const router = useRouter();

    // LOGIN FORM SUBMIT
    const handleLoginSubmit = async (event) =>  {
         event.preventDefault();

         // Double check that the fields are not empty
         if (user!=="" && password !=="") {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({user, password})
            })

            // If DB response OK:
            if (res.ok) {

                //alert("Welcome " + user + "! You are now logged in.");
                localStorage.setItem('user', user);
                let data = await res.json();      
                localStorage.setItem('userId', data[0].authorId);
                setUser("");
                setPassword("");
                window.location.reload();
                //router.push("/");

            } else { alert("Wrong login!"); }
        } else {
            alert("Fields are empty!")
        }
    }

     // Handle Logout
     const handleLogout = async (event) =>  {
        event.preventDefault();
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        //router.push("/");
        window.location.reload();
     }

    //let loggedIn = undefined;

    //loggedIn = localStorage.getItem("user");



    return (

        <div className='bg-white p-0 m-0'>

             {loggedIn ? (
                
                <div className="relative flex gap-5">
                <Link href="/add-post"><button className="bg-gray-500 hover:bg-blue-900 text-white text-sm py-2 px-4 rounded shadow-md">Create Document</button></Link>
                <Link href="/"><button className="bg-gray-500 hover:bg-blue-900 text-white text-sm py-2 px-4 rounded shadow-md">List Documents</button></Link>
                <p className="inline m-0 p-0 text-black mr-2">User: {loggedIn}</p> 
                <button className="ml-4 w-16 h-7 text-xs bg-gray-500 hover:bg-blue-900 text-white border-0 rounded-md w-28 h-9 px-2 cursor-pointer" onClick={handleLogout}>Logout</button>
                </div>

             ) : (
         
                <form onSubmit={handleLoginSubmit}>  
                <label htmlFor="username" value="Login:"/> 
                <input className="rounded-md pl-2 text-lg w-32 autofill:shadow-[inset_0_0_0px_1000px_rgb(70,70,70)]" type="text" placeholder="username" id="username" onChange={userEventHandler}/>
                
                <label htmlFor="password" value="Password:"/> 
                <input className="rounded-md pl-2 text-lg text-white w-32 autofill:shadow-[inset_0_0_0px_1000px_rgb(70,70,70)]" type="password" placeholder="password" onChange={passwordEventHandler} style={{marginLeft: "20px"}}/>
                <button className="ml-4 w-16 h-7 text-xs bg-gray-500 hover:bg-blue-900 text-white border-0 rounded-md w-28 h-9 px-2 cursor-pointer">Login</button>
                </form>

             )}

             </div>

    )
  }