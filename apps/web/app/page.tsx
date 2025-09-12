import React from "react";
import Link from "next/link";
import "./globals.css"

export default function Login() {
    return (
        
            <main>
                <h1>Login with your Credentials</h1>
                <form style={{display: "flex" ,alignItems: "center",flexDirection:"column"}}>
                    <input type="text"
                    className="LoginInp"
                    placeholder="Enter Username:" />

                    <input type="password"
                    className="LoginInp"
                    placeholder="Enter Password:" />


                    <Link 
                    href="/dashboard"
                    className="Login-Button"
                    aria-label="Login"
                    > 
                    Login
                    </Link>
                </form>
            </main>
        
    );
}
