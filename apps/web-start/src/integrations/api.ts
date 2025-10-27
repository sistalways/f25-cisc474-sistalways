import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query';

const BASE_URL = import.meta.env.VITE_BACKEND_URL as string;
const AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE as string;

type Json = Record<string, unknown> | Array<unknown>;

class RedirectingForAuthError extends Error {
  constructor() {
    super('redirecting-for-auth');
    this.name = 'RedirectingForAuthError';
  }
}

/** Shared client: get a token safely and make an authorized request */
export function useApiClient() {
  const { getAccessTokenSilently, loginWithRedirect, isAuthenticated, isLoading: isAuthLoading } = useAuth0();

  const getToken = async (scope?: string) => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: AUDIENCE, scope },
      });
      console.debug('[useApiClient] obtained token?', Boolean(token), { audience: AUDIENCE, scope });
      return token;
    } catch (e: any) {
      if (e?.error === 'consent_required' || e?.error === 'login_required') {
        await loginWithRedirect({
          authorizationParams: { audience: AUDIENCE, scope, prompt: 'consent' },
          appState: { returnTo: window.location.pathname },
        });
        throw new RedirectingForAuthError();
      }
      throw e;
    }
  };

  const request = async <T = unknown>(
    path: string,
    init: RequestInit & { scope?: string } = {},
  ): Promise<T> => {
    const token = await getToken(init.scope);
    console.debug('[useApiClient] requesting', { url: `${BASE_URL}${path}`, hasToken: Boolean(token), scope: init.scope });
    const res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: 'include',
    });
    if (!res.ok) {
      console.warn('[useApiClient] request failed', { url: `${BASE_URL}${path}`, status: res.status, statusText: res.statusText });
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return (await res.json()) as T;
  };

  return { request, isAuthenticated, isAuthLoading };
}

export function useApiQuery<T>(
    queryKey: ReadonlyArray<unknown>,
    path: string,
    init: RequestInit & { scope?: string } = {},
  ): UseQueryResult<T, Error> & {
    isAuthPending: boolean;
    showLoading: boolean;
    isEnabled: boolean;
  } {
    const { request, isAuthenticated, isAuthLoading } = useApiClient();
    const isEnabled = isAuthenticated && !isAuthLoading;
  
    const q = useQuery<T, Error>({
      queryKey,
      queryFn: () => request<T>(path, init),
      enabled: isEnabled,
      retry(failureCount, error) {
        if (error instanceof RedirectingForAuthError) return false;
        return failureCount < 3;
      },
    });
  
    const isAuthPending = isAuthLoading || !isAuthenticated;
    const showLoading = isAuthPending || q.isLoading || q.isFetching;
  
    return { ...q, isAuthPending, showLoading, isEnabled };
  }

export function useApiMutation<Input extends Json, Output = unknown>(
    opts?: {
      scope?: string;
      endpoint?: (variables: Input) => { path: string; method?: string };
      path?: string;
      method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      invalidateKeys?: ReadonlyArray<Array<unknown>>;
    }
  ): UseMutationResult<Output, Error, Input, unknown> {
    const { request } = useApiClient();
    const qc = useQueryClient();
  
    return useMutation<Output, Error, Input>({
      mutationFn: async (variables) => {
        const { path, method = opts?.method ?? 'POST' } =
          opts?.endpoint?.(variables) ?? { path: opts?.path!, method: opts?.method ?? 'POST' };
  
        return await request<Output>(path, {
          method,
          body: JSON.stringify(variables),
          scope: opts?.scope,
        });
      },
      retry(failureCount, error) {
        if (error instanceof RedirectingForAuthError) return false;
        return failureCount < 3;
      },
      onSuccess: async () => {
        if (opts?.invalidateKeys) {
          await Promise.all(
            opts.invalidateKeys.map((k) => qc.invalidateQueries({ queryKey: k })),
          );
        }
      },
    });
  }
  

export type CurrentUser = {
  id: string;
  name?: string | null;
  email?: string | null;
};

export function useCurrentUser(
  opts?: { scope?: string }
): UseQueryResult<CurrentUser, Error> {
  return useApiQuery<CurrentUser>(['users', 'me'], '/users/me', {
    scope: opts?.scope,
  });
}
