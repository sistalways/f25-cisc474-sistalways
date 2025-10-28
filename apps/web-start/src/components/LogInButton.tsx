import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogInButton = () => {
  const { loginWithRedirect } = useAuth0();
  const AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE as string;

  return (
    <button 
    type='button'
    className='login-button'
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            scope: 'read:courses',
            prompt: 'consent',
            audience: AUTH0_AUDIENCE,
          },
        })
      }
    >
      Log In
    </button>
  );
};

export default LogInButton;