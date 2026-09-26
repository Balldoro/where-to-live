export function PlaceholderCard() {
  return (
    <section className="absolute top-4 left-4 z-10 w-80 max-w-[calc(100%-2rem)] rounded-lg bg-white p-4 shadow-lg dark:bg-neutral-900">
      <h1 className="text-lg font-semibold">Where to live?</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        Search for an address or drop a pin on the map.
      </p>
    </section>
  );
}
