import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import * as TanstackQuery from './integrations/root-provider';
import { Auth0Provider } from '@auth0/auth0-react';
// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext();
  const redirect_uri =
    typeof window !== 'undefined'
      ? window.location.origin + '/home'
      : undefined;

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <Auth0Provider
              domain={import.meta.env.VITE_AUTH0_DOMAIN}
              clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
              // Persist the cache to localStorage and enable refresh tokens so auth survives full-page navigation
              cacheLocation="localstorage"
              useRefreshTokens={true}
              authorizationParams={{
                redirect_uri: 'https://cisc474-ind-frontend.vjgcs.workers.dev/home',
                audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
              }}
            >
          <TanstackQuery.Provider {...rqContext}>
            {props.children}
          </TanstackQuery.Provider>
        </Auth0Provider>
      );
    },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient: rqContext.queryClient,
  });

  return router;
};
