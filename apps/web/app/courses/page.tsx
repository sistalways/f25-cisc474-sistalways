import React from "react";
import Link from "next/link";
import "./courses.css"

export default function Courses() {
    return (
        <div>
            <main>
            <h1>Courses</h1>

            
                <Link href="/dashboard" className="nav-link">Dashbaord</Link>
                <Link href="/courses" className="nav-link">Courses</Link>
                <Link href="/calendar" className="nav-link">Calendar</Link>
                 
                <Link href="/profile" className="nav-link">Profile</Link> 
                <Link href="/inbox" className="nav-link">Inbox</Link> 
            </main>
        </div>
        
    );
}
