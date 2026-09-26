import { use, useEffect, useRef } from 'react';
import { getMap } from '../lib/map';

export function MapView() {
  const map = use(getMap());
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hostRef.current) return;
    const container = map.getContainer();
    hostRef.current.appendChild(container);
    map.resize();
    // Detach only: removing the map would make the next mount a new billed map load.
    return () => container.remove();
  }, [map]);

  return <div ref={hostRef} className="size-full" />;
}
