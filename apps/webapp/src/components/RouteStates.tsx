import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useRouter, type ErrorComponentProps } from '@tanstack/react-router';
import { useEffect } from 'react';

export function PendingRoute() {
  return <div role="status">Loading…</div>;
}

export function RouteError({ error }: ErrorComponentProps) {
  const router = useRouter();
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  // Lets failed suspense queries refetch when the route loads again.
  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <div role="alert">
      <p>Something went wrong.</p>
      {import.meta.env.DEV && <pre>{error instanceof Error ? error.message : String(error)}</pre>}
      <button type="button" onClick={() => router.invalidate()}>
        Try again
      </button>
    </div>
  );
}

export function NotFound() {
  return <p>This page does not exist.</p>;
}
