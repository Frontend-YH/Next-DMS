"use client"
import { useState } from "react"
//import { useRouter } from 'next/navigation';

export default function Login() {

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

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
                setUser("");
                setPassword("");
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
        //router.push("/");
        window.location.reload();
     }

    const loggedIn = localStorage.getItem("user");

    return (

        <main className='bg-white p-0 m-0'>

             {loggedIn ? (
                
                <div>
                <p className="inline m-0 p-0 text-black mr-2">User: {loggedIn}</p> 
                <button className="ml-4 w-16 h-7 text-xs bg-gray-500 hover:bg-blue-900 text-white border-0 rounded-md w-28 h-9 px-2 cursor-pointer" onClick={handleLogout}>Logout</button>
                </div>

             ) : (
         
                <form onSubmit={handleLoginSubmit}>  
                <label htmlFor="username" value="Login:"/> 
                <input className="rounded-md pl-2 text-lg text-white w-32"  type="text" placeholder="username" id="username" onChange={userEventHandler}/>
                
                <label htmlFor="password" value="Password:"/> 
                <input className="rounded-md pl-2 text-lg text-white w-32" type="password" placeholder="password" onChange={passwordEventHandler} style={{marginLeft: "20px"}}/>
                <button className="ml-4 w-16 h-7 text-xs bg-gray-500 hover:bg-blue-900 text-white border-0 rounded-md w-28 h-9 px-2 cursor-pointer">Login</button>
                </form>

             )}

             </main>

    )
  }