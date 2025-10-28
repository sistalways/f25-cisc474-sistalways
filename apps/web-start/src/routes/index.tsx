import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import LogInButton from '../components/LogInButton';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <main>
  <h1>Login With Your Credentials </h1>
  <form style={{display: "flex" ,alignItems: "center",flexDirection:"column"}}>
      <input type="text"
      className="LoginInp"
      placeholder="Enter Username:" />

      <input type="password"
      className="LoginInp"
      placeholder="Enter Password:" />


      <LogInButton /> 
  </form>
</main>
}
