import React from "react";
import Link from "next/link";
import "./profile.css"

export default function Profile() {
    return (
        <div className="Profile-container">
      
        <div className="sidebar">
          <Link href="/dashboard" className="nav-link">Dashboard</Link>
          <Link href="/courses" className="nav-link">Courses</Link>
          <Link href="/calendar" className="nav-link">Calendar</Link>
          <Link href="/profile" className="nav-link">Profile</Link>
          <Link href="/inbox" className="nav-link">Inbox</Link>
          <Link href="/" className="logout">Log out</Link>
        </div>
  
      
        <div className="main-content">
          <h1>These are the link to pages that use data from the backend</h1>
          <ul typeof="bullet">
            <li><Link href="https://sistalways-lms.vercel.app/courses">Courses Page - https://sistalways-lms.vercel.app/courses </Link></li>
            <li><Link href="https://sistalways-lms.vercel.app/inbox">Inbox Page https://sistalways-lms.vercel.app/inbox</Link></li>
          </ul>
        </div>
      </div>
        
    );
}
