//"use client"
import { useState } from "react"
import { useRouter } from 'next/navigation';

export default function Login() {

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    const userEventHandler = ((event) => {
        setUser(event.target.value);
    }) 

    const passwordEventHandler = ((event) => {
        setPassword(event);
    }) 

    const router = useRouter();

    // LOGIN FORM SUBMIT
    const handleSubmit = async (event) =>  {
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
                setUser("");
                setPassword("");
                router.push("/");
            } 
        } else {
            alert("Fields are empty!")
        }
    }

    return (

        <main className='bg-white p-0 m-0'>
            
                  <form onSubmit={handleSubmit}>  
                  <label for="username" value="Login:"/> 
                  <input type="text" placeholder="username" id="username" onChange={userEventHandler}/>
                  <label for="password" value="Password:"/> 
                  <input type="text" placeholder="password" onChange={passwordEventHandler}/>
                  <button>Logga in</button>
                  </form>
        </main>

    )
  }