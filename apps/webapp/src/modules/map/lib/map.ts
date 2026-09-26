import type { Map as MapboxMap } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { logger } from '@/lib/logger';

// Mapbox bills every `new Map()` as one map load. The app creates a single map
// for the whole session and moves its container between mounts, so route
// changes, StrictMode remounts and HMR updates never create a second one.

const POLAND_CENTER: [number, number] = [19.4, 52.1];
// Poland's bounding box with some margin, so border areas can still be centred.
const MAX_BOUNDS: [[number, number], [number, number]] = [
  [12.0, 48.0],
  [26.5, 55.9],
];

const hot = import.meta.hot?.data as { map?: Promise<MapboxMap> } | undefined;

let mapPromise = hot?.map;

export function getMap(): Promise<MapboxMap> {
  if (!mapPromise) {
    mapPromise = createMap().catch((error: unknown) => {
      // Let the next render retry instead of caching the failure.
      mapPromise = undefined;
      if (hot) hot.map = undefined;
      throw error;
    });
    if (hot) hot.map = mapPromise;
  }
  return mapPromise;
}

async function createMap(): Promise<MapboxMap> {
  const accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
  if (!accessToken) throw new Error('VITE_MAPBOX_API_KEY is not set');

  const { default: mapboxgl } = await import('mapbox-gl');

  const map = new mapboxgl.Map({
    container: createContainer(),
    accessToken,
    center: POLAND_CENTER,
    zoom: 5.5,
    maxBounds: MAX_BOUNDS,
    renderWorldCopies: false,
    refreshExpiredTiles: false,
    performanceMetricsCollection: false,
  });

  await loadMap(map);
  return map;
}

function createContainer(): HTMLDivElement {
  const container = document.createElement('div');
  container.className = 'size-full';
  return container;
}

function loadMap(map: MapboxMap): Promise<void> {
  return new Promise((res, rej) => {
    const onError = ({ error }: { error: Error }) => {
      logger.error(error, { source: 'mapbox' });
      if (!map.isStyleLoaded()) {
        map.off('error', onError);
        map.remove();
        rej(error);
      }
    };

    map.on('error', onError);
    map.once('load', () => res());
  });
}
