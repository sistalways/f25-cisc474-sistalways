import React from "react";
import Link from "next/link";
import "./profile.css"

export default function Profile() {
    return (
        <div>
            <main>
            <h1>Profile</h1>

            
                <Link href="/dashboard" className="nav-link">Dashbaord</Link>
                <Link href="/courses" className="nav-link">Courses</Link>
                <Link href="/calendar" className="nav-link">Calendar</Link> 
                <Link href="/profile" className="nav-link">Profile</Link> 
                <Link href="/inbox" className="nav-link">Inbox</Link> 
            </main>
        </div>
        
    );
}
