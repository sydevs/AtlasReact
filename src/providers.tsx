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
          <NextUIProvider navigate={navigate} useHref={useHref}>
            {children}
          </NextUIProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
