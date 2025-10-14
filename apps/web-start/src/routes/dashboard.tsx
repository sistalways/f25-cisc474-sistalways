import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import courses from "./data/Courses.json"

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
   return (
    <div className="dashboard-container">
      
      <div className="sidebar">
          <Link href="/dashboard" className="nav-link" to={'/dashboard'}>Dashboard</Link>
          <Link href="/courses" className="nav-link" to={'/courses'}>Courses</Link>
          <Link href="/calendar" className="nav-link" to={'/calendar'}>Calendar</Link>
          <Link href="/profile" className="nav-link" to={'/profile'}>Profile</Link>
          <Link href="/inbox" className="nav-link" to={'/inbox'}>Inbox</Link>
          <Link href="/" className="logout" to={'/'}>Log out</Link>
        </div>

    
      <div className="main-content">
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
