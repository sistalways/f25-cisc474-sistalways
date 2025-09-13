import React from "react";
import Link from "next/link";
import "./courses.css"

export default function Courses() {
    return (
        <div className="Courses-container">
      
      <div className="sidebar">
        <Link href="/dashboard" className="nav-link">Dashboard</Link>
        <Link href="/courses" className="nav-link">Courses</Link>
        <Link href="/calendar" className="nav-link">Calendar</Link>
        <Link href="/profile" className="nav-link">Profile</Link>
        <Link href="/inbox" className="nav-link">Inbox</Link>
      </div>

    
      <div className="main-content">
        <h1>This is your Courses Page</h1>
      </div>
    </div>
        
    );
}
