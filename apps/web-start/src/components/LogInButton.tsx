import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogInButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className='login-button'
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            scope: 'read:courses',
            prompt: 'consent',
            redirect_uri: `${window.location.origin}/home`,
          },
        })
      }
    >
      Log In
    </button>
  );
};

export default LogInButton;