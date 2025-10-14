import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <main>
  <h1>Login with your Credentials</h1>
  <form style={{display: "flex" ,alignItems: "center",flexDirection:"column"}}>
      <input type="text"
      className="LoginInp"
      placeholder="Enter Username:" />

      <input type="password"
      className="LoginInp"
      placeholder="Enter Password:" />


      <Link 
        href="/dashboard"
        className="Login-Button"
        aria-label="Login" to={'/dashboard'}      > 
      Login
      </Link>
  </form>
</main>
}
