import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NotFound, PendingRoute, RouteError } from './components/RouteStates'
import { routeTree } from './routeTree.gen'
import './styles.css'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
})

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  // TanStack Query owns caching: loaders always run and read from its cache.
  defaultPreloadStaleTime: 0,
  defaultPendingComponent: PendingRoute,
  defaultPendingMs: 200,
  defaultPendingMinMs: 300,
  defaultErrorComponent: RouteError,
  defaultNotFoundComponent: NotFound,
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
