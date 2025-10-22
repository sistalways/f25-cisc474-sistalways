import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="Profile-container">
      
        <div className="sidebar">
          <Link href="/dashboard" className="nav-link" to={'/dashboard'}>Dashboard</Link>
          <Link href="/courses" className="nav-link" to={'/courses'}>Courses</Link>
          <Link href="/calendar" className="nav-link" to={'/calendar'}>Calendar</Link>
          <Link href="/profile" className="nav-link" to={'/profile'}>Profile</Link>
          <Link href="/inbox" className="nav-link" to={'/inbox'}>Inbox</Link>
          <Link href="/" className="logout" to={'/'}>Log out</Link>
        </div>
  
      
        <div className="main-content">
          <h2>Below are the links to the pages that use data from the backend :-
          <ul typeof="bullet">
            <li><Link href="cisc474-ind-frontend.vjgcs.workers.de/dasboard" to={'/profile'}>Courses Page - cisc474-ind-frontend.vjgcs.workers.de/dashboard </Link></li>
            <li><Link href="cisc474-ind-frontend.vjgcs.workers.de/inbox" to={'/profile'}>Inbox Page - cisc474-ind-frontend.vjgcs.workers.de/inbox</Link></li>
          </ul>
          </h2>
          <br></br>
          <h2>Below is the link to the page that have DTO's implemented and have the Create,Update,Delete forms :-
          <ul typeof="bullet">
            <li><Link href="cisc474-ind-frontend.vjgcs.workers.de/courses" to={'/courses'}>Courses Page - cisc474-ind-frontend.vjgcs.workers.de/courses </Link></li>
          </ul>
          </h2>

        </div>
      </div>
        
    );
    }