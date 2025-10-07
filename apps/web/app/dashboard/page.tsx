import React from "react";
import Link from "next/link";
import "./dashboard.css";
import {Suspense} from 'react';
import courses from "./Courses.json";


export default async function Dashboard() {
 

  return (
    <div className="dashboard-container">
      
      <div className="sidebar">
        <Link href="/dashboard" className="nav-link">Dashboard</Link>
        <Link href="/courses" className="nav-link">Courses</Link>
        <Link href="/calendar" className="nav-link">Calendar</Link>
        <Link href="/profile" className="nav-link">Profile</Link>
        <Link href="/inbox" className="nav-link">Inbox</Link>
        <Link href="/" className="logout">Log out</Link>
      </div>

    
      <div className="main-content">
        <h1>This is your Dashboard</h1>
      <div className="courses-section">
        <h2>Your Courses</h2>
        <div className="courses-list">
          {courses.map((course:{title:string},idx:number) => (
            <div key={idx} className="course-card">
              <h3>{course.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
