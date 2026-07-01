import { QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { StrictMode } from 'react'

import { queryClient } from './config/query-client'

// Radix Primitives are headless and need no provider — links route through
// react-router's own <Link>/useNavigate, and each Radix overlay (Dialog/Select)
// is given a `container` pointing at the widget wrapper so it portals inside the
// brand-themed, light/dark-scoped root rather than to document.body.
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>{children}</HelmetProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
