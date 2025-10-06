import React from "react";
import Link from "next/link";
import "./dashboard.css";
import {Suspense} from 'react';
import { get } from "http";

async function getCourses() {
  const data = await fetch("https://f25-cisc474-sistalways.onrender.com/courses",{ cache: 'no-store' });
  return data.json();
}

function CourseList({ promise }: { promise: Promise<any> }) {
  const courses = React.use(promise);

  return (
    <div>
      <h2>Your Courses</h2>
      <ul>
        {courses.map((course: any) => (
          <li key={course.id}>
            <Link href={`/courses/${course.id}`}>{course.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function Dashboard() {
  const courses = getCourses();

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
        <Suspense fallback={<div>Loading courses...</div>}>
          <CourseList promise={courses} />
        </Suspense>
      </div>
    </div>
  );
}
