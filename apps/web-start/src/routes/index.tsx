import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import LogInButton from '../components/LogInButton';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <main>
  <h1>Login to view your courses</h1>
    <LogInButton />
      
</main>
}
