import { useLayoutEffect, useMemo, type ReactNode, type RefObject } from 'react'
import { useQuery } from '@tanstack/react-query'

import api from '@/config/api'
import { applyPalette, type PaletteRoles } from '@/config/theme/palette'
import { setThemeRoot, useTheme } from '@/hooks/use-theme'

type BrandThemeProps = {
  // The widget's own service record supplies the fallback palette; its key is
  // also BrandTheme's query key, so it shares AppRouter's `['client']` fetch.
  apiKey?: string | null
  // Per-embed palette from the widget's color props; wins over the client record.
  palette?: PaletteRoles
  // The widget wrapper to scope theming to; absent standalone (root stays <html>).
  rootRef?: RefObject<HTMLElement | null>
  children: ReactNode
}

// Resolves the active brand palette (per-embed prop ?? client record ?? built-in
// default, per role) and paints it onto the theme root as NextUI CSS vars.
//
// It renders *above* the Suspense boundary so the prop palette themes the
// loading fallback immediately; the client record (color1/2/3 → primary /
// secondary / background) merges in once its query resolves. Re-applies the
// mode-aware DEFAULT/foreground whenever the theme flips light↔dark.
export function BrandTheme({ apiKey, palette, rootRef, children }: BrandThemeProps) {
  const { theme } = useTheme()

  const { data: client } = useQuery({
    queryKey: ['client', apiKey],
    queryFn: () => api.getClient(),
    enabled: !!apiKey,
  })

  const resolved = useMemo<PaletteRoles>(
    () => ({
      primary: palette?.primary ?? client?.color1,
      secondary: palette?.secondary ?? client?.color2,
      background: palette?.background ?? client?.color3,
    }),
    [
      palette?.primary,
      palette?.secondary,
      palette?.background,
      client?.color1,
      client?.color2,
      client?.color3,
    ],
  )

  // useLayoutEffect runs before the browser paints, so the palette (and the
  // wrapper as the theme root) are in place for the first frame — no flash.
  // `theme` in the deps re-applies the mode-aware DEFAULT/foreground on a flip.
  useLayoutEffect(() => {
    if (typeof document === 'undefined') return

    if (rootRef?.current) setThemeRoot(rootRef.current)

    applyPalette(rootRef?.current ?? document.documentElement, resolved, theme)
  }, [resolved, theme, rootRef])

  return <>{children}</>
}
