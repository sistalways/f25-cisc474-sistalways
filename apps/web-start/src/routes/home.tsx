import { createFileRoute, Link } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';

export const Route = createFileRoute('/home')({
    component: RouteComponent,
});

function RouteComponent() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        User Information: {JSON.stringify(user, null, 2)}.
        <Link to="/courses">View Courses</Link>
      </div>
    )
  );
}