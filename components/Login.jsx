"use client"
import { useState, useEffect } from "react"



export default function Login() {

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [loggedIn, setLoggedIn] = useState("");

 
    // Perform localStorage action
    useEffect(() => {
        setLoggedIn(localStorage.getItem("user") || "");
    }, [])

    const userEventHandler = ((event) => {
        // Changed to to lower Case to fix bug
        setUser(event.target.value.toLowerCase());
    }) 

    const passwordEventHandler = ((event) => {
        setPassword(event.target.value);
    }) 


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


    return (
        <>
            {!loggedIn && (
                <form className="flex flex-col items-center justify-center" onSubmit={handleLoginSubmit}>  
                    <label htmlFor="username" className="self-start" value="Login:"/> 
                    <input className="rounded p-1 text-md w-38 m-0 mt-10 border" type="text" placeholder="Username" id="username" onChange={userEventHandler}/>
                    
                    <label htmlFor="password" value="Password:"/> 
                    <input className="rounded p-1 text-md w-38 m-0 mt-2 border" type="password" placeholder="Password" id="password" onChange={passwordEventHandler}/>
                    <button className="text-s bg-blue-600 hover:bg-blue-900 text-white border-0 rounded w-28 h-9 px-2 cursor-pointer mt-4">Login</button>
                </form>
            )}
        </>
    )
}