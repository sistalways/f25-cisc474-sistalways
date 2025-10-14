import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router';


export const Route = createFileRoute('/courses')({
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
        <h1>This is your Courses Page</h1>
      </div>
    </div>
    );
        
    }
