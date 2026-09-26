import type { ErrorComponentProps } from '@tanstack/react-router';

export function MapError({ error, reset }: ErrorComponentProps) {
  return (
    <div
      role="alert"
      className="flex size-full flex-col items-center justify-center gap-2 bg-neutral-100 dark:bg-neutral-900"
    >
      <p>The map could not be loaded.</p>
      {import.meta.env.DEV && (
        <pre className="text-sm">{error instanceof Error ? error.message : String(error)}</pre>
      )}
      <button type="button" onClick={reset} className="rounded border px-3 py-1">
        Try again
      </button>
    </div>
  );
}
