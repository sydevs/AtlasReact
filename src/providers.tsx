import { NextUIProvider } from '@nextui-org/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { useNavigate, useHref } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { StrictMode } from 'react'

import { queryClient } from './config/query-client'

export default function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          {/* Known follow-up: NextUI overlays (Modal/Dropdown/Popover) portal to
              document.body by default — outside the brand-themed wrapper — so in
              the embedded widget they don't inherit the wrapper-scoped CSS vars
              or light/dark class. There's no global portalContainer on
              NextUIProvider; the fix is to pass each overlay a portalContainer
              pointing at the widget wrapper (see src/config/theme/BrandTheme). */}
          <NextUIProvider navigate={navigate} useHref={useHref}>
            {children}
          </NextUIProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
