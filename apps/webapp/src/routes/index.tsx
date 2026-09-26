import { createFileRoute } from '@tanstack/react-router';
import { useSystemHealth } from '@/lib/api.gen';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  // Temporary check that the generated API client works end to end.
  const health = useSystemHealth();

  return (
    <>
      <h1>Where to live?</h1>
      <p>API status: {health.isPending ? 'checking…' : (health.data?.status ?? 'unreachable')}</p>
    </>
  );
}
