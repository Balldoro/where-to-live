import { CatchBoundary, createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { MapError, MapSkeleton, MapView } from '@/modules/map/components';
import { PlaceholderCard } from '@/components/PlaceholderCard';

export const Route = createFileRoute('/')({ component: HomePage });

function HomePage() {
  return (
    <main className="relative h-dvh">
      <CatchBoundary getResetKey={() => 'map'} errorComponent={MapError}>
        <Suspense fallback={<MapSkeleton />}>
          <MapView />
        </Suspense>
      </CatchBoundary>
      <PlaceholderCard />
    </main>
  );
}
