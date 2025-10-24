export function backendFetcher<T>(endpoint: string): () => Promise<T> {
  console.log("Fetching from:", import.meta.env.VITE_BACKEND_URL + endpoint);
  return () =>
    fetch(import.meta.env.VITE_BACKEND_URL + endpoint).then((res) =>
      res.json(),
    );
}

export async function mutateBackend<T>(
  endpoint: string,
  method: string,
  body?: any,
): Promise<T> {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}