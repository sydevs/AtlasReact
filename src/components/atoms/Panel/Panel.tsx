import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { ErrorFallback, LoadingFallback } from '@/components/atoms/Fallbacks'
import { useBreakpoint } from '@/config/responsive'

type Props = {
  children: React.ReactNode
  mapWindow?: number
  footerHeight?: number
  width?: number | undefined
}

export function Panel({ width = 400, mapWindow, footerHeight = 300, children }: Props) {
  const { isMd } = useBreakpoint('md')
  const { isLg } = useBreakpoint('lg')

  return (
    <div
      className={`
        flex flex-col flex-grow lg:flex-grow-0
        pointer-events-auto md:overflow-y-scroll
        bg-background md:shadow-md
        lg:m-16
        relative
      `}
      id="syatlas-main"
      style={
        isMd
          ? { width: isLg ? width : 400 }
          : { marginTop: mapWindow ? `${mapWindow}px` : `calc(100dvh - ${footerHeight}px)` }
      }
    >
      <Suspense fallback={<LoadingFallback />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
      </Suspense>
    </div>
  )
}
